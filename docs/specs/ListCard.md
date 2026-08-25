# ListCard

## 0 · Front matter

|                     |                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Component**       | `ListCard`                                                                                                             |
| **Tier**            | 2 pattern (`src/patterns/ListCard/`)                                                                                   |
| **Status**          | implemented                                                                                                            |
| **Token prefix**    | `--lcrd-*`                                                                                                             |
| **Designer / date** | Codex / 21 Aug 2026                                                                                                    |
| **Revised**         | Cards 1a redesign / 25 Aug 2026 — always-dark title, the cue alone carries the link colour, hover wipe removed |
| **Implements**      | `docs/briefs/11-list-card.md`                                                                                          |
| **Implemented at**  | `src/patterns/ListCard/` · `src/styles/tokens/components/list-card.css` · specimen `src/app/design/list-card/page.tsx` |

## 1 · Identity

`ListCard` is one ruled row in a semantic list: an optional leading marker, a required title and
body, and, only when the row navigates, a trailing cue that is the row's one link-coloured part. It is Tier 2 because it consumes a
CMS-shaped content record and composes `Layout`, `Cluster` and `Icon`; a primitive may do neither.

It is not a bounded card. `BlockCard` supplies the filled or edged object that reads as a tile. It
is not a rich-text flow. `Prose` supplies typography and rhythm for CMS-authored markup with
multiple elements. It is not the list or the section around the list. `Layout` owns the seam
between rows, and the future `ContentSection` owns the band, content column and section heading.

The nearest component is `BlockCard`, but ruled versus bounded is a category boundary rather than
a finish prop. Adding `finish="ruled"` to `BlockCard` would make its object boundary optional and
would let authors switch between two different content models for rhythm alone. `ListCard` owns a
bottom rule and never paints a fill or a surrounding edge.

The component appears on 53 routes in 70 sections. A list contains 2–12 rows; seven sample-finding
lists contain 10–12. A page may contain more than one such list, but each row belongs to exactly one
parent list.

## 2 · Anatomy

| Part      |         Required | Element / content                                                                | Values it owns                                                    |
| --------- | ---------------: | -------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `root`    |              yes | One `li`; the only legal outer element                                           | Full available inline size; no colour of its own                  |
| `frame`   |              yes | An `a` when `href` is present, otherwise an inert `div`                          | Row inset, focus ring and interactive state boundary              |
| `marker`  |               no | One slot filled by a formatted number, an `Icon`, or one thumbnail media element | `--lcrd-marker-ink`; fill-specific geometry                       |
| `content` |              yes | The group containing `title` and `body`                                          | `split` or `stacked` arrangement; no colour of its own            |
| `title`   |              yes | A `span`, `h3` or `h4`, selected by `titleAs`                                    | `--lcrd-title-ink`, linked or not                                 |
| `body`    |   yes in the API | One paragraph; whitespace-only content emits no element                          | `--lcrd-body-ink` and `--measure-body`                            |
| `cue`     | linked rows only | `Icon name="arrow-right" size="lg"`, hidden from assistive technology            | The row's only link ink, and the row's only state                 |
| `rule`    |              yes | The root's block-end hairline                                                    | `--lcrd-rule-ink` at one width in every state                     |

The title's ink does not depend on `href`, matching the same change in `BlockCard`: a linked row is
recognisable by its arrow, not by a blue heading, so `--lcrd-link-ink` is worn by the cue alone.

The `rule` is decoration and always was. It is the row's own block-end hairline, at one width on
every surface and in every state; the interactive overlay that used to wipe across it on hover and
double on press is gone. Do not read the two as the same thing — removing the wipe did not remove
the row's rule.

The marker is one anatomical slot. `number`, `icon` and `thumbnail` name fills of that slot, not
variants, sibling components or independent child positions. Omitting the marker omits both its
element and the `--gap-block` seam beside it.

## 3 · Props / API

| Prop          | Exact type / literal union                                                                                                 | Default   | What it decides                                                                    |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------- |
| `title`       | `string`                                                                                                                   | required  | The row's primary label                                                            |
| `body`        | `string`                                                                                                                   | required  | The one explanatory paragraph                                                      |
| `marker`      | `{ kind: 'number'; value: number } \| { kind: 'icon'; name: IconName } \| { kind: 'thumbnail'; src: string; alt: string }` | absent    | Which one fill occupies the marker slot; `IconName` is the existing 17-glyph union |
| `arrangement` | `'split' \| 'stacked'`                                                                                                     | `'split'` | Whether title and body are two tracks from `md`, or one stack at every width       |
| `titleAs`     | `'span' \| 'h3' \| 'h4'`                                                                                                   | `'span'`  | Heading semantics only; visual type does not change                                |
| `href`        | `string`                                                                                                                   | absent    | A non-blank value makes the whole frame one anchor and causes the cue to render    |

The thumbnail member makes ListCard responsible for the native image element, crop, intrinsic
dimensions and empty-source handling. `alt` is required even when its correct value is the empty
string, so every call site must make the decorative-versus-informative decision explicitly.

Deliberately not props:

- `surface`, colour and tone: the nearest `data-surface` ancestor resolves all `--lcrd-*` colour
  tokens. The row does not own a ground.
- `finish`, `filled`, `selected` and `active`: only ruled ships; no selected content need exists.
- `cue`, `cueIcon` and `cueLabel`: `href` is the single source of truth, and `arrow-right` is one
  system decision.
- `size`, density, padding, gap, radius, height and width: one row size and one rhythm prevent a
  12-row list becoming twelve individually tuned objects.
- `className`, `style` and arbitrary DOM attributes: they would reopen colour, distance and box
  geometry from the call site.
- `children`: the closed strings prevent a second heading, nested action or rich-text flow from
  entering the row. `Prose` belongs outside this content shape.
- `onClick`, `target` and button state props: a linked row is navigation through a native anchor,
  while a static row is inert.

Compile errors, not review comments:

1. A marker cannot carry more than one of `value`, `name`, `src` or `alt`; the discriminated union
   makes the other members impossible.
2. A thumbnail marker without `src` or `alt`, an icon marker without `name`, or a number marker
   without `value` cannot compile.
3. A third arrangement, title element or arbitrary glyph name cannot compile.
4. A missing `title` or `body` cannot compile.
5. There is no cue prop, so a static row with a cue and a linked row without one are both
   unrepresentable.

## 4 · Variants × sizes

| Arrangement | `md` — the only size                                                                            | Intended use                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `split`     | Title takes two fractional tracks and body three from `md`; they collapse to one track below it | The 21 title-left / body-right sections; default because it is the highest-volume arrangement    |
| `stacked`   | Title above body at every width                                                                 | The 11 title-plus-body sections and sequences whose lead-in must remain attached to its sentence |

There is no `sm` or `lg` row size and therefore no `size` prop. Marker fill, link presence and
heading semantics do not create variants: they change content or semantics, not the row's design
role. The title/body role, row inset, rule, cue and icon sizes do not step between arrangements.

The filled finish was considered and rejected. Without a selected or interactive meaning it would
be a neutral rhythm choice, turning the list into a stack of `BlockCard`s and erasing the boundary
this component exists to hold.

## 5 · States

Static rows have only rest. They do not respond to a pointer and do not enter the tab order.

| State           | Trigger                              | Parts that move                                                                              |
| --------------- | ------------------------------------ | -------------------------------------------------------------------------------------------- |
| rest            | Base rendering                       | Nothing moves. Title, body and marker hold their own inks; the cue holds `--lcrd-link-ink`   |
| hover           | Pointer over a linked frame          | The cue alone takes `--lcrd-link-ink-hover`                                                  |
| focus, keyboard | `:focus-visible` on a linked frame   | The hover cue plus the two-part ring from `--lcrd-ring-color` and `--lcrd-ring-gap-color`    |
| pressed         | Pointer activation on a linked frame | The cue alone takes `--lcrd-link-ink-pressed`                                                |

The cue is the only part with states, and colour is the only thing about it that changes. The rule
wipe that carried hover along its own axis, and the doubled width that carried press, are both gone;
the row's block-end hairline is decoration at one width throughout. Hover and pressed therefore
differ from each other and from rest through ink alone, and each surface declares three separate cue
steps so all three stay distinguishable — section 6 measures all twelve.

That narrowing is deliberate and its cost is bounded. Hover is a pointer affordance rather than
information, and the arrow already identifies the row as navigation at rest. The one state a keyboard
user depends on is focus, and focus is carried by the two-part ring around the whole row, not by
colour — which makes the ring load-bearing rather than decorative and is why section 6 measures it
against its own gap on all four surfaces.

Held, disabled, expanded, busy, loading and error are excluded. A navigation row is neither a
selectable option nor an unavailable action; nothing opens and nothing asynchronous happens. Their
token absences are assertions, not omissions.

## 6 · Per-surface colour

Every value is declared again in every surface block. Ratios are measured against that column's
ground: `--color-paper`, `--color-paper-deep`, `--color-neutral-950` and
`--color-brandeis-500`, respectively.

| Token                     | paper                                           | tint                                            | ink                                             | blue                                        |
| ------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ------------------------------------------- |
| `--lcrd-title-ink`        | `--color-neutral-900` — 14.62:1                 | `--color-neutral-900` — 13.06:1                 | `--color-white` — 17.26:1                       | `--color-white` — 6.23:1                    |
| `--lcrd-body-ink`         | `--color-neutral-700` — 8.14:1                  | `--color-neutral-700` — 7.27:1                  | `--color-neutral-300` — 11.07:1                 | `--color-brandeis-50` — 5.57:1              |
| `--lcrd-marker-ink`       | `--color-neutral-900` — 14.62:1                 | `--color-neutral-900` — 13.06:1                 | `--color-white` — 17.26:1                       | `--color-white` — 6.23:1                    |
| `--lcrd-link-ink`         | `--color-brandeis-500` — 6.17:1                 | `--color-brandeis-500` — 5.51:1                 | `--color-brandeis-300` — 7.32:1                 | `--color-brandeis-100` — 4.91:1             |
| `--lcrd-link-ink-hover`   | `--color-brandeis-600` — 7.52:1                 | `--color-brandeis-600` — 6.72:1                 | `--color-brandeis-100` — 13.61:1                | `--color-white` — 6.23:1                    |
| `--lcrd-link-ink-pressed` | `--color-brandeis-700` — 10.07:1                | `--color-brandeis-700` — 8.99:1                 | `--color-brandeis-50` — 15.44:1                 | `--color-brandeis-50` — 5.57:1              |
| `--lcrd-rule-ink`         | `--color-neutral-300` — n/a, decoration         | `--color-neutral-400` — n/a, decoration         | `--color-neutral-700` — n/a, decoration         | `--color-brandeis-300` — n/a, decoration    |
| `--lcrd-ring-color`       | `--color-brandeis-500` — 6.17:1 against its gap | `--color-brandeis-500` — 5.51:1 against its gap | `--color-brandeis-300` — 7.32:1 against its gap | `--color-white` — 6.23:1 against its gap    |
| `--lcrd-ring-gap-color`   | `--color-paper` — paired ring 6.17:1            | `--color-paper-deep` — paired ring 5.51:1       | `--color-neutral-950` — paired ring 7.32:1      | `--color-brandeis-500` — paired ring 6.23:1 |

**Paper.** The title and number sit at neutral-900 whether or not the row navigates, while the body
drops to neutral-700 so a row reads title first without sacrificing AA. The cue starts at
brandeis-500 and advances through 600 and 700, and it is the only part of the row that does. The
neutral-300 rule is deliberately quieter than text and stays at that one value in every state.

**Tint.** Title, body and marker can keep their paper steps: each still clears its floor on
paper-deep. The cue ramp is also restated unchanged because brandeis-500, 600 and 700 all clear AA
here. The rule moves to neutral-400 so it remains present against the deeper ground without
competing with the copy.

**Ink.** Title and marker lift to white and body to neutral-300. The cue ramp lifts to brandeis-300
at rest, 100 on hover and 50 on press because brandeis-500 reaches only 2.77:1 on this ground. The
rule drops to neutral-700 so twelve adjacent separators do not turn into a ladder louder than the
content.

**Blue.** The available light ramp is narrow: the cue starts at brandeis-100, reaches white on hover
and returns to brandeis-50 on press; all three clear 4.5:1. The title and marker are white, body is
brandeis-50, and the decorative rule is brandeis-300. With the pressed rule width gone, these three
light steps are the whole of the state model on this surface, which is why none may be lightened and
why the white focus ring against its brandeis-500 gap matters most here.

**Nested surface.** `ListCard` reads only the nearest `data-surface` ancestor. A tint panel inside
an ink section resolves the complete tint column, including ring and gap; no value leaks from ink.
The component does not receive a `surface` prop and never paints the panel ground.

## 7 · Geometry & spacing

### (a) Distances — gap-scale roles

- Parent list rows: `Layout rowGap="none"`. Adjacent ruled rows share an edge; there is no outer
  seam to hide the list relationship.
- Frame block inset: `--gap-text`. This is inner edge-to-content space, not outer spacing.
- Marker to the content/cue core: `Cluster colGap="block"`; when the outer cluster wraps, its
  wrapped line seam is `rowGap="block"`.
- Stacked title to body: `Layout rowGap="tight"`.
- Split title to body: `Layout colGap="column"`, with `rowGap="tight"` available when the tracks
  collapse below `md`.
- Content to cue: `Cluster colGap="block"`.
- No inline frame inset. `Section` already aligns the row to the 1240px content column and owns the
  32px outer gutter.

### (b) Component sizes

- `md` row: the only size; it has no fixed height and fills the available inline size. A title-only
  linked row still measures at least 56px high at the narrow type step: one h5 line plus two
  `--gap-text` insets, so the whole-row target clears 44px without a hit extension.
- `xs` content core minimum: `--lcrd-content-min-xs` is 192px, measured against Layout's existing
  `xs` track. It keeps a number or 24px icon beside readable copy and causes the larger thumbnail
  to wrap above the core before the copy collapses.
- Number marker: no box size. Two-digit formatting and `--text-stat` supply a stable optical column
  for the expected 1–12 range.
- Icon marker: `Icon size="xl"`, resolving to `--icon-size-24`.
- Cue: `Icon size="lg"`, resolving to `--icon-size-18`.
- Thumbnail marker: `--lcrd-thumbnail-inline-md` is 160px and `--lcrd-thumbnail-ratio` is 3:2,
  measured as a recognisable landscape sample at the full 1240px row while still wrapping cleanly
  before a 192px content core is squeezed. The native image covers that frame from its centre.

### (c) Optical corrections

None. The component does not reach into `--space-*`; every inset and seam is a gap-scale
relationship, every icon is sized by `Icon`, and the rule and focus ring use their own system
geometry.

Radius is `--radius-0`: a ruled row is not a rounded object. The block-end rule is
`--border-width-hairline` and there is no second width — `--lcrd-rule-width-pressed` was deleted with
the overlay it doubled, rather than left as a width nothing draws. There is no elevation shadow
(`--shadow-none`); the focus ring uses `--focus-ring-width` and `--focus-ring-offset`. The row stays
at `--z-base`.

## 8 · Typography

| Part                     | Type role        | Tracking                                   | Measure                              |
| ------------------------ | ---------------- | ------------------------------------------ | ------------------------------------ |
| `title`                  | `--text-h5`      | `--text-h5-tracking`                       | `--measure-title`                    |
| `body`                   | `--text-body`    | none — this role has no tracking companion | `--measure-body`                     |
| Number fill in `marker`  | `--text-stat`    | `--text-stat-tracking`                     | none — one expected two-digit marker |
| Icon and thumbnail fills | none             | none                                       | none                                 |
| `cue`                    | none — an `Icon` | none                                       | none                                 |

The component aliases the first three roles through `--lcrd-title-text`,
`--lcrd-title-tracking`, `--lcrd-body-text`, `--lcrd-marker-text` and
`--lcrd-marker-tracking`. `titleAs` changes element semantics, never the visual role.

All copy renders verbatim in sentence case: the title and body are sans, so the mono rule does not
reach them. Example: “Recruit participants with the right product context” and “Define who needs to
be represented before the sample is recruited.” Numbers render with at least two digits (`01`–`12`)
and are never bullet characters — the marker is the file's one mono part and states
`text-transform: var(--text-mono-case)` beside its font, which a numeral has nothing to do with. It
is stated so that every mono rule in the system looks the same and no omission has to be read as a
decision. **Amended 25 Aug 2026:** this paragraph read "There is no text transform" before mono's
case moved to the token layer.

## 9 · Responsive

At 1023, no component arrangement changes. The existing h5 and stat roles resolve their
tablet values from the type layer; `ListCard` does not restate them.

At 767, `split` becomes one track because its `Layout` declares one track at base and a 2:3 split
from `md`. `stacked` is unchanged. The outer `Cluster` remains content-driven: number and icon
markers fit beside the 192px core in the normal Section track, while a thumbnail may wrap above the
core when the combined row no longer fits. The cue remains at inline end of the core. This is what
holds a 12-row sample-finding block together: one full-width ordered list, two-digit markers, no
row gap, and one bottom rule per row — never a tiled card grid.

The gap scale does not shift responsively. Frame inset, title/body seam, marker seam and split
column gap keep the same roles. No component media query changes a type role. The whole linked
frame is the touch target and its smallest valid title-only rendering clears the 44px floor, so no
size step and no extended hit pseudo-element are needed.

## 10 · Composition

The future `ContentSection` receives the list as its child. `Layout` owns the list axis, the inner
`Layout` owns title/body columns, and `Cluster` owns marker/content/cue relationships. `Button` is
not used: a Button is one labelled control and cannot wrap a whole row without creating a nested
or duplicate action. `Prose` is not used: one plain paragraph is not a CMS rich-text flow.

```jsx
<Layout as={numbered ? 'ol' : 'ul'} rowGap="none">
  <li>
    <Frame as={href ? 'a' : 'div'}>
      <Cluster colGap="block" rowGap="block" align="start">
        {marker}
        <Cluster colGap="block" align="start" nowrap>
          <Layout
            columns={split ? { base: 1, md: [2, 3] } : undefined}
            colGap={split ? 'column' : undefined}
            rowGap="tight"
          >
            {title}
            {body}
          </Layout>
          {href ? <Icon name="arrow-right" size="lg" /> : null}
        </Cluster>
      </Cluster>
    </Frame>
  </li>
</Layout>
```

`Frame` above names the component's conditional native `a` or `div`; it is not a new primitive.
The core receives only local child sizing so it can grow and keep its 192px minimum; all actual
arrangement remains in `Layout` and `Cluster`. There is no hand-rolled grid or flex, no margin on a
child, and no override of `Section` ground, gutter or content column from outside.

## 11 · Accessibility

Each component is an `li`. Numbered sequences must use an `ol`; term and linked lists use a `ul`.
An `href` wraps the entire frame in one native anchor, producing one focus stop. A static frame is
an inert `div`. `titleAs="h3"` or `"h4"` provides a heading only where the page outline needs one;
the default `span` prevents every term in a definition-like list from polluting the heading map.

| Key         | Linked row                                 | Static row       | Why                                      |
| ----------- | ------------------------------------------ | ---------------- | ---------------------------------------- |
| `Tab`       | Moves focus to the row anchor in DOM order | Skips the row    | Native link order; no synthetic tab stop |
| `Shift+Tab` | Moves to the preceding focusable element   | Skips the row    | Native reverse order                     |
| `Enter`     | Activates the anchor and navigates         | Unbound          | Native link contract                     |
| `Space`     | Scrolls the page                           | Scrolls the page | A link is not a button                   |
| Arrow keys  | Unbound                                    | Unbound          | This is a list, not a composite widget   |
| `Escape`    | Unbound                                    | Unbound          | Nothing opens or captures focus          |

Focus order follows list order, with only linked rows included. The component has no internal state
change and never moves focus; after navigation, the destination document and browser own focus.

ARIA is deliberately small:

- The cue's `Icon` has no label, so the existing component emits `aria-hidden="true"`.
- Number markers are `aria-hidden="true"`; the parent `ol` supplies order semantics without
  announcing “one” twice. The visual value must match the row's authored order.
- Icon markers have no label because the title names the same subject; they are decorative.
- Thumbnail alternative text comes from required `marker.alt` on the native image. An empty string
  is allowed only when the title/body fully repeat the image's information.
- No `role`, `aria-current`, `aria-disabled`, `aria-expanded`, `aria-controls`, `aria-describedby`
  or busy attribute is emitted.

No ids are generated and there are no id references. Consequently there is no absent target for
`aria-controls` to point at.

Keyboard focus uses `:focus-visible` only. It shows the hover ink and overlay rule, plus a
`--focus-ring-width` ring separated by `--focus-ring-offset` in the surface's own gap colour. The
ring-to-gap ratios are 6.17:1, 5.51:1, 7.32:1 and 6.23:1. Text and meaningful glyphs meet 4.5:1 in
every live state; the quiet base rule is decoration. Reduced motion keeps the rule visible but
makes its wipe instant.

A screen reader encounters a static numbered item as: “List, 12 items. Research plan. Define who
needs to be represented before recruitment.” It encounters a linked item as: “Service design. Map
the end-to-end service and expose operational breaks, link.” It does not announce the visual number,
subject icon or arrow a second time.

## 12 · Content edge cases

| Case                                      | Required handling                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Longest realistic string                  | Title and body wrap without clamp or truncation. Their measures cap line length; the row grows on the block axis and the rule stays at its bottom edge. Test an 80-character title and 240-character body.                                                                                                           |
| One long unbroken token (a URL)           | Title and body may break the token anywhere before it overflows. The cue and marker remain in their own boxes.                                                                                                                                                                                                       |
| Zero items                                | The caller omits the parent list; do not render an empty `ul` or `ol`. `ListCard` itself is not called.                                                                                                                                                                                                              |
| One item                                  | Render one `li` with its bottom rule. The rule is the row's finish, not a separator inserted only between siblings.                                                                                                                                                                                                  |
| Many items (2× expected)                  | Render 24 rows in one vertical `Layout rowGap="none"`; no pagination, clamping, equal-height rule or multi-column tiling.                                                                                                                                                                                            |
| Missing image or missing optional slot    | Omitting `marker` removes its element and seam. A thumbnail member requires `src` and `alt`; a blank runtime `src` is treated as no marker with a development warning, never as an empty frame or placeholder.                                                                                                       |
| Empty required-ish text                   | A whitespace-only title makes the component render nothing and warn in development; an empty body omits the paragraph and warns but keeps the titled row. A blank `href` is treated as absent, so no anchor and no cue render.                                                                                       |
| Narrow track at 767                       | `split` is stacked; number/icon remain beside the core when they fit, and thumbnail may wrap above it. Measures and token-aware breaking prevent overflow.                                                                                                                                                           |
| Parent that does not size it              | The root fills one available line in a wrapping parent. The content core's named minimum is `xs` (192px), which forces the marker to wrap before copy becomes unreadable. The root has no hard minimum beyond the parent's available inline size, so a sub-192px parent wraps text instead of causing page overflow. |
| Logical properties rather than left/right | Marker is at inline start, cue at inline end, inset is block-axis and the rule is at block end. The current site is LTR; an RTL site must swap the directional cue to the existing `arrow-left` glyph at the composition boundary.                                                                                   |
| Surface nested inside a different one     | The nearest `data-surface` block redeclares all nine colour tokens. A tint row inside ink uses the tint column in full.                                                                                                                                                                                              |
| Two components adjacent                   | Two rows in the same zero-gap parent produce one rule at their shared seam and one rule at the end of the second row; there is no top edge to double the seam.                                                                                                                                                       |
| Interactive content inside a slot         | Rejected. `title` and `body` are strings, icon/number fills are inert, and thumbnail media must not contain a link, button or control. The row anchor is the only possible focus target.                                                                                                                             |

## 13 · Motion

The cue's ink transitions with `--duration-fast` and `--easing-standard`, aliased as
`--lcrd-transition-duration` and `--lcrd-transition-easing`. That is the whole of it.

The interactive overlay rule — the `Button`/`Breadcrumbs` wipe precedent along the row's own inline
axis — is gone, and with it the pressed width step. Nothing in the component transforms, translates,
scales, rotates, fades, changes opacity, animates a height, zooms a thumbnail or moves the cue.

Consequently there is **no `prefers-reduced-motion` block**, and its absence is the assertion rather
than an omission: a colour transition is not motion under the system's own reading, so there is
nothing for the preference to shorten. A future edit that adds a transform here must add the media
query in the same change.

## 14 · Do's and Don'ts

**Do**

1. Put every group of rows in `Layout as="ol"` or `"ul"` with `rowGap="none"`; inspect the rendered
   tree and the call-site diff.
2. Use `marker.kind="number"` only inside an ordered list and keep the visual values in authored
   order; compare the marker text with the DOM item order.
3. Render the cue exactly when a non-blank `href` produces an anchor; count anchors and cues in the
   rendered tree and expect equal totals.
4. Show every linked frame as one focus stop whose box clears 44px; tab through the specimen and
   inspect the target overlay.
5. Render identical ListCard markup on all four surface bands and inspect resolved `--lcrd-*`
   values rather than passing a surface prop.
6. Use `titleAs` to match the page outline while preserving h5 visual type; compare the heading map
   with the computed type token.
7. Prove the title's ink does not depend on `href`: render the same row linked and static side by
   side and expect both computed title colours to be `--lcrd-title-ink`.

**Don't**

8. Do not add a background, surrounding edge or filled finish; inspect the module and expect no
   background token and no finish prop.
9. Do not give the title the link ink, or make any part but the cue change on hover or press;
   inspect computed styles in every state and expect only the cue to move.
10. Do not restore the rule wipe or a pressed rule width, and do not confuse either with the row's
    own block-end rule, which stays; search the module for `::after` and `scaleX` and expect none.
11. Do not put a Button inside a linked row or interactive content in thumbnail media; tab order
    must contain one focus stop per linked row.
12. Do not add margin to any ListCard node; search the module for margin and expect zero
    declarations.
13. Do not add hand-written grid or flex arrangement; search the module for those display modes and
    expect zero. `Layout` and `Cluster` must own every arrangement.
14. Do not change a gap or type role in a component breakpoint; compare the responsive rules with
    sections 8 and 9.
15. Do not clamp titles/bodies or hide rows after 12; the 24-row specimen must expose all content.
16. Do not add `surface`, `size`, `finish`, `cue`, `className` or `style` to the public props; type
    checking an attempted call must fail.
17. Do not introduce a second marker slot or branch into marker-specific row components; inspect
    the public export and expect one `ListCard` and one `marker` prop.

## 15 · Specimen plan — `/design/list-card`

The exact block list, in order:

1. **Arrangement × size matrix.** Two cells: `split × md` and `stacked × md`, with identical term
   and definition copy. A note states there is no size prop.
2. **Marker fill ladder.** Four rows in one list: number, icon, thumbnail and omitted marker. Label
   them as fills of one slot, not variants.
3. **Content-shape set.** A 5-row numbered sequence, a 5-row term list and a 3-row linked set. Use
   the real `ol`/`ul` semantics and show `titleAs="h3"` only on the linked set.
4. **States.** One static and one linked row at rest, plus a four-row reference naming rest, hover,
   focus and pressed. No state can be forced by a prop: hover, pressed and keyboard focus must be
   pointed at, held and tabbed to. Annotate that the cue is the only part that moves and colour the
   only thing that changes, that the row's own hairline is unanimated decoration, and that the ring
   is the one non-colour signal.
5. **All four surfaces as sibling bands with identical markup.** Each band contains the same two
   rows: one static numbered row to exercise title/body/marker/rule, and one linked icon row to
   exercise the dark title, cue ink and ring together. Print the matching section 6 surface paragraph
   beside each band.
6. **Nested surface.** A tint panel inside an ink band and an ink panel inside a paper band, with the
   nine resolved colour tokens listed beside each rendering.
7. **Twelve-row sample-finding block.** Numbered `01`–`12`, full width, zero row gap. Inspect at
   desktop and at 767 to prove it remains one list rather than twelve tiles.
8. **Every section 12 edge case.** Thirteen labelled rows/blocks: long title/body; unbroken URL;
   zero items with visible empty harness; one item; 24 items; missing marker and missing thumbnail
   handling; blank title/body/href; 767 track; unsized wrapping parent; logical placement; nested
   surface; two adjacent; rejected interactive thumbnail shown as a contract note rather than
   invalid markup.
9. **Two adjacent.** Two rows in `Layout rowGap="none"`, with the shared seam and final rule called
   out.
10. **Narrow tracks.** The same numbered, icon and thumbnail rows at 256px and 192px. The thumbnail
    must wrap before the content core collapses; the smaller track must wrap text without page
    overflow.
11. **Heading map.** The same row as `span`, `h3` and `h4`; visual type must be identical and the
    document outline must differ.
12. **What a static page cannot force.** A final note names pointer-down, keyboard focus and the
    exact 767 boundary, with manual instructions for each. Reduced motion is explicitly struck off
    with its reason: the wipe was the row's only transform and it is gone.

The squint test reads as five shapes: a two-column arrangement comparison, a marker-led ladder, a
four-band surface stack, one long ruled sequence and a pair of narrow stress tracks. The rule is a
shared cadence, not twelve repeated boxes.

## 16 · New token requests

**None — and the Cards 1a redesign removes one rather than adding any.**

The `--lcrd-*` names are this component's expected component-layer declarations, not new primitive
or usage requests. They resolve to existing colour ramps, type roles, measures, gap roles, icon
sizes, border widths, focus geometry, radius, shadow, z-layer, duration and easing. The 192px
content minimum and 160px thumbnail width are t-shirt-named component sizes measured in section 7,
not new space relationships. No new colour, gap step, type role, glyph or mechanism is needed.

`--lcrd-rule-width-pressed` was **deleted**. With the overlay gone nothing doubles the rule, and a
width nothing draws is an invitation to draw it again. No token changed value: the redesign moved
`--lcrd-link-ink` and its two states from the title-and-cue pair onto the cue alone, which is a
change of wearer rather than of palette. `BlockCard` also gains `--bcrd-eyebrow-ink` in the same
change; `ListCard` has no eyebrow and asks for nothing.

Because `docs/vocabulary.md` names tokens by value and is generated from the token layer, the removal
requires `npm run vocabulary` and a push of that file to the Claude Design project.

## 17 · Open questions

**1 · Thumbnail ownership, crop and empty state — ANSWERED, 21 Aug 2026.**

- **(a) Caller-owned media element in a ListCard-owned frame.** Keep the provisional
  `{ kind: 'thumbnail'; media: ReactElement }` member. The frame is 160px inline at a 3:2 landscape
  ratio, crops from centre to cover, and requires exactly one non-interactive media element. The
  media owns its alternative text and loading policy. Missing media collapses the marker with a
  development warning; there is no placeholder.
- **(b) ListCard-owned native image.** Replace `media` with required `src` and `alt` strings;
  ListCard owns the native image element, the same 3:2 crop and the empty behaviour.
- **(c) Caller-owned intrinsic media.** Keep a media element but do not crop it; intrinsic aspect
  ratio sets each row's marker height, and missing media collapses the marker.

**Recommendation: (a).** It follows the pattern-to-pattern composition rule used elsewhere: the
row owns placement and the caller owns the media source. A fixed frame keeps twelve rules aligned,
while no placeholder avoids inventing a second image treatment before the system has an Image or
Figure component. This answer changes the public union and thumbnail geometry, so implementation
must not start until the owner chooses.

**Answered: (b).** ListCard owns the native image element through required `src` and `alt` fields,
the 160px 3:2 centre crop, and the blank-source behaviour. A blank source collapses the marker and
warns in development; no placeholder ships. `alt=""` remains a deliberate, valid value when the
title/body already convey the image's information. This question no longer blocks implementation.

**2 · Two title/body arrangements or one option — non-blocking.** Options: two components; two
variants with different APIs; or one `arrangement` prop on one content shape. **Recommendation and
draft decision: one `arrangement: 'split' | 'stacked'` prop**, defaulting to `split`. Audit and hub
pages then choose explicitly without changing their content record, which is the inconsistency the
brief asks the system to remove.

**3 · Whether a filled finish ships — non-blocking.** Options: ruled only; a neutral filled finish;
or a filled selected/interactive state. **Recommendation and draft decision: ruled only.** No
selected content need is present, and a neutral fill would duplicate `BlockCard`.

**4 · How the number is drawn — non-blocking.** Options: an ordinary body numeral; a micro label;
or a zero-padded stat numeral. **Recommendation and draft decision: zero-padded `--text-stat`**, at
least two digits and hidden from assistive technology inside an `ol`. Its scale makes sequence the
row's first read and prevents the marker from becoming a bullet.

**5 · Title semantics — non-blocking.** Options: always a heading; never a heading; or an exact
element union. **Recommendation and draft decision: `titleAs: 'span' | 'h3' | 'h4'`, default
`span`.** Term lists do not need 12 new headings; linked subheading clusters often do. Visual h5
type remains fixed in all three.

**6 · Link target — non-blocking.** Options: title-only anchor plus cue; a nested link Button; or
one whole-row anchor. **Recommendation and draft decision: one whole-row native anchor.** It makes
the large row target honest, gives one focus stop, and lets `href` control cue presence without a
second prop.

---

## Decisions the build made that this document did not

Four implementation details complete the accepted contract without changing it:

1. **Native thumbnail metadata is 480 × 320, lazy and asynchronous.** The intrinsic dimensions
   preserve the accepted 3:2 frame before CSS loads; `loading="lazy"` and `decoding="async"` keep a
   row image from blocking the surrounding list. The repository still has no Image primitive or
   `next/image` precedent, so the one native-image lint suppression is local to this documented
   contract.
2. **The root states its full-line behavior directly.** `inline-size: 100%` makes each `li` occupy
   one available line even when its parent is a wrapping `Cluster`; `min-inline-size: 0` still lets
   an illegally narrow parent shrink and wrap the row rather than widening the page.
3. **`position: relative` left the frame with the overlay.** It was there only to be the containing
   block for the absolutely positioned wipe. The focus ring is a `box-shadow` and needs no
   positioning, so it went in the same edit rather than lingering as a stacking context nothing uses.
4. **The specimen adds an xs track and a neutral image fixture.** The route-local harness gains a
   192px `trackXs` beside its existing 256px track, and `/public/design/list-card-sample.svg`
   supplies predictable 3:2 content. Neither is product API or component styling.

---

## Appendix — self-audit

```
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states Tier 2 pattern, Status implemented, token prefix --lcrd-*, and the Cards 1a
    revision date. The prefix has no repository collision.
[x] Every Anatomy part appears in colour, geometry, or is explicitly marked as carrying no value. The
    `rule` row now states one width in every state, and the removed overlay is named as removed.

NAMES
[x] Every existing name appears verbatim in docs/vocabulary.md AFTER regeneration, and the --lcrd-*
    names are this component's declared layer. Checked one at a time by `npm run design:check`.
    `--lcrd-rule-width-pressed` was removed from both the layer and this document, so the vocabulary
    must be regenerated and pushed — section 16 says so.
[x] Named glyphs are existing: arrow-right, arrow-left, and the IconName union's 17 glyphs.
[x] Section, Layout and Cluster props/values are existing unions: as, rowGap, colGap, columns,
    align, nowrap; none, tight, block, column, start; base, md; ol, ul, li.
[x] Zero hex codes, rgb(), hsl(), Tailwind names, CSS rule blocks or media-query blocks.
[x] Tracking companions are used only with h5 and stat, both of which have one.
[x] Every layout distance is a gap-scale role.
[x] Space-ramp reaches: 0.
[x] Literal pixel values are component sizes, a touch floor or the Section cap, each measured in
    section 7. Count: 22 occurrences, 8 distinct values.

COLOUR AND CONTRAST
[x] Colour table has 9 rows × 4 full cells; no delta and no blank.
[x] Every text/glyph cell has a measured ratio of at least 4.5:1.
[x] Focus ring is measured against its own gap on all four surfaces.
[x] Base rule is explicitly marked decoration, and is now the only thing it ever was: no state
    changes its colour or its width.
[x] One paragraph per surface explains the mapping; nested surfaces are specified.

STATES
[x] Every claimed state comes from the fixed model and uses its fixed suffix.
[x] Hover and pressed differ on all four surfaces through cue ink. They are now colour-only, which
    section 5 states explicitly and argues rather than leaving implied — the ring carries focus, the
    one state a keyboard user depends on.
[x] Every state token moves on at least one surface and is declared in all four columns.
[x] Excluded states have no token. There is no disabled opacity.
[x] No token remains for anything the component no longer draws: --lcrd-rule-width-pressed is
    deleted, not zeroed.

LAYOUT, TYPE, SEMANTICS
[x] Every arrangement belongs to Layout or Cluster; colGap is present only with split columns.
[x] No child margin. No responsive gap or type-role swap.
[x] Title and body name measures.
[x] Linked frame clears the 44px touch floor through its natural row box.
[x] There are no ARIA idrefs and no upward-walking state selector.

COMPLETENESS
[x] All thirteen required content edge cases are answered.
[x] The unsized-parent row names the 192px core minimum and explains why the root has no hard floor.
[x] Do's and Don'ts name a rendered-tree, type-check, search or computed-style decision.
[x] Specimen plan covers 2 arrangements × 1 size, all four surfaces, manual states, nested surfaces,
    every edge case, adjacent rows and narrow tracks.
[x] Section 16 asks for nothing, explains why component tokens do not constitute a request, and
    records the one removal and the vocabulary push it requires.
[x] Every open question has options, recommendation and blocking status.
[x] Squint test: five shapes, with scale and position supplied by marker fills and arrangements rather
    than bounded rectangles.
```
