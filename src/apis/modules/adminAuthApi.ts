import { ENDPOINTS } from '@/apis/endpoints';
import { unwrapApiResponse } from '@/apis/error';
import { http } from '@/apis/http';
import { setAccessToken } from '@/apis/auth';
import type { ApiResponse } from '@/apis/types';

export type LoginInput =
  | { loginId: string; password: string }
  | { boothNumber: number; password: string };

export interface TokenResponse {
  accessToken: string;
}

export function toLoginRequest(payload: LoginInput): { loginId: string; password: string } {
  if ('boothNumber' in payload) {
    return {
      loginId: String(payload.boothNumber),
      password: payload.password,
    };
  }

  return payload;
}

export async function login(
  payload: LoginInput,
  options: { persistToken?: boolean } = {},
): Promise<string> {
  const requestBody = toLoginRequest(payload);
  const { data } = await http.post<ApiResponse<TokenResponse>>(ENDPOINTS.adminLogin, requestBody);
  const token = unwrapApiResponse(data).accessToken;

  if (options.persistToken !== false) {
    setAccessToken(token);
  }

  return token;
}

export async function getAdminProfile(memberId: number): Promise<Record<string, number>> {
  const { data } = await http.get<ApiResponse<Record<string, number>>>(ENDPOINTS.adminMe, {
    params: { memberId },
  });

  return unwrapApiResponse(data);
}
