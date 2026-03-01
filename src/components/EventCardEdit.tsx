import { useState, useRef } from 'react';
import { FiClock, FiMapPin, FiCheck, FiX, FiCamera } from 'react-icons/fi';
import { type FestivalEvent } from '@/mocks/events';

interface EventCardEditProps {
  initialData: FestivalEvent;
  onSave: (data: FestivalEvent) => void;
  onCancel: () => void;
}

export default function EventCardEdit({ initialData, onSave, onCancel }: EventCardEditProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FestivalEvent>(initialData);
  const [previewImage, setPreviewImage] = useState<string | null>(initialData.imageUrl);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData((prev) => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-knu-red/30 bg-white shadow-lg animate-in fade-in zoom-in duration-200">
      <div className="relative h-45 w-full bg-gray-50 overflow-hidden rounded-lg">
        {previewImage ? (
          <img src={previewImage} alt="미리보기" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
            <FiCamera className="mb-2 h-8 w-8" />
            <span className="text-xs">이미지 없음</span>
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
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />

        <div className="absolute right-3 top-3 flex gap-2 z-10">
          <button
            onClick={() => onSave(formData)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-knu-red text-white shadow-md transition-transform active:scale-90"
            aria-label="저장"
          >
            <FiCheck className="h-4 w-4" />
          </button>
          <button
            onClick={onCancel}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-md transition-transform active:scale-90"
            aria-label="취소"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="이벤트 제목"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="text-lg font-bold text-gray-900 border-b border-gray-100 focus:border-knu-red focus:outline-none focus:ring-0 p-0 caret-knu-red placeholder-gray-300 bg-transparent transition-colors"
          />
          <textarea
            placeholder="이벤트 설명"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={2}
            className="text-sm text-gray-600 border-none focus:ring-0 focus:outline-none p-0 resize-none placeholder-gray-300 caret-knu-red min-h-15 bg-transparent"
          />
        </div>

        <div className="flex flex-col gap-2 pt-1 border-t border-gray-50 mt-1">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
              <FiClock className="h-3.5 w-3.5 shrink-0 text-knu-red" />
              <span>진행 기간</span>
            </div>

            <div className="flex flex-col gap-1 ml-5.5">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-8 shrink-0 text-[10px] font-bold text-gray-400">시작</span>
                <input
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                  className="w-full focus:outline-none border-none p-0 focus:ring-0 placeholder-gray-300 caret-knu-red bg-transparent cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-8 shrink-0 text-[10px] font-bold text-gray-400">종료</span>
                <input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                  className="w-full focus:outline-none border-none p-0 focus:ring-0 placeholder-gray-300 caret-knu-red bg-transparent cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <FiMapPin className="h-3.5 w-3.5 shrink-0 text-knu-red" />
            <input
              type="text"
              placeholder="장소"
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              className="w-full focus:outline-none border-none p-0 focus:ring-0 placeholder-gray-300 caret-knu-red"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
