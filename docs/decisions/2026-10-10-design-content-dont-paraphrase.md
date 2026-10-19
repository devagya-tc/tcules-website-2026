---
title: "Never paraphrase the information; design the content freely"
date: 2026-10-10
status: active
area: [content]
source: "Owner, 10 Oct 2026 (_pages corpus, pass 1)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
legacy: "memory/content-narrative-is-fixed.md"
---

In the `_pages` corpus the information is not paraphrased, but designing the content is allowed and expected: a stats line becomes metric cards, a list of client names becomes the logo wall, quotes are pulled out of the case paragraphs they were authored inside into their own testimonial component.

**Why.** Pass 1 came out ugly. The owner: "take my message as feedback, not as instructions."

**The mistake it prevents.** Either rewording authored copy, or transcribing the markdown's layout literally as if it were a component spec.

**How to apply.** Every mapping and build on `_pages`. Text-length changes go as proposals in `docs/content-proposals.md`, not `docs/content-changes.md`. Images: use one the frontmatter already points at; anything needing generation is a placeholder plus a register entry.
