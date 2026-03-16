import { useQuery } from '@tanstack/react-query';
import { getBooths, type BoothListParams } from '@/apis';

export function useBooths(params?: BoothListParams) {
  const keyword = params?.keyword;

  return useQuery({
    queryKey: keyword ? ['booths', 'search', keyword] : ['booths', 'all'],
    queryFn: () => getBooths(params),

    staleTime: 1000 * 60 * 5,
  });
}
