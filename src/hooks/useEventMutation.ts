import { useState } from 'react';
import { createEvent, type EventCreateInput, type EventItem } from '@/apis/modules/eventApi';

export function useEventMutation() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateCreate = async (
    payload: EventCreateInput,
    options?: {
      onSuccess?: (data: EventItem) => void;
      onError?: (error: Error) => void;
    },
  ) => {
    try {
      setIsPending(true);
      setError(null);
      const response = await createEvent(payload);
      if (options?.onSuccess) {
        options.onSuccess(response);
      }
      return response;
    } catch (err) {
      const errorObject =
        err instanceof Error ? err : new Error('이벤트 등록 중 오류가 발생했습니다.');
      setError(errorObject);
      if (options?.onError) {
        options.onError(errorObject);
      }
    } finally {
      setIsPending(false);
    }
  };

  return {
    mutateCreate,
    isPending,
    error,
  };
}
