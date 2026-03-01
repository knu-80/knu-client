import axios from 'axios';

import type { ApiResponse, ApiResult, BackendErrorEnvelope } from './types';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function pickErrorInfo(payload: unknown): {
  status?: number;
  message?: string;
  code?: string;
  result?: ApiResult;
} {
  if (!isObject(payload)) {
    return {};
  }

  const envelope = payload as BackendErrorEnvelope;
  const nestedError = isObject(envelope.error) ? envelope.error : undefined;
  const nestedStatus = typeof nestedError?.state === 'number' ? nestedError.state : undefined;

  const message =
    (typeof envelope.message === 'string' ? envelope.message : undefined) ??
    (typeof nestedError?.message === 'string' ? nestedError.message : undefined);
  const code =
    (typeof envelope.code === 'string' ? envelope.code : undefined) ??
    (typeof nestedError?.code === 'string' ? nestedError.code : undefined);
  const result =
    envelope.result === 'SUCCESS' || envelope.result === 'FAIL' ? envelope.result : undefined;

  return { status: nestedStatus, message, code, result };
}

export class ApiClientError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly result?: ApiResult;
  readonly raw?: unknown;

  constructor(
    message: string,
    options: {
      status: number;
      code?: string;
      result?: ApiResult;
      raw?: unknown;
    },
  ) {
    super(message);
    this.name = 'ApiClientError';
    this.status = options.status;
    this.code = options.code;
    this.result = options.result;
    this.raw = options.raw;
  }
}

export function toApiClientError(error: unknown): ApiClientError {
  if (error instanceof ApiClientError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const info = pickErrorInfo(error.response?.data);
    const status = info.status ?? error.response?.status ?? 0;
    const message = info.message ?? error.message ?? '요청 처리 중 오류가 발생했습니다.';

    return new ApiClientError(message, {
      status,
      code: info.code,
      result: info.result,
      raw: error,
    });
  }

  if (error instanceof Error) {
    return new ApiClientError(error.message, {
      status: 0,
      raw: error,
    });
  }

  return new ApiClientError('알 수 없는 오류가 발생했습니다.', {
    status: 0,
    raw: error,
  });
}

export function unwrapApiResponse<T>(payload: ApiResponse<T>): T {
  if (payload.result === 'FAIL') {
    throw new ApiClientError(payload.message ?? '요청 처리에 실패했습니다.', {
      status: 200,
      code: payload.code,
      result: payload.result,
      raw: payload,
    });
  }

  return payload.data;
}
