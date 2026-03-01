import { ENDPOINTS, type EventType } from '@/apis/endpoints';
import { unwrapApiResponse } from '@/apis/error';
import { http } from '@/apis/http';
import type { ApiResponse } from '@/apis/types';

export interface EventItem {
  id: number;
  title: string;
  description: string;
  eventType: EventType;
  imageUrl: string | null;
  startAt: string;
  endAt: string;
  isActive: boolean;
}

export async function getEventsByType(eventType: EventType): Promise<EventItem[]> {
  const { data } = await http.get<ApiResponse<EventItem[]>>(ENDPOINTS.eventsByType(eventType));

  return unwrapApiResponse(data);
}

export async function getEvent(eventId: number): Promise<EventItem> {
  const { data } = await http.get<ApiResponse<EventItem>>(ENDPOINTS.eventById(eventId));

  return unwrapApiResponse(data);
}
