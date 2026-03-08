import { useState, useEffect } from 'react';
import { getBooths, type BoothSummary } from '@/apis';

export function useBooths() {
  const [booths, setBooths] = useState<BoothSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooths = async () => {
      try {
        const data = await getBooths();
        setBooths(data);
      } finally {
        setLoading(false);
      }
    };
    fetchBooths();
  }, []);

  return { booths, loading };
}
