import type { BoothDivision, BoothSummary } from '@/apis/modules/boothApi';
import { ClubCategoryLabel } from './ClubCategory';

interface BoothItemProps {
  booth: BoothSummary;
  onClick: () => void;
  onLocationClick?: (e: React.MouseEvent) => void;
}

function ApplyButton({
  division,
  isActive,
  onClick,
}: {
  division: BoothDivision;
  isActive: boolean;
  onClick: () => void;
}) {
  const isExcluded = division === 'MANAGEMENT' || division === 'EXTERNAL_SUPPORT';
  if (isExcluded) return null;

  if (!isActive) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="h-[30px] px-3 bg-gray-600 text-white rounded-full typo-body-3 font-semibold cursor-not-allowed"
      >
        운영마감
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="h-8 px-4 bg-primary text-white rounded-full typo-body-3 font-medium active:brightness-95 transition-colors"
    >
      지원하기
    </button>
  );
}

export function BoothItem({ booth, onClick, onLocationClick }: BoothItemProps) {
  const thumbnail = booth.imageUrls?.[0];
  const hasImage = thumbnail && thumbnail.trim() !== '';

  return (
    <div className="w-full h-[100px] bg-white flex gap-4 items-center cursor-pointer shrink-0">
      {hasImage ? (
        <img
          src={thumbnail}
          alt={booth.name}
          loading="lazy"
          decoding="async"
          sizes="100px"
          className="w-[100px] h-[100px] object-cover rounded-[4px] shrink-0"
        />
      ) : (
        <div className="w-[100px] h-[100px] bg-gray-200 rounded-[4px] relative overflow-hidden shrink-0">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r via-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
        </div>
      )}
      <div className="flex flex-col flex-1 h-[100px] justify-between overflow-hidden">
        <div className="flex flex-col h-full gap-1 overflow-hidden min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="font-medium typo-body-1 truncate text-base-deep">{booth.name}</h3>
            <div className="shrink-0 text-black">
              <ClubCategoryLabel division={booth.division} />
            </div>
          </div>
          <p className="typo-caption text-gray-500 line-clamp-2">{booth.description}</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLocationClick?.(e);
            }}
            className="h-8 px-4 bg-gray-100 rounded-full text-base-deep typo-caption font-medium active:brightness-95 transition-colors"
          >
            위치보기
          </button>
          <ApplyButton division={booth.division} isActive={booth.isActive} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
