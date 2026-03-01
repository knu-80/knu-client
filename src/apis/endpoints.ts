export type EventType = 'RECRUITMENT' | 'CLUB_FESTIVAL';

export const ENDPOINTS = {
  adminLogin: '/api/v1/admin/login',
  adminMe: '/api/v1/admin/me',
  adminBooths: '/admin/v1/booths',
  adminBoothById: (boothId: number | string) => `/admin/v1/booths/${boothId}`,
  notices: '/api/v1/notices',
  noticeById: (noticeId: number | string) => `/api/v1/notices/${noticeId}`,
  noticeImages: (noticeId: number | string) => `/api/v1/notices/${noticeId}/images`,
  events: '/api/v1/events',
  eventsByType: (eventType: EventType) => `/api/v1/events/list/${eventType}`,
  eventById: (eventId: number | string) => `/api/v1/events/${eventId}`,
  eventUpdateById: (eventId: number | string) => `/api/v1/events/update/${eventId}`,
  booths: '/api/v1/booths/list',
  boothById: (boothId: number | string) => `/api/v1/booths/${boothId}`,
  boothUpdateById: (boothId: number | string) => `/api/v1/booths/update/${boothId}`,
} as const;
