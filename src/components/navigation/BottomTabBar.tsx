import { motion } from 'framer-motion';
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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-safe">
      <nav
        aria-label="하단 탭 메뉴"
        className="h-[60px] pointer-events-auto mx-auto w-full max-w-[700px] bg-white shadow-[0_-8px_18px_rgba(0,0,0,0.08)]"
      >
        <ul className="relative grid grid-cols-5 h-full px-2 pb-[env(safe-area-inset-bottom)]">
          {TAB_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.to} className="relative flex items-center justify-center">
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `relative flex h-10 w-12 items-center justify-center rounded-full transition-colors duration-300 ${
                      isActive ? 'text-primary' : 'text-gray-400'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary/10 rounded-full"
                          transition={{
                            type: 'spring',
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <Icon className="relative z-10 h-5 w-5" aria-hidden="true" />
                      <span className="sr-only">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
