import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronRight, FiAlertCircle, FiChevronDown } from 'react-icons/fi';
import MapSvg from '@/assets/map.svg';
import {
  getPerformancePreviewByDay,
  getPerformanceTimelineByDay,
  getRecentNotices,
  toNoticeLabel,
  type NoticeListItem,
} from '@/apis';
import {
  PERFORMANCE_PREVIEW_BY_DAY,
  PERFORMANCE_TIMELINE_BY_DAY,
  type DayKey,
  type PerformanceTimelineItem,
  SESSION_COLOR_MAP,
} from '@/constants/performanceTimetable';
import { SelectableButton } from '../SelectableButton';
import { useBoothTop3 } from '@/hooks/useBoothTop3';
import { useBoothCount } from '@/hooks/useBoothCount';
import { toMonthDayDot } from '@/lib/date';
import { NOTICE_CATEGORY_COLOR_MAP } from '@/constants/notice';
import { Badge } from '../Badge';
import { FaStar } from 'react-icons/fa';

type DayOption = {
  key: DayKey;
  label: string;
  date: string;
  queryDate: string;
};

type DayContent = {
  timetablePreview: PerformanceTimelineItem[];
  timetableTimeline: PerformanceTimelineItem[];
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
    timetableTimeline: PERFORMANCE_TIMELINE_BY_DAY.day1,
    noticePreview: [],
  },
  day2: {
    timetablePreview: PERFORMANCE_PREVIEW_BY_DAY.day2,
    timetableTimeline: PERFORMANCE_TIMELINE_BY_DAY.day2,
    noticePreview: [],
  },
};

function mapNoticesToPreview(items: NoticeListItem[]): DayContent['noticePreview'] {
  return items.slice(0, 3).map((item) => ({
    noticeId: item.noticeId,
    category: toNoticeLabel(item.type),
    title: item.title,
    date: toMonthDayDot(item.createdAt),
  }));
}

type SectionHeaderProps = {
  title: string;
  text?: string;
  description?: React.ReactNode;
  to?: string;
};

function TrendingBooths() {
  const { data: ranking, isLoading } = useBoothTop3();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex gap-2 justify-center items-center h-[96px] px-1">
        <div className="flex-1 w-[120px] h-[96px] bg-gray-100 animate-pulse rounded-xl" />
        <div className="flex-1 w-[120px] h-[96px] bg-gray-100 animate-pulse rounded-xl" />
        <div className="flex-1 w-[120px] h-[96px] bg-gray-100 animate-pulse rounded-xl" />
      </div>
    );
  }

  if (!ranking || ranking.length === 0) return null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center gap-2 px-1 relative z-20">
        {ranking.slice(0, 3).map((booth, index) => {
          const rank = index + 1;
          return (
            <button
              key={booth.boothId}
              onClick={() => navigate(`/booths/${booth.boothId}`)}
              className={`relative flex flex-col w-[120px] py-3 items-center justify-center gap-1 rounded-xl bg-secondary-yellow/10 transition-all active:scale-95`}
            >
              <div className="flex items-center justify-center gap-1">
                <span className={`typo-body-1 font-semibold text-base-deep `}>{rank}위</span>
              </div>
              <p className="text-center typo-body-2 font-medium line-clamp-2 text-base-deep flex items-center justify-center">
                {booth.boothName}
              </p>
              <div className="flex items-center gap-0.5">
                <FaStar className="text-secondary-yellow w-4 h-4" />
                <span className="text-secondary-yellow typo-body-3 font-semibold">
                  {booth.likeCount.toLocaleString()}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <p className="ml-1 mt-3 flex gap-1 items-center text-text-muted typo-caption select-none">
        <FiAlertCircle className="h-4 w-4 flex items-baseline text-text-muted" strokeWidth={1.5} />
        카드를 눌러 동아리 정보를 확인할 수 있어요
      </p>
    </div>
  );
}

function SectionHeader({ title, text, description, to }: SectionHeaderProps) {
  return (
    <div className="mb-3 mx-1 select-none">
      <div className="flex items-baseline justify-between gap-6">
        <div className="flex items-center gap-2">
          <h3 className="typo-heading-3 text-base-deep shrink-0">{title}</h3>
          {description && (
            <span className="typo-body-2 text-gray-500 leading-none">{description}</span>
          )}
        </div>
        {text && to && (
          <Link
            to={to}
            className="interactive-transition inline-flex items-center gap-1 typo-body-2 text-gray-500 hover:text-base-deep shrink-0"
          >
            {text}
            <FiChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}

function TimeTablePreviewCard({
  previewItems,
  totalCount,
  items,
  previewCount = 4,
}: {
  previewItems: DayContent['timetablePreview'];
  items: DayContent['timetablePreview'];
  totalCount: number;
  previewCount: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const displayItems = showAll ? items : previewItems.slice(0, previewCount);
  const groupedItems = useMemo(() => {
    const map = new Map<
      number,
      {
        sessionLabel: string;
        items: PerformanceTimelineItem[];
      }
    >();

    displayItems.forEach((item) => {
      const current = map.get(item.session);
      if (!current) {
        map.set(item.session, { sessionLabel: item.sessionLabel, items: [item] });
        return;
      }
      current.items.push(item);
    });

    return Array.from(map.entries()).map(([session, value]) => ({
      session,
      ...value,
    }));
  }, [displayItems]);

  return (
    <>
      <div className="rounded-2xl shadow-sm bg-white p-4 select-none">
        <div className="mb-4 mx-1 flex items-center justify-between">
          <p className="typo-body-1 font-medium text-base-deep">총 {totalCount}개의 공연</p>
          <div className="flex items-center gap-2">
            {Array.from(new Set(items.map((i) => i.session))).map((session) => {
              const color = SESSION_COLOR_MAP[session];
              const sessionLabel = items.find((i) => i.session === session)?.sessionLabel;
              return (
                <Badge key={session} className={`${color.text} ${color.badgeBg}`}>
                  {sessionLabel}
                </Badge>
              );
            })}
          </div>
        </div>
        <div className="space-y-3">
          {groupedItems.length > 0 ? (
            groupedItems.map((group) => (
              <div key={group.session} className="space-y-2">
                {group.items.map((item) => {
                  const color = SESSION_COLOR_MAP[item.session];
                  const rowClassName = `interactive-transition grid grid-cols-[90px_1fr] rounded-2xl px-5 py-4 ${color.bg} ${color.hoverBg}`;

                  const rowContent = (
                    <>
                      <p className={`typo-body-2 font-semibold ${color.text}`}>{item.time}</p>
                      <div className="min-w-0">
                        <p className="truncate typo-body-2 font-medium text-base-deep">
                          {item.title}
                        </p>
                      </div>
                    </>
                  );

                  if (item.boothId) {
                    return (
                      <Link
                        key={`${item.session}-${item.time}-${item.boothId}`}
                        to="/map"
                        state={{ selectedBoothId: item.boothId }}
                        className={rowClassName}
                        aria-label={`${item.title} 부스 위치로 이동`}
                      >
                        {rowContent}
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={`${item.session}-${item.time}-${item.title}`}
                      className={rowClassName}
                    >
                      {rowContent}
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="rounded-2xl bg-white/85 px-3 py-3 text-sm text-text-muted">
              등록된 타임테이블이 없습니다.
            </div>
          )}
        </div>
        {items.length > previewCount && (
          <div
            onClick={() => setShowAll((prev) => !prev)}
            className="mt-4 interactive-transition flex cursor-pointer items-center justify-center gap-1 typo-body-2 text-gray-500 hover:text-base-deep select-none"
          >
            <FiChevronDown
              className={`h-5 w-5 transition-transform duration-300 ease-in-out ${showAll ? 'rotate-180' : ''}`}
              strokeWidth={2}
              aria-hidden="true"
            />
            {showAll ? '간략히 보기' : '전체보기'}
          </div>
        )}
      </div>
      <p className="ml-1 mt-3 flex gap-1 items-center text-text-muted typo-caption select-none">
        <FiAlertCircle className="h-4 w-4 flex items-baseline text-text-muted" strokeWidth={1.5} />
        공연 카드를 누르면 해당 동아리의 지도 위치로 이동할 수 있어요
      </p>
    </>
  );
}

function NoticePreviewCard({ items }: { items: DayContent['noticePreview'] }) {
  return (
    <>
      <div className="rounded-2xl shadow-sm bg-white p-4 select-none">
        <div className="mb-4 ml-1 flex items-center justify-between">
          <p className="typo-body-1 font-medium text-base-deep">최근 공지 3건</p>
        </div>

        <div className="space-y-2">
          {items.length > 0 ? (
            items.map((item) => {
              const color = NOTICE_CATEGORY_COLOR_MAP[item.category];
              return (
                <Link
                  key={`${item.date}-${item.category}-${item.title}`}
                  to={item.noticeId ? `/notice/${item.noticeId}` : '/notice'}
                  aria-label={`${item.title} 상세 공지로 이동`}
                  className={`interactive-transition flex items-center justify-between rounded-2xl px-5 py-4 ${color.bg} ${color.hoverBg} hover:border-knu-gold/60`}
                >
                  <div className="interactive-transition grid min-w-0 grid-cols-[50px_1fr] items-center gap-2 rounded-2xl">
                    <p className={`typo-body-2 font-semibold ${color.text}`}>{item.date}</p>
                    <div className="flex min-w-0 items-center gap-[6px]">
                      <Badge className={`shrink-0 ${color.badgeBg} ${color.badgeText}`}>
                        {item.category}
                      </Badge>
                      <p className="min-w-0 flex-1 truncate typo-body-2 font-medium text-base-deep">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="rounded-2xl bg-white/85 px-3 py-3 text-sm text-text-muted">
              등록된 공지가 없습니다.
            </div>
          )}
        </div>
      </div>
      <p className="ml-1 mt-3 flex gap-1 items-center text-text-muted typo-caption select-none">
        <FiAlertCircle className="h-4 w-4 flex items-baseline text-text-muted" strokeWidth={1.5} />
        공지 원문과 분실물 상세 내용은 더보기에서 확인할 수 있어요
      </p>
    </>
  );
}

function MapPreviewCard() {
  const { count, isLoading } = useBoothCount();

  return (
    <Link
      to="/map"
      className="interactive-transition group block overflow-hidden rounded-2xl bg-white shadow-sm"
      aria-label="부스 배치도 지도 페이지로 이동"
    >
      <div className="relative h-56 overflow-hidden bg-secondary-blue/5">
        <img
          src={MapSvg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.02]"
          style={{ objectPosition: 'bottom 20%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent select-none" />
        <div className="absolute bottom-3 right-3 flex items-center justify-center rounded-full bg-white/95 px-3 h-8 shadow-sm transition-all active:scale-95">
          <span className="typo-body-2 font-medium text-primary leading-none">
            탭하여 지도 보기
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 px-4 py-4 select-none">
        <div className="min-w-0">
          <p className="typo-body-1 font-medium text-base-deep">
            {isLoading
              ? '부스 수 집계 중'
              : typeof count === 'number'
                ? `총 ${count}개의 동아리`
                : '전체 동아리를 지도에서 확인해보세요'}
          </p>
          <p className="mt-1 typo-body-2 text-gray-500">지도와 검색으로 쉽게 확인할 수 있어요</p>
        </div>
      </div>
    </Link>
  );
}

export default function HomeTab() {
  const [activeDay, setActiveDay] = useState<DayKey>('day1');
  const [contentByDay, setContentByDay] = useState<Record<DayKey, DayContent>>(DAY_CONTENT);

  const activeContent = useMemo(() => contentByDay[activeDay], [activeDay, contentByDay]);

  useEffect(() => {
    let isMounted = true;
    const fetchTimelineByDay = async () => {
      try {
        const [timetablePreview, timetableTimeline] = await Promise.all([
          getPerformancePreviewByDay(activeDay),
          getPerformanceTimelineByDay(activeDay),
        ]);
        if (!isMounted) return;
        setContentByDay((prev) => ({
          ...prev,
          [activeDay]: {
            ...prev[activeDay],
            timetablePreview,
            timetableTimeline,
          },
        }));
      } catch {
        if (!isMounted) return;
      }
    };
    void fetchTimelineByDay();
    return () => {
      isMounted = false;
    };
  }, [activeDay]);

  useEffect(() => {
    let isMounted = true;
    const fetchNoticePreview = async () => {
      try {
        const notices = await getRecentNotices();
        if (!isMounted) return;

        const noticePreview = mapNoticesToPreview(notices);
        setContentByDay((prev) => ({
          day1: { ...prev.day1, noticePreview },
          day2: { ...prev.day2, noticePreview },
        }));
      } catch {
        if (!isMounted) return;
      }
    };
    void fetchNoticePreview();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section aria-labelledby="home-day-toggle-title" className="rounded-t-[28px]">
      <h2 id="home-day-toggle-title" className="sr-only">
        가두모집 날짜별 홈 안내
      </h2>

      <div role="tablist" aria-label="날짜 선택" className="grid grid-cols-2 gap-2 sm:gap-3">
        {DAY_OPTIONS.map((day) => {
          const isActive = activeDay === day.key;

          return (
            <SelectableButton
              key={day.key}
              selected={isActive}
              onClick={() => setActiveDay(day.key)}
              className="whitespace-nowrap"
              aria-selected={isActive}
              aria-controls={`home-day-panel-${day.key}`}
              role="tab"
              id={`home-day-tab-${day.key}`}
            >
              {day.label} ·<span className="ml-1">{day.date}</span>
            </SelectableButton>
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
          <SectionHeader title="지금 뜨는 동아리" description="투표로 동아리를 응원해보세요" />
          <TrendingBooths />
        </section>
        <section aria-labelledby="home-timetable-title">
          <SectionHeader title="공연시간표" description="일청담 앞 중앙무대에서 만나요" />
          <TimeTablePreviewCard
            previewItems={
              activeDay === 'day2'
                ? activeContent.timetableTimeline
                : activeContent.timetablePreview
            }
            items={activeContent.timetableTimeline}
            totalCount={activeContent.timetableTimeline.length}
            previewCount={4}
          />
        </section>

        <section aria-labelledby="home-notice-title">
          <SectionHeader title="공지사항" text="더보기" to="/notice" />
          <NoticePreviewCard items={activeContent.noticePreview} />
        </section>

        <section aria-labelledby="home-map-preview-title">
          <SectionHeader title="부스 배치도" description="관심있는 동아리를 찾아보세요" />
          <div id="home-map-preview-title" className="sr-only">
            부스 배치도 미리보기
          </div>
          <MapPreviewCard />
        </section>
      </div>
    </section>
  );
}
