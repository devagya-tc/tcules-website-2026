# BlockCard

## 0 · Front matter

|                     |                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Component**       | `BlockCard`                                                                                                            |
| **Tier**            | 2 pattern (`src/patterns/BlockCard/`)                                                                                  |
| **Status**          | implemented — 2.10 is shown, not merged, until the owner approves the text-only sets on screenshots (C2)                |
| **Token prefix**    | `--bcrd-*`                                                                                                             |
| **Designer / date** | Codex / 24 Aug 2026                                                                                                    |
| **Revised**         | Cards 1a redesign / 25 Aug 2026 — borderless finish, always-dark title, `eyebrow`, a read-more `cta`, horizontal orientation |
| **Revised**         | Phase 2 · 2.10 / 28 Sep 2026 — the image onto `Media`; cover media by family (C1); text-only sets by scale and position (C2); `BlockCardSet` and the featured first card (C3); the icon fill removed; `Layout lead` |
| **Revised**         | Case-study revision / 29 Sep 2026 — one hairline round every image kind (the crop box's, ch05 amendment 5a; `Media edge="placement"`); a subtle hover zoom as the only hover cue; the cta only on text-only linked cards; no title measure cap; `BlockCardSet` rows a `stack` apart; `/case-studies` onto the `CaseStudyIndex` template. See § Revision 3 |
| **Implements**      | `docs/briefs/12-block-card.md`                                                                                         |
| **Implemented at**  | `src/patterns/BlockCard/` (`BlockCard.tsx`, `BlockCardSet.tsx`) · `src/styles/tokens/components/block-card.css` · specimen `src/app/design/block-card/page.tsx` |
| **Rulings**         | `docs/phase-2-decisions.md` C1, C2, C3 (28 Sep 2026); Media M1–M4 and PageHero A3 by reference                          |

## 1 · Identity

`BlockCard` is one borderless card in a semantic grid: a required title and body, an optional
eyebrow label above the title, one optional cover image rendered through `Media`, and, only when
the card navigates, a read-more cta naming where it goes — the shipped link `Button`, not a cue of
the card's own. It arranges on either axis — media-above-copy in a grid track, or a row spanning
two tracks: media beside copy when it has a cover, head beside body when it does not. It is Tier 2
because it consumes a CMS-shaped record and composes `Layout`, `Media`, `Button` and `Icon`; a
primitive may do neither.

**Which cards carry an image is ruled (C1):** case studies, and every insight or resource with a
cover image — articles, videos, podcasts. Service, audit, glossary and capability cards are
media-less. That makes the text-only card the common case for most families, so it is designed
rather than tolerated (C2, section 4).

`BlockCardSet` ships beside it, in the same folder. A card does not know its siblings, so the rules
that depend on the count — the grid shape, the image `sizes`, and the featured first card from four
items (C3) — live in the set, which renders nothing but a `Layout` and `BlockCard`s. It is the
pattern's own set, not a second pattern.

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
| `media`   | no                | One card-owned ratio box holding a zoom span holding `Media` (`fit="fill"`, `edge="placement"`) | The box, its ratio (3:2 / 4:3), its hairline on every kind and the zoom. The file, `srcset`, panel and shadow are `Media`'s; never a second action |
| `content` | yes               | The stack containing the copy and optional cta                        | The block-axis relationships between its children. No inset       |
| `copy`    | yes               | The tight group containing `eyebrow`, `title` and `body`              | No colour or distance outside its `Layout`                        |
| `eyebrow` | no                | One `span` above the title; whitespace-only content emits no element  | Eyebrow ink and the eyebrow type role; the case comes from `--text-mono-case` |
| `title`   | yes               | An `h3` or `h4`, selected by `titleAs`                                | `--bcrd-title-ink`, linked or not, with no hover state; the h4 role in a tile, the h3 role in a row. No measure: the track is the measure |
| `body`    | yes in the API    | One paragraph; whitespace-only content emits no element               | Body ink and `--measure-body`                                     |
| `cta`     | linked cards without a cover | One link `Button` — `emphasis="link"`, `as="span"`, trailing `arrow-right` | Nothing. `Button` owns its type, case, seam, glyph size, colour and underline |

The title's ink does not depend on `href`. That is the redesign's central change: a linked card is
recognisable by a cta that names its destination, not by a blue heading, so `--bcrd-link-ink` is
worn by the cta alone and never by the title or the eyebrow.

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

There is no card `edge` part. The card is bounded by the parent `Layout`'s gutter alone, on every
surface and in every state. The one rule it draws is round the **image's crop box** (Revision 3).

The media slot has one fill: a cover image. Omitting it removes the element and its adjacent
`--gap-block` relationship. The image occupies the frame inline edge-to-edge with the copy flush
beneath it, inside a box whose ratio the card owns; `Media` covers that box from the centre and
draws the edge the image's `kind` calls for — a capture its hairline, a cut-out none (or its
contrast panel), an illustration never boxed. The card no longer decides what an image looks like,
only where it goes.

The icon fill was **removed** in 2.10 (section 17 Q14). It rendered a bare glyph in ink with no disc,
so it did not break ch04's "no glyphs in coloured discs"; it was removed because it has no family
left under C1 and no route used it.

## 3 · Props / API

The image member is accepted under question 1(a).

| Prop          | Exact type / literal union                                                        | Default      | What it decides                                                                   |
| ------------- | --------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------- |
| `title`       | `string`                                                                          | required     | The card's heading and primary accessible label                                   |
| `body`        | `string`                                                                          | required     | The one explanatory paragraph                                                     |
| `eyebrow`     | `string`                                                                          | absent       | One quiet label above the title; a blank value omits the element and warns        |
| `media`       | `{ type: 'image'; image: BlockCardImage }`                                        | absent       | The cover image. `BlockCardImage` is `Media`'s `MediaImage` with `width`/`height` optional (section 17 Q15) |
| `titleAs`     | `'h3' \| 'h4'`                                                                    | `'h3'`       | Heading semantics only; visual type remains fixed                                 |
| `href`        | `string`                                                                          | absent       | A non-blank destination makes the whole frame one anchor; with no cover it also emits the cta (Rev. 3) |
| `ctaLabel`    | `string`                                                                          | `Read more`  | The cta wording on a linked text-only card; ignored on a covered card, which renders no cta (Rev. 3); blank falls back to the default and warns. `Button` uppercases it, so pass ordinary capitalisation |
| `orientation` | `'vertical' \| 'horizontal'`                                                      | `'vertical'` | Which axis the card arranges on                                                   |
| `imageSide`   | `'left' \| 'right'`                                                               | `'left'`     | Which track the media takes when horizontal; ignored when vertical or imageless   |
| `tracks`      | `2 \| 3`                                                                          | `2`          | The widest track count of the card's set, which picks the image `sizes` (`CARD_TWO_TRACKS` / `CARD_THREE_TRACKS`); ignored when horizontal |

`orientation`, `imageSide` and `tracks` are presentation props: they describe the card's place
among its siblings, never the content, so none is ever a CMS field. `BlockCardSet` sets all three.

**`BlockCardSet`**

| Prop    | Exact type                                                                                    | Default  | What it decides |
| ------- | --------------------------------------------------------------------------------------------- | -------- | --------------- |
| `items` | `readonly BlockCardSetItem[]` — `Omit<BlockCardProps, 'orientation' \| 'imageSide' \| 'tracks'> & { id: string }` | required | The cards, in order. Zero renders nothing |

An item cannot carry the three presentation props, so no caller can contradict the set one item at
a time. `FEATURED_FROM` (4) is exported so a template or specimen can name the threshold rather than
restate it.

The media discriminant is `type`, not `kind`: the record carries its own `kind` (capture, cut-out,
illustration, photograph), and `media.kind === 'image'` beside `media.image.kind` read as one field
twice. This follows PageHero's A3 for one vocabulary across the patterns.

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
decorative-versus-informative decision explicitly; an illustration cover takes `alt=""` because the
card title names what it stands for (ch05 §9a). The card owns the ratio box and the blank-source
behaviour; `Media` owns the file, the `srcset`, the lazy loading and the edge.

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

1. A media slot cannot carry anything but a cover record; a React node, a glyph or a crop override
   does not compile.
2. An image without `src` or `alt` cannot compile.
3. A missing `title` or `body`, a third title element, children, a cue override or a nested action
   cannot compile.
4. There is no grid or equal-height prop, so an individual card cannot contradict its parent
   cluster.
5. A static card with a cta is unrepresentable. A linked card without one is the covered card, by rule (Rev. 3), not by the caller's choice.
6. A third orientation, a third image side, a third track count or a cta glyph override cannot
   compile.
7. A `BlockCardSet` item with `orientation`, `imageSide` or `tracks` cannot compile.

## 4 · Variants × sizes

One finish, one size, two orientations.

| Orientation  | `md` — the only size                                                                                                            | Intended use                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `vertical`   | No edge, no inset. Media above copy at 3:2, h4 visual title, optional eyebrow, optional cta. Fills one track of a parent grid   | Every card grid, 2–8 across the 78 clusters; content and grid density, not a prop, set its role  |
| `horizontal` | Two equal tracks from `md`, 64 apart, the title at the h3 role. With a cover: media at 4:3 beside the copy, centred against each other. Without one: the head (eyebrow, title) beside the body and cta, top-aligned. Fills a single track | The featured first card of a set of four or more (C3), and a stack of a few substantial items |

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

**The featured card (C3, 28 Sep 2026)** is not a size and not a variant: it is the horizontal
arrangement, given to the first item automatically when a set has four or more, spanning the row
above its peers. The earlier "no featured size" stands in that sense — no card is ever twice the
size of its neighbours by a prop — and the thing it said the composition could do is now what
`BlockCardSet` does. There is no CMS field: which item is featured is its position.

**A text-only set avoids reading as identical boxes through scale and position (C2).** No box, no
fill and no border are added — every one of those was rejected above and stays rejected. Weight
comes from type: the h4 title is the heaviest thing in a tile, the body is one tight paragraph in
the same copy group, and the whole card is the link, so the cta line closes each text-only object. Variety
comes from `Layout`: two tracks for two, three for three, and from four the featured row, which in a
text-only set is a head beside its body at the h3 role — a different shape from the tiles below it,
which is what breaks the "row of identical rectangles". The owner judges this on screenshots before
2.10 merges.

## 5 · States

Static cards have only rest. A linked card's states come from its one native anchor, and pointer and
keyboard get the same treatment.

| State           | Trigger                              | Parts that move |
| --------------- | ------------------------------------ | --------------- |
| rest            | Base rendering                       | Nothing. Inks hold; a cover sits in `--bcrd-media-rule-ink`; a text-only linked card's cta at `--btn-link-*-fg` |
| hover           | Pointer over a linked frame          | With a cover: the image scales to `--bcrd-media-zoom` inside the still, ruled box — nothing else. Without one: the cta's underline wipes in (Button) |
| focus, keyboard | `:focus-visible` on the linked frame | Everything hover does, plus the paired ring (`--bcrd-ring-color`, `--bcrd-ring-gap-color`) |
| pressed         | Pointer activation on a linked frame | Holds hover; the text-only cta steps to its pressed colour. No card pressed token |

The cover's hover is deliberately one quiet movement. A darker rule and a title underline were built
on 29 Sep and removed the same day at the owner's review as too loud; neither returns without a new
decision. Hover is still not colour-only: the zoom is a shape change.

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
| `--bcrd-media-rule-ink`   | `--color-neutral-300` — n/a, decoration         | `--color-neutral-400` — n/a, decoration         | `--color-neutral-700` — n/a, decoration         | `--color-brandeis-300` — n/a, decoration     |
| `--bcrd-ring-color`       | `--color-brandeis-500` — 6.17:1 against its gap | `--color-brandeis-500` — 5.51:1 against its gap | `--color-brandeis-300` — 7.32:1 against its gap | `--color-white` — 6.23:1 against its gap    |
| `--bcrd-ring-gap-color`   | `--color-paper` — paired ring 6.17:1            | `--color-paper-deep` — paired ring 5.51:1       | `--color-neutral-950` — paired ring 7.32:1      | `--color-brandeis-500` — paired ring 6.23:1 |

Six rows. Revision 3 added the media rule, on the house rule ladder `--media-capture-rule-ink` also
uses, with no hover step; the card declares its own rather than reading Media's (token rule 6). `--bcrd-media-ink` went
with the icon fill in 2.10 (section 17 Q14). `--bcrd-link-ink`, `-hover` and `-pressed` were **deleted**: the cta is a link
`Button`, so its three steps per surface come from `--btn-link-primary-fg{,-hover,-pressed}` in
`button.css`. The card no longer has a link-coloured part of its own, and a colour nothing paints is
a colour something paints again. `BlockCard` does not read those `--btn-*` names either — it carries
`data-btn-link-group` and `Button`'s own stylesheet resolves them.

`--bcrd-eyebrow-ink` is the one new token this redesign asks for, and it is not a new colour: it is
the same quiet-label ramp already declared by `--crumb-collapse-ink` and `--foot-label-ink`, aliased
for a third consumer. Section 16 records both the addition and the removals.

**Paper.** The title uses neutral-900, body drops to neutral-700 and the eyebrow to
neutral-600, which is 4.92:1 — the floor of AA and not to be lightened. The cta runs through
brandeis-500, 600 and 700 on `Button`'s own tokens, and it is the only part of the card that moves.

**Tint.** The text inks still clear their floors on paper-deep and are fully restated. The eyebrow
steps to neutral-700 because neutral-600 would be 4.39:1 on this ground, which is the one place the
two light surfaces genuinely differ.

**Ink.** The direction inverts. The title lifts to white, body to neutral-300 and the
eyebrow to neutral-400. The cta lifts too, through `Button`'s ink block rather than this one —
another reason not to keep a parallel set of card-owned link inks that could drift from it.

**Blue.** The title uses white, body uses brandeis-50 and the eyebrow brandeis-100 at
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
- Head-to-body seam, horizontal without an image: `Layout columns={[1, 1]} colGap="column"
  rowGap="tight" align="start"`. The same 64 between the halves; collapsed, the head and body meet
  at `tight`, which is exactly the eyebrow/title/body relationship of a tile, so a collapsed
  featured card reads as a vertical one. Body to cta inside the second half stays `block`.
- Featured row to its peers: the set's `rowGap="gutter"`, the same 32 as between any two rows of
  cards. The featured card is one of the set, not a band above it, so it takes the set's seam.

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
- The image: `Media fit="fill"`, `block-size: 100%` and a centre cover crop of the box. Its
  `width`/`height` attributes are the record's own; a record with none is given the box's
  proportions (3 × 2 or 4 × 3) and loses its `sources` (section 17 Q15). `sizes` comes from
  `src/lib/image-sizes.ts`: `CARD_TWO_TRACKS` (604 at the cap) for `tracks={2}` and for every
  horizontal card — its media column is (1240 − 64) / 2 = 588, 16 under the two-track value, so it
  over-fetches slightly and never under — and `CARD_THREE_TRACKS` (392 at the cap) for
  `tracks={3}`. Lazy, from `Media`'s default: a card is never the LCP.
- Cta glyph: sized by `Button`, from `--btn-icon-size-md`. The `Icon` is passed with no `size`
  because `Button` overrides one that is given — that is its documented behaviour, not an accident
  of specificity. The label is `--btn-text-md`.
- Linked target: the entire frame. Even the smallest title-only case exceeds 44px through one h4
  line plus the cta row; no hit extension is needed. The removed inset does not change this — it
  was never what carried the card past the floor.

### (c) Optical corrections

None. The component does not reach into `--space-*`. Every seam uses the gap scale, the cta glyph
uses `Icon` through `Button`, the images use the two component ratios, and focus geometry uses
system tokens.

Radius is `--radius-0` and there is no border to round: an editorial object is not a control shell.
No border width is named anywhere in the component — `--bcrd-edge-width` and
`--bcrd-edge-width-pressed` were deleted rather than set to zero, because a width nothing draws is
an invitation to draw it again. There is no elevation (`--shadow-none`), and the card stays at
`--z-base`. The focus ring uses `--focus-ring-width` and `--focus-ring-offset`, on keyboard focus only. The
card's other drawn line is the image crop box's hairline (`--bcrd-media-rule-width`, Revision 3).

## 8 · Typography

| Part             | Type role        | Tracking                                   | Measure           |
| ---------------- | ---------------- | ------------------------------------------ | ----------------- |
| `title`          | `--text-h4`      | `--text-h4-tracking`                       | none — the track (Rev. 3) |
| `title`, horizontal | `--text-h3`   | `--text-h3-tracking`                       | none — the track (Rev. 3) |
| `body`           | `--text-body`    | none — this role has no tracking companion | `--measure-body`  |
| `eyebrow`        | `--text-eyebrow` | `--text-eyebrow-tracking`                  | none              |
| `cta`            | `Button`'s own   | `Button`'s own                             | none              |
| Image media      | none             | none                                       | none              |

The horizontal row steps its title to the h3 role through `--bcrd-title-text-horizontal` and
`--bcrd-title-tracking-horizontal` (2.10). A row spanning the column beside a 4:3 cover, or a head
set beside its body, is a heavier object than a 286px tile, and ruling C2 puts that weight in type
scale rather than in a box. The role re-declares itself at 1023 and 767 like every title role.

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

`BlockCardSet` owns reflow for a set, by count. The peers — every item, or every item after the
featured one — take:

| Peers | Columns                     | `tracks` (for `sizes`) |
| ----- | --------------------------- | ---------------------- |
| 1–2   | `{ base: 1, md: 2 }`        | 2                      |
| 3     | `{ base: 1, md: 2, lg: 3 }` | 3                      |
| 4     | `{ base: 1, md: 2, xl: 4 }` | 2                      |
| 5+    | `{ base: 1, md: 2, lg: 3 }` | 3                      |

`tracks` is the widest count the shape reaches before `xl`; the four-across row at `xl` reads the
two-track value and over-fetches, which is the safe direction. From four items the first is
featured and spans the row through `Layout lead`; below `md` it collapses like any horizontal card,
so a phone sees one column of cards with the featured one first.

A caller that is not a set — a hand-built grid — owns reflow itself:

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

The set, which is what a template renders for a card group:

```jsx
<BlockCardSet items={items} />
// renders, for four or more items:
<Layout as="ul" columns={peerColumns} colGap="gutter" rowGap="gutter" equalRows lead>
  <BlockCard {...items[0]} orientation="horizontal" imageSide="left" />
  {items.slice(1).map((item) => <BlockCard key={item.id} {...item} tracks={peerTracks} />)}
</Layout>
```

**Where the featured rule lives, and why (C3).** Three homes were possible: the card, the template,
or a set in the pattern. The card is ruled out by this section's own premise — a card that knew it
was first of four would know its siblings. The template could hold it, but every template that
renders a card group would then restate "first of four or more is horizontal, spanning the row,
and the peers' grid and `sizes` follow from the rest", which is the rule the owner made once. So it
lives in `BlockCardSet`: the one place that already has to see every item to render the list, in
the pattern that owns the card, exported beside it. The span itself is `Layout`'s — a new `lead`
prop — because spanning the row is the container's statement about its first child, and a child
that set its own `grid-column` would be the child deciding its placement. `lead` also keeps the
set **one list**: two lists (a featured `ul` and a peers `ul`) would announce "list, one item" and
then "list, three items" for one set of four.

`lead` makes the first row explicit and `auto` and leaves the later rows implicit, so under
`equalRows` the peers' `1fr` rows are sized only by the peers — a tall featured card does not
stretch every tile to its height.

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
- Image alternative text comes from the record's required `alt`. `alt=""` is allowed only when title
  and body already communicate everything the image adds — an illustration cover, always (§9a).
- The featured card is one `li` in the same `ul` as its peers, first in DOM and reading order.
- No `role`, `aria-current`, `aria-disabled`, `aria-expanded`, `aria-controls`,
  `aria-describedby` or busy attribute is emitted.

No ids are generated and there are no id references. Consequently there is no absent target for
`aria-controls` to name.

Keyboard focus uses `:focus-visible` only. It shows the hover cta ink plus a `--focus-ring-width`
ring separated by `--focus-ring-offset` in the nearest surface's gap colour. The ring-to-gap ratios
are 6.17:1, 5.51:1, 7.32:1 and 6.23:1. All text and the cta glyph meet 4.5:1 in every live state,
the eyebrow included at its 4.92:1 and 4.91:1 floors.

The ring is what keeps keyboard focus off colour alone, and it is not optional on any surface: it is
measured against its own gap on all four. Hover is not colour-only either: the title underlines on every linked card, a cover zooms, and the text-only cta `Button`
wipes its underline in — see section 5. Reduced motion is answered inside `Button`, which shortens
that wipe to `--duration-instant` and keeps the underline itself; this component adds no transform
of its own and therefore no media query.

A screen reader encounters a static card as: “List, four items. When this is useful, heading level 3.
Use this approach when several teams must make the same decision.” It encounters a linked card with
an eyebrow and a cta as: “Case study, Relevant work, heading level 3. See how the service was
redesigned. Read more, link.” It does not announce the arrow glyph.

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
| Zero items                                | The caller omits the parent grid; do not render an empty `ul`. `BlockCardSet` returns null for zero items.                                                                                                                                                                           |
| One item                                  | Render one `li`. A card with no sibling has no gutter to be bounded by and that is acceptable: it is bounded by the section's own rhythm. The parent chooses an appropriate track rather than stretching through a card prop.                                              |
| Many items (2× expected)                  | Render 16 cards through the caller's normal responsive `Layout`; no pagination, clamping, count detection or internal grid logic.                                                                                                                                          |
| Missing image or missing optional slot    | Omitting `media` removes its element and seam. Under accepted question 1(a), a blank runtime image `src` is treated as no media and warns in development; the title/body card remains complete and no placeholder ships. Omitting `eyebrow` removes it and its seam the same way.                                                   |
| `orientation="horizontal"` with no image  | Head beside body (2.10, section 17 Q16): eyebrow and title in the first track, body and cta in the second, top-aligned, the title at h3. This replaces the single-column fallback, which rendered a featured text-only card as a full-width stack of short lines. A blank image `src` takes the same path. `imageSide` has nothing to place and is ignored. |
| An image record with no `width`/`height`  | Rendered in the box at the box's proportions, with no `srcset` (section 17 Q15). No warning: several view models still arrive this way, and the rendering is correct. |
| Four or more items in a set               | The first is featured automatically (C3). A set of 4 with a cover-less first item features a text-only card above three covers, which is the honest result of the order it was given. |
| Empty required-ish text                   | A whitespace-only title renders nothing and warns in development. A blank body omits the paragraph and warns but keeps the titled card. A blank `eyebrow` omits the label and warns. A blank `href` is absent, so no anchor, cta, `data-btn-link-group` or interactive states render. A blank `ctaLabel` falls back to “Read more” and warns, because a link `Button` with no label is a bare glyph. |
| Narrow track at 767                       | Parent grid is one track. Image remains above copy, text wraps without changing its gap or type role, and a horizontal card collapses to the same stack.                                                                                                                   |
| Parent that does not size it              | Root and frame fill one available line in a wrapping parent through full inline size and `min-inline-size: 0`. There is deliberately no component minimum: below the 192px named stress track, the image shrinks and text wraps rather than forcing page overflow. The cta is a `Button`, which is `white-space: nowrap` by design, so a long `ctaLabel` in a very narrow track is the caller's copy decision — the specimen renders that case rather than hiding it. |
| Logical properties rather than left/right | Every distance is a logical `Layout`/`Cluster` seam and the cta sits at inline start. `imageSide` is the one physically-named prop in the component and it is honest about it: `'left'` means the media takes the first track, which in RTL is the inline start. The current site is LTR; an RTL composition must swap the directional cta glyph to the existing `arrow-left` at the composition boundary. |
| Surface nested inside a different one     | The nearest `data-surface` block redeclares all five colour tokens, the eyebrow included. A tint card inside an ink band uses the complete tint column.                                                                                                                    |
| Two components adjacent                   | The `Layout` gutter is the entire boundary, so it is required rather than conventional. At the 32px gutter the two read as separate objects with no line between them. In a zero-gap stress harness they run together, and that is the honest result of a borderless finish rather than a defect to patch: no sibling selector, and no card-owned edge, exists to separate them. Stacked horizontal cards take `rowGap="section"` and likewise no rule. |
| Interactive content inside a slot         | Rejected. Title, body, eyebrow and `ctaLabel` are strings and media is a closed image record. The whole-card anchor is the only possible focus target: the cta is a `Button` rendered `as="span"`, so it is a label rather than a control, and there is no `as` escape hatch on the card to make it anything else. Rich text with an inline link must use `Prose` outside BlockCard rather than nesting anchors. |

## 13 · Motion

Two things move on a linked card, and one of them is the card's own (Revision 3).

- **The cover zoom** — BlockCard's. `.imageZoom` transitions `transform` to
  `scale(var(--bcrd-media-zoom))` (1.03) on `--bcrd-media-zoom-duration` (`--duration-slow`) and
  `--bcrd-media-zoom-easing` (`--easing-standard`). It scales inside the ruled, clipped box, so the box,
  its edge and the card never move. Nothing else on the card transitions.
- **The text-only cta's underline** — Button's, triggered by `data-btn-link-group`, answered for in
  Button's own stylesheet.

**Reduced motion:** the card's `prefers-reduced-motion` block removes the zoom outright (no transform,
no transition) rather than shortening it. Keyboard focus keeps its ring.

## 14 · Do's and Don'ts

**Do**

1. Put every group in `Layout as="ul"` with explicit columns, `colGap="gutter"`,
   `rowGap="gutter"` and `equalRows`; inspect the call-site tree and computed tracks.
2. Render four cards as two columns from `md` and four only from `xl`; inspect 1023, 1439 and 1440
   to prove the fourth never becomes a three-column orphan.
3. Render image media above the title at 3:2 in a vertical card and beside it at 4:3 in a
   horizontal one; compare the two wrappers' computed `aspect-ratio` and DOM order, and expect a
   `Media` `<img>` with `loading="lazy"`, a `srcset` and the placement's `sizes` inside each.
4. Render the cta exactly when a non-blank `href` produces one whole-card anchor AND the card has no
   cover; count text-only anchors and ctas and expect equal totals, count ctas on covered cards and
   expect none, and count nested anchors and buttons and expect none.
   `data-btn-link-group` must appear on exactly the frames that are anchors.
5. Show a static no-media card as a complete object with no blank action row; inspect its content
   box beside a linked peer and expect no border on either.
6. Render identical markup on all four surface bands and inspect all five resolved `--bcrd-*`
   colours plus the cta's three `--btn-link-primary-fg*` steps, including the two nested-surface
   proofs.
7. Use `titleAs` to match the page outline while preserving h4 visual type; compare the heading map
   with the computed type token.
8. Prove the title's ink does not depend on `href`: render the same card linked and static side by
   side and expect both computed title colours to be `--bcrd-title-ink`.
9. Alternate `imageSide` from the call site by index; inspect the rendered tree and expect no
   index, count or sibling knowledge inside any card.
10a. Render a set of four through `BlockCardSet` and expect one `ul` of four `li`, the first spanning
    every track (`grid-column: 1 / -1` from `Layout lead`) and horizontal, the peers vertical.
10. Point anywhere on a linked card: on a covered card expect only the image to scale inside a still
    box — no underline, no rule change — and on a text-only card the cta's
    underline to wipe in and its label to step colour; point at a static card and expect nothing to
    move. This is the group contract working,
    and it is the one interaction the specimen cannot render statically.

**Don't**

11. Do not add a fill or ground token; search the component layer for `bg`, `ground` and fill
    declarations and expect none outside image/SVG content.
12. Do not bring the edge back, in any form: no `border`, no `outline` outside `:focus-visible`, no
    `box-shadow` beyond the ring, no `--bcrd-edge-*` token, and no hairline drawn as a pseudo-element.
    Search the module for `border` and expect only `border-radius`. A card that needs a visible
    boundary is asking for the gutter it was given.
13. Do not give the title a link ink or an underline, or make any part change on hover or press but
    the cover's zoom and the text-only cta; inspect computed styles in every
    state and expect only those. There is no
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
23. Do not add a `featured` prop to the card or a featured field to the CMS record; featuring is the
    set's, by position (C3). Search `BlockCard.tsx` and `src/content/types.ts` for `featured` and
    expect nothing.
24. Do not draw an image's edge, crop rule or `object-fit` in this module: search it for `object-fit`
    and `border` and expect only `border-radius`. `Media` owns the image.
25. Do not bring back an icon fill, and never a glyph in a disc (ch04).

## 15 · Specimen plan — `/design/block-card`

The exact block list, in order (2.10). The three rulings come first because they are what the
owner judges.

1. **Text-only sets (C2).** `BlockCardSet` with 3 linked service cards, 2 static situation items, 4
   service cards (featured, head beside body), 5 service and audit cards (featured + the four-card
   peer shape) and 4 static items (featured, no cta).
2. **Cover-image sets (C1).** Case studies through `BlockCardSet` at 3, 2, 4 (featured, media beside
   copy) and 5, using the `public/design/media` assets: a shadowed cut-out, an illustration with
   empty alt, a cut-out on its paper-deep panel, a tall cut-out.
3. **Mixed sets.** Insights with and without covers at 3, and at 4 with the featured item carrying
   a cover and then not.
4. **The 326 row** (`.trackMobile`): cover cards including the wide capture, and text-only cards.
5. **Identity and finish**, and the title-ink proof, linked beside static.
6. **Media by kind, and the record**: cut-out with shadow, cut-out on panel, illustration, capture;
   then a record with no dimensions and a blank source.
7. **Eyebrow ladder.** 8. **The cta**, blank and long labels. 9. **Orientation**: image left and
   right, an alternating stack, head beside body without an image, the 3:2 against 4:3 ratios.
10. **Hand-built grid-count ladder** (2, 3, 4 with no featured, because nothing asked). 11. **Static
    majority.** 12. **States.** 13. **Four surfaces**: covers on paper and tint; text-only on ink and
    blue, because a cover is not placed on a reserved band (ch05 §9a). 14. **Nested surfaces** with
    the resolved tokens. 15. **Equal heights.** 16. **Every section 12 edge case**, including long
    copy in the featured row and a zero-item set. 17. **Narrow tracks** at 256 and 192. 18. **Heading
    map.** 19. **Adjacent boundary.** 20. **What a static page cannot force.**

`/design/layout` gains one row for `lead`: a tall lead above five peers under `equalRows`, proving
the lead's height does not reach the peer rows.

The squint test: the page opens on five differently shaped text-only sets and four image sets, so
the first screenful reads as arrangement — a featured row, then tiles — rather than as a column of
identical rectangles.

## 16 · New token requests

**2.10 — two added, one removed.**

- Added: `--bcrd-title-text-horizontal` (`--text-h3`) and `--bcrd-title-tracking-horizontal`
  (`--text-h3-tracking`), geometry in `:root`. The horizontal row's title role (section 8). Named
  with the orientation suffix to sit beside `--bcrd-media-ratio-horizontal`.
- Removed: `--bcrd-media-ink`, on all four surfaces, with the icon fill it coloured (section 17 Q14).
- `Layout` gains the `lead` prop, which is a class, not a token.
- `docs/vocabulary.md` is regenerated in the same PR.

**One — `--bcrd-eyebrow-ink`** (Cards 1a).

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

**Superseded in part by 2.10 (28 Sep 2026).** The native `<img>` became `Media` once the primitive
existed (the audit's "Build" verdict on the responsive image slot): the card keeps the crop box and
the blank-source rule; the file, the `srcset`, the loading and the edge moved to `Media`. The
480 × 320 attributes went with the native image.

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
orientation; that was ruled out of scope. **Superseded by C3 (28 Sep 2026):** the featured card is
the horizontal orientation, given to the first of four or more by `BlockCardSet` — Q13.

**11 · Horizontal with no image — ANSWERED, 25 Aug 2026 (Cards 1a).** Not raised in the handoff and
decided during implementation. Options: centre an icon in the media track; render the row with an
empty half; or fall back to the vertical stack. **Answered: fall back to the stack.** A 24px glyph
in a 588px track is not a media column, and an empty half is a defect. Recorded in section 12 and
proved in the specimen; flagged to the owner as an inference rather than a handed-down decision.
**Superseded by Q16 (2.10):** a featured text-only card made the stack a full-width column of short
lines, so the imageless row now splits the copy instead.

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

**13 · Which cards carry an image, how a text-only set holds, and when a card is featured —
ANSWERED, 28 Sep 2026 (`docs/phase-2-decisions.md` C1, C2, C3).** Recorded here, not reopened:

- **C1.** Case studies and every insight or resource with a cover (articles, videos, podcasts) carry
  media; service, audit, glossary and capability cards do not. This overrides ch05 v1.0 §9 "Card
  imagery by family", which 2.10 corrects in `docs/brand/05 Imagery.html` (the family table and the
  §12 row 05); the Claude Design copy follows at the next `/design-sync`.
- **C2.** Scale and position: weight from type, no box or fill or border, variety from `Layout`. The
  owner judges it on screenshots, so 2.10 is shown, not merged.
- **C3.** The first item, automatically, from four; the horizontal arrangement spanning the row; no
  CMS field. Where it lives is argued in section 10: `BlockCardSet`, with the span as `Layout lead`.

**14 · The icon fill — removed. Non-blocking.** Checked against ch04: it rendered `Icon size="xl"`
bare in `--bcrd-media-ink`, with no disc and no badge, so it was never the "glyphs in coloured discs"
don't. It was removed because it has no job left: C1 makes the media-less families text cards and
gives the rest a cover, O1 retired the service glyphs it would have shown, and a grep found zero route
uses (`kind: 'icon'` appears only in the specimen). Alternative: keep it for a future family that
wants one ink glyph per tile; rejected because an unused fill is a variant nobody tests, and it is
one member to add back to a closed union if a family ever asks.

**15 · Image records with no intrinsic size. Non-blocking.** `Media` requires `width` and `height`;
five view models still make them optional or omit them (`InsightImage`, `CaseStudyListingImage`,
`ServicesMasterImage`, `FutureInterfacesLabImage`, `MatterDesignSystemImage`). Chosen:
`BlockCardImage` takes them optionally, and a record without them is given its box's proportions
and no `sources` — in `fill` the attributes never lay anything out, and a guessed master width would
write a wrong `w` descriptor. Alternative: require them and drop dimensionless images from the
routes, which would silently remove service icons uploaded as SVG. **Follow-up for the content
seam:** those mappers should emit `ImageRecord` via `mapUploadImage`, the insights mapper especially,
so the C1 cover on the insights index gets a `srcset`; that is a `sources/strapi/*` change, not a
card one.

**16 · A horizontal card with no image — head beside body. Non-blocking.** Replaces Q11's fallback.
Options: keep the single-column stack (a featured text-only card becomes a full-width column of
short lines, which is the "same shape, larger" failure); step the stack's type only (still one
column with a void beside it); or split the copy across the two tracks. Chosen: split — eyebrow and
title first, body and cta second, top-aligned, 64 apart — which is `ContentSection`'s head-beside-body
arrangement at card scale and collapses to the tile's own order below `md`.

**17 · The row's title role — h3. Non-blocking.** Chosen: every horizontal card, featured or in a
hand-built stack, sets its title at `--text-h3`. The alternative, h3 only when featured, would need a
featured prop on the card, which C3 and section 10 rule out.

**18 · `sizes` for a card that cannot see its track. Non-blocking.** Chosen: a `tracks: 2 | 3`
presentation prop, default 2, which never under-fetches in a set of two, three or four; the set
passes the right one. The horizontal card always reads `CARD_TWO_TRACKS` (604 at the cap against a
588 media column). A lone card stretched across the full column (a one-track hand-built stack of
vertical cards) under-fetches with the default; no route does that, and the set never does.

**19 · The featured row's seam — `gutter`. Non-blocking.** The featured card takes the set's 32 like
any row of cards, because it is one of the set. Alternative: `stack` (48) above the peers, which
would need a second `Layout` and so two lists (Q13, section 10). Flagged for the owner's screenshot
review: if the featured row reads as crowded against its peers, the answer is a `leadGap` on `Layout`,
not a margin.

**20 · Routes are migrated, not recomposed. Non-blocking.** The twelve route call sites that passed
`{ kind: 'image', src, alt }` now pass `{ type: 'image', image }` with the record straight through.
None moves onto `BlockCardSet`, and `services`, `future-interfaces-lab` and `matter-design-system`
still pass uploaded icons as image media although C1 makes those families media-less: both are
template decisions for Phase 3, per family, rather than a card change.

## Revision 3 · 29 Sep 2026 — the case-study card

Owner decisions, 29 Sep: a hairline on every card image whatever its kind; a real `client` field;
drop the "Read the case study" line; a subtle image zoom; the listing description is one line of
8–15 words.

1. **Hairline on every kind.** The crop box draws `--bcrd-media-rule-width` in
   `--bcrd-media-rule-ink`; `Media` gets `edge="placement"` (Media spec, amendment 29 Sep) so a
   capture's own rule does not double it. The argument is ch05 amendment 5a: in a card every kind is
   cropped to the card's ratio, so the edge is the card's cut, not the object's.
2. **Hover on a cover card is one subtle zoom** (1.03, inside the still box). A darker rule and a
   title underline were built and removed at review the same day as too loud. Sections 5 and 13.
3. **The cta renders only on a linked card with no cover.** Global, not case-study-only: the argument
   (a line repeated under every tile says nothing the tile's hover does not) holds for every covered
   family, and a text-only card has nothing else that says it navigates, so it keeps the line.
   `ctaLabel` is ignored on a covered card, silently, because insight routes pass one for cards
   whose cover is optional and a warning would fire on every covered one. **Known cost:** on touch
   there is no hover, so a covered card's resting affordance is the cover and title alone. That is
   the convention every editorial grid in the references relies on (a covered tile is read as a
   link), and it was accepted with the decision; a text-only card, which has no such convention,
   keeps the line.
4. **One label line, above the title.** A `meta` line below the body (categories) was built and
   removed at review: two label lines read as stuffed. The eyebrow is the one label, and the
   template decides what fills it (item 7).
5. **No title measure.** `--measure-title` (22ch) broke 60–87 character titles into four ragged lines
   beside empty track. The track is the measure; `--text-title-wrap` (balance) evens the lines. The h4
   role is kept: h5 was tried and saved one line only on the longest titles, at the cost of every
   approved text-only set.
6. **`BlockCardSet` rows are a `stack` (48) apart; columns stay a `gutter` (32).** Across a row the
   cards are peers read together; down the grid each row is the next set of objects, and at one
   shared 32 a borderless tile's copy ran into the image below it. Every set, not only case studies.
7. **`/case-studies` renders the `CaseStudyIndex` template** (`src/templates/`, the first template).
   The template owns the page type's decisions — `BlockCardSet` (featured first), and the eyebrow
   rule: the client, or the categories only while the client is missing. `CaseStudyListingItem.client`
   is optional and undefined until Strapi has the field (strapi-changes §13).
8. **Ideal content, as a mechanism.** `/design/case-study-index` renders the same template from
   `getIdealCaseStudyListingPage`: the live entries — covers, order, links — with an overlay of the
   copy the content rules call for (`src/content/sources/fixtures/ideal/case-study-listing.ts`, keyed
   by slug; client, 2–8 word title, 8–15 word line, no categories). The page is judged at the content
   it was designed for, and the overlay doubles as the content team's worked example. Other page
   types get the same pair — a template and an ideal overlay — as they are built.

Specimen: band 21 (the case-study card at the corpus's extremes, the 87-character title at 326, no
eyebrow);
bands 6, 8 and 12 re-captioned for the rule, the cta rule and the new states.

## Appendix — self-audit

```
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states Tier 2 pattern, Status implemented, token prefix --bcrd-*, and the Cards 1a
    revision date; the prefix has no repository collision.
[x] Every Anatomy part appears in colour, geometry, or is explicitly marked as carrying no value.
    The removed `edge` part is named as removed rather than deleted silently.

NAMES
[x] The component layer DECLARES 18 --bcrd-* tokens after 2.10 (was 17: +2 horizontal title, −1 media ink). The document names 26, because it names the
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

2.10 AMENDMENT
[x] Rulings C1–C3 recorded in § 17 Q13 and applied: § 1, § 4, § 9, § 10.
[x] Image slot on Media: fill, card-owned ratio box, sizes from src/lib/image-sizes.ts, lazy.
[x] Discriminant `type`; 12 route call sites migrated; icon fill and --bcrd-media-ink removed.
[x] Two tokens added, one removed, vocabulary regenerated (§ 16). Colour table now 5 rows.
[x] BlockCardSet: the featured rule's home argued (§ 10); Layout `lead` keeps one list.
[x] § 17 Q14–Q20 non-blocking, each with the choice made.

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
