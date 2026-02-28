import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from '@/components/layouts/MainLayout';
import DetailLayout from '@/components/layouts/DetailLayout';
import MapLayout from '@/components/layouts/MapLayout';
import HomePage from '@/pages/HomePage';
import BoothDetailPage from '@/pages/BoothDetailPage';
import MapPage from '@/pages/MapPage';
import NoticePage from '@/pages/NoticePage';
import NoticeDetailPage from '@/pages/NoticeDetailPage';
import AdminNoticeDetailPage from '@/pages/admin/AdminNoticeDetailPage';
import LoginPage from '@/pages/admin/LoginPage';
import AdminHomePage from '@/pages/admin/AdminHomePage';
import AdminNoticePage from '@/pages/admin/AdminNoticePage';
import AdminMainLayout from '@/components/layouts/AdminMainLayout';
import AdminDetailLayout from '@/components/layouts/AdminDetailLayout';
import EventPage from '@/pages/EventPage';
import TimeTablePage from '@/pages/TimeTablePage';
import SplashScreen from '@/components/home/SplashScreen';

const SPLASH_DURATION_MS = 1500;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, SPLASH_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="notice" element={<NoticePage />} />
        <Route path="event" element={<EventPage />} />
      </Route>
      <Route element={<MapLayout />}>
        <Route path="/map" element={<MapPage />} />
      </Route>
      <Route path="/admin" element={<AdminMainLayout />}>
        <Route index element={<AdminHomePage />} />
        <Route path="notice" element={<AdminNoticePage />} />
      </Route>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route element={<AdminDetailLayout title="공지사항 상세" fallbackPath="/admin/notice" />}>
        <Route path="/admin/notice/:id" element={<AdminNoticeDetailPage />} />
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
  );
}

export default App;
