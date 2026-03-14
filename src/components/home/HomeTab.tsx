import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiAlertCircle, FiChevronDown } from 'react-icons/fi';
import MapSvg from '@/assets/map.svg';
import { getNotices, toNoticeLabel, type NoticeListItem } from '@/apis';
import {
  PERFORMANCE_PREVIEW_BY_DAY,
  PERFORMANCE_TIMELINE_BY_DAY,
  type DayKey,
  type PerformanceTimelineItem,
  SESSION_COLOR_MAP,
} from '@/constants/performanceTimetable';
import { SelectableButton } from '../SelectableButton';
import { useBooths } from '@/hooks/useBooths';
import { toMonthDayDot } from '@/lib/date';
import { NOTICE_CATEGORY_COLOR_MAP } from '@/constants/notice';
import { Badge } from '../Badge';

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
  totalCount,
  items,
  previewCount = 4,
}: {
  dayLabel: string;
  items: DayContent['timetablePreview'];
  totalCount: number;
  previewCount: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const displayItems = showAll ? items : items.slice(0, previewCount);

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
        <div className="space-y-2">
          {displayItems.length > 0 ? (
            displayItems.map((item) => {
              const color = SESSION_COLOR_MAP[item.session];
              return (
                <div
                  key={`${item.time}-${item.title}`}
                  className={`interactive-transition grid grid-cols-[90px_1fr] rounded-2xl px-5 py-4 ${color.bg} ${color.hoverBg}`}
                >
                  <p className={`typo-body-2 font-semibold ${color.text}`}>{item.time}</p>
                  <div className="min-w-0">
                    <p className="truncate typo-body-2 font-medium text-base-deep">{item.title}</p>
                  </div>
                </div>
              );
            })
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
        현장 상황에 따라 공연 시간이 일부 변경될 수 있어요
      </p>
    </>
  );
}

function NoticePreviewCard({
  items,
}: {
  dayLabel: string;
  items: DayContent['noticePreview'];
  isLoading: boolean;
}) {
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
                  className={`interactive-transition flex items-center justify-between gap-3 rounded-2xl px-5 py-4 ${color.bg} ${color.hoverBg} hover:border-knu-gold/60`}
                >
                  <div
                    className={`interactive-transition grid grid-cols-[50px_1fr] rounded-2xl py-4}`}
                  >
                    <p className={`typo-body-2 font-semibold ${color.text}`}>{item.date}</p>
                    <div className="flex items-center gap-[6px]">
                      <Badge className={`${color.badgeBg} ${color.badgeText}`}>
                        {item.category}
                      </Badge>
                      <p className="truncate typo-body-2 font-medium text-base-deep">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="rounded-2xl bg-white px-3 py-3 text-sm text-text-muted">
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
  const { booths } = useBooths();

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
          <p className="typo-body-1 font-medium text-base-deep">총 {booths.length}개의 동아리</p>
          <p className="mt-1 typo-body-2 text-gray-500">지도와 검색으로 쉽게 확인할 수 있어요</p>
        </div>
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

  useEffect(() => {
    let isMounted = true;
    const fetchNoticePreview = async () => {
      setNoticeLoadingByDay((prev) => ({ ...prev, [activeDay]: true }));
      try {
        const notices = await getNotices();
        if (!isMounted) return;

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
        if (!isMounted) return;
      } finally {
        if (isMounted) setNoticeLoadingByDay((prev) => ({ ...prev, [activeDay]: false }));
      }
    };
    void fetchNoticePreview();
    return () => {
      isMounted = false;
    };
  }, [activeDay]);

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
          <SectionHeader title="공연시간표" description="일청담 앞 중앙무대에서 만나요" />
          <TimeTablePreviewCard
            dayLabel={activeDay === 'day1' ? 'DAY 1' : 'DAY 2'}
            items={PERFORMANCE_TIMELINE_BY_DAY[activeDay]}
            totalCount={PERFORMANCE_TIMELINE_BY_DAY[activeDay].length}
            previewCount={4}
          />
        </section>

        <section aria-labelledby="home-notice-title">
          <SectionHeader title="공지사항" text="더보기" to="/notice" />
          <NoticePreviewCard
            dayLabel={activeDay === 'day1' ? 'DAY 1' : 'DAY 2'}
            items={activeContent.noticePreview}
            isLoading={noticeLoadingByDay[activeDay]}
          />
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
