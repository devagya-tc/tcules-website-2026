# BlockCard

## 0 · Front matter

|                     |                                       |
| ------------------- | ------------------------------------- |
| **Component**       | `BlockCard`                           |
| **Tier**            | 2 pattern (`src/patterns/BlockCard/`) |
| **Status**          | accepted                              |
| **Token prefix**    | `--bcrd-*`                            |
| **Designer / date** | Codex / 24 Aug 2026                   |
| **Implements**      | `docs/briefs/12-block-card.md`        |
| **Implemented at**  | Pending build                         |

## 1 · Identity

`BlockCard` is one bounded tile in a semantic grid: a required title and body, one optional media
slot filled by an icon or an image above the copy, and, only when the tile navigates, a trailing
cue. It is Tier 2 because it consumes a CMS-shaped record and composes `Layout`, `Cluster` and
`Icon`; a primitive may do neither.

It is not a ruled list row. `ListCard` supplies that single-edge, full-line relationship and never
reads as a tile. It is not a rich-text container. `Prose` supplies typography and rhythm for
CMS-authored markup with multiple elements and inline links. It is not the grid or the section
around the grid. `Layout` owns track count, equal rows and the gutter, while the future
`ContentSection` owns the band, content column and section heading.

The nearest component is `ListCard`, but bounded versus ruled is a category boundary rather than a
finish prop. A `finish="card"` on `ListCard` would let authors turn a row relationship into an
object for rhythm alone and would make its title/body arrangement, marker slot and list semantics
available where none belongs. `BlockCard` owns one four-sided edge, inner inset and media-above
shape; `ListCard` owns one bottom rule and no inline inset.

The component appears on 38 routes in 78 clusters. A cluster contains 2–8 cards: 2 cards 11 times,
3 cards 13 times, 4 cards 32 times, 5 cards 13 times, 6 cards 6 times, 7 cards once and 8 cards
twice. Four is the modal count, so the composition must support a deliberate four-card row at the
full content width without making the fourth an orphan.

## 2 · Anatomy

| Part      | Required          | Element / content                                                         | Values it owns                                                       |
| --------- | ----------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `root`    | yes               | One `li`; the only legal outer element                                    | Full track width and height; no colour of its own                    |
| `frame`   | yes               | An `a` when `href` is present, otherwise an inert `div`                   | Four-sided edge, inner state boundary, focus ring and full height    |
| `media`   | no                | One slot filled by a decorative `Icon` or one native image above the copy | Static media ink or image crop; never a second action                |
| `content` | yes               | The inset stack containing media icon, copy and optional cue              | Inner inset and the block-axis relationships between its children    |
| `copy`    | yes               | The tight group containing `title` and `body`                             | No colour or distance outside its `Layout`                           |
| `title`   | yes               | An `h3` or `h4`, selected by `titleAs`                                    | Static title ink or the link ink when the whole card navigates       |
| `body`    | yes in the API    | One paragraph; whitespace-only content emits no element                   | Body ink and `--measure-body`                                        |
| `cue`     | linked cards only | `Icon name="arrow-right" size="lg"`, hidden from assistive technology     | The same current link ink as the linked title; no independent token  |
| `edge`    | yes               | The frame's surrounding hairline plus a linked block-end overlay          | Base edge ink; overlay width and the linked frame's current link ink |

The media slot has two fills, not two variants. Omitting it removes the element and its adjacent
`--gap-block` relationship. An image occupies the frame inline edge-to-edge above the inset
content; an icon sits inside the content inset above the copy. The two cannot render together.

## 3 · Props / API

The image member is accepted under question 1(a).

| Prop      | Exact type / literal union                                                        | Default  | What it decides                                                                   |
| --------- | --------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------- |
| `title`   | `string`                                                                          | required | The card's heading and primary accessible label                                   |
| `body`    | `string`                                                                          | required | The one explanatory paragraph                                                     |
| `media`   | `{ kind: 'icon'; name: IconName } \| { kind: 'image'; src: string; alt: string }` | absent   | Which one fill occupies the media slot; `IconName` is the existing 17-glyph union |
| `titleAs` | `'h3' \| 'h4'`                                                                    | `'h3'`   | Heading semantics only; visual type remains fixed                                 |
| `href`    | `string`                                                                          | absent   | A non-blank destination makes the whole frame one anchor and emits the cue        |

`alt` remains required even when its correct value is the empty string, so a caller must make the
decorative-versus-informative decision explicitly. The accepted native image contract owns the
crop, intrinsic ratio, loading policy and blank-source behavior in one place, matching the shipped
`ListCard` precedent without importing that sibling pattern.

Deliberately not props:

- `surface`, colour and tone: the nearest `data-surface` ancestor resolves the complete
  `--bcrd-*` colour set. The card does not set a surface and never paints a component fill.
- `finish`, `filled`, `outlined` and `selected`: one edge-bounded finish ships. A neutral fill
  would turn 468 sub-items into grey rectangles without giving the fill a meaning.
- `cue`, `cueIcon` and `cueLabel`: `href` is the single source of truth and `arrow-right` is the
  system decision.
- `columns`, `width`, `minWidth` and `equalHeight`: the parent `Layout` owns track count, gutter and
  equal rows. The card fills the track it receives.
- `size`, density, padding, gap, radius and height: one card rhythm prevents members of one grid
  being tuned independently.
- `className`, `style` and arbitrary DOM attributes: these reopen colour, edge and geometry from
  the call site.
- `children`, rich body content and a second action: closed strings make a nested link, Button or
  control unrepresentable. Rich text belongs in `Prose`, outside a whole-card anchor.
- `onClick`, `target` and button state props: a linked card is navigation through a native anchor;
  a static card is inert.

Compile errors, not review comments:

1. A media slot cannot carry both an icon `name` and image `src`/`alt`; the discriminated union
   makes the other members impossible.
2. An image without `src` or `alt`, an icon without `name`, or an arbitrary glyph name cannot
   compile.
3. A missing `title` or `body`, a third title element, children, a cue override or a nested action
   cannot compile.
4. There is no grid or equal-height prop, so an individual card cannot contradict its parent
   cluster.
5. A static card with a cue and a linked card without one are both unrepresentable.

## 4 · Variants × sizes

| Finish | `md` — the only size                                                                                       | Intended use                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `edge` | A four-sided hairline, `--gap-block` content inset, h4 visual title, optional media above and optional cue | Every bounded grid tile; its content and the surrounding grid, not a variant prop, set its role |

There is no public `variant`, `finish` or `size` prop. Icon, image and omitted media are fills of
one slot. Link presence changes semantics and states, not the card's visual category. Heading
semantics do not change visual type. The edge, inset, title role, body role, cue size and image
ratio do not step between content shapes.

A filled finish was considered and rejected. Across paper and tint it would be a grey rhythm
choice rather than a state; on ink and blue it would require a second nested ground palette and
would make the card's visual weight come from a coloured rectangle. A four-sided edge makes the
object boundary unambiguous while letting imagery, title scale and position do the design work.

A horizontal variant was considered and rejected. Image-above is a hard content contract, and the
grid already supplies horizontal composition between cards. A horizontal tile would duplicate the
wireframe of a thumbnail `ListCard` while keeping a different semantic job.

## 5 · States

Static cards have only rest. Their surrounding edge and complete inset content do not depend on a
cue, so the 348 non-linked cards do not look unfinished and never enter the tab order.

| State           | Trigger                              | Parts that move                                                                                                            |
| --------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| rest            | Base rendering                       | Static title/media use their own inks; linked title, icon media and cue use `--bcrd-link-ink`; edge uses `--bcrd-edge-ink` |
| hover           | Pointer over a linked frame          | Linked ink takes `--bcrd-link-ink-hover`; a current-ink hairline wipes across the block-end edge                           |
| focus, keyboard | `:focus-visible` on the linked frame | Exactly the hover rendering plus the paired ring from `--bcrd-ring-color` and `--bcrd-ring-gap-color`                      |
| pressed         | Pointer activation on a linked frame | Linked ink takes `--bcrd-link-ink-pressed`; the visible block-end overlay steps to `--border-width-2`                      |

Hover and pressed differ on all four surfaces through both ink and rule width. Hover is not
colour-only because the overlay edge appears along its own axis; pressed is not colour-only
because that overlay doubles in width.

Held, disabled, expanded, busy, loading and error are excluded. A navigation tile is neither a
selectable option nor an unavailable action; nothing opens and nothing asynchronous happens. A
missing image is a content fallback, not a loading or error state.

## 6 · Per-surface colour

The edge-only card inherits the nearest surface ground. Every component value is nevertheless
declared again in all four surface blocks. Ratios are measured against `--color-paper`,
`--color-paper-deep`, `--color-neutral-950` and `--color-brandeis-500`, respectively.

| Token                     | paper                                           | tint                                            | ink                                             | blue                                        |
| ------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ------------------------------------------- |
| `--bcrd-title-ink`        | `--color-neutral-900` — 14.62:1                 | `--color-neutral-900` — 13.06:1                 | `--color-white` — 17.26:1                       | `--color-white` — 6.23:1                    |
| `--bcrd-body-ink`         | `--color-neutral-700` — 8.14:1                  | `--color-neutral-700` — 7.27:1                  | `--color-neutral-300` — 11.07:1                 | `--color-brandeis-50` — 5.57:1              |
| `--bcrd-media-ink`        | `--color-neutral-900` — 14.62:1                 | `--color-neutral-900` — 13.06:1                 | `--color-white` — 17.26:1                       | `--color-white` — 6.23:1                    |
| `--bcrd-link-ink`         | `--color-brandeis-500` — 6.17:1                 | `--color-brandeis-500` — 5.51:1                 | `--color-brandeis-300` — 7.32:1                 | `--color-brandeis-100` — 4.91:1             |
| `--bcrd-link-ink-hover`   | `--color-brandeis-600` — 7.52:1                 | `--color-brandeis-600` — 6.72:1                 | `--color-brandeis-100` — 13.61:1                | `--color-white` — 6.23:1                    |
| `--bcrd-link-ink-pressed` | `--color-brandeis-700` — 10.07:1                | `--color-brandeis-700` — 8.99:1                 | `--color-brandeis-50` — 15.44:1                 | `--color-brandeis-50` — 5.57:1              |
| `--bcrd-edge-ink`         | `--color-neutral-300` — n/a, decoration         | `--color-neutral-400` — n/a, decoration         | `--color-neutral-700` — n/a, decoration         | `--color-brandeis-300` — n/a, decoration    |
| `--bcrd-ring-color`       | `--color-brandeis-500` — 6.17:1 against its gap | `--color-brandeis-500` — 5.51:1 against its gap | `--color-brandeis-300` — 7.32:1 against its gap | `--color-white` — 6.23:1 against its gap    |
| `--bcrd-ring-gap-color`   | `--color-paper` — paired ring 6.17:1            | `--color-paper-deep` — paired ring 5.51:1       | `--color-neutral-950` — paired ring 7.32:1      | `--color-brandeis-500` — paired ring 6.23:1 |

**Paper.** Static title and icon media use neutral-900, while body drops to neutral-700. A linked
card runs through brandeis-500, 600 and 700. The neutral-300 surrounding edge stays decorative;
the current linked ink supplies the interactive block-end overlay.

**Tint.** Static and linked text ramps still clear their floors on paper-deep and are fully
restated. The base edge moves to neutral-400 so a no-fill card remains bounded without becoming a
filled rectangle.

**Ink.** Static title and icon media lift to white, body to neutral-300, and the linked ramp to
brandeis-300, 100 and 50. The neutral-700 edge is deliberately quieter than the copy and leaves
imagery and title scale as the first read.

**Blue.** Static title and icon media use white, body uses brandeis-50, and linked ink runs from
brandeis-100 to white to brandeis-50. The decorative edge is brandeis-300; the doubled pressed
overlay separates the two light interactive steps without inventing a fill state.

**Nested surface.** `BlockCard` reads only the nearest `data-surface` ancestor. A tint panel inside
an ink section resolves the complete tint column, including edge, ring and gap; no value leaks from
ink. The component receives no `surface` prop and never sets the panel ground.

## 7 · Geometry & spacing

### (a) Distances — gap-scale roles

- Card-to-card seam: parent `Layout colGap="gutter" rowGap="gutter"`; no BlockCard node carries
  outer spacing.
- Frame-to-content inset: `--gap-block` on all logical sides. This is the object's inner edge-to-
  content relationship, not parent spacing.
- Image-to-content: no extra outer gap. The image is edge-to-edge and the content's
  `--gap-block` block-start inset supplies the relationship.
- Icon media to copy: `Layout rowGap="block"` inside the inset content.
- Title to body: nested `Layout rowGap="tight"`.
- Copy to cue: `Layout rowGap="block"`.
- Cue placement: `Cluster justify="end"`; no inline gap exists because the cue is its only child.

### (b) Component sizes

- `md` card: the only size. It has no fixed inline or block size and fills the track and equal row
  its parent `Layout` provides.
- Four-card track: 286px at the 1240px Section content cap after three 32px gutter relationships.
  This is the smallest intended four-across desktop track and is the measurement for the content
  inset and type choice.
- Image media: `--bcrd-media-ratio` is 3:2. It is a recognisable landscape crop at a
  286px track, matches the shipped ListCard media precedent, and avoids an image-dominated card.
- Native image metadata: 480 × 320 intrinsic dimensions matching the
  same 3:2 ratio; the rendered image always fills the available inline size.
- Icon media: `Icon size="xl"`, resolving to `--icon-size-24`.
- Cue: `Icon size="lg"`, resolving to `--icon-size-18`.
- Linked target: the entire frame. Even the smallest title-only case exceeds 44px through one h4
  line, the surrounding edge and two `--gap-block` insets; no hit extension is needed.

### (c) Optical corrections

None. The component does not reach into `--space-*`. Insets and seams use the gap scale, glyphs
use `Icon`, the image uses a component ratio, and edge/focus geometry uses system tokens.

Radius is `--radius-0`: the four-sided edge is an editorial boundary rather than a control shell.
The surrounding edge and hover overlay are `--border-width-hairline`; the pressed overlay is
`--border-width-2`. There is no elevation (`--shadow-none`), and the card stays at `--z-base`.
The focus ring uses `--focus-ring-width` and `--focus-ring-offset`.

## 8 · Typography

| Part             | Type role        | Tracking                                   | Measure           |
| ---------------- | ---------------- | ------------------------------------------ | ----------------- |
| `title`          | `--text-h4`      | `--text-h4-tracking`                       | `--measure-title` |
| `body`           | `--text-body`    | none — this role has no tracking companion | `--measure-body`  |
| Icon/image media | none             | none                                       | none              |
| `cue`            | none — an `Icon` | none                                       | none              |

The component aliases the title and body roles through `--bcrd-title-text`,
`--bcrd-title-tracking` and `--bcrd-body-text`. `titleAs` changes the heading level, never the
visual role. H4 scale is deliberate at a 286px four-card track: it gives a text-only tile enough
weight to remain an object without relying on a fill.

All copy renders verbatim in sentence case with no text transform. Examples: “When this is useful”
and “Map the decision, evidence and owner before work begins.”

## 9 · Responsive

BlockCard has no internal arrangement breakpoint. At 1023 and 767 the title/body roles resolve
their shared type-layer values, while media remains above copy and all gap roles remain unchanged.

The parent `Layout`, not the card, owns reflow:

- Two-card clusters: `columns={{ base: 1, md: 2 }}`.
- Three-card clusters: `columns={{ base: 1, md: 2, lg: 3 }}`.
- Four-card clusters: `columns={{ base: 1, md: 2, xl: 4 }}`. They read 2×2 from 768 through 1279
  and become one deliberate four-card row only when the content track can support it.
- Five-to-eight-card clusters choose three or four at `xl` from their content grouping; BlockCard
  has no count detection and no orphan rule.

At 767 every grid collapses to one track. The image remains 3:2 and full width; title/body wrap
without clamps; the cue remains at inline end. At a 192px stress track, content still has 144px
after two `--gap-block` insets and wraps rather than widening the parent.

The gap scale does not shift responsively. No component media query changes an inset, gap, type
role, edge width or image ratio. The whole linked frame is the touch target and naturally clears
44px, so no size step or extended hit area is needed.

## 10 · Composition

The future `ContentSection` receives the grid as its child. The outer `Layout` owns column count,
gutter and equal rows. The frame's `Layout` stacks an optional edge-to-edge image and the inset
content; the content `Layout` owns the icon/copy/cue rhythm; `Cluster` places the cue at inline end.

```jsx
<Layout as="ul" columns={{ base: 1, md: 2, xl: 4 }} colGap="gutter" rowGap="gutter" equalRows>
  <li>
    <Frame as={href ? 'a' : 'div'}>
      <Layout rowGap="none">
        {image}
        <Layout rowGap="block">
          {icon}
          <Layout rowGap="tight">
            {title}
            {body}
          </Layout>
          {href ? (
            <Cluster justify="end">
              <Icon name="arrow-right" size="lg" />
            </Cluster>
          ) : null}
        </Layout>
      </Layout>
    </Frame>
  </li>
</Layout>
```

`Frame` names the conditional native `a` or `div`; it is not a new primitive. The frame and root
receive only local sizing so they fill the equal grid row. `Button` is not used because the anchor
already owns the whole tile and a nested control would create a second focus target. `Prose` is not
used because one plain paragraph is not a rich-text flow.

There is no hand-rolled grid or flex, no margin on a child, and no override of Section's ground,
gutter or content column. Track count and `equalRows` stay at the call site because they describe a
relationship between cards, not one card.

## 11 · Accessibility

Each component is an `li`, and every card grid uses `Layout as="ul"`. The title is an `h3` by
default because the corpus records 468 H3 sub-items beneath section headings; `titleAs="h4"` is
available when the card group sits under an h3. A non-blank `href` wraps the entire frame in one
native anchor. A static frame is an inert `div`.

| Key         | Linked card                                 | Static card      | Why                                      |
| ----------- | ------------------------------------------- | ---------------- | ---------------------------------------- |
| `Tab`       | Moves focus to the card anchor in DOM order | Skips the card   | Native link order; no synthetic tab stop |
| `Shift+Tab` | Moves to the preceding focusable element    | Skips the card   | Native reverse order                     |
| `Enter`     | Activates the anchor and navigates          | Unbound          | Native link contract                     |
| `Space`     | Scrolls the page                            | Scrolls the page | A link is not a button                   |
| Arrow keys  | Unbound                                     | Unbound          | This is a list, not a composite widget   |
| `Escape`    | Unbound                                     | Unbound          | Nothing opens or captures focus          |

Focus order follows DOM and reading order, with only linked cards included. No internal state
change moves focus; after navigation the destination document and browser own it.

ARIA is deliberately small:

- The cue's unlabelled `Icon` emits `aria-hidden="true"`.
- Icon media is decorative because the title names the same subject; its unlabelled `Icon` is
  hidden from assistive technology.
- Image alternative text comes from required `media.alt`. `alt=""` is allowed only when title and
  body already communicate everything the image adds.
- No `role`, `aria-current`, `aria-disabled`, `aria-expanded`, `aria-controls`,
  `aria-describedby` or busy attribute is emitted.

No ids are generated and there are no id references. Consequently there is no absent target for
`aria-controls` to name.

Keyboard focus uses `:focus-visible` only. It shows the hover ink and block-end overlay plus a
`--focus-ring-width` ring separated by `--focus-ring-offset` in the nearest surface's gap colour.
The ring-to-gap ratios are 6.17:1, 5.51:1, 7.32:1 and 6.23:1. Text and meaningful cue glyphs meet
4.5:1 in every live state. The quiet surrounding edge is decoration. Reduced motion keeps the
interactive edge visible but makes its wipe instant.

A screen reader encounters a static card as: “List, four items. When this is useful, heading level 3. Use this approach when several teams must make the same decision.” It encounters a linked card
as: “Relevant work, heading level 3. See how the service was redesigned, link.” It does not announce
the decorative subject icon or arrow a second time.

## 12 · Content edge cases

| Case                                      | Required handling                                                                                                                                                                                                                                                          |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Longest realistic string                  | Title and body wrap without clamp or truncation. Their measures cap line length; the card grows, while parent `equalRows` keeps its grid peers aligned. Test an 80-character title and 240-character body.                                                                 |
| One long unbroken token (a URL)           | Title and body break anywhere before overflow. Media, edge and cue remain in their own boxes.                                                                                                                                                                              |
| Zero items                                | The caller omits the parent grid; do not render an empty `ul`. `BlockCard` itself is not called.                                                                                                                                                                           |
| One item                                  | Render one bounded `li`. The edge belongs to the object even when no sibling exists; the parent chooses an appropriate track rather than stretching through a card prop.                                                                                                   |
| Many items (2× expected)                  | Render 16 cards through the caller's normal responsive `Layout`; no pagination, clamping, count detection or internal grid logic.                                                                                                                                          |
| Missing image or missing optional slot    | Omitting `media` removes its element and seam. Under accepted question 1(a), a blank runtime image `src` is treated as no media and warns in development; the title/body card remains complete and no placeholder ships.                                                   |
| Empty required-ish text                   | A whitespace-only title renders nothing and warns in development. A blank body omits the paragraph and warns but keeps the titled card. A blank `href` is absent, so no anchor, cue or interactive states render.                                                          |
| Narrow track at 767                       | Parent grid is one track. Image remains above copy, content stays inset, and text wraps without changing its gap or type role.                                                                                                                                             |
| Parent that does not size it              | Root and frame fill one available line in a wrapping parent through full inline size and `min-inline-size: 0`. There is deliberately no component minimum: below the 192px named stress track, the image shrinks and text wraps rather than forcing page overflow.         |
| Logical properties rather than left/right | Content uses logical inset, edge is on all logical sides, and cue sits at inline end. The current site is LTR; an RTL composition must swap the directional cue to the existing `arrow-left` glyph at the composition boundary.                                            |
| Surface nested inside a different one     | The nearest `data-surface` block redeclares all nine colour tokens. A tint card inside an ink band uses the complete tint column.                                                                                                                                          |
| Two components adjacent                   | Each card keeps its own four-sided edge. With the required `Layout` gutter they remain separate objects; in a zero-gap stress harness the shared seam is intentionally two hairlines because two bounded objects meet. No sibling selector removes either card's boundary. |
| Interactive content inside a slot         | Rejected. Title/body are strings, icon media is inert and image media exposes only `src`/`alt`. The whole-card anchor is the only possible focus target. Rich text with an inline link must use `Prose` outside BlockCard rather than nesting anchors.                     |

## 13 · Motion

Linked ink transitions with `--duration-fast` and `--easing-standard`, aliased as
`--bcrd-transition-duration` and `--bcrd-transition-easing`. The block-end edge overlay uses the
existing Button, Breadcrumbs and ListCard rule-wipe precedent on the same duration and easing.
Pressed edge width changes instantly so press reads as a state rather than an animation.

No content transform, translation, scale, rotation, fade, opacity change, height animation, image
zoom or cue movement occurs. The rule-axis wipe is the sole transform and introduces no new motion
mechanism. Under reduced motion its duration becomes `--duration-instant`; colour may continue at
its normal duration because colour change is not motion.

## 14 · Do's and Don'ts

**Do**

1. Put every group in `Layout as="ul"` with explicit columns, `colGap="gutter"`,
   `rowGap="gutter"` and `equalRows`; inspect the call-site tree and computed tracks.
2. Render four cards as two columns from `md` and four only from `xl`; inspect 1023, 1279 and 1280
   to prove the fourth never becomes a three-column orphan.
3. Render image media above the title at 3:2 and icon media inside the inset content; compare their
   DOM order and crop boxes.
4. Render the cue exactly when a non-blank `href` produces one whole-card anchor; count anchors and
   cues and expect equal totals.
5. Show a static no-media card as a complete four-sided object with no blank action row; inspect
   its edge and content box beside a linked peer.
6. Render identical markup on all four surface bands and inspect all nine resolved `--bcrd-*`
   colours, including the two nested-surface proofs.
7. Use `titleAs` to match the page outline while preserving h4 visual type; compare the heading map
   with the computed type token.

**Don't**

8. Do not add a fill or ground token; search the component layer for `bg`, `ground` and fill
   declarations and expect none outside image/SVG content.
9. Do not put title text over an image; inspect the DOM and expect image before a separate content
   block, never an overlay.
10. Do not import `ListCard`, `Button`, another pattern or content; lint and the tier-boundary grep
    must remain green.
11. Do not add margin or hand-written grid/flex arrangement; search the module and expect no child
    margin and no display mode used to arrange siblings.
12. Do not add `surface`, `size`, `finish`, `columns`, `equalHeight`, `cue`, `children`, `className`
    or `style` to the public props; type-checking attempted calls must fail.
13. Do not clamp titles/bodies or hide cards after eight; the 16-card specimen exposes every row.
14. Do not place a link, Button or control in body/media; inspect the rendered tab order and expect
    one focus stop per linked card and none per static card.

## 15 · Specimen plan — `/design/block-card`

The exact block list, in order:

1. **Identity and finish.** One static no-media card beside one linked card. Annotate the complete
   four-sided edge, no fill, no missing action row and the boundary from ListCard.
2. **Grid-count ladder.** Real 2-, 3- and 4-card groups. Two uses `md:2`; three uses `md:2, lg:3`;
   four uses `md:2, xl:4`. All use gutter on both axes and `equalRows`.
3. **Media fill ladder.** Three otherwise identical cards: icon, image and omitted media. Label
   them as fills of one slot, not variants. Image is above; icon is within the content inset.
4. **Static majority and linked minority.** Eight cards with exactly two linked. Static cards must
   look complete; linked cards add the cue and whole-card anchor without changing height logic.
5. **States.** One linked image card at rest plus a four-row reference for rest, hover, focus and
   pressed. Hover, pointer-down and keyboard focus have no props and must be pointed at, held and
   tabbed to; annotate the wipe and doubled pressed edge.
6. **All four surfaces as sibling bands with identical markup.** Each band contains one static icon
   card, one static no-media card and one linked image card. Print the matching section 6 paragraph
   beside each band.
7. **Nested surfaces.** Tint inside ink and ink inside paper, each with identical three-card markup
   and all nine resolved colour tokens listed beside it.
8. **Equal-height challenge.** Four cards in one row: one-line, two-line and five-line titles plus a
   longer body. Print the root/frame heights to prove the parent `equalRows` contract.
9. **Every section 12 edge case.** Thirteen labelled blocks: long title/body; unbroken URL; zero
   items with visible empty harness; one item; 16 items; omitted media and blank image source; blank
   title/body/href; 767 track; unsized wrapping parent; logical placement; nested surface; zero-gap
   adjacent cards; rejected interactive slot as a contract note.
10. **Four-card breakpoint proof.** The same four cards at exact 1279 and 1280 instructions: 2×2
    below `xl`, one row at `xl`; the static page note gives manual viewport steps.
11. **Narrow tracks.** The same icon, image and no-media cards at 256px and 192px. No overflow, title
    overlay or cue collision is allowed.
12. **Heading map.** The same card as `h3` and `h4`; computed h4 visual type remains identical.
13. **Two adjacent.** Two zero-gap cards show the deliberate double hairline, followed by the same
    pair at the required gutter to show the production composition.
14. **What a static page cannot force.** A final note names pointer-down, keyboard focus, the exact
    767/1279/1280 boundaries and reduced motion, with manual instructions for each.

The squint test reads as five shapes: one edge-bound identity pair, three progressively denser grid
bands, a media-led ladder, four surface bands and two narrow stress rails. The card's weight comes
from image scale, h4 titles and grid position, not repeated grey fills.

## 16 · New token requests

**None — every value in this spec is an existing token.**

The `--bcrd-*` names are the component layer this spec declares, not new primitive or usage
requests. They resolve to existing colour ramps, type roles, measures, gap roles, icon sizes,
border widths, focus geometry, radius, shadow, z-layer, duration and easing. The 3:2 image frame is
a component ratio measured in section 7. No new colour, gap step, type role, glyph or mechanism is
needed.

## 17 · Open questions

**1 · Image ownership, crop and empty state — ANSWERED, 24 Aug 2026.**

- **(a) BlockCard-owned native image.** Use the
  `{ kind: 'image'; src: string; alt: string }` member. BlockCard owns a 3:2 centre crop, 480 × 320
  intrinsic dimensions, lazy loading, asynchronous decoding and blank-source handling. A blank
  source collapses media with a development warning; no placeholder ships.
- **(b) Caller-owned media element in a BlockCard frame.** Replace `src`/`alt` with one
  non-interactive `ReactElement`. BlockCard owns the 3:2 crop; the caller owns alternative text,
  intrinsic dimensions and loading policy. Missing media collapses with a warning.
- **(c) Defer image media until Figure exists.** Ship only the icon fill now, then add image media
  through the future Figure primitive. This removes a launch requirement from the 38-route scope.

**Recommendation: (a).** `ListCard` now supplies a shipped native-image precedent with the same
3:2 crop and blank-source behavior. Repeating that closed `src`/`alt` record keeps alternative text
mandatory, prevents nested controls, and avoids a Tier 2 pattern importing a sibling or a future
primitive that does not exist. This choice changes the public union, so implementation must not
start until the owner answers.

**Answered: (a).** BlockCard owns the native image through required `src` and `alt` fields, a 3:2
centre crop, 480 × 320 intrinsic dimensions, lazy loading and asynchronous decoding. A blank source
collapses the media and warns in development; no placeholder ships. `alt=""` remains valid when the
title and body already convey the image's information.

**2 · What makes the card bounded — non-blocking.** Options: a four-sided edge; a neutral fill; or
fill on light surfaces and edge on dark surfaces. **Recommendation and draft decision: one
four-sided edge on every surface.** It is an object at rest without acquiring a second ground,
keeps nested-surface resolution simple, and leaves imagery, type scale and position to carry visual
weight.

**3 · Cue and link target — non-blocking.** Options: a title-only text link; a separate Button; or
one whole-card native anchor with an arrow mark. **Recommendation and draft decision: one whole-card
anchor.** It gives one honest target and one focus stop. Title/body strings prohibit the nested body
link that this choice would otherwise make invalid.

**4 · Four cards as one row or 2×2 — non-blocking.** Options: always four from `lg`; always 2×2; or
2×2 until `xl`, then four. **Recommendation and draft decision: 2×2 until `xl`, then four.** It
honours the modal four-card cluster as a deliberate full-width row at the 1240px cap without
squeezing it into four tracks at 1024.

**5 · Equal heights — non-blocking.** Options: natural heights; BlockCard forces a height; or the
parent grid uses `equalRows` while BlockCard fills the track. **Recommendation and draft decision:
parent `Layout equalRows`.** Equal height is a sibling relationship, not a card prop; the five-line
title case stays aligned without giving one card knowledge of another.

**6 · Title semantics — non-blocking.** Options: always h3; a `span`; or an exact h3/h4 union.
**Recommendation and draft decision: `titleAs: 'h3' | 'h4'`, default `h3`.** The corpus records 468
H3 sub-items, while an h4 is required when a card cluster sits below an h3. Both retain h4 visual
type.

## Appendix — self-audit

```
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states Tier 2 pattern, Status accepted, and token prefix --bcrd-*; the prefix has no
    repository collision.
[x] Every Anatomy part appears in colour, geometry, or is explicitly marked as carrying no value.

NAMES
[x] Distinct token-name count: 49. Every existing name appears verbatim in
    docs/vocabulary.md, and --bcrd-* names are the component layer declared by this spec.
[x] Named glyphs are existing: arrow-right, arrow-left, and the IconName union's 17 glyphs.
[x] Section, Layout and Cluster props/values are existing unions: as, rowGap, colGap, columns,
    equalRows, justify; none, tight, block, gutter, end; base, md, lg, xl; ul, li.
[x] Zero hex codes, rgb(), hsl(), Tailwind names, CSS rule blocks or media-query blocks.
[x] Tracking companion is used only with h4, which has one; body correctly names none.
[x] Every layout distance is a gap-scale role.
[x] Space-ramp reaches: 0.
[x] Literal pixel count: 15 occurrences, 7 distinct values. Every occurrence is a component size,
    touch floor or Section/container measurement argued in section 7.

COLOUR AND CONTRAST
[x] Colour table has 9 rows × 4 full cells; no delta and no blank.
[x] Every text/glyph cell has a measured ratio of at least 4.5:1.
[x] Focus ring is measured against its own gap on all four surfaces.
[x] Base edge is explicitly marked decoration.
[x] One paragraph per surface explains the mapping; nested surfaces are specified.

STATES
[x] Every claimed state comes from the fixed model and uses its fixed suffix.
[x] Hover and pressed differ on all four surfaces through linked ink and overlay width.
[x] Every state token moves on at least one surface and is declared in all four columns.
[x] Excluded states have no token. There is no disabled opacity and no colour-only state.

LAYOUT, TYPE, SEMANTICS
[x] Every arrangement belongs to Layout or Cluster; every columns declaration has colGap.
[x] No child margin. No responsive gap or type-role swap.
[x] Title and body name measures.
[x] Whole-card link clears the 44px touch floor through its natural frame.
[x] There are no ARIA idrefs and no upward-walking state selector.

COMPLETENESS
[x] All thirteen required content edge cases are answered.
[x] The unsized-parent row states that no hard component minimum exists and names the 192px stress
    track used to verify it.
[x] Do's and Don'ts name a rendered-tree, type-check, search or computed-style decision.
[x] Specimen plan covers the one finish/size, all media fills, four surfaces, manual states, nested
    surfaces, every edge case, equal rows, adjacent cards and narrow tracks.
[x] Section 16 says None and explains why component tokens do not constitute a request.
[x] Every open question has options, recommendation and blocking status.
[x] Squint test: five shapes, with scale and position supplied by media and grid density rather than
    repeated filled rectangles.
```
