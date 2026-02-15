<script setup lang="ts">
import { useProfileBio } from '../../composables/useProfileBio'

interface ProfileBioProps {
  /** Optional content overrides (e.g. for i18n or A/B copy). */
  contentOverrides?: Partial<import('../../composables/useProfileBio').ProfileBioContent>
}

const props = defineProps<ProfileBioProps>()

defineEmits<{
  (e: 'link-click', target: string): void
}>()

const { content } = useProfileBio(props.contentOverrides)
</script>

<template>
  <section
    class="border-[4px] border-black bg-white p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-full"
    aria-labelledby="profile-bio-heading"
  >
    <div>
      <h2
        id="profile-bio-heading"
        class="text-3xl font-black uppercase tracking-tighter leading-tight mb-6"
      >
        {{ content.headline }}
        A <span class="text-orange-500">{{ content.taglineHighlight }}</span>
        {{ content.taglineSuffix }}
      </h2>

      <p class="font-bold text-gray-800 leading-relaxed mb-6 text-sm md:text-base">
        <template v-for="(seg, i) in content.introSegments" :key="i">
          <span
            v-if="seg.type === 'highlight'"
            class="bg-orange-100 px-1 border-b-2 border-orange-400"
          >{{ seg.value }}</span>
          <template v-else>{{ seg.value }}</template>
        </template>
      </p>

      <p class="font-bold text-gray-800 leading-relaxed">
        Explore my
        <a
          :href="`#${content.workSectionId}`"
          class="text-orange-600 underline decoration-2 underline-offset-4 hover:bg-black hover:text-white transition-all"
          @click="$emit('link-click', content.workSectionId)"
        >
          {{ content.workSectionLabel }}
        </a>
        and check out my book recommendations
        <a
          :href="`#${content.bookSectionId}`"
          class="text-orange-600 underline decoration-2 underline-offset-4 hover:bg-black hover:text-white transition-all"
          @click="$emit('link-click', content.bookSectionId)"
        >
          {{ content.bookSectionLabel }}
        </a>
        where I showcase a project that uses
        <span class="italic">{{ content.bookSectionDescription }}</span>
        to find your next must-read book.
      </p>
    </div>

    <div class="mt-8 pt-6 border-t-[3px] border-black flex flex-wrap gap-4 items-center justify-between bg-orange-500 p-4 -mx-8 -mb-8">
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-black uppercase tracking-tight">📍 {{ content.location }}</span>
      </div>
      <a
        :href="content.emailHref"
        target="_blank"
        rel="noopener noreferrer"
        class="text-[10px] font-black uppercase underline hover:text-white transition-colors"
      >
        {{ content.email }}
      </a>
    </div>
  </section>
</template>
