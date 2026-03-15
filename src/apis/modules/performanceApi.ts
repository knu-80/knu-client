import { ENDPOINTS } from '@/apis/endpoints';
import { unwrapApiResponse } from '@/apis/error';
import { http } from '@/apis/http';
import type { ApiResponse } from '@/apis/types';
import {
  PERFORMANCE_PREVIEW_BY_DAY,
  PERFORMANCE_TIMELINE_BY_DAY,
  type DayKey,
  type PerformanceTimelineItem,
} from '@/constants/performanceTimetable';

interface PerformanceResponseItem {
  id: number;
  date: string;
  session: number;
  startAt: string;
  endAt: string;
  boothId: number;
  boothName: string;
}

const DAY_DATE_MAP: Record<DayKey, string> = {
  day1: '2026-03-16',
  day2: '2026-03-17',
};

function formatTimeRange(startAt: string, endAt: string): string {
  const toTime = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return `${toTime(startAt)}-${toTime(endAt)}`;
}

function toTimelineItem(item: PerformanceResponseItem): PerformanceTimelineItem {
  return {
    time: formatTimeRange(item.startAt, item.endAt),
    title: item.boothName,
    session: item.session,
    location: '가두모집 중앙무대',
    sessionLabel: `${item.session}회차`,
    boothId: item.boothId,
  };
}

function buildSessionPreview(items: PerformanceTimelineItem[]): PerformanceTimelineItem[] {
  const bySession = new Map<number, PerformanceTimelineItem[]>();

  items.forEach((item) => {
    const list = bySession.get(item.session) ?? [];
    list.push(item);
    bySession.set(item.session, list);
  });

  return Array.from(bySession.values()).flatMap((sessionItems) => sessionItems.slice(0, 2));
}

async function getAllPerformances(): Promise<PerformanceResponseItem[]> {
  const { data } = await http.get<ApiResponse<PerformanceResponseItem[]>>(ENDPOINTS.performances);
  return unwrapApiResponse(data);
}

export async function getPerformanceTimelineByDay(day: DayKey): Promise<PerformanceTimelineItem[]> {
  try {
    const apiItems = await getAllPerformances();
    const timeline = apiItems
      .filter((item) => item.date === DAY_DATE_MAP[day])
      .sort((a, b) => {
        if (a.session !== b.session) return a.session - b.session;
        return new Date(a.startAt).getTime() - new Date(b.startAt).getTime();
      })
      .map(toTimelineItem);

    return timeline.length > 0 ? timeline : PERFORMANCE_TIMELINE_BY_DAY[day];
  } catch {
    return PERFORMANCE_TIMELINE_BY_DAY[day];
  }
}

export async function getPerformancePreviewByDay(day: DayKey): Promise<PerformanceTimelineItem[]> {
  const timeline = await getPerformanceTimelineByDay(day);
  if (timeline.length === 0) {
    return PERFORMANCE_PREVIEW_BY_DAY[day];
  }

  return buildSessionPreview(timeline);
}
