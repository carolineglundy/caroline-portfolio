/**
 * Composable for profile bio content and config.
 * Owns copy and links so ProfileBio.vue stays a humble view.
 */

export interface IntroSegment {
  type: 'text' | 'highlight'
  value: string
}

export interface ProfileBioContent {
  headline: string
  taglineHighlight: string
  taglineSuffix: string
  introSegments: IntroSegment[]
  ctaParagraph: string
  workSectionLabel: string
  bookSectionLabel: string
  bookSectionDescription: string
  location: string
  email: string
  emailHref: string
  workSectionId: string
  bookSectionId: string
}

const DEFAULT_INTRO_SEGMENTS: IntroSegment[] = [
  { type: 'text', value: 'From architecting ' },
  { type: 'highlight', value: '$1M+' },
  { type: 'text', value: ' payment systems to boosting checkout conversions by ' },
  { type: 'highlight', value: '15%' },
  { type: 'text', value: ', I engineer creative, high-impact solutions with a focus on user-experience design.' },
]

const DEFAULT_CONTENT: ProfileBioContent = {
  headline: "I'M CAROLINE LUNDY:",
  taglineHighlight: 'FULL-STACK ENGINEER',
  taglineSuffix: 'WHO COMBINES LOGIC AND CREATIVITY.',
  introSegments: DEFAULT_INTRO_SEGMENTS,
  ctaParagraph:
    'Explore my work experience and check out my book recommendations section where I showcase a project that uses AI integration to find your next must-read book.',
  workSectionLabel: 'work experience',
  bookSectionLabel: 'section',
  bookSectionDescription: 'AI integration',
  location: 'Wellington, NZ (Relocating)',
  email: 'carolinegracelundy@gmail.com',
  emailHref: 'https://mail.google.com/mail/?view=cm&fs=1&to=carolinegracelundy@gmail.com',
  workSectionId: 'work-experience',
  bookSectionId: 'book-recommendations',
}

export function useProfileBio(overrides?: Partial<ProfileBioContent>) {
  const content: ProfileBioContent = overrides
    ? { ...DEFAULT_CONTENT, ...overrides }
    : DEFAULT_CONTENT

  return {
    content,
  }
}
