export type LikeBoostStatus = 'upcoming' | 'active' | 'ended';

export const LIKE_BOOST_EVENT_DATE = '2026-03-17';
export const LIKE_BOOST_START_HOUR = 12;
export const LIKE_BOOST_END_HOUR = 14;

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isLikeBoostEventDay(date: Date): boolean {
  return toDateKey(date) === LIKE_BOOST_EVENT_DATE;
}

export function getLikeBoostStatus(date: Date): LikeBoostStatus {
  if (!isLikeBoostEventDay(date)) {
    return 'ended';
  }

  const start = new Date(date);
  start.setHours(LIKE_BOOST_START_HOUR, 0, 0, 0);

  const end = new Date(date);
  end.setHours(LIKE_BOOST_END_HOUR, 0, 0, 0);

  if (date < start) return 'upcoming';
  if (date >= start && date < end) return 'active';
  return 'ended';
}

export function isLikeBoostPopupAvailable(date: Date): boolean {
  return getLikeBoostStatus(date) !== 'ended';
}
