import { create } from 'zustand';
import { clearAccessToken, getAccessToken } from '@/apis/auth';
import { getAdminProfile, type AdminProfile } from '@/apis/modules/adminAuthApi';

export type AdminSessionStatus = 'idle' | 'checking' | 'authenticated' | 'unauthenticated';

interface AdminSessionState {
  status: AdminSessionStatus;
  profile: AdminProfile | null;
  isInitialized: boolean;
  bootstrapSession: () => Promise<void>;
  setUnauthenticated: () => void;
}

let bootstrapPromise: Promise<void> | null = null;

export const useAdminSessionStore = create<AdminSessionState>((set) => ({
  status: 'idle',
  profile: null,
  isInitialized: false,
  bootstrapSession: async () => {
    if (bootstrapPromise) {
      return bootstrapPromise;
    }

    bootstrapPromise = (async () => {
      const token = getAccessToken();

      if (!token) {
        set({
          status: 'unauthenticated',
          profile: null,
          isInitialized: true,
        });
        return;
      }

      set({ status: 'checking' });

      try {
        const profile = await getAdminProfile();
        set({
          status: 'authenticated',
          profile,
          isInitialized: true,
        });
      } catch {
        clearAccessToken();
        set({
          status: 'unauthenticated',
          profile: null,
          isInitialized: true,
        });
      }
    })();

    try {
      await bootstrapPromise;
    } finally {
      bootstrapPromise = null;
    }
  },
  setUnauthenticated: () => {
    set({
      status: 'unauthenticated',
      profile: null,
      isInitialized: true,
    });
  },
}));
