export type ApiResult = 'SUCCESS' | 'FAIL';

export interface ApiResponse<T> {
  result: ApiResult;
  data: T;
  code?: string;
  message?: string;
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
