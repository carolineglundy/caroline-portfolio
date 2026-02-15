<script setup lang="ts">
import profileImg from '../../../images/closeProfilePhoto.jpg'
import { useFooter } from '../../composables/useFooter'

interface FooterProps {
  contactHref?: string
}

const props = withDefaults(defineProps<FooterProps>(), {
  contactHref: 'https://mail.google.com/mail/?view=cm&fs=1&to=carolinegracelundy@gmail.com',
})

defineEmits<{
  (e: 'navigate', sectionId: string): void
}>()

const { navSections, goToSection } = useFooter()

const handleSectionClick = (id: string) => {
  goToSection(id)
}
</script>

<template>
  <footer class="mt-20 mb-10 max-w-4xl mx-auto" role="contentinfo">
    <div class="border-[4px] border-black bg-white grid md:grid-cols-2 gap-0 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      <div class="p-6 border-b-[4px] md:border-b-0 md:border-r-[4px] border-black bg-white">
        <figure class="border-[3px] border-black bg-[#D9C5A3] aspect-video relative overflow-hidden mb-4">
          <div
            class="absolute inset-0 z-10 opacity-30 pointer-events-none"
            style="background-image: radial-gradient(circle, #000 1px, transparent 1px); background-size: 4px 4px;"
            aria-hidden="true"
          />
          <img
            :src="profileImg"
            alt="Caroline"
            class="w-full h-full object-cover grayscale contrast-125"
          />
        </figure>
      </div>

      <div class="bg-black text-white p-8 flex flex-col justify-between">
        <a
          :href="props.contactHref"
          target="_blank"
          rel="noopener noreferrer"
          class="block w-full text-center border-2 border-orange-500 text-orange-500 py-3 font-black uppercase text-sm tracking-widest hover:bg-orange-500 hover:text-black transition-all mb-8 shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]"
        >
          Contact Me
        </a>

        <nav aria-label="Page sections">
          <ul class="space-y-3">
            <li v-for="section in navSections" :key="section.id">
              <a
                :href="`#${section.id}`"
                class="text-gray-400 font-bold uppercase text-[12px] tracking-widest hover:text-orange-500 transition-colors flex items-center gap-2 group"
                @click.prevent="handleSectionClick(section.id)"
              >
                <span class="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500">★</span>
                {{ section.label }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  display: inline-block;
  animation: marquee 10s linear infinite;
}
</style>
