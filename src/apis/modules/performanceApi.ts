import {
  PERFORMANCE_PREVIEW_BY_DAY,
  PERFORMANCE_TIMELINE_BY_DAY,
  type DayKey,
  type PerformanceTimelineItem,
} from '@/constants/performanceTimetable';

export async function getPerformancePreviewByDay(day: DayKey): Promise<PerformanceTimelineItem[]> {
  return PERFORMANCE_PREVIEW_BY_DAY[day];
}

export async function getPerformanceTimelineByDay(day: DayKey): Promise<PerformanceTimelineItem[]> {
  return PERFORMANCE_TIMELINE_BY_DAY[day];
}
