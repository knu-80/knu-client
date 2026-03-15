import { useMemo } from 'react';
import { type BoothSummary, type BoothDivision } from '@/apis';

const EXCLUDED_DIVISIONS: BoothDivision[] = ['MANAGEMENT', 'EXTERNAL_SUPPORT'];

function pickRandomBooths(booths: BoothSummary[], count: number) {
  if (booths.length <= count) {
    return booths;
  }

  return [...booths].sort(() => Math.random() - 0.5).slice(0, count);
}

export function useRecommendedBooths(booths: BoothSummary[], count = 5, onlyActive = true) {
  return useMemo(() => {
    if (booths.length === 0) return [];
    const candidates = onlyActive ? booths.filter((b) => b.isActive) : booths;
    return pickRandomBooths(candidates, count);
  }, [booths, count, onlyActive]);
}

export function useRecommendedClubBooths(booths: BoothSummary[], count = 5, onlyActive = true) {
  return useMemo(() => {
    if (booths.length === 0) return [];

    let candidates = booths.filter((b) => !EXCLUDED_DIVISIONS.includes(b.division));
    if (onlyActive) {
      candidates = candidates.filter((b) => b.isActive);
    }

    return pickRandomBooths(candidates, count);
  }, [booths, count, onlyActive]);
}
