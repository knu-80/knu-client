import { DIVISION_INFO, type DivisionType } from '@/constants/booth';

interface ClubCategoryProps {
  division: DivisionType;
}

export function ClubCategory({ division }: ClubCategoryProps) {
  const info = DIVISION_INFO[division];
  if (!info) return null;

  return (
    <div className="flex items-center space-x-1">
      <div className={`w-3 h-3 rounded-full ${info.color}`}></div>
      <p className="typo-body-1">{info.name}</p>
    </div>
  );
}

export default ClubCategory;

export function MapPageClubCategory({ division }: ClubCategoryProps) {
  const info = DIVISION_INFO[division];
  if (!info) return null;

  return (
    <div className="h-8 px-2.5 border border-gray-200 rounded-full bg-white flex items-center shrink-0">
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${info.color}`}></div>
        <p className="typo-body-2 text-black">{info.shortName}</p>
      </div>
    </div>
  );
}
