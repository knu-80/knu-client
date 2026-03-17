import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';
import posthog from 'posthog-js';
import axiosRetry from 'axios-retry';

import { clearAccessToken, getAccessToken } from './auth';
import { toApiClientError } from './error';

const FALLBACK_API_BASE_URL = 'https://api.knu80th.kro.kr';
const FALLBACK_TIMEOUT_MS = 10000;

const parsedTimeout = Number(import.meta.env.VITE_API_TIMEOUT_MS);
const timeoutMs = Number.isFinite(parsedTimeout) ? parsedTimeout : FALLBACK_TIMEOUT_MS;

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? FALLBACK_API_BASE_URL,
  timeout: timeoutMs,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

axiosRetry(http, {
  retries: 3,
  shouldResetTimeout: true,
  retryDelay: (retryCount) => {
    return axiosRetry.exponentialDelay(retryCount);
  },
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      (error.response ? error.response.status >= 500 : false)
    );
  },
});

let unauthorizedHandler: ((status: number) => void) | null = null;

export function setUnauthorizedHandler(handler: ((status: number) => void) | null): void {
  unauthorizedHandler = handler;
}

type RequestMetricMeta = {
  startedAt: number;
  method: string;
  apiPath: string;
};

function toApiPath(config: InternalAxiosRequestConfig): string {
  const url = config.url ?? '';
  const baseURL = config.baseURL ?? http.defaults.baseURL ?? '';

  try {
    const parsed = new URL(url, baseURL);
    return parsed.pathname;
  } catch {
    return url.split('?')[0] ?? url;
  }
}

function normalizeApiPath(pathname: string): string {
  return pathname
    .replace(
      /\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}(?=\/|$)/g,
      '/:id',
    )
    .replace(/\/\d+(?=\/|$)/g, '/:id');
}

function setMetricMeta(config: InternalAxiosRequestConfig, meta: RequestMetricMeta): void {
  (config as InternalAxiosRequestConfig & { metricMeta?: RequestMetricMeta }).metricMeta = meta;
}

function getMetricMeta(config?: InternalAxiosRequestConfig): RequestMetricMeta | undefined {
  return (config as (InternalAxiosRequestConfig & { metricMeta?: RequestMetricMeta }) | undefined)
    ?.metricMeta;
}

function trackApiRequestMetric(meta: RequestMetricMeta, status: number, success: boolean): void {
  if (typeof window === 'undefined') {
    return;
  }

  const durationMs = Math.max(0, Math.round(performance.now() - meta.startedAt));
  const payload = {
    api_path: meta.apiPath,
    method: meta.method,
    status,
    success,
    duration_ms: durationMs,
  };

  posthog.capture('api_request', payload);

  const gtag = (
    window as Window & {
      gtag?: (
        command: 'event',
        eventName: string,
        params?: Record<string, string | number>,
      ) => void;
    }
  ).gtag;

  if (typeof gtag === 'function') {
    gtag('event', 'api_request', {
      ...payload,
      success: success ? 1 : 0,
    });
  }
}

http.interceptors.request.use((config) => {
  const headers = AxiosHeaders.from(config.headers);

  const accessToken = getAccessToken();
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  config.headers = headers;
  const apiPath = normalizeApiPath(toApiPath(config));
  setMetricMeta(config, {
    startedAt: performance.now(),
    method: (config.method ?? 'GET').toUpperCase(),
    apiPath,
  });

  return config;
});

http.interceptors.response.use(
  (response) => {
    const meta = getMetricMeta(response.config);
    if (meta) {
      trackApiRequestMetric(meta, response.status, true);
    }

    return response;
  },
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const meta = getMetricMeta(error.config);
      if (meta) {
        trackApiRequestMetric(meta, error.response?.status ?? 0, false);
      }
    }

    const parsedError = toApiClientError(error);

    if (parsedError.status === 401) {
      clearAccessToken();
      unauthorizedHandler?.(parsedError.status);
    }

    return Promise.reject(parsedError);
  },
);
