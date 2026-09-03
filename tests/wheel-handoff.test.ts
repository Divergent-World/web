import assert from 'node:assert/strict'
import test from 'node:test'
import { attachPageScrollHandoff } from '../app/components/universe/wheel-handoff.ts'

class TestWheelEvent extends Event {
  readonly deltaY: number

  constructor(deltaY: number) {
    super('wheel', { cancelable: true })
    this.deltaY = deltaY
  }
}

test('hands wheel input to the page only at the outer camera boundary', () => {
  const canvas = new EventTarget()
  let cameraDistance = 48
  let orbitControlEvents = 0
  const detach = attachPageScrollHandoff(
    canvas,
    () => cameraDistance,
    64,
  )

  canvas.addEventListener('wheel', () => {
    orbitControlEvents += 1
  })

  const zoomEvent = new TestWheelEvent(120)
  canvas.dispatchEvent(zoomEvent)
  assert.equal(orbitControlEvents, 1)
  assert.equal(zoomEvent.defaultPrevented, false)

  cameraDistance = 64
  const pageScrollEvent = new TestWheelEvent(120)
  canvas.dispatchEvent(pageScrollEvent)
  assert.equal(orbitControlEvents, 1)
  assert.equal(pageScrollEvent.defaultPrevented, false)

  detach()
  canvas.dispatchEvent(new TestWheelEvent(120))
  assert.equal(orbitControlEvents, 2)
})
