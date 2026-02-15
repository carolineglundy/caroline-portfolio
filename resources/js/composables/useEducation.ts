

export interface EducationEntry {
  year: string
  title: string
  company: string
  website: string
  details: string[]
  logoKey: string
}

const EDUCATION_ENTRIES: EducationEntry[] = [
  {
    year: '2017 - 2021',
    logoKey: 'msuLogo',
    title: "Bachelor's of Science Psychology",
    company: 'Missouri State University',
    website: 'https://www.missouristate.edu/',
    details: [
      'Minor: Theatre',
      "Honors/Awards: Board of Governor's Scholarship Recipient",
    ],
  },
  {
    year: '2021 - 2021',
    logoKey: 'techElevatorLogo',
    title: 'Full-Stack Coding Bootcamp',
    company: 'Tech Elevator',
    website: 'https://www.techelevator.com/',
    details: [
      'Completed a 14-week Full-Stack Java bootcamp on computer science fundamentals, gaining expertise in designing and deploying strong web applications.',
    ],
  },
  {
    year: '2023 - 2023',
    logoKey: 'masseyLogo',
    title: 'Study Abroad Auckland, NZ',
    company: 'Massey University',
    website: 'https://www.massey.ac.nz/',
    details: [
      'I spent a semester learning about indigenous psychology and Māori psychological theories which provides valuable insights into an understanding of well being, spirituality, and familial relationships. I also was given guidance on how to competently implement this knowledge to encourage biculturalism in psychological practice and in the workplace.',
    ],
  },
]

export function useEducation() {
  return {
    educationEntries: EDUCATION_ENTRIES,
  }
}
