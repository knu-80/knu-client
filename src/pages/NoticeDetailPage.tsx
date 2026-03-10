import { useParams } from 'react-router-dom';
import { FaRegCalendar, FaInfoCircle, FaUser } from 'react-icons/fa';
import ImageCarousel from '@/components/ImageCarousel';
import FoundItemCard from '@/components/FoundItemCard';
import { useNoticeDetail } from '@/hooks/useNoticeDetail';
import { toNoticeLabel } from '@/apis/enumMapper';

export default function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const noticeId = id ? Number(id) : null;
  const { notice, isLoading, error } = useNoticeDetail(noticeId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-knu-red"></div>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="py-20 text-center text-gray-500">
        공지사항을 불러오는 중 오류가 발생했거나 존재하지 않는 공지입니다.
      </div>
    );
  }

  const isLostItem = toNoticeLabel(notice.type) === '분실물';

  return (
    <div className="pt-5">
      <div className="flex flex-col space-y-1 mb-8 text-black">
        <h2 className="typo-heading-3">{notice.title}</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1 pt-1">
          <div className="flex items-center space-x-2">
            <FaRegCalendar />
            <span>작성일: {notice.createdAt.split('T')[0]}</span>
          </div>
          <span className="h-4 w-px bg-gray-300"></span>
          <div className="flex items-center space-x-2">
            <FaUser />
            <span>작성자: {notice.authorNickname}</span>
          </div>
        </div>
      </div>

      {isLostItem && notice.lostFoundDetail && (
        <FoundItemCard
          itemName={notice.lostFoundDetail.foundItem}
          foundLocation={notice.lostFoundDetail.foundPlace}
        />
      )}

      <div className="mb-10 mt-5 text-black">
        <p className="typo-body-1 whitespace-pre-wrap">{notice.content}</p>
      </div>

      {notice.imageUrls && notice.imageUrls.length > 0 && (
        <ImageCarousel
          imageUrls={notice.imageUrls}
          altText={`${notice.title} 관련 사진`}
          label="관련 사진"
          className="mb-10"
        />
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
