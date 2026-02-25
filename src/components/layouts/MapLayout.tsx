import { Outlet } from 'react-router-dom';

import BottomTabBar from '@/components/navigation/BottomTabBar';

export default function MapLayout() {
  return (
    <div className="min-h-dvh bg-gray-100 text-knu-gray">
      <div className="mx-auto flex h-dvh w-full max-w-[700px] flex-col overflow-hidden bg-white">
        <main className="relative flex-1 min-h-0 overflow-hidden pb-[calc(68px+env(safe-area-inset-bottom))]">
          <Outlet />
        </main>
        <BottomTabBar />
      </div>
    </div>
  );
}
