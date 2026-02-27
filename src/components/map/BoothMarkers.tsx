import { memo } from 'react';
import { BOOTH_COORDINATES } from './world';
import { MOCK_BOOTHS, type BoothDetail } from '@/constants/booth';
import { BoothMarker } from './BoothMarker';

const DEFAULT_BOOTH: BoothDetail = {
  booth_number: 0,
  name: '',
  division: 'ACADEMIC_DIVISION',
  is_active: false,
};

export const BoothMarkers = memo(function BoothMarkers({
  onBoothClick,
  selectedBoothId,
}: {
  onBoothClick: (id: number) => void;
  selectedBoothId: number | null;
}) {
  return (
    <>
      {Object.entries(BOOTH_COORDINATES).map(([number, coord]) => {
        const boothNum = Number(number);
        const boothInfo = MOCK_BOOTHS[boothNum] || DEFAULT_BOOTH;
        const isSelected = selectedBoothId === boothNum;

        return (
          <BoothMarker
            key={boothNum}
            {...coord}
            name={boothInfo.name}
            bgColorClass={isSelected ? 'bg-knu-red text-white' : 'bg-vanilla'}
            isOpen={boothInfo.is_active}
            onClick={() => onBoothClick(boothNum)}
          />
        );
      })}
    </>
  );
});
