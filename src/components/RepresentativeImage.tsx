interface RepresentativeImageProps {
  imageUrl: string | null;
}

export default function RepresentativeImage({ imageUrl }: RepresentativeImageProps) {
  return (
    <div className="mt-4">
      <h3 className="typo-heading-3 text-black mb-3">동아리 대표 사진</h3>
      {imageUrl ? (
        <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
          <img src={imageUrl} alt="동아리 대표 사진" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center typo-muted">
          표시할 이미지가 없습니다.
        </div>
      )}
    </div>
  );
}
