export type EventType = 'RECRUITMENT' | 'CLUB_FESTIVAL';

export const ENDPOINTS = {
  adminLogin: '/api/v1/admin/login',
  adminMe: '/api/v1/admin/me',
  notices: '/api/v1/notices',
  noticeById: (noticeId: number | string) => `/api/v1/notices/${noticeId}`,
  events: '/api/v1/events',
  eventsByType: (eventType: EventType) => `/api/v1/events/list/${eventType}`,
  eventById: (eventId: number | string) => `/api/v1/events/${eventId}`,
  booths: '/api/v1/booths/list',
  boothById: (boothId: number | string) => `/api/v1/booths/${boothId}`,
} as const;
