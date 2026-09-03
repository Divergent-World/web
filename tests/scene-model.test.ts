import assert from 'node:assert/strict'
import test from 'node:test'
import {
  CAMERA_FLIGHT_SECONDS,
  OVERVIEW_CAMERA,
  advanceOrbitPhase,
  createSeededHaloPositions,
  getCameraDestination,
  getCameraFlightProgress,
  getParticleCount,
  getTrackingTranslation,
} from '../app/components/universe/scene-model.ts'

test('places the camera relative to the selected body', () => {
  assert.deepEqual(getCameraDestination('media', [8, 2, -4]), {
    position: [12.8, 4.2, 2.2],
    target: [8, 2, -4],
  })
  assert.deepEqual(OVERVIEW_CAMERA.target, [0, 0, 0])
})

test('eases camera flights and completes immediately for reduced motion', () => {
  assert.equal(getCameraFlightProgress(-1, false), 0)
  assert.equal(getCameraFlightProgress(CAMERA_FLIGHT_SECONDS, false), 1)
  assert.equal(getCameraFlightProgress(0, true), 1)
})

test('uses a compact mobile halo without removing it', () => {
  assert.equal(getParticleCount(390), 240)
  assert.equal(getParticleCount(1440), 520)
})

test('creates deterministic halo positions inside the intended shell', () => {
  const first = createSeededHaloPositions(24)
  const second = createSeededHaloPositions(24)

  assert.deepEqual(first, second)
  assert.equal(first.length, 24 * 3)

  for (let index = 0; index < first.length; index += 3) {
    const radius = Math.hypot(first[index], first[index + 1], first[index + 2])
    assert.ok(radius >= 7.5)
    assert.ok(radius <= 17.5)
  }
})

test('advances orbital motion unless reduced motion is requested', () => {
  assert.ok(advanceOrbitPhase(Math.PI, 1, 120, false) > Math.PI)
  assert.equal(advanceOrbitPhase(Math.PI, 1, 120, true), Math.PI)
})

test('tracking translation preserves the camera offset from a moving target', () => {
  assert.deepEqual(
    getTrackingTranslation([1, 2, 3], [4, 6, 8]),
    [3, 4, 5],
  )
})
