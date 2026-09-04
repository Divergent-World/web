import assert from 'node:assert/strict'
import test from 'node:test'
import {
  PUBLIC_NAVIGATION_GROUPS,
  REVELATION_LINK,
} from '../lib/navigation.ts'

test('groups public navigation into Our work and Company', () => {
  assert.deepEqual(PUBLIC_NAVIGATION_GROUPS, [
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
  ])
})

test('keeps Revelation as the one featured external destination', () => {
  assert.deepEqual(REVELATION_LINK, {
    label: 'Revelation',
    href: 'https://revelation.divergent.world',
    external: true,
  })
})
