import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { MapPageClubCategory } from '@/components/ClubCategory';
import { Map } from '@/components/map';

export default function MapPage() {
  const [value, setValue] = useState('');
  const [selectedBoothId, setSelectedBoothId] = useState<number | null>(null);

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

      <div className="sticky top-[52px] z-20 flex gap-2 overflow-x-auto px-5 py-2">
        {['문예부', '사회부', '학술부', '체육부', '종교부'].map((d) => (
          <MapPageClubCategory key={d} divisionName={d} />
        ))}
      </div>

      <Map selectedBoothId={selectedBoothId} setSelectedBoothId={setSelectedBoothId} />
    </div>
  );
}
