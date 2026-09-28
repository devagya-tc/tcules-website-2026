# Phase 2 decisions

**The owner's rulings for tracker Phase 2 (2.1–2.16), taken 28 September 2026.** Every Phase 2 spec cites
this file for its answers, and a spec may not reopen a question settled here. A new question goes into that
spec's open-questions list, not into this file. It is added here only once the owner has answered it.

The component audit (`docs/component-audit.md`) is the *what*; this file is the owner's *how*.

---

## Images and media (2.6 Media, 2.7 Figure)

| # | Question | Ruling |
|---|---|---|
| M1 | How responsive images are served | **Strapi's own formats**, as a native `srcset`. No `next/image` and no build-time pipeline. The site is hosted on **Railway**. |
| M2 | The width ladder | **2560 · 1240 · 652 · 320.** 2560 is the master (ch05 §8) served as-is, 1240 and 652 are the desktop and mobile columns at 1×, and 320 is the ListCard thumbnail at 2×. This replaces ch05 §9's 2480: assets are produced at 2560, and serving the master costs ~3% width and saves a derivative. ch05 §9 is corrected in the 2.6 PR. Strapi upload breakpoints are set to match (`docs/strapi-changes.md`). |
| M3 | An image with no `kind` | Renders **as a capture** (hairline), i.e. today's look, until Strapi records kind. |
| M4 | The cut-out contrast panel (ch05 B5) | An optional **`panel: paper · paper-deep · ink` field on the asset**, set at supply. Code never guesses it. |

## Heroes (2.9 PageHero)

| # | Question | Ruling |
|---|---|---|
| H1 | Who picks the arrangement (stacked · beside · below) | **The page-type template, per family, in code.** Never a CMS field. PageHero exposes the arrangement as a presentation prop; templates set it. |
| H2 | The 'beside' split, from 1024 up | **Text 1 : media 1.** Below 1024 it stacks, text then media. |
| H3 | Media ratio | **Intrinsic**, never cropped (owner, 28 Sep; ch05 §9). Illustrations come from a 1:1 canvas and cut-outs have no fixed ratio; only a case-study banner is authored at 16:9. |

## Cards (2.10 BlockCard, 2.11 ListCard)

| # | Question | Ruling |
|---|---|---|
| C1 | Which cards carry an image | **Case studies, plus every insight or resource with a cover image: articles, videos, podcasts.** This **overrides ch05 v1.0 §9** ("articles, insights… no media"). The chapter is corrected in the 2.10 PR, and the Claude Design copy is updated through the next `/design-sync`. Service, audit, glossary and capability cards stay media-less. |
| C2 | How a text-only card set avoids reading as identical boxes | **Scale and position:** weight from type (the title role, a tight body, the whole card as the link), no box or fill, and variety from `Layout`. **The owner judges this on screenshots before it ships**, so 2.10 is shown, not merged, until approved. |
| C3 | When a card is featured | **The first item, automatically, when the set has 4 or more items.** No CMS field. A featured card is the horizontal arrangement spanning the row. |

## Proof and logos (2.8 ClientMark, 2.12 Proof)

| # | Question | Ruling |
|---|---|---|
| P1 | Quote portrait | **Small, 1:1, beside the name and role** under the quote (the ch10 "site blockquote" pattern). No portrait means no gap. |
| P2 | ClientMark size in a strip | **Capped at ~40px tall**, and sized to equal visual weight by area (ch05 §10). |

## Other units

| # | Question | Ruling |
|---|---|---|
| O1 | The six custom service glyphs in `Icon` | **Retired.** They are not Solar Bold (ch04); service lines get illustrations instead. |
| O2 | ContentSection head-beside-body | **Static (not sticky), head 1 : body 2**, from 1024 up. |
| O3 | Texture | Kept as a decorative ground element, within the limits in the audit §3 (ruled 28 Sep). |

## How Phase 2 runs

| # | Question | Ruling |
|---|---|---|
| W1 | Who merges | **Claude merges the no-decision tasks** (2.1–2.5, 2.7, 2.11, 2.14, 2.16) once every check passes and the screenshots show nothing unexpected. **The owner merges the ★ tasks** (2.6, 2.8, 2.9, 2.10, 2.12, 2.13, 2.15). |
| W2 | How the owner reviews | **One private review page on claude.ai**, updated as tasks land: each component's 1440 and 390 crops, before and after, the rulings it applied, and the PR link. |
| W3 | Pacing | **Dependency order, parallel where safe.** Independent tasks run side by side in separate worktrees. The media chain (Media → Figure → PageHero → cards) runs in sequence, each task branched on the last merged one. |
