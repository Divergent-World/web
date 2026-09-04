import assert from 'node:assert/strict'
import test from 'node:test'
import {
  DIVERGENT_WORLD,
  DIVISIONS,
  UNIVERSE_ENTRIES,
  getCompanyBySlug,
  getUniverseEntry,
} from '../lib/universe.ts'

test('publishes the five reinforcing companies in institutional order', () => {
  assert.deepEqual(
    DIVISIONS.map(({ id, role, status }) => ({ id, role, status })),
    [
      { id: 'systems', role: 'Capability', status: 'Forming' },
      { id: 'media', role: 'Culture', status: 'Active' },
      { id: 'design', role: 'Experience', status: 'Forming' },
      { id: 'ventures', role: 'Capital', status: 'Future horizon' },
      { id: 'properties', role: 'Permanence', status: 'Future horizon' },
    ],
  )
  assert.equal(UNIVERSE_ENTRIES.length, 6)
})

test('gives every company substantive page content and a canonical slug', () => {
  for (const company of DIVISIONS) {
    assert.equal(company.slug, company.id)
    assert.ok(company.purpose.length >= 45)
    assert.ok(company.frontier.length >= 45)
    assert.ok(company.contribution.length >= 45)
    assert.ok(company.direction.length >= 45)
    assert.equal(getCompanyBySlug(company.slug), company)
  }
  assert.equal(getCompanyBySlug('missing'), undefined)
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

test('keeps every orbit ordered inside the visible outer system', () => {
  assert.deepEqual(
    DIVISIONS.map((company) => company.orbit?.distance),
    [12, 17, 19, 22, 25],
  )
})
