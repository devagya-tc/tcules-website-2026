# ListCard

## 0 · Front matter

|                     |                                      |
| ------------------- | ------------------------------------ |
| **Component**       | `ListCard`                           |
| **Tier**            | 2 pattern (`src/patterns/ListCard/`) |
| **Status**          | accepted                             |
| **Token prefix**    | `--lcrd-*`                           |
| **Designer / date** | Codex / 21 Aug 2026                  |
| **Implements**      | `docs/briefs/11-list-card.md`        |
| **Implemented at**  | Pending build                        |

## 1 · Identity

`ListCard` is one ruled row in a semantic list: an optional leading marker, a required title and
body, and, only when the row navigates, a trailing cue. It is Tier 2 because it consumes a
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
| `title`   |              yes | A `span`, `h3` or `h4`, selected by `titleAs`                                    | `--lcrd-title-ink` when static; the link ink tokens when linked   |
| `body`    |   yes in the API | One paragraph; whitespace-only content emits no element                          | `--lcrd-body-ink` and `--measure-body`                            |
| `cue`     | linked rows only | `Icon name="arrow-right" size="lg"`, hidden from assistive technology            | The same link ink as the linked title; no independent token       |
| `rule`    |              yes | The root's bottom hairline plus an interactive overlay on linked rows            | `--lcrd-rule-ink`; overlay width and the linked row's current ink |

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

| State           | Trigger                              | Parts that move                                                                                                          |
| --------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| rest            | Base rendering                       | Static title uses `--lcrd-title-ink`; linked title and cue use `--lcrd-link-ink`; the bottom rule uses `--lcrd-rule-ink` |
| hover           | Pointer over a linked frame          | Linked title and cue take `--lcrd-link-ink-hover`; the overlay rule wipes across at hairline width                       |
| focus, keyboard | `:focus-visible` on a linked frame   | Exactly the hover rendering plus the two-part ring from `--lcrd-ring-color` and `--lcrd-ring-gap-color`                  |
| pressed         | Pointer activation on a linked frame | Linked title and cue take `--lcrd-link-ink-pressed`; the visible overlay rule steps to `--border-width-2`                |

The hover and pressed renderings differ on all four surfaces: ink changes, and the pressed rule is
twice the hover rule. Hover is not colour-only because the rule appears along its own axis; pressed
is not colour-only because its rule becomes thicker.

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

**Paper.** The static title and number sit at neutral-900, while the body drops to neutral-700 so a
row reads title first without sacrificing AA. A link starts at brandeis-500 and advances through
600 and 700. The neutral-300 base rule is deliberately quieter than text; the linked overlay uses
the link's current ink, so interaction is visible without introducing a second action colour.

**Tint.** Title, body and marker can keep their paper steps: each still clears its floor on
paper-deep. The interactive ramp is also restated unchanged because brandeis-500, 600 and 700 all
clear AA here. The base rule moves to neutral-400 so it remains present against the deeper ground
without competing with the copy.

**Ink.** Static title and marker lift to white and body to neutral-300. The linked ramp lifts to
brandeis-300 at rest, 100 on hover and 50 on press because brandeis-500 reaches only 2.77:1 on this
ground. The rule drops to neutral-700 so twelve adjacent separators do not turn into a ladder
louder than the content.

**Blue.** The available light ramp is narrow: linked text starts at brandeis-100, reaches white on
hover and returns to brandeis-50 on press; all three clear 4.5:1. The static title and marker are
white, body is brandeis-50, and the decorative rule is brandeis-300. The pressed rule width makes
the last two interactive states unmistakable even though both live near the light end of the ramp.

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

Radius is `--radius-0`: a ruled row is not a rounded object. The base rule and hover overlay are
`--border-width-hairline`; the pressed overlay is `--border-width-2`. There is no elevation shadow
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

All copy renders verbatim in sentence case. There is no text transform. Example: “Recruit
participants with the right product context” and “Define who needs to be represented before the
sample is recruited.” Numbers render with at least two digits (`01`–`12`) and are never bullet
characters.

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

Link ink transitions with `--duration-fast` and `--easing-standard`, aliased as
`--lcrd-transition-duration` and `--lcrd-transition-easing`. The interactive overlay rule uses the
existing rule-wipe precedent along its own inline axis on the same duration and easing. Pressed
rule width changes instantly so press is a state, not an animation.

No content transform, translation, scale, rotation, fade, opacity change, height animation,
thumbnail zoom or cue movement occurs. The rule-axis wipe is the sole transform and is the existing
`Button`/`Breadcrumbs` precedent, not a new motion mechanism. Under reduced motion its duration is
`--duration-instant`; colour may continue to transition because colour change is not motion.

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

**Don't**

7. Do not add a background, surrounding edge or filled finish; inspect the module and expect no
   background token and no finish prop.
8. Do not put a Button inside a linked row or interactive content in thumbnail media; tab order
   must contain one focus stop per linked row.
9. Do not add margin to any ListCard node; search the module for margin and expect zero declarations.
10. Do not add hand-written grid or flex arrangement; search the module for those display modes and
    expect zero. `Layout` and `Cluster` must own every arrangement.
11. Do not change a gap or type role in a component breakpoint; compare the responsive rules with
    sections 8 and 9.
12. Do not clamp titles/bodies or hide rows after 12; the 24-row specimen must expose all content.
13. Do not add `surface`, `size`, `finish`, `cue`, `className` or `style` to the public props; type
    checking an attempted call must fail.
14. Do not introduce a second marker slot or branch into marker-specific row components; inspect
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
   pointed at, held and tabbed to. Annotate the rule wipe and pressed width.
5. **All four surfaces as sibling bands with identical markup.** Each band contains the same two
   rows: one static numbered row to exercise title/body/marker/rule, and one linked icon row to
   exercise link/cue/ring. Print the matching section 6 surface paragraph beside each band.
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
12. **What a static page cannot force.** A final note names pointer-down, keyboard focus, the exact
    767 boundary and reduced motion, with manual instructions for each.

The squint test reads as five shapes: a two-column arrangement comparison, a marker-led ladder, a
four-band surface stack, one long ruled sequence and a pair of narrow stress tracks. The rule is a
shared cadence, not twelve repeated boxes.

## 16 · New token requests

**None — every value in this spec is an existing token.**

The `--lcrd-*` names are this component's expected component-layer declarations, not new primitive
or usage requests. They resolve to existing colour ramps, type roles, measures, gap roles, icon
sizes, border widths, focus geometry, radius, shadow, z-layer, duration and easing. The 192px
content minimum and 160px thumbnail width are t-shirt-named component sizes measured in section 7,
not new space relationships. No new colour, gap step, type role, glyph or mechanism is needed.

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

## Appendix — self-audit

```
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states Tier 2 pattern, Status accepted, and token prefix --lcrd-*. The prefix has
    no repository collision.
[x] Every Anatomy part appears in colour, geometry, or is explicitly marked as carrying no value.

NAMES
[x] Distinct token-name count: 54. Every existing name appears verbatim in docs/vocabulary.md, and
    the --lcrd-* names are this component's declared layer. Checked one at a time by
    `npm run design:check`.
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
[x] Base rule is explicitly marked decoration.
[x] One paragraph per surface explains the mapping; nested surfaces are specified.

STATES
[x] Every claimed state comes from the fixed model and uses its fixed suffix.
[x] Hover and pressed differ on all four surfaces through link ink and rule width.
[x] Every state token moves on at least one surface and is declared in all four columns.
[x] Excluded states have no token. There is no disabled opacity and no colour-only state.

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
[x] Section 16 says None and explains why component tokens do not constitute a request.
[x] Every open question has options, recommendation and blocking status.
[x] Squint test: five shapes, with scale and position supplied by marker fills and arrangements rather
    than bounded rectangles.
```
