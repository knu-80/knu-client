import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { FiEdit } from 'react-icons/fi';
import { ClubCategoryLabel } from './ClubCategory';
import type { BoothSummary } from '@/apis/modules/boothApi';
import { useAdminSessionStore } from '@/stores/adminSessionStore';
import AdminActionButton from './AdminActionButton';
import { ImageWithFallback } from './Skeleton';

interface BoothPopupProps {
  booths: BoothSummary[];
  boothId: number | null;
  onClose: () => void;
}

export const BoothPopup = memo(function BoothPopup({ booths, boothId, onClose }: BoothPopupProps) {
  const navigate = useNavigate();
  const profile = useAdminSessionStore((state) => state.profile);

  if (!boothId) return null;

  const booth = booths.find((b) => b.id === boothId);
  if (!booth) return null;

  const isAdmin = profile?.role === 'ADMIN';

  const thumbnail = booth.imageUrls[0];

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
      <div className="overlay-backdrop" onClick={onClose} />

      <div
        onClick={handlePopupClick}
        className="absolute bottom-22 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-40px)] min-h-[120px] bg-white rounded-[8px] p-4 shadow-xl flex gap-4 items-center cursor-pointer"
      >
        <ImageWithFallback
          src={thumbnail}
          alt={booth.name}
          className="w-[88px] h-[88px] object-cover rounded-[4px] shrink-0 border border-gray-100"
        />

        <div className="flex flex-col flex-1 h-[88px] justify-between overflow-hidden relative">
          <div className="flex flex-col gap-1 overflow-hidden">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <h3 className="font-medium typo-body-1 truncate text-base-deep max-w-fit">
                {booth.name}
              </h3>
              <div className="shrink-0">
                <ClubCategoryLabel division={booth.division} />
              </div>
            </div>
            <p
              className={`typo-caption text-gray-500 ${isAdmin ? 'line-clamp-1' : 'line-clamp-2'}`}
            >
              {booth.description}
            </p>
          </div>

          {isAdmin && (
            <div className="absolute bottom-[5px] right-[2px] scale-[0.6] origin-bottom-right">
              <AdminActionButton
                label="수정하기"
                icon={FiEdit}
                onClick={handleEditClick}
                className="bg-primary"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
});
