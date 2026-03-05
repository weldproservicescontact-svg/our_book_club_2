import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { SavedBook } from '../lib/supabase';

interface QueueItemProps {
  book: SavedBook;
  onRemove: (id: string) => void;
}

export default function QueueItem({ book, onRemove }: QueueItemProps) {
  const [removing, setRemoving] = useState(false);

  async function handleRemove() {
    setRemoving(true);
    onRemove(book.id);

    await supabase.from('saved_books').delete().eq('id', book.id);
  }

  return (
    <div
      style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: '8px',
      }}
      className="p-5 flex items-start justify-between gap-4"
    >
      <div className="flex-1 min-w-0">
        <h3
          style={{ fontFamily: 'Playfair Display, serif', color: '#e5e5e5' }}
          className="text-base font-semibold leading-tight"
        >
          {book.title}
        </h3>
        <p
          style={{ color: '#888', fontFamily: 'DM Sans, sans-serif' }}
          className="text-sm mt-1 mb-2"
        >
          {book.author}
        </p>
        <p
          style={{ color: '#aaa', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.5' }}
          className="text-sm"
        >
          {book.why}
        </p>
      </div>

      <button
        onClick={handleRemove}
        disabled={removing}
        style={{
          color: '#e05c5c',
          background: 'none',
          border: 'none',
          cursor: removing ? 'default' : 'pointer',
          opacity: removing ? 0.5 : 1,
          flexShrink: 0,
          padding: '4px',
          transition: 'opacity 0.2s ease',
        }}
        title="Remove"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
