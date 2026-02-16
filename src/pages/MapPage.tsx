import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { MapPageClubCategory } from '@/components/ClubCategory';
import { BoothMarker } from '@/components/BoothMarker';
import { BOOTH_COORDINATES } from '@/constants/map';
import { DIVISION_INFO, MOCK_BOOTHS } from '@/constants/booth';
import MapSvg from '@/assets/map.svg';

export default function MapPage() {
  const [value, setValue] = useState('');

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
              const boothInfo = MOCK_BOOTHS.find(b => b.booth_number === boothNum);
              const bgColorClass = coord.isManagement
                ? DIVISION_INFO.MANAGEMENT.color
                : boothInfo
                  ? DIVISION_INFO[boothInfo.division].color
                  : 'bg-gray-300'

              return (
                <BoothMarker
                  key={boothNum}
                  x={coord.x}
                  y={coord.y}
                  rotate={coord.rotate}
                  isManagement={coord.isManagement}
                  bgColorClass={bgColorClass}
                  isOpen={boothInfo?.is_active}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
