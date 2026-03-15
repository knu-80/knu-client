import { FaMapMarkerAlt, FaInbox } from 'react-icons/fa';

interface FoundItemCardProps {
  itemName: string;
  foundLocation: string;
}

export default function FoundItemCard({ itemName, foundLocation }: FoundItemCardProps) {
  return (
    <div className="flex flex-col p-3 border border-gray-200 rounded-xl bg-white space-y-2">
      <div className="flex items-center space-x-1.5">
        <div className="shrink-0 p-1.5 gap-1 bg-base-deep/10 rounded-full flex items-center justify-center">
          <FaInbox className="text-base-deep" />
        </div>
        <div className="flex flex-row min-w-0">
          <span className="typo-body-2 text-base-deep font-medium truncate">{itemName}</span>
        </div>
      </div>
      <div className="flex items-center space-x-1.5">
        <div className="shrink-0 p-1.5 gap-1 bg-base-deep/10 rounded-full flex items-center justify-center">
          <FaMapMarkerAlt className="text-base-deep" />
        </div>
        <div className="flex flex-row min-w-0">
          <span className="typo-body-2 text-base-deep font-medium truncate">{foundLocation}</span>
        </div>
      </div>
    </div>
  );
}
