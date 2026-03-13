import { useState, useEffect, useCallback } from 'react';
import { getBooth, type BoothSummary } from '@/apis';

export function useBooth(boothId: number) {
  const [booth, setBooth] = useState<BoothSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBooth = useCallback(async () => {
    if (!boothId) return;

    try {
      setLoading(true);
      const data = await getBooth(boothId);
      setBooth(data);
    } catch (error) {
      console.error('부스 상세 정보를 불러오는데 실패했습니다:', error);
      setBooth(null);
    } finally {
      setLoading(false);
    }
  }, [boothId]);

  useEffect(() => {
    fetchBooth();
  }, [fetchBooth]);

  // ✅ fetchBooth를 refetch라는 이름으로 반환
  return { booth, loading, refetch: fetchBooth };
}
