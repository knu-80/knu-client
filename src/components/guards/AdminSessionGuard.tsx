import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminSessionStore } from '@/stores/adminSessionStore';

function buildRedirectPath(pathname: string, search: string, hash: string): string {
  return `${pathname}${search}${hash}`;
}

export default function AdminSessionGuard() {
  const location = useLocation();
  const status = useAdminSessionStore((state) => state.status);
  const isInitialized = useAdminSessionStore((state) => state.isInitialized);
  const bootstrapSession = useAdminSessionStore((state) => state.bootstrapSession);

  useEffect(() => {
    if (!isInitialized || status === 'idle') {
      void bootstrapSession();
    }
  }, [bootstrapSession, isInitialized, status]);

  if (!isInitialized || status === 'idle' || status === 'checking') {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-gray-50 px-4 text-center text-gray-500">
        관리자 세션을 확인하고 있습니다...
      </div>
    );
  }

  if (status !== 'authenticated') {
    const redirect = buildRedirectPath(location.pathname, location.search, location.hash);
    return <Navigate to={`/admin/login?redirect=${encodeURIComponent(redirect)}`} replace />;
  }

  return <Outlet />;
}
