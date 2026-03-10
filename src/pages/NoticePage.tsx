import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { GrAnnounce } from 'react-icons/gr';
import { FiChevronRight } from 'react-icons/fi';
import { toNoticeLabel, type NoticeLabel } from '@/apis/enumMapper';
import { useNotices } from '@/hooks/useNotices';

type NoticeTab = '전체' | NoticeLabel;

const TABS: NoticeTab[] = ['전체', '공지', '분실물'];

function toDateText(value: string): string {
  const [datePart] = value.split('T');
  return datePart ?? value;
}

export default function NoticePage() {
  const { notices, isLoading, error, refetch } = useNotices();
  const [activeTab, setActiveTab] = useState<NoticeTab>('전체');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const filteredNotices = useMemo(() => {
    if (activeTab === '전체') {
      return notices;
    }
    return notices.filter((notice) => toNoticeLabel(notice.type) === activeTab);
  }, [activeTab, notices]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-knu-red" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <p className="text-sm text-gray-500">안내 목록을 불러오는 중 오류가 발생했습니다.</p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-full bg-knu-red px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pt-5">
      <div className="flex items-center gap-2">
        <GrAnnounce className="h-5 w-5 text-black" />
        <h2 className="typo-heading-2 text-black">공지사항</h2>
      </div>

      <section aria-label="공지사항 카테고리" className="grid grid-cols-3 gap-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-3 py-2.5 text-sm font-semibold transition-all ${
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
          filteredNotices.map((notice) => {
            const label = toNoticeLabel(notice.type);
            return (
              <Link
                key={notice.noticeId}
                to={`/notice/${notice.noticeId}`}
                className="block rounded-2xl border border-knu-silver/55 bg-white px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition hover:border-knu-gold/60 hover:shadow-[0_6px_16px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                        label === '공지'
                          ? 'bg-knu-red/10 text-knu-red'
                          : 'bg-knu-gray/15 text-knu-gray'
                      }`}
                    >
                      {label}
                    </span>
                    <p className="mt-2 truncate text-sm font-semibold text-knu-gray">
                      {notice.title}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-gray-500">
                    {toDateText(notice.createdAt)}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-end">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-knu-gray/70">
                    자세히 보기
                    <FiChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </section>
    </div>
  );
}
