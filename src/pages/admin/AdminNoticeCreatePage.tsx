import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaTimes, FaCheck } from 'react-icons/fa';
import AdminActionButton from '@/components/AdminActionButton';
import SegmentedControl from '@/components/SegmentedControl';

export default function AdminNoticeCreatePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState<'공지' | '분실물'>('공지');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [itemName, setItemName] = useState('');
  const [foundLocation, setFoundLocation] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.onerror = () => {
        alert('사진을 읽어오는 중 오류가 발생했습니다.');
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
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    alert('공지사항이 등록되었습니다.');
    navigate('/admin/notice');
  };

  const isFormValid = title.trim() !== '' && content.trim() !== '';

  return (
    <div className="pt-5 pb-24 px-1">
      <div className="mb-6">
        <SegmentedControl
          options={[
            { label: '공지', value: '공지' },
            { label: '분실물', value: '분실물' },
          ]}
          selectedValue={category}
          onChange={(val) => setCategory(val as '공지' | '분실물')}
        />
      </div>

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
          label="공지 등록하기"
          icon={FaCheck}
          onClick={handleSubmit}
          className={`${isFormValid ? 'bg-knu-red' : 'bg-gray-400 cursor-not-allowed'}`}
        />
      </div>
    </div>
  );
}
