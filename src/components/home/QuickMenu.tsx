import { FiBell, FiMapPin } from 'react-icons/fi';

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
] as const;

export default function QuickMenu() {
  return (
    <section className="grid grid-cols-2 gap-4 py-6">
      {QUICK_MENU_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.target}
            id={item.target}
            type="button"
            className="scroll-mt-[80px] rounded-3xl border border-gray-200 bg-white px-5 py-6 text-left shadow-[0_2px_8px_rgba(15,23,42,0.06)] cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-knu-red/10">
              <Icon className="h-6 w-6 text-knu-red" />
            </span>
            <span className="typo-heading-3 mt-4 block text-knu-gray">{item.label}</span>
            <span className="typo-body-3 mt-2 block text-text-muted">{item.description}</span>
          </button>
        );
      })}
    </section>
  );
}
