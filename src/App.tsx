import { Route, Routes } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';
import HomePage from './pages/HomePage';
import BoothDetailPage from './pages/BoothDetailPage';
import MapPage from '@/pages/MapPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="booths/:id" element={<BoothDetailPage />} />
        <Route path="map" element={<MapPage />} />
      </Route>
    </Routes>
  );
}

export default App;
