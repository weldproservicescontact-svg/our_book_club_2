import { useState } from 'react';
import { BookmarkPlus, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Book } from '../lib/getRecommendations';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    setSaving(true);
    setError('');

    const { error: supabaseError } = await supabase.from('saved_books').insert({
      title: book.title,
      author: book.author,
      description: book.description,
      why: book.why,
    });

    setSaving(false);

    if (supabaseError) {
      setError('Failed to save. Try again.');
    } else {
      setSaved(true);
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
      }}
      className="p-6 flex flex-col gap-3"
    >
      <div>
        <h3
          style={{ fontFamily: 'Playfair Display, serif', color: '#e5e5e5' }}
          className="text-lg font-semibold leading-tight"
        >
          {book.title}
        </h3>
        <p style={{ color: '#888', fontFamily: 'DM Sans, sans-serif' }} className="text-sm mt-1">
          {book.author}
        </p>
      </div>

      <p
        style={{ color: '#c5c5c5', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.6' }}
        className="text-sm"
      >
        {book.description}
      </p>

      <div
        style={{
          borderLeft: '2px solid #e8c547',
          paddingLeft: '12px',
        }}
      >
        <p
          style={{ color: '#888', fontFamily: 'DM Sans, sans-serif' }}
          className="text-xs font-medium uppercase tracking-wider mb-1"
        >
          Why you'll like it
        </p>
        <p
          style={{ color: '#c5c5c5', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.6' }}
          className="text-sm"
        >
          {book.why}
        </p>
      </div>

      {error && (
        <p style={{ color: '#e05c5c', fontFamily: 'DM Sans, sans-serif' }} className="text-xs">
          {error}
        </p>
      )}

      <button
        onClick={handleSave}
        disabled={saved || saving}
        style={{
          backgroundColor: saved ? 'transparent' : '#e8c547',
          color: saved ? '#e8c547' : '#0f0f0f',
          border: saved ? '1px solid #e8c547' : 'none',
          borderRadius: '6px',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 500,
          cursor: saved || saving ? 'default' : 'pointer',
          opacity: saving ? 0.7 : 1,
          transition: 'all 0.2s ease',
        }}
        className="mt-auto flex items-center justify-center gap-2 py-2 px-4 text-sm"
      >
        {saved ? (
          <>
            <Check size={14} />
            Saved
          </>
        ) : saving ? (
          <>
            <span
              style={{
                width: 14,
                height: 14,
                border: '2px solid #0f0f0f',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 0.6s linear infinite',
              }}
            />
            Saving...
          </>
        ) : (
          <>
            <BookmarkPlus size={14} />
            Save to Queue
          </>
        )}
      </button>
    </div>
  );
}
