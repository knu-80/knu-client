import { FiArrowLeft } from 'react-icons/fi';
import { SearchBar } from '@/components/SearchBar';

interface SearchWidgetProps {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  onClose: () => void;
  onSearch: (keyword: string) => void;
}

const RECOMMENDATIONS = ['힐링', '취미활동', '공모전', '밴드', '창업'];

export function SearchWidget({ value, onChange, onClear, onClose, onSearch }: SearchWidgetProps) {
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
    </div>
  );
}
