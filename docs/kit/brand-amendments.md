# Brand amendments made by the UI kit

The brand guide in `docs/brand/*.html` is not edited by kit packages. When a package changes how the
website uses the brand, the change is recorded here, against the chapter and passage it overrides.
`fdn-brand-docs` applies the list once the owner approves it (`visual-direction.md` § 9, § 10 item 1).
Until then, `visual-direction.md` and this file override the conflicting passages.

Each entry names the package that put it into code, so a reader can find the commit.

## ch02 Colour

| § | Brand guide says | The website now does | Package |
|---|---|---|---|
| The families · Peridot | "Two uses only: a marked phrase in text, and the carried item…" | Two uses on the website: `::selection` (peridot-500 under neutral-950, `globals.css`) and the carried item inside an illustration. The marked phrase is a social-media device (ch10) and is not used on the website: `<mark>` renders as the text around it (`reset.css`), and `--prose-mark-bg` / `--prose-mark-ink` are deleted. | `fdn-colour` |
| Peridot ramp note | "500 is the band behind a marked phrase, on every surface." | 500 is `::selection` on the website, and the marked phrase on social (ch10). | `fdn-colour` |
| Peridot on blue | (prose.css took peridot-400 as the quote rule on blue) | The quote rule on blue is white in Prose as in Proof (ch10 B2.07). No component layer reads the peridot ramp; `tokens:check` fails one that does. The only exemption is the `::selection` rule. | `fdn-colour` |
| What may sit on each ground | the "marked peridot-500 · highlight" swatch on each ground | Relabel when applied: selection (website), marked phrase (social). | — (doc only) |
| new: Blue as an accent | — | Blue is spent in tiers (Free, Accent, Signal, Field, Texture) and a band spends at most two of Accent, Signal, Field and Texture (`visual-direction.md` § 4.2; restated in `tokens/index.css`). On paper and tint, icons, list markers, step and index numerals, card arrows and hairline rules are ink at rest, never blue (§ 4.3). | `fdn-colour` (rule and token fixes) |
| new: Blue as an accent · section feet | — | A band's link-led foot (CtaRow) is blue at rest by default: its first action is `tone="primary"`, spending the band's Signal (`visual-direction.md` § 4.2 amendment, 6 Oct). The owner's ruling asks for more blue in the foreground (links, arrows, small marks) so the site never reads black and white; before this, every link foot was ink and an icon band with one rendered entirely in neutrals. A solid-led foot stays neutral unless the caller spends its Accent; the second action stays neutral. | `fdn-section-head` (fix round 2) |
| new: Blue as an accent · slider controls | — | The Slider's previous / next controls are blue at rest (glyph and hairline rule; ink lifts the glyph to brandeis-200, blue inverts to white) and fill with the surface's primary on hover and focus; the progress rail is neutral and its thumb, the current marker, blue. Counted **Free**, with the slider pager's current marker that `visual-direction.md` § 4.2 already lists: they are the slider's own navigation, so a G band that spends Signal on its quote rule still shows where to go next (owner, 6 Oct: more blue in the foreground, "slider controls take the blue accent"). Recorded in § 4.2 and `docs/specs/Slider.md` § 6. | `fdn-scroll` |

### Blue-at-rest fixes `fdn-colour` made in the token layer

Inventoried across every component layer, paper and tint blocks. Old → new.

| Token | Paints | Old (paper / tint) | New (paper / tint) | Other surfaces |
|---|---|---|---|---|
| `--lcrd-cue-ink` (new) | ListCard's arrow cue at rest | — (the cue read `--lcrd-link-ink`, brandeis-500 / 500) | neutral-900 / neutral-900 | ink white, blue white. `--lcrd-link-ink` is now the cue's hover and focus ink |
| `--svc-node` (deleted) | Thread diagram's connecting arrows | brandeis-500 / brandeis-500 | `--svc-ink`: neutral-900 / neutral-900 | ink brandeis-200 → white, blue paper → white |
| `--rbadge-star-fg` | RatingBadge star icon | brandeis-500 / brandeis-500 | neutral-900 / neutral-900 | ink and blue unchanged (the live badge is in the ink footer; chrome is exempt) |
| `--cta-marker-ink` | CtaSection point marker | neutral-600 / neutral-700 | unchanged, already ink | — |
| `--lcrd-number-ink` | ListCard ordinal | neutral-500 / neutral-600 | unchanged, already ink | — |
| `--flow-number-ink` | ProcessFlow step number | neutral-500 / neutral-600 | unchanged, already ink | — |
| `--prose-marker-ink` | Prose list marker | neutral-600 / neutral-700 | unchanged, already ink | — |
| `--btn-link-primary-fg` → `--btn-link-neutral-fg` (BlockCard's cta) | The read-more label and `arrow-right` on a linked text-only BlockCard | brandeis-500 / brandeis-500 | neutral-900 / neutral-900; brandeis-500 / 600 on the card's hover, focus and press | ink white (hover 300), blue white (hover 50). A call-site tone change in `BlockCard.tsx`, not a token edit: § 4.2 puts every per-card CTA on the neutral link and § 4.3 makes card arrows ink at rest. Second pass, 6 Oct |
| `--prose-link-rule` → `--prose-ink-muted` (Prose `<ins>`) | The underline under inserted text | brandeis-300 / brandeis-300 | neutral-600 / neutral-700 | ink neutral-400, blue brandeis-100. A blue underline at rest on text that does not navigate read as a link; the rule now matches `abbr`'s. Second pass, 6 Oct |

Kept blue at rest, because § 4.2 spends them: `--prose-quote-rule` and `--proof-quote-rule` (Signal, the
quote rule), `--toc-current-*` (Free, the current marker), every link and solid-primary token (Signal and
Accent), `--tex-ink` (Texture), `--logo-bar` (the wordmark), and SiteNav and SiteFooter (chrome, exempt).
`--sec-accent` / `--sec-accent-ink` are read only by the design specimen harness, not by the site.

**Second pass (6 Oct), method.** The first pass inventoried the token layer. The second also rendered
every specimen and the six service pages at 1440 and read the computed colour, fill, stroke, border and
text-decoration of every element and pseudo-element on paper and tint (chrome excluded). Outside the
spends listed above, it found the two rows marked "second pass": the BlockCard cta and Prose's `<ins>`.
`--svc-link-ink` / `-hover` in `service-page.css` are declared and read by nothing; they paint nothing,
so they are left for `cmp-service-pages`, which owns that file's next shape.

### `fdn-blue` (6 Oct 2026): blue is the recurring foreground accent — supersedes the rows above

Owner, 6 Oct: *"i want more blue in icons, links, and other places so it doesn't read black and white.
the reservation is only for being in the background. no surface is ever blue."* `fdn-colour` had read
"wisely" as "sparsely" and moved the foreground to ink; this reverses it. The **"new: Blue as an
accent"** row above is replaced by:

| § | Brand guide says | The website now does | Package |
|---|---|---|---|
| new: Blue as an accent | — | Blue is the recurring FOREGROUND accent, applied coherently (the same role is blue on every page): text links at rest, content icons, list and step markers and numerals, arrows and cues, small graphic marks, active and current states, slider controls, stat accents. brandeis-500 on paper and tint, brandeis-300 on ink, white on blue. Text links ≥ 4.5:1, icons and marks ≥ 3:1 on every surface. The words — headings, eyebrows, card titles at rest, body, Tag chips — stay ink. `visual-direction.md` § 4; `tokens/index.css`. | `fdn-blue` |
| How much of each · Blue | "≤ 5%. One band per page at most, usually the ask." | **Blue is never a ground**: no blue band, card fill or panel. The band rule counts blue MASSES only — ≤ 1 solid primary and ≤ 2 of solid primary, illustration and Texture per band; the foreground accent is never counted. The 5% ceiling applies to the masses. The Free / Accent / Signal tiers are retired. | `fdn-blue` |
| new: Cards and boxes | — | **No box around a card or text content**: a card is bounded by its gutter, rules and type, never a border or a fill. **Images keep their hairline frame** — an image is inherently a box. **Any card may carry an image.** | `fdn-blue` (recorded; already the kit's practice) |
| Peridot | (see the rows above) | Unchanged and confirmed: **`::selection` and illustrations only**. The `tokens:check` peridot gate stays. | `fdn-blue` (confirmed) |

Token changes, old → new (paper / tint; ink in the last column):

| Token | Paints | Was | Now | Ink |
|---|---|---|---|---|
| `--lcrd-cue-ink` (deleted) | ListCard's arrow cue | neutral-900 | the cue reads `--lcrd-link-ink` at rest again: brandeis-500 / 500, holding through hover, 700 on press | 300 |
| `--lcrd-marker-ink` | ListCard's icon marker | neutral-900 | brandeis-500 (6.17 / 5.51:1) | 300 (7.32:1) |
| `--lcrd-number-ink` | ListCard's index numeral | neutral-500 / 600 | brandeis-500 | 300 |
| `--flow-number-ink`, `--flow-arrow-ink` | ProcessFlow step numbers and arrows | neutral-500 / 600; neutral-900 | brandeis-500 | 300 |
| `--cta-marker-ink` | CtaSection point numerals | neutral-600 / 700 | brandeis-500 | 300 |
| `--acc-mark-ink` (`-hover`) | Accordion chevron | neutral-500 / 600 (hover 950) | brandeis-500 (hover 700) | 300 (hover 100) |
| `--prose-marker-ink` | Prose list markers and `<ol>` numerals | neutral-600 / 700 | brandeis-500 | 300 |
| `--crumb-current-ink` | the current breadcrumb | neutral-900 | brandeis-500 | 300 |
| `--rbadge-star-fg` | RatingBadge star | neutral-900 | brandeis-500 | 300 (unchanged) |
| `--proof-value-ink` | a Proof stat's numeral | neutral-950 | brandeis-500 | 300 |
| `--svc-mark` (new; replaces the deleted `--svc-node`) | service-page Thread arrows, sheet / frame / loop glyphs, comparison and needs-list checks | `--svc-ink` neutral-900 | brandeis-500 | 300; blue white. Crosses stay neutral (`--svc-ink-quiet` / `--svc-ink-muted`) |
| `--bcrd-cue-ink` (new) | BlockCard's title arrow on a covered card | the title's neutral-900 | brandeis-500; the title joins it on hover | 300; blue white |
| BlockCard cta, PageHero second action (the cmp-hero brief said neutral; this ruling is later and wins), CtaSection second action (ghost), CtaRow later links, Proof source links, EnquiryForm "See available times" | link labels and arrows | `tone="neutral"`, ink | `tone="primary"`: `--btn-link-primary-fg` / `--btn-ghost-primary-fg`, brandeis-500 | Button's ink block (300) |

| new: Blue as an accent · one solid ask | — | A band's one solid ask is the **blue** solid primary wherever it appears: the hero's first action, and a Banner's solid CtaRow (`emphasis="solid" tone="primary"`). CtaRow's neutral solid default stays for callers that deliberately spend no Accent; a Banner ask does not use it, because an ink "Book an audit" a scroll above a blue "Start a project" read as two systems. Recorded in `Banner.tsx` and `docs/specs/Banner.md`. | `cmp-banner` (fix round 2) |

Kept: Prose `<ins>` underline stays neutral (`fdn-colour` second pass) — it does not navigate, and a
blue underline would read as a link. Chrome (SiteNav, SiteFooter) is unchanged.

## ch03 Typography

Three new type roles, each a brief deviation the owner should accept knowingly (the two `cmp-testimonials` roles awaiting approval).

| § | Brand guide says | The website now does | Package |
|---|---|---|---|
| type ladder, stats | the mono stat roles stop at `--text-stat-lg` (54 / 43 / 40) | `--text-stat-xl` (96 / 80 / 64, line height 1, `--letter-spacing-display`) for ONE sourced figure set as a band's hero — read only by Proof's `figureSize="xl"`. Above display (67) on purpose: three mono characters at h1 scale read as a label beside a serif h2, not as the band's one idea. | `cmp-logos` |
| Type scale · stats | The stat role is mono (`--text-stat-lg`, 54) | New serif role `--text-score`, 105 / 84 / 67 (size and line height laddered, `-t` / `-m` steps, `primitives.css`), for ONE numeral that is the band: the rating-led testimonial's score. The brief asked for stat-lg; at 54, and even at display's 67, "4.8" did not outrank the 34 quote beside it, and in mono the full stop takes a whole cell so "4.8" read as three spaced glyphs. Never for a set of figures, which stays stat-lg. Its scale ("/ 5") sits at its side in the h3 serif. Reasoning in `docs/specs/Proof.md` (Amended 6 Oct). | `cmp-testimonials` |
| Type scale · quotes | Two quote roles: `--text-quote` (28) and `--text-quote-lg` (34) | A third, `--text-quote-xl`, 43 / 34 / 25, for the centred typographic G band only: the quote is the band's one idea alone on the column, and at 34 across 1010 it read modest beside the reference bands. | `cmp-testimonials` |

## ch05 Imagery

| § | Brand guide says | The website now does | Package |
|---|---|---|---|
| § 6 Corner radius | "--radius-0 on every image… one exception: the SiteNav rail card" (amended by 5b for BlockCard) | Every **photograph** box takes `--radius-8` and no frame: Media's own (`--media-photo-radius`, for B, K, the banner, the aside, the hero photograph), BlockCard's crop box (unchanged), and ListCard's 160 thumbnail for every kind (`--lcrd-thumbnail-radius`, which also drops the capture hairline there). Captures elsewhere stay at 0 with the hairline; cut-outs and illustrations are unchanged. The compact 64px proof portrait takes `--radius-4` on its own clipping box (`--proof-portrait-radius-compact`, built in `fdn-media`'s fix round, 6 Oct 2026); the featured testimonial portrait is `cmp-testimonials`'. | `fdn-media` |
| § 9 Placement specs | 7 placements; full-column media never crops | A photograph may be cut to one of eight ratios in its own box (Media `ratio`: 4:5, 5:4, 3:1, 4:1, 3:2, 16:9, 4:3, 1:1; 4:1 is the title-led hero's panorama, `cmp-hero` fix round 2), anchored at the master's focal point (`focus`). Only photographs: captures, cut-outs and illustrations still render whole. A placement takes a photo only when its crop is ≥ 1.9× the rendered box at 1470 (`src/lib/photos.ts`, `qualifies`). | `fdn-media` |
| § 9a Covers | "never a stock stand-in" | On internal review builds a card with no cover takes a catalogue photograph with no legible screen, in the page's tone family, unlabelled (`standIn: true` in the view model, `data-stand-in` on the image), drawn from the catalogue outside visual-direction § 5.6's slot table: no stock photo § 5.6 gives any page's B, I, K or aside slot (`RESERVED_STOCK`), and none of the page's own. A set takes stand-ins for every coverless card or for none, and a set with none renders as text cards with their named cta. Live on the six service pages' Resources cards, and on any case card whose cover the CMS lacks. The cool pages have four qualifying photographs, so a cool page with more than four coverless cards would render a set as text cards until the catalogue grows. | `fdn-media` |
| new § 11 Tone | — | Every kit photograph carries measured `temperature` (warm ≥ 0.10 r−b, cool < 0.02, neutral between) and `saturation` (vivid ≥ 0.40 mean HSV S) in `catalogue.json`, written by `npm run photos:tone`; the result matches visual-direction § 5.5's table exactly. A page is one family (warm + neutral or cool + neutral) with ≤ 1 vivid photo; each service story names its family, and its stand-in pool is filtered by it. | `fdn-media` (tags); `fdn-gates` (the page check) |
| § 7 Captions | every non-decorative image has a caption | Kit photographs are atmosphere photographs: `getKitPhoto` returns `alt: ""` unless a placement passes one. | `fdn-media` |
| intro note, § 10 Sourcing | "Stock photography is not published…" | Unchanged in code: kit stock reaches only `/design/**` routes. Public use is visual-direction § 10 item 3. | — (doc only) |
| § 10 Client logos · size | "scaled so its bounding-box area matches the set's target area, then capped at the set's maximum height and width… corrected by up to ±15% of that size" | Read in that order: the correction scales the capped size, and only the height cap (ruling P2, ~40) applies again. The width cap is the set's limit before correction, so a mark with a recorded upward correction may reach 184 (LatitudePay, +15%, 175). Recorded corrections: LatitudePay +15%, SafeXpay +8%, Doodle, GT Tools and Incluude −15%. Below 768 the target and caps step down to 44 / 32 / 128. | `cmp-logos` |

## Kit layout notes recorded by `cmp-banner`

These are kit-layout rules rather than brand-guide overrides; they are listed here so the integrator
finds them in one place.

| Rule | Where it lives | Package |
|---|---|---|
| The I banner's H-row is lead + 24 + action; ContentSection's stays lead + 48 + action. | `visual-direction.md` § 1.4 amendment; `Banner.tsx` | `cmp-banner` |
| Never two `beside` banners within sight of each other on a page (adjacent, or split only by a strip or a short band). Separate them by a band of another arrangement, or make one `below`. | `Banner.tsx` (`BesideProps`); `docs/specs/Banner.md` | `cmp-banner` |
| **Open proposal:** the Banner lead steps from the lead role to the body role below 768 (`banner.css`). If a second head wants the same phone step, move it into `--text-lead`'s own `-m` ladder and delete the component-layer block. | `tokens/components/banner.css` | `cmp-banner` |
| Statement `head-half` follows § 6.3 exactly: rect, top −200, end −120, 34% × 296, blur 160, on the band's field. | `Statement.tsx` | `cmp-banner` (fix round 2) |

## Kit amendments (visual-direction, not the brand guide)

Recorded here so the kit doc and the components agree; each is also amended in place in
`docs/kit/visual-direction.md`.

| § | Kit doc said | The kit now does | Package |
|---|---|---|---|
| § 3.4 L | `[5, 7]`: copy + points beside the EnquiryForm | `[10, 7]` from 1280 (copy 673, form 471) and `[1, 1]` from 1024, top-aligned. The full form holds its own 470 measure (`--enq-form-max-inline`), so in a 667 track it left ~197 of dead track at the band's end edge, and at 1024 a 356 track wrapped its two actions. `[5, 7]` stays for the photo + compact-form close (cmp-form). | `cmp-cta` |
| § 6.3 `closing` | rect, bottom −260, start −120, 44% × 320, blur 200 | A pixel equaliser that rises from the band's edge and fades (`TextureClosing`; the full geometry is in § 6.3's row). The haze had no silhouette and, at the texture's fixed cell alpha, read as a pale tinted strip — close to the banned blue ground. Placed by CtaSection in a field a `stack` clear of the copy; `horizon` below 1024. | `cmp-cta` |

## visual-direction § 6.3 · `counterweight` (cmp-media-split, fix round 1, 6 Oct 2026)

| Was | Now | Why |
|---|---|---|
| ellipse, bottom −260, side −180, 34% × 340, blur 180; the box rises 80 into the band | `TextureCounterweight` (Texture): ellipse, bottom 20, side −12%, 48% × 56, blur 16 — wholly inside the 96 bottom padding, leaving the band by its side edge | The 180 feather ran under the last tile row (texture behind text) and was cut flat by the band's bottom edge, reading as an artefact. The recipe now lives in Texture, so no route restates its numbers. |

The B media split's head takes the display role when it is ≤ 22 characters (one display line at
1280+), and its eyebrow takes the accent ink (`--csec-eyebrow-accent-ink`). The fold holds the photo
at 477 (a [5, 4] split at 4:5 is 987 tall), so the head's scale is the band's dominant element.

## visual-direction § 6.3 · `counterweight`, redrawn (cmp-media-split, final fix round, 6 Oct 2026)

| Was | Now | Why |
|---|---|---|
| a blurred ellipse in the band's bottom padding, leaving by the viewport's side; lg only | `media.counterweight`: a 160-tall field in the copy column, pinned on the photo's bottom edge, hard at both sides and the foot, feathered at the top; every width | At the grid's 21% peak a feathered shape with no edge read as moiré, ran past the content column under empty space, and weighed nothing. In flow, its edges are the column's. Bands whose copy fills the photo (four tiles, a ruled list) carry none. |

The B band's photograph may take the wide track (`media.weight="photo"`, 6:5 in 667) when its copy is
short, and the head's scale is an explicit `media.head`, not a length rule.

## Kit layout notes recorded by `cmp-readdown`

| Rule | Where it lives | Package |
|---|---|---|
| **D-faq ceilings re-derived from the Accordion as it renders: ≤ 5 questions, ≤ 4 with a CtaRow** (was ≤ 7 / ≤ 5). § 1.4 budgets a closed item at 64; the shipped Accordion row is 77 (24 + h5 28 + 24 + rule), and its first answer is open on arrival (+ ~93). Seven measured 960 at 1470 (seven closed would still be 864), five with a CtaRow 844. Five alone is 805, four with a CtaRow 767. Density stays default (§ 1.3: density is never a squeeze). | `src/app/design/kit/readdown/page.tsx` (captions); § 1.4 D-faq row and § 1.5 to be amended by the integrator | `cmp-readdown` |
| **D's body is the ReadDown set mode** (ListCard folder): rows on the content edge, ≤ 3 in one column at h4, two columns as one list with level rules at h5. The `rail` texture is the set's `rail` prop, shown from 1440 only. | `src/patterns/ListCard/ReadDown.tsx`; `docs/specs/ListCard.md` | `cmp-readdown` |
| **D's photo moves from the head track into the body (fix round 1).** "Photo aside, 3:2 at 381" (§ 1.4, § 3.3) weighed about as much as a paragraph and ended 80 to 95 below the last rule. The photo form (`ReadDown photo`): from 1440 the body track splits into the rows and the photo at `column`, and the photo runs the rows' height, so both end on the last rule; 349 × 526 at three rows (2:3), twice the old area. One column, two or three rows at h5 (the 349 track's step). Bands: 718, 782 with a CtaRow. Below 1440 the photo sits above the rows, 16:9 from 1024 and 3:2 below. The stat aside is unchanged. § 1.4's "photo aside" row and § 3.3's D entry to be amended by the integrator. | `src/patterns/ListCard/ReadDown.tsx`, `src/lib/image-sizes.ts` (`READ_DOWN_PHOTO`) | `cmp-readdown` |
| **§ 6.3 `rail` sits on the photograph's side, photo form only (fix round 1).** At 1440 to 1470 the outer margin is 100 to 115, so the recipe's blur reaches about 120 into the column; beside rows it ran under titles and rules and read as a smudge. On the photo's side the same geometry passes under the photograph, never under text, and the grid reads as coming out from behind the image. The recipe's numbers are unchanged; its placement rule gains "on the side of the band's photograph". | `src/patterns/ListCard/ReadDown.tsx` | `cmp-readdown` |
| **N's body is the Contrast pattern**, Fit's look moved unchanged (`--svc-*` values restated as `--cntr-*`). | `src/patterns/Contrast/`; `docs/specs/Contrast.md` | `cmp-readdown` |

## Amendments recorded by `page-product-design`, fix round 1 (7 Oct 2026)

| Where | It said | The kit now does | Why |
|---|---|---|---|
| ch10 B2.07 (site blockquote) | a 6px brandeis-500 rule beside the quote | a 2px rule (`--border-width-rule-quote` → `--border-width-2`), still blue | At 6 the bar beside a 34px quote was the heaviest line on a page of hairlines. 2 is the deck hairline Prose's blockquote already read, so the two quote treatments are one again. |
| Kit eyebrows (ContentSection, CtaSection, Statement, Banner) | a blue square on ContentSection eyebrows, a 32 × 2 blue rule on Statement and Banner, nothing on the offer and the close; the media split's eyebrow set in blue | one mark on every band eyebrow: the 6 blue square, the label in the quiet ink | One page showed four eyebrow treatments, which read as accidents. The template now gives every band after the hero an eyebrow, and the kit gives every eyebrow the same mark. |
| § 6.3 `closing` | a field the width of the copy column under the copy, a blurred horizon below 1024 | the band's foot, edge to edge, a `stack` under the lowest line of either column, at every width (half the columns below 1024) | Under a copy column as long as its form the field was ~80 tall and stopped mid-column: it read as truncated. At 390 the blurred horizon was invisible. |
| § 3.4 E | H-compact + a full-column diagram | a thread's E centres its head from 1024 (start below) and centres its stages on their tracks; every other diagram takes the H-row | A stacked head spent ~100 of the diagram's fold; a centred head over a vertical thread at 390 was two alignments in one band. |
| § 3.4 K | the copy column stretched to the photo, actions pinned to its foot | the copy centred on the photo, the actions a `stack` under the points; a landscape master takes the [5, 7] landscape offer | The pin opened a ~160 hole between three one-line points and the buttons. |
| § 3.7 item 4 (asides) | 21:9 below 1024 | 4:3 below 768, 21:9 from 768 to 1023 | At 326 the panorama was a 326 × 140 strip. |
| § 3.7 item 2 (icon sets) | six linked icon cards scroll on a phone | a router stays stacked (`BlockCardSet scroll="never"`), and every icon card sets its glyph beside the title below 768 | A router hid five of six services behind a gesture; stacked with the glyph on its own row the band ran to 1757. |
| § 5.6 product-design | B studio-sticky-board-ux · I sticky-wall-soft-focus · K pair-laptop-notebook · aside 1 hand-sketch-wireframe · aside 2 moodboard-wall-desk | B studio-sticky-board-ux · no I · K designer-tablet-monitor (landscape) · aside 1 studio-whiteboard-crit · aside 2 hand-sketch-wireframe | The banner repeated B's sticky wall at the page's largest size and soft; K's lifestyle desk and F's car-design moodboard were off-brand for a B2B product studio. |

## Amendments recorded by `page-product-design`, fix round 2 (6 Oct 2026)

| Where | It said | The kit now does | Why |
|---|---|---|---|
| § 3.4 J (service page) | the sentence in the [1, 2] split, `head-half` texture | centred across the full measure unless a neighbour is centred (Statement `align="center"`), the stepped `corner` field (TextureCorner) at every width | Nine of twelve bands were splits, and F, C-pair, J and L all started on one 1/3 line. The head-half read as a pale smudge at 1470, reached the sentence and vanished at 390. |
| § 3.4 M (service page) | a centred head over three covers | the H-row (title left, intro right) over a full-width card row; a G with a lead takes the H-row too | A different shape from the centred H and D-faq heads, and ~70 of headroom: stacked, the stress M and G ran to 823 of 830. |
| § 3.4 N | peer halves of hairline rows | Contrast `emphasis="yes"`: the needs the primary [2, 1] column, two up at h5; the exclusions narrower and quieter | Two equal text lists read as a document table with dead runs beside the short items. |
| § 3.4 K points | the 01/02 numeral | a check row (`check-circle`); point labels in the step-title ink | The numeral ran three times down one page (F, K, L), and at neutral-700 K's and L's titles read greyed out beside F's. |
| § 3.4 E diagrams | a record sheet and a parts panel on their own ground in a full border; boxed tables with a grey head row; black meter marks | rules only (a head rule and row rules; two strong rules bracketing the four parts); DataTable `frame="ruled"`; the meters, and the bridge's dashed edges, in the blue accent | Owner ruling: no boxes around cards or text content. Blue is the foreground accent, so a diagram never reads black and white. |
| § 3.4 E caps | copy tuned to the fold | structural caps the template enforces: spectrum 5 options, record 8 fields, bridge 6 items; the rest on the deep page (`more`) | The stress route passed with 1px to spare; a fixture a line longer failed. |
| § 3.7 cadence at 390 | K's photo after its copy | `CtaSection media.phone="before"` where a neighbour is a head → photo → body band | K and C-icon stacked as the same rectangle twice. |
| ContentSection head track | 1 : 2 from 1024 | 5 : 7 from 1024, 1 : 2 from 1440 | At 1024 a 43 h2 in 288 broke into one- and two-word lines across four bands. |
| § 5.6 product-design B | studio-sticky-board-ux | hands-trackpad | The candy sticky wall was the page's most saturated frame, beside the blue icon tiles, and the one off-key image once K, F and the aside were tonal. |
| § 6.4 product-design | counterweight on B | still none on B: the four-tile B has no room (its copy column fills the photo's height), so J spends the placement as the `corner` field. **Open for the owner**: accept J's corner as the page's second placement, or cut B to two tiles so the counterweight can return. | |
