import { Outlet } from 'react-router-dom';

import BackHeader from '@/components/navigation/BackHeader';
import BottomTabBar from '@/components/navigation/BottomTabBar';

type DetailLayoutProps = {
  title: string;
  fallbackPath: string;
};

export default function DetailLayout({ title, fallbackPath }: DetailLayoutProps) {
  return (
    <div className="min-h-dvh bg-gray-100 text-knu-gray">
      <div className="mx-auto flex min-h-dvh w-full max-w-[700px] flex-col bg-white">
        <main className="relative flex-1 min-h-0 px-5 pb-[calc(88px+env(safe-area-inset-bottom))]">
          <BackHeader title={title} fallbackPath={fallbackPath} />
          <Outlet />
        </main>
        <BottomTabBar />
      </div>
    </div>
  );
}
