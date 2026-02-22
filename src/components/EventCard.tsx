import { FiClock, FiMapPin } from 'react-icons/fi';
import RepresentativeImage from './RepresentativeImage';

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string | null;
}

export default function EventCard({
  title,
  description,
  date,
  location,
  imageUrl,
}: EventCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <RepresentativeImage imageUrl={imageUrl} />

      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </div>

        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FiClock className="h-3.5 w-3.5 shrink-0 text-knu-red" />
            <span>{date}</span>
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
