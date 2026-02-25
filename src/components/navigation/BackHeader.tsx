import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

type BackHeaderProps = {
  title: string;
  fallbackPath: string;
};

export default function BackHeader({ title, fallbackPath }: BackHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(fallbackPath, { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 -mx-5 border-b border-gray-200 bg-white px-5 py-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleBack}
          aria-label="뒤로가기"
          className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100"
        >
          <FiChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 className="typo-heading-2 text-[#0f172a]">{title}</h1>
      </div>
    </header>
  );
}
