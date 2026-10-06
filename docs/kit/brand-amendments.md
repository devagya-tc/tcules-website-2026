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

## ch05 Imagery

| § | Brand guide says | The website now does | Package |
|---|---|---|---|
| § 6 Corner radius | "--radius-0 on every image… one exception: the SiteNav rail card" (amended by 5b for BlockCard) | Every **photograph** box takes `--radius-8` and no frame: Media's own (`--media-photo-radius`, for B, K, the banner, the aside, the hero photograph), BlockCard's crop box (unchanged), and ListCard's 160 thumbnail for every kind (`--lcrd-thumbnail-radius`, which also drops the capture hairline there). Captures elsewhere stay at 0 with the hairline; cut-outs and illustrations are unchanged. The compact 64px proof portrait takes `--radius-4` on its own clipping box (`--proof-portrait-radius-compact`, built in `fdn-media`'s fix round, 6 Oct 2026); the featured testimonial portrait is `cmp-testimonials`'. | `fdn-media` |
| § 9 Placement specs | 7 placements; full-column media never crops | A photograph may be cut to one of seven ratios in its own box (Media `ratio`: 4:5, 5:4, 3:1, 3:2, 16:9, 4:3, 1:1), anchored at the master's focal point (`focus`). Only photographs: captures, cut-outs and illustrations still render whole. A placement takes a photo only when its crop is ≥ 1.9× the rendered box at 1470 (`src/lib/photos.ts`, `qualifies`). | `fdn-media` |
| § 9a Covers | "never a stock stand-in" | On internal review builds a card with no cover takes a catalogue photograph with no legible screen, in the page's tone family, unlabelled (`standIn: true` in the view model, `data-stand-in` on the image), drawn from the catalogue outside visual-direction § 5.6's slot table: no stock photo § 5.6 gives any page's B, I, K or aside slot (`RESERVED_STOCK`), and none of the page's own. A set takes stand-ins for every coverless card or for none, and a set with none renders as text cards with their named cta. Live on the six service pages' Resources cards, and on any case card whose cover the CMS lacks. The cool pages have four qualifying photographs, so a cool page with more than four coverless cards would render a set as text cards until the catalogue grows. | `fdn-media` |
| new § 11 Tone | — | Every kit photograph carries measured `temperature` (warm ≥ 0.10 r−b, cool < 0.02, neutral between) and `saturation` (vivid ≥ 0.40 mean HSV S) in `catalogue.json`, written by `npm run photos:tone`; the result matches visual-direction § 5.5's table exactly. A page is one family (warm + neutral or cool + neutral) with ≤ 1 vivid photo; each service story names its family, and its stand-in pool is filtered by it. | `fdn-media` (tags); `fdn-gates` (the page check) |
| § 7 Captions | every non-decorative image has a caption | Kit photographs are atmosphere photographs: `getKitPhoto` returns `alt: ""` unless a placement passes one. | `fdn-media` |
| intro note, § 10 Sourcing | "Stock photography is not published…" | Unchanged in code: kit stock reaches only `/design/**` routes. Public use is visual-direction § 10 item 3. | — (doc only) |
