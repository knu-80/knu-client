import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaInstagram, FaPhoneAlt, FaCheck, FaChevronDown } from 'react-icons/fa';
import { FiCamera, FiX } from 'react-icons/fi';
import AdminActionButton from '@/components/AdminActionButton';
import AlertModal from '@/components/AlertModal';
import ClubCategory from '@/components/ClubCategory';
import { DIVISION_INFO, MOCK_BOOTHS, type BoothDetail } from '@/constants/booth';

export default function AdminBoothEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const booth = MOCK_BOOTHS[Number(id)];

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value });
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const [formData, setFormData] = useState({
    name: booth?.name || '',
    divisionKey: (booth?.division || 'ACADEMIC_DIVISION') as BoothDetail['division'],
    grades: [1, 2, 3, 4],
    fee: '40,000',
    description: '안녕하세요 저희는 경북대 동아리입니다.',
    instagram: 'knu_club',
    phone: '010-1234-5678',
    imageUrl: 'https://picsum.photos/600/400',
  });

  const [previewImage, setPreviewImage] = useState<string | null>(formData.imageUrl);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
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

  const handleGradeToggle = (grade: number) => {
    setFormData((prev) => ({
      ...prev,
      grades: prev.grades.includes(grade)
        ? prev.grades.filter((g) => g !== grade)
        : [...prev.grades, grade].sort(),
    }));
  };

  const getGradeText = () => {
    if (formData.grades.length === 4) return '전 학년 모집';
    if (formData.grades.length === 0) return '모집 마감';
    return `${formData.grades.join(', ')}학년 모집`;
  };

  const handleSave = () => {
    if (!isFormValid) {
      setAlertConfig({
        isOpen: true,
        title: '입력 오류',
        message: '모든 필수 항목(이름, 모집 학년, 회비, 소개)을 입력해주세요.',
      });
      return;
    }

    setAlertConfig({
      isOpen: true,
      title: '수정 완료',
      message: '부스 정보가 성공적으로 수정되었습니다.',
      onClose: () => navigate('/admin', { replace: true }),
    });
  };

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.description.trim() !== '' &&
    formData.fee.trim() !== '' &&
    formData.grades.length > 0;

  if (!booth) {
    return (
      <AlertModal
        isOpen={true}
        title="오류"
        message="존재하지 않는 부스입니다."
        onClose={() => navigate('/admin')}
      />
    );
  }

  return (
    <div className="pt-5 pb-24 px-1">
      <div className="flex items-center mb-2 text-black text-nowrap">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="typo-heading-3 bg-transparent border-none focus:ring-0 p-0 caret-knu-red outline-none w-auto max-w-60"
          placeholder="동아리 이름"
        />
        <div className="relative ml-4">
          <button
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
            className="flex items-center space-x-1 hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors group"
          >
            <ClubCategory
              divisionName={DIVISION_INFO[formData.divisionKey as keyof typeof DIVISION_INFO].name}
            />
            <FaChevronDown
              className={`text-[10px] text-gray-400 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isCategoryMenuOpen && (
            <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              {(
                Object.entries(DIVISION_INFO) as [
                  BoothDetail['division'],
                  (typeof DIVISION_INFO)['ACADEMIC_DIVISION'],
                ][]
              ).map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => {
                    setFormData({ ...formData, divisionKey: key });
                    setIsCategoryMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center space-x-2 transition-colors whitespace-nowrap"
                >
                  <div className={`w-2 h-2 rounded-full ${info.color}`} />
                  <span className="text-sm font-medium">{info.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col space-y-3 mb-4 mt-4">
        <div className="flex items-center space-x-3">
          <p className="text-xs font-bold text-gray-400 w-12 shrink-0 tracking-tight">모집 학년</p>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((grade) => (
              <button
                key={grade}
                onClick={() => handleGradeToggle(grade)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all border ${
                  formData.grades.includes(grade)
                    ? 'bg-knu-red text-white border-knu-red shadow-sm scale-105'
                    : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
          <p className="text-sm font-semibold text-knu-red ml-2">{getGradeText()}</p>
        </div>

        <div className="flex items-center space-x-3">
          <p className="text-xs font-bold text-gray-400 w-15 shrink-0 tracking-tight">
            동아리 회비
          </p>
          <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 border border-gray-100 focus-within:border-knu-red transition-colors">
            <input
              type="text"
              value={formData.fee}
              onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
              className="bg-transparent border-none focus:ring-0 outline-none p-0 text-sm font-semibold text-black caret-knu-red w-20 text-right"
              placeholder="0"
            />
            <span className="text-sm font-bold text-gray-500 ml-1">원</span>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gray-200 my-5" />

      <div className="mb-10 text-black">
        <textarea
          ref={textareaRef}
          value={formData.description}
          onChange={handleTextareaChange}
          className="typo-body-1 w-full bg-transparent border-none focus:ring-0 p-0 resize-none min-h-37.5 caret-knu-red outline-none leading-relaxed overflow-hidden"
          placeholder="동아리 상세 설명을 입력해주세요."
        />
      </div>

      <div className="mb-12">
        <h3 className="typo-heading-3 text-black mb-4">동아리 대표 사진</h3>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result as string;
                setPreviewImage(result);
                setFormData((prev) => ({ ...prev, imageUrl: result }));
              };
              reader.readAsDataURL(file);
            }
          }}
          accept="image/*"
          className="hidden"
        />

        <div className="relative w-full aspect-3/2 bg-gray-50 overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          {previewImage ? (
            <img src={previewImage} alt="미리보기" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
              <FiCamera className="mb-2 h-8 w-8" />
              <span className="text-xs">이미지 없음</span>
            </div>
          )}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100"
          >
            <div className="rounded-full bg-white/90 p-3 shadow-md">
              <FiCamera className="h-5 w-5 text-gray-700" />
            </div>
          </div>
          {previewImage && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreviewImage(null);
                setFormData((prev) => ({ ...prev, imageUrl: '' }));
              }}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-md transition-transform active:scale-90 z-10"
            >
              <FiX className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-10">
        <h3 className="typo-heading-3 mb-5 text-black">문의하기</h3>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-linear-to-br from-purple-500 to-pink-500 p-2.5 rounded-2xl text-white shadow-sm">
              <FaInstagram className="h-5 w-5" />
            </div>
            <div className="flex-1 flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 focus-within:border-knu-red transition-colors">
              <span className="text-gray-400 mr-1 font-medium">@</span>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="bg-transparent border-none outline-none focus:ring-0 p-0 typo-body-1 font-semibold text-black w-full"
                placeholder="인스타그램 아이디"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 p-2.5 rounded-2xl text-white shadow-sm">
              <FaPhoneAlt className="h-5 w-5" />
            </div>
            <div className="flex-1 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 focus-within:border-knu-red transition-colors">
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-transparent border-none outline-none focus:ring-0 p-0 typo-body-1 font-semibold text-black w-full"
                placeholder="010-0000-0000"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <AdminActionButton
          label="수정 완료하기"
          icon={FaCheck}
          onClick={handleSave}
          className={`${isFormValid ? 'bg-knu-red' : 'bg-gray-400 cursor-not-allowed'}`}
        />
      </div>

      <AlertModal
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => {
          const { onClose } = alertConfig;
          setAlertConfig((prev) => ({ ...prev, isOpen: false }));
          if (onClose) onClose();
        }}
      />
    </div>
  );
}
