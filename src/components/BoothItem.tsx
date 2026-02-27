import { type BoothDetail } from '@/constants/booth';
import { ClubCategory } from './ClubCategory';

interface BoothItemProps {
  booth: BoothDetail;
  onClick: () => void;
}

export function BoothItem({ booth, onClick }: BoothItemProps) {
  const hasImage = booth.imageUrl && booth.imageUrl.trim() !== '';

  return (
    <div
      onClick={onClick}
      className="w-full h-[100px] bg-white flex gap-4 items-center cursor-pointer shrink-0"
    >
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

      <div className="flex flex-col h-full gap-1 overflow-hidden">
        <div className="flex gap-2">
          <h3 className="font-medium typo-body-1 truncate text-black">{booth.name}</h3>
          <ClubCategory division={booth.division} />
        </div>
        <p className="typo-body-3">{booth.description}</p>
      </div>
    </div>
  );
}
