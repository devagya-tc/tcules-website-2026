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

## 10. The contact cards' icon field is no longer rendered

**What.** The contact page's `card.icon` and `action.icon` uploads can be retired (or left empty). The site
stopped rendering them in 2.11. No replacement field is needed: the card's heading names the channel.

**Why.** They are small line-icon PNGs (69–96px), which ListCard rendered as 160px 3:2 cover thumbnails,
upscaled and cropped. A ListCard thumbnail is for case-study and insight/resource rows only (ruling C1,
ch05 §9), and a glyph that is not Solar Bold is not a legal icon either (ch04). If the owner later wants a
glyph per channel, it is `letter` / `phone` / `calendar` chosen in code from ch04's fixed set, not an upload.

**Found in.** tracker 2.11 (`docs/specs/ListCard.md` §17).
