import { useState, useEffect } from 'react';
import { getBoothTop3, type Booth3Ranking } from '@/apis';

export function useBoothTop3() {
  const [data, setData] = useState<Booth3Ranking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchRanking = async () => {
      setIsLoading(true);
      try {
        const res = await getBoothTop3();
        if (isMounted) setData(res);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchRanking();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading };
}
