import assert from 'node:assert/strict'
import test from 'node:test'
import { PUBLIC_NAVIGATION, REVELATION_LINK } from '../lib/navigation.ts'

test('keeps the primary navigation flat and routes Company to the overview', () => {
  assert.deepEqual(PUBLIC_NAVIGATION, [
    { label: 'Company', href: '/about' },
    { label: 'Manifesto', href: '/manifesto' },
    { label: 'News', href: '/news' },
    { label: 'Careers', href: '/careers' },
  ])
})

test('keeps Revelation as the one featured external destination', () => {
  assert.deepEqual(REVELATION_LINK, {
    label: 'Revelation',
    href: 'https://revelation.divergent.world',
    external: true,
  })
})
