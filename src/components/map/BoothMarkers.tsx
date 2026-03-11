import { memo, useMemo } from 'react';
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
  const boothMap = useMemo(() => {
    return new Map(booths.map((b) => [b.boothNumber, b]));
  }, [booths]);

  return (
    <>
      {Object.entries(BOOTH_COORDINATES).map(([boothNumberStr, coord]) => {
        const boothNumber = Number(boothNumberStr);
        const booth = boothMap.get(boothNumber);

        if (!booth) {
          return (
            <BoothMarker
              key={`empty-${boothNumber}`}
              {...coord}
              name=""
              bgColorClass="bg-gray-200"
              isSelected={false}
              isFiltered={false}
              isOpen={false}
              onClick={() => {}}
            />
          );
        }

        const isSelected = selectedBoothId === booth.id;
        const isDivisionMatch = selectedDivision === booth.division;
        const divisionColor = DIVISION_INFO[booth.division].color;

        const bgColor = isSelected
          ? 'bg-primary'
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
