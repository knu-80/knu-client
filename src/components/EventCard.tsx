import { FiClock, FiMapPin, FiEdit2, FiTrash2 } from 'react-icons/fi';
import RepresentativeImage from './RepresentativeImage';

export interface EventCardProps {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  imageUrl: string | null;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function EventCard({
  title,
  description,
  startDate,
  endDate,
  location,
  imageUrl,
  isAdmin = false,
  onEdit,
  onDelete,
}: EventCardProps) {
  const formatDateTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return '미지정';
    return dateTimeStr.replace('T', ' ').replace(/-/g, '.');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
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

      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </div>

        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FiClock className="h-3.5 w-3.5 shrink-0 text-knu-red" />
            <span className="truncate">
              {formatDateTime(startDate)} ~ {formatDateTime(endDate)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FiMapPin className="h-3.5 w-3.5 shrink-0 text-knu-red" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
