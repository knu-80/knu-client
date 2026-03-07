import { useParams } from 'react-router-dom';
import { FaRegCalendar, FaInfoCircle, FaUser } from 'react-icons/fa';
import ImageCarousel from '@/components/ImageCarousel';
import FoundItemCard from '@/components/FoundItemCard';
import { NOTICES } from '@/mocks/notices';

export default function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();

  const notice = NOTICES.find((n) => n.id === Number(id));

  if (!notice) {
    return <div className="py-20 text-center text-gray-500">작성된 공지사항이 없습니다.</div>;
  }

  const isLostItem = notice.category === '분실물';

  return (
    <div className="pt-5">
      <div className="mb-8 rounded-2xl border border-knu-silver/70 bg-white px-4 py-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
              notice.category === '공지'
                ? 'bg-knu-red/10 text-knu-red'
                : 'bg-knu-gray/15 text-knu-gray'
            }`}
          >
            {notice.category}
          </span>
          <span className="text-xs font-medium text-text-muted">공지 상세</span>
        </div>
        <h2 className="typo-heading-3 mt-2 text-knu-gray">{notice.title}</h2>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <FaRegCalendar />
            <span>작성일: {notice.date}</span>
          </div>
          <span className="h-4 w-px bg-gray-300"></span>
          <div className="flex items-center space-x-2">
            <FaUser />
            <span>작성자: {notice.author}</span>
          </div>
        </div>
      </div>

      {isLostItem && (
        <FoundItemCard
          itemName={notice.itemName || '정보 없음'}
          foundLocation={notice.foundLocation || '정보 없음'}
        />
      )}

      <div className="mb-10 mt-5 rounded-2xl border border-knu-silver/65 bg-white px-4 py-4 text-knu-gray shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
        <p className="typo-body-1 whitespace-pre-wrap">{notice.content}</p>
      </div>

      {notice.imgUrls && notice.imgUrls.length > 0 && (
        <ImageCarousel
          imageUrls={notice.imgUrls}
          altText={`${notice.title} 관련 사진`}
          label="관련 사진"
          className="mb-10"
        />
      )}

      {isLostItem && (
        <div className="mb-10 flex items-center space-x-3 rounded-xl border border-knu-red/25 bg-knu-red/8 p-4 text-red-900 shadow-sm">
          <FaInfoCircle className="text-xl text-knu-red" />
          <p className="typo-body-2 font-semibold">분실물은 총동연 부스에서 수령 가능합니다</p>
        </div>
      )}
    </div>
  );
}
