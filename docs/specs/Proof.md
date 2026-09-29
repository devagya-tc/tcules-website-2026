# Proof

## 0 · Front matter

|                     |                                                       |
| ------------------- | ----------------------------------------------------- |
| **Component**       | `Proof`                                               |
| **Tier**            | 2 pattern (`src/patterns/Proof/`)                     |
| **Status**          | implemented · amended 28 Sep 2026 (tracker 2.12) and 29 Sep 2026 (tracker 2.17) — shown to the owner, not merged until approved (★, ruling W1) |
| **Token prefix**    | `--proof-*`                                           |
| **Designer / date** | Codex / 24 Aug 2026                                   |
| **Implements**      | `docs/briefs/15-testimonial.md` and `docs/briefs/17-stat.md` together, as required by `docs/briefs/README.md` |
| **Implemented at**  | `src/patterns/Proof/` · `src/styles/tokens/components/proof.css` · specimen `src/app/design/proof/page.tsx` |
| **Amended**         | **28 Sep 2026** (tracker 2.12; rulings P1, P2; audit §3 Proof, §4) — an optional 1:1 `portrait` through `Media`, an optional `clientMark` through `ClientMark`, `role` optional, and the quote brought onto ch10 B2.07's site blockquote: italic, a 6px rule beside the quote only, the attribution beneath with the name on the quote's first letter, and a white rule on blue. Every section below is amended in place; the changes are collected in **Amendment · 28 Sep 2026** before the self-audit. **29 Sep 2026** (tracker 2.17, owner-approved) — a display scale (`--text-quote-lg`, `--text-stat-lg`), the shared checked date said once, the quote beside stacked figures at 2:1 from lg, and the specimen's client marks rendering at last. Collected in **Amendment · 29 Sep 2026**. |

The owner accepted the shared component identity in section 17 question 1. The public API, folder,
token prefix and specimen route therefore use `Proof` rather than separate Testimonial and Stat
names.

## 1 · Identity

`Proof` is one evidence block: an attributed client quotation, a set of checked figures, or the two
together. `quote` is the Testimonial case, `figures` is the Stat case, and both populated is the
combined evidence block already anticipated by `CtaSection`. It is Tier 2 because it accepts
CMS-shaped records and composes the Tier 1 `Layout`, `Prose` and `Button` components.

**28 Sep 2026.** The quote is now the site's own blockquote as ch10 B2.07 draws it — Newsreader italic
behind a 6px rule, the attribution beneath, an optional square portrait left of it — and may carry
one client mark. A testimonial group and a stat group are still compositions of Proof, not variants
(audit §4); the specimen proves both.

It is not an arbitrary blockquote: `Prose` owns ordinary rich-text blockquotes and their internal
flow. The content seam routes an attributed quotation here and leaves an unattributed quotation to
`Callout`; Proof never inspects its HTML for a name. It is not a CTA: `CtaSection` owns the band,
heading, actions, form and placement of its `proof: ReactNode` slot, while Proof owns only the
evidence inside that slot. It is not a card or panel: `BlockCard` owns bounded tiles and `Section`
owns grounds; Proof paints no ground and has no four-sided edge.

This cannot be a prop on `Prose`. The required attribution is a separate typed record, figures carry
checked dates and optional sources, and the display arrangement sits beside figures. Those are
structure outside a rich-text field. It cannot be a `CtaSection` variant because the same evidence
also appears in ordinary content sections and case-study prose, and a pattern may not import a
sibling pattern.

The Testimonial brief resolves six routes, once each: display on `/how-we-work` and
`/services/product-design`, compact inside four case studies. The Stat brief resolves one row of
four on `/home` and claims appearances on `/about` and `/contact`; the content migration must confirm
those two claimed routes before using them. A page normally carries one Proof. A page may compose
several independent Proof instances, but the component does not turn six total quotes into a set
variant.

## 2 · Anatomy

| Part | Required | Element / owner | Content and responsibility |
| ---- | -------- | --------------- | -------------------------- |
| root | yes | `Layout` | Owns the relationship between the optional quote figure and optional figures list. Carries no ground. |
| quote | required in `compact`; optional in `display` | `Layout as="figure"` | One quotation and its attribution as one semantic unit, with both semantic children kept direct. |
| quote-rule | whenever quote renders | the `blockquote`'s logical leading edge | The 6px site-blockquote rule (ch10 B2.07), beside the quote text only — not the attribution. Decoration only, never an oversized quotation glyph. *Amended 28 Sep: was deck weight (2px) and ran beside the whole figure.* |
| quote-text | whenever quote renders | native `blockquote` containing `Prose` | One trusted, sanitised rich-text field of one to six sentences. `Prose` owns its markup and inline-link behavior; Proof owns the arrangement-specific quote scale. |
| attribution | whenever quote renders | native `figcaption`, rendered by `Cluster nowrap` | The attribution row. Without a portrait it is indented by the rule plus its inset so the name starts on the quote's first letter; with one, the indent is dropped and the portrait takes the left margin. |
| portrait | optional | `span` box containing `Media` | A 64px square photograph, radius 0, never masked, `alt=""` (ruling P1; ch05 §3, §6). Absent → no element and no gap. |
| attribution-text | whenever quote renders | nested `Layout` | The text column beside the portrait: name-and-role, then the mark. |
| name | whenever quote renders | text `span` | Required. Display serif, roman — the second voice under the italic quote. |
| role-company | whenever quote renders | text `span` | `role, company`, or `company` alone when role is missing or blank. |
| client-mark | optional | `span aria-hidden` containing `ClientMark` | One mark per quote, under the name and role, in the ground's ink, capped at 40px tall (ruling P2). Hidden from AT because it repeats `company`. |
| ~~attribution-media~~ | — | — | *Superseded 28 Sep 2026* by portrait and client-mark above. It was a reserved position with no prop, pending "real content and an image contract"; `Media` and `ClientMark` are that contract. |
| figures | optional in `display`; forbidden in `compact` | `Layout as="ul"` | Ordered one-to-four checked figures. The parent owns the item gaps and reflow. |
| figure | for every figures record | native `li` containing `Layout` | One value/label unit plus its own checked metadata and optional source. |
| value-label | for every figure | nested `Layout` | Keeps the audited value and what it counts as one visual unit. |
| value | for every figure | text `span` | Verbatim audited value such as “90+” or “4.8/5”; never inferred, rounded or coloured as a link. |
| label | for every figure | text `span` | Verbatim sentence-case source label, uppercased at render by `--text-mono-case` — mono is always uppercase, and the string keeps its authored casing. |
| checked | for every figure (authored) | text `span` in the `li`, or the group's `figcaption` | Required per-item checked date, authored as a complete phrase such as “checked on 8 August 2026”. When two or more figures carry the same string it renders once, as the figure-group caption; otherwise under each figure. *Amended 29 Sep 2026 (tracker 2.17).* |
| figure-group | when ≥ 2 figures share one checked date | `Layout as="figure"` | Wraps the `ul` and a `figcaption` holding the shared date, so the one date is the whole set's caption. Absent otherwise — no wrapper for mixed dates or a single figure. *Amended 29 Sep 2026 (tracker 2.17).* |
| source | optional per figure | existing `Button as="a"` | Fixed visible label “View source”; Button owns every link state and the extended touch target. |

There is no eyebrow, heading, body-copy, avatar (a circle-masked portrait), rating mark, review-theme
list, action slot, decorative quote glyph, panel, surface or set wrapper. A containing content pattern owns the
heading; a rating is an ordinary figure whose value happens to be `4.8/5`.

## 3 · Props / API

```ts
export type ProofPortrait = Pick<MediaImage, 'src' | 'width' | 'height' | 'sources'>;
export type ProofClientMark = Pick<ClientMarkProps, 'src' | 'width' | 'height' | 'correction'>;

export type ProofQuote = {
  quoteHtml: string;
  name: string;
  role?: string; // optional since 28 Sep 2026
  company: string;
  portrait?: ProofPortrait; // 28 Sep 2026
  clientMark?: ProofClientMark; // 28 Sep 2026
};

export type ProofFigure = {
  value: string;
  label: string;
  checkedOn: string;
  sourceHref?: string;
};

type ProofCompactProps = {
  arrangement: 'compact';
  quote: ProofQuote;
  figures?: never;
};

type ProofDisplayProps =
  | { arrangement?: 'display'; quote: ProofQuote; figures?: readonly ProofFigure[] }
  | { arrangement?: 'display'; quote?: never; figures: readonly ProofFigure[] };

export type ProofProps = ProofCompactProps | ProofDisplayProps;
```

| Prop / field | Exact type | Default | What it decides |
| ------------ | ---------- | ------- | --------------- |
| `arrangement` | `'display' \| 'compact'` | `'display'` | Section-scale evidence versus an embedded quotation. It decides composition and quote type, not a free size axis. |
| `quote` | `ProofQuote` | none | Whether the attributed quotation figure renders. Required for compact. |
| `figures` | `readonly ProofFigure[]` | none | Whether the checked-figure list renders. Expected count one to four; forbidden for compact. |
| `quoteHtml` | `string` | none | Trusted, content-seam-sanitised quote body handed to `Prose html`; it does not contain the attribution. |
| `name` | `string` | none | The speaker. Required: named attribution is mandatory (CS). |
| `role` | `string \| undefined` | none | The speaker's title. **Optional since 28 Sep 2026** (HO §4, strapi-changes.md entry 4). Missing or blank → the company stands alone on the second line, with no separator. |
| `company` | `string` | none | The client. Required. Also the client mark's name, so the mark and the text can never name two clients. |
| `portrait` | `ProofPortrait \| undefined` | none | The speaker's photograph. `kind` is not a field: Proof always passes `photograph`. `alt` is not a field: Proof always passes `""` (§11). Blank src or a non-positive dimension → omitted with a development warning; a non-square master → centre-cropped to 1:1 with a warning. |
| `clientMark` | `ProofClientMark \| undefined` | none | The client's SVG mark, ClientMark's asset fields without `name`. Blank src or a non-positive dimension → omitted with a warning, so no empty row is left. |
| `value` | `string` | none | Verbatim audited figure value. |
| `label` | `string` | none | What the figure counts. |
| `checkedOn` | `string` | none | Required per-figure integrity line, including “checked on”. |
| `sourceHref` | `string` | none | Optional source destination. Call sites use the named Clutch destination from the routes module once its exact URL is supplied. |

The API deliberately has no `size`, `tone`, `surface`, `color`, `ground`, `padding`, `gap`, `radius`,
`height`, `width`, `columns`, `align`, `quoteMark`, `avatar`, `portraitSize`, `portraitShape`,
`markPosition`, `rating`, `set`, `sourceLabel`, `checkedDateShared`, `children`, `className` or
`style`. Arrangement is semantic, not a visual size picker. The component owns its internal
geometry, including the portrait's size and the mark's position. Surface comes only from the nearest
`data-surface`. *Amended 28 Sep 2026:* portrait and mark were provisions; they are now content fields
on the quote record, because they are facts about the testimonial (who said it, for whom), not
presentation (strapi-changes.md entry 11).

`arrangement="compact"` with `figures`, compact without `quote`, and display without either key
must be compile errors. A quote with a React-node attribution or figures with a row-level checked
date must also fail type checking because those shapes do not exist. TypeScript cannot prove that
an array is non-empty or a string is non-blank without making CMS data hostile; runtime validation
warns in development, omits invalid records and renders `null` when no valid evidence remains.

## 4 · Variants × sizes

| Arrangement | `md` | Content allowed | Intended context |
| ----------- | ---- | --------------- | ---------------- |
| `display` | the default rendering | quote, figures, or both | Own section, hero/CTA slot or full content block |
| `compact` | embedded rendering | quote only | Inside an existing prose section or narrow reading flow |

There is one size. Display and compact are role-named arrangements rather than `lg` and `sm`
because they differ in composition: display may pair quote and figures, while compact must embed
and is quote-only. Display uses the h3 composite for the quotation; compact uses the quote
composite. The attribution, rule weight and measure do not step.

Rejected variants are `set`, `feature`, `rating`, `logo-led`, `portrait-led`, boxed, filled,
centred and decorative-mark. The portrait and mark are optional content in both arrangements and do
not change the arrangement: a quote with a portrait is the same `compact` or `display` Proof. Six quotations across the whole corpus do not justify a two- or
three-up API. A feature figure is the same value/label/date/source anatomy at a different scale,
and no resolved route requires it. Parent `Layout` can compose several Proof instances later
without making the individual component know it is in a set.

## 5 · States

Proof itself has only rest state. Quote, attribution, figure values, labels, dates and the leading
rule do not respond to pointer, keyboard, selection, expansion, availability or asynchronous work.
No Proof state token exists.

Inline links inside `quoteHtml` keep `Prose`'s existing rest, hover, focus and pressed contract.
The optional source is the existing `Button` with `emphasis="link"`, `tone="neutral"`, `size="sm"`
and `extendHitArea`; Button owns its hover, keyboard focus, pressed and disabled machinery. Proof
does not copy, recolour or force those states.

Held/current, selected, disabled, expanded/open, busy, loading and error are deliberately excluded.
This is evidence, not a control, disclosure, selection, request or validation surface. There is no
colour-only state and no content-sniffed state.

## 6 · Per-surface colour

The seven tokens below are the complete colour contribution of Proof (six until 28 Sep 2026, when
`--proof-name-ink` was added). `Media` owns the portrait's edge (a photograph has none) and
`ClientMark` owns the mark's ink (`--cmark-ink`, the ground's ink). `Prose` still owns inline-link
colours and Button owns source-link colours and focus geometry. Text ratios are measured against
the exact Section ground; the quote rule is decoration.

| Token | paper | tint | ink | blue |
| ----- | ----- | ---- | --- | ---- |
| `--proof-quote-ink` | `--color-neutral-800` — 11.81:1 | `--color-neutral-800` — 10.54:1 | `--color-white` — 17.26:1 | `--color-white` — 6.23:1 |
| `--proof-name-ink` | `--color-neutral-900` — 14.62:1 | `--color-neutral-900` — 13.06:1 | `--color-white` — 17.26:1 | `--color-white` — 6.23:1 |
| `--proof-attribution-ink` | `--color-neutral-600` — 4.92:1 | `--color-neutral-700` — 7.27:1 | `--color-neutral-400` — 8.05:1 | `--color-brandeis-100` — 4.91:1 |
| `--proof-value-ink` | `--color-neutral-950` — 17.10:1 | `--color-neutral-950` — 15.27:1 | `--color-white` — 17.26:1 | `--color-white` — 6.23:1 |
| `--proof-label-ink` | `--color-neutral-700` — 8.14:1 | `--color-neutral-800` — 10.54:1 | `--color-neutral-400` — 8.05:1 | `--color-brandeis-100` — 4.91:1 |
| `--proof-checked-ink` | `--color-neutral-600` — 4.92:1 | `--color-neutral-700` — 7.27:1 | `--color-neutral-400` — 8.05:1 | `--color-brandeis-100` — 4.91:1 |
| `--proof-quote-rule` | `--color-brandeis-500` — n/a, decoration | `--color-brandeis-500` — n/a, decoration | `--color-brandeis-300` — n/a, decoration | `--color-white` — n/a, decoration (*was `--color-peridot-400` until 28 Sep 2026*) |

**Paper.** The quotation softens to neutral-800 so long display copy does not compete with the
page heading; the audited value takes neutral-950. Attribution, dates and labels step down through
neutral-600/700 while remaining above the normal-text floor. Only the decorative rule uses the
action family, so a non-clickable number never appears clickable.

**Tint.** Quote and label deepen to neutral-800 and metadata to neutral-700 against paper-deep.
The value remains neutral-950. Brandeis-500 can hold the rule because it is an accent at the quote's
edge rather than a second ground.

**Ink.** Quote and value lift to white; supporting attribution, label and checked text use
neutral-400. Brandeis-300 lifts the rule enough to remain visibly distinct without turning the
whole block into a blue panel.

**Blue.** Quote, name and value remain white. Supporting copy uses Brandeis-100, the lightest quiet
step that still clears 4.5:1 on Brandeis-500. **Amended 28 Sep 2026:** the rule is white. ch10 B2.07
draws the site blockquote "lifted to brandeis-300 on ink and white on brandeis-500", and C.07 repeats
it ("on brandeis-500 the action line, an inline link and the quote rule are white"). The previous
peridot-400 followed `prose.css`'s blockquote, but ch02 v1.0 gives peridot exactly two uses — a
marked phrase and an illustration's carried item — and a quote rule is neither. The real source link
retains Button's complete blue-surface treatment.

**Name.** One step stronger than the quote on the light grounds (neutral-900 over neutral-800), and
white with the quote on the dark ones. The name's weight comes mostly from the change of voice —
roman serif under italic — not from the ink.

Every surface block redeclares all seven tokens. A tint Proof inside an ink parent resolves the full
tint column from its nearest surface scope; an ink Proof inside a paper parent resolves the full ink
column. Proof never caches an outer value, paints a nested ground or relies on a deltas-only table.

## 7 · Geometry & spacing

### (a) Distances

- Display quote-to-figures relationship: root `Layout columns={{ base: 1, lg: [2, 1] }}`
  with `colGap="column"` and `rowGap="stack"` — the quote in the wide track, the figures stacked in
  the narrow one from lg; one track below lg. One child renders one track and states no seam.
  *Amended 29 Sep 2026 (tracker 2.17).* Was `columns="fit" minTrack="md"` (two equal halves where two 320 tracks fit).
- Compact root: one track and no vacant seam.
- Quote leading inset: `--gap-block` between the rule and quote content, on the `blockquote`.
- Quote-text-to-attribution relationship: nested `Layout rowGap="block"`.
- Attribution indent, no portrait: `padding-inline-start: calc(--proof-quote-rule-width + --gap-block)`,
  so the name starts on the quote's first letter (ch10 B2.07: "indented 54 — the rule's 6 plus the
  quote's 48"). Padding aligns content inside the part's own box; it separates nothing.
- Portrait to text: `Cluster nowrap colGap="block"` — ch10's "a 24 bind". No portrait → the Cluster
  has one child and no seam; the indent above applies instead.
- Name to role-company: nested `Layout rowGap="inline"` — one key and its value.
- Name-and-role to client mark: `Layout rowGap="text"`. No mark → no seam.
- Figures: `Layout columns="tile" minTrack="sm" colGap="gutter" rowGap="block"`
  with `justify="between"`. Fixed-width tile tracks keep a partial last row from stretching.
- Value-to-label relationship: nested `Layout rowGap="tight"`, one audited unit.
- Value-label-to-checked relationship: outer figure `Layout rowGap="text"`.
- Checked-to-source relationship: nested metadata `Layout rowGap="tight"`; no source means no
  source element and no empty seam. With the date shared and no source, the metadata `Layout` is not
  rendered at all, so no empty `text` seam hangs under the label.
- Figure list to shared-date caption: figure-group `Layout rowGap="gutter"` — one step wider than the
  list's own `block` row seam, so the caption reads as the set's footnote rather than a fifth item.
  *Amended 29 Sep 2026 (tracker 2.17).*
- Proof-to-heading, Prose sibling, CTA frame or neighbouring Proof: the parent `Layout` owns that
  block or stack relationship. Proof sets no outer margin.

### (b) Component sizes

- `md`: the only size; inline size is the available parent track, `min-inline-size: 0`, with no
  fixed block size.
- Display pair tracks: `[2, 1]` from lg — at the 1240 cap, (1240 − 64) × 2/3 ≈ 784 for the quote and
  ≈ 392 for the figures, which holds one 256 tile per row, so the figures stack. *Amended 29 Sep 2026 (tracker 2.17).*
  **Known cost:** the split is breakpoint-driven, not content-driven, so it also applies inside a narrow
  parent at a wide viewport — CtaSection `open`'s 470 column (≈ 270 / 135) and the 320/256/192 stress
  tracks. The old `fit`/`md` pair collapsed there by itself. See §17 Q13.
- Figure tile: `Layout minTrack="sm"`, resolving to the existing 256px layout track. Four tiles
  fit the 1240px cap; two fit the 703px content width immediately below 767; one fits a 470px CTA
  column without compressing `4.8/5`.
- Quote and quote-text measure: `--measure-body` so the six-sentence case stays readable rather
  than growing to the 1240px cap.
- Attribution measure: `--measure-body`. “Ashok Mohanty, Founder, Auxentios” is authored as one
  content line but may wrap rather than overflow in a 192px stress track.
- Rule: `--proof-quote-rule-width` resolves to `--border-width-rule-quote` → `--border-width-6`,
  6px, the site blockquote's rule (ch10 B2.07). *Amended 28 Sep 2026: was `--border-width-hairline-deck`
  (2px), matching Prose, which still reads it — see §17 Q9.*
- Portrait: `--proof-portrait-size` 64px square (`--proof-portrait-ratio` → `--ratio-portrait`, 1 / 1).
  Small (P1): a little taller than the two attribution lines (≈ 50), and under a fifth of a 326
  column, leaving the text a 238 measure on a phone. `sizes` is `PROOF_PORTRAIT` from
  `src/lib/image-sizes.ts` ('64px'), which restates the token by hand.
- Client mark: ClientMark's own geometry — equal area, 40px height cap, 160px width cap (P2).
- Radius: `--proof-radius` resolves to `--radius-0`.
- Shadow: `--proof-shadow` resolves to `--shadow-none`.
- Layer: `--proof-layer` resolves to `--z-base`; no part overlaps another.

### (c) Optical corrections

None. Proof does not reach the space ramp. Every inset and seam is a gap-scale relationship, the
attribution indent is the rule width plus the same gap-block inset, and the two track minima come
from Layout's existing component geometry.

## 8 · Typography

| Part | Role | Tracking companion | Measure |
| ---- | ---- | ------------------ | ------- |
| display quote-text | `--text-quote-lg` (italic in the composite) — 43 / 1.2, 34 / 1.24 at ≤1023, 25 / 1.3 at ≤767. *Amended 29 Sep 2026 (tracker 2.17).* Was `--text-h3` + `font-style: italic` | `--text-quote-lg-tracking` | `--measure-body` |
| compact quote-text | `--text-quote`, **italic** | none — this role has no tracking companion | `--measure-body` |
| name | `--text-h6` (display serif, roman) | `--text-h6-tracking` | the attribution text column |
| role-company | `--text-body-sm` | none — this role has no tracking companion | the attribution text column, `--measure-body` cap on the row |
| value | `--text-stat-lg` — 54 / 1, 43 at ≤1023, 40 at ≤767; mono, so `--text-mono-case`. *Amended 29 Sep 2026 (tracker 2.17).* Was `--text-stat` | `--text-stat-lg-tracking` | intrinsic inside one figure tile |
| label | `--text-micro` | `--text-micro-tracking` | one figure tile |
| checked | `--text-caption` | none — this role has no tracking companion | one figure tile, or the figure-group caption |
| source | owned by `Button size="sm" emphasis="link"` | owned by `Button` | intrinsic visible label |

Quote, attribution and checked-date copy stay in authored sentence case: “The team helped us make a
complicated workflow clear.” and “Ashok Mohanty, Founder, Auxentios”. Figure labels are supplied in
sentence case — “completed projects” — and uppercased at render by `--text-mono-case` to bind four
differently shaped values into one row. Values and names are never transformed.

**Italic, amended 28 Sep 2026.** Both arrangements set the quote italic — `font-style: italic` after
the `font:` composite, which would otherwise reset it. *(29 Sep 2026: display's italic now lives in
`--text-quote-lg` itself, so display writes no `font-style`; compact is unchanged.)* ch10 B2.07: "Fails when it is set roman at
heading size. The italic and the rule are what make it read as reported speech." Display was roman
h3, which is exactly that failure. Newsreader italic 400 and 500 are both loaded by the root layout.
The name is roman serif under the italic, which ch10 counts as a change of voice (A1.06); the role is
sans, a third.

**Display scale, amended 29 Sep 2026 (tracker 2.17, owner-approved).** This paragraph used to argue
that display should stop at h3. In practice 34 italic against compact's 28 italic was no contrast at
all, and a testimonial never became the moment on a page. Display now takes two roles of its own,
added to the ladder with their paired line heights and `-t`/`-m` steps:

- `--text-quote-lg` — Newsreader 400 italic, 43 / 1.2 → 34 / 1.24 → 25 / 1.3; tracking
  `--letter-spacing-title-tight`. h2 scale on desktop and tablet. The mobile step is h3-m's 25 rather
  than h2-m's 28: at 28 the six-sentence quote ran 16 lines of ≈ 24 characters in the 296 text column
  and fragmented; at 25 it is 12 lines and reads as speech.
- `--text-stat-lg` — Geist Mono 500, 54 / 1 → 43 → 40; tracking `--letter-spacing-title`. h1 scale.
  Like `--text-stat`, the ratio holds at 1 on every width, so it has no line-height step.

The names follow the ladder's existing size-variant convention (`body-lg`, `ui-lg`); ch03 names no
display quote or display stat. Compact keeps `--text-quote` (28 / 22) so it embeds without becoming a
second page heading, and `--text-stat` stays for any stat outside Proof.

## 9 · Responsive

At 1023, the root and figure layouts remain content-driven. Type composites re-resolve through the
shared token layer; Proof does not swap a type role or gap. At 767, the same `tile`/`sm` figure row
fits two 256px tracks in the Section content width, producing the preferred two-by-two reading for
four figures. In a 470px CTA column it becomes one track; in a 192px stress track the tile shrinks
to the parent and all text wraps without widening it.

The display quote/figures pair is `{ base: 1, lg: [2, 1] }` (29 Sep 2026): quote and figures side
by side at 2:1 from 1024, one column below it with the quote first and the figure tiles reflowing
across the width. Because it is breakpoint-driven it does not collapse in a narrow parent at a wide
viewport (§7(b), §17 Q13). Compact is always one embedded track.
The quote never clamps and the component never changes its type role based on sentence count.

The source `Button size="sm"` reaches the 44px touch floor through `extendHitArea` so the 32px
visible link does not make the figure row taller. Inline Prose links keep Prose/Button's existing
touch contract. The gap scale does not shift responsively.

## 10 · Composition

```tsx
<Layout columns={both ? { base: 1, lg: [2, 1] } : undefined} colGap={both ? 'column' : undefined} rowGap={both ? 'stack' : undefined}>
  {quote && (
    <Layout as="figure" rowGap="block">
      <blockquote /* 6px rule + inset */><Prose html={quote.quoteHtml} /></blockquote>
      <Cluster as="figcaption" nowrap colGap="block" align="start" /* indented when no portrait */>
        {portrait && <span /* 64 square */><Media image={{ ...portrait, alt: '', kind: 'photograph' }} sizes={PROOF_PORTRAIT} fit="fill" /></span>}
        <Layout rowGap="text">
          <Layout rowGap="inline"><span>{name}</span><span>{role ? `${role}, ${company}` : company}</span></Layout>
          {mark && <span aria-hidden="true"><ClientMark {...mark} name={company} /></span>}
        </Layout>
      </Cluster>
    </Layout>
  )}
  {figures && !shared && (
    <Layout as="ul" columns="tile" minTrack="sm" colGap="gutter" rowGap="block" justify="between">
      {figures.map((figure) => (
        <li><Layout rowGap="text">…value/label…checked/source…</Layout></li>
      ))}
    </Layout>
  )}
  {figures && shared && ( /* every figure carries the same checkedOn — 29 Sep 2026 */
    <Layout as="figure" rowGap="gutter">
      <Layout as="ul" /* as above, no per-item checked line */>…</Layout>
      <figcaption>{shared}</figcaption>
    </Layout>
  )}
</Layout>
```

The conditional axis props express that an absent child leaves no seam; the implementation may
split the branches rather than pass conditional props. `Layout` owns every block and column
relationship; `Cluster` owns the portrait beside the attribution text. `Prose` owns trusted inline
markup, `Button` owns the optional link, `Media` the portrait and `ClientMark` the mark. There is no
hand-written grid or flex arrangement, no margin on any child and no external override of Section's
ground, padding or content column.

## 11 · Accessibility

The quote is a native `figure` containing `blockquote` and `figcaption`; the attribution is visible
text, not an accessible-name override. The figures collection is a native `ul`, with one `li` per
audited record. A source uses an anchor through `Button`; its visible “View source” label receives
the contextual accessible name `View source for {label}`. It navigates in the same browsing context
unless the application explicitly adopts a site-wide external-link policy.

| Key / input | Quote inline link | Figure source link | Focus after action |
| ----------- | ----------------- | ------------------ | ------------------ |
| `Tab` | Moves to the next inline link, then onward in document order. | Moves to the source after the figure's checked line. | The newly focused anchor. |
| `Shift+Tab` | Reverses through inline links. | Moves to the previous focusable element. | The newly focused element. |
| `Enter` | Navigates to the link destination. | Navigates to `sourceHref`. | Browser navigation behavior. |
| `Space` | Unbound; scrolls the page for an anchor. | Unbound; scrolls the page for an anchor. | Unchanged. |
| pointer click | Navigates through the existing link. | Navigates to `sourceHref`. | Browser navigation behavior. |
| `Escape` | Unbound; Proof is not a modal or disclosure. | Unbound. | Unchanged. |
| Arrow/Home/End | Unbound; Proof is not a composite widget. | Unbound. | Unchanged. |

**Portrait and mark, 28 Sep 2026.** The portrait renders `alt=""`: it sits beside the name it depicts,
so any text alternative could only restate that name and a screen reader would hear it twice (ch05
§7's decorative case). The client mark is wrapped in `aria-hidden="true"` for the same reason — its
accessible name is `company`, which is text one line above. Both are therefore silent, and the
figcaption reads exactly as before: name, then role and company.

Proof authors no `role`, `tabIndex`, live region, `aria-labelledby`, `aria-describedby`,
`aria-controls`, `aria-expanded` or IDs; its one ARIA attribute is the mark's `aria-hidden`. There is therefore no generated idref and no attribute
that can point at an absent quote or source. The content seam sanitises `quoteHtml`; Proof does not
claim that untrusted HTML is safe.

Focus order is document order: quote links, then source links in figure order, then the next page
control. Rendering or omitting optional evidence happens before interaction and moves no focus.
Button's source ring remains `focus-visible` only and keeps its complete per-surface measured
palette. Proof text maintains at least 4.5:1 on all four surfaces; the decorative rule has no
contrast floor. Reduced motion changes only the delegated link transitions to their existing
instant behavior.

With quote and figures that share one date, a screen reader encounters: “The team helped us make a
complicated workflow clear. Ashok Mohanty, Founder, Auxentios. Figure, checked on 8 August 2026. List,
four items. 90 plus, completed projects. 4.8 out of 5, 4.8 out of 5 Clutch rating, View source for 4.8
out of 5 Clutch rating, link.” With mixed dates there is no figure wrapper and each item reads its own
date after its label, as before.

**The date once, 29 Sep 2026.** A shared date is programmatically the whole set's: the `ul` and a
`figcaption` holding the date are one native `figure`, and a `figcaption` is its figure's accessible
name, so the date is announced on entry to the set and covers every item in it. That takes no
`aria-describedby` on each `li` (the idref this section rules out), no visually hidden duplicate and
no string rewritten — the caption is the authored `checkedOn` verbatim. It triggers only for two or
more figures whose trimmed strings are identical; one figure keeps its own line, and any difference
keeps every line. Exact number pronunciation remains the user agent's
language behavior; no hidden replacement rewrites audited values.

## 12 · Content edge cases

| Case | Required handling |
| ---- | ----------------- |
| Longest realistic string | Render the real six-sentence quotation at display h3 and compact quote scale, with the full attribution. It grows naturally, never clamps and never selects a smaller role from length. |
| One long unbroken token | A URL in `quoteHtml` follows Prose's wrapping rule. Long name, role, company, value, label or checked strings use anywhere wrapping inside a `min-inline-size: 0` track; the audited value is not split unless the parent is narrower than the token itself. |
| Zero items | Display with no valid quote and zero valid figures warns in development and renders `null`, with no empty root or seam. The public union prevents the ordinary no-content call. |
| One item | One valid figure renders one 256px tile in the parent-owned list without stretching to imitate four; one quote renders its own figure without a vacant second track. |
| Many items (2× expected) | Render all eight valid figures in tile rows and warn above the expected maximum of four. Do not truncate, carousel or invent pagination. Eight quotes are eight parent-composed Proof instances; there is no set prop. |
| Missing image or missing optional slot | Missing portrait → no box and no bind; the name returns to the quote's first letter (P1: "no portrait means no gap"). Missing mark → no row. An invalid portrait or mark (blank src, non-positive dimension) is treated as missing, with a development warning. A portrait whose URL 404s keeps its 64px box, empty, which is the honest failure; a mark whose URL 404s is ClientMark's case (its box paints nothing). Missing quote leaves figures only; missing figures leaves the quote only; missing source leaves no Button and no source seam. |
| Empty required-ish text | Blank quote body, blank name or blank company invalidates the quote; a blank role does not (it is optional). Blank value, label or checked date invalidates that figure. Warn in development, retain other valid evidence and render `null` if none remains. |
| Narrow track at 767 | Display pair is one track below 1024; four figures become two-by-two through tile/sm. Type roles and gap steps remain unchanged. *29 Sep 2026: at lg and above the pair is 2:1 whatever the parent's width — see §17 Q13.* |
| Parent that does not size it | Root requests the full available inline size with `min-inline-size: 0`; tile tracks keep their existing 256px preferred minimum and can shrink to 100%. In a wrapping `Cluster`, full inline sizing prevents intrinsic collapse. No hard component minimum is needed; the parent supplies the explicit 192px stress track. |
| Logical properties rather than left/right | Quote rule and inset use the logical inline-start edge; all spacing is block/inline. RTL moves the rule and inset together without reordering authored attribution fields. |
| Surface nested inside a different one | The nearest surface redeclares all six Proof tokens; Prose and Button independently resolve their complete palettes from that same scope. Proof paints no intervening ground. |
| Two components adjacent | Each root carries no outer margin or ground. The parent supplies `rowGap="stack"` for production; a zero-gap stress harness shows two evidence blocks remain semantically separate without accidental rules between them. |
| Interactive content inside a slot | Trusted quote HTML may contain inline links, and a figure may render one source Button. They remain separate anchors in document order; controls, forms, nested buttons and arbitrary React children are not accepted by the API. |

## 13 · Motion

None on Proof. Quote, attribution, values, labels, dates and the decorative rule do not transition.
There is no transform, translation, rotation, scale, wipe, fade, opacity change, height animation,
max-height animation, quote reveal or count-up.

Prose inline links and the source Button keep their own colour, border and link-rule transitions
with `--duration-fast` and `--easing-standard`. Under reduced motion those existing primitives use
`--duration-instant`; Proof adds no mechanism or exception.

## 14 · Do's and Don'ts

**Do**

1. Route attributed blockquotes to the typed `quote` record at the content seam; type-check that
   name, role and company are separate required strings.
2. Render the same real six-sentence quote in display and compact specimens; inspect the computed
   roles and confirm there is no length-dependent class.
3. Render `4.8/5` as a normal `ProofFigure` with a label and its own checked date; inspect the DOM
   for no rating-specific branch.
4. Use `Layout` for the root, figure tiles and every nested rhythm; search the module for a
   sibling-arranging grid/flex declaration and expect none.
5. Render identical markup on paper, tint, ink and blue and inspect all six resolved Proof tokens,
   plus Prose and Button tokens on the nearest nested surface.
6. Preserve every audited value, label and date verbatim and show one-to-four figures without a
   stretched partial row.
7. Tab and point through quote links and source links on every surface; verify their states belong
   to Prose/Button and every source accessible name includes its figure label.

**Don't**

8. Do not add separate Testimonial, Stat or rating folders if section 17 question 1 accepts Proof;
   repository paths and exports decide this test.
9. Do not sniff `quoteHtml`, rendered children or punctuation for attribution; search for parsing,
   child walking and regular expressions and expect none.
10. Do not paint a ground, card edge or oversized quotation mark; computed background remains
    transparent and the glyph/asset tree contains no quote decoration.
11. Do not mask the portrait to a circle, give it a radius, letterbox it or reserve its box when it is
    absent; computed `border-radius` on the `img` is 0, its box is square, and a quote with no
    portrait contains no portrait element. *(Amended 28 Sep 2026: this read "do not add portrait/logo
    props" while no image contract existed.)*
12. Do not colour a non-clickable value with any Brandeis token; only the decorative rule and
    delegated links may use that family.
13. Do not infer a checked date from the current day, merge dates that differ, or hide one visually;
    every rendered figure is covered by a visible `checkedOn` — its own, or, when every figure's is
    identical, the one in the set's `figcaption`. *(Amended 29 Sep 2026: this forbade sharing one date
    across a row.)*
14. Do not truncate figures after four, quotes after a sentence count or attribution at one visual
    line; warnings preserve content and wrapping preserves access.

## 15 · Specimen plan — `/design/proof`

The exact block list, in order:

1. **Identity.** One display quote plus four checked figures, annotated as the combined block that
   collapses the two briefs if question 1 is accepted.
2. **Full arrangement × size matrix.** Display quote-only, figures-only and combined at the one md
   size; compact quote-only at the same md size. No empty matrix cell implies a supported call.
3. **Quote length ladder.** Identical attribution with real one-, three- and six-sentence bodies in
   display, followed by the six-sentence body in compact. Print the resolved quote roles.
4. **Figure count ladder.** One, two, three and four real figures, including `90+` and `4.8/5`, then
   eight for the 2× stress case. A shared date renders once, under the set; a mixed-dates row keeps
   one per figure (29 Sep 2026). Partial rows retain tile width.
5. **Source treatment.** Figures without and with the source Button, including two repeated Clutch
   destinations. Visible label, contextual accessible name and same-context navigation are noted.
6. **States: delegated only.** Rest references plus instructions to point, hold and Tab to inline
   Prose and source Button links. Hover, pressed and keyboard focus have no Proof props and must be
   pointed at, held and tabbed to; Proof has no forceable state.
7. **All four surfaces as sibling bands with identical markup.** Each renders the same combined
   Proof and prints the matching section 6 rationale and six resolved values.
8. **Nested surfaces.** Tint inside ink and ink inside paper, with the same combined markup and
   resolved Proof, Prose and Button tokens listed.
9. **Embedded context.** Compact between two `Prose` paragraphs with the parent owning both seams;
   it reads as part of the flow, not as a band.
10. **CTA contexts.** Quote-only, figures-only and combined passed into CtaSection's existing proof
    slot in split/full-width and open/470px contexts. The specimen replaces CtaSection's temporary
    proof helper; it does not make CtaSection import Proof.
11. **Long and invalid content.** Unbroken quote URL; long attribution fields; long value/label/date;
    blank quote body; each blank attribution field; each blank figure field; empty figures and no
    valid evidence.
12. **Narrow and unsized parents.** Combined/display and compact at 320px, 256px and 192px, then in
    a wrapping `Cluster` without a grid track. No intrinsic collapse or horizontal page overflow.
13. **Two adjacent Proof instances.** Production stack gap followed by a zero-gap stress harness,
    proving neither paints a joining ground or accidental separator.
14. **Semantics and focus order.** Print figure/blockquote/figcaption and ul/li maps, then include
    an inline quote link and two source links for Tab/Shift+Tab testing.
15. **Portrait × client mark** (amended 28 Sep 2026; was "provisions"). Text only, portrait, mark,
    and both, in compact and display.
    Then **attribution stress** (16): long name and long role beside a portrait, missing role, blank
    role string, one-line and six-sentence quotes, an off-square master, a blank portrait src, a
    mark with no dimensions. Then **326** (17): the phone column via the harness's `.trackMobile`.
    Then **compositions** (18): a testimonial group — Proof compact × 3 in `Layout columns="fit"
    colGap="gutter"` — and a stat group — Proof display, figures only (audit §4). The four-surface
    bands (7) render a portrait-and-mark quote in both arrangements.
16. **What a static page cannot force.** Manual instructions for hover, held pointer, Tab focus,
    1023/767 widths and reduced motion.

The squint test reads as four shapes: a tall serif quote rail, a horizontal figure rhythm, a
two-column combined block and a compact interruption inside prose. Scale and position make the
hierarchy; no repeated boxes or alternating grounds do it.

## 16 · New token requests

**Amended 28 Sep 2026 — three primitives and three component tokens.**

| Token | Layer | Value | Why |
| ----- | ----- | ----- | --- |
| `--border-width-6` | primitive | 6px | The border ramp stopped at 3. |
| `--border-width-rule-quote` | primitive (usage alias, like `--border-width-hairline-deck`) | `--border-width-6` | The site blockquote's rule (ch10 B2.07), named once so Prose can adopt it (§17 Q9). |
| `--ratio-portrait` | primitive | 1 / 1 | "Portraits are 1:1 everywhere" (ch05 §3, §12 11) — a brand fact, not one placement's crop, so shared the way `--ratio-cover` is. |
| `--proof-name-ink` | component | per surface, §6 | The name's own ink. |
| `--proof-portrait-size` | component | 64px | Component size. |
| `--proof-portrait-ratio` | component | `--ratio-portrait` | The box's ratio. |

**Amended 29 Sep 2026 (tracker 2.17) — two type roles, ten primitives and four usage tokens.**

| Token | Layer | Value | Why |
| ----- | ----- | ----- | --- |
| `--font-size-quote-lg` / `-t` / `-m` | primitive | 43px / 34px / 25px | Display quote size ladder (§8). |
| `--line-height-quote-lg` / `-t` / `-m` | primitive | 1.2 / 1.24 / 1.3 | Its paired ratio, same edit. |
| `--font-size-stat-lg` / `-t` / `-m` | primitive | 54px / 43px / 40px | Display stat size ladder (§8). |
| `--line-height-stat-lg` | primitive | 1 | Holds on every width, as stat's does. |
| `--text-quote-lg` + `--text-quote-lg-tracking` | usage | italic 400 · quote-lg · Newsreader; `--letter-spacing-title-tight` | Display quote composite; italic is in the role. |
| `--text-stat-lg` + `--text-stat-lg-tracking` | usage | 500 · stat-lg · Geist Mono; `--letter-spacing-title` | Display stat composite. |

`docs/vocabulary.md` was regenerated in the same edit and must be pushed to the Claude Design project.

*Before 28 Sep 2026:* **None — every value in this spec is an existing token.**

The `--proof-*` component layer maps existing ramp colours, h3/quote/stat/body-sm/micro/caption type
roles, measures, Layout track sizes, gap roles, deck rule, radius, shadow and z-layer into Proof's
parts. Prose and Button retain their own component layers. No primitive, usage token, glyph, image
contract or motion mechanism is requested.

## 17 · Open questions

**1 · Component identity across briefs 15 and 17 — resolved (was BLOCKING).**

- **(a) One `Proof` pattern.** Quote-only is Testimonial, figures-only is Stat, and both filled is
  the combined evidence block. Ship one folder, one `--proof-*` surface table and one specimen.
- **(b) Separate `Testimonial` and `Stat` patterns.** Each gets its own props, tokens and specimen;
  a parent must compose the rating and quote when they appear together.
- **(c) Three patterns.** Separate Testimonial, Stat and Rating even though Rating has the exact
  value/label/date/source anatomy of a figure.

**Owner decision — accepted 24 August 2026: (a), one `Proof`.**
`docs/briefs/README.md` explicitly requires briefs 15 and 17 to be specified in one session because
splitting them duplicates half the system. CtaSection's accepted spec already names the shared
`Proof` slot, and the combined case cannot be represented by either briefed component alone. One
discriminated API makes compact quote-only at compile time and renders `4.8/5` through the same
audited figure contract as `90+`.

**2 · Display versus compact — non-blocking.** Options: one rendering everywhere; two role-named
arrangements; or a free size prop. **Recommendation and draft decision: two arrangements.** Compact
is structurally quote-only and embeds in prose; display may include figures and stand as a content
block. A size prop would let a caller put display behavior at compact scale without solving that
composition difference.

**3 · Display quote scale — non-blocking.** Options: h2; h3; or quote. **Recommendation and draft
decision: h3.** It is visibly stronger than the compact quote composite but survives the real
six-sentence case at the body measure. H2 makes the longest quote compete with the page heading;
quote erases the distinction between arrangements.

**4 · The `4.8/5` rating — non-blocking.** Options: ordinary figure; part of quote attribution; or a
third rating pattern. **Recommendation and draft decision: ordinary figure.** It already has the
same required label, checked date and optional Clutch source as the other figures. The quote remains
valid without it, and no rating-only behavior exists.

**5 · Quote set — non-blocking.** Options: add a two-/three-up set arrangement; or leave set
composition to a parent. **Recommendation and draft decision: no set arrangement.** There are only
six quotes across the site and no route shows more than one. A future real set can compose Proof
instances with Layout and establish its own selection/count rules.

**6 · Portrait and logo provisions — non-blocking.** Options: build optional props now; reserve a
future position only; or reject media permanently. **Recommendation and draft decision: reserve the
position before attribution text and build nothing.** No portrait or logo appears in 129 content
files and the repository has no image contract. A prop without content would manufacture crop,
aspect-ratio and empty-state decisions.

**6, resolved 28 Sep 2026 (rulings P1, P2; audit §3).** Both are built: `portrait` through `Media`,
`clientMark` through `ClientMark`. The draft decision stood only while there was no image contract;
Media (2.6) and ClientMark (2.8) are that contract.

**7 · Figure sources and the Clutch URL — non-blocking.** Options: style a raw anchor locally; use
the existing link Button and accept `sourceHref`; or make the entire value clickable.
**Recommendation and draft decision: `Button as="a" emphasis="link" tone="neutral" size="sm"`
with `extendHitArea`, and keep the value non-interactive.** The caller passes the named Clutch route
once its exact external URL is supplied; Proof must not guess a literal or substitute
`UNRESOLVED_EXTERNAL` in production content.

**8 · Where the client mark sits — non-blocking; decided by the build (P2 left placement open).**
Options: (a) beneath the name and role, in the text column; (b) at the inline end of the attribution
row; (c) above the quote. **Choice: (a).** It keeps the attribution one left-aligned column that
starts on the quote's first letter (or beside the portrait), so the mark reads as part of "who said
it" rather than as a logo strip. (b) squeezes the name at 326 and in a three-up group; (c) makes the
client's mark the first thing read, which turns a testimonial into a logo placement. One mark per
quote: the type holds one.

**9 · Prose's blockquote still diverges from the site blockquote — non-blocking; owner to decide.**
`prose.css` draws a 2px rule, roman type and a peridot rule on blue. ch10 B2.07 says 6px, italic and
white on blue. Proof now follows ch10; Prose was left alone because it is out of this task's scope and
a rich-text blockquote is often an unattributed callout rather than a testimonial. The shared
`--border-width-rule-quote` exists so Prose can adopt the weight in one line if the owner rules the
chapter applies to it too.

**10 · The portrait is decorative (`alt=""`) and the mark is `aria-hidden` — non-blocking.** Options:
pass the record's alt; synthesise "Portrait of {name}"; or decorative. **Choice: decorative**, because
both would repeat text immediately beside them. The portrait type therefore has no `alt` field.

**11 · Portrait size 64px — non-blocking.** ch10's 160 portrait beside a 52px quote scales to roughly
86 at the web's 28px quote; P1 says *small*. 64 is a little taller than the two attribution lines and
keeps the text column at 238 in a 326 column. Owner to confirm on the crops.

**12 · The Media specimen's stand-in portrait is circle-masked — non-blocking; owner to note.**
`public/design/media/photograph-portrait.png` (and `docs/brand/v3-portrait.png`) have the circle baked
into the file, which ch05 §6 forbids. ch10 hides it by scaling the image 142% in its box. This
specimen uses a square crop of the same photograph (`photograph-portrait-square.png`); the Media
specimen still shows the circle.

**13 · The 2:1 pair does not collapse in a narrow parent — non-blocking; owner to decide (29 Sep
2026).** `Layout`'s breakpoint columns read the viewport, not the parent. So at 1024 and above the
quote/figures pair is 2:1 wherever Proof sits: in CtaSection `open`'s 470 column the quote gets ≈ 270
and the figures ≈ 135 (a 54px `4.8/5` wraps onto two lines), and the §15 item 12 stress tracks squeeze
the same way. `fit`/`md` collapsed there on its own. No production route renders a combined Proof
today (the seven call sites are compact), so this is a specimen-visible cost, not a live one. Options:
(a) accept it and rule that a combined Proof only goes in a full-width band, dropping the
`open`/combined case from CtaSection's proof ladder; (b) give `Layout` a content-driven weighted mode
(a primitive conversation — container queries or a weighted `fit`); (c) return to `fit`/`md` and lose
the 2:1. **Recommendation: (a) now, (b) if a narrow combined placement is ever wanted.** Shipped as
approved, with the cost visible in the specimens.

## Amendment · 28 Sep 2026 (tracker 2.12)

What changed, in one place:

1. **Portrait.** Optional `quote.portrait` — a 64px square, radius 0, never masked, through `Media`
   (`kind: 'photograph'`, `fit: 'fill'`, lazy, `sizes` = `PROOF_PORTRAIT`). Flush on the left margin
   under the rule, the text a 24 bind to its right. No portrait, no gap (P1).
2. **Client mark.** Optional `quote.clientMark` through `ClientMark` (40px cap, ground's ink), beneath
   the name and role, `aria-hidden` (§17 Q8, Q10).
3. **Role optional.** A missing or blank role leaves `company` alone, no separator
   (strapi-changes.md entry 4).
4. **Site blockquote (ch10 B2.07).** Italic in both arrangements; a 6px rule beside the quote only;
   the attribution beneath, indented onto the quote's first letter; the name on its own line in roman
   serif (`--text-h6`), role and company beneath in `--text-body-sm`.
5. **Blue rule white**, not peridot (ch10 B2.07, C.07; ch02 v1.0 peridot uses).
6. **Tokens.** §16.
7. **Specimen.** §15 item 15: the media matrix, attribution stress, 326, the testimonial-group and
   stat-group compositions.
8. **Routes.** None migrated: every change to the prop shape is additive or loosens a requirement,
   so the seven compact call sites type-check unchanged. The view model (`src/content/types.ts`) still
   types `role` as required and carries no portrait or mark; that is Phase 5.1's view-model work.

## Amendment · 29 Sep 2026 (tracker 2.17)

Owner-approved, all four as proposed:

1. **The client mark renders.** The specimen's Dunmere and Aldermoor marks pointed at
   `/design/client-mark-mid.svg` and `/design/client-mark-wide.svg`, neither of which existed, so ruling
   P2 had never been seen rendered. Both are now drawn as fictional stress files (3:1, 120 × 40; 6:1,
   240 × 40, dimensions = viewBox), beside the other `client-mark-*` stress files. Not a real mark from
   `public/clients/`: the quotes are fictional, and a real client's logo under an invented quote would
   be a fabricated attribution — the same reason the stand-in portrait is never put beside Auxentios.
2. **Display scale.** `--text-quote-lg` and `--text-stat-lg` (§8, §16). Compact unchanged.
3. **The date once.** A `figure`/`figcaption` group when every figure shares one `checkedOn` (§2, §11,
   §14 item 13).
4. **Quote beside figures.** `Layout columns={{ base: 1, lg: [2, 1] }} colGap="column"` (§7, §9, §10).
   Its cost in narrow parents is §17 Q13.
5. **Specimen.** Resolved-role notes updated; a mixed-dates row added to the figure count ladder; the
   typography specimen lists both new roles and their breakpoint cuts.

## Appendix · Self-audit

```text
STRUCTURE
[x] All 18 sections present, in order, with the exact headings.
[x] Front matter states Tier 2 pattern, Status implemented and token prefix --proof-*; live vocabulary
    generation and repository search find no collision.
[x] Every Anatomy part appears in colour, geometry or is explicitly delegated to Layout, Prose,
    Button, native semantics or a future provision that renders no value.

NAMES
[x] Distinct token-name count: 38. Every referenced existing name resolves in the repository token
    layer; --proof-* names are the component layer declared by this spec.
[x] Glyph count: 0.
[x] Section, Layout and Cluster prop/value names are existing unions: as, rowGap, colGap, columns,
    minTrack, justify; ul, fit, tile, md, sm, tight, text, block, gutter, stack, column, between.
[x] Zero hex codes, rgb(), hsl(), Tailwind names, CSS declarations, selectors or media blocks.
[x] h3, stat and micro use their tracking companions; quote, body-sm and caption correctly have none.
[x] Every layout distance is a gap-scale role.
[x] Space-ramp reaches: 0.
[x] Literal measurements describe existing breakpoints, track tokens, the CTA track, Section cap or
    content stress harness; none becomes a new implementation value.

COLOUR AND CONTRAST
[x] Colour table has 6 rows × 4 complete cells; no delta and no blank.
[x] Every Proof text colour is at least 4.5:1 on its exact ground.
[x] Proof owns no focusable part; Prose and Button own and measure their own focus rings.
[x] The rule is explicitly marked decoration.
[x] One paragraph per surface explains the mapping; nested surfaces are specified.

STATES
[x] Proof claims only rest. Delegated link states remain with existing primitives.
[x] No Proof hover/pressed tokens exist, so the hover-versus-pressed requirement does not apply to
    its static parts; Button and Prose already differ in their interactive renderings.
[x] Excluded states have no tokens; no disabled opacity and no colour-only state.

LAYOUT, TYPE, SEMANTICS
[x] Every arrangement belongs to Layout; every columns declaration states colGap.
[x] No child margin and no responsive gap/type-role swap.
[x] Quote, attribution, value, label and checked text name measures or their containing tile.
[x] Source Button clears the 44px floor through extendHitArea.
[x] Native figure/list semantics need no authored ARIA idref or upward-walking selector.

COMPLETENESS
[x] All thirteen required content edge cases are answered.
[x] The unsized-parent row explains why no hard minimum is needed and names the sm tile preference
    plus the parent-owned 192px stress track.
[x] Do's and Don'ts name a type check, repository path, search, computed style or rendered tree.
[x] Specimen plan covers both arrangements, the one size, delegated states, all four surfaces, nested
    surfaces, every edge case, adjacent instances, CTA/prose contexts and narrow tracks.
[x] Section 16 says None and explains why component tokens are not a new request.
[x] Every open question has options, recommendation and status; zero blockers remain.
[x] Squint test: quote rail, figure rhythm, combined columns and compact prose interruption rather
    than one rectangle repeated.
```
