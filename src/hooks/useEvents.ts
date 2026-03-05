import { useState, useEffect, useCallback } from 'react';
import { getEventsByType, type EventItem } from '@/apis/modules/eventApi';
import type { EventType } from '@/apis/endpoints';

export function useEvents(eventType: EventType) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getEventsByType(eventType);
      setEvents(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('이벤트 목록을 불러오는 중 오류가 발생했습니다.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [eventType]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    isLoading,
    error,
    refetch: fetchEvents,
  };
}
