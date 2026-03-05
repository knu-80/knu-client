import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import AdminActionButton from '@/components/AdminActionButton';
import AlertModal from '@/components/AlertModal';
import ImageCarouselUploader from '@/components/ImageCarouselUploader';
import { useNoticeDetail } from '@/hooks/useNoticeDetail';
import { useNoticeMutation } from '@/hooks/useNoticeMutation';
import type { NoticeDetail } from '@/apis/modules/noticeApi';

function NoticeEditForm({ notice }: { notice: NoticeDetail }) {
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutateUpdate, isPending } = useNoticeMutation();

  const [formData, setFormData] = useState({
    category: (notice.type === 'GENERAL' ? '공지' : '분실물') as '공지' | '분실물',
    title: notice.title,
    content: notice.content,
    itemName: notice.lostFoundDetail?.foundItem || '',
    foundLocation: notice.lostFoundDetail?.foundPlace || '',
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    onClose: undefined as (() => void) | undefined,
  });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [formData.content]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const { category, title, content, itemName, foundLocation } = formData;

    if (category === '분실물' && (!itemName.trim() || !foundLocation.trim())) {
      setAlertConfig({
        isOpen: true,
        title: '알림',
        message: '물품명과 습득 장소를 모두 입력해주세요.',
        onClose: undefined,
      });
      return;
    }

    if (!title.trim() || !content.trim()) {
      setAlertConfig({
        isOpen: true,
        title: '알림',
        message: '제목과 내용을 모두 입력해주세요.',
        onClose: undefined,
      });
      return;
    }

    const payload = {
      title,
      content,
      ...(category === '분실물' && {
        lostFoundDetail: {
          foundPlace: foundLocation,
          foundItem: itemName,
        },
      }),
    };

    await mutateUpdate(notice.noticeId, payload, {
      onSuccess: () => {
        console.log('Images to be handled later:', imageFiles);
        setAlertConfig({
          isOpen: true,
          title: '수정 완료',
          message: '공지사항이 성공적으로 수정되었습니다.',
          onClose: () => navigate('/admin/notice'),
        });
      },
      onError: (err) => {
        setAlertConfig({
          isOpen: true,
          title: '수정 실패',
          message: `오류가 발생했습니다: ${err.message}`,
          onClose: undefined,
        });
      },
    });
  };

  const isFormValid = formData.title.trim() !== '' && formData.content.trim() !== '' && !isPending;

  return (
    <div className="pt-5 pb-24 px-1">
      <div className="flex flex-col space-y-4 mb-4">
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="typo-heading-3 w-full border-none focus:ring-0 p-0 placeholder-gray-400 text-black caret-knu-red outline-none"
          disabled={isPending}
        />
      </div>

      {formData.category === '분실물' && (
        <div className="bg-gray-50 p-5 rounded-2xl mb-8 space-y-4 border border-gray-100">
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-gray-500 ml-1">물품명</label>
            <input
              type="text"
              placeholder="예: 아이폰 14 프로"
              value={formData.itemName}
              onChange={(e) => handleInputChange('itemName', e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-knu-red transition-colors"
              disabled={isPending}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-gray-500 ml-1">습득 장소</label>
            <input
              type="text"
              placeholder="예: 일청담 벤치"
              value={formData.foundLocation}
              onChange={(e) => handleInputChange('foundLocation', e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-knu-red transition-colors"
              disabled={isPending}
            />
          </div>
        </div>
      )}

      <div className="h-px w-full bg-gray-200 my-5" />

      <div className="mb-10 text-black">
        <textarea
          ref={textareaRef}
          placeholder="내용을 입력하세요."
          value={formData.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          className="typo-body-1 w-full border-none focus:ring-0 p-0 placeholder-gray-400 resize-none min-h-37.5 caret-knu-red outline-none leading-relaxed overflow-hidden"
          disabled={isPending}
        />
      </div>

      <ImageCarouselUploader
        label="관련 사진 관리"
        initialUrls={notice.imageUrls || []}
        onFilesChange={setImageFiles}
        maxCount={5}
        className="mb-10"
      />

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <AdminActionButton
          label={isPending ? '수정 중...' : '수정 완료하기'}
          icon={FaCheck}
          onClick={handleSubmit}
          className={`${isFormValid ? 'bg-knu-red' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={isPending}
        />
      </div>

      <AlertModal
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => {
          setAlertConfig((prev) => ({ ...prev, isOpen: false }));
          if (alertConfig.onClose) alertConfig.onClose();
        }}
      />
    </div>
  );
}

export default function AdminNoticeEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notice, isLoading, error } = useNoticeDetail(id ? Number(id) : null);

  if (error) {
    return (
      <AlertModal
        isOpen={true}
        title="오류"
        message={error.message}
        onClose={() => navigate('/admin/notice')}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="typo-body-1 text-gray-500">데이터를 불러오는 중...</div>
      </div>
    );
  }

  if (!notice) {
    return (
      <AlertModal
        isOpen={true}
        title="알림"
        message="해당 공지사항을 찾을 수 없습니다."
        onClose={() => navigate('/admin/notice')}
      />
    );
  }

  return <NoticeEditForm notice={notice} />;
}
