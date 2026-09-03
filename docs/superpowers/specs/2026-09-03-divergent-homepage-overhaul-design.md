# Divergent World Homepage Overhaul Design

**Date:** 2026-09-03
**Status:** Approved for implementation planning

## Purpose

Replace the current one-destination cosmic index with a mobile-first public
landing page that explains Divergent World as one institution and exposes its
three active public branches: Divergent Systems, Divergent Media, and Divergent
Design.

The page centers the procedural black-hole treatment already proven in the
private Divergent World cockpit while keeping the public experience fast,
accessible, and honest about which destinations exist today. Revelation is the
only live outbound world in this release and belongs beneath Divergent Media.

The experience also introduces Ali Rahman explicitly as the founder and uses
his supplied portrait as the primary reference for the site's architectural
and visual language.

## Public Story

Divergent World is the central institution. Its three visible branches express
the initial company sequence documented in the architecture materials:

- Divergent Systems creates capability through software, AI, and technology.
- Divergent Media creates culture through ideas, stories, and intellectual
  property. Revelation is its first live world.
- Divergent Design creates intentional physical products that improve everyday
  life.

Divergent Ventures and Divergent Properties remain part of the long-term
institutional model but are not shown in this initial public composition. They
have not reached the active public sequence and would distract from the three
branches the homepage can represent truthfully now.

## Visual Direction

Derive the interface from the supplied founder portrait rather than treating
the image as an isolated content block. Its defining visual principles are:

- Monumental curved architecture framing a human figure.
- A luminous overhead oculus that echoes the black hole and orbital rings.
- Warm limestone and concrete balanced by deep tailored black.
- Muted oxblood as a rare structural accent rather than a generic brand color.
- Ivory light, bronze reflections, generous negative space, and quiet scale.
- A retrofuturist atmosphere that feels inhabited, tactile, and intentional
  instead of neon, synthetic, or conventionally corporate.

The cosmic hero remains dark, but its accretion palette moves toward ivory,
champagne, warm bronze, and restrained oxblood. Typography pairs an editorial
serif for consequential statements with a precise, widely tracked sans serif
for labels and navigation. Large arcs, inset borders, apertures, and threshold
shapes repeat across sections so the page reads as one piece of architecture.

Avoid glassmorphism, saturated cyberpunk gradients, generic SaaS cards,
decorative dashboards, and excessive glow. The visual system should feel like
entering a long-lived institution built inside a speculative monument.

## Experience

The homepage opens as a full-screen universe. Divergent World appears as a
central black hole, with Systems, Media, and Design represented by three named
stars moving on distinct orbital paths.

The central black hole and each star are native HTML buttons layered over the
visual scene. Selecting a star pauses its orbit and populates one shared detail
panel:

- Systems shows its mission and a `Forming` status without inventing a link.
- Media shows its mission and includes the live `Enter Revelation` gateway.
- Design shows its mission and a `Forming` status without inventing a link.

Selecting the black hole returns the panel to the Divergent World institutional
overview. At 60rem and wider, the universe and detail panel form a two-column
hero with the universe receiving the larger share. Below 60rem, the detail
panel follows a compact universe in normal document flow. The page is immersive
but remains scrollable instead of forcing all content into one viewport.

Labels remain visible without requiring hover. Hover is enhancement only;
touch, click, and keyboard activation all use the same selection path.

## Founder Section

Place an explicit founder section immediately after the interactive universe.
Its primary heading is `Founded by Ali Rahman` and the supplied portrait is the
dominant visual element.

At 60rem and wider, the section uses an asymmetric two-column composition: the
portrait occupies the larger column while a short founder statement occupies
the other. Below 60rem, the portrait appears first at its natural square ratio,
followed by the text. Do not crop out the overhead oculus, architectural arches,
or Ali's full upper-body silhouette; those elements establish the site's visual
thesis.

The founder copy should be concise and public-facing: Ali Rahman founded
Divergent World to build one enduring institution across technology, media,
and design, with the purpose of increasing human potential. It must not import
private biography, household plans, cockpit metrics, or personal operating
details from the archival repository.

Copy the supplied source image into the public site's asset tree under a stable,
descriptive filename and render it through Next.js image optimization. The
image receives the concise alternative text `Ali Rahman, founder of Divergent
World.` No generated extension, retouching, compositing, or other image edit is
part of this release.

## Rendering Architecture

Use a hybrid composition:

- A small client-only React Three Fiber canvas renders the procedural black
  hole.
- Native HTML and CSS render the orbit paths, moving stars, labels, hit areas,
  and detail panel.
- Server-rendered page copy and metadata preserve fast first paint, SEO, and a
  meaningful experience before hydration.

The black-hole shader is adapted from the private cockpit's existing
implementation: an absolute-black event horizon, layered hot and dusty
accretion flows, view-relative brightening, and a restrained lens/photon shell.
The public port excludes camera controls, project-callout geometry, Drei HTML
annotations, hierarchy disclosure, bloom post-processing, and cockpit theme
integration.

Only `three` and `@react-three/fiber` are added. No textures, models, remote
assets, or post-processing dependency are required.

## Component Boundaries

### Homepage server component

`app/page.tsx` owns the public headline, mission copy, page landmarks, and the
server-rendered shell around the interactive universe. It also owns the founder
section and optimized portrait because neither requires client-side state.

### Universe experience

A focused client component owns the selected entry, click and keyboard
interaction, orbit pause state, and shared detail-panel rendering. It receives
the institutional and division records from the data module and does not own
the WebGL shader implementation.

### Black-hole canvas

A focused client component owns the React Three Fiber canvas, shader uniforms,
animation time, geometry, and rendering profile. The canvas is decorative and
does not contain the page's navigation semantics.

### Shader module

A standalone module owns the vertex and fragment shader strings. Keeping GLSL
out of the component makes the rendering code readable without creating a
general shader framework.

### Universe data

One data module contains the institutional overview and the three division
records: stable IDs, names, missions, statuses, orbit settings, accent colors,
and optional destinations. Revelation remains an HTTPS link under Media.

### Styles

The existing homepage CSS module is reshaped around the new composition. Global
CSS remains limited to reset, palette, typography, the deterministic starfield,
and shared accessibility utilities.

## Data and Interaction Flow

1. The server renders the page shell and division content from local data.
2. The universe client component initializes selection to Divergent World.
3. Each celestial button identifies one data record.
4. Activation updates the selected ID, pauses the selected orbit, and causes
   the shared panel to render that record.
5. Only Media exposes a destination action. Activating `Enter Revelation`
   follows the existing `https://revelation.divergent.world` contract.
6. Selecting the center restores the institutional overview and resumes the
   previously selected orbit.

No network request, storage, account state, URL state, or private cockpit data
is required.

## Mobile Behavior

The black hole remains visible and animated on iPhone-sized screens; unlike the
private cockpit, the public site does not replace the scene at 680 pixels.

Mobile constraints:

- The universe scales from viewport width without horizontal overflow.
- Star labels use intentional resting angles and remain inside the scene.
- Interactive targets are at least 44 by 44 CSS pixels even when their visible
  stars are smaller.
- The detail panel follows the scene in document flow.
- The founder portrait retains its square composition, including the oculus and
  architectural context, before its accompanying text.
- Canvas device-pixel ratio is capped, geometry remains restrained, and no
  texture memory is introduced.
- The layout accounts for small viewport height and safe-area insets.

## Accessibility

- The WebGL canvas is `aria-hidden` because it is a decorative rendering of
  controls already represented in HTML.
- The black hole and orbital stars are native buttons with visible focus
  treatment and useful accessible names.
- Each selectable control exposes `aria-expanded` and `aria-controls` for the
  shared detail panel.
- The panel has a stable heading and polite status announcement when its content
  changes.
- Information and navigation never depend on color, hover, pointer precision,
  dragging, or canvas raycasting.
- `prefers-reduced-motion: reduce` freezes orbital and shader time while
  retaining the same resting composition and all controls.

## Failure Handling

A CSS black-hole treatment always exists beneath the transparent canvas. If
WebGL is unavailable or shader initialization fails, the CSS layer remains
visible and the complete HTML interaction layer continues to work. The failure
does not block division descriptions or the Revelation link.

No user-facing error dialog is needed because the fallback provides the same
meaning and actions without requiring recovery.

## Performance Constraints

- Keep the page server-rendered except for the universe interaction boundary.
- Load the WebGL renderer only in the browser.
- Cap canvas device-pixel ratio for high-density mobile displays.
- Use a maximum of five visible black-hole meshes, matching the proven cockpit
  profile.
- Animate shader uniforms and CSS transforms without per-frame React state.
- Do not add Drei, React Three Postprocessing, image loaders, textures, models,
  analytics, or runtime content fetching.

## Metadata and Copy

Update site metadata from the placeholder constellation line to a concise
description of Divergent World as an institution building technologies, media,
and products that increase human potential. The visible language should be
confident and spare, not a compressed corporate brochure.

Architecture source material informs public copy, but personal cockpit content,
private operating metrics, household plans, agent telemetry, and internal
project data are not imported or exposed.

The founder section names Ali Rahman and explains his relationship to the
institution in one short paragraph. It is not a resume, personal timeline, or
long-form biography.

## Verification

Implementation is complete only after:

1. `npm run lint` passes.
2. `npm run typecheck` passes.
3. `npm run build` passes.
4. Desktop browser QA confirms the shader, three moving branches, selection,
   orbit pausing, institutional reset, and Revelation navigation contract.
5. iPhone-sized browser QA confirms the black hole remains visible, targets are
   usable, labels do not overflow, the detail panel follows naturally, and the
   full portrait composition remains legible without horizontal overflow.
6. Keyboard QA confirms predictable tab order, focus visibility, activation,
   and access to Revelation.
7. Reduced-motion QA confirms a stable composition with no orbit or shader
   animation.
8. A forced WebGL-failure check confirms the CSS fallback and HTML controls
   remain complete.
9. Browser console inspection reports no new application errors.
10. `git diff --check` passes.

No new automated test framework is introduced for this release. Build-time
type checking, linting, and focused browser verification cover the small public
surface without adding testing infrastructure solely for one interaction.

## Out of Scope

- Standalone Systems, Media, or Design pages.
- Placeholder links for Systems or Design.
- Public presentation of Divergent Ventures or Divergent Properties.
- Camera orbit, zoom, pan, object fly-ins, or canvas raycasting.
- Private cockpit content, controls, telemetry, music, agents, or navigation.
- Retouching, regenerating, extending, or otherwise altering the supplied
  founder portrait.
- Revelation subdomain changes.
- Vercel configuration, DNS changes, deployment, analytics, or CMS work.
- Committing implementation, pushing the branch, or opening a pull request
  without separate authorization.
