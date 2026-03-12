import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import RepresentativeImage from './RepresentativeImage';
import { Badge } from './Badge';
import { formatDateTime } from '@/lib/date';
import { PiMapPinAreaFill } from 'react-icons/pi';

export interface EventCardProps {
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  location: string;
  imageUrl: string | null;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function EventCard({
  title,
  description,
  startAt,
  endAt,
  location,
  imageUrl,
  isAdmin = false,
  onEdit,
  onDelete,
}: EventCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-sm transition-shadow">
      <div className="relative">
        <RepresentativeImage
          imageUrl={imageUrl}
          altText={`${title} 포스터`}
          height="h-45"
          isZoomable={false}
        />

        {isAdmin && (
          <div className="absolute right-3 top-3 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:bg-white hover:text-knu-red active:scale-90"
              aria-label="수정"
            >
              <FiEdit2 className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md transition-all hover:bg-white hover:text-red-600 active:scale-90"
              aria-label="삭제"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-[2px]">
          <div className="flex justify-between">
            <h3 className="text-body-1 font-medium text-base-deep">{title}</h3>
            <div className="flex items-center gap-[2px] typo-body-2 text-base-deep font-medium">
              <PiMapPinAreaFill className="h-4 w-4 shrink-0" />
              <span>{location}</span>
            </div>
          </div>
          <p className="typo-body-2 text-gray-500 line-clamp-4">{description}</p>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge className="bg-secondary-green/10 text-secondary-green">시작</Badge>
            <span className="typo-body-2 text-base-deep">{formatDateTime(startAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/10 text-primary">종료</Badge>
            <span className="typo-body-2 text-base-deep">{formatDateTime(endAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
