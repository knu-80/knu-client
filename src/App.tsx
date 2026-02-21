import { Route, Routes } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';
import MapLayout from '@/components/layouts/MapLayout';
import HomePage from './pages/HomePage';
import BoothDetailPage from './pages/BoothDetailPage';
<<<<<<< design/#14
import MapPage from '@/pages/MapPage';
=======
import NoticePage from './pages/NoticePage';
>>>>>>> dev

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="booths/:id" element={<BoothDetailPage />} />
        <Route path="notice" element={<NoticePage />} />
      </Route>
      <Route element={<MapLayout />}>
        <Route path="/map" element={<MapPage />} />
      </Route>
    </Routes>
  );
}

export default App;
