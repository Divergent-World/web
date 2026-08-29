/**
 * Every published world in the Divergent universe.
 *
 * Adding a world is a matter of appending an entry here: pick an unused
 * `orbit.radius` so bodies do not share a path, and a `orbit.startAngle` that
 * keeps the composition balanced. Angles are degrees clockwise from the top of
 * the orbit; `startAngle` is also the resting position for visitors who have
 * reduced motion enabled.
 */
export type World = {
  /** Stable key, also used to namespace CSS custom properties. */
  id: string
  name: string
  href: string
  description: string
  /** Halo colour for the body. Never the sole carrier of meaning. */
  accent: string
  orbit: {
    /** Orbit radius as a percentage of the stage's half-width. */
    radius: number
    /** Seconds for one full revolution. Slow is the point. */
    duration: number
    /** Degrees clockwise from the top of the orbit. */
    startAngle: number
  }
  published: boolean
}

export const worlds: World[] = [
  {
    id: 'revelation',
    name: 'Revelation',
    href: 'https://revelation.divergent.world',
    description: 'The first world.',
    accent: '#cfe0ff',
    orbit: { radius: 68, duration: 240, startAngle: 132 },
    published: true,
  },
]

export const publishedWorlds = worlds.filter((world) => world.published)
