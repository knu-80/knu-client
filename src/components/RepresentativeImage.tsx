import { useState, useEffect } from 'react';

interface RepresentativeImageProps {
  imageUrl: string | null;
  altText: string;
  height?: string;
  isZoomable?: boolean;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
}

export default function RepresentativeImage({
  imageUrl,
  altText,
  height = 'aspect-[4/5]',
  isZoomable = true,
  loading = 'lazy',
  fetchPriority = 'auto',
  className = '',
}: RepresentativeImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className={`relative w-full overflow-hidden ${className}`}>
      {imageUrl ? (
        <div
          className={`relative w-full ${height} bg-gray-200 ${isZoomable ? 'cursor-pointer' : ''}`}
          onClick={() => isZoomable && setIsModalOpen(true)}
        >
          <img
            src={imageUrl}
            alt={altText}
            loading={loading}
            decoding="async"
            fetchPriority={fetchPriority}
            className="w-full h-full object-cover"
            draggable="false"
          />

          {isModalOpen && (
            <div
              className="overlay-backdrop absolute inset-0 z-50 flex items-center justify-center p-2"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
            >
              <img
                src={imageUrl}
                alt={`확대된 ${altText}`}
                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      ) : (
        <div className={`relative w-full ${height} bg-gray-200 overflow-hidden rounded-lg`}>
          <div
            className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{ backgroundSize: '200% 100%' }}
          />
        </div>
      )}

      {isModalOpen && imageUrl && (
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 z-100 
                     w-full max-w-175 min-h-screen 
                     bg-black/60 flex items-center justify-center p-4"
          onClick={handleModalClose}
        >
          <img
            src={imageUrl}
            alt={`확대된 ${altText}`}
            loading="eager"
            decoding="async"
            className="max-w-full max-h-full object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
