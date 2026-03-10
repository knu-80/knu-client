import type { EventType } from './endpoints';

export type NoticeType = '공지' | '분실물' | 'GENERAL' | 'LOST_FOUND';
export type NoticeLabel = '공지' | '분실물';

export const NOTICE_TYPE_TO_LABEL: Record<NoticeType, NoticeLabel> = {
  공지: '공지',
  분실물: '분실물',
  GENERAL: '공지',
  LOST_FOUND: '분실물',
};

export function toNoticeLabel(value: NoticeType): NoticeLabel {
  return NOTICE_TYPE_TO_LABEL[value];
}

export function toNoticeRequestType(value: NoticeLabel): NoticeType {
  // 백엔드/프론트 합의(한국어 enum) 기준. 영문 명세로 바뀌는 경우 여기만 교체하면 됨.
  return value;
}

export type EventLabel = '가두모집' | '동아리축제';

export const EVENT_TYPE_TO_LABEL: Record<EventType, EventLabel> = {
  RECRUITMENT: '가두모집',
  CLUB_FESTIVAL: '동아리축제',
};

export const LABEL_TO_EVENT_TYPE: Record<EventLabel, EventType> = {
  가두모집: 'RECRUITMENT',
  동아리축제: 'CLUB_FESTIVAL',
};
