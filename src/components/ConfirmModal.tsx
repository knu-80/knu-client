import { useEffect } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
}: ConfirmModalProps) {
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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />

      <div className="relative w-full max-w-[320px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-500 whitespace-pre-wrap leading-relaxed">{message}</p>
        </div>

        <div className="flex border-t border-gray-100">
          <button
            onClick={onCancel}
            className="flex-1 py-4 text-sm font-semibold text-gray-400 hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <div className="w-1px bg-gray-100" />
          <button
            onClick={onConfirm}
            className="flex-1 py-4 text-sm font-semibold text-knu-red hover:bg-red-50 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
