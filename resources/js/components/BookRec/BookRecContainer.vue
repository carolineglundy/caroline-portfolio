<script setup lang="ts">
import { useBookRecommendations } from '../../composables/useBookRecommendations';

interface BookRecContainerProps {
  title?: string;
}

interface BookRecContainerEmits {
  (e: 'recommendations-loaded', count: number): void;
}

const props = withDefaults(defineProps<BookRecContainerProps>(), {
  title: 'Book Recommendations',
});

defineEmits<BookRecContainerEmits>();

const {
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
} = useBookRecommendations();
</script>

<template>
  <section class="mt-20" aria-labelledby="book-rec-heading">
    <h2
      id="book-rec-heading"
      class="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-center mb-16 italic underline decoration-orange-500 decoration-8 break-words min-w-0"
    >
      {{ title }}
    </h2>

    <div
      class="max-w-2xl mx-auto mb-20 border-[4px] border-black bg-white p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
      role="region"
      aria-label="Request recommendations"
    >
      <form @submit.prevent="submit" class="flex flex-col gap-4">
        <label for="favorite-book-input" class="font-black text-sm uppercase text-gray-700">
          What's your favorite book you've read recently?
        </label>
        <input
          id="favorite-book-input"
          v-model="favoriteBook"
          type="text"
          placeholder="e.g. Project Hail Mary by Andy Weir"
          class="border-2 border-black p-3 font-black uppercase outline-none focus:bg-orange-50"
          :disabled="loading"
          :aria-busy="loading"
          aria-describedby="favorite-book-hint"
        />
        <span id="favorite-book-hint" class="sr-only">
          Enter a book title to get personalised recommendations.
        </span>
        <button
          type="submit"
          :disabled="isSubmitDisabled"
          class="cursor-pointer bg-black text-white py-4 font-black uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black"
        >
          {{ loading ? 'Finding recommendations…' : 'Get recommendations' }}
        </button>
      </form>

      <p
        v-if="error"
        id="recommendations-error"
        role="alert"
        class="mt-4 font-semibold"
        :class="errorAlertClass"
      >
        {{ error }}
      </p>
    </div>

    <template v-if="loading">
      <p class="sr-only" aria-live="polite">Loading recommendations.</p>
    </template>

    <template v-else-if="isEmpty">
      <p class="sr-only" aria-live="polite">Enter a favorite book to see recommendations.</p>
    </template>

    <div
      v-else-if="hasRecommendations"
      class="max-w-2xl mx-auto px-4"
      role="region"
      aria-label="Recommended books"
    >
      <h3 class="text-2xl font-black uppercase mb-6">
        {{ sectionHeading }}
      </h3>
      <ul class="space-y-4" aria-label="Recommended books list">
        <li
          v-for="(book, index) in recommendations"
          :key="`${book.title}-${index}`"
          class="border-[4px] border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          <span class="font-black uppercase text-lg">{{ book.title }}</span>
          <span class="block text-gray-600 font-semibold mt-1">{{ book.author }}</span>
          <a
            :href="getUnityBooksSearchUrl(book.title)"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block mt-2 text-sm font-bold uppercase text-orange-600 hover:text-orange-500 hover:underline"
          >
            Find at Unity Books NZ →
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
