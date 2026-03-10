import { useState, useEffect, useCallback } from 'react';
import { getNotice, type NoticeDetail } from '@/apis/modules/noticeApi';

export function useNoticeDetail(noticeId: number | null) {
  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotice = useCallback(async () => {
    if (noticeId === null || isNaN(noticeId)) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await getNotice(noticeId);
      setNotice(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('공지사항 상세 정보를 불러오는 중 오류가 발생했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [noticeId]);

  useEffect(() => {
    fetchNotice();
  }, [fetchNotice]);

  return {
    notice,
    isLoading,
    error,
    refetch: fetchNotice,
  };
}
