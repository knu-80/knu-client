import { ENDPOINTS } from '@/apis/endpoints';
import { unwrapApiResponse } from '@/apis/error';
import { http } from '@/apis/http';
import { buildJsonFormData, omitUndefined } from '@/apis/utils';
import type { NoticeType } from '@/apis/enumMapper';
import type { ApiResponse, CursorPaginationParams, PartialUpdate } from '@/apis/types';

export interface NoticeListItem {
  noticeId: number;
  title: string;
  contentPreview: string;
  createdAt: string;
  authorId: number;
  authorNickname: string;
  type: NoticeType;
  imageUrls: string[];
}

export interface LostFoundDetail {
  foundPlace?: string;
  keepingPlace?: string;
  description?: string;
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

export async function getNotices(params: CursorPaginationParams = {}): Promise<NoticeListItem[]> {
  const { data } = await http.get<ApiResponse<NoticeListItem[]>>(ENDPOINTS.notices, {
    params,
  });

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
    ENDPOINTS.notices,
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
    ENDPOINTS.noticeById(noticeId),
    patchPayload,
  );

  return unwrapApiResponse(data);
}

export async function deleteNotice(noticeId: number): Promise<void> {
  await http.delete<ApiResponse<unknown>>(ENDPOINTS.noticeById(noticeId));
}
