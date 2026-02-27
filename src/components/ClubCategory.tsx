import { DIVISION_INFO, type DivisionType } from '@/constants/booth';

interface ClubCategoryProps {
  division: DivisionType;
}

export function ClubCategory({ division }: ClubCategoryProps) {
  const info = DIVISION_INFO[division as keyof typeof DIVISION_INFO];
  if (!info) return null;

  return (
    <div className="h-8 px-[10px] flex items-center shrink-0">
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${info.color}`}></div>
        <p className="typo-body-2 text-black">{info.name}</p>
      </div>
    </div>
  );
}

export function MapPageClubCategory({ division }: ClubCategoryProps) {
  const info = DIVISION_INFO[division as keyof typeof DIVISION_INFO];
  if (!info) return null;

  return (
    <div className="h-8 px-[10px] border border-gray-200 rounded-full bg-white flex items-center shrink-0">
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${info.color}`}></div>
        <p className="typo-body-2 text-black">{info.shortName}</p>
      </div>
    </div>
  );
}
