export type PublicNavigationItem = {
  label: string
  href: string
}

export type PublicNavigationGroup = {
  label: string
  items: readonly PublicNavigationItem[]
}

export const PUBLIC_NAVIGATION_GROUPS: readonly PublicNavigationGroup[] = [
  {
    label: 'Our work',
    items: [
      { label: 'Overview', href: '/companies' },
      { label: 'Divergent Systems', href: '/companies/systems' },
      { label: 'Divergent Media', href: '/companies/media' },
      { label: 'Divergent Design', href: '/companies/design' },
      { label: 'Divergent Ventures', href: '/companies/ventures' },
      { label: 'Divergent Properties', href: '/companies/properties' },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Manifesto', href: '/manifesto' },
      { label: 'News', href: '/news' },
      { label: 'Careers', href: '/careers' },
    ],
  },
]

export const REVELATION_LINK = {
  label: 'Revelation',
  href: 'https://revelation.divergent.world',
  external: true,
} as const
