import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiSpinnerGapThin } from 'react-icons/pi';
import { FaStar } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { useRanking } from '@/hooks/useRanking';
import { useYesterdayBoothTop3 } from '@/hooks/useYesterdayBoothTop3';
import FaceFillSvg from '@/assets/face-fill.svg';
import RankingHeaderSvg from '@/assets/ranking-header.svg';
import FaceGoldSvg from '@/assets/face-gold.svg';
import FaceSilverSvg from '@/assets/face-silver.svg';
import FaceBronzeSvg from '@/assets/face-bronze.svg';
import { formatLikeCount } from '@/lib/count';

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function RankingPage() {
  const { topThree, rest, isLoading } = useRanking();
  const {
    data: yesterdayTop3,
    date: yesterdayDate,
    isLoading: isYesterdayTop3Loading,
  } = useYesterdayBoothTop3();

  const dismissStorageKey = useMemo(() => `ranking-yesterday-top3-dismissed-${getTodayKey()}`, []);

  const [isDismissedToday, setIsDismissedToday] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(dismissStorageKey) === '1';
  });
  const [isPopupClosed, setIsPopupClosed] = useState(false);
  const [isPopupOpenedByButton, setIsPopupOpenedByButton] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const hasYesterdayTop3 = yesterdayTop3.length > 0;
  const isAutoPopupOpen = hasYesterdayTop3 && !isDismissedToday && !isPopupClosed;
  const isYesterdayPopupOpen = isPopupOpenedByButton || isAutoPopupOpen;

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

  const handleCloseYesterdayPopup = () => {
    setIsPopupOpenedByButton(false);
    setIsPopupClosed(true);
  };

  const handleDismissToday = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(dismissStorageKey, '1');
    }
    setIsDismissedToday(true);
    setIsPopupOpenedByButton(false);
    setIsPopupClosed(true);
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
              to="/map"
              state={{ selectedBoothId: booth.boothId }}
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
              to="/map"
              state={{ selectedBoothId: booth.boothId }}
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

      <div className="pointer-events-none fixed left-1/2 bottom-[calc(88px+env(safe-area-inset-bottom))] z-40 flex w-full max-w-[700px] -translate-x-1/2 justify-end px-5">
        <button
          type="button"
          onClick={() => setIsPopupOpenedByButton(true)}
          aria-label="어제 TOP3 팝업 열기"
          className="pointer-events-auto inline-flex h-12 items-center justify-center gap-1 rounded-full bg-primary px-4 text-white shadow-[0_10px_22px_rgba(230,0,0,0.28)] transition hover:brightness-95 active:scale-95"
        >
          <FaStar className="h-4 w-4" />
          <span className="typo-body-3 font-semibold">어제 TOP3</span>
        </button>
      </div>

      {isYesterdayPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
          <button
            type="button"
            aria-label="전날 TOP3 팝업 닫기"
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={handleCloseYesterdayPopup}
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-label="어제 TOP3 안내"
            className="relative w-full max-w-[420px] rounded-3xl bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
          >
            <button
              type="button"
              aria-label="팝업 닫기"
              onClick={handleCloseYesterdayPopup}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <FiX className="h-5 w-5" />
            </button>

            <h2 className="typo-heading-3 text-base-deep">어제 TOP3 관심 동아리였습니다</h2>
            <p className="mt-1 typo-body-3 text-gray-500">
              {yesterdayDate} 기준 결과예요. 오늘도 많은 참여 부탁드릴게요!
            </p>

            {isYesterdayTop3Loading ? (
              <div className="mt-4 rounded-2xl border border-knu-silver/50 bg-knu-silver/10 px-4 py-6 text-center text-sm text-text-muted">
                어제 TOP3를 불러오는 중이에요.
              </div>
            ) : yesterdayTop3.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-knu-silver/50 bg-knu-silver/10 px-4 py-6 text-center text-sm text-text-muted">
                어제 TOP3 데이터가 아직 없습니다.
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                {yesterdayTop3.map((booth, index) => (
                  <Link
                    key={booth.boothId}
                    to="/map"
                    state={{ selectedBoothId: booth.boothId }}
                    onClick={handleCloseYesterdayPopup}
                    className="interactive-transition flex items-center justify-between rounded-2xl border border-knu-silver/60 bg-knu-silver/10 px-4 py-3 hover:border-knu-red/25 hover:bg-knu-red/5"
                  >
                    <div className="min-w-0">
                      <p className="typo-body-3 font-semibold text-knu-red">{index + 1}위</p>
                      <p className="truncate typo-body-2 font-medium text-base-deep">
                        {booth.name}
                      </p>
                    </div>
                    <div className="ml-3 flex items-center gap-1">
                      <FaStar className="text-secondary-yellow" />
                      <span className="typo-body-3 font-semibold text-base-deep">
                        {formatLikeCount(booth.likeCount)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDismissToday}
                className="interactive-transition rounded-xl border border-gray-200 px-3 py-2.5 typo-body-2 font-semibold text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              >
                오늘 하루 보지 않기
              </button>
              <button
                type="button"
                onClick={handleCloseYesterdayPopup}
                className="interactive-transition rounded-xl bg-primary px-3 py-2.5 typo-body-2 font-semibold text-white hover:brightness-95"
              >
                확인
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
