import { useCallback, useEffect, useState } from 'react';
import { likeBooth } from '@/apis/modules/boothApi';

const CLIENT_LIKE_COOLDOWN_MS = 700;

export function useLikeBooth(boothId: number) {
  const [isPending, setIsPending] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);

  const isCoolingDown = cooldownUntil > Date.now();

  useEffect(() => {
    if (cooldownUntil <= Date.now()) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCooldownUntil(0);
    }, cooldownUntil - Date.now());

    return () => {
      window.clearTimeout(timeout);
    };
  }, [cooldownUntil]);

  const mutate = useCallback(async () => {
    if (isPending) return undefined;

    if (cooldownUntil > Date.now()) {
      return undefined;
    }

    setCooldownUntil(Date.now() + CLIENT_LIKE_COOLDOWN_MS);
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
  }, [boothId, cooldownUntil, isPending]);

  return { mutate, isPending, isCoolingDown };
}
