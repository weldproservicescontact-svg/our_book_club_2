import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecommendationsPage from './pages/RecommendationsPage';
import QueuePage from './pages/QueuePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/queue" element={<QueuePage />} />
      </Routes>
    </BrowserRouter>
  );
}
