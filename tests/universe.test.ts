import assert from 'node:assert/strict'
import test from 'node:test'
import {
  DIVERGENT_WORLD,
  DIVISIONS,
  UNIVERSE_ENTRIES,
  getUniverseEntry,
} from '../lib/universe.ts'
import { BLACK_HOLE_RENDER_PROFILE } from '../app/components/black-hole/render-profile.ts'

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

test('keeps the mobile renderer inside its performance budget', () => {
  assert.equal(BLACK_HOLE_RENDER_PROFILE.maxDpr, 1.35)
  assert.equal(BLACK_HOLE_RENDER_PROFILE.visibleMeshCount, 5)
  assert.ok(
    BLACK_HOLE_RENDER_PROFILE.dustDisk.outerRadius >
      BLACK_HOLE_RENDER_PROFILE.hotDisk.outerRadius,
  )
  assert.ok(
    BLACK_HOLE_RENDER_PROFILE.eventHorizon.radius <
      BLACK_HOLE_RENDER_PROFILE.hotDisk.innerRadius,
  )
})
