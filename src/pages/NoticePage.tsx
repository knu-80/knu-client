import { useState } from 'react';
import { GrAnnounce } from 'react-icons/gr';

export default function NoticePage() {
  const [activeTab, setActiveTab] = useState('전체');
  const tabs = ['전체', '공지', '분실물'];

  return (
    <div className="p-5">
      <div className="flex items-center space-x-2 mb-4">
        <GrAnnounce className="h-6 w-6 text-black" />
        <h2 className="typo-heading-2 text-black">공지사항</h2>
      </div>
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-4 py-2 rounded-full text-sm ${
              activeTab === tab ? 'bg-knu-gray text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
