import { useState } from 'react';
import {
  updateBooth,
  updateBoothImages,
  type BoothUpdateInput,
  type BoothSummary,
} from '@/apis/modules/boothApi';

export function useBoothMutation() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateUpdateImages = async (
    boothId: number,
    images: File[],
    options?: {
      onSuccess?: () => void;
      onError?: (error: Error) => void;
    },
  ) => {
    try {
      setIsPending(true);
      setError(null);
      await updateBoothImages(boothId, images);
      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (err) {
      const errorObject =
        err instanceof Error ? err : new Error('이미지 수정 중 오류가 발생했습니다.');
      setError(errorObject);
      if (options?.onError) {
        options.onError(errorObject);
      }
    } finally {
      setIsPending(false);
    }
  };

  const mutateUpdate = async (
    boothId: number,
    payload: BoothUpdateInput & { memberId: number },
    options?: {
      onSuccess?: (data: BoothSummary) => void;
      onError?: (error: Error) => void;
    },
  ) => {
    try {
      setIsPending(true);
      setError(null);
      const response = await updateBooth(boothId, payload);
      if (options?.onSuccess) {
        options.onSuccess(response);
      }
      return response;
    } catch (err) {
      const errorObject =
        err instanceof Error ? err : new Error('부스 수정 중 오류가 발생했습니다.');
      setError(errorObject);
      if (options?.onError) {
        options.onError(errorObject);
      }
    } finally {
      setIsPending(false);
    }
  };

  return {
    mutateUpdate,
    mutateUpdateImages,
    isPending,
    error,
  };
}
