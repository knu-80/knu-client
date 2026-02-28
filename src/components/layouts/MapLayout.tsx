import { Outlet } from 'react-router-dom';
import BottomTabBar from '@/components/navigation/BottomTabBar';

export default function MapLayout() {
  return (
    <div className="flex h-dvh w-full max-w-[700px] mx-auto flex-col bg-white overflow-hidden">
      <main className="relative flex-1 min-h-0 pb-[env(safe-area-inset-bottom)]">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}
