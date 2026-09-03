# Divergent World Homepage Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first Divergent World landing page with a procedural black hole, three accessible orbital divisions, an inline Revelation gateway, and a portrait-led `Founded by Ali Rahman` section.

**Architecture:** Keep the page shell, copy, portrait, and metadata server-rendered. Put selection state and semantic orbital controls in one small client component, and dynamically load a transparent React Three Fiber canvas that renders only the decorative black hole above a persistent CSS fallback.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, CSS Modules, Three.js 0.185, React Three Fiber 9, Node's built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-03-divergent-homepage-overhaul-design.md`

## Global Constraints

- Work directly on `codex/divergent-homepage-overhaul`; do not create a worktree.
- Keep the archive repo and Architecture folder read-only.
- Show only Divergent Systems, Divergent Media, and Divergent Design in the public universe.
- Revelation remains the only live outbound world and uses `https://revelation.divergent.world`.
- Systems and Design show `Forming` status and no placeholder links.
- Use only `three` and `@react-three/fiber`; do not add Drei, post-processing, textures, models, loaders, analytics, or runtime content fetching.
- Keep the WebGL canvas decorative and all navigation semantic HTML.
- Keep the black hole visible on iPhone-sized screens and cap canvas DPR at 1.35.
- Use at most five visible black-hole meshes.
- Freeze CSS and shader animation under `prefers-reduced-motion: reduce`.
- Derive the palette and architecture from `/Users/alirahman/Desktop/Life/Ali.png`: limestone, ivory, bronze, tailored black, muted oxblood, monumental arcs, and oculus light.
- Feature the unedited portrait with the heading `Founded by Ali Rahman` and alt text `Ali Rahman, founder of Divergent World.`
- Do not expose private cockpit data, household plans, internal metrics, agent telemetry, or personal operating details.
- Do not deploy, push, or open a pull request without separate authorization.

## File Structure

- Create `lib/universe.ts`: typed institutional and division records plus safe lookup.
- Create `tests/universe.test.ts`: built-in Node tests for public data and fallback behavior.
- Create `app/components/black-hole/render-profile.ts`: immutable geometry, motion, DPR, and palette constants.
- Create `app/components/black-hole/black-hole-shaders.ts`: the adapted cockpit vertex, accretion, and lensing shaders.
- Create `app/components/black-hole/BlackHoleCanvas.tsx`: transparent decorative Canvas and five-mesh procedural renderer.
- Create `app/components/UniverseExperience.tsx`: selected-entry state, semantic orbital buttons, CSS fallback, and shared detail panel.
- Create `public/images/ali-rahman.png`: unchanged copy of the supplied 1024×1024 portrait.
- Modify `app/page.tsx`: server-rendered page shell, founder section, and footer.
- Modify `app/page.module.css`: architectural theme, responsive universe, orbital controls, detail panel, founder composition, and reduced motion.
- Modify `app/globals.css`: palette, typography, reset, deterministic starfield, and shared accessibility utility.
- Modify `app/layout.tsx`: metadata image alt text and page metadata consumption.
- Modify `lib/site.ts`: public mission description.
- Modify `package.json`: dependencies and built-in `test` script.
- Modify `package-lock.json`: locked Three.js and React Three Fiber dependency graph.
- Modify `README.md`: describe the hybrid architecture, division model, founder asset, and verification commands.

---

### Task 1: Public Universe Model

**Files:**
- Create: `lib/universe.ts`
- Create: `tests/universe.test.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `UniverseEntryId`, `UniverseProject`, `UniverseEntry`, `UNIVERSE_ENTRIES`, `DIVERGENT_WORLD`, `DIVISIONS`, and `getUniverseEntry(id)`.
- Consumed by: `app/components/UniverseExperience.tsx` in Task 3.

- [ ] **Step 1: Add the built-in test command**

Add this script to `package.json` without changing the existing commands:

```json
"test": "node --test tests/*.test.*"
```

- [ ] **Step 2: Write the failing public-data test**

Create `tests/universe.test.ts`:

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import {
  DIVERGENT_WORLD,
  DIVISIONS,
  UNIVERSE_ENTRIES,
  getUniverseEntry,
} from '../lib/universe.ts'

test('publishes exactly the three active divisions', () => {
  assert.deepEqual(
    DIVISIONS.map(({ id }) => id),
    ['systems', 'media', 'design'],
  )
  assert.equal(UNIVERSE_ENTRIES.length, 4)
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
  assert.equal(DIVISIONS.find(({ id }) => id === 'systems')?.status, 'Forming')
  assert.equal(DIVISIONS.find(({ id }) => id === 'design')?.status, 'Forming')
})

test('falls back to the institution for unknown selections', () => {
  assert.equal(getUniverseEntry('missing'), DIVERGENT_WORLD)
  assert.equal(getUniverseEntry(null), DIVERGENT_WORLD)
})
```

- [ ] **Step 3: Run the test and verify the missing-module failure**

Run:

```bash
npm test
```

Expected: FAIL because `lib/universe.ts` does not exist.

- [ ] **Step 4: Implement the minimal typed universe model**

Create `lib/universe.ts`:

```ts
export type UniverseEntryId = 'world' | 'systems' | 'media' | 'design'

export type UniverseProject = {
  name: string
  href: `https://${string}`
  description: string
}

export type UniverseEntry = {
  id: UniverseEntryId
  name: string
  role: string
  mission: string
  description: string
  status: 'Institution' | 'Forming' | 'Active'
  accent: string
  orbit?: {
    radius: number
    duration: number
    startAngle: number
  }
  projects: readonly UniverseProject[]
}

export const DIVERGENT_WORLD: UniverseEntry = {
  id: 'world',
  name: 'Divergent World',
  role: 'The institution',
  mission: 'Technology, media, and design in service of human potential.',
  description:
    'One enduring institution where capability, culture, and products reinforce one another.',
  status: 'Institution',
  accent: '#f4dfbe',
  projects: [],
}

export const DIVISIONS: readonly UniverseEntry[] = [
  {
    id: 'systems',
    name: 'Divergent Systems',
    role: 'Capability',
    mission: 'Build technology that amplifies human potential.',
    description: 'Software, AI systems, automation, and tools for meaningful work.',
    status: 'Forming',
    accent: '#f2e5cd',
    orbit: { radius: 36, duration: 96, startAngle: 304 },
    projects: [],
  },
  {
    id: 'media',
    name: 'Divergent Media',
    role: 'Culture',
    mission: 'Create ideas and stories that shape culture.',
    description: 'Books, films, music, art, games, and enduring intellectual property.',
    status: 'Active',
    accent: '#d6a76c',
    orbit: { radius: 58, duration: 132, startAngle: 112 },
    projects: [
      {
        name: 'Revelation',
        href: 'https://revelation.divergent.world',
        description: 'The first world of Divergent Media.',
      },
    ],
  },
  {
    id: 'design',
    name: 'Divergent Design',
    role: 'Products',
    mission: 'Design intentional products that improve everyday life.',
    description: 'Fashion, furniture, architecture, objects, and future hardware.',
    status: 'Forming',
    accent: '#7c2f2d',
    orbit: { radius: 80, duration: 174, startAngle: 226 },
    projects: [],
  },
]

export const UNIVERSE_ENTRIES: readonly UniverseEntry[] = [
  DIVERGENT_WORLD,
  ...DIVISIONS,
]

export function getUniverseEntry(id: string | null): UniverseEntry {
  return UNIVERSE_ENTRIES.find((entry) => entry.id === id) ?? DIVERGENT_WORLD
}
```

- [ ] **Step 5: Run the model checks**

Run:

```bash
npm test
npm run typecheck
```

Expected: all three tests PASS and TypeScript exits 0.

- [ ] **Step 6: Commit the model**

```bash
git add package.json lib/universe.ts tests/universe.test.ts
git commit -m "feat: model public Divergent World universe"
```

---

### Task 2: Lightweight Procedural Black Hole

**Files:**
- Create: `app/components/black-hole/render-profile.ts`
- Create: `app/components/black-hole/black-hole-shaders.ts`
- Create: `app/components/black-hole/BlackHoleCanvas.tsx`
- Modify: `tests/universe.test.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: no product state and no navigation callbacks.
- Produces: default React component `BlackHoleCanvas({ reducedMotion })`, where `reducedMotion` is a boolean.
- Consumed by: a browser-only dynamic import in `UniverseExperience.tsx`.

- [ ] **Step 1: Add a failing render-profile test**

Append to `tests/universe.test.ts`:

```ts
import { BLACK_HOLE_RENDER_PROFILE } from '../app/components/black-hole/render-profile.ts'

test('keeps the mobile renderer inside its performance budget', () => {
  assert.equal(BLACK_HOLE_RENDER_PROFILE.maxDpr, 1.35)
  assert.equal(BLACK_HOLE_RENDER_PROFILE.visibleMeshCount, 5)
  assert.ok(BLACK_HOLE_RENDER_PROFILE.dustDisk.outerRadius > BLACK_HOLE_RENDER_PROFILE.hotDisk.outerRadius)
  assert.ok(BLACK_HOLE_RENDER_PROFILE.eventHorizon.radius < BLACK_HOLE_RENDER_PROFILE.hotDisk.innerRadius)
})
```

- [ ] **Step 2: Run the test and verify the missing-profile failure**

Run `npm test`.

Expected: FAIL because `render-profile.ts` does not exist.

- [ ] **Step 3: Install only the approved renderer dependencies**

Run:

```bash
npm install three@^0.185.1 @react-three/fiber@^9.6.1
```

Confirm `package.json` has no new dependency other than those two and that the lockfile resolves one Three.js line.

- [ ] **Step 4: Create the immutable public render profile**

Create `app/components/black-hole/render-profile.ts`:

```ts
export const BLACK_HOLE_RENDER_PROFILE = Object.freeze({
  maxDpr: 1.35,
  visibleMeshCount: 5,
  eventHorizon: Object.freeze({ radius: 2.7, widthSegments: 48, heightSegments: 32 }),
  hotDisk: Object.freeze({
    innerRadius: 2.88,
    outerRadius: 5.1,
    angularSegments: 160,
    radialSegments: 7,
    period: 36,
    layer: 0,
    verticalOffset: 0.008,
  }),
  dustDisk: Object.freeze({
    innerRadius: 3.85,
    outerRadius: 7.7,
    angularSegments: 160,
    radialSegments: 7,
    period: 74,
    layer: 1,
    verticalOffset: -0.008,
  }),
  lensShell: Object.freeze({
    radius: 2.84,
    scaleY: 1.12,
    widthSegments: 72,
    heightSegments: 36,
  }),
  fallbackDisk: Object.freeze({
    innerRadius: 2.88,
    outerRadius: 7.7,
    angularSegments: 96,
    opacity: 0.08,
  }),
  doppler: Object.freeze({ minimum: 0.52, maximum: 1.62 }),
  palette: Object.freeze({
    inner: '#fff8e8',
    mid: '#dfb77d',
    outer: '#684633',
    rim: '#f0d9bd',
  }),
})
```

- [ ] **Step 5: Adapt the proven shader module without adding effects**

Create `app/components/black-hole/black-hole-shaders.ts` from the audited shader source:

```bash
cp /Users/alirahman/Documents/divergent.world/src/solar-system/black-hole-shaders.js app/components/black-hole/black-hole-shaders.ts
```

Keep only the three exported constants already present: `BLACK_HOLE_VERTEX_SHADER`, `ACCRETION_FRAGMENT_SHADER`, and `LENSING_FRAGMENT_SHADER`. Do not add texture uniforms, imports, or runtime loaders. The existing three-octave analytic noise and reduced-motion uniform remain unchanged.

- [ ] **Step 6: Implement the transparent five-mesh renderer**

Create `app/components/black-hole/BlackHoleCanvas.tsx`:

```tsx
'use client'

import { useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BLACK_HOLE_RENDER_PROFILE as profile } from './render-profile'
import {
  ACCRETION_FRAGMENT_SHADER,
  BLACK_HOLE_VERTEX_SHADER,
  LENSING_FRAGMENT_SHADER,
} from './black-hole-shaders'

type BlackHoleCanvasProps = {
  reducedMotion: boolean
}

type DiskProfile = typeof profile.hotDisk | typeof profile.dustDisk

function createDiskUniforms(
  disk: DiskProfile,
  time: THREE.IUniform<number>,
  reduced: THREE.IUniform<number>,
) {
  return {
    uTime: time,
    uReducedMotion: reduced,
    uInnerRadius: { value: disk.innerRadius },
    uOuterRadius: { value: disk.outerRadius },
    uLayer: { value: disk.layer },
    uMotionRate: { value: (Math.PI * 2) / disk.period },
    uDopplerMinimum: { value: profile.doppler.minimum },
    uDopplerMaximum: { value: profile.doppler.maximum },
    uInnerColor: { value: new THREE.Color(profile.palette.inner) },
    uMidColor: { value: new THREE.Color(profile.palette.mid) },
    uOuterColor: { value: new THREE.Color(profile.palette.outer) },
    uRimColor: { value: new THREE.Color(profile.palette.rim) },
  }
}

function BlackHole({ reducedMotion }: BlackHoleCanvasProps) {
  const time = useMemo<THREE.IUniform<number>>(() => ({ value: 0 }), [])
  const reduced = useMemo<THREE.IUniform<number>>(
    () => ({ value: reducedMotion ? 1 : 0 }),
    [],
  )
  const hotUniforms = useMemo(
    () => createDiskUniforms(profile.hotDisk, time, reduced),
    [reduced, time],
  )
  const dustUniforms = useMemo(
    () => createDiskUniforms(profile.dustDisk, time, reduced),
    [reduced, time],
  )
  const lensUniforms = useMemo(
    () => ({
      uInnerColor: { value: new THREE.Color(profile.palette.inner) },
      uMidColor: { value: new THREE.Color(profile.palette.mid) },
      uRimColor: { value: new THREE.Color(profile.palette.rim) },
    }),
    [],
  )

  useEffect(() => {
    reduced.value = reducedMotion ? 1 : 0
  }, [reduced, reducedMotion])

  useFrame((_, delta) => {
    if (!reducedMotion) time.value += Math.min(delta, 0.1)
  })

  return (
    <group rotation={[-0.08, 0.16, 0]}>
      <mesh name="event-horizon">
        <sphereGeometry
          args={[
            profile.eventHorizon.radius,
            profile.eventHorizon.widthSegments,
            profile.eventHorizon.heightSegments,
          ]}
        />
        <meshBasicMaterial color="#000000" toneMapped={false} />
      </mesh>

      <mesh name="accretion-fallback" rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry
          args={[
            profile.fallbackDisk.innerRadius,
            profile.fallbackDisk.outerRadius,
            profile.fallbackDisk.angularSegments,
          ]}
        />
        <meshBasicMaterial
          color={profile.palette.mid}
          transparent
          opacity={profile.fallbackDisk.opacity}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh
        name="accretion-hot"
        position={[0, profile.hotDisk.verticalOffset, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        renderOrder={2}
      >
        <ringGeometry
          args={[
            profile.hotDisk.innerRadius,
            profile.hotDisk.outerRadius,
            profile.hotDisk.angularSegments,
            profile.hotDisk.radialSegments,
          ]}
        />
        <shaderMaterial
          uniforms={hotUniforms}
          vertexShader={BLACK_HOLE_VERTEX_SHADER}
          fragmentShader={ACCRETION_FRAGMENT_SHADER}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh
        name="accretion-dust"
        position={[0, profile.dustDisk.verticalOffset, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        renderOrder={1}
      >
        <ringGeometry
          args={[
            profile.dustDisk.innerRadius,
            profile.dustDisk.outerRadius,
            profile.dustDisk.angularSegments,
            profile.dustDisk.radialSegments,
          ]}
        />
        <shaderMaterial
          uniforms={dustUniforms}
          vertexShader={BLACK_HOLE_VERTEX_SHADER}
          fragmentShader={ACCRETION_FRAGMENT_SHADER}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh
        name="lens-photon-shell"
        scale={[1, profile.lensShell.scaleY, 1]}
        renderOrder={3}
      >
        <sphereGeometry
          args={[
            profile.lensShell.radius,
            profile.lensShell.widthSegments,
            profile.lensShell.heightSegments,
          ]}
        />
        <shaderMaterial
          uniforms={lensUniforms}
          vertexShader={BLACK_HOLE_VERTEX_SHADER}
          fragmentShader={LENSING_FRAGMENT_SHADER}
          transparent
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

export default function BlackHoleCanvas({ reducedMotion }: BlackHoleCanvasProps) {
  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, profile.maxDpr]}
      camera={{ fov: 38, near: 0.01, far: 80, position: [0, 8.2, 15.8] }}
      fallback={null}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <BlackHole reducedMotion={reducedMotion} />
    </Canvas>
  )
}
```

- [ ] **Step 7: Verify renderer contracts**

Run:

```bash
npm test
npm run typecheck
npm run build
```

Expected: render-profile tests PASS, TypeScript exits 0, and Next.js completes a production build without server-side `window`, WebGL, or Canvas errors.

- [ ] **Step 8: Commit the renderer**

```bash
git add package.json package-lock.json tests/universe.test.ts app/components/black-hole
git commit -m "feat: add procedural black hole renderer"
```

---

### Task 3: Interactive Universe and Founder-Led Landing Page

**Files:**
- Create: `app/components/UniverseExperience.tsx`
- Create: `public/images/ali-rahman.png`
- Modify: `app/page.tsx`
- Modify: `app/page.module.css`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `lib/site.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: `DIVISIONS`, `DIVERGENT_WORLD`, `getUniverseEntry`, and dynamically imported `BlackHoleCanvas`.
- Produces: a native-button universe with stable detail-panel ID `universe-detail`, and a server-rendered founder section using `/images/ali-rahman.png`.

- [ ] **Step 1: Add the supplied portrait unchanged**

Run:

```bash
mkdir -p public/images
cp /Users/alirahman/Desktop/Life/Ali.png public/images/ali-rahman.png
```

Verify its composition before use:

```bash
sips -g pixelWidth -g pixelHeight public/images/ali-rahman.png
shasum -a 256 /Users/alirahman/Desktop/Life/Ali.png public/images/ali-rahman.png
```

Expected: both files report 1024×1024 and identical SHA-256 hashes.

- [ ] **Step 2: Implement the semantic interactive universe**

Create `app/components/UniverseExperience.tsx` with `'use client'` and these exact behaviors:

```tsx
'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, type CSSProperties } from 'react'
import { DIVERGENT_WORLD, DIVISIONS, getUniverseEntry, type UniverseEntryId } from '@/lib/universe'
import styles from '../page.module.css'

const BlackHoleCanvas = dynamic(() => import('./black-hole/BlackHoleCanvas'), {
  ssr: false,
  loading: () => null,
})

export default function UniverseExperience() {
  const [selectedId, setSelectedId] = useState<UniverseEntryId>('world')
  const [reducedMotion, setReducedMotion] = useState(false)
  const selected = getUniverseEntry(selectedId)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return (
    <section className={styles.universeSection} aria-labelledby="universe-title">
      <div className={styles.universeCopy}>
        <p className={styles.eyebrow}>One mission · Three active branches</p>
        <h2 id="universe-title">A world built to compound.</h2>
        <p>Choose a point in the system to see what it creates.</p>
      </div>

      <div className={styles.universeLayout}>
        <div className={styles.stage}>
          <div className={styles.cssBlackHole} aria-hidden="true" />
          <div className={styles.canvasLayer} aria-hidden="true">
            <BlackHoleCanvas reducedMotion={reducedMotion} />
          </div>

          <button
            type="button"
            className={styles.worldControl}
            aria-label="Show Divergent World overview"
            aria-controls="universe-detail"
            aria-expanded={selectedId === 'world'}
            onClick={() => setSelectedId(DIVERGENT_WORLD.id)}
          >
            <span>Divergent World</span>
          </button>

          {DIVISIONS.map((division) => (
            <div
              className={styles.orbit}
              data-selected={selectedId === division.id}
              key={division.id}
              style={{
                '--orbit-radius': `${division.orbit?.radius}%`,
                '--orbit-duration': `${division.orbit?.duration}s`,
                '--orbit-start': `${division.orbit?.startAngle}deg`,
                '--accent': division.accent,
              } as CSSProperties}
            >
              <button
                type="button"
                className={styles.divisionControl}
                aria-controls="universe-detail"
                aria-expanded={selectedId === division.id}
                onClick={() => setSelectedId(division.id)}
              >
                <span className={styles.star} aria-hidden="true" />
                <span className={styles.divisionLabel}>{division.name}</span>
              </button>
            </div>
          ))}
        </div>

        <article id="universe-detail" className={styles.detailPanel} aria-live="polite">
          <p className={styles.eyebrow} role="status">{selected.role} · {selected.status}</p>
          <h3>{selected.name}</h3>
          <p className={styles.mission}>{selected.mission}</p>
          <p>{selected.description}</p>
          {selected.projects.map((project) => (
            <a className={styles.portalLink} href={project.href} key={project.href}>
              <span>{project.description}</span>
              Enter {project.name} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </article>
      </div>
    </section>
  )
}
```

The selected orbit and its counter-rotating control use `animation-play-state: paused`. Other orbits continue moving. Selecting the center changes only `selectedId`; it does not navigate or manipulate focus.

- [ ] **Step 3: Replace the server-rendered page shell**

Replace `app/page.tsx` with:

```tsx
import Image from 'next/image'
import UniverseExperience from './components/UniverseExperience'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.sky} aria-hidden="true">
        <div className={`${styles.starLayer} ${styles.starsStill}`} />
        <div className={`${styles.starLayer} ${styles.starsDrift}`} />
        <div className={`${styles.starLayer} ${styles.starsBright}`} />
      </div>

      <header className={styles.hero}>
        <p className={styles.wordmark}>Divergent.World</p>
        <div className={styles.heroStatement}>
          <p className={styles.eyebrow}>Technology · Media · Design</p>
          <h1>Build what makes us more human.</h1>
          <p>
            Divergent World is an enduring institution creating technologies,
            stories, and products that increase human potential.
          </p>
        </div>
        <a className={styles.skipLink} href="#universe-title">Explore the world ↓</a>
      </header>

      <main>
        <UniverseExperience />

        <section className={styles.founder} aria-labelledby="founder-title">
          <div className={styles.founderImageFrame}>
            <Image
              src="/images/ali-rahman.png"
              alt="Ali Rahman, founder of Divergent World."
              width={1024}
              height={1024}
              sizes="(min-width: 60rem) 58vw, 100vw"
              className={styles.founderImage}
            />
          </div>
          <div className={styles.founderCopy}>
            <p className={styles.eyebrow}>The founder</p>
            <h2 id="founder-title">Founded by Ali Rahman.</h2>
            <p>
              Ali founded Divergent World to build one enduring institution
              across technology, media, and design—an ecosystem made to expand
              human capability, creativity, and independence.
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Divergent World</p>
        <p>One mission · Infinite time horizon</p>
      </footer>
    </div>
  )
}
```

- [ ] **Step 4: Rebuild the visual system from the portrait**

Replace `app/page.module.css` rather than layering overrides on the old single-world composition. Use these fixed design tokens and layout contracts:

```css
.page {
  --ink: #080706;
  --stone: #b7a68f;
  --ivory: #f3eadc;
  --bronze: #b98550;
  --oxblood: #682827;
  --line: rgba(243, 234, 220, 0.16);
  position: relative;
  isolation: isolate;
  overflow: clip;
  background: var(--ink);
  color: var(--ivory);
}

.hero {
  display: grid;
  min-height: 100svh;
  padding: max(1.5rem, env(safe-area-inset-top)) clamp(1.25rem, 5vw, 5rem) 2rem;
  grid-template-rows: auto 1fr auto;
}

.universeLayout,
.founder {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(18rem, 0.8fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 6rem);
}

.stage {
  position: relative;
  width: min(100%, 50rem);
  aspect-ratio: 1;
  margin-inline: auto;
}

.canvasLayer,
.cssBlackHole {
  position: absolute;
  inset: 21%;
  pointer-events: none;
}

.cssBlackHole {
  border-radius: 50%;
  background:
    radial-gradient(circle, #000 0 24%, transparent 25%),
    conic-gradient(from 210deg, #6b432f, #f3dfbf, #7b2e2b, #b98550, #6b432f);
  filter: blur(0.4px) drop-shadow(0 0 2rem rgba(185, 133, 80, 0.28));
  mask: radial-gradient(circle, transparent 0 24%, #000 31% 44%, transparent 62%);
}

.canvasLayer {
  inset: 10%;
}

.orbit {
  position: absolute;
  inset: calc((100% - var(--orbit-radius)) / 2);
  border: 1px solid var(--line);
  border-radius: 50%;
  rotate: var(--orbit-start);
  animation: orbit var(--orbit-duration) linear infinite;
}

.divisionControl {
  position: absolute;
  top: 0;
  left: 50%;
  display: grid;
  min-width: 44px;
  min-height: 44px;
  place-items: center;
  translate: -50% -50%;
  rotate: calc(var(--orbit-start) * -1);
  border: 0;
  background: transparent;
  color: var(--ivory);
  animation: counter-orbit var(--orbit-duration) linear infinite;
  cursor: pointer;
}

.orbit[data-selected="true"],
.orbit[data-selected="true"] .divisionControl,
.orbit:has(.divisionControl:hover),
.orbit:has(.divisionControl:hover) .divisionControl,
.orbit:has(.divisionControl:focus-visible),
.orbit:has(.divisionControl:focus-visible) .divisionControl {
  animation-play-state: paused;
}

.founder {
  width: min(100% - 2.5rem, 90rem);
  margin: clamp(5rem, 12vw, 11rem) auto;
  padding: clamp(1rem, 2vw, 1.5rem);
  border: 1px solid rgba(104, 40, 39, 0.45);
  border-radius: 50% 50% 1rem 1rem / 10% 10% 1rem 1rem;
  background: linear-gradient(145deg, #191411, #33271f 70%, #17110f);
}

.founderImage {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

@media (max-width: 59.999rem) {
  .universeLayout,
  .founder {
    grid-template-columns: 1fr;
  }

  .stage {
    width: min(100%, 38rem);
  }

  .founderImageFrame {
    order: 0;
  }

  .founderCopy {
    order: 1;
  }
}

@keyframes orbit {
  to { rotate: calc(var(--orbit-start) + 360deg); }
}

@keyframes counter-orbit {
  to { rotate: calc(var(--orbit-start) * -1 - 360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .starsDrift,
  .starsBright,
  .orbit,
  .divisionControl {
    animation: none;
  }
}
```

Add the following definitions to that same replacement file. These complete
every class referenced by `page.tsx` and `UniverseExperience.tsx`:

```css
.sky {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(70% 50% at 50% -10%, rgba(185, 133, 80, 0.2), transparent 75%),
    radial-gradient(45% 40% at 5% 70%, rgba(104, 40, 39, 0.14), transparent 80%),
    #080706;
}

.starLayer {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.starsStill { background-image: var(--stars-still); }
.starsDrift {
  background-image: var(--stars-drift);
  animation: breathe 13s ease-in-out infinite alternate;
}
.starsBright {
  background-image: var(--stars-bright);
  animation: breathe 19s ease-in-out 2s infinite alternate-reverse;
}

.wordmark {
  margin: 0;
  font-size: clamp(0.8rem, 0.72rem + 0.3vw, 1rem);
  letter-spacing: 0.34em;
  text-transform: uppercase;
}

.heroStatement {
  align-self: center;
  max-width: 60rem;
  padding-block: 5rem;
}

.heroStatement h1,
.universeCopy h2,
.detailPanel h3,
.founderCopy h2 {
  margin: 0;
  font-family: var(--font-serif);
  font-weight: 400;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.heroStatement h1 {
  max-width: 11ch;
  font-size: clamp(3.4rem, 9vw, 9.5rem);
  line-height: 0.89;
}

.heroStatement > p:last-child {
  max-width: 42rem;
  margin-top: 2rem;
  color: rgba(243, 234, 220, 0.7);
  font-size: clamp(1rem, 1.2vw, 1.25rem);
}

.eyebrow {
  margin: 0 0 1rem;
  color: var(--bronze);
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

.skipLink {
  justify-self: start;
  min-height: 44px;
  color: rgba(243, 234, 220, 0.72);
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-decoration: none;
  text-transform: uppercase;
}

.universeSection {
  min-height: 100svh;
  padding: clamp(5rem, 9vw, 9rem) clamp(1.25rem, 5vw, 5rem);
  border-block: 1px solid var(--line);
  background:
    radial-gradient(circle at 38% 50%, rgba(104, 70, 51, 0.18), transparent 38%),
    rgba(3, 3, 3, 0.64);
}

.universeCopy {
  width: min(100%, 90rem);
  margin: 0 auto clamp(2.5rem, 5vw, 5rem);
}

.universeCopy h2 {
  font-size: clamp(2.5rem, 5vw, 5.5rem);
  line-height: 0.95;
}

.universeCopy > p:last-child {
  max-width: 34rem;
  margin: 1rem 0 0;
  color: rgba(243, 234, 220, 0.62);
}

.universeLayout {
  width: min(100%, 90rem);
  margin-inline: auto;
}

.worldControl {
  position: absolute;
  inset: 40%;
  z-index: 3;
  display: grid;
  min-width: 44px;
  min-height: 44px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--ivory);
  cursor: pointer;
}

.worldControl span {
  position: absolute;
  top: calc(100% + 0.8rem);
  left: 50%;
  width: max-content;
  translate: -50% 0;
  font-size: 0.66rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.star {
  width: 0.72rem;
  height: 0.72rem;
  border-radius: 50%;
  background: var(--accent);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.5),
    0 0 1rem 0.25rem color-mix(in srgb, var(--accent) 48%, transparent);
}

.divisionLabel {
  position: absolute;
  top: calc(100% + 0.35rem);
  left: 50%;
  width: max-content;
  translate: -50% 0;
  color: rgba(243, 234, 220, 0.82);
  font-size: clamp(0.56rem, 1.4vw, 0.7rem);
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.detailPanel {
  position: relative;
  padding: clamp(1.5rem, 3vw, 3rem);
  border: 1px solid rgba(243, 234, 220, 0.18);
  border-radius: 9rem 9rem 0.75rem 0.75rem / 2.25rem 2.25rem 0.75rem 0.75rem;
  background:
    linear-gradient(150deg, rgba(183, 166, 143, 0.13), rgba(20, 15, 12, 0.92)),
    #0f0c0a;
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.08);
}

.detailPanel::before {
  display: block;
  width: 4rem;
  height: 4rem;
  margin: 0 auto clamp(2rem, 4vw, 4rem);
  border: 1px solid rgba(243, 234, 220, 0.3);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(243, 234, 220, 0.22), transparent 68%);
  content: '';
}

.detailPanel h3 {
  font-size: clamp(2.25rem, 4vw, 4.25rem);
  line-height: 0.95;
}

.detailPanel > p:not(.eyebrow) {
  color: rgba(243, 234, 220, 0.62);
}

.mission {
  margin: 1.5rem 0 0.75rem;
  color: var(--ivory) !important;
  font-family: var(--font-serif);
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  line-height: 1.35;
}

.portalLink {
  display: grid;
  gap: 0.45rem;
  min-height: 44px;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(104, 40, 39, 0.8);
  color: var(--ivory);
  font-size: 0.76rem;
  letter-spacing: 0.14em;
  text-decoration: none;
  text-transform: uppercase;
}

.portalLink span:first-child {
  color: rgba(243, 234, 220, 0.55);
  font-family: var(--font-serif);
  font-size: 1rem;
  letter-spacing: 0;
  text-transform: none;
}

.founderImageFrame {
  overflow: hidden;
  border: 1px solid rgba(243, 234, 220, 0.18);
  border-radius: 50% 50% 0.5rem 0.5rem / 8% 8% 0.5rem 0.5rem;
  background: #261e18;
}

.founderCopy {
  padding: clamp(1rem, 3vw, 3rem);
}

.founderCopy h2 {
  font-size: clamp(2.8rem, 5vw, 5.5rem);
  line-height: 0.92;
}

.founderCopy > p:last-child {
  max-width: 34rem;
  margin: 2rem 0 0;
  color: rgba(243, 234, 220, 0.7);
  font-size: clamp(1rem, 1.4vw, 1.2rem);
}

.footer {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem clamp(1.25rem, 5vw, 5rem) max(2rem, env(safe-area-inset-bottom));
  border-top: 1px solid var(--line);
  color: rgba(243, 234, 220, 0.5);
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.hero,
.page > main,
.footer {
  position: relative;
  z-index: 1;
}

.worldControl:focus-visible,
.divisionControl:focus-visible,
.skipLink:focus-visible,
.portalLink:focus-visible {
  outline: 2px solid var(--ivory);
  outline-offset: 5px;
}

@media (max-width: 34rem) {
  .heroStatement h1 { font-size: clamp(3rem, 17vw, 5.4rem); }
  .universeSection { padding-inline: 0.9rem; }
  .stage { width: min(100%, 29rem); }
  .divisionLabel { letter-spacing: 0.1em; }
  .detailPanel { margin-inline: 0.35rem; }
  .founder { width: calc(100% - 1.5rem); }
  .footer { flex-direction: column; }
}

@keyframes breathe {
  from { opacity: 0.48; }
  to { opacity: 1; }
}
```

Use the existing deterministic star variables from `globals.css`; do not
generate DOM stars or add decorative image assets.

- [ ] **Step 5: Update global foundation and metadata**

In `app/globals.css`, retain the reset, screen-reader utility, and deterministic starfield variables. Change the root palette to the new warm tokens, add `scroll-behavior: smooth`, and disable smooth scrolling inside the existing reduced-motion media query. Do not import remote fonts; retain system sans and the existing Iowan/Palatino/Georgia serif stack.

Set `SITE_DESCRIPTION` in `lib/site.ts` to:

```ts
export const SITE_DESCRIPTION =
  'Divergent World builds technologies, media, and products that increase human potential.'
```

In `app/layout.tsx`, change the Open Graph image alt text to:

```ts
alt: 'Divergent World — technology, media, and design orbiting one institution.'
```

Keep `SITE_NAME`, canonical URL, robots, Twitter card, and public R2 URL construction unchanged.

- [ ] **Step 6: Update the repository handoff**

Rewrite the README opening and architecture sections to state:

- The homepage presents Divergent Systems, Divergent Media, and Divergent Design around Divergent World.
- Revelation is the only live outbound world.
- The black hole is a hybrid of a client-only procedural canvas and semantic HTML/CSS controls.
- `/public/images/ali-rahman.png` is the founder portrait and visual reference.
- `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build` are the verification commands.

Remove the obsolete claims that the page ships no application JavaScript and that new destinations are added only through `lib/worlds.ts`.

- [ ] **Step 7: Run automated verification**

Run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
git diff --check
```

Expected: all tests PASS, lint and typecheck exit 0, the Next.js production build succeeds, and the diff check prints nothing.

- [ ] **Step 8: Commit the complete landing page**

```bash
git add app lib/site.ts public/images/ali-rahman.png README.md
git commit -m "feat: build founder-led Divergent World homepage"
```

---

### Task 4: Desktop, iPhone, Motion, and Fallback QA

**Files:**
- Modify if a verified defect is found: `app/page.module.css`
- Modify if a verified defect is found: `app/components/UniverseExperience.tsx`
- Modify if a verified defect is found: `app/components/black-hole/BlackHoleCanvas.tsx`
- Modify if a verified defect is found: `README.md`

**Interfaces:**
- Verifies the complete public surface; produces no new product API.

- [ ] **Step 1: Start the feature branch locally**

Run `npm run dev` and use the printed local URL. If port 3000 is already serving this checkout, reuse it rather than starting a duplicate server.

- [ ] **Step 2: Verify the desktop experience**

At 1440×900, confirm:

- The hero fills the opening viewport and the first heading is readable.
- The black hole shows the hot inner flow, dusty outer flow, black horizon, and lensing arc above the CSS fallback.
- Systems, Media, and Design are all named without hover.
- Each orbit changes position over time.
- Selecting one branch pauses only that orbit and updates `#universe-detail`.
- Selecting Divergent World restores the institutional overview.
- Systems and Design show `Forming` and no links.
- Media shows one `Enter Revelation` link resolving to `https://revelation.divergent.world`.
- The founder section displays the whole square portrait, oculus, arches, and upper-body silhouette beside `Founded by Ali Rahman.`
- The console contains no new application errors.

- [ ] **Step 3: Verify iPhone layout and touch targets**

At 390×844, confirm:

- No element creates horizontal scrolling.
- The WebGL black hole remains present rather than being hidden at 680px.
- All four celestial controls have measured hit boxes at least 44×44 CSS pixels.
- All division labels remain within the viewport at their resting and moving positions.
- The detail panel follows the universe and remains readable after every selection.
- The portrait remains square and uncropped with the founder copy below it.
- Top and bottom content respect safe-area padding.

- [ ] **Step 4: Verify keyboard and reduced motion**

Using only Tab, Shift+Tab, Enter, and Space, confirm every celestial control and the Revelation link are reachable, visibly focused, and operable in DOM order.

Emulate `prefers-reduced-motion: reduce`, reload, and confirm the three orbits remain at their authored start angles while the shader time and star breathing are frozen. Confirm the controls and information panel behave identically.

- [ ] **Step 5: Verify graceful WebGL fallback**

Run the page in a browser session with WebGL disabled. Confirm the CSS black hole remains visible, all four semantic controls work, all three descriptions render, and Revelation remains reachable. Re-enable WebGL after the check.

- [ ] **Step 6: Fix only observed defects and repeat the affected check**

Limit any correction to the three files named in this task. Do not add features during QA. Record the concrete defect and the viewport or interaction that exposed it in the final handoff.

- [ ] **Step 7: Run the final gate**

```bash
npm test
npm run lint
npm run typecheck
npm run build
git diff --check
git status --short --branch
```

Expected: every command succeeds; the only working-tree changes are explicit QA corrections, if any.

- [ ] **Step 8: Commit QA corrections only when present**

If Step 6 changed files:

```bash
git add app/page.module.css app/components/UniverseExperience.tsx app/components/black-hole/BlackHoleCanvas.tsx README.md
git commit -m "fix: polish responsive universe experience"
```

If Step 6 required no change, do not create an empty commit.
