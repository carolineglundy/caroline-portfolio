import { ref, computed } from 'vue';

export function useBasicCard() {
  const isFlipped = ref(false);

  const flipContainerClass = computed(() => ({
    'rotate-y-180': isFlipped.value,
  }));

  function flipCard() {
    isFlipped.value = !isFlipped.value;
  }

  function flipBack() {
    isFlipped.value = false;
  }

  return {
    isFlipped,
    flipContainerClass,
    flipCard,
    flipBack,
  };
}
