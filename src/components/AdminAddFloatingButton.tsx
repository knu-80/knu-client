import { SlPencil } from 'react-icons/sl';

interface AdminAddFloatingButtonProps {
  label: string;
  onClick: () => void;
}

export default function AdminAddFloatingButton({ label, onClick }: AdminAddFloatingButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex h-12 w-fit items-center justify-center gap-3 rounded-full bg-[#0F172A] px-6 text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
    >
      <SlPencil className="h-4 w-4" />
      <span className="text-base font-bold whitespace-nowrap text-white">{label}</span>
    </button>
  );
}
