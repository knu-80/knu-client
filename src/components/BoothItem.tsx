import { type BoothDetail } from '@/constants/booth';
import { ClubCategory } from './ClubCategory';

interface BoothItemProps {
  booth: BoothDetail;
  onClick: () => void;
  onLocationClick?: (e: React.MouseEvent) => void;
}

export function BoothItem({ booth, onClick, onLocationClick }: BoothItemProps) {
  const hasImage = booth.imageUrl && booth.imageUrl.trim() !== '';

  return (
    <div className="w-full h-[100px] bg-white flex gap-4 items-center cursor-pointer shrink-0">
      {hasImage ? (
        <img
          src={booth.imageUrl}
          alt={booth.name}
          className="w-[100px] h-[100px] object-cover rounded-[4px] shrink-0"
        />
      ) : (
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-[4px] relative overflow-hidden shrink-0">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r via-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
        </div>
      )}

      <div className="flex flex-col flex-1 h-[100px] justify-between py-1 overflow-hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold typo-body-1 truncate text-gray-900">{booth.name}</h3>
            <ClubCategory division={booth.division} />
          </div>
          <p className="typo-body-3 text-gray-500 line-clamp-1">{booth.description}</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLocationClick?.(e);
            }}
            className="h-8 px-4 bg-gray-100 rounded-full text-gray-700 typo-caption font-semibold active:brightness-95 transition-colors"
          >
            위치보기
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="h-8 px-4 bg-knu-red text-white rounded-full typo-caption font-semibold active:brightness-95 transition-colors"
          >
            지원하기
          </button>
        </div>
      </div>
    </div>
  );
}
