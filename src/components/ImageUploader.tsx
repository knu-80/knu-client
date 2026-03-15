import { useRef } from 'react';
import { FiCamera, FiX } from 'react-icons/fi';

interface ImageUploaderProps {
  previewImage: string | null;
  onImageChange: (imageUrl: string, file: File) => void;
  onDelete?: () => void;
  aspectRatio?: string;
  label?: string;
  className?: string;
}

export default function ImageUploader({
  previewImage,
  onImageChange,
  onDelete,
  aspectRatio = 'aspect-3/2',
  label,
  className = '',
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(reader.result as string, file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <h3 className="typo-heading-3 text-black mb-4">{label}</h3>}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div
        className={`relative w-full ${aspectRatio} bg-gray-50 overflow-hidden rounded-2xl border-2 ${previewImage ? 'border-gray-200' : 'border-dashed border-gray-300'} shadow-sm transition-colors hover:border-gray-400`}
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt="미리보기"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
            <FiCamera className="mb-2 h-8 w-8" />
            <span className="text-xs font-medium">이미지 없음</span>
          </div>
        )}

        <div
          onClick={() => fileInputRef.current?.click()}
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100"
        >
          <div className="rounded-full bg-white/90 p-3 shadow-md">
            <FiCamera className="h-5 w-5 text-gray-700" />
          </div>
        </div>

        {onDelete && previewImage && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-md transition-transform active:scale-90 z-10"
          >
            <FiX className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
