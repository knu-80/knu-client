import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, type PanInfo } from 'framer-motion';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const itemWidthPercent = 70;
  const gap = 16;
  const centerPaddingPercent = (100 - itemWidthPercent) / 2;

  const getTargetX = useCallback(
    (index: number, width: number) => {
      if (width === 0) return 0;
      const itemFullWidth = (width * itemWidthPercent) / 100 + gap;
      const initialOffset = (width * centerPaddingPercent) / 100;
      return -(index * itemFullWidth) + initialOffset;
    },
    [itemWidthPercent, centerPaddingPercent, gap],
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
        <RepresentativeImage imageUrl={null} altText={altText} height={aspectRatio} />
      </div>
    );
  }

  if (imageUrls.length === 1) {
    return (
      <div className={`flex flex-col ${className}`}>
        {label && <h3 className="typo-heading-3 text-base-deep mb-5 px-1">{label}</h3>}
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

    x.set(getTargetX(currentIndex, containerWidth));
  };

  const displayItems = imageUrls;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <h3 className="typo-heading-3 text-base-deep mb-5 px-1">{label}</h3>}

      <div ref={containerRef} className="relative w-full overflow-hidden select-none touch-pan-y">
        <motion.div
          drag="x"
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
              style={{
                width: `${itemWidthPercent}%`,
                marginRight: `${gap}px`,
                flexShrink: 0,
                opacity: currentIndex === index ? 1 : 0.3,
                scale: currentIndex === index ? 1 : 0.85,
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

        <div className="mt-6 flex justify-center gap-2">
          {displayItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-6 bg-primary' : 'w-1.5 bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
