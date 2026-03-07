import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { DEFAULT_BOOTH, MOCK_BOOTHS } from '@/constants/booth';
import { ClubCategory } from './ClubCategory';
import { useAdminSessionStore } from '@/stores/adminSessionStore';

interface BoothPopupProps {
  boothId: number | null;
  onClose: () => void;
}

export const BoothPopup = memo(function BoothPopup({ boothId, onClose }: BoothPopupProps) {
  const navigate = useNavigate();
  const profile = useAdminSessionStore((state) => state.profile);

  if (!boothId) return null;

  const booth = MOCK_BOOTHS[boothId] || DEFAULT_BOOTH;
  const thumbnail = booth.imgUrls?.[0];
  const hasImage = thumbnail && thumbnail.trim() !== '';

  const isGeneralAdmin = profile?.role === 'ADMIN' && profile.boothId === null;

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/booths/${boothId}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/admin/booths/edit/${boothId}`);
  };

  return (
    <>
      <div className="fixed inset-0 z-30 bg-black/5" onClick={onClose} />

      <div
        onClick={handlePopupClick}
        className="absolute bottom-22 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-40px)] min-h-[120px] bg-white rounded-[8px] p-4 shadow-xl flex gap-4 items-center cursor-pointer"
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

        <div className="flex flex-col flex-1 h-[88px] justify-between overflow-hidden">
          <div className="flex flex-col gap-1 overflow-hidden">
            <div className="flex items-center gap-2">
              <h3 className="font-medium typo-body-1 truncate">{booth.name}</h3>
              <ClubCategory division={booth.division} />
            </div>
            <p className="typo-caption text-gray-500 line-clamp-2">{booth.description}</p>
          </div>
          {isGeneralAdmin && (
            <button
              onClick={handleEditClick}
              className="self-end h-8 px-4 bg-knu-red text-white rounded-full typo-caption font-bold hover:brightness-90 active:scale-[0.95] transition-all shadow-sm flex items-center justify-center whitespace-nowrap"
            >
              부스 수정
            </button>
          )}
        </div>
      </div>
    </>
  );
});
