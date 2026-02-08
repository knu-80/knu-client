import backgroundImage from '../assets/background.png';

export default function HomePage() {
  return (
    <div className="flex">
      <section className="relative -mx-5 flex-1 overflow-hidden">
        <div
          className="h-[100dvh] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-label="경북대학교 가두모집 대표 이미지"
          role="img"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
        <div className="absolute bottom-6 left-5 right-5 text-white">
          <p className="typo-caption uppercase tracking-[0.3em] text-white/80">2025 KNU Festival</p>
          <h2 className="typo-display-2 mt-2">가두모집 &amp; 동아리 축제</h2>
          <p className="typo-body-2 mt-2 text-white/80">3월 16일 ~ 3월 18일</p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              className="rounded-full bg-knu-red px-5 py-2 text-sm font-semibold text-white shadow"
            >
              부스 찾기
            </button>
            <button
              type="button"
              className="rounded-full border border-white/60 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur"
            >
              공지사항
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
