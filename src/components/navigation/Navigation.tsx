import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import knuLogo from '../../assets/knuLogo.png';

const MENU_ITEMS = [
  { label: '부스 배치도', target: 'booth' },
  { label: '공지/분실물', target: 'notices' },
  { label: '이벤트 소개', target: 'events' },
] as const;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(id);
  }, [pathname, open]);

  const handleScrollTo = (target: string) => {
    const element = document.getElementById(target);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed left-1/2 top-0 z-40 w-full max-w-[700px] -translate-x-1/2">
      <div className="border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="flex h-[66px] items-center justify-between px-5">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2"
            aria-label="홈으로 이동"
          >
            <img src={knuLogo} alt="경북대학교 로고" className="h-7 w-7" />
            <span className="text-sm font-semibold text-knu-gray">KNU</span>
          </button>

          <button
            type="button"
            className="relative h-9 w-10"
            aria-label="메뉴"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span
              className={`absolute left-2 right-2 top-2 h-0.5 rounded bg-knu-gray transition-all ${
                open ? 'translate-y-2.5 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-2 right-2 top-4 h-0.5 rounded bg-knu-gray transition-all ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-2 right-2 top-6 h-0.5 rounded bg-knu-gray transition-all ${
                open ? '-translate-y-2.5 -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-b border-gray-200 bg-white/95 transition-all duration-300 ${
          open ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="space-y-2 px-5 py-4">
          {MENU_ITEMS.map((item) => (
            <li key={item.target}>
              <button
                type="button"
                className="w-full rounded-xl bg-gray-100 px-4 py-3 text-left text-sm font-semibold text-knu-gray"
                onClick={() => {
                  setOpen(false);
                  handleScrollTo(item.target);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
