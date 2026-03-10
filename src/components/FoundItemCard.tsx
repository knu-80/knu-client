import { FaMapMarkerAlt } from 'react-icons/fa';
import noticeIcon from '@/assets/noticeIcon.png';

interface FoundItemCardProps {
  itemName: string;
  foundLocation: string;
}

export default function FoundItemCard({ itemName, foundLocation }: FoundItemCardProps) {
  return (
    <div className="flex items-center justify-between p-3 sm:p-5 border border-gray-100 rounded-xl shadow-sm mb-4 bg-white">
      <div className="flex items-center space-x-2 sm:space-x-4 w-[48%]">
        <div className="shrink-0 w-8 h-8 sm:w-12 sm:h-12 bg-amber-50 rounded-full flex items-center justify-center">
          <img
            src={noticeIcon}
            alt="습득 물품 공지 아이콘"
            className="w-5 h-5 sm:w-8 sm:h-8 object-contain"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[12px] sm:typo-body-3 sm:text-sm text-gray-400 uppercase tracking-wider">
            습득 물품
          </span>
          <span className="text-sm sm:typo-body-1 sm:text-base text-gray-800 font-bold truncate leading-tight">
            {itemName}
          </span>
        </div>
      </div>

      <div className="w-px h-8 sm:h-10 bg-gray-300" />

      <div className="flex items-center space-x-2 sm:space-x-4 w-[48%] pl-2">
        <div className="shrink-0 w-8 h-8 sm:w-12 sm:h-12 bg-red-50 rounded-full flex items-center justify-center">
          <FaMapMarkerAlt className="text-knu-red text-sm sm:text-xl" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[12px] sm:typo-body-3 sm:text-sm text-gray-400 uppercase tracking-wider">
            습득 장소
          </span>
          <span className="text-sm sm:typo-body-1 sm:text-base text-gray-800 font-bold truncate leading-tight">
            {foundLocation}
          </span>
        </div>
      </div>
    </div>
  );
}
