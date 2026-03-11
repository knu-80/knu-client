import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { SearchBar } from '@/components/SearchBar';
import { BoothItem } from '@/components/BoothItem';
import { useState } from 'react';
import { useRecommendedBooths } from '@/hooks/useRecommendedBooths';
import { useBoothsWithFallback } from '@/hooks/useBooths';
import { RECOMMENDATIONS } from '@/constants/booth';

export default function SearchPage() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const { booths } = useBoothsWithFallback();
  const recommendedBooths = useRecommendedBooths(booths, 5);

  const [value, setValue] = useState('');

  const handleSearch = (keyword: string) => {
    const trimmed = keyword.trim();

    if (trimmed) {
      navigate(`/search/result?q=${encodeURIComponent(trimmed)}`);
      return;
    }

    navigate('/search/result');
  };

  const handleLocationClick = (id: number) => {
    navigate('/map', { state: { selectedBoothId: id } });
  };

  const handleClear = () => {
    setSearchParams({});
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="py-3 flex items-center gap-2 border-b border-gray-100 shrink-0">
        <button
          onClick={() => navigate('/map')}
          aria-label="지도로 돌아가기"
          className="p-1 -ml-2 text-gray-600 active:bg-gray-100 rounded-full transition-colors"
        >
          <FiArrowLeft size={24} aria-hidden="true" />
        </button>

        <div className="flex-1">
          <SearchBar
            value={value}
            onChange={setValue}
            onClear={handleClear}
            onSearch={handleSearch}
            placeholder="동아리, 부스명을 검색해보세요"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-1 py-5">
          <h4 className="typo-heading-3 font-semibold mb-2 text-black">추천 검색어</h4>
          <div className="flex flex-wrap gap-[10px]">
            {RECOMMENDATIONS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSearch(tag)}
                className="p-[10px] h-8 flex items-center border border-gray-200 rounded-full typo-body-2 text-gray-700 active:bg-gray-100 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-4 px-1">
            <h4 className="typo-heading-3 font-semibold text-black">여기 방문은 어때요?</h4>
          </div>
          <div className="flex flex-col gap-5 px-1 pb-10">
            {recommendedBooths.map((booth) => (
              <BoothItem
                key={booth.id}
                booth={booth}
                onClick={() => navigate(`/booths/${booth.id}`)}
                onLocationClick={() => handleLocationClick(booth.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
