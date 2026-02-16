import { FiBell, FiGift, FiInstagram, FiMapPin } from 'react-icons/fi';

const QUICK_MENU_ITEMS = [
  {
    label: '부스 배치도',
    description: '동아리 부스 위치 확인',
    target: 'booth',
    icon: FiMapPin,
  },
  {
    label: '공지사항',
    description: '공지 · 이벤트 · 분실물',
    target: 'notices',
    icon: FiBell,
  },
  {
    label: '이벤트',
    description: '스탬프 · 이벤트 안내',
    target: 'events',
    icon: FiGift,
  },
  {
    label: '인스타그램',
    description: '총동연 소식 바로가기',
    target: 'instagram',
    icon: FiInstagram,
  },
] as const;

export default function QuickMenu() {
  return (
    <nav
      id="quick-menu"
      aria-label="빠른 메뉴"
      className="grid scroll-mt-[80px] grid-cols-2 gap-4 py-6"
    >
      {QUICK_MENU_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.target}
            href={`#${item.target}`}
            className="rounded-3xl border border-gray-200 bg-white px-5 py-6 text-left shadow-[0_2px_8px_rgba(15,23,42,0.06)] transition-colors hover:bg-gray-50"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-knu-red/10">
              <Icon className="h-6 w-6 text-knu-red" aria-hidden="true" />
            </span>
            <span className="typo-heading-3 mt-4 block text-knu-gray">{item.label}</span>
            <span className="typo-body-3 mt-2 block text-text-muted">{item.description}</span>
          </a>
        );
      })}
    </nav>
  );
}
