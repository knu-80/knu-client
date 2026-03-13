import { DIVISION_INFO } from '@/constants/booth';
import type { BoothDivision } from '@/apis/modules/boothApi';

interface ClubCategoryProps {
  division: BoothDivision;
  active?: boolean;
}

export function ClubCategory({ division }: ClubCategoryProps) {
  const info = DIVISION_INFO[division];
  if (!info) return null;

  return (
    <div className={`flex items-center space-x-1 px-[6px] py-[2px] rounded-sm ${info.bgColor}`}>
      <div className={`w-2 h-2 rounded-full ${info.color}`}></div>
      <p className="typo-body-2 text-base-deep">{info.name}</p>
    </div>
  );
}

export function ClubCategoryLabel({ division }: ClubCategoryProps) {
  const info = DIVISION_INFO[division];
  if (!info) return null;

  return (
    <div className={`flex items-center space-x-1 px-[6px] py-[2px] rounded-sm ${info.bgColor}`}>
      <div className={`w-2 h-2 rounded-full ${info.color}`}></div>
      <p className="typo-body-3 text-base-deep">{info.name}</p>
    </div>
  );
}

export function ClubCategoryChip({ division, active }: ClubCategoryProps) {
  const info = DIVISION_INFO[division];
  if (!info) return null;

  return (
    <div
      className={`
        h-8 px-2.5 border rounded-full flex items-center shrink-0 border-gray-200 cursor-pointer
        ${active ? `${info.color} text-white` : 'bg-white'}
      `}
    >
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${active ? 'bg-white' : info.color}`}></div>
        <p className="typo-body-2 text-base-deep">{info.shortName}</p>
      </div>
    </div>
  );
}
