import backgroundImage from '@/assets/background.webp';
import floatingMap from '@/assets/floating-map.svg';
import FloatingActionGroup from '@/components/FloatingActionGroup';
import EventInfo from '@/components/home/EventInfo';
import Footer from '@/components/home/Footer';
import PerformanceTimeline from '@/components/home/PerformanceTimeline';
import QuickMenu from '@/components/home/QuickMenu';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [isCompactDevice] = useState(() => window.screen.height <= 740);
  const [heroHeight] = useState(() => Math.max(window.innerHeight, 520));

  const handleScrollHint = () => {
    const element = document.getElementById('quick-menu');
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="relative -mx-5 overflow-hidden border-b border-white/40">
        <h1 className="sr-only">2026 경북대학교 가두모집 & 동아리 축제 메인 페이지</h1>
        <div
          className={`w-full bg-[#AC8ED8] bg-contain bg-no-repeat md:bg-cover md:bg-center ${
            isCompactDevice ? 'bg-[center_4%]' : 'bg-[center_12%]'
          }`}
          style={{ backgroundImage: `url(${backgroundImage})`, height: `${heroHeight}px` }}
          aria-label="경북대학교 가두모집 대표 이미지"
          role="img"
        />

        <div
          className={`absolute inset-x-0 flex flex-col items-center px-5 text-white ${
            isCompactDevice
              ? 'bottom-[calc(env(safe-area-inset-bottom)+1rem)] gap-3'
              : 'bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] gap-4'
          }`}
        >
          <div
            className={`flex ${isCompactDevice ? 'w-[min(92%,300px)] gap-2' : 'w-[min(90%,320px)] gap-3'}`}
          >
            <Link
              to="/map"
              className={`flex-1 rounded-full bg-knu-lavender text-center font-semibold text-white shadow ${
                isCompactDevice ? 'px-4 py-2 text-xs' : 'px-6 py-2.5 text-sm'
              }`}
            >
              부스 찾기
            </Link>
            <button
              type="button"
              className={`flex-1 rounded-full border border-white/60 bg-white/10 font-semibold text-white backdrop-blur ${
                isCompactDevice ? 'px-4 py-2 text-xs' : 'px-6 py-2.5 text-sm'
              }`}
            >
              이벤트 보기
            </button>
          </div>
          <button
            type="button"
            onClick={handleScrollHint}
            className="flex flex-col items-center gap-4 text-white/80"
            aria-label="아래로 스크롤"
          >
            {!isCompactDevice && (
              <span className="typo-body-2 whitespace-nowrap text-white/80">
                아래로 스크롤하여 더 많은 정보를 <br />
                확인하세요
              </span>
            )}
            <span
              className={`flex items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur animate-bounce ${
                isCompactDevice ? 'h-9 w-9' : 'h-11 w-11'
              }`}
            >
              <FiChevronDown className="h-6 w-6 text-white" />
            </span>
          </button>
        </div>
      </section>

      <QuickMenu />

      <EventInfo
        items={[
          {
            title: '가두모집 1일차',
            date: '3월 16일 (일)',
            location: '백양로 · 일정담',
            time: '11:00 - 17:00',
            description: '동아리 부스 운영 및 공연',
          },
        ]}
      />

      <PerformanceTimeline />

      <Footer />

      <FloatingActionGroup
        actions={[
          {
            label: '부스 배치도로 이동',
            href: '/map',
            icon: floatingMap,
          },
        ]}
      />
    </div>
  );
}
