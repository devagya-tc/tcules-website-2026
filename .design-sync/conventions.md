## How to build with Tcules

No provider, no theme object, no wrapper component. Load `styles.css` and `_ds_bundle.js` and
every component is correct. All 12 are on `window.Tcules`: `Section`, `Layout`, `Cluster`,
`Button`, `Icon`, `Logo`, `Prose`, `SiteNav`, `SiteFooter`, `Breadcrumbs`, `PageHero`,
`CtaSection`.

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
alignment with every other band and defeats the surface model. Use `density="tight" | "open"`
(64 / 128 against the default 96) or `flush` (0) for vertical air.

### All arrangement comes from three primitives

Never write `display: grid` or `display: flex` yourself.

- **`Layout`** — the columnar axis and the vertical stack. `columns={3}`, `columns={[2,1]}`,
  `columns="fit"` / `"tile"` (with `minTrack="xs|sm|md|lg"`), or per-breakpoint
  `{base, md, lg, xl}`. Also `align`, `justifyItems`, `justify`, `equalRows`. Omit `columns` for
  a vertical stack — that is the most common Layout in the system.
- **`Cluster`** — the inline axis: wrapping rows of buttons, chips, metadata. `align`, `justify`,
  `nowrap`.

Both take `rowGap` and `colGap` as **gap-scale role names**, and **neither has a default — an
axis you do not state renders 0**. The nine steps, named for what they separate:

`inline` 4 · `tight` 8 · `text` 16 · `block` 24 · `gutter` 32 · `stack` 48 · `column` 64 ·
`section` 96 · `section-open` 128

`Layout` also accepts `none`. **`Cluster` caps at `block`** — `gutter` and above are silently
ignored there, which renders as a collapsed row, so use `block` as Cluster's largest step.

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
- **Surface colour** — `--sec-ground`, `--sec-ink`, `--sec-ink-muted`, `--sec-ink-label`,
  `--sec-rule`, `--sec-rule-strong`, `--sec-accent`, `--sec-link-ink`. These are remapped per
  surface, so reading them keeps your glue correct on all four grounds. Colour has no
  surface-independent usage layer by design — do not hard-code a hex.
- Families are `--font-family-display` (Newsreader), `--font-family-sans` (Public Sans),
  `--font-family-mono` (Geist Mono).

### Components

`Button` — `emphasis="solid|ghost|link"` × `tone="primary|neutral"`, `size="sm|md|lg"`, plus
`icon` / `iconLeft` (one side only), `iconOnly` (requires `aria-label`), `active`, `disabled`.
A button that navigates is an anchor: `as="a" href="…"`. It never sets its own outer spacing —
put it in a `Cluster`.

`Icon` — `name` is a 17-value union (`arrow-right`, `check`, `chevron-down`, `design-systems`,
`software-development`, …; the full list is in `Icon.d.ts`). Decorative and `aria-hidden` by
default; pass `label` only when the glyph carries meaning alone. Inside a Button the button
decides the size.

`Prose` — the rich-text flow, for a CMS body string via `html` or JSX via `children`. It is the
one component allowed to use margins internally.

`SiteNav` / `SiteFooter` — whole page furniture, driven entirely by props (`items` + `cta`;
`brand`/`groups`/`newsletter`/`meta`/`utility`). Both take `surface`.

`Breadcrumbs` — the ancestor trail above a page hero: `items` (an array of `{ label, href }`,
two or more; fewer renders nothing) and `surface`. It states position; it is not navigation —
`SiteNav` is. The last item is always the current page and is rendered as text, never a link, and
four or more levels collapse to four with the middle elided, so depth costs nothing.

It **brings its own band** — like `SiteNav` and `SiteFooter`, and that is why it takes `surface`
rather than reading one. So place it as a **direct child of the page**, never inside a `Section`
(the content column would inset twice) and never inside a `Layout` (a band is not a row). It
gives 64 of air above itself and almost none below, because the air below belongs to the band
that follows it — put the hero's `Section` immediately after and set both `surface` values the
same, or the seam between them reads as a two-tone split.

```jsx
<Breadcrumbs surface="paper" items={[
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Interaction and UI Design', href: '/services/interaction-ui-design' },
]} />
<PageHero surface="paper" title="Interaction and UI Design" body={['…the opening…']} />
```

`PageHero` — **the opening of a page, and the component that owns its `h1`.** `title` (a string),
`body` (one to six paragraph strings, the first of which renders as the lead), plus four optional
slots: `eyebrow` (a category label above the title), `credits` (role groups — `author`, `host`,
`guest`, `reviewer` — each with its own `people`), `dates` (`published`, optional `modified`), and
`actions` (nought, one or two `{ label, href }`; the first renders solid, the second ghost).
`children` is a free slot between the byline and the actions. And `surface`, because this one
brings its own band too.

Four things to get right, because each of them is a decision the component has already made:

1. **Do not build a hero out of a `Section`.** This is the most likely mistake now that the
   component exists — a `Section` with an `h1`, a `Layout` and a `Cluster` inside it will look
   close and will be wrong: the measures, the 24/16/48 rhythm, the lead-versus-body type split and
   the four-surface inks are all inside `PageHero`. Reach for it whenever a page needs an opening.
2. **One per page, always first inside `<main>`, never a second one.** Two heroes are two `h1`s.
   `title` is typed as a string precisely so an element cannot be passed into it.
3. **There is no `variant`, and asking for one is asking for the wrong thing.** A plain page, an
   article and a case study are the same arrangement with different slots filled — an article is a
   hero *with* `credits` and `dates`, nothing more. Compose by filling slots.
4. **It is a band, so it is a direct child of the page** — never inside a `Section`, a `Layout` or
   a `Cluster` — and its `surface` must match the `Breadcrumbs` above it, as in the example above.
   It gives 96 of air above and below, which is the air the trail deliberately does not give.

`CtaSection` — **the page's ask, made once.** `heading` (an `h2`, never an `h1`), `body` (one or two
paragraph strings), optional `eyebrow` and `points` (a list of `{ label, detail? }`), `surface`, and
then whichever slots the arrangement asks for. It brings its own band and labels its own region from
its heading, so it needs no `aria-label`.

**Three arrangements, and they are three JOBS rather than three densities of one shape.** Pick by
what the page is asking the reader to do:

| `arrangement` | The page asks for | Takes |
|---|---|---|
| `split` (default) | an **enquiry** | `form` + `scheduleHref`, optionally `proof` |
| `open` | a **click** | one or two `actions`, optionally `proof` |
| `offer` | an **interruption** — the free audit, mid-scroll | either `form` + `scheduleHref` **or** `actions`; never `proof` |

Two things follow, and both are load-bearing:

1. **The combinations are enforced by the type, not by convention.** `arrangement="open"` with a
   `form`, or `arrangement="offer"` with `proof`, does not compile. So choose the arrangement, fill
   what it asks for, and let the type refuse the rest — do not reach for a prop the table above
   does not list against your arrangement.
2. **`form` and `proof` are caller-supplied `ReactNode` slots, and neither is styled by this
   component.** There is no field or form component in this library yet, so a page passes its own.
   A preview card showing browser-default inputs is showing an empty slot, not an intended design.

### Read before styling

This design system's `styles.css` and its `@import` closure (the token definitions all live in
`_ds_bundle.css`, which `styles.css` imports) are the authority on every custom property. For a
component, `components/<group>/<Name>/<Name>.prompt.md` and `<Name>.d.ts` are the real API —
read them rather than guessing a prop.

### An idiomatic block

This is here to show how the three primitives compose — a band, a two-column axis, a wrapping row —
and that is all it is. **It is not a template for a page's closing ask:** it happens to look like
one, and if the block you are building is the page's ask then `CtaSection` is the component, with
its form and proof slots and its three arrangements already decided. Same for a page opening, which
is `PageHero`. Reach for the primitives directly for the blocks in BETWEEN those two.

```jsx
const { Section, Layout, Cluster, Button, Icon } = window.Tcules;

<Section surface="tint" density="tight">
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
