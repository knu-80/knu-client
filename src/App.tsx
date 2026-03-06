import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import MainLayout from '@/components/layouts/MainLayout';
import DetailLayout from '@/components/layouts/DetailLayout';
import MapLayout from '@/components/layouts/MapLayout';
import HomePage from '@/pages/HomePage';
import BoothDetailPage from '@/pages/BoothDetailPage';
import MapPage from '@/pages/MapPage';
import NoticePage from '@/pages/NoticePage';
import NoticeDetailPage from '@/pages/NoticeDetailPage';
import AdminNoticeDetailPage from '@/pages/admin/AdminNoticeDetailPage';
import AdminNoticeCreatePage from '@/pages/admin/AdminNoticeCreatePage';
import AdminNoticeEditPage from '@/pages/admin/AdminNoticeEditPage';
import AdminBoothEditPage from '@/pages/admin/AdminBoothEditPage';
import LoginPage from '@/pages/admin/LoginPage';
import AdminHomePage from '@/pages/admin/AdminHomePage';
import AdminNoticePage from '@/pages/admin/AdminNoticePage';
import AdminEventPage from '@/pages/admin/AdminEventPage';
import AdminPubPage from '@/pages/admin/AdminPubPage';
import AdminLayout from '@/components/layouts/AdminLayout';
import AdminSessionGuard from '@/components/guards/AdminSessionGuard';
import EventPage from '@/pages/EventPage';
import TimeTablePage from '@/pages/TimeTablePage';
import { setUnauthorizedHandler } from '@/apis';
import { useAdminSessionStore } from '@/stores/adminSessionStore';
import SearchPage from './pages/SearchPage';
import SearchResultPage from '@/pages/SearchResultPage';
import SplashScreen from '@/components/home/SplashScreen';

const SPLASH_DURATION_MS = 1500;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const bootstrapSession = useAdminSessionStore((state) => state.bootstrapSession);
  const setUnauthenticated = useAdminSessionStore((state) => state.setUnauthenticated);

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

      const isAdminPath = location.pathname.startsWith('/admin');
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
          <Route path="search" element={<SearchPage />} />
          <Route path="search/result" element={<SearchResultPage />} />
        </Route>
        <Route element={<MapLayout />}>
          <Route path="/map" element={<MapPage />} />
        </Route>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route element={<AdminSessionGuard />}></Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="notice" element={<AdminNoticePage />} />
          <Route path="event" element={<AdminEventPage />} />
          <Route path="pub" element={<AdminPubPage />} />
        </Route>
        <Route element={<AdminLayout title="공지사항 상세" fallbackPath="/admin/notice" />}>
          <Route path="/admin/notice/:id" element={<AdminNoticeDetailPage />} />
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
        <Route element={<DetailLayout title="부스 상세" fallbackPath="/map" />}>
          <Route path="/booths/:id" element={<BoothDetailPage />} />
        </Route>
        <Route element={<DetailLayout title="공지사항" fallbackPath="/notice" />}>
          <Route path="/notice/:id" element={<NoticeDetailPage />} />
        </Route>
        <Route element={<DetailLayout title="타임테이블" fallbackPath="/" />}>
          <Route path="/timetable" element={<TimeTablePage />} />
        </Route>
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
