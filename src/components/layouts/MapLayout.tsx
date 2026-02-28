import { Outlet } from 'react-router-dom';
import BottomTabBar from '@/components/navigation/BottomTabBar';

export default function MapLayout() {
  return (
    <div className="flex h-dvh w-full max-w-[700px] mx-auto flex-col bg-white overflow-hidden">
      <main className="flex-1 relative overflow-hidden">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}
