import { useState } from 'react';
import { GrAnnounce } from 'react-icons/gr';
import NoticeCard from '@/components/NoticeCard';
import FloatingActionButton from '@/components/FloatingActionButton';
import floatingMap from '@/assets/floating-map.svg';

export default function NoticePage() {
  const [activeTab, setActiveTab] = useState('전체');
  const tabs = ['전체', '공지', '분실물'];

  const notices = [
    { number: 4, title: '축제 부스 운영 시간 변경 안내', date: '2026.10.26', category: '공지' },
    { number: 3, title: '학생회관에서 지갑 분실했어요!', date: '2026.10.25', category: '분실물' },
    { number: 2, title: '중앙도서관 시험 기간 연장 운영', date: '2026.10.24', category: '공지' },
    { number: 1, title: '본관 앞에서 에어팟 주우신 분!', date: '2026.10.23', category: '분실물' },
  ];

  const filteredNotices =
    activeTab === '전체'
      ? notices
      : notices.filter((notice) => {
          return notice.category === activeTab;
        });

  return (
    <div className="pt-3 sm:p-5">
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
      <div className="mt-4">
        <div className="flex items-center gap-x-4 px-2 sm:px-4 py-2 text-sm font-semibold text-gray-500 border-y border-gray-200 bg-gray-50">
          <div className="w-8 text-center">번호</div>
          <div className="flex-1 text-center">제목</div>
          <div className="w-16 text-center">날짜</div>
        </div>

        <div>
          {filteredNotices.length === 0 ? (
            <div className="py-10 text-center text-gray-500">등록된 공지사항이 없습니다.</div>
          ) : (
            filteredNotices.map((notice) => (
              <NoticeCard
                key={notice.number}
                number={notice.number}
                title={notice.title}
                date={notice.date}
                category={notice.category as '공지' | '분실물'}
              />
            ))
          )}
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] z-30">
        <div className="mx-auto flex w-full max-w-[700px] justify-end px-5">
          <FloatingActionButton
            label="부스 배치도로 이동"
            href="/map"
            icon={floatingMap}
            className="pointer-events-auto"
          />
        </div>
      </div>
    </div>
  );
}
