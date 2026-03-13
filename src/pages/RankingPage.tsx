import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PiSpinnerGapThin } from 'react-icons/pi';
import { FaStar } from 'react-icons/fa';
import RankingSvg from '@/assets/ranking.svg';
import FaceFillSvg from '@/assets/face-fill.svg';
import RankingHeaderSvg from '@/assets/ranking-header.svg';

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

  const rankedBooths = useMemo(() => {
    return [...booths].slice(0, 10);
  }, [booths]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <PiSpinnerGapThin className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-5">
      <img
        src={RankingHeaderSvg}
        alt="지금 뜨는 동아리"
        draggable={false}
        className="mt-4 mb-2 mx-auto h-14 pointer-events-none select-none"
      />

      <img
        src={RankingSvg}
        alt="랭킹 일러스트"
        draggable={false}
        className="mx-auto w-50 pointer-events-none select-none mb-6"
      />

      <section className="space-y-3 pb-24 mt-[-40px]">
        {rankedBooths.map((booth, index) => {
          const rank = index + 1;

          return (
            <Link
              key={booth.id}
              to={`/booths/${booth.id}`}
              className={`interactive-transition flex items-center justify-between rounded-2xl px-5 py-4 bg-white`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                  <img
                    src={FaceFillSvg}
                    alt="얼굴 아이콘"
                    draggable={false}
                    className="absolute inset-0 h-full w-full pointer-events-none select-none"
                  />
                  <span className="relative z-10 top-0.5 text-center font-medium text-gray-500 typo-caption leading-none">
                    {rank}
                  </span>
                </div>
                <p className="truncate typo-body-1 font-medium text-base-deep">{booth.name}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <FaStar className="text-secondary-yellow" />
                <span className="typo-body-3 font-semibold text-base-deep">
                  {booth.pickCount.toLocaleString()}
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
