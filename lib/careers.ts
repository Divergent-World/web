import { createEmailHref } from './site.ts'

export type CareerStatus = 'Open' | 'Future opening' | 'Closed'

export type CareerRole = {
  slug: string
  title: string
  status: CareerStatus
  callout: string
  summary: string
  responsibilities: readonly string[]
  qualities: readonly string[]
  interestMaterials: readonly string[]
  emailHref: string
}

const interestMaterials = [
  'A concise introduction and why the future role interests you.',
  'Your location, availability horizon, and preferred working arrangement.',
  'A resume, LinkedIn profile, or equivalent record of your work.',
  'One example of a complex situation you made calmer or more coherent.',
] as const

export const CAREER_ROLES: readonly CareerRole[] = [
  {
    slug: 'executive-assistant',
    title: 'Executive Assistant',
    status: 'Future opening',
    callout: 'Expressions of interest welcome',
    summary:
      'A future role supporting Ali Rahman with coordination, communication, follow-through, and the operating rhythm of Divergent World.',
    responsibilities: [
      'Protect priorities, time, and follow-through across the institution.',
      'Turn conversations and decisions into clear actions and written records.',
      'Coordinate communication, scheduling, research, and practical execution.',
      'Help maintain a calm, reliable operating environment as the company grows.',
    ],
    qualities: [
      'Clear written and verbal communication.',
      'Sound judgment, discretion, and emotional steadiness.',
      'Strong organization without unnecessary process.',
      'Comfort working with AI tools while preserving human judgment.',
      'A bias toward useful action and dependable follow-through.',
    ],
    interestMaterials,
    emailHref: createEmailHref({
      subject: 'Executive Assistant - expression of interest',
      body: [
        'Concise introduction and interest:',
        '',
        'Location, availability horizon, and working arrangement:',
        '',
        'Resume, LinkedIn, or work record:',
        '',
        'Example of making a complex situation calmer or more coherent:',
      ].join('\n'),
    }),
  },
]

export function getCareerRole(slug: string): CareerRole | undefined {
  return CAREER_ROLES.find((role) => role.slug === slug)
}
