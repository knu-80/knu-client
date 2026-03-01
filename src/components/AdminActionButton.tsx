import { type IconType } from 'react-icons';

interface AdminActionButtonProps {
  label: string;
  onClick: () => void;
  icon: IconType;
  className?: string;
}

export default function AdminActionButton({
  label,
  onClick,
  icon: Icon,
  className = '',
}: AdminActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex h-12 items-center justify-center gap-2 rounded-full px-6 text-white shadow-2xl transition-all hover:scale-105 active:scale-95 ${className}`}
    >
      <Icon className="h-4 w-4" />
      <span className="text-base font-bold whitespace-nowrap">{label}</span>
    </button>
  );
}
