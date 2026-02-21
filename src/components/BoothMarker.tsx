interface BoothMarkerProps {
  x: number;
  y: number;
  name: string;
  bgColorClass: string;
  isManagement?: boolean;
  isOpen: boolean;
  onClick: () => void;
}

export function BoothMarker({
  x,
  y,
  name,
  bgColorClass,
  isManagement,
  // isOpen,
  onClick,
}: BoothMarkerProps) {
  const width = isManagement ? 'w-[120px]' : 'w-[72px]';
  const height = 'h-[64px]';

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
      <div
        className={`relative w-full h-full rounded-[4px] ${bgColorClass ?? 'bg-gray-300'} border border-black/5`}
      >
        {/* {isOpen && <span className="absolute top-1 left-1 h-2 w-2 rounded-full bg-knu-red" />} */}
      </div>

      {name && (
        <span
          className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 text-[12px] font-medium whitespace-nowrap`}
        >
          {name}
        </span>
      )}
    </button>
  );
}
