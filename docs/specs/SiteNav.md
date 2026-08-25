# SiteNav

## 0 · Front matter

| | |
|---|---|
| **Component** | `SiteNav` |
| **Tier** | 2 pattern (`src/patterns/SiteNav/`) |
| **Status** | implemented |
| **Token prefix** | `--nav-*` (existing) |
| **Designer / date** | Design · 25 Aug 2026 |
| **Implements** | Revised header and navigation, sitemap §2 (struck items excluded) |
| **Prototypes** | `SiteNav 1b - Shortlist.html` (desktop + mobile, settled) · `SiteNav 1b - plate` (desktop source) · `SiteNav 1b - Mobile E and F.html` · `SiteNav 1b - Hover directions.html` |
| **Implemented at** | `src/patterns/SiteNav/` · `src/styles/tokens/components/nav.css` · `/design/site-nav` |

Three mega menus, three direct links, one CTA. Desktop opens an inset **plate** over the page;
mobile opens a **sheet** that hugs its list and grows for a section.

**§7 said "no new `--nav-*` tokens" and that could not hold — see §12 for what was added and why.**
The plate is no longer a full-bleed `Section`, so it needs a ground of its own; its three widths,
the rail's width, the sheet's reserve and every duration in §6 are values that would otherwise be
raw `px` in a `*.module.css`, which `tokens:check` fails the build on. They are declared in
`tokens/components/nav.css`, which is where a component's literals live.

## 1 · Identity

The control surface for navigation. One per page, `position: sticky`, above the page at `--nav-z`.

**What it is NOT.** Not a statement of position — `Breadcrumbs` does that. Not a sitemap — the
footer carries the full route list. Not a page section: it owns `banner`, nothing else.

**Count per page.** Exactly one, on all 129 routes.

## 2 · Information architecture

Six primary items, in this order. Order is content, not style: Work sits second because case
studies are the strongest proof and should not be the fifth thing read.

| # | Item | Form | Route on click | Children in data |
|---|---|---|---|---|
| 1 | Services | mega | — (opens) | 6 services + 6 audits + 2 rail cards |
| 2 | Work | direct link | `/case-studies` | 2 |
| 3 | Expertise | mega | — (opens) | 6 + 6 |
| 4 | Insights | mega | — (opens) | 4 + 4 |
| 5 | Lab | direct link | `/future-interfaces-lab` | 6 |
| 6 | About | direct link | `/about` | 5 |

CTA: **Start a project** → `/contact`, right of the bar, `Button` solid primary `sm`.

### 2.1 · Sitelinks — every item carries its children, including unbuilt pages

**Rule: the data model holds the children of all six items, whether or not the nav currently
renders them, and whether or not the page exists.** Work, Lab and About render as direct links
today (confirmed 24 Aug). Their children are still in the data.

Two reasons this is a data decision rather than a rendering one. First, switching Lab or About to
a compact menu later becomes a `form` change on one record, not a content migration. Second, the
same records feed the footer, the in-page section navigation and the sitemap file, so a child that
exists in one place and not another is a bug the build can catch.

```ts
type NavStatus = 'live' | 'planned';          // planned = route defined, page not built
type NavForm   = 'mega' | 'compact' | 'link';

type NavLink = { label: string; href: string; status: NavStatus };
type NavGroup = { label: string; links: readonly NavLink[] };
type NavCard = { title: string; href: string; status: NavStatus; role: 'primary' | 'secondary' };

type NavItem = {
  key: string;
  label: string;
  form: NavForm;
  href?: string;                    // required when form === 'link'
  groups?: readonly NavGroup[];     // mega and compact
  rail?: { label: string; cards: readonly NavCard[] };
  children?: readonly NavLink[];    // form === 'link': carried, not rendered
};
```

**`status: 'planned'` behaviour, and it is deliberately boring.** The link renders exactly like a
live one. It is the build's job to ensure a route exists before the nav ships — a stub page with
the hero and a short holding line, not a 404 and not a disabled row. A greyed or missing nav row
tells a visitor the company is unfinished; a thin page tells them the work is in progress. One
consequence to accept: `planned` pages must be excluded from the sitemap submitted to search
engines until they carry real content, so the flag has to reach the sitemap generator too.

**Full inventory.** Labels verbatim from the sitemap; no copy invented.

**Services** — group "Services": Product Design · Product Modernisation · Design Systems ·
AI Product UX · Design Engineering · Software Development (all `/services/*`).
Group "Audits and starting points": UX and Product Audit · Design-System Audit ·
Design-to-Code Audit · Product Modernisation Assessment · AI Product UX Readiness ·
Prototype Hardening Review (all `/audits/*`).
Rail "Working together": How We Work `/how-we-work` (primary) · Request Free Audit `/audits`
(secondary).

**Expertise** — "Products and platforms": B2B SaaS and Workflow Software · AI Products and
Developer Tools · Data, Analytics and Decision Products · Marketplaces and Multi-Sided Platforms ·
Content, Knowledge and Discovery Platforms · Commerce and Transactional Products (all
`/expertise/*`). "Industries and domains": FinTech and InsurTech · HealthTech and Care · EdTech
and Learning · MarTech and SalesTech · PropTech, ConTech and Field Operations · ClimateTech and
Energy (all `/expertise/*`).

**Insights** — "Formats": Articles · Podcasts · Videos · Events (`/insights/*`).
"Knowledge and utility": Tools and Resources `/tools` · Guides `/insights/guides` ·
Glossary `/glossary` · Interviews `/insights/interviews`.

**Work** `children`: `/case-studies` · `/clients`.
**Lab** `children`: `/future-interfaces-lab/{experiments,tools,research,datasets,programmes}` ·
`/matter-design-system`.
**About** `children`: `/about` · `/team` · `/careers` · `/security-and-confidentiality` ·
`/contact`.

**Excluded** (struck in the doc, pages may exist but are not surfaced): Services → Prototype
Engineering; Expertise → Public Sector and Regulated Industries; Insights → Research, Series, and
the whole third group (Current, Rising Topics, Latest Insights, Future Interfaces Lab).

**No row descriptions anywhere.** The `promise` field in the previously built component falls out
of use, and its four `--nav-row-promise-*` tokens were deleted with it.

## 3 · Anatomy

| Part | Element | Carries |
|---|---|---|
| `root` | `<header role="banner">` | sticky, `--nav-z`, surface scope |
| `bar` | `Section as="div" flush` | `--nav-bar-height` (72 desktop, 64 compact), bottom hairline |
| `brand` | `<a>` + `Logo` | home link; inert while the mobile sheet is open (§5) |
| `items` | `<ul>` centred in the bar | `Button` per item — ghost + neutral + `sm`; megas take `icon={<Icon name="chevron-down"/>}`, `active`, `aria-expanded`; links render `as={Link}` with no icon |
| `cta` | `Button` solid primary `sm` | right of the bar |
| `toggle` | `Button` ghost neutral `iconOnly` | mobile only; glyph `menu` ↔ `close` |
| `plate` | one box, all three sections | paper, hairline, `--radius-8`, `overflow: hidden`; width and height animate |
| `pane` | one per mega section | 1240 / 880 / 720px wide; two label + link columns, plus the rail in Services |
| `rail` | `<aside>`, 340px | primary card (image slot, title) + secondary row |
| `scrim` | fixed box under the plate | `--nav-scrim`, below the bar. The system has no elevation token; edge, radius and scrim do the separating |
| `sheet` | mobile | bottom sheet, grab handle, two-level track, sticky CTA bar |

## 4 · Desktop behaviour

**Open.** Pointer over a mega item, after **100ms of hover intent**. Click also opens. The plate
appears at the section's final size — opening is a fade, not a slide.

**Switch.** Moving to another mega item slides the panes their full width inside the plate while
the plate's width and height morph to the incoming section. Direction comes from item order: later
item enters from the right, earlier from the left. A switch mid-animation retargets rather than
queueing.

**Crossing a direct link.** Passing over Work, Lab or About does **not** close an open panel. It
closes on pointer leaving the bar, on Escape, or on opening another section. This is the fix for
the sweep case, where the old behaviour fired open → close → open across three items.

**Row hover** (direction B, settled): `--color-brandeis-50` fill at `--radius-8`, label and arrow
both `--color-brandeis-500`, arrow slides in from `-4px`.

**Keyboard.** Tab reaches every item; Enter/Space opens; Escape closes and returns focus to the
item; Tab from an open item enters the panel. Arrow keys are not bound — six items in one row do
not need a grid. **The plate is one box shared by three triggers, so it cannot live inside any
trigger's `<li>` and DOM order cannot supply "the panel comes next".** Tab-into-panel, Shift+Tab
back to the trigger, and Tab out of the last row are managed explicitly — see §12.4.

## 5 · Mobile behaviour (direction F)

Below `--breakpoint-1024`: bar with logo left, toggle right; the CTA moves inside the sheet.

**The sheet hugs its list.** Closed → open, it rises to the height of the six items plus the CTA
bar (~370px of an 812px screen), so every item sits in the lower half. Opening a section grows it
to `100% - var(--nav-sheet-reserve)`; back shrinks it again. The height change *is* the transition,
so both heights are measured and written as pixels — an `auto` height does not animate.

**Levels.** Root list → section pane, sliding one screen sideways. Header inside the pane: back on
the left, section name **centred, uppercase** on `--nav-label-text`. Section rows are type-only, no
glyphs.

**Sticky CTA bar**, present at both levels, pinned to the sheet's foot: **Request audit** (ghost
neutral) left, **Start a project** (solid primary) right — primary under the right thumb. A
hairline shadow appears above the bar while list remains below it.

**Not in the mobile pane:** the "All services / All expertise / All insights" hub link (removed),
and the Request Free Audit card (the sticky bar carries the offer). Working together renders as
the single primary card with its image slot.

**While the sheet is open** the page header is behind the scrim: the logo is `aria-hidden` and not
focusable. Exits are the close glyph, the scrim, and back. The mark is not a second dismiss.

## 6 · Motion

| Move | Value | Token |
|---|---|---|
| Plate morph + pane slide | 360ms | `--nav-plate-morph` → `--duration-slow` |
| Plate / row detail | 180ms | `--nav-plate-fade` → half the morph |
| Mobile surface (sheet rise, height) | 420ms | `--nav-sheet-surface` |
| Mobile level change | 320ms | `--nav-sheet-level` |
| Mobile detail | 240ms | `--nav-sheet-detail` → `--duration-medium` |
| Row stagger | 40ms per row, capped at ten | `--nav-row-stagger` |
| Chevron nudge, hover fill | 140ms | `--duration-fast`, unchanged |

The prototype's 1.5× multiplier was a review control, not a shipping value, and is not
implemented. Easing is `--easing-standard` throughout. Under `prefers-reduced-motion: reduce`
every duration above drops to `--duration-instant`; the plate still resizes, it just does not
animate.

## 7 · Tokens

Existing values used: `--nav-bar-height`, `--nav-bar-height-compact`, `--nav-rule`,
`--nav-rule-width`, `--nav-row-label-ink`, `--nav-label-ink`, `--nav-label-text`,
`--nav-title-ink`, `--nav-item-fg`, `--nav-z`, `--nav-panel-z`, `--nav-panel-max-block`,
plus `--color-brandeis-50/500/600/700`, `--color-neutral-500/950`, `--radius-4/8/full`,
`--gap-*`, `--space-*` and the `--text-*` roles.

**Group labels take `--nav-label-ink`, and the second label token §7 asked for does not exist.**
The design floated `--color-neutral-500` for them, "a step lighter than `--nav-label-ink`" — that is
**3.16:1 on paper** and fails the 4.5:1 text floor, and the design's own note made it conditional
("if that holds"). It does not. Desktop and mobile group labels are the same role at two sizes and
take the same ink: neutral-700 on paper at 8.14:1, the value the plate prototype actually used.
Recorded in §12.6.

## 8 · Edge cases

1. **A group with one link** — renders as a group of one; no special case.
2. **A section with no rail** — Expertise and Insights: the plate narrows to its content
   (880 / 720). It does not hold 1240px of empty ground.
3. **A fourth group in a mega** — panes are a grid; a third column fits inside 1240 without a
   layout change.
4. **A `planned` link whose page is missing** — the nav still renders it. See §12.5: the CI check
   the spec asks for cannot exist yet, because almost no page routes are built.
5. **A label long enough to wrap** — rows wrap to two lines and keep the arrow vertically centred
   on the first line.
6. **Sheet content taller than the screen** — the pane scrolls between the header and the CTA bar;
   the bar never overlaps it.
7. **A section opened with the keyboard, then a pointer sweep** — pointer wins; the panel follows
   the pointer.
8. **Sticky header over an anchor target** — page anchors need
   `scroll-margin-block-start: var(--nav-bar-height)`; that is the page's job, not the nav's.

## 9 · What the repo had to add

1. **Two duration tokens**, as asked: `--duration-medium: 240ms` and `--duration-slow: 360ms`.
   §6 names six distinct durations and two ramp steps cannot carry them, so the plate fade is
   derived (half the morph) and the two mobile surface values are component tokens. See §12.2.
2. **Six icon glyphs — not added, not needed.** The settled shortlist drops the first-level
   glyphs, so nothing renders them. `menu`, `close`, `chevron-down`, `chevron-right`,
   `arrow-right` and `arrow-left` all already ship.
3. **`--nav-item-bg-hover` stands.** Two hover languages accepted: bar items keep `Button`'s ghost
   fill, panel rows take direction B. A control and a row are different things and reading them
   the same way was never the goal.
4. **`status` in the sitemap generator** — deferred; there is no sitemap generator. See §12.5.

## 10 · QA

**Do**

1. Assert the nav data and the sitemap file agree on every `href`, both directions.
2. Assert exactly one `role="banner"` per route, and that the logo is not focusable while the
   mobile sheet is open.
3. Sweep the pointer across all six bar items at speed: the panel must not flicker, and must end
   on the item under the pointer.
4. Switch Services → Insights → Services and confirm the plate's height never exceeds
   `--nav-panel-max-block` and never sets the page's own height.
5. Open every section at 1280, 1440 and 1920: the plate stays centred at its own width.
6. With `prefers-reduced-motion`, confirm no transform or opacity transition runs and every state
   is still reachable.
7. On a 375px viewport, confirm all six root items sit below the vertical midpoint, and that the
   CTA bar clears the last row by 32px.

**Don't**

1. Don't add row descriptions.
2. Don't disable or hide `planned` links.
3. Don't give the plate a shadow. The system has no elevation token, and inventing one here starts
   a second system.

## 11 · Open items

1. **Audit copy.** The rail's primary/secondary order depends on it: whichever block has something
   to say takes the primary card. Until then How We Work is primary.
2. **`/audits` as the Request Free Audit target** — marked "to confirm" in the content doc.
3. **Matter Design System** has no nav route; it lives on the Lab hub and in the footer.
4. **Insights third group** (Current, Rising Topics, Latest Insights) is struck for now; the pane
   has room for it as a third column if it returns.

## 12 · Build notes — where the build departed from the spec, and why

Recorded here rather than fixed silently. Nothing below changes a designed outcome.

### 12.1 · The plate cannot be a `Section`, so it owns a ground

`Section` owns the content column (1240 cap, 32 gutter) and its ground, and CLAUDE.md forbids
overriding either from outside. The plate's box is 1240 / 880 / 720 wide and carries its own
border, radius and padding — so it cannot be a `Section` and cannot inherit `--sec-ground`. It
paints `--nav-panel-ground` instead, declared once per surface. The same token serves the mobile
sheet, which is the same idea at another size.

`nav.css` previously stated that a `--nav-ground` "would be a second name for a decision already
made one layer down". That was true while the panel WAS a full-bleed `Section`. It is not any more,
and the header comment says so.

### 12.2 · Six durations, two ramp steps

§6 names 140, 180, 240, 320, 360 and 420ms. §9 proposed two tokens. Both were honoured as far as
they go: `--duration-medium: 240ms` and `--duration-slow: 360ms` joined the ramp;
`--nav-plate-morph` reads `--duration-slow`; `--nav-sheet-detail` reads `--duration-medium`;
`--nav-plate-fade` is `calc(var(--nav-plate-morph) / 2)`, which is the 180 and states the
relationship the designer actually chose. `--nav-sheet-surface: 420ms` and
`--nav-sheet-level: 320ms` are component literals with a comment, like `--nav-bar-height` above
them. No duration is written in the stylesheet.

### 12.3 · Two measured heights

The plate's height and the sheet's hug height are content-derived and animated, and CSS cannot
transition to `auto` in browsers this repo supports. Both are measured with a `ResizeObserver` and
written as a custom property through an inline style — the same escape `Layout` already uses for
`--tmpl-*`. Each is declared with a fallback in `SiteNav.module.css`, so `tokens:check` sees a
local definition rather than an unresolved `var()`.

### 12.4 · Tab-into-panel is managed, not structural

One morphing plate cannot live inside three `<li>`s, so DOM order cannot put the panel after its
trigger. Three handlers do it explicitly: Tab from an open trigger enters the pane's first link;
Shift+Tab from that first link returns to the trigger; Tab from the last link closes the plate and
moves to the next bar control. Everything between is native tab order inside the pane. Inactive
panes are `inert`, so they hold no focus and take no pointer.

### 12.5 · The rail is a ratio, not a 340px track

`Layout` has no fixed-track mode, and a local grid to get one is the hand-rolled arrangement the
layout rule prohibits. The plate body is `Layout columns={[2, 1]} colGap="column"`, which at the
plate's own width lands the rail at **371px rather than 340**. This is the one dimension in the
component that does not match the prototype. The alternatives were both worse: fr weights chosen to
resolve to 340 at exactly 1240 (magic numbers, brittle the moment the padding or the seam moves), or
changing a tier-1 primitive every component in the repo depends on. `--nav-rail-width` was therefore
never added — a token with no reader is worse than no token. If 340 turns out to matter, the right
fix is a fixed-track mode on `Layout`, which is a conversation about the primitive.

### 12.6 · Six other decisions, each a departure worth naming

1. **The morph is gated.** §4 asks for the plate to arrive at its size on open and to travel on a
   switch. With the size transition always on, the first open animates the height up from zero and
   reads as a drawer rolling down. `NavState.morph` is true only when something was already open,
   and the stylesheet hangs the size and slide transitions off it. The prototype did the same thing
   imperatively — kill the transition, set the size, restore it across a forced reflow — which a
   render function cannot express and which does not survive a switch mid-animation.
2. **The scrim dismisses on click.** It is a child of the header and covers the viewport below the
   bar, so the pointer never leaves the header by moving down the page and §4's "closes on pointer
   leaving the bar" cannot fire in that direction. That is the prototype's behaviour too. A click on
   the dimmed page is added as the deliberate dismiss; Escape and opening another section are
   unchanged.
3. **A mega's current state comes from `matchPaths`.** A menu item has no `href` — its trigger opens
   rather than navigates — and `isActivePath(pathname, '')` treats a bare `''` as a prefix that
   every path in the site matches, which lit all three menu items on every route. Empty candidates
   are filtered, and each mega names its own section index in `matchPaths`.
4. **The sheet's row and foot padding are tuned, not scale steps.** At `--gap-text` (16) the sheet
   hugs at 483px and the first two root items sit **above** the midpoint of a 375×812 screen, which
   fails QA §10.7. `--space-12` puts the hug at 427 and the first row 5px below the line, with the
   row still 52 tall — past the 44px touch floor. Both are declared in the token layer as optical
   corrections against that screen, the same standing `--nav-bar-height` has.
5. **The sheet's root list keeps the bar's order.** The prototype rendered the three menu items
   first and the three links after. §2 says the order is content, so the sheet shows
   Services · Work · Expertise · Insights · Lab · About, exactly as the bar does.
6. **The rail card's image slot renders only when an image is passed.** `SiteNavCard.image` is a
   `ReactNode`, and the nav fixture has no artwork — the "Working together" image is §11's first
   open item. An empty framed rectangle in a live header reads as a broken image rather than as a
   placeholder, so the card is title-only without one. `/design/site-nav` and the design-sync
   preview both pass an image, so the image-led arrangement is proven somewhere.

### 12.7 · Two QA items cannot be met yet, and are not faked

**§10.1 and §8.4 (nav data ↔ sitemap, CI on unresolved hrefs).** There is no sitemap generator in
this repo and, apart from `/`, `/audits/[slug]` and the proving ground, no page routes exist at
all — every one of the 44 hrefs in the nav data is `planned`. A CI check asserting each resolves
would fail on the first run and would be asserting nothing about correctness. `status` is carried
on every link and card exactly as §2.1 specifies, so both the check and the sitemap filter are one
consumer away. Flagged, not implemented.

**§9.4 (`status` in the sitemap generator).** Same reason.

**One more, smaller.** §10.2 asserts one `role="banner"` per route. True on every site route; the
proving ground at `/design/site-nav` mounts eleven on purpose, because it is a measuring rig rather
than a page. That was already true of the previous specimen and is stated in its own header.
