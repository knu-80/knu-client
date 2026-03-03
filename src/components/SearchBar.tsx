import { FiX } from 'react-icons/fi';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onClear?: () => void;
  onSearch?: (v: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  onClear,
  onSearch,
  placeholder = '검색어를 입력하세요',
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="flex items-center h-[40px] px-4 py-2 bg-gray-100 rounded-full">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 outline-none text-body-1 text-gray-500 bg-transparent"
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        autoComplete="off"
      />

      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute right-4 z-10 p-4 flex items-center justify-center active:opacity-60 transition-opacity"
        >
          <FiX size={20} className="text-gray-400" />
        </button>
      )}
    </div>
  );
}
