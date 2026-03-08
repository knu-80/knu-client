export type EventType = 'RECRUITMENT' | 'CLUB_FESTIVAL';

const PUBLIC_API_PREFIX = '/api/v1';
const ADMIN_API_PREFIX = '/admin/v1';

export const ENDPOINTS = {
  login: `${PUBLIC_API_PREFIX}/login`,
  notices: `${PUBLIC_API_PREFIX}/notices`,
  noticeById: (noticeId: number | string) => `${PUBLIC_API_PREFIX}/notices/${noticeId}`,
  eventsByType: (eventType: EventType) => `${PUBLIC_API_PREFIX}/events/list/${eventType}`,
  eventById: (eventId: number | string) => `${PUBLIC_API_PREFIX}/events/${eventId}`,
  booths: `${PUBLIC_API_PREFIX}/booths/list`,
  boothById: (boothId: number | string) => `${PUBLIC_API_PREFIX}/booths/${boothId}`,

  adminMe: `${ADMIN_API_PREFIX}/me`,
  adminNotices: `${ADMIN_API_PREFIX}/notices`,
  adminNoticeById: (noticeId: number | string) => `${ADMIN_API_PREFIX}/notices/${noticeId}`,
  adminNoticeImagesById: (noticeId: number | string) =>
    `${ADMIN_API_PREFIX}/notices/${noticeId}/images`,
  adminEvents: `${PUBLIC_API_PREFIX}/events`,
  adminEventById: (eventId: number | string) => `${PUBLIC_API_PREFIX}/events/${eventId}`,
  adminUpdateEventById: (eventId: number | string) =>
    `${PUBLIC_API_PREFIX}/events/update/${eventId}`,
  adminBooths: `${ADMIN_API_PREFIX}/booths`,
  adminBoothById: (boothId: number | string) => `${ADMIN_API_PREFIX}/booths/${boothId}`,
  adminUpdateBoothById: (boothId: number | string) => `${PUBLIC_API_PREFIX}/booths/${boothId}`,
  adminBoothImagesById: (boothId: number | string) =>
    `${PUBLIC_API_PREFIX}/booths/${boothId}/images`,
} as const;
