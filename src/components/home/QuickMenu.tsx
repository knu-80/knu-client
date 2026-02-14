import { FiBell, FiMapPin } from 'react-icons/fi';

const QUICK_MENU_ITEMS = [
  { label: '부스 배치도', target: 'booth', icon: FiMapPin, variant: 'accent' },
  { label: '공지사항 & 이벤트', target: 'notices', icon: FiBell, variant: 'plain' },
] as const;

type QuickMenuItem = (typeof QUICK_MENU_ITEMS)[number];

const getCardClassName = (variant: QuickMenuItem['variant']) =>
  variant === 'accent' ? 'bg-knu-red/10' : 'bg-white';

export default function QuickMenu() {
  return (
    <section className="grid grid-cols-2 gap-4">
      {QUICK_MENU_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.target}
            id={item.target}
            type="button"
            className={`scroll-mt-[80px] rounded-3xl px-4 py-6 text-center ${getCardClassName(
              item.variant,
            )}`}
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <Icon className="h-6 w-6 text-knu-red" />
            </span>
            <span className="typo-body-2 mt-3 block font-semibold text-knu-gray">{item.label}</span>
          </button>
        );
      })}
    </section>
  );
}
