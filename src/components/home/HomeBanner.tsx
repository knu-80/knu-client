import { useEffect, useRef, useState, type CSSProperties, type TouchEvent } from 'react';

import banner1 from '@/assets/banner1.webp';
import banner2 from '@/assets/banner2.webp';
import banner3 from '@/assets/banner3.webp';
import banner4 from '@/assets/banner4.webp';

type BannerSlide = {
  src: string;
  alt: string;
  objectPosition: string;
};

const AUTO_SLIDE_MS = 3000;
const SWIPE_THRESHOLD_PX = 40;

const BANNER_SLIDES: BannerSlide[] = [
  {
    src: banner1,
    alt: '가두모집 메인 포스터 배너',
    objectPosition: 'center top',
  },
  {
    src: banner2,
    alt: '가두모집 안내 포스터 배너',
    objectPosition: 'center center',
  },
  {
    src: banner3,
    alt: '가두모집 하이라이트 배너',
    objectPosition: 'center 65%',
  },
  {
    src: banner4,
    alt: '가두모집 하이라이트 배너',
    objectPosition: 'center 65%',
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
  const totalSlides = BANNER_SLIDES.length;

  const getCircularDistance = (from: number, to: number) => {
    const diff = Math.abs(from - to);
    return Math.min(diff, totalSlides - diff);
  };

  const shouldLoadSlide = (index: number) => getCircularDistance(currentIndex, index) <= 1;

  useEffect(() => {
    if (totalSlides < 2) return;

    const timer = window.setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, AUTO_SLIDE_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [currentIndex, totalSlides]);

  const moveToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const moveToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
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
                className="relative aspect-video w-[var(--banner-card-width)] shrink-0 overflow-hidden rounded-3xl bg-knu-lavender/20 shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
                aria-hidden={index !== currentIndex}
              >
                {shouldLoadSlide(index) ? (
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    loading={index === currentIndex ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={index === currentIndex ? 'high' : 'low'}
                    sizes="(max-width: 700px) calc(100vw - 56px), 644px"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: slide.objectPosition }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-knu-lavender/25" aria-hidden="true" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-knu-lavender/35 via-knu-lavender/15 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-px left-0 right-0 h-8 rounded-t-[28px] bg-white" />
    </section>
  );
}
