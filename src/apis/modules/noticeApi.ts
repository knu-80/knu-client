import { ENDPOINTS } from '@/apis/endpoints';
import { unwrapApiResponse } from '@/apis/error';
import { http } from '@/apis/http';
import { buildJsonFormData, omitUndefined } from '@/apis/utils';
import type { NoticeType } from '@/apis/enumMapper';
import type { ApiResponse, PartialUpdate } from '@/apis/types';

export interface NoticeListItem {
  noticeId: number;
  type: NoticeType;
  title: string;
  createdAt: string;
}

export interface LostFoundDetail {
  foundPlace: string;
  foundItem: string;
}

export interface NoticeDetail {
  noticeId: number;
  title: string;
  createdAt: string;
  authorId: number;
  authorNickname: string;
  content: string;
  type: NoticeType;
  lostFoundDetail?: LostFoundDetail;
  imageUrls: string[];
}

export interface NoticeMutationResponse {
  noticeId: number;
  title: string;
  content: string;
  type: NoticeType;
  lostFoundDetail?: LostFoundDetail;
  imageUrls: string[];
}

export interface NoticeCreateInput {
  title: string;
  content: string;
  type: NoticeType;
  lostFoundDetail?: LostFoundDetail;
}

export type NoticeUpdateInput = PartialUpdate<{
  title: string;
  content: string;
  lostFoundDetail: LostFoundDetail;
}>;

export async function getNotices(): Promise<NoticeListItem[]> {
  const { data } = await http.get<ApiResponse<NoticeListItem[]>>(ENDPOINTS.notices);

  return unwrapApiResponse(data);
}

export async function getNotice(noticeId: number): Promise<NoticeDetail> {
  const { data } = await http.get<ApiResponse<NoticeDetail>>(ENDPOINTS.noticeById(noticeId));

  return unwrapApiResponse(data);
}

export async function createNotice(
  payload: NoticeCreateInput,
  images: File[] = [],
): Promise<NoticeMutationResponse> {
  const formData = buildJsonFormData(payload, images);
  const { data } = await http.post<ApiResponse<NoticeMutationResponse>>(
    ENDPOINTS.adminNotices,
    formData,
  );

  return unwrapApiResponse(data);
}

export async function updateNotice(
  noticeId: number,
  payload: NoticeUpdateInput,
): Promise<NoticeMutationResponse> {
  const patchPayload = omitUndefined(payload);
  const { data } = await http.patch<ApiResponse<NoticeMutationResponse>>(
    ENDPOINTS.adminNoticeById(noticeId),
    patchPayload,
  );

  return unwrapApiResponse(data);
}

export async function deleteNotice(noticeId: number): Promise<void> {
  await http.delete<ApiResponse<unknown>>(ENDPOINTS.adminNoticeById(noticeId));
}

export async function updateNoticeImages(noticeId: number, images: File[]): Promise<void> {
  const formData = new FormData();
  images.forEach((image) => formData.append('images', image));

  await http.post(ENDPOINTS.adminNoticeImagesById(noticeId), formData);
}

export async function urlToFile(url: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  const filename = url.split('/').pop() || 'image.jpg';
  return new File([blob], filename, { type: blob.type });
}
