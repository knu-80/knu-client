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
  imageUrls: string[];
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
  images?: File[];
  isActive?: boolean;
  contact: string;
  keywords?: string;
}

export type BoothUpdateInput = PartialUpdate<Omit<BoothMutationInput, 'memberId' | 'images'>>;

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
  const formData = new FormData();

  const requestData = {
    memberId: payload.memberId,
    boothNumber: payload.boothNumber,
    name: payload.name,
    division: payload.division,
    contact: payload.contact,
    description: payload.description,
    applyLink: payload.applyLink,
    keywords: payload.keywords,
    isActive: payload.isActive ?? true,
  };

  formData.append('data', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

  if (payload.images && payload.images.length > 0) {
    payload.images.forEach((image) => {
      formData.append('images', image);
    });
  }

  const { data } = await http.post<ApiResponse<BoothSummary>>(ENDPOINTS.adminBooths, formData);

  return unwrapApiResponse(data);
}

export async function updateBooth(
  boothId: number,
  payload: BoothUpdateInput,
): Promise<BoothSummary> {
  const patchPayload = omitUndefined(payload);
  const { data } = await http.patch<ApiResponse<BoothSummary>>(
    ENDPOINTS.adminBoothById(boothId),
    patchPayload,
  );

  return unwrapApiResponse(data);
}

export async function updateBoothImages(boothId: number, images: File[]): Promise<void> {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append('images', image);
  });

  await http.post(ENDPOINTS.adminBoothImagesById(boothId), formData);
}

export async function deleteBooth(boothId: number): Promise<void> {
  await http.delete<ApiResponse<unknown>>(ENDPOINTS.adminBoothById(boothId));
}
