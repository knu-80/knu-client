import { FaRegCalendar, FaInfoCircle } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import RepresentativeImage from '@/components/RepresentativeImage';
import FoundItemCard from '@/components/FoundItemCard';

export default function NoticeDetailPage() {
  return (
    <div className="pt-5">
      <div className="flex flex-col space-y-1 mb-8 text-black">
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

      <FoundItemCard itemName="호반우 인형" foundLocation="일청담" />

      <div className="mb-10 mt-5 text-black">
        <p className="typo-body-1">
          안녕하세요, 운영팀입니다. <br />
          행사 진행 상황에 따라 운영시간이 오후 8시까지로 어쩌구 저쩌구..
        </p>
      </div>

      <div className="mb-5">
        <h3 className="typo-heading-3 text-black mb-3">관련 사진</h3>
        <RepresentativeImage imageUrl="https://picsum.photos/600/400" />
      </div>

      <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-md mb-10">
        <FaInfoCircle className="text-xl" />
        <p className="typo-body-2">분실물은 총동연 부스에서 수령가능합니다</p>
      </div>
    </div>
  );
}
