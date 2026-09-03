# Divergent.World

The public gateway to Divergent World: an institution building technologies,
media, and products that increase human potential.

The longer-term identity, membership, directory, and application direction is
recorded in [`docs/product-platform-vision.md`](docs/product-platform-vision.md).

The homepage presents its three active branches as a universe orbiting a
procedural black hole:

- **Divergent Systems** creates capability.
- **Divergent Media** creates culture and contains
  [Revelation](https://revelation.divergent.world).
- **Divergent Design** creates products.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · CSS Modules ·
React Three Fiber.

The page uses a hybrid architecture. One React Three Fiber canvas owns the
procedural black hole, particle halo, orbit paths, and moving celestial bodies.
Direct Three.js controls provide drag, wheel, and two-finger pinch navigation,
while a fixed native-HTML system index mirrors every canvas selection. A CSS
universe remains underneath so the index, annotation, About navigation, and
Revelation link stay usable when WebGL is unavailable. No textures,
post-processing pipeline, or UI framework are required.

## Getting started

```bash
npm install
npm run dev
```

| Script              | Purpose                        |
| ------------------- | ------------------------------ |
| `npm run dev`       | Development server             |
| `npm test`          | Node test suite                |
| `npm run build`     | Production build               |
| `npm run start`     | Serve the production build     |
| `npm run lint`      | ESLint (flat config)           |
| `npm run typecheck` | `tsc --noEmit`                 |

## Editing the universe

The institution, branches, orbit geometry, and published projects live in
[`lib/universe.ts`](lib/universe.ts). Keep the homepage public-facing: personal
cockpit content from the archived Divergent.World repository does not belong in
this model.

## Founder image

Ali Rahman's portrait is stored locally at
[`public/images/ali-rahman.png`](public/images/ali-rahman.png). Its monumental
curves, warm stone, ivory light, tailored black, bronze, and muted oxblood form
the visual basis of the site.

## Shared assets

Public metadata media can live in the shared Cloudflare R2 bucket behind
`https://assets.divergent.world`, namespaced under `divergent-world/`. Set
`NEXT_PUBLIC_ASSET_ORIGIN` to override the origin. The build constructs URLs
without contacting the bucket, so it continues to work offline.

Expected object:

| Object                          | Used for                                      |
| ------------------------------- | --------------------------------------------- |
| `divergent-world/opengraph.png` | Open Graph / Twitter card image (1200 x 630) |

## Accessibility and motion

Every destination is a native button or link, the HTML system index remains
visible above the decorative canvas, and touch targets are at least 44 pixels
square. `prefers-reduced-motion: reduce` freezes orbital, shader, halo,
star-field, camera, and surfacing motion while preserving the complete
composition. The borderless founder image is masked into the surrounding
atmosphere rather than presented as a card.
