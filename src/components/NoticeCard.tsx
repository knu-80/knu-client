interface NoticeCardProps {
  number: number;
  title: string;
  date: string;
  category: '공지' | '분실물';
}

export default function NoticeCard({ number, title, date, category }: NoticeCardProps) {
  const categoryBgClass = category === '공지' ? 'bg-knu-red' : 'bg-white border border-knu-red';
  const categoryTextClass = category === '공지' ? 'text-white' : 'text-knu-red';

  return (
    <div className="flex items-center gap-x-4 px-2 sm:px-4 py-4 border-b border-gray-200">
      <div className="w-8 text-center text-gray-500">{number}</div>

      <div className="flex items-center space-x-2 flex-1 min-w-0">
        <span
          className={`shrink-0 px-2 py-0.5 rounded-full text-xs ${categoryBgClass} ${categoryTextClass}`}
        >
          {category}
        </span>
        <h3 className="text-base font-semibold text-black truncate cursor-pointer">{title}</h3>
      </div>

      <div className="hidden sm:block w-24 text-sm text-gray-500 text-right">
        <span>{date}</span>
      </div>
    </div>
  );
}
