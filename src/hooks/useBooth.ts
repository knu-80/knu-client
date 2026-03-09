import { useState, useEffect } from 'react';
import { getBooth, type BoothSummary } from '@/apis';

export function useBooth(boothId: number) {
  const [booth, setBooth] = useState<BoothSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!boothId) {
      setBooth(null);
      setLoading(false);
      return;
    }

    const fetchBooth = async () => {
      try {
        setLoading(true);
        const data = await getBooth(boothId);
        setBooth(data);
      } finally {
        setLoading(false);
      }
    };

    fetchBooth();
  }, [boothId]);

  return { booth, loading };
}
