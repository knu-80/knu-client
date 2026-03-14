import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { ClubCategoryChip } from '@/components/ClubCategory';
import { Map } from '@/components/map';
import { DIVISION_LIST } from '@/constants/booth';
import { BoothPopup } from '@/components/BoothPopup';
import { useBooths } from '@/hooks/useBooths';
import type { BoothDivision } from '@/apis';

export default function MapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booths } = useBooths();

  const [value, setValue] = useState('');
  const [selectedBoothId, setSelectedBoothId] = useState<number | null>(() => {
    const externalId = location.state?.selectedBoothId;
    return externalId ? Number(externalId) : null;
  });

  const [selectedDivision, setSelectedDivision] = useState<BoothDivision | null>(null);

  const handleBoothClick = useCallback((id: number) => {
    setSelectedBoothId(id);
  }, []);

  return (
    <div className="w-full h-full relative bg-gray-50">
      <div className="px-5 py-3 z-30 sticky top-0 bg-white" onClick={() => navigate('/search')}>
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
          <div key={d} onClick={() => setSelectedDivision((prev) => (prev === d ? null : d))}>
            <ClubCategoryChip division={d} active={selectedDivision === d} />
          </div>
        ))}
      </div>

      <Map
        booths={booths}
        selectedBoothId={selectedBoothId}
        selectedDivision={selectedDivision}
        onBoothClick={handleBoothClick}
      />
      {selectedBoothId && (
        <div className="absolute bottom-0 left-0 w-full px-6">
          <BoothPopup
            booths={booths}
            boothId={selectedBoothId}
            onClose={() => setSelectedBoothId(null)}
          />
        </div>
      )}
    </div>
  );
}
