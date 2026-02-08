import backgroundImage from '../assets/background.png';
import knuLogo from '../assets/knuLogo.png';

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
        <div className="absolute inset-x-5 top-[18%] flex flex-col items-center text-center text-white">
          <img src={knuLogo} alt="경북대학교 로고" className="h-20 w-20" />
          <h2 className="typo-display-2 mt-6 leading-tight">
            2025 경북대학교
            <br />
            가두모집 &amp; 동아리 축제
          </h2>
          <p className="typo-body-2 mt-4 text-white/90">80주년 기념 특별 행사</p>
          <p className="typo-body-2 mt-1 text-white/90">3월 16일 · 3월 18일</p>
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
    </div>
  );
}
