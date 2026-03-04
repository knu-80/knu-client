import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import AdminActionButton from '@/components/AdminActionButton';
import AlertModal from '@/components/AlertModal';
import ImageCarouselUploader from '@/components/ImageCarouselUploader';
import { NOTICES } from '@/mocks/notices';

export default function AdminNoticeEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const initialNotice = NOTICES.find((n) => n.id === Number(id));
  const category = (initialNotice?.category as '공지' | '분실물') || '공지';

  const [title, setTitle] = useState(initialNotice?.title || '');
  const [content, setContent] = useState(initialNotice?.content || '');
  const [itemName, setItemName] = useState(initialNotice?.itemName || '');
  const [foundLocation, setFoundLocation] = useState(initialNotice?.foundLocation || '');
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onClose?: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  // 초기 렌더링 시 텍스트 영역 높이 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  if (!initialNotice) {
    return (
      <AlertModal
        isOpen={true}
        title="오류"
        message="존재하지 않는 공지사항입니다."
        onClose={() => navigate('/admin/notice')}
      />
    );
  }

  const closeAlert = () => {
    const { onClose } = alertConfig;
    setAlertConfig((prev) => ({ ...prev, isOpen: false }));
    if (onClose) onClose();
  };

  const showAlert = (title: string, message: string, onClose?: () => void) => {
    setAlertConfig({ isOpen: true, title, message, onClose });
  };

  const handlehandleSubmit = () => {
    if (category === '분실물' && (!itemName.trim() || !foundLocation.trim())) {
      showAlert('알림', '물품명과 습득 장소를 모두 입력해주세요.');
      return;
    }

    if (!title.trim() || !content.trim()) {
      showAlert('알림', '제목과 내용을 모두 입력해주세요.');
      return;
    }

    const payload = {
      title,
      content,
      category,
      itemName: category === '분실물' ? itemName : undefined,
      foundLocation: category === '분실물' ? foundLocation : undefined,
    };
    console.log('Update Notice Payload with files:', payload, imageFiles);

    showAlert('수정 완료', '공지사항이 성공적으로 수정되었습니다.', () => {
      navigate(`/admin/notice`, { replace: true });
    });
  };

  const isFormValid = (() => {
    const commonValid = title.trim() !== '' && content.trim() !== '';
    if (category === '분실물') {
      return commonValid && itemName.trim() !== '' && foundLocation.trim() !== '';
    }
    return commonValid;
  })();

  return (
    <div className="pt-5 pb-24 px-1">
      <div className="flex flex-col space-y-4 mb-4">
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="typo-heading-3 w-full border-none focus:ring-0 p-0 placeholder-gray-400 text-black caret-knu-red outline-none"
        />
      </div>

      {category === '분실물' && (
        <div className="bg-gray-50 p-5 rounded-2xl mb-8 space-y-4 border border-gray-100">
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-gray-500 ml-1">물품명</label>
            <input
              type="text"
              placeholder="예: 아이폰 14 프로"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-knu-red transition-colors"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-bold text-gray-500 ml-1">습득 장소</label>
            <input
              type="text"
              placeholder="예: 일청담 벤치"
              value={foundLocation}
              onChange={(e) => setFoundLocation(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-knu-red transition-colors"
            />
          </div>
        </div>
      )}

      <div className="h-px w-full bg-gray-200 my-5" />

      <div className="mb-10 text-black">
        <textarea
          ref={textareaRef}
          placeholder="내용을 입력하세요."
          value={content}
          onChange={handleTextareaChange}
          className="typo-body-1 w-full border-none focus:ring-0 p-0 placeholder-gray-400 resize-none min-h-37.5 caret-knu-red outline-none leading-relaxed overflow-hidden"
        />
      </div>

      <ImageCarouselUploader
        label="관련 사진 관리"
        initialUrls={initialNotice.imgUrls}
        onFilesChange={setImageFiles}
        maxCount={5}
        className="mb-10"
      />

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <AdminActionButton
          label="수정 완료하기"
          icon={FaCheck}
          onClick={handlehandleSubmit}
          className={`${isFormValid ? 'bg-knu-red' : 'bg-gray-400 cursor-not-allowed'}`}
        />
      </div>

      <AlertModal
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={closeAlert}
      />
    </div>
  );
}
