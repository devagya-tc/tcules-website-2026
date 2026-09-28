# Visual treatment by page type

**Status:** plan · agreed as a starting point 16 September 2026 · **revised 28 September 2026** against the
brand framework at v1.0 (`docs/brand/`, ch05 Imagery) and the component audit (`docs/component-audit.md`).
**Scope:** the website and its visuals: which page type takes which kind of image, what that costs in
assets, and what it asks of components and fields. The rules for making and placing an image are ch05's;
this file does not restate them, it points at them.

**What the 28 Sep revision changed:**
- Client work is a **cut-out** at every size, not a flat capture (ch05 §2a, §12 02).
- Every project gets a **cover and a banner** (§9a), and a case study's banner may be an illustration.
- The **photographic opener is withdrawn** (addendum B1, D).
- **Non-case-study cards carry no media** (§9, §12 05). The field asks below were cut to match.
- "Drawing" is now **"illustration"** throughout.

---

## What this decides

**Which visual treatment each page type takes, and which take none**, then what that costs in
assets, components and fields.

Two framings matter:
- **The Strapi model is not a constraint.** Design what the page should be, and report the field additions
  as consequences for someone else to action (`docs/strapi-changes.md`).
- **The without-visual state is a first-class design**, not a gap. Around sixty URLs carry no image at all,
  so that state has to look deliberate rather than unfinished.

---

## The mapping

"Leads" is ch05 §1's term: where two categories are named, the first leads.

| Page type | URLs | Hero | Body | Why |
|---|---|---|---|---|
| Service line (L2) | 6 | **Illustration** | Illustration, then client work | A method with no screen (§1). The six highest-leverage assets on the site |
| How we work | 1 | **Illustration** | Illustration | A process: the clearest case |
| Audits | 6 | **Illustration**, one per audit type | Findings and deliverable artefacts where they exist | The audit is the concept; its evidence is what it produces |
| Article / insight | ~13 | **Illustration** | Byline portrait, 1:1 (§3, §12 11) | `BlogAuthor.image` exists and is mapped; the route ignores it |
| Case study | ~15 | **Banner**, 16:9: a product-UI cut-out or an illustration, chosen by §9a | **Cut-outs**, captioned. Never an illustration as evidence (§4) | The work is the subject. The banner conveys the concept, and the body proves it |
| Matter · Future Interfaces Lab | 3 | **Cut-out** | Cut-outs | They are products |
| Podcast · event | 7 | **Photography** + video | Guest portraits, 1:1; event frames | People and moments, photographed (§3) |
| About · careers | 2 | **Photograph as a block** beside or below the h1, never behind it | Team and studio photography | The opener pattern is withdrawn: no image carries type (§6a) |
| Service child (L3) | ~26 | **None**, or a cut-out where a client example exists | — | Inherits the line's argument; 26 near-duplicate illustrations would be decoration |
| Glossary | ~19 | **None** | — | Reference, read fast. The weakest spend on the list |
| Expertise | 12 | **None**, leaning on case-study proof | Case-study cards with covers | Domains, not methods |
| Legal | 2 | **None** | — | Correct as it stands |

**Card imagery follows one rule (§9):** a case-study card carries the project's cover (3:2, concept inside
the central 4:3), and every other card carries no media. So a services index, an audit list or a glossary
index is a text-card listing *by design*.

**Totals:**
- **~26 illustrations:** 6 service lines, 1 how-we-work, 6 audits, ~13 articles.
- **~15 case-study cover + banner pairs:** a cut-out or an illustration each, per §9a.
- **~15 cut-out sets:** the case-study bodies.
- **One shoot.**
- **~60 URLs with no image, by design.**

An illustration is an SVG built on a 1:1 source canvas (§4a). It is placed at its intrinsic ratio in a hero or
figure, recomposed for a card's crop, and exported once per ground it sits on (paper and paper-deep for a cover).

### Three calls worth challenging

- **Tools (~8):** the treatment depends on whether a tool has a real screen. If it does, a cut-out of it; if not,
  none. Unresolved: nobody has said what they are.
- **Expertise (12):** proposed none, and it is the family most likely to feel thin. Its answer is case-study
  cards with covers, not a hero image.
- **Glossary (~19):** proposed none. The alternative, a small shared illustration set across related terms,
  would have to pass ch05 §4's read-back test per term, which a shared set is unlikely to.

---

## What gets comped (tracker 1.2)

Five contexts, covering every treatment above, each built in the state it ships in:

1. **Glossary term.** No visual. It represents ~60 URLs, and it is built **first**: everything else has to be
   an upgrade on something already good.
2. **Service line: Design Systems.** Illustration hero. Represents the six lines.
3. **Long-form article.** Illustration hero plus a 1:1 byline portrait.
4. **Case study.** Banner, cut-out figure set, related case-study cards with covers.
5. **About.** Photograph as a block beside or below the h1.

---

## The levers

**No treatment on or behind an image:** no wash, tint, duotone, filter, gradient, bleed, stock, or pattern
behind text (ch05 §5–6). What is left is scale, position, ground and illustration, which is also what
`CLAUDE.md` § Design quality says.

**Texture** is available as a decorative ground element where it lifts a composition. It is never under an
image or text, and never on a reserved ground (audit §3).

Three levers cost nothing today:
- **`BlockCard.orientation` and `imageSide`:** zero usages across 18 routes. Every card on the site is the
  same vertical tile. With most cards now media-less, the case-study card is where these apply, and a
  featured horizontal card is the one arrangement that breaks the grid (audit §3).
- **`ListCard.arrangement` and marker kind:** a numbered list and a thumbnail list read as different objects.
- **`Layout` tracks and nesting:** listing pages are uniform grids.

**Absent slots already collapse cleanly.**
- `PageHero`: *"97 of 129 routes will not fill this, and a hero that left room for it would be a hero with a
  hole in it."*
- `Figure` settles caption-with-no-image from 21 real corpus cases.

The components handle the without-state, but the **page** in that state has never been designed.

**One live exception.** `CtaSection arrangement="open"` sets `columns={{ base: 1, lg: [3, 2] }}`
unconditionally (`CtaSection.tsx:376`).
- Eleven routes render it and one passes `proof`, so the other ten leave ~466px of dead ground at the closing
  band, across 100+ URLs.
- `Proof.tsx:189` has the fix idiom: `columns={both ? 'fit' : undefined}`.

**A picture is a record; a composed block is a node.** Every image slot is `{src, alt, width, height}` (plus
`kind`, below) owned by the pattern, because `@/content` is a `.ts` module and cannot hold JSX. Any new slot
follows whichever half it belongs to.

---

## Component and field work this implies

Components are sequenced in the audit's Phase 2 list (`docs/component-audit.md` §5). Fields go on
`docs/strapi-changes.md`.

| Need | Change |
|---|---|
| Hero media on service line, audit, how-we-work and tool (when it has a screen) | A hero media field on those types. They have none. Glossary and expertise stay without one |
| Case-study cover and banner | Two media fields on the case-study record, plus the §9a inputs (activity, domain, industry, use, UI available, what changed) so the kind can be chosen and checked |
| Byline portraits | **None**: the field exists and is mapped. The article route has to render it, at 1:1 |
| Podcast still hero | A `featureImage` on `PodcastPage`. A videoless podcast renders a bare hero |
| `Proof` portrait and client mark | A field *and* a component change (audit §3 Proof) |
| Kind of image in a slot | `kind: capture · cut-out · illustration · photograph` on every media asset. A capture takes the hairline; a cut-out takes no edge and may take a contrast panel; an illustration is never boxed. This lives in the `Media` primitive (audit §1) |
| Client logos | A `ClientMark` primitive, drawn in the ground's ink and sized by visual weight (ch05 §10, audit §4). A logo strip is `ClientMark`s in a `Cluster` |
| Responsive delivery | Derived widths and weight ceilings per placement, WebP with alpha, resized from one master (ch05 §8–9) |
| Illustration message line | The one-sentence message filed with each illustration (§4) is a field on the asset, so read-back can be checked |

---

## Sequence

1. **Comp the five contexts**, no-visual first (tracker 1.2).
2. **Define the illustration concepts:** each asset's message line, archetype and brief (§4, §4d, §9a), and an
   inventory of the client work already cleared for use (tracker 1.4). Then make the six service-line
   illustrations first: highest leverage, and the family illustration leads on.
3. **Fix `CtaSection`**, and put `BlockCard.orientation` to use on case-study cards. Both are free, and both
   can be done today.
4. **Cut out client work** for the case-study bodies and the product-UI covers. **Schedule the shoot** for
   about, careers and bylines.
5. **Share-preview generator:** ~125 URLs currently unfurl as a small card or nothing. It is parked in the
   tracker, and ch10 Part C owns it.

Items 1–3 need no new assets. Items 4–5 do.
