import { DIVISION_INFO } from "@/constants/booth";

interface ClubCategoryProps {
  divisionName: string;
}

export default function ClubCategory({ divisionName }: ClubCategoryProps) {
  let circleColorClass = '';

  switch (divisionName) {
    case '문예부':
      circleColorClass = 'bg-[var(--color-knu-gold)]';
      break;
    case '사회부':
      circleColorClass = 'bg-[var(--color-knu-red)]';
      break;
    case '학술부':
      circleColorClass = 'bg-[var(--color-knu-mint)]';
      break;
    case '체육부':
      circleColorClass = 'bg-[var(--color-knu-lavender)]';
      break;
    case '종교부':
      circleColorClass = 'bg-[var(--color-knu-sage)]';
      break;
    default:
      circleColorClass = 'bg-gray-500';
      break;
  }

  return (
    <div className="flex items-center space-x-1">
      <div className={`w-3 h-3 rounded-full ${circleColorClass}`}></div>
      <p className="typo-body-1">{divisionName}</p>
    </div>
  );
}

interface MapPageClubCategoryProps {
  divisionName: string;
}

export function MapPageClubCategory({ divisionName }: MapPageClubCategoryProps) {
  const info = Object.values(DIVISION_INFO).find((v) => v.name === divisionName);

  return (
    <div className="h-8 px-[10px] border border-gray-200 rounded-full bg-white flex items-center shrink-0">
      <div className="flex items-center space-x-1">
        <div
          className={`w-2 h-2 rounded-full ${info?.color ?? 'bg-gray-500'}`}
        ></div>
        <p className="typo-body-2 text-black">
          {info?.shortName ?? divisionName}
        </p>
      </div>
    </div>
  );
}
