import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaInstagram, FaPhoneAlt, FaCheck, FaChevronDown, FaLink } from 'react-icons/fa';
import AdminActionButton from '@/components/AdminActionButton';
import AlertModal from '@/components/AlertModal';
import { ClubCategory } from '@/components/ClubCategory';
import ImageCarouselUploader from '@/components/ImageCarouselUploader';
import { DIVISION_INFO } from '@/constants/booth';
import type { BoothSummary } from '@/apis';

interface BoothEditForm {
  name: string;
  divisionKey: BoothSummary['division'];
  grades: number[];
  fee: string;
  description: string;
  instagram: string;
  phone: string;
  imageUrls: string[];
  applyUrl: string;
}

interface BoothUpdatePayload {
  name: string;
  division: string;
  recruitmentGrades: string;
  fee: string;
  description: string;
  instagram: string;
  phone: string;
  imageUrls: string[];
  applyUrl: string;
}

export default function AdminBoothEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const booth = id;

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value });
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const [formData, setFormData] = useState<BoothEditForm>({
    name: '',
    divisionKey: 'ACADEMIC_DIVISION' as BoothSummary['division'],
    grades: [1, 2, 3, 4],
    fee: '40,000',
    description: '안녕하세요 저희는 경북대 동아리입니다.',
    instagram: 'knu_club',
    phone: '010-1234-5678',
    imageUrls: ['https://picsum.photos/600/400'],
    applyUrl: 'https://example.com/apply',
  });

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
        message: '모든 필수 항목(이름, 소개, 회비)을 입력해주세요.',
      });
      return;
    }

    const payload: BoothUpdatePayload = {
      name: formData.name,
      division: DIVISION_INFO[formData.divisionKey].name,
      recruitmentGrades: getGradeText(),
      fee: formData.fee,
      description: formData.description,
      instagram: formData.instagram,
      phone: formData.phone,
      imageUrls: formData.imageUrls,
      applyUrl: formData.applyUrl,
    };

    console.log('Saving payload:', payload);

    setAlertConfig({
      isOpen: true,
      title: '수정 완료',
      message: '부스 정보가 성공적으로 수정되었습니다.',
      onClose: () => navigate('/admin', { replace: true }),
    });
  };

  const isFormValid =
    formData.name.trim() !== '' && formData.description.trim() !== '' && formData.fee.trim() !== '';

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
            <ClubCategory division={formData.divisionKey} />
            <FaChevronDown
              className={`text-[10px] text-gray-400 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isCategoryMenuOpen && (
            <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
              {(
                Object.entries(DIVISION_INFO) as [
                  BoothSummary['division'],
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
          placeholder="동아리 상세 소개를 입력해주세요."
        />
      </div>

      <ImageCarouselUploader
        label="동아리 활동 사진"
        imageUrls={formData.imageUrls}
        onImagesChange={(urls) => setFormData((prev) => ({ ...prev, imageUrls: urls }))}
        maxCount={5}
        className="mb-10"
      />

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

      <div className="mb-10">
        <h3 className="typo-heading-3 mb-5 text-black">지원하기</h3>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-800 p-2.5 rounded-2xl text-white shadow-sm">
            <FaLink className="h-5 w-5" />
          </div>
          <div className="flex-1 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 focus-within:border-knu-red transition-colors">
            <input
              type="text"
              value={formData.applyUrl}
              onChange={(e) => setFormData({ ...formData, applyUrl: e.target.value })}
              className="bg-transparent border-none outline-none focus:ring-0 p-0 typo-body-1 font-semibold text-black w-full"
              placeholder="지원 링크 (구글 폼 등)"
            />
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
