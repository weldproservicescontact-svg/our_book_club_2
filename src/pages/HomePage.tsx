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
    } catch (err) {
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
      style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}
      className="flex flex-col"
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
          to="/queue"
          style={{
            color: '#e8c547',
            border: '1px solid #e8c547',
            borderRadius: '6px',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'background-color 0.2s ease',
          }}
          className="flex items-center gap-2 py-2 px-4 text-sm hover:bg-yellow-400 hover:text-black"
        >
          <BookMarked size={14} />
          My Queue
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl">
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src="/image.png" alt="Folio logo" style={{ width: 56, height: 56, objectFit: 'contain' }} />
              <h1
                style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#e8c547',
                  lineHeight: 1.1,
                  letterSpacing: '0.05em',
                }}
                className="text-5xl font-bold"
              >
                Folio
              </h1>
            </div>
            <p style={{ color: '#888' }} className="text-lg">
              Describe the vibe. We'll do the digging.
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
                backgroundColor: '#1a1a1a',
                border: error
                  ? '1px solid #e05c5c'
                  : focused
                  ? '1px solid #e8c547'
                  : '1px solid #2a2a2a',
                borderRadius: '8px',
                color: '#e5e5e5',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '15px',
                lineHeight: '1.6',
                resize: 'none',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              className="w-full p-4 placeholder-gray-600"
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
                backgroundColor: loading ? '#b99d30' : '#e8c547',
                color: '#0f0f0f',
                borderRadius: '8px',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
                fontSize: '15px',
                cursor: loading ? 'default' : 'pointer',
                border: 'none',
                transition: 'background-color 0.2s ease, transform 0.1s ease',
              }}
              className="w-full py-3 px-6 flex items-center justify-center gap-2 hover:brightness-110 active:scale-95"
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      border: '2px solid #0f0f0f',
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

            <p style={{ color: '#555' }} className="text-xs text-center">
              Tip: Press Cmd+Enter to submit
            </p>
          </div>

          <div className="mt-8">
            <p style={{ color: '#555', fontFamily: 'DM Sans, sans-serif' }} className="text-xs uppercase tracking-widest mb-3">
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
                    border: '1px solid #2a2a2a',
                    borderRadius: '20px',
                    color: '#888',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    cursor: loading ? 'default' : 'pointer',
                    transition: 'border-color 0.15s ease, color 0.15s ease',
                  }}
                  className="py-1.5 px-3 hover:border-yellow-400 hover:text-yellow-400"
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
