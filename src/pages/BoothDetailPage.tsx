import { useParams } from 'react-router-dom';
import { BiMessageSquareDetail } from 'react-icons/bi';

export default function BoothDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-5">
      <div className="flex items-center space-x-2 mb-4">
        <BiMessageSquareDetail className="h-6 w-6 text-black" />
        <h2 className="typo-heading-2 text-black">상세보기</h2>
      </div>

      <div className="flex items-center space-x-4 mb-3 text-black">
        <h2 className="typo-heading-3">동아리이름</h2>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <p className="typo-body-1">문예부</p>
        </div>
      </div>

      <div className='flex items-center space-x-2 mb-4 muted'>
        <p>[전 학년 모집]</p>
        <p>회비 40,000원</p>
      </div>

      {id ? (
        <p className="muted">부스 ID: {id}</p>
      ) : (
        <p className="muted">부스 ID를 찾을 수 없습니다.</p>
      )}
    </div>
  );
}
