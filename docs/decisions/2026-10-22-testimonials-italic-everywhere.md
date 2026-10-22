---
title: "Testimonials are italic everywhere"
date: 2026-10-22
status: active
area: [type, proof]
source: "Owner, 22 Oct 2026 (Jatin review checklist, Q8: \"everywhere\")"
supersedes: ["2026-10-15-testimonial-italic-is-voice-variant"]
dbf: ["ch03 §2"]
dbf_status: pending
enforced_by: "review"
---

Every testimonial quote is set in italic, in every arrangement: a wall, a supporting quote beside a claim, a card beside its case, a panel. There is no upright testimonial and no `voice` option to choose one.

**Why.** Jatin's review on 22 Oct asked for testimonials in italics. When asked whether that meant everywhere or only beside content, the owner said "everywhere".

**The mistake it prevents.** Upright testimonial cards in a wall beside italic ones next to content (the 15 Oct split), and a `voice` prop that a caller can forget to set.

**How to apply.** `Testimonial`'s quote composites (`--tsm-quote-text*`) carry the italic, as every `--text-quote*` composite does; no rule restates `font-style`. Proof, VideoTestimonial, CaseStory and Prose blockquotes already read the italic `--text-quote*` composites. VoiceLedger is not a testimonial: it shows a team's complaints, and it stays upright (11 Oct ruling: italic was hard to read at h4). Statement is unaffected.
