# Component audit — tracker 1.0 and 1.1

**Status:** decided · 28 September 2026 · read-only (no code changed to write it). Rulings from the owner are in §6.
**Output of this document is a decision per unit, not code.** Phase 2 (tracker 1.3) is filled from §4.

**Read against:**
- The handoff (`Tcules-Design-Engineer-Handoff-Package/`): page-family map (§2), semantic inventory (§3),
  "frontend foundations to build immediately" (§5), the first-slice acceptance checks (§5).
- `TCULES_COPY_UI_STANDARD.md` (CU): hard gates CU01, 03, 06, 10, 16, 21, 23, 25 and the CU04 budgets.
- `TCULES_CONTENT_SYSTEM.md` (CS) §1–5, `docs/visual-assets-plan.md` (VAP).
- The brand framework: ch02/03/04/05 in `docs/brand/`, the addendum `docs/dbf-ch05-amendments.md` (B1–B6, C1, D),
  and the v1.0 rulings recorded in `docs/dbf-consistency-check-2026-09-24.md`.

> **Brand version.** Read against ch02, ch05 and ch10 at **v1.0** (25 Sep), re-pulled into `docs/brand/` on
> 28 Sep. Rulings used here: client work is a cut-out at every size, including Figure and PageHero (a flat
> capture only when the whole layout is the subject, §12 02); portraits are 1:1 (§12 11); cards other than
> case studies carry no media (§9, §12 05); no illustration on blue (§4a); the cover is 3:2 and the banner 16:9
> (§9a); client logos per §10; the nav card keeps radius 4 (§12 09).

**Count.** The tracker says 25 shipped units. There are **24**: 10 components + 14 patterns
(`TextureShape` is a child of `Texture`, not a unit). `src/templates/` is empty.

---

## 1 · Foundations (tracker 1.0)

Against the handoff's "build now" foundations list and the brand. **Refine** means a Phase 2 task.

| Foundation | Handoff asks | Today | Verdict |
|---|---|---|---|
| **Type ladder** | "robust H1/H2/card wrapping" | Roles match ch03 v0.2 value for value (display→caption, mono roles, stat). Code adds `h6` and `index`, which ch03 doesn't name. Leading is laddered per breakpoint in code; ch03 states one leading per role. | **Keep the values. Refine wrapping** (below). |
| **Heading wrap** | as above; CU25 "awkward headline wrapping… excessive card-title wrapping… orphan words" | `text-wrap: balance` exists on the PageHero title, the CtaSection heading and Prose headings **only**. BlockCard, ListCard, ContentSection, Accordion question and the base `h1–h6` in `globals.css` have none. The typography specimen's every heading sample is 26 characters ("Design that earns its keep"). | **Refine.** Wrap is a property of the *title role*, not of whichever component consumed it, which is the same argument as `--text-mono-case`. Every rule that sets a title role writes `text-wrap: balance`, and lead/body write `pretty`. Add stress rows to `/design/typography` at the CU04 ceilings: H1 10 words, H2 10 words, card title 8 words, a 30-character proper noun, and a 390 column. |
| **Gap scale** | "spacing tokens… section rhythm primitives" | Nine steps. ch03's page-opening gaps (24 / 16 / 48) are `block` / `text` / `stack` exactly. | **Keep.** |
| **Container / grid / breakpoints** | "Container/grid system… responsive breakpoints" | Section 1240 cap and 32 gutter. Layout is min-width 768 / 1024 / 1440. Type is max 767 / 1023, the complement of the same two edges. A bare `columns` number is one track below 768. | **Keep.** Worth recording that it is one system with two directions, not two systems. |
| **Media ratios** | "media ratios… responsive cropping/contain" | Per-component only: `--bcrd-media-ratio-vertical` 3/2, `-horizontal` 4/3, `--lcrd-thumbnail-ratio`, `--nav-card-image-ratio`, `--hero-media-ratio` 16/9 (video only). There is no shared ladder. | **Refine, narrowly.** Only a *cropping* placement owns a ratio: the cards (3:2, 4:3), the ListCard thumbnail (3:2) and the nav card (16:7). Full-column media (Figure, PageHero stills) takes the asset's **intrinsic** ratio and never crops (ch05 §9). That is correct, and it is what lets an illustration (authored on a 1:1 canvas, §4a) and a cut-out (no fixed ratio) sit in a hero as themselves. The 3:2 card crop is shared by BlockCard and ListCard because both must serve one cover asset (§9a), so it moves to a primitive (`--ratio-cover` 3/2), which both alias (token rule 6). The 16:9 banner is not a component ratio; it is the ratio a case-study banner is *authored* at, and the hero shows it intrinsically. |
| **Responsive image slot** | "Media renderer… responsive cropping" · v1.0: "Images need a responsive slot to serve the §9 derived widths as WebP with alpha" | Every pattern renders a native `<img>` with one `src` (Figure, PageHero, ListCard, BlockCard, SiteNav). There is no `srcset` and no `sizes`. The comments say there is "no Image primitive in this repo and no next/image precedent". | **Build.** A tier-1 `Media` primitive (`src`, `alt`, intrinsic size, derived widths, `kind`, `fit: cover|contain`), consumed by every pattern that has an image slot. It is the one foundation missing outright, and the `kind` work in §2 needs it. |
| **Buttons / links** | "Buttons, text links" | Button is complete: 3 emphases × 2 tones × 3 sizes, busy/disabled union, iconOnly union. Routes use `link` + `neutral` 24 of 31 times. | **Keep.** Unused variants (sm, iconOnly, iconLeft, busy, active) are a control library's job, not dead code. |
| **Chips / labels** | "chips/labels" | Tag (mark · filter). | **Keep.** |
| **Cards** | "cards" | BlockCard, ListCard. | See §2. |
| **Disclosure** | "disclosures/accordion behaviour" | Accordion. | See §2. |
| **Form primitives** | "persistent labels, validation, errors, what-happens-next" | Input + EnquiryForm (4-state lifecycle). The what-happens-next content is CtaSection `points`. | **Keep.** See EnquiryForm for the variants no route uses. |
| **Focus states** | "accessible focus states" | Shared `--focus-ring-width` / `--focus-ring-offset` primitives. The colour is per component per surface (`--{abbrev}-ring-color`, `-ring-gap-color`), a hard box-shadow ring. | **Keep.** A per-unit check stays on every `/audit-component` run in Phase 2. |
| **Rich text** | "rich-text styling" | Prose, with no measure (the caller owns the column). There is no specimen route of its own; its rows live in `/design/typography`. | **Keep.** Give Prose its own `/design/prose` route when it is next touched. The index currently points "Prose" at typography, which hides how thin its coverage is. |
| **326px check** | ch05 B3 / addendum D: "Specimens check images at 326px as a stress row" | No specimen renders a 326 (or 390-wide) row. Narrow rows use 192 / 256 / 320 tracks. PageHero's specimen says 767 / 375 needs a window resize. | **Refine.** Add a `326` track to the `_specimen` harness and a 326 row to every specimen with an image slot (Figure, PageHero, BlockCard, ListCard, SiteNav). |
| **SEO / analytics** | build now | Not a component concern. It is tracker 3.4. | — |

---

## 2 · Brand fit, site-wide

**No type on images (B1).** Holds everywhere. No pattern sets text over an `<img>`, and no module uses
`background-image`. **Nothing to change.**

**Media kind (addendum D, v1.0).** Nothing records a kind. Figure draws a rule, radius and shadow on every
image (`Figure.module.css`), and PageHero draws the hairline too. Under v1.0 the default for client work
is now a **cut-out at every size**, which takes **no edge**, and an illustration is **never boxed**. So
today's default treatment is wrong for most images the site will receive, not just for an edge case.
`kind: 'capture' | 'cut-out' | 'illustration'` becomes a content prop (it changes what the image *is*, so it
passes the Strapi test in `strapi-changes.md` §1). It lives in the `Media` primitive, and every image slot
inherits it.

| kind | Edge | Shadow | Panel | Allowed in |
|---|---|---|---|---|
| capture | hairline, radius 0 | none (one edge cue) | — | full column only, only when the layout is the subject |
| cut-out | none | one `--img-crop-elevation` | paper / paper-deep / ink when the UI edge < 3:1 (B5) | every placement |
| illustration | none, ever | none | never | not on blue; not as case-study evidence |

**Cards (v1.0).** Only case-study cards carry media: the §9a cover, 3:2, central 4:3 safe. Every other
BlockCard or ListCard runs media-less. That makes the no-media card the common case for most families, so
it has to be designed, not merely tolerated (VAP: "the without-visual state is a first-class design").

**Surfaces: ink and blue are reserved (addendum D, C1).** Eleven call sites were reviewed:

| Route | Band | Ruling |
|---|---|---|
| `insights` :178 / :184 | blue, lab band (CtaSection offer, or a Section) | **Argued.** The lab is a different organisation's offer inside the insights index, and one change of ground marks the hand-off. Keep it, and make it the page's only reserved band. |
| `about` :166 | ink, third section | **Not argued.** The third band is a rhythm device. Move it to paper or tint. |
| `about` :349 | `surface={card.surface}` on nested card Sections | **Wrong on two counts.** Surface comes from the CMS, which is presentation stored as content (strapi-changes §1). It also lets an editor paint ink or blue anywhere. Remove it: the card's ground is decided in code. Log it on `strapi-changes.md`. |
| `careers` :168 | ink, the lab section | **Argued**, if the lab is treated like insights: one reserved band, marking the other organisation. Keep. |
| `matter-design-system` :196/:202, :325/:344 | blue strip one, ink strip two | **Not argued as a pair.** Two reserved grounds on one page is a rhythm, not an exception. Keep at most one: blue for the product's own ask. Strip two goes to paper or tint. |
| `future-interfaces-lab/join` :178, :267, :342 | ink, blue, ink | **Fails.** Three reserved bands make a stripe pattern, the exact "rhythm device" C1 bans. Keep one at most, blue on the ask (:267). The other two go to paper or tint. |

**Alternating tint and paper** (`services` :106, `future-interfaces-lab` :105, `sectionSurfaces()` on
`services/[...slug]`). This uses the change of ground *as* the rhythm. It is legal by ch02's adjacency table, but it is
the thing the design-quality rule warns against: "Vary the arrangement between blocks rather than the ground
behind them." **Refine in the templates (Phase 3), not in a component.** Tint is argued per block (a proof
band, for instance), and paper is the default.

**Footer.** ch02 v1.0 keeps it: "closes on paper or tint before the ink footer". The ink footer is the one standing reserved band. **Keep.**

**ch02 v1.0 also settles alternation:** tint is "earned by content, never alternated for rhythm", and "never two tint bands adjacent". The alternating routes below break the letter of that rule, not just its spirit.

**Ruled 28 Sep:** the owner accepts the ink/blue calls in the table above. Ink and blue are used in very specific cases only.

---

## 3 · The units

Verdict key: **keep** · **extend** (new variants or props, same contract) · **rebuild** (the contract changes).

### Tier 1 — components

**Section** · *jobs:* every band on every page. *Today:* 4 surfaces, `density` tight/open, `flush`, used 56×.
`open` and `flush` have 0 route uses. *Brand fit:* the surface model is right; ink/blue scarcity is a *route*
problem (§2), not a component one. **Keep.**

**Layout** · *jobs:* every columnar arrangement. *Today:* tracks, `fit`/`tile`, per-breakpoint, `equalRows`,
used 223×. *Missing:* nothing the audit needs. Asymmetric and offset compositions are expressible as
`[2,1]`/`[3,2]` and nesting. **Keep.**

**Cluster** · *jobs:* chips, actions, metadata, **and the logo strip**. *Today:* 4-step gap cap, align/justify,
`nowrap`. There is no token layer, which is correct (it has no colour). **Keep.**

**Button** · *jobs:* every action. CU21 is a copy gate, not a component one. **Keep.**

**Icon** · *jobs:* movement, controls, status. *Today:* 17 glyphs; 4 sizes (sm/md/lg/xl). *Brand fit:*
ch04 fixes seven sizes (14/16/18/24/32/48/64) and names glyphs the set lacks (`square-arrow-right-up`
"leaves the site", `info-circle`, `danger-triangle`, `letter`, `phone`, `calendar`, `magnifer`). ListCard
`external` has no "leaves the site" glyph to use. The six service glyphs have 0 route uses. They are
illustration-sized shapes at icon scale, and ch04 says "anything above 64px, or more than one element, is illustration".
**Extend:** add the ch04 glyphs the site needs now (`square-arrow-right-up`, `info-circle`,
`danger-triangle`), and check the size scale against ch04's seven. Review the six service glyphs against
ch04: if they cannot pass as single-element Solar Bold glyphs, retire them.

**Input** · *jobs:* every form field. **Keep.**

**Logo** · *jobs:* the Tcules mark only. It is not a client logo. **Keep.**

**Prose** · *jobs:* long-form bodies only (insights, case studies, events, podcasts, legal). *Today:* no
measure, by decision. **Keep.** Add a specimen route (§1). It must stay out of services, expertise, audits and tools.
Those are composed pages, and a Prose body there is a template defect for Phase 3 to remove.

**Tag** · *jobs:* labels, filters. The strongest specimen in the repo. **Keep.** Brief 20's Status cell is
stale (it says "paste"; Tag ships).

**Texture** · *jobs:* a decorative ground element, placed where it lifts a composition (owner ruling, 28 Sep).
*Today:* used nowhere yet. *Brand fit:* ch05 §5–6 bans treatments **on and behind images** (no wash, tint,
filter, gradient, decorative pattern behind text), so the boundary is the *image*, not decoration as such.
**Keep.** Its spec must record where it may sit so the next reader does not remove it: never under an image,
never under body text or a heading, never on ink or blue (reserved), at most one per page, and never as a
rhythm device between bands. A first placement belongs in the 1.2 comps.

### Tier 2 — patterns

**PageHero** · **Rebuild** (the contract gains arrangements and media kinds).
- *Jobs:* the page intro for every family (HO §3), with four variants: routing (services index,
  hubs), situation-led (service, audit, expertise), proof-led (case study) and article/definition (insight,
  glossary). CU04: H1 4–10 words, support 15–35.
- *Must offer:*
  - **Arrangements:** stacked (today), media beside the title (split, from lg), and media below as a full-column block.
  - **Media:** none, illustration, cut-out/capture (case-study banner 16:9 per §9a) and photograph (about and careers, "a photograph as a block beside or below the h1", addendum D).
  - The no-visual state is the most common one (97 of 129 routes) and must read as designed, not empty.
- *Today:* one stacked, left-aligned column. `media` is image (intrinsic) or YouTube (16:9) and always
  takes the hairline. 21 uses, all paper, media on 6.
- *Brand fit:* needs `kind`. **Media is never forced to a ratio** (owner ruling, 28 Sep; ch05 §9 "intrinsic,
  uncropped"): an illustration comes from a 1:1 canvas, a cut-out has no fixed ratio, and only the
  case-study banner is authored at 16:9. Each arrangement therefore sizes the media box by *width* (full
  column, or the side track) and lets height follow. A split arrangement aligns title and media to the top
  and accepts unequal heights, and a very tall asset is a supply problem (it fails the 326 check), not a crop.
  YouTube keeps its 16:9 box, because that is the embed's ratio, not an image's.
- *Why rebuild:* arrangement is a presentation prop, and adding it changes the layout skeleton, not just a
  token. B6 cannot be rewritten until this lands.

**Breadcrumbs** · *jobs:* hierarchy above the hero. *Today:* a thorough specimen. Every route passes
`surface="paper"`, so matching PageHero's ground is by convention. **Keep.** Consider taking surface
from the ancestor `data-surface`, as every other unit does (CLAUDE.md token rule 7), and drop the prop.

**ContentSection** · *jobs:* the section head for most semantic sections (Situation, Capability set,
Mechanism, FAQ, Related) — the one unit every Phase 3 section is likely to sit in. *Today:* a single head
stack (eyebrow, heading, lead) above children; 6 uses; the specimen is thin, with no long-title and no
empty rows. Brief 07 is still unpasted. **Extend.** Add a head arrangement: head beside body (`[1,2]` from lg),
as well as head above. That second arrangement is what breaks the "heading + paragraph + three cards"
geometry CU11/CU15 warn about, with no new component. Also bring the specimen up to the Tag or BlockCard
standard.

**BlockCard** · **Extend.**
- *Jobs:* capability items, situation items, case-study selection (with cover) and related content.
- *Today:* `orientation` and `imageSide` exist with zero route uses, so every card is the same vertical tile
  (VAP). Media is icon or image, cropped 3:2 / 4:3; the image has no intrinsic size.
- *Brand fit:*
  - v1.0 makes the media-less card the default everywhere except case studies. The case-study card carries the §9a cover with its concept inside the central 4:3.
  - `media.kind: 'icon'` sits badly with ch04 ("glyphs in coloured discs" is a don't; one icon per tile, in ink). Check what it renders. If it is a disc, remove it.
  - Illustrations on cards are authored at the card's ratio (B4).
- *Extend with:*
  - a **featured** arrangement: one horizontal card spanning the row above a set of vertical ones. This is the HO "featured flag" on case selection, a *semantic* variant that is allowed in Strapi.
  - the image slot moves onto `Media` (with `kind`, derived widths and intrinsic size).
  - a designed no-media state, e.g. an index numeral or the eyebrow carrying weight, so a media-less set is not a row of grey boxes.

**ListCard** · *jobs:* dense sets, such as mechanism steps (numbered), terms, linked lists, related content
(thumbnail) and a numbered FAQ index. *Today:* split/stacked; markers are number (8 uses), thumbnail (1)
and icon (0). *Brand fit:* the thumbnail is 160, 3:2, one cut-out part or one illustration shape, and only on
case-study items under v1.0. `external` needs the ch04 "leaves the site" glyph (see Icon). **Extend:** move
the thumbnail onto `Media`. The **ordered** marker is the Mechanism's semantic variant ("ordered or
unordered steps", HO §3), so it maps to `ol` vs `ul` markup, not just to a numeral. Check that it does.

**Accordion** · *jobs:* FAQ (0–6 per page, collapses at 0), plus disclosure. *Today:* a strong specimen;
`questionAs` is never passed. The specimen covers zero items, but check that routes render nothing at 0 (acceptance check 5). **Keep.**

**Callout** · *jobs:* the inline note inside rich explanation (the CS registry "callout"). **Keep.**

**CtaSection** · **Extend + fix.**
- *Jobs:* CTA/Enquiry — the heading, support, action or form, **proof relation** and **what-happens-next** (HO §3).
- *Today:* the `split` / `open` / `offer` union. 15 uses: open 11, offer 4, **split 0**. `open` hard-codes
  `columns={{ base: 1, lg: [3, 2] }}` (`CtaSection.tsx:376`), so ten routes leave ~466px of dead ground
  with no proof (VAP's one live defect). `offer` on blue/ink accounts for 3 of the 11 reserved call sites.
- *Fix:* `open` collapses to one track when `proof` is absent, using the same idiom as `Proof.tsx:189`
  (`columns={both ? 'fit' : undefined}`). This one is free, and already listed in Phase 2.
- *Decide:* `split` (the form-bearing close) has no route use, so no page takes an enquiry in its closing
  band. That is a composition question for Phase 3, not a component defect: the service slice's Enquiry section
  is exactly `split`. **Keep the variant.**

**EnquiryForm** · *jobs:* Contact and the Enquiry section. *Today:* 3 variants; only `contact` is used, once.
`enquiry` and `audit` wait on `CtaSection split`. **Keep.** Phase 3 is where they get their first real use.

**Figure** · **Extend.**
- *Jobs:* Media/Artefact (proof, explanation, atmosphere). It is also the unit a logo strip and an artefact
  gallery compose from.
- *Today:* the intrinsic image, a required caption and the `note` ("what it does not establish", ch05 §7).
  Caption-only is first-class. Rule, radius and shadow are always on.
- *Brand fit:* it fails for cut-outs and illustrations (§2). Also note ch05 §6 "radius-0 on every image":
  the always-on radius needs checking against `--radius-0`.
- *Extend with:*
  - `kind`, through `Media`.
  - (logos are *not* a Figure mode; see the client-mark row in §4.)
  - video, diagram and annotated artefact (HO §5 item 4). Annotation rings are ch05 §2 tokens (`--annot-ring`, `--annot-stroke`), and v1.0 allows them.

**Proof** · **Extend.**
- *Jobs:* proof cluster (the claim-adjacent quote plus figures), testimonial and stat group.
- *Today:* `compact` (quote) and `display` (quote and/or figures). All 7 uses are compact with a quote;
  figures and `display` are never used. The quote is `{quoteHtml, name, role, company}`.
- *Brand fit:* ch10 pattern 07, the site's blockquote: Newsreader italic behind a 6px brandeis-500 rule, the
  attribution beneath, and an optional portrait. v1.0: **portraits are 1:1**.
- *Extend with:*
  - a **portrait** (1:1, through `Media`) and a **client mark** (VAP). Both are a field and a component change.
  - `role` made optional. HO: "role opt"; CS: named attribution is mandatory, role is not.
- *Also:* the HO requires "quote text/attribution stay in entity, not page", but today the quote arrives
  as page fields. That is a view-model change (Phase 5.1), not a component one: the prop shape can stay.

**SiteNav** · *jobs:* global navigation. *Today:* no stress rows in its specimen. *Brand fit:* the rail card
keeps radius 4 as the one named exception (v1.0), and its own 16:7 asset. **Keep.** Stress rows are
deferred with the nav/IA rework (the rulings defer the nav card's crop to it).

**SiteFooter** · *jobs:* global footer. *Today:* the four-surface specimen only, no stress rows. **Keep.**
Its ink ground is confirmed by ch02 v1.0.

**TableOfContents** · *jobs:* the long-form outline rail. **Keep.**

---

## 4 · Jobs nothing serves yet

The test for each one (memory: *a job is not a component*): does composing existing pieces serve it? A new
component is proposed only if the job needs its own **markup or semantics**, its own **behaviour**, or an
**arrangement the primitives can't express**.

| Job (HO §3) | Composition | New unit? |
|---|---|---|
| **Client logos** | ch05 §10 rules it out as a Figure: a mark is "never… in a box or tile of its own", takes no caption, is **one colour, the ground's ink** (neutral-900 on paper and tint, white on ink), and is sized to **equal visual weight** (matched bounding-box area, capped in height and width, ±15% recorded correction). An `<img>` cannot recolour an SVG to the ground's ink, and no primitive can size by area. | **Yes, a tier-1 primitive, `ClientMark`**: the SVG drawn as a mask filled with `currentColor` (so every surface's ink applies with no per-surface asset), and a width computed from the intrinsic ratio and a target area (`width = √(area × ratio)`), capped. The *strip* is still not a component: `ClientMark` × n in a `Cluster`, which owns the gap (§10 says so outright). It qualifies on behaviour. |
| **Testimonial group** | `Proof compact` × n in a `Layout` (`fit` for 2–3, `[2,1]` for a lead quote plus two). | **No.** |
| **Case study selection** | `BlockCard` with the cover × n in a `Layout`. The featured flag is the BlockCard featured arrangement (§3). | **No**, given the BlockCard extension. |
| **Stat group** | `Proof display` with figures only. It exists and is unused. | **No.** |
| **Mechanism / process** | `ContentSection` + `ListCard` numbered in an `ol`, or `BlockCard` horizontal for steps with an artefact. | **No**, provided ListCard's ordered marker is a real `ol` (§3). |
| **Situation / problem set** | `ContentSection` + `BlockCard` media-less (2–6 items) or `ListCard`. | **No.** |
| **Capability set** | `ContentSection` (head beside body) + `ListCard` linked, or `BlockCard`. | **No.** |
| **Related content** | `ContentSection` + `ListCard` linked (with thumbnail on case items only). | **No.** |
| **Rich explanation** | `ContentSection` + `Prose` / `Callout` / `Figure`. | **No.** |
| **Artefact gallery** | `Figure` × n in a `Layout` (`tile`), captions per figure. | **No.** |
| **Comparison** | Options × dimensions, with a caveat or source. This is **tabular data**: its semantics are `<table>` with header cells and scoped rows, which no card can express honestly, and at 390 it needs its own behaviour (stack by option, or scroll with a sticky first column). | **Yes: DataTable** (brief 10, already in Phase 2). This is the one case that qualifies, on markup and behaviour. |
| **Photographic section opener** | Withdrawn (addendum D). About and careers use PageHero with photograph media. | **No**, and it is removed from VAP's list. |
| **Team / studio module** | Parked with About and Careers. | — |

**Net: one new pattern (DataTable) and two new primitives (Media, ClientMark).** Everything else composes.

---

## 5 · What Phase 2 gets (input to 1.3)

In dependency order. Each is one PR: spec → `/build-from-spec` → specimen with stress rows → `/audit-component`.

1. **Foundations:** heading `text-wrap` on every title role, plus typography stress rows · the ratio ladder ·
   a `326` track in `_specimen`.
2. **Media** (new, tier 1): the responsive slot, `kind`, derived widths, cover/contain. Everything below with an image depends on it.
3. **Figure:** onto Media; `kind`; radius-0 check.
3b. **ClientMark** (new, tier 1): mask-drawn in the ground's ink, sized by area. The logo strip is then a template composition.
4. **PageHero:** rebuild with arrangements × media kinds, media at intrinsic ratio. It unblocks the B6 rewrite (tracker 6.4).
5. **CtaSection:** the `open` collapse without proof. Free, and can go first in parallel.
6. **BlockCard:** onto Media; featured arrangement; the no-media state designed; the icon media reviewed.
7. **ListCard:** onto Media; the ordered marker as `ol`; the external glyph.
8. **Proof:** portrait (1:1) and client mark; optional role.
9. **ContentSection:** head beside body; a specimen brought up to standard.
10. **Icon:** the ch04 glyphs and size check; review the service glyphs.
11. **DataTable** (brief 10): the comparison job.
12. **Texture:** write its spec (job: decorative ground; the placement limits in §3), and place it first in a 1.2 comp.

**Route and template items** (Phase 3, not components): cut ink/blue to one argued band per page (§2); stop
alternating tint and paper as rhythm; remove `card.surface` from the about CMS data; take Prose out of the
composed families.

**Log now** on the running lists:
- `strapi-changes.md`:
  - about card `surface` is presentation in the CMS.
  - media `kind` is a content field on every media asset (VAP: "nothing records whether an asset is a capture, a photograph or a drawing").
  - Testimonial `role` is optional.

## 6 · Rulings (28 September 2026)

1. **Texture:** kept, as a decorative element where it lifts a page. Its limits are in §3.
2. **Ink and blue:** the §2 calls stand. Used in very specific cases only.
3. **Hero media ratio:** not always 16:9. Illustrations are made on a 1:1 canvas, and cut-outs have no fixed ratio. PageHero shows media at its intrinsic ratio (§3).
4. **Brand framework:** re-pulled at v1.0. The ⚑ items are closed: client logos give ClientMark (§4), and the ink footer stays (§2).
