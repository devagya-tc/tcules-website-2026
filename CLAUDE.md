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

- **`Section`** — the full-width band. Owns the content column (inset ramp + 1280 cap) and the
  vertical rhythm (64 → 96 → 128, stepping at 768/1024). Vertical rhythm is **system-owned**:
  there is no prop for it, and `flush` is the only escape.
- **`Layout`** — the columnar axis. Tracks (`3`, `[2,1]`, per-breakpoint, `fit`, `tile`) plus
  `rowGap` / `colGap`. A vertical stack is the single-track case.
- **`Cluster`** — the inline axis. Wrapping rows: chips, button groups, metadata.

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
5. **Never override Section's content column from outside.** No horizontal padding, no
   `max-width` via `className`. One band out of alignment with the others is a visible defect.

## No token system yet

Colour, typography, the spacing scale, focus rings and elevation **do not exist in this repo
yet**. They arrive as `src/styles/tokens/**` and are wired in deliberately.

**What that means while building:**

- Every gap rung in the primitives reads `var(--gap-lg, 1.5rem)`. Nothing defines `--gap-*`, so
  the literal is used. **When the token system lands and declares `--gap-lg` on `:root`, it
  inherits in and wins over the fallback automatically** — no component edit, no migration step.
  That is why token *names* are already written into the CSS.
- **Do not add colour to `src/components`, `src/patterns` or `src/templates`.** Not "temporarily",
  not "just a grey". A placeholder colour becomes a thing to hunt down later, and there is no
  semantic role to hang it on yet. The greys in `src/app/design/_specimen/` are measuring chrome
  for the proving ground and are the single exception — nothing outside that folder may look
  like it.
- **`src/styles/reset.css` is not a token file and is not optional.** `box-sizing: border-box` is
  required for `Section` to function at all, and zeroed heading margins are required for
  `Layout`'s gaps to be the only spacing. Read the file before changing it.

**Deferred, and tracked:** `Section`'s tonal `surface` prop and `theme="dark"` island; the
responsive stepping on the `xl` / `2xl` / `3xl` gap rungs; a `tokens:check` script that asserts
every `var(--…)` in a `*.module.css` resolves to a defined token. All three land with the tokens.

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
