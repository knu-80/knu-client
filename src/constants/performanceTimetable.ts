export type DayKey = 'day1' | 'day2';

export type PerformanceSetItem = {
  time: string;
  title: string;
};

export type PerformanceSet = {
  id: string;
  sessionLabel: string;
  date: string;
  location: string;
  items: PerformanceSetItem[];
};

export type PerformanceTimelineItem = {
  time: string;
  title: string;
  location: string;
  sessionLabel: string;
};

export const PERFORMANCE_SETS_BY_DAY: Record<DayKey, PerformanceSet[]> = {
  day1: [
    {
      id: 'day1-lunch',
      sessionLabel: '1회차 (3월 16일 점심)',
      date: '2026-03-16',
      location: '가두모집 무대',
      items: [
        { time: '12:00-12:20', title: '익스프레션' },
        { time: '12:20-12:40', title: '터프시커리' },
        { time: '12:40-13:00', title: '그랜드챕스' },
        { time: '13:00-13:20', title: '일렉스' },
        { time: '13:20-13:40', title: '쌩목' },
      ],
    },
    {
      id: 'day1-dinner',
      sessionLabel: '2회차 (3월 16일 저녁)',
      date: '2026-03-16',
      location: '가두모집 무대',
      items: [
        { time: '17:45-18:05', title: '농악반' },
        { time: '18:05-18:25', title: '그랜드챕스' },
        { time: '18:25-18:45', title: '플레이아데스' },
        { time: '18:45-19:05', title: '싸울아비' },
        { time: '19:05-19:25', title: '쌩목' },
      ],
    },
  ],
  day2: [
    {
      id: 'day2-lunch',
      sessionLabel: '3회차 (3월 17일 점심)',
      date: '2026-03-17',
      location: '가두모집 무대',
      items: [
        { time: '12:00-12:20', title: '우리노래반' },
        { time: '12:20-12:40', title: '터프시커리' },
        { time: '12:40-13:00', title: '청음반' },
        { time: '13:00-13:20', title: '일렉스' },
      ],
    },
  ],
};

function flattenPerformanceSet(sets: PerformanceSet[]): PerformanceTimelineItem[] {
  return sets.flatMap((set) =>
    set.items.map((item) => ({
      time: item.time,
      title: item.title,
      location: set.location,
      sessionLabel: set.sessionLabel,
    })),
  );
}

export const PERFORMANCE_TIMELINE_BY_DAY: Record<DayKey, PerformanceTimelineItem[]> = {
  day1: flattenPerformanceSet(PERFORMANCE_SETS_BY_DAY.day1),
  day2: flattenPerformanceSet(PERFORMANCE_SETS_BY_DAY.day2),
};

function buildPreviewFromSets(sets: PerformanceSet[]): PerformanceTimelineItem[] {
  return sets.flatMap((set) =>
    set.items.slice(0, 2).map((item) => ({
      time: item.time,
      title: item.title,
      location: set.location,
      sessionLabel: set.sessionLabel,
    })),
  );
}

export const PERFORMANCE_PREVIEW_BY_DAY: Record<DayKey, PerformanceTimelineItem[]> = {
  day1: buildPreviewFromSets(PERFORMANCE_SETS_BY_DAY.day1),
  day2: buildPreviewFromSets(PERFORMANCE_SETS_BY_DAY.day2),
};
