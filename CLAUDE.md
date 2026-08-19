# tcules-website-2026 — working rules

A clean rebuild. The previous codebase is at `../tcules-website` and is **not** a source of
patterns — see § The old repo.

## Scope: three tiers, one direction

```
app  →  templates  →  patterns  →  components  →  lib / styles
```

| Tier | Path | What lives there |
|---|---|---|
| — | `src/app/**` | routes. Composition only; read content, pass props |
| 3 | `src/templates/**` | whole page-type layouts (article shape, service-page shape) |
| 2 | `src/patterns/**` | composed blocks — hero, content section, CTA, card |
| 1 | `src/components/**` | primitives — `Section`, `Layout`, `Cluster` |
| — | `src/content/**` | the CMS seam. Imported by pages and nothing else |
| — | `src/lib/**`, `src/styles/**` | leaves. Import nothing above them |

**Imports flow one way only — never upward, never sideways within a tier.** Enforced by
`no-restricted-imports` in `eslint.config.mjs`, so a violation fails lint rather than being a
matter of discipline.

A primitive that reaches for a pattern has stopped being a primitive. A pattern that imports
`@/content` has bound a presentation unit to a data source. The previous codebase grew 111
bespoke section folders precisely because nothing stopped a block importing whatever was
nearest — that is the failure this rule exists to prevent.

**If a tier needs something the tier below does not provide, build it in the tier below.**
Never reach sideways, and never inline a one-off.

## Layout is done by the primitives. Always.

`Section`, `Layout` and `Cluster` express every arrangement in the site between them:

- **`Section`** — the full-width band. Paints the ground and owns the content column (1240 cap,
  32 gutter) and the vertical air (96, or `density="tight"` 64 / `density="open"` 128, or `flush`
  0). Every one of those values comes from `--sec-*`; the component contributes none of its own.
  `surface="paper | tint | ink | blue"` sets the ground for everything inside it.
- **`Layout`** — the columnar axis. Tracks (`3`, `[2,1]`, per-breakpoint, `fit`, `tile`) plus
  `rowGap` / `colGap`, both taking gap-scale step names. A vertical stack is the single-track case.
- **`Cluster`** — the inline axis. Wrapping rows: chips, button groups, metadata. Same scale,
  capped at `block`.

**Rules:**

1. **No hand-rolled `display: grid` / `display: flex` for arrangement.** If the primitives cannot
   express it, that is a conversation about the primitive, not a reason to write a local grid.
2. **Children never set their own outer spacing.** No margins, ever. The container owns the gap.
   A child with a margin breaks the primitive's only contract and the cause is invisible in the
   markup.
3. **Neither gap axis has a default, and that is deliberate.** An axis nobody states renders 0.
   A silent 24 looks plausible and hides an omission; a collapsed seam is wrong on sight.
4. **Non-uniform rhythm comes from NESTING, not from a rhythm knob.** Tighten by grouping, loosen
   by separating. A heading's spacing is a consequence of which `Layout` it lives in.
5. **Never override Section's content column or ground from outside.** No horizontal padding, no
   `max-width`, no background or colour via `className`. One band out of alignment with the
   others is a visible defect, and a hand-set background defeats the whole surface model.

## Tokens: three layers, and nothing outside them holds a value

The token system lives in `src/styles/tokens/` and is imported by `src/app/globals.css`. Read
`tokens/index.css` first — it states the rules and it is the only file you import.

| Layer | Where | What it holds |
|---|---|---|
| 1 · primitives | `primitives.css` | ramps and ladders. `--color-brandeis-500`, `--space-24`, `--font-size-h1`, `--line-height-h1`. Declared once, consumed through a usage token wherever one exists |
| 2 · usage | `primitives.css` | one curated answer per question. **`--gap-*` (9 steps)** and `--text-*` (17 roles). Surface-independent, therefore shared |
| 3 · components | `components/*.css` | what a value MEANS for one component. `--sec-ground`, `--btn-solid-primary-bg`. Re-declared once per surface |

**Colour has no usage layer, deliberately.** What a colour means depends entirely on the surface
— `brandeis-50` is a hover tint on paper and invisible on tint; blue as ink fails on ink and
lifts to 200. A shared `--color-bg-hover` would be wrong three times out of four. Components own
colour, per surface. That is the one asymmetry in the system and it is intentional.

### The gap scale is the only answer to "how far apart"

Nine steps, named for what they separate:

| Step | | Where it lands |
|---|---|---|
| `--gap-inline` | 4 | inside a key and its value |
| `--gap-tight` | 8 | icon to label, chip padding, a stat and its unit |
| `--gap-text` | 16 | paragraph to paragraph, cell padding on a dense table |
| `--gap-block` | 24 | head to body inside a block — the most used step |
| `--gap-gutter` | 32 | container gutter, and the gap between cards in a set |
| `--gap-stack` | 48 | block to block inside a section |
| `--gap-column` | 64 | column gutter where two halves must read as separate |
| `--gap-section` | 96 | section padding, tight |
| `--gap-section-open` | 128 | section padding, open |

1. **Layout distance never comes from `--space-*`.** The space ramp exists so the gap scale can be
   built from it. A component may reach the ramp for an **optical correction** — a label's
   side-bearing margin, a ring offset — and must say so in a comment on the token, as
   `button.css` does.
2. **A distance that is not one of these nine is a mistake or a new step.** Decide which. Do not
   split the difference.
3. **A step is chosen by what it separates, never by how it looks at one width.** The scale does
   not shift responsively — the *layout* changes at a breakpoint, the distance does not. Do not
   add a media query that swaps one step for another.

`Layout` and `Cluster` take these names directly as `rowGap` / `colGap` values. Cluster caps at
`block`: a wrapping chip row has no use for a 48px block beat.

### The other rules that matter day to day

1. **No stylesheet outside `tokens/` writes a hex, a raw distance or a font stack.**
   `npm run tokens:check` enforces both halves — it fails on a `var()` that resolves to nothing
   and on a literal colour outside the token layer. Run it before you commit CSS.
2. **A component never reads another component's tokens.** Shared values are primitives or usage
   tokens, or they are duplicated on purpose.
3. **Surface is declared with `data-surface="paper | tint | ink | blue"` on an ancestor** — a
   Section — never on the control itself. That is what lets a button three components deep get
   the right treatment without being told where it is.
4. **Type is consumed as a composite:** `font: var(--text-h2)` plus
   `letter-spacing: var(--text-h2-tracking)`. Never restate a size or a ratio. Title roles
   re-declare themselves at 1023px and 767px, so a rule needs no breakpoint of its own for type.

   Size **and** line height are laddered by role — `--font-size-h2` pairs with
   `--line-height-h2`, and both carry `-t` / `-m` breakpoint steps. They are one typographic
   decision, so they are named and changed together; if you add a size, add its ratio in the
   same edit. Letter-spacing is the deliberate exception: tracking corrects an optical error at
   a size rather than marking a step, and one correction serves several roles, which is why h2,
   h3 and h4 share `--letter-spacing-title{,-tight,-fine}`.
5. **Adding a component layer:** copy the shape of `tokens/components/button.css` — geometry in
   `:root`, then one block per surface with deltas only. Name tokens
   `--{abbrev}-{variant}-{part}-{state}`, register the file in `tokens/index.css`, keep it to the
   one component.

### Why component tokens live in `tokens/`, not beside the component

Asked and settled. They stay in `tokens/components/*.css` for one decisive reason: **`index.css`
guarantees cascade order**, and a component layer must come after the primitives and usage tokens
it reads. Colocating them as `Section.tokens.css` would hand that ordering to the bundler's
module graph, which is not something you control — and a component layer that loads before the
usage layer resolves to nothing, silently.

Two supporting reasons: surface remaps are `:root` / `[data-surface]` declarations, which are
global by nature and not what CSS Modules are for; and the token set is authored and delivered as
one portable folder, so splitting it means a new delivery can no longer be dropped in.

The cost is that `Section/` does not contain everything about Section. The naming convention
(`--sec-*` ↔ `Section`) and `tokens:check` cover the gap.

**`src/styles/reset.css` is not a token file and is not optional.** `box-sizing: border-box` is
required for `Section` to function at all, and zeroed heading margins are required for `Layout`'s
gaps to be the only spacing. It deliberately states no type and no colour — both come from the
tokens, applied in `globals.css`.

**Base element typography lives in `globals.css`** — five heading rules, links and code, mapping
bare elements onto the composites. It is a floor, not the answer: a `Heading` component with a
`size` prop is the right home, because a page routinely needs an h2-level element at h3 scale and
the element name should not decide the scale.

## Every component is a folder

```
src/components/Section/
├── Section.tsx
├── Section.module.css
└── index.ts
```

CSS Modules only — no Tailwind, no CSS-in-JS, no inline style objects for anything a class can
express. Runtime dependencies are `next`, `react`, `react-dom`, and adding a fourth needs a
reason. `src/lib/cx.ts` joins class names; it is three lines and needs no package.

Re-export from the tier barrel (`src/components/index.ts`) so call sites import
`@/components`, not a deep path.

## Nothing gets a page route before it has a `design/` route

`src/app/design/**` is the proving ground: one route per component, **every** arrangement
rendered. It holds `page.tsx` files only — components are never defined there.

This is the highest-leverage rule in the file. In the previous codebase the components that had
sandbox routes are in good shape and the 111 that did not are the reason for this rebuild.

Register the specimen in the `SPECIMENS` list in `src/app/design/page.tsx` by hand, so the index
stays honest about what is actually covered.

## Routes are named once

Every path lives in `src/lib/routes.ts`. Paths get referenced from nav, footers, breadcrumbs,
sitemaps, redirects and cross-links, so a literal written in each of those turns any URL decision
into a hunt. The previous codebase carried an unresolved `/work` vs `/case-studies` question with
a five-file blast radius for exactly this reason.

## Content: pages read the seam, never a source

```
src/content/
├── types.ts              view models — the shapes a PAGE consumes
├── source.ts             getPage(slug) · listPages() — import from HERE
└── sources/
    ├── fixtures.ts       active
    └── strapi.ts         stub
```

**Pages import `@/content`. Nothing imports `@/content/sources/*` directly.** Switching the site
from fixtures to Strapi is one assignment in `source.ts`.

**Type against the view model, never against the CMS response.** If pages type against Strapi's
shape then every Strapi remodel is a change to every page. The mapping from CMS shape to view
model lives inside `sources/strapi.ts` and nowhere else — nothing above it learns that Strapi
exists.

Patterns and templates may not import `@/content` at all; they take what they render as props.
That is what lets one pattern serve a fixture today and a CMS response later.

## The old repo

`../tcules-website` is reference for **specific, named things only** — never for patterns, never
for "how did we do this before". Reads of its polluted paths are denied in
`.claude/settings.json`: the 111 Tailwind sections, the old Header/Footer, `src/theme/*`,
`tailwind.config.ts`, the GraphQL layer, the Strapi types, `src/app/**`.

`Section`, `Layout` and `Cluster` were lifted from it and are the only things that were. Do not
port anything else without being asked — and if something there looks useful, **build it properly
here** rather than copying it across.

## Design quality

A layout that repeats one shape down the page is a failure even when every piece is correct.
Clean does not mean plain, and "not busy" is not an argument for "not designed".

- Visual weight comes from **scale, imagery and position** — not from decoration, borders, or a
  tinted background band.
- Vary the arrangement between blocks rather than the ground behind them.
- A secondary column that is only text is a missed opportunity; give every item a shape.
- **Before shipping a composition:** if you squint, does it read as more than one idea? If every
  block is the same rectangle at the same size, it is not finished.

## Global vs. local: decide before applying any UI change

Most requests are meant **globally**, for reuse. Before applying a visual or structural change,
decide whether it belongs to the component, a token, or this one instance — then say which, in
one line, before applying.

Ask: would every other instance want this same change? Does the component need a new prop,
variant or slot to take it cleanly — and would it be better for having one? Only a change that is
genuinely specific to one instance stays local.

When it is a genuine close call, say so and ask.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
