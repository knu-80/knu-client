import { ENDPOINTS } from '@/apis/endpoints';
import { unwrapApiResponse } from '@/apis/error';
import { http } from '@/apis/http';
import type { ApiResponse } from '@/apis/types';

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
