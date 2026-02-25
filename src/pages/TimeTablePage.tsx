import { useMemo, useState } from 'react';

type DayKey = 'day1' | 'day2';

type TimeTableItem = {
  time: string;
  title: string;
  stage: string;
  description: string;
};

type TimeTableDay = {
  label: string;
  date: string;
  notice: string;
  items: TimeTableItem[];
};

const TIMETABLE_DATA: Record<DayKey, TimeTableDay> = {
  day1: {
    label: 'DAY 1',
    date: '03.16',
    notice: '가두모집 1일차 시간표입니다. 현장 상황에 따라 순서 및 시간이 변경될 수 있습니다.',
    items: [
      {
        time: '11:00 - 11:20',
        title: '운영 시작 안내',
        stage: '백양로 메인 구간',
        description: '현장 운영 시작 및 참여 동선 안내',
      },
      {
        time: '12:00 - 12:30',
        title: '동아리 공연 1부',
        stage: '백양로 메인 무대',
        description: '밴드/댄스 동아리 순차 공연',
      },
      {
        time: '14:00 - 14:30',
        title: '참여형 이벤트',
        stage: '일청담 광장',
        description: '현장 참여 이벤트 및 진행 안내',
      },
      {
        time: '16:30 - 17:00',
        title: '마감 안내',
        stage: '백양로 메인 구간',
        description: '1일차 종료 및 공지 확인 안내',
      },
    ],
  },
  day2: {
    label: 'DAY 2',
    date: '03.17',
    notice: '가두모집 2일차 시간표입니다. 상세 변경 사항은 공지사항 탭을 함께 확인해주세요.',
    items: [
      {
        time: '11:00 - 11:20',
        title: '2일차 운영 시작',
        stage: '백양로 메인 구간',
        description: '운영 시작 및 주요 변경 사항 공지',
      },
      {
        time: '12:30 - 13:00',
        title: '동아리 공연 2부',
        stage: '백양로 메인 무대',
        description: '공연 릴레이 및 동아리 소개',
      },
      {
        time: '15:00 - 15:30',
        title: '모집 상담 집중 시간',
        stage: '백양로 · 일정담',
        description: '부스 모집 상담 및 체험 안내',
      },
      {
        time: '16:40 - 17:00',
        title: '폐장 안내',
        stage: '백양로 메인 구간',
        description: '가두모집 종료 및 분실물/공지 확인 안내',
      },
    ],
  },
};

export default function TimeTablePage() {
  const [activeDay, setActiveDay] = useState<DayKey>('day1');
  const activeData = useMemo(() => TIMETABLE_DATA[activeDay], [activeDay]);

  return (
    <div className="flex flex-col gap-5 pt-5">
      <section className="rounded-3xl border border-knu-mint/45 bg-gradient-to-br from-knu-mint/12 via-white to-knu-lavender/10 px-5 py-6">
        <p className="text-xs font-semibold tracking-[0.1em] text-knu-lavender">TIMETABLE</p>
        <h2 className="typo-heading-2 mt-1 text-knu-gray">가두모집 타임테이블</h2>
        <p className="typo-body-2 mt-2 text-text-muted">
          날짜별 운영 시간과 주요 프로그램 순서를 확인할 수 있어요.
        </p>
      </section>

      <section aria-labelledby="timetable-day-toggle-title" className="space-y-4">
        <h3 id="timetable-day-toggle-title" className="sr-only">
          날짜별 타임테이블 선택
        </h3>

        <div role="tablist" aria-label="타임테이블 날짜 선택" className="grid grid-cols-2 gap-2">
          {(Object.keys(TIMETABLE_DATA) as DayKey[]).map((key) => {
            const day = TIMETABLE_DATA[key];
            const isActive = activeDay === key;

            return (
              <button
                key={key}
                type="button"
                role="tab"
                id={`timetable-tab-${key}`}
                aria-selected={isActive}
                aria-controls={`timetable-panel-${key}`}
                onClick={() => setActiveDay(key)}
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

        <div
          id={`timetable-panel-${activeDay}`}
          role="tabpanel"
          aria-labelledby={`timetable-tab-${activeDay}`}
          className="space-y-4"
        >
          <div className="rounded-2xl border border-knu-mint/45 bg-knu-mint/10 px-4 py-3">
            <p className="text-sm text-gray-700">{activeData.notice}</p>
          </div>

          <div className="space-y-3">
            {activeData.items.map((item) => (
              <article
                key={`${activeDay}-${item.time}-${item.title}`}
                className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-knu-lavender">{item.time}</p>
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                    {item.stage}
                  </span>
                </div>
                <h4 className="mt-2 text-base font-semibold text-knu-gray">{item.title}</h4>
                <p className="mt-1 text-sm text-text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
