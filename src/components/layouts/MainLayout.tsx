import { Outlet, useLocation } from 'react-router-dom';

import Navigation from '../navigation/Navigation';

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const contentPaddingTop = isHomePage ? 'pt-0' : 'pt-[66px]';

  return (
    <div className="min-h-dvh bg-gray-100 text-knu-gray">
      <div className="mx-auto flex min-h-dvh w-full max-w-[700px] flex-col bg-white">
        <Navigation />

        <main className={`flex-1 px-5 pb-6 ${contentPaddingTop}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
