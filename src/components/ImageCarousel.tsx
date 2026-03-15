import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, type PanInfo } from 'framer-motion';
import { ImageWithFallback } from './Skeleton';
import { NoImage } from './NoImage';
import RepresentativeImage from './RepresentativeImage';

interface ImageCarouselProps {
  imageUrls: string[];
  altText: string;
  label?: string;
  className?: string;
  aspectRatio?: string;
}

export default function ImageCarousel({
  imageUrls,
  altText,
  label,
  className = '',
  aspectRatio = 'aspect-square',
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const itemWidthPercent = 90;
  const gap = 12;

  const getTargetX = useCallback(
    (index: number, width: number) => {
      if (width === 0) return 0;
      const itemFullWidth = (width * itemWidthPercent) / 100 + gap;
      return -(index * itemFullWidth);
    },
    [itemWidthPercent, gap],
  );

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;
        setContainerWidth(newWidth);
        x.set(getTargetX(currentIndex, newWidth));
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [currentIndex, getTargetX, x]);

  useEffect(() => {
    if (containerWidth > 0) {
      x.set(getTargetX(currentIndex, containerWidth));
    }
  }, [currentIndex, containerWidth, getTargetX, x]);

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && <h3 className="typo-heading-3 text-base-deep mb-5 px-1">{label}</h3>}
        <NoImage className={`w-full ${aspectRatio} rounded-[8px]`} />
      </div>
    );
  }

  if (imageUrls.length === 1) {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && <h3 className="typo-heading-3 text-base-deep mb-5 px-1">{label}</h3>}
        <ImageWithFallback
          src={imageUrls[0]}
          alt={altText}
          className={`w-full ${aspectRatio} object-cover rounded-[8px]`}
        />
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

    x.set(getTargetX(currentIndex, containerWidth));
    setTimeout(() => {
      isDragging.current = false;
    }, 50);
  };

  const displayItems = imageUrls;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <h3 className="typo-heading-3 text-base-deep px-1">{label}</h3>}

      <div ref={containerRef} className="relative w-full overflow-hidden select-none touch-pan-y">
        <motion.div
          drag="x"
          onDragStart={handleDragStart}
          dragConstraints={{
            left: getTargetX(displayItems.length - 1, containerWidth),
            right: getTargetX(0, containerWidth),
          }}
          style={{ x: springX }}
          onDragEnd={handleDragEnd}
          className="flex cursor-grab active:cursor-grabbing"
        >
          {displayItems.map((url, index) => (
            <div
              key={index}
              onClickCapture={(e) => {
                if (isDragging.current) {
                  e.stopPropagation();
                }
              }}
              style={{
                width: `${itemWidthPercent}%`,
                marginRight: `${gap}px`,
                flexShrink: 0,
                opacity: 1,
                scale: 1,
                transition:
                  'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), scale 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <RepresentativeImage
                imageUrl={url}
                altText={`${altText} ${index + 1}`}
                height={aspectRatio}
                isZoomable={true}
                loading={index === currentIndex ? 'eager' : 'lazy'}
                fetchPriority={index === currentIndex ? 'high' : 'low'}
                className="rounded-[8px] overflow-hidden border border-gray-100"
              />
            </div>
          ))}
        </motion.div>

        <div className="mt-2 flex justify-center gap-2">
          {displayItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-primary' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
