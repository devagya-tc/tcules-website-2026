# Teaser — pattern specification

## 0 · Front matter

| | |
|---|---|
| **Tier** | 2 pattern (`src/patterns/Teaser/`) |
| **Status** | implemented |
| **Token prefix** | `--tsr-*` (`src/styles/tokens/components/teaser.css`) |
| **Designer / date** | Claude Code, 16 Oct 2026, to the owner's rulings of the same day on the insights hub |
| **Implements** | "Items may take various shapes — one card design for everything is wrong. Hold each item without an edge: proximity and an anchor at its head. Far fewer lines. The serif only for titles. Every item that has an image shows it; items without one are typographic, never an empty box or a repeated stand-in." |
| **Specimen** | `/design/teaser` |

## 1 · Identity

One linked piece — an article, a guide, a video, an event — as a curated page lists it. The whole item
is one anchor; the title takes the accent on hover and focus and the picture leans in.

**Why not BlockCard or ListCard.** BlockCard draws a hairline over every text-only card and has no row
with an end thumbnail; ListCard rules every row. The owner's 16 Oct rulings ask for neither: an item is
bound by proximity and anchored by what heads it. Teaser is that object and only that object.

## 2 · Anatomy

`li` (or `div`) › `a` › Layout: [picture box (16:9, no stroke, radius 4, zoom span, optional play chip)]
+ copy Layout (`tight`): [date (numeral over month)] · [meta line] · title · [body].

## 3 · Props / API

| Prop | Type | Notes |
|---|---|---|
| `title`, `href` | string | required |
| `meta` | `string \| string[]` | mono label line; parts joined " · "; a compact or row item keeps the first part below 768 |
| `body` | string | sans; clamped to 3 lines at `md`/`sm`, 2 on a row |
| `media` | `{ type: 'image', image }` \| `{ type: 'sketch', name }` | the piece's OWN picture; absent → typographic |
| `label` | string | the format, where the set mixes formats: leads the meta line in the title's ink |
| `date` | `{ day, label, dateTime? }` | the date anchor: a row's marker column, else the copy's head (events) |
| `index` | string | an ordinal ("01") in a row's marker column: an indexed list |
| `play` | boolean | play chip; never on a row thumbnail or a phone's compact row |
| `arrangement` | `stack` (default) · `beside` · `row` | |
| `size` | `xl` · `lg` · `md` (default) · `sm` | |
| `compact` | boolean | stack only: a row below 768 |
| `titleAs` | `h2` · `h3` · `h4` | the element; the scale is `size`'s |
| `as` | `li` (default) · `div` | |
| `sizes` | string | the picture's `sizes`; the caller knows the track |

## 4 · Variants × sizes

`stack` at every size; `beside` at `xl`/`lg` (a section's feature); `row` at `lg` (dated events, thumb
15rem) and `sm` (lists, thumb 9rem). Title roles: xl h3 · lg h4 · md h5 · sm h6; body body-lg · body ·
body-sm · body-sm.

## 5 · States

Rest; hover and focus-visible (the title underlines in `--tsr-title-underline-ink`, drawn in by colour;
the picture scales to 1.02 inside its fixed box); focus ring on the anchor. No pressed, selected or
disabled state (beauty round, 16 Oct 2026: the title no longer turns blue — the blue is the page's
action).

## 6 · Per-surface colour

| Token | paper | tint | ink | blue |
|---|---|---|---|---|
| title-ink | neutral-900 | neutral-900 | white | white |
| title-underline-ink (hover) | neutral-900 | neutral-900 | white | white |
| body-ink | neutral-700 | neutral-700 | neutral-300 | brandeis-50 |
| meta-ink | neutral-600 | neutral-700 | neutral-400 | brandeis-100 |
| date-ink | neutral-900 | neutral-900 | white | white |
| label-ink | neutral-900 | neutral-900 | white | white |
| index-ink | neutral-600 | neutral-700 | neutral-400 | brandeis-100 |
| media-ground | paper-deep | neutral-100 | neutral-900 | brandeis-600 |
| play-ground / play-ink | paper / neutral-900 | paper / neutral-900 | white / neutral-900 | white / brandeis-700 |
| ring-color | brandeis-500 | brandeis-500 | brandeis-300 | white |

## 7 · Geometry & spacing

Picture to copy `text` (16); inside the copy `tight` (8); `beside` splits at `column` (64), the copy
top-aligned to the picture; `row` marker to copy and copy to thumbnail `block` (24), the marker column a
fixed width (`--tsr-marker-date-inline` / `--tsr-marker-index-inline`); a dated row's picture sits at
`column` from its copy and full width above it below 768. No stroke on the picture: its own edge, a 4px
radius and the tone ground. The item sets no outer spacing: the set's Layout owns 32 / 64 between items.

## 8 · Typography

Titles in the serif title roles, wrapped `pretty`; meta in the mono micro role and the date label in
the eyebrow role, uppercase by `--text-mono-case`; a mixed set's `label` leads the meta in the title's
ink; the day numeral in the stat role, in ink; an ordinal in the index role; body in sans. Never the serif for body copy.

## 9 · Responsive

`beside` stacks below md. `compact` stacks become rows below 768. Thumbnails drop to 6rem below 768,
where meta keeps its first part and compact rows drop the play chip. Title roles step themselves.

## 10 · Composition

Sets are Layouts the caller writes (rows of 2 or 3, a tall lead with minis, lists). A set's pieces share
one top edge — a picture's or a meta line's. Never mix Teaser with BlockCard in one set.

## 11 · Accessibility

One anchor per item; its accessible name is the meta line, title and body. The picture is decorative
(`aria-hidden`, alt cleared) because the words beside it carry the meaning. The date is a `<time>`.

## 12 · Content edge cases

Long and unbroken titles wrap (`overflow-wrap: anywhere`, balanced). No body: the title alone. No
picture: typographic, anchored by the meta line or the date. An event with no date: "—" over "Date TBC".

## 13 · Motion

The zoom (slow step) and the title's ink (fast step); both off under reduced motion.

## 14 · Do's and Don'ts

- Do give an item its own picture or none. Don't pass a stand-in photograph or texture.
- Do let the set own the distance. Don't add a margin or a rule between items.
- Do vary the arrangement across a page. Don't run one Teaser shape down a whole page.

## 15 · Specimen plan

`/design/teaser`: beside xl; a stack trio (picture, scene, none) with compact; the watched mosaic with
play; dated and list rows; and on all four surfaces a beside, a dated row, a list row and a trio.

## 16 · New token requests

None outside `--tsr-*`.

## 17 · Open questions

None blocking. A photograph-grade treatment (`--media-photo-grade`) applies through Media unchanged.
