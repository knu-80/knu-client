import { ENDPOINTS } from '@/apis/endpoints';
import { unwrapApiResponse } from '@/apis/error';
import { http } from '@/apis/http';
import { omitUndefined } from '@/apis/utils';
import type { ApiResponse, PartialUpdate } from '@/apis/types';

export type BoothDivision =
  | 'ACADEMIC_DIVISION'
  | 'CULTURE_ART_DIVISION'
  | 'SPORTS_DIVISION'
  | 'SOCIAL_DIVISION'
  | 'RELIGIOUS_DIVISION'
  | 'MANAGEMENT'
  | 'EXTERNAL_SUPPORT';

export interface BoothSummary {
  id: number;
  boothNumber: number;
  name: string;
  division: BoothDivision;
  description: string;
  applyLink: string;
  imageUrl: string | null;
  isActive: boolean;
}

export interface BoothListParams {
  keyword?: string;
}

export interface BoothMutationInput {
  memberId: number;
  boothNumber: number;
  name: string;
  division: BoothDivision;
  description?: string;
  applyLink?: string;
  imageUrl?: string | null;
  isActive?: boolean;
}

export type BoothUpdateInput = PartialUpdate<Omit<BoothMutationInput, 'memberId'>>;

export async function getBooths(params: BoothListParams = {}): Promise<BoothSummary[]> {
  const { data } = await http.get<ApiResponse<BoothSummary[]>>(ENDPOINTS.booths, {
    params,
  });

  return unwrapApiResponse(data);
}

export async function getBooth(boothId: number): Promise<BoothSummary> {
  const { data } = await http.get<ApiResponse<BoothSummary>>(ENDPOINTS.boothById(boothId));

  return unwrapApiResponse(data);
}

export async function createBooth(payload: BoothMutationInput): Promise<BoothSummary> {
  const { data } = await http.post<ApiResponse<BoothSummary>>(ENDPOINTS.adminBooths, payload);

  return unwrapApiResponse(data);
}

export async function updateBooth(
  boothId: number,
  payload: BoothUpdateInput & { memberId: number },
): Promise<BoothSummary> {
  const patchPayload = omitUndefined(payload);
  const { data } = await http.patch<ApiResponse<BoothSummary>>(
    ENDPOINTS.boothUpdateById(boothId),
    patchPayload,
  );

  return unwrapApiResponse(data);
}

export async function deleteBooth(boothId: number): Promise<void> {
  await http.delete<ApiResponse<unknown>>(ENDPOINTS.adminBoothById(boothId));
}
