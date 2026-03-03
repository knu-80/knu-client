import { useEffect } from 'react';

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  buttonText?: string;
}

export default function AlertModal({
  isOpen,
  title,
  message,
  onClose,
  buttonText = '확인',
}: AlertModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[320px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-[15px] text-gray-500 whitespace-pre-wrap leading-relaxed">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 text-base font-bold text-knu-red border-t border-gray-100 hover:bg-red-50 active:bg-red-100 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
