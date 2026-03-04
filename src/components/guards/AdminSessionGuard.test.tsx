import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AdminSessionGuard from '@/components/guards/AdminSessionGuard';
import { useAdminSessionStore } from '@/stores/adminSessionStore';

function LocationProbe() {
  const location = useLocation();
  return (
    <div data-testid="location">
      {location.pathname}
      {location.search}
    </div>
  );
}

function renderGuard(initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <LocationProbe />
      <Routes>
        <Route path="/admin/login" element={<div data-testid="login-page">Login Page</div>} />
        <Route element={<AdminSessionGuard />}>
          <Route path="/admin/notice" element={<div data-testid="protected-page">Protected</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/admin/notice" replace />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('AdminSessionGuard integration', () => {
  beforeEach(() => {
    useAdminSessionStore.setState({
      status: 'idle',
      profile: null,
      isInitialized: false,
      bootstrapSession: vi.fn().mockResolvedValue(undefined),
      setUnauthenticated: vi.fn(),
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('비인증 상태면 로그인 페이지로 리다이렉트하고 redirect 쿼리를 유지한다', async () => {
    useAdminSessionStore.setState({
      status: 'unauthenticated',
      isInitialized: true,
    });

    renderGuard('/admin/notice');

    await waitFor(() => {
      expect(screen.getByTestId('login-page')).toBeTruthy();
      expect(screen.getByTestId('location').textContent).toBe(
        '/admin/login?redirect=%2Fadmin%2Fnotice',
      );
    });
  });

  it('인증 상태면 보호된 라우트를 렌더링한다', async () => {
    useAdminSessionStore.setState({
      status: 'authenticated',
      isInitialized: true,
      profile: {
        memberId: 1,
        loginId: '1',
        nickname: 'admin',
        role: 'ADMIN',
        boothId: 10,
      },
    });

    renderGuard('/admin/notice');

    await waitFor(() => {
      expect(screen.getByTestId('protected-page')).toBeTruthy();
      expect(screen.queryByTestId('login-page')).toBeNull();
    });
  });

  it('초기 상태(idle)에서는 세션 부트스트랩을 시도하고 로딩 문구를 보여준다', async () => {
    const bootstrapSession = vi.fn().mockResolvedValue(undefined);
    useAdminSessionStore.setState({
      status: 'idle',
      isInitialized: false,
      bootstrapSession,
    });

    renderGuard('/admin/notice');

    expect(screen.getByText('관리자 세션을 확인하고 있습니다...')).toBeTruthy();

    await waitFor(() => {
      expect(bootstrapSession).toHaveBeenCalledTimes(1);
    });
  });
});
