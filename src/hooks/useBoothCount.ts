import { useEffect, useState } from 'react';
import { getBoothCount } from '@/apis';

export function useBoothCount() {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchBoothCount = async () => {
      try {
        const value = await getBoothCount();
        if (!isMounted) return;
        setCount(value);
      } catch {
        if (!isMounted) return;
        setCount(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void fetchBoothCount();

    return () => {
      isMounted = false;
    };
  }, []);

  return { count, isLoading };
}
