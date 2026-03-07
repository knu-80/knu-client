export type DayKey = 'day1' | 'day2';

export type PerformanceTimelineItem = {
  time: string;
  title: string;
  location: string;
};

export const PERFORMANCE_TIMELINE_BY_DAY: Record<DayKey, PerformanceTimelineItem[]> = {
  day1: [
    {
      time: '12:00 - 12:30',
      title: '밴드 공연',
      location: '백양로 메인 무대',
    },
    {
      time: '12:30 - 13:00',
      title: '댄스 공연',
      location: '백양로 메인 무대',
    },
    {
      time: '14:00 - 14:30',
      title: '힙합 공연',
      location: '백양로 메인 무대',
    },
  ],
  day2: [
    {
      time: '12:00 - 12:30',
      title: '보컬 공연',
      location: '일청담 무대',
    },
    {
      time: '13:00 - 13:30',
      title: '어쿠스틱 공연',
      location: '일청담 무대',
    },
    {
      time: '15:00 - 15:30',
      title: '연합 피날레 공연',
      location: '백양로 메인 무대',
    },
  ],
};
