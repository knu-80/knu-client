import { useState } from 'react';

import knuLogo from '@/assets/knuLogo.png';

const MENU_ITEMS = [
  { label: '부스 배치도', target: 'booth' },
  { label: '공지/분실물', target: 'notices' },
  { label: '이벤트 소개', target: 'events' },
] as const;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const handleScrollTo = (target: string) => {
    const element = document.getElementById(target);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="fixed left-1/2 top-0 z-40 w-full max-w-[700px] -translate-x-1/2">
      <div className="overflow-hidden rounded-b-lg shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
        <div className="border-b border-white/30 bg-white/40 text-white backdrop-blur">
          <div className="flex h-[66px] items-center justify-around gap-36 px-5">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2"
              aria-label="홈으로 이동"
            >
              <img src={knuLogo} alt="경북대학교 로고" className="h-7 w-7" />
              <span className="text-sm font-semibold">KNU</span>
            </button>

            <button
              type="button"
              className="relative h-9 w-10"
              aria-label="메뉴"
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
            >
              <span
                className={`absolute left-2 right-2 top-2 h-1 rounded bg-[#fceefc] shadow-[0_1px_2px_rgba(0,0,0,0.6)] transition-all ${
                  open ? 'translate-y-2.5 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-2 right-2 top-4 h-1 rounded bg-[#fceefc] shadow-[0_1px_2px_rgba(0,0,0,0.6)] transition-all ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-2 right-2 top-6 h-1 rounded bg-[#fceefc] shadow-[0_1px_2px_rgba(0,0,0,0.6)] transition-all ${
                  open ? '-translate-y-2.5 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden border-b border-white/30 bg-white/80 text-black transition-all duration-300 ${
            open ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="space-y-1 px-5 py-4 text-center text-sm font-bold">
            {MENU_ITEMS.map((item) => (
              <li key={item.target} className="py-2">
                <button
                  type="button"
                  className="w-full"
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
    </div>
  );
}
