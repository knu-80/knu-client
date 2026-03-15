import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { toNoticeLabel, type NoticeLabel } from '@/apis/enumMapper';
import { useNotices } from '@/hooks/useNotices';
import MegaPhoneSvg from '@/assets/megaphone.svg';
import { SelectableButton } from '@/components/SelectableButton';
import { NOTICE_CATEGORY_COLOR_MAP, NOTICE_BUTTON_COLOR_MAP } from '@/constants/notice';
import { Badge } from '@/components/Badge';
import { StatusDisplay } from '@/components/StatusDisplay';
import { PiSpinnerGapThin } from 'react-icons/pi';
import { toDotDate } from '@/lib/date';

const CATEGORIES: NoticeLabel[] = ['공지', '분실물'];

export default function NoticePage() {
  const { notices, isLoading, error, refetch } = useNotices();
  const [selectedCategories, setSelectedCategories] = useState<NoticeLabel[]>(CATEGORIES);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const toggleCategory = (category: NoticeLabel) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        if (prev.length === 1) return prev;
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  };

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => selectedCategories.includes(toNoticeLabel(notice.type)));
  }, [selectedCategories, notices]);

  return (
    <div className="flex flex-col flex-1 gap-5 pt-5 sm:p-5">
      <div>
        <div className="flex items-center h-14 gap-2">
          <img
            src={MegaPhoneSvg}
            alt="호반우 확성기"
            draggable={false}
            className="ml-1 mt-4 w-18 h-18 pointer-events-none select-none"
          />
          <span className="mt-2 typo-heading-3 font-semibold text-base-deep">
            최신 공지를 확인해보세요
          </span>
        </div>

        {!(isLoading || error) && (
          <div
            role="filter"
            aria-label="공지사항 카테고리 필터"
            className="grid grid-cols-2 gap-2 sm:gap-3"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategories.includes(category);
              const btnColor = NOTICE_BUTTON_COLOR_MAP[category];

              return (
                <SelectableButton
                  key={category}
                  selected={isActive}
                  onClick={() => toggleCategory(category)}
                  className={`whitespace-nowrap ${
                    isActive ? `${btnColor.activeBg} ${btnColor.activeText}` : ''
                  }`}
                  role="checkbox"
                  aria-checked={isActive}
                >
                  {category}
                </SelectableButton>
              );
            })}
          </div>
        )}
      </div>

      <section aria-label="공지사항 목록" className="space-y-3 pb-6">
        {isLoading ? (
          <div className="mt-[-20px] flex items-center justify-center rounded-2xl w-full min-h-80 border border-white bg-white">
            <PiSpinnerGapThin className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="mt-[-20px] flex flex-col items-center justify-center rounded-2xl w-full min-h-80 border border-gray-200 bg-white">
            <StatusDisplay variant="error" title="인터넷 연결을 확인해주세요" onAction={refetch} />
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="flex items-center justify-center rounded-2xl w-full min-h-45 border border-gray-200 bg-white">
            <StatusDisplay variant="event" title="현재 등록된 공지사항이 없어요" />
          </div>
        ) : (
          filteredNotices.map((notice) => {
            const label = toNoticeLabel(notice.type);
            const color = NOTICE_CATEGORY_COLOR_MAP[label as '공지' | '분실물'];

            return (
              <Link
                key={notice.noticeId}
                to={`/notice/${notice.noticeId}`}
                className={`interactive-transition block rounded-2xl px-5 py-4 ${color.bg} ${color.hoverBg}`}
              >
                <div className="grid grid-cols-[100px_1fr_20px] items-center gap-3">
                  <p className={`typo-body-2 font-semibold ${color.text}`}>
                    {toDotDate(notice.createdAt)}
                  </p>

                  <div className="flex items-center gap-[8px] min-w-0">
                    <Badge className={`${color.badgeBg} ${color.badgeText}`}>{label}</Badge>
                    <p className="truncate typo-body-2 font-medium text-base-deep">
                      {notice.title}
                    </p>
                  </div>
                  <FiChevronRight
                    className="h-4 w-4 text-gray-400 justify-self-end"
                    strokeWidth={2}
                  />
                </div>
              </Link>
            );
          })
        )}
      </section>
    </div>
  );
}
