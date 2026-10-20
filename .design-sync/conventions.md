## How to build with Tcules

No provider, no theme object, no wrapper component. Load `components/lib/react.js`,
`components/lib/react-dom.js` (React 19 — the bundle is built against it), `components/bundle.css`
and `components/bundle.js`, and every component is correct on `window.Tcules`.

This system is generated from the `tcules-website-2026` repository on every sync, and the repo is
the source of truth: an edit made on this page to a generated file is overwritten by the next sync.
Change the code, then sync.

<!-- ROSTER -->

### There is no class vocabulary — do not invent one

Components are CSS Modules with hashed class names. There are **no utility classes** (`p-4`,
`bg-surface`, `text-lg` do not exist and never will) and **no style props** (`color`, `bg`,
`pad`). Anything you write as a class name is guaranteed not to resolve. You style by choosing
components and props; for your own glue CSS, you use the custom properties below.

### A page is a stack of `<Section>` bands

`Section` is the full-width band. It paints the ground, owns the content column (1240 cap, 32
gutter) and the vertical air. `surface="paper | tint | ink | blue"` sets the ground and emits
`data-surface`, which every descendant reads — so a `Button` three levels deep re-colours itself
correctly without being told where it is. Set the surface once, on the band.

**Never** set `background`, `color`, `padding`, `max-width` or horizontal margin on a Section or
to override one. That is the single most damaging thing you can do here: it puts one band out of
alignment with every other band and defeats the surface model. Use `density="strip"` (24, the one-line announcement band) or `flush` (0) — there is no other
density; every band takes the same vertical air.

### All arrangement comes from three primitives

Never write `display: grid` or `display: flex` yourself.

- **`Layout`** — the columnar axis and the vertical stack. `columns={3}`, `columns={[2,1]}`,
  `columns="fit"` / `"tile"` (with `minTrack="xs|sm|md|lg"`), or per-breakpoint
  `{base, md, lg, xl}`. Also `align`, `justifyItems`, `justify`, `equalRows`, `lead`. Omit
  `columns` for a vertical stack — that is the most common Layout in the system.
  To vary the arrangement rather than repeat one `[2,1]` down the page: `reverse` mirrors a row
  of tracks from a breakpoint (bare = md up; the ratio travels with its child; **visual only**, so
  image/copy pairs, never a sequence), `offset={1|2|3}` sets the first child n tracks in (an offset
  reading column), and `pinLast` on a single-track stack pins its last child to the foot (a card's
  cta, aligned across a row of cards). All three are off by default.
- **`Cluster`** — the inline axis: wrapping rows of buttons, chips, metadata. `align`, `justify`,
  `nowrap`.

Both take `rowGap` and `colGap` as **gap-scale role names**, and **neither has a default — an
axis you do not state renders 0**. The nine steps, named for what they separate:

`inline` 4 · `tight` 8 · `text` 16 · `block` 24 · `gutter` 32 · `stack` 48 · `column` 64 ·
`section` 96 · `section-open` 128

`Layout` also accepts `none`. **`Cluster` caps at `stack`** — `column` and above are silently
ignored there, which renders as a collapsed row, so use `stack` as Cluster's largest step. A strip
of client marks is `colGap="stack" rowGap="stack"`.

Two more rules that decide whether a composition is right:

1. **Children never set their own outer spacing.** No margins on anything you put inside a
   Layout or Cluster. The container owns the gap.
2. **Vary rhythm by NESTING, not by a knob.** Tighten by grouping into an inner `Layout` with a
   smaller `rowGap`; loosen by separating. A heading's spacing is a consequence of which Layout
   it sits in.

### Custom properties, for your own glue CSS only

- **Distance** — `var(--gap-block)` and the eight other role names above. Never a raw px.
- **Type is a composite**, and size is never restated:
  `font: var(--text-h2); letter-spacing: var(--text-h2-tracking);`
  Roles: `--text-display`, `--text-h1`…`--text-h5`, `--text-lead`, `--text-body`,
  `--text-body-lg`, `--text-body-sm`, `--text-ui`, `--text-ui-lg`, `--text-ui-sm`,
  `--text-eyebrow`, `--text-caption`, `--text-micro`, `--text-quote`, `--text-stat`,
  `--text-code`. A `-tracking` companion exists for `display`, `h1`–`h5`, `eyebrow`, `micro`,
  `stat`, `ui`, `ui-sm`, `ui-lg` — pass it whenever you use those.
- **MONO IS ALWAYS UPPERCASE, in presentation only.** The six mono label roles — `ui`, `ui-sm`,
  `ui-lg`, `eyebrow`, `micro`, `stat` — take a third companion, and every rule that sets one
  writes all three:
  `font: var(--text-eyebrow); letter-spacing: var(--text-eyebrow-tracking); text-transform: var(--text-mono-case);`
  Their tracking is opened for capitals, so a mono role set lower-case reads as letter-spaced body
  text rather than as a label. **Never write the uppercase into a string** — not into copy, a prop,
  a CMS field or an `aria-label`. Pass "Read more", not "READ MORE"; the sheet does the shouting,
  and the authored capitalisation is what a screen reader announces. **A label that must stay
  sentence case is not a mono label — give it a sans role.** `--text-code` is the one exemption:
  mono there is content, and case is semantic in code.
- **Surface colour** — `--sec-ground`, `--sec-ink`, `--sec-ink-muted`, `--sec-ink-label`,
  `--sec-rule`, `--sec-rule-strong`, `--sec-accent`, `--sec-link-ink`. These are remapped per
  surface, so reading them keeps your glue correct on all four grounds. Colour has no
  surface-independent usage layer by design — do not hard-code a hex.
- Families are `--font-family-display` (Newsreader), `--font-family-sans` (Public Sans),
  `--font-family-mono` (Geist Mono).

### Read before styling

`components/bundle.css` is the authority on every custom property — it carries the whole token
layer, all four surfaces. For a component, its `components/<Name>/README.md` and `<Name>.d.ts` are
the real API, and `spec.md` beside them (where there is one) is the full decision record — read
them rather than guessing a prop. `vocabulary.md` lists every token and glyph name by role.

### An idiomatic block

This is here to show how the three primitives compose — a band, a two-column axis, a wrapping row —
and that is all it is. **It is not a template for a page's closing ask:** it happens to look like
one, and if the block you are building is the page's ask then `CtaSection` is the component, with
its form and proof slots and its three arrangements already decided. Same for a page opening, which
is `PageHero`. Reach for the primitives directly for the blocks in BETWEEN those two — with two
exceptions that have since shipped, and between them they cover most in-between blocks. If the block
is a **list of terms, steps, services or links**, that is `ListCard` inside a
`Layout as="ul" | "ol"`, not a hand-rolled stack. If it is a **grid of tiles** — services, case
studies, capabilities, anything where each item is a complete object read across rather than down —
that is `BlockCard` inside a `Layout as="ul"` with `equalRows`, not a `Section` per card and not a
hand-rolled bordered box. The right-hand column below is a single text item precisely because
neither card existed when this was written; a set of them today is one or the other.

```jsx
const { Section, Layout, Cluster, Button, Icon } = window.Tcules;

<Section surface="tint">
  <Layout columns={[2, 1]} colGap="column" rowGap="stack" align="start">
    <Layout rowGap="block">
      <h2>Design systems your engineers trust</h2>
      <p>Tokens with one answer per question, and primitives that own every distance.</p>
      <Cluster colGap="tight" rowGap="tight">
        <Button as="a" href="/contact">Start a project</Button>
        <Button emphasis="ghost" tone="neutral" iconLeft={<Icon name="download" />}>
          Download the overview
        </Button>
      </Cluster>
    </Layout>
    <Layout rowGap="text">
      <h4>What you get</h4>
      <p>A token layer, three layout primitives, and a component set with a sandbox route each.</p>
    </Layout>
  </Layout>
</Section>
```
