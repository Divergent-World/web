# Event Horizon

Event Horizon formalizes the visual language already present on
Divergent.World. It is a system for extending the site without flattening its
atmosphere into conventional product UI.

## Purpose

Event Horizon makes the institution feel clear, credible, warm, and alive. It
holds technology and the humanities in one composition: precise enough to
orient, spacious enough to invite interpretation, and restrained enough to let
meaning carry the experience.

## Principles

1. **Field before surface.** Content emerges from atmosphere instead of sitting
   inside cards.
2. **Warmth inside darkness.** Near-black supports ivory, bronze, and oxblood
   light.
3. **Signal through contrast.** Brightness and color communicate importance.
4. **Dissolve rather than divide.** Masks, gradients, opacity, and space replace
   hard containers.
5. **Meaning before scale.** Wording and placement earn attention before type
   size does.
6. **Motion with gravity.** Orbit, drift, surfacing, and settling replace
   restless decoration.
7. **Three voices.** Serif carries meaning, sans-serif carries orientation, and
   monospace carries evidence and status.
8. **Quiet accessibility.** Semantic HTML, visible focus, reduced motion,
   readable contrast, and generous touch targets are foundational.

## Theme contract

The root element declares `data-theme="event-horizon"`. Components consume
semantic custom properties rather than introducing new literals.

| Token | Responsibility |
| --- | --- |
| `--field` | Primary atmospheric field |
| `--signal` | Primary ivory text and light |
| `--signal-warm` | Bronze emphasis and active meaning |
| `--signal-threshold` | Oxblood depth and threshold emphasis |
| `--signal-strong` | Highest text emphasis below pure signal |
| `--signal-body` | Reading text |
| `--signal-muted` | Secondary labels and links |
| `--signal-faint` | Metadata and quiet orientation |
| `--veil-navigation` | Navigation backdrop |
| `--haze-warm` | Bronze atmospheric field |
| `--haze-threshold` | Oxblood atmospheric field |
| `--focus-ring` | Keyboard focus indicator |
| `--font-serif` | Meaning and editorial headings |
| `--font-sans` | Orientation and body copy |
| `--font-mono` | Status, evidence, dates, and system labels |
| `--page-gutter` | Safe responsive page inset |
| `--reading-width` | Sustained-reading measure |
| `--content-width` | Institutional index measure |
| `--motion-surface` | Content surfacing duration |
| `--motion-drift` | Ambient drift duration |
| `--ease-surface` | Gravitational entry curve |

Compatibility aliases—`--ink`, `--ivory`, `--bronze`, `--oxblood`, `--void`,
and `--text`—preserve the existing implementation while new work uses semantic
names.

## Palette

### Core

| Role | Value |
| --- | --- |
| Ink / field | `#080706` |
| Ivory / primary signal | `#f3eadc` |
| Bronze / warm signal | `#b98550` |
| Oxblood / threshold signal | `#682827` |
| Accretion inner | `#fff8e8` |
| Accretion middle | `#dfb77d` |
| Accretion outer | `#684633` |
| Accretion rim | `#f0d9bd` |

Existing component-bound colors remain unchanged. Institution and company
orbits use `#f4dfbe`, `#f2e5cd`, `#d6a76c`, and `#7c2f2d`. The favicon uses
`#ffd8b4`, `#ff9e60`, `#ff8a3d`, `#cfe0ff`, and `#000000`. These are specialized
accents, not general page tokens.

## Typography

- Serif speaks the thesis: page titles, declarations, company names, and major
  section headings.
- Sans-serif orients: body copy, explanations, and navigation.
- Monospace verifies: category, date, role, status, system state, and compact
  actions.

Serif type remains restrained: public page titles and major section headings
use the same quiet scale as the founder title on the homepage. Meaning and
placement earn emphasis before size. Reading copy stays within
`--reading-width`; institutional indexes may use `--content-width`.

## Layout

Pages are atmospheric fields, not stacks of panels. The homepage has three
fields only: the universe, one compact institutional overview, and the founder.
Use safe-area-aware `--page-gutter`, deliberate vertical intervals, and one
dominant alignment per section. At 48rem, multi-column indexes simplify; at
30rem, content becomes a single readable column. The universe index becomes
two rows of three at narrow widths without removing any destination.

## Surfaces

Use transparency, gradients, dissolving image masks, quiet one-pixel rules, and
space. Images should merge with the field. Avoid card grids, thick frames,
floating glass panels, gratuitous rounded rectangles, and visual chrome that
competes with the words.

## Motion

The system includes star breathing, planetary orbit, camera flight, annotation
surfacing, gentle float, and founder-image drift. Motion is slow, directional,
and tied to spatial meaning. The shared cubic easing makes content feel as if it
is settling into a field. Under `prefers-reduced-motion: reduce`, ambient and
interactive movement stops while all content and navigation remain available.

## Components

- **SiteShell** owns the sky, fixed identity, flat primary navigation, and
  institutional footer.
- **PageIntro** carries an eyebrow, one page-level heading, a concise
  introduction, and optional metadata.
- **Indexes** use semantic rows, restrained rules, and explicit labels.
- **Article prose** favors short sections and a clear reading measure.
- **Status text** uses the monospace voice and states present reality plainly.
- **Actions** are descriptive native links with at least a 44-by-44-pixel
  target.
- **Images** dissolve into the field and keep meaningful alternative text.

## Accessibility

Every page has one visible `h1` and a logical heading hierarchy. Navigation uses
native links and buttons without hidden desktop-only menus. Focus is visible; touch targets
are at least 44 pixels; contrast is carried by the established ivory scale;
reduced motion preserves content; and the Manifesto prints as black text on
white without navigation, atmosphere, animation, or clipped sections.

## Anti-patterns

Do not introduce new palette values, generic SaaS cards, glassmorphism,
saturated cyberpunk treatments, decorative motion, unexplained symbols,
inflated copy, or status claims unsupported by public evidence.

## Future themes

A future theme must implement the same semantic properties under another
`data-theme` value. Component markup should not change to accommodate it. Do
not add a visible theme switcher until a second real theme exists.
