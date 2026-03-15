import { useState, useEffect } from 'react';
import { getBooths, type BoothListParams, type BoothSummary } from '@/apis';

export function useBooths(params?: BoothListParams) {
  const [booths, setBooths] = useState<BoothSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooths = async () => {
      try {
        setLoading(true);
        const data = await getBooths(params);
        setBooths(data);
      } finally {
        setLoading(false);
      }
    };

    fetchBooths();
  }, [params]);

  return { booths, loading };
}
