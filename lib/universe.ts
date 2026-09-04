export type UniverseEntryId =
  | 'world'
  | 'systems'
  | 'media'
  | 'design'
  | 'ventures'
  | 'properties'

export type UniverseStatus =
  | 'Institution'
  | 'Forming'
  | 'Active'
  | 'Future horizon'

export type UniverseProject = {
  name: string
  href: `https://${string}`
  description: string
}

export type UniverseEntry = {
  id: UniverseEntryId
  slug?: Exclude<UniverseEntryId, 'world'>
  name: string
  role: string
  mission: string
  description: string
  purpose: string
  frontier: string
  contribution: string
  direction: string
  status: UniverseStatus
  accent: string
  orbit?: {
    distance: number
    period: number
    inclination: number
    startAngle: number
  }
  projects: readonly UniverseProject[]
}

export const DIVERGENT_WORLD: UniverseEntry = {
  id: 'world',
  name: 'Divergent World',
  role: 'The institution',
  mission:
    'Create gravity around the frontiers that advance human life and well-being.',
  description:
    'One enduring institution where capability, culture, and products reinforce one another.',
  purpose:
    'Concentrate technology, culture, design, capital, and place around work that expands human capability, life, and well-being.',
  frontier:
    'The meeting point between human judgment and machine intelligence, where new institutions and ways of working become possible.',
  contribution:
    'Divergent World supplies the shared mission, standards, relationships, and learning system that keep five companies coherent.',
  direction:
    'Build an enduring institution whose people and companies become more capable by creating meaningful things together.',
  status: 'Institution',
  accent: '#f4dfbe',
  projects: [],
}

export const DIVISIONS: readonly UniverseEntry[] = [
  {
    id: 'systems',
    slug: 'systems',
    name: 'Divergent Systems',
    role: 'Capability',
    mission: 'Build technology that amplifies human potential.',
    description:
      'Software, AI systems, automation, and tools for meaningful work.',
    purpose:
      'Build software and AI systems that help people and organizations achieve more than they could without them.',
    frontier:
      'AI operating systems, agents, knowledge systems, automation, education technology, and tools for meaningful work.',
    contribution:
      'Systems creates the capability and recurring economic engine that lets the wider institution learn, build, and invest.',
    direction:
      'Develop reliable technology that increases human agency while preserving judgment, creativity, leadership, and ethics.',
    status: 'Forming',
    accent: '#f2e5cd',
    orbit: {
      distance: 12,
      period: 96,
      inclination: 8,
      startAngle: 304,
    },
    projects: [],
  },
  {
    id: 'media',
    slug: 'media',
    name: 'Divergent Media',
    role: 'Culture',
    mission: 'Create ideas and stories that shape culture.',
    description:
      'Books, films, music, art, games, and enduring intellectual property.',
    purpose:
      'Create stories, ideas, and worlds that help people interpret technological change and imagine more human futures.',
    frontier:
      'Books, film, music, art, games, and enduring intellectual property where culture can move ahead of convention.',
    contribution:
      'Media gives new capability meaning, makes the institution legible, and carries its ideas beyond the people who built them.',
    direction:
      'Develop enduring worlds and intellectual property that deepen culture while remaining independent of short-lived attention cycles.',
    status: 'Active',
    accent: '#d6a76c',
    orbit: {
      distance: 17,
      period: 132,
      inclination: -11,
      startAngle: 112,
    },
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
    slug: 'design',
    name: 'Divergent Design',
    role: 'Experience',
    mission: 'Design intentional products that improve everyday life.',
    description:
      'Fashion, furniture, architecture, objects, and future hardware.',
    purpose:
      'Turn ideas and technologies into intentional products, objects, and environments that improve how life is lived.',
    frontier:
      'Digital products, fashion, furniture, architecture, objects, and future hardware shaped by utility, restraint, and taste.',
    contribution:
      "Design makes capability tangible and converts the institution's principles into experiences people can understand and use.",
    direction:
      'Create a coherent family of useful products whose quality is felt in both their function and their smallest details.',
    status: 'Forming',
    accent: '#7c2f2d',
    orbit: {
      distance: 19,
      period: 174,
      inclination: 17,
      startAngle: 226,
    },
    projects: [],
  },
  {
    id: 'ventures',
    slug: 'ventures',
    name: 'Divergent Ventures',
    role: 'Capital',
    mission:
      'Allocate capital into exceptional people, technologies, and long-term opportunities.',
    description:
      'Patient capital for founders, internal ventures, strategic acquisitions, and research.',
    purpose:
      'Direct patient capital toward exceptional founders, useful technologies, and opportunities that can compound over long horizons.',
    frontier:
      'Venture investment, internal companies, strategic acquisitions, research initiatives, and disciplined long-term ownership.',
    contribution:
      'Ventures turns the value created by the institution into capital for new capability, culture, experiences, and durable assets.',
    direction:
      'Become a trusted long-term capital allocator without sacrificing the coherence or simplicity of the institution.',
    status: 'Future horizon',
    accent: '#b98550',
    orbit: { distance: 22, period: 216, inclination: -20, startAngle: 42 },
    projects: [],
  },
  {
    id: 'properties',
    slug: 'properties',
    name: 'Divergent Properties',
    role: 'Permanence',
    mission:
      'Create enduring places where people can live, work, create, and build together.',
    description:
      'Homes, studios, campuses, and physical environments built for long-term human flourishing.',
    purpose:
      'Own and develop physical environments that create stability, belonging, and room for consequential work.',
    frontier:
      'Housing, creative studios, campuses, mixed-use environments, and future communities designed to endure.',
    contribution:
      'Properties gives the institution a physical memory and creates places where its people, culture, and work can take root.',
    direction:
      'Translate the institution from software, culture, and products into durable places that can serve generations.',
    status: 'Future horizon',
    accent: '#684633',
    orbit: { distance: 25, period: 264, inclination: 24, startAngle: 168 },
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

export function getUniverseEntryPath(entry: UniverseEntry): string {
  return entry.id === 'world' ? '/about' : `/companies/${entry.id}`
}

export function getCompanyBySlug(slug: string): UniverseEntry | undefined {
  return DIVISIONS.find((entry) => entry.slug === slug)
}
