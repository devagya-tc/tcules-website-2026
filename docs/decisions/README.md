# Decision log

**Every ruling the owner makes about this site, one file each.** A ruling is any answer that closes a
question: a design call, a brand rule, a component contract, a process change. It is logged in the same
PR as the change that applies it, the way `docs/TRACKER.md` is ticked. A ruling that exists only in a
chat, a review note or an agent's memory will be broken by the next session that never saw it.

Before you design, build or review anything, read the entries for its area below. **A logged ruling is
not reopened by a spec, a critic or a reference.** If it is wrong, the owner overturns it with a new
entry that names it in `supersedes`, and the old one is kept, marked `superseded`, so the reversal and
its reason stay readable.

## How an entry is made

`/decide` writes one. By hand: copy `_template.md` to `YYYY-MM-DD-short-slug.md`. The filename is the
id, so parallel worktrees never collide on a number.

| Field | Values |
|---|---|
| `status` | `active` · `superseded`. Superseded only when a later entry lists it in `supersedes` |
| `area` | one or more of the areas in the index below |
| `source` | where it was ruled: a review, a PR, a spec's open question, a chat with its date |
| `dbf` | the Digital Branding Framework sections the ruling changes, e.g. `[ch03 §4, ch05 §9]`. Empty when it changes none |
| `dbf_status` | `pending` (the chapter does not say it yet) · `applied` (it does) · `none` (no `dbf`) |
| `enforced_by` | the check that catches a breach (`tokens:check`, `lint`, a fixture), or `review` when only an eye can |
| `legacy` | optional: the id the ruling had before this log, e.g. `phase-2 M2` |

Body: the ruling, then **Why**, **The mistake it prevents**, **How to apply**.

## Keeping the brand framework current

A ruling that changes a chapter of `docs/brand/` is logged `dbf_status: pending` and appears in the
backlog below. `/dbf-update <chapter>` applies a chapter's whole backlog in one edit, bumps its version
in the chapter and in `docs/brand/README.md`, and flips those entries to `applied`. The owner then runs
`/ds-publish` to carry the chapter to the Design System artifact. `npm run decisions -- --check` (part of
`npm run verify`) warns while a backlog is open but never fails on one: batching is the point.

`npm run decisions` regenerates everything below the line. Do not edit it by hand: `--check` fails on a
stale index.

<!-- decisions:generated -->

202 active rulings, 21 superseded. Newest first within each area; a ruling in several areas is listed under each.

## Brand framework backlog

**02 Colour** — `/dbf-update 02`

- ch02 §8 · [No blue bands for now](2026-10-05-no-blue-bands.md) (2026-10-05)
- ch02 §4 · [On the website, peridot is ::selection only](2026-10-05-peridot-on-site-is-selection-only.md) (2026-10-05)
- ch02 §8 · [More blue in the foreground; never a blue surface](2026-10-06-more-blue-in-the-foreground.md) (2026-10-06)
- ch02 §7 · [Blue solid is for the one main action](2026-10-07-blue-solid-is-the-one-main-action.md) (2026-10-07)
- ch02 §7 · [Quote marks take the text's ink](2026-10-11-no-coloured-punctuation.md) (2026-10-11)

**03 Typography** — `/dbf-update 03`

- ch03 §6 · [Statement carries no italic emphasis](2026-10-09-statement-no-italic-emphasis.md) (2026-10-09)
- ch03 §5 · [Display type is for heroes only](2026-10-11-display-type-hero-only.md) (2026-10-11)
- ch03 §5 · [Item titles sit two type steps under their section heading](2026-10-11-item-titles-two-steps-under-heading.md) (2026-10-11)
- ch03 §6 · [Quoted claims at list sizes are set upright](2026-10-11-upright-type-for-quoted-lists.md) (2026-10-11)
- ch03 §2 · [The serif is for titles only](2026-10-15-serif-for-titles-only.md) (2026-10-15)
- ch03 §2 · [Body type never above 16px](2026-10-19-body-type-ceiling.md) (2026-10-19)
- ch03 §2 · [Only display and h1–h3 are serif](2026-10-19-only-display-h1-h3-serif.md) (2026-10-19)
- ch03 §6 · [Card titles are sans, except the horizontal card](2026-10-22-card-titles-sans-except-horizontal.md) (2026-10-22)
- ch03 §2 · [An FAQ question is 20px, on a standard h5-lg step](2026-10-22-faq-question-is-h5-lg-20.md) (2026-10-22)
- ch03 §2 · [Testimonials are italic everywhere](2026-10-22-testimonials-italic-everywhere.md) (2026-10-22)

**04 Iconography** — `/dbf-update 04`

- ch04 §2, ch04 §3 · [Chrome controls use universal marks; Solar Bold is for content](2026-10-01-chrome-icons-are-conventional.md) (2026-10-01)
- ch04 §5 · [More blue in the foreground; never a blue surface](2026-10-06-more-blue-in-the-foreground.md) (2026-10-06)
- ch04 §7 · [Arrows mean clickable](2026-10-11-arrows-mean-clickable.md) (2026-10-11)

**05 Imagery** — `/dbf-update 05`

- ch05 §4a · [Illustration connectors anchor exactly](2026-09-28-illustration-anchoring-exact.md) (2026-09-28)
- ch05 §4a · [Illustrations stay between 0.75 and 1.35 wide](2026-09-28-illustration-aspect-limit.md) (2026-09-28)
- ch05 §4d · [An illustration's concept comes from its page's argument](2026-09-28-illustration-concept-from-page-argument.md) (2026-09-28)
- ch05 §4c · [The ch05 example illustrations are not page assets](2026-09-28-illustration-examples-not-assets.md) (2026-09-28)
- ch05 §4b · [In an illustration, things carry up](2026-09-28-illustration-layers-carry-up.md) (2026-09-28)
- ch05 §4a · [Illustrations face left and sequences read left to right](2026-09-28-illustrations-face-left-read-left-to-right.md) (2026-09-28)
- ch05 §2, ch05 §9 · [A card's crop box draws one hairline around its image, whatever the image's kind](2026-09-29-card-crop-box-rules-every-kind.md) (2026-09-29)
- ch05 §6, ch05 §9, ch05 §12 · [A BlockCard image's crop box takes an 8px radius](2026-09-29-card-image-radius-8.md) (2026-09-29)
- ch05 §9, ch05 §12 · [Any card may carry an image](2026-10-05-any-card-may-carry-an-image.md) (2026-10-05)
- ch05 §5 · [IRL photographs share one tone layer](2026-10-07-irl-photos-share-one-tone-layer.md) (2026-10-07)
- ch05 §6 · [Avatars are circular photos or nothing](2026-10-11-avatars-are-photos-or-nothing.md) (2026-10-11)
- ch05 §9 · [Card media is always 16:9](2026-10-11-card-media-always-16-9.md) (2026-10-11)
- ch05 §9 · [Split-section images keep a fixed ratio](2026-10-11-split-images-keep-fixed-ratio.md) (2026-10-11)
- ch05 §4 · [Sketch for small visuals; isometric for large concepts](2026-10-15-sketch-for-small-visuals.md) (2026-10-15)
- ch05 §4a · [A drawing is never cropped and faces what it accompanies](2026-10-16-drawing-never-cropped-faces-its-form.md) (2026-10-16)
- ch05 §4 · [An illustration passes eight gates: meaning, legibility, set](2026-10-22-illustration-acceptance-gates.md) (2026-10-22)

## By area

### Process

*How work is run, reviewed and shipped.*

- 2026-10-20 · [The repo is public, so main's protection is enforced](2026-10-20-repo-public-main-protected.md) · enforced by `GitHub ruleset "main" (id 25475637); gh api repos/devagya-tc/tcules-website-2026/branches/main --jq .protected`
- 2026-10-20 · [The design system lives in an artifact, generated from the repo](2026-10-20-ds-artifact-from-repo.md) · enforced by `npm run ds:build and ds:check (/ds-publish)`
- 2026-10-16 · [Design the component for ideal content, then brief the content team](2026-10-16-design-component-first-then-brief-content.md)
- 2026-10-16 · [Critic loops never override the foundations](2026-10-16-critics-never-override-foundations.md)
- 2026-10-16 · [Design for beauty, not for the shape of the content](2026-10-16-beauty-not-content-shape.md)
- 2026-10-15 · [Redesign one section at a time, references first](2026-10-15-references-first-per-section.md)
- 2026-10-15 · [Gather references for what the content does, not the current mechanic](2026-10-15-reference-the-job-not-the-shape.md)
- 2026-10-15 · [Hi-fi visual directions as mocks before any code](2026-10-15-design-fidelity-before-code.md)
- 2026-10-11 · [Page-specific compositions stay page-specific](2026-10-11-page-specific-compositions.md)
- 2026-10-11 · [Design the band's job, not a restyle of its layout](2026-10-11-design-the-job-not-restyle.md)
- 2026-10-10 · [The owner judges rendered pages, not intermediate docs](2026-10-10-owner-judges-built-pages.md)
- 2026-10-10 · [An approved kit composition wins over a re-reading of a ruling](2026-10-10-approved-kit-compositions-win.md)
- 2026-10-09 · [The photo tone layer is made later in Figma](2026-10-09-photo-tone-made-in-figma.md)
- 2026-10-09 · [No screenshots to the owner; report the routes](2026-10-09-no-screenshots-to-owner.md)
- 2026-10-05 · [The work is a website UI kit with showcase pages](2026-10-05-frame-the-work-as-a-ui-kit.md)
- 2026-10-01 · [Fix the cause of a review note, not the note](2026-10-01-fix-causes-not-notes.md)
- 2026-09-29 · [Every component gets a visual pass before Phase 3](2026-09-29-visual-pass-before-phase-3.md)
- 2026-09-28 · [Components are decided in specs, not in whole-page comps](2026-09-28-whole-page-comps-dropped.md)
- 2026-09-28 · [Standing permission to branch, commit, push and open PRs](2026-09-28-standing-permission-to-ship.md)
- 2026-09-28 · [Phase 2 runs in dependency order, parallel where safe](2026-09-28-phase-2-runs-in-dependency-order.md)
- 2026-09-28 · [What the owner approved is locked](2026-09-28-keep-what-was-approved.md)
- 2026-09-28 · [Claude writes the spec and builds; the owner decides and approves](2026-09-28-claude-specs-owner-decides.md)
- 2026-09-28 · [Claude merges no-decision tasks; the owner merges starred ones](2026-09-28-claude-merges-no-decision-tasks.md)
- 2026-09-25 · [A named job gets a component only when composition cannot serve it](2026-09-25-job-is-not-a-component.md)
- 2026-09-25 · [When a brand rule changes, every knock-on is corrected or removed in the same pass](2026-09-25-guidelines-correct-every-knock-on.md)
- 2026-09-25 · [Design content-agnostic; content asks never block](2026-09-25-design-content-agnostic.md)
- 2026-09-25 · [Claude makes the Strapi calls and logs them](2026-09-25-claude-makes-the-strapi-calls.md)
- 2026-09-16 · [The CMS is not a design constraint](2026-09-16-cms-is-not-a-design-constraint.md)

### Layout

*Arrangement, the primitives, page composition.*

- 2026-10-22 · [Reasons: four argued reasons, set 2×2](2026-10-22-reasons-four-in-a-2x2.md) · enforced by `review (Reasons warns in development on a count other than 3, 4 or 6)`
- 2026-10-19 · [Home What we do is a bento of boxed tiles in two sizes](2026-10-19-what-we-do-is-a-bento.md)
- 2026-10-16 · [No card is hidden behind an interaction](2026-10-16-no-hidden-cards.md)
- 2026-10-16 · [Listings start from the approved front page and add navigation](2026-10-16-listings-add-to-the-approved-front-page.md)
- 2026-10-16 · [Rules only where they structure something](2026-10-16-lines-only-where-they-structure.md)
- 2026-10-16 · [Text never crosses an island's edge](2026-10-16-island-copy-stays-on-ground.md)
- 2026-10-12 · [One banner per reason only when each reason fills a fold](2026-10-12-banner-per-reason-only-when-it-fills-a-fold.md)
- 2026-10-11 · [Split-section images keep a fixed ratio](2026-10-11-split-images-keep-fixed-ratio.md)
- 2026-10-11 · [A card or list set beside an image never wraps under it](2026-10-11-set-never-wraps-under-image.md)
- 2026-10-11 · [A secondary item is anchored to its primary; pairs top-align](2026-10-11-secondary-anchored-to-primary.md)
- 2026-10-11 · [The same job reuses its iterated pattern across pages](2026-10-11-reuse-the-pattern-for-the-job.md)
- 2026-10-11 · [Page-specific compositions stay page-specific](2026-10-11-page-specific-compositions.md)
- 2026-10-11 · [One type size per role inside a band](2026-10-11-one-size-per-role-in-a-band.md)
- 2026-10-11 · [One heading is one visual section](2026-10-11-one-heading-one-section.md)
- 2026-10-11 · ["What you get" bands read as a clear offer](2026-10-11-offer-bands-read-as-an-offer.md)
- 2026-10-11 · [The form is the primary object of its band](2026-10-11-form-is-the-primary-object.md)
- 2026-10-11 · [Figures live in the hero](2026-10-11-figures-live-in-the-hero.md)
- 2026-10-11 · [Design the band's job, not a restyle of its layout](2026-10-11-design-the-job-not-restyle.md)
- 2026-10-11 · [A band needs an entry point and a path for the eye](2026-10-11-a-band-needs-an-entry-point.md)
- 2026-10-10 · [A gateway serves a quick decision; the item title is the hero](2026-10-10-gateway-title-is-the-hero.md)
- 2026-10-10 · [The enquiry form sits right before the FAQ](2026-10-10-enquiry-form-before-faq.md)
- 2026-10-10 · [Claim leads, proof supports](2026-10-10-claim-leads-proof-supports.md)
- 2026-10-10 · [Band order stays; inside a band the IA is free](2026-10-10-band-order-stays-ia-is-free.md)
- 2026-10-09 · [Two tinted bands are never adjacent](2026-10-09-two-tinted-bands-never-adjacent.md)
- 2026-10-09 · [Points stay with their copy](2026-10-09-points-stay-with-their-copy.md)
- 2026-10-09 · [Clickable cards sit under their head, with no decorative image](2026-10-09-clickable-cards-sit-under-their-head.md)
- 2026-10-07 · [Section padding is one value per width: 96, and 64 below 768](2026-10-07-section-padding-one-value-per-width.md)
- 2026-10-07 · [Never two text-heavy bands back to back](2026-10-07-no-two-text-heavy-bands-in-a-row.md)
- 2026-10-05 · [Texture may be used wherever it improves rhythm](2026-10-05-texture-for-rhythm.md)
- 2026-10-05 · [A section fits one fold](2026-10-05-section-fits-one-fold.md) · enforced by `fold:check`
- 2026-10-05 · [No blue bands for now](2026-10-05-no-blue-bands.md)
- 2026-09-28 · [The page-type template picks the hero arrangement, never the CMS](2026-09-28-template-picks-hero-arrangement.md)
- 2026-09-28 · [PageHero beside is text 1 : media 1 from 1024](2026-09-28-hero-beside-split-text-1-media-1.md)
- 2026-09-28 · [ContentSection head beside body is static, 1 : 2](2026-09-28-content-section-head-beside-body.md)
- 2026-08-27 · [Prose has no measure; the caller owns the width](2026-08-27-prose-has-no-measure.md)

### Spacing

*The gap scale and section air.*

- 2026-10-22 · [Listing group heads take h3, a stack above their pieces](2026-10-22-listing-group-heads-h3.md)
- 2026-10-19 · [The gateway board's items are 64 apart, not the 32 card-set gutter](2026-10-19-gateway-board-column-gap-64.md)
- 2026-10-13 · [Island's inset is the band's air in miniature](2026-10-13-island-inset-is-band-air.md)
- 2026-10-11 · [Item titles sit two type steps under their section heading](2026-10-11-item-titles-two-steps-under-heading.md)
- 2026-10-07 · [Section padding is one value per width: 96, and 64 below 768](2026-10-07-section-padding-one-value-per-width.md)
- 2026-10-05 · [Spacing is never cramped; Claude audits it](2026-10-05-spacing-never-cramped.md)
- 2026-10-05 · [A section fits one fold](2026-10-05-section-fits-one-fold.md) · enforced by `fold:check`
- 2026-09-29 · [gap-column is the row seam of a borderless card set](2026-09-29-gap-column-is-borderless-card-row-seam.md)

### Type

*Roles, sizes, families, case.*

- 2026-10-22 · [Testimonials are italic everywhere](2026-10-22-testimonials-italic-everywhere.md)
- 2026-10-22 · [Listing group heads take h3, a stack above their pieces](2026-10-22-listing-group-heads-h3.md)
- 2026-10-22 · [An FAQ question is 20px, on a standard h5-lg step](2026-10-22-faq-question-is-h5-lg-20.md)
- 2026-10-22 · [Card titles are sans, except the horizontal card](2026-10-22-card-titles-sans-except-horizontal.md)
- 2026-10-19 · [Only display and h1–h3 are serif](2026-10-19-only-display-h1-h3-serif.md)
- 2026-10-19 · [Body type never above 16px](2026-10-19-body-type-ceiling.md)
- 2026-10-15 · [The serif is for titles only](2026-10-15-serif-for-titles-only.md)
- 2026-10-15 · [In a selector, the option titles are the largest repeated thing](2026-10-15-selector-titles-are-the-targets.md)
- 2026-10-15 · [Lean to the smaller sizes generally](2026-10-15-lean-to-smaller-type.md)
- 2026-10-11 · [Quoted claims at list sizes are set upright](2026-10-11-upright-type-for-quoted-lists.md)
- 2026-10-11 · [One type size per role inside a band](2026-10-11-one-size-per-role-in-a-band.md)
- 2026-10-11 · [No decorative numbering](2026-10-11-no-decorative-numbering.md)
- 2026-10-11 · [Quote marks take the text's ink](2026-10-11-no-coloured-punctuation.md)
- 2026-10-11 · [Item titles sit two type steps under their section heading](2026-10-11-item-titles-two-steps-under-heading.md)
- 2026-10-11 · [An FAQ question clearly out-ranks its answer](2026-10-11-faq-question-outranks-answer.md)
- 2026-10-11 · [Display type is for heroes only](2026-10-11-display-type-hero-only.md)
- 2026-10-09 · [Statement carries no italic emphasis](2026-10-09-statement-no-italic-emphasis.md)
- 2026-10-07 · [Statement takes the smaller size, not display](2026-10-07-statement-takes-the-smaller-size.md)
- 2026-09-25 · [Social content families are told apart by the eyebrow and row pattern, not by ground](2026-09-25-social-families-told-by-eyebrow.md)
- 2026-09-25 · [A share preview's 64px hero holds three lines, 50 characters](2026-09-25-preview-hero-64-holds-50-characters.md)
- 2026-09-25 · [A social action row is chosen by the layout, and its action line may be an imperative](2026-09-25-action-line-may-be-imperative.md)
- 2026-09-24 · [No image carries type, on any surface](2026-09-24-no-image-carries-type.md)
- 2026-09-24 · [A carousel shows its position as numerals, never a progress device](2026-09-24-carousel-position-is-a-number.md)

### Colour

*Surfaces, grounds, accents.*

- 2026-10-13 · [Island is the one surface declarer besides Section](2026-10-13-island-declares-its-own-surface.md)
- 2026-10-11 · [Quote marks take the text's ink](2026-10-11-no-coloured-punctuation.md)
- 2026-10-09 · [Two tinted bands are never adjacent](2026-10-09-two-tinted-bands-never-adjacent.md)
- 2026-10-07 · [Blue solid is for the one main action](2026-10-07-blue-solid-is-the-one-main-action.md)
- 2026-10-06 · [More blue in the foreground; never a blue surface](2026-10-06-more-blue-in-the-foreground.md)
- 2026-10-05 · [On the website, peridot is ::selection only](2026-10-05-peridot-on-site-is-selection-only.md)
- 2026-10-05 · [No blue bands for now](2026-10-05-no-blue-bands.md)
- 2026-09-25 · [Social content families are told apart by the eyebrow and row pattern, not by ground](2026-09-25-social-families-told-by-eyebrow.md)
- 2026-09-25 · [A QR frame is paper or paper-deep, with the code block ruled](2026-09-25-qr-frame-paper-ruled-block.md)
- 2026-09-25 · [No illustration is placed on a brandeis-500 ground](2026-09-25-no-illustrations-on-blue.md)
- 2026-09-25 · [A reserved brandeis-500 frame takes chapter 02's Blue surface roles](2026-09-25-brandeis-500-frames-take-blue-roles.md)
- 2026-09-24 · [Paper carries more than half of every set; the hinge may change ground](2026-09-24-paper-dominates-hinge-may-change-ground.md)
- 2026-09-24 · [A cut-out sits on a flat contrast panel only where its edge falls below 3:1](2026-09-24-cut-out-contrast-panel-below-3-1.md)
- 2026-09-24 · [brandeis-900 is not a surface, on any canvas](2026-09-24-brandeis-900-is-not-a-surface.md)
- 2026-08-19 · [Component tokens live in tokens/components, not beside the component](2026-08-19-component-tokens-live-in-tokens.md) · enforced by `tokens:check`

### Imagery

*Photographs, captures, media delivery.*

- 2026-10-19 · [Bento's texture is the pixel grid in one continuous wave per row](2026-10-19-bento-texture-is-a-continuous-wave.md)
- 2026-10-13 · [Never reuse a graphic as a stand-in](2026-10-13-no-reused-graphics-as-standins.md)
- 2026-10-11 · [Split-section images keep a fixed ratio](2026-10-11-split-images-keep-fixed-ratio.md)
- 2026-10-11 · [Card media is always 16:9](2026-10-11-card-media-always-16-9.md)
- 2026-10-09 · [The photo tone layer is made later in Figma](2026-10-09-photo-tone-made-in-figma.md)
- 2026-10-07 · [IRL photographs share one tone layer](2026-10-07-irl-photos-share-one-tone-layer.md)
- 2026-10-05 · [Stock images are fine as placeholders, unlabelled](2026-10-05-stock-placeholders-unlabelled.md)
- 2026-10-05 · [Any card may carry an image](2026-10-05-any-card-may-carry-an-image.md)
- 2026-09-29 · [A BlockCard image's crop box takes an 8px radius](2026-09-29-card-image-radius-8.md)
- 2026-09-29 · [A card's crop box draws one hairline around its image, whatever the image's kind](2026-09-29-card-crop-box-rules-every-kind.md)
- 2026-09-28 · [Responsive images are Strapi's own formats as a native srcset](2026-09-28-images-served-from-strapi-formats.md)
- 2026-09-28 · [An image with no kind renders as a capture](2026-09-28-image-without-kind-renders-as-capture.md)
- 2026-09-28 · [The image width ladder is 2560, 1240, 652, 320](2026-09-28-image-width-ladder.md) · enforced by `photos:check`
- 2026-09-28 · [Hero media sits at its intrinsic ratio, never cropped](2026-09-28-hero-media-at-intrinsic-ratio.md)
- 2026-09-28 · [A cut-out's contrast panel is an asset field set at supply](2026-09-28-cutout-contrast-panel-set-at-supply.md)
- 2026-09-25 · [Written client approval before any public use of client work](2026-09-25-written-client-approval-always.md)
- 2026-09-25 · [A podcast or video thumbnail is paper, title left, a 480 square right](2026-09-25-thumbnail-paper-title-left-image-right.md)
- 2026-09-25 · [Social and share-preview covers are authored per channel, not taken from the project cover](2026-09-25-social-covers-authored-per-channel.md)
- 2026-09-25 · [A project banner is composed at 16:9](2026-09-25-project-banner-is-16-9.md)
- 2026-09-25 · [Portraits are 1:1 everywhere](2026-09-25-portraits-are-1-1.md)
- 2026-09-25 · [No client work on an Instagram story](2026-09-25-no-client-work-on-stories.md)
- 2026-09-25 · [The nav card takes its own 16:7 asset, never a recropped cover](2026-09-25-nav-card-own-16-7-asset.md)
- 2026-09-25 · [The SiteNav rail card's image takes radius 4, the named exception to radius 0](2026-09-25-nav-card-image-radius-4.md)
- 2026-09-25 · [Each placement is served derived widths, resized from one master, under a weight ceiling](2026-09-25-images-derived-from-one-master.md)
- 2026-09-25 · [Device frames are permitted in decks and proposals only](2026-09-25-device-frames-decks-only.md)
- 2026-09-25 · [Cut-outs are mastered as PNG with alpha and served as WebP with alpha](2026-09-25-cut-outs-png-master-webp-served.md)
- 2026-09-25 · [A cut-out carries five parts at full column, three on a post, two in a card, one in a thumbnail](2026-09-25-cut-out-part-counts.md)
- 2026-09-25 · [Clutch takes the logomark, a cut-out portfolio and no banner](2026-09-25-clutch-logomark-cut-out-portfolio.md)
- 2026-09-25 · [Client work is a cut-out at every size, Figure and PageHero included](2026-09-25-client-work-is-a-cut-out-at-every-size.md)
- 2026-09-25 · [Client marks in a set are one colour, the ground's ink](2026-09-25-client-logos-one-colour-in-a-set.md)
- 2026-09-25 · [Annotation over an image is allowed, because annotation is not content](2026-09-25-annotation-is-not-content.md)
- 2026-09-24 · [No image carries type, on any surface](2026-09-24-no-image-carries-type.md)
- 2026-09-24 · [Every image is approved at the 326px mobile column](2026-09-24-images-approved-at-326px.md)
- 2026-09-24 · [A cut-out part may carry one drop shadow, never stacked, coloured or in perspective](2026-09-24-cut-out-takes-one-shadow.md)
- 2026-09-24 · [A cut-out sits on a flat contrast panel only where its edge falls below 3:1](2026-09-24-cut-out-contrast-panel-below-3-1.md)
- 2026-09-24 · [A project cover or banner may be product UI as a cut-out, or an illustration](2026-09-24-cover-may-be-ui-cut-out-or-illustration.md)

### Illustration

*Illustrations, sketches, drawn visuals.*

- 2026-10-22 · [An illustration passes eight gates: meaning, legibility, set](2026-10-22-illustration-acceptance-gates.md)
- 2026-10-19 · [Bento's drawings are the Sketch scenes, bare and in the light weight](2026-10-19-bento-sketches-are-light.md)
- 2026-10-19 · [An animated drawing: story, then two states, then motion](2026-10-19-animated-drawing-story-first.md)
- 2026-10-16 · [Per-item visuals illustrate the claim; they are not evidence](2026-10-16-visuals-illustrate-not-prove.md)
- 2026-10-16 · [A drawing is never cropped and faces what it accompanies](2026-10-16-drawing-never-cropped-faces-its-form.md)
- 2026-10-15 · [Sketch for small visuals; isometric for large concepts](2026-10-15-sketch-for-small-visuals.md)
- 2026-10-13 · [Never reuse a graphic as a stand-in](2026-10-13-no-reused-graphics-as-standins.md)
- 2026-10-12 · [A band heavy with important items gets drawn cards](2026-10-12-important-items-get-drawn-cards.md)
- 2026-10-11 · [A diagram must carry information](2026-10-11-diagrams-carry-information.md)
- 2026-09-28 · [Illustrations face left and sequences read left to right](2026-09-28-illustrations-face-left-read-left-to-right.md)
- 2026-09-28 · [In an illustration, things carry up](2026-09-28-illustration-layers-carry-up.md)
- 2026-09-28 · [The ch05 example illustrations are not page assets](2026-09-28-illustration-examples-not-assets.md)
- 2026-09-28 · [An illustration's concept comes from its page's argument](2026-09-28-illustration-concept-from-page-argument.md)
- 2026-09-28 · [Illustrations stay between 0.75 and 1.35 wide](2026-09-28-illustration-aspect-limit.md) · enforced by `illustrations (scripts/illustrations/build.mjs)`
- 2026-09-28 · [Illustration connectors anchor exactly](2026-09-28-illustration-anchoring-exact.md)
- 2026-09-25 · [No illustration is placed on a brandeis-500 ground](2026-09-25-no-illustrations-on-blue.md)
- 2026-09-25 · [Generated illustrations carry no AI disclosure](2026-09-25-no-ai-disclosure-for-illustrations.md)
- 2026-09-25 · [Illustrations are isometric flat planes, one solid blue plane, one peridot carried item](2026-09-25-illustration-system-isometric-flat-planes.md)
- 2026-09-25 · [An illustration cover takes an archetype from the registry](2026-09-25-cover-archetype-registry.md)
- 2026-09-25 · [Annotation over an image is allowed, because annotation is not content](2026-09-25-annotation-is-not-content.md)
- 2026-09-24 · [Say "illustration", never "drawing"](2026-09-24-say-illustration-never-drawing.md)
- 2026-09-24 · [Every image is approved at the 326px mobile column](2026-09-24-images-approved-at-326px.md)
- 2026-09-24 · [An illustration is never boxed](2026-09-24-illustrations-are-never-boxed.md)
- 2026-09-24 · [A project cover or banner may be product UI as a cut-out, or an illustration](2026-09-24-cover-may-be-ui-cut-out-or-illustration.md)

### Iconography

*Glyphs and marks.*

- 2026-10-19 · [A tile with its own drawing carries no icon](2026-10-19-drawn-tile-carries-no-icon.md)
- 2026-10-11 · [No icons in circles](2026-10-11-no-icons-in-circles.md)
- 2026-10-11 · [Arrows mean clickable](2026-10-11-arrows-mean-clickable.md)
- 2026-10-09 · [An icon heads its card, sized to the title](2026-10-09-icon-heads-its-card.md)
- 2026-10-01 · [Chrome controls use universal marks; Solar Bold is for content](2026-10-01-chrome-icons-are-conventional.md)
- 2026-09-28 · [The six custom service glyphs are retired](2026-09-28-custom-service-glyphs-retired.md)
- 2026-09-25 · [The social wordmark is monochrome, header-left on a first frame and footer-left on a content frame](2026-09-25-wordmark-header-first-footer-content.md)
- 2026-09-25 · [The LinkedIn profile background carries the wordmark at 32px](2026-09-25-linkedin-profile-background-wordmark-32.md)

### Motion

*Hover, transition, animation.*

- 2026-10-19 · [No ground that exists only on hover](2026-10-19-no-hover-only-grounds.md)
- 2026-10-19 · [Hover is one smooth move, there and back](2026-10-19-hover-is-a-move.md)
- 2026-10-19 · [A bento tile's hover: blue hairline, 2px lift, its texture turns blue, no shadow](2026-10-19-bento-tile-hover.md)
- 2026-10-19 · [An animated drawing: story, then two states, then motion](2026-10-19-animated-drawing-story-first.md)
- 2026-10-16 · [A linked card's hover is its title in the accent ink](2026-10-16-linked-card-hover-is-accent-title.md)
- 2026-10-11 · [Selectors mark the current option and never fade the rest](2026-10-11-selectors-mark-never-fade.md)

### Cards

*Card sets and their variants.*

- 2026-10-22 · [Case study cards never hold a testimonial](2026-10-22-case-cards-carry-no-testimonial.md)
- 2026-10-22 · [Card titles are sans, except the horizontal card](2026-10-22-card-titles-sans-except-horizontal.md)
- 2026-10-19 · [Home What we do is a bento of boxed tiles in two sizes](2026-10-19-what-we-do-is-a-bento.md)
- 2026-10-19 · [No ground that exists only on hover](2026-10-19-no-hover-only-grounds.md)
- 2026-10-19 · [The gateway board's items are 64 apart, not the 32 card-set gutter](2026-10-19-gateway-board-column-gap-64.md)
- 2026-10-19 · [A tile with its own drawing carries no icon](2026-10-19-drawn-tile-carries-no-icon.md)
- 2026-10-19 · [A bento tile's hover: blue hairline, 2px lift, its texture turns blue, no shadow](2026-10-19-bento-tile-hover.md)
- 2026-10-19 · [Bento's texture is the pixel grid in one continuous wave per row](2026-10-19-bento-texture-is-a-continuous-wave.md)
- 2026-10-16 · [No card is hidden behind an interaction](2026-10-16-no-hidden-cards.md)
- 2026-10-16 · [A linked card's hover is its title in the accent ink](2026-10-16-linked-card-hover-is-accent-title.md)
- 2026-10-16 · [Rules only where they structure something](2026-10-16-lines-only-where-they-structure.md)
- 2026-10-12 · [People get ProfileCards, not image cards](2026-10-12-people-get-profile-cards.md)
- 2026-10-12 · [A band heavy with important items gets drawn cards](2026-10-12-important-items-get-drawn-cards.md)
- 2026-10-11 · [Card variants are never blended](2026-10-11-card-variants-stay-distinct.md)
- 2026-10-11 · [Card media is always 16:9](2026-10-11-card-media-always-16-9.md)
- 2026-10-09 · [An icon heads its card, sized to the title](2026-10-09-icon-heads-its-card.md)
- 2026-10-09 · [Clickable cards sit under their head, with no decorative image](2026-10-09-clickable-cards-sit-under-their-head.md)
- 2026-10-05 · [Cards have no boxes](2026-10-05-cards-have-no-boxes.md)
- 2026-10-05 · [Any card may carry an image](2026-10-05-any-card-may-carry-an-image.md)
- 2026-09-29 · [gap-column is the row seam of a borderless card set](2026-09-29-gap-column-is-borderless-card-row-seam.md)
- 2026-09-29 · [A BlockCard image's crop box takes an 8px radius](2026-09-29-card-image-radius-8.md)
- 2026-09-29 · [A card's crop box draws one hairline around its image, whatever the image's kind](2026-09-29-card-crop-box-rules-every-kind.md)
- 2026-09-28 · [A text-only card set gets its weight from scale and position](2026-09-28-text-only-cards-weight-from-scale.md)
- 2026-09-28 · [The first card is featured when the set has 4 or more](2026-09-28-first-card-featured-from-four.md)

### Forms

*Fields, choices, validation.*

- 2026-10-19 · [Form choices are pill chips, not radio rings](2026-10-19-form-choices-are-chips.md)
- 2026-10-19 · [The chip form is one wide paper panel that fits one screen](2026-10-19-chip-form-one-wide-paper-panel.md)
- 2026-10-16 · [Form errors appear only after Send](2026-10-16-form-errors-on-submit-only.md)
- 2026-10-11 · [The form is the primary object of its band](2026-10-11-form-is-the-primary-object.md)
- 2026-10-10 · [The enquiry form sits right before the FAQ](2026-10-10-enquiry-form-before-faq.md)
- 2026-10-09 · [The reply time appears only in the form](2026-10-09-reply-time-only-in-the-form.md)
- 2026-10-07 · [EnquiryForm is compact, with no visible labels](2026-10-07-enquiry-form-compact-placeholder-labels.md)

### Proof

*Logos, cases, testimonials, ratings.*

- 2026-10-22 · [Testimonials are italic everywhere](2026-10-22-testimonials-italic-everywhere.md)
- 2026-10-22 · [Case study cards never hold a testimonial](2026-10-22-case-cards-carry-no-testimonial.md)
- 2026-10-19 · [Placeholder ratings are never below 4.5](2026-10-19-placeholder-ratings-floor.md) · enforced by `fixture: src/content/sources/fixtures/testimonial-ratings.ts (rating() throws below 4.5)`
- 2026-10-12 · [A testimonial always shows its quote marks and star rating](2026-10-12-testimonial-shows-marks-and-rating.md)
- 2026-10-12 · [People get ProfileCards, not image cards](2026-10-12-people-get-profile-cards.md)
- 2026-10-11 · [Logo walls use real logo files](2026-10-11-logo-walls-use-real-logos.md)
- 2026-10-11 · [Figures live in the hero](2026-10-11-figures-live-in-the-hero.md)
- 2026-10-11 · [A case example tells problem, action, outcome in order](2026-10-11-case-example-tells-the-story-in-order.md)
- 2026-10-11 · [Avatars are circular photos or nothing](2026-10-11-avatars-are-photos-or-nothing.md)
- 2026-10-10 · [Testimonial groups use a real, rated testimonial card](2026-10-10-testimonials-use-a-rated-card.md)
- 2026-10-10 · [Cut a line the page already says](2026-10-10-cut-redundant-lines.md)
- 2026-10-10 · [Claim leads, proof supports](2026-10-10-claim-leads-proof-supports.md)
- 2026-10-09 · [Testimonial slider: plain bars, no centred arrows, no blue rule](2026-10-09-testimonial-slider-controls.md)
- 2026-10-09 · [At most one video testimonial per section, never beside others](2026-10-09-one-video-testimonial-per-section.md)
- 2026-10-09 · [Never combine proof types in one section](2026-10-09-one-proof-type-per-section.md)
- 2026-10-09 · [Facts drop tally graphics; no rule between score and badge](2026-10-09-facts-without-tallies.md)
- 2026-10-07 · [Proof is a set, not a ranking](2026-10-07-proof-is-a-set-not-a-ranking.md)
- 2026-10-07 · [Hero variants carry a rating badge in the eyebrow](2026-10-07-hero-rating-badge-eyebrow.md)
- 2026-10-07 · [Client logos: a boxed grid, one viewport, no marquee](2026-10-07-boxed-logo-grid.md)
- 2026-10-05 · [A testimonial slider is allowed](2026-10-05-testimonial-slider-allowed.md)
- 2026-09-28 · [A client mark in a strip is capped at about 40px tall](2026-09-28-client-mark-capped-at-40px.md)
- 2026-09-25 · [Written client approval before any public use of client work](2026-09-25-written-client-approval-always.md)
- 2026-09-25 · [Clutch takes the logomark, a cut-out portfolio and no banner](2026-09-25-clutch-logomark-cut-out-portfolio.md)
- 2026-09-25 · [Client marks in a set are one colour, the ground's ink](2026-09-25-client-logos-one-colour-in-a-set.md)

### Content

*Copy, narrative, IA, the CMS seam.*

- 2026-10-22 · [The case-study index opens by stage](2026-10-22-case-index-opens-by-stage.md)
- 2026-10-16 · [Per-item visuals illustrate the claim; they are not evidence](2026-10-16-visuals-illustrate-not-prove.md)
- 2026-10-16 · [No counts in navigation; switch labels in capitals](2026-10-16-no-counts-in-navigation.md)
- 2026-10-16 · [Listings start from the approved front page and add navigation](2026-10-16-listings-add-to-the-approved-front-page.md)
- 2026-10-16 · [The insights hub is curated; By type / By topic switch the whole view](2026-10-16-insights-hub-is-curated.md)
- 2026-10-16 · [Design the component for ideal content, then brief the content team](2026-10-16-design-component-first-then-brief-content.md)
- 2026-10-12 · ["Optimise content" means shorten, not restructure](2026-10-12-optimise-means-shorten.md)
- 2026-10-11 · ["What you get" bands read as a clear offer](2026-10-11-offer-bands-read-as-an-offer.md)
- 2026-10-11 · [No hero eyebrow on a page with a breadcrumb](2026-10-11-no-eyebrow-under-a-breadcrumb.md)
- 2026-10-11 · [No decorative numbering](2026-10-11-no-decorative-numbering.md)
- 2026-10-11 · [Structured metadata goes through the kit's provision](2026-10-11-metadata-through-kit-provision.md)
- 2026-10-11 · [Case study pages stay on Strapi content and slugs](2026-10-11-case-pages-stay-on-strapi.md)
- 2026-10-11 · [Every case study mention links to its case page](2026-10-11-case-mentions-link-to-case-page.md)
- 2026-10-11 · [A case example tells problem, action, outcome in order](2026-10-11-case-example-tells-the-story-in-order.md)
- 2026-10-10 · [A gateway serves a quick decision; the item title is the hero](2026-10-10-gateway-title-is-the-hero.md)
- 2026-10-10 · [The enquiry form sits right before the FAQ](2026-10-10-enquiry-form-before-faq.md)
- 2026-10-10 · [Never paraphrase the information; design the content freely](2026-10-10-design-content-dont-paraphrase.md)
- 2026-10-10 · [Cut a line the page already says](2026-10-10-cut-redundant-lines.md)
- 2026-10-10 · [Band order stays; inside a band the IA is free](2026-10-10-band-order-stays-ia-is-free.md)
- 2026-10-09 · [The reply time appears only in the form](2026-10-09-reply-time-only-in-the-form.md)
- 2026-10-07 · [Visitor-facing pages are optimised; SEO-only pages may compromise](2026-10-07-visitor-pages-optimised-seo-may-compromise.md)
- 2026-10-05 · [Pages keep their sections; never cut to about five](2026-10-05-pages-keep-their-sections.md)
- 2026-09-28 · [A cut-out's contrast panel is an asset field set at supply](2026-09-28-cutout-contrast-panel-set-at-supply.md)
- 2026-09-25 · [A share preview's 64px hero holds three lines, 50 characters](2026-09-25-preview-hero-64-holds-50-characters.md)
- 2026-09-25 · [Design content-agnostic; content asks never block](2026-09-25-design-content-agnostic.md)
- 2026-09-25 · [Claude makes the Strapi calls and logs them](2026-09-25-claude-makes-the-strapi-calls.md)
- 2026-09-25 · [A social action row is chosen by the layout, and its action line may be an imperative](2026-09-25-action-line-may-be-imperative.md)
- 2026-09-24 · [Say "illustration", never "drawing"](2026-09-24-say-illustration-never-drawing.md)
- 2026-09-16 · [The CMS is not a design constraint](2026-09-16-cms-is-not-a-design-constraint.md)
- 2026-08-27 · [Which page types are long-form](2026-08-27-long-form-page-types.md)

### Components

*Contracts of a named component or pattern.*

- 2026-10-22 · [Reasons: four argued reasons, set 2×2](2026-10-22-reasons-four-in-a-2x2.md) · enforced by `review (Reasons warns in development on a count other than 3, 4 or 6)`
- 2026-10-22 · [An FAQ question is 20px, on a standard h5-lg step](2026-10-22-faq-question-is-h5-lg-20.md)
- 2026-10-22 · [The case-study index opens by stage](2026-10-22-case-index-opens-by-stage.md)
- 2026-10-22 · [Case study cards never hold a testimonial](2026-10-22-case-cards-carry-no-testimonial.md)
- 2026-10-19 · [The chip form is one wide paper panel that fits one screen](2026-10-19-chip-form-one-wide-paper-panel.md)
- 2026-10-16 · [No counts in navigation; switch labels in capitals](2026-10-16-no-counts-in-navigation.md)
- 2026-10-16 · [Text never crosses an island's edge](2026-10-16-island-copy-stays-on-ground.md)
- 2026-10-16 · [The insights hub is curated; By type / By topic switch the whole view](2026-10-16-insights-hub-is-curated.md)
- 2026-10-15 · [In a selector, the option titles are the largest repeated thing](2026-10-15-selector-titles-are-the-targets.md)
- 2026-10-13 · [Island's inset is the band's air in miniature](2026-10-13-island-inset-is-band-air.md)
- 2026-10-13 · [Island is the one surface declarer besides Section](2026-10-13-island-declares-its-own-surface.md)
- 2026-10-12 · [A testimonial always shows its quote marks and star rating](2026-10-12-testimonial-shows-marks-and-rating.md)
- 2026-10-12 · [People get ProfileCards, not image cards](2026-10-12-people-get-profile-cards.md)
- 2026-10-11 · [Selectors mark the current option and never fade the rest](2026-10-11-selectors-mark-never-fade.md)
- 2026-10-11 · [The same job reuses its iterated pattern across pages](2026-10-11-reuse-the-pattern-for-the-job.md)
- 2026-10-11 · [No hero eyebrow on a page with a breadcrumb](2026-10-11-no-eyebrow-under-a-breadcrumb.md)
- 2026-10-11 · [Structured metadata goes through the kit's provision](2026-10-11-metadata-through-kit-provision.md)
- 2026-10-11 · [An FAQ question clearly out-ranks its answer](2026-10-11-faq-question-outranks-answer.md)
- 2026-10-10 · [Testimonial groups use a real, rated testimonial card](2026-10-10-testimonials-use-a-rated-card.md)
- 2026-10-09 · [Testimonial slider: plain bars, no centred arrows, no blue rule](2026-10-09-testimonial-slider-controls.md)
- 2026-10-09 · [Statement carries no italic emphasis](2026-10-09-statement-no-italic-emphasis.md)
- 2026-10-09 · [Stepped hero textures are retired](2026-10-09-hero-textures-retired.md)
- 2026-10-09 · [Facts drop tally graphics; no rule between score and badge](2026-10-09-facts-without-tallies.md)
- 2026-10-07 · [Statement takes the smaller size, not display](2026-10-07-statement-takes-the-smaller-size.md)
- 2026-10-07 · [Hero variants carry a rating badge in the eyebrow](2026-10-07-hero-rating-badge-eyebrow.md)
- 2026-10-07 · [EnquiryForm is compact, with no visible labels](2026-10-07-enquiry-form-compact-placeholder-labels.md)
- 2026-10-07 · [Client logos: a boxed grid, one viewport, no marquee](2026-10-07-boxed-logo-grid.md)
- 2026-10-07 · [Blue solid is for the one main action](2026-10-07-blue-solid-is-the-one-main-action.md)
- 2026-10-05 · [Texture may be used wherever it improves rhythm](2026-10-05-texture-for-rhythm.md)
- 2026-10-05 · [A testimonial slider is allowed](2026-10-05-testimonial-slider-allowed.md)
- 2026-09-28 · [The page-type template picks the hero arrangement, never the CMS](2026-09-28-template-picks-hero-arrangement.md)
- 2026-09-28 · [An image with no kind renders as a capture](2026-09-28-image-without-kind-renders-as-capture.md)
- 2026-09-28 · [Hero media sits at its intrinsic ratio, never cropped](2026-09-28-hero-media-at-intrinsic-ratio.md)
- 2026-09-28 · [PageHero beside is text 1 : media 1 from 1024](2026-09-28-hero-beside-split-text-1-media-1.md)
- 2026-09-28 · [ContentSection head beside body is static, 1 : 2](2026-09-28-content-section-head-beside-body.md)
- 2026-09-25 · [The nav card takes its own 16:7 asset, never a recropped cover](2026-09-25-nav-card-own-16-7-asset.md)
- 2026-09-25 · [The SiteNav rail card's image takes radius 4, the named exception to radius 0](2026-09-25-nav-card-image-radius-4.md)
- 2026-09-25 · [A named job gets a component only when composition cannot serve it](2026-09-25-job-is-not-a-component.md)
- 2026-08-27 · [Prose has no measure; the caller owns the width](2026-08-27-prose-has-no-measure.md)
- 2026-08-19 · [Component tokens live in tokens/components, not beside the component](2026-08-19-component-tokens-live-in-tokens.md) · enforced by `tokens:check`

## Superseded

Kept so a reversal and its reason stay readable. Never apply one of these.

- 2026-10-16 · ~~Type smaller than 28px is Public Sans~~ (2026-10-16-type-under-28-is-sans.md) → [Only display and h1–h3 are serif](2026-10-19-only-display-h1-h3-serif.md)
- 2026-10-16 · ~~A featured case is one card holding its testimonial~~ (2026-10-16-testimonial-case-card.md) → [Case study cards never hold a testimonial](2026-10-22-case-cards-carry-no-testimonial.md)
- 2026-10-16 · ~~Reasons: six argued reasons, each drawn, in one fold~~ (2026-10-16-reasons-band-shape.md) → [Reasons: four argued reasons, set 2×2](2026-10-22-reasons-four-in-a-2x2.md)
- 2026-10-16 · ~~The case card is one view; its visual is a fixed slot~~ (2026-10-16-case-card-is-one-view.md) → [Case study cards never hold a testimonial](2026-10-22-case-cards-carry-no-testimonial.md)
- 2026-10-15 · ~~Italic testimonials are a voice variant, beside content only~~ (2026-10-15-testimonial-italic-is-voice-variant.md) → [Testimonials are italic everywhere](2026-10-22-testimonials-italic-everywhere.md)
- 2026-10-10 · ~~Placeholder ratings run 4 to 5~~ (2026-10-10-placeholder-ratings-four-to-five.md) → [Placeholder ratings are never below 4.5](2026-10-19-placeholder-ratings-floor.md)
- 2026-10-10 · ~~A case and its quote sit adjacent, never embedded~~ (2026-10-10-case-and-quote-adjacent.md) → [A featured case is one card holding its testimonial](2026-10-16-testimonial-case-card.md)
- 2026-10-09 · ~~Section body 16, section lead 18, hero lead 18/20~~ (2026-10-09-section-body-16-lead-18.md) → [Body type never above 16px](2026-10-19-body-type-ceiling.md)
- 2026-10-09 · ~~The box card variant returns with no border~~ (2026-10-09-boxed-card-has-no-edge.md) → [No ground that exists only on hover](2026-10-19-no-hover-only-grounds.md)
- 2026-10-07 · ~~No rating beside a client quote; avoid headshots~~ (2026-10-07-no-rating-beside-quote-avoid-headshots.md) → [Testimonial groups use a real, rated testimonial card](2026-10-10-testimonials-use-a-rated-card.md)
- 2026-10-07 · ~~A case card with its testimonial inside is rejected~~ (2026-10-07-case-card-testimonial-rejected.md) → [A featured case is one card holding its testimonial](2026-10-16-testimonial-case-card.md)
- 2026-10-05 · ~~The hero eyebrow is a free slot and never echoes the crumb~~ (2026-10-05-eyebrow-never-echoes-crumb.md) → [No hero eyebrow on a page with a breadcrumb](2026-10-11-no-eyebrow-under-a-breadcrumb.md)
- 2026-10-05 · ~~Blue is a recurring accent, used wisely~~ (2026-10-05-blue-used-wisely.md) → [More blue in the foreground; never a blue surface](2026-10-06-more-blue-in-the-foreground.md)
- 2026-09-28 · ~~Case studies and covered insights carry an image; service cards do not~~ (2026-09-28-which-cards-carry-an-image.md) → [Any card may carry an image](2026-10-05-any-card-may-carry-an-image.md)
- 2026-09-28 · ~~Texture is kept as a decorative ground, within its limits~~ (2026-09-28-texture-kept-as-decorative-ground.md) → [Texture may be used wherever it improves rhythm](2026-10-05-texture-for-rhythm.md)
- 2026-09-28 · ~~A quote portrait is small, 1:1, beside the name and role~~ (2026-09-28-quote-portrait-small-square-beside-name.md) → [No rating beside a client quote; avoid headshots](2026-10-07-no-rating-beside-quote-avoid-headshots.md)
- 2026-09-28 · ~~Phase 2 is reviewed on one private claude.ai page~~ (2026-09-28-owner-reviews-on-one-private-page.md) → [No screenshots to the owner; report the routes](2026-10-09-no-screenshots-to-owner.md)
- 2026-09-25 · ~~Article, insight, service and glossary cards carry no media~~ (2026-09-25-only-case-study-cards-carry-media.md) → [Case studies and covered insights carry an image; service cards do not](2026-09-28-which-cards-carry-an-image.md)
- 2026-09-24 · ~~Ink and blue are reserved social grounds, never a rhythm device such as the hinge~~ (2026-09-24-ink-and-blue-never-a-rhythm-device.md) → [Paper carries more than half of every set; the hinge may change ground](2026-09-24-paper-dominates-hinge-may-change-ground.md)
- 2026-09-16 · ~~Photographic section openers with type over the photograph are permitted on the website~~ (2026-09-16-photographic-section-openers-permitted.md) → [No image carries type, on any surface](2026-09-24-no-image-carries-type.md)
- 2026-08-27 · ~~The Strapi model is frozen; reach for the seam first~~ (2026-08-27-strapi-model-frozen.md) → [The CMS is not a design constraint](2026-09-16-cms-is-not-a-design-constraint.md)
