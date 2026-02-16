import { Outlet } from 'react-router-dom';
import Navigation from '../navigation/Navigation';

export default function MapLayout() {
  return (
    <div className="flex h-dvh w-full max-w-[700px] mx-auto flex-col bg-white overflow-hidden">
      <Navigation />
      <main className="flex-1 pt-[66px] relative overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
