import { useState, useEffect } from 'react';

interface RepresentativeImageProps {
  imageUrl: string | null;
}

export default function RepresentativeImage({ imageUrl }: RepresentativeImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    if (imageUrl) {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleModalClose();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <div className="mt-4">
      {imageUrl ? (
        <div
          className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
          onClick={handleImageClick}
        >
          <img src={imageUrl} alt="대표 사진" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center typo-muted">
          표시할 이미지가 없습니다.
        </div>
      )}

      {isModalOpen && imageUrl && (
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 z-50
                     w-full max-w-175 min-h-screen
                     bg-white/50 flex items-center justify-center p-4"
          onClick={handleModalClose}
        >
          <img
            src={imageUrl}
            alt="확대된 대표 사진"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
