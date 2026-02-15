<script setup lang="ts">
import { computed } from 'vue'
import { useBasicCard } from '../../composables/useBasicCard'

interface BasicCardProps {
  id?: number | string
  title: string
  subtitle?: string
  /** Alias for subtitle; used by EducationContainer. */
  company?: string
  details?: string[]
  year?: string
  logo?: string
  website?: string
}

const props = withDefaults(defineProps<BasicCardProps>(), {
  details: () => [],
})

defineEmits<{
  (e: 'flip', flipped: boolean): void
}>()

const { isFlipped, flipContainerClass, flipCard, flipBack } = useBasicCard()

const displaySubtitle = computed(
  () => props.subtitle ?? props.company ?? ''
)

const hasLogo = computed(() => Boolean(props.logo))
const hasWebsite = computed(() => Boolean(props.website))

const rootClass = computed(() => 'relative perspective-1000 w-full min-h-[280px] h-full')
</script>

<template>
  <article
    :class="rootClass"
    :aria-label="`Card: ${title}`"
  >
    <div
      class="relative w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer"
      :class="flipContainerClass"
      role="button"
      tabindex="0"
      :aria-pressed="isFlipped"
      @click="flipCard"
      @keydown.enter="flipCard"
      @keydown.space.prevent="flipCard"
    >
      <!-- Front of Card -->
      <div
        class="absolute inset-0 z-20 backface-hidden bg-white border-[4px] border-black p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-center flex flex-col justify-center"
        aria-hidden="false"
      >
        <div class="absolute -top-4 left-1/2 -translate-x-1/2">
          <span
            v-if="year"
            class="text-xs font-black bg-[#E6E6D4] px-3 py-1 border-2 border-black uppercase tracking-tighter"
          >
            {{ year }}
          </span>
        </div>

        <div
          v-if="hasLogo"
          class="w-16 h-16 bg-white border-2 border-black mx-auto mb-4 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <img :src="logo" alt="" class="w-10 h-10 object-contain" />
        </div>

        <h3 class="font-black uppercase text-lg leading-tight">{{ title }}</h3>
        <p
          v-if="displaySubtitle"
          class="text-xs font-bold text-gray-500 uppercase mt-2 tracking-widest"
        >
          {{ displaySubtitle }}
        </p>

        <p class="mt-6 text-[10px] font-black uppercase tracking-widest group-hover:text-orange-600 transition-colors">
          Click for More Info
        </p>
      </div>

      <!-- Back of Card -->
      <div
        class="absolute inset-0 z-10 backface-hidden bg-black text-white p-6 border-[4px] border-black shadow-[10px_10px_0px_0px_rgba(249,115,22,1)] rotate-y-180 flex flex-col justify-start"
        aria-hidden="false"
        @click.stop
      >
        <div class="flex items-center justify-between mb-3 border-b border-orange-500 pb-2 flex-shrink-0">
          <p class="font-black text-xs uppercase text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,1)] leading-tight">
            {{ displaySubtitle }}
          </p>

          <div class="flex gap-2">
            <a
              v-if="hasWebsite"
              :href="website"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-orange-500 text-black p-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              aria-label="Open website"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            </a>
          </div>
        </div>

        <div class="overflow-y-auto flex-grow pr-2 [scrollbar-width:thin] [scrollbar-color:#f97316_#000]">
          <ul v-if="details.length" class="text-left space-y-4 pb-4">
            <li
              v-for="(point, i) in details"
              :key="i"
              class="text-[11px] font-bold leading-tight flex items-start gap-2"
            >
              <span class="text-orange-500">★</span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>

        <button
          type="button"
          class="mt-4 w-full bg-zinc-800 text-[10px] font-black py-2 border-2 border-orange-500/50 uppercase tracking-widest hover:bg-zinc-700 transition-colors"
          @click="flipBack"
        >
          CLICK TO FLIP
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.perspective-1000 { perspective: 1000px; }
.transform-style-3d { transform-style: preserve-3d; }
.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.rotate-y-180 { transform: rotateY(180deg); }
</style>
