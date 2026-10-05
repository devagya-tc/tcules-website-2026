# Strapi changes — recommendations for the CMS owner

Added to as the frontend work finds them (tracker 0.5). These are recommendations. We don't do the
Strapi work: each entry says what the frontend needs and why, and leaves the schema to the CMS owner.

Each entry: **what** · **why** · **found in** (task or component).

---

## 1. Components mirror Strapi one-to-one on content, never on layout

**What.** Each semantic section in Strapi (Situation, Capability set, Mechanism, Proof, FAQ, Related,
Enquiry) should have exactly the fields of the frontend component's **content props**, with the
same names and the same shapes: heading, lead, items, the proof relations. Editors pick a component,
fill in its fields, and it renders. No translation layer in between.

**Presentation props stay in code and never become Strapi fields.** That covers arrangement,
`imageSide`, orientation, density, surface and column counts. Where content meaning changes the
rendering (ordered vs unordered, featured vs standard, proof type), a semantic variant field is fine.

**Why.** Mirroring content removes the mapping layer, so a Strapi remodel no longer means changing
code. Keeping presentation out follows the handoff's boundary rule ("do not store layout
instructions in Strapi") and lets the design change without a CMS migration. The test for any field
is: *does it change what the section says, or only how it looks?* Only the first goes in Strapi.

**Found in.** 24 Sep call; tracker 3.1.

## 2. Card ground is not a content field

**What.** Remove the `surface` value the about page's closing cards carry (`about/page.tsx:349`,
`surface={card.surface}`). The ground a card sits on is decided in code.

**Why.** Surface is presentation (entry 1). It also lets an editor paint `ink` or `blue` anywhere, and
those are reserved grounds, argued once per page (brand addendum D).

**Found in.** Tracker 1.1, `docs/component-audit.md` §2.

## 3. Every media asset records its kind

**What.** A required `kind` on media metadata: `capture` · `cut-out` · `illustration` · `photograph`.

**Why.** The kind changes what the image *is*, so it passes the entry-1 test. It decides how the site
treats the image: a capture takes a hairline, a cut-out takes no edge and may take a contrast panel, and an
illustration is never boxed (ch05 v1.0). Today nothing records it (visual-assets-plan), so every image gets
the screenshot treatment.

**Found in.** Tracker 1.1, `docs/component-audit.md` §2.

## 4. Testimonial role is optional

**What.** Testimonial `role` is optional; named attribution is not.

**Why.** The handoff lists role as optional (§4), and the content system requires a name, not a title.
`Proof` currently requires `role`.

**Found in.** Tracker 1.1, `docs/component-audit.md` §3 Proof.

## 5. Case studies carry a cover, a banner and the inputs that choose them

**What.** Two media fields on the case-study record, `cover` (3:2) and `banner` (16:9). Also the fields
ch05 §9a chooses them from: engagement activity, product domain, industry, primary use, whether UI is
available and cleared, and "what changed" (one noun phrase).

**Why.** Every project has one cover (used on every card) and one banner (the PageHero on its own page). The
brand decides which kind each is, a product-UI cut-out or a registry illustration, from those inputs, so the
choice can be made and checked without taste. Without the fields it is made ad hoc per page.

**Found in.** `docs/visual-assets-plan.md` (28 Sep revision), ch05 v1.0 §9a.

## 6. Upload breakpoints match the site's widths, and serve WebP

**What.** Set the Strapi upload plugin's responsive breakpoints to **1240, 652 and 320**. The original is the
2560 master and is served as the largest size. Enable WebP output for generated formats. Cut-outs keep alpha.

**Why.** The site serves images from Strapi's own formats as a native `srcset` (Phase 2 ruling M1). Strapi's
default breakpoints (1000/750/500/64) match no width the site renders at, so the browser would download the
wrong size at every placement. ch05 §8–9 require WebP and set these widths.

**Found in.** `docs/phase-2-decisions.md` M1–M2; tracker 2.6.

## 7. A contrast-panel field on media, beside kind

**What.** An optional `panel` on media metadata, one of `paper`, `paper-deep` or `ink`, used only when `kind` is
`cut-out`.

**Why.** A cut-out whose UI edge fails 3:1 against the page sits on a flat panel (ch05 B5). Whether it fails
can't be detected reliably in code, so whoever supplies the asset records it (Phase 2 ruling M4).

**Found in.** `docs/phase-2-decisions.md` M4; tracker 2.6.

## 8. Insights and resources carry a cover image

**What.** A cover image field on articles, videos and podcasts (reuse `featureImage` where it exists), used on
their cards.

**Why.** Owner ruling C1 (28 Sep): any insight or resource with a cover image shows it on its card.

**Found in.** `docs/phase-2-decisions.md` C1; tracker 2.10.

## 9. A crop-shadow flag on media, beside kind and panel

**What.** An optional boolean `shadow` on media metadata, used only when `kind` is `cut-out`. Default off.

**Why.** A cut-out *may* carry one shadow (ch05 §2, B2). Whether it does is a property of the asset as
supplied, like the panel, so it is recorded with the asset rather than chosen per page. The site reads it
through the `Media` primitive, which ignores it on every other kind.

**Found in.** tracker 2.6 (`docs/specs/Media.md` §3).

## 10. Table columns carry a semantic kind, and the row header is stored once

**What.** Two changes to the shared table component (`ComponentAuditTable`, `ComponentServiceTable`,
`ComponentExpertiseTable`, `ComponentToolTable`, `ComponentGlossaryTable`):

- An optional **`kind` on each column: `text` (default) · `numeric` · `identifier`.** It says what the
  column holds, which is content meaning, not layout (§ 1's test): a numeric column end-aligns with
  tabular figures, an identifier column never wraps. The frontend maps it to `DataTable`'s column
  behaviour; until it exists every live table renders the defaults, and code does not guess from the
  cell text.
- **Store the row header once.** Every one of the 39 published tables sends the row header as the
  first cell, and 46 rows also fill `rowHeading` — 42 as a duplicate, 4 with a different string the
  page never shows. Drop `rowHeading`, or make it the only home and stop authoring the first cell.

Also a content trim, not a schema change: `product-modernisation-assessment` sends six data columns,
one past DataTable's designed five. It renders and scrolls, but reads as a matrix, not a comparison.

**Why.** The seam now passes the table through as structure (`ContentTable`) instead of a flattened
string, so these fields can reach the page. A duplicated field is two sources of truth, and the
four rows where they already disagree prove it.

**Found in.** `docs/specs/DataTable.md` § 17 Q6–Q7; tracker 2.15.

## 11. Testimonials carry an optional portrait and an optional client mark

**What.** Two optional relations on the testimonial record: `portrait` (a media asset, shot square per
ch05 §3, no alt needed — the site renders it as decorative beside the name) and `clientMark` (the
client's SVG, with its intrinsic width and height and the ±15% weight `correction` ch05 §10 records
with the asset). The mark belongs on the **client** entity rather than on each testimonial if clients
become an entity (one mark, many quotes); until then it rides the testimonial.

**Why.** Both are facts about the testimonial — who said it and for whom — so they pass the entry-1
test. `Proof` renders them (rulings P1, P2); without the fields there is nothing to render.

**Found in.** tracker 2.12 (`docs/specs/Proof.md` §3, Amendment · 28 Sep 2026).

## 12. The contact cards' icon field is no longer rendered

**What.** The contact page's `card.icon` and `action.icon` uploads can be retired (or left empty). The site
stopped rendering them in 2.11. No replacement field is needed: the card's heading names the channel.

**Why.** They are small line-icon PNGs (69–96px), which ListCard rendered as 160px 3:2 cover thumbnails,
upscaled and cropped. A ListCard thumbnail is for case-study and insight/resource rows only (ruling C1,
ch05 §9), and a glyph that is not Solar Bold is not a legal icon either (ch04). If the owner later wants a
glyph per channel, it is `letter` / `phone` / `calendar` chosen in code from ch04's fixed set, not an upload.

**Found in.** tracker 2.11 (`docs/specs/ListCard.md` §17).

## 13. Case studies carry a `client` field, and the listing description is one line

**What.** Two changes to the case-study content type:

- **A `client` field** (short text, required for new entries; about 40 characters max). The client's
  name as it should be read — `ConnectX`, `Benchmark Gensuite`, `The Chain Hut` — and nothing else. It
  is a fact about the work, not presentation, so it passes entry 1's test. If clients later become an
  entity (entry 11 notes the client mark wants one home), this becomes a relation to it; the site reads
  a name either way.
- **`description` limited to 8–15 words**, enforced as a field limit (Strapi's max length on a short
  text, about 110 characters, plus the word range in the field's help text). It is the one line under
  the title on the case-study card.

Once the field exists, the listing query adds `client` (`src/content/sources/strapi/case-study-query.ts`);
the type and the mapper already read it, so that is a one-line change.

**Why.** On the case-study index the client is the first thing a visitor scans for, and today it only
appears when an editor happened to put it at the front of the title ("ConnectX: …", "Benchmark Gensuite:
…"), so half the cards name their client and half do not. With its own field the card shows it as its
first line on every card, and titles can stop carrying it. The description today is either a 15–17-word
restatement of the title or a 40-word paragraph; a card has room for one line, and a limit is a rule
the content team can apply without a judgement about each entry.

**Found in.** BlockCard revision, 29 Sep 2026 (`docs/specs/BlockCard.md` § Revision 3). Content side:
`docs/content-changes.md` §2.

## 14. The case-study listing hero: name and message, no action

**What.** On the case-study listing's hero, `heading` is now rendered as the eyebrow and `description`
as the h1, and the hero `action` is no longer rendered. Recommended: rename the two fields for what they
now are (`name` — what the page is called; `message` — the line it argues, 2–10 words, CU04's H1 range)
and retire the hero action on this content type, or leave it empty.

**Why.** The page's point is the line under "Selected case studies", not the label, so the line gets
the h1 and the label becomes the eyebrow. A button in the hero asks the visitor to leave before they
have read a case study, which is this page's one job. The close (the `misc` CTA) still carries the ask.

**Found in.** `CaseStudyIndex` template, 29 Sep 2026 (`docs/specs/BlockCard.md` § Revision 3).

## 15. Service sections say what job each block does

**What.** Replace the service page's generic block union (`rich-text`, `card-grid`, `table`, `quote`,
`labelled-list`, `two-column`, `link-group`) with components named for the job the block does. The set
is `src/lib/service-story.ts`: `signals`, `steps`, `ledger`, `router`, `cases`, `proof`, `fit`,
`spectrum`, `representations`, `record`, `contrast`, `parts`, `slice`, `bridge`, `thread`, `nudge`,
`faq`, `note`, `resources` (revised 30 Sep: `statement` and `links` dropped, `resources` added). Each maps to one Strapi component
whose fields are the type's fields. Two field-level asks come with it:
- `cases` reference case-study records by relation, not by typed slug, so a renamed slug cannot break
  the link.
- `resources` reference their target records (article, glossary term, tool) by relation, so the
  type label and path come from the record rather than being typed.

**Why.** The translation layer has to *guess* what a block is for. It guesses wrong in five recurring
ways (`docs/service-pages-design.md` §1): an unattributed quote used as a pull-line, an eyebrow as the
first line of rich text, a CTA as a paragraph, a closing paragraph inside a card, and a duplicated row
header (§10). A block that names its job removes the guess. Ordering, too, becomes content: a
`spectrum` is ordered by its authors on purpose.

**Found in.** Service pages designed from content, 29 Sep 2026 (`/design/service-page`).

## 16. Records carry a short `name` beside their headline

**What.** A `name` field (short text, required, about 40 characters max) on the service, expertise and case-study content types: what the page is *called* ("Product Design", "HealthTech", "ConnectX"), as distinct from its `title`, which is the line the page argues. For case studies this is the `client` field (§ 13); it need not be a second field. Once it exists, each source maps it onto the view model (`ServicePage`, `ExpertisePage`, `CaseStudyPage`) and the route passes it as the trail's last crumb.

**Why.** The trail sits 32px above the h1 (kit `fdn-top`), and its last crumb names the page only when the h1 does not. Today these records have only a title, so their trails stop at the parent ("Home / Services") rather than repeating the headline. With a name the trail can say where you are *and* what the page is called, as the six designed service pages already do from `story.name`. The hero eyebrow on services and expertise ("Product Design services", "Product Design specialist") is doing this job today without being meant for it.

**Found in.** Kit `fdn-top` review round, 5 Oct 2026. Content side: `docs/content-changes.md` § 5.
