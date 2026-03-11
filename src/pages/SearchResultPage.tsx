import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { SearchBar } from '@/components/SearchBar';
import { BoothItem } from '@/components/BoothItem';
import { NoResults } from '@/components/search/NoResults';
import { useBooths, useBoothsWithFallback } from '@/hooks/useBooths';
import { useRecommendedClubBooths } from '@/hooks/useRecommendedBooths';
import { useMemo, useState } from 'react';

export default function SearchResultPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const navigate = useNavigate();
  const paramsMemo = useMemo(() => ({ keyword: query }), [query]);
  const { booths } = useBooths(paramsMemo);

  const { booths: fallbackBooths } = useBoothsWithFallback();
  const recommendedBooths = useRecommendedClubBooths(fallbackBooths, 5);

  const results = Object.values(booths);
  const hasResults = results.length > 0;
  const isSearching = query !== '';

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="py-3 flex items-center gap-2 border-b border-gray-100 shrink-0">
        <button onClick={() => navigate('/search')} className="p-1 -ml-2 text-gray-600">
          <FiArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={(v) => setSearchTerm(v)}
            onClear={() => {
              setSearchTerm('');
              setSearchParams({ q: '' });
            }}
            onSearch={() => setSearchParams({ q: searchTerm })}
            placeholder="동아리, 부스명을 검색해보세요"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {hasResults ? (
          <div className="px-1 py-4">
            <p className="typo-body-2 text-gray-500 mb-4">
              총 <span className="text-black font-medium">{results.length}개</span>의 결과
            </p>
            <div className="flex flex-col gap-5">
              {results.map((booth) => (
                <BoothItem
                  key={booth.id}
                  booth={booth}
                  onClick={() => navigate(`/booths/${booth.id}`)}
                  onLocationClick={() => {
                    navigate('/map', {
                      state: { selectedBoothId: booth.id },
                    });
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          isSearching && (
            <>
              <NoResults />
              <div className="px-1 py-10">
                <div className="mb-4">
                  <h4 className="typo-heading-3 font-semibold text-base-deep">
                    놓치면 아쉬운 동아리
                  </h4>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar">
                  <div className="flex flex-col gap-5 pb-10">
                    {recommendedBooths.map((booth) => (
                      <BoothItem
                        key={booth.id}
                        booth={booth}
                        onClick={() => navigate(`/booths/${booth.id}`)}
                        onLocationClick={() => {
                          navigate('/map', {
                            state: { selectedBoothId: booth.id },
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
