import { useQuery } from '@tanstack/react-query';
import { getBoothTop3 } from '@/apis';

export function useBoothTop3() {
  const { data, isLoading, status } = useQuery({
    queryKey: ['booths', 'ranking', 'top3'],
    queryFn: getBoothTop3,
    staleTime: 0,
    gcTime: 1000 * 60 * 2,
  });

  return {
    data: data ?? [],
    isLoading,
    status,
  };
}
