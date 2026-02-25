import backgroundImage from '@/assets/background.webp';

export default function HomeBanner() {
  return (
    <section
      aria-labelledby="home-banner-title"
      className="-mx-5 relative overflow-hidden bg-knu-lavender select-none"
    >
      <div
        className="relative h-[230px] w-full bg-cover bg-center bg-no-repeat sm:h-[290px]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        role="img"
        aria-label="2026 경북대학교 가두모집 안내 포스터"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-knu-lavender/45 via-transparent to-knu-lavender/10" />
      </div>

      <div className="pointer-events-none absolute -bottom-px left-0 right-0 h-8 rounded-t-[28px] bg-white" />
    </section>
  );
}
