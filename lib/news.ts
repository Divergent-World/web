export type NewsCategory = 'Announcement' | 'Article' | 'Release' | 'Update'

export type NewsEntry = {
  slug: string
  title: string
  category: NewsCategory
  publishedAt: string
  description: string
  paragraphs: readonly string[]
  relatedLinks: readonly { label: string; href: string; external?: true }[]
}

export const NEWS: readonly NewsEntry[] = [
  {
    slug: 'revelation-the-first-world',
    title: 'Revelation: the first world.',
    category: 'Release',
    publishedAt: '2026-09-03',
    description:
      'Revelation is the first live world from Divergent Media—and the first public expression of the wider institution.',
    paragraphs: [
      'Revelation is the first live world of Divergent Media. It is a place for ideas, stories, images, and cultural work to gather into something larger than a sequence of posts.',
      'Its release is a beginning, not a claim of scale. Divergent World will publish evidence as it becomes real and keep future horizons clearly distinct from active work.',
      'Revelation establishes the first visible connection between culture and the institution around it: a world built to carry meaning, deepen over time, and make room for more voices.',
    ],
    relatedLinks: [
      {
        label: 'Enter Revelation',
        href: 'https://revelation.divergent.world',
        external: true,
      },
      { label: 'Divergent Media', href: '/companies/media' },
    ],
  },
  {
    slug: 'create-gravity',
    title: 'Create gravity.',
    category: 'Article',
    publishedAt: '2026-09-02',
    description:
      'A concise account of signal, coherence, attraction, and transformation at Divergent World.',
    paragraphs: [
      'Information is abundant. Coherence is rare. The useful response is not to become louder, but to identify what matters and organize action around it.',
      'We call meaningful signal mu. Finding it requires subtraction: fewer contradictions, fewer empty inputs, and closer alignment between inner conviction and outward behavior.',
      'Coherent people create trustworthy fields. A field organized around meaningful work creates gravity—attracting talent, ideas, technology, and capital toward a frontier worth advancing.',
      'Attraction alone is not enough. A good institution transforms what enters it, helping people leave clearer, steadier, more capable, and more able to build with others.',
    ],
    relatedLinks: [{ label: 'Read the Manifesto', href: '/manifesto' }],
  },
  {
    slug: 'one-institution-five-companies',
    title: 'One institution. Five companies.',
    category: 'Announcement',
    publishedAt: '2026-09-01',
    description:
      'Divergent World names the five reinforcing companies that define its long-term institutional architecture.',
    paragraphs: [
      'Divergent World is organized as one institution with five reinforcing companies. Systems creates capability. Media creates culture. Design creates experience. Ventures allocates capital. Properties creates permanence.',
      'The structure matters because each company can strengthen the others. Technology becomes more legible through culture and design; value can become capital; capital can become durable places for people and work.',
      'Systems and Design are forming. Media is active through Revelation. Ventures and Properties are future horizons, named now so the long-term architecture is clear without pretending those companies are active today.',
    ],
    relatedLinks: [{ label: 'Explore all five companies', href: '/about#companies' }],
  },
]

export function getNewsEntry(slug: string): NewsEntry | undefined {
  return NEWS.find((entry) => entry.slug === slug)
}
