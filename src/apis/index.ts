export { http } from '@/apis/http';

export { ENDPOINTS, type EventType } from '@/apis/endpoints';
export { ApiClientError, toApiClientError, unwrapApiResponse } from '@/apis/error';

export type { ApiErrorInfo, ApiResponse, ApiResult, CursorPaginationParams } from '@/apis/types';

export {
  getNotices,
  getNotice,
  type NoticeListItem,
  type NoticeDetail,
} from '@/apis/modules/noticeApi';
export { getEventsByType, getEvent, type EventItem } from '@/apis/modules/eventApi';
export {
  getBooths,
  getBooth,
  type BoothDivision,
  type BoothSummary,
  type BoothListParams,
} from '@/apis/modules/boothApi';
