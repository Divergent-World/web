# Divergent.World

The public gateway to Divergent World: a learning organization for doers
working at the frontiers of human progress.

The longer-term identity, membership, directory, and application direction is
recorded in [`docs/product-platform-vision.md`](docs/product-platform-vision.md).

The Create Gravity homepage presents five reinforcing companies as a universe
orbiting a procedural black hole:

- **Divergent Systems** creates capability.
- **Divergent Media** creates culture and contains
  [Revelation](https://revelation.divergent.world).
- **Divergent Design** creates experience.
- **Divergent Ventures** will allocate capital and is a future horizon.
- **Divergent Properties** will create permanence and is a future horizon.

The public architecture has one Company overview with five detailed company
routes, a printable Manifesto, News with permanent publication routes, and Careers. The
Executive Assistant page transparently describes a future opening and accepts
expressions of interest by email; it does not present an active hiring process.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · CSS Modules ·
React Three Fiber.

The page uses a hybrid architecture. One React Three Fiber canvas owns the
procedural black hole, particle halo, orbit paths, and moving celestial bodies.
Direct Three.js controls provide drag, wheel, and two-finger pinch navigation,
while a fixed native-HTML system index mirrors every canvas selection. A CSS
universe remains underneath so the index, annotation, navigation, and
Revelation link stay usable when WebGL is unavailable. Every reading route is
server-rendered independently of the canvas. No textures,
post-processing pipeline, or UI framework are required.

The existing visual language is formalized as
[`Event Horizon`](docs/design-system.md): near-black atmosphere, ivory signal,
bronze warmth, oxblood depth, dissolving boundaries, editorial typography, and
slow gravitational motion. Components use semantic theme tokens so another
complete theme can be added later without changing page markup.

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

The institution, companies, orbit geometry, and published projects live in
[`lib/universe.ts`](lib/universe.ts). Keep the homepage public-facing: personal
cockpit content from the archived Divergent.World repository does not belong in
this model.

## Founder image

Ali Rahman's portrait is stored locally at
[`public/images/ali-rahman.png`](public/images/ali-rahman.png). Its monumental
curves, warm stone, ivory light, tailored black, bronze, and muted oxblood form
the visual basis of the site.

## Discovery and sharing

The project generates its Open Graph image and Apple touch icon locally using
Next.js image routes. Root and route-specific metadata use the canonical
`https://www.divergent.world` origin. Organization, WebSite, and Article JSON-LD
are emitted from verified local records.

Crawler and agent surfaces are generated from the same typed content sources:

- `/robots.txt`
- `/sitemap.xml`
- `/rss.xml`
- `/llms.txt`
- `/manifest.webmanifest`

## Accessibility and motion

Every destination is a native button or link, the HTML system index remains
visible above the decorative canvas, and touch targets are at least 44 pixels
square. The primary navigation stays flat so it remains clear on touch and
keyboard interfaces. `prefers-reduced-motion: reduce` freezes orbital, shader, halo,
star-field, camera, and surfacing motion while preserving the complete
composition. The borderless founder image is masked into the surrounding
atmosphere rather than presented as a card. The Manifesto has a dedicated print
treatment with black text on white and no site chrome.
