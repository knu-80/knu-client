import { memo } from 'react';
import { BOOTH_COORDINATES } from './world';
import { BoothMarker } from './BoothMarker';
import type { BoothSummary, BoothDivision } from '@/apis';
import { DIVISION_INFO } from '@/constants/booth';

interface BoothMarkersProps {
  booths: BoothSummary[];
  onBoothClick: (id: number) => void;
  selectedBoothId: number | null;
  selectedDivision: BoothDivision | null;
}

export const BoothMarkers = memo(function BoothMarkers({
  booths,
  onBoothClick,
  selectedBoothId,
  selectedDivision,
}: BoothMarkersProps) {
  return (
    <>
      {booths.map((booth) => {
        const coord = BOOTH_COORDINATES[booth.boothNumber] || { x: 0, y: 0 };

        const isSelected = selectedBoothId === booth.id;
        const isDivisionMatch = selectedDivision === booth.division;
        const divisionColor = DIVISION_INFO[booth.division].color;

        const bgColor = isSelected
          ? 'bg-knu-red'
          : selectedDivision && isDivisionMatch
            ? divisionColor
            : 'bg-vanilla';

        return (
          <BoothMarker
            key={booth.id}
            {...coord}
            name={booth.name}
            bgColorClass={bgColor}
            isSelected={isSelected}
            isFiltered={!!selectedDivision && isDivisionMatch}
            isOpen={booth.isActive}
            onClick={() => onBoothClick(booth.id)}
          />
        );
      })}
    </>
  );
});
