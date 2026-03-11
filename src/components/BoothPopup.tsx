import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { ClubCategoryLabel } from './ClubCategory';
import type { BoothSummary } from '@/apis/modules/boothApi';

interface BoothPopupProps {
  booths: BoothSummary[];
  boothId: number | null;
  onClose: () => void;
}

export const BoothPopup = memo(function BoothPopup({ booths, boothId, onClose }: BoothPopupProps) {
  const navigate = useNavigate();
  if (!boothId) return null;

  const booth = booths.find((b) => b.id === boothId);
  if (!booth) return null;
  const thumbnail = booth.imageUrls[0];
  const hasImage = thumbnail && thumbnail.trim() !== '';

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/booths/${boothId}`);
  };

  return (
    <>
      <div className="overlay-backdrop" onClick={onClose} />

      <div
        onClick={handlePopupClick}
        className="absolute bottom-22 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-40px)] h-[120px] bg-white rounded-[8px] p-4 shadow-xl flex gap-4 items-center cursor-pointer"
      >
        {hasImage ? (
          <img
            src={thumbnail}
            alt={booth.name}
            className="w-[88px] h-[88px] object-cover rounded-[4px] shrink-0"
          />
        ) : (
          <div className="w-[88px] h-[88px] bg-gray-200 rounded-[4px] relative overflow-hidden shrink-0">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r via-white/40" />
          </div>
        )}

        <div className="flex flex-col h-full overflow-hidden min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <h3 className="truncate font-medium typo-body-1 text-base-deep">{booth.name}</h3>
            <div className="shrink-0">
              <ClubCategoryLabel division={booth.division} />
            </div>
          </div>
          {booth.description && (
            <p className="mt-1 typo-caption text-gray-500 line-clamp-2">{booth.description}</p>
          )}
        </div>
      </div>
    </>
  );
});
