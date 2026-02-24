import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import MapSvg from '@/assets/map.svg';

type DayKey = 'day1' | 'day2';

type DayOption = {
  key: DayKey;
  label: string;
  date: string;
};

type DayContent = {
  timetablePreview: {
    time: string;
    title: string;
    location: string;
  }[];
  noticePreview: {
    category: '공지' | '분실물';
    title: string;
    date: string;
  }[];
};

const DAY_OPTIONS: DayOption[] = [
  { key: 'day1', label: 'DAY 1', date: '03.16' },
  { key: 'day2', label: 'DAY 2', date: '03.17' },
];

const DAY_CONTENT: Record<DayKey, DayContent> = {
  day1: {
    timetablePreview: [
      {
        time: '11:00',
        title: '운영 시작 안내',
        location: '백양로 메인 구간',
      },
      {
        time: '12:00',
        title: '동아리 공연 1부',
        location: '백양로 메인 무대',
      },
      {
        time: '14:00',
        title: '참여형 이벤트',
        location: '일청담 광장',
      },
    ],
    noticePreview: [
      {
        category: '공지',
        title: '1일차 운영 시간 및 우천 시 안내',
        date: '03.16',
      },
      {
        category: '공지',
        title: '백양로 일부 구간 동선 안내',
        date: '03.16',
      },
      {
        category: '분실물',
        title: '현장 분실물 접수 위치 안내',
        date: '03.16',
      },
    ],
  },
  day2: {
    timetablePreview: [
      {
        time: '11:00',
        title: '2일차 운영 시작',
        location: '백양로 메인 구간',
      },
      {
        time: '12:30',
        title: '동아리 공연 2부',
        location: '백양로 메인 무대',
      },
      {
        time: '15:00',
        title: '모집 상담 집중 시간',
        location: '백양로 · 일정담',
      },
    ],
    noticePreview: [
      {
        category: '공지',
        title: '2일차 부스 위치 업데이트 안내',
        date: '03.17',
      },
      {
        category: '공지',
        title: '프로그램 시간 변경 공지',
        date: '03.17',
      },
      {
        category: '분실물',
        title: '분실물 보관 현황 업데이트',
        date: '03.17',
      },
    ],
  },
};

function SectionHeader({ title, to, label }: { title: string; to: string; label: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="typo-heading-2 text-knu-gray">{title}</h3>
      <Link
        to={to}
        className="inline-flex items-center gap-1 text-sm font-semibold text-gray-400 transition hover:text-knu-lavender"
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
}: {
  dayLabel: string;
  items: DayContent['timetablePreview'];
}) {
  return (
    <div className="rounded-3xl border border-knu-mint/45 bg-knu-mint/10 p-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-knu-gray">{dayLabel} 타임테이블 미리보기</p>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-knu-lavender">
          일부 항목
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={`${item.time}-${item.title}`}
            className="grid grid-cols-[56px_1fr] gap-3 rounded-2xl border border-white/70 bg-white/80 px-3 py-3"
          >
            <p className="text-sm font-semibold text-knu-lavender">{item.time}</p>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-knu-gray">{item.title}</p>
              <p className="mt-1 truncate text-xs text-text-muted">{item.location}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-text-muted">
        상세 시간표 및 변경 사항은 타임테이블 더보기에서 확인해주세요.
      </p>
    </div>
  );
}

function NoticePreviewCard({
  dayLabel,
  items,
}: {
  dayLabel: string;
  items: DayContent['noticePreview'];
}) {
  return (
    <div className="rounded-3xl border border-knu-lavender/35 bg-knu-lavender/10 p-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-knu-gray">{dayLabel} 공지 미리보기</p>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-knu-lavender">
          최신 순
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={`${item.date}-${item.category}-${item.title}`}
            className="flex items-start justify-between gap-3 rounded-2xl border border-white/70 bg-white/80 px-3 py-3"
          >
            <div className="min-w-0">
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                  item.category === '공지'
                    ? 'bg-knu-red/10 text-knu-red'
                    : 'bg-knu-lavender/15 text-knu-lavender'
                }`}
              >
                {item.category}
              </span>
              <p className="mt-2 truncate text-sm font-semibold text-knu-gray">{item.title}</p>
            </div>
            <span className="shrink-0 text-xs font-medium text-gray-500">{item.date}</span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-text-muted">
        공지 원문, 분실물 상세 내용, 변경 사항은 공지사항 더보기에서 확인해주세요.
      </p>
    </div>
  );
}

function MapPreviewCard() {
  return (
    <Link
      to="/map"
      className="group block overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)]"
      aria-label="부스 배치도 지도 페이지로 이동"
    >
      <div className="relative h-36 overflow-hidden bg-gray-100">
        <img
          src={MapSvg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-top opacity-85 transition duration-200 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-knu-lavender">
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
        <span className="mt-0.5 shrink-0 text-sm font-semibold text-knu-lavender">OPEN</span>
      </div>
    </Link>
  );
}

export default function HomeTab() {
  const [activeDay, setActiveDay] = useState<DayKey>('day1');

  const activeContent = useMemo(() => DAY_CONTENT[activeDay], [activeDay]);

  return (
    <section aria-labelledby="home-day-toggle-title" className="rounded-t-[28px] bg-white pt-3">
      <h2 id="home-day-toggle-title" className="sr-only">
        가두모집 날짜별 홈 안내
      </h2>

      <div className="">
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
                className={`rounded-full border px-3 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'border-knu-lavender bg-knu-lavender text-white shadow-md'
                    : 'border-knu-lavender/40 bg-white text-knu-lavender'
                }`}
              >
                <span className="whitespace-nowrap">
                  {day.label} <span className="ml-1">{day.date}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`home-day-panel-${activeDay}`}
        role="tabpanel"
        aria-labelledby={`home-day-tab-${activeDay}`}
        className="space-y-8 pt-6"
      >
        <section aria-labelledby="home-map-preview-title">
          <SectionHeader title="부스 배치도" to="/map" label="더보기" />
          <div id="home-map-preview-title" className="sr-only">
            부스 배치도 미리보기
          </div>
          <MapPreviewCard />
        </section>

        <section aria-labelledby="home-timetable-title">
          <SectionHeader title="타임테이블" to="/timetable" label="더보기" />
          <TimeTablePreviewCard
            dayLabel={activeDay === 'day1' ? 'DAY 1' : 'DAY 2'}
            items={activeContent.timetablePreview}
          />
        </section>

        <section aria-labelledby="home-notice-title">
          <SectionHeader title="공지사항" to="/notice" label="더보기" />
          <NoticePreviewCard
            dayLabel={activeDay === 'day1' ? 'DAY 1' : 'DAY 2'}
            items={activeContent.noticePreview}
          />
        </section>
      </div>
    </section>
  );
}
