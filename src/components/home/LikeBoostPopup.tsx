import { useMemo, useState } from 'react';
import { FiX, FiClock, FiMapPin, FiStar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

type LikeBoostStatus = 'upcoming' | 'active' | 'ended';

type LikeBoostPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onHideToday: () => void;
};

function getLikeBoostStatus(now: Date): LikeBoostStatus {
  const start = new Date(now);
  start.setHours(13, 0, 0, 0);

  const end = new Date(now);
  end.setHours(15, 0, 0, 0);

  if (now < start) return 'upcoming';
  if (now >= start && now < end) return 'active';
  return 'ended';
}

const STATUS_COPY: Record<
  LikeBoostStatus,
  { badge: string; badgeClassName: string; description: string }
> = {
  upcoming: {
    badge: '곧 시작',
    badgeClassName: 'bg-secondary-blue/10 text-secondary-blue',
    description: '13:00부터 15:00까지 좋아요 1회 클릭 시 2개가 반영돼요.',
  },
  active: {
    badge: '진행 중',
    badgeClassName: 'bg-primary/10 text-primary',
    description: '지금은 더블 좋아요 타임! 부스를 응원하면 1회 클릭에 2개가 반영돼요.',
  },
  ended: {
    badge: '종료',
    badgeClassName: 'bg-gray-200 text-gray-600',
    description: '오늘 더블 좋아요 이벤트는 종료됐어요. 일반 좋아요로 참여할 수 있어요.',
  },
};

export default function LikeBoostPopup({ isOpen, onClose, onHideToday }: LikeBoostPopupProps) {
  const navigate = useNavigate();
  const [dontShowToday, setDontShowToday] = useState(false);

  const status = useMemo(() => getLikeBoostStatus(new Date()), []);
  const copy = STATUS_COPY[status];

  const handleClose = () => {
    if (dontShowToday) {
      onHideToday();
    }
    onClose();
  };

  const handleNavigate = (path: '/ranking' | '/map') => {
    if (dontShowToday) {
      onHideToday();
    }
    onClose();
    navigate(path);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      <button
        type="button"
        aria-label="안내 팝업 닫기"
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={handleClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-label="더블 좋아요 이벤트 안내"
        className="relative w-full max-w-[420px] rounded-3xl bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
      >
        <button
          type="button"
          aria-label="팝업 닫기"
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <FiX className="h-5 w-5" />
        </button>

        <div className="mb-4 flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 typo-body-3 font-semibold ${copy.badgeClassName}`}
          >
            {copy.badge}
          </span>
          <span className="inline-flex items-center gap-1 text-gray-500 typo-body-3">
            <FiClock className="h-3.5 w-3.5" />
            13:00 ~ 15:00
          </span>
        </div>

        <h2 className="typo-heading-3 text-base-deep">🔥 더블 좋아요 타임 이벤트</h2>
        <p className="mt-2 typo-body-2 text-gray-600">{copy.description}</p>

        <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
          <p className="typo-body-2 font-semibold text-base-deep">
            좋아요 1회 클릭 시 <span className="text-primary">+2</span>
          </p>
          <p className="mt-1 typo-body-3 text-gray-500">
            랭킹은 실시간으로 반영되며, 현장 참여가 많을수록 순위 변동이 빨라져요.
          </p>
        </div>

        <label className="mt-4 flex cursor-pointer select-none items-center gap-2 typo-body-3 text-gray-500">
          <input
            type="checkbox"
            checked={dontShowToday}
            onChange={(event) => setDontShowToday(event.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          오늘은 그만 보기
        </label>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleNavigate('/map')}
            className="interactive-transition inline-flex items-center justify-center gap-1 rounded-xl border border-gray-200 px-3 py-2.5 typo-body-2 font-semibold text-base-deep hover:border-primary/40 hover:bg-primary/5"
          >
            <FiMapPin className="h-4 w-4" />
            부스 둘러보기
          </button>
          <button
            type="button"
            onClick={() => handleNavigate('/ranking')}
            className="interactive-transition inline-flex items-center justify-center gap-1 rounded-xl bg-primary px-3 py-2.5 typo-body-2 font-semibold text-white hover:brightness-95"
          >
            <FiStar className="h-4 w-4" />
            랭킹 보러가기
          </button>
        </div>
      </section>
    </div>
  );
}
