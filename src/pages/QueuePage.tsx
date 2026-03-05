import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { SavedBook } from '../lib/supabase';
import QueueItem from '../components/QueueItem';

export default function QueuePage() {
  const [books, setBooks] = useState<SavedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBooks() {
      const { data } = await supabase
        .from('saved_books')
        .select('*')
        .order('created_at', { ascending: false });

      setBooks(data ?? []);
      setLoading(false);
    }

    fetchBooks();
  }, []);

  function handleRemove(id: string) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

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

        <Link
          to="/"
          style={{
            color: '#888',
            textDecoration: 'none',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            transition: 'color 0.2s ease',
          }}
          className="hover:text-white"
        >
          Home
        </Link>
      </header>

      <main className="px-6 py-12 max-w-2xl mx-auto">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2
              style={{ fontFamily: 'Playfair Display, serif', color: '#e5e5e5', lineHeight: 1.2 }}
              className="text-3xl font-bold mb-2"
            >
              My Queue
            </h2>
            {!loading && books.length > 0 && (
              <p style={{ color: '#888' }} className="text-sm">
                {books.length} book{books.length !== 1 ? 's' : ''} saved
              </p>
            )}
          </div>

          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: '#e8c547',
              color: '#0f0f0f',
              borderRadius: '6px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            className="flex items-center gap-2 py-2 px-4 hover:brightness-110"
          >
            <Search size={14} />
            Find More Books
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <span
              style={{
                width: 28,
                height: 28,
                border: '2px solid #2a2a2a',
                borderTopColor: '#e8c547',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 0.6s linear infinite',
              }}
            />
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20">
            <p style={{ color: '#555', fontFamily: 'Playfair Display, serif' }} className="text-xl mb-4">
              Your queue is empty.
            </p>
            <Link
              to="/"
              style={{
                color: '#e8c547',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                textDecoration: 'none',
              }}
              className="hover:underline"
            >
              Discover books to add →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {books.map((book) => (
              <QueueItem key={book.id} book={book} onRemove={handleRemove} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
