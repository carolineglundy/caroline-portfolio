import { ref, watch, computed, onMounted, onUnmounted, nextTick } from 'vue'

export interface NavSection {
  id: string
  label: string
}

const NAV_SECTIONS: NavSection[] = [
  { id: 'work-experience', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
  { id: 'book-recommendations', label: 'Book Recommendations' },
]

const DROPDOWN_OFFSET_PX = 4

/**
 * Composable for navbar dropdown state, positioning, and section navigation.
 * Owns all menu logic so the Navbar SFC remains a humble view.
 */
export function useNavbar() {
  const dropdownOpen = ref(false)
  const dropdownPosition = ref({ top: 0, right: 0 })
  const triggerRef = ref<HTMLElement | null>(null)

  const dropdownStyle = computed(() => ({
    top: `${dropdownPosition.value.top}px`,
    right: `${dropdownPosition.value.right}px`,
  }))

  const triggerButtonClass = computed(() => ({
    '[&>div]:bg-orange-500': dropdownOpen.value,
  }))

  watch(dropdownOpen, async (open) => {
    if (open) {
      await nextTick()
      if (triggerRef.value) {
        const rect = triggerRef.value.getBoundingClientRect()
        dropdownPosition.value = {
          top: rect.bottom + DROPDOWN_OFFSET_PX,
          right: window.innerWidth - rect.right,
        }
      }
      document.body.classList.add('nav-menu-open')
    } else {
      document.body.classList.remove('nav-menu-open')
    }
  })

  function toggleDropdown() {
    dropdownOpen.value = !dropdownOpen.value
  }

  function closeDropdown() {
    dropdownOpen.value = false
  }

  function goToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    closeDropdown()
  }

  function handleClickOutside(e: MouseEvent) {
    const target = e.target as Element
    if (!target.closest('.nav-dropdown-container')) {
      closeDropdown()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    document.body.classList.remove('nav-menu-open')
  })

  return {
    navSections: NAV_SECTIONS,
    dropdownOpen,
    dropdownPosition,
    dropdownStyle,
    triggerRef,
    triggerButtonClass,
    toggleDropdown,
    goToSection,
  }
}
