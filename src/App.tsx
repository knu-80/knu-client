import { Route, Routes } from 'react-router-dom';

import MainLayout from '@/components/layouts/MainLayout';
import MapLayout from '@/components/layouts/MapLayout';
import HomePage from '@/pages/HomePage';
import BoothDetailPage from '@/pages/BoothDetailPage';
import MapPage from '@/pages/MapPage';
import NoticePage from '@/pages/NoticePage';
import NoticeDetailPage from '@/pages/NoticeDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="booths/:id" element={<BoothDetailPage />} />
        <Route path="notice" element={<NoticePage />} />
        <Route path="notice/:id" element={<NoticeDetailPage />} />
      </Route>
      <Route element={<MapLayout />}>
        <Route path="/map" element={<MapPage />} />
      </Route>
    </Routes>
  );
}

export default App;
