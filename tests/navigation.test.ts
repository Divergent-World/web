import assert from 'node:assert/strict'
import test from 'node:test'
import { PUBLIC_NAVIGATION } from '../lib/navigation.ts'

test('publishes only real destinations in the shared site navigation', () => {
  assert.deepEqual(PUBLIC_NAVIGATION, [
    { label: 'Universe', href: '/#universe' },
    { label: 'About', href: '/#about' },
    {
      label: 'Revelation',
      href: 'https://revelation.divergent.world',
      external: true,
    },
  ])
})
