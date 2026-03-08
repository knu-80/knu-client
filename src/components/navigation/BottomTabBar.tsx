import { FiBell, FiCalendar, FiHome, FiMap } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

type TabItem = {
  to: string;
  label: string;
  icon: IconType;
  end?: boolean;
};

const TAB_ITEMS: TabItem[] = [
  { to: '/', label: '홈', icon: FiHome, end: true },
  { to: '/notice', label: '공지', icon: FiBell },
  { to: '/event', label: '이벤트', icon: FiCalendar },
  { to: '/map', label: '지도', icon: FiMap },
];

export default function BottomTabBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <nav
        aria-label="하단 탭 메뉴"
        className="pointer-events-auto mx-auto w-full max-w-[700px] border-t border-gray-200 bg-white shadow-[0_-8px_18px_rgba(15,23,42,0.1)]"
      >
        <ul className="grid grid-cols-4 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2">
          {TAB_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-1 rounded-md py-1.5 text-xs font-semibold transition-colors ${
                      isActive ? 'text-knu-red' : 'text-gray-500'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
