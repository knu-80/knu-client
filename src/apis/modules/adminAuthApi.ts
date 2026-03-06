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

interface AdminProfilePayload {
  memberId?: number;
  member_id?: number;
  loginId?: string;
  login_id?: string;
  nickname?: string;
  name?: string;
  role?: string;
  type?: string;
  boothId?: number;
  booth_id?: number;
}

export interface AdminProfile {
  memberId: number | null;
  loginId: string;
  nickname: string;
  role: string;
  boothId: number | null;
}

function normalizeNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function normalizeString(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

function normalizeAdminProfile(payload: AdminProfilePayload): AdminProfile {
  const memberId = normalizeNumber(payload.memberId ?? payload.member_id);
  const boothId = normalizeNumber(payload.boothId ?? payload.booth_id);
  const loginId = normalizeString(payload.loginId ?? payload.login_id);
  const nickname = normalizeString(payload.nickname ?? payload.name);
  const role = normalizeString(payload.role ?? payload.type);

  return {
    memberId,
    loginId,
    nickname,
    role,
    boothId,
  };
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
  const { data } = await http.post<ApiResponse<TokenResponse>>(ENDPOINTS.login, requestBody);
  const token = unwrapApiResponse(data).accessToken;

  if (options.persistToken !== false) {
    setAccessToken(token);
  }

  return token;
}

export async function getAdminProfile(): Promise<AdminProfile> {
  const { data } = await http.get<ApiResponse<AdminProfilePayload>>(ENDPOINTS.adminMe);

  return normalizeAdminProfile(unwrapApiResponse(data));
}
