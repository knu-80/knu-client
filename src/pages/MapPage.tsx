import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { MapPageClubCategory } from '@/components/ClubCategory';
import { Map } from '@/components/map';
import { DIVISION_LIST } from '@/constants/booth';
import { BoothPopup } from '@/components/BoothPopup';
import { SearchWidget } from '@/components/SearchWidget';

export default function MapPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [selectedBoothId, setSelectedBoothId] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleBoothClick = useCallback((id: number) => {
    setSelectedBoothId(id);
  }, []);

  const handleSearch = (keyword: string) => {
    setValue(keyword);
    setIsSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="w-full h-screen relative bg-gray-50">
      <div className="px-5 py-3 z-30 sticky top-0 bg-white" onClick={() => setIsSearchOpen(true)}>
        <div className="pointer-events-none">
          <SearchBar
            value={value}
            onChange={() => {}}
            onClear={() => setValue('')}
            placeholder="동아리, 부스명을 검색해보세요"
          />
        </div>
      </div>

      <div className="sticky top-[52px] z-20 flex gap-2 overflow-x-auto px-5 py-2 no-scrollbar">
        {DIVISION_LIST.map((d) => (
          <MapPageClubCategory key={d} division={d} />
        ))}
      </div>

      <Map selectedBoothId={selectedBoothId} onBoothClick={handleBoothClick} />
      {selectedBoothId && (
        <div className="absolute bottom-0 left-0 w-full px-6">
          <BoothPopup boothId={selectedBoothId} onClose={() => setSelectedBoothId(null)} />
        </div>
      )}
      {isSearchOpen && (
        <SearchWidget
          value={value}
          onChange={setValue}
          onClear={() => setValue('')}
          onClose={() => setIsSearchOpen(false)}
          onSearch={handleSearch}
        />
      )}
    </div>
  );
}
