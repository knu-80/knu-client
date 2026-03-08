import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import MainLayout from '@/components/layouts/MainLayout';
import AdminLayout from '@/components/layouts/AdminLayout';
import DetailLayout from '@/components/layouts/DetailLayout';
import MapLayout from '@/components/layouts/MapLayout';
import HomePage from '@/pages/HomePage';
import NoticePage from '@/pages/NoticePage';
import EventPage from '@/pages/EventPage';
import SearchPage from '@/pages/SearchPage';
import SearchResultPage from '@/pages/SearchResultPage';
import MapPage from '@/pages/MapPage';
import NoticeDetailPage from '@/pages/NoticeDetailPage';
import TimeTablePage from '@/pages/TimeTablePage';
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

export default function App() {
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
