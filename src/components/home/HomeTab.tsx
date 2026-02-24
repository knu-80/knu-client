import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiBell,
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiInfo,
  FiMapPin,
} from 'react-icons/fi';

import EventInfo from '@/components/home/EventInfo';
import QuickMenu from '@/components/home/QuickMenu';

type TabKey = 'quick' | 'notice' | 'schedule';

type TabItem = {
  key: TabKey;
  label: string;
};

const TAB_ITEMS: TabItem[] = [
  { key: 'quick', label: '바로 이용' },
  { key: 'notice', label: '공지 · 안내' },
  { key: 'schedule', label: '가두모집 일정' },
];

const NOTICE_PREVIEWS = [
  { id: 1, category: '공지', title: '가두모집 운영 시간 및 우천 시 안내', date: '03.10' },
  { id: 2, category: '분실물', title: '학생회관 인근 분실물 접수 방법 안내', date: '03.10' },
  { id: 3, category: '공지', title: '부스별 모집 위치 업데이트', date: '03.09' },
] as const;

const EVENT_HIGHLIGHTS = [
  { time: '11:30', title: '오프닝 무대', location: '백양로 메인 무대' },
  { time: '13:00', title: '동아리 공연 릴레이', location: '백양로 메인 무대' },
  { time: '15:30', title: '참여형 이벤트', location: '일청담 광장' },
] as const;

function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="h-5 w-1 rounded-full bg-knu-red" aria-hidden="true" />
        <h3 className="typo-heading-3 text-knu-gray">{title}</h3>
      </div>
      {action}
    </div>
  );
}

function QuickUsePanel() {
  return (
    <div className="space-y-5">
      <section
        aria-labelledby="home-today-status-title"
        className="rounded-3xl border border-[#e9defa] bg-gradient-to-br from-[#f8f4ff] to-white p-4"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.1em] text-[#7d6ea8]">TODAY STATUS</p>
            <h3 id="home-today-status-title" className="typo-heading-3 mt-1 text-[#111827]">
              가두모집 진행 정보
            </h3>
            <p className="typo-body-2 mt-1 text-gray-600">
              3.11 - 3.12 일정은 공지사항 탭에서 실시간으로 확인할 수 있어요.
            </p>
          </div>
          <span className="rounded-full bg-[#7d6ea8] px-3 py-1 text-xs font-semibold text-white">
            운영중
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Link
            to="/map"
            className="flex items-center justify-between rounded-2xl bg-[#7d6ea8] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(77,54,121,0.16)]"
          >
            <span className="flex items-center gap-2">
              <FiMapPin className="h-4 w-4" aria-hidden="true" />
              지도에서 부스 찾기
            </span>
            <FiArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/notice"
            className="flex items-center justify-between rounded-2xl border border-[#dcd2f3] bg-white px-4 py-3 text-sm font-semibold text-[#56427d]"
          >
            <span className="flex items-center gap-2">
              <FiBell className="h-4 w-4" aria-hidden="true" />
              공지 확인하기
            </span>
            <FiArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="home-quick-menu-title">
        <SectionTitle title="빠른 메뉴" />
        <QuickMenu />
      </section>
    </div>
  );
}

function NoticePanel() {
  return (
    <div className="space-y-5">
      <section aria-labelledby="home-notice-preview-title">
        <SectionTitle
          title="최신 공지"
          action={
            <Link
              to="/notice"
              className="flex items-center gap-1 text-sm font-semibold text-[#7d6ea8] hover:opacity-80"
            >
              전체 보기
              <FiChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />

        <div className="space-y-3">
          {NOTICE_PREVIEWS.map((notice) => (
            <Link
              key={notice.id}
              to={`/notice/${notice.id}`}
              className="flex items-start justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition-colors hover:bg-gray-50"
            >
              <div className="min-w-0">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                    notice.category === '공지'
                      ? 'bg-knu-red/10 text-knu-red'
                      : 'bg-[#7d6ea8]/10 text-[#7d6ea8]'
                  }`}
                >
                  {notice.category}
                </span>
                <p className="mt-2 truncate text-sm font-semibold text-[#111827]">{notice.title}</p>
              </div>
              <span className="shrink-0 text-xs font-medium text-gray-500">{notice.date}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="home-onsite-info-title">
        <SectionTitle title="현장 이용 정보" />
        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-knu-red" aria-hidden="true" />
              <span>안내 부스 위치: 백양로 중앙 안내부스 (문의 및 현장 안내)</span>
            </li>
            <li className="flex items-start gap-2">
              <FiBell className="mt-0.5 h-4 w-4 shrink-0 text-knu-red" aria-hidden="true" />
              <span>분실물 접수 및 수령 위치는 공지사항 탭에서 실시간으로 확인 가능합니다.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function SchedulePanel() {
  return (
    <div className="space-y-5">
      <section aria-labelledby="home-event-highlight-title">
        <SectionTitle
          title="오늘의 이벤트 하이라이트"
          action={
            <Link
              to="/event"
              className="flex items-center gap-1 text-sm font-semibold text-[#7d6ea8] hover:opacity-80"
            >
              이벤트 탭
              <FiChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />

        <div className="space-y-3">
          {EVENT_HIGHLIGHTS.map((item) => (
            <div
              key={`${item.time}-${item.title}`}
              className="flex items-center gap-3 rounded-2xl border border-[#e6dcf7] bg-[#faf7ff] px-4 py-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7d6ea8] text-white">
                <FiCalendar className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#111827]">{item.title}</p>
                <p className="mt-1 text-xs text-gray-600">
                  {item.time} · {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <EventInfo
        items={[
          {
            title: '가두모집 1일차',
            date: '3월 16일 (일)',
            location: '백양로 · 일정담',
            time: '11:00 - 17:00',
            description: '동아리 부스 운영 및 공연',
          },
          {
            title: '가두모집 2일차',
            date: '3월 17일 (월)',
            location: '백양로 · 일정담',
            time: '11:00 - 17:00',
            description: '동아리 부스 운영 및 모집 상담',
          },
        ]}
      />

      <div className="rounded-3xl border border-[#e9defa] bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#7d6ea8]/10 text-[#7d6ea8]">
            <FiInfo className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-knu-gray">
              주막(축제) 일정은 본 홈 일정 요약에서 제외했습니다.
            </p>
            <p className="mt-1 text-xs text-text-muted">
              현재 홈에서는 가두모집 안내 중심으로 구성하고 있으며, 추가 일정은 추후 공지 기준으로
              반영합니다.
            </p>
          </div>
        </div>
      </div>

      <Link
        to="/event"
        className="flex items-center justify-between rounded-2xl border border-[#dcd2f3] bg-white px-4 py-3 text-sm font-semibold text-[#56427d]"
      >
        <span className="flex items-center gap-2">
          <FiClock className="h-4 w-4" aria-hidden="true" />
          이벤트 탭에서 상세 일정 보기
        </span>
        <FiArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

export default function HomeTab() {
  const [activeTab, setActiveTab] = useState<TabKey>('quick');

  const activePanel = useMemo(() => {
    if (activeTab === 'quick') return <QuickUsePanel />;
    if (activeTab === 'notice') return <NoticePanel />;
    return <SchedulePanel />;
  }, [activeTab]);

  return (
    <section aria-labelledby="home-tabs-title" className="rounded-t-[28px] bg-white pt-3">
      <h2 id="home-tabs-title" className="sr-only">
        홈 주요 정보 탭
      </h2>

      <div className="rounded-2xl bg-[#f2edf9] p-1">
        <div role="tablist" aria-label="홈 정보 카테고리" className="grid grid-cols-3 gap-1">
          {TAB_ITEMS.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                id={`home-tab-${tab.key}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`home-panel-${tab.key}`}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-[#5f4a89] shadow-[0_4px_12px_rgba(77,54,121,0.12)]'
                    : 'text-[#7561a8]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`home-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`home-tab-${activeTab}`}
        className="pt-5"
      >
        {activePanel}
      </div>
    </section>
  );
}
