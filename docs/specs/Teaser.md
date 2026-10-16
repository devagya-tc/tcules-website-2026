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

One linked piece — an article, a guide, a video, an event — as it is listed on a curated page. The whole
item is one anchor; the title takes the accent on hover and focus and the picture leans in.

**Why not BlockCard or ListCard.** BlockCard draws a hairline over every text-only card and has no row
with an end thumbnail; ListCard rules every row. The owner's 16 Oct rulings ask for neither: an item is
bound by proximity (16 from picture to copy, 8 inside the copy, the set's 32/64 between items) and
anchored by what heads it. Teaser is that object, and only that object.

## 2 · Props

| Prop | Type | Notes |
|---|---|---|
| `title`, `href` | string | required |
| `meta` | `string \| string[]` | the mono label line; as parts it is joined with " · ", and a compact or row item keeps only the first part below 768 |
| `body` | string | sans; clamped to 3 lines at `md`/`sm`, 2 on a row |
| `media` | `{ type: 'image', image }` \| `{ type: 'sketch', name }` | the piece's OWN picture. Absent → typographic. No stand-in, no texture |
| `date` | `{ day, label, dateTime? }` | a date anchor (numeral over month) at the copy's head — events |
| `play` | boolean | a play chip on the picture; never on a row thumbnail or a phone's compact row |
| `arrangement` | `stack` (default) \| `beside` \| `row` | picture above / beside (two equal halves) / copy then an end thumbnail |
| `size` | `xl` \| `lg` \| `md` (default) \| `sm` | title h3 / h4 / h5 / h6; body steps with it |
| `compact` | boolean | a stack that becomes a row below 768 (secondary pieces only) |
| `titleAs` | `h2` \| `h3` \| `h4` | heading element; the scale is `size`'s |
| `as` | `li` (default) \| `div` | |
| `sizes` | string | the picture's `sizes`; the caller knows the track |

## 3 · Rules

1. One image ratio, 16:9, in a hairline box at the photograph radius (BlockCard's ruling, kept).
2. No margin, no ground at rest, no rule between items. The set owns every distance between items.
3. A set's pieces start on one top edge: a picture's top or a meta line's.
4. Every surface block in `teaser.css` declares every surface-dependent token.
