import assert from 'node:assert/strict'
import test from 'node:test'
import { BLACK_HOLE_RENDER_PROFILE } from '../app/components/black-hole/render-profile.ts'

test('keeps the mobile renderer inside its performance budget', () => {
  assert.equal(BLACK_HOLE_RENDER_PROFILE.maxDpr, 1.35)
  assert.equal(BLACK_HOLE_RENDER_PROFILE.visibleMeshCount, 5)
  assert.equal(BLACK_HOLE_RENDER_PROFILE.visibleObjectCount, 6)
})

test('softens both disks before their geometry ends', () => {
  assert.equal(BLACK_HOLE_RENDER_PROFILE.hotDisk.fadeStart, 4.6)
  assert.equal(BLACK_HOLE_RENDER_PROFILE.dustDisk.fadeStart, 7)
  assert.ok(
    BLACK_HOLE_RENDER_PROFILE.hotDisk.fadeStart <
      BLACK_HOLE_RENDER_PROFILE.hotDisk.outerRadius,
  )
  assert.ok(
    BLACK_HOLE_RENDER_PROFILE.dustDisk.fadeStart <
      BLACK_HOLE_RENDER_PROFILE.dustDisk.outerRadius,
  )
})

test('defines a restrained particle halo around the procedural core', () => {
  assert.deepEqual(BLACK_HOLE_RENDER_PROFILE.halo, {
    innerRadius: 7.5,
    outerRadius: 17.5,
    size: 0.12,
    opacity: 0.5,
  })
})

test('keeps the disks and event horizon correctly nested', () => {
  assert.ok(
    BLACK_HOLE_RENDER_PROFILE.dustDisk.outerRadius >
      BLACK_HOLE_RENDER_PROFILE.hotDisk.outerRadius,
  )
  assert.ok(
    BLACK_HOLE_RENDER_PROFILE.eventHorizon.radius <
      BLACK_HOLE_RENDER_PROFILE.hotDisk.innerRadius,
  )
})
