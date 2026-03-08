import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheck, FaChevronDown, FaLink } from 'react-icons/fa';
import AdminActionButton from '@/components/AdminActionButton';
import AlertModal from '@/components/AlertModal';
import ClubCategory from '@/components/ClubCategory';
import ImageCarouselUploader, { type ImageItem } from '@/components/ImageCarouselUploader';
import { DIVISION_INFO, type BoothDetail } from '@/constants/booth';
import { getBooth, type BoothDivision, type BoothSummary } from '@/apis/modules/boothApi';
import { useAdminSessionStore } from '@/stores/adminSessionStore';
import { useBoothMutation } from '@/hooks/useBoothMutation';
import { urlToFile } from '@/apis/modules/noticeApi';

interface BoothEditForm {
  name: string;
  divisionKey: BoothDetail['division'];
  description: string;
  applyUrl: string;
}

function BoothEditForm({ booth }: { booth: BoothSummary }) {
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { profile } = useAdminSessionStore();
  const { mutateUpdate, mutateUpdateImages, isPending: isSubmitting } = useBoothMutation();

  const [formData, setFormData] = useState<BoothEditForm>({
    name: booth.name,
    divisionKey: booth.division as BoothDetail['division'],
    description: booth.description || '',
    applyUrl: booth.applyLink || '',
  });

  const [allImages, setAllImages] = useState<ImageItem[]>(() =>
    (booth.imageUrls || []).map((url, index) => ({
      id: `initial-${index}`,
      previewUrl: url,
      file: null,
    })),
  );

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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [formData.description]);

  const handleSave = async () => {
    if (!isFormValid || !profile || profile.memberId === null) return;

    const isTextChanged =
      formData.name !== booth.name ||
      formData.divisionKey !== booth.division ||
      formData.description !== (booth.description || '') ||
      formData.applyUrl !== (booth.applyLink || '');

    const isImagesChanged =
      allImages.length !== (booth.imageUrls?.length || 0) ||
      allImages.some(
        (item, index) => item.file !== null || item.previewUrl !== booth.imageUrls[index],
      );

    if (!isTextChanged && !isImagesChanged) {
      setAlertConfig({
        isOpen: true,
        title: '알림',
        message: '수정된 내용이 없습니다.',
      });
      return;
    }

    const handleImageUpdate = async () => {
      try {
        const files = await Promise.all(
          allImages.map(async (item) => {
            if (item.file) return item.file;
            return await urlToFile(item.previewUrl);
          }),
        );

        await mutateUpdateImages(booth.id, files, {
          onSuccess: () => {
            setAlertConfig({
              isOpen: true,
              title: '수정 완료',
              message: '부스 정보가 성공적으로 수정되었습니다.',
              onClose: () => {
                const redirectPath = profile.boothId ? '/admin' : '/map';
                navigate(redirectPath, { replace: true });
              },
            });
          },
          onError: (err) => {
            setAlertConfig({
              isOpen: true,
              title: '이미지 수정 실패',
              message: `오류가 발생했습니다: ${err.message}`,
            });
          },
        });
      } catch {
        setAlertConfig({
          isOpen: true,
          title: '오류',
          message: '이미지 처리 중 오류가 발생했습니다.',
        });
      }
    };

    if (isTextChanged) {
      const payload = {
        memberId: profile.memberId,
        boothNumber: booth.boothNumber,
        name: formData.name,
        division: formData.divisionKey as BoothDivision,
        description: formData.description,
        applyLink: formData.applyUrl,
      };

      await mutateUpdate(booth.id, payload, {
        onSuccess: async () => {
          if (isImagesChanged) {
            await handleImageUpdate();
          } else {
            setAlertConfig({
              isOpen: true,
              title: '수정 완료',
              message: '부스 정보가 성공적으로 수정되었습니다.',
              onClose: () => {
                const redirectPath = profile.boothId ? '/admin' : '/map';
                navigate(redirectPath, { replace: true });
              },
            });
          }
        },
        onError: (err) => {
          setAlertConfig({
            isOpen: true,
            title: '수정 실패',
            message: `오류가 발생했습니다: ${err.message}`,
          });
        },
      });
    } else if (isImagesChanged) {
      await handleImageUpdate();
    }
  };

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.description.trim() !== '' &&
    formData.applyUrl.trim() !== '' &&
    !isSubmitting;

  return (
    <div className="pt-5 pb-24 px-1">
      <div className="flex items-center mb-2 text-black text-nowrap">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="typo-heading-3 bg-transparent border-none focus:ring-0 p-0 caret-knu-red outline-none w-auto max-w-60"
          placeholder="동아리 이름"
          disabled={isSubmitting}
        />
        <div className="relative ml-4">
          <button
            onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
            className="flex items-center space-x-1 hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors group"
            disabled={isSubmitting}
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

      <div className="h-px w-full bg-gray-200 my-5" />

      <div className="mb-10 text-black">
        <textarea
          ref={textareaRef}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="typo-body-1 w-full bg-transparent border-none focus:ring-0 p-0 resize-none min-h-37.5 caret-knu-red outline-none leading-relaxed overflow-hidden"
          placeholder="동아리 소개, 회비, 모집학년, 인스타그램 등 상세 정보를 포함해 주세요."
          disabled={isSubmitting}
        />
      </div>

      <ImageCarouselUploader
        label="동아리 활동 사진"
        initialUrls={booth.imageUrls || []}
        onImagesChange={setAllImages}
        maxCount={5}
        className="mb-10"
      />

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
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <AdminActionButton
          label={isSubmitting ? '수정 중...' : '수정 완료하기'}
          icon={FaCheck}
          onClick={handleSave}
          className={`${isFormValid ? 'bg-knu-red' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={isSubmitting}
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

export default function AdminBoothEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [booth, setBooth] = useState<BoothSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBooth() {
      if (!id) return;
      try {
        const data = await getBooth(Number(id));
        setBooth(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBooth();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-knu-red" />
      </div>
    );
  }

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

  return <BoothEditForm booth={booth} />;
}
