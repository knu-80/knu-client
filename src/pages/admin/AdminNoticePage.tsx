import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrAnnounce } from 'react-icons/gr';
import NoticeCard from '@/components/NoticeCard';
import { SlPencil } from 'react-icons/sl';

export default function AdminNoticePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('전체');
  const tabs = ['전체', '공지', '분실물'];

  const notices = [
    { number: 4, title: '축제 부스 운영 시간 변경 안내', date: '2026.10.26', category: '공지' },
    { number: 3, title: '학생회관에서 지갑 분실했어요!', date: '2026.10.25', category: '분실물' },
    { number: 2, title: '중앙도서관 시험 기간 연장 운영', date: '2026.10.24', category: '공지' },
    { number: 1, title: '본관 앞에서 에어팟 주우신 분!', date: '2026.10.23', category: '분실물' },
    { number: 4, title: '축제 부스 운영 시간 변경 안내', date: '2026.10.26', category: '공지' },
    { number: 3, title: '학생회관에서 지갑 분실했어요!', date: '2026.10.25', category: '분실물' },
    { number: 2, title: '중앙도서관 시험 기간 연장 운영', date: '2026.10.24', category: '공지' },
    { number: 1, title: '본관 앞에서 에어팟 주우신 분!', date: '2026.10.23', category: '분실물' },
    { number: 4, title: '축제 부스 운영 시간 변경 안내', date: '2026.10.26', category: '공지' },
    { number: 3, title: '학생회관에서 지갑 분실했어요!', date: '2026.10.25', category: '분실물' },
    { number: 2, title: '중앙도서관 시험 기간 연장 운영', date: '2026.10.24', category: '공지' },
    { number: 1, title: '본관 앞에서 에어팟 주우신 분!', date: '2026.10.23', category: '분실물' },
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
    <div className="pt-5 sm:p-5 relative pb-24">
      <div className="flex items-center space-x-2 mb-4">
        <GrAnnounce className="h-6 w-6 text-black" />
        <h2 className="typo-heading-2 text-black">공지사항 관리</h2>
      </div>
      <div className="flex space-x-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === tab ? 'bg-knu-gray text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-x-4 px-2 sm:px-4 py-2 text-sm font-semibold text-gray-500 border-y border-gray-200 bg-gray-50 uppercase tracking-wider">
          <div className="w-8 text-center text-[10px]">번호</div>
          <div className="flex-1 text-center">제목</div>
          <div className="w-16 text-center">날짜</div>
        </div>

        <div>
          {filteredNotices.length === 0 ? (
            <div className="py-20 text-center text-gray-400">등록된 공지사항이 없습니다.</div>
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

      <button
        onClick={() => navigate('/admin/notice/new')}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex h-12 w-fit items-center justify-center gap-3 rounded-full bg-[#0F172A] px-6 text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
      >
        <SlPencil className="h-4 w-4" />
        <span className="text-base font-bold whitespace-nowrap text-white">공지 추가하기</span>
      </button>
    </div>
  );
}
