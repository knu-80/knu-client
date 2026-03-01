import { ENDPOINTS } from '@/apis/endpoints';
import { http } from '@/apis/http';
import { unwrapApiResponse } from '@/apis/error';
import type { ApiResponse, CursorPaginationParams } from '@/apis/types';

export interface NoticeListItem {
  noticeId: number;
  title: string;
  contentPreview: string;
  createdAt: string;
  authorId: number;
  authorNickname: string;
  type: string;
  imageUrls: string[];
}

export interface NoticeDetail {
  noticeId: number;
  title: string;
  createdAt: string;
  authorId: number;
  authorNickname: string;
  content: string;
  type: string;
  lostFoundDetail?: {
    foundPlace?: string;
    keepingPlace?: string;
    description?: string;
  };
  imageUrls: string[];
}

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
