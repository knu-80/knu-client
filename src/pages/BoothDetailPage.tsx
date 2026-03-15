import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ImageCarousel from '@/components/ImageCarousel';
import ApplyButton from '@/components/ApplyButton';
import { ClubCategory } from '@/components/ClubCategory';
import { useBooth } from '@/hooks/useBooth';
import { ExpandableText } from '@/components/ExpandableText';
import { StatusDisplay } from '@/components/StatusDisplay';
import { PiSpinnerGapThin } from 'react-icons/pi';
import { StarBurstOverlay } from '@/components/StarBurstOverlay';
import { PiShootingStarFill } from 'react-icons/pi';

export default function BoothDetailPage() {
  const { id } = useParams<{ id: string }>();
  const boothId = Number(id);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleStarClick = () => {
    const newBurst = { id: Date.now(), x: Math.random() * 100 - 50, y: Math.random() * -150 - 50 };
    setBursts((prev) => [...prev, newBurst]);
    setTimeout(() => setBursts((p) => p.filter((b) => b.id !== newBurst.id)), 1000);
  };

  const { booth, loading, refetch } = useBooth(boothId);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <PiSpinnerGapThin className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!booth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-5">
        <StatusDisplay variant="error" title="인터넷 연결을 확인해주세요" onAction={refetch} />
      </div>
    );
  }

  return (
    <div className="pt-5">
      <StarBurstOverlay bursts={bursts} />
      <div className="flex items-center mb-1 text-base-deep">
        <div className="flex items-center space-x-[10px]">
          <h2 className="typo-heading-3">{booth.name}</h2>
          <ClubCategory division={booth.division} />
        </div>
        <div className="flex-1" />
        <button
          onClick={handleStarClick}
          className="flex cursor-pointer items-center justify-center rounded-full gap-[2px] bg-white transition-all hover:brightness-95 active:scale-[0.98]"
        >
          <PiShootingStarFill size={28} className="text-secondary-yellow" />
          <span className="typo-body-3 text-base-deep font-">숫자</span>
        </button>
      </div>

      <ExpandableText text={booth.description || '동아리 소개 정보가 없습니다.'} />

      <div className="mb-10">
        <h3 className="typo-heading-4 mb-2 text-base-deep">동아리 활동 사진</h3>
        <ImageCarousel
          imageUrls={booth.imageUrls || []}
          altText={`${booth.name} 사진`}
          className="mb-10"
        />
      </div>

      <div className="mb-15">
        <h3 className="typo-heading-4 mb-1 text-base-deep">문의하기</h3>
        <div className="mb-10 text-base-deep">
          <p className="typo-body-2 whitespace-pre-wrap">
            {booth.contact || '관련 정보가 없습니다.'}
          </p>
        </div>
      </div>

      {booth.applyLink && <ApplyButton url={booth.applyLink} />}
    </div>
  );
}
