---
title: "A testimonial band with fewer than six quotes sets its heading in the eyebrow voice"
date: 2026-10-29
status: active
area: [proof, type, components]
source: "Owner (Devagya) notes on the site rebuilt from the 26 Oct copy, 29 Oct 2026 (feat/r4)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (ContentSection `headingSize=\"eyebrow\"`; QuoteGroupBand in src/templates/CorpusPage/blocks.tsx passes it below WALL_FROM)"
---

The heading of the one-at-a-time testimonial band (e.g. "What clients say about these projects" on /case-studies,
/contact, /about, /services/product-design) renders in the EYEBROW style: mono, small, uppercase through
`--text-mono-case`. The quote carries the emphasis. It stays the band's `h2` for the outline and
`aria-labelledby`, and keeps the authored words. Six or more quotes (the wall) keep the h2 role.

**Why.** "So the quote carries the emphasis": a 43px serif head above a centred italic quote gave the band two
large things.

**The mistake it prevents.** The testimonial slider bands of round 2, where the head competed with the quote.

**How to apply.** `ContentSection` takes `headingSize="eyebrow"`: the same `h2`, the eyebrow's font, tracking,
case and ink, with no title measure. Do not pass an `eyebrow` as well.
