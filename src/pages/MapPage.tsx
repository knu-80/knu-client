import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';

export default function MapPage() {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col h-screen">
      <div className="py-3 bg-white z-10">
        <SearchBar
          value={value}
          onChange={setValue}
          onClear={() => setValue('')}
          placeholder="동아리, 부스명을 검색해보세요"
        />
      </div>

      <div className="flex-1 bg-gray-50">
      </div>
    </div>
  );
}
