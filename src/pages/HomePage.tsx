import backgroundImage from '@/assets/background.webp';
import { FiBell, FiMapPin } from 'react-icons/fi';

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

      <section className="grid grid-cols-2 gap-4">
        <button
          id="booth"
          type="button"
          className="scroll-mt-[80px] rounded-3xl bg-knu-red/10 px-4 py-6 text-center"
        >
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white">
            <FiMapPin className="h-6 w-6 text-knu-red" />
          </span>
          <span className="typo-body-2 mt-3 block font-semibold text-knu-gray">부스 배치도</span>
        </button>

        <button
          id="notices"
          type="button"
          className="scroll-mt-[80px] rounded-3xl bg-white px-4 py-6 text-center"
        >
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white">
            <FiBell className="h-6 w-6 text-knu-red" />
          </span>
          <span className="typo-body-2 mt-3 block font-semibold text-knu-gray">공지사항</span>
        </button>
      </section>

      <button
        type="button"
        aria-label="빠른 이동"
        className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-knu-red text-white shadow-lg shadow-black/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}
