import { memo } from 'react';
import { DEFAULT_BOOTH, MOCK_BOOTHS } from '@/constants/booth';
import { ClubCategory } from './ClubCategory';

interface BoothPopupProps {
  boothId: number | null;
  onClose: () => void;
}

export const BoothPopup = memo(function BoothPopup({ boothId, onClose }: BoothPopupProps) {
  if (!boothId) return null;

  const booth = MOCK_BOOTHS[boothId] || DEFAULT_BOOTH;
  const hasImage = booth.imageUrl && booth.imageUrl.trim() !== '';

  return (
    <>
      <div className="fixed inset-0 z-30 bg-black/5" onClick={onClose} />

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-40px)] h-[120px] bg-white rounded-[8px] p-4 shadow-xl flex gap-4 items-center cursor-pointer">
        {hasImage ? (
          <img
            src={booth.imageUrl}
            alt={booth.name}
            className="w-[88px] h-[88px] object-cover rounded-[4px] shrink-0"
          />
        ) : (
          <div className="w-[88px] h-[88px] bg-gray-200 rounded-[4px] relative overflow-hidden shrink-0">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r via-white/40" />
          </div>
        )}

        <div className="flex flex-col h-full gap-1 overflow-hidden">
          <div className="flex items-center gap-2">
            <h3 className="font-medium typo-body-1 truncate">{booth.name}</h3>
            <ClubCategory division={booth.division} />
          </div>
          <p className="typo-caption text-gray-500 line-clamp-2">{booth.description}</p>
        </div>
      </div>
    </>
  );
});
