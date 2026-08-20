# Brief 01 — Buttons

> **Ships today. Do not specify this.** `src/components/Button` covers all six renderings the
> content audit found. What remains open is a copy decision and one behaviour.

| | |
|---|---|
| Inventory | #01 Buttons — 305 standalone actions, 827 inline links, all 129 pages |
| Implemented at | `src/components/Button/` · `src/styles/tokens/components/button.css` · `/design/button` |
| API | `emphasis: 'solid' \| 'ghost' \| 'link'` · `tone: 'primary' \| 'neutral'` · `size: 'sm' \| 'md' \| 'lg'` · `active` · `icon` · `as` |

## The six renderings, mapped

| Audit rendering | What ships | Volume |
|---|---|---|
| Primary · default | `emphasis="solid" tone="primary" size="md"` | the ask, in a content section |
| Primary · large | `emphasis="solid" tone="primary" size="lg"` | hero and CTA only |
| Secondary · default | `emphasis="ghost" tone="neutral" size="md"` | "See relevant work" |
| Secondary · large | `emphasis="ghost" tone="neutral" size="lg"` | pairs with primary large |
| Inline link | `emphasis="link"` | 827 instances — inside `Prose`, this is the flow's own anchor styling, not a Button |
| External | `as="a"` plus an outbound mark in `icon` | 29 external hrefs |

The audit's note that there is **no colour axis** — the distinction is always ask versus destination,
never hue — is already the argument written into `ButtonTone`: `primary` is the offer, `neutral`
claims nothing. Nothing needs adding.

## What is still open

1. **The label system.** The content's two asks ("Start a project" 72×, "Request free audit" 38×)
   against the sitemap's ten per-page-type asks. Both cannot ship. **Copy decision, and it is
   blocking for briefs 08 and 09** — the CTA arrangement that suits "Apply the decision" is not the
   one that suits "Start a project". Recommendation: the sitemap's ten, because a service page and a
   glossary term asking the identical question is the flattening the rebuild exists to avoid; but
   this is Marketing's call, not design's.
2. **The outbound marker.** 29 external hrefs. `Button` takes `icon`, so the marker is a call-site
   decision today, which means 29 call sites can each decide differently. Recommendation: the
   content seam sets it, from the href — a link that leaves the site is a fact about the href, not a
   choice about the button.
3. **Anchor actions must not read as navigation.** 87 of the 305 standalone actions are same-page
   `#anchors`. They are buttons that scroll, and styling them as destinations tells the reader they
   are leaving the page. Recommendation: `emphasis="ghost"`, never `link`.

## If a brief does get written

It is not a Button brief. It is a **new glyph request** for the outbound marker, in the block form
`npm run design:brief` prints — a filled shape on the 24 box, since a glyph described as strokes
renders nothing in this set.
