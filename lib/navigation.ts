export type PublicNavigationItem = {
  label: string
  href: string
}

export const PUBLIC_NAVIGATION: readonly PublicNavigationItem[] = [
  { label: 'Company', href: '/about' },
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'News', href: '/news' },
  { label: 'Careers', href: '/careers' },
]

export const REVELATION_LINK = {
  label: 'Revelation',
  href: 'https://revelation.divergent.world',
  external: true,
} as const
