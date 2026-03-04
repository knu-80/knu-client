import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminSessionStore } from '@/stores/adminSessionStore';
import { clearAccessToken, getAccessToken } from '@/apis/auth';
import { getAdminProfile } from '@/apis/modules/adminAuthApi';

vi.mock('@/apis/auth', () => ({
  getAccessToken: vi.fn(),
  clearAccessToken: vi.fn(),
}));

vi.mock('@/apis/modules/adminAuthApi', () => ({
  getAdminProfile: vi.fn(),
}));

const mockedGetAccessToken = vi.mocked(getAccessToken);
const mockedClearAccessToken = vi.mocked(clearAccessToken);
const mockedGetAdminProfile = vi.mocked(getAdminProfile);

function resetStoreState(): void {
  useAdminSessionStore.setState({
    status: 'idle',
    profile: null,
    isInitialized: false,
  });
}

describe('adminSessionStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetStoreState();
  });

  it('토큰이 없으면 me API를 호출하지 않고 unauthenticated 상태로 전환한다', async () => {
    mockedGetAccessToken.mockReturnValue(null);

    await useAdminSessionStore.getState().bootstrapSession();

    const state = useAdminSessionStore.getState();
    expect(mockedGetAdminProfile).not.toHaveBeenCalled();
    expect(state.status).toBe('unauthenticated');
    expect(state.isInitialized).toBe(true);
    expect(state.profile).toBeNull();
  });

  it('토큰이 있고 me API가 성공하면 authenticated 상태로 전환한다', async () => {
    mockedGetAccessToken.mockReturnValue('access-token');
    mockedGetAdminProfile.mockResolvedValue({
      memberId: 12,
      loginId: '45',
      nickname: '45 booth admin',
      role: 'ADMIN',
      boothId: 99,
    });

    await useAdminSessionStore.getState().bootstrapSession();

    const state = useAdminSessionStore.getState();
    expect(mockedGetAdminProfile).toHaveBeenCalledTimes(1);
    expect(state.status).toBe('authenticated');
    expect(state.isInitialized).toBe(true);
    expect(state.profile).toEqual({
      memberId: 12,
      loginId: '45',
      nickname: '45 booth admin',
      role: 'ADMIN',
      boothId: 99,
    });
  });

  it('토큰이 있지만 me API가 실패하면 토큰 삭제 후 unauthenticated 상태가 된다', async () => {
    mockedGetAccessToken.mockReturnValue('access-token');
    mockedGetAdminProfile.mockRejectedValue(new Error('Unauthorized'));

    await useAdminSessionStore.getState().bootstrapSession();

    const state = useAdminSessionStore.getState();
    expect(mockedClearAccessToken).toHaveBeenCalledTimes(1);
    expect(state.status).toBe('unauthenticated');
    expect(state.isInitialized).toBe(true);
    expect(state.profile).toBeNull();
  });

  it('bootstrapSession이 동시에 호출되어도 me API는 1회만 호출된다', async () => {
    mockedGetAccessToken.mockReturnValue('access-token');
    const profile = {
      memberId: 1,
      loginId: '1',
      nickname: 'admin',
      role: 'ADMIN',
      boothId: 1,
    };

    let resolveProfile: ((value: typeof profile) => void) | null = null;
    mockedGetAdminProfile.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveProfile = resolve;
        }),
    );

    const task1 = useAdminSessionStore.getState().bootstrapSession();
    const task2 = useAdminSessionStore.getState().bootstrapSession();

    expect(mockedGetAdminProfile).toHaveBeenCalledTimes(1);

    if (!resolveProfile) {
      throw new Error('resolveProfile is not initialized');
    }
    resolveProfile(profile);

    await Promise.all([task1, task2]);

    const state = useAdminSessionStore.getState();
    expect(state.status).toBe('authenticated');
    expect(state.profile).toEqual(profile);
  });
});
