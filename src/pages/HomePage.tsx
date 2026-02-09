import backgroundImage from '../assets/background.webp';

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

      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="typo-heading-3">부스 찾기</h3>
        <p className="typo-body-2 typo-muted mt-2">
          행사 기간 동안 운영되는 동아리와 가두모집 부스를 빠르게 찾아보세요.
        </p>
        <button
          type="button"
          className="mt-4 w-full rounded-xl bg-knu-red py-3 text-sm font-semibold text-white"
        >
          부스 목록 보러가기
        </button>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h3 className="typo-heading-3">공지사항</h3>
          <span className="typo-caption text-text-muted">최근 3건</span>
        </div>
        <ul className="mt-4 space-y-3">
          {[
            { title: '우천 시 행사 운영 안내', date: '2025.03.14' },
            { title: '부스 운영 시간 변경 공지', date: '2025.03.12' },
            { title: '분실물 안내 데스크 위치', date: '2025.03.10' },
          ].map((item) => (
            <li
              key={item.title}
              className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3"
            >
              <span className="typo-body-2">{item.title}</span>
              <span className="typo-caption text-text-muted">{item.date}</span>
            </li>
          ))}
        </ul>
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
