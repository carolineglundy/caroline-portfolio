
export interface NavSection {
  id: string
  label: string
}

const NAV_SECTIONS: NavSection[] = [
  { id: 'work-experience', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
  { id: 'book-recommendations', label: 'Book Recommendations' },
]

export function useFooter() {
  const navSections = NAV_SECTIONS

  function goToSection(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return {
    navSections,
    goToSection,
  }
}
