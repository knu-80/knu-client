import SearchNoResultsIcon from '@/assets/ic-search-no-results.svg';
import NoticeEmptyIcon from '@/assets/ic-notice-empty.svg';
import EventEmptyIcon from '@/assets/ic-event-empty.svg';
import MaintenanceIcon from '@/assets/ic-maintenance.svg';
import ErrorIcon from '@/assets/ic-connection-error.svg';
import RecruitmentIcon from '@/assets/ic-recruitment-empty.svg';

type StatusVariant = 'search' | 'notice' | 'event' | 'maintenance' | 'recruitment' | 'error';

const STATUS_ASSETS: Record<StatusVariant, string> = {
  search: SearchNoResultsIcon,
  notice: NoticeEmptyIcon,
  event: EventEmptyIcon,
  recruitment: RecruitmentIcon,
  maintenance: MaintenanceIcon,
  error: ErrorIcon,
};

interface StatusDisplayProps {
  variant?: StatusVariant;
  title: string;
  description?: string;
}

export function StatusDisplay({ variant = 'recruitment', title, description }: StatusDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center py-4 px-10 min-h-[300px]">
      <img
        src={STATUS_ASSETS[variant]}
        alt={`${variant} 상태 아이콘`}
        loading="lazy"
        decoding="async"
        className="w-40 h-40 object-contain"
      />
      <div className="text-center mt-5">
        <h3 className="typo-heading-4 text-base-deep mb-1 whitespace-pre-line">{title}</h3>
        {description && (
          <p className="typo-body-2 font-regular text-gray-500 whitespace-pre-line">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
