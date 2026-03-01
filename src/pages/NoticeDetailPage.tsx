import { useParams } from 'react-router-dom';
import { FaRegCalendar, FaInfoCircle, FaUser } from 'react-icons/fa';
import RepresentativeImage from '@/components/RepresentativeImage';
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
      <div className="flex flex-col space-y-1 mb-8 text-black">
        <h2 className="typo-heading-3">{notice.title}</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1 pt-1">
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

      <div className="mb-10 mt-5 text-black">
        <p className="typo-body-1 whitespace-pre-wrap">{notice.content}</p>
      </div>

      {notice.imgUrl && (
        <div className="mb-5">
          <h3 className="typo-heading-3 text-black mb-3">관련 사진</h3>
          <RepresentativeImage imageUrl={notice.imgUrl} altText={`${notice.title} 관련 사진`} />
        </div>
      )}

      {isLostItem && (
        <div className="flex items-center space-x-3 p-4 bg-red-50/50 border border-red-100 text-red-900 rounded-xl mb-10 shadow-sm">
          <FaInfoCircle className="text-xl text-knu-red" />
          <p className="typo-body-2 font-semibold">분실물은 총동연 부스에서 수령 가능합니다</p>
        </div>
      )}
    </div>
  );
}
