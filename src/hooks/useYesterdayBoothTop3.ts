import { useQuery } from '@tanstack/react-query';
import { getBoothDailyRanking } from '@/apis';

function getDateKey(dayOffset = 0): string {
  const now = new Date();
  const date = new Date(now);
  date.setDate(date.getDate() + dayOffset);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function useYesterdayBoothTop3() {
  const yesterdayDate = getDateKey(-1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['booths', 'ranking', 'daily', yesterdayDate],
    queryFn: async () => {
      const ranking = await getBoothDailyRanking(yesterdayDate);
      return ranking.slice(0, 3);
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  return {
    data: data ?? [],
    date: yesterdayDate,
    isLoading,
    isError,
  };
}
