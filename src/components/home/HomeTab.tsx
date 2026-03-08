import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import MapSvg from '@/assets/map.svg';
import { getNotices, toNoticeLabel, type NoticeListItem } from '@/apis';
import {
  PERFORMANCE_PREVIEW_BY_DAY,
  PERFORMANCE_TIMELINE_BY_DAY,
  type DayKey,
  type PerformanceTimelineItem,
} from '@/constants/performanceTimetable';

type DayOption = {
  key: DayKey;
  label: string;
  date: string;
  queryDate: string;
};

type DayContent = {
  timetablePreview: PerformanceTimelineItem[];
  noticePreview: {
    noticeId?: number;
    category: '공지' | '분실물';
    title: string;
    date: string;
  }[];
};

const DAY_OPTIONS: DayOption[] = [
  { key: 'day1', label: 'DAY 1', date: '03.16', queryDate: '2026-03-16' },
  { key: 'day2', label: 'DAY 2', date: '03.17', queryDate: '2026-03-17' },
];

const DAY_CONTENT: Record<DayKey, DayContent> = {
  day1: {
    timetablePreview: PERFORMANCE_PREVIEW_BY_DAY.day1,
    noticePreview: [
      {
        noticeId: undefined,
        category: '공지',
        title: '1일차 운영 시간 및 우천 시 안내',
        date: '03.16',
      },
      {
        noticeId: undefined,
        category: '공지',
        title: '백양로 일부 구간 동선 안내',
        date: '03.16',
      },
      {
        noticeId: undefined,
        category: '분실물',
        title: '현장 분실물 접수 위치 안내',
        date: '03.16',
      },
    ],
  },
  day2: {
    timetablePreview: PERFORMANCE_PREVIEW_BY_DAY.day2,
    noticePreview: [
      {
        noticeId: undefined,
        category: '공지',
        title: '2일차 부스 위치 업데이트 안내',
        date: '03.17',
      },
      {
        noticeId: undefined,
        category: '공지',
        title: '프로그램 시간 변경 공지',
        date: '03.17',
      },
      {
        noticeId: undefined,
        category: '분실물',
        title: '분실물 보관 현황 업데이트',
        date: '03.17',
      },
    ],
  },
};

function getDatePart(value: string): string {
  const [datePart] = value.split('T');
  return datePart ?? '';
}

function toDotDate(value: string): string {
  const datePart = getDatePart(value);
  const [, month = '00', day = '00'] = datePart.split('-');
  return `${month}.${day}`;
}

function mapNoticesToPreview(items: NoticeListItem[]): DayContent['noticePreview'] {
  return items.slice(0, 3).map((item) => ({
    noticeId: item.noticeId,
    category: toNoticeLabel(item.type),
    title: item.title,
    date: toDotDate(item.createdAt),
  }));
}

function SectionHeader({ title, to, label }: { title: string; to: string; label: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="typo-heading-2 text-knu-gray">{title}</h3>
      <Link
        to={to}
        className="inline-flex items-center gap-1 text-sm font-semibold text-knu-gray/75 transition hover:text-knu-red"
      >
        {label}
        <FiChevronRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

function TimeTablePreviewCard({
  dayLabel,
  items,
  totalCount,
}: {
  dayLabel: string;
  items: DayContent['timetablePreview'];
  totalCount: number;
}) {
  return (
    <div className="rounded-3xl border border-knu-gold/30 bg-white p-4 shadow-[0_3px_10px_rgba(15,23,42,0.05)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-knu-gray">{dayLabel} 공연 미리보기</p>
        <span className="rounded-full bg-knu-gold/10 px-2.5 py-1 text-xs font-semibold text-knu-gold">
          총 {totalCount}개
        </span>
      </div>

      <div className="space-y-2">
        {items.length > 0 ? (
          items.map((item) => (
            <Link
              key={`${item.time}-${item.title}`}
              to="/timetable"
              aria-label={`${item.title} 상세 타임테이블로 이동`}
              className="grid grid-cols-[96px_1fr] gap-3 rounded-2xl border border-knu-silver/50 bg-knu-gold/5 px-3 py-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition hover:border-knu-gold/60 hover:bg-knu-gold/10"
            >
              <p className="text-sm font-semibold text-knu-gold">{item.time}</p>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-knu-gray">{item.title}</p>
                <p className="mt-1 truncate text-xs font-medium text-knu-gray/70">
                  {item.sessionLabel}
                </p>
                <p className="mt-1 truncate text-xs text-text-muted">{item.location}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="rounded-2xl bg-white/85 px-3 py-3 text-sm text-text-muted">
            등록된 타임테이블이 없습니다.
          </div>
        )}
      </div>

      <p className="mt-3 text-xs text-text-muted">
        전체 공연 순서와 회차 정보는 더보기에서 확인할 수 있습니다.
      </p>
    </div>
  );
}

function NoticePreviewCard({
  dayLabel,
  items,
  isLoading,
}: {
  dayLabel: string;
  items: DayContent['noticePreview'];
  isLoading: boolean;
}) {
  return (
    <div className="rounded-3xl border border-knu-silver/65 bg-white p-4 shadow-[0_3px_10px_rgba(15,23,42,0.05)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-knu-gray">{dayLabel} 공지 미리보기</p>
        <span className="rounded-full bg-knu-silver/20 px-2.5 py-1 text-xs font-medium text-knu-gray">
          최신 순
        </span>
      </div>

      <div className="space-y-2">
        {isLoading ? (
          <div className="rounded-2xl bg-white px-3 py-3 text-sm text-text-muted">
            데이터를 불러오는 중입니다...
          </div>
        ) : items.length > 0 ? (
          items.map((item) => (
            <Link
              key={`${item.date}-${item.category}-${item.title}`}
              to={item.noticeId ? `/notice/${item.noticeId}` : '/notice'}
              aria-label={`${item.title} 상세 공지로 이동`}
              className="flex items-start justify-between gap-3 rounded-2xl border border-knu-silver/45 bg-knu-silver/10 px-3 py-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition hover:border-knu-gold/60 hover:bg-knu-silver/20"
            >
              <div className="min-w-0">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                    item.category === '공지'
                      ? 'bg-knu-red/10 text-knu-red'
                      : 'bg-knu-gray/15 text-knu-gray'
                  }`}
                >
                  {item.category}
                </span>
                <p className="mt-2 truncate text-sm font-semibold text-knu-gray">{item.title}</p>
              </div>
              <span className="shrink-0 text-xs font-medium text-gray-500">{item.date}</span>
            </Link>
          ))
        ) : (
          <div className="rounded-2xl bg-white px-3 py-3 text-sm text-text-muted">
            등록된 공지가 없습니다.
          </div>
        )}
      </div>

      <p className="mt-3 text-xs text-text-muted">
        공지 원문, 분실물 상세 내용, 변경 사항은 더보기에서 확인해주세요.
      </p>
    </div>
  );
}

function MapPreviewCard() {
  return (
    <Link
      to="/map"
      className="group block overflow-hidden rounded-3xl border border-knu-silver/65 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition hover:border-knu-gold/55 hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)]"
      aria-label="부스 배치도 지도 페이지로 이동"
    >
      <div className="relative h-36 overflow-hidden bg-knu-silver/20">
        <img
          src={MapSvg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-top opacity-85 transition duration-200 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-knu-red">
          탭하여 지도 보기
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 px-4 py-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-knu-gray">부스 배치도</p>
          <p className="mt-1 text-xs leading-4 text-text-muted">
            전체 배치도에서 부스 위치를 확인하고 탐색할 수 있어요.
          </p>
        </div>
        <span className="mt-0.5 shrink-0 text-sm font-semibold text-knu-red">OPEN</span>
      </div>
    </Link>
  );
}

export default function HomeTab() {
  const [activeDay, setActiveDay] = useState<DayKey>('day1');
  const [contentByDay, setContentByDay] = useState<Record<DayKey, DayContent>>(DAY_CONTENT);
  const [noticeLoadingByDay, setNoticeLoadingByDay] = useState<Record<DayKey, boolean>>({
    day1: false,
    day2: false,
  });

  const activeContent = useMemo(() => contentByDay[activeDay], [activeDay, contentByDay]);
  const activeOption = useMemo(
    () => DAY_OPTIONS.find((day) => day.key === activeDay) ?? DAY_OPTIONS[0],
    [activeDay],
  );

  useEffect(() => {
    let isMounted = true;

    const fetchNoticePreview = async () => {
      setNoticeLoadingByDay((prev) => ({ ...prev, [activeDay]: true }));

      try {
        const notices = await getNotices({
          day: activeOption.queryDate,
          size: 6,
          sort: 'createdAt,desc',
        });

        if (!isMounted) {
          return;
        }

        const noticePreview = mapNoticesToPreview(notices);
        setContentByDay((prev) => ({
          ...prev,
          [activeDay]: {
            timetablePreview: PERFORMANCE_PREVIEW_BY_DAY[activeDay],
            noticePreview:
              noticePreview.length > 0 ? noticePreview : DAY_CONTENT[activeDay].noticePreview,
          },
        }));
      } catch {
        if (!isMounted) {
          return;
        }
        setContentByDay((prev) => ({
          ...prev,
          [activeDay]: {
            timetablePreview: PERFORMANCE_PREVIEW_BY_DAY[activeDay],
            noticePreview: DAY_CONTENT[activeDay].noticePreview,
          },
        }));
      } finally {
        if (isMounted) {
          setNoticeLoadingByDay((prev) => ({ ...prev, [activeDay]: false }));
        }
      }
    };

    void fetchNoticePreview();

    return () => {
      isMounted = false;
    };
  }, [activeDay, activeOption.queryDate]);

  return (
    <section aria-labelledby="home-day-toggle-title" className="rounded-t-[28px]">
      <h2 id="home-day-toggle-title" className="sr-only">
        가두모집 날짜별 홈 안내
      </h2>

      <div
        role="tablist"
        aria-label="가두모집 날짜 선택"
        className="grid grid-cols-2 gap-2 sm:gap-3"
      >
        {DAY_OPTIONS.map((day) => {
          const isActive = activeDay === day.key;

          return (
            <button
              key={day.key}
              id={`home-day-tab-${day.key}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`home-day-panel-${day.key}`}
              onClick={() => setActiveDay(day.key)}
              className={`rounded-full px-3 py-2.5 text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-knu-red text-white shadow-[0_6px_14px_rgba(230,0,0,0.28)]'
                  : 'bg-white text-knu-gray shadow-[inset_0_0_0_1px_rgba(204,204,204,0.9)] hover:text-knu-gold hover:shadow-[inset_0_0_0_1px_rgba(191,124,38,0.5)]'
              }`}
            >
              <span className="whitespace-nowrap">
                {day.label} <span className="ml-1">{day.date}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`home-day-panel-${activeDay}`}
        role="tabpanel"
        aria-labelledby={`home-day-tab-${activeDay}`}
        className="space-y-14 pt-10"
      >
        <section aria-labelledby="home-timetable-title">
          <SectionHeader title="타임테이블" to="/timetable" label="더보기" />
          <TimeTablePreviewCard
            dayLabel={activeDay === 'day1' ? 'DAY 1' : 'DAY 2'}
            items={activeContent.timetablePreview}
            totalCount={PERFORMANCE_TIMELINE_BY_DAY[activeDay].length}
          />
        </section>

        <section aria-labelledby="home-notice-title">
          <SectionHeader title="공지사항" to="/notice" label="더보기" />
          <NoticePreviewCard
            dayLabel={activeDay === 'day1' ? 'DAY 1' : 'DAY 2'}
            items={activeContent.noticePreview}
            isLoading={noticeLoadingByDay[activeDay]}
          />
        </section>

        <section aria-labelledby="home-map-preview-title">
          <SectionHeader title="부스 배치도" to="/map" label="더보기" />
          <div id="home-map-preview-title" className="sr-only">
            부스 배치도 미리보기
          </div>
          <MapPreviewCard />
        </section>
      </div>
    </section>
  );
}
