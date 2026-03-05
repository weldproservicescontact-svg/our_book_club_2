/*
  # Create saved_books table

  1. New Tables
    - `saved_books`
      - `id` (uuid, primary key, auto-generated)
      - `created_at` (timestamptz, default now())
      - `title` (text, not null)
      - `author` (text, not null)
      - `description` (text, not null)
      - `why` (text, not null)

  2. Security
    - Enable RLS on `saved_books` table
    - Add policy allowing all operations for the anon role (anonymous access only, no auth)
*/

CREATE TABLE IF NOT EXISTS saved_books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  author text NOT NULL,
  description text NOT NULL,
  why text NOT NULL
);

ALTER TABLE saved_books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations for anon"
  ON saved_books
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow insert for anon"
  ON saved_books
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow delete for anon"
  ON saved_books
  FOR DELETE
  TO anon
  USING (true);
