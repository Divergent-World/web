# Fluid 3D Divergent World Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the first-pass editorial homepage with a visual-first, full-viewport 3D universe featuring reliable celestial selection, camera flights, drag and pinch controls, Magic 8-Ball-style surfacing information, fixed navigation, and a borderless founder portrait.

**Architecture:** A server-rendered page supplies navigation, public copy, the founder composition, and the accessible shell. One client boundary owns selection and mounts a React Three Fiber scene containing the procedural black hole, particle halo, 3D branches, orbital simulation, direct hit targets, and a Three.js camera controller; a fixed HTML index mirrors every canvas selection. Pure scene functions define motion and camera behavior, while CSS supplies the surfacing annotation, visual dissolves, responsive layout, and WebGL fallback.

**Tech Stack:** Next.js 16, React 19, TypeScript 6, Three.js, React Three Fiber, CSS Modules, Node's built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-03-divergent-homepage-overhaul-design.md`

## Global Constraints

- Work directly on `codex/divergent-homepage-overhaul`; do not create a worktree.
- Keep `https://revelation.divergent.world` as the only public project destination.
- Do not embed, download, or redistribute the AliRahman.com GLB.
- Do not expose private archive content, cockpit telemetry, or personal operating details.
- Do not alter `public/images/ali-rahman.png`; only change its presentation.
- Do not add Drei, post-processing, animation, gesture, UI, analytics, CMS, or data-fetching dependencies.
- Cap WebGL device-pixel ratio at `1.35`.
- Keep headings at `18–28px` desktop and `17–23px` mobile; keep navigation and metadata at `9–12px`.
- Avoid cards, framed panels, pills, hard section boundaries, and rectangular image edges.
- Preserve at least `44px × 44px` HTML touch targets and a functional no-WebGL fallback.
- The complete 3D scene must remain present at `390px` viewport width.
- `prefers-reduced-motion: reduce` freezes ambient motion and makes camera and annotation transitions immediate.

---

### Task 1: Define the Testable 3D Scene Model

**Files:**
- Create: `app/components/universe/scene-model.ts`
- Modify: `lib/universe.ts`
- Create: `tests/scene-model.test.ts`
- Modify: `tests/universe.test.ts`

**Interfaces:**
- Consumes: `UniverseEntry`, `UniverseEntryId`, and `DIVISIONS` from `lib/universe.ts`.
- Produces: `OVERVIEW_CAMERA`, `CAMERA_FLIGHT_SECONDS`, `getCameraDestination()`, `getCameraFlightProgress()`, `getParticleCount()`, `createSeededHaloPositions()`, and `advanceOrbitPhase()`.
- Produces updated orbit data with 3D fields `{ distance, period, inclination,
  startAngle }` plus temporary `radius` and `duration` aliases retained only
  until Task 4 removes the CSS-orbit implementation.

- [ ] **Step 1: Write failing scene-model tests**

Create `tests/scene-model.test.ts`:

```ts
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
} from '../app/components/universe/scene-model.ts'

test('camera destinations offset from the selected world position', () => {
  assert.deepEqual(
    getCameraDestination('media', [8, 2, -4]),
    { position: [12.8, 4.2, 2.2], target: [8, 2, -4] },
  )
})

test('camera easing is bounded and reduced motion resolves immediately', () => {
  assert.equal(getCameraFlightProgress(-1, false), 0)
  assert.equal(getCameraFlightProgress(CAMERA_FLIGHT_SECONDS, false), 1)
  assert.equal(getCameraFlightProgress(0, true), 1)
  assert.deepEqual(OVERVIEW_CAMERA.target, [0, 0, 0])
})

test('particle budgets stay lower on narrow screens', () => {
  assert.equal(getParticleCount(390), 240)
  assert.equal(getParticleCount(1440), 520)
})

test('seeded halo positions are deterministic and outside the event horizon', () => {
  const first = createSeededHaloPositions(8, 73)
  const second = createSeededHaloPositions(8, 73)
  assert.deepEqual(first, second)
  assert.equal(first.length, 24)
  for (let index = 0; index < first.length; index += 3) {
    const radius = Math.hypot(first[index], first[index + 1], first[index + 2])
    assert.ok(radius >= 7.5 && radius <= 17.5)
  }
})

test('orbit motion advances without a selected-state pause flag', () => {
  const next = advanceOrbitPhase(Math.PI, 1, 120, false)
  assert.ok(next > Math.PI)
  assert.equal(advanceOrbitPhase(Math.PI, 1, 120, true), Math.PI)
})
```

Update `tests/universe.test.ts` to assert that every division has `distance`,
`period`, `inclination`, and `startAngle`, and that no division record contains
`paused` or `selected` state. Keep the existing renderer-budget assertion until
Task 2 moves it into a focused test file.

- [ ] **Step 2: Run the tests and verify the expected failure**

Run:

```bash
npm test
```

Expected: FAIL because `app/components/universe/scene-model.ts` does not exist and
the current orbit records expose `radius` and `duration` instead of 3D geometry.

- [ ] **Step 3: Implement the pure scene model and 3D orbit data**

Create `app/components/universe/scene-model.ts` with these exports:

```ts
import type { UniverseEntryId } from '@/lib/universe'

export const CAMERA_FLIGHT_SECONDS = 1.8

export const OVERVIEW_CAMERA = Object.freeze({
  position: [0, 23, 52] as const,
  target: [0, 0, 0] as const,
  fov: 38,
  minDistance: 9,
  maxDistance: 86,
})

const CAMERA_OFFSETS: Record<UniverseEntryId, readonly [number, number, number]> = {
  world: [13, 6, 18],
  systems: [4.2, 2, 5.8],
  media: [4.8, 2.2, 6.2],
  design: [4.4, 2.1, 6],
}

export function getCameraDestination(
  id: UniverseEntryId,
  worldTarget: readonly [number, number, number],
) {
  const offset = CAMERA_OFFSETS[id]
  return {
    position: worldTarget.map((value, index) =>
      Number((value + offset[index]).toFixed(2)),
    ) as [number, number, number],
    target: [...worldTarget] as [number, number, number],
  }
}

export function getCameraFlightProgress(elapsed: number, reducedMotion: boolean) {
  if (reducedMotion) return 1
  const linear = Math.min(1, Math.max(0, elapsed / CAMERA_FLIGHT_SECONDS))
  return linear < 0.5
    ? 4 * linear * linear * linear
    : 1 - Math.pow(-2 * linear + 2, 3) / 2
}

export function getParticleCount(viewportWidth: number) {
  return viewportWidth <= 680 ? 240 : 520
}

export function createSeededHaloPositions(count: number, seed = 73) {
  let value = seed >>> 0
  const positions: number[] = []
  const random = () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
  while (positions.length < count * 3) {
    const radius = 7.5 + random() * 10
    const theta = random() * Math.PI * 2
    const cosine = random() * 2 - 1
    const sine = Math.sqrt(1 - cosine * cosine)
    positions.push(
      Math.cos(theta) * sine * radius,
      cosine * radius,
      Math.sin(theta) * sine * radius,
    )
  }
  return positions
}

export function advanceOrbitPhase(
  phase: number,
  delta: number,
  period: number,
  reducedMotion: boolean,
) {
  if (reducedMotion) return phase
  return phase + (Math.min(delta, 0.1) / period) * Math.PI * 2
}
```

Change `UniverseEntry.orbit` in `lib/universe.ts` to:

```ts
orbit?: {
  distance: number
  period: number
  inclination: number
  startAngle: number
  /** Removed with the CSS orbit markup in Task 4. */
  radius: number
  /** Removed with the CSS orbit markup in Task 4. */
  duration: number
}
```

Use these division values:

```ts
systems: { distance: 12, period: 96, inclination: 8, startAngle: 304, radius: 36, duration: 96 }
media: { distance: 17, period: 132, inclination: -11, startAngle: 112, radius: 58, duration: 132 }
design: { distance: 22, period: 174, inclination: 17, startAngle: 226, radius: 80, duration: 174 }
```

- [ ] **Step 4: Run the tests and type checker**

Run:

```bash
npm test
npm run typecheck
```

Expected: all tests PASS and type checking reports no errors. The temporary
`radius` and `duration` aliases keep the current page valid until Task 4 removes
the CSS-orbit markup and aliases together.

- [ ] **Step 5: Commit the scene model**

```bash
git add app/components/universe/scene-model.ts lib/universe.ts tests/scene-model.test.ts tests/universe.test.ts
git commit -m "feat: define interactive universe scene model"
```

---

### Task 2: Turn the Procedural Black Hole into a Soft Hybrid Renderer

**Files:**
- Create: `app/components/black-hole/BlackHole.tsx`
- Modify: `app/components/black-hole/BlackHoleCanvas.tsx`
- Modify: `app/components/black-hole/black-hole-shaders.ts`
- Modify: `app/components/black-hole/render-profile.ts`
- Create: `tests/render-profile.test.ts`
- Modify: `tests/universe.test.ts`

**Interfaces:**
- Consumes: existing shader strings and `BLACK_HOLE_RENDER_PROFILE`.
- Consumes: `createSeededHaloPositions()` and `getParticleCount()` from Task 1.
- Produces: `BlackHole({ reducedMotion })`, a canvas-independent R3F group that
  reads responsive viewport width through `useThree()` and can live inside the
  complete scene.

- [ ] **Step 1: Add failing hybrid-renderer profile tests**

Move the existing renderer-budget test and import out of
`tests/universe.test.ts` into a new `tests/render-profile.test.ts`, then extend
it with:

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { BLACK_HOLE_RENDER_PROFILE as profile } from '../app/components/black-hole/render-profile.ts'

test('keeps the mobile renderer inside its performance budget', () => {
  assert.equal(profile.maxDpr, 1.35)
  assert.equal(profile.visibleMeshCount, 5)
})

test('hybrid black hole fades before the geometry boundary', () => {
  assert.ok(profile.hotDisk.fadeStart < profile.hotDisk.outerRadius)
  assert.ok(profile.dustDisk.fadeStart < profile.dustDisk.outerRadius)
  assert.ok(profile.halo.innerRadius > profile.eventHorizon.radius)
  assert.ok(profile.halo.outerRadius > profile.dustDisk.outerRadius)
  assert.equal(profile.visibleObjectCount, 6)
})
```

- [ ] **Step 2: Run the renderer test and verify the expected failure**

Run:

```bash
node --test tests/render-profile.test.ts
```

Expected: FAIL because `fadeStart`, `halo`, and `visibleObjectCount` do not
exist.

- [ ] **Step 3: Extend the render profile**

Add the following values to `render-profile.ts`:

```ts
visibleMeshCount: 5,
visibleObjectCount: 6,
halo: {
  innerRadius: 7.5,
  outerRadius: 17.5,
  size: 0.12,
  opacity: 0.5,
},
```

Set `hotDisk.fadeStart` to `4.6` and `dustDisk.fadeStart` to `7.0`, both below
their existing outer radii.

- [ ] **Step 4: Make disk alpha dissolve at both radial boundaries**

Pass `uFadeStart` from `createDiskUniforms()` and replace the fragment shader's
hard outer termination with two smooth masks:

```glsl
uniform float uFadeStart;

float innerFade = smoothstep(uInnerRadius, uInnerRadius + 0.42, radius);
float outerFade = 1.0 - smoothstep(uFadeStart, uOuterRadius, radius);
float radialAlpha = innerFade * outerFade;

gl_FragColor = vec4(color, opacity * radialAlpha);
```

Keep the existing turbulence, palette mixing, and Doppler calculation. Do not
add post-processing or a texture.

- [ ] **Step 5: Extract the black-hole group and add the particle halo**

Move the five existing meshes from `BlackHoleCanvas.tsx` into
`BlackHole.tsx`. Keep `BlackHoleCanvas.tsx` as its existing Canvas wrapper but
replace its internal mesh group with `<BlackHole reducedMotion={reducedMotion}
/>`; Task 4 deletes the wrapper after the new scene is connected. Inside
`BlackHole`, read `const viewportWidth = useThree((state) => state.size.width)`
so the particle budget follows canvas resizes. Add one non-raycastable points
system:

```tsx
const positions = useMemo(
  () => new Float32Array(createSeededHaloPositions(getParticleCount(viewportWidth))),
  [viewportWidth],
)

<points raycast={() => null} rotation={[-0.08, 0.16, 0]} scale={[1, 0.55, 1]}>
  <bufferGeometry>
    <bufferAttribute attach="attributes-position" args={[positions, 3]} />
  </bufferGeometry>
  <pointsMaterial
    color={profile.palette.rim}
    size={profile.halo.size}
    sizeAttenuation
    transparent
    opacity={profile.halo.opacity}
    depthWrite={false}
    blending={THREE.AdditiveBlending}
    toneMapped={false}
  />
</points>
```

Animate the disk uniforms exactly as the current component does. Rotate the
halo by no more than `delta * 0.008`; skip both updates under reduced motion.

- [ ] **Step 6: Run renderer tests, lint, and type checking**

Run:

```bash
npm test
npm run lint
npm run typecheck
```

Expected: renderer tests PASS, lint reports no errors, and type checking reports
no errors.

- [ ] **Step 7: Commit the hybrid renderer**

```bash
git add app/components/black-hole/BlackHole.tsx app/components/black-hole/BlackHoleCanvas.tsx app/components/black-hole/black-hole-shaders.ts app/components/black-hole/render-profile.ts tests/render-profile.test.ts tests/universe.test.ts
git commit -m "feat: soften procedural black hole boundaries"
```

---

### Task 3: Build the Interactive Scene and Tracking Camera

**Files:**
- Create: `app/components/universe/CelestialBody.tsx`
- Create: `app/components/universe/CameraRig.tsx`
- Create: `app/components/universe/UniverseScene.tsx`
- Create: `app/components/universe/UniverseErrorBoundary.tsx`
- Modify: `app/components/universe/scene-model.ts`
- Modify: `tests/scene-model.test.ts`

**Interfaces:**
- Consumes: the scene model from Task 1, `BlackHole` from Task 2, and
  `UniverseEntry` records from `lib/universe.ts`.
- Produces: `UniverseScene({ entries, selectedId, resetSignal, reducedMotion,
  onSelect })`.
- Produces: an object registry mapping `UniverseEntryId` to `THREE.Object3D` for
  camera targeting.

- [ ] **Step 1: Write a failing camera-tracking regression test**

Extend `tests/scene-model.test.ts`:

```ts
// Add getTrackingTranslation to the existing scene-model import.
test('tracking translation preserves the camera offset from a moving target', () => {
  assert.deepEqual(
    getTrackingTranslation([1, 2, 3], [4, 6, 8]),
    [3, 4, 5],
  )
})
```

Run:

```bash
node --test tests/scene-model.test.ts
```

Expected: FAIL because `getTrackingTranslation` is not exported.

- [ ] **Step 2: Implement the tracking translation helper**

Add this pure function to `scene-model.ts`:

```ts
export function getTrackingTranslation(
  previousTarget: readonly [number, number, number],
  nextTarget: readonly [number, number, number],
) {
  return nextTarget.map((value, index) =>
    value - previousTarget[index],
  ) as [number, number, number]
}
```

Run `node --test tests/scene-model.test.ts` and expect PASS.

- [ ] **Step 3: Create the celestial body with a forgiving hit sphere**

Implement `CelestialBody.tsx` with this public shape:

```tsx
type Props = {
  entry: UniverseEntry
  onSelect: (id: UniverseEntryId) => void
  register: (id: UniverseEntryId, node: THREE.Group | null) => void
}

export default function CelestialBody({ entry, onSelect, register }: Props) {
  const select = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onSelect(entry.id)
  }
  return (
    <group ref={(node) => register(entry.id, node)}>
      <mesh onClick={select}>
        <sphereGeometry args={[0.42, 24, 16]} />
        <meshBasicMaterial color={entry.accent} toneMapped={false} />
      </mesh>
      <mesh onClick={select}>
        <sphereGeometry args={[1.35, 12, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  )
}
```

Add this low-opacity emissive shell so the visible body reads against the dark
scene without intercepting clicks:

```tsx
<mesh raycast={() => null}>
  <sphereGeometry args={[0.68, 18, 12]} />
  <meshBasicMaterial
    color={entry.accent}
    transparent
    opacity={0.16}
    blending={THREE.AdditiveBlending}
    depthWrite={false}
    toneMapped={false}
  />
</mesh>
```

- [ ] **Step 4: Implement orbiting nodes in the single R3F animation loop**

In `UniverseScene.tsx`, create one `OrbitingDivision` per entry. Initialize a
phase ref from `entry.orbit.startAngle`, update it through `advanceOrbitPhase()`,
and set the orbital arm's `rotation.y` in `useFrame`. Render an inclined
`lineLoop` with `raycast={() => null}` and place `CelestialBody` at
`entry.orbit.distance`.

```tsx
function OrbitingDivision({ entry, reducedMotion, onSelect, register }: OrbitingProps) {
  const arm = useRef<THREE.Group>(null)
  const orbit = entry.orbit!
  const phase = useRef(THREE.MathUtils.degToRad(orbit.startAngle))

  useFrame((_, delta) => {
    phase.current = advanceOrbitPhase(
      phase.current,
      delta,
      orbit.period,
      reducedMotion,
    )
    if (arm.current) arm.current.rotation.y = phase.current
  })

  return (
    <group rotation={[THREE.MathUtils.degToRad(orbit.inclination), 0, 0]}>
      <OrbitPath radius={orbit.distance} color={entry.accent} />
      <group ref={arm} rotation={[0, phase.current, 0]}>
        <group position={[orbit.distance, 0, 0]}>
          <CelestialBody entry={entry} onSelect={onSelect} register={register} />
        </group>
      </group>
    </group>
  )
}
```

Build `OrbitPath` from 128 deterministic points around a circle and render it
with a transparent `lineBasicMaterial` at opacity `0.1`.

- [ ] **Step 5: Implement direct Three.js controls and camera flight**

In `CameraRig.tsx`, import controls directly:

```ts
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
```

Create one controls instance in `useEffect`, enable damping, rotation, and zoom,
disable pan, and constrain distance with `OVERVIEW_CAMERA.minDistance` and
`OVERVIEW_CAMERA.maxDistance`. Dispose it on unmount.

Store flight and tracking state in refs. On `selectedId` change, capture the
camera's current position and control target. During `useFrame`, obtain the
selected registry node's current world position, call `getCameraDestination()`,
and interpolate with `getCameraFlightProgress()`. After arrival, call
`getTrackingTranslation()` with the previous and current target positions, then
add that translation to the camera and controls target so the camera continues
to track the moving body. An OrbitControls `start` listener clears flight and
tracking refs immediately.

On `resetSignal` change, perform the same flight with `id: null` and the overview
position and target. Under reduced motion, the first frame resolves at progress
`1`.

- [ ] **Step 6: Assemble the full-bleed canvas**

Export this interface from `UniverseScene.tsx`:

```ts
type UniverseSceneProps = {
  entries: readonly UniverseEntry[]
  selectedId: UniverseEntryId
  resetSignal: number
  reducedMotion: boolean
  onSelect: (id: UniverseEntryId) => void
}
```

Use one `<Canvas>` with `dpr={[1, 1.35]}`, the overview camera, transparent
high-performance WebGL, and a `frameloop` that becomes `never` when the document
is hidden. Render the star field, `BlackHole`, all orbiting divisions, and
`CameraRig` within the same scene. Set the canvas class to `universeCanvas` and
its accessible representation to hidden because Task 4 supplies equivalent
HTML buttons. Wrap `BlackHole` in a group registered under the `world` ID so the
camera can focus the institution through the same registry as every division.

```tsx
<group ref={(node) => registerObject('world', node)}>
  <BlackHole reducedMotion={reducedMotion} />
  <mesh
    name="black-hole-hit-target"
    onClick={(event) => {
      event.stopPropagation()
      onSelect('world')
    }}
  >
    <sphereGeometry args={[4.6, 16, 12]} />
    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
  </mesh>
</group>
```

- [ ] **Step 7: Add the WebGL error boundary**

Create `UniverseErrorBoundary.tsx` as a minimal class component:

```tsx
type Props = { children: ReactNode; fallback: ReactNode }
type State = { failed: boolean }

export default class UniverseErrorBoundary extends Component<Props, State> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}
```

Do not add logging, retry state, or an error dialog. The CSS black hole and HTML
controls provide the recovery path.

- [ ] **Step 8: Run the automated checks**

Run:

```bash
npm test
npm run lint
npm run typecheck
```

Expected: all checks PASS. The current page continues using Task 2's
`BlackHoleCanvas` wrapper until Task 4 switches `UniverseExperience` to the new
scene.

- [ ] **Step 9: Commit the interactive scene**

```bash
git add app/components/universe tests/scene-model.test.ts
git commit -m "feat: add navigable 3D universe"
```

---

### Task 4: Replace CSS Orbits with Reliable Selection and Surfacing Answers

**Files:**
- Create: `app/components/universe/selection-model.ts`
- Create: `tests/selection-model.test.ts`
- Modify: `app/components/UniverseExperience.tsx`
- Modify: `app/page.tsx`
- Modify: `app/page.module.css`
- Modify: `lib/universe.ts`
- Modify: `tests/universe.test.ts`
- Delete: `app/components/black-hole/BlackHoleCanvas.tsx`

**Interfaces:**
- Consumes: `UniverseScene` from Task 3 and `DIVERGENT_WORLD`, `DIVISIONS`, and
  `getUniverseEntry()` from `lib/universe.ts`.
- Produces: one shared `select(id)` path for canvas hit targets and fixed HTML
  buttons.
- Produces: `resetSignal`, keyed annotation content, and the static CSS fallback.

- [ ] **Step 1: Write failing shared-selection tests**

Create `tests/selection-model.test.ts`:

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { reduceUniverseSelection } from '../app/components/universe/selection-model.ts'

test('branch selection changes the entry without pausing orbital state', () => {
  assert.deepEqual(
    reduceUniverseSelection({ selectedId: 'world', resetSignal: 0 }, 'media'),
    { selectedId: 'media', resetSignal: 0 },
  )
})

test('world selection increments the camera reset signal', () => {
  assert.deepEqual(
    reduceUniverseSelection({ selectedId: 'design', resetSignal: 2 }, 'world'),
    { selectedId: 'world', resetSignal: 3 },
  )
})
```

Run `node --test tests/selection-model.test.ts` and expect FAIL because the
selection model does not exist.

- [ ] **Step 2: Implement the minimal selection reducer**

Create `selection-model.ts`:

```ts
import type { UniverseEntryId } from '@/lib/universe'

export type UniverseSelection = {
  selectedId: UniverseEntryId
  resetSignal: number
}

export function reduceUniverseSelection(
  state: UniverseSelection,
  selectedId: UniverseEntryId,
): UniverseSelection {
  return {
    selectedId,
    resetSignal: state.resetSignal + Number(selectedId === 'world'),
  }
}
```

Run `node --test tests/selection-model.test.ts` and expect PASS.

- [ ] **Step 3: Replace the first-pass universe component structure**

In `UniverseExperience.tsx`, replace independent state setters with
`useReducer(reduceUniverseSelection, { selectedId: 'world', resetSignal: 0 })`
and define one callback:

```tsx
const [{ selectedId, resetSignal }, dispatch] = useReducer(
  reduceUniverseSelection,
  { selectedId: 'world', resetSignal: 0 },
)
const select = useCallback((id: UniverseEntryId) => dispatch(id), [])
```

Render this structure:

```tsx
<section id="universe" className={styles.universeSection} aria-label="Divergent World universe">
  <div className={styles.cssUniverseFallback} aria-hidden="true" />
  <UniverseErrorBoundary fallback={null}>
    <UniverseScene
      entries={DIVISIONS}
      selectedId={selectedId}
      resetSignal={resetSignal}
      reducedMotion={reducedMotion}
      onSelect={select}
    />
  </UniverseErrorBoundary>
  <div className={styles.sceneIntro}>
    <p>Divergent World · Technology · Media · Design</p>
    <h1>Build what makes us more human.</h1>
    <p>Drag to orbit · Pinch or scroll to move through the system</p>
  </div>
  <nav className={styles.systemIndex} aria-label="Explore the Divergent World system">
    {[DIVERGENT_WORLD, ...DIVISIONS].map((entry) => (
      <button
        key={entry.id}
        type="button"
        aria-pressed={selectedId === entry.id}
        onClick={() => select(entry.id)}
      >
        <span aria-hidden="true" style={{ background: entry.accent }} />
        {entry.name.replace('Divergent ', '')}
      </button>
    ))}
  </nav>
  <article className={styles.annotation} aria-live="polite">
    <div className={styles.annotationSurface} key={selected.id}>
      <p>{selected.role} · {selected.status}</p>
      <h2>{selected.name}</h2>
      <p>{selected.mission}</p>
      {selected.projects.map((project) => (
        <a href={project.href} key={project.href}>Enter {project.name} ↗</a>
      ))}
    </div>
  </article>
</section>
```

Do not render `.orbit`, `.divisionControl`, `.detailPanel`, or any selected-state
animation pause attribute.

- [ ] **Step 4: Remove the temporary CSS-orbit bridge**

Delete `app/components/black-hole/BlackHoleCanvas.tsx`. Remove `radius` and
`duration` from the orbit type and all three records in `lib/universe.ts`, then
update `tests/universe.test.ts` to assert the final exact orbit shape:

```ts
assert.deepEqual(Object.keys(DIVISIONS[0].orbit ?? {}).sort(), [
  'distance',
  'inclination',
  'period',
  'startAngle',
])
```

- [ ] **Step 5: Make the universe full-bleed and text visually subordinate**

Replace the current two-column universe CSS with a `position: relative`,
`min-height: 100svh`, `overflow: clip` scene. Position the canvas and CSS
fallback absolutely at `inset: 0`. Keep the black hole away from viewport edges
through the camera, not a rectangular canvas wrapper.

Use these typography ceilings:

```css
.sceneIntro h1,
.annotation h2 {
  font-size: clamp(1.125rem, 1.5vw, 1.75rem);
}

.sceneIntro p,
.annotation p,
.systemIndex,
.annotation a {
  font-size: clamp(0.5625rem, 0.7vw, 0.75rem);
}

.systemIndex {
  position: absolute;
  z-index: 3;
  bottom: max(1rem, env(safe-area-inset-bottom));
  left: 50%;
  display: flex;
  translate: -50% 0;
}

.systemIndex button {
  display: inline-flex;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: inherit;
}

.annotation {
  position: absolute;
  z-index: 2;
  right: max(1.25rem, env(safe-area-inset-right));
  bottom: max(5.5rem, calc(env(safe-area-inset-bottom) + 4.5rem));
  width: min(20rem, calc(100% - 2.5rem));
  pointer-events: none;
}

.annotation a { pointer-events: auto; }

.cssUniverseFallback {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 50% 48%, transparent 0 7%, #000 7.5% 13%, transparent 13.5%),
    radial-gradient(ellipse at 50% 48%, rgba(243, 234, 220, 0.42), rgba(185, 133, 80, 0.12) 24%, transparent 43%),
    var(--stars-still),
    #080706;
}
```

- [ ] **Step 6: Implement the Magic 8-Ball surface sequence**

Apply this animation to the keyed `.annotationSurface`:

```css
.annotationSurface {
  position: relative;
  isolation: isolate;
  animation:
    surfaceAnswer 900ms cubic-bezier(0.16, 1, 0.3, 1) both,
    floatAnswer 7s ease-in-out 900ms infinite alternate;
  filter: blur(0) drop-shadow(0 0 1.75rem rgba(243, 234, 220, 0.09));
}

.annotationSurface::before {
  position: absolute;
  inset: -3rem;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(243, 234, 220, 0.08), transparent 68%);
  animation: surfaceRipple 900ms ease-out both;
  content: "";
}

@keyframes surfaceAnswer {
  0% { opacity: 0; translate: 0 1.25rem; scale: 0.96; filter: blur(8px) drop-shadow(0 0 0 transparent); }
  66% { opacity: 1; translate: 0 -0.22rem; scale: 1.01; filter: blur(0) drop-shadow(0 0 2rem rgba(243, 234, 220, 0.12)); }
  100% { opacity: 1; translate: 0; scale: 1; filter: blur(0) drop-shadow(0 0 1.75rem rgba(243, 234, 220, 0.09)); }
}

@keyframes floatAnswer {
  from { translate: 0 -1px; }
  to { translate: 0 2px; }
}

@keyframes surfaceRipple {
  from { opacity: 0; scale: 0.72; }
  55% { opacity: 1; }
  to { opacity: 0.22; scale: 1; }
}
```

Do not add a border, filled panel, or literal Magic 8-Ball triangle.

- [ ] **Step 7: Add the fixed public navigation**

Replace the old standalone hero in `app/page.tsx` with a fixed header above the
main content:

```tsx
<header className={styles.siteHeader}>
  <a className={styles.wordmark} href="#universe">Divergent.World</a>
  <nav aria-label="Primary navigation">
    <a href="#universe">Universe</a>
    <a href="#about">About</a>
    <a href="https://revelation.divergent.world">Revelation ↗</a>
  </nav>
</header>
```

Give the header `position: fixed`, a safe-area-aware inset, `z-index` above the
canvas, and a background that fades vertically to transparent without a bottom
border. Keep all visible header type between 9 and 12 pixels.

- [ ] **Step 8: Add reduced-motion behavior**

Under `prefers-reduced-motion: reduce`, remove `surfaceAnswer`, `floatAnswer`,
star drift, and ambient opacity animations. Preserve the final visible state.
The React reduced-motion value already makes shader and orbit motion static and
camera progress immediate.

- [ ] **Step 9: Run checks and perform focused browser interaction QA**

Run:

```bash
npm test
npm run lint
npm run typecheck
```

In the running desktop page verify:

- Each fixed index button changes `aria-pressed`, annotation heading, and camera
  destination.
- Repeated pointer clicks work without a button moving beneath the cursor.
- Canvas star selection invokes the same annotation state.
- Drag interrupts tracking; selecting another object begins a new flight.
- Media exposes exactly one Revelation link.

- [ ] **Step 10: Commit the full-screen interaction**

```bash
git add app/components/UniverseExperience.tsx app/components/universe/selection-model.ts app/components/black-hole/BlackHoleCanvas.tsx app/page.tsx app/page.module.css lib/universe.ts tests/selection-model.test.ts tests/universe.test.ts
git commit -m "feat: make the universe the homepage interface"
```

---

### Task 5: Dissolve the Founder Portrait into the Page

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/page.module.css`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: the unchanged `/images/ali-rahman.png` asset.
- Produces: `#about`, a full-viewport borderless founder composition reachable
  from the fixed navigation.

- [ ] **Step 1: Simplify the founder markup**

Keep the Next.js `Image` but remove `.founderImageFrame` and all container
decoration. Use this section structure:

```tsx
<section id="about" className={styles.founder} aria-labelledby="founder-title">
  <div className={styles.founderVisual}>
    <Image
      src="/images/ali-rahman.png"
      alt="Ali Rahman, founder of Divergent World."
      width={1024}
      height={1024}
      sizes="(min-width: 60rem) 68vw, 100vw"
      className={styles.founderImage}
    />
  </div>
  <div className={styles.founderCopy}>
    <p>The founder</p>
    <h2 id="founder-title">Founded by Ali Rahman.</h2>
    <p>Ali founded Divergent World to build one enduring institution across technology, media, and design—in service of human potential.</p>
  </div>
</section>
```

- [ ] **Step 2: Replace the framed portrait with a radial dissolve**

Use an unbordered visual layer:

```css
.founder {
  position: relative;
  min-height: 100svh;
  overflow: clip;
}

.founderVisual {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at 52% 18%, rgba(243, 234, 220, 0.14), transparent 42%);
}

.founderImage {
  width: min(76vw, 72rem);
  height: auto;
  opacity: 0.88;
  -webkit-mask-image: radial-gradient(ellipse 72% 76% at 50% 48%, #000 45%, rgba(0, 0, 0, 0.86) 62%, transparent 100%);
  mask-image: radial-gradient(ellipse 72% 76% at 50% 48%, #000 45%, rgba(0, 0, 0, 0.86) 62%, transparent 100%);
}

.founderVisual::after {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 78%, transparent 20%, rgba(8, 7, 6, 0.34) 62%, #080706 94%),
    linear-gradient(to bottom, #080706 0%, transparent 18% 70%, #080706 100%);
  pointer-events: none;
  content: "";
}
```

Do not apply a border, border radius, panel background, or box shadow to the
section or image.

- [ ] **Step 3: Place fine-print founder copy over negative space**

Position `.founderCopy` above the image near a lower safe-area corner on
desktop, then return it to normal flow near the bottom on mobile. Cap the
founder heading at `1.5rem` desktop and `1.35rem` mobile; cap the paragraph at
`0.75rem` with a readable `1.65` line height.

```css
.founderCopy {
  position: absolute;
  z-index: 2;
  right: max(1.25rem, env(safe-area-inset-right));
  bottom: max(2rem, env(safe-area-inset-bottom));
  width: min(22rem, calc(100% - 2.5rem));
}

.founderCopy h2 { font-size: clamp(1.125rem, 1.5vw, 1.5rem); }
.founderCopy p { font-size: clamp(0.625rem, 0.75vw, 0.75rem); line-height: 1.65; }

@media (max-width: 34rem) {
  .founderCopy {
    right: auto;
    bottom: max(1.5rem, env(safe-area-inset-bottom));
    left: 1.25rem;
  }
  .founderCopy h2 { font-size: 1.35rem; }
}
```

- [ ] **Step 4: Remove obsolete architectural-card CSS and global variables**

Delete unused `.hero`, `.heroStatement`, `.skipLink`, `.universeLayout`,
`.stage`, `.orbit`, `.divisionControl`, `.detailPanel`, `.founderImageFrame`, and
their animations. Remove only global custom properties that have no remaining
reference. Keep the deterministic star data if the CSS fallback still uses it.

- [ ] **Step 5: Verify desktop and 390px composition**

At desktop width, verify the complete oculus, Ali, and architectural background
remain legible while every image edge dissolves. At `390 × 844`, verify:

- No horizontal overflow.
- The image remains the dominant element.
- The founder heading stays at or below `23px`.
- Navigation remains available.
- The About anchor does not hide the heading beneath the fixed header.

- [ ] **Step 6: Commit the founder dissolve**

```bash
git add app/page.tsx app/page.module.css app/globals.css
git commit -m "feat: dissolve founder portrait into the homepage"
```

---

### Task 6: Documentation, Fallback, and Final Verification

**Files:**
- Modify: `README.md`
- Modify: `app/page.module.css`
- Modify: `app/components/universe/UniverseScene.tsx`
- Modify: `app/components/universe/CameraRig.tsx`

**Interfaces:**
- Consumes: the finished scene and page.
- Produces: accurate repository documentation and a verified feature branch.

- [ ] **Step 1: Update the README architecture description**

Document that the canvas now owns the black hole, particles, orbit paths, and
celestial bodies; the fixed HTML index mirrors selection; Three.js controls
provide drag and pinch interaction; and the CSS fallback preserves the system
index and Revelation link when WebGL is unavailable. Remove any claim that CSS
owns the moving orbits.

- [ ] **Step 2: Run the full automated verification suite**

Run each command and require exit code `0`:

```bash
npm test
npm run lint
npm run typecheck
npm run build
git diff --check
```

- [ ] **Step 3: Inspect browser console errors**

Read the local homepage's browser console after loading, selecting all four
objects, resetting, and navigating to About. Expected: no new application
errors, WebGL warnings, hydration mismatches, or failed local assets.

- [ ] **Step 4: Complete desktop browser QA**

Verify at the normal desktop viewport:

- Fixed navigation reaches Universe and About and exposes Revelation.
- The black hole has no rectangular clipping and its halo fades into space.
- Pointer drag rotates; wheel or trackpad changes camera distance within bounds.
- Each 3D body and each fixed index button selects the same record.
- Camera flight tracks a moving selected body and manual input interrupts it.
- The annotation performs one submerged-to-surfaced reveal per selection.
- Founder imagery has no card, outline, hard crop, or visible mask edge.

- [ ] **Step 5: Complete mobile browser QA**

Set the viewport to `390 × 844` and verify:

- Canvas remains present at full viewport height.
- Document width equals viewport width.
- Header destinations remain visible and usable.
- Every fixed index button is at least `44 × 44` CSS pixels.
- Canvas star hit targets select reliably.
- Founder image loads, dominates the viewport, and dissolves at every edge.
- Typography stays within the specification's maximum sizes.

If the connected browser cannot synthesize a two-finger gesture, report pinch
as requiring physical-device confirmation. Do not claim it was exercised.

- [ ] **Step 6: Verify reduced-motion and forced fallback states**

With reduced motion enabled, confirm orbital, shader, halo, starfield, and
annotation animation are static and camera changes are immediate. With WebGL
disabled or the scene boundary forced to its fallback during local QA, confirm
the CSS black hole, system index, annotation, About navigation, and Revelation
link remain usable.

- [ ] **Step 7: Commit documentation and evidence-driven fixes**

```bash
git add README.md app/page.module.css app/components/universe/UniverseScene.tsx app/components/universe/CameraRig.tsx
git commit -m "docs: describe the interactive Divergent World universe"
```

- [ ] **Step 8: Inspect the final branch state**

Run:

```bash
git status --short
git log --oneline --decorate -10
```

Expected: clean status on `codex/divergent-homepage-overhaul`, with the revised
design, plan, scene model, hybrid renderer, interactive scene, fluid page, and
documentation commits visible. Do not merge, push, deploy, or open a pull
request without a separate user choice.
