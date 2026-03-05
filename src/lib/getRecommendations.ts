export interface Book {
  title: string;
  author: string;
  description: string;
  why: string;
}

export async function getRecommendations(userInput: string): Promise<Book[]> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const response = await fetch(`${supabaseUrl}/functions/v1/get-recommendations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? 'Failed to fetch recommendations');
  }

  if (!data.books || !Array.isArray(data.books)) {
    throw new Error('Invalid response from recommendation service');
  }

  return data.books as Book[];
}
