import { useParams } from 'react-router-dom';
import ImageCarousel from '@/components/ImageCarousel';
import FoundItemCard from '@/components/FoundItemCard';
import { useNoticeDetail } from '@/hooks/useNoticeDetail';
import { toNoticeLabel } from '@/apis/enumMapper';
import { StatusDisplay } from '@/components/StatusDisplay';
import { PiSpinnerGapThin } from 'react-icons/pi';
import { Badge } from '@/components/Badge';
import { NOTICE_CATEGORY_COLOR_MAP } from '@/constants/notice';
import { FaInfoCircle } from 'react-icons/fa';

export default function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const noticeId = id ? Number(id) : null;
  const { notice, isLoading, error } = useNoticeDetail(noticeId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <PiSpinnerGapThin className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-5">
        <StatusDisplay variant="error" title="인터넷 연결을 확인해주세요" />
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-5">
        <StatusDisplay variant="error" title="해당 공지를 찾을 수 없습니다" />
      </div>
    );
  }

  const isLostItem = toNoticeLabel(notice.type) === '분실물';
  const label = toNoticeLabel(notice.type);
  const color = NOTICE_CATEGORY_COLOR_MAP[label as '공지' | '분실물'];

  return (
    <div className="pt-5">
      <div className="flex flex-col space-y-1 mb-4 text-base-deep">
        <h2 className="typo-heading-3 min-w-0 leading-tight break-words">
          <Badge
            className={`inline-flex align-middle mr-2 ${color.badgeBg} ${color.badgeText} typo-body-2 font-medium`}
          >
            {label}
          </Badge>
          <span className="align-middle">{notice.title}</span>
        </h2>
        <div className="flex items-center space-x-1 typo-body-3 text-gray-500 mt-1">
          <span>{notice.authorNickname} ·</span>
          <span>{notice.createdAt.split('T')[0]} 작성됨</span>
        </div>
      </div>

      <div className="mb-10 mt-4 text-base-deep">
        <p className="typo-body-2 whitespace-pre-wrap">{notice.content}</p>
      </div>

      {isLostItem && notice.lostFoundDetail && (
        <FoundItemCard
          itemName={notice.lostFoundDetail.foundItem}
          foundLocation={notice.lostFoundDetail.foundPlace}
        />
      )}

      {isLostItem && (
        <div className="mt-3 mb-10 flex p-3 items-center bg-primary/10 rounded-xl gap-2">
          <FaInfoCircle className="text-primary shrink-0 w-4 h-4" />
          <p className="typo-body-3 font-medium text-primary leading-tight">
            분실물은 총동연 부스에서 수령할 수 있어요.
          </p>
        </div>
      )}

      {notice.imageUrls && notice.imageUrls.length > 0 && (
        <div className="mb-10">
          <h3 className="typo-heading-4 mb-2 text-base-deep">관련 사진</h3>
          <ImageCarousel
            imageUrls={notice.imageUrls}
            altText={`${notice.title} 사진`}
            className="mb-10"
          />
        </div>
      )}
    </div>
  );
}
