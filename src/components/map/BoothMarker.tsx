import { memo } from 'react';

interface BoothMarkerProps {
  x: number;
  y: number;
  name: string;
  bgColorClass: string;
  isSelected: boolean;
  isManagement?: boolean;
  isOpen: boolean;
  onClick: () => void;
}

export const BoothMarker = memo(function BoothMarker({
  x,
  y,
  name,
  bgColorClass,
  isSelected,
  isManagement,
  // isOpen,
  onClick,
}: BoothMarkerProps) {
  const width = isManagement ? 'w-[72px]' : 'w-[60px]';
  const height = 'h-[48px]';

  return (
    <button
      className={`absolute ${width} ${height} cursor-pointer hover:brightness-95`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transformOrigin: 'center center',
      }}
      onClick={onClick}
    >
      <div className={`relative w-full h-full rounded-[4px] ${bgColorClass} border border-black/5`}>
        {/* {isOpen && <span className="absolute top-1 left-1 h-2 w-2 rounded-full bg-knu-red" />} */}
      </div>

      {name && (
        <span
          className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 typo-caption font-medium ${isSelected ? 'text-white' : 'text-black'} whitespace-nowrap`}
        >
          {name}
        </span>
      )}
    </button>
  );
});
