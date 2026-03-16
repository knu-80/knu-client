import { useEffect, useMemo, useState } from 'react';
import { getBoothRanking, type BoothRanking } from '@/apis';

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const RANKING_LATEST_KEY = 'ranking:latest';
const RANKING_ROTATED_ON_KEY = 'ranking:last-rotated-date';
const RANKING_DAILY_PREFIX = 'ranking:snapshot:';

interface RankingSnapshot {
  date: string;
  capturedAt: string;
  booths: BoothRanking[];
}

interface RankingPartition {
  topThree: BoothRanking[];
  rest: BoothRanking[];
}

function getKstDateKey(dayOffset = 0, now = new Date()): string {
  const kstTime = now.getTime() + KST_OFFSET_MS + dayOffset * DAY_MS;
  const kstDate = new Date(kstTime);

  const year = kstDate.getUTCFullYear();
  const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(kstDate.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getDailySnapshotKey(dateKey: string): string {
  return `${RANKING_DAILY_PREFIX}${dateKey}`;
}

function readSnapshot(storageKey: string): RankingSnapshot | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawValue = window.localStorage.getItem(storageKey);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as RankingSnapshot;
    if (!parsed || typeof parsed.date !== 'string' || !Array.isArray(parsed.booths)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function readDailySnapshot(dateKey: string): RankingSnapshot | null {
  return readSnapshot(getDailySnapshotKey(dateKey));
}

function readLatestSnapshot(): RankingSnapshot | null {
  return readSnapshot(RANKING_LATEST_KEY);
}

function persistLatestSnapshot(booths: BoothRanking[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  const snapshot: RankingSnapshot = {
    date: getKstDateKey(),
    capturedAt: new Date().toISOString(),
    booths,
  };

  window.localStorage.setItem(RANKING_LATEST_KEY, JSON.stringify(snapshot));
}

function rotateYesterdaySnapshotIfNeeded(): void {
  if (typeof window === 'undefined') {
    return;
  }

  const today = getKstDateKey();
  const yesterday = getKstDateKey(-1);
  const lastRotatedDate = window.localStorage.getItem(RANKING_ROTATED_ON_KEY);

  if (lastRotatedDate === today) {
    return;
  }

  const latest = readLatestSnapshot();
  if (latest && latest.date === yesterday) {
    window.localStorage.setItem(getDailySnapshotKey(yesterday), JSON.stringify(latest));
  }

  window.localStorage.setItem(RANKING_ROTATED_ON_KEY, today);
}

function partitionRanking(booths: BoothRanking[]): RankingPartition {
  const topThree = [booths[1], booths[0], booths[2]].filter((item): item is BoothRanking =>
    Boolean(item),
  );
  const rest = booths.slice(3);

  return { topThree, rest };
}

export function useRanking() {
  const [booths, setBooths] = useState<BoothRanking[]>([]);
  const [yesterdayBooths, setYesterdayBooths] = useState<BoothRanking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [yesterdayDateKey] = useState(() => getKstDateKey(-1));

  const fetchRanking = async () => {
    try {
      setIsLoading(true);
      const data = await getBoothRanking();
      setBooths(data);
      persistLatestSnapshot(data);
    } catch (error) {
      console.error('랭킹 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    rotateYesterdaySnapshotIfNeeded();

    void Promise.resolve().then(() => {
      if (!isMounted) {
        return;
      }

      const snapshot = readDailySnapshot(yesterdayDateKey);
      setYesterdayBooths(snapshot?.booths ?? []);
    });

    return () => {
      isMounted = false;
    };
  }, [yesterdayDateKey]);

  useEffect(() => {
    void fetchRanking();
  }, []);

  const today = useMemo(() => {
    return partitionRanking(booths);
  }, [booths]);

  const yesterday = useMemo(() => {
    return partitionRanking(yesterdayBooths);
  }, [yesterdayBooths]);

  return {
    today,
    yesterday,
    yesterdayDateKey,
    hasYesterdaySnapshot: yesterdayBooths.length > 0,
    isLoading,
    refetch: fetchRanking,
  };
}
