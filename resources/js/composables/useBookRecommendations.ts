import { ref, computed } from 'vue';
import type { BookRecommendation } from '../services/bookService';
import {
  fetchRecommendationsFromFavorite,
  buildUnityBooksSearchUrl,
} from '../services/bookService';

const DEFAULT_ERROR_MESSAGE =
  'Could not get recommendations. Try again.';

export function useBookRecommendations() {
  const favoriteBook = ref('');
  const loading = ref(false);
  const error = ref('');
  const recommendations = ref<BookRecommendation[]>([]);

  const hasRecommendations = computed(
    () => recommendations.value.length > 0
  );
  const isEmpty = computed(
    () => !loading.value && recommendations.value.length === 0 && !error.value
  );
  const sectionHeading = 'We think you might like';
  const isSubmitDisabled = computed(
    () => loading.value || !favoriteBook.value.trim()
  );
  const errorAlertClass = computed(() =>
    hasRecommendations.value ? 'text-amber-700' : 'text-red-600'
  );

  async function submit() {
    const input = favoriteBook.value.trim();
    if (!input) return;

    loading.value = true;
    error.value = '';
    recommendations.value = [];

    try {
      const data = await fetchRecommendationsFromFavorite(input);
      recommendations.value = data.recommendations ?? [];
      error.value = data.error
        ? (recommendations.value.length > 0 ? data.error : DEFAULT_ERROR_MESSAGE)
        : '';
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: RecommendationsErrorShape } };
      const responseData = axiosErr.response?.data;
      error.value = DEFAULT_ERROR_MESSAGE;
      recommendations.value = responseData?.recommendations ?? [];
    } finally {
      loading.value = false;
    }
  }

  function getUnityBooksSearchUrl(title: string): string {
    return buildUnityBooksSearchUrl(title);
  }

  return {
    favoriteBook,
    loading,
    error,
    recommendations,
    hasRecommendations,
    isEmpty,
    sectionHeading,
    isSubmitDisabled,
    errorAlertClass,
    submit,
    getUnityBooksSearchUrl,
  };
}

interface RecommendationsErrorShape {
  error?: string;
  recommendations?: BookRecommendation[];
}
