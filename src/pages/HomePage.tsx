import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookMarked } from 'lucide-react';
import { getRecommendations } from '../lib/getRecommendations';

const SUGGESTIONS = [
  'A slow-burn mystery set in a small town',
  'Epic fantasy with complex magic systems',
  'Thought-provoking sci-fi about AI and humanity',
  'Literary fiction about grief and healing',
  'Historical novels set in ancient Rome',
  'Dark psychological thrillers',
  'Feel-good stories about found family',
  'Non-fiction about human psychology',
  'Adventure books for a beach vacation',
  'Short story collections to read in one sitting',
];

export default function HomePage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  function handleSuggestion(text: string) {
    setInput(text);
    if (error) setError('');
  }

  async function handleSubmit() {
    const trimmed = input.trim();
    if (!trimmed) {
      setError('Please describe what you feel like reading.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const books = await getRecommendations(trimmed);
      navigate('/recommendations', { state: { books } });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  }

  return (
    <div
      style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}
      className="flex flex-col"
    >
      <header
        style={{ borderBottom: '1px solid #1e1a0e' }}
        className="flex items-center justify-between px-6 py-3"
      >
        <div className="flex items-center gap-3">
          <img src="/golden_pages.jpg" alt="Golden Pages" style={{ width: 38, height: 38, objectFit: 'cover', borderRadius: '6px' }} />
          <span
            style={{
              fontFamily: 'Pinyon Script, cursive',
              background: 'linear-gradient(135deg, #c9a227 0%, #f0d060 50%, #c9a227 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 400,
              letterSpacing: '0.02em',
              fontSize: '26px',
              lineHeight: 1,
            }}
          >
            Golden Pages
          </span>
        </div>

        <Link
          to="/queue"
          style={{
            color: '#c9a227',
            border: '1px solid #c9a227',
            borderRadius: '6px',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            fontSize: '14px',
          }}
          className="flex items-center gap-2 py-2 px-4 hover:bg-yellow-600 hover:text-black hover:border-yellow-600"
        >
          <BookMarked size={14} />
          My Queue
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/Screenshot_2026-03-06_103113.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.35,
          }}
        />

        <div className="w-full max-w-xl relative z-10">
          <div className="mb-12 text-center">
            <h1
              style={{
                fontFamily: 'Pinyon Script, cursive',
                background: 'linear-gradient(135deg, #c9a227 0%, #f0d060 45%, #e8c547 70%, #c9a227 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.1,
                letterSpacing: '0.02em',
                fontWeight: 400,
              }}
              className="text-7xl mb-3"
            >
              Golden Pages
            </h1>
            <p style={{ color: '#6b6045' }} className="text-base">
              Describe the vibe. We'll find your next great read.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError('');
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={handleKeyDown}
              placeholder="What do you feel like reading?"
              disabled={loading}
              rows={4}
              style={{
                backgroundColor: '#111008',
                border: error
                  ? '1px solid #e05c5c'
                  : focused
                  ? '1px solid rgba(201,162,39,0.7)'
                  : '1px solid #231f0f',
                borderRadius: '10px',
                color: '#e8dfc0',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '15px',
                lineHeight: '1.6',
                resize: 'none',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxShadow: focused ? '0 0 0 3px rgba(201,162,39,0.08)' : 'none',
              }}
              className="w-full p-4 placeholder-stone-700"
            />

            {error && (
              <p style={{ color: '#e05c5c' }} className="text-sm">
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: loading
                  ? 'linear-gradient(135deg, #7a6215, #a88a20)'
                  : 'linear-gradient(135deg, #c9a227 0%, #f0d060 50%, #c9a227 100%)',
                color: '#0a0800',
                borderRadius: '10px',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 600,
                fontSize: '15px',
                cursor: loading ? 'default' : 'pointer',
                border: 'none',
                transition: 'opacity 0.2s ease, transform 0.1s ease',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(201,162,39,0.3)',
                letterSpacing: '0.02em',
              }}
              className="w-full py-3 px-6 flex items-center justify-center gap-2 hover:brightness-110 active:scale-95"
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      border: '2px solid #0a0800',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin 0.6s linear infinite',
                    }}
                  />
                  Finding books...
                </>
              ) : (
                'Get Recommendations'
              )}
            </button>

            <p style={{ color: '#3d3520' }} className="text-xs text-center">
              Tip: Press Cmd+Enter to submit
            </p>
          </div>

          <div className="mt-10">
            <p
              style={{ color: '#4a3f20', fontFamily: 'DM Sans, sans-serif' }}
              className="text-xs uppercase tracking-widest mb-3"
            >
              Not sure? Try one of these
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  disabled={loading}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #231f0f',
                    borderRadius: '20px',
                    color: '#6b6045',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    cursor: loading ? 'default' : 'pointer',
                    transition: 'border-color 0.15s ease, color 0.15s ease',
                  }}
                  className="py-1.5 px-3 hover:border-yellow-600 hover:text-yellow-500"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
