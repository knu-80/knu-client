import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { SearchBar } from '@/components/SearchBar';
import { ClubCategory } from './ClubCategory';
import { MOCK_BOOTHS } from '@/constants/booth';

interface SearchWidgetProps {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  onClose: () => void;
  onSearch: (keyword: string) => void;
}

const RECOMMENDATIONS = ['힐링', '취미활동', '공모전', '밴드', '창업'];

export function SearchWidget({ value, onChange, onClear, onClose, onSearch }: SearchWidgetProps) {
  const navigate = useNavigate();
  const recommendedBooths = Object.values(MOCK_BOOTHS).slice(0, 5);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col">
      <div className="px-5 py-3 flex items-center gap-2 border-b border-gray-100">
        <button
          onClick={onClose}
          className="p-1 -ml-2 text-gray-600 active:bg-gray-100 rounded-full transition-colors"
        >
          <FiArrowLeft size={24} />
        </button>

        <div className="flex-1">
          <SearchBar
            value={value}
            onChange={onChange}
            onClear={onClear}
            placeholder="동아리, 부스명을 검색해보세요"
          />
        </div>
      </div>

      <div className="p-5">
        <h4 className="typo-heading-3 font-semibold mb-2">추천 검색어</h4>
        <div className="flex flex-wrap gap-[10px]">
          {RECOMMENDATIONS.map((tag) => (
            <button
              key={tag}
              onClick={() => onSearch(tag)}
              className="p-[10px] h-8 flex items-center border border-gray-200 rounded-full typo-body-2 text-gray-700 active:bg-gray-100 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* [seah] 무한스크롤 넣기 */}
      <div className="flex-1 flex flex-col min-h-0 mt-5">
        <div className="mb-4 px-5">
          <h4 className="typo-heading-3 font-semibold">놓치면 아쉬운 동아리</h4>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-5 px-5">
            {recommendedBooths.map((booth) => {
              const hasImage = booth.imageUrl && booth.imageUrl.trim() !== '';
              return (
                <div
                  key={booth.id}
                  onClick={() => navigate(`/booths/${booth.id}`)}
                  className="w-full h-[100px] bg-white flex gap-4 items-center cursor-pointer shrink-0"
                >
                  {hasImage ? (
                    <img
                      src={booth.imageUrl}
                      alt={booth.name}
                      className="w-[100px] h-[100px] object-cover rounded-[4px] shrink-0"
                    />
                  ) : (
                    <div className="w-[100px] h-[100px] bg-gray-200 rounded-[4px] relative overflow-hidden shrink-0">
                      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r via-white/40" />
                    </div>
                  )}

                  <div className="flex flex-col h-full gap-1 overflow-hidden">
                    <div className="flex gap-2">
                      <h3 className="font-medium typo-body-1 truncate">{booth.name}</h3>
                      <ClubCategory division={booth.division} />
                    </div>
                    <p className="typo-caption line-clamp-2">{booth.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
