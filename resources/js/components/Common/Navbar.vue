<script setup lang="ts">
import profileImg from '../../../images/closeProfilePhoto.jpg'
import { useNavbar } from '../../composables/useNavbar'

interface NavbarProps {
  name?: string
  title?: string
  emailHref?: string
  linkedInHref?: string
  githubHref?: string
}

withDefaults(defineProps<NavbarProps>(), {
  name: 'Caroline Lundy',
  title: 'Full-Stack Developer',
  emailHref: 'https://mail.google.com/mail/?view=cm&fs=1&to=carolinegracelundy@gmail.com',
  linkedInHref: 'https://www.linkedin.com/in/carolinelundy/',
  githubHref: 'https://github.com/carolineglundy',
})

defineEmits<{
  (e: 'navigate', sectionId: string): void
}>()

const {
  navSections,
  dropdownOpen,
  dropdownStyle,
  triggerRef,
  triggerButtonClass,
  toggleDropdown,
  goToSection,
} = useNavbar()

const handleSectionClick = (id: string) => {
  goToSection(id)
}
</script>

<template>
  <nav class="mb-12 min-w-0 overflow-x-hidden" aria-label="Main navigation">
    <div class="border-[4px] border-black bg-white flex items-center justify-between p-4 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div class="flex items-center gap-16 ml-4 min-w-0 flex-1">
        <div class="w-40 h-40 rounded-full border-[3px] border-black bg-orange-400 overflow-hidden flex-shrink-0">
          <img :src="profileImg" alt="Avatar" class="w-full h-full object-cover" />
        </div>

        <div class="hidden min-[800px]:flex min-[800px]:flex-col">
          <h1 class="text-2xl font-black uppercase tracking-tighter leading-none">{{ name }}</h1>
          <span class="text-sm font-bold text-gray-600 uppercase">{{ title }}</span>
        </div>
      </div>

      <div ref="triggerRef" class="nav-dropdown-container relative">
        <button
          type="button"
          class="flex flex-col gap-1.5 p-2 cursor-pointer hover:[&>div]:bg-orange-500 transition-colors"
          :class="triggerButtonClass"
          :aria-expanded="dropdownOpen"
          aria-haspopup="true"
          aria-label="Open section menu"
          @click.stop="toggleDropdown"
        >
          <div class="w-8 h-1 bg-black transition-colors" aria-hidden="true" />
          <div class="w-8 h-1 bg-black transition-colors" aria-hidden="true" />
          <div class="w-8 h-1 bg-black transition-colors" aria-hidden="true" />
        </button>

        <div
          v-show="dropdownOpen"
          class="fixed z-[100] min-w-[200px] max-h-[min(70vh,400px)] overflow-y-auto border-[4px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          :style="dropdownStyle"
          role="menu"
          aria-label="Page sections"
        >
          <a
            v-for="section in navSections"
            :key="section.id"
            :href="`#${section.id}`"
            role="menuitem"
            class="block px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-orange-400 hover:text-black transition-colors border-b border-black last:border-b-0"
            @click.prevent="handleSectionClick(section.id)"
          >
            {{ section.label }}
          </a>
        </div>
      </div>

      <div class="absolute top-0 left-0 w-4 h-4 bg-black" aria-hidden="true" />
      <div class="absolute top-0 right-0 w-4 h-4 bg-black" aria-hidden="true" />
    </div>

    <div class="bg-black text-white flex justify-between items-center px-6 py-2 border-x-[4px] border-b-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div class="flex items-center gap-2" aria-hidden="true" />

      <div class="flex gap-4">
        <a
          :href="emailHref"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-orange-400 transition-colors"
        >
          <span class="text-[10px] font-black uppercase tracking-widest">EMAIL</span>
        </a>
        <a
          :href="linkedInHref"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-orange-400 transition-colors"
        >
          <span class="text-[10px] font-black uppercase tracking-widest">LinkedIn</span>
        </a>
        <a
          :href="githubHref"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-orange-400 transition-colors"
        >
          <span class="text-[10px] font-black uppercase tracking-widest">GitHub</span>
        </a>
      </div>
    </div>
  </nav>
</template>
