# BlockCard

> **Amended, home round 3 (11 Oct 2026).** Every cover is 16:9 (`--ratio-standard`) at every width and in every arrangement. The `ratio` prop and its seven crops (cover, wide, panorama, double, square, pair, headshot) and the `grow` prop are retired; BlockCardSet no longer takes `ratio`. Where this spec names a per-set crop, read 16:9. See docs/page-mapping.md § 19 and docs/kit/brand-amendments.md (home round 3).

## 0 · Front matter

|                     |                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Component**       | `BlockCard`                                                                                                            |
| **Tier**            | 2 pattern (`src/patterns/BlockCard/`)                                                                                  |
| **Status**          | implemented and merged — 2.10 (C1–C3) merged; Revision 3 merged 29 Sep; the kit amendments (`fdn-spacing`, `fdn-media`, `fdn-blue`, `cmp-feature`) apply on top. **§ Current contract** below is the authority where an older section disagrees |
| **Token prefix**    | `--bcrd-*`                                                                                                             |
| **Designer / date** | Codex / 24 Aug 2026                                                                                                    |
| **Revised**         | Cards 1a redesign / 25 Aug 2026 — borderless finish, always-dark title, `eyebrow`, a read-more `cta`, horizontal orientation |
| **Revised**         | Phase 2 · 2.10 / 28 Sep 2026 — the image onto `Media`; cover media by family (C1); text-only sets by scale and position (C2); `BlockCardSet` and the featured first card (C3); the icon fill removed; `Layout lead` |
| **Revised**         | Case-study revision / 29 Sep 2026 — one hairline round every image kind (the crop box's, ch05 amendment 5a; `Media edge="placement"`); a subtle hover zoom as the only hover cue; the cta only on text-only linked cards; no title measure cap; `BlockCardSet` rows a `stack` apart; `/case-studies` onto the `CaseStudyIndex` template. See § Revision 3 |
| **Revised**         | `fdn-spacing` / 5 Oct 2026 — the copy group at `text` (S2); the `size` prop (`lg \| md \| sm`) and `BlockCardSet` passing it by count (visual-direction § 7.2); the set's row seam recorded as `column`. See **Amendment · 5 Oct 2026** below |
| **Revised**         | `cmp-feature` / 6 Oct 2026 — 16:9 for sets of three or more; the text-only top hairline; icon and index cards; `cue` (arrow or cta); a pressed step; the `--bcrd-radius` / `--bcrd-shadow` absences deleted; `BlockCardSet` `lead`, `across`, `size`, `standIns`, `numbered`, `cue`, `titleAs`, the step by track width, mixed-set settling and the phone scroll row. See **Amendment · 6 Oct 2026 — `cmp-feature`** |
| **Revised**         | **Owner review / 7 Oct 2026** — the arrow after the title removed (`cue="arrow"` → `cue="title"`, `--bcrd-cue-ink` deleted); the optional boxed card (`frame="box"`, `BlockCardSet frame`, `--bcrd-box-*`), applied to every icon router. See **Amendment · 7 Oct 2026** at the foot. |
| **Implements**      | `docs/briefs/12-block-card.md`                                                                                         |
| **Implemented at**  | `src/patterns/BlockCard/` (`BlockCard.tsx`, `BlockCardSet.tsx`) · `src/styles/tokens/components/block-card.css` · specimen `src/app/design/block-card/page.tsx` |
| **Rulings**         | `docs/phase-2-decisions.md` C1, C2, C3 (28 Sep 2026); Media M1–M4 and PageHero A3 by reference                          |

## Current contract · 7 Oct 2026 (Revision 3 + kit amendments + owner review)

Read this first. Sections 1 to 17 are kept as the record of how the card got here; where one of them
says otherwise, this block and the dated amendments at the end win.

| Axis | The rule as built |
|---|---|
| **Edge** | By default no card edge, ground, radius or shadow. **`frame="box"`** (owner, 7 Oct 2026; set by `BlockCardSet frame`) draws a `--bcrd-box-rule-*` hairline at `--bcrd-box-radius` (8), `--gap-block` inside, a `--bcrd-box-ground-hover` / `-pressed` ground on a linked card, and drops a text card's top hairline; boxed rows sit a `gutter` apart. The one card-owned line round an image is the **crop box's border hairline** (`--bcrd-media-rule-width` / `-ink`, ch05 amendment 5a); Media draws none inside a card (`edge="placement"`). A **text-only** card takes a hairline at its own top edge instead (`--bcrd-text-rule-*`, neutral on every surface), 24 above its first label. |
| **Ratio** | **One 3:2 ratio** for the card (`--bcrd-media-ratio` = `--ratio-cover`) in both orientations — **except** a set of three or more across, which crops 16:9 (`--bcrd-media-ratio-wide`, `ratio="wide"`, visual-direction § 1.4 rule 1). The set decides it; the row stays 3:2. A spotlight lead (`BlockCardSet lead="beside"`) crops 21:9 (`ratio="panorama"`) and grows into spare height (`grow`). The wide lead's row (`lead="wide"`) crops 2:1 and 1:1 from 1024 (`ratio="double"` / `"square"`, 16:9 below), one height across. An illustration or a cut-out is shown whole inside the box (Media `fit="contain"`, `--bcrd-media-inset` = `tight`), and is supplied cut to one region for the card. |
| **Title** | Ink at rest, never underlined (tried 29 Sep, removed). No arrow after it (owner, 7 Oct 2026). A title-cued linked card's title takes `--bcrd-title-ink-hover` on hover and focus and `--bcrd-title-ink-pressed` on press. A cta-cued card's title never moves. |
| **Motion** | One movement: the cover leans in to `--bcrd-media-zoom` (1.03) inside its still box on hover, focus and press. Reduced motion removes the zoom outright; the ring and the colour steps remain. |
| **Colour tokens** | Thirteen, declared on every surface: `title-ink`, `title-ink-hover`, `title-ink-pressed`, `mark-ink`, `body-ink`, `eyebrow-ink`, `media-rule-ink`, `text-rule-ink`, `box-rule-ink`, `box-ground-hover`, `box-ground-pressed`, `ring-color`, `ring-gap-color` (§ 6 and the 7 Oct amendment; `cue-ink` deleted). The cta's three steps are Button's. |
| **Cue** | A linked card says it navigates by ONE cue: its title (`title`, default with a cover or an icon — no glyph, the title goes blue on hover), a link-style cta with its arrow (default text-only, and for any card whose action is not obvious from its title), or `download` (the cta with the download glyph, for a file). `cue` overrides; the set passes it for all. An optional `meta` format line sits on the action row. |
| **Head object** | A cover (an image, or `media.type: 'texture'` — the Tcules texture as hard-edged blocks at full strength, the card's icon about a fifth of the cover's width in its foot-start corner), or an `icon` (32, blue, solid Solar Bold, the C-icon card), or — text-only — the hairline then an optional blue `index` numeral and/or eyebrow. |
| **Sizes** | `lg` h4 + body-lg (featured row, spotlight and wide leads); the serif h3 when horizontal, the one serif card title (22 Oct 2026, `decisions/2026-10-22-card-titles-sans-except-horizontal`), `md` h4 + body (2–3 across; text cards), `sm` h5 + body-sm (4 across; the wide lead's squares; icon cards, always). The set decides by **track width**, not count; `size` never reaches an icon set. |
| **Set shapes** | `lead`: `auto` (featured row from four, the case-study index), `none` (peers), `beside` (spotlight), `wide` ([2, 1, 1]). `stagger` drops the even cards 96 from 1024. Four across from `lg`. Below 768 a covered set of three or more, or a linked set of four or more, is a scroll row bleeding to the screen edge; an unlinked one takes the tab stop and `label`. |

> **Amendment · 13 Oct 2026 · the insights hub (docs/specs/InsightsIndex.md § 12a).** `media` gains a
> third fill, `{ type: 'sketch'; name: ArticleSceneName }`: a DRAWN cover, a Sketch scene drawn for
> that one article from its own argument, on its dot-field plate inside the same ruled 16:9 box,
> decorative, no type on it. Typed to the article scenes: a service scene is never a cover (owner,
> revised 13 Oct 2026). The caller assigns it item by item, in data, never by keyword.
> `BlockCardSet` counts a sketch as a cover. Specimen: `/design/block-card` § 2b.

> **Amendment · 5 Oct 2026 · `fdn-spacing` (visual-direction § 1.1 S2, § 1.2, § 7.2).** Where this
> spec still differs, `docs/kit/visual-direction.md` wins.
>
> 1. **S2 — the copy group is `text` (16), not `tight` (8).** Eyebrow → title and title → body, in
>    the tile and in both halves of the horizontal text-only row (and the collapsed row's seam between
>    them). Ink gaps after: ~16 → ~24 and ~25 → ~33. Three rows at one step had no hierarchy, and a
>    12px label 8px over a 28px serif read as cramped. 16 is one step under the section head's 24
>    (S1), so a card reads as a smaller unit of the same system. Copy → cta and media → copy stay
>    `block` (24).
> 2. **A `size` prop: `'lg' | 'md' | 'sm'`** — the title and body roles together, a component size
>    and so a t-shirt name. Defaults to `lg` when horizontal and `md` when vertical, which is the
>    weight each arrangement had before; nothing that states neither prop changes, except that a
>    horizontal card's body now steps with its title (body-lg, not body).
>
>    | Size | Title | Body | Set |
>    |---|---|---|---|
>    | `lg` | `--text-h3` | `--text-body-lg` | the one featured, horizontal card |
>    | `md` | `--text-h4` | `--text-body` | 2 to 3 cards; text cards |
>    | `sm` | `--text-h5` | `--text-body-sm` | 4 to 6 cards across |
>
>    Tokens `--bcrd-title-text-{lg,md,sm}`, `--bcrd-title-tracking-{lg,md,sm}`,
>    `--bcrd-body-text-{lg,md,sm}` replace `--bcrd-title-text`, `--bcrd-title-tracking`,
>    `--bcrd-body-text`, `--bcrd-title-text-horizontal` and `--bcrd-title-tracking-horizontal`. The
>    module sets them under one root modifier per step (`.sizeLg` / `.sizeMd` / `.sizeSm`).
> 3. **`BlockCardSet` passes the step.** `size` joins the props an item cannot carry. The featured
>    card takes `lg`; the peers take `sm` from `SMALL_FROM` (4) **peers**, else `md`. Counted on the
>    peers, not the set, because the row a title sits in decides its line length: four items are a
>    featured row over three 392px peers (the 2-to-3 shape, `md`), five are a featured row over four
>    286px peers (`sm`). A text-only set stays `md` at any count (§ 7.2: text cards take the h4 step).
>    `SMALL_FROM` is exported beside `FEATURED_FROM`.
> 4. **The set's row seam is `column` (64)**, the step `BlockCardSet` has used since 29 Sep, now
>    written into CLAUDE.md's gap-scale table: "and the row seam of a borderless card set". § 7(a),
>    § 10's set sample and § 14 Do 1 were brought into line on 6 Oct; § 17 Q19 is kept as the record
>    of the 32 it started at.

### Amendment — 7 Oct 2026 (r7-testimonials)

`body` is optional. A card whose description is said by something beside it — the case card in Proof's
G-case, where the quote is the description — leaves it off with no warning; a blank string still warns.

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
| `copy`    | yes               | The one group (`text`, 16) containing `eyebrow`, `title` and `body`   | No colour or distance outside its `Layout`                        |
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
| `href`        | `string`                                                                          | absent       | A non-blank destination makes the whole frame one anchor; with no cover it also emits the cta (Rev. 3), and with one it ends the title in the arrow cue (6 Oct) |
| `ctaLabel`    | `string`                                                                          | `Read more`  | The cta wording on a linked text-only card; ignored on a covered card, which renders no cta (Rev. 3); blank falls back to the default and warns. `Button` uppercases it, so pass ordinary capitalisation |
| `orientation` | `'vertical' \| 'horizontal'`                                                      | `'vertical'` | Which axis the card arranges on                                                   |
| `imageSide`   | `'left' \| 'right'`                                                               | `'left'`     | Which track the media takes when horizontal; ignored when vertical or imageless   |
| `tracks`      | `2 \| 3`                                                                          | `2`          | The widest track count of the card's set, which picks the image `sizes` (`CARD_TWO_TRACKS` / `CARD_THREE_TRACKS`); ignored when horizontal |
| `size`        | `'lg' \| 'md' \| 'sm'`                                                             | `'lg'` horizontal, `'md'` vertical | The type step: title and body roles together (Amendment · 5 Oct 2026, visual-direction § 7.2) |

`orientation`, `imageSide`, `tracks` and `size` are presentation props: they describe the card's
place among its siblings, never the content, so none is ever a CMS field. `BlockCardSet` sets all
four.

**`BlockCardSet`**

| Prop    | Exact type                                                                                    | Default  | What it decides |
| ------- | --------------------------------------------------------------------------------------------- | -------- | --------------- |
| `items` | `readonly BlockCardSetItem[]` — `Omit<BlockCardProps, 'orientation' \| 'imageSide' \| 'tracks' \| 'size'> & { id: string }` | required | The cards, in order. Zero renders nothing |

An item cannot carry the four presentation props, so no caller can contradict the set one item at
a time. `FEATURED_FROM` (4) and `SMALL_FROM` (4 peers, 5 Oct) are exported so a template or
specimen can name the thresholds rather than restate them.

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
- `ctaEmphasis`, `ctaTone` and `ctaSize`: the cta is a link-emphasis neutral `Button` and that is
  the whole of it (primary until 6 Oct 2026; see the `fdn-colour` amendment at the end). A solid or ghost cta would be a real control inside a whole-card anchor, which
  section 11 forbids; a tone switch would put a second action colour in a card that has one link.
- `imageRatio`: the two ratios belong to the two orientations, so a caller who wants the other one
  is asking for the other arrangement.
- `alternate` or `stagger` on a card: alternation is a relationship between siblings, like
  `equalRows`, so it belongs to the composition that can see them all.
- `columns`, `width`, `minWidth` and `equalHeight`: the parent `Layout` owns track count, gutter and
  equal rows. The card fills the track it receives.
- density, padding, gap, radius and height: one card rhythm prevents members of one grid being
  tuned independently. `size` is the narrow exception (5 Oct 2026): it steps the title and body
  roles only, `lg | md | sm`, and `BlockCardSet` sets it per set by count, so peers in one row
  always share a step.
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
7. A `BlockCardSet` item with `orientation`, `imageSide`, `tracks` or `size` cannot compile.

## 4 · Variants × sizes

One finish, three type steps (`lg | md | sm`, 5 Oct 2026), two orientations.

| Orientation  | Default step: `lg` horizontal, `md` vertical                                                                                    | Intended use                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `vertical`   | No edge, no inset. Media above copy at 3:2, h4 visual title (h5 at `sm`), optional eyebrow, optional cta. Fills one track of a parent grid   | Every card grid, 2–8 across the 78 clusters; content and grid density, not a prop, set its role  |
| `horizontal` | Two equal tracks from `md`, 64 apart, the title at the h3 role. With a cover: media at 4:3 beside the copy, centred against each other. Without one: the head (eyebrow, title) beside the body and cta, top-aligned. Fills a single track | The featured first card of a set of four or more (C3), and a stack of a few substantial items |

There is no public `variant` or `finish` prop. **`size` was added on 5 Oct 2026** (Amendment): the
type steps with the count of the set, and the set passes it. Icon, image and omitted media are fills of
one slot. Link presence changes semantics and the cta, not the card's visual category. Heading
semantics do not change visual type. The eyebrow role, cta size and the two media ratios do not
step between content shapes or sizes; the title and body roles step with `size` and nothing else.

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
| rest            | Base rendering                       | Nothing. Inks hold; a cover sits in `--bcrd-media-rule-ink`; an arrow-cued linked card's title ends in the blue arrow (`--bcrd-cue-ink`); a cta-cued card's cta at `--btn-link-primary-fg` |
| hover           | Pointer over a linked frame          | A cover scales to `--bcrd-media-zoom` inside the still, ruled box; an arrow-cued title joins its arrow at `--bcrd-title-ink-hover`. A cta: its underline wipes in (Button) |
| focus, keyboard | `:focus-visible` on the linked frame | Everything hover does, plus the paired ring (`--bcrd-ring-color`, `--bcrd-ring-gap-color`) |
| pressed         | Pointer activation on a linked frame | **Distinct from hover (cmp-feature, audit check 9):** an arrow-cued title AND its arrow step to `--bcrd-title-ink-pressed` (brandeis-700 on light surfaces, 100 on ink and blue); the zoom holds. A cta steps to Button's pressed colour |

The cover's hover is deliberately quiet: the zoom, plus the title and arrow going blue (visual-direction
§ 3.1, 6 Oct 2026). A darker rule and a title underline were built on 29 Sep and removed the same day at
the owner's review as too loud; neither returns without a new decision. Hover is still not colour-only:
the zoom is a shape change.

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
| `--bcrd-title-ink-hover`  | `--color-brandeis-500` — 6.17:1                 | `--color-brandeis-500` — 5.51:1                 | `--color-brandeis-300` — 7.32:1                 | `--color-brandeis-50` — 5.57:1              |
| `--bcrd-title-ink-pressed`| `--color-brandeis-700` — 10.07:1                | `--color-brandeis-700` — 8.99:1                 | `--color-brandeis-100` — 13.61:1                | `--color-brandeis-100` — 4.91:1             |
| `--bcrd-cue-ink`          | `--color-brandeis-500` — 6.17:1                 | `--color-brandeis-500` — 5.51:1                 | `--color-brandeis-300` — 7.32:1                 | `--color-white` — 6.23:1                    |
| `--bcrd-mark-ink`         | `--color-brandeis-500` — 6.17:1                 | `--color-brandeis-500` — 5.51:1                 | `--color-brandeis-300` — 7.32:1                 | `--color-white` — 6.23:1                    |
| `--bcrd-body-ink`         | `--color-neutral-700` — 8.14:1                  | `--color-neutral-700` — 7.27:1                  | `--color-neutral-300` — 11.07:1                 | `--color-brandeis-50` — 5.57:1              |
| `--bcrd-eyebrow-ink`      | `--color-neutral-600` — 4.92:1                  | `--color-neutral-700` — 7.27:1                  | `--color-neutral-400` — 8.05:1                  | `--color-brandeis-100` — 4.91:1              |
| `--bcrd-media-rule-ink`   | `--color-neutral-300` — n/a, decoration         | `--color-neutral-400` — n/a, decoration         | `--color-neutral-700` — n/a, decoration         | `--color-brandeis-300` — n/a, decoration     |
| `--bcrd-text-rule-ink`    | `--color-neutral-300` — n/a, decoration         | `--color-neutral-400` — n/a, decoration         | `--color-neutral-700` — n/a, decoration         | `--color-brandeis-300` — n/a, decoration     |
| `--bcrd-ring-color`       | `--color-brandeis-500` — 6.17:1 against its gap | `--color-brandeis-500` — 5.51:1 against its gap | `--color-brandeis-300` — 7.32:1 against its gap | `--color-white` — 6.23:1 against its gap    |
| `--bcrd-ring-gap-color`   | `--color-paper` — paired ring 6.17:1            | `--color-paper-deep` — paired ring 5.51:1       | `--color-neutral-950` — paired ring 7.32:1      | `--color-brandeis-500` — paired ring 6.23:1 |

Eleven rows (`cmp-feature`, 6 Oct 2026: `-title-ink-pressed`, `-mark-ink` and `-text-rule-ink` added;
`-cue-ink` was declared since `fdn-media` and missing from this table). `--bcrd-title-ink-hover` is the
arrow-cued title's hover and focus ink, `-pressed` its press; `--bcrd-mark-ink` paints the icon and the
index numeral (§ 4.2: icons and numerals carry the accent); `--bcrd-text-rule-ink` the text-only card's
top hairline, on the same decoration ladder as the media rule. Revision 3 added the media rule, on the house rule ladder `--media-capture-rule-ink` also
uses, with no hover step; the card declares its own rather than reading Media's (token rule 6). `--bcrd-media-ink` went
with the icon fill in 2.10 (section 17 Q14). `--bcrd-link-ink`, `-hover` and `-pressed` were **deleted**: the cta is a link
`Button`, so its three steps per surface come from `--btn-link-neutral-fg{,-hover,-pressed}` in
`button.css` (`-primary-` until 6 Oct 2026, `fdn-colour`). The card no longer has a link-coloured part of its own, and a colour nothing paints is
a colour something paints again. `BlockCard` does not read those `--btn-*` names either — it carries
`data-btn-link-group` and `Button`'s own stylesheet resolves them.

`--bcrd-eyebrow-ink` is the one new token this redesign asks for, and it is not a new colour: it is
the same quiet-label ramp already declared by `--crumb-link-ink` and `--foot-label-ink`, aliased
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

- Card-to-card seam, vertical grid: parent `Layout colGap="gutter" rowGap="column"`; no BlockCard
  node carries outer spacing. With the edge gone these two gaps are the entire boundary between two
  cards, which is why they are required rather than conventional. Across a row the cards are peers
  at 32; down the grid each row is the next set of objects at 64, the row seam of every borderless
  card set (CLAUDE.md's `--gap-column` row; `gutter` until 29 Sep, written in on 5 Oct).
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
- Eyebrow to title, and title to body: one nested `Layout rowGap="text"` (16; `tight` until 5 Oct,
  S2). All three copy parts are one group; the eyebrow is a label on the title, not a third block.
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
  rowGap="text" align="start"` (`tight` until 5 Oct, S2). The same 64 between the halves; collapsed,
  the head and body meet at `text`, which is exactly the eyebrow/title/body relationship of a tile, so a collapsed
  featured card reads as a vertical one. Body to cta inside the second half stays `block`.
- Featured row to its peers: the set's `rowGap="column"`, the same 64 as between any two rows of
  cards. The featured card is one of the set, not a band above it, so it takes the set's seam.

### (b) Component sizes

- A card, at any `size`, has no fixed inline or block size and fills the track and equal row its
  parent `Layout` provides. `size` steps type only (Amendment · 5 Oct 2026).
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
| `title`, `lg`    | `--text-h4`; horizontal `--text-h3` | `--text-h4-tracking`; horizontal `--text-h3-tracking` | none — the track (Rev. 3) |
| `title`, `md`    | `--text-h4`      | `--text-h4-tracking`                       | none — the track (Rev. 3) |
| `title`, `sm`    | `--text-h5`      | `--text-h5-tracking`                       | none — the track (Rev. 3) |
| `body`, `lg` / `md` / `sm` | `--text-body-lg` / `--text-body` / `--text-body-sm` | none — these roles have no tracking companion | `--measure-body`  |
| `eyebrow`        | `--text-eyebrow` | `--text-eyebrow-tracking`                  | none              |
| `cta`            | `Button`'s own   | `Button`'s own                             | none              |
| Image media      | none             | none                                       | none              |

The horizontal row defaults to the `lg` step (it was the h3 role through
`--bcrd-title-text-horizontal`, 2.10, until 5 Oct). A row spanning the column beside its cover, or a
head set beside its body, is a heavier object than a 286px tile, and ruling C2 puts that weight in
type scale rather than in a box. Every title role re-declares itself at 1023 and 767.

The component aliases its roles through `--bcrd-title-text-{lg,md,sm}`,
`--bcrd-title-tracking-{lg,md,sm}`, `--bcrd-body-text-{lg,md,sm}`, `--bcrd-eyebrow-text` and
`--bcrd-eyebrow-tracking`. It declares nothing for the
cta: `--bcrd-cta-text` and `--bcrd-cta-tracking` were deleted along with the bespoke cue, because
`Button` reads `--btn-text-md` and `--btn-text-tracking` and a card-side alias could only disagree
with it. `titleAs` changes the heading level, never the visual role. The vertical card's scale
steps with its row (5 Oct 2026, visual-direction § 7.2): `md` (h4) for two or three peers and for
every text-only card, `sm` (h5) at a 286px four-across track, where an h4 title on two lines
outweighed the 286px object it named. A text-only card stays at h4 at any count: with no image to
carry it, that weight is what keeps it an object without relying on a fill. The horizontal
orientation's `lg` (h3) is what keeps it from reading as a `ListCard` row.

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
| 3     | `{ base: 1, md: 3 }`        | 3                      |
| 4     | `{ base: 1, md: 2, lg: 4 }` | 2                      |
| 5+    | `{ base: 1, md: 2, lg: 3 }` | 3                      |

`tracks` is the widest count the shape reaches before `xl`; the four-across row reads the two-track
value and over-fetches, which is the safe direction.

Exactly three peers go three across from `md` (cmp-services, 6 Oct 2026): two from `md` put the third
card alone on a second row beside an empty cell from 768 to 1023, an orphan in every three-card set
site-wide. The price is a ~213 track at 768, where a two-word title may wrap to two lines and drop
that card's body below its neighbours'; that is accepted over the orphan. Five and more keep two from
`md`, because their rows are full or end on a pair. Four have been four across from `lg` since
cmp-feature fix round 2.

**The phone rail (cmp-services fix round 2).** Wherever the set is a phone scroll row (below 768: a
covered set of three or more, a linked set of four or more), it carries a progress rail a `stack`
under the cards: a `--bcrd-rail-length` neutral line with a blue thumb one card's share long, moved
along the row's inline scroll timeline by CSS alone (`BlockCardSet.module.css`). The peek said there
was more; the rail says how many and where the reader is, so a six-service router no longer reads as a
three-card one, and the Slider and the scroll row read as one family. Hidden from `md`. Decorative
(`aria-hidden`); the cards are a list a screen reader already counts. From four items the first is
featured and spans the row through `Layout lead`; below `md` it collapses like any horizontal card,
so a phone sees one column of cards with the featured one first.

A caller that is not a set — a hand-built grid — owns reflow itself:

- Two-card clusters: `columns={{ base: 1, md: 2 }}`.
- Three-card clusters: `columns={{ base: 1, md: 3 }}` — three across from 768, never two and an
  orphan (cmp-services, 6 Oct 2026).
- Four-card clusters: `columns={{ base: 1, md: 2, lg: 4 }}`. They read 2×2 from 768 through 1023
  and one four-card row from 1024 (cmp-feature fix round 2).
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
<Layout as="ul" columns={{ base: 1, md: 2, xl: 4 }} colGap="gutter" rowGap="column" equalRows>
  <li>
    <Frame as={href ? 'a' : 'div'} data-btn-link-group={href ? true : undefined}>
      <Layout rowGap="block">
        {image}
        <Layout rowGap="block">
          <Layout rowGap="text">{/* tight until 5 Oct 2026, S2 */}
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
<Layout as="ul" columns={peerColumns} colGap="gutter" rowGap="column" equalRows lead>
  <BlockCard {...items[0]} orientation="horizontal" imageSide="left" size="lg" />
  {items.slice(1).map((item) => (
    <BlockCard key={item.id} {...item} tracks={peerTracks} size={peerSize} />
  ))}
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

Rewritten 6 Oct 2026 (cmp-feature fix round 2) to match the **Current contract** block at the top,
so every check here is a grep or an inspection that holds against the build as it is. The earlier
list is in git history; where it and the amendments disagreed, the amendments had already won.

**Do**

1. Put every group in `BlockCardSet` (or, for a hand-built row, `Layout as="ul"` with explicit
   columns, `colGap="gutter"` and `rowGap="column"`), and let the set pass `size`, `ratio`, `tracks`,
   `index`, `cue` and `titleAs`. Expect `equalRows` on every set except an icon set, whose rows sit on
   their content a `stack` apart.
2. Render four peers as two columns from `md` and four from `lg`; inspect 767, 1023 and 1024 and expect
   no three-column orphan.
3. Crop every cover to its set's ratio: 3:2 for one or two and the row, 16:9 for three or more across,
   21:9 for a spotlight lead, 2:1 and 1:1 in the wide lead's row from 1024. Expect a `Media` `<img>`
   with `loading="lazy"`, a `srcset` where the record has sources, and the placement's `sizes`.
4. Give a linked card exactly ONE cue: the arrow after the title's last word (default with a cover or
   an icon), the link-style cta (default text-only), or `download`. Count nested anchors and buttons
   and expect none; `data-btn-link-group` appears on exactly the anchors that contain a cta.
5. Show a static card as a complete object with no blank action row.
6. Render identical markup on all four surface bands and inspect all eleven `--bcrd-*` colour tokens
   (Current contract) plus the cta's three `--btn-link-primary-fg*` steps, including a nested surface.
7. Use `titleAs` to match the outline (`h2` only where the set is the page's list under its h1).
8. Expect the title's REST ink to be `--bcrd-title-ink` linked or not, and the arrow (`.cue`, after a
   non-breaking space) to be `--bcrd-cue-ink` at rest.
9. Point at a linked card: expect the cover to scale to `--bcrd-media-zoom` inside a still box, and an
   arrow-cued title and its arrow to take `--bcrd-title-ink-hover`; press and expect
   `--bcrd-title-ink-pressed` on both, the zoom held. Under reduced motion expect no transform.
10. Render a featured set (`lead="auto"`, four or more) and expect one `ul`, the first `li` spanning
    every track and horizontal. Render the spotlight (`lead="beside"`), the wide lead (`lead="wide"`)
    and `stagger`, and expect one `ul` each, with the placement written by Layout, never by a card.
11. Name an unlinked covered set of three or more with `label`: below 768 it scrolls, takes
    `tabIndex={0}` and carries `aria-label`.

**Don't**

12. Do not give the CARD an edge: no border, outline (outside `:focus-visible`), box-shadow beyond the
    ring, ground, radius or `--bcrd-edge-*` / `--bcrd-radius` / `--bcrd-shadow` token. Search the
    module for `border` and expect exactly three uses, all argued: `border` on `.imageMedia` (the crop
    box's hairline, ch05 amendment 5a), `border-radius` on `.imageMedia` (`--bcrd-media-radius`), and
    `border-block-start` on `.textRule` (the text-only card's top hairline, § 3.1). Anything else is the
    edge coming back.
13. Do not underline the title or give it a link ink at rest. What moves, and nothing else: the cover's
    zoom (hover, focus, press), an arrow-cued title-and-arrow's hover step and its pressed step, and
    the cta's own Button steps. A cta-cued title never moves.
14. Do not restyle the cta from this component: no `.cta` class and no `--btn-*` name in the module.
15. Do not render the cta as anything interactive (`as="span"` only); one tab stop per linked card.
16. Do not put type on an image; the content block follows the media, never overlays it.
17. Do not import a pattern or `@/content`. `BlockCardSet` never imports `Slider`: a set of five or
    more image cards in a feature band is a Slider the PAGE composes around BlockCards.
18. Do not add margin or hand-written grid or flex arrangement; every arrangement is a Layout prop
    (`lead`, `stagger`, `fillFirst`, `scroll`). Padding appears once, on `.contained`, the inset of a
    contained cover inside its own ruled box.
19. Do not add `surface`, `bordered`, `columns`, `equalHeight`, `children`, `className` or `style` to
    the public props, and do not widen `size` past `'lg' | 'md' | 'sm'`. `cue`, `ratio`, `index`,
    `meta`, `icon` and `grow` ARE public (the set passes them); a `BlockCardSetItem` cannot carry the
    presentation props (`orientation`, `imageSide`, `tracks`, `size`, `ratio`, `index`, `cue`,
    `titleAs`).
20. Do not clamp titles, bodies or eyebrows, or hide cards past a count.
21. Do not let `size` reach an icon set: icon cards are h5 and body-sm (§ 1.4) whatever the set is
    passed.
22. Do not mix a line-drawn glyph into an icon-card grid beside solid ones (code, checklist, refresh,
    cpu); use the solid forms (`code-square`, `clipboard-check`, `refresh-square`, `stars`).
23. Do not add a `featured` prop to the card or the CMS record; featuring is the set's, by position.
24. Do not set `object-fit` or select Media's `<img>` here. The module owns the crop BOX (ratio,
    hairline, radius, inset, zoom span); Media owns the image inside it.
25. Do not bring back an icon fill, and never put a glyph in a disc (ch04). A texture cover's glyph sits
    on the texture, not in a container.

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
    map.** 19. **Adjacent boundary.** 20. **What a static page cannot force.** 21. **The case-study
    index** (29 Sep). 22. **Size steps with the count** (5 Oct 2026): one record at `lg`, `md` and
    `sm`, with a cover and text-only, then `BlockCardSet` at 3, 4, 5 and 6 items picking the step.

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
declared by `--crumb-link-ink` in `breadcrumbs.css` and `--foot-label-ink` in `footer.css`, at
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

**19 · The featured row's seam — `gutter`. Non-blocking. Superseded 29 Sep 2026: every row of the
set, the featured one included, is `column` (64) apart; see the 5 Oct amendment, item 4.** The featured card takes the set's 32 like
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
6. **`BlockCardSet` rows are a `column` (64) apart; columns stay a `gutter` (32).** (`stack`, 48,
   was tried first and still read as one field.) Across a row the
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

9. **One media ratio, 3:2, in both orientations** (owner, 29 Sep). `--bcrd-media-ratio-vertical` and
   `-horizontal` collapse to `--bcrd-media-ratio` (→ `--ratio-cover`), and `.imageMediaHorizontal` is
   gone. The row's 4:3 existed to match a tall copy column; one-line copy no longer needs it, and one
   crop means a cover reads alike in the featured row and the tile. It supersedes the 4:3 rows in
   sections 2, 4 and 7 and the amendment-4 inset arithmetic for the row.
10. **The fill crop is anchored at `0 20%`**, not the centre (Media's `--media-fill-position`).

11. **The image's crop box takes `--radius-8`** (`--bcrd-media-radius`, owner 29 Sep, ch05 amendment
    5b). The frame stays square (`--bcrd-radius`, 0) and so does the focus ring.

12. **The index hero is name-then-message** (template, not PageHero). `CaseStudyIndex` takes
    `hero: { name, message }`: the message is the h1, the name ("Selected case studies") the eyebrow,
    and there is no hero action, so the page asks the visitor to read a case study before anything
    else. The same arrangement suits every index page type whose label is not its argument; it is
    each template's decision as it is built, not a PageHero default (strapi-changes §14).

Specimen: band 21 (the case-study card at the corpus's extremes, the 87-character title at 326, no
eyebrow);
bands 6, 8 and 12 re-captioned for the rule, the cta rule and the new states.

## Amendment · 6 Oct 2026 — `fdn-colour` (visual-direction § 4.2, § 4.3)

- **The cta takes the neutral tone.** `tone="primary"` → `tone="neutral"` in `BlockCard.tsx`, so the
  label and its `arrow-right` are `--btn-link-neutral-fg` at rest (neutral-900 on paper and tint, white
  on ink and blue) and step to blue only through `data-btn-link-group` on the card's hover, focus and
  press (brandeis-500 / 600 on paper and tint, 300 / 200 on ink, 50 / 100 on blue).
- **Why.** § 4.2 puts "every per-card CTA" on the neutral link, and § 4.3 says "card arrows at rest are
  ink". A primary cta painted one blue label and one blue arrow per linked card at rest, which is the
  spray § 4 rules out; the whole-card hover cue is blue's Free row, so a linked set now spends nothing
  in the band rule.
- **What does not change.** Still no `ctaTone` prop: the tone is the system's decision, not the
  caller's. The title still holds `--bcrd-title-ink` linked or not. The whole-card arrow after the
  title (§ 3.1) is `cmp-feature`'s, and lands with its BlockCard changes.
- Updated in place: § 3's "Deliberately not props", the § 6 colour-table note, the § 10 sketch, § 14
  check 6, the `block-card.css` comment, and the specimen's nested-surface token list and notes.

## Appendix — self-audit

```
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states Tier 2 pattern, Status implemented, token prefix --bcrd-*, and the Cards 1a
    revision date; the prefix has no repository collision.
[x] Every Anatomy part appears in colour, geometry, or is explicitly marked as carrying no value.
    The removed `edge` part is named as removed rather than deleted silently.

NAMES
[x] The component layer DECLARES 27 distinct --bcrd-* tokens after fdn-spacing (recounted from the
    layer on 6 Oct 2026). It held 23 before this package; the size step's nine
    --bcrd-{title-text,title-tracking,body-text}-{lg,md,sm} replaced the five unsuffixed and
    -horizontal names, net +4. The 18 this line carried was 2.10's count and was not updated as the
    media rule, zoom and ring tokens arrived. The document also names the
    nine removed ones as removed rather than deleting the record of them; section 16 lists both
    groups. Every declared name appears verbatim in docs/vocabulary.md AFTER regeneration, so the
    vocabulary must be regenerated and pushed — section 16 says so.
[x] Eleven --btn-* names appear, all in prose explaining what Button supplies. NONE appears in this
    component's stylesheet or token layer: the cta is wired with the data-btn-link-group attribute,
    not by reading Button's tokens.
[x] Named glyphs are existing: arrow-right, arrow-left, and the IconName union's 17 glyphs.
[x] Section, Layout and Button props/values are existing unions: as, rowGap, colGap, columns,
    equalRows, align, emphasis, tone, icon; text, block, gutter, column, section, center; base, md,
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
[x] Specimen plan covers the one finish, all three sizes (5 Oct 2026), both orientations and both image sides, all media
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

## Amendment · 6 Oct 2026 — `fdn-media`: the empty frame, and stand-in covers (visual-direction § 5.7)

**The empty frame was the capture, not the card.** The review shots showed every case card on a service
page as a hairline box with nothing in it. BlockCard already renders no media slot when a card has no
image (`hasImage`), and the covers were real: each is a `loading="lazy"` image, and a full-page screenshot
never scrolls, so nothing below the first viewport was ever requested. `scripts/shots.mjs` now switches
every lazy image to eager and awaits `decode()` before capturing. No component change was needed; the
contract stands and is restated: **no image means no media slot, never an empty one.**

**Stand-in covers.** A card with no cover now takes a catalogue photograph instead of losing its image
(§ 5.7), assigned by the page — on service pages by `templates/ServicePage/standIns.ts`, from the story's
pool, in the page's tone family, quiet, at ≥ 1.9× the card's box. It reaches BlockCard as an ordinary
`media.image` record with `kind: 'photograph'`, a `focus` and `standIn: true`; it is not labelled. Because
Media's `fill` now anchors at the record's focus when it has one, a stand-in crops on its subject while a
product-UI cover keeps the 29 Sep top-left anchor. The card's crop box keeps its own hairline and 8px
radius (ch05 amendment 5a), so a stand-in looks like any other cover.

**The gap this opened, closed in the fix round below.** A covered linked card shows no cta (29 Sep), so a
resources card that gained a stand-in also lost its named line ("Read the article"), leaving the image as
its only rest affordance.

## Amendment · 6 Oct 2026 — `fdn-media` fix round: the arrow cue, whole-set stand-ins, placeholder sizes

**The arrow cue (visual-direction § 3.1), brought forward from `cmp-feature`.** Stand-ins put a cover on
every service page's Resources cards, and under Revision 3 a covered card drops its cta, so the regression
was this package's to close. The cause is that a covered linked card had no affordance at rest, and the
fix is at the card, for every covered linked card on every route:
- The title ends in an ink `arrow-right` joined to its last word by a non-breaking space, so the glyph
  never wraps alone. It is ListCard's link cue, so the kit has one. Icon `xl` (24) beside the `lg` and `md`
  titles, `lg` (18) beside `sm`, which draws a glyph about the title's x-height wide. It sits in an
  inline-block span (Icon's `<svg>` is `display: block`) at `vertical-align: middle`, centred on the
  lower-case letters, and is hidden: the link's name is the card's words.
- On hover, focus and press the title and arrow take `--bcrd-title-ink-hover` — brandeis-500 on paper
  (6.17:1) and tint (5.51:1), brandeis-300 on ink (7.32:1), brandeis-50 on blue (5.57:1) — while the image
  leans in. Blue's Free row (§ 4.2), so a linked set still spends nothing in the band rule. No pressed
  step: the title holds hover on press.
- A text-only card is unchanged: its cta is the cue and its title holds `--bcrd-title-ink`. A card never
  has both, and a static card has neither.
- `cmp-feature` inherits this rather than building it; its remaining BlockCard work is the text-only
  card's top rule (§ 3.1).

**Stand-ins never take a § 5.6 slot photo.** Pools reused other pages' B, I, K and aside stock picks,
which § 5.1 rule 4 forbids. `src/lib/photos.ts` now holds § 5.6's table (`SERVICE_PHOTO_SLOTS`) and the
stock photos in it (`RESERVED_STOCK`); `pickStandIn` refuses those on every page and the template seeds
each page's used set with its own slot photos, so the rule holds whatever a pool names.

**A set takes stand-ins whole or not at all** (§ 3.1, "a set is all-image or all-text"). When the pool
cannot cover every coverless card in a set, none of them takes one and every card in it drops its media,
so the set renders as text cards with their named cta. No set renders that way today, because every case
card takes its real cover from the listing; the nearest edge is ai-product-ux, where four photographs
qualify on a cool page and its three Resources cards take three.

**Placeholder sizes are flagged.** A record that arrives without dimensions is given its box's 3 × 2 and
now `placeholderSize: true`, so Media reports no `data-src-w` / `-h` for it and the resolution gate
never measures a 3px master.

## Amendment · 6 Oct 2026 — `fdn-blue` (supersedes the `fdn-colour` neutral-tone amendment)

Owner: blue is the recurring FOREGROUND accent — icons, text links, arrows, small marks — and is
never a ground. The text-only card's cta returns to `tone="primary"` (blue label and arrow at rest,
Button's `--btn-link-primary-fg{,-hover,-pressed}`). The covered card's arrow cue gets its own rest
ink, `--bcrd-cue-ink` (brandeis-500 on paper and tint, 300 on ink, white on blue); the title stays
`--bcrd-title-ink` at rest and joins the arrow in blue on hover and focus.


## Amendment · 6 Oct 2026 — `cmp-feature` (visual-direction § 1.4, § 3.1, § 3.3, § 3.7, § 7.2)

The feature family (C) and resources (M) are built on this card; `/design/kit/feature` renders all
twenty-one variations as live bands at their § 1.4 budgets.

**BlockCard, new props** (all presentation, never CMS fields):
- `ratio?: 'cover' | 'wide'` — 3:2 (default) or 16:9. Ignored when horizontal.
- `icon?: IconName` — the icon card's head glyph, 32 (`--bcrd-icon-size` = `--icon-size-32`, a new
  primitive), blue (`--bcrd-mark-ink`). Ignored when a cover is present. An icon card takes no hairline.
- `index?: number` — a mono numeral set `01`, blue, above the title; beside an eyebrow a `block` apart.
- `cue?: 'arrow' | 'cta'` — the linked card's one cue. Defaults unchanged for every live route.
- `titleAs` gains `'h2'`, for a set that is the page's list directly under its h1 (`/case-studies`:
  axe heading-order had h1 → h3).

**The text-only hairline.** A card with no cover and no icon draws `.textRule` — a block span with a top
border, `--bcrd-text-rule-width` / `-ink` — as the first row of its frame Layout, so the 24 under it is
the Layout's `block` seam. Applies in both orientations, so every text-only card on every live route
gains it (§ 3.1 is a system rule).

**Pressed (audit check 9).** Hover was held through press, so a covered linked card rendered no press at
all. Now `.root .link:active .cued` and `.cue` take `--bcrd-title-ink-pressed`, after the hover rule at
equal specificity; the module header's rule-order comment was stale (it described a split that had been
merged into one list) and now describes the split that exists.

**Deleted:** `--bcrd-radius` (0) and `--bcrd-shadow` (none). The frame declares neither; an absence needs
no token, and a token that states one invites the value back.

**BlockCardSet, new props:** `lead: 'auto' | 'none'` (feature bands pass `none`; C3 stays the default for
the case-study index); `across: 2 | 3 | 4` (a beside body passes 2); `size` pass-through; `standIns:
BlockCardImage[] | false`; `numbered`; `cue`; `titleAs`.

**The step follows the track, not the count.** Icon cards `sm`; text cards `md`; image cards `sm` at four
across and `md` at two or three — so six to eight image cards in rows of three (or a Slider of three)
are h4 at 392, which is § 1.4's Card-3 the band is budgeted on. Before, four peers or more stepped to
h5 by count.

**Crop by the set:** 16:9 whenever the widest track count is three or more; 3:2 for one or two and in the
featured row.

**Mixed sets settle before render (§ 3.1, § 5.7).** Some covers missing: a pool of `standIns` fills each
gap in order (marked `standIn`, unlabelled), or — no pool, too short a pool, or `false` — every card drops
its cover and the set renders as text cards. A set with no covers at all takes stand-ins only when the
pool covers every item (M before real covers). Icon items are never given one.

**Phone scroll row (§ 3.7 item 2).** A set whose every item is linked, with more than three items, is
Layout `scroll="until-md"`; icon sets of up to six stay stacked, as do unlinked sets.

**Not in BlockCardSet:** the Slider. Five or more image cards are a Slider of BlockCards composed by the
page; a pattern does not import a pattern.

**Open for the owner (not blocking).** At 390, three specimen bands run past § 3.7's 1700: C-image-4
unlinked (~1815), C-icon-6 with its aside (~1805) and the four-kinds set (~1904). Each is stacked by rule
(unlinked, or an icon set ≤ 6). Either those sets may scroll on a phone too (Layout's `tabIndex` exists
for an unfocusable row, but the row then needs a name Layout cannot yet take), or 1700 admits them.

### Appendix re-run (6 Oct 2026)

```
[x] The layer DECLARES 37 distinct --bcrd-* tokens (recounted from the layer, comments stripped).
    cmp-feature added eight (media-ratio-wide, text-rule-width, text-rule-ink, icon-size,
    index-text, index-tracking, mark-ink, title-ink-pressed) and deleted two (radius, shadow).
    The 27 recorded after fdn-spacing predates fdn-media's cue-ink and title-ink timing pair.
[x] Eleven colour tokens, each declared in all four surface blocks; tokens:check passes surface
    self-containment.
[x] Every state token moves on at least one surface: title-ink-hover and title-ink-pressed differ
    from title-ink everywhere.
[x] No margin, no hand-rolled arrangement: .frame, .imageMedia, .imageZoom, .textRule and .icon set
    display: block as sizing, each with its comment.
[x] docs/vocabulary.md regenerated in the same change.
```

## Amendment · 6 Oct 2026 — `cmp-feature` fix round

Supersedes the phone-scroll rule and the open question in the amendment above.

- **`BlockCardSet lead="beside"`** — the spotlight. From 1024 the first card takes a 2:1 track at 21:9
  and `lg`; the rest stack beside it as text cards (their covers dropped, never stood in). Built on
  Layout `lead="tall"` (the first child spans every row; read from the DOM up to six children).
- **`ratio: 'panorama'`** (21:9, `--bcrd-media-ratio-panorama` = new primitive `--ratio-panorama`) for
  that lead: at 802 a 16:9 cover is 451 and the band ran past the fold.
- **Illustration and cut-out covers are not cropped.** Media gains `fit="contain"`; the card pads the
  ruled box by `--bcrd-media-inset` (`--gap-text`). The cover crop took the label off the drawing and
  the run button off the part. Photographs and captures still cover-crop.
- **Texture covers.** `media: { type: 'texture', recipe?: 0 | 1 | 2 }` draws the Texture primitive in
  the ruled box, the card's icon centred on it at `--bcrd-cover-glyph-size` (48 then; 80 in its corner since fix round 2).
  `BlockCardSet standIns="texture"` gives every missing cover one, the three recipes in turn: the
  resources band (M), where a stock photograph said nothing about the file.
- **`cue: 'download'` and `meta`.** The cta with the download glyph and "Download", and a mono format
  line ("PDF · 12 pages") beside it on the action row, in the eyebrow's ink.
- **Phone scroll row, revised.** Below 768: a covered set of three or more scrolls, linked or not; a
  linked set of four or more scrolls whatever it holds (icon sets included). Otherwise stacked. An
  unlinked scroll row takes the tab stop itself (Layout `tabIndex={0}`, WCAG 2.1.1). This closes the
  open question above: the three bands that ran past 1700 at 390 are now rows.
- **Icon sets** sit a `stack` (48) apart down the grid rather than a `column`: a 32 glyph, an h5 and two
  lines are smaller objects than a covered tile, and 64 read as four loose items.
- **Eyebrows stay ink** on every surface (fdn-blue: words are ink, blue is for marks); an unlinked set
  that needs colour takes `numbered`.
- **Hover covers the arrow.** `.cue` is named beside `.cued` in the hover and pressed rules: it carries
  its own rest ink, so on blue a hover that coloured only the title left a white arrow behind.

Outside BlockCard, for its bands: ContentSection gains `headingSize="display"` (retired in home round 5, 11 Oct 2026, for `headingSize="xl"`, the h1 role) (the band's h2 at
`--text-display`) and `asideFill` (the C-icon head-track photograph ends on the body's last line).


## Amendment · 6 Oct 2026 — `cmp-feature` fix round 2

From a three-lens review of `/design/kit/feature`. Each note, its cause, and the fix where the cause
lives.

- **One rectangle, many times** (13 of 22 bands an equal 3- or 4-up row) — the set had one asymmetric
  shape. Two more: **`lead="wide"`** ([2, 1, 1] from 1024; the lead at 2:1, the companions 1:1, one
  cover height because a 2fr track is two 1fr tracks and a gutter; `lg` over `sm`; three covered items
  exactly, else `none`) and **`stagger`** (Layout `stagger`: the even cards drop 96 from 1024 as a
  track, not a margin; one row). New ratios `double` and `square` (`--bcrd-media-ratio-double` /
  `-square`, this layer only — one reader each). The kit page interleaves the three asymmetric shapes
  between the equal rows.
- **Spotlight dead strip at 1024** — the lead's cover was a fixed 21:9 under taller notes. `grow` (set
  by the spotlight) makes the frame stack fill the stretched card and its first row take the spare
  height (Layout `fillFirst`), never below 21:9.
- **Icon titles one size** — `size` reached icon sets (`size="md"` on one band). The set now ignores it
  for icon cards: h5 and body-sm always.
- **Uneven icon rows under asideFill** — `equalRows` on an icon set gave every row the tallest card's
  height. Icon sets drop it; rows sit on their content, one `stack` apart.
- **Mixed icon weights** — four line-drawn Solar Bold glyphs sat beside solid ones. Four solid forms
  join the set (`code-square`, `refresh-square`, `stars`, `clipboard-check`, Solar Bold verbatim);
  icon grids use them.
- **Resource covers read as placeholders** — fields blurred 60 to 70 never reached full strength and a
  48 glyph floated mid-well. Fields now hold the grid at full strength over half the box (blur 24 to
  32 at first, then hard-edged blocks: a panel, a band, a step), and the glyph is about a fifth of the
  cover's width (`--bcrd-cover-glyph-size: 20.5cqi`, the cover a size container; 80 at 390, 57 at
  the phone's 270; the 48 primitive deleted) in the foot-start corner at `block` (`--bcrd-cover-inset`).
- **Contained kinds as thumbnails** — a whole hero drawing and a whole workflow canvas in a 286 card.
  The kit supplies each cut to one region (`illustration-design-systems-card.svg`,
  `cutout-flow-card.png`), and `--bcrd-media-inset` steps to `tight` (8).
- **Four-up image walls at 1024** — four across from `lg`, not `xl`.
- **Unlabelled tab stop** — an unlinked scrolling set took `tabIndex` with no name. `label` passes
  `aria-label` through Layout (new `aria-label` prop); missing, it warns in development.
- **Phone row off the gutter and clipped hard** — Layout's phone scroll row now bleeds through the
  gutter to the screen edge and sizes itself (`justify-self: stretch`), so a centred head's
  `inline-size: 100%` no longer pins it 4px inside the column.
- **Barrel** — `BlockCardTextureRecipe` is exported from `@/patterns`.

### Appendix re-run (fix round 2)

§ 14 was rewritten against the build: the `border` grep now expects the three argued uses, `cue`,
`grow` and `ratio` are listed as public, and the pressed step is in the list of what moves. Gates:
`npm run verify` green; every band of `/design/kit/feature` at 1470 is 565 to 828 tall; no horizontal
overflow at 1470, 1440, 1024 or 390; every phone scroll row's first card starts at the 32 column edge
and its box spans 0 to 390. `/case-studies`' card list is the fold rule's stated exception (an index
list, `data-fold-exempt` in CaseStudyIndex) and the route is now in `fold.config.json`.

## Amendment · 6 Oct 2026 — `page-product-design` fix rounds 1 and 2

- **`BlockCardSet scroll?: 'auto' | 'never'`.** `auto` (default) keeps the § 3.7 phone scroll row for
  a linked set of four or more and a covered set of three or more. `never` keeps the set stacked
  below 768. The service page passes it for its router (fix round 1: one and a fifth of six services
  showed above a progress bar), its cases and its resources (fix round 2: a page's cases are its
  proof, and a scroll row hid two of three behind a gesture).
- **Phone icon-card head.** Below 768 an icon card sets its glyph BEFORE the title, on the title's
  row (`[1, 7]`), rather than on a 48 row of its own above it. A six-card router stacked at 390 ran
  past the 1700 phone ceiling with the glyph above; beside the title it holds. From 768 the glyph
  sits above the title as specified.

## Amendment · 7 Oct 2026 — owner review: no title arrow; the boxed card

Owner decisions of 7 Oct 2026. Where anything above differs, this section wins.

### 1 · No arrow after the title

The blue arrow after a covered, icon or arrow-cued text card's title (`fdn-media` fix round, 6 Oct)
stood on nearly every card in the kit and read as bulky; the whole card is already the link. So:

- **`BlockCardCue` is `'title' | 'cta' | 'download'`.** `arrow` is renamed `title` and renders no glyph:
  the title is the cue. On hover and focus it takes `--bcrd-title-ink-hover` (a cover leans in, as
  before), on press `--bcrd-title-ink-pressed`. The default is unchanged in shape: `title` on a card
  with a cover or an icon, `cta` on a text-only card.
- **`--bcrd-cue-ink` is deleted** from all four surfaces, with the `.cue` rule and `CUE_SIZE`.
- **Where a card needs a visible action, it takes the cta** (`cue="cta"`, `ctaLabel`): the link `Button`
  with its arrow — the link button is the arrow-carrying control — at the card's foot. Opt-in, for cards
  whose action is not obvious from the title; a card whose title names its destination needs none.
  Call sites changed: `kit/feature` (two sets, `cue="arrow"` → `cue="title"`) and the specimen.

### 2 · The boxed card: `frame="box"`

A partial reversal of "a card is never a box" (visual-direction § 3.1, amended the same day).

- `BlockCard frame?: 'none' | 'box'`, default `none`; `BlockCardSet frame` sets it for every card (it is
  a set's decision, and `BlockCardSetItem` omits it).
- **Box:** a `--bcrd-box-rule-width` hairline in `--bcrd-box-rule-ink`, `--bcrd-box-radius` (8, the
  photograph radius), `--gap-block` (24) inside on every side. A text-only card drops its top hairline
  (the box's top edge is that edge). A cover sits inside the inset.
- **Linked:** a `--bcrd-box-ground-hover` ground under the pointer and `--bcrd-box-ground-pressed` on
  press; the edge holds its ink; the title moves as on any title-cued card; the focus ring follows the
  radius.
- **In a set,** boxed rows sit a `gutter` (32) apart, the same as the column seam: the box is the
  separation, so the `stack` / `column` row seam an open set needs would leave the boxes floating.
- **Tokens, every surface** (paper / tint / ink / blue): `--bcrd-box-rule-ink` neutral-300 / neutral-400 /
  neutral-700 / brandeis-300 (decoration); `--bcrd-box-ground-hover` paper-deep / neutral-100 /
  neutral-900 / brandeis-600; `--bcrd-box-ground-pressed` neutral-100 / neutral-200 / neutral-800 /
  brandeis-700.
- **Where it is applied:** every icon router — ServicePage `Router` (`src/templates/ServicePage/Blocks.tsx`,
  so every service page's C-icon band, including product-modernisation's "When the layer is already
  clear"), and the kit's icon routers of four to six linked services: `kit/service-list` (C-icon-6 and
  C-icon-4), `kit/services-index` (C-icon-6) and `kit/feature` (variation 18, six services). Unlinked
  icon sets ("Four things you keep") stay open: they are not destinations.


## Amendment · r7-cards, 9 Oct 2026

Owner, 7 Oct review: the boxed card variant goes, and each icon is sized to the card title beside it,
from a token. `frame="box"`, `BlockCardFrame` and BlockCardSet `frame` are deleted with every
`--bcrd-box-*` token. The icon card's glyph sits on the title's first line, `tight` before it, and
`--bcrd-icon-size` is `1em` of the title role for the card's size step (22 sm, 28 md, 34 lg at 1440). An
icon card is opened by the same top hairline as a text card. No decorative image shares a section with
clickable cards; `/design/kit/services` shows the arrangement (eyebrow, heading, body, then 3/4/6 cards).
Where earlier sections describe the box or the 32 icon above the title, this amendment wins.

## Amendment · owner rulings, 9 Oct 2026 (supersedes r7-cards where they differ)

1. **The icon card stacks.** Glyph on its own row, then the title, then the body — never the glyph
   inline beside the title, in any frame or at any width. The glyph leads the head, above any eyebrow
   or index; icon to its copy is `--gap-text` (16), the head group's own seam, because the glyph is a
   row of the head and not a label (`tight` would weld it to the title as a bullet). Its size is
   unchanged: `--bcrd-icon-size` is `1em` of the title role for the size step (22 sm, 28 md, 34 lg at
   1440), and the glyph's box is the glyph's own size, with no line box round it.
2. **`frame="box"` stays, without its edge.** No border on any side, on any surface:
   `--bcrd-box-rule-width` and `--bcrd-box-rule-ink` are deleted. It keeps its `--gap-block` inset,
   because the inset is what gives the hover ground somewhere to sit, and keeps
   `--bcrd-box-radius` (8) as that ground's corner, `--bcrd-box-ground-hover` / `-pressed`, the
   title's accent on hover and the box-shadow focus ring round the inset.
3. **A set of clickable cards sits under its head**, full width — never in a track beside a heading,
   and never in a band with a decorative image (CLAUDE.md § Design quality; visual-direction § 1.4).
   ServicePage's C-icon router, list router and C-pair now stack their heads and take no photograph;
   so do `kit/service-list` 01 / 03 / 05, `kit/feature` 11 / 18 / 19, `kit/home` 11 and
   `kit/services-index` 6. An image may still sit beside non-clickable items (the B band).
