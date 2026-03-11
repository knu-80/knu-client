import Footer from '@/components/home/Footer';
import HomeBanner from '@/components/home/HomeBanner';
import HomeTab from '@/components/home/HomeTab';
import FaceSvg from '@/assets/face.svg';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HomeBanner />
      <div className="flex items-center h-14">
        <img
          src={FaceSvg}
          alt="호반우 얼굴"
          draggable={false}
          className="mt-4 w-14 h-14 pointer-events-none select-none"
        />
        <span className="ml-[-2px] mt-2 typo-heading-3 font-semibold text-base-deep">
          원하는 날짜를 선택하세요.
        </span>
      </div>
      <HomeTab />
      <Footer />
    </div>
  );
}
