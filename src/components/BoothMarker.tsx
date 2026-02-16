interface BoothMarkerProps {
  x: number;
  y: number;
  rotate: -2 | 2 | 20;
  bgColorClass?: string;
  isManagement?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

export function BoothMarker({ 
  x, 
  y, 
  rotate, 
  bgColorClass, 
  isManagement, 
  isOpen, 
  onClick 
}: BoothMarkerProps) {
  const width = isManagement ? 'w-[120px]' : 'w-[72px]';
  const height = 'h-[64px]';

  const rotateClass = {
    '-2': '-rotate-2',
    '2': 'rotate-2',
    '20': 'rotate-[20deg]',
  }[rotate];

  return (
    <button
      className={`absolute ${width} ${height} ${rotateClass} cursor-pointer hover:brightness-95`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transformOrigin: 'center center',
      }}
      onClick={onClick}
    >
      <div className={`relative w-full h-full rounded-[4px] flex items-center justify-center ${bgColorClass ?? 'bg-gray-300'}`} >
        {isOpen && (
          <span className="absolute top-1 left-1 h-2 w-2 rounded-full bg-knu-red" />
        )}
      </div>
    </button>
  );
}