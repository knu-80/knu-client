import { FaMapMarkerAlt } from 'react-icons/fa';
import { BsBox2Fill } from 'react-icons/bs';

interface FoundItemCardProps {
  itemName: string;
  foundLocation: string;
}

export default function FoundItemCard({ itemName, foundLocation }: FoundItemCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm mb-3 bg-white">
      <div className="flex items-center justify-center space-x-3 w-1/2 pr-2">
        <BsBox2Fill className="text-knu-gold text-2xl" />
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">습득 물품</span>
          <span className="text-base text-black font-semibold wrap-break-word">{itemName}</span>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-3 w-1/2 pl-2">
        <FaMapMarkerAlt className="text-knu-red text-2xl" />
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">습득 장소</span>
          <span className="text-base text-black font-semibold wrap-break-word">
            {foundLocation}
          </span>
        </div>
      </div>
    </div>
  );
}
