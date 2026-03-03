import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrAnnounce } from 'react-icons/gr';
import { SlPencil } from 'react-icons/sl';
import NoticeCard from '@/components/NoticeCard';
import AdminActionButton from '@/components/AdminActionButton';
import { NOTICES } from '@/mocks/notices';

export default function AdminNoticePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('전체');
  const tabs = ['전체', '공지', '분실물'];

  const filteredNotices =
    activeTab === '전체'
      ? NOTICES
      : NOTICES.filter((notice) => {
          return notice.category === activeTab;
        });

  const handleWrite = () => {
    navigate('/admin/notice/write');
  };

  return (
    <div className="pt-5 sm:p-5 relative pb-24">
      <div className="flex items-center space-x-2 mb-4 px-2 sm:px-0">
        <GrAnnounce className="h-6 w-6 text-black" />
        <h2 className="typo-heading-2 text-black font-bold">공지사항 관리</h2>
      </div>

      <div className="flex space-x-2 mb-6 px-2 sm:px-0">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeTab === tab
                ? 'bg-knu-red text-white shadow-md'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-x-4 px-2 sm:px-4 py-3 text-[13px] font-bold text-gray-500 border-y border-gray-100 bg-gray-50/50">
          <div className="w-8 text-center">번호</div>
          <div className="flex-1 text-center">제목</div>
          <div className="w-16 text-center">날짜</div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredNotices.length === 0 ? (
            <div className="py-20 text-center text-gray-400 typo-body-2">
              등록된 공지사항이 없습니다.
            </div>
          ) : (
            filteredNotices.map((notice, index) => (
              <NoticeCard
                key={notice.id}
                id={notice.id}
                index={index}
                totalCount={filteredNotices.length}
                title={notice.title}
                date={notice.date}
                category={notice.category}
                basePath="/admin/notice"
              />
            ))
          )}
        </div>
      </div>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <AdminActionButton
          label="공지 추가하기"
          icon={SlPencil}
          onClick={handleWrite}
          className="bg-[#0F172A]"
        />
      </div>
    </div>
  );
}
