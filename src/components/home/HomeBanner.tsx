import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
  type TouchEvent,
} from 'react';

import banner1 from '@/assets/banner1.webp';
import banner2 from '@/assets/banner2.webp';
import banner3 from '@/assets/banner3.webp';
import banner4 from '@/assets/banner4.webp';
import banner5 from '@/assets/banner5.webp';

type BannerSlide = {
  src: string;
  alt: string;
};

const AUTO_SLIDE_MS = 3000;
const SWIPE_THRESHOLD_PX = 40;

const BANNER_SLIDES: BannerSlide[] = [
  {
    src: banner1,
    alt: '가두모집 메인 포스터 배너',
  },
  {
    src: banner2,
    alt: '가두모집 안내 포스터 배너',
  },
  {
    src: banner3,
    alt: '가두모집 하이라이트 배너',
  },
  {
    src: banner4,
    alt: '가두모집 하이라이트 배너',
  },
  {
    src: banner5,
    alt: '가두모집 하이라이트 배너',
  },
];

const LOOP_SLIDES = [BANNER_SLIDES[BANNER_SLIDES.length - 1], ...BANNER_SLIDES, BANNER_SLIDES[0]];

export default function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const touchStartXRef = useRef<number | null>(null);
  const isSwiping = useRef(false);

  const moveToNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const moveToPrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  useEffect(() => {
    if (BANNER_SLIDES.length < 2) return;

    const timer = setInterval(() => {
      moveToNext();
    }, AUTO_SLIDE_MS);

    return () => clearInterval(timer);
  }, [moveToNext]);

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(BANNER_SLIDES.length);
    } else if (currentIndex === BANNER_SLIDES.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!isSwiping.current || touchStartXRef.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartXRef.current - touchEndX;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD_PX) {
      if (deltaX > 0) {
        moveToNext();
      } else {
        moveToPrev();
      }
    }

    isSwiping.current = false;
  };

  const trackStyle: CSSProperties = {
    '--banner-card-width': 'calc(100% - 56px)',
    '--banner-side-offset': 'calc((100% - var(--banner-card-width)) / 2)',
    transform: `translateX(calc(var(--banner-side-offset) - ${currentIndex} * (var(--banner-card-width) + var(--banner-gap))))`,
    transition: isTransitioning ? 'transform 700ms ease-out' : 'none',
  } as CSSProperties;

  return (
    <section className="-mx-5 relative overflow-hidden select-none [--banner-gap:12px] md:[--banner-gap:28px]">
      <div className="relative py-6">
        <div
          className="overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex gap-[var(--banner-gap)]"
            style={trackStyle}
            onTransitionEnd={handleTransitionEnd}
          >
            {LOOP_SLIDES.map((slide, index) => (
              <div
                key={`${slide.src}-${index}`}
                className="relative aspect-video w-[var(--banner-card-width)] shrink-0 overflow-hidden rounded-[20px] "
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading={index === 1 ? 'eager' : 'lazy'}
                  fetchPriority={index === 1 ? 'high' : 'auto'}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="pointer-events-none absolute -bottom-px left-0 right-0 h-8 rounded-t-[16px] bg-white" /> */}
    </section>
  );
}
