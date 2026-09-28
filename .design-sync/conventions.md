## How to build with Tcules

No provider, no theme object, no wrapper component. Load `styles.css` and `_ds_bundle.js` and
every component is correct. All 20 are on `window.Tcules`: `Section`, `Layout`, `Cluster`,
`Input`, `Button`, `Icon`, `Logo`, `Prose`, `SiteNav`, `SiteFooter`, `Breadcrumbs`, `PageHero`,
`CtaSection`, `EnquiryForm`, `ListCard`, `BlockCard`, `Accordion`, `Proof`, `Figure`, `Callout`.

### Do not run `check_design_system` — it cannot pass, by construction

Its two findings are permanent and neither is a defect. The **unregistered custom properties** are
hashed CSS Module locals (`.Layout_rowgap-none { --layout-row-gap: 0 }`) — component-internal
plumbing that is correctly scoped and is not a theme token. The **unclassified tokens**
(`--opacity-faint`, `--z-*`, `--duration-*`, `--easing-standard`,
`--border-width-hairline-print`) are real `:root` tokens that the checker wants `/* @kind other */`
comments on; **the bundler strips every authored CSS comment**, so an annotation added in the repo
never reaches `_ds_bundle.css`. There is nothing upstream to fix and no version of this system that
reports clean. Run it only if a rendered component is actually wrong.

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

### Components

`Button` — `emphasis="solid|ghost|link"` × `tone="primary|neutral"`, `size="sm|md|lg"`, plus
`icon` / `iconLeft` (one side only), `iconOnly` (requires `aria-label`), `active`, `disabled`.
A button that navigates is an anchor: `as="a" href="…"`. It never sets its own outer spacing —
put it in a `Cluster`.

`Icon` — `name` is a 14-value union (`arrow-right`, `check`, `chevron-down`, `square-arrow-right-up`,
`info-circle`, …; the full list is in `Icon.d.ts`). Decorative and `aria-hidden` by
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
   component.** But **`EnquiryForm` is now what goes in the `form` slot** — that is the composition
   the design intends, and it is the whole reason the slot is a `ReactNode` rather than a boolean.
   This passage used to say no field or form component existed; both do now, so do not hand-roll
   one. `proof` is still genuinely caller-supplied until a `Proof` pattern exists.

`Input` — **the control box, and nothing else.** `emphasis="standard | quiet"`, `invalid`, and
`as="textarea"` for the multiline variant; every applicable native attribute passes through. It
renders no label, no validation message and no spacing to its siblings — those belong to whatever
composes it.

Two things to get right:

1. **Always give it a label.** A wrapping `<label>` or an external `<label for>` is what supplies
   the accessible name, and for the 40px `quiet` emphasis it also supplies the touch target — the
   label forwards a tap natively and is comfortably over 44px, which the control alone is not. No
   prop can enforce this: both wiring routes are invisible to the type.
2. **`standard` is the one to reach for.** `quiet` exists to preserve `SiteFooter`'s lower-chrome
   row and stays 40px at every width; `standard` steps to 44 on a phone. Choosing `quiet` for a
   form is choosing the footer's compromise for no reason.

`EnquiryForm` — **the enquiry, as a form.** `action` (required), `variant="enquiry | audit"`,
`urlLabel` (one of three fixed phrasings, or the audit one), a required `context` object, and an
optional `onSubmitted`. It renders the fields, the labels, the validation copy and the submit.

Three things to know:

1. **It goes in a `CtaSection`'s `form` slot.** It brings no band of its own, and that pairing is
   the only composition the design intends.
2. **`context` is required as a whole object**, not six optional props — a submission that does not
   know which page it came from produces a lead nobody can route. The `audit` variant additionally
   requires `context.intent`, and forbids it on `enquiry`.
3. **Four of its states cannot appear in a card.** Invalid, submitting, error and success all need a
   live endpoint and a real interaction. What a card shows is the idle shape — including the line
   reserved under each field, which is why a validation message never pushes the submit down.

`ListCard` — **one ruled row in a list, and the smallest card in the system.** `title`, `body`, an
optional `marker`, `arrangement="split | stacked"`, `titleAs="span | h3 | h4"` and an optional
`href`. It is a closed record: no `children`, no `className`, no DOM spread.

It is a ROW, not a panel — no background, no surrounding border, no shadow. Its only edge is a
hairline at the block end, which is what lets a set of them read as one continuous ladder instead of
a stack of separate objects. **If you need a bordered object, this is not it — that is `BlockCard`,
below.** Do not reach for `ListCard` and add a ground around it. Neither of them paints a ground;
the difference is the edge, and it is the whole difference between a ladder and a grid of tiles.

Four things to get right:

1. **It renders an `<li>`, so the parent list is yours — and it is a `Layout`, not a bare `<ul>`.**
   `<Layout as="ol" rowGap="none">` when position is part of the meaning (a numbered sequence, a
   process), `<Layout as="ul" rowGap="none">` when it is not (terms, services, links). `rowGap` is
   `none` because each row finishes itself with its own rule — a gap would open a visible break in a
   ladder meant to read as continuous. A bare `<ul>` would also put a browser-default list marker
   and inset next to the component's own marker slot.
2. **`marker` is ONE slot with three fills, and the discriminator is content, not appearance.**
   `{kind:'number', value}`, `{kind:'icon', name}`, `{kind:'thumbnail', src, alt}`, or absent. Every
   fill lands in the same leading position under the same rule, inset and type — so pick by what the
   row actually leads with, and do not read the three as three visual variants. `alt` is required
   even when the correct value is `''`: decoration has to be chosen, not omitted. Under an `<ol>` the
   number is `aria-hidden`, because the list already announces position.
3. **`arrangement` is title/body geometry ONLY.** `split` (the default) puts them in a 2:3
   two-column split at 768px and up and collapses to one track below it; `stacked` keeps body under
   title at every width. It changes nothing else about the row — not the rule, not the marker, not
   the inset.
4. **`href` turns the WHOLE row into one native link**, with one focus stop, one accessible name and
   an arrow cue at the row's inline end. Without it the row is inert, with no pointer states and no
   cue. There is no way to put a second control in a row, and that is deliberate: one row, one
   destination.

`titleAs` is separate from all four. It gives the title heading semantics without changing its type —
reach for `h3` or `h4` when the rows are page landmarks, not when they are prose. And like `Button`,
`ListCard` takes no `surface`: it paints no ground and reads `data-surface` from the band above it.

`BlockCard` — **one borderless card in a grid.** `title`, `body`, an optional `eyebrow`, an optional
cover `media`, `titleAs="h3" | "h4"`, an optional `href` and `ctaLabel`, and three presentation props:
`orientation`, `imageSide`, `tracks`. Closed like `ListCard`: no `children`, no `className`, no DOM
spread, and no `surface`, `columns` or `equalHeight` — those describe a relationship between cards.

**For a card group, reach for `BlockCardSet` first.** `<BlockCardSet items={[{ id, title, body, … }]} />`
renders the `Layout as="ul"` grid, picks the columns and image sizes from the count, and — from four
items — features the first card: the horizontal arrangement spanning the row above its peers (media
beside copy with a cover, head beside body without). Featuring is by position, never a field. An item
cannot carry `orientation`, `imageSide` or `tracks`; the set decides them.

`ListCard` and `BlockCard` are the two card shapes and picking between them is one question: **is
this a ladder or a grid?** A ladder of ruled rows down one column is `ListCard`. A set of objects
across two to four tracks is `BlockCard`. Neither draws a box or paints a ground — both show the band
through — so do not choose by colour.

Four things to get right:

1. **Which cards carry media is decided by family**: case studies and every article, video or podcast
   with a cover carry one; service, audit, glossary and capability cards carry none. A text-only set is
   the common case and is designed: weight from the title and position, never a box, fill or border.
2. **`media` is one closed record**, `{ type: 'image', image: { src, alt, width, height, kind, … } }` —
   never a node, and there is no icon fill. The card owns the crop (3:2 tile, 4:3 row); the image's
   edge comes from its `kind` (a cut-out or an illustration is unboxed, a capture keeps a hairline).
   `alt` is required even when the right value is `''` — an illustration cover takes `''`.
3. **`href` turns the WHOLE card into one native link**, with one focus stop and a named cta. Without
   it the card is inert and complete. Never put a second link or a `Button` inside one.
4. **Title text never goes over the image**, and a cover is never placed on ink or blue — a reserved
   band carries a text-only set.

`titleAs` gives the title heading semantics without changing its type — h4 scale in a tile, h3 in a
row. Like `Button` and `ListCard`, `BlockCard` reads `data-surface` from the band above it, so set the
surface once on the `Section`.

`Accordion` — **one multi-open question-and-answer set**, and the only component here built on a
native browser control. One prop: `items`, an array of `{ question, answerHtml }`.

Every item is a real `<details>` / `<summary>`. That is the point of it: the browser owns the
expanded state, the keyboard contract and the accessibility tree, so there is **no client boundary,
no authored ARIA and no managed focus** — and nothing for you to add. If you find yourself writing
`aria-expanded`, `role="region"` or a click handler around this, stop; you are rebuilding what it
already has.

Four things to get right:

1. **`question` is plain text and `answerHtml` is rich text.** The question is a `string` and not a
   node on purpose — a summary already carries a role and a keyboard contract, so a heading, a link
   or a control cannot be put inside one. The answer goes through `Prose`, so paragraphs, lists,
   emphasis, code and links are all already styled on every surface.
2. **The first item is open and every item is independent.** There is no single-open mode, no
   `defaultOpen` and no external control of state. Opening one never closes another and never moves
   focus, which is what lets a reader compare two answers.
3. **Two to eight items.** One is a paragraph wearing a disclosure; past eight the reader is
   scanning a list of headings instead of reading answers, and the content wants a different shape.
   Blank questions and blank answers are dropped rather than rendered as an empty row.
4. **It is a ladder, not a stack of panels.** No ground behind an item, no border around one — one
   hairline above the set and one below each item. Opening an item changes the ink of its rule and
   nothing else, so nothing moves under the reader. Do not put it inside a bordered or filled box to
   "contain" it.

It caps at the body measure because it is a reading column, and it takes no `surface` — set the
surface once on the `Section` above it.

`Proof` — **attributed client evidence, checked figures, or both.** `arrangement="compact |
display"`, `quote`, and `figures`. `display` may render the quote, the figures, or both;
`compact` embeds one quote in a reading flow and **forbids `figures` at compile time**, so a
compact Proof carrying stats is a type error rather than a layout surprise.

The distinction that decides whether you want this at all is attribution: a blockquote **with** a
name and a role is a `Proof`; the same blockquote **without** one is a `Callout`. The pattern never
inspects the markup to work that out — whoever supplies the content decides. It takes no `surface`.

`Figure` — **an image with a caption that carries the meaning.** `image`, `caption` (required,
a `string`), and an optional `note`. `image` is four fields that arrive together or not at all —
`src`, `alt`, `width`, `height` — where the two dimensions are the asset's **intrinsic** pixels
rather than a size request: they are what lets the browser reserve the block-size so the page does
not shift when the image lands. CSS scales the box to its track.

Two rules worth stating because they are easy to get backwards. **`alt` must not restate the
caption** — `alt` describes what the image *shows*, the caption says what it *means*, and the
`note` says what it does **not** establish. And **an image is optional**: a caption alone is a
first-class rendering, not a degraded one.

`Callout` — **a quiet parenthetic note on the claim immediately before it.** One prop: `html`,
trusted rich text with the same inline markup `Prose` accepts.

It paints no ground and no edge, sets no outer spacing and takes no `surface` — the nearest
`Section` supplies the palette and the parent `Layout` supplies the seam. If you are reaching for a
tinted box or a coloured left border to mark an aside, that is the thing this component exists to
replace: the quiet text role is the whole treatment.

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
