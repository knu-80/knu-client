import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { MapPageClubCategory } from '@/components/ClubCategory';
import { BoothMarker } from '@/components/BoothMarker';
import { BOOTH_COORDINATES } from '@/constants/map';
import { DIVISION_INFO, MOCK_BOOTHS, type BoothDetail } from '@/constants/booth';
import MapSvg from '@/assets/map.svg';

const DEFAULT_BOOTH: BoothDetail = {
  booth_number: 0,
  name: '',
  division: 'ACADEMIC_DIVISION',
  is_active: false,
};

export default function MapPage() {
  const [value, setValue] = useState('');
  const [selectedBoothId, setSelectedBoothId] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="px-5 py-3 z-30">
        <SearchBar
          value={value}
          onChange={setValue}
          onClear={() => setValue('')}
          placeholder="동아리, 부스명을 검색해보세요"
        />
      </div>

      <div className="relative flex-1 overflow-auto bg-gray-50">
        <div className="relative w-[700px] h-[3000px] mx-auto">
          <img
            src={MapSvg}
            alt="지도"
            className="absolute top-0 left-0 w-full h-full"
          />
          <div className="sticky top-0 z-20 flex gap-[10px] overflow-x-auto px-5 py-3">
            {['문예부', '사회부', '학술부', '체육부', '종교부'].map(d => (
              <MapPageClubCategory key={d} divisionName={d} />
            ))}
          </div>
          <div className="absolute top-0 left-0 w-full h-full">
            {Object.entries(BOOTH_COORDINATES).map(([number, coord]) => {
              const boothNum = Number(number);
              const boothInfo = MOCK_BOOTHS[boothNum] || DEFAULT_BOOTH;
              const isSelected = selectedBoothId === boothNum;
              const divisionColor = coord.isManagement
                ? DIVISION_INFO.MANAGEMENT.color
                : DIVISION_INFO[boothInfo.division].color;
              const bgColorClass = isSelected ? 'bg-knu-red' : divisionColor;
              return (
                <BoothMarker
                  key={boothNum}
                  {...coord}
                  bgColorClass={bgColorClass}
                  isOpen={boothInfo.is_active}
                  onClick={() => setSelectedBoothId(boothNum)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
