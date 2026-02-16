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

const divisionNameMap: Record<string, string> = {
  '문예부': '문예',
  '사회부': '사회',
  '학술부': '학술',
  '체육부': '체육',
  '종교부': '종교',
};

interface MapPageClubCategoryProps {
  divisionName: string;
}

export function MapPageClubCategory({ divisionName }: MapPageClubCategoryProps) {
  const shortName = divisionNameMap[divisionName] || divisionName;

  return (
    <div className="h-8 px-[10px] border border-gray-200 rounded-full bg-white flex items-center">
      <div className="flex items-center space-x-1">
        <div
          className={`w-2 h-2 rounded-full ${
            (() => {
              switch (divisionName) {
                case '문예부':
                  return 'bg-[var(--color-knu-gold)]';
                case '사회부':
                  return 'bg-[var(--color-knu-red)]';
                case '학술부':
                  return 'bg-[var(--color-knu-mint)]';
                case '체육부':
                  return 'bg-[var(--color-knu-lavender)]';
                case '종교부':
                  return 'bg-[var(--color-knu-sage)]';
                default:
                  return 'bg-gray-500';
              }
            })()
          }`}
        ></div>
        <p className="typo-body-2 text-black">{shortName}</p>
      </div>
    </div>
  );
}
