import { useState, useCallback } from 'react';
import { likeBooth } from '@/apis/modules/boothApi';

export function useLikeBooth(boothId: number) {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(async () => {
    if (isPending) return;
    setIsPending(true);

    try {
      const updatedLikeCount = await likeBooth(boothId);
      return updatedLikeCount;
    } catch (err) {
      console.error('좋아요 실패:', err);
      throw err;
    } finally {
      setIsPending(false);
    }
  }, [boothId, isPending]);

  return { mutate, isPending };
}
