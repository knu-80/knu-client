import { useNavigate } from 'react-router-dom';

interface EditButtonProps {
  editUrl: string;
}

export default function EditButton({ editUrl }: EditButtonProps) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(editUrl);
  };

  return (
    <button
      onClick={handleEditClick}
      className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
    >
      수정하기
    </button>
  );
}
