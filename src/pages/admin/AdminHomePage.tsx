import { useNavigate } from 'react-router-dom';
import { FiBell, FiCalendar, FiHome, FiTool } from 'react-icons/fi';

const ADMIN_MENUS = [
  { id: 'notice', label: '공지 관리', icon: FiBell, path: '/admin/notice' },
  { id: 'event', label: '이벤트 관리', icon: FiCalendar, path: '/admin/event' },
  { id: 'booth', label: '내 부스', icon: FiHome, path: '/admin/booth' },
  { id: 'pub', label: '주막 관리', icon: FiTool, path: '/admin/pub' },
];

export default function AdminHomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-10">
      <div className="mb-12 flex flex-col items-center">
        <div className="relative mb-4">
          <img
            src="/src/assets/logo.png"
            alt="가두모집 로고"
            className="h-40 w-40 object-contain drop-shadow-xl"
          />
        </div>
      </div>

      <div className="grid w-full max-w-md grid-cols-2 gap-4 px-4">
        {ADMIN_MENUS.map((menu) => (
          <button
            key={menu.id}
            onClick={() => navigate(menu.path)}
            className="group flex aspect-square flex-col items-center justify-center rounded-[32px] border border-gray-200 bg-white px-2 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-knu-red/40 hover:shadow-md active:scale-95"
          >
            <menu.icon className="mb-3 h-10 w-10 text-slate-400 transition-colors duration-300 group-hover:text-knu-red sm:h-12 sm:w-12" />
            <span className="typo-body-1 font-bold whitespace-nowrap text-slate-600 transition-colors duration-300 group-hover:text-knu-red sm:typo-heading-3">
              {menu.label}
            </span>
          </button>
        ))}
      </div>

      <p className="typo-caption mt-12 font-medium text-knu-gray">
        경북대학교 가두모집 관리 시스템
      </p>
    </div>
  );
}
