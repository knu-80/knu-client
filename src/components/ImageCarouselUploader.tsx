import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, type PanInfo } from 'framer-motion';
import ImageUploader from './ImageUploader';

interface ImageCarouselUploaderProps {
  imageUrls: string[];
  onImagesChange: (urls: string[]) => void;
  maxCount?: number;
  label?: string;
  className?: string;
  aspectRatio?: string;
}

export default function ImageCarouselUploader({
  imageUrls,
  onImagesChange,
  maxCount = 5,
  label,
  className = '',
  aspectRatio = 'aspect-square',
}: ImageCarouselUploaderProps) {
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
    [itemWidthPercent, centerPaddingPercent],
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

  const handleImageChange = (index: number, newUrl: string) => {
    const newImages = [...imageUrls];
    if (index < imageUrls.length) {
      newImages[index] = newUrl;
    } else {
      newImages.push(newUrl);
      setCurrentIndex(newImages.length);
    }
    onImagesChange(newImages);
  };

  const handleImageDelete = (index: number) => {
    const newImages = imageUrls.filter((_, i) => i !== index);
    onImagesChange(newImages);

    if (currentIndex >= newImages.length && currentIndex > 0) {
      setCurrentIndex(newImages.length);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const { offset, velocity } = info;
    const totalItems = imageUrls.length < maxCount ? imageUrls.length + 1 : imageUrls.length;

    if (offset.x < -swipeThreshold || velocity.x < -500) {
      if (currentIndex < totalItems - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } else if (offset.x > swipeThreshold || velocity.x > 500) {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
    x.set(getTargetX(currentIndex, containerWidth));
  };

  const displayItems = [...imageUrls];
  if (imageUrls.length < maxCount) {
    displayItems.push('');
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <h3 className="typo-heading-3 text-black mb-4 px-1">{label}</h3>}

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
                opacity: currentIndex === index ? 1 : 0.4,
                scale: currentIndex === index ? 1 : 0.9,
                transition: 'opacity 0.4s, scale 0.4s',
              }}
            >
              <ImageUploader
                previewImage={url || null}
                onImageChange={(newUrl) => handleImageChange(index, newUrl)}
                onDelete={url ? () => handleImageDelete(index) : undefined}
                aspectRatio={aspectRatio}
                className="w-full"
              />
            </div>
          ))}
        </motion.div>

        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex gap-2">
            {displayItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-6 bg-knu-red' : 'w-1.5 bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            {imageUrls.length} / {maxCount} 이미지
          </p>
        </div>
      </div>
    </div>
  );
}
