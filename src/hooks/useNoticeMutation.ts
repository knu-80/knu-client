import { useState } from 'react';
import {
  createNotice,
  type NoticeCreateInput,
  type NoticeMutationResponse,
} from '@/apis/modules/noticeApi';

export function useNoticeMutation() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateCreate = async (
    payload: NoticeCreateInput,
    images: File[] = [],
    options?: {
      onSuccess?: (data: NoticeMutationResponse) => void;
      onError?: (error: Error) => void;
    },
  ) => {
    try {
      setIsPending(true);
      setError(null);

      const response = await createNotice(payload, images);

      if (options?.onSuccess) {
        options.onSuccess(response);
      }
      return response;
    } catch (err) {
      const errorObject =
        err instanceof Error ? err : new Error('공지 등록 중 오류가 발생했습니다.');
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
