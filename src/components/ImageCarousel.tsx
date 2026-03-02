import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, type PanInfo } from 'framer-motion';
import RepresentativeImage from './RepresentativeImage';

interface ImageCarouselProps {
  imageUrls: string[];
  altText: string;
  aspectRatio?: string;
}

export default function ImageCarousel({
  imageUrls,
  altText,
  aspectRatio = 'aspect-square',
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // 드래그 및 애니메이션을 위한 모션 값
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  // 아이템 너비 설정 (70%로 설정하여 양옆을 훨씬 더 많이 노출)
  const itemWidthPercent = 70;
  const gap = 16; // 아이템 사이 간격 (px)
  const centerPaddingPercent = (100 - itemWidthPercent) / 2;

  // 현재 인덱스에 따른 목표 위치 계산 함수
  const getTargetX = useCallback(
    (index: number, width: number) => {
      if (width === 0) return 0;
      const itemFullWidth = (width * itemWidthPercent) / 100 + gap;
      const initialOffset = (width * centerPaddingPercent) / 100;
      return -(index * itemFullWidth) + initialOffset;
    },
    [itemWidthPercent, centerPaddingPercent, gap],
  );

  // 컨테이너 너비 측정 및 초기 위치 설정
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;
        setContainerWidth(newWidth);
        // 너비가 결정되면 즉시 위치 조정
        x.set(getTargetX(currentIndex, newWidth));
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [currentIndex, getTargetX, x]);

  // 인덱스 변경 시 위치 업데이트
  useEffect(() => {
    if (containerWidth > 0) {
      x.set(getTargetX(currentIndex, containerWidth));
    }
  }, [currentIndex, containerWidth, getTargetX, x]);

  if (!imageUrls || imageUrls.length === 0) {
    return <RepresentativeImage imageUrl={null} altText={altText} height={aspectRatio} />;
  }

  // 이미지가 한 장일 때는 꽉 차게 보여줌
  if (imageUrls.length === 1) {
    return (
      <div className="px-4">
        <RepresentativeImage imageUrl={imageUrls[0]} altText={altText} height={aspectRatio} />
      </div>
    );
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const { offset, velocity } = info;

    if (offset.x < -swipeThreshold || velocity.x < -500) {
      if (currentIndex < imageUrls.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } else if (offset.x > swipeThreshold || velocity.x > 500) {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }

    // 드래그 종료 후 항상 인덱스에 맞는 위치로 강제 고정
    x.set(getTargetX(currentIndex, containerWidth));
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden select-none touch-pan-y">
      <motion.div
        drag="x"
        dragConstraints={{
          left: getTargetX(imageUrls.length - 1, containerWidth),
          right: getTargetX(0, containerWidth),
        }}
        style={{ x: springX }}
        onDragEnd={handleDragEnd}
        className="flex cursor-grab active:cursor-grabbing"
      >
        {imageUrls.map((url, index) => (
          <div
            key={index}
            style={{
              width: `${itemWidthPercent}%`,
              marginRight: `${gap}px`,
              flexShrink: 0,
              opacity: currentIndex === index ? 1 : 0.3, // 비활성 이미지를 더 흐리게 하여 집중도 향상
              scale: currentIndex === index ? 1 : 0.85, // 크기 차이를 더 두어 입체감 부여
              transition:
                'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), scale 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <RepresentativeImage
              imageUrl={url}
              altText={`${altText} ${index + 1}`}
              height={aspectRatio}
              isZoomable={false}
            />
          </div>
        ))}
      </motion.div>

      {/* 인디케이터 (점) */}
      <div className="mt-6 flex justify-center gap-2">
        {imageUrls.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-6 bg-knu-red shadow-[0_0_10px_rgba(230,0,0,0.4)]'
                : 'w-1.5 bg-gray-200 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
