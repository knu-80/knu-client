import { Outlet, useLocation } from 'react-router-dom';

const TITLE = '경북대학교 가두모집 안내';
const BADGE = 'KNU';

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const contentPaddingTop = isHomePage ? 'pt-0' : 'pt-[66px]';
  const contentPaddingBottom = isHomePage ? 'pb-0' : 'pb-6';

  return (
    <div className="min-h-dvh bg-gray-100 text-knu-gray">
      <div className="mx-auto flex min-h-dvh w-full max-w-[700px] flex-col bg-white">
        <header className="fixed left-1/2 top-0 z-20 h-[66px] w-full max-w-[700px] -translate-x-1/2 border-b border-gray-200 bg-white/95 backdrop-blur">
          <div className="flex h-full items-center justify-between px-5">
            <h1 className="typo-heading-3">{TITLE}</h1>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-knu-gray">
              {BADGE}
            </span>
          </div>
        </header>

        <main className={`flex-1 px-5 ${contentPaddingTop} ${contentPaddingBottom}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
