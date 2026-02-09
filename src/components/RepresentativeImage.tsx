import { useState } from 'react';

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

  return (
    <div className="mt-4">
      <h3 className="typo-heading-3 text-black mb-3">동아리 대표 사진</h3>
      {imageUrl ? (
        <div
          className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
          onClick={handleImageClick}
        >
          <img src={imageUrl} alt="동아리 대표 사진" className="w-full h-full object-cover" />
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
            alt="확대된 동아리 대표 사진"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
