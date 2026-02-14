import backgroundImage from '@/assets/background.webp';
import EventInfo from '@/components/home/EventInfo';
import QuickMenu from '@/components/home/QuickMenu';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="relative -mx-5 overflow-hidden">
        <div
          className="h-[100dvh] w-full bg-cover bg-center md:bg-contain md:bg-top md:bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-label="경북대학교 가두모집 대표 이미지"
          role="img"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
        <div className="absolute inset-x-5 top-[75%] flex flex-col items-center text-center text-white">
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              className="rounded-full bg-knu-red px-6 py-2.5 text-sm font-semibold text-white shadow"
            >
              부스 찾기
            </button>
            <button
              type="button"
              className="rounded-full border border-white/60 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur"
            >
              이벤트 보기
            </button>
          </div>
        </div>
      </section>

      <QuickMenu />

      <EventInfo />
    </div>
  );
}
