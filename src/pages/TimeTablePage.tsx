import { useMemo, useState } from 'react';
import {
  PERFORMANCE_SETS_BY_DAY,
  type DayKey,
  type PerformanceSet,
} from '@/constants/performanceTimetable';

type DayMeta = {
  label: string;
  date: string;
  notice: string;
};

const DAY_META: Record<DayKey, DayMeta> = {
  day1: {
    label: 'DAY 1',
    date: '03.16',
    notice:
      '1일차는 점심/저녁 2회차 공연이 진행됩니다. 현장 상황에 따라 진행 시간이 소폭 변경될 수 있습니다.',
  },
  day2: {
    label: 'DAY 2',
    date: '03.17',
    notice:
      '2일차는 점심 1회차 공연이 진행됩니다. 최신 변동 사항은 공지사항에서 함께 확인해주세요.',
  },
};

function getSessionTimeRange(set: PerformanceSet): string {
  const firstTime = set.items[0]?.time;
  const lastTime = set.items[set.items.length - 1]?.time;

  if (!firstTime || !lastTime) {
    return '';
  }

  const start = firstTime.split('-')[0]?.trim() ?? '';
  const end = lastTime.split('-')[1]?.trim() ?? '';
  return `${start} - ${end}`;
}

function SessionTimeline({ set }: { set: PerformanceSet }) {
  return (
    <article className="rounded-2xl border border-knu-silver/60 bg-white px-4 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold tracking-[0.08em] text-knu-gold">
            {set.sessionLabel}
          </p>
          <h4 className="mt-1 text-sm font-semibold text-knu-gray">{set.location}</h4>
        </div>
        <span className="rounded-full bg-knu-red/10 px-2.5 py-1 text-xs font-semibold text-knu-red">
          {getSessionTimeRange(set)}
        </span>
      </div>

      <div className="relative mt-4">
        <div
          className="absolute bottom-2 left-[8px] top-2 w-px bg-knu-silver/70"
          aria-hidden="true"
        />
        <div className="space-y-3">
          {set.items.map((item) => (
            <div key={`${set.id}-${item.time}-${item.title}`} className="relative pl-6">
              <span
                className="absolute left-[3.5px] top-[24px] h-2.5 w-2.5 rounded-full bg-knu-red shadow-[0_0_0_3px_rgba(230,0,0,0.14)]"
                aria-hidden="true"
              />
              <div className="rounded-xl border border-knu-silver/55 bg-[#fdfcf9] px-3 py-2.5">
                <p className="text-xs font-semibold text-knu-gold">{item.time}</p>
                <p className="mt-0.5 text-sm font-semibold text-knu-gray">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function TimeTablePage() {
  const [activeDay, setActiveDay] = useState<DayKey>('day1');
  const activeMeta = useMemo(() => DAY_META[activeDay], [activeDay]);
  const activeSets = useMemo(() => PERFORMANCE_SETS_BY_DAY[activeDay], [activeDay]);
  const totalCount = useMemo(
    () => PERFORMANCE_SETS_BY_DAY[activeDay].reduce((acc, set) => acc + set.items.length, 0),
    [activeDay],
  );

  return (
    <div className="flex flex-col gap-5 pt-5">
      <section className="rounded-3xl border border-knu-gold/35 bg-gradient-to-br from-knu-gold/12 via-white to-knu-silver/28 px-5 py-6">
        <p className="text-xs font-semibold tracking-[0.1em] text-knu-gold">TIMETABLE</p>
        <h2 className="typo-heading-2 mt-1 text-knu-gray">가두모집 무대 공연 타임라인</h2>
        <p className="typo-body-2 mt-2 text-text-muted">
          날짜별 회차와 출연 동아리 순서를 타임라인 형태로 확인할 수 있어요.
        </p>
      </section>

      <section aria-labelledby="timetable-day-toggle-title" className="space-y-4">
        <h3 id="timetable-day-toggle-title" className="sr-only">
          날짜별 타임테이블 선택
        </h3>

        <div role="tablist" aria-label="타임테이블 날짜 선택" className="grid grid-cols-2 gap-2">
          {(Object.keys(DAY_META) as DayKey[]).map((key) => {
            const day = DAY_META[key];
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
                className={`interactive-transition rounded-full border px-3 py-2.5 text-sm font-semibold ${
                  isActive
                    ? 'border-knu-red bg-knu-red text-white shadow-[0_6px_14px_rgba(230,0,0,0.24)]'
                    : 'border-knu-silver bg-white text-knu-gray hover:border-knu-gold/70 hover:text-knu-gold'
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
          <div className="rounded-2xl border border-knu-silver/70 bg-knu-silver/15 px-4 py-3">
            <p className="text-sm text-knu-gray">{activeMeta.notice}</p>
            <p className="mt-1 text-xs font-semibold text-knu-gold">
              {activeMeta.label} 총 {totalCount}개 공연
            </p>
          </div>

          <div className="space-y-3">
            {activeSets.map((set) => (
              <SessionTimeline key={set.id} set={set} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
