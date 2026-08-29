# Divergent.World

The portal for a growing universe of creative works. Each published world is a
celestial object orbiting a central black hole; the composition leaves the
remaining orbits empty on purpose.

Currently in orbit: **Revelation** → <https://revelation.divergent.world>

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · plain CSS.

No UI framework, no animation library, no CSS framework. The black hole, orbits
and star field are layered CSS gradients and a handful of elements. The page is
a Server Component and ships **no application JavaScript** — it renders, and the
Revelation link works, before any script executes.

## Getting started

```bash
npm install
npm run dev
```

| Script              | Purpose                        |
| ------------------- | ------------------------------ |
| `npm run dev`       | Development server             |
| `npm run build`     | Production build               |
| `npm run start`     | Serve the production build     |
| `npm run lint`      | ESLint (flat config)           |
| `npm run typecheck` | `tsc --noEmit`                 |

## Adding a world

Append an entry to [`lib/worlds.ts`](lib/worlds.ts) and set `published: true`.
Pick an unused `orbit.radius` so two bodies never share a path, and an
`orbit.startAngle` that keeps the composition balanced — that angle is also the
resting position shown to visitors who prefer reduced motion. Nothing else needs
to change.

## Assets

Media lives in the shared public Cloudflare R2 bucket behind
`https://assets.divergent.world`, namespaced per project. Everything for this
site goes under the `divergent-world/` prefix:

```
https://assets.divergent.world/divergent-world/<filename>
```

Set `NEXT_PUBLIC_ASSET_ORIGIN` to override the origin; it falls back to
`https://assets.divergent.world`. URLs are constructed directly — the build
never contacts the bucket, so it works offline and a missing object degrades
gracefully instead of failing the build. Only public URLs are ever used; R2 and
S3 credentials belong nowhere in this repository.

Expected objects:

| Object                              | Used for                       |
| ----------------------------------- | ------------------------------ |
| `divergent-world/opengraph.png`     | Open Graph / Twitter card image (1200×630) |

## Accessibility & motion

Semantic landmarks, a real `h1`, and a named, keyboard-reachable link with a
visible focus ring. Decorative layers are hidden from assistive technology.
`prefers-reduced-motion: reduce` presents the same finished composition with the
motion removed.
