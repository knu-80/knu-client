import { useParams } from 'react-router-dom';
import ImageCarousel from '@/components/ImageCarousel';
import ApplyButton from '@/components/ApplyButton';
import { ClubCategory } from '@/components/ClubCategory';
import { useBooth } from '@/hooks/useBooth';

export default function BoothDetailPage() {
  const { id } = useParams<{ id: string }>();
  const boothId = Number(id);

  const { booth } = useBooth(boothId);

  if (!booth) {
    return <div className="py-20 text-center text-gray-500">부스 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="pt-5">
      <div className="flex items-center space-x-[10px] mb-2 text-black">
        <h2 className="typo-heading-3">{booth.name}</h2>
        <ClubCategory division={booth.division} />
      </div>

      <div className="mb-10 text-black">
        <p className="typo-body-2 whitespace-pre-wrap">
          {booth.description || '동아리 소개 정보가 없습니다.'}
        </p>
      </div>

      <div className="mb-10">
        <h3 className="typo-heading-3 mb-3 text-black">동아리 활동 사진</h3>
        {booth.imageUrls && booth.imageUrls.length > 0 && (
          <ImageCarousel
            imageUrls={booth.imageUrls}
            altText={`${booth.name} 사진`}
            // label="동아리 활동 사진"
            className="mb-10"
          />
        )}
      </div>

      <div className="mb-10">
        <h3 className="typo-heading-3 mb-3 text-black">문의하기</h3>
        <div className="mb-10 text-black">
          <p className="typo-body-2 whitespace-pre-wrap">
            {booth.contact || '관련 정보가 없습니다.'}
          </p>
        </div>
      </div>

      {booth.applyLink && <ApplyButton url={booth.applyLink} />}
    </div>
  );
}
