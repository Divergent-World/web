import { shouldReleasePageScroll } from './scene-model.ts'

export function attachPageScrollHandoff(
  element: EventTarget,
  getCameraDistance: () => number,
  minDistance: number,
  maxDistance: number,
) {
  const releasePageScroll = (event: Event) => {
    const wheelEvent = event as WheelEvent
    if (
      shouldReleasePageScroll(
        getCameraDistance(),
        minDistance,
        maxDistance,
        wheelEvent.deltaY,
      )
    ) {
      wheelEvent.stopImmediatePropagation()
    }
  }

  element.addEventListener('wheel', releasePageScroll, { capture: true })

  return () =>
    element.removeEventListener('wheel', releasePageScroll, { capture: true })
}
