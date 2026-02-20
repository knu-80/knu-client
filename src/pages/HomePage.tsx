import backgroundImage from '@/assets/background.webp';
import floatingMap from '@/assets/floating-map.svg';
import FloatingActionGroup from '@/components/FloatingActionGroup';
import EventInfo from '@/components/home/EventInfo';
import Footer from '@/components/home/Footer';
import PerformanceTimeline from '@/components/home/PerformanceTimeline';
import QuickMenu from '@/components/home/QuickMenu';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function HomePage() {
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
          className="h-[100svh] w-full bg-[#AC8ED8] bg-contain bg-[center_12%] bg-no-repeat md:bg-cover md:bg-center [@media(max-height:820px)]:bg-[center_8%] [@media(max-height:740px)]:bg-[center_4%]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-label="경북대학교 가두모집 대표 이미지"
          role="img"
        />

        <div className="absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] flex flex-col items-center gap-4 px-5 text-white [@media(max-height:740px)]:bottom-[calc(env(safe-area-inset-bottom)+1rem)] [@media(max-height:740px)]:gap-3">
          <div className="flex w-[min(90%,320px)] gap-3 [@media(max-height:740px)]:w-[min(92%,300px)] [@media(max-height:740px)]:gap-2">
            <Link
              to="/map"
              className="flex-1 rounded-full bg-knu-lavender px-6 py-2.5 text-center text-sm font-semibold text-white shadow [@media(max-height:740px)]:px-4 [@media(max-height:740px)]:py-2 [@media(max-height:740px)]:text-xs"
            >
              부스 찾기
            </Link>
            <button
              type="button"
              className="flex-1 rounded-full border border-white/60 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur [@media(max-height:740px)]:px-4 [@media(max-height:740px)]:py-2 [@media(max-height:740px)]:text-xs"
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
            <span className="typo-body-2 whitespace-nowrap text-white/80 [@media(max-height:740px)]:hidden">
              아래로 스크롤하여 더 많은 정보를 <br />
              확인하세요
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur animate-bounce [@media(max-height:740px)]:h-9 [@media(max-height:740px)]:w-9">
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
