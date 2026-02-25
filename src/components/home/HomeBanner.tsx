import { useEffect, useRef, useState, type CSSProperties, type TouchEvent } from 'react';

import banner1 from '@/assets/banner1.png';
import banner2 from '@/assets/banner2.png';
import banner3 from '@/assets/banner3.png';
import banner4 from '@/assets/banner4.png';

type BannerSlide = {
  src: string;
  alt: string;
  backgroundPosition: string;
};

const AUTO_SLIDE_MS = 3000;
const SWIPE_THRESHOLD_PX = 40;

const BANNER_SLIDES: BannerSlide[] = [
  {
    src: banner1,
    alt: '가두모집 메인 포스터 배너',
    backgroundPosition: 'center top',
  },
  {
    src: banner2,
    alt: '가두모집 안내 포스터 배너',
    backgroundPosition: 'center center',
  },
  {
    src: banner3,
    alt: '가두모집 하이라이트 배너',
    backgroundPosition: 'center 65%',
  },
  {
    src: banner4,
    alt: '가두모집 하이라이트 배너',
    backgroundPosition: 'center 65%',
  },
];

type BannerTrackStyle = CSSProperties & {
  '--banner-card-width': string;
  '--banner-gap': string;
  '--banner-side-offset': string;
};

export default function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  useEffect(() => {
    if (BANNER_SLIDES.length < 2) return;

    const timer = window.setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, AUTO_SLIDE_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [currentIndex]);

  const moveToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  };

  const moveToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    touchEndXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;

    const deltaX = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;

    if (deltaX > 0) {
      moveToNext();
      return;
    }

    moveToPrev();
  };

  const trackStyle: BannerTrackStyle = {
    '--banner-card-width': 'calc(100% - 56px)',
    '--banner-gap': '12px',
    '--banner-side-offset': 'calc((100% - var(--banner-card-width)) / 2)',
    transform: `translateX(calc(var(--banner-side-offset) - ${currentIndex} * (var(--banner-card-width) + var(--banner-gap))))`,
  };

  return (
    <section
      aria-labelledby="home-banner-title"
      className="-mx-5 relative overflow-hidden bg-gray-200 select-none"
    >
      <h2 id="home-banner-title" className="sr-only">
        메인 배너 캐러셀
      </h2>

      <div className="relative pb-2 pt-4 sm:px-5">
        <div className="pointer-events-none absolute inset-y-4 left-0 z-10 w-4 to-transparent sm:w-6" />
        <div className="pointer-events-none absolute inset-y-4 right-0 z-10 w-4 to-transparent sm:w-6" />

        <div
          className="overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label="메인 배너 슬라이드"
        >
          <div
            className="flex gap-[var(--banner-gap)] transition-transform duration-700 ease-out"
            style={trackStyle}
          >
            {BANNER_SLIDES.map((slide, index) => (
              <div
                key={`${slide.src}-${index}`}
                className="relative h-[230px] min-w-[var(--banner-card-width)] overflow-hidden rounded-3xl bg-knu-lavender/20 shadow-[0_6px_18px_rgba(0,0,0,0.06)] sm:h-[290px]"
                aria-hidden={index !== currentIndex}
              >
                <div
                  className="absolute inset-0 bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url(${slide.src})`,
                    backgroundPosition: slide.backgroundPosition,
                  }}
                  role="img"
                  aria-label={slide.alt}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-knu-lavender/55 via-knu-lavender/15 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-px left-0 right-0 h-8 rounded-t-[28px] bg-white" />
    </section>
  );
}
