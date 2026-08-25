# BlockCard

## 0 · Front matter

|                     |                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Component**       | `BlockCard`                                                                                                            |
| **Tier**            | 2 pattern (`src/patterns/BlockCard/`)                                                                                  |
| **Status**          | implemented                                                                                                            |
| **Token prefix**    | `--bcrd-*`                                                                                                             |
| **Designer / date** | Codex / 24 Aug 2026                                                                                                    |
| **Revised**         | Cards 1a redesign / 25 Aug 2026 — borderless finish, always-dark title, `eyebrow`, a read-more `cta`, horizontal orientation |
| **Implements**      | `docs/briefs/12-block-card.md`                                                                                         |
| **Implemented at**  | `src/patterns/BlockCard/` · `src/styles/tokens/components/block-card.css` · specimen `src/app/design/block-card/page.tsx` |

## 1 · Identity

`BlockCard` is one borderless card in a semantic grid: a required title and body, an optional
eyebrow label above the title, one optional media slot filled by an icon or an image, and, only
when the card navigates, a read-more cta naming where it goes — the shipped link `Button`, not a cue
of the card's own. It arranges on either axis — media-above-copy in a grid track, or
media-beside-copy in a stacked row. It is Tier 2 because it consumes a CMS-shaped record and
composes `Layout`, `Button` and `Icon`; a primitive may do neither.

It is not a ruled list row. `ListCard` supplies that single-edge, full-line relationship and never
reads as a tile. It is not a rich-text container. `Prose` supplies typography and rhythm for
CMS-authored markup with multiple elements and inline links. It is not the grid or the section
around the grid. `Layout` owns track count, equal rows and the gutter, while the future
`ContentSection` owns the band, content column and section heading.

The nearest component is `ListCard`, and neither draws a box, so the boundary is no longer edge
versus rule — it is object versus row, which is a category rather than a finish prop. A
`finish="card"` on `ListCard` would let authors turn a row relationship into an object for rhythm
alone and would make its title/body arrangement, marker slot and list semantics available where
none belongs. `BlockCard` owns a media slot that can lead the card, an eyebrow, a named cta and two
arrangement axes; `ListCard` owns one block-end rule, a compact marker slot and a bare arrow.

The horizontal orientation is deliberately close to a thumbnail `ListCard` in wireframe and is
still a different component: a `ListCard` row is a compact index entry at `--text-h5` with a 160px
thumbnail and a bare arrow, while a horizontal `BlockCard` gives the media half the card, keeps the
h4 title, the eyebrow and the named cta, and is used a few at a time rather than twelve at a time.
The distinction is weight and count, and section 4 records why it was reopened.

The component appears on 38 routes in 78 clusters. A cluster contains 2–8 cards: 2 cards 11 times,
3 cards 13 times, 4 cards 32 times, 5 cards 13 times, 6 cards 6 times, 7 cards once and 8 cards
twice. Four is the modal count, so the composition must support a deliberate four-card row at the
full content width without making the fourth an orphan.

## 2 · Anatomy

| Part      | Required          | Element / content                                                     | Values it owns                                                    |
| --------- | ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `root`    | yes               | One `li`; the only legal outer element                                | Full track width and height; no colour of its own                 |
| `frame`   | yes               | An `a` when `href` is present, otherwise an inert `div`               | The state boundary, the focus ring and full height. No edge       |
| `media`   | no                | One slot filled by a decorative `Icon` or one native image            | Static media ink and the image crop; never a second action        |
| `content` | yes               | The stack containing media icon, copy and optional cta                | The block-axis relationships between its children. No inset       |
| `copy`    | yes               | The tight group containing `eyebrow`, `title` and `body`              | No colour or distance outside its `Layout`                        |
| `eyebrow` | no                | One `span` above the title; whitespace-only content emits no element  | Eyebrow ink and the eyebrow type role; the case comes from `--text-mono-case` |
| `title`   | yes               | An `h3` or `h4`, selected by `titleAs`                                | `--bcrd-title-ink` and `--measure-title`, linked or not           |
| `body`    | yes in the API    | One paragraph; whitespace-only content emits no element               | Body ink and `--measure-body`                                     |
| `cta`     | linked cards only | One link `Button` — `emphasis="link"`, `as="span"`, trailing `arrow-right` | Nothing. `Button` owns its type, case, seam, glyph size, colour and underline |

The title's ink does not depend on `href`. That is the redesign's central change: a linked card is
recognisable by a cta that names its destination, not by a blue heading, so `--bcrd-link-ink` is
worn by the cta alone and never by the title, the eyebrow or icon media.

The `cta` is the shipped link `Button` rather than anything this component draws. That is the second
half of the redesign: the card's job is to say what the control IS, and `Button` already answers what
a link-emphasis control looks like on four surfaces, in three states, with a trailing glyph and an
underline that wipes in. A bespoke cue inside a card is a second opinion about a control the system
already owns.

It renders `as="span"`, and that is what keeps the single-anchor contract of sections 3 and 12
intact: the whole tile already navigates, so a nested `<button>` or `<a>` would be invalid markup and
a second focus stop for one destination. A span still receives Button's `.link` and `.live` classes,
so it keeps the complete link treatment, and `Button` emits neither `type` nor `tabIndex` for a
non-button tag.

A span is also never itself hovered, focused or pressed. The frame therefore carries
`data-btn-link-group` — `Button`'s published contract for exactly this case, which declares that the
enclosing anchor's states are the button's states. Without it the cta would sit at rest forever: the
right colour, and no underline. `BlockCard` sets one attribute and reads none of `Button`'s tokens.

The cta replaces the bare arrow the shipped card had rather than sitting beside it.

There is no `edge` part. The card was bounded by a four-sided hairline and is now bounded by the
parent `Layout`'s gutter alone, on every surface and in every state.

The media slot has two fills, not two variants. Omitting it removes the element and its adjacent
`--gap-block` relationship. An image occupies the frame inline edge-to-edge with the copy flush
beneath it; an icon heads the copy stack. The two cannot render together, and only an image can
take the second track of the horizontal orientation — see section 12.

## 3 · Props / API

The image member is accepted under question 1(a).

| Prop          | Exact type / literal union                                                        | Default      | What it decides                                                                   |
| ------------- | --------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------- |
| `title`       | `string`                                                                          | required     | The card's heading and primary accessible label                                   |
| `body`        | `string`                                                                          | required     | The one explanatory paragraph                                                     |
| `eyebrow`     | `string`                                                                          | absent       | One quiet label above the title; a blank value omits the element and warns        |
| `media`       | `{ kind: 'icon'; name: IconName } \| { kind: 'image'; src: string; alt: string }` | absent       | Which one fill occupies the media slot; `IconName` is the existing 17-glyph union |
| `titleAs`     | `'h3' \| 'h4'`                                                                    | `'h3'`       | Heading semantics only; visual type remains fixed                                 |
| `href`        | `string`                                                                          | absent       | A non-blank destination makes the whole frame one anchor and emits the cta        |
| `ctaLabel`    | `string`                                                                          | `Read more`  | The cta wording on a linked card; blank falls back to the default and warns. `Button` uppercases it, so pass ordinary capitalisation |
| `orientation` | `'vertical' \| 'horizontal'`                                                      | `'vertical'` | Which axis the card arranges on                                                   |
| `imageSide`   | `'left' \| 'right'`                                                               | `'left'`     | Which track the media takes when horizontal; ignored when vertical                |

`eyebrow` is one plain string and deliberately not a `{ type, name, kicker }` record. What belongs
on that line differs by page — a client, a category, a content type, a topic, an editorial kicker —
so a structured shape would have to enumerate a set the corpus does not agree on, and would then
own the separator between its parts. The caller composes the line; the card renders it.

`ctaLabel` defaults rather than being required. "Read more" is content-type-agnostic and correct for
a case study, an article and a topic alike, so no caller is forced to write copy it does not have;
a page that can name its destination passes the specific line instead.

`imageSide` defaults to `'left'` rather than being required whenever `orientation="horizontal"`. A
horizontal card is then one prop, and alternation stays an explicit call-site decision. It is
caller-set per card on purpose: a card that alternated by itself would need to know its own index,
and the parent already does.

`alt` remains required even when its correct value is the empty string, so a caller must make the
decorative-versus-informative decision explicitly. The accepted native image contract owns the
crop, intrinsic ratio, loading policy and blank-source behavior in one place, matching the shipped
`ListCard` precedent without importing that sibling pattern.

Deliberately not props:

- `surface`, colour and tone: the nearest `data-surface` ancestor resolves the complete
  `--bcrd-*` colour set. The card does not set a surface and never paints a component fill.
- `finish`, `filled`, `outlined`, `bordered` and `selected`: one borderless finish ships. A
  neutral fill would turn 468 sub-items into grey rectangles without giving the fill a meaning, and
  a `bordered` escape hatch would restore the edge this redesign removed one call site at a time.
- `cue` and `cueIcon`: `href` is the single source of truth for whether the cta renders, and
  `arrow-right` is the system decision. `ctaLabel` opens the wording and nothing else — not the
  glyph, not the presence, not the placement.
- `ctaEmphasis`, `ctaTone` and `ctaSize`: the cta is a link-emphasis primary `Button` and that is
  the whole of it. A solid or ghost cta would be a real control inside a whole-card anchor, which
  section 11 forbids; a tone switch would put a second action colour in a card that has one link.
- `imageRatio`: the two ratios belong to the two orientations, so a caller who wants the other one
  is asking for the other arrangement.
- `alternate` or `stagger` on a card: alternation is a relationship between siblings, like
  `equalRows`, so it belongs to the composition that can see them all.
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
5. A static card with a cta and a linked card without one are both unrepresentable.
6. A third orientation, a third image side or a cta glyph override cannot compile.

## 4 · Variants × sizes

One finish, one size, two orientations.

| Orientation  | `md` — the only size                                                                                                            | Intended use                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `vertical`   | No edge, no inset. Media above copy at 3:2, h4 visual title, optional eyebrow, optional cta. Fills one track of a parent grid   | Every card grid, 2–8 across the 78 clusters; content and grid density, not a prop, set its role  |
| `horizontal` | The same anatomy in two equal tracks with the media at 4:3 and the two columns centred against each other. Fills a single track | A stack of a few substantial items — the modal case is 3–4 case studies — where a grid would shrink each one to a thumbnail |

There is no public `variant`, `finish` or `size` prop. Icon, image and omitted media are fills of
one slot. Link presence changes semantics and the cta, not the card's visual category. Heading
semantics do not change visual type. The title role, body role, eyebrow role, cta size and the two
media ratios do not step between content shapes.

**The edge was removed.** The shipped card carried a four-sided hairline plus a hover/pressed
block-end overlay, and the direction the two reference decks set is a card bounded by distance
alone. The gutter between cards is 32px and the section rhythm around a group is 96px, which is
enough separation without a line; a hairline on top of that reads as a form field rather than an
editorial object. Removing it also removes the inner inset, because that inset existed only to hold
copy off the edge — see section 7.

A filled finish was considered and rejected, and that still holds. Across paper and tint it would
be a grey rhythm choice rather than a state; on ink and blue it would require a second nested ground
palette and would make the card's visual weight come from a coloured rectangle. Weight comes from
image scale, title scale and position.

**The horizontal orientation was previously rejected and that rejection is overturned.** This spec
argued that image-above was a hard content contract, that the grid already supplied horizontal
composition between cards, and that a horizontal tile would duplicate the wireframe of a thumbnail
`ListCard`. The first two were reasons not to need it, not reasons it would be wrong, and the third
is answered in section 1: a `ListCard` row is a compact h5 index entry with a 160px thumbnail and a
bare arrow, while a horizontal `BlockCard` gives the media half the card and keeps the h4 title,
the eyebrow and a named cta. The real case is a page with three or four case studies, where a grid
makes each one a thumbnail and a row lets each one carry a readable image.

No featured or hero size ships alongside it. Standard card proportions only; a card that could be
twice the size of its neighbours is a composition decision, and the composition can already give
one card its own single-track band.

## 5 · States

Static cards have only rest. Their complete copy does not depend on a cta, so the 348 non-linked
cards do not look unfinished and never enter the tab order.

| State           | Trigger                              | Parts that move                                                                                        |
| --------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| rest            | Base rendering                       | Nothing moves. Title, body, eyebrow and media hold their own inks; the cta sits at `--btn-link-*-fg`   |
| hover           | Pointer over a linked frame          | The cta takes `--btn-link-primary-fg-hover` and its underline wipes in from the label's inline start   |
| focus, keyboard | `:focus-visible` on the linked frame | The hover cta plus the paired ring from `--bcrd-ring-color` and `--bcrd-ring-gap-color`                |
| pressed         | Pointer activation on a linked frame | The cta takes `--btn-link-primary-fg-pressed`; the underline stays drawn                               |

The cta is the only part with states, and none of those states is the card's to declare. `Button`
owns all three steps and the underline; `BlockCard` only tells it when they apply, by carrying
`data-btn-link-group` on the frame. The card's own contribution to the state model is the focus ring
and nothing else.

Hover is therefore **not** colour-only, which is the second thing the link `Button` buys back. The
edge wipe that used to carry hover along its own axis went with the edge, and for a while the cue
moved in colour alone; the `Button` underline restores a non-colour hover signal, in the one place
the system already animates one. Pressed is colour-only against hover, which is the same contract
every other link-emphasis `Button` on the site keeps.

Hover and pressed remain distinguishable on all four surfaces: `Button`'s layer declares three
separate link steps per surface, measured in that component's own spec rather than restated here.

Held, disabled, expanded, busy, loading and error are excluded. A navigation tile is neither a
selectable option nor an unavailable action; nothing opens and nothing asynchronous happens. A
missing image is a content fallback, not a loading or error state.

## 6 · Per-surface colour

The card paints nothing and inherits the nearest surface ground. Every component value is
nevertheless declared again in all four surface blocks. Ratios are measured against `--color-paper`,
`--color-paper-deep`, `--color-neutral-950` and `--color-brandeis-500`, respectively.

| Token                     | paper                                           | tint                                            | ink                                             | blue                                        |
| ------------------------- | ----------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | ------------------------------------------- |
| `--bcrd-title-ink`        | `--color-neutral-900` — 14.62:1                 | `--color-neutral-900` — 13.06:1                 | `--color-white` — 17.26:1                       | `--color-white` — 6.23:1                    |
| `--bcrd-body-ink`         | `--color-neutral-700` — 8.14:1                  | `--color-neutral-700` — 7.27:1                  | `--color-neutral-300` — 11.07:1                 | `--color-brandeis-50` — 5.57:1              |
| `--bcrd-eyebrow-ink`      | `--color-neutral-600` — 4.92:1                  | `--color-neutral-700` — 7.27:1                  | `--color-neutral-400` — 8.05:1                  | `--color-brandeis-100` — 4.91:1              |
| `--bcrd-media-ink`        | `--color-neutral-900` — 14.62:1                 | `--color-neutral-900` — 13.06:1                 | `--color-white` — 17.26:1                       | `--color-white` — 6.23:1                    |
| `--bcrd-ring-color`       | `--color-brandeis-500` — 6.17:1 against its gap | `--color-brandeis-500` — 5.51:1 against its gap | `--color-brandeis-300` — 7.32:1 against its gap | `--color-white` — 6.23:1 against its gap    |
| `--bcrd-ring-gap-color`   | `--color-paper` — paired ring 6.17:1            | `--color-paper-deep` — paired ring 5.51:1       | `--color-neutral-950` — paired ring 7.32:1      | `--color-brandeis-500` — paired ring 6.23:1 |

Six rows, not nine. `--bcrd-link-ink`, `-hover` and `-pressed` were **deleted**: the cta is a link
`Button`, so its three steps per surface come from `--btn-link-primary-fg{,-hover,-pressed}` in
`button.css`. The card no longer has a link-coloured part of its own, and a colour nothing paints is
a colour something paints again. `BlockCard` does not read those `--btn-*` names either — it carries
`data-btn-link-group` and `Button`'s own stylesheet resolves them.

`--bcrd-eyebrow-ink` is the one new token this redesign asks for, and it is not a new colour: it is
the same quiet-label ramp already declared by `--crumb-collapse-ink` and `--foot-label-ink`, aliased
for a third consumer. Section 16 records both the addition and the removals.

**Paper.** Title and icon media use neutral-900, body drops to neutral-700 and the eyebrow to
neutral-600, which is 4.92:1 — the floor of AA and not to be lightened. The cta runs through
brandeis-500, 600 and 700 on `Button`'s own tokens, and it is the only part of the card that moves.

**Tint.** The text inks still clear their floors on paper-deep and are fully restated. The eyebrow
steps to neutral-700 because neutral-600 would be 4.39:1 on this ground, which is the one place the
two light surfaces genuinely differ.

**Ink.** The direction inverts. Title and icon media lift to white, body to neutral-300 and the
eyebrow to neutral-400. The cta lifts too, through `Button`'s ink block rather than this one —
another reason not to keep a parallel set of card-owned link inks that could drift from it.

**Blue.** Title and icon media use white, body uses brandeis-50 and the eyebrow brandeis-100 at
4.91:1 — the tightest cell in the table. The cta takes `Button`'s blue link steps, and the underline
is what keeps its states legible here rather than three near-neighbours at the light end of one ramp.

**Nested surface.** `BlockCard` reads only the nearest `data-surface` ancestor, and so does the
`Button` inside it. A tint panel inside an ink section resolves the complete tint column, including
eyebrow, ring and gap, and the cta resolves tint's link steps; no value leaks from ink. The component receives no `surface` prop and never sets the panel ground.

## 7 · Geometry & spacing

### (a) Distances — gap-scale roles

- Card-to-card seam, vertical grid: parent `Layout colGap="gutter" rowGap="gutter"`; no BlockCard
  node carries outer spacing. With the edge gone this gutter is the entire boundary between two
  cards, which is why it is required rather than conventional.
- Card-to-card seam, horizontal stack: parent `Layout rowGap="section"`, and no separator rule. A
  rule between rows would be `ListCard`'s finish on `BlockCard`'s object, and the borderless grid's
  reasoning applies unchanged on the block axis: distance separates, lines decorate.
- **Frame-to-content inset: none.** `--gap-block` on all logical sides used to be the object's
  inner edge-to-content relationship. There is no edge for it to be a relationship with, and
  keeping it would put neighbouring cards' images 32px apart while their titles sat 80px apart, with
  copy no longer aligned to the crop above it. Copy is flush to the media.
- Image to copy: `Layout rowGap="block"` on the frame's own stack. This is the same 24px that used
  to be the content block's block-start padding, restated as what it actually is — a distance
  between two boxes, which belongs to their container.
- Icon media to copy: `Layout rowGap="block"` inside the content stack.
- Eyebrow to title, and title to body: one nested `Layout rowGap="tight"`. All three copy parts are
  one tight group; the eyebrow is a label on the title, not a third block.
- Copy to cta: `Layout rowGap="block"`.
- Cta label to glyph: `--btn-gap-bare`, inside `Button`. The card states no distance here, and that
  is the point of using the primitive: a `Cluster colGap="tight"` around a hand-built label and
  glyph would be this component's second opinion about a seam `Button` already owns.
- Cta placement: inline start, aligned with the copy above it, which is where a `.link` Button's
  own zeroed `padding-inline` puts it. The shipped bare arrow sat at `Cluster justify="end"`, which
  is right for a lone glyph and wrong for a labelled control: a cta that starts where every other
  line starts reads as the end of the copy rather than as something floating.
- Media-to-copy seam, horizontal: `Layout columns={[1, 1]} colGap="column" rowGap="block"`. Two
  halves that must read as separate take the 64px column step. The rowGap is stated because
  `columns={[1, 1]}` collapses to one track below `md` and Layout defaults neither axis — see
  section 9.

### (b) Component sizes

- `md` card: the only size. It has no fixed inline or block size and fills the track and equal row
  its parent `Layout` provides.
- Four-card track: 286px at the 1240px Section content cap after three 32px gutter relationships.
  This is the smallest intended four-across desktop track and is the measurement for the content
  inset and type choice.
- Image media, vertical: `--bcrd-media-ratio-vertical` is 3:2. It is a recognisable landscape crop
  at a 286px track, matches the shipped ListCard media precedent, and avoids an image-dominated
  card.
- Image media, horizontal: `--bcrd-media-ratio-horizontal` is 4:3. The media owns half the card's
  inline size there — 588px at the 1240px cap after the 64px column gap — where a 3:2 crop is 392px
  tall against a copy column that routinely runs taller, leaving the row visibly bottom-heavy on the
  media side. 4:3 is 441px and matches. Both ratios are named; neither is the other's fallback.
- Native image metadata: 480 × 320 intrinsic dimensions matching the
  same 3:2 ratio; the rendered image always fills the available inline size.
- Icon media: `Icon size="xl"`, resolving to `--icon-size-24`.
- Cta glyph: sized by `Button`, from `--btn-icon-size-md`. The `Icon` is passed with no `size`
  because `Button` overrides one that is given — that is its documented behaviour, not an accident
  of specificity. The label is `--btn-text-md`.
- Linked target: the entire frame. Even the smallest title-only case exceeds 44px through one h4
  line plus the cta row; no hit extension is needed. The removed inset does not change this — it
  was never what carried the card past the floor.

### (c) Optical corrections

None. The component does not reach into `--space-*`. Every seam uses the gap scale, glyphs use
`Icon`, the images use the two component ratios, and focus geometry uses system tokens.

Radius is `--radius-0` and there is no border to round: an editorial object is not a control shell.
No border width is named anywhere in the component — `--bcrd-edge-width` and
`--bcrd-edge-width-pressed` were deleted rather than set to zero, because a width nothing draws is
an invitation to draw it again. There is no elevation (`--shadow-none`), and the card stays at
`--z-base`. The focus ring uses `--focus-ring-width` and `--focus-ring-offset` and is the card's
only drawn line, on keyboard focus only.

## 8 · Typography

| Part             | Type role        | Tracking                                   | Measure           |
| ---------------- | ---------------- | ------------------------------------------ | ----------------- |
| `title`          | `--text-h4`      | `--text-h4-tracking`                       | `--measure-title` |
| `body`           | `--text-body`    | none — this role has no tracking companion | `--measure-body`  |
| `eyebrow`        | `--text-eyebrow` | `--text-eyebrow-tracking`                  | none              |
| `cta`            | `Button`'s own   | `Button`'s own                             | none              |
| Icon/image media | none             | none                                       | none              |

The component aliases its three roles through `--bcrd-title-text`, `--bcrd-title-tracking`,
`--bcrd-body-text`, `--bcrd-eyebrow-text` and `--bcrd-eyebrow-tracking`. It declares nothing for the
cta: `--bcrd-cta-text` and `--bcrd-cta-tracking` were deleted along with the bespoke cue, because
`Button` reads `--btn-text-md` and `--btn-text-tracking` and a card-side alias could only disagree
with it. `titleAs` changes the heading level, never the visual role. H4 scale is
deliberate at a 286px four-card track: it gives a text-only card enough weight to remain an object
without relying on a fill, and it is what keeps the horizontal orientation from reading as a
`ListCard` row.

Title and body render verbatim in sentence case with no text transform. Examples: “When this is
useful” and “Map the decision, evidence and owner before work begins.”

The eyebrow is the one uppercased part the card draws itself, and the transform belongs to the ROLE
rather than to the component: mono is always uppercase system-wide, so the rule reads
`text-transform: var(--text-mono-case)`, exactly as `SiteFooter`'s `.label` and `SiteNav`'s
`.blockLabel` do (`tokens/primitives.css` § Type · case). The caller passes ordinary capitalisation — “Case study”, not “CASE STUDY”
— so the string stays readable in a CMS field and the rendering stays one decision.

The cta is **uppercased by `Button`**, not by this component and not by the caller. Every control on
the site is uppercase mono, so a cta that were sentence-case would read as a sentence rather than as
the control it now literally is. Pass `ctaLabel` in ordinary capitalisation — “Read the ConnectX
case” — and let the stylesheet do the transform, exactly as `Button`'s own spec requires of every
other call site. This is a visible change from the Cards 1a redline, which drew the cue at
`--text-ui` in sentence case; using the real control means taking the real control's type.

## 9 · Responsive

A vertical BlockCard has no internal arrangement breakpoint. At 1023 and 767 the title/body roles
resolve their shared type-layer values, while media remains above copy and all gap roles remain
unchanged.

A horizontal BlockCard has exactly one, and it is `Layout`'s own: `columns={[1, 1]}` applies from
`md` up and collapses to a single track below 768, so the card becomes a vertical stack on a phone.
That is the correct behaviour and not a special case — two 50% columns at 375px would give the media
and the copy about 156px each. Two consequences are worth stating:

- The collapsed card uses the stack's `rowGap="block"` in place of the 64px column gap. Both axes
  are stated on that `Layout` for exactly this reason.
- `imageSide` describes nothing below the boundary, because there are no sides. DOM order decides,
  so an `imageSide="right"` card reads copy-then-image when collapsed. That is deliberate: the
  alternative is a CSS `order`, which would be arrangement written by hand, and reversing the
  reading order to preserve a visual convention that no longer applies is the worse trade. The media
  ratio stays at 4:3 when collapsed — it belongs to the orientation, not to the width.

The parent `Layout`, not the card, owns reflow:

- Two-card clusters: `columns={{ base: 1, md: 2 }}`.
- Three-card clusters: `columns={{ base: 1, md: 2, lg: 3 }}`.
- Four-card clusters: `columns={{ base: 1, md: 2, xl: 4 }}`. They read 2×2 from 768 through 1439
  and become one deliberate four-card row at the existing `Layout` xl boundary of 1440.
- Five-to-eight-card clusters choose three or four at `xl` from their content grouping; BlockCard
  has no count detection and no orphan rule.
- Horizontal stacks: `Layout as="ul" rowGap="section"` with no `columns` and no `equalRows`. A
  single-track stack has no peers to match, and the rows are separated by 96px of distance and
  nothing else.

At 767 every grid collapses to one track. A vertical card's image remains 3:2 and full width;
eyebrow, title and body wrap without clamps; the cta stays at inline start with its arrow attached.
At a 192px stress track the copy has the full 192px now that the insets are gone, and it wraps
rather than widening the parent — the cta label absorbs the shrink because `Icon` is `flex: none`.

The gap scale does not shift responsively. No component media query changes a gap, a type role or
an image ratio, and there is no edge width left to change. The one breakpoint in play is `Layout`'s
own track collapse, which changes the arrangement rather than any distance — exactly the distinction
the token rules draw. The whole linked frame is the touch target and naturally clears 44px, so no
size step or extended hit area is needed.

## 10 · Composition

The future `ContentSection` receives the grid as its child. The outer `Layout` owns column count,
gutter and equal rows. The frame's `Layout` is the arrangement that differs between the two
orientations; everything below it is identical.

The vertical grid tile:

```jsx
<Layout as="ul" columns={{ base: 1, md: 2, xl: 4 }} colGap="gutter" rowGap="gutter" equalRows>
  <li>
    <Frame as={href ? 'a' : 'div'} data-btn-link-group={href ? true : undefined}>
      <Layout rowGap="block">
        {image}
        <Layout rowGap="block">
          {icon}
          <Layout rowGap="tight">
            {eyebrow}
            {title}
            {body}
          </Layout>
          {href ? (
            <Button as="span" emphasis="link" tone="primary" icon={<Icon name="arrow-right" />}>
              {ctaLabel}
            </Button>
          ) : null}
        </Layout>
      </Layout>
    </Frame>
  </li>
</Layout>
```

The frame's `rowGap` was `"none"` when the image shared an edge with an inset content block. It is
`"block"` now: the copy is flush to the crop, so this gap IS the image-to-copy relationship rather
than a statement that the two touch.

The horizontal stack, with the caller alternating the side:

```jsx
<Layout as="ul" rowGap="section">
  {items.map((item, index) => (
    <BlockCard
      key={item.href}
      orientation="horizontal"
      imageSide={index % 2 === 0 ? 'left' : 'right'}
      {...item}
    />
  ))}
</Layout>
```

which renders, inside the frame:

```jsx
<Layout columns={[1, 1]} colGap="column" rowGap="block" align="center">
  {imageSide === 'right' ? [content, image] : [image, content]}
</Layout>
```

`Frame` names the conditional native `a` or `div`; it is not a new primitive. The frame and root
receive only local sizing so they fill the equal grid row.

`Button` **is** used, and this reverses what this section said when the card shipped: “Button is not
used because the anchor already owns the whole card and a nested control would create a second focus
target.” The premise was right and the conclusion did not follow. What creates a second focus target
is an interactive *element*, not the `Button` component — so `as="span"` keeps one anchor and one
focus stop while still getting the system's link treatment. The alternative, which is what shipped
first, was to re-draw that treatment by hand in a pattern stylesheet.

`Prose` is not used because one plain paragraph is not a rich-text flow.

There is no hand-rolled grid or flex, no margin on a child, and no override of Section's ground,
gutter or content column. Track count, `equalRows`, the stack's `rowGap` and the alternation of
`imageSide` all stay at the call site because they describe relationships between cards, not one
card.

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

- The cta's unlabelled `Icon` emits `aria-hidden="true"`; its label is real text and is read.
- The cta `Button` renders `as="span"`, so `Button` emits no `type` and no `tabIndex` for it. It is
  not focusable, not a control to assistive technology, and adds no second name to the anchor.
- Icon media is decorative because the title names the same subject; its unlabelled `Icon` is
  hidden from assistive technology.
- Image alternative text comes from required `media.alt`. `alt=""` is allowed only when title and
  body already communicate everything the image adds.
- No `role`, `aria-current`, `aria-disabled`, `aria-expanded`, `aria-controls`,
  `aria-describedby` or busy attribute is emitted.

No ids are generated and there are no id references. Consequently there is no absent target for
`aria-controls` to name.

Keyboard focus uses `:focus-visible` only. It shows the hover cta ink plus a `--focus-ring-width`
ring separated by `--focus-ring-offset` in the nearest surface's gap colour. The ring-to-gap ratios
are 6.17:1, 5.51:1, 7.32:1 and 6.23:1. All text and the cta glyph meet 4.5:1 in every live state,
the eyebrow included at its 4.92:1 and 4.91:1 floors.

The ring is what keeps keyboard focus off colour alone, and it is not optional on any surface: it is
measured against its own gap on all four. Hover is not colour-only either, because the cta `Button`
wipes its underline in — see section 5. Reduced motion is answered inside `Button`, which shortens
that wipe to `--duration-instant` and keeps the underline itself; this component adds no transform
of its own and therefore no media query.

A screen reader encounters a static card as: “List, four items. When this is useful, heading level 3.
Use this approach when several teams must make the same decision.” It encounters a linked card with
an eyebrow and a cta as: “Case study, Relevant work, heading level 3. See how the service was
redesigned. Read more, link.” It does not announce the decorative subject icon or the arrow glyph.

Two notes on that reading. The eyebrow is real text and is announced, which is correct — “Case
study” is information a sighted reader gets from the same line. The cta label joins the anchor's
accessible name, which is why the default is “Read more” and not a bare “More”: the name is the
whole card's text, so the label's job is to end it with an unambiguous action rather than to carry
the destination by itself. A caller-supplied `ctaLabel` that names the destination —
“Read the ConnectX case” — makes that name better, not worse, which is the argument for the prop.

The uppercase is a stylesheet transform, not authored copy, so the accessible name is announced in
the capitalisation the caller passed. That is the reason `Button` has always uppercased in CSS
rather than asking call sites to shout, and it is why the cta being a real `Button` costs nothing
here.

## 12 · Content edge cases

| Case                                      | Required handling                                                                                                                                                                                                                                                          |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Longest realistic string                  | Title and body wrap without clamp or truncation. Their measures cap line length; the card grows, while parent `equalRows` keeps its grid peers aligned. Test an 80-character title and 240-character body.                                                                 |
| One long unbroken token (a URL)           | Title and body break anywhere before overflow. Media, edge and cue remain in their own boxes.                                                                                                                                                                              |
| Zero items                                | The caller omits the parent grid; do not render an empty `ul`. `BlockCard` itself is not called.                                                                                                                                                                           |
| One item                                  | Render one `li`. A card with no sibling has no gutter to be bounded by and that is acceptable: it is bounded by the section's own rhythm. The parent chooses an appropriate track rather than stretching through a card prop.                                              |
| Many items (2× expected)                  | Render 16 cards through the caller's normal responsive `Layout`; no pagination, clamping, count detection or internal grid logic.                                                                                                                                          |
| Missing image or missing optional slot    | Omitting `media` removes its element and seam. Under accepted question 1(a), a blank runtime image `src` is treated as no media and warns in development; the title/body card remains complete and no placeholder ships. Omitting `eyebrow` removes it and its seam the same way.                                                   |
| `orientation="horizontal"` with no image  | Fall back to the single-column stack. The row's second track needs a picture to fill it: an icon is a 24px mark that heads the copy stack in either orientation, and absent media leaves nothing at all, so a row would render with an empty half. A blank image `src` takes the same path for the same reason. This is a fallback, not a warning — the caller asked for an arrangement the content cannot support, and the stack is the honest answer. |
| Empty required-ish text                   | A whitespace-only title renders nothing and warns in development. A blank body omits the paragraph and warns but keeps the titled card. A blank `eyebrow` omits the label and warns. A blank `href` is absent, so no anchor, cta, `data-btn-link-group` or interactive states render. A blank `ctaLabel` falls back to “Read more” and warns, because a link `Button` with no label is a bare glyph. |
| Narrow track at 767                       | Parent grid is one track. Image remains above copy, text wraps without changing its gap or type role, and a horizontal card collapses to the same stack.                                                                                                                   |
| Parent that does not size it              | Root and frame fill one available line in a wrapping parent through full inline size and `min-inline-size: 0`. There is deliberately no component minimum: below the 192px named stress track, the image shrinks and text wraps rather than forcing page overflow. The cta is a `Button`, which is `white-space: nowrap` by design, so a long `ctaLabel` in a very narrow track is the caller's copy decision — the specimen renders that case rather than hiding it. |
| Logical properties rather than left/right | Every distance is a logical `Layout`/`Cluster` seam and the cta sits at inline start. `imageSide` is the one physically-named prop in the component and it is honest about it: `'left'` means the media takes the first track, which in RTL is the inline start. The current site is LTR; an RTL composition must swap the directional cta glyph to the existing `arrow-left` at the composition boundary. |
| Surface nested inside a different one     | The nearest `data-surface` block redeclares all nine colour tokens, the eyebrow included. A tint card inside an ink band uses the complete tint column.                                                                                                                    |
| Two components adjacent                   | The `Layout` gutter is the entire boundary, so it is required rather than conventional. At the 32px gutter the two read as separate objects with no line between them. In a zero-gap stress harness they run together, and that is the honest result of a borderless finish rather than a defect to patch: no sibling selector, and no card-owned edge, exists to separate them. Stacked horizontal cards take `rowGap="section"` and likewise no rule. |
| Interactive content inside a slot         | Rejected. Title, body, eyebrow and `ctaLabel` are strings, icon media is inert and image media exposes only `src`/`alt`. The whole-card anchor is the only possible focus target: the cta is a `Button` rendered `as="span"`, so it is a label rather than a control, and there is no `as` escape hatch on the card to make it anything else. Rich text with an inline link must use `Prose` outside BlockCard rather than nesting anchors. |

## 13 · Motion

**This component animates nothing, and it is not motionless.** Both halves matter.

`BlockCard`'s own stylesheet has no `transition` and no `transform`. `--bcrd-transition-duration` and
`--bcrd-transition-easing` were deleted with the bespoke cue: nothing here changes colour and nothing
here moves. The block-end edge overlay — the wipe that followed the `Button`, `Breadcrumbs` and
`ListCard` precedent — is gone with the edge it wiped.

The one animation a linked card shows is the cta's underline, and it belongs to `Button`: drawn as a
rule rather than `text-decoration` so it can wipe in from the label's inline start, on
`--btn-transition-duration` and `--btn-transition-easing`. `BlockCard` triggers it by carrying
`data-btn-link-group` and nothing else.

That is also where it is answered for. `Button`'s stylesheet already shortens the wipe to
`--duration-instant` under `prefers-reduced-motion`, and the group-driven rules move the same
pseudo-element, so the preference reaches them without a second media query. Consequently there is
**no `prefers-reduced-motion` block in this component**, and the reason is now ownership rather than
absence: the motion is real, and it is not this component's to shorten. A future edit that adds a
transform *here* must add the media query in the same change.

## 14 · Do's and Don'ts

**Do**

1. Put every group in `Layout as="ul"` with explicit columns, `colGap="gutter"`,
   `rowGap="gutter"` and `equalRows`; inspect the call-site tree and computed tracks.
2. Render four cards as two columns from `md` and four only from `xl`; inspect 1023, 1439 and 1440
   to prove the fourth never becomes a three-column orphan.
3. Render image media above the title at 3:2 in a vertical card and beside it at 4:3 in a
   horizontal one; compare the two wrappers' computed `aspect-ratio` and DOM order.
4. Render the cta exactly when a non-blank `href` produces one whole-card anchor; count anchors and
   ctas and expect equal totals, and count nested anchors and buttons and expect none.
   `data-btn-link-group` must appear on exactly the frames that are anchors.
5. Show a static no-media card as a complete object with no blank action row; inspect its content
   box beside a linked peer and expect no border on either.
6. Render identical markup on all four surface bands and inspect all six resolved `--bcrd-*`
   colours plus the cta's three `--btn-link-primary-fg*` steps, including the two nested-surface
   proofs.
7. Use `titleAs` to match the page outline while preserving h4 visual type; compare the heading map
   with the computed type token.
8. Prove the title's ink does not depend on `href`: render the same card linked and static side by
   side and expect both computed title colours to be `--bcrd-title-ink`.
9. Alternate `imageSide` from the call site by index; inspect the rendered tree and expect no
   index, count or sibling knowledge inside any card.
10. Point anywhere on a linked card and expect the cta's underline to wipe in and its label to step
    colour; point at a static card and expect nothing to move. This is the group contract working,
    and it is the one interaction the specimen cannot render statically.

**Don't**

11. Do not add a fill or ground token; search the component layer for `bg`, `ground` and fill
    declarations and expect none outside image/SVG content.
12. Do not bring the edge back, in any form: no `border`, no `outline` outside `:focus-visible`, no
    `box-shadow` beyond the ring, no `--bcrd-edge-*` token, and no hairline drawn as a pseudo-element.
    Search the module for `border` and expect only `border-radius`. A card that needs a visible
    boundary is asking for the gutter it was given.
13. Do not give the title a link ink, or make any part but the cta change on hover or press;
    inspect computed styles in every state and expect only the cta to move. There is no
    `--bcrd-link-ink` to reach for any more, and re-adding one is the smell.
14. Do not restyle the cta from this component: no `.cta` class, no colour, type, case, seam, glyph
    size or underline of its own, and no `--btn-*` name in this module. Search the module for `cta`
    and `--btn-` and expect nothing. If the cta looks wrong, that is a conversation about `Button`.
15. Do not render the cta as anything interactive — no `as="a"`, no `as="button"`, no `href` on it.
    Tab through a card grid and expect exactly one stop per linked card.
16. Do not put title text over an image; inspect the DOM and expect image before a separate content
    block, never an overlay.
17. Do not import `ListCard`, another pattern, or `@/content`; lint and the tier-boundary grep must
    remain green. `Button`, `Layout` and `Icon` are Tier 1 and importing them downward is the point
    of the tier order — the sideways ban is what this rule is about.
18. Do not add margin, a content inset or hand-written grid/flex arrangement; search the module and
    expect no child margin, no `padding` on the content block and no display mode used to arrange
    siblings.
19. Do not add `surface`, `size`, `finish`, `bordered`, `columns`, `equalHeight`, `cue`, `imageRatio`,
    `children`, `className` or `style` to the public props; type-checking attempted calls must fail.
20. Do not clamp titles/bodies/eyebrows or hide cards after eight; the 16-card specimen exposes
    every row.
21. Do not place a link, Button or control in body/media; inspect the rendered tab order and expect
    one focus stop per linked card and none per static card.
22. Do not put a separator rule between stacked horizontal cards, and do not alternate `imageSide`
    inside the component; inspect the stack for borders and the card for index awareness.

## 15 · Specimen plan — `/design/block-card`

The exact block list, in order:

1. **Identity and finish.** One static no-media card beside one linked card, annotated for no
   border on any side in any state, copy flush to the media, and the boundary from ListCard. Then a
   paired proof of the redesign's central claim: the same card linked and static side by side, with
   the instruction to compare both computed title colours and find `--bcrd-title-ink` in both.
2. **Eyebrow ladder.** Four cards showing the four kinds of string the corpus actually uses — a
   client, a content type, a kicker, and omitted — followed by an eyebrow without media and a long
   eyebrow that must wrap.
3. **The cta.** Default label, caller-named label and a static card with no cta, annotated that
   this is the shipped link `Button` rendered `as="span"` and that Tab finds one stop per card. Then
   the two degenerate inputs: a blank `ctaLabel` falling back with a warning, and a long label in a
   192px track, which is where `Button`'s `nowrap` makes long copy the caller's decision.
4. **Orientation.** `imageSide="left"` and `"right"` as a stacked pair with the DOM-order note; a
   three-card alternating stack at `rowGap="section"` with no rule between rows; both no-image
   fallbacks; and a 3:2-against-4:3 ratio comparison.
5. **Grid-count ladder.** Real 2-, 3- and 4-card groups. Two uses `md:2`; three uses `md:2, lg:3`;
   four uses `md:2, xl:4`. All use gutter on both axes and `equalRows`.
6. **Media fill ladder.** Three otherwise identical cards: icon, image and omitted media. Label
   them as fills of one slot, not variants.
7. **Static majority and linked minority.** Eight cards with exactly two linked. Static cards must
   look complete; linked cards add the cta and whole-card anchor without changing height logic.
8. **States.** One linked card at rest plus a four-row reference for rest, hover, focus and pressed.
   Annotate that the cta is the only part that moves, that pointing anywhere on the card drives it
   through `data-btn-link-group`, and that the underline — not colour — is what carries hover.
9. **All four surfaces as sibling bands with identical markup.** Each band contains one static icon
   card, one static no-media card and one linked image card, at least one carrying an eyebrow. Print
   the matching section 6 paragraph beside each band. The linked card's cta is a `Button`, so each
   band also proves that `Button` resolves the band's surface without being told.
10. **Nested surfaces.** Tint inside ink and ink inside paper, each with identical three-card markup
    and the resolved colour tokens listed beside it — the card's six plus the cta's three `--btn-*`
    steps, which is the proof that the nested `Button` reads the inner surface too.
11. **Equal-height challenge.** Four cards in one row: one-line, two-line and five-line titles plus a
    longer body. Print the root/frame heights to prove the parent `equalRows` contract.
12. **Every section 12 edge case.** Labelled blocks for long title/body; unbroken URL; zero items
    with visible empty harness; one item; 16 items; omitted media and blank image source; blank
    title/body/eyebrow/href/ctaLabel; the 767 track including a collapsing horizontal card; unsized
    wrapping parent; logical placement; nested surface; zero-gap adjacent cards; rejected interactive
    slot as a contract note.
13. **Four-card breakpoint proof.** The same four cards at exact 1439 and 1440 instructions: 2×2
    below `xl`, one row at `xl`; the static page note gives manual viewport steps.
14. **Narrow tracks.** The same icon, image and no-media cards at 256px and 192px. No overflow, title
    overlay or cta collision is allowed.
15. **Heading map.** The same card as `h3` and `h4`; computed h4 visual type remains identical.
16. **Two adjacent.** Two zero-gap cards show that a borderless finish has nothing to separate it,
    followed by the same pair at the required gutter — the point being that the gutter is the
    boundary rather than a space beside one.
17. **What a static page cannot force.** A final note names pointer-down, keyboard focus and the
    exact 767/1439/1440 boundaries. Reduced motion is explicitly struck off with its reason.

The squint test reads as six shapes: an identity pair, a mono-label ladder, a cta row, a
full-width alternating stack, three progressively denser grid bands, and four surface bands with two
narrow stress rails. The alternating horizontal stack is what stops the page being a column of
identical rectangles, and it is the arrangement variety the borderless finish makes necessary — with
no edges to count, the composition has to carry the rhythm.

## 16 · New token requests

**One — `--bcrd-eyebrow-ink`.**

| Token                | paper                 | tint                  | ink                   | blue                    |
| -------------------- | --------------------- | --------------------- | --------------------- | ----------------------- |
| `--bcrd-eyebrow-ink` | `--color-neutral-600` | `--color-neutral-700` | `--color-neutral-400` | `--color-brandeis-100` |

It is a component-layer alias, not a new colour: the four values are the quiet-label ramp already
declared by `--crumb-collapse-ink` in `breadcrumbs.css` and `--foot-label-ink` in `footer.css`, at
the same steps and for the same reason. A third consumer of a settled ramp gets its own name because
colour has no usage layer by design — what a colour means depends on the surface, so the component
owns it. The measured ratios are 4.92:1, 7.27:1, 8.05:1 and 4.91:1; paper and blue sit at the AA
floor and must not be lightened.

The rest of the `--bcrd-*` set remains the component layer this spec declares rather than a request.
The new type aliases `--bcrd-eyebrow-text` and `--bcrd-eyebrow-tracking` resolve to the existing
`--text-eyebrow` composite.

The redesign **removes eight tokens**, and it is worth reading them as two groups:

- With the edge: `--bcrd-edge-ink`, `--bcrd-edge-width`, `--bcrd-edge-width-pressed`.
- With the bespoke cue, once the cta became a link `Button`: `--bcrd-link-ink`,
  `--bcrd-link-ink-hover`, `--bcrd-link-ink-pressed`, `--bcrd-cta-text`, `--bcrd-cta-tracking`, and
  the two transition aliases `--bcrd-transition-duration` and `--bcrd-transition-easing` — nothing
  in the component changes colour or moves any more. Each of those was a card-side answer to a
  question `button.css` already answers, and keeping any of them would have let the two drift.

It also **renames** `--bcrd-media-ratio` to `--bcrd-media-ratio-vertical` alongside the new
`--bcrd-media-ratio-horizontal`, because neither ratio is the other's default.

`BlockCard` names no `--btn-*` token anywhere, in this document or in its stylesheet. The cta's
values reach it through `Button`, keyed on the `data-btn-link-group` attribute on the frame — an
attribute rather than a shared custom property precisely so that the rule "a component never reads
another component's tokens" holds without an exception carved for this case.

`docs/vocabulary.md` names tokens by value and is regenerated from the token layer, so this change
requires `npm run vocabulary` and a push of that file to the Claude Design project. A renamed token
that is not pushed is a name a designer cannot see.

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

**2 · What makes the card bounded — SUPERSEDED by question 7, 25 Aug 2026.** The original options
were a four-sided edge, a neutral fill, or fill on light surfaces and edge on dark. The draft
decision was one four-sided edge on every surface. The fill half of that reasoning still holds and
is restated in section 4; the edge half was overturned. A fourth option nobody listed — **no
boundary of its own, bounded by the parent gutter** — is what shipped.

**3 · Cue and link target — ANSWERED, and extended by question 8.** Options: a title-only text link;
a separate Button; or one whole-card native anchor with an arrow mark. **Answered: one whole-card
anchor.** It gives one honest target and one focus stop. Title/body strings prohibit the nested body
link that this choice would otherwise make invalid. The arrow mark has since become a labelled cta,
which is a change to what the cue says rather than to this decision: it is still one anchor and one
focus stop, and the cta is a `span` inside it.

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

**7 · Card boundary — ANSWERED, 25 Aug 2026 (Cards 1a).** Options: keep the four-sided hairline; keep
it on some surfaces; or remove it entirely. **Answered: remove it entirely, on every surface and in
every state.** Two reference decks set the direction and the shipped card read as a boxed form
rather than an editorial object. The 32px grid gutter and 96px stack rhythm are enough separation
without a line. This forced two consequences that were not separately negotiable: the inner
`--gap-block` inset went with the edge it held copy off (section 7a), and the hover/pressed
edge-wipe went with the edge it wiped (section 13). `--bcrd-edge-*` was deleted rather than zeroed.

**8 · Where the link colour lives — ANSWERED, 25 Aug 2026 (Cards 1a).** Options: keep the title
switching to link ink when the card navigates; keep the bare arrow only; or move the link colour to a
small labelled cue. **Answered: a labelled cta, and the title always dark.** A grid of linked cards
with blue headings reads as a list of links rather than a set of objects, and the title is the one
part whose colour should not depend on whether a destination happens to exist. `--bcrd-link-ink` and
its two states did not change value; they changed wearer. The same fix applies to `ListCard` and is
recorded there.

**9 · Cta wording — ANSWERED, 25 Aug 2026 (Cards 1a).** Options: a fixed generic label; an optional
label defaulting to the generic one; or a required label per card. The reference decks showed both a
dynamic form (“Read the ConnectX case”) and the generic one. **Answered: `ctaLabel?: string`,
defaulting to “Read more”.** Required would force copy onto callers that do not have it and would
make the prop a compile error on 348 static-turned-linked cards; fixed would refuse a page that can
name its destination, which section 11 argues improves the anchor's accessible name. The default
keeps the common case free.

**10 · Horizontal orientation and the media side — ANSWERED, 25 Aug 2026 (Cards 1a).** Options for
the side: no default and required whenever horizontal; or default `'left'`. **Answered: default
`'left'`.** A horizontal card is then one prop rather than two, and alternation stays an explicit
call-site decision either way. Alternation itself is not a card prop and was not considered as one —
it is a sibling relationship, like `equalRows`. No featured or hero size ships alongside the
orientation; that was ruled out of scope.

**11 · Horizontal with no image — ANSWERED, 25 Aug 2026 (Cards 1a).** Not raised in the handoff and
decided during implementation. Options: centre an icon in the media track; render the row with an
empty half; or fall back to the vertical stack. **Answered: fall back to the stack.** A 24px glyph
in a 588px track is not a media column, and an empty half is a defect. Recorded in section 12 and
proved in the specimen; flagged to the owner as an inference rather than a handed-down decision.

**12 · What draws the cta — ANSWERED, 25 Aug 2026 (Cards 1a, second pass).** Options: a bespoke cue
built from `Cluster` and `Icon` in the card's own stylesheet; or the shipped link `Button`.
**Answered: the link `Button`, rendered `as="span"`, with the card's states driven into it through
`data-btn-link-group`.** The first pass built the cue by hand and re-declared five things `Button`
already owns — type, case, the label-to-glyph seam, the glyph size and three colour steps per
surface — which is exactly the duplication the tier order exists to prevent, and it also lost the
underline wipe, leaving hover colour-only. Using the primitive returns all six and deletes seven
card-side tokens.

Two sub-decisions were forced and are recorded because neither is obvious:

- **The element must be a span.** This section's own question 3 answered "one whole-card anchor",
  and section 10 originally concluded "Button is not used" from it. That inference was wrong: what
  makes a second focus stop is an interactive element, not the component. `as="span"` keeps one
  anchor and one focus stop and still gets `.link` and `.live`.
- **The hover had to be plumbed, and it is plumbed with an attribute.** A span is never itself
  hovered, so without a contract the cta would sit at rest forever. The rejected alternative was for
  `Button` to expose a custom property the card sets; that would put `--btn-*` in a pattern's
  stylesheet and break the no-cross-component-tokens rule. An attribute selector is global where a
  CSS Module class is hashed, so it is the only name both stylesheets can spell, and the contract
  stays declared in `Button` where its values live.

The visible cost is that the cta is uppercase mono rather than the redline's sentence-case
`--text-ui`. That is what taking the real control means, and it is flagged rather than smoothed over.

## Appendix — self-audit

```
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states Tier 2 pattern, Status implemented, token prefix --bcrd-*, and the Cards 1a
    revision date; the prefix has no repository collision.
[x] Every Anatomy part appears in colour, geometry, or is explicitly marked as carrying no value.
    The removed `edge` part is named as removed rather than deleted silently.

NAMES
[x] The component layer DECLARES 17 --bcrd-* tokens. The document names 26, because it names the
    nine removed ones as removed rather than deleting the record of them; section 16 lists both
    groups. Every declared name appears verbatim in docs/vocabulary.md AFTER regeneration, so the
    vocabulary must be regenerated and pushed — section 16 says so.
[x] Eleven --btn-* names appear, all in prose explaining what Button supplies. NONE appears in this
    component's stylesheet or token layer: the cta is wired with the data-btn-link-group attribute,
    not by reading Button's tokens.
[x] Named glyphs are existing: arrow-right, arrow-left, and the IconName union's 17 glyphs.
[x] Section, Layout and Button props/values are existing unions: as, rowGap, colGap, columns,
    equalRows, align, emphasis, tone, icon; tight, block, gutter, column, section, center; base, md,
    lg, xl; ul, li, span; link, primary. Cluster is no longer used — Button owns the one inline row
    this component used to build.
[x] Zero hex codes, rgb(), hsl(), Tailwind names, CSS rule blocks or media-query blocks.
[x] Tracking companions are used only where the role has one — h4 and eyebrow; body correctly names
    none, and the cta's belongs to Button.
[x] Every layout distance is a gap-scale role.
[x] Space-ramp reaches: 0.
[x] Literal pixel count: every occurrence is a component size, touch floor or Section/container
    measurement argued in section 7. The two new ones — 588 and 441 — are the derived horizontal
    media column width and its 4:3 height, shown as the arithmetic behind the ratio choice.

COLOUR AND CONTRAST
[x] Colour table has 6 rows × 4 full cells; no delta and no blank. The edge row was removed, the
    eyebrow row added, and the three link rows moved to Button — section 6 states the count and
    why.
[x] Every text/glyph cell has a measured ratio of at least 4.5:1, the new eyebrow row included; its
    paper and blue cells sit at the 4.92:1/4.91:1 floor and are marked not to be lightened. The
    cta's three steps are measured in Button's spec, which is where they are declared.
[x] Focus ring is measured against its own gap on all four surfaces.
[x] No decorative-only colour remains: with the edge gone, every colour in the table is text, glyph
    or focus.
[x] One paragraph per surface explains the mapping; nested surfaces are specified.

STATES
[x] Every claimed state comes from the fixed model and uses its fixed suffix.
[x] Hover and pressed differ on all four surfaces through cta ink, and hover additionally draws
    Button's underline — so hover is NOT colour-only. Section 5 states this and records that it was
    colour-only in the redesign's first pass, before the cta became a real Button.
[x] Every state token moves on at least one surface and is declared in all four columns.
[x] Excluded states have no token. There is no disabled opacity.
[x] No token remains for anything the component no longer draws: --bcrd-edge-*, --bcrd-link-ink*,
    --bcrd-cta-* and --bcrd-transition-* are all deleted, not zeroed or left declared.

LAYOUT, TYPE, SEMANTICS
[x] Every arrangement belongs to Layout or Cluster; every columns declaration has colGap AND, where
    it can collapse to one track, rowGap.
[x] No child margin, and no child padding either — the content inset is gone and the image-to-copy
    distance is a container gap.
[x] No responsive gap or type-role swap. The one breakpoint in play is Layout's own track collapse,
    which changes arrangement rather than distance.
[x] Title and body name measures.
[x] Whole-card link clears the 44px touch floor through its natural frame.
[x] There are no ARIA idrefs and no upward-walking state selector.

COMPLETENESS
[x] All thirteen required content edge cases are answered.
[x] The unsized-parent row states that no hard component minimum exists and names the 192px stress
    track used to verify it.
[x] Do's and Don'ts name a rendered-tree, type-check, search or computed-style decision, and two of
    the Don'ts are searches for the specific regressions this redesign invites: `border` in the
    module, and `cta`/`--btn-` in the module.
[x] Specimen plan covers the one finish/size, both orientations and both image sides, all media
    fills, the eyebrow and cta ladders, four surfaces, manual states, nested surfaces, every edge
    case, equal rows, adjacent cards and narrow tracks.
[x] Section 16 states the one new token, its four surface values, its measured ratios and its
    precedent, and names the removals, the rename and the vocabulary push they require.
[x] Every open question has options, recommendation and blocking status. Questions 7–12 record the
    Cards 1a decisions; question 2 is marked superseded rather than edited to look prescient,
    question 11 is flagged as an implementation inference, and question 12 records that section 10's
    original "Button is not used" conclusion was wrong and why.
[x] Squint test: six shapes. The alternating horizontal stack is what carries the rhythm now that no
    card has an edge to count, so the page is not a column of identical rectangles.
[x] Nothing this component could get from a lower tier is re-declared here. That is the test the
    first pass failed and this one passes: the cta is Button's, and the module styles no part of it.
```
