# Create Gravity Site Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand Divergent.World into a coherent public institution site with five company routes, a Create Gravity manifesto, News, Careers, the formalized Event Horizon theme, and complete metadata and crawler surfaces.

**Architecture:** Keep the public site server-rendered and statically generated around the existing isolated React Three Fiber universe. Typed local records become the single source of truth for companies, navigation, publications, careers, metadata, feeds, and static params; one shared server-rendered shell extends the existing atmosphere across every route. CSS custom properties formalize the current Event Horizon theme without changing its visual values or adding a theme switcher.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, CSS Modules, Three.js, React Three Fiber, Next.js Metadata and ImageResponse APIs, Node's built-in test runner.

**Spec:** `docs/superpowers/specs/2026-09-03-create-gravity-site-expansion-design.md`

## Global Constraints

- Work directly on `codex/create-gravity-site-expansion`; do not create a worktree.
- Preserve every currently shipped color exactly. The core Event Horizon palette
  remains `#080706`, `#f3eadc`, `#b98550`, `#682827`, `#fff8e8`, `#dfb77d`,
  `#684633`, and `#f0d9bd`; existing orbital and favicon accents remain
  component-bound and unchanged.
- Preserve the current black-hole renderer, deterministic star field, founder portrait asset, dissolving masks, and motion character.
- Use `Create gravity.` as the homepage opening and `Manifesto` as the public doctrine label.
- Never publish `0xZero`.
- Name all five companies, while marking Ventures and Properties as `Future horizon` rather than active.
- Keep Revelation as the only live public project destination.
- Send career, founder, collaborator, partnership, and investor inquiries to `alirahman.dev@gmail.com`.
- Publish Executive Assistant as `Future opening` with `Expressions of interest welcome`; do not imply active hiring, compensation, location, interviews, or a start date.
- Use `https://www.divergent.world` as the canonical origin because production redirects the apex domain there.
- Generate the Open Graph image inside the Next.js project; do not reference the missing R2 object.
- Keep public content useful without WebGL or client JavaScript.
- Preserve the 1.35 WebGL DPR cap and the complete universe at 390 CSS pixels.
- Preserve at least 44-by-44-pixel touch targets and complete reduced-motion behavior.
- Do not add UI, animation, icon, CMS, analytics, SEO, form, or data-fetching dependencies.
- Do not add authentication, profiles, memberships, billing, messaging, a database, an ATS, resume uploads, or a visible theme switcher.
- Use RTK for shell commands.

---

## File Structure

### Shared data and pure utilities

- `lib/site.ts` - canonical origin, public description, contact email, absolute URL builder, and encoded email-action builder.
- `lib/navigation.ts` - grouped Our Work and Company navigation plus the Revelation destination.
- `lib/universe.ts` - one typed source of truth for the institution, all five companies, their public copy, projects, statuses, accents, and orbit data.
- `lib/news.ts` - typed News records, ordered index, and slug lookup.
- `lib/careers.ts` - typed career records, future Executive Assistant opening, and slug lookup.
- `lib/metadata.ts` - pure route metadata builder and JSON-LD serialization.
- `lib/feeds.ts` - pure RSS and `llms.txt` builders.

### Shared presentation

- `app/components/site/SiteShell.tsx` - star field, fixed header, grouped navigation, footer, and main content slot.
- `app/components/site/site-shell.module.css` - shared site chrome, disclosure menus, footer, and responsive behavior.
- `app/components/site/PageIntro.tsx` - consistent interior-page eyebrow, heading, introduction, and optional metadata.
- `app/components/site/PageIntro.module.css` - page-introduction typography and spacing using Event Horizon tokens.
- `app/components/site/JsonLd.tsx` - safe server-rendered JSON-LD script.
- `app/content.module.css` - shared Event Horizon editorial layouts for indexes, articles, company pages, careers, and print.
- `app/theme.css` - named Event Horizon semantic custom properties and compatibility aliases.
- `app/globals.css` - reset, deterministic star fields, body defaults, accessibility utilities, and theme import.

### Public pages and discovery surfaces

- `app/page.tsx` and `app/page.module.css` - expanded homepage.
- `app/companies/page.tsx` - five-company institutional overview.
- `app/companies/[slug]/page.tsx` - shared company detail route.
- `app/about/page.tsx` - About, founder, culture, collaboration, and investor path.
- `app/manifesto/page.tsx` - printable Create Gravity manifesto.
- `app/news/page.tsx` and `app/news/[slug]/page.tsx` - publication index and detail pages.
- `app/careers/page.tsx` and `app/careers/[slug]/page.tsx` - Careers index and future Executive Assistant page.
- `app/not-found.tsx` - useful Event Horizon 404.
- `app/layout.tsx` - shared shell, root metadata, Organization/WebSite JSON-LD, and `data-theme`.
- `app/opengraph-image.tsx` - local 1200-by-630 Event Horizon share card.
- `app/apple-icon.tsx` - local touch icon using the existing black-hole mark.
- `app/manifest.ts` - web app manifest.
- `app/robots.ts` and `app/sitemap.ts` - crawler policy and complete canonical route inventory.
- `app/rss.xml/route.ts` and `app/llms.txt/route.ts` - News feed and agent-readable site map.
- `docs/design-system.md` - shipped Event Horizon design-system reference.

### Tests

- `tests/site.test.ts` - canonical URLs and email actions.
- `tests/navigation.test.ts` - grouped navigation contract.
- `tests/universe.test.ts` - five-company content and orbit contract.
- `tests/scene-model.test.ts` - all company camera destinations.
- `tests/news.test.ts` - publication order, categories, routes, and lookup.
- `tests/careers.test.ts` - role status, route, email action, and lookup.
- `tests/metadata.test.ts` - canonical and social metadata plus safe JSON-LD serialization.
- `tests/feeds.test.ts` - RSS and `llms.txt` output.

---

### Task 1: Establish the Canonical Site and Contact Contract

**Files:**
- Modify: `lib/site.ts`
- Create: `tests/site.test.ts`

**Interfaces:**
- Produces: `SITE_URL`, `SITE_NAME`, `SITE_DESCRIPTION`, `CONTACT_EMAIL`, `absoluteUrl(path: string): string`, and `createEmailHref({ subject, body? }): string`.
- Consumed by: navigation, metadata, Careers, About, sitemap, RSS, `llms.txt`, and JSON-LD tasks.

- [ ] **Step 1: Write the failing site-contract tests**

Create `tests/site.test.ts`:

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_URL,
  absoluteUrl,
  createEmailHref,
} from '../lib/site.ts'

test('uses the production redirect destination as the canonical origin', () => {
  assert.equal(SITE_URL, 'https://www.divergent.world')
  assert.equal(absoluteUrl('/manifesto'), 'https://www.divergent.world/manifesto')
  assert.equal(absoluteUrl('news'), 'https://www.divergent.world/news')
})

test('defines the concise public institutional description', () => {
  assert.equal(
    SITE_DESCRIPTION,
    'Divergent World is a learning organization for doers working at the frontiers of human progress.',
  )
})

test('encodes inquiry subjects and bodies for the verified contact inbox', () => {
  assert.equal(CONTACT_EMAIL, 'alirahman.dev@gmail.com')
  assert.equal(
    createEmailHref({
      subject: 'Executive Assistant — expression of interest',
      body: 'Name:\nCurrent work:',
    }),
    'mailto:alirahman.dev@gmail.com?subject=Executive%20Assistant%20%E2%80%94%20expression%20of%20interest&body=Name%3A%0ACurrent%20work%3A',
  )
})
```

- [ ] **Step 2: Run the focused test and confirm the expected failure**

Run:

```bash
rtk node --test tests/site.test.ts
```

Expected: FAIL because `CONTACT_EMAIL`, `absoluteUrl`, and `createEmailHref` do not exist and the canonical origin still lacks `www`.

- [ ] **Step 3: Implement the minimal site contract**

Replace the public identity portion of `lib/site.ts` with:

```ts
export const SITE_URL = 'https://www.divergent.world'
export const SITE_NAME = 'Divergent World'
export const SITE_DESCRIPTION =
  'Divergent World is a learning organization for doers working at the frontiers of human progress.'
export const CONTACT_EMAIL = 'alirahman.dev@gmail.com'

export function absoluteUrl(path = '/') {
  return new URL(path.replace(/^([^/])/, '/$1'), `${SITE_URL}/`).toString()
}

export function createEmailHref({
  subject,
  body,
}: {
  subject: string
  body?: string
}) {
  const query = new URLSearchParams({ subject })
  if (body) query.set('body', body)
  return `mailto:${CONTACT_EMAIL}?${query.toString().replace(/\+/g, '%20')}`
}
```

Retain `ASSET_ORIGIN` and `assetUrl()` through Task 8 because `app/layout.tsx`
still imports them; Task 9 removes the obsolete Open Graph use after the local
image route exists.

- [ ] **Step 4: Run the focused test and full current suite**

Run:

```bash
rtk node --test tests/site.test.ts
rtk npm test
```

Expected: all tests PASS.

- [ ] **Step 5: Commit the site contract**

```bash
rtk git add lib/site.ts tests/site.test.ts
rtk git commit -m "feat: define public site and contact contract"
```

---

### Task 2: Expand the Institutional Model and Universe to Five Companies

**Files:**
- Modify: `lib/universe.ts`
- Modify: `app/components/universe/scene-model.ts`
- Modify: `tests/universe.test.ts`
- Modify: `tests/scene-model.test.ts`

**Interfaces:**
- Produces: expanded `UniverseEntryId`, `UniverseStatus`, `UniverseEntry`, `DIVISIONS`, `UNIVERSE_ENTRIES`, `getUniverseEntry(id)`, and `getCompanyBySlug(slug)`.
- Consumed by: the 3D scene, homepage company index, navigation, company routes, sitemap, metadata, and footer.

- [ ] **Step 1: Extend the tests with the five-company and page-content contract**

Add `getCompanyBySlug` to the existing import from `../lib/universe.ts`, replace
the first test in `tests/universe.test.ts`, and append the new assertions:

```ts
test('publishes the five reinforcing companies in institutional order', () => {
  assert.deepEqual(
    DIVISIONS.map(({ id, role, status }) => ({ id, role, status })),
    [
      { id: 'systems', role: 'Capability', status: 'Forming' },
      { id: 'media', role: 'Culture', status: 'Active' },
      { id: 'design', role: 'Experience', status: 'Forming' },
      { id: 'ventures', role: 'Capital', status: 'Future horizon' },
      { id: 'properties', role: 'Permanence', status: 'Future horizon' },
    ],
  )
  assert.equal(UNIVERSE_ENTRIES.length, 6)
})

test('gives every company substantive page content and a canonical slug', () => {
  for (const company of DIVISIONS) {
    assert.equal(company.slug, company.id)
    assert.ok(company.purpose.length >= 45)
    assert.ok(company.frontier.length >= 45)
    assert.ok(company.contribution.length >= 45)
    assert.ok(company.direction.length >= 45)
    assert.equal(getCompanyBySlug(company.slug), company)
  }
  assert.equal(getCompanyBySlug('missing'), undefined)
})
```

Update the orbit-key test to run over all five records. Replace the outer-system test with:

```ts
test('keeps every orbit ordered inside the visible outer system', () => {
  assert.deepEqual(
    DIVISIONS.map((company) => company.orbit?.distance),
    [12, 17, 19, 22, 25],
  )
})
```

Append to `tests/scene-model.test.ts`:

```ts
test('defines a camera destination for every institution entry', () => {
  for (const id of ['world', 'systems', 'media', 'design', 'ventures', 'properties'] as const) {
    const destination = getCameraDestination(id, [0, 0, 0])
    assert.equal(destination.position.length, 3)
    assert.deepEqual(destination.target, [0, 0, 0])
  }
})
```

- [ ] **Step 2: Run the focused tests and confirm the expected failure**

Run:

```bash
rtk node --test tests/universe.test.ts tests/scene-model.test.ts
```

Expected: FAIL because Ventures, Properties, page-copy fields, slug lookup, and camera offsets do not exist.

- [ ] **Step 3: Extend the public model**

In `lib/universe.ts`:

```ts
export type UniverseEntryId =
  | 'world'
  | 'systems'
  | 'media'
  | 'design'
  | 'ventures'
  | 'properties'

export type UniverseStatus =
  | 'Institution'
  | 'Forming'
  | 'Active'
  | 'Future horizon'

export type UniverseEntry = {
  id: UniverseEntryId
  slug?: Exclude<UniverseEntryId, 'world'>
  name: string
  role: string
  mission: string
  description: string
  purpose: string
  frontier: string
  contribution: string
  direction: string
  status: UniverseStatus
  accent: string
  orbit?: {
    distance: number
    period: number
    inclination: number
    startAngle: number
  }
  projects: readonly UniverseProject[]
}
```

Give `DIVERGENT_WORLD` these institutional values for the four new copy fields:

```ts
purpose: 'Concentrate technology, culture, design, capital, and place around work that expands human capability, life, and well-being.'
frontier: 'The meeting point between human judgment and machine intelligence, where new institutions and ways of working become possible.'
contribution: 'Divergent World supplies the shared mission, standards, relationships, and learning system that keep five companies coherent.'
direction: 'Build an enduring institution whose people and companies become more capable by creating meaningful things together.'
```

Add `slug: 'systems'` to Systems, preserve its existing mission and project
facts, and add:

```ts
purpose: 'Build software and AI systems that help people and organizations achieve more than they could without them.'
frontier: 'AI operating systems, agents, knowledge systems, automation, education technology, and tools for meaningful work.'
contribution: 'Systems creates the capability and recurring economic engine that lets the wider institution learn, build, and invest.'
direction: 'Develop reliable technology that increases human agency while preserving judgment, creativity, leadership, and ethics.'
```

Add `slug: 'media'` to Media, preserve Revelation as its only project, and add:

```ts
purpose: 'Create stories, ideas, and worlds that help people interpret technological change and imagine more human futures.'
frontier: 'Books, film, music, art, games, and enduring intellectual property where culture can move ahead of convention.'
contribution: 'Media gives new capability meaning, makes the institution legible, and carries its ideas beyond the people who built them.'
direction: 'Develop enduring worlds and intellectual property that deepen culture while remaining independent of short-lived attention cycles.'
```

For Design, set `slug: 'design'`, change `role` to `Experience`, preserve its
existing mission and project facts, and add:

```ts
purpose: 'Turn ideas and technologies into intentional products, objects, and environments that improve how life is lived.'
frontier: 'Digital products, fashion, furniture, architecture, objects, and future hardware shaped by utility, restraint, and taste.'
contribution: 'Design makes capability tangible and converts the institution\'s principles into experiences people can understand and use.'
direction: 'Create a coherent family of useful products whose quality is felt in both their function and their smallest details.'
```

Add:

```ts
{
  id: 'ventures',
  slug: 'ventures',
  name: 'Divergent Ventures',
  role: 'Capital',
  mission: 'Allocate capital into exceptional people, technologies, and long-term opportunities.',
  description: 'Patient capital for founders, internal ventures, strategic acquisitions, and research.',
  purpose: 'Direct patient capital toward exceptional founders, useful technologies, and opportunities that can compound over long horizons.',
  frontier: 'Venture investment, internal companies, strategic acquisitions, research initiatives, and disciplined long-term ownership.',
  contribution: 'Ventures turns the value created by the institution into capital for new capability, culture, experiences, and durable assets.',
  direction: 'Become a trusted long-term capital allocator without sacrificing the coherence or simplicity of the institution.',
  status: 'Future horizon',
  accent: '#b98550',
  orbit: { distance: 22, period: 216, inclination: -20, startAngle: 42 },
  projects: [],
},
{
  id: 'properties',
  slug: 'properties',
  name: 'Divergent Properties',
  role: 'Permanence',
  mission: 'Create enduring places where people can live, work, create, and build together.',
  description: 'Homes, studios, campuses, and physical environments built for long-term human flourishing.',
  purpose: 'Own and develop physical environments that create stability, belonging, and room for consequential work.',
  frontier: 'Housing, creative studios, campuses, mixed-use environments, and future communities designed to endure.',
  contribution: 'Properties gives the institution a physical memory and creates places where its people, culture, and work can take root.',
  direction: 'Translate the institution from software, culture, and products into durable places that can serve generations.',
  status: 'Future horizon',
  accent: '#684633',
  orbit: { distance: 25, period: 264, inclination: 24, startAngle: 168 },
  projects: [],
},
```

Add:

```ts
export function getCompanyBySlug(slug: string) {
  return DIVISIONS.find((entry) => entry.slug === slug)
}
```

- [ ] **Step 4: Add camera offsets and preserve the camera boundary**

In `app/components/universe/scene-model.ts`, extend `CAMERA_OFFSETS`:

```ts
ventures: [4.8, 2.4, 6.4],
properties: [5.2, 2.6, 6.8],
```

Keep `OVERVIEW_CAMERA.maxDistance` at `64`; the outer 25-unit orbit remains inside the current usable camera range and page-scroll handoff contract.

- [ ] **Step 5: Run focused tests, type checking, and the full suite**

```bash
rtk node --test tests/universe.test.ts tests/scene-model.test.ts
rtk npm run typecheck
rtk npm test
```

Expected: all commands PASS.

- [ ] **Step 6: Commit the institutional model**

```bash
rtk git add lib/universe.ts app/components/universe/scene-model.ts tests/universe.test.ts tests/scene-model.test.ts
rtk git commit -m "feat: publish the five-company institution"
```

---

### Task 3: Define Grouped Navigation and the Shared Event Horizon Shell

**Files:**
- Modify: `lib/navigation.ts`
- Modify: `tests/navigation.test.ts`
- Create: `app/theme.css`
- Modify: `app/globals.css`
- Create: `app/components/site/SiteShell.tsx`
- Create: `app/components/site/site-shell.module.css`
- Create: `app/components/site/PageIntro.tsx`
- Create: `app/components/site/PageIntro.module.css`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/page.module.css`

**Interfaces:**
- Consumes: `DIVISIONS`, `SITE_NAME`, `CONTACT_EMAIL`, and `createEmailHref()`.
- Produces: `PUBLIC_NAVIGATION_GROUPS`, `REVELATION_LINK`, the shared root shell, and reusable interior-page introduction.
- Preserves: the current star layers, fixed header character, footer, page atmosphere, and homepage universe placement.

- [ ] **Step 1: Replace the navigation test with the approved grouped contract**

Use this exact contract in `tests/navigation.test.ts`:

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import {
  PUBLIC_NAVIGATION_GROUPS,
  REVELATION_LINK,
} from '../lib/navigation.ts'

test('groups public navigation into Our work and Company', () => {
  assert.deepEqual(PUBLIC_NAVIGATION_GROUPS, [
    {
      label: 'Our work',
      items: [
        { label: 'Overview', href: '/companies' },
        { label: 'Divergent Systems', href: '/companies/systems' },
        { label: 'Divergent Media', href: '/companies/media' },
        { label: 'Divergent Design', href: '/companies/design' },
        { label: 'Divergent Ventures', href: '/companies/ventures' },
        { label: 'Divergent Properties', href: '/companies/properties' },
      ],
    },
    {
      label: 'Company',
      items: [
        { label: 'About', href: '/about' },
        { label: 'Manifesto', href: '/manifesto' },
        { label: 'News', href: '/news' },
        { label: 'Careers', href: '/careers' },
      ],
    },
  ])
})

test('keeps Revelation as the one featured external destination', () => {
  assert.deepEqual(REVELATION_LINK, {
    label: 'Revelation',
    href: 'https://revelation.divergent.world',
    external: true,
  })
})
```

- [ ] **Step 2: Run the navigation test and confirm the expected failure**

```bash
rtk node --test tests/navigation.test.ts
```

Expected: FAIL because the grouped exports do not exist.

- [ ] **Step 3: Implement the grouped navigation data**

Define the exported types and exact records asserted above in
`lib/navigation.ts`. Keep the data readonly and derive the five company items
from explicit canonical paths rather than generating user-visible labels from
IDs.

- [ ] **Step 4: Formalize the Event Horizon tokens without changing values**

Create `app/theme.css`:

```css
:root,
[data-theme="event-horizon"] {
  color-scheme: dark;
  --field: #080706;
  --signal: #f3eadc;
  --signal-warm: #b98550;
  --signal-threshold: #682827;
  --signal-strong: rgba(243, 234, 220, 0.92);
  --signal-body: rgba(243, 234, 220, 0.66);
  --signal-muted: rgba(243, 234, 220, 0.5);
  --signal-faint: rgba(243, 234, 220, 0.38);
  --veil-navigation: rgba(8, 7, 6, 0.88);
  --haze-warm: rgba(185, 133, 80, 0.14);
  --haze-threshold: rgba(104, 40, 39, 0.13);
  --focus-ring: rgba(255, 255, 255, 0.85);
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-serif: ui-serif, "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, "Times New Roman", serif;
  --font-mono: ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  --page-gutter: max(1.25rem, env(safe-area-inset-left));
  --reading-width: 42rem;
  --content-width: 76rem;
  --motion-surface: 900ms;
  --motion-drift: 13s;
  --ease-surface: cubic-bezier(0.16, 1, 0.3, 1);
  --ink: var(--field);
  --ivory: var(--signal);
  --bronze: var(--signal-warm);
  --oxblood: var(--signal-threshold);
  --void: var(--field);
  --text: var(--signal);
}
```

Import it at the top of `app/globals.css`, remove the duplicated color/font
definitions from the existing `:root`, and replace the global focus literal
with `var(--focus-ring)`. Do not rewrite the deterministic star gradients.

- [ ] **Step 5: Extract the shared shell**

Create `SiteShell.tsx` as a server component. It must render:

```tsx
<div className={styles.shell}>
  <div className={styles.sky} aria-hidden="true">
    <div className={`${styles.starLayer} ${styles.starsStill}`} />
    <div className={`${styles.starLayer} ${styles.starsDrift}`} />
    <div className={`${styles.starLayer} ${styles.starsBright}`} />
  </div>
  <header className={styles.header}>
    <Link className={styles.wordmark} href="/">Divergent.World</Link>
    <nav aria-label="Primary navigation">
      {PUBLIC_NAVIGATION_GROUPS.map((group) => (
        <details key={group.label} className={styles.navGroup}>
          <summary>{group.label}</summary>
          <div className={styles.navMenu}>
            {group.items.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </div>
        </details>
      ))}
      <a href={REVELATION_LINK.href}>Revelation ↗</a>
    </nav>
  </header>
  {children}
  <footer className={styles.footer}>...</footer>
</div>
```

The footer must expose Our Work, Company, News, Careers, Revelation, RSS, and
`mailto:alirahman.dev@gmail.com`. Use `createEmailHref({ subject: 'Divergent World inquiry' })` for the email action. Do not put `llms.txt` or `robots.txt` in the visual footer.

Move the current sky, header, footer, star breathing, and related responsive
rules from `app/page.module.css` into `site-shell.module.css` without changing
their visual values. Desktop menus use native `details` disclosure, quiet
background veils, and visible focus. At 48rem and below, present one compact
stacked navigation menu while preserving every destination and 44-pixel
targets.

- [ ] **Step 6: Add the reusable PageIntro component**

`PageIntro.tsx` accepts:

```ts
type PageIntroProps = {
  eyebrow: string
  title: string
  introduction: string
  meta?: string
}
```

It renders a header with one `h1` and uses `PageIntro.module.css` for `.intro`,
`.eyebrow`, `.title`, `.lede`, and `.metadata`. The stylesheet must use only
Event Horizon theme tokens, keep the introduction within `--reading-width`,
and collapse title sizing below 30rem.

- [ ] **Step 7: Connect the shell in the root layout**

Set `<html lang="en" data-theme="event-horizon">` and wrap `{children}` with
`<SiteShell>`. Remove the homepage-owned header, sky, and footer markup from
`app/page.tsx`; retain only homepage content. Remove only the corresponding
moved selectors from `app/page.module.css`.

- [ ] **Step 8: Run the tests, type checker, and build**

```bash
rtk node --test tests/navigation.test.ts
rtk npm run typecheck
rtk npm test
rtk npm run build
```

Expected: all commands PASS and every existing homepage route remains
server-renderable.

- [ ] **Step 9: Commit the shared shell**

```bash
rtk git add lib/navigation.ts tests/navigation.test.ts app/theme.css app/globals.css app/components/site app/layout.tsx app/page.tsx app/page.module.css
rtk git commit -m "feat: add the Event Horizon site shell"
```

---

### Task 4: Rewrite and Expand the Homepage

**Files:**
- Modify: `app/components/UniverseExperience.tsx`
- Modify: `app/page.tsx`
- Modify: `app/page.module.css`
- Modify: `lib/universe.ts`
- Test: `tests/universe.test.ts`

**Interfaces:**
- Consumes: `DIVERGENT_WORLD`, five `DIVISIONS`, and Careers/About routes.
- Produces: the full homepage narrative and six-item universe index.

- [ ] **Step 1: Add homepage-copy assertions to the public model test**

Append to `tests/universe.test.ts`:

```ts
test('keeps the homepage institutional language concise and public', () => {
  assert.equal(DIVERGENT_WORLD.mission, 'Create gravity around the frontiers that advance human life and well-being.')
  assert.equal(DIVERGENT_WORLD.role, 'The institution')
  assert.equal(DIVERGENT_WORLD.status, 'Institution')
  assert.equal(DIVISIONS.some((entry) => entry.id === 'ventures'), true)
  assert.equal(DIVISIONS.some((entry) => entry.id === 'properties'), true)
})
```

- [ ] **Step 2: Run the focused test and confirm the expected failure**

```bash
rtk node --test tests/universe.test.ts
```

Expected: FAIL on the old institutional mission.

- [ ] **Step 3: Update the universe opening and annotation copy**

Set the institutional mission to the asserted value. In
`UniverseExperience.tsx`, replace the opening with:

```tsx
<div className={styles.sceneIntro}>
  <p>Divergent World · A learning organization for doers</p>
  <h1>Create gravity.</h1>
  <p>We cut through noise, concentrate effort, and use AI to expand human capability and well-being.</p>
  <div className={styles.heroActions}>
    <a href="#institution">Explore the institution</a>
    <Link href="/careers">Careers</Link>
  </div>
</div>
```

Keep the compact gesture hint as separate secondary text. Continue rendering
`[DIVERGENT_WORLD, ...DIVISIONS]` so the fixed index automatically contains all
six entries.

- [ ] **Step 4: Add the three homepage editorial sections**

In `app/page.tsx`, after `<UniverseExperience />`, add:

1. `#signal` with heading `Cut through the noise.` and this copy:

   > Information is abundant. Coherence is rare. Divergent World builds
   > systems, rooms, products, and environments that help people find the
   > signal, align their effort, and create meaningful things together.

2. `#institution` with heading `One institution. Five companies.` and a
   semantic list of all five `DIVISIONS`; each row links to its company page
   and shows role, status, mission, and an explicit `Explore Divergent ...`
   label.
3. `#invitation` with heading `Build with people who strengthen the signal.`
   and three links: Careers, founder/collaborator inquiry, and investor inquiry.
   Use encoded `createEmailHref()` calls with distinct subjects.

Preserve the founder section after these additions and change its paragraph to:

> Ali Rahman founded Divergent World to build one coherent institution across
> technology, media, design, capital, and place - and to help capable people do
> consequential work together.

Link the founder composition to `/about` with `Read about Divergent World`.

- [ ] **Step 5: Extend the existing visual grammar**

In `app/page.module.css`:

- preserve the current universe and founder values;
- make the six-item index a single row above 48rem and a two-row, three-column
  grid below 48rem;
- keep every button at least 44 pixels;
- style editorial sections as full-width atmospheric fields with content
  widths and spacing from Event Horizon tokens;
- use no cards, pills, framed panels, or hard section backgrounds;
- use low-opacity rules only for the company index;
- keep headings in the serif voice, labels/status in the monospace voice, and
  body copy in sans-serif;
- add no JavaScript animation.

- [ ] **Step 6: Run tests, type checking, lint, and build**

```bash
rtk node --test tests/universe.test.ts
rtk npm run typecheck
rtk npm run lint
rtk npm run build
```

Expected: all commands PASS.

- [ ] **Step 7: Commit the homepage expansion**

```bash
rtk git add app/components/UniverseExperience.tsx app/page.tsx app/page.module.css lib/universe.ts tests/universe.test.ts
rtk git commit -m "feat: make Create Gravity the public gateway"
```

---

### Task 5: Build Our Work, About, Manifesto, and Not Found Routes

**Files:**
- Create: `app/content.module.css`
- Create: `app/companies/page.tsx`
- Create: `app/companies/[slug]/page.tsx`
- Create: `app/about/page.tsx`
- Create: `app/manifesto/page.tsx`
- Create: `app/not-found.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `DIVISIONS`, `getCompanyBySlug()`, `PageIntro`, `createEmailHref()`, and metadata helpers from Task 9 once available.
- Produces: every static institutional reading route and print-ready manifesto.

- [ ] **Step 1: Create the shared editorial stylesheet**

Define focused classes in `app/content.module.css` for:

- `.page`, `.intro`, `.readingColumn`, `.wideColumn`;
- `.eyebrow`, `.title`, `.lede`, `.metadata`;
- `.index`, `.indexRow`, `.indexLink`, `.status`;
- `.prose`, `.aphorism`, `.sequence`, `.actions`;
- `.founderComposition`, `.founderImage`, `.founderCopy`;
- `.articleHeader`, `.articleBody`, `.relatedLinks`.

Use only Event Horizon tokens. Maintain borderless fields, wide spacing,
dissolving image masks, restrained rules, and readable line lengths. Add
responsive rules at 48rem and 30rem.

- [ ] **Step 2: Implement `/companies`**

Render `PageIntro` with:

```text
Eyebrow: Our work
Title: One institution. Five companies.
Introduction: Technology creates capability. Media creates culture. Design creates experience. Ventures allocates capital. Properties creates permanence. Each company exists to strengthen the others.
```

Render all `DIVISIONS` as semantic linked rows. Include the visible sequence:

```text
Capability -> Culture -> Experience -> Capital -> Permanence
```

End with a link to `/manifesto` labeled `Read the Manifesto`.

- [ ] **Step 3: Implement static company detail pages**

In `app/companies/[slug]/page.tsx`:

- export `generateStaticParams()` from `DIVISIONS` slugs;
- await `params` using the Next.js 16 `Promise<{ slug: string }>` signature;
- call `notFound()` for an unknown slug;
- render role and status as metadata;
- render sections `Purpose`, `The frontier`, `Role in the institution`, and
  `Long-term direction` from the canonical record;
- render published projects only when present;
- show `Enter Revelation ↗` for Media;
- show an honest About or inquiry link for every company without projects;
- link back to `/companies` with `All five companies`.

- [ ] **Step 4: Implement `/about`**

Use `PageIntro`:

```text
Eyebrow: Company
Title: Build one coherent institution.
Introduction: Divergent World combines technology, media, design, capital, and place to expand human capability, life, and well-being.
```

Add sections:

- `Why we exist` - the public mission and learning-organization definition;
- `How we work` - Simplicity, Coherence, Ownership, Leverage, Compounding,
  Excellence, and Long horizon, each with one concrete sentence;
- `The founder` - reuse `/images/ali-rahman.png`, the current masks, and the
  approved five-company founder copy;
- `Build with us` - links to Careers plus founder/collaborator and investor
  email actions.

- [ ] **Step 5: Implement `/manifesto` with the final public copy**

Open with `PageIntro`:

```text
Eyebrow: Manifesto
Title: Create gravity.
Introduction: Cut through noise. Concentrate what matters. Build at the frontiers that can expand human life and well-being.
```

Use these section headings and lines as the base document:

```text
Information is abundant. Coherence is rare.
Noise fragments energy. Signal directs it.

Find mu.
Mu is meaningful signal: the truth, work, or direction worth following. Finding it requires subtraction - fewer contradictions, fewer empty inputs, and greater alignment between words and action.

Become coherent.
Coherence is not volume. It is alignment repeated until it becomes visible. A coherent person becomes trustworthy. Coherent people create a field.

Create gravity.
A field organized around meaningful work creates gravity. Gravity attracts talent, ideas, technology, and capital toward a frontier that matters.

Attract and transform.
A black hole attracts and transforms. So should an institution. What enters the field should leave clearer, steadier, and more capable than it arrived.

Advance the frontier.
The frontier is advanced by people who think, make, test, learn, and follow through. We use AI to increase capability without surrendering judgment, creativity, leadership, or ethics.

Build together.
Coherence grows in company. We become more capable by building with people who strengthen the signal and help meaningful work endure.

Simplify. Amplify. Attract. Transform.
```

Render the Greek `μ` visually alongside the first `Find mu` occurrence while
keeping the plain-language word in readable text. Do not include `0xZero`.

- [ ] **Step 6: Add print rules**

Under `@media print` in `content.module.css`:

- hide shared navigation, footer, actions, stars, and decorative atmosphere
  through a global print hook supplied by `SiteShell`;
- set white background and black text;
- remove masks, filters, animation, and text shadows;
- set the reading width to the page;
- avoid breaking headings and aphorism groups across pages;
- expose external link URLs only where they add meaning.

- [ ] **Step 7: Implement the Event Horizon not-found page**

Render one `h1` with `Signal lost.` and copy:

> This route does not exist. Return to Divergent World or continue through the
> institution.

Provide links to `/`, `/companies`, `/news`, and `/careers`.

- [ ] **Step 8: Run type checking, lint, and build**

```bash
rtk npm run typecheck
rtk npm run lint
rtk npm run build
```

Expected: all routes statically generate and all commands PASS.

- [ ] **Step 9: Commit the institutional routes**

```bash
rtk git add app/content.module.css app/companies app/about app/manifesto app/not-found.tsx app/page.tsx
rtk git commit -m "feat: publish the institution and manifesto"
```

---

### Task 6: Publish News and the Initial Institutional Record

**Files:**
- Create: `lib/news.ts`
- Create: `tests/news.test.ts`
- Create: `app/news/page.tsx`
- Create: `app/news/[slug]/page.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Produces: `NewsCategory`, `NewsEntry`, `NEWS`, and `getNewsEntry(slug)`.
- Consumed by: homepage Latest, News pages, metadata, sitemap, RSS, and Article JSON-LD.

- [ ] **Step 1: Write the failing News tests**

Create `tests/news.test.ts`:

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { NEWS, getNewsEntry } from '../lib/news.ts'

test('publishes the initial institutional record in reverse chronology', () => {
  assert.deepEqual(
    NEWS.map(({ slug, category }) => ({ slug, category })),
    [
      { slug: 'revelation-the-first-world', category: 'Release' },
      { slug: 'create-gravity', category: 'Article' },
      { slug: 'one-institution-five-companies', category: 'Announcement' },
    ],
  )
  assert.ok(NEWS.every((entry) => /^2026-09-0[1-3]$/.test(entry.publishedAt)))
})

test('gives every publication enough public content and a canonical lookup', () => {
  for (const entry of NEWS) {
    assert.ok(entry.description.length >= 70)
    assert.ok(entry.paragraphs.length >= 3)
    assert.equal(getNewsEntry(entry.slug), entry)
  }
  assert.equal(getNewsEntry('missing'), undefined)
})
```

- [ ] **Step 2: Run the test and confirm the expected failure**

```bash
rtk node --test tests/news.test.ts
```

Expected: FAIL because `lib/news.ts` does not exist.

- [ ] **Step 3: Implement the typed publication source**

Create:

```ts
export type NewsCategory = 'Announcement' | 'Article' | 'Release' | 'Update'

export type NewsEntry = {
  slug: string
  title: string
  category: NewsCategory
  publishedAt: string
  description: string
  paragraphs: readonly string[]
  relatedLinks: readonly { label: string; href: string; external?: true }[]
}
```

Add the three tested entries in reverse chronological order:

- `2026-09-03`, `Revelation: the first world.` - explain that Revelation is
  the first live world of Divergent Media, a beginning rather than a claim of
  scale, and link externally to Revelation plus internally to Media.
- `2026-09-02`, `Create gravity.` - explain signal, coherence, attraction, and
  transformation in three concise paragraphs and link to `/manifesto`.
- `2026-09-01`, `One institution. Five companies.` - explain the five
  reinforcing roles and clearly label Ventures and Properties as the long-term
  horizon; link to `/companies`.

Each description must be 70-160 characters and each article must contain three
to five complete paragraphs. Add:

```ts
export function getNewsEntry(slug: string) {
  return NEWS.find((entry) => entry.slug === slug)
}
```

- [ ] **Step 4: Implement News index and detail pages**

`/news` renders `PageIntro`:

```text
Eyebrow: News
Title: Latest signal.
Introduction: Announcements, articles, releases, and updates from across Divergent World.
```

Render `NEWS` as chronological semantic articles with `<time
dateTime={publishedAt}>`, category, descriptive title link, and description.

The detail route must:

- generate static params;
- call `notFound()` for unknown slugs;
- render one `h1`, category, machine-readable date, description, paragraphs,
  and related links;
- mount Article JSON-LD after Task 9;
- link back to `All News`.

- [ ] **Step 5: Connect News to the homepage**

Add a `#latest` section between the homepage institution and invitation fields
using `NEWS.slice(0, 3)`. Render the same category, date, descriptive title,
and description contract used by the News index.

- [ ] **Step 6: Run focused and full verification**

```bash
rtk node --test tests/news.test.ts
rtk npm run typecheck
rtk npm run lint
rtk npm run build
```

Expected: all commands PASS and all three News routes appear in build output.

- [ ] **Step 7: Commit News**

```bash
rtk git add lib/news.ts tests/news.test.ts app/news app/page.tsx
rtk git commit -m "feat: publish Divergent World News"
```

---

### Task 7: Build Careers and the Future Executive Assistant Opening

**Files:**
- Create: `lib/careers.ts`
- Create: `tests/careers.test.ts`
- Create: `app/careers/page.tsx`
- Create: `app/careers/[slug]/page.tsx`
- Modify: `app/about/page.tsx`

**Interfaces:**
- Consumes: `createEmailHref()` and `PageIntro`.
- Produces: `CareerStatus`, `CareerRole`, `CAREER_ROLES`, and `getCareerRole(slug)`.
- Consumed by: Careers pages, About, sitemap, metadata, and footer.

- [ ] **Step 1: Write the failing Careers tests**

Create `tests/careers.test.ts`:

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { CAREER_ROLES, getCareerRole } from '../lib/careers.ts'

test('publishes Executive Assistant honestly as a future opening', () => {
  assert.deepEqual(
    CAREER_ROLES.map(({ slug, title, status, callout }) => ({ slug, title, status, callout })),
    [{
      slug: 'executive-assistant',
      title: 'Executive Assistant',
      status: 'Future opening',
      callout: 'Expressions of interest welcome',
    }],
  )
})

test('provides a role-specific expression-of-interest action', () => {
  const role = CAREER_ROLES[0]
  assert.equal(getCareerRole(role.slug), role)
  assert.match(role.emailHref, /^mailto:alirahman\.dev@gmail\.com\?subject=/)
  assert.match(decodeURIComponent(role.emailHref), /Executive Assistant/)
  assert.equal(getCareerRole('missing'), undefined)
})
```

- [ ] **Step 2: Run the test and confirm the expected failure**

```bash
rtk node --test tests/careers.test.ts
```

Expected: FAIL because `lib/careers.ts` does not exist.

- [ ] **Step 3: Implement the role source**

Define:

```ts
export type CareerStatus = 'Open' | 'Future opening' | 'Closed'

export type CareerRole = {
  slug: string
  title: string
  status: CareerStatus
  callout: string
  summary: string
  responsibilities: readonly string[]
  qualities: readonly string[]
  interestMaterials: readonly string[]
  emailHref: string
}
```

Add one role with:

```ts
summary: 'A future role supporting Ali Rahman with coordination, communication, follow-through, and the operating rhythm of Divergent World.'
responsibilities: [
  'Protect priorities, time, and follow-through across the institution.',
  'Turn conversations and decisions into clear actions and written records.',
  'Coordinate communication, scheduling, research, and practical execution.',
  'Help maintain a calm, reliable operating environment as the company grows.',
]
qualities: [
  'Clear written and verbal communication.',
  'Sound judgment, discretion, and emotional steadiness.',
  'Strong organization without unnecessary process.',
  'Comfort working with AI tools while preserving human judgment.',
  'A bias toward useful action and dependable follow-through.',
]
interestMaterials: [
  'A concise introduction and why the future role interests you.',
  'Your location, availability horizon, and preferred working arrangement.',
  'A resume, LinkedIn profile, or equivalent record of your work.',
  'One example of a complex situation you made calmer or more coherent.',
]
```

Generate `emailHref` with subject `Executive Assistant - expression of interest`
and a body template requesting those four items.

- [ ] **Step 4: Implement `/careers`**

Use:

```text
Eyebrow: Careers
Title: Do consequential work with coherent people.
Introduction: Divergent World is being built for people who think clearly, act deliberately, learn quickly, and help others become more capable.
```

Add concise sections for `Why Divergent World`, `How we work`, and `Who thrives
here`. Render the one future role with explicit status and callout. End with a
general-interest email action using subject `Divergent World - general career interest`.

- [ ] **Step 5: Implement `/careers/executive-assistant`**

Generate static params from `CAREER_ROLES`, reject unknown slugs with
`notFound()`, and render:

- title;
- `Future opening` status;
- `Expressions of interest welcome` callout;
- summary;
- responsibilities;
- qualities;
- requested materials;
- an explicit note that this is not yet an active hiring process;
- `Express interest by email` using `role.emailHref`.

- [ ] **Step 6: Connect Careers from About**

Add the future role summary and a `View Careers` link to the About page. Keep
founder/collaborator and investor inquiries distinct from the career action.

- [ ] **Step 7: Run focused and full verification**

```bash
rtk node --test tests/careers.test.ts
rtk npm run typecheck
rtk npm run lint
rtk npm run build
```

Expected: all commands PASS.

- [ ] **Step 8: Commit Careers**

```bash
rtk git add lib/careers.ts tests/careers.test.ts app/careers app/about/page.tsx
rtk git commit -m "feat: add the Divergent World careers path"
```

---

### Task 8: Add Pure Metadata, JSON-LD, RSS, and Agent Context Builders

**Files:**
- Create: `lib/metadata.ts`
- Create: `lib/feeds.ts`
- Create: `tests/metadata.test.ts`
- Create: `tests/feeds.test.ts`
- Create: `app/components/site/JsonLd.tsx`

**Interfaces:**
- Consumes: `SITE_URL`, `SITE_NAME`, `SITE_DESCRIPTION`, `absoluteUrl()`, `DIVISIONS`, `NEWS`, and `CAREER_ROLES`.
- Produces: `createPageMetadata()`, `serializeJsonLd()`, `ORGANIZATION_JSON_LD`, `WEBSITE_JSON_LD`, `createArticleJsonLd()`, `buildRss()`, and `buildLlmsText()`.

- [ ] **Step 1: Write failing metadata tests**

Create `tests/metadata.test.ts`:

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import {
  ORGANIZATION_JSON_LD,
  createArticleJsonLd,
  createPageMetadata,
  serializeJsonLd,
} from '../lib/metadata.ts'

test('builds canonical and social metadata from one route description', () => {
  const metadata = createPageMetadata({
    title: 'Manifesto',
    description: 'Create gravity by finding signal, building coherence, and advancing meaningful human frontiers.',
    path: '/manifesto',
  })
  assert.equal(metadata.alternates?.canonical, 'https://www.divergent.world/manifesto')
  assert.equal(metadata.openGraph?.url, 'https://www.divergent.world/manifesto')
  assert.equal(metadata.openGraph?.title, 'Manifesto — Divergent World')
  assert.deepEqual(metadata.openGraph?.images, ['/opengraph-image'])
})

test('publishes only verified organization and article facts', () => {
  assert.equal(ORGANIZATION_JSON_LD['@type'], 'Organization')
  assert.equal(ORGANIZATION_JSON_LD.founder.name, 'Ali Rahman')
  assert.equal('foundingDate' in ORGANIZATION_JSON_LD, false)
  const article = createArticleJsonLd({
    slug: 'create-gravity',
    title: 'Create gravity.',
    description: 'A public doctrine.',
    publishedAt: '2026-09-02',
  })
  assert.equal(article.mainEntityOfPage, 'https://www.divergent.world/news/create-gravity')
})

test('escapes less-than signs in JSON-LD script content', () => {
  assert.equal(serializeJsonLd({ value: '</script>' }), '{"value":"\\u003c/script>"}')
})
```

- [ ] **Step 2: Write failing feed tests**

Create `tests/feeds.test.ts`:

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { buildLlmsText, buildRss } from '../lib/feeds.ts'

test('builds a canonical RSS feed containing every News entry', () => {
  const rss = buildRss()
  assert.match(rss, /<title>Divergent World News<\/title>/)
  assert.match(rss, /https:\/\/www\.divergent\.world\/news\/create-gravity/)
  assert.doesNotMatch(rss, /assets\.divergent\.world/)
})

test('builds concise agent-readable public context', () => {
  const text = buildLlmsText()
  assert.match(text, /^# Divergent World/m)
  assert.match(text, /learning organization for doers/)
  assert.match(text, /Divergent Ventures - Future horizon/)
  assert.match(text, /\/manifesto/)
  assert.doesNotMatch(text, /0xZero/)
})
```

- [ ] **Step 3: Run both tests and confirm the expected failure**

```bash
rtk node --test tests/metadata.test.ts tests/feeds.test.ts
```

Expected: FAIL because both modules do not exist.

- [ ] **Step 4: Implement metadata and safe JSON-LD utilities**

`createPageMetadata()` accepts `{ title, description, path, type? }`, returns a
Next `Metadata` object, formats the full title as `${title} — Divergent World`,
uses `absoluteUrl(path)` for canonical and Open Graph URL, uses
`['/opengraph-image']` for Open Graph and Twitter images, and defaults type to
`website`.

`ORGANIZATION_JSON_LD` contains only:

```ts
{
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Divergent World',
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  founder: { '@type': 'Person', name: 'Ali Rahman' },
  email: CONTACT_EMAIL,
}
```

`WEBSITE_JSON_LD` contains `WebSite`, canonical URL, name, and description.
`createArticleJsonLd()` produces `Article`, headline, description, ISO date,
canonical News URL, publisher Organization name/URL, and
`mainEntityOfPage`. `serializeJsonLd()` uses
`JSON.stringify(value).replace(/</g, '\\u003c')`.

- [ ] **Step 5: Implement the feed builders**

`buildRss()` returns RSS 2.0 XML with XML-escaped values, canonical channel and
item links, descriptions, categories, GUIDs, and RFC 822 publication dates for
all `NEWS` records.

`buildLlmsText()` returns concise Markdown containing:

- public definition;
- Create Gravity sequence;
- five company names, roles, and statuses;
- canonical links for Home, Our Work, About, Manifesto, News, Careers, RSS,
  and Revelation;
- public contact email;
- explicit note that Ventures and Properties are future-horizon companies.

Implement one private XML escape helper inside `lib/feeds.ts`; do not add a
dependency.

- [ ] **Step 6: Create the JsonLd component**

Render:

```tsx
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  )
}
```

- [ ] **Step 7: Run focused and full tests**

```bash
rtk node --test tests/metadata.test.ts tests/feeds.test.ts
rtk npm run typecheck
rtk npm test
```

Expected: all commands PASS.

- [ ] **Step 8: Commit metadata utilities**

```bash
rtk git add lib/metadata.ts lib/feeds.ts tests/metadata.test.ts tests/feeds.test.ts app/components/site/JsonLd.tsx
rtk git commit -m "feat: define metadata and public feed builders"
```

---

### Task 9: Connect Metadata, Share Artwork, Icons, Sitemap, RSS, and llms.txt

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: every public route page created in Tasks 5-7
- Create: `app/opengraph-image.tsx`
- Create: `app/apple-icon.tsx`
- Create: `app/manifest.ts`
- Modify: `app/robots.ts`
- Modify: `app/sitemap.ts`
- Create: `app/rss.xml/route.ts`
- Create: `app/llms.txt/route.ts`
- Modify: `lib/site.ts`

**Interfaces:**
- Consumes: all metadata/feed utilities and canonical content records.
- Produces: route-specific metadata, JSON-LD, local preview images, manifest,
  complete sitemap, RSS response, and agent-readable response.

- [ ] **Step 1: Replace root metadata and mount institutional JSON-LD**

In `app/layout.tsx`:

- define title `{ default: SITE_NAME, template: '%s — Divergent World' }`;
- use `new URL(SITE_URL)` as `metadataBase`;
- use `SITE_DESCRIPTION` everywhere;
- set canonical `/`;
- reference `/opengraph-image` for Open Graph and Twitter;
- add `manifest: '/manifest.webmanifest'`;
- preserve `themeColor: '#000000'` and `colorScheme: 'dark'`;
- mount `JsonLd` for both `ORGANIZATION_JSON_LD` and `WEBSITE_JSON_LD` inside
  the body before `SiteShell`.

Remove the R2 `assetUrl('opengraph.png')` reference. If `assetUrl()` has no
remaining callers, remove it and `ASSET_ORIGIN` from `lib/site.ts`.

- [ ] **Step 2: Add route-specific metadata**

Use `createPageMetadata()` on `/companies`, `/about`, `/manifesto`, `/news`,
and `/careers`. Dynamic company, News, and Careers pages implement
`generateMetadata()` after resolving their canonical record and return an empty
object for unknown slugs so the render path can call `notFound()`.

Use these descriptions:

```text
/companies: Explore the five companies that create capability, culture, experience, capital, and permanence across Divergent World.
/about: Learn why Divergent World exists, how the institution works, and how to build or invest with us.
/manifesto: Create gravity by finding signal, building coherence, and advancing meaningful human frontiers.
/news: Read announcements, articles, releases, and updates from across Divergent World.
/careers: Explore future roles and expressions of interest at Divergent World.
```

Mount Article JSON-LD on News detail pages.

- [ ] **Step 3: Generate the local Open Graph image**

Create `app/opengraph-image.tsx` using `ImageResponse` with:

```ts
export const alt = 'Divergent World — Create gravity.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
```

The image must use only inline deterministic layout:

- `#080706` background;
- soft `#b98550` and `#682827` radial atmosphere;
- a centered black disk with `#f0d9bd`, `#dfb77d`, and `#684633` concentric
  rings that echo the existing black hole;
- `DIVERGENT.WORLD` in small tracked ivory sans-serif;
- `Create gravity.` in large ivory serif;
- `A learning organization for doers.` in restrained ivory text.

Do not fetch fonts, images, or R2 assets at runtime.

- [ ] **Step 4: Add touch icon and manifest**

Create `app/apple-icon.tsx` as a 180-by-180 `ImageResponse` using the same field,
event horizon, ivory rim, bronze glow, and no small text. Keep `app/icon.svg` as
the scalable browser favicon.

Create `app/manifest.ts` returning:

```ts
{
  name: 'Divergent World',
  short_name: 'Divergent',
  description: SITE_DESCRIPTION,
  start_url: '/',
  display: 'standalone',
  background_color: '#080706',
  theme_color: '#080706',
  icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
}
```

- [ ] **Step 5: Expand robots and sitemap**

Keep wildcard allow in `robots.ts`, set `host: SITE_URL`, and point to
`absoluteUrl('/sitemap.xml')`.

In `sitemap.ts`, include `/`, every fixed page, every company slug, every News
slug, and every career slug. Use `lastModified` dates for News entries and
`2026-09-03` for stable institutional routes. Use lower priorities for
detail pages than `/` and do not add `robots.txt`, RSS, `llms.txt`, or the image
routes to the sitemap.

- [ ] **Step 6: Add RSS and llms.txt route handlers**

`app/rss.xml/route.ts`:

```ts
export function GET() {
  return new Response(buildRss(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
```

`app/llms.txt/route.ts` uses the same cache header and
`Content-Type: text/plain; charset=utf-8`.

- [ ] **Step 7: Run complete automated verification**

```bash
rtk npm test
rtk npm run typecheck
rtk npm run lint
rtk npm run build
```

Expected: all commands PASS; build output lists every static route and both
route handlers; no `assets.divergent.world/divergent-world/opengraph.png`
reference remains.

- [ ] **Step 8: Verify generated discovery responses locally**

Run a production server and fetch:

```bash
rtk npm run start -- --hostname 127.0.0.1 --port 3100
rtk curl -I http://127.0.0.1:3100/opengraph-image
rtk curl -I http://127.0.0.1:3100/apple-icon
rtk curl http://127.0.0.1:3100/robots.txt
rtk curl http://127.0.0.1:3100/sitemap.xml
rtk curl http://127.0.0.1:3100/rss.xml
rtk curl http://127.0.0.1:3100/llms.txt
```

Expected: image routes return successful PNG responses; text/XML routes use the
correct content types, canonical `www` URLs, and no private `0xZero` language.
Stop the production server after verification.

- [ ] **Step 9: Commit the complete discovery layer**

```bash
rtk git add app lib/site.ts
rtk git commit -m "feat: add sharing search and crawler surfaces"
```

---

### Task 10: Document Event Horizon and Complete Integrated Visual QA

**Files:**
- Create: `docs/design-system.md`
- Modify: any scoped CSS or component file where verification finds a defect
- Modify: `README.md`

**Interfaces:**
- Consumes: the shipped theme tokens, components, content models, and routes.
- Produces: durable design-system documentation and a verified, responsive
  public experience.

- [ ] **Step 1: Write the shipped Event Horizon reference**

Create `docs/design-system.md` with these sections and exact contracts:

- `Purpose` - Event Horizon formalizes the existing public-site visual language;
- `Principles` - field before surface, warmth inside darkness, signal through
  contrast, dissolve rather than divide, meaning before scale, motion with
  gravity, three voices, quiet accessibility;
- `Theme contract` - every semantic custom property from `app/theme.css` and
  what it controls;
- `Palette` - the eight core values and the existing component-bound orbital
  (`#f4dfbe`, `#f2e5cd`, `#d6a76c`, `#7c2f2d`) and favicon
  (`#ffd8b4`, `#ff9e60`, `#ff8a3d`, `#cfe0ff`, `#000000`) accents, with their
  roles and a rule that they remain unchanged;
- `Typography` - serif, sans-serif, and monospace responsibilities;
- `Layout` - atmospheric fields, reading width, content width, gutters, and
  responsive rules;
- `Surfaces` - masks, opacity, gradients, rules, and the ban on card grids;
- `Motion` - existing breathing, orbit, surface, float, founder drift, easing,
  and reduced-motion behavior;
- `Components` - shared shell, PageIntro, indexes, article prose, status text,
  actions, and image treatment;
- `Accessibility` - semantic hierarchy, native controls, focus, touch targets,
  contrast, reduced motion, and print;
- `Anti-patterns` - new palette values, generic SaaS cards, glassmorphism,
  saturated cyberpunk, decorative motion, unexplained symbols, inflated copy,
  and unearned status;
- `Future themes` - implement the same semantic variables under another
  `data-theme` value; do not change component markup or add a switcher until a
  second real theme exists.

- [ ] **Step 2: Update the README public architecture**

Update the README to describe:

- Create Gravity homepage;
- five company routes;
- About, Manifesto, News, and Careers;
- future Executive Assistant interest path;
- Event Horizon design system and documentation link;
- Open Graph, icons, JSON-LD, sitemap, RSS, and `llms.txt`;
- the same local commands and accessibility/performance posture.

Remove the obsolete statement that the homepage presents only three active
branches and the expectation that the missing R2 Open Graph object exists.

- [ ] **Step 3: Run final automated verification from a clean process**

```bash
rtk git diff --check
rtk npm test
rtk npm run typecheck
rtk npm run lint
rtk npm run build
```

Expected: every command exits successfully with no new warnings requiring
action.

- [ ] **Step 4: Verify desktop routes in the browser**

Start the production build and inspect:

```text
/
/companies
/companies/systems
/companies/media
/companies/design
/companies/ventures
/companies/properties
/about
/manifesto
/news
/news/revelation-the-first-world
/news/create-gravity
/news/one-institution-five-companies
/careers
/careers/executive-assistant
/missing-route
```

Confirm:

- homepage WebGL scene and six-item HTML index work;
- Create Gravity copy is readable before WebGL resolves;
- Our Work and Company menus expose every approved route;
- every company status is accurate;
- Revelation is the only live project destination;
- email links address `alirahman.dev@gmail.com` with the correct subject;
- no page uses cards, pills, hard frames, or a new palette;
- every page has one visible `h1` and useful link labels;
- the 404 route is helpful;
- the browser console has no new errors.

- [ ] **Step 5: Verify responsive, keyboard, reduced-motion, and print behavior**

At a 390-by-844 viewport, inspect Home, About, Manifesto, News, Careers, and
Executive Assistant. Confirm no horizontal overflow, all navigation items are
reachable, the six-item universe index is two rows, and all actions remain at
least 44 pixels.

Use keyboard-only navigation through both disclosure groups, the universe
index, News links, company links, and career email action. Emulate
`prefers-reduced-motion: reduce` and confirm the content remains complete while
ambient movement stops. Open Manifesto print preview and confirm white paper,
black text, no site chrome, no clipped copy, and stable heading breaks.

- [ ] **Step 6: Inspect share artwork at full and preview scale**

Open `/opengraph-image`, save the generated response to `/tmp/divergent-world-opengraph.png`, and
inspect it at 1200 by 630 and approximately 360 pixels wide. Confirm:

- the event horizon remains recognizable;
- `DIVERGENT.WORLD` and `Create gravity.` remain legible;
- no content clips;
- the image uses only Event Horizon colors;
- the response is local to the site and independent of R2.

- [ ] **Step 7: Commit documentation and verified polish**

```bash
rtk git add docs/design-system.md README.md app lib tests
rtk git commit -m "docs: formalize the Event Horizon public system"
```

- [ ] **Step 8: Confirm final branch state**

```bash
rtk git status --short --branch
rtk git log --oneline -12
```

Expected: branch is `codex/create-gravity-site-expansion`, the working tree is
clean, and all implementation commits are present. Do not push or open a pull
request unless the user requests it.
