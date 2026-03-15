import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { usePostHog } from '@posthog/react';

import MainLayout from '@/components/layouts/MainLayout';
import AdminLayout from '@/components/layouts/AdminLayout';
import DetailLayout from '@/components/layouts/DetailLayout';
import SearchLayout from '@/components/layouts/SearchLayout';
import MapLayout from '@/components/layouts/MapLayout';
import HomePage from '@/pages/HomePage';
import NoticePage from '@/pages/NoticePage';
import EventPage from '@/pages/EventPage';
import SearchPage from '@/pages/SearchPage';
import SearchResultPage from '@/pages/SearchResultPage';
import MapPage from '@/pages/MapPage';
import NoticeDetailPage from '@/pages/NoticeDetailPage';
import BoothDetailPage from '@/pages/BoothDetailPage';
import AdminHomePage from '@/pages/admin/AdminHomePage';
import AdminNoticePage from '@/pages/admin/AdminNoticePage';
import AdminEventPage from '@/pages/admin/AdminEventPage';
import AdminPubPage from '@/pages/admin/AdminPubPage';
import AdminNoticeCreatePage from '@/pages/admin/AdminNoticeCreatePage';
import AdminNoticeEditPage from '@/pages/admin/AdminNoticeEditPage';
import AdminBoothEditPage from '@/pages/admin/AdminBoothEditPage';
import LoginPage from '@/pages/admin/LoginPage';
import AdminSessionGuard from '@/components/guards/AdminSessionGuard';
import { setUnauthorizedHandler } from '@/apis';
import { useAdminSessionStore } from '@/stores/adminSessionStore';
import SplashScreen from '@/components/home/SplashScreen';
import RankingPage from '@/pages/RankingPage';
import RankingLayout from './components/layouts/RankingLayout';

const SPLASH_DURATION_MS = 1500;
const isAdminRoutePath = (pathname: string) =>
  pathname === '/admin' || pathname.startsWith('/admin/');

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const posthog = usePostHog();
  const bootstrapSession = useAdminSessionStore((state) => state.bootstrapSession);
  const setUnauthenticated = useAdminSessionStore((state) => state.setUnauthenticated);

  useEffect(() => {
    if (posthog) {
      posthog.capture('$pageview');
    }
  }, [location, posthog]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, SPLASH_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    void bootstrapSession();
  }, [bootstrapSession]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUnauthenticated();

      const isAdminPath = isAdminRoutePath(location.pathname);
      const isLoginPath = location.pathname === '/admin/login';
      if (!isAdminPath || isLoginPath) {
        return;
      }

      const redirect = `${location.pathname}${location.search}${location.hash}`;
      navigate(`/admin/login?redirect=${encodeURIComponent(redirect)}`, { replace: true });
    });

    return () => {
      setUnauthorizedHandler(null);
    };
  }, [location.hash, location.pathname, location.search, navigate, setUnauthenticated]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="event" element={<EventPage />} />
        </Route>
        <Route element={<RankingLayout />}>
          <Route path="/ranking" element={<RankingPage />} />
        </Route>
        <Route element={<MapLayout />}>
          <Route path="/map" element={<MapPage />} />
        </Route>
        <Route element={<SearchLayout />}>
          <Route path="/search" element={<SearchPage />} />
          <Route path="search/result" element={<SearchResultPage />} />
        </Route>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route element={<AdminSessionGuard />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path="pub" element={<AdminPubPage />} />
          </Route>
          <Route element={<AdminLayout title="공지사항 관리" fallbackPath="/admin" />}>
            <Route path="/admin/notice" element={<AdminNoticePage />} />
          </Route>
          <Route element={<AdminLayout title="이벤트 관리" fallbackPath="/admin" />}>
            <Route path="/admin/event" element={<AdminEventPage />} />
          </Route>
          <Route element={<AdminLayout title="공지 작성" fallbackPath="/admin/notice" />}>
            <Route path="/admin/notice/write" element={<AdminNoticeCreatePage />} />
          </Route>
          <Route element={<AdminLayout title="공지 수정" fallbackPath="/admin/notice" />}>
            <Route path="/admin/notice/edit/:id" element={<AdminNoticeEditPage />} />
          </Route>
          <Route element={<AdminLayout title="부스 수정" fallbackPath="/admin" />}>
            <Route path="/admin/booths/edit/:id" element={<AdminBoothEditPage />} />
          </Route>
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Route>
        <Route element={<DetailLayout title="부스 상세" fallbackPath="/map" />}>
          <Route path="/booths/:id" element={<BoothDetailPage />} />
        </Route>
        <Route element={<DetailLayout title="공지사항" fallbackPath="/notice" />}>
          <Route path="/notice/:id" element={<NoticeDetailPage />} />
        </Route>
      </Routes>
      <Analytics />
    </>
  );
}
