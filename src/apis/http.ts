import axios, { AxiosHeaders } from 'axios';

import { toApiClientError } from './error';

const FALLBACK_API_BASE_URL = 'https://api.knu80th.kro.kr';
const FALLBACK_TIMEOUT_MS = 10000;

const parsedTimeout = Number(import.meta.env.VITE_API_TIMEOUT_MS);
const timeoutMs = Number.isFinite(parsedTimeout) ? parsedTimeout : FALLBACK_TIMEOUT_MS;

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? FALLBACK_API_BASE_URL,
  timeout: timeoutMs,
  headers: {
    Accept: 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const headers = AxiosHeaders.from(config.headers);

  if (typeof window !== 'undefined') {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  config.headers = headers;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(toApiClientError(error)),
);
