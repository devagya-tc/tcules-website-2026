# Digital Branding Framework — proposed amendments to ch05 Imagery

**Status:** proposed · for Devagya to rule on, item by item
**Raised:** 16 September 2026
**Against:** ch05 Imagery v0.8 (draft), with one item touching ch10 Social media v0.5
**Why this exists:** the website is being designed against ch05. Four of these are places where the
chapter contradicts itself or states a number that is provably wrong; four are cases it never
answered. Each one blocks or misdirects real production, so each needs a yes or a no rather than a
discussion.

Format per item: **what it says now** (quoted), **the problem**, **proposed replacement**, and a
one-line **recommendation**. Nothing here is applied — this is a redline to take into the source.

---

## 1 · §9 — strike "designed type" from the card-thumbnail row

**What it says now.** §9, Card thumbnails:

> Every other card (article, insight, service, glossary) carries designed type built to chapter 10
> Part B at this canvas, with the family's ground behind it.

**The problem.** Three separate rules in this same chapter forbid it.

- **§6a's own table** has a verbatim row: *"`Figure`, `BlockCard`, `ListCard` and any on-page image
  that has a caption — **No.** The caption carries the words, where they can be read, translated and
  searched (§7)."*
- **§1's decorative test.** `BlockCard` renders media, then eyebrow, then an `<h3>` title, then body,
  then a link button — the page's words, as live text, 24px below the image. Put the title into the
  thumbnail and cover the image: nothing is missing. By §1's test the asset is decorative, and §7
  then requires decorative images to ship with `alt=""`. The rule produces ~100 files the chapter
  classifies as nothing.
- **§7 directly:** *"An image contains no meaningful text of its own: no headline, no label, no
  attribution rendered into the pixels."*

The rule appears to have been borrowed from the share preview. §6a's condition for type-on-image is
a *travel* condition — *"The asset travels alone, with no caption and no page around it: if it does
not say what it is, nothing does."* That is true of an OG image and false of a card thumbnail.

It also does not transfer mechanically. ch10 Part B is dimensioned in absolute px on a 1080 canvas
with a 22px floor. A `BlockCard` in a three-track 1240 grid renders **392 CSS px** wide — the floor
scales to 8px. A `ListCard` thumbnail is hard-set at **160 × 107** — the floor scales to 3.3px. Part
B also requires the wordmark and an action row on every frame, so followed literally every article
card would contain a picture of the wordmark and a picture of "READ MORE →" directly above the real
one.

**Proposed replacement.**

> Case-study cards carry a detail of the product on the product's own ground (§2). Every other card
> carries the treatment its page type takes under §1 — an illustration where the subject is a method
> or an idea, a capture where client work is the subject. Designed type on a flat ground is a
> share-preview treatment (ch10 Part C) and is not a card thumbnail: a card already renders its title
> and body as text beside the image, so words in the pixels duplicate them.

**Recommend: accept.** The pipeline argument for generated assets is real, but it is an argument for
building the share-preview generator, not for pointing its output at a slot that already has the
words.

---

## 2 · §1 and §9 assign two different categories to the same pages

**What it says now.** §1's surface table: *"Website · Articles, insights, service pages ·
**Illustration, then client work**."* §9: those same cards *"carry designed type."*

**The problem.** They cannot both stand. §4 defines illustration's remit as *"a concept, method,
service, process or article idea"* with no shipped screen — a precise description of an article page
and a service page. §4a also makes illustration the only place peridot appears as a fill, so the
brand's entire second accent is gated behind drawings existing.

**Proposed replacement.** §1 wins. §9's row is rewritten per item 1 above, which resolves this at the
same time.

**Recommend: accept.** §1 is the better-argued rule and it is the one that makes the site look like
something rather than like its own sitemap.

---

## 3 · §9 — the hero media ratio is a misstatement of the code

**What it says now.** §9, Website, Page hero media:

> Fixed by `--hero-media-ratio` = 16:9, hairline rule, `--radius-0`.

**The problem.** The token exists but is applied to the **YouTube iframe only**
(`PageHero.module.css`). The image rule sets `inline-size: 100%; block-size: auto` — intrinsic ratio,
uncropped — and the file states the reason, which is §2's own:

> a crop mode would cut small type out of some screenshots, and a hero is where a screenshot is
> largest and most likely to be read. The one aspect-ratio in the file boxes the YouTube frame,
> whose content is 16/9 because that is what YouTube serves.

A forced 16:9 would crop the evidence at exactly the placement where it is most readable.

**Proposed replacement.**

> Page hero media — a still runs at its intrinsic ratio, uncropped, at the full content column, with
> a hairline rule and `--radius-0`. Supply a detail composed to suit the subject rather than to a
> fixed ratio. A YouTube embed is boxed at 16:9, because that is what the platform serves.

Strike also the clause *"or the landscape thumbnail master"* — under item 1 that master is the
designed-type graphic, so it would place a picture of the headline directly beneath the real `<h1>`.

**Recommend: accept.** The code is right; the chapter should follow it.

---

## 4 · §9 — the inset arithmetic is wrong

**What it says now.**

> `--img-thumb-landscape` 2560 × 1440 · 16:9 · `--img-thumb-landscape-inset` 125 inline · 32 block

and, in the `BlockCard` row: *"The landscape thumbnail qualifies; its 125/32 insets survive the
crop."*

**The problem.** They do not survive. `BlockCard` vertical is `aspect-ratio: 3/2` with `object-fit:
cover` and centre `object-position`. Cover against a 16:9 source matches height and overflows width:

| Target | Usable source width | Cut per side | Inset | Result |
|---|---|---|---|---|
| 3:2 (vertical card, `ListCard`) | 1440 × 1.5 = **2160** | **200px** | 125 | 75px of designed content lost per edge |
| 4:3 (`--bcrd-media-ratio-horizontal`) | 1440 × 1.333 = **1920** | **320px** | 125 | 195px lost per edge |

The block inset survives, because height is preserved. The half that is wrong is the half a supplier
will trust.

**Proposed replacement.**

> Anything that must survive every placement lives inside the central **1920 × 1440** of the master —
> 320px in from each inline edge, which is the 4:3 intersection. The 32px block inset holds at every
> ratio because the crop preserves height.

**Recommend: accept.** This is arithmetic, not judgement.

---

## 5 · §2 and §4a — what bounds a drawing, and what bounds a capture in a card

**What it says now.** §4a: a drawing's ground is *"Transparent, so the page's ground shows through
and the drawing never sits on a panel of its own"*, and *"Never a drawn shadow beneath the object."*
§2: on the website a capture takes no device frame because *"Figure and PageHero media render the
capture with a hairline rule and `--radius-0`; that rule is the frame."*

**The problem — two of them, in opposite directions.**

*A drawing gets an edge it should not have.* `Figure` and `PageHero` draw the hairline
unconditionally, on all four surfaces, with no way to turn it off. §4a's wording is about a *panel*,
not a rule, so this is not a literal contradiction — but a hairline box around a transparent line
construction draws an edge where the object has none, and neither section says what happens when a
drawing goes into a slot built for a capture.

*A capture gets no edge at all.* `BlockCard` and `ListCard` draw **no rule**. `block-card.css` states
it: *"No edge… Nothing here paints a border on any surface or in any state."* So on the `paper`
surface, a screenshot of a white-UI product sits in a card with no boundary whatsoever. The chapter
never asks what bounds a capture in a card.

**Proposed replacement.** Add to §2:

> One edge treatment per kind of object, across every placement. A **capture** takes a hairline rule
> and `--radius-0` wherever it appears — `Figure`, `PageHero`, `BlockCard`, `ListCard` — because
> without one a light-UI capture on a light ground has no boundary. A **drawing** takes no rule and
> no shadow anywhere: its ground is transparent and its edges are its own lines. The placement is
> told which it is.

Consequence for the code: a `kind: 'illustration'` variant on the media unions that suppresses the
rule, and a hairline added to the two card components.

**Recommend: accept.** It resolves both directions with one rule.

---

## 5a · §2 — a card's crop box rules every kind (owner ruling, 29 Sep 2026)

**What it changes.** Amendment 5 holds everywhere except the cards. In `BlockCard` the image takes one
hairline **whatever its kind**: capture, cut-out, illustration or photograph. The card's crop box draws
it, and the image draws none of its own (`Media edge="placement"`).

**Why the exception is principled, not a patch.** Amendment 5's rule is about an object's *own* edge:
a drawing has none, so it is never boxed. A card does not show the object as itself. It crops every
asset mechanically to the card's ratio (3:2 in a tile, 4:3 in a row, B4), so the boundary a reader
sees is a cut the card made. The hairline marks that cut. It also gives every tile in a set the same
boundary, so a cut-out on paper, an illustration and a capture read as one row of objects rather than
three treatments.

**What it does not change.** No panel for an illustration, and no second shadow. A cut-out keeps its
one shadow and its contrast panel inside the rule. Full-column placements (`Figure`, `PageHero`) and
the ListCard thumbnail keep the edge by kind. The rule ink is the house rule ladder: neutral-300 /
400 / 700 / brandeis-300 by surface, and it darkens on hover as the card's hover cue.

**Recommend: record in ch05 §2** beside the capture's hairline, as the one placement that rules its
own box.

---

## 5b · §6 — a card image takes an 8px radius (owner ruling, 29 Sep 2026)

**What it changes.** §6 sets radius 0 on every image, with one exception: the SiteNav rail card at
`--radius-4`. `BlockCard` becomes the second: its image crop box takes `--radius-8`, and the image is
clipped to it. The card frame, the focus ring, Figure, PageHero and the ListCard thumbnail stay at 0.

**Why.** The owner reviewed the case-study index and ruled that the cards read better with softened
media. Like 5a it is a property of the card's crop, not of the asset, so no asset is authored
differently.

**Recommend: record in ch05 §6** beside the SiteNav exception.

---

## 6 · §4a — "a recolour, not a re-placement" is not buildable as specified

**What it says now.** §4a, Ground:

> The line and fill colours are chosen for the ground it is placed on (below), so moving a drawing
> from paper to ink is a **recolour, not a re-placement**.

with a palette table splitting every role into paper/tint (`brandeis-500` line) and ink/blue
(`brandeis-300` line).

**The problem.** Every media slot on the site takes a URL string, never a node — deliberately.
`BlockCardMedia` is `{kind:'image'; src; alt}`, and its doc says the closure is the point: *"Callers
cannot pass a React node, so the slot cannot acquire controls, overlays or call-site crop
behaviour."* An `<img src="drawing.svg">` is a separate document: it cannot read
`--color-brandeis-300`, cannot see `data-surface`, and does not inherit `currentColor`. So a recolour
is impossible and it is necessarily a re-placement. §8 says only *"Placed as SVG wherever the surface
renders it, the website included"* and does not address this.

**Proposed replacement.**

> Each drawing is exported as **two files**, one for light grounds (paper, tint) and one for dark
> (ink, blue), coloured per the palette table. The page chooses by the surface it placed the section
> on. The SVG source remains single and is filed with both exports.

Note also, unaddressed: `BlockCard` centre-crops media into a fixed 3:2 or 4:3 box, so a line
construction placed in a card will be cut through. §4's "simplify the drawing" rule is about detail
at size, not about a mechanical crop. Drawings intended for cards should be authored at the slot's
ratio.

**Recommend: accept two files.** Do not reach for a CSS `filter` or `mask` — §5 forbids treatment
outright.

---

## 7 · §6a — photographic section openers are permitted on the website

**What it says now.** §6a lists *"Section openers built on a photograph — about, careers, studio,
culture"* under "Where a photograph may carry type: **Yes**." But §6 says *"On the website no
component takes an image behind text (`BlockCard` puts the image above the title; `Figure` and
`PageHero` media are blocks)."*

**The problem.** §6's parenthetical reads as a statement of current fact — it explains *why* no such
case exists today — but it can be read as a prohibition, and §6a's list mixes web surfaces with deck
surfaces without saying which side those four pages fall on.

**Ruling given, 16 September 2026: permitted.** It is the only place in the chapter where an image
may set a tone rather than prove a claim, and about/careers are where the site being text-first hurts
most.

**Proposed replacement.** Amend §6 to read *"No component takes an image behind text today"* and add
to §6a: *"On the website this is served by a dedicated section-opener pattern, not by `PageHero`,
whose media is a block below the title."*

Consequence for the code: one new pattern — one photograph, one display line, a progressive blur band
per §6a, and the measured contrast recorded with the asset.

---

## 8 · §8 — no delivery story between a 2560px master and a 160px slot

**What it says now.** §8: *"`--img-min-width` = 2560px, for on-page imagery"*, with no exception per
placement.

**The problem.** `ListCard`'s thumbnail renders at **160 × 107 CSS px** — a 16× downscale of the
mandated master. A `BlockCard` in a three-track grid is 392px, a 6.5× downscale, twelve times over on
a listing page. Neither chapter has a position on `srcset`/`sizes`, a file-weight budget (ch10 Part C
has "under 1 MB" for OG images; ch05 has nothing), or loading priority. Every slot in the codebase is
a native `<img>` with `src`/`width`/`height`, which is a documented choice rather than an oversight.

**Proposed replacement.** Add a Delivery row to §8:

> One master at 2560px. Derived widths are exported per placement — hero, figure, card, thumbnail —
> and a per-image weight ceiling applies at each. State the set of derived widths with the asset.

**Recommend: accept, and settle it before the first batch is produced** rather than after a listing
page ships twelve 2560px masters.

---

## Also noted, not amendments

- **§10 does not contain the client-logo rules.** Its seven rows are Sourcing, Records, Client
  approval, Team consent, AI-generated imagery, Verification, Changes. The monochrome-for-logo-walls
  and optical-size-normalisation rules are in the framework *outline*, not in the chapter. They
  should be brought in before anything is built against them.
- **§12's open decision** — whether illustration captions append "Illustration generated with AI", or
  disclosure is a single site-level note — is still open. Its own recommendation is site-level. If
  that is taken, the site needs somewhere to put it, and nothing has that slot.
- **ch10 pattern 07 mis-describes the site's blockquote.** It gives `brandeis-500` lifting to
  `brandeis-300` on dark. The site also uses `peridot-400` on the blue surface (`prose.css`, with the
  reasoning: *"Brandeis against Brandeis is invisible, and peridot is the system's highlight"*). ch10
  omits the fourth surface while claiming to describe the site.
- **§5 sanctions a case it never examines.** *"Client work sits on whatever ground its UI uses"* — so
  a white-UI capture placed in an `ink` section is a bright rectangle punched into a dark band. That
  may be correct, but the chapter should say so deliberately.

---

# Addendum · 24 September 2026

> **Applied 24 September 2026** to the Claude Design project: ch05 is now **v0.9**, ch10 **v0.6**.
> Everything in B and C below is written into the chapters. Items 3 and 4 were applied as factual
> corrections. Items 1, 2, 6 and 8 and the "also noted" list are now decisions in ch05 §12 and ch10
> §F2 rather than here. New in ch05: **§9a Project covers and banners** (proposed). The pre-edit
> files are backed up at `.design-sync/.cache/dbf-backup-2026-09-24/` (gitignored, local only).

**Checked against:** the source files in the Claude Design project *Tcules Design System - Aug 2026*,
`Digital Branding Framework/05 Imagery.html` (v0.8) and `10 Social media.html` (v0.5). Nothing above
has been applied to either chapter. Part A records where each item stands now. Parts B and C are new
rulings from Devagya, written as redlines. Part D lists what they change on the website.

## A · Where the eight items stand

| # | Status | Change since 16 Sept |
|---|---|---|
| 1 | Open | The §9 sentence has been reworded ("built on chapter 10's ladder (§A3), grounds (§A4) and mark (§A6), with the row patterns in §B2"), but the rule still stands. The replacement should point case-study cards at the §2a cut-out rather than "a detail of the product". |
| 2 | Open | None. |
| 3 | Open | None. The new §12 decision 02 is related; see B3. |
| 4 | Open, narrower | §9 now says card-size client work is a cut-out on alpha, so the crop lands on transparency. Restate the rule as the central **4:3** (the horizontal card's crop), not the central 3:2. |
| 5 | **Replaced by B4 + B5** | §2a already gives card-size cut-outs no frame, so the proposal to add a hairline to cards is dropped. |
| 6 | Open, narrower | B/C remove brandeis-900 as a ground, so ch10 §F2 decision 02 lapses. What remains open: an illustration on a **brandeis-500** ground has no palette in §4a. |
| 7 | **Withdrawn** by B1 | The photographic-opener pattern is not built. |
| 8 | Open | B3 adds a mobile check, but not the derived-widths list or the weight ceiling. |

Also noted, still open: client-logo rules are not in ch05. The AI-disclosure decision (§12 01) points
at ch10 §F2, which no longer carries it. ch10 pattern 07 still omits the blue surface. §5 still
doesn't say what happens to a white-UI capture on ink (B5 answers it for cut-outs only).

## B · ch05, new rulings

### B1 · No image carries type, on any surface
Replaces §6 *"Photographs can carry type. Captures cannot."* and the whole of §6a: the "Where a
photograph may carry type" table, "What has to be true", "The region, measured", the blur band and
the plate device.

> **No image carries type, on any surface.** Words sit beside or below an image box, never over it.
> This holds for photographs, captures, cut-outs and illustrations, and for share previews, posts,
> carousels, covers, video thumbnails and section openers alike. A share preview or post that is
> designed type on a flat ground is not type on an image, and is unaffected.

Rows that stop being canonical: every "Permitted" / "Yes" row in §6a, and the two photograph
examples (`photo-type-example.jpg`, `photo-type-blurband.jpg`). In ch10, every A7 and D1 arrangement
that sets type over an image box has to be re-checked.

### B2 · Cut-outs: shadow and ground
Amends §2a "Colour and elevation" and "Cut out, not framed".

> A cut-out may carry one drop shadow, `--img-crop-elevation`: never stacked, never coloured, never
> with perspective. Where the product's UI doesn't hold its edge against the surface it is placed on,
> it sits on a panel of `paper`, `paper-deep` or `ink` (B5).

*Call to confirm:* this drops the clause *"none on the satellites around it"*, so each part of an
assembled cut-out may take its own shadow. Say if the satellites should stay unshadowed.

### B3 · Every image is chosen for mobile
New rule in §8, and it replaces the two sizes in "Checked at two sizes".

> An image is approved at the narrowest width it renders at on the site: **326px** in a 390px
> viewport (390 minus two 32px gutters), for full-column and card placements alike. One asset serves
> every width. No image may depend on a mobile-only crop to pass. A cut-out's scale floor (leading
> label ≥ 15px, smallest ≥ 11px) is measured at that width. An image that fails is not used,
> whatever it looks like on desktop.

*Knock-on:* a whole-screen capture almost never clears 326px, so full-column placements will fall back
on cut-outs. That answers §12 decision 02 ("Composed mockups above 600px") the **other way from its
recommendation**: cut-outs may carry Figure and PageHero media. It needs a ruling.

### B4 · Illustrations are never boxed
Adds to §4a "Ground".

> An illustration never sits inside a box: no hairline, no panel, no frame, no shadow, in any placement. Its
> edges are its own lines. A placement that crops mechanically (BlockCard, ListCard) is still a crop,
> so an illustration meant for a card is authored at the card's ratio.

### B5 · Cut-outs are boxed when contrast asks for it
Amends §2a "Cut out, not framed" and rescopes §6's *"No panel… laid over or around any image"*: this
panel is the second exception, beside the annotation ring.

> A cut-out sits straight on the placement's ground by default. Where the UI's own edge doesn't hold
> against that ground (below **3:1** against the adjacent ground, the non-text contrast threshold), it
> sits on a flat panel of `paper`, `paper-deep` or `ink` that fills the slot. No hairline, no radius
> and no second shadow on the panel. The panel is chosen for contrast, not for decoration: if the
> cut-out holds its edge, there is no panel.

*The 3:1 threshold is my proposal, so the rule can be checked. Change it if you want a different test.*

### B6 · §9 "Where images sit" is stale
Mark §9 **stale, do not supply against it** now. Rewrite it once the component audit (tracker 1.1)
has settled PageHero's arrangements, because hero variants will add placements. Write it as one
table: placement · ratio and crop · edge by kind (capture / cut-out / illustration) · mobile check width ·
derived widths (item 8).

## C · ch10, new rulings

### C1 · Grounds
Replaces the §A4 lead, the family table and the set-role table.

> **`paper` is the primary ground. `paper-deep` is the secondary ground.** Between them they carry
> every routine post and every high-value content type. **`ink` and `brandeis-500` are reserved**:
> one-off uses, each argued, never a family's default and never a rhythm device such as a hinge or a
> closer. **`brandeis-900` is not a surface**, on any canvas. Blue's job is to be seen as
> brandeis-500, so its use is rare and deliberate.

What stops being canonical, and what has to be rewritten:
- **§A4 "Four grounds, four families"** can't survive. Evidence (ink) and argument (brandeis-900)
  lose their grounds, so **ground can no longer be what tells the families apart**. What does it now
  (eyebrow, mark, layout pattern) is an **open decision**, and the biggest thing this addendum leaves
  unsettled.
- **"A frame with a QR: ink, whatever the family"**: needs a light-ground QR treatment, or becomes
  a reserved ink use.
- **Hinge frame**: stays as a storytelling role (the frame where the argument turns, §B4), but it
  keeps the body's ground. A change of ground is no longer a rhythm device.
- **Inks-by-ground table**: remove the brandeis-900 column. Add a brandeis-500 column if 500 is a
  permitted reserved ground.
- The other brandeis-900 references: the wordmark version row, A1 07 ("brandeis-100 for support on
  brandeis-900"), the evidence-family do/don't examples, the §F2 fix for `social-posts-v3`
  ("move the hinge to brandeis-900", now reversed), and §F2 decision 02 (lapses; see A.6).

### C2 · Carousel position is a number
Amends the counter row.

> A carousel shows its position as numerals in the counter role, `02 / 07`, from frame two on.
> No progress device: no squares, bars or dots.

The *"counter's squares at 10px"* note in §A2 is deleted.

## D · What this changes on the website

- **Surface scarcity applies to the site.** `paper` and `tint` (`paper-deep`) carry pages. `ink` and
  `blue` (brandeis-500) are argued exceptions. Bands on about, careers, insights,
  matter-design-system and future-interfaces-lab/join use them today (eleven call sites). They get
  reviewed in the component audit. The site has never painted brandeis-900, so nothing changes there.
- **Media kinds for the code:** *capture*, which takes a hairline and only runs at full column;
  *cut-out*, which takes no edge, may carry one shadow, and gets a contrast panel when B5 triggers;
  *illustration*, which is never boxed.
- **Specimens check images at 326px** as a stress row.
- **`visual-assets-plan.md`**: the photographic-opener pattern and comp 5's "photographic opener"
  are withdrawn. About and careers open with a photograph as a block, beside or below the h1.
