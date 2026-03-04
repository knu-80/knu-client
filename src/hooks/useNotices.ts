import { useState, useEffect, useCallback } from 'react';
import { getNotices, type NoticeListItem } from '@/apis/modules/noticeApi';

export function useNotices() {
  const [notices, setNotices] = useState<NoticeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotices = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getNotices();
      setNotices(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('공지사항 목록을 불러오는 중 오류가 발생했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  return {
    notices,
    isLoading,
    error,
    refetch: fetchNotices,
  };
}
