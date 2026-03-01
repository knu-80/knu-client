import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCamera, FaTimes, FaCheck } from 'react-icons/fa';
import AdminActionButton from '@/components/AdminActionButton';
import AlertModal from '@/components/AlertModal';
import { NOTICES } from '@/mocks/notices';

export default function AdminNoticeEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialNotice = NOTICES.find((n) => n.id === Number(id));
  const category = (initialNotice?.category as '공지' | '분실물') || '공지';

  const [title, setTitle] = useState(initialNotice?.title || '');
  const [content, setContent] = useState(initialNotice?.content || '');
  const [itemName, setItemName] = useState(initialNotice?.itemName || '');
  const [foundLocation, setFoundLocation] = useState(initialNotice?.foundLocation || '');
  const [selectedImage, setSelectedImage] = useState<string | null>(
    initialNotice ? 'https://picsum.photos/600/400' : null,
  );

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.onerror = () => {
        showAlert('오류', '사진을 읽어오는 중 오류가 발생했습니다.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (!isFormValid) {
      showAlert('알림', '제목과 내용을 모두 입력해주세요.');
      return;
    }

    showAlert('수정 완료', '공지사항이 성공적으로 수정되었습니다.', () => {
      navigate(`/admin/notice/${id}`);
    });
  };

  const isFormValid = title.trim() !== '' && content.trim() !== '';

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
              placeholder="예: 대강당 앞 벤치"
              value={foundLocation}
              onChange={(e) => setFoundLocation(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-knu-red transition-colors"
            />
          </div>
        </div>
      )}

      <div className="h-px w-full bg-gray-200 my-5" />

      <div className="mb-5 text-black">
        <textarea
          placeholder="내용을 입력하세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="typo-body-1 w-full border-none focus:ring-0 p-0 placeholder-gray-400 resize-none min-h-75 caret-knu-red outline-none"
        />
      </div>

      <div className="mb-10">
        <h3 className="typo-heading-3 text-black mb-4">관련 사진</h3>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {selectedImage ? (
          <div className="relative group rounded-2xl overflow-hidden shadow-md border border-gray-100">
            <img
              src={selectedImage}
              alt="미리보기"
              className="w-full h-auto object-cover max-h-100"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center space-y-3 text-gray-400 hover:bg-gray-100 hover:border-gray-300 transition-all group"
          >
            <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
              <FaCamera className="text-2xl text-gray-400" />
            </div>
            <span className="text-sm font-medium">사진 첨부하기</span>
          </button>
        )}
      </div>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <AdminActionButton
          label="수정 완료하기"
          icon={FaCheck}
          onClick={handleSubmit}
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
