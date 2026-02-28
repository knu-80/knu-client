import { Link } from 'react-router-dom';

interface NoticeCardProps {
  id: number;
  index: number;
  title: string;
  date: string;
  category: '공지' | '분실물';
  totalCount: number;
}

export default function NoticeCard({
  id,
  index,
  title,
  date,
  category,
  totalCount,
}: NoticeCardProps) {
  const categoryBgClass = category === '공지' ? 'bg-knu-red' : 'bg-white border border-knu-red';
  const categoryTextClass = category === '공지' ? 'text-white' : 'text-knu-red';

  const displayNum = totalCount - index;

  return (
    <div className="flex items-center gap-x-4 px-2 sm:px-4 py-4 border-b border-gray-200">
      <div className="w-8 text-center text-xs sm:text-sm text-gray-500 font-medium">
        {displayNum}
      </div>

      <div className="flex items-center space-x-2 flex-1 min-w-0">
        <span
          className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] sm:text-xs ${categoryBgClass} ${categoryTextClass}`}
        >
          {category}
        </span>
        <Link
          to={`/notice/${id}`}
          className="text-xs sm:text-base font-semibold text-black truncate hover:text-knu-red transition-colors"
        >
          {title}
        </Link>
      </div>

      <div className="w-16 text-[10px] sm:text-xs text-gray-500 text-center">
        <span>{date}</span>
      </div>
    </div>
  );
}
