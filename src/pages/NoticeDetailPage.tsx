import { BiMessageSquareDetail } from 'react-icons/bi';

export default function NoticeDetailPage() {
  return (
    <div className="p-5">
      <div className="flex items-center space-x-2 mb-4">
        <BiMessageSquareDetail className="h-6 w-6 text-black" />
        <h2 className="typo-heading-2 text-black">상세보기</h2>
      </div>
    </div>
  );
}
