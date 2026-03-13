import { FiBell, FiCalendar, FiHome, FiMap, FiStar } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

type TabItem = {
  to: string;
  label: string;
  icon: IconType;
  end?: boolean;
};

const TAB_ITEMS: TabItem[] = [
  { to: '/event', label: '이벤트', icon: FiCalendar },
  { to: '/notice', label: '공지', icon: FiBell },
  { to: '/', label: '홈', icon: FiHome, end: true },
  { to: '/map', label: '지도', icon: FiMap },
  { to: '/ranking', label: '랭킹', icon: FiStar },
];

export default function BottomTabBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <nav
        aria-label="하단 탭 메뉴"
        className="h-[68px] pointer-events-auto mx-auto w-full max-w-[700px] bg-white shadow-[0_-8px_18px_rgba(0,0,0,0.08)]"
      >
        <ul className="grid grid-cols-5 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2">
          {TAB_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `interactive-transition flex flex-col items-center gap-1 rounded-md py-1.5 text-xs font-medium ${
                      isActive ? 'text-primary' : 'text-gray-500'
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
