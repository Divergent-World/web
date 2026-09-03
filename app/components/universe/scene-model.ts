import type { UniverseEntryId } from '../../../lib/universe'

export type Vector3Tuple = [number, number, number]

export const CAMERA_FLIGHT_SECONDS = 1.8

export const OVERVIEW_CAMERA = {
  position: [0, 23, 52] as Vector3Tuple,
  target: [0, 0, 0] as Vector3Tuple,
  fov: 38,
  minDistance: 9,
  maxDistance: 86,
}

const CAMERA_OFFSETS: Record<UniverseEntryId, Vector3Tuple> = {
  world: [13, 6, 18],
  systems: [4.2, 2, 5.8],
  media: [4.8, 2.2, 6.2],
  design: [4.4, 2.1, 6],
}

function round(value: number) {
  return Math.round(value * 100) / 100
}

export function getCameraDestination(
  id: UniverseEntryId,
  target: Vector3Tuple,
) {
  const offset = CAMERA_OFFSETS[id]

  return {
    position: target.map((value, index) =>
      round(value + offset[index]),
    ) as Vector3Tuple,
    target: [...target] as Vector3Tuple,
  }
}

export function getCameraFlightProgress(
  elapsedSeconds: number,
  reducedMotion: boolean,
) {
  if (reducedMotion) return 1

  const progress = Math.min(
    Math.max(elapsedSeconds / CAMERA_FLIGHT_SECONDS, 0),
    1,
  )

  return 1 - (1 - progress) ** 3
}

export function getParticleCount(viewportWidth: number) {
  return viewportWidth <= 680 ? 240 : 520
}

export function createSeededHaloPositions(count: number) {
  const positions = new Float32Array(count * 3)
  let seed = 0x2f6e2b1

  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 0x100000000
  }

  for (let index = 0; index < count; index += 1) {
    const radius = 7.5 + random() * 10
    const theta = random() * Math.PI * 2
    const cosPhi = random() * 2 - 1
    const sinPhi = Math.sqrt(1 - cosPhi * cosPhi)
    const offset = index * 3

    positions[offset] = radius * sinPhi * Math.cos(theta)
    positions[offset + 1] = radius * cosPhi
    positions[offset + 2] = radius * sinPhi * Math.sin(theta)
  }

  return positions
}

export function advanceOrbitPhase(
  phase: number,
  deltaSeconds: number,
  periodSeconds: number,
  reducedMotion: boolean,
) {
  if (reducedMotion) return phase

  const boundedDelta = Math.min(Math.max(deltaSeconds, 0), 0.1)
  return phase + (boundedDelta * Math.PI * 2) / periodSeconds
}

export function getTrackingTranslation(
  previousTarget: readonly [number, number, number],
  nextTarget: readonly [number, number, number],
) {
  return nextTarget.map(
    (value, index) => value - previousTarget[index],
  ) as Vector3Tuple
}
