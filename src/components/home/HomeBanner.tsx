import { useEffect, useState } from 'react';

import backgroundImagePng from '@/assets/background.png';
import backgroundImageWebp from '@/assets/background.webp';

type BannerSlide = {
  src: string;
  alt: string;
  badge: string;
  title: string;
  description: string;
  backgroundPosition: string;
};

const AUTO_SLIDE_MS = 3000;

const BANNER_SLIDES: BannerSlide[] = [
  {
    src: backgroundImageWebp,
    alt: '가두모집 메인 포스터 배너',
    badge: '메인 배너',
    title: '가두모집 메인 포스터',
    description: '행사 분위기와 주요 비주얼을 확인할 수 있어요.',
    backgroundPosition: 'center top',
  },
  {
    src: backgroundImagePng,
    alt: '가두모집 안내 포스터 배너',
    badge: '안내 배너',
    title: '행사 안내 포스터',
    description: '일정/운영 관련 배너 이미지를 순차적으로 노출합니다.',
    backgroundPosition: 'center center',
  },
  {
    src: backgroundImageWebp,
    alt: '가두모집 하이라이트 포스터 배너',
    badge: '하이라이트',
    title: '가두모집 하이라이트',
    description: '추후 3~4장의 배너 이미지를 교체하여 사용할 수 있어요.',
    backgroundPosition: 'center 65%',
  },
];

export default function HomeBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (BANNER_SLIDES.length < 2) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, AUTO_SLIDE_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section
      aria-labelledby="home-banner-title"
      className="-mx-5 relative overflow-hidden bg-knu-lavender select-none"
    >
      <h2 id="home-banner-title" className="sr-only">
        메인 배너 캐러셀
      </h2>

      <div className="relative px-4 pb-2 pt-4 sm:px-5">
        <div className="relative h-[230px] overflow-hidden rounded-3xl border border-white/35 bg-knu-lavender/20 sm:h-[290px]">
          <div
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {BANNER_SLIDES.map((slide, index) => (
              <div key={`${slide.badge}-${index}`} className="relative h-full min-w-full">
                <div
                  className="absolute inset-0 bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url(${slide.src})`,
                    backgroundPosition: slide.backgroundPosition,
                  }}
                  role="img"
                  aria-label={slide.alt}
                  aria-hidden={index !== currentIndex}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-knu-lavender/55 via-knu-lavender/10 to-transparent" />

                <div className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/85 px-3 py-1 text-xs font-semibold text-knu-lavender backdrop-blur-sm">
                  {slide.badge}
                </div>

                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/35 bg-white/15 p-4 text-white backdrop-blur-sm">
                  <p className="text-sm font-semibold">{slide.title}</p>
                  <p className="mt-1 text-xs text-white/90">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-black/20 px-2.5 py-1 backdrop-blur-sm">
            {BANNER_SLIDES.map((_, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={`banner-dot-${index}`}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`${index + 1}번 배너 보기`}
                  aria-pressed={isActive}
                  className={`h-2 rounded-full transition-all ${
                    isActive ? 'w-5 bg-white' : 'w-2 bg-white/55'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-px left-0 right-0 h-8 rounded-t-[28px] bg-white" />
    </section>
  );
}
