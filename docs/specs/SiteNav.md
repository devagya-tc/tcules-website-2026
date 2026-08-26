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
| `pane` | one per mega section | 1120 / 780 / 560px wide; two label + link columns, plus the rail in Services |
| `hubBar` | `Cluster` + `Button emphasis="link"` | the way through to the section index — Services and Insights only. Hairline above, `--gap-text` under it |
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

**The sheet hugs its list, at BOTH levels.** Closed → open it rises to the height of the six items
plus the CTA bar; opening a section grows it to that section's own content, capped at
`100% - var(--nav-sheet-reserve)`. One rule, `min(hug, full)`, in both places — §5 originally said a
section grows to the full height flat, and that left the one short section (Insights) 67px shorter
than its own bottom edge. See §12.14. Every height is measured and written as pixels, because the
height change *is* the transition and an `auto` height does not animate.

Measured on a 375×812 screen: root **428**, Insights **657** (hugs), Services and Expertise **724**
(both overrun the cap and scroll). The sticky foot does not move between any of them — the sheet is
anchored to the bottom of the viewport, so only its top edge travels.

**Levels.** Root list → section pane, sliding one screen sideways. Header inside the pane: back on
the left, section name **centred, uppercase** on `--nav-label-text`. Section rows are type-only, no
glyphs.

**Sticky CTA bar**, present at both levels, pinned to the sheet's foot: **Request audit** (ghost
neutral) left, **Start a project** (solid primary) right — primary under the right thumb. A
hairline shadow appears above the bar while list remains below it.

**The hub link IS in the mobile pane**, at the end of the scrolling list, exactly as it is at the
foot of the plate — see §12.12. It is not in the sticky foot: the foot is where the offers live, and
a third action in the one strip a thumb can reach would compete with both of them.

**Not in the mobile pane:** the Request Free Audit card, because the sticky bar carries that offer.
Working together renders as the single primary card with its image slot.

**Type in the sheet does not follow the plate all the way down.** Section-pane links are `body-sm`,
matching the plate's rows — the same destination should not be two sizes. The six ROOT rows stay
`body-lg`: they are the primary targets on a touch surface, where a small row costs more than it
does under a cursor, and their 52px height is what puts all six below the midpoint of a 375x812
screen (§10.7). The sheet also has no width pressure to relieve, which is the whole reason the plate
shrank.

**Swipe down to dismiss.** The grab handle promises a gesture and now performs one: a downward drag
puts the whole sheet away — section and all — rather than stepping back a level, because Back
already means "up one" and the swipe means "put this away". It travels with the finger.

A drag may start on the handle or the header always, and on the list only when that list is already
scrolled to its top and the movement is downward; anything else is left to scroll. It is not claimed
until the pointer passes `--nav-drag-slop`, so a tap stays a tap — and once claimed, the click that
would follow on release is swallowed, or flicking the sheet away from a row would dismiss it and
then navigate to that row. Release dismisses past `--nav-sheet-dismiss-distance` (56) or on a flick
over `--nav-sheet-dismiss-velocity` that has also travelled `--nav-sheet-dismiss-flick-distance`
(24); otherwise it snaps back.

**While the sheet is open** the page header is behind the scrim: the logo is `aria-hidden` and not
focusable. Exits are the close glyph, the scrim, back, and the swipe. The mark is not a second
dismiss.

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
   (780 / 560). It does not hold the widest plate's width in empty ground.
3. **A fourth group in a mega** — panes are a grid; a third column fits inside the widest plate without a
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
2b. **In the sheet, assert all six root rows share one left edge and one right edge.** Three are
   `<button>` and three are `<a>`; any property a UA sets differently on the two — padding, border,
   font — is a 6px step in the list unless the shared class states it. See §12.8.
3. Sweep the pointer across all six bar items at speed: the panel must not flicker, and must end
   on the item under the pointer.
4. Switch Services → Insights → Services and confirm the plate's height never exceeds
   `--nav-panel-max-block` and never sets the page's own height.
5. Open every section at 1280, 1440 and 1920: the plate stays centred at its own width.
   **And at a SHORT viewport — 560 and 400 — where the height cap engages: the plate must end on or
   above the viewport's bottom edge, and the last row must scroll into view.** Every geometry defect
   in §12.7 hid at 1440x900, where the cap never bites.
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
overriding either from outside. The plate's box is 1120 / 780 / 560 wide and carries its own
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
layout rule prohibits. The plate body is `Layout columns={[5, 3]} colGap="column"`, which at the
plate's own width lands the rail at **308px rather than 340** — near enough what was asked for, and
now the term the ratio exists to hold still (§12.10). The alternatives were both worse: fr weights chosen to
resolve to 340 at exactly one plate width (magic numbers, brittle the moment the padding or the seam moves), or
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

### 12.7 · Six overlap defects found by measuring the open plate

None of the six checks can see geometry, and none of these was visible at a 1440x900 desktop with
the default content. All were measured and are fixed.

1. **The plate hung off the bottom of the screen.** `--nav-panel-max-block` was
   `100dvh - --nav-bar-height`, but `--nav-bar-height` is the bar ROW's height and the bar also
   draws a hairline under it — and the plate then starts one `--nav-plate-inset` below that. At a
   560px viewport the bottom of a maxed plate sat 17px below the fold, unreachable by scrolling
   because the thing hanging off the screen WAS the pane's scroll container. The cap now subtracts
   all three terms, and the inset is a token so the stage's padding and the cap cannot drift apart.
   At 400px the plate now ends exactly on the viewport's bottom edge and the last row scrolls into
   view.
2. **The plate clipped the last 2px of every pane.** `--nav-plate-block` is the pane's border box
   and the plate is `box-sizing: border-box`, so handing the raw value over left the plate's content
   box two hairlines short. The plate's `block-size` now adds them back.
3. **A pane's measured height was wrong for the width it would be rendered at.** Panes were clamped
   by `max-inline-size: 100%` of the plate, so while the narrow Insights pane was open the widest
   Services pane laid out 718 wide, wrapped to nearly twice its height, hit the viewport cap and
   recorded 488 — and the plate then opened Services 86px taller than its content, permanently. The
   stage is now an inline-size container and both the plate and every pane size against `100cqi`, so
   a pane's width no longer depends on whose turn it is. That forced the scrim out of the stage:
   `container-type` brings `contain: layout`, which would have made the stage the containing block
   for a `position: fixed` scrim and positioned it against an 18px box.
4. **The scrim covered the bar's own hairline** and dimmed it by 20%, for the same
   row-height-is-not-bar-height reason as (1). Both scrims now start below the rule.
5. **A two-pixel broken frame.** With no measurement yet the plate is two hairlines tall and
   `overflow: hidden` clips every pane to nothing, so hovering within a frame of load showed a 2px
   line that then snapped open. The stage only opens once the shown pane has a height.
6. **`aria-expanded="false"` on the sheet's drill-in buttons**, which could never become true —
   they push the sheet to a second level and scroll themselves out of view rather than revealing a
   region in place. Removed; there were seven `aria-expanded` nodes in one header and now there are
   four.

A seventh, found while fixing (1) and (2) together: capping the plate and the pane at the same
number let the plate clamp itself back to the cap while the pane stayed two hairlines taller, which
re-clipped the last row at exactly the viewport height where the cap starts to bite. The pane's cap
is now the plate's cap less its borders.

**What made these findable:** measuring the open plate's boxes against the viewport rather than
looking at it. `tokens:check` and `classes:check` cannot see a box, and the default 1440x900 desktop
is a viewport tall enough that the cap never engages — which is why the QA list in §10 asks for
1280, 1440 and 1920 and should also ask for a SHORT viewport. Worth adding.

### 12.8 · The sheet's rows did not line up

The three rows that open a section are `<button>`; the three that navigate are `<a>`. A UA gives a
button `padding-inline: 6px` and an anchor none, and `.sheetControl` — the one class both wear —
stated `padding-block` and `border` but not `padding-inline`. So **Services, Expertise and Insights
sat 6px further in than Work, Lab and About**, labels and chevrons both. Measured: labels at x=27
against x=21.

`reset.css` does not zero button padding, and should not be asked to: it states only what `Section`
and `Layout` cannot function without, and zeroing it globally would reach every control in the repo
to correct one component's row. **A class worn by two element types owns the difference between
them** — so `.sheetControl` now states `padding-inline` explicitly, for the same reason it already
stated `border: 0`.

The desktop bar has the same button-and-anchor mix and was already correct, because `Button` states
its own padding — which is the argument for controls being `Button` wherever one fits, and the
reason this only bit the one row that is hand-rolled.

### 12.10 · The widths and the pane ratio both answer to the row type

The spec set three plate widths against 18px rows. The rows are 14px now, and all three widths and
the pane ratio moved with them — recorded here because the numbers in §3 and §8 are consequences,
not decisions, and the next type change invalidates them again.

**Measured at 18px, then at 14px with the old widths:**

| Section | Plate | Column track | Longest label | Slack per column |
|---|---|---|---|---|
| Services | 1240 | 339 | 230 ("Product Modernisation Assessment") | 109 — and **191** in the first column, whose longest is 148 |
| Expertise | 880 | 376 | 293 | 83 |
| Insights | 720 | 296 | 133 | 163 — better than half air |

The number that decided it was not the slack but the **255px between column one's text and column
two's text** in Services: the 64px seam plus 191px of unused track, so a fifth of the plate was the
gap between two lists and the two groups stopped reading as one block.

**Now:** 1120 / 780 / 560, and the pane ratio `[2, 1]` → `[5, 3]`.

The ratio change is the part worth understanding. Narrowing Services under `[2, 1]` would have taken
the 120px off the rail as well — content 307 → 266 — shrinking the one column whose width buys
something, its 16:7 image slot. At `[5, 3]` the rail lands back on **308**, unchanged, and the whole
cut falls on the two link columns: track 339 → 278 against a longest label of 230, so column two is
properly filled, the inter-column gap drops to 194, and nothing wraps. Expertise 780 leaves 33px of
slack, Insights 560 leaves 83px.

**What was given up.** 1240 was `--sec-max-inline`, so the widest plate lined up with every band on
the page behind it. That was worth having when the plate was full; at 14px it bought an alignment
nobody can see through a 20% scrim in exchange for the 255px hole. **If the row type ever goes back
up, this is the first decision to revisit** — and the arithmetic to redo is: widest label in a
column, doubled, plus one `--gap-column` seam and two `--gap-gutter` edges, then a ratio that leaves
the rail at ~308.

### 12.12 · The hub link came back to mobile, and §5 was wrong to bracket it with the card

§5 listed two things as "not in the mobile pane" — the hub link and the Request Free Audit card —
and gave one reason, "the sticky bar carries the offer". That reason only covers the card. The hub
link is not an offer and duplicates nothing: it is the only route to a section's own index, because
a mega's trigger opens rather than navigates. So it is in the sheet now, at the end of the scrolling
list, with the same hairline treatment it has on the plate.

It sits INSIDE the list rather than pinned in the foot. The foot holds the two offers, and a phone
gives you one strip a thumb reaches comfortably; a third action in it competes with both.

**The touch floor moved with the type and had to be re-derived.** `--nav-sheet-link-padding-block`
was `--space-10`, commented as "44px row from a 24px line" — true at `body` (25.6px line, 45.6 row).
At `body-sm` the line box is 21.7, which would have taken the row to 41.7 and put it under the 44px
floor. `--space-12` lands it at 45.7. The type and the padding are one decision: re-point the type
and re-derive the padding as `(44 - line) / 2`.

### 12.14 · A section pane hugs its content too

§5 said a section "grows it to `100% - 88px`", flat. Measured, that made the sheet taller than what
was in it for the one short section: Insights' content came to 530 in a 597 list box — **67px of
dead space above the sticky foot** — while Services (819) and Expertise (657) both overran the cap
and scrolled regardless.

It is now `min(hug, full)` at both levels, which is the rule the ROOT already used. That matters more
than the 67px: a section that forced itself full was the last place in this component where a surface
was bigger than its content, and removing it is the same correction the desktop plate got when its
three widths came down to fit their columns.

**The argument I expected to lose on, and didn't.** A varying section height sounds like it would
move the sticky foot, which is the one target a thumb aims at. It does not: the sheet is
`inset-block-end: 0`, so the foot sits on the viewport's bottom edge whatever the height, and only
the top edge travels — which is already what the root→section transition does on purpose. Verified:
`footBottom` is 812 on an 812 screen at every level.

**And it exposed a 1px error in the ROOT hug, which had been there since the sheet was built.** Both
hug heights are sums of border boxes, and the sheet is `box-sizing: border-box` with one hairline on
the block axis — so handing either sum over raw left the content box a hairline short and made the
list scrollable by 1px at a height meant to fit it exactly. Both now add `var(--nav-rule-width)`.
The same arithmetic §12.7 records for the plate, missed here because 1px of scroll is invisible
until you compare `scrollHeight` against `clientHeight`.

### 12.16 · Swipe to dismiss, and the two thresholds that had to be measured

Not in the spec, and the handle had been drawn for it since the sheet was built — an affordance
promising a gesture that did nothing.

**Where a drag may start is the whole design.** The handle and the header carry
`touch-action: none`, so the browser hands over the pointer rather than deciding to scroll with it;
that is scoped to those two elements alone, so the list keeps its own panning. A drag from the list
is allowed as well, but only at `scrollTop <= 0` and only downward — otherwise a swipe meant to
scroll would throw the sheet off the screen. Verified: a downward drag begun while the list was
scrolled to 200 does nothing at all.

**Two thresholds, and the second one was wrong on the first attempt.** Distance is 56px. The flick
gate was originally velocity plus the 8px slop, and testing it showed a fast 9px twitch dismissing
the sheet — the thumb barely moved and the navigation was gone. A flick now has to travel 24px as
well as move fast.

**The click has to be swallowed.** A drag begun on a row and released past the threshold dismissed
the sheet *and* followed that row's link. A capture-phase guard, armed the instant the drag is
claimed and consumed by the next click, fixes it. Verified: a 100px drag starting on the Work link
dismisses and leaves `location.pathname` at `/`.

Seven cases were driven to confirm it: a slow 20px drag snaps back; a slow 100px drag dismisses; a
32px flick dismisses; an upward swipe from a row is ignored; a downward drag from a link dismisses
without navigating; a downward drag from a mid-scrolled list is ignored; and a drag from a section
header dismisses the sheet entirely rather than returning to the root.

### 12.17 · The sheet's header spacing was a hierarchy inversion, not just tightness

The first group label in a section pane sat 8px under the header's rule and 8px above its own first
link — **equidistant**, so it read as floating between two things rather than heading the list it
belongs to. That is what made the eyebrow hard to parse; the fix is a ratio, not more air. The
body's top step is `--gap-block`, which puts the label three times closer to its list than to the
rule and costs the header the same beat as any other group boundary in the pane — which is what it
is.

### 12.18 · Two QA items cannot be met yet, and are not faked

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
