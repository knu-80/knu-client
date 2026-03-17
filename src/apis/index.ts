export { http } from '@/apis/http';
export { setUnauthorizedHandler } from '@/apis/http';
export { getAccessToken, setAccessToken, clearAccessToken } from '@/apis/auth';

export { ENDPOINTS, type EventType } from '@/apis/endpoints';
export { ApiClientError, toApiClientError, unwrapApiResponse } from '@/apis/error';
export {
  EVENT_TYPE_TO_LABEL,
  LABEL_TO_EVENT_TYPE,
  NOTICE_TYPE_TO_LABEL,
  toNoticeLabel,
  toNoticeRequestType,
  type EventLabel,
  type NoticeLabel,
  type NoticeType,
} from '@/apis/enumMapper';
export { buildJsonFormData, omitUndefined } from '@/apis/utils';

export type {
  ApiErrorInfo,
  ApiResponse,
  ApiResult,
  BackendErrorEnvelope,
  BackendErrorPayload,
  CursorPaginationParams,
  PartialUpdate,
} from '@/apis/types';

export {
  createNotice,
  deleteNotice,
  getNotices,
  getRecentNotices,
  getNotice,
  updateNotice,
  type LostFoundDetail,
  type NoticeCreateInput,
  type NoticeListItem,
  type NoticeDetail,
  type NoticeMutationResponse,
  type NoticeUpdateInput,
} from '@/apis/modules/noticeApi';
export {
  createEvent,
  deleteEvent,
  getEventsByType,
  getEvent,
  updateEvent,
  type EventCreateInput,
  type EventItem,
  type EventUpdateInput,
} from '@/apis/modules/eventApi';
export {
  getPerformancePreviewByDay,
  getPerformanceTimelineByDay,
} from '@/apis/modules/performanceApi';
export {
  createBooth,
  deleteBooth,
  getBooths,
  getBoothCount,
  getBooth,
  getBoothTop3,
  getBoothDailyRanking,
  getBoothRanking,
  updateBooth,
  type BoothDivision,
  type BoothMutationInput,
  type BoothSummary,
  type BoothListParams,
  type BoothUpdateInput,
  type BoothRanking,
  type Booth3Ranking,
} from '@/apis/modules/boothApi';
export {
  getAdminProfile,
  login,
  toLoginRequest,
  type AdminProfile,
  type LoginInput,
  type TokenResponse,
} from '@/apis/modules/adminAuthApi';
