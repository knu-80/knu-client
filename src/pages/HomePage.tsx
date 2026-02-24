import Footer from '@/components/home/Footer';
import HomeBanner from '@/components/home/HomeBanner';
import HomeTab from '@/components/home/HomeTab';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HomeBanner />
      <HomeTab />
      <Footer />
    </div>
  );
}
