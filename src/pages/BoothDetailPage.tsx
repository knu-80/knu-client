import { useParams, Link } from 'react-router-dom';
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
import { useLikeBooth } from '@/hooks/useLikeBooth';
import { formatLikeCount } from '@/lib/count';

export default function BoothDetailPage() {
  const { id } = useParams<{ id: string }>();
  const boothId = Number(id);
  const [bursts, setBursts] = useState<{ id: string; x: number; y: number }[]>([]);

  const [likeDelta, setLikeDelta] = useState(0);

  const { mutate, isPending } = useLikeBooth(boothId);
  const { booth, loading, refetch } = useBooth(boothId);
  const displayLikeCount = (booth?.likeCount ?? 0) + likeDelta;

  const isSpecialDivision =
    booth?.division === 'MANAGEMENT' || booth?.division === 'EXTERNAL_SUPPORT';

  const handleStarClick = async () => {
    if (isPending) return;

    const newBurst = {
      id: crypto.randomUUID(),
      x: Math.random() * 100 - 50,
      y: Math.random() * -150 - 50,
    };

    setBursts((prev) => [...prev, newBurst]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
    }, 1000);

    setLikeDelta((prev) => (prev ?? 0) + 1);

    try {
      const updatedCount = await mutate();

      if (updatedCount !== undefined) {
        setLikeDelta(updatedCount - (booth?.likeCount ?? 0));
      }
    } catch (error) {
      console.error('좋아요 실패:', error);
      setLikeDelta((prev) => prev - 1);
    }
  };

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
        {!isSpecialDivision && (
          <button
            onClick={handleStarClick}
            disabled={isPending}
            className="flex cursor-pointer items-center justify-center rounded-full gap-[2px] bg-white transition-all hover:brightness-95 active:scale-[0.98]"
          >
            <PiShootingStarFill size={28} className="text-secondary-yellow" />
            <span className="typo-body-1 text-secondary-yellow font-medium">
              {formatLikeCount(displayLikeCount)}
            </span>
          </button>
        )}
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
      <div className="flex gap-3 mb-10">
        <Link
          to="/map"
          state={{ selectedBoothId: booth.id }}
          className="flex-1 flex items-center justify-center bg-gray-100 rounded-full text-base-deep py-3 mb-6 typo-body-1 cursor-pointer transition-all hover:scale-[1.01] hover:brightness-95 active:scale-[0.98]"
        >
          위치보기
        </Link>
        {!isSpecialDivision && booth.applyLink && (
          <div className="flex-1">
            <ApplyButton url={booth.applyLink} />
          </div>
        )}
      </div>
    </div>
  );
}
