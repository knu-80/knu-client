import { useState } from 'react';
import {
  createEvent,
  deleteEvent,
  updateEvent,
  type EventCreateInput,
  type EventUpdateInput,
  type EventItem,
} from '@/apis/modules/eventApi';

export function useEventMutation() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateCreate = async (
    payload: EventCreateInput,
    image?: File | null,
    options?: {
      onSuccess?: (data: EventItem) => void;
      onError?: (error: Error) => void;
    },
  ) => {
    try {
      setIsPending(true);
      setError(null);
      const response = await createEvent(payload, image);
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

  const mutateUpdate = async (
    eventId: number,
    payload: EventUpdateInput,
    options?: {
      onSuccess?: (data: EventItem) => void;
      onError?: (error: Error) => void;
    },
  ) => {
    try {
      setIsPending(true);
      setError(null);
      const response = await updateEvent(eventId, payload);
      if (options?.onSuccess) {
        options.onSuccess(response);
      }
      return response;
    } catch (err) {
      const errorObject =
        err instanceof Error ? err : new Error('이벤트 수정 중 오류가 발생했습니다.');
      setError(errorObject);
      if (options?.onError) {
        options.onError(errorObject);
      }
    } finally {
      setIsPending(false);
    }
  };

  const mutateDelete = async (
    eventId: number,
    options?: {
      onSuccess?: () => void;
      onError?: (error: Error) => void;
    },
  ) => {
    try {
      setIsPending(true);
      setError(null);
      await deleteEvent(eventId);
      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (err) {
      const errorObject =
        err instanceof Error ? err : new Error('이벤트 삭제 중 오류가 발생했습니다.');
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
    mutateUpdate,
    mutateDelete,
    isPending,
    error,
  };
}
