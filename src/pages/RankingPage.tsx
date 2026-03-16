import { useEffect, useMemo, useState } from 'react';
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

type RankingTab = 'today' | 'yesterday';

function formatMonthDay(dateKey: string): string {
  const [, month, day] = dateKey.split('-');

  if (!month || !day) {
    return dateKey;
  }

  return `${month}.${day}`;
}

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState<RankingTab>('today');
  const { today, yesterday, isLoading, yesterdayDateKey, hasYesterdaySnapshot } = useRanking();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const activeRanking = useMemo(() => {
    return activeTab === 'today' ? today : yesterday;
  }, [activeTab, today, yesterday]);

  const isActiveLoading = activeTab === 'today' && isLoading;
  const yesterdayLabel = formatMonthDay(yesterdayDateKey);
  const podiumRankOrder = [2, 1, 3] as const;

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

  if (isActiveLoading) {
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

      <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-white/80 p-1">
        <button
          type="button"
          onClick={() => setActiveTab('today')}
          className={`rounded-xl px-4 py-2.5 typo-body-2 font-semibold transition ${
            activeTab === 'today'
              ? 'bg-knu-red text-white shadow-[0_6px_14px_rgba(230,0,0,0.22)]'
              : 'text-gray-600 hover:bg-knu-red/10'
          }`}
        >
          오늘 랭킹
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('yesterday')}
          className={`rounded-xl px-4 py-2.5 typo-body-2 font-semibold transition ${
            activeTab === 'yesterday'
              ? 'bg-knu-red text-white shadow-[0_6px_14px_rgba(230,0,0,0.22)]'
              : 'text-gray-600 hover:bg-knu-red/10'
          }`}
        >
          전날 결과 ({yesterdayLabel})
        </button>
      </div>

      {activeTab === 'yesterday' && (
        <p className="mb-3 px-1 typo-caption text-text-muted">
          {hasYesterdaySnapshot
            ? `${yesterdayLabel} 기준 저장된 랭킹 결과예요.`
            : '전날 결과 데이터가 아직 저장되지 않았어요.'}
        </p>
      )}

      {activeRanking.topThree.length === 0 && activeRanking.rest.length === 0 ? (
        <div className="rounded-2xl border border-knu-silver/50 bg-white px-4 py-10 text-center text-sm text-text-muted">
          {activeTab === 'today'
            ? '아직 집계된 랭킹 데이터가 없습니다.'
            : '전날 결과를 불러오지 못했어요. 이 브라우저에 저장된 데이터가 없습니다.'}
        </div>
      ) : (
        <>
          <div className="flex items-end justify-center gap-2 px-1 mb-3 relative z-20">
            {activeRanking.topThree.map((booth, index) => {
              const rank = podiumRankOrder[index] ?? index + 1;
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
                      <img
                        src={getRankIcon(rank)}
                        alt=""
                        className="h-full w-full object-contain"
                      />
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
            {activeRanking.rest.map((booth, index) => {
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
        </>
      )}
    </div>
  );
}
