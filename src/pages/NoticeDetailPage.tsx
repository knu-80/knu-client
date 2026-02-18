import { BiMessageSquareDetail } from 'react-icons/bi';
import { FaRegCalendar } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import RepresentativeImage from '@/components/RepresentativeImage';

export default function NoticeDetailPage() {
  return (
    <div className="p-5">
      <div className="flex items-center space-x-2 mb-4">
        <BiMessageSquareDetail className="h-6 w-6 text-black" />
        <h2 className="typo-heading-2 text-black">상세보기</h2>
      </div>

      <div className="flex flex-col space-y-1 mb-2 text-black">
        <h2 className="typo-heading-3">부스 운영시간 안내</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1 pt-1">
          <div className="flex items-center space-x-2">
            <FaRegCalendar />
            <span>작성일: 2026.10.26</span>
          </div>
          <span className="h-4 w-px bg-gray-300"></span>
          <div className="flex items-center space-x-2">
            <FaUser />
            <span>작성자: 운영팀</span>
          </div>
        </div>
      </div>

      <div className="mb-10 mt-5 text-black">
        <p className="typo-body-1">
          안녕하세요, 운영팀입니다. <br />
          행사 진행 상황에 따라 운영시간이 오후 8시까지로 어쩌구 저쩌구..
        </p>
      </div>

      <div className="mb-10">
        <h3 className="typo-heading-3 text-black mb-3">관련 사진</h3>
        <RepresentativeImage imageUrl="https://picsum.photos/600/400" />
      </div>
    </div>
  );
}
