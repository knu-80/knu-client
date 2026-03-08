import { memo } from 'react';
import { BOOTH_COORDINATES } from './world';
import { BoothMarker } from './BoothMarker';
import { type BoothSummary } from '@/apis';

interface BoothMarkersProps {
  booths: BoothSummary[];
  onBoothClick: (id: number) => void;
  selectedBoothId: number | null;
}

export const BoothMarkers = memo(function BoothMarkers({
  booths,
  onBoothClick,
  selectedBoothId,
}: BoothMarkersProps) {
  return (
    <>
      {booths.map((booth) => {
        const coord = BOOTH_COORDINATES[booth.boothNumber] || { x: 0, y: 0 };
        const isSelected = selectedBoothId === booth.id;

        return (
          <BoothMarker
            key={booth.id}
            {...coord}
            name={booth.name}
            bgColorClass={isSelected ? 'bg-knu-red' : 'bg-vanilla'}
            isSelected={isSelected}
            isOpen={booth.isActive}
            onClick={() => onBoothClick(booth.id)}
          />
        );
      })}
    </>
  );
});
