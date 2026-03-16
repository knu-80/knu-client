export type EventType = 'RECRUITMENT' | 'CLUB_FESTIVAL';

const PUBLIC_API_PREFIX = '/api/v1';
const ADMIN_API_PREFIX = '/admin/v1';

export const ENDPOINTS = {
  // Public (no token)
  login: `${PUBLIC_API_PREFIX}/login`,
  notices: `${PUBLIC_API_PREFIX}/notices`,
  noticesRecent: `${PUBLIC_API_PREFIX}/notices/recent`,
  noticeById: (noticeId: number | string) => `${PUBLIC_API_PREFIX}/notices/${noticeId}`,
  eventsByType: (eventType: EventType) => `${PUBLIC_API_PREFIX}/events/list/${eventType}`,
  eventById: (eventId: number | string) => `${PUBLIC_API_PREFIX}/events/${eventId}`,
  performances: `${PUBLIC_API_PREFIX}/performances`,
  booths: `${PUBLIC_API_PREFIX}/booths/list`,
  boothCount: `${PUBLIC_API_PREFIX}/booths/count`,
  boothById: (boothId: number | string) => `${PUBLIC_API_PREFIX}/booths/${boothId}`,
  boothLikes: (boothId: number | string) => `${PUBLIC_API_PREFIX}/booths/${boothId}/likes`,
  boothRanking: `${PUBLIC_API_PREFIX}/booths/ranking`,
  boothTop3: `${PUBLIC_API_PREFIX}/booths/ranking/top3`,

  // Admin (token required)
  adminMe: `${ADMIN_API_PREFIX}/me`,
  adminNotices: `${ADMIN_API_PREFIX}/notices`,
  adminNoticeById: (noticeId: number | string) => `${ADMIN_API_PREFIX}/notices/${noticeId}`,
  adminNoticeImagesById: (noticeId: number | string) =>
    `${ADMIN_API_PREFIX}/notices/${noticeId}/images`,
  adminEvents: `${ADMIN_API_PREFIX}/events`,
  adminEventById: (eventId: number | string) => `${ADMIN_API_PREFIX}/events/${eventId}`,
  adminEventImagesById: (eventId: number | string) =>
    `${ADMIN_API_PREFIX}/events/${eventId}/images`,
  adminBooths: `${ADMIN_API_PREFIX}/booths`,
  adminBoothById: (boothId: number | string) => `${ADMIN_API_PREFIX}/booths/${boothId}`,
  adminBoothImagesById: (boothId: number | string) =>
    `${ADMIN_API_PREFIX}/booths/${boothId}/images`,
} as const;
