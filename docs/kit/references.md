# Reference teardowns

Designer-grade teardowns of the four reference sites the owner chose (5 Oct 2026). Each has measurements, a section-by-section catalogue tagged by kit family, and crop paths (session scratchpad, kit/refs/). Read alongside visual-direction.md.

# Teardown: QuantumLab home v3 (quantumlabtemplate.webflow.io/home-pages/home-v3)

**Capture.** Playwright from the showcase worktree's node_modules. The page loaded to network idle, was scrolled in 200px steps, and was captured at 1470×830 and 390×844.
- Script: `/private/tmp/claude-501/-Users-devagya-tcules-website-2026/2f41d825-f6b6-4b91-9b83-7f3b883d2678/scratchpad/kit/refs/quantum/shoot.cjs`, with `measure.cjs` and `m5.cjs` beside it.
- Raw measurements: `measure-1470.json` and `measure-390.json` in the same folder.
- Full pages: `ref-quantum-full-1470.png` (1470×5285) and `ref-quantum-full-390.png` (390×5668).
- Mobile strips: `ref-quantum-390-part1..4.png`.
- In every crop, the purple card in the lower right is the Webflow template badge. It is not part of the design.

Page shape at 1470: nav, hero, about/stats, principles tabs, CTA, testimonials, blog, footer. Seven bands plus the footer, about 5.3k px.

---

## 1. What makes it calm and elegant (specific moves)

1. **One type family, one weight, one tracking.**
   - Every heading is Inter Tight at weight 500. There is no bold anywhere.
   - Every role from 14px to 44.8px carries **-0.03em** tracking.
   - Hierarchy comes from size alone, on a short ladder: 44.8 / 36 / 30 / 24 / 20 / 16 / 14.
   - There are three greys: body #505050, eyebrow #ABABAB, rules #E3E3E3.
   - With only one thing changing, the page reads as quiet.
2. **Zero colour accent.** The site is fully monochrome. Ink is #161616, ground is white, wells are #FBFBFB. The only saturated pixel on the page is the Webflow badge. Character comes entirely from the imagery.
3. **Imagery outweighs text by a wide margin.**
   - Hero: the pixel art is 1138×614 against a 370×240 text block, about 8:1 by area.
   - Principles: the media well is 555×645 against a 440-wide text column.
   - Blog cards: the image is about 60% of card height.
   - The text blocks are small and the imagery is large. That proportion carries the composition.
4. **Very narrow text measures, centred inside a lot of air.**
   - The hero H1 is 370px wide, about 14 characters, so it breaks into two short lines.
   - Body copy is capped at 370–550px everywhere. The CTA body is 430, the blog intro 430, the testimonial intro 400.
   - No paragraph runs wider than about 60 characters.
5. **Very tight head stacks, very loose section rhythm.**
   - Eyebrow to heading is 4–8, heading to body 8, body to actions 40–49.
   - Section padding is 140 top and bottom.
   - Consecutive white bands join with one side zeroed (`pd-none`, `pd-top-0`), so the beat between any two blocks is always exactly 140, never 280.
   - The contrast between the 8px internal gaps and the 140px external ones is the main source of the calm.
6. **The type sits in a clearing the imagery leaves for it.** The hero art is a U-shaped field that steps down in the centre. The headline sits in the empty valley, so the art frames the type without ever running behind it.
7. **Cells, not cards.**
   - Content sits in a ruled table: a `border-wrapper` draws top and left, and each cell draws right and bottom, so adjacent cards share one 1px #E3E3E3 edge.
   - The gap between cards is 0. Horizontal rules run past the container and fade out over 150px (`corner-gradient`), so the grid seems to continue off the page instead of stopping in a box.
   - Section 4 says what replaces this for Tcules.
8. **State shown by dimming, not by colour.**
   - Principles tabs: the inactive rows sit at opacity 0.5 with their description collapsed, and the active row shows its body.
   - The media well swaps to match the active row.
   - Testimonial logo tabs work the same way, with greyed logos and a full-ink active one.
9. **Controls are flat ink rectangles.**
   - Buttons are 66 tall with 24px side padding and a 14px uppercase 600 label. There is no radius and no shadow, and hover is a transform only.
   - The CTA joins two buttons edge to edge, one white and one ghost on ink, into a single 430-wide bar.
   - Without radius or shadow, the buttons carry the same voice as the ruled grid.
10. **Bands fit inside a viewport.** The content height of each band, excluding padding, is 571 (about), 645 (principles), 347 (testimonial panel) and 564 (blog cards). Every band reads as one screen.

---

## 2. Measurements (1470×830 unless noted)

| What | Value | Tcules nearest step |
|---|---|---|
| Content column | container 1186, 24 padding, so **1138** content at x=166 | 1240 column (ours is wider) |
| Section padding | 140 / 140 (principles, testimonials); hero 72 / 140; CTA 100 / 200; joined bands 0 on one side | `section-open` 128 |
| Section padding, 390 | 64 / 64; hero 32 / 64; CTA 48 / 48 | `column` 64 |
| Rendered band heights | hero 856, about 571, principles 925, CTA 567, testimonials 730, blog 833, footer 736 | fits 830 except principles (padding included) |
| Nav | 67 tall; framed by 1px #E3E3E3 left and bottom; CTA is a flush ink block at right, 170×66 | — |
| Eyebrow | 14 / 17.5, weight 500, uppercase, **-0.42px** tracking, #ABABAB | eyebrow line box 14 |
| H1 hero | 44.8 / 51.52, -1.344px (-0.03em), weight 500, width **370** | — |
| H2 standard | 36 / 45, -1.08px; about H2 30 / 37.5 at width 600 | — |
| H3 card / tab | 24 / 30 (blog, quote); 20 / 25 (tab title) | — |
| Body | 16 / 24, -0.48px, #505050 | — |
| Stat numeral | 36 / 45 (7X, 99.5%) | — |
| Mobile type | H1 32 / 36.8, H2 24 / 30, about H2 22 / 27.5, H3 20 or 18, body 14 / 21, eyebrow 12 / 15 | — |
| Eyebrow to heading | 4–8 | `inline` / `tight` |
| Heading to body | 8 (in every block) | `tight` |
| Body to actions | 40 (hero), 49 (CTA) | `stack` 48 |
| Head block to content | 32 (testimonials, blog); 65 (principles: heading to first tab) | `gutter` / `column` |
| Split header | title left 337–430 wide; intro right, 400 wide, flush to column end | Layout [2,1] or split |
| Text max-widths | hero 370; about body 550; CTA 430; testimonial intro 400; blog intro 430; tab body 360 | — |
| About / stats panel | 745 left well (#FBFBFB, padding 64 / 40 / 32, gap 40) and 392 right column of 3 × 168 rows; each row has padding 40, a 64 outlined icon square, gap 16, numeral 36, label 16; a full-width 66 button fills the last row | — |
| Principles tabs | grid 440 tabs + 555 media (about 143 between); each tab has 32 above and below and a 1px #F3F3F3 divider; icon square 64; title to body 0 | — |
| Principles media well | 555×645, 1px #E3E3E3, padding 20, #FBFBFB fill, art 513×597 | — |
| Testimonial panel | 379 logo-tab column (3 × 115 cells) + 758 quote pane, padding 64, space-between; quote 24 / 30 at width 629; quote to attribution 49; avatar 40; attribution 16 / 20 two-line; stat 36 right-aligned | — |
| Blog card | 570 wide, 0 gap, shared 1px edge; image well padding 20 / 24 / 0, image 520×316; content padding 24 / 40 / 56; title to body 8; body to meta 12; meta 14 uppercase with "/" separators; 60×60 arrow cell in the bottom-right corner | — |
| CTA band | #161616 full-bleed; centred eyebrow, H2 36, body 430; button bar 214+214, no gap; pixel "equaliser" art 1470×444 rising from the bottom | — |
| Footer | ruled 4-row table on ink: top row 135; middle padding 80 / 64, 2-col 456 + 456, gap 48; link rows 53 tall with chevrons; contact row 3 cells; bottom row padding 32 | — |
| Image : text area | hero about 8:1; principles 1.3:1; blog card 1.5:1 (image to content) | — |
| How cards are delimited | 1px hairline grid (#E3E3E3 on paper, #292929 on ink), 0 gaps, #FBFBFB well fills, rule-end fades | conflicts, see §4 |
| Accent colour | **none**; monochrome #161616 / #505050 / #ABABAB / #E3E3E3 / #F3F3F3 / #FBFBFB | blue, used at this rarity |

---

## 3. Section-by-section catalogue

| # | Composition (one line) | Crop | Informs kit family |
|---|---|---|---|
| 0 | Framed nav bar: logo cell at left, uppercase links at right, flush ink CTA block in the corner, all inside a hairline-bordered strip | `.../quantum/ref-quantum-00-nav-hero.png` | (chrome; SiteNav already exists) |
| 1 | Centred hero: short two-line H1, two-line body and one button in a clearing at the top centre of a U-shaped pixel field that fills the column below | `.../quantum/ref-quantum-01.png` (and `-00-nav-hero.png` with nav) | **hero** (centred, texture-field variant) |
| 2 | Asymmetric 2:1 split. Left: a tint well with eyebrow, long statement H2, body, and a pixel strip along the bottom. Right: three stacked stat rows (icon square, numeral, label). An ink button closes the column. | `.../quantum/ref-quantum-02.png` | **process/stats**, **media split** |
| 3 | Vertical tab list at left: heading block, three icon+title rows that dim when inactive, the active row expanded with body, button below. A tall square media well at right changes with the active tab. | `.../quantum/ref-quantum-03.png` | **feature** (tabbed feature / service list with linked media) |
| 4 | Full-bleed ink CTA: centred eyebrow, two-line H2, two-line body, joined two-button bar; a pixel equaliser rises from the band's bottom edge and fades | `.../quantum/ref-quantum-04.png`, `.../quantum/ref-quantum-05.png` | **CTA** |
| 5 | Split header (title left, intro right). Below it a panel: client logos as a vertical tab column at left, a large quote at right with avatar and attribution at bottom left and a big stat at bottom right | `.../quantum/ref-quantum-06.png` | **testimonials/slider**, **logos** |
| 6 | Split header (eyebrow, H2, intro at left; button at right, aligned to the intro baseline), then a 2-up card row: image well on top, title, excerpt, uppercase meta, arrow cell in the corner | `.../quantum/ref-quantum-07.png` | **read-down** (article / insight cards) |
| 7 | Ink footer as a ruled table: logo / CTA strip; newsletter block (H2, body, inline email field and button) beside two link columns with chevrons; three contact cells; legal row | `.../quantum/ref-quantum-08.png` | **form** (inline subscribe), **banner** (contact strip) |
| m | Mobile: everything goes to one column; the stat rows keep icon+number side by side; the testimonial logo tabs become a stacked list above the quote; the blog becomes a single column; the hero art shrinks to a 358×193 strip | `.../quantum/ref-quantum-390-part1..4.png` | all of the above (responsive behaviour) |

All paths are under `/private/tmp/claude-501/-Users-devagya-tcules-website-2026/2f41d825-f6b6-4b91-9b83-7f3b883d2678/scratchpad/kit/refs/quantum/`.

**Takeaways per family:**
- **Hero.** A centred, narrow headline block sits in a clearing of a large texture field. Our `pixel-grid` texture is a close relative of their pixel art: a 3px LCD column. That makes this the most directly portable move on the page.
- **Stats.**
  - Numeral at 36, label at 16 directly under it with 0 gap, and a glyph at 64 to the left.
  - Three rows evenly divide the height of the neighbouring panel, so the two columns end on the same line.
- **Feature tabs.**
  - The list drives the media: one well, many states.
  - Inactive rows collapse to their title only, so the list stays short and the media stays large.
- **CTA.** Eyebrow, H2, body and actions in a centred column 430 wide, with the texture anchored to the band edge, not behind the text.
- **Testimonial.**
  - The logo column is the selector, so logos do double duty as proof and navigation.
  - The quote pane uses space-between: the quote sits at the top, the attribution and the stat at the bottom.
- **Read-down cards.** The image is inset in its well (20 / 24 padding) rather than full-bleed, and the content padding is generous (40 at the sides, 56 below).

---

## 4. Moves that conflict with Tcules rulings, and what replaces them

| Their move | Ruling it breaks | Tcules replacement |
|---|---|---|
| Ruled cell grid: shared 1px edges, 0 gap, `border-wrapper` around every set (about panel, testimonial panel, blog row, footer) | **No boxes on cards** | Separate cards with the gap scale: `gutter` 32 between cards in a set, `column` rows per visual-direction rev 3. Let an **image well** (any card may carry an image) or the `Texture` give the card its shape. Alignment to shared top and bottom lines does the work the rules did. The row hairline between list items (principles tabs) can survive only as a divider on a list row, never as a four-sided enclosure. |
| #FBFBFB tint wells behind text panels (about left panel) | No tinted band as visual weight (CLAUDE.md design quality); no boxes | Text sits on paper. If the half needs weight, the well holds an image or texture and the text sits beside it, never in it. |
| Rule ends fading over 150px past the container | Section's column is never overridden; no boxes | Drop it. The continuity comes from the texture running to the band edge instead. |
| Pixel-art illustrations as all imagery (hero field, about strip, principles well, blog thumbnails) | Texture is the generated Tcules texture; illustrations follow the drawing standard | The hero field becomes `Texture` (`pixel-grid`, masked or faded by the caller per `docs/textures.md`). Content imagery is stock photos or Tcules illustrations (left-facing, concept from the page argument, 3+ layers). Peridot appears **only** inside illustrations and in `::selection`. |
| Type sitting in a clearing of the art (hero) | No type on images | Keep the idea but make it structural. The texture occupies its own region (the lower part of the band, or one half of a split) and the text block sits in a separate Layout track. Texture never runs under a glyph. |
| Full-bleed ink CTA band | No blue bands; ink and blue are reserved site-wide (brand imagery rulings) | The CTA sits on paper, or on whatever surface visual-direction rev 3 assigns to CTA. Weight comes from scale (h2 at display or h1) plus a `Texture` region anchored to the band edge. Never a blue ground. |
| Zero accent anywhere | Blue is the one recurring UI accent | Use blue at the same *rarity* they achieve with none: one blue element per viewport at most. That could be the primary action, the active-tab indicator in a feature list, or a stat numeral. Everything else stays ink on paper. |
| Uppercase sans eyebrows and button labels with *negative* tracking (-0.42px) | Mono is the label voice, uppercase via `--text-mono-case`, tracking opened 0.08–0.12em | Eyebrows and control labels take the mono roles with `text-transform: var(--text-mono-case)`. Strings keep their authored case. |
| Two buttons welded edge to edge, 0 gap | Cluster owns spacing; no arrangement by hand | The actions sit in a `Cluster` at `tight` or `block`, which keeps the pairing without the welded bar. |
| Inactive tabs at opacity 0.5 | Contrast (not a ruling, but #505050 at 50% on white falls near 3:1) | Inactive rows go to the body-ink colour of the surface rather than a reduced opacity. The active row is marked by blue (the accent's one use there) or by its expanded body. |
| 4–8 between eyebrow, heading and body | "Spacing never cramped"; gap scale | Eyebrow to heading uses `tight` (8). Heading to body uses `block` (24), the system default. The 8px heading-to-body gap is the one place their calm reads as cramped next to our larger line boxes. Body to actions uses `stack` (48), which they match. |
| Section padding 140, CTA 100 / 200 | Gap scale has no 140 or 200; never split the difference | Use `section-open` 128 for the airy bands and `section` 96 for standard ones, per visual-direction. Joining consecutive bands so the beat is never doubled is already Section's behaviour. |
| Ruled ink footer table | No boxes | Not in scope (SiteFooter exists). If revisited: ink is reserved; columns separated by the gap scale. |
| Hero has no eyebrow (matches the ruling); nav-framed hero | Breadcrumbs compact; eyebrow never repeats the crumb | Compatible. Their hero proves a headline with no eyebrow reads fine, which supports dropping the eyebrow when the crumb already says it. |

**Net.** The portable lessons:
- small, narrow text blocks;
- very large imagery or texture regions;
- one weight, with hierarchy by size;
- an 8px head stack inside a 128px section beat;
- list-driven media (tabs to well);
- a stat column that divides its neighbour's height evenly.

Everything they delimit with hairlines and tint wells, Tcules delimits with the gap scale, image wells and alignment.


---

# Meridian teardown: /services/systems-design

Everything was captured on 6 Oct 2026 with Playwright from the showcase worktree's node_modules. Each run waited for network idle, then scrolled the whole page in 200–250px steps to fire the GSAP split-letter and reveal animations.

**What is on disk:** all files are in `/private/tmp/claude-501/-Users-devagya-tcules-website-2026/2f41d825-f6b6-4b91-9b83-7f3b883d2678/scratchpad/kit/refs/meridian/`.
- Full pages: `ref-meridian-full-1470.png` (1470×8009) and `ref-meridian-full-390.png` (390×7747).
- Viewport crops at 1470: `ref-meridian-01.png` to `ref-meridian-10.png`, each 1470×830.
- Mobile slices: `ref-meridian-m390-01.png` to `-04.png`.
- Raw measurements: `measure.json`, `m5-1470.json`, `m5-390.json` and `m6.json` (nav, footer and button trees). Line-level dump: `summary.txt`.
- Scripts: `shoot.cjs`, `m5.cjs`, `m6.cjs`.

I looked at all ten desktop crops and mobile slices 01–02. Slices 03–04 are on disk, but I did not view them. The 390 notes for the audience cards, FAQ, testimonial and footer come only from the measurement data.

---

## 1. What makes it feel calm and elegant

1. **One display serif at very large sizes, and nothing else does the work.**
   - Section headings are a light serif at 72/72 (line-height 1.0) with −0.03em tracking. The hero is 96/96, the statement block 56/56 and the quote 36/36.
   - Every heading is weight 400. There is no bold anywhere on the page.
   - Scale makes the hierarchy, not weight or colour. Body is a grotesk at 16/24 or 18/27, so headings run at 4–5× body.
2. **Tight leading on display type, generous leading on body.**
   - Display sets at 1.0 line-height, so two-line headings read as one solid shape.
   - Body sets at 1.5 and at 70% opacity of the ink colour, so the paragraphs recede.
   - The rhythm alternates: a dense black mass, then a grey field of text.
3. **Huge, consistent vertical air that is never cramped.**
   - Standard sections have 128px above and below the content at 1470, and 64px at 390.
   - "Breathing" sections get more: the overview statement has 208 on both sides, and the testimonial 160 on both sides.
   - The hero has 208 above the eyebrow.
   - So the padding is not uniform. Statement and quote sections get roughly 1.6× the standard air, and that is what makes the page breathe.
4. **Centred and left-aligned compositions alternate:**
   - centred hero;
   - full-bleed image;
   - centred statement;
   - left heading over a four-up row;
   - left-heading/right-list split;
   - image/text split;
   - centred heading over three image cards;
   - centred heading over a narrow FAQ column;
   - centred quote slider;
   - left-aligned image CTA.

   No two adjacent sections share an arrangement.
5. **Ground changes, not boxes, mark the sections.**
   - There are four grounds: warm paper `#F3EBE4`, a darker sand `#D8CDBC`, warm charcoal `#2E2927` and near-black `#181312`.
   - The page runs: paper, paper, paper, sand, charcoal, near-black, paper, paper, sand, then the image CTA and the charcoal footer card.
   - Ground steps are tonal. Adjacent dark bands are two values of the same warm black, so the transition reads as depth, not as a stripe.
6. **Every image is cropped into a notched silhouette.**
   - Large images have a 6px radius plus a stepped corner notch: one corner has a ground-coloured tab cut into it with a 45° shoulder.
   - On the hero image the notch sits top-left; on the split image, bottom-left. The CTA image has one top-right.
   - The DOM shows no `clip-path` or `mask` on the image, so the notch is an overlay shape painted in the ground colour.
   - This is the page's signature brand move. It ties rectangular stock photos to the logo's angular geometry.
7. **Cards are delimited by alignment and imagery, not by containers.**
   - The audience cards are borderless: a 448×296 image, then a 16px gap, then a 28px serif title, an 8px gap and the body.
   - The image edge and the shared title baseline define each card.
   - The two bordered lists are the exception (see §4). Both are hairline-only: 1px at 16% ink, radius 6, no fill and no shadow.
8. **Hairline dividers at 16% ink are the only lines on the page.** They separate FAQ rows, process steps and footer subheads. At that alpha they read as rhythm, not as structure.
9. **The eyebrow is tiny and quiet.**
   - It is 14/21 uppercase grotesk at normal tracking.
   - It leads with a 4×4 square in the accent colour, 8px before the label.
   - The square is the only accent most sections carry.
10. **One accent, used three ways.**
    - Amber `#FCAA2D` appears only on the eyebrow squares, the primary button fills and the soft top gradient of the hero.
    - That gradient runs from amber to transparent over the hero's 504px, so it reads as warm light on paper, not as a band.
    - Nothing else is coloured. Ink, paper and photography carry the rest.
11. **The button is a compound shape.**
    - It is an amber pill with radius 6 and 4px inner padding.
    - Inside sit a text cell (12/24 padding) and a separate 48×48 paper-coloured square holding an arrow. The square has radius 3, nested inside the outer radius 6.
    - It reads as a crafted object rather than a rectangle with a label.
    - On hover the label rolls up: two stacked copies in a clipped box.
12. **Floating, compact nav.**
    - A 736px-wide near-black capsule, radius 6, centred and 16px from the top.
    - It holds the logo, four links with 8px gaps and an amber button.
    - The nav does not span the page, so the hero has open sky above it.
13. **Text width is capped by grid columns, not by `ch`.**
    - The hero title spans 859px (about 7.5 of 12 columns) and the centred section headings 668px.
    - The statement runs at 1193px, which is wide, and it works only because the type is 56px.
    - The FAQ column is 800px and body inside the split is 525px.
    - Body lines therefore stay at roughly 60–75 characters.
14. **Motion is restrained:** split-letter reveals on display headings, a fade-up on blocks and a manual slider. Nothing loops.

---

## 2. Measurements, in px at 1470 (390 in brackets)

| What | Value |
|---|---|
| Container | 1440 max, 32 gutter, giving a 1376 content width (390: 16 gutter, 358 content) |
| Section padding, standard | 128 / 128 (64 / 64) |
| Section padding, statement and quote | 208 / 197 for the statement, 153 / 160 for the quote (112 / 107 for the statement, 75 / 144 for the quote) |
| Hero padding | 208 top to the eyebrow, 48 bottom (112 / 24); the hero image follows 48 below |
| Section rendered heights | Hero 504 · image 649 · statement 651 · included 681 · process 998 · deliverables 1056 · audience 911 · FAQ 948 · testimonial 566 · CTA 523 · footer card 489 (390: 324 · 180 · 409 · 953 · 1093 · 991 · 1310 · 669 · 490) |
| Fits 1470×830? | Statement, included, testimonial and CTA fit. Process (998), deliverables (1056), audience (911) and FAQ (948) do not. |
| Eyebrow to heading | 16 gap, giving 26 from eyebrow top to cap top because the 72 heading has internal leading (390: about 4–6) |
| Heading to body or grid | 48 heading to grid in included and audience; 64 heading to list in FAQ; 32 left stack in process; 24 in the deliverables content |
| Body to actions | 24 list to button in the split; 48 text to buttons in the CTA (24 heading to description inside that) |
| Display type | Hero 96/96, −2.88 (48/48) · H2 72/72, −2.16 (40/40) · statement 56/56, −1.68 (26/26) · quote 36/36, −0.36 (22/22) · CTA H2 about 72 |
| Card and item titles | 28/36.4, −0.28 serif (18/23.4) · step and FAQ titles 24/31.2 serif (18 and 16) |
| Body | 18/27 lead (14/21) · 16/24 card body (13/19.5) · all body at 70% ink |
| Mono-like labels | 14/21 uppercase grotesk at normal tracking (12/18) for the eyebrow, durations and testimonial role |
| Button | Nav: 39 tall, 8/16 padding, radius 3. Main: 58 tall = 4 shell + 48 inner (12/24 text cell) + 48 icon square at radius 3; outer radius 6 (390: 46 tall, 14px label) |
| Included grid | 4 × 344, 0 gap, 1px hairline outer border plus column rules; card padding 24; 64 icon-to-text; 12 title-to-body; 40 icon |
| Process list | Outer hairline box with 32 padding; rows split by hairlines; 24 row padding; 32 numeral circle, then 12 to text; 8 title-to-body; duration right-aligned on the title row |
| Split (deliverables) | Two columns of 672 with a 32 gap; image 672×800 (390: 358×426 stacked above the text); text column has 48 top padding; list rows 41 (8/0 padding, 12 icon gap); list max 525 |
| Audience cards | 3 × 448, 16 column gap; image 448×296 (3:2), radius 6; 16 image-to-text; 8 title-to-body; 390: stacked with 32 between |
| FAQ | 800 column, centred; rows 80 tall (24/0 padding, 24 chevron); 1px bottom hairline at 16% |
| Testimonial | 1248 quote measure at 36px, centred; 32 quote to attribution; 48 square avatar at radius 3; 48 circular arrow buttons, 1px ink outline, pinned to the container edges |
| CTA | 716 max text column, left; heading about 158 tall; 128 top and 80 bottom inside a full-bleed photo |
| Footer | Card inset 16 from the viewport, radius 6, `#2E2927` on the CTA photo; 4 × 324 columns at 16 gap; 32/64 padding; links 40 rows; subhead with hairline under it |
| Image area vs text area | Hero image 1376×601 is about 52% more area than the hero text block. Split is 50/50 by width, image 800 tall vs a 195 text head. Audience cards are about 72% image by area. 4 of 10 sections are image-led. |
| Accent | Amber `#FCAA2D`: eyebrow squares (8 on the page), 4 button fills, the hero gradient. Nothing else is coloured. |
| Grounds | `#F3EBE4` paper, `#D8CDBC` sand, `#2E2927` charcoal, `#181312` near-black |

---

## 3. Section by section

1. **Nav plus hero.**
   - The floating dark capsule nav sits above a centred tiny eyebrow and a two-line 96px serif title, on paper washed from the top with warm accent light.
   - No body copy and no buttons in the hero.
   - Crop: `ref-meridian-01.png`. Kit family: **hero** (title-only variant) and the nav.
2. **Full-width hero image.**
   - A 1376-wide notched photo, 48 below the title, running to the section edge.
   - It is the visual payoff of the hero.
   - Crops: `ref-meridian-01.png` and `-02.png`. Kit family: **media split / banner** (full-bleed media band).
3. **Overview statement.**
   - A centred eyebrow over a three-line 56px serif sentence, with about 200px of air on both sides.
   - It is one idea and nothing else.
   - Crop: `ref-meridian-02.png`. Kit family: **read-down** (statement/lede block).
4. **What's included.**
   - On the sand ground: a left-aligned 72px heading, then a four-up row of icon, serif title and grey body.
   - Each card has 64 of empty space between the icon and the title.
   - The row is held in one hairline frame with column rules.
   - Crop: `ref-meridian-03.png`. Kit family: **feature** (four-up icon features).
5. **Process.**
   - On the charcoal ground: the eyebrow and two-line heading sit top-left in a 564 column.
   - The right column is 680 and holds four numbered steps. Each step has a circled numeral, a serif title with a right-aligned duration label and a two-to-three-line body, divided by hairlines.
   - Crops: `ref-meridian-04.png` and `-05.png`. Kit family: **process/stats** (sticky-head-left, numbered list right).
6. **Deliverables.**
   - On the near-black ground: a tall 672×800 notched photo on the left. The right column has the eyebrow and heading at the top, and a checklist and compound button pinned to the bottom.
   - The text column is space-between, so the heading and actions align to the image's top and bottom edges.
   - Crops: `ref-meridian-05.png` and `-06.png`. Kit family: **media split** (with list and CTA).
7. **Who it's for.**
   - On paper: a centred eyebrow and heading over three borderless image cards (3:2 image, serif title, grey body).
   - Crops: `ref-meridian-06.png` and `-07.png`. Kit family: **service list / card grid** (image cards; also audience or case cards).
8. **FAQ.**
   - A centred eyebrow and heading over an 800-wide accordion of serif questions with chevrons and hairline separators.
   - Crops: `ref-meridian-07.png` and `-08.png`. Kit family: **read-down** (accordion/FAQ).
9. **Testimonial slider.**
   - On sand: a centred 36px serif quote across 1248, with a small square avatar, name and uppercase role beneath.
   - Outlined circular prev/next arrows sit at the far container edges. There is no card.
   - Crops: `ref-meridian-08.png` and `-09.png`. Kit family: **testimonials/slider**.
10. **CTA.**
    - A full-bleed photo with the notch top-right. A left-aligned 72px cream serif question, one line of body and the compound amber button sit over the image.
    - Crops: `ref-meridian-09.png` and `-10.png`. Kit family: **CTA**.
11. **Footer.**
    - An inset charcoal card, radius 6, floating on the CTA photo.
    - Logo column, then three link columns with uppercase subheads over hairlines, then a micro legal row under a hairline.
    - Crop: `ref-meridian-10.png`. Kit family: footer (no kit family listed; the pattern is `SiteFooter`).

**Mobile (390), from `ref-meridian-m390-01.png` and `-02.png`:**
- Everything stacks to one column.
- The included row becomes a vertical hairline-framed list.
- Process durations move under the title.
- The split image goes above the text at 358×426.
- The nav becomes a full-width dark capsule with a hamburger.
- Type drops to about half its desktop size (96 to 48, 72 to 40) and the line-heights keep their ratios.

No logo strip, form or stats section appears on this page.

---

## 4. Moves that conflict with Tcules rulings, and their replacements

| Meridian move | Ruling it breaks | Tcules replacement |
|---|---|---|
| Amber accent on buttons, eyebrow squares and the hero gradient | Blue is the one recurring UI accent | Brandeis blue on the primary button fill and the eyebrow marker only. Keep the scarcity: no more than one blue mark per section plus buttons. |
| Hero top gradient wash (amber to transparent) | No blue bands; peridot is for selection and illustrations only | No colour wash. Give the hero depth with the generated Tcules `Texture` on paper, or let the illustration carry the warmth. |
| Hairline-framed four-up "included" grid and the boxed process list | No boxes on cards | Drop the outer frame and column rules. Separate by `Layout` gutter (32) and alignment: icon, title and body on a shared baseline. Rows may keep a single top hairline as rhythm. The process list loses its outer box and keeps only the row dividers. |
| Charcoal and near-black stacked dark bands | Ink and blue are reserved site-wide; no blue bands | Paper and tint grounds for most sections. Use `ink` sparingly, reserved where the brand guide allows, never two adjacent. Vary the arrangement, not the ground (CLAUDE.md design-quality rule). |
| Type over a full-bleed CTA photo | No type on images | CTA as a media split: heading, body and button in one column, photo or illustration in the other on a paper or tint ground. Alternatively the textured ground with no photo. |
| Footer card floating on the CTA photo | No type on images | The footer sits on its own ground; there is no photo behind it. |
| Notch cut into stock photos | Not banned, but it is Meridian's own brand signature | Do not copy the shape. The analogous Tcules move is a consistent image treatment drawn from the brand guide (radius from the token layer, Texture behind). Any new silhouette goes in as a brand-guide amendment. |
| Several sections over 830 tall (process 998, deliverables 1056, audience 911, FAQ 948) | A section must fit about 1470×830 | Process: make the list two columns of two, or shorten the bodies. Split: use a 4:5 image at most about 640 tall. Audience: use a 16:10 image. FAQ: open the first item only and keep about 5 rows. Keep 128 padding only where the content allows; otherwise use Section `density="tight"` (64) rather than a custom value. |
| 208 and 160 paddings on statement and quote sections | Gap scale has 9 steps; nothing in between | Use `density="open"` (128). The extra air the statement gets maps to `--gap-section-open`. Do not invent 208. |
| Hero eyebrow repeats the page name ("Systems design") above a crumb-less hero | Eyebrow never repeats the crumb; breadcrumbs stay but compact | A compact `Breadcrumbs` row above the title. The eyebrow, if any, names the category or outcome, not the page. |
| Eyebrow at 14px uppercase with normal tracking | Mono is the label voice, uppercase via `--text-mono-case`, tracked 0.08–0.12em | Use the mono eyebrow role with its tracking token. |
| Display serif (Gambarino) at weight 400 for every heading | Type comes from the token composites, not from the reference's face | Keep the moves (about 4–5× scale contrast, 1.0 display leading, 70%-ink body) and express them through `--text-*` roles. If the display role lacks a 1.0 ratio step, record it as a token change. |
| Compound amber button with a nested icon square | Button tokens own colour per surface | It is fine as a `Button` variant idea (icon slot as a nested square) through `Button`'s `icon` prop and `--btn-*` tokens per surface. It needs a spec. |
| Avatar photo in the testimonial and stock imagery throughout | Allowed (stock fine, no labels needed) | Keep it: any card may carry an image and the testimonial slider is permitted. The outlined arrows map to the existing `Button` ghost/icon variant. |
| Floating dark nav capsule | Ink reserved | A floating capsule is fine as a shape. Its fill must be paper or tint with a token border, not ink, unless the brand guide's ink reservation covers chrome. |

**Most worth taking for the kit:**
1. Alternate the arrangement every section: centred, then split, then grid, then narrow column.
2. Give statement-only sections the open density.
3. Use scale contrast instead of weight.
4. Make cards borderless, shaped by image and baseline.
5. Make the split's text column space-between, so heading and actions lock to the image's top and bottom edges.
6. Keep one accent mark per section.


---

# Executra (executra.webflow.io): designer teardown

All files are in `/private/tmp/claude-501/-Users-devagya-tcules-website-2026/2f41d825-f6b6-4b91-9b83-7f3b883d2678/scratchpad/kit/refs/executra/`:
- **Full pages:** `ref-executra-full-1470.png` and `ref-executra-full-390.png`.
- **Viewport crops at 1470x830:** `ref-executra-01.png` to `ref-executra-12.png`. Crop N covers y = (N-1)·830 to N·830. Each crop includes the site's fixed 95px header.
- **Section-aligned crops (header hidden):** `ref-executra-sec-{audience,tabs,stats,pricing,steps}.png`.
- **Extra crops:** `x-stats-banner.png` (stats plus the photo band) and `x-m0..2.png` (mobile).
- **Scripts:** `run.mjs`, `shoot.mjs`, `m3.mjs`, `gaps.mjs` and `m4.mjs`.
- **Raw measurements:** `measure.json` and `gaps.out`.

Every script waits for network idle and scrolls in slow 250–300px steps first, so the scroll animations have fired. The page has 88 `data-w-id` animation hooks. The page is 9885px tall at 1470 and 10597px at 390.

---

## 1. What makes it feel calm and elegant

1. **One family, one weight, size does all the work.** Every heading is Outfit 400: h1 55/60.5, h2 48/52.8, h3 40/56, h3-card 24/33.6, quote 20/28, body 16/22.4 and 14/19.6. There is no bold display type anywhere. Labels use only weight 500–600, and only at 14px. Hierarchy is pure scale, so nothing shouts.
2. **Display is tracked tight, body is not.** h1 and h2 use −1px (about −0.02em). Card h3 uses −0.4px. Body is at normal tracking. Headings read as compact solid shapes over loose grey body text.
3. **Every section heading is exactly two lines.** `gaps.mjs` measured `lines: 2` on 11 of 12 headed sections at 1470. This comes from a hard `max-width` on the heading (380–600px against a 1280 column), not from the copy. The repeated two-line block is the page's heartbeat.
4. **Body copy is held narrower than its heading.** Body max-widths are 309–474px under 410–600px headings. The heading always overhangs the paragraph, which keeps the head block a tapered wedge rather than a rectangle.
5. **One identical head rhythm everywhere.** Eyebrow to heading is 24, heading to body is 24, and body (or heading) to actions is 48. It is the same in all 12 sections. That consistency is most of the "calm".
6. **Variety comes from alignment and arrangement, not new components.** Heads alternate between centred (audience, tabs, pricing, testimonials) and left-aligned (approach, stats, steps, FAQ, contact). The section bodies cycle through these arrangements:
   - three tiles;
   - a 52/42 media split;
   - tabs;
   - a three-stat rule row;
   - a full-bleed photo;
   - two price columns;
   - a four-step line;
   - a three-up slider;
   - a 50/50 heading-versus-accordion layout;
   - a 50/50 copy-versus-form layout.

   No two adjacent sections share a shape.
7. **Whitespace is used as a shape.**
   - FAQ: the heading sits alone in the left half (632px), with nothing under it for about 600px, while the accordion fills the right half.
   - Contact: the heading and two contact items sit at the top and bottom of the left half, with air between them.
   - The empty quadrant is deliberate, and it is what makes the page feel expensive.
8. **Hairlines delimit, boxes rarely do.** Almost every separation is a 1px line at low alpha:
   - accordion rows: `border-top 1px rgba(255,255,255,.1)`;
   - pricing internal divider: `.1`;
   - form inputs: underline-only, `2px .1`;
   - stats: `border-left 1px .2` with `48px` left padding;
   - logo strip: 1×24 dividers;
   - footer rule: `.2`;
   - step track: `.4` with an animated white progress fill.
9. **Two-tone ink.** Headings are pure white. Body is white at 0.8 alpha (FAQ answers 0.7, small labels 0.5). There is no second hue for hierarchy.
10. **Near-square geometry.** Buttons have a 2px radius and cards 4px. Photos have 0 radius and are hard-edged. Only the testimonial slider control is a pill (100px radius halves). Sharp corners plus thin rules give a quiet, architectural feel.
11. **Progressive disclosure keeps sections short.** The approach list is an accordion inside the media split. The service tiers are tabs, with one pane visible. Testimonials are a slider. FAQ is an accordion with the first item open. Each technique lets dense content sit in roughly one viewport.
12. **Images are big and plain.**
    - The media-split image is 667px wide against a 533px text column, about 56/44 of the content area, with an 80px gutter.
    - The photo band is a 1470×693 full-bleed image with nothing on it: a pause between the stats and pricing.
    - Photography is one consistent warm, natural-light grade, people at work.
13. **Motion is small and purposeful.** Transitions run 0.2–0.5s on background colour. Step lines fill from left to right as they scroll in. Blocks fade in on scroll. Nothing bounces.
14. **Primary vs secondary CTA by ground, not by outline.** The primary is a solid accent. The secondary is the same shape at `rgba(255,255,255,.1)`, a 10% white veil with no border. Inside a pair the two never compete.

---

## 2. Measurements (1470x830 unless noted)

| Thing | Value | Tcules equivalent / note |
|---|---|---|
| Content column | 1320 max, 20 padding, so 1280 content; left edge x = 95 | Section 1240 cap / 32 gutter |
| Section padding (1470) | 80 / 80 (logo strip 40/40, footer 40/40, hero 0/80) | between `section` 96 and `stack` 48; nearest step is 96, or 64 tight |
| Section padding (390) | 40 / 40, gutter 15 | they shrink the step responsively; Tcules does not (rule 3) |
| Eyebrow → heading | 24 (390: 18) | `--gap-block` |
| Heading → body | 24 (390: 18) | `--gap-block` |
| Body → actions | 48 (390: 30) | `--gap-stack` |
| Head block → section body (cards / grid) | about 80 (head bottom 1268 → cards 1342 = 74; steps 6462 → 6542 = 80) | between `stack` 48 and `column` 64 |
| Button pair gap | 12 | `--gap-tight` / `text` |
| h1 | 55 / 60.5, 400, −1px, max-w 500 (390: 36) | display role |
| h2 (section) | 48 / 52.8, 400, −1px, max-w 380–600 (390: 32) | h2 |
| h3 (tab pane title) | 40 / 56, −0.4px | h3 |
| h3 (card, step) | 24 / 33.6, −0.4px | h4 |
| Stat numeral | 48 / 67.2, 400 | stat |
| Quote | 20 / 28, max-w 358 | lead |
| Body | 14 / 19.6 at 0.8 alpha (16 / 22.4 for list items, FAQ answers at 0.7) | small for Tcules; use body role |
| Eyebrow | 14 / 19.6, 500, mostly uppercase, accent colour, normal tracking | mono label role |
| Button | height 54, label 14 / 500 uppercase, padding 24 top / 10 bottom / 10 sides (label sits low), arrow glyph 24 to the right, radius 2 | Button md |
| Hero text | eyebrow y 430, h1 464–585, body 609–648 (max-w 320), CTAs 696–750; all in the lower-left third | — |
| Audience cards | 3 × 317×252, 40 padding, 24 internal gap (icon → title → text), 24 between cards, bg #141414 on #000, radius 4, no border/shadow | gutter 32 between cards; tonal box conflicts (see §4) |
| Media split (approach) | image 667×667 (x 95), text column 533 (x 842); gutter 80 | Layout [5,4]-ish, `column` 64 |
| Accordion rows | 24 top/bottom padding, 1px top rule at .1; open row 134, closed 83 | Accordion |
| Tabs (service tiers) | 3 filled tab chips (active white, inactive #222), 12 apart; pane = 667 image + 533 text, 80 gutter | — |
| Stats row | grid 3 × 427; each cell 1px left rule at .2, 48 left padding, numeral → caption 16 | `stack` padding / `text` gap |
| Photo band | 1470×693 full-bleed, no copy | Figure, full-bleed |
| Pricing cards | 2 × 388×580, 40 padding, 32 internal gap, 24 between cards; active card is white with dark ink, other is #141414; 1px internal divider at .1 | — |
| Steps | grid 4 × 308, gap 16; per step: "STEP 0N" label + 1px track (.4) with white progress fill, gap 16 → title 24/33.6 → text max-w 213; internal gap 24 | process |
| Testimonials | 3 visible × 397 wide, about 38 apart; avatar 52 + name/role row, then 40 to quote, then 40 to stars; no card ground, no border | slider |
| Slider control | two pill halves, 70+74 × 48, centred, about 80 below cards | — |
| FAQ | grid 632 / 632, 16 gap; heading left, accordion right; rows about 93 closed | — |
| Form | underline-only inputs, 52 tall, `2px .1` bottom rule, 12 gaps; half-width pairs; uppercase placeholders as labels; full-width 54 submit | EnquiryForm |
| Newsletter CTA | 388 tall, 80/80 padding, photo behind with 90° black→transparent gradient; heading left (max 418), input + button stack right (365 wide) | — |
| Nav | fixed, 95 tall, transparent; two right-hand controls (accent buy button + white menu chip) | SiteNav |
| Rendered section heights | hero 830 · logos 164 · audience 814 · approach 827 · tabs **1094** · stats 575 · photo band 693 · pricing **1236** · steps 552 · testimonials 783 · FAQ **864** · contact 727 · newsletter 388 · footer 338 | bold = over the 830 fit rule |
| Text vs image area | hero: image 100%, text block ≈ 470×320 in the lower left (about 12% of frame); split: image 56% / text 44% of the 1280 column | — |
| Accent usage | `#CF4C00`: primary buttons (10 grounds), eyebrows, tier labels, step numbers, check-tick glyphs (15 ink uses). Never a band, never a large fill except the submit button | blue's job in Tcules |
| Grounds | #000 and #141414 alternate band by band; white only on the active pricing card and the active tab | — |
| Card delimiting without borders | (a) tonal fill one step off the ground (#141414 on #000); (b) no ground at all, held by alignment, avatar and hairline (testimonials, steps, stats); (c) inversion (active price card white) | Tcules: use (b) only |

---

## 3. Section-by-section catalogue

| # | Section | Composition (one line) | Crop | Informs Tcules family |
|---|---|---|---|---|
| 1 | Hero | Full-bleed photo with left-to-right black scrim; eyebrow, two-line h1, a 320-wide body and a CTA pair stacked in the lower-left third; nav floats over it | `ref-executra-01.png` | **hero** |
| 2 | Logo strip | Small muted line of label text centred over five logos at 24px height, separated by 1×24 hairlines, 32 apart; 164 tall in all | `ref-executra-02.png` (top) and `ref-executra-08.png` (repeat under pricing) | **logos** |
| 3 | Audience | Centred two-line head with body, then three equal tonal tiles (outline icon, 24px title, 3-line text), then a centred CTA pair | `ref-executra-02.png`, `ref-executra-sec-audience.png` | **feature** (card set) |
| 4 | Approach | Media split: tall image left (56%), right column holds eyebrow, two-line head and a CTA, then a three-row hairline accordion with the first row open | `ref-executra-03.png` | **media split** + **feature** (accordion) |
| 5 | Service tiers | Centred head with body, a centred row of three tab chips, then the pane: image left, with a time label, title, one line, a tick list and a price CTA on the right | `ref-executra-04.png`, `ref-executra-05.png`, `ref-executra-sec-tabs.png` | **service list** (tabbed) + **media split** |
| 6 | Outcomes stats | Left head with a single CTA, then a three-column row of 48px numerals with 2-line captions, each cell opened by a 1px left rule | `ref-executra-05.png`, `ref-executra-sec-stats.png`, `x-stats-banner.png` | **process/stats** |
| 7 | Photo band | Full-bleed 693-tall photograph, no copy, used as a breath between the proof and the pricing | `ref-executra-06.png`, `x-stats-banner.png` | **banner** (image-only) |
| 8 | Pricing | Centred head (eyebrow, h2, body), then two price columns side by side (one inverted as featured, with a tab-like flag above it), each with label, price, line, divider, ticked list and full-width CTA; logo strip repeated beneath | `ref-executra-07.png`, `ref-executra-08.png`, `ref-executra-sec-pricing.png` | **service list** (comparison) |
| 9 | Steps | Left head, then four columns, each a "STEP 0N" label running into a hairline track that fills on scroll, a 24px title and a 3-line text | `ref-executra-08.png`, `ref-executra-sec-steps.png` | **process/stats** |
| 10 | Testimonials | Centred head, then a three-up slider of unboxed quotes (avatar + name/role row, 20px quote, rating) with a centred pill prev/next control | `ref-executra-09.png` | **testimonials/slider** |
| 11 | FAQ | 50/50 split: eyebrow and two-line head alone in the left half; right half a hairline accordion, first row open | `ref-executra-10.png` | **read-down** (Q&A) + feature (accordion) |
| 12 | Contact | 50/50 split: left has the head, body, hours, and two round-icon contact items pinned to the bottom; right has an underline-only form with half-width pairs and a full-width submit | `ref-executra-11.png` | **form** |
| 13 | Newsletter CTA | Darkened full-bleed photo with heading and body on the left, an email field and button stacked on the right | `ref-executra-12.png` | **CTA** |
| 14 | Footer | Logo left, two short link columns centre, CTA pair right; hairline rule; three-part legal line | `ref-executra-12.png` | (SiteFooter) |

Mobile (390, `ref-executra-full-390.png`, `x-m0..2.png`):
- **Splits and grids:** every split stacks with the image after the text, and every multi-column grid becomes one column.
- **Buttons:** they go full-width.
- **Cards:** tile padding drops 40 → 20 and gaps drop 24 → 16–18.
- **Type:** h1 is 36 and h2 is 32, so headings run 2–3 lines.

---

## 4. Moves that conflict with Tcules rulings, and replacements

| Executra move | Ruling it breaks | Replace with |
|---|---|---|
| Hero headline and newsletter CTA set on photographs with a gradient scrim | **No type on images** | Split hero: text column on paper with the image or illustration in its own track (Layout `[1,1]` or `[5,4]`). Keep their lower-left weighting by bottom-aligning the head block against a tall image. The CTA band becomes paper (or tint) carrying the **Texture** component, with copy and form on the ground |
| Dark-only site; #000 / #141414 band alternation as the section separator | Ink reserved site-wide; "vary the arrangement, not the ground"; **no blue bands** | Paper as the default ground. Separate sections by changing arrangement (their real strength) and by the 96 rhythm. Use tint sparingly, never as a stripe pattern. Take the tonal-step *idea* only through Texture, not band fills |
| Orange accent on every eyebrow, tick, step number, tier label and primary button | **Blue is the one recurring accent, used wisely** | Blue on the primary CTA and at most one marker per section (e.g. the active step's progress fill, the active accordion's caret, the featured tier label). Eyebrows become neutral mono uppercase (`--text-mono-case`), not coloured. List ticks stay neutral ink |
| Tonal-fill tiles (audience cards #141414, radius 4) and filled pricing cards (white inversion) | **No boxes on cards** | Unboxed cards held by a top hairline plus icon plus whitespace, which is exactly their testimonial, steps and stats treatment. Any card may carry an image instead of a box. A featured tier gets a blue label or a short blue top rule, not an inverted box |
| Filled tab chips (white active, grey inactive) | No boxes; blue used wisely | Underline tabs: mono labels with a 2px blue underline on the active one, or a Cluster of ghost buttons |
| Sections over 830 tall: tiers 1094, pricing 1236, FAQ 864 | **A section must fit in about 1470x830** | Tiers: drop the centred body or move the tab row beside the heading, and cap the pane image height (e.g. 4:3 at 560 wide). Pricing: split into "tiers" and "logos" sections, and shorten lists or move them behind a disclosure. FAQ: show 5 rows and add "more". Tcules' 96 padding (vs 80) makes this tighter, so budget about 640 of content per section |
| Responsive spacing (24 → 18, 48 → 30, 80 → 40 padding at 390) | Gap scale does not shift responsively | Keep the step (`block` / `stack`) fixed and change the *layout* at the breakpoint. Section padding can use `density="tight"` by design, never by media query |
| Card padding 40 and head-to-grid 80 (off-scale) | Distance must be one of nine steps | Card internals at `block` 24, between cards `gutter` 32, head block to section body `stack` 48 (or `column` 64 when the body is a split), split gutter `column` 64 |
| Body at 14px / 0.8 alpha | Spacing never cramped; readability | Tcules body role and the surface's muted-ink token. Keep the *two-tone ink* idea, not the size |
| Uppercase placeholders used as form labels | Accessibility; mono case is presentation-only | Keep the underline-only fields (good, unboxed). Add visible mono labels above each field, and keep placeholders as hints or omit them |
| Trustpilot-green stars, coloured initial avatars (pink, green, peach) | Off-palette colours; peridot is selection and illustration only | Photo avatars (stock is fine) or neutral monograms. Drop star ratings, or render them in neutral ink |
| Coloured avatar initials and accent eyebrows add a third and fourth hue | One accent | Neutral |
| Breadcrumb: none (home template) | Breadcrumbs stay on service pages, compact; eyebrow never repeats the crumb | Compact crumb row above the hero head. The hero eyebrow carries the service's *category or claim*, not the page name |
| Logo strip as its own 164px band directly under the hero | (Allowed) | Figures in a Cluster at `stack`, with hairline dividers as an optional Cluster separator. It can live inside the hero section's bottom rather than as its own band |
| Full-bleed photo band with no copy | (Allowed: images fine, no type) | Keep it as a pause between proof and pricing, using a stock image or a Tcules illustration, at full bleed or the full content column |

**Moves to adopt directly:**
- **Head block:** eyebrow, then `block`, then heading, then `block`, then body, then `stack`, then actions. Headings capped to force two lines, body capped narrower than the heading.
- **Alternating head alignment:** centred heads for sets (cards, testimonials, tiers), left-aligned heads for splits and lists.
- **Half-empty asymmetric splits:** FAQ and contact.
- **Hairline-led delimiting:** stats left rules, accordion top rules, underline-only form fields.
- **Animated progress track on steps:** in blue, as that section's one accent.
- **Unboxed testimonial slider:** with a pill prev/next control.
- **Primary vs secondary CTA by ground weight:** solid blue against a ghost veil, with no outlines.
- **Near-square radii and hard-edged photography.**


---

# Teardown: Prospect "About 3" (Webflow template)

URL: https://prospect-finance-saas-webflow-template.webflow.io/about-3
Captured with Playwright (from the worktree's node_modules) at 1470x830 and 390x844. Each capture waited for network idle, then scrolled the page in 200px steps to trigger its animations. All files are under `/private/tmp/claude-501/-Users-devagya-tcules-website-2026/2f41d825-f6b6-4b91-9b83-7f3b883d2678/scratchpad/kit/refs/prospect/`:
- **Full page:** `ref-prospect-full-1470.png` (4279px tall) and `ref-prospect-full-390.png` (6620px tall).
- **Viewport crops at 1470, in steps of 830:** `ref-prospect-01.png` to `ref-prospect-06.png`.
- **Crops scrolled to each section's top:** `ref-prospect-sec-01-hero.png` to `ref-prospect-sec-06-footer.png`.
- **Raw measurements:** `measure.json` (computed style of every text node, box, image and button) and `layout.json` (containers and grids).
- **Scripts:** `shoot.cjs`, `sec.cjs` and `mob.cjs`.

Six bands in all: a boxed hero, a stats band, a media split, an integrations band, a careers banner and the footer.

---

## 1. What makes it feel calm and elegant

1. **One vertical step does nearly all the work.** Eyebrow to heading, heading to lead, lead to button, and a stat's number to its label to its description are all 24px. Hero gaps are 36. Between blocks inside a section the step is 72, and around a section it is 96. Three numbers set the rhythm of the whole page, so the eye stops measuring.
2. **Section padding is 96 on every band**, and the last band before the footer opens to 144 at the bottom. Every content band renders 650 to 760px tall at 1470, so each one fits a single 830 viewport with air to spare. It never scrolls mid-idea.
3. **The serif carries the weight and is only ever weight 400.** Titles are a condensed serif at h1 70.6/70.6 (1.0), h2 56/61.6 (1.1) and h3 44.5/53.4 (1.2), tracked -0.02em. They work from scale alone, with no bold display weight anywhere. Body and lead are a grotesk at 14/19.6 and 17.64/24.7, both at 1.4.
4. **Italic is the only emphasis device.** One or two words per title are set in the serif italic. That gives every title a focal point without colour, bold or a second typeface. It shows up in five of the six titles.
5. **The type ladder is one ratio.** It runs 14, 17.64, 22.2, 28, 35.3, 44.5, 56, 70.6, a ratio of about 1.26. Every size on the page sits on it, which is why it reads coherent without effort.
6. **There is almost no colour.** The page uses three grounds:
   - a warm off-white paper, #FEFAF3;
   - a warm near-black, #2F2C25, which is also the ink colour;
   - one tint, #F1EADD.

   Text, buttons and nav use the near-black ink. Hairlines are that ink at 12% alpha. Colour enters only through imagery: a painted abstract behind a code screenshot, a warm photo, and the soft blue and gold glow of the hero emblem. Measured blue (#369BE4) appears only inside the emblem. The page has no accent-coloured text, link or button at all.
7. **Measure is capped on every text block.** The lead is capped at 566 in the hero and in the split, and at 448 when centred. Stat descriptions sit around 369. The h1 is capped at 684. Lines never run past about 75 characters.
8. **Arrangement changes every band.**
   - The hero is left-set with an object on the right.
   - The stats band is centred, with a three-up row of figures below.
   - The media split puts the image left and text right.
   - Integrations flips it, with text left and staggered cards right.
   - The banner is a narrower centred block, 1038 against 1392.
   - The footer is asymmetric: a slogan on the left, three link columns on the right.

   No two adjacent bands share a silhouette, so the squint test passes even though the palette is monochrome.
9. **Stats are type, not boxes.** The number is set at h1 size in the serif. A small bold lead names it, then 14px prose explains it. No card, rule or icon sits around the figure: scale and the 24 rhythm group it.
10. **Grouping replaces ornament.** In the media split, a 72 gap separates the head (h2 and lead) from a two-up row of small features. Each feature is a 48 icon, then 12, a bold 14 title, then 12, the body. The two levels of hierarchy read through distance alone.
11. **Images are framed by placement.** The code screenshot (566x427, radius 6) sits inset about 59px inside a full-column painted panel (684x547, square corners). The panel's edge is the frame, and the image sits on it like a matte. The careers photo bleeds to the banner's top, bottom and left edges with no padding.
12. **Stagger breaks the grid.** The two integration cards sit in a 336 + 12 + 336 grid, and the left card is pushed 96px down. The pair reads as placed by hand rather than tiled.
13. **The text block is centred on the image's vertical axis in a split.** In the media split the text group's centre and the image's centre are both at y=1721, so neither column looks short.
14. **Controls are quiet and consistent.**
    - The one button style is a solid in the ink colour: 48 tall, radius 9, 24 side padding, 14/500 type.
    - Nav buttons are 42 tall.
    - The secondary nav button is tint-on-paper.
    - Chips are pills (radius 200) with a 1px hairline and an 11px uppercase mono label.
    - Links carry an arrow glyph, a ↗ after "See Integration".
15. **The eyebrow is a small mono label.** Mono at 11.1/15.6, tracking 0.1em, uppercase. It always sits 24 above the title in normal bands, and 36 above in the hero. One band prefixes it with a star glyph, the only icon used as a label decoration.

---

## 2. Measurements

Desktop 1470x830. Mobile 390x844, given in brackets where it differs.

| What | Value | Note / Tcules mapping |
|---|---|---|
| Page container | max 1440, padding 0 24 → content 1392 [mobile: gutter **12**] | Tcules Section: 1240 cap, 32 gutter. Keep ours |
| Section padding Y | 96 / 96; last content band 96 / 144; footer 96 / 48 [mobile 72 / 72] | `--gap-section` 96; the 144 maps to `--gap-section-open` 128 |
| Rendered section height | hero 518 (box 470); stats 761; split 739; integrations 682; banner 653; footer 853 | All content bands are under 830. Matches our "fits in ~1470x830" rule |
| Hero box | inset 24 from viewport edges, radius 6, padding 96 top and bottom, ink ground | see § 4 |
| Hero: eyebrow → h1 | 36 (eyebrow bottom 184 → h1 top 220) | the h1's line-height is 1.0, so the optical gap is about 26 |
| Hero: h1 → lead | 36 | |
| Band head: eyebrow → h2 → lead → button | 24 / 24 / 24 | `--gap-block` 24 exactly |
| Head → content row | 96 in the stats band (button bottom 957 → stats 1053); 72 in the split and integrations bands | 72 sits between our 64 and 96 steps. Map it to `--gap-column` 64, or to `--gap-stack` 48 by nesting |
| Stat: number → label → description | 24 / 24 | the number is 70.6 serif, the label 17.6 bold, the description 14 |
| Stat row | 3 × 369, gap 24, max 1156, centred | |
| Two-column split | 684 + 684, gap 24 | text column max 566, inset about 59 from its track |
| Feature item (icon) | 48 icon → 12 → bold 14 title → 12 → body 14/19.6; two-up, 271 each, gap 24 | 12 is off our scale. Use `--gap-text` 16 |
| Integration card | 336 wide, 394 tall; 1px hairline at ink 12%, radius 6, padding 18 | see § 4 |
| Card internals | 96 logo disc → 36 → title 17.6/500 → 18 → body 14 → 19 → arrow link → 35 → chip row (chip gap 6) | 36 and 18 map to 32 (`gutter`) and 16 (`text`) |
| Between cards | 12 column gap; 96 vertical stagger offset | we use `--gap-gutter` 32 between cards. A stagger is new to the kit |
| Careers banner | 1038 wide, centred; tint ground; radius 6; photo column 330 × 413 full bleed; text padding 48 | badge → h3 → body → button: 24 / 24 / 24 |
| Footer | slogan h3 44.5 (max 448), left; three link columns at 236 pitch; links 14 at 31.5 row pitch; mono heads; hairline above the legal row | |
| h1 / display | 70.59 / 70.59 (1.0), -1.41 (-0.02em), weight 400 [mobile 47.3 / 47.3] | |
| h2 | 56.02 / 61.62 (1.1), -0.02em [mobile 39.8 / 43.7] | |
| h3 | 44.46 / 53.35 (1.2), -0.02em [mobile 33.4 / 40.1] | |
| Lead | 17.64 / 24.70 (1.4) [mobile 16.66 / 23.3] | |
| Body | 14 / 19.6 (1.4) | small for us. Our body-sm or body |
| Eyebrow / chip | mono 11.1 / 15.6, +0.1em, uppercase [mobile 11.76] | same pattern as our mono roles |
| Text max-widths | h1 684; lead 566, or 448 when centred; banner body 448; stat description about 369; footer slogan 448 | about 60 to 75 characters for the lead, about 28 to 45 for the body |
| Image vs text area | split: image 684×547 (374k px²) vs text group 566×402 (228k px²), about 62:38. Banner: photo 330 of 1038, about 32% of width. Hero: emblem about 321 diameter in a 1422×470 box | image leads every band it appears in |
| Card delimitation | one hairline box (1px, ink 12%) on the integration cards only. Everywhere else: whitespace, grouping and the image edge | |
| Accent colour | none in the UI. Blue #369BE4 only inside the hero emblem; lime and teal only in third-party logos | ink #2F2C25, paper #FEFAF3, tint #F1EADD |
| Buttons | solid ink, 48 tall, radius 9, 24 side padding, 14/500 type; nav 42 tall with 18 side padding; one secondary in the tint colour | |
| `::selection` | not styled | ours is peridot |

---

## 3. Section-by-section catalogue

Crops are at 1470 and live in the folder given at the top.

**3.1 Boxed hero.** An inset ink box, 24 from the viewport edges with radius 6. On the left: an eyebrow, a two-line display h1 with one italic word on each line, and a lead under 566. On the right, vertically centred, an emblem: a gradient disc with a soft glow and the logo mark on it. No actions in the hero.
- Crop: `ref-prospect-sec-01-hero.png` (also `ref-prospect-01.png`)
- Informs: **hero**, the left-set title with an object counterweight on the right.

**3.2 Stats band ("numbers").** Centred head (star-prefixed eyebrow, h2 with an italic tail, a centred lead at 448, one solid button). Then, 96 below, a three-up row of left-aligned stats: a huge serif number, a bold label and a short description.
- Crop: `ref-prospect-sec-02-stats.png` (also `ref-prospect-01.png` and `ref-prospect-02.png`)
- Informs: **process/stats** and the centred head variant of **feature**.

**3.3 Media split, image left.** A full-column painted panel with a dark code screenshot inset inside it as a matte. On the right, centred vertically on the image: an h2, a lead, then 72 below, a two-up row of icon features (icon, bold title, body).
- Crop: `ref-prospect-sec-03-media-split.png` (also `ref-prospect-02.png`)
- Informs: **media split**, plus a nested two-up **feature** set.

**3.4 Integrations, text left and staggered cards right.** On the left: an h2, a lead, a mono "including" label, a five-item bullet list and a solid button. On the right: two cards side by side, the left one dropped 96. Each card has a coloured logo disc, a title, a body, an arrow link and a row of chips.
- Crop: `ref-prospect-sec-04-integrations.png` (also `ref-prospect-03.png`)
- Informs: **service list** (cards as linked services) and **feature**, the asymmetric head-beside-set arrangement.

**3.5 Careers banner.** A narrower (1038) centred tint panel. A portrait photo bleeds the left third. On the right, inside 48 padding: an eyebrow, an h3 with one italic word, a body under 448, one solid button.
- Crop: `ref-prospect-sec-05-banner.png` (also `ref-prospect-04.png`)
- Informs: **banner** and **CTA**, the image-led closing invitation.

**3.6 Footer.** On the ink ground: a large serif slogan (h3, italic second line) and a newsletter form (mono label, input and button, a muted reassurance line) on the left. Three mono-headed link columns on the right. Then the wordmark, a hairline, and a copyright and utility-link row. Then a long legal disclaimer at 11px.
- Crop: `ref-prospect-sec-06-footer.png` (also `ref-prospect-05.png` and `ref-prospect-06.png`)
- Informs: **form** (newsletter inline form) and the site footer.

**Mobile (390), from `ref-prospect-full-390.png`.**
- Everything stacks to one column. Section padding drops to 72 and the gutter to 12. The hero box insets 12.
- In the media split, the image moves *below* the text. In the banner, the photo goes above the text, full width.
- Stats stack with about 110 between them.
- The cards un-stagger and stack with a 12 gap.
- Type drops one step on the ladder: h1 70.6 to 47.3, h2 56 to 39.8.
- Nothing scrolls sideways.
- Informs: the **read-down** behaviour. Image order flips so text leads on mobile, and the type steps down in pairs.

---

## 4. Moves that conflict with Tcules rulings, and what replaces them

| Their move | Ruling it conflicts with | Tcules replacement |
|---|---|---|
| **Boxed ink hero** (inset ink box, radius 6) | Ink is reserved site-wide for the footer. Section owns the ground, with no hand-set boxed grounds. CLAUDE.md: weight comes from scale and imagery, not a tinted band | Hero on paper. Keep the composition: left-set h1, lead capped about 566, object counterweight on the right. The counterweight is a Tcules illustration or the `Texture` component (`counterweight`), not a box. Compact breadcrumbs above. The eyebrow never repeats the crumb |
| **Gradient glow emblem** (blue and gold radial glow) | Peridot only in `::selection` and illustrations. Blue is a UI accent used wisely. No gradients in the brand system | A drawn illustration in our standard (left-facing, concept from the page's argument), or Texture. The emblem's lesson to keep: one large, soft object with its own space, vertically centred on the title block |
| **Hairline-boxed integration cards** (1px border, radius 6, 18 padding) | No boxes on cards (`visual-direction.md`: "A card is never a box") | Borderless cards delimited by: the logo disc or image at the top; a serif title at h4 scale; `--gap-gutter` 32 between cards; a hairline at the card's top edge only on text-only cards. **Keep the 96 stagger:** it is a move worth adding to the kit as a `Layout` option. A `stagger` prop on the primitive, not a local offset margin |
| **Tint careers panel**, narrower and radius 6 | No tinted background band as weight. One tint band per page, reserved for the proof band (G). Never override Section's column from outside | A paper-ground media split: the image bleeds its column, the text column at 48 padding-equivalent via `Layout` gaps. If narrowness is wanted, express it as a `Layout` track ratio, not a box. The photo is stock with no type on it, which is allowed |
| **Monochrome UI with no accent; solid ink buttons** | Blue is the one recurring UI accent | Primary solid button in blue, spent once per band (Accent tier). Second actions are neutral link-style in ink. Per-card links are neutral with an arrow, as Prospect's ↗ already does. The restraint transfers directly: Prospect gets elegance from *zero* accent, so we should spend blue at most once per band |
| **Italic serif emphasis on 1 or 2 title words** | No conflict. Newsreader (`--font-family-display`) has a true italic | Adopt it as a title-role variant, e.g. an `<em>` inside a heading that renders the display italic. It must be a component/token decision, not ad-hoc. Do **not** colour the italic word blue, which would spend the accent on decoration |
| **Off-scale distances**: 12, 18, 36, 72, 144 | The nine-step gap scale | 12 → `tight` 8 or `text` 16 by what it separates (card gaps go to `gutter` 32); 18 → `text` 16; 36 → `gutter` 32; 72 → `column` 64, or `stack` 48 by nesting; 144 → `section-open` 128. The *pattern* to copy is "one step for every head seam (24 → `--gap-block`), one larger step to the content row" |
| **14px body under 17.6 lead** | Spacing and type must never read cramped; our body roles are larger | Keep our body roles. Copy the *ratio*: the lead is about 1.26× body, set at 1.4 |
| **Mobile gutter 12** | Section owns a 32 gutter (mobile per tokens) | Keep ours. Do not narrow to fit |
| **Three-up stats row in a centred band** | No conflict | Maps to our process/stats family: serif number at display scale, label and description at `--gap-block`, no boxes and no icons |
| **Inline newsletter form in the ink footer** | No conflict (the footer is ink) | Our `EnquiryForm` and footer. Copy the muted reassurance line under the field |
| **Code screenshot matted on a painted panel** | No type on images. The screenshot contains code text, which arguably counts | Mat a product or project image (no UI text, no labels) on a Texture panel or a stock photo, with square panel edges and the image inset. The matte-on-panel framing is the move worth keeping for our **media split** |
| **Unstyled `::selection`** | Ours is peridot | Keep peridot |

**Net take for the kit**, ranked by leverage:
1. One head rhythm, all at `--gap-block`, and one larger step to the content.
2. Every band fits one viewport.
3. Alternate the arrangement every band: left-set, centred, image-left, image-right, staggered, narrow.
4. Italic emphasis in the serif title.
5. Image as matte-on-panel, or a full bleed to the column edge.
6. Card stagger as a `Layout` option.
7. Stats as pure type at display scale.
8. Text centred on the image's axis in splits.

