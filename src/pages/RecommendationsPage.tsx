import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import BookCard from '../components/BookCard';
import type { Book } from '../lib/getRecommendations';

interface LocationState {
  books: Book[];
}

export default function RecommendationsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  useEffect(() => {
    if (!state?.books) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  if (!state?.books) return null;

  return (
    <div
      style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}
    >
      <header
        style={{ borderBottom: '1px solid #2a2a2a' }}
        className="flex items-center justify-between px-6 py-4"
      >
        <div className="flex items-center gap-2">
          <img src="/image.png" alt="Folio logo" style={{ width: 28, height: 28, objectFit: 'contain' }} />
          <span
            style={{ fontFamily: 'Playfair Display, serif', color: '#e8c547', fontWeight: 700, letterSpacing: '0.04em' }}
            className="text-lg"
          >
            Folio
          </span>
        </div>

        <button
          onClick={() => navigate('/')}
          style={{
            color: '#888',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            transition: 'color 0.2s ease',
          }}
          className="flex items-center gap-1 hover:text-white"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </header>

      <main className="px-6 py-12 max-w-5xl mx-auto">
        <div className="mb-10">
          <h2
            style={{ fontFamily: 'Playfair Display, serif', color: '#e5e5e5', lineHeight: 1.2 }}
            className="text-3xl font-bold mb-2"
          >
            Here's what we found for you
          </h2>
          <p style={{ color: '#888' }} className="text-sm">
            5 picks curated to your taste
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      </main>
    </div>
  );
}
