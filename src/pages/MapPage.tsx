import { useState, useCallback } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { MapPageClubCategory } from '@/components/ClubCategory';
import { Map } from '@/components/map';
import { DIVISION_LIST } from '@/constants/booth';

export default function MapPage() {
  const [value, setValue] = useState('');
  const [selectedBoothId, setSelectedBoothId] = useState<number | null>(null);

  const handleBoothClick = useCallback((id: number) => {
    setSelectedBoothId(id);
  }, []);

  return (
    <div className="w-full h-screen relative bg-gray-50">
      <div className="px-5 py-3 z-30 sticky top-0 bg-white">
        <SearchBar
          value={value}
          onChange={setValue}
          onClear={() => setValue('')}
          placeholder="동아리, 부스명을 검색해보세요"
        />
      </div>

      <div className="sticky top-[52px] z-20 flex gap-2 overflow-x-auto px-5 py-2 no-scrollbar">
        {DIVISION_LIST.map((d) => (
          <MapPageClubCategory key={d} division={d} />
        ))}
      </div>

      <Map selectedBoothId={selectedBoothId} onBoothClick={handleBoothClick} />
    </div>
  );
}
