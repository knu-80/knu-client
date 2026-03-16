import { useMemo, useState } from 'react';
import HomeBanner from '@/components/home/HomeBanner';
import HomeTab from '@/components/home/HomeTab';
import LikeBoostPopup from '@/components/home/LikeBoostPopup';
import FaceSvg from '@/assets/face.svg';

function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function HomePage() {
  const dismissStorageKey = useMemo(() => `like-boost-popup-dismissed-${getTodayKey()}`, []);
  const [isPopupOpen, setIsPopupOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(dismissStorageKey) !== '1';
  });

  const handleHideToday = () => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(dismissStorageKey, '1');
  };

  return (
    <div className="flex flex-col relative">
      <HomeBanner />
      <div className="flex items-center h-14">
        <img
          src={FaceSvg}
          alt="호반우 얼굴"
          draggable={false}
          className="mt-4 w-14 h-14 pointer-events-none select-none"
        />
        <span className="ml-[-2px] mt-2 typo-heading-3 font-semibold text-base-deep">
          원하는 날짜를 선택하세요
        </span>
      </div>
      <HomeTab />

      <LikeBoostPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onHideToday={handleHideToday}
      />
    </div>
  );
}
