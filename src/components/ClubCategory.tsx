import { DIVISION_INFO } from '@/constants/booth';

interface ClubCategoryProps {
  divisionName: string;
}

export default function ClubCategory({ divisionName }: ClubCategoryProps) {
  const info = Object.values(DIVISION_INFO).find((v) => v.name === divisionName);
  const circleColorClass = info?.color ?? 'bg-gray-500';
  const displayName = divisionName === '총동아리연합회' ? '총동연' : divisionName;

  return (
    <div className="flex items-center space-x-1">
      <div className={`w-3 h-3 rounded-full ${circleColorClass}`}></div>
      <p className="typo-body-1">{displayName}</p>
    </div>
  );
}

interface MapPageClubCategoryProps {
  divisionName: string;
}

export function MapPageClubCategory({ divisionName }: MapPageClubCategoryProps) {
  const info = Object.values(DIVISION_INFO).find((v) => v.name === divisionName);

  return (
    <div className="h-8 px-2.5 border border-gray-200 rounded-full bg-white flex items-center shrink-0">
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${info?.color ?? 'bg-gray-500'}`}></div>
        <p className="typo-body-2 text-black">{info?.shortName ?? divisionName}</p>
      </div>
    </div>
  );
}
