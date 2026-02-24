import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiCalendar, FiChevronRight, FiInfo } from 'react-icons/fi';

type DayKey = 'day1' | 'day2';

type DayOption = {
  key: DayKey;
  label: string;
  date: string;
};

type DayContent = {
  timetableMessage: string;
  timetableSubMessage: string;
  noticeMessage: string;
  noticeSubMessage: string;
};

const DAY_OPTIONS: DayOption[] = [
  { key: 'day1', label: 'DAY 1', date: '03.16' },
  { key: 'day2', label: 'DAY 2', date: '03.17' },
];

const DAY_CONTENT: Record<DayKey, DayContent> = {
  day1: {
    timetableMessage: '가두모집 1일차 운영 시간과 주요 공연 순서를 이벤트 탭에서 확인하세요.',
    timetableSubMessage: '홈에서는 핵심 안내만 제공하고 상세 시간표는 더보기에서 확인할 수 있어요.',
    noticeMessage:
      '1일차 공지, 우천 안내, 위치 변경 및 분실물 접수 공지를 공지사항 탭에서 확인하세요.',
    noticeSubMessage: '실시간 업데이트는 공지사항 기준으로 반영됩니다.',
  },
  day2: {
    timetableMessage: '가두모집 2일차 운영 시간과 프로그램 변경 사항은 이벤트 탭에서 확인하세요.',
    timetableSubMessage: '2일차 일정은 현장 상황에 따라 조정될 수 있어 상세 화면 확인이 필요해요.',
    noticeMessage:
      '2일차 부스 위치 업데이트와 운영 안내, 분실물 공지는 공지사항 탭에서 확인하세요.',
    noticeSubMessage: '공지사항 탭에서 최신 순으로 확인하는 것을 권장합니다.',
  },
};

function SectionHeader({ title, to, label }: { title: string; to: string; label: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="typo-heading-2 text-knu-gray">{title}</h3>
      <Link
        to={to}
        className="inline-flex items-center gap-1 text-sm font-semibold text-[#9f9f9f] transition hover:text-[#7d6ea8]"
      >
        {label}
        <FiChevronRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

function InfoGuideCard({
  icon,
  title,
  message,
  subMessage,
  tone = 'blue',
}: {
  icon: 'calendar' | 'bell';
  title: string;
  message: string;
  subMessage: string;
  tone?: 'blue' | 'purple';
}) {
  const Icon = icon === 'calendar' ? FiCalendar : FiBell;

  return (
    <div
      className={`rounded-3xl border p-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)] ${
        tone === 'blue' ? 'border-[#c5effc] bg-[#f5fcff]' : 'border-[#eadfff] bg-[#faf7ff]'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
            tone === 'blue' ? 'bg-[#22c7f2]/15 text-[#22c7f2]' : 'bg-[#7d6ea8]/12 text-[#7d6ea8]'
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-knu-gray">{title}</p>
          <p className="mt-1 text-sm leading-5 text-gray-700">{message}</p>
          <p className="mt-2 text-xs leading-4 text-text-muted">{subMessage}</p>
        </div>
      </div>
    </div>
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

      <div className="rounded-[24px] bg-[#f5f3f7] p-4">
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
                    ? 'border-[#22c7f2] bg-[#22c7f2] text-white shadow-[0_6px_16px_rgba(34,199,242,0.24)]'
                    : 'border-[#aee9fb] bg-white text-[#22c7f2]'
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
        <section aria-labelledby="home-timetable-title">
          <SectionHeader title="타임테이블" to="/event" label="더보기" />
          <InfoGuideCard
            icon="calendar"
            title={`${activeDay === 'day1' ? 'DAY 1' : 'DAY 2'} 시간표 안내`}
            message={activeContent.timetableMessage}
            subMessage={activeContent.timetableSubMessage}
            tone="blue"
          />
        </section>

        <section aria-labelledby="home-notice-title">
          <SectionHeader title="공지사항" to="/notice" label="더보기" />
          <InfoGuideCard
            icon="bell"
            title={`${activeDay === 'day1' ? 'DAY 1' : 'DAY 2'} 공지 안내`}
            message={activeContent.noticeMessage}
            subMessage={activeContent.noticeSubMessage}
            tone="purple"
          />
        </section>

        <div className="rounded-3xl border border-gray-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
              <FiInfo className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-knu-gray">
                홈에서는 핵심 안내만 먼저 보여드려요.
              </p>
              <p className="mt-1 text-xs leading-4 text-text-muted">
                자세한 운영 시간표, 공지 원문, 분실물 상세 내용은 각 탭의 더보기에서 확인해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
