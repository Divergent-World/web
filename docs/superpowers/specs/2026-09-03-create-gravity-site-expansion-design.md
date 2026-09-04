# Create Gravity Site Expansion Design

**Date:** 2026-09-03
**Status:** Approved direction, pending written-spec review
**Branch:** `codex/create-gravity-site-expansion`

## Purpose

Expand Divergent.World from a two-section visual homepage into the public home
of the complete institution. The site must explain what Divergent World is,
publish its governing philosophy, make all five companies legible, provide a
credible news surface, and give prospective teammates, founders,
collaborators, and investors a direct path to Ali Rahman.

This is an evolution of the current site, not a visual replacement. The
existing black, ivory, bronze, and oxblood atmosphere; procedural black hole;
orbital interaction; dissolving portrait; quiet typography; and restrained
motion already express the right tone. The work formalizes that implicit design
system and extends it consistently across new pages.

## Institutional Position

Divergent World is one learning institution composed of five reinforcing
companies:

- Divergent Systems creates capability.
- Divergent Media creates culture.
- Divergent Design creates experience.
- Divergent Ventures allocates capital.
- Divergent Properties creates permanence.

The institution exists to help people use technology, creativity, design, and
capital to expand human capability, life, and well-being. Its public community
is for doers: founders, builders, artists, engineers, thinkers, operators,
investors, and other people who turn ideas into consequential work.

The site must distinguish present reality from long-term direction. Systems,
Media, and Design are forming or active today. Ventures and Properties are
named as future-horizon companies rather than presented as operating
businesses. Revelation remains the only live public project destination.

## Verbal System

### Opening

The homepage opens with:

> **Create gravity.**
>
> Divergent World is a learning organization for doers working at the
> frontiers of human progress.
>
> We cut through noise, concentrate effort, and use AI to expand human
> capability and well-being.

The opening provides two actions: `Explore the institution` and `Careers`.

### Conceptual sequence

The public doctrine follows one sequence:

```text
Find mu -> Create gravity -> Attract -> Transform -> Advance the frontier
```

The Greek character `mu` may appear in display copy and interface labels, but
every page that relies on it must provide a plain-language explanation. It is
not decorative mysticism and is never required to understand navigation.

### Vocabulary

- **mu** - meaningful signal: the truth, work, or direction worth following.
- **Noise** - fragmented energy, excess information, contradiction, and
  activity without consequence.
- **Coherence** - alignment between identity, words, embodiment, and action.
- **Gravity** - coherence strong enough to attract attention, trust, people,
  ideas, technology, and capital.
- **Attraction** - gathering the right forces around a meaningful frontier.
- **Transformation** - ensuring that people and work leave the field more
  capable than they entered it.
- **Frontier** - consequential work that can advance human life and well-being.
- **Black hole** - a person or institution that attracts and transforms while
  preserving a coherent center.

### Manifesto voice

The manifesto is explicit, aphoristic, perceptive, and unsentimental. It earns
intensity through precision rather than grandeur. Its approved conceptual
spine is:

> Information is abundant. Coherence is rare.
>
> Noise fragments energy. Signal directs it.
>
> A coherent person becomes trustworthy. Coherent people create a field. A
> field organized around meaningful work creates gravity.
>
> Gravity attracts talent, ideas, technology, and capital. Transformation
> begins when what enters the field leaves more capable than it arrived.
>
> A black hole attracts and transforms. So should an institution.
>
> Coherence grows in company. We become clearer, steadier, and more capable by
> building with people who strengthen the signal.
>
> The frontier is not advanced by spectators. It is advanced by people who
> think, make, test, learn, and follow through.
>
> **Simplify. Amplify. Attract. Transform.**

`0xZero` is private source language and must not appear on the public site.

### Writing rules

- State what Divergent World is on the first screen.
- Prefer concrete nouns and verbs to abstractions.
- Explain distinctive terms once, then use them consistently.
- Do not confuse obscurity with depth.
- Do not publish claims the institution has not earned.
- Name present status and long-term intent separately.
- Publish real work, decisions, releases, and evidence.
- Make ambition grounded, inclusive, collaborative, and operational.
- Remove any sentence that does not increase clarity, trust, or action.

## Information Architecture

### Primary navigation

The wordmark returns to `/`. The desktop header exposes two restrained
disclosure groups and the only live world:

- **Our work**
  - Overview
  - Divergent Systems
  - Divergent Media
  - Divergent Design
  - Divergent Ventures
  - Divergent Properties
- **Company**
  - About
  - Manifesto
  - News
  - Careers
- **Revelation** - external link

On narrow screens the same hierarchy appears in one accessible menu. The mobile
menu must not depend on WebGL and must remain usable with keyboard and screen
reader navigation.

### Public routes

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
/news/[slug]
/careers
/careers/[slug]
```

Supporting machine-readable routes:

```text
/robots.txt
/sitemap.xml
/rss.xml
/llms.txt
```

No separate `Work with us` route is created. Careers owns employment and
general-interest inquiries. About owns founder, culture, partnership, and
investor invitations.

## Page Designs

### Homepage

The homepage remains the visual gateway and uses this sequence:

1. **Create gravity** - the current full-viewport universe, expanded from three
   to five orbiting companies. The opening definition and two actions remain
   ordinary server-rendered HTML above the client-only scene.
2. **Cut through the noise** - a concise explanation of signal, coherence, and
   gravity. This is a quiet text field, not a card or product pitch.
3. **One institution. Five companies.** - a borderless institutional index
   that names each role, current status, and contribution to the whole.
4. **Latest** - the three newest publications across Announcement, Article,
   Release, and Update categories.
5. **Careers and collaboration** - short paths for prospective teammates,
   founders, collaborators, and investors.
6. **The founder** - preserve the current dissolving Ali Rahman portrait and
   expand its text with a link to About.
7. **Institutional footer** - complete site map, company links, Revelation,
   contact email, RSS, and machine-readable destinations where appropriate.

The fixed HTML universe index expands to `World`, `Systems`, `Media`, `Design`,
`Ventures`, and `Properties`. It remains a single row on wide screens and a
compact two-row layout on narrow screens. Every control retains a minimum
44-by-44-pixel target.

### Manifesto

`/manifesto` is titled `Create Gravity` and is designed for sustained reading.
It explains noise, signal, coherence, gravity, attraction, transformation, the
frontier, and the black-hole analogy in plain language. It ends with an
invitation to Careers and About rather than a conversion form.

The page includes print styles that remove navigation, atmosphere, and motion;
switch to black text on white; retain the title and section hierarchy; and
produce a clean document without clipped paragraphs or orphaned headings.

### Our Work

`/companies` explains why the five companies belong to one institution and how
their outputs reinforce one another. It shows the sequence:

```text
Capability -> Culture -> Experience -> Capital -> Permanence
```

Each company has a real detail route. All detail pages use one shared template
and data source while supplying substantive company-specific content:

- purpose;
- frontier;
- contribution to the institution;
- present status;
- long-term direction;
- published projects or evidence;
- relevant inquiry action.

Divergent Media links to Revelation. Other companies do not invent projects or
destinations.

### About

`/about` is the institutional About page. It contains:

- the public definition and mission;
- the founder composition and Ali Rahman's role;
- the five-company structure in summary;
- operating principles: coherence, simplicity, ownership, leverage,
  compounding, excellence, and a long time horizon;
- the learning-organization culture;
- collaboration and investor invitations;
- direct contact through `alirahman.dev@gmail.com`.

### News

`/news` is a chronological publication index, not a marketing blog. It uses
four categories:

- Announcement;
- Article;
- Release;
- Update.

The initial publication set contains real institutional material:

1. `One institution. Five companies.` - Announcement.
2. `Create gravity.` - Article introducing the public doctrine without
   duplicating the complete manifesto.
3. `Revelation: the first world.` - Release linking to the live project.

Each `/news/[slug]` page renders from a local typed content model, exposes
article metadata, links to related institutional pages, and supplies Article
structured data. A database, CMS, search interface, and category routes are not
needed for this release.

### Careers

`/careers` explains why Divergent World exists, how the organization works,
what kind of people thrive there, and how to express interest. It favors clear
expectations over employer-branding language.

The first listed role is:

```text
Executive Assistant
Status: Future opening
Expressions of interest welcome
```

`/careers/executive-assistant` describes the future role, likely
responsibilities, working principles, and the materials an interested person
should send. It must not imply that active hiring, interviews, compensation,
location, or a start date have been established.

Applications and general interest use encoded `mailto:` actions to
`alirahman.dev@gmail.com` with a clear subject and short requested-information
template. The site does not collect candidate data, upload resumes, or pretend
to provide an applicant-tracking system.

## Event Horizon Design System

### Theme identity

The existing public-site theme is named **Event Horizon**. It is not a new
visual direction. The implementation formalizes the current design so new
pages and components inherit the same atmosphere.

The theme follows eight principles:

1. **Field before surface** - content emerges from atmosphere instead of
   sitting inside cards.
2. **Warmth inside darkness** - near-black ink supports ivory, bronze, and
   oxblood light.
3. **Signal through contrast** - brightness and color communicate importance.
4. **Dissolve rather than divide** - masks, gradients, opacity, and space
   replace hard containers.
5. **Meaning before scale** - wording and placement earn attention before
   type size does.
6. **Motion with gravity** - orbit, drift, surfacing, and settling replace
   restless decoration.
7. **Three voices** - serif carries meaning, sans-serif carries orientation,
   and monospace carries evidence and status.
8. **Quiet accessibility** - semantic HTML, visible focus, reduced motion,
   readable contrast, and generous touch targets are foundational.

### Preserved palette

The core existing values are preserved exactly:

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

The current transparent ivory, bronze, and oxblood layers also remain visually
unchanged. They become semantic custom properties so pages do not reproduce
literal RGBA values.

Existing component-bound accents also remain unchanged: the institution and
company orbit colors (`#f4dfbe`, `#f2e5cd`, `#d6a76c`, `#7c2f2d`) and the
favicon colors (`#ffd8b4`, `#ff9e60`, `#ff8a3d`, `#cfe0ff`, `#000000`). They
are documented as specialized accents rather than promoted into general page
tokens.

### Theme contract

The root element receives `data-theme="event-horizon"`. CSS custom properties
define:

- field and text colors;
- strong, muted, and faint text levels;
- warm and threshold signals;
- haze, halo, and navigation veils;
- serif, sans-serif, and monospace families;
- focus treatment;
- content widths and page gutters;
- slow, medium, and immediate motion durations;
- easing for surfacing and settling.

Existing variable names may remain as compatibility aliases during the
migration. No visible theme switcher or theme-persistence JavaScript is added.
A future theme can implement the same semantic tokens under another
`data-theme` value without changing page components.

### Layout and surfaces

- Preserve the deterministic star fields and current ambient gradients.
- Use large quiet intervals between editorial sections.
- Avoid cards, pills, hard borders, framed panels, and rectangular image edges.
- Use thin rules only where chronology or document structure requires them.
- Keep interior reading columns narrower than atmospheric compositions.
- Preserve the founder image masks and the universe-to-page dissolve.
- Allow route pages to be quieter than the homepage without becoming a
  different visual system.

### Typography

- The current system serif stack remains the display voice.
- The current system sans-serif stack remains the body and navigation voice.
- A system monospace stack is added for dates, statuses, categories, formulas,
  and machine-readable cues.
- Display type may grow moderately on editorial route openings, but must remain
  restrained relative to the available space and never obscure the black hole
  or reading flow.

### Motion

- Preserve star breathing, orbital motion, annotation surfacing, slow float,
  and founder drift.
- Reuse existing timing and easing before introducing new values.
- Route-page movement is CSS-only and limited to reveal, drift, and focus.
- `prefers-reduced-motion: reduce` removes ambient and transitional movement
  without removing content or hierarchy.

### Design-system documentation

Implementation adds `docs/design-system.md` as the durable reference for Event
Horizon. It records theme principles, semantic tokens, palette, typography,
spacing, motion, component rules, accessibility, print behavior, and
anti-patterns. It documents the shipped code rather than proposing a separate
design language.

## Shared Architecture

### Server-rendered shell

The shared site shell owns the star field, fixed header, mobile disclosure,
footer, and route-level content frame. It remains server rendered. Only
interactions that require browser state become client components.

The existing universe stays an isolated client boundary. Public copy,
navigation, company information, publication content, careers content, links,
and fallbacks remain useful before WebGL or JavaScript loads.

### Content models

Typed local modules serve as the source of truth:

- institutional and site metadata;
- navigation groups;
- five company records;
- news publications;
- career roles;
- contact actions.

The company data extends the current universe model so the homepage scene,
Our Work index, sitemap, metadata, and company pages cannot drift into separate
lists. News and Careers similarly generate indexes, detail pages, metadata, and
machine-readable feeds from one record each.

### Route behavior

- Static parameters are generated for known company, news, and career slugs.
- Unknown slugs call Next.js `notFound()`.
- External destinations include clear labels and safe relationship attributes
  where a new browsing context is used.
- Email URLs are generated by one small helper so subjects and body templates
  are encoded consistently.

## Metadata, Sharing, Search, and Agents

### Canonical domain

Production currently redirects `https://divergent.world` to
`https://www.divergent.world/`. Metadata, sitemap entries, RSS links, structured
data, and crawler files therefore use `https://www.divergent.world` so the
declared canonical matches the served destination. If deployment later makes
the apex domain canonical, `SITE_URL` remains the single value to change.

### Metadata

The root layout defines:

- a title template;
- a concise institutional description;
- canonical origin;
- Open Graph site name, locale, type, title, description, and image;
- Twitter card metadata;
- theme color and color scheme;
- application name;
- favicon, Apple touch icon, and web manifest discovery.

Every public page exports a specific title, description, canonical URL, and
Open Graph type. Company, publication, and career detail pages derive metadata
from their canonical content records.

### Share artwork and icons

The current Open Graph URL points to a missing R2 object and returns 404. The
replacement is generated and served by this Next.js project so deploys cannot
silently reference an absent external asset.

The default 1200-by-630 share image uses the Event Horizon palette, black-hole
geometry, wordmark, and `Create gravity.` It must remain legible when reduced
to a text-message preview. News detail pages may reuse the image in this release
while providing distinct title and description metadata.

The current favicon concept is preserved and simplified only as needed for
small-size legibility. The site supplies browser icon and Apple touch-icon
surfaces in addition to the existing scalable source. A web manifest declares
the site name, short name, start URL, display mode, background color, theme
color, and icons.

### Structured data

The site publishes JSON-LD for:

- `WebSite`;
- `Organization`, including Ali Rahman as founder;
- `Article` on individual News pages.

The five companies are described in visible semantic content. They are not
asserted as separate legal entities or given fabricated founding dates,
addresses, social profiles, job locations, or other unverified fields.

### Crawlers and feeds

- `robots.txt` allows public crawlers and points to the canonical sitemap.
- `sitemap.xml` contains every public canonical route and every current content
  record, with accurate modification dates where known.
- `rss.xml` exposes News entries in reverse chronological order.
- `llms.txt` provides a concise plain-text explanation of the institution,
  company structure, canonical routes, News feed, and contact path for agents.

`llms.txt` is a supplemental convention, not an SEO guarantee. Searchability
still comes from server-rendered copy, semantic headings, internal links,
canonical metadata, structured data, and a complete sitemap.

### Search trust

- One visible `h1` describes each page.
- Link text names destinations rather than saying only `Learn more`.
- Page descriptions avoid generic superlatives and unverifiable claims.
- Dates, statuses, and categories use machine-readable HTML where applicable.
- No content is hidden behind canvas rendering.
- No analytics, cookie banner, or tracking script is added in this release.

## Accessibility and Responsive Behavior

- All routes remain navigable and understandable without WebGL.
- The header, menus, footer, company index, career actions, and News links are
  native controls or anchors.
- Touch targets are at least 44 by 44 CSS pixels.
- Focus order follows document order and focus indicators remain visible.
- Disclosure controls expose meaningful accessible names and expanded state.
- Color never carries status without text.
- The complete universe remains available at a 390-pixel viewport.
- Mobile layouts avoid horizontal document overflow.
- Reduced motion freezes ambient scene motion and makes transitions immediate.
- Manifesto print output is verified independently from the screen layout.

## Performance

- Preserve the existing 1.35 WebGL DPR cap and responsive particle budget.
- Do not add UI, animation, icon, CMS, analytics, or metadata dependencies.
- Reuse Next.js metadata, image, route-handler, static-generation, and font
  capabilities.
- Keep route copy server rendered and statically generated.
- Do not mount another 3D canvas on interior pages.
- Reuse CSS atmosphere and native disclosure behavior instead of client-side
  navigation state where possible.

## Verification

### Automated

- Content-model tests cover five company records, routes, statuses, News
  entries, the future Executive Assistant role, and encoded contact actions.
- Navigation tests cover the Our Work and Company disclosure destinations.
- Metadata tests cover canonical URL construction and page descriptions.
- Feed tests validate RSS and `llms.txt` content.
- Existing universe, selection, camera, render-profile, and handoff tests remain
  green after adding Ventures and Properties.
- Run `npm test`, `npm run typecheck`, `npm run lint`, and `npm run build`.

### Browser and artifact QA

- Verify homepage, About, Manifesto, Our Work, all five company pages, News,
  every initial News entry, Careers, and Executive Assistant at desktop width.
- Verify primary navigation, both disclosure groups, internal links,
  Revelation, and encoded email actions.
- Verify representative pages at 390 pixels with no horizontal overflow.
- Verify keyboard navigation and reduced-motion behavior.
- Verify Manifesto print preview produces a clean document.
- Fetch and inspect `robots.txt`, `sitemap.xml`, `rss.xml`, and `llms.txt`.
- Fetch the generated Open Graph image and inspect it at full size and preview
  scale.
- Confirm the icon and Apple touch icon return successful image responses.
- Inspect rendered metadata for the homepage and one detail route.
- Confirm the browser console has no new errors.

## Non-goals

This release does not add:

- Divergent World ID, authentication, profiles, directory, messaging, or
  memberships;
- billing, entitlements, or paid tiers;
- an applicant-tracking system, resume uploads, or candidate database;
- a contact-form backend or email delivery provider;
- a CMS, database, site search, comments, or author accounts;
- a public design-theme switcher or persistence system;
- analytics, advertising, cookies, or tracking;
- invented job openings, company activity, customers, metrics, social links,
  legal entities, or project destinations;
- separate category archive routes for News;
- Divergent Ventures or Divergent Properties products presented as active.

## Success Criteria

The pass succeeds when:

1. A first-time visitor can state what Divergent World is and why it exists
   after reading the first screen.
2. The site makes all five companies and their reinforcing roles legible
   without misrepresenting their operating status.
3. The language consistently connects signal, coherence, gravity, attraction,
   transformation, AI, and human progress without requiring private context.
4. The homepage and every route unmistakably belong to the existing visual
   world.
5. Prospective teammates can discover the future Executive Assistant role and
   express interest through the correct email address.
6. Founders, collaborators, and investors can identify a relevant contact path.
7. Text-message previews show a working Event Horizon share image and concise
   description.
8. Canonical URLs match production, and crawlers receive complete semantic
   pages, metadata, structured data, sitemap entries, RSS, and agent-readable
   context.
9. The Manifesto is readable on screen and cleanly printable.
10. The expanded experience remains accessible, responsive, performant, and
    free of speculative platform infrastructure.
