<script setup lang="ts">
import { computed } from 'vue'
import BasicCard from '../Common/BasicCard.vue'
import msuLogo from '../../../images/msuLogo.jpg'
import techElevatorLogo from '../../../images/techElevatorLogo.jpg'
import masseyLogo from '../../../images/masseyLogo.jpg'
import { useEducation } from '../../composables/useEducation'
import type { EducationEntry } from '../../composables/useEducation'

interface EducationContainerProps {
  sectionTitle?: string
}

withDefaults(defineProps<EducationContainerProps>(), {
  sectionTitle: 'Education',
})

defineEmits<{
  (e: 'card-click', entry: EducationEntry): void
}>()

const { educationEntries } = useEducation()

const logoMap: Record<string, string> = {
  msuLogo,
  techElevatorLogo,
  masseyLogo,
}

const cardsWithLogos = computed(() =>
  educationEntries.map((entry) => ({
    ...entry,
    logo: logoMap[entry.logoKey] ?? '',
  }))
)
</script>

<template>
  <section
    class="mt-12 mb-24 max-w-6xl mx-auto min-w-0 w-full px-4 sm:px-6"
    aria-labelledby="education-heading"
  >
    <h2
      id="education-heading"
      class="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter text-center mb-16 italic underline decoration-orange-500 decoration-8 break-words min-w-0"
    >
      {{ sectionTitle }}
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
      <BasicCard
        v-for="(exp, index) in cardsWithLogos"
        :key="exp.title + index"
        :year="exp.year"
        :logo="exp.logo"
        :title="exp.title"
        :company="exp.company"
        :website="exp.website"
        :details="exp.details"
      />
    </div>
  </section>
</template>
