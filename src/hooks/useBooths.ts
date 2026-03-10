import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

const BOOTHS_CACHE_KEY = 'knu_booths_cache';
const BOOTHS_CACHE_TIME_KEY = 'knu_booths_cache_time';
const CACHE_EXPIRE_TIME = 1000 * 60 * 60;

export function useBoothsWithFallback() {
  const location = useLocation();

  const [booths, setBooths] = useState<BoothSummary[]>(() => {
    const stateBooths = location.state?.booths;
    if (stateBooths) {
      localStorage.setItem(BOOTHS_CACHE_KEY, JSON.stringify(stateBooths));
      localStorage.setItem(BOOTHS_CACHE_TIME_KEY, Date.now().toString());
      return stateBooths;
    }

    const cached = localStorage.getItem(BOOTHS_CACHE_KEY);
    const cachedTime = localStorage.getItem(BOOTHS_CACHE_TIME_KEY);
    if (cached && cachedTime && Date.now() - Number(cachedTime) < CACHE_EXPIRE_TIME) {
      return JSON.parse(cached);
    }

    return [];
  });

  const [loading, setLoading] = useState(booths.length === 0);

  useEffect(() => {
    if (booths.length === 0) {
      const fetchBooths = async () => {
        try {
          setLoading(true);
          const data = await getBooths();
          setBooths(data);
          localStorage.setItem(BOOTHS_CACHE_KEY, JSON.stringify(data));
          localStorage.setItem(BOOTHS_CACHE_TIME_KEY, Date.now().toString());
        } finally {
          setLoading(false);
        }
      };
      fetchBooths();
    }
  }, [booths.length]);

  return { booths, loading };
}
