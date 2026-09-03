# Divergent World Homepage Overhaul Design

**Date:** 2026-09-03
**Revision:** 2
**Status:** Approved direction, pending written-spec review

## Purpose

Rebuild the public Divergent World homepage as a visual-first, interactive
gateway to one institution and its three active branches: Divergent Systems,
Divergent Media, and Divergent Design.

The first implementation proved the public content model and procedural shader,
but its editorial scale, card-shaped surfaces, CSS orbits, and decorative-only
canvas do not match the intended experience. Revision 2 makes the universe the
interface. Text becomes quiet annotation, imagery dissolves into its
surroundings, and the scene becomes a genuine three-dimensional control surface
with camera movement, direct selection, drag rotation, and mobile pinch zoom.

Revelation remains the only live outbound world in this release and belongs to
Divergent Media. The supplied portrait introduces Ali Rahman explicitly as the
founder without exposing private cockpit content.

## Public Story

Divergent World is the central institution. Its three visible branches express
the initial public sequence documented in the architecture materials:

- Divergent Systems creates capability through software, AI, and technology.
- Divergent Media creates culture through ideas, stories, and intellectual
  property. Revelation is its first live world.
- Divergent Design creates intentional products that improve everyday life.

Divergent Ventures and Divergent Properties remain outside this public release.
No placeholder destinations are invented for branches that do not yet have a
public site.

## Experience Principles

### Visuals carry the page

The black hole, moving celestial bodies, light, particles, and founder portrait
occupy most of the screen. Copy behaves like museum notation or legal fine
print: precise, sparse, and subordinate to the visual experience.

Display headings remain between 18 and 28 CSS pixels on desktop and between 17
and 23 pixels on mobile. Navigation, labels, status text, and metadata remain
between 9 and 12 pixels with generous tracking. No viewport-filling headline is
used.

### Surfaces dissolve instead of ending

Avoid cards, framed panels, pills, obvious containers, hard section borders,
and rectangular image edges. Depth comes from opacity, light, blur, scale, and
overlap. Elements should appear to surface from darkness and recede into it,
like objects moving through water.

### Interaction remains alive

The universe does not stop when an item receives focus. Orbits continue unless
the visitor requests reduced motion. Selecting an object changes the camera and
annotation state without turning the star into a frozen HTML control.

### Information surfaces like an answer

Selection should evoke a Magic 8-Ball rather than opening a conventional UI
panel. New information begins visually submerged: slightly lower, smaller,
blurred, dim, and distorted by a restrained refractive shimmer. It then rises
through the darkness, crosses into sharp focus with a small buoyant overshoot,
and settles into a slow floating state.

The movement suggests an answer reaching the surface of dark water. It must not
become a literal blue triangle, novelty toy imitation, modal, tooltip, or framed
card.

## Visual Direction

The founder portrait remains the source of the visual language:

- The overhead oculus informs the event horizon and orbital geometry.
- Limestone, ivory light, bronze reflections, and muted oxblood warm the black
  environment.
- Ali's tailored black clothing establishes the tonal depth and restraint.
- Architectural curvature appears through light falloff and masked silhouettes,
  not borders or novelty-shaped cards.
- Negative space is active and atmospheric rather than empty.

The live black hole at `alirahman.com` contributes a soft concentric silhouette
and diffuse particle halo. It is a visual reference only. Its GLB is not fetched
or embedded by the public Divergent World homepage.

Avoid glassmorphism, saturated cyberpunk color, corporate card grids, large
marketing headlines, hard rectangular cropping, and indiscriminate glow.

## Page Structure

### Persistent navigation

A fixed, translucent navigation line remains visible above the experience. It
contains:

- `Divergent.World`, which returns the camera to the institutional overview.
- `Universe`, which moves to the interactive scene.
- `About`, which moves to the founder composition.
- `Revelation ↗`, which links directly to
  `https://revelation.divergent.world`.

The navigation uses small, widely tracked type and safe-area padding. On mobile
it keeps the same destinations without introducing a menu drawer; the labels
are short enough to fit and direct access is more useful than another control.

### Full-viewport universe

The first screen is the universe itself. A full-bleed React Three Fiber canvas
fills at least one small viewport height beneath the navigation. Divergent World
is the central black hole. Systems, Media, and Design are three actual 3D
celestial bodies following inclined orbital paths.

A compact statement and gesture hint sit at the lower edges of the scene. They
never compete with the black hole. A minimal system index provides fixed HTML
controls for World, Systems, Media, and Design. It remains visually quiet but
ensures reliable touch and keyboard access even while the 3D bodies move.

### Selected-object annotation

Selection reveals a small, borderless annotation layer rather than a card. It
contains the selected name, role, status, one-sentence mission, and optional
action. Divergent Media exposes `Enter Revelation`; the other branches do not
pretend to have destinations.

The annotation is keyed to the selected object so each new answer performs one
surface sequence:

1. `Submerged`: low opacity, approximately 8 pixels of blur, slightly reduced
   scale, and a lower vertical position.
2. `Breaking the surface`: opacity rises, blur clears, and the content passes
   its resting position by a few pixels with a brief light ripple.
3. `Floating`: the content returns to its resting position and continues a very
   slow one-to-two-pixel buoyant drift.

CSS keyframes provide this movement without an animation dependency or
per-frame React state. The annotation does not resize the scene or create an
opaque panel beside it.

### Founder composition

The About section follows the universe as another predominantly visual
viewport. The supplied portrait is large, borderless, and uncropped enough to
retain the overhead oculus, arches, human figure, and surrounding architecture.

CSS mask gradients soften every edge into the page background. Layered ambient
gradients and a low-opacity foreground haze make the portrait appear partly
submerged in the environment. No card background, outline, inset border, or
decorative arch container remains.

`Founded by Ali Rahman` appears as small display text with one concise paragraph
explaining that he founded Divergent World to build an enduring institution
across technology, media, and design in service of human potential.

## Interactive Universe Architecture

### One 3D scene

The canvas owns the black hole, particle field, orbit paths, and celestial
bodies. CSS no longer animates moving buttons over a separately rendered
canvas. This removes the two unsynchronized animation systems that caused hit
targets to move under the pointer and remain paused after focus.

The canvas remains a client-only boundary. The navigation, system index,
annotation, founder copy, and Revelation link remain ordinary server-rendered
HTML so the page retains meaningful content before WebGL loads.

### Hybrid black hole

The renderer starts from the archive's procedural system:

- Absolute-black event horizon.
- Layered hot and dusty accretion flows.
- View-relative brightening and Doppler asymmetry.
- Restrained photon/lensing shell.

It adds the visual qualities demonstrated by the Ali Rahman GLB:

- A sparse spherical particle halo surrounding the accretion system.
- Smooth radial alpha falloff at the inner and outer disk boundaries.
- Additive ivory, bronze, and oxblood light that fades into the scene.
- A camera distance and disk scale that keep geometry away from the viewport
  edges, eliminating rectangular clipping.

The particle halo and additive materials create bloom-like softness without a
post-processing dependency. The exact GLB is not required.

### Celestial bodies and hit testing

Each branch is a small emissive mesh attached to a 3D orbital arm. A larger
transparent sphere supplies a forgiving pointer hit area. Orbit lines do not
participate in raycasting. Pointer events stop at the selected body and update
the shared selection state.

The fixed HTML system index calls the same selection function as the canvas.
There is one source of truth for the selected object, camera destination, and
annotation content.

### Camera behavior

Reuse the archive's camera-flight model and cubic easing. Selecting World,
Systems, Media, or Design flies the camera toward a type-specific position and
targets that object's current world position.

While an automated flight is active, its destination follows the moving body.
After arrival, the camera continues tracking the selected body until the visitor
manually rotates or zooms. Manual input cancels tracking immediately without
changing selection. Selecting another object starts a new flight from the
camera's current position.

The World control and a small reset control return to the overview.

### Direct manipulation

Use Three.js `OrbitControls` directly from the installed `three` package rather
than adding Drei solely for controls. The canvas supports:

- Pointer drag to rotate.
- Wheel or trackpad to zoom on desktop.
- One-finger rotation on touch screens.
- Two-finger pinch to zoom on touch screens.
- Damped camera motion with constrained minimum and maximum distance.

The full-screen canvas uses `touch-action: none` for predictable 3D gestures.
Persistent navigation remains above the canvas so mobile visitors can always
move to About or Revelation without becoming trapped inside the scene.

## Component Boundaries

### Homepage server component

`app/page.tsx` owns landmarks, fixed navigation, sparse public copy, the founder
section, and the optimized portrait.

### Universe experience

`app/components/UniverseExperience.tsx` owns selected-object state, the fixed
HTML system index, annotation rendering, and the shared selection callback. It
passes selection and reset state into the 3D scene.

### Universe scene

The current black-hole-only component becomes an interactive scene containing
the renderer, orbiting bodies, camera rig, and reset behavior. Rendering remains
separate from public data.

### Scene model

Pure functions define overview camera settings, destination offsets, easing,
orbit phase, distance bounds, and responsive particle budgets. These functions
are testable without WebGL.

### Universe data

`lib/universe.ts` remains the public source of truth for institutional and
division names, roles, missions, statuses, orbit settings, accents, and the
Revelation destination.

### Styles

The homepage CSS module owns the fixed navigation, full-bleed scene, quiet
annotation typography, dissolving portrait masks, and fallbacks. Global CSS
remains limited to reset, palette, type, and shared accessibility utilities.

## Data and Interaction Flow

1. The server renders the navigation, public copy, system index labels, founder
   content, and Revelation link.
2. The universe initializes to the World overview.
3. A mesh hit target or fixed index button sends an object ID to one selection
   function.
4. Selection remounts the keyed annotation, starts its surface sequence, and
   starts a camera flight.
5. The camera resolves the selected mesh's current world position on every
   frame during flight and tracking.
6. Manual camera manipulation cancels tracking but leaves the selected
   annotation intact.
7. World or reset restores the overview camera.

No API request, storage, account state, private cockpit data, or runtime content
fetch is required.

## Mobile Behavior

The complete scene remains available on iPhone-sized screens. It is not hidden
at the archive cockpit's 680-pixel breakpoint.

- The scene fills at least `100svh` and respects safe-area insets.
- Canvas device-pixel ratio is capped at 1.35 on high-density displays.
- Geometry remains restrained and the mobile particle budget is lower than the
  desktop budget.
- All invisible mesh hit spheres project to generous touch areas at overview
  distance.
- The fixed HTML system index provides at least 44-by-44-pixel interactive
  targets even though its visible type remains small.
- Two-finger pinch changes camera distance without triggering browser zoom.
- Persistent navigation provides an explicit route out of the gesture surface.
- No element causes horizontal document overflow at 390 CSS pixels.

## Accessibility

- The interactive canvas is hidden from the accessibility tree because all its
  destinations have equivalent fixed HTML controls.
- The system index uses native buttons with useful accessible names,
  `aria-pressed`, visible focus treatment, and 44-pixel targets.
- The annotation has a stable polite live region.
- Revelation remains a normal HTTPS link available in both navigation and the
  Media annotation.
- Selection never depends only on color, pointer precision, hover, or canvas
  raycasting.
- `prefers-reduced-motion: reduce` freezes orbital and shader time, removes
  ambient and annotation drift, reveals information immediately, and makes
  camera flights immediate while preserving selection, rotation, and zoom
  controls.

## Failure Handling

A borderless CSS black-hole treatment and static star positions sit beneath the
transparent canvas. A scene error boundary preserves that fallback if WebGL or
shader initialization fails. The HTML system index and selected annotation
remain functional, including the Revelation gateway.

The fallback uses the same full-bleed geometry and radial fades; it does not
introduce a card or error dialog.

## Performance Constraints

- Keep the page server-rendered outside the universe interaction boundary.
- Load Three.js only in the browser.
- Cap device-pixel ratio at 1.35.
- Keep the black hole to its five existing meshes plus one points system.
- Use three branch meshes, three transparent hit spheres, and three orbit paths.
- Animate object transforms and shader uniforms without per-frame React state.
- Pause the frame loop when the document is hidden.
- Do not add a post-processing library, texture loader, remote model, analytics,
  CMS, or runtime data-fetching layer.

## Verification

Implementation is complete only after:

1. Pure scene-model tests cover camera destinations, easing boundaries,
   responsive particle budgets, and selection fallback behavior.
2. A regression test proves selection state does not encode a paused orbit.
3. `npm test`, `npm run lint`, `npm run typecheck`, and `npm run build` pass.
4. Desktop browser QA confirms drag rotation, wheel/trackpad zoom, mesh
   selection, HTML-index selection, camera flights, reset, and Revelation.
5. iPhone-sized QA confirms the canvas remains visible, 44-pixel index targets,
   no horizontal overflow, reliable star selection, and the full portrait.
6. Physical or emulated touch QA confirms one-finger rotation and two-finger
   pinch zoom. If the available browser cannot synthesize pinch, the limitation
   is reported rather than represented as verified.
7. Keyboard QA confirms predictable navigation, focus visibility, selection,
   reset, About navigation, and Revelation access.
8. Reduced-motion QA confirms static orbital phases and immediate camera
   destinations and annotations.
9. Forced WebGL-failure QA confirms the visual fallback, system index,
   annotation, and Revelation link remain usable.
10. Browser console inspection reports no new application errors and
    `git diff --check` passes.

## Out of Scope

- Embedding or redistributing the AliRahman.com GLB.
- Creating final logos for Systems, Media, or Design when no approved logo asset
  exists in the public repository.
- Standalone Systems, Media, or Design pages.
- Placeholder links for Systems or Design.
- Public presentation of Divergent Ventures or Divergent Properties.
- Private cockpit content, telemetry, music, agents, navigation, or personal
  operating details.
- Retouching, regenerating, or compositing the supplied portrait file itself.
- Revelation subdomain changes.
- Deployment, DNS, analytics, or CMS work.
