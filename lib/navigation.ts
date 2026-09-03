export type PublicNavigationItem = {
  label: string
  href: string
  external?: true
}

export const PUBLIC_NAVIGATION: readonly PublicNavigationItem[] = [
  { label: 'Universe', href: '/#universe' },
  { label: 'About', href: '/#about' },
  {
    label: 'Revelation',
    href: 'https://revelation.divergent.world',
    external: true,
  },
]
