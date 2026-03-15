import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PiSpinnerGapThin } from 'react-icons/pi';
import { FaStar } from 'react-icons/fa';
import { useRanking } from '@/hooks/useRanking';
import FaceFillSvg from '@/assets/face-fill.svg';
import RankingHeaderSvg from '@/assets/ranking-header.svg';
import FaceGoldSvg from '@/assets/face-gold.svg';
import FaceSilverSvg from '@/assets/face-silver.svg';
import FaceBronzeSvg from '@/assets/face-bronze.svg';
import { formatLikeCount } from '@/lib/count';

export default function RankingPage() {
  const { topThree, rest, isLoading } = useRanking();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return FaceGoldSvg;
      case 2:
        return FaceSilverSvg;
      case 3:
        return FaceBronzeSvg;
      default:
        return FaceFillSvg;
    }
  };

  if (isLoading) {
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
        className="my-4 mx-auto h-14 pointer-events-none select-none"
      />

      <div className="flex items-end justify-center gap-2 px-1 mb-3 relative z-20">
        {topThree.map((booth) => {
          const rank = booth === topThree[1] ? 1 : booth === topThree[0] ? 2 : 3;
          const isFirst = rank === 1;

          return (
            <Link
              key={booth.boothId}
              to={`/booths/${booth.boothId}`}
              className={`relative flex flex-col items-center justify-center gap-1 rounded-lg py-2 bg-white border ${
                isFirst
                  ? 'border-secondary-yellow z-10 w-[120px] h-[140px]'
                  : rank === 2
                    ? 'border-knu-silver/40 w-[100px] h-[120px]'
                    : 'border-knu-gold/40 w-[90px] h-[110px]'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <div
                  className={`relative flex shrink-0 items-center justify-center transition-all ${
                    isFirst ? 'h-11 w-11' : rank === 2 ? 'h-10 w-10' : 'h-9 w-9'
                  }`}
                >
                  <img src={getRankIcon(rank)} alt="" className="h-full w-full object-contain" />
                </div>
                <span
                  className={`font-semibold text-base-deep/90 ${
                    isFirst ? 'typo-heading-2' : rank === 2 ? 'typo-heading-3' : 'typo-body-1'
                  }`}
                >
                  {rank}위
                </span>
              </div>

              <p className="text-center typo-body-1 font-medium line-clamp-2 text-base-deep">
                {booth.name}
              </p>

              <div className="flex items-center gap-1 shrink-0 mb-1">
                <FaStar className="text-secondary-yellow" />
                <span className="typo-body-3 font-semibold text-base-deep">
                  {formatLikeCount(booth.likeCount)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <section className="space-y-3 pb-24">
        {rest.map((booth, index) => {
          const rank = index + 4;
          return (
            <Link
              key={booth.boothId}
              to={`/booths/${booth.boothId}`}
              className="interactive-transition flex items-center justify-between rounded-2xl px-5 py-4 bg-white border border-primary/10"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                  <img src={FaceFillSvg} alt="" className="absolute inset-0 h-full w-full" />
                  <span className="relative z-10 top-0.5 text-center font-medium text-gray-500 typo-caption">
                    {rank}
                  </span>
                </div>
                <p className="truncate typo-body-2 font-medium text-base-deep">{booth.name}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <FaStar className="text-secondary-yellow" />
                <span className="typo-body-3 font-semibold text-base-deep">
                  {booth.likeCount.toLocaleString()}
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
