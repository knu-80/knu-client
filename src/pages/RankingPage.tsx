import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { PiSpinnerGapThin } from 'react-icons/pi';
import { FaStar } from 'react-icons/fa';

const DUMMY_RANKING = [
  { id: 1, name: 'name1', pickCount: 1250 },
  { id: 2, name: 'name2', pickCount: 1100 },
  { id: 3, name: 'name3', pickCount: 980 },
  { id: 4, name: 'name4', pickCount: 850 },
  { id: 5, name: 'name5', pickCount: 720 },
  { id: 6, name: 'name6', pickCount: 650 },
  { id: 7, name: 'name7', pickCount: 540 },
  { id: 8, name: 'name8', pickCount: 420 },
  { id: 9, name: 'name9', pickCount: 310 },
  { id: 10, name: 'name10', pickCount: 150 },
];

export default function RankingPage() {
  const loading = false;
  const booths = DUMMY_RANKING;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const { topThree, rest } = useMemo(() => {
    const sorted = [...booths].slice(0, 10);
    const podium = [sorted[1], sorted[0], sorted[2]].filter(Boolean);
    return { topThree: podium, rest: sorted.slice(3) };
  }, [booths]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <PiSpinnerGapThin className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pt-5">
      <div className="flex items-center gap-2 px-1">
        <span className="typo-heading-3 font-semibold text-base-deep">지금 뜨고있는 동아리</span>
      </div>

      <div className="grid grid-cols-3 items-end gap-2 px-1 pt-4">
        {topThree.map((booth) => {
          const rank = booth === topThree[1] ? 1 : booth === topThree[0] ? 2 : 3;
          const isFirst = rank === 1;

          return (
            <Link
              key={booth.id}
              to={`/booths/${booth.id}`}
              className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl p-3 shadow-sm transition-all active:scale-95 ${
                isFirst
                  ? 'bg-white text-base-deep h-[150px] z-10'
                  : 'bg-white border border-gray-100 h-[120px]'
              }`}
            >
              <div
                className={`absolute -top-3 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white font-bold text-xs ${
                  isFirst ? 'bg-secondary-yellow text-base-deep' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {rank}
              </div>
              <p
                className={`text-center font-bold text-sm line-clamp-2 ${isFirst ? 'text-base-deep' : 'text-base-deep'}`}
              >
                {booth.name}
              </p>
              <span className={`text-[11px] font-medium text-primary`}>
                {booth.pickCount.toLocaleString()} PICK
              </span>
            </Link>
          );
        })}
      </div>

      <section className="space-y-3 pb-20">
        {rest.map((booth, index) => (
          <Link
            key={booth.id}
            to={`/booths/${booth.id}`}
            className="interactive-transition flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm"
          >
            <div className="flex items-center gap-4 min-w-0">
              <span className="typo-body-2 font-bold text-gray-400 w-4 text-center">
                {index + 4}
              </span>
              <p className="truncate typo-body-2 font-medium text-base-deep">{booth.name}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <FaStar className="text-secondary-yellow" />
              <span className="typo-caption font-semibold text-base-deep">
                {booth.pickCount.toLocaleString()}
              </span>
              <FiChevronRight className="ml-1 h-4 w-4 text-gray-300" />
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
