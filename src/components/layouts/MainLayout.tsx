import { Outlet } from 'react-router-dom';
import Footer from '../home/Footer';
import BottomTabBar from '@/components/navigation/BottomTabBar';

export default function MainLayout() {
  return (
    <div className="min-h-dvh bg-gray-100 text-knu-gray">
      <div className="mx-auto flex min-h-dvh w-full max-w-[700px] flex-col bg-white">
        <main className="relative flex flex-col flex-1 min-h-0">
          <div className="flex flex-col flex-1 px-5 min-h-dvh pb-[calc(80px+env(safe-area-inset-bottom))]">
            <Outlet />
          </div>
          <Footer />
          <div className="h-[calc(60px+env(safe-area-inset-bottom))]" />
        </main>
        <BottomTabBar />
      </div>
    </div>
  );
}
