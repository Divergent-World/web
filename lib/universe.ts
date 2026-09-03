export type UniverseEntryId = 'world' | 'systems' | 'media' | 'design'

export type UniverseProject = {
  name: string
  href: `https://${string}`
  description: string
}

export type UniverseEntry = {
  id: UniverseEntryId
  name: string
  role: string
  mission: string
  description: string
  status: 'Institution' | 'Forming' | 'Active'
  accent: string
  orbit?: {
    radius: number
    duration: number
    startAngle: number
  }
  projects: readonly UniverseProject[]
}

export const DIVERGENT_WORLD: UniverseEntry = {
  id: 'world',
  name: 'Divergent World',
  role: 'The institution',
  mission: 'Technology, media, and design in service of human potential.',
  description:
    'One enduring institution where capability, culture, and products reinforce one another.',
  status: 'Institution',
  accent: '#f4dfbe',
  projects: [],
}

export const DIVISIONS: readonly UniverseEntry[] = [
  {
    id: 'systems',
    name: 'Divergent Systems',
    role: 'Capability',
    mission: 'Build technology that amplifies human potential.',
    description:
      'Software, AI systems, automation, and tools for meaningful work.',
    status: 'Forming',
    accent: '#f2e5cd',
    orbit: { radius: 36, duration: 96, startAngle: 304 },
    projects: [],
  },
  {
    id: 'media',
    name: 'Divergent Media',
    role: 'Culture',
    mission: 'Create ideas and stories that shape culture.',
    description:
      'Books, films, music, art, games, and enduring intellectual property.',
    status: 'Active',
    accent: '#d6a76c',
    orbit: { radius: 58, duration: 132, startAngle: 112 },
    projects: [
      {
        name: 'Revelation',
        href: 'https://revelation.divergent.world',
        description: 'The first world of Divergent Media.',
      },
    ],
  },
  {
    id: 'design',
    name: 'Divergent Design',
    role: 'Products',
    mission: 'Design intentional products that improve everyday life.',
    description:
      'Fashion, furniture, architecture, objects, and future hardware.',
    status: 'Forming',
    accent: '#7c2f2d',
    orbit: { radius: 80, duration: 174, startAngle: 226 },
    projects: [],
  },
]

export const UNIVERSE_ENTRIES: readonly UniverseEntry[] = [
  DIVERGENT_WORLD,
  ...DIVISIONS,
]

export function getUniverseEntry(id: string | null): UniverseEntry {
  return UNIVERSE_ENTRIES.find((entry) => entry.id === id) ?? DIVERGENT_WORLD
}
