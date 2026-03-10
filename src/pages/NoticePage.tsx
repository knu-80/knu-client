import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { GrAnnounce } from 'react-icons/gr';
import { FiChevronRight } from 'react-icons/fi';
import { NOTICES } from '@/mocks/notices';

type NoticeTab = '전체' | '공지' | '분실물';

const TABS: NoticeTab[] = ['전체', '공지', '분실물'];

export default function NoticePage() {
  const [activeTab, setActiveTab] = useState<NoticeTab>('전체');

  const filteredNotices = useMemo(() => {
    if (activeTab === '전체') {
      return NOTICES;
    }
    return NOTICES.filter((notice) => notice.category === activeTab);
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-5 pt-5">
      <section className="rounded-3xl border border-knu-silver/70 bg-gradient-to-br from-knu-silver/15 via-white to-knu-gold/10 px-5 py-6">
        <div className="flex items-center gap-2">
          <GrAnnounce className="h-5 w-5 text-knu-red" />
          <h2 className="typo-heading-2 text-knu-gray">공지사항</h2>
        </div>
        <p className="mt-2 text-sm text-text-muted">
          공지, 분실물, 행사 운영 관련 최신 안내를 확인할 수 있어요.
        </p>
      </section>

      <section aria-label="공지사항 카테고리" className="grid grid-cols-3 gap-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`interactive-transition rounded-full px-3 py-2.5 text-sm font-semibold ${
                isActive
                  ? 'bg-knu-red text-white shadow-[0_6px_14px_rgba(230,0,0,0.24)]'
                  : 'bg-white text-knu-gray shadow-[inset_0_0_0_1px_rgba(204,204,204,0.9)] hover:text-knu-gold hover:shadow-[inset_0_0_0_1px_rgba(191,124,38,0.5)]'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </section>

      <section aria-label="공지사항 목록" className="space-y-2 pb-2">
        {filteredNotices.length === 0 ? (
          <div className="rounded-2xl border border-knu-silver/55 bg-white px-4 py-8 text-center text-sm text-text-muted">
            등록된 공지사항이 없습니다.
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <Link
              key={notice.id}
              to={`/notice/${notice.id}`}
              className="interactive-transition block rounded-2xl border border-knu-silver/55 bg-white px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:border-knu-gold/60 hover:shadow-[0_6px_16px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                      notice.category === '공지'
                        ? 'bg-knu-red/10 text-knu-red'
                        : 'bg-knu-gray/15 text-knu-gray'
                    }`}
                  >
                    {notice.category}
                  </span>
                  <p className="mt-2 truncate text-sm font-semibold text-knu-gray">
                    {notice.title}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-medium text-gray-500">{notice.date}</span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="truncate text-xs text-text-muted">작성자: {notice.author}</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-knu-gray/70">
                  자세히 보기
                  <FiChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))
        )}
      </section>
    </div>
  );
}
