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
