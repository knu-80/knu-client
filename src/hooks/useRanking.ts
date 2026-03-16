import { useState, useEffect, useMemo } from 'react';
import { getBoothRanking, type BoothRanking } from '@/apis';

export function useRanking() {
  const [booths, setBooths] = useState<BoothRanking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRanking = async () => {
    try {
      setIsLoading(true);
      const data = await getBoothRanking();
      setBooths(data);
    } catch (error) {
      console.error('랭킹 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, []);

  const { topThree, rest } = useMemo(() => {
    const podium = [booths[1], booths[0], booths[2]].filter(Boolean);

    const rest = booths.slice(3);

    return { topThree: podium, rest };
  }, [booths]);

  return { topThree, rest, isLoading, refetch: fetchRanking };
}
