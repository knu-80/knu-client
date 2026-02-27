import { memo } from 'react';
import { BOOTH_COORDINATES } from './world';
import { DEFAULT_BOOTH, MOCK_BOOTHS } from '@/constants/booth';
import { BoothMarker } from './BoothMarker';

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
            isOpen={boothInfo.isActive}
            onClick={() => onBoothClick(boothNum)}
          />
        );
      })}
    </>
  );
});
