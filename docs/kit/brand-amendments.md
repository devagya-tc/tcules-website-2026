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
| `--rbadge-star-ink` | RatingBadge star icon | brandeis-500 / brandeis-500 | neutral-900 / neutral-900 | ink and blue unchanged (the live badge is in the ink footer; chrome is exempt) |
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
| `--rbadge-star-ink` | RatingBadge star | neutral-900 | brandeis-500 | 300 (unchanged) |
| `--proof-value-ink` | a Proof stat's numeral | neutral-950 | brandeis-500 | 300 |
| `--svc-mark` (new; replaces the deleted `--svc-node`) | service-page Thread arrows, sheet / frame / loop glyphs, comparison and needs-list checks | `--svc-ink` neutral-900 | brandeis-500 | 300; blue white. Crosses stay neutral (`--svc-ink-quiet` / `--svc-ink-muted`) |
| `--bcrd-cue-ink` (new) | BlockCard's title arrow on a covered card | the title's neutral-900 | brandeis-500; the title joins it on hover | 300; blue white |
| BlockCard cta, PageHero second action, CtaSection second action (ghost), CtaRow later links, Proof source links, EnquiryForm "See available times" | link labels and arrows | `tone="neutral"`, ink | `tone="primary"`: `--btn-link-primary-fg` / `--btn-ghost-primary-fg`, brandeis-500 | Button's ink block (300) |

| new: Blue as an accent · one solid ask | — | A band's one solid ask is the **blue** solid primary wherever it appears: the hero's first action, and a Banner's solid CtaRow (`emphasis="solid" tone="primary"`). CtaRow's neutral solid default stays for callers that deliberately spend no Accent; a Banner ask does not use it, because an ink "Book an audit" a scroll above a blue "Start a project" read as two systems. Recorded in `Banner.tsx` and `docs/specs/Banner.md`. | `cmp-banner` (fix round 2) |

Kept: Prose `<ins>` underline stays neutral (`fdn-colour` second pass) — it does not navigate, and a
blue underline would read as a link. Chrome (SiteNav, SiteFooter) is unchanged.

## ch05 Imagery

| § | Brand guide says | The website now does | Package |
|---|---|---|---|
| § 6 Corner radius | "--radius-0 on every image… one exception: the SiteNav rail card" (amended by 5b for BlockCard) | Every **photograph** box takes `--radius-8` and no frame: Media's own (`--media-photo-radius`, for B, K, the banner, the aside, the hero photograph), BlockCard's crop box (unchanged), and ListCard's 160 thumbnail for every kind (`--lcrd-thumbnail-radius`, which also drops the capture hairline there). Captures elsewhere stay at 0 with the hairline; cut-outs and illustrations are unchanged. The compact 64px proof portrait takes `--radius-4` on its own clipping box (`--proof-portrait-radius-compact`, built in `fdn-media`'s fix round, 6 Oct 2026); the featured testimonial portrait is `cmp-testimonials`'. | `fdn-media` |
| § 9 Placement specs | 7 placements; full-column media never crops | A photograph may be cut to one of seven ratios in its own box (Media `ratio`: 4:5, 5:4, 3:1, 3:2, 16:9, 4:3, 1:1), anchored at the master's focal point (`focus`). Only photographs: captures, cut-outs and illustrations still render whole. A placement takes a photo only when its crop is ≥ 1.9× the rendered box at 1470 (`src/lib/photos.ts`, `qualifies`). | `fdn-media` |
| § 9a Covers | "never a stock stand-in" | On internal review builds a card with no cover takes a catalogue photograph with no legible screen, in the page's tone family, unlabelled (`standIn: true` in the view model, `data-stand-in` on the image), drawn from the catalogue outside visual-direction § 5.6's slot table: no stock photo § 5.6 gives any page's B, I, K or aside slot (`RESERVED_STOCK`), and none of the page's own. A set takes stand-ins for every coverless card or for none, and a set with none renders as text cards with their named cta. Live on the six service pages' Resources cards, and on any case card whose cover the CMS lacks. The cool pages have four qualifying photographs, so a cool page with more than four coverless cards would render a set as text cards until the catalogue grows. | `fdn-media` |
| new § 11 Tone | — | Every kit photograph carries measured `temperature` (warm ≥ 0.10 r−b, cool < 0.02, neutral between) and `saturation` (vivid ≥ 0.40 mean HSV S) in `catalogue.json`, written by `npm run photos:tone`; the result matches visual-direction § 5.5's table exactly. A page is one family (warm + neutral or cool + neutral) with ≤ 1 vivid photo; each service story names its family, and its stand-in pool is filtered by it. | `fdn-media` (tags); `fdn-gates` (the page check) |
| § 7 Captions | every non-decorative image has a caption | Kit photographs are atmosphere photographs: `getKitPhoto` returns `alt: ""` unless a placement passes one. | `fdn-media` |
| intro note, § 10 Sourcing | "Stock photography is not published…" | Unchanged in code: kit stock reaches only `/design/**` routes. Public use is visual-direction § 10 item 3. | — (doc only) |

## Kit layout notes recorded by `cmp-banner`

These are kit-layout rules rather than brand-guide overrides; they are listed here so the integrator
finds them in one place.

| Rule | Where it lives | Package |
|---|---|---|
| The I banner's H-row is lead + 24 + action; ContentSection's stays lead + 48 + action. | `visual-direction.md` § 1.4 amendment; `Banner.tsx` | `cmp-banner` |
| Never two `beside` banners within sight of each other on a page (adjacent, or split only by a strip or a short band). Separate them by a band of another arrangement, or make one `below`. | `Banner.tsx` (`BesideProps`); `docs/specs/Banner.md` | `cmp-banner` |
| **Open proposal:** the Banner lead steps from the lead role to the body role below 768 (`banner.css`). If a second head wants the same phone step, move it into `--text-lead`'s own `-m` ladder and delete the component-layer block. | `tokens/components/banner.css` | `cmp-banner` |
| Statement `head-half` follows § 6.3 exactly: rect, top −200, end −120, 34% × 296, blur 160, on the band's field. | `Statement.tsx` | `cmp-banner` (fix round 2) |

## Kit layout notes recorded by `cmp-readdown`

| Rule | Where it lives | Package |
|---|---|---|
| **D-faq ceilings re-derived from the Accordion as it renders: ≤ 5 questions, ≤ 4 with a CtaRow** (was ≤ 7 / ≤ 5). § 1.4 budgets a closed item at 64; the shipped Accordion row is 77 (24 + h5 28 + 24 + rule), and its first answer is open on arrival (+ ~93). Seven measured 960 at 1470 (seven closed would still be 864), five with a CtaRow 844. Five alone is 805, four with a CtaRow 767. Density stays default (§ 1.3: density is never a squeeze). | `src/app/design/kit/readdown/page.tsx` (captions); § 1.4 D-faq row and § 1.5 to be amended by the integrator | `cmp-readdown` |
| **D's body is the ReadDown set mode** (ListCard folder): rows on the content edge, ≤ 3 in one column at h4, two columns as one list with level rules at h5. The `rail` texture is the set's `rail` prop, shown from 1440 only. | `src/patterns/ListCard/ReadDown.tsx`; `docs/specs/ListCard.md` | `cmp-readdown` |
| **D's photo moves from the head track into the body (fix round 1).** "Photo aside, 3:2 at 381" (§ 1.4, § 3.3) weighed about as much as a paragraph and ended 80 to 95 below the last rule. The photo form (`ReadDown photo`): from 1440 the body track splits into the rows and the photo at `column`, and the photo runs the rows' height, so both end on the last rule; 349 × 526 at three rows (2:3), twice the old area. One column, two or three rows at h5 (the 349 track's step). Bands: 718, 782 with a CtaRow. Below 1440 the photo sits above the rows, 16:9 from 1024 and 3:2 below. The stat aside is unchanged. § 1.4's "photo aside" row and § 3.3's D entry to be amended by the integrator. | `src/patterns/ListCard/ReadDown.tsx`, `src/lib/image-sizes.ts` (`READ_DOWN_PHOTO`) | `cmp-readdown` |
| **§ 6.3 `rail` sits on the photograph's side, photo form only (fix round 1).** At 1440 to 1470 the outer margin is 100 to 115, so the recipe's blur reaches about 120 into the column; beside rows it ran under titles and rules and read as a smudge. On the photo's side the same geometry passes under the photograph, never under text, and the grid reads as coming out from behind the image. The recipe's numbers are unchanged; its placement rule gains "on the side of the band's photograph". | `src/patterns/ListCard/ReadDown.tsx` | `cmp-readdown` |
| **N's body is the Contrast pattern**, Fit's look moved unchanged (`--svc-*` values restated as `--cntr-*`). | `src/patterns/Contrast/`; `docs/specs/Contrast.md` | `cmp-readdown` |
