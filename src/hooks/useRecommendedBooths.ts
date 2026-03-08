import { useState } from 'react';
import { type BoothSummary, type BoothDivision } from '@/apis';

const EXCLUDED_DIVISIONS: BoothDivision[] = ['MANAGEMENT', 'EXTERNAL_SUPPORT'];

export function useRecommendedBooths(booths: BoothSummary[], count = 5, onlyActive = true) {
  const [recommended] = useState<BoothSummary[]>(() => {
    if (booths.length === 0) return [];
    const candidates = onlyActive ? booths.filter((b) => b.isActive) : booths;
    const shuffled = [...candidates].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  });

  return recommended;
}

export function useRecommendedClubBooths(booths: BoothSummary[], count = 5, onlyActive = true) {
  if (booths.length === 0) return [];

  let candidates = booths.filter((b) => !EXCLUDED_DIVISIONS.includes(b.division));

  if (onlyActive) {
    candidates = candidates.filter((b) => b.isActive);
  }

  const shuffled = [...candidates].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}
