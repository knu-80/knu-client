export type ApiResult = 'SUCCESS' | 'FAIL';

export interface ApiResponse<T> {
  result: ApiResult;
  data: T;
  code?: string;
  message?: string;
}

export interface BackendErrorPayload {
  state?: number;
  code?: string;
  message?: string;
}

export interface BackendErrorEnvelope {
  error?: BackendErrorPayload;
  code?: string;
  message?: string;
  result?: ApiResult;
}

export interface ApiErrorInfo {
  status: number;
  code?: string;
  message: string;
  result?: ApiResult;
}

export interface CursorPaginationParams {
  lastId?: number;
  size?: number;
}

export type PartialUpdate<T> = Partial<T>;
