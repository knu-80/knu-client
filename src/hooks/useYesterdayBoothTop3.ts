import { useQuery } from '@tanstack/react-query';
import { getYesterdayBoothTop3 } from '@/apis';

export function useYesterdayBoothTop3() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['booths', 'ranking', 'top3', 'yesterday'],
    queryFn: getYesterdayBoothTop3,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    data: data ?? [],
    isLoading,
    isError,
  };
}
