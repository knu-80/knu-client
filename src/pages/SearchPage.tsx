import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { SearchBar } from '@/components/SearchBar';
import { MOCK_BOOTHS } from '@/constants/booth';
import { BoothItem } from '@/components/BoothItem';
import { NoResults } from '@/components/search/NoResults';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  const handleQueryChange = (newValue: string) => {
    setSearchParams({ q: newValue }, { replace: true });
  };

  const filteredResults = Object.values(MOCK_BOOTHS).filter(
    (booth) => booth.name.includes(query) || booth.description.includes(query),
  );
  const recommendedBooths = Object.values(MOCK_BOOTHS).slice(0, 3);

  const hasResults = filteredResults.length > 0;
  const isSearching = query !== '';

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="px-5 py-3 flex items-center gap-2 border-b border-gray-100 shrink-0">
        <button onClick={() => navigate(-1)} className="p-1 -ml-2 text-gray-600">
          <FiArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <SearchBar
            value={query}
            onChange={handleQueryChange}
            onClear={() => setSearchParams({ q: '' })}
            onSearch={(v) => handleQueryChange(v)}
            placeholder="동아리, 부스명을 검색해보세요"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {hasResults ? (
          <div className="px-5 py-4">
            <p className="typo-body-2 text-gray-500 mb-4">
              총 <span className="text-black font-medium">{filteredResults.length}개</span>의 결과
            </p>
            <div className="flex flex-col gap-5">
              {filteredResults.map((booth) => (
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
              <div className="px-5 py-10">
                <div className="mb-4">
                  <h4 className="typo-heading-3 font-semibold">여기 방문은 어때요?</h4>
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
