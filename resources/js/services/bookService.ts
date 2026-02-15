import axios from 'axios';

export interface BookRecommendation {
  title: string;
  author: string;
}

export interface RecommendationsApiResponse {
  recommendations?: BookRecommendation[];
  error?: string;
}

const RECOMMENDATIONS_ENDPOINT = '/api/books/recommendations-from-favorite';

export async function fetchRecommendationsFromFavorite(
  favoriteBook: string
): Promise<RecommendationsApiResponse> {
  const { data } = await axios.post<RecommendationsApiResponse>(
    RECOMMENDATIONS_ENDPOINT,
    { favorite_book: favoriteBook.trim() }
  );
  return data;
}

export function buildUnityBooksSearchUrl(title: string): string {
  const query = title ? encodeURIComponent(title) : '';
  return `https://www.unitybooks.co.nz/search?shopify_products%5Bquery%5D=${query}`;
}
