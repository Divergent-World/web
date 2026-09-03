import assert from 'node:assert/strict'
import test from 'node:test'
import {
  DIVERGENT_WORLD,
  DIVISIONS,
  UNIVERSE_ENTRIES,
  getUniverseEntry,
} from '../lib/universe.ts'

test('publishes exactly the three active divisions', () => {
  assert.deepEqual(
    DIVISIONS.map(({ id }) => id),
    ['systems', 'media', 'design'],
  )
  assert.equal(UNIVERSE_ENTRIES.length, 4)
})

test('keeps Revelation as the only public project destination', () => {
  const projects = DIVISIONS.flatMap(({ projects }) => projects)
  assert.deepEqual(projects, [
    {
      name: 'Revelation',
      href: 'https://revelation.divergent.world',
      description: 'The first world of Divergent Media.',
    },
  ])
  assert.equal(
    DIVISIONS.find(({ id }) => id === 'systems')?.status,
    'Forming',
  )
  assert.equal(
    DIVISIONS.find(({ id }) => id === 'design')?.status,
    'Forming',
  )
})

test('falls back to the institution for unknown selections', () => {
  assert.equal(getUniverseEntry('missing'), DIVERGENT_WORLD)
  assert.equal(getUniverseEntry(null), DIVERGENT_WORLD)
})

test('defines true 3D orbital data without interaction state', () => {
  for (const division of DIVISIONS) {
    assert.deepEqual(Object.keys(division.orbit ?? {}).sort(), [
      'distance',
      'inclination',
      'period',
      'startAngle',
    ])
    assert.equal('paused' in (division.orbit ?? {}), false)
    assert.equal('selected' in (division.orbit ?? {}), false)
  }
})

test('keeps Design within the visible outer system', () => {
  const mediaDistance = DIVISIONS.find(({ id }) => id === 'media')?.orbit
    ?.distance
  const designDistance = DIVISIONS.find(({ id }) => id === 'design')?.orbit
    ?.distance

  assert.equal(designDistance, 19)
  assert.ok(designDistance! > mediaDistance!)
})
