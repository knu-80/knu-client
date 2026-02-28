import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegCalendar, FaInfoCircle, FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import RepresentativeImage from '@/components/RepresentativeImage';
import FoundItemCard from '@/components/FoundItemCard';
import ConfirmModal from '@/components/ConfirmModal';
import { NOTICES } from '@/mocks/notices';

export default function AdminNoticeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const notice = NOTICES.find((n) => n.id === Number(id));

  if (!notice) {
    return <div className="py-20 text-center text-gray-500">작성된 공지사항이 없습니다.</div>;
  }

  const isLostItem = notice.category === '분실물';

  const handleEdit = () => {
    navigate(`/admin/notice/edit/${id}`);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteModalOpen(false);
    navigate('/admin/notice');
  };

  return (
    <div className="pt-5 pb-24 px-1">
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

      <div className="mb-12">
        <h3 className="typo-heading-3 text-black mb-3">관련 사진</h3>
        <RepresentativeImage
          imageUrl="https://picsum.photos/600/400"
          altText={`${notice.title} 관련 사진`}
        />
      </div>

      {isLostItem && (
        <div className="flex items-center space-x-3 p-4 bg-red-50/50 border border-red-100 text-red-900 rounded-xl mb-10 shadow-sm">
          <FaInfoCircle className="text-xl text-knu-red" />
          <p className="typo-body-2 font-semibold">분실물은 총동연 부스에서 수령 가능합니다</p>
        </div>
      )}

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-3 w-fit px-4">
        <button
          onClick={handleEdit}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#0F172A] px-6 text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
        >
          <FaEdit className="h-4 w-4" />
          <span className="text-base font-bold whitespace-nowrap">수정하기</span>
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-red-600 px-6 text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
        >
          <FaTrash className="h-4 w-4" />
          <span className="text-base font-bold whitespace-nowrap">삭제하기</span>
        </button>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="공지사항 삭제"
        message="정말 이 공지사항을 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
        confirmText="삭제"
        cancelText="취소"
      />
    </div>
  );
}
