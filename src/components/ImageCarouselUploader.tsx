import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, type PanInfo } from 'framer-motion';
import ImageUploader from './ImageUploader';

export interface ImageItem {
  id: string;
  previewUrl: string;
  file: File | null;
}

interface ImageCarouselUploaderProps {
  initialUrls?: string[];
  onFilesChange?: (files: File[]) => void;
  onImagesChange?: (items: ImageItem[]) => void;
  maxCount?: number;
  label?: string;
  className?: string;
  aspectRatio?: string;
}

export default function ImageCarouselUploader({
  initialUrls = [],
  onFilesChange,
  onImagesChange,
  maxCount = 5,
  label,
  className = '',
  aspectRatio = 'aspect-square',
}: ImageCarouselUploaderProps) {
  const idCounter = useRef(0);

  const [items, setItems] = useState<ImageItem[]>(() =>
    initialUrls.map((url, index) => ({
      id: `initial-${index}`,
      previewUrl: url,
      file: null,
    })),
  );

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

  const handleImageChange = (index: number, newPreviewUrl: string, file: File) => {
    const newItems = [...items];
    const newItem: ImageItem = {
      id: `file-${idCounter.current++}`,
      previewUrl: newPreviewUrl,
      file,
    };

    if (index < items.length) {
      newItems[index] = newItem;
    } else {
      newItems.push(newItem);
      setCurrentIndex(newItems.length);
    }

    setItems(newItems);
    if (onFilesChange) {
      onFilesChange(newItems.map((item) => item.file).filter((f): f is File => f !== null));
    }
    if (onImagesChange) {
      onImagesChange(newItems);
    }
  };

  const handleImageDelete = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    if (onFilesChange) {
      onFilesChange(newItems.map((item) => item.file).filter((f): f is File => f !== null));
    }
    if (onImagesChange) {
      onImagesChange(newItems);
    }

    if (currentIndex >= newItems.length && currentIndex > 0) {
      setCurrentIndex(newItems.length);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    const { offset, velocity } = info;
    const totalItems = items.length < maxCount ? items.length + 1 : items.length;

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

  const displayItems = [...items];
  if (items.length < maxCount) {
    displayItems.push({ id: 'placeholder', previewUrl: '', file: null });
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <h3 className="typo-heading-3 text-black mb-5 px-1">{label}</h3>}

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
          {displayItems.map((item, index) => (
            <div
              key={item.id}
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
              <ImageUploader
                previewImage={item.previewUrl || null}
                onImageChange={(newUrl, file) => handleImageChange(index, newUrl, file)}
                onDelete={item.previewUrl ? () => handleImageDelete(index) : undefined}
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
            {items.length} / {maxCount} 이미지
          </p>
        </div>
      </div>
    </div>
  );
}
