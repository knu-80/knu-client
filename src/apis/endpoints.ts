export type EventType = 'RECRUITMENT' | 'CLUB_FESTIVAL';

const PUBLIC_API_PREFIX = '/api/v1';
const ADMIN_API_PREFIX = '/admin/v1';

export const ENDPOINTS = {
  // Public (no token)
  notices: `${PUBLIC_API_PREFIX}/notices`,
  noticeById: (noticeId: number | string) => `${PUBLIC_API_PREFIX}/notices/${noticeId}`,
  eventsByType: (eventType: EventType) => `${PUBLIC_API_PREFIX}/events/list/${eventType}`,
  eventById: (eventId: number | string) => `${PUBLIC_API_PREFIX}/events/${eventId}`,
  booths: `${PUBLIC_API_PREFIX}/booths/list`,
  boothById: (boothId: number | string) => `${PUBLIC_API_PREFIX}/booths/${boothId}`,

  // Admin (token required)
  adminLogin: `${ADMIN_API_PREFIX}/login`,
  adminMe: `${ADMIN_API_PREFIX}/me`,
  adminNotices: `${ADMIN_API_PREFIX}/notices`,
  adminNoticeById: (noticeId: number | string) => `${ADMIN_API_PREFIX}/notices/${noticeId}`,
  adminEvents: `${ADMIN_API_PREFIX}/events`,
  adminEventById: (eventId: number | string) => `${ADMIN_API_PREFIX}/events/${eventId}`,
  adminBooths: `${ADMIN_API_PREFIX}/booths`,
  adminBoothById: (boothId: number | string) => `${ADMIN_API_PREFIX}/booths/${boothId}`,
} as const;
