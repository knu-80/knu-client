import { ENDPOINTS, type EventType } from '@/apis/endpoints';
import { unwrapApiResponse } from '@/apis/error';
import { http } from '@/apis/http';
import { omitUndefined } from '@/apis/utils';
import type { ApiResponse, PartialUpdate } from '@/apis/types';

export interface EventItem {
  id: number;
  title: string;
  description: string;
  eventType: EventType;
  imageUrl: string | null;
  startAt: string;
  endAt: string;
  isActive: boolean;
  location?: string;
}

export async function getEventsByType(eventType: EventType): Promise<EventItem[]> {
  const { data } = await http.get<ApiResponse<EventItem[]>>(ENDPOINTS.eventsByType(eventType));

  return unwrapApiResponse(data);
}

export async function getEvent(eventId: number): Promise<EventItem> {
  const { data } = await http.get<ApiResponse<EventItem>>(ENDPOINTS.eventById(eventId));

  return unwrapApiResponse(data);
}

export interface EventCreateInput {
  title: string;
  description: string;
  eventType: EventType;
  imageUrl?: string | null;
  startAt: string;
  endAt: string;
  isActive?: boolean;
}

export type EventUpdateInput = PartialUpdate<EventCreateInput>;

export async function createEvent(payload: EventCreateInput): Promise<EventItem> {
  const { data } = await http.post<ApiResponse<EventItem>>(ENDPOINTS.events, payload);

  return unwrapApiResponse(data);
}

export async function updateEvent(eventId: number, payload: EventUpdateInput): Promise<EventItem> {
  const patchPayload = omitUndefined(payload);
  const { data } = await http.patch<ApiResponse<EventItem>>(
    ENDPOINTS.eventUpdateById(eventId),
    patchPayload,
  );

  return unwrapApiResponse(data);
}

export async function deleteEvent(eventId: number): Promise<void> {
  await http.delete<ApiResponse<unknown>>(ENDPOINTS.eventById(eventId));
}
