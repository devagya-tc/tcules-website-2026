---
title: "A CTA band is an ink island with the texture on it"
date: 2026-10-29
status: active
area: [layout, components]
source: "Owner second review of the 26 Oct copy pages, 29 Oct 2026 (feat/new-copy; the Future Interfaces Lab close)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (CtaSection `open` always renders an ink Island with TextureFlow, no `island` prop; --tex-flow-ink per surface)"
---

"For CTA bands like this, I'd like to use the island variant: in ink, with the text and button as is
and the texture on the island." Every CTA band that is a heading, a line and an ask (CtaSection
`open`) sits on an ink island, the moving field (`TextureFlow`) across it and still behind the lede.

**Why.** The owner's ruling at the second review: the open close on a plain tint band ("Join Future
Interfaces Lab · Apply for fellowship") read as one more text band at the foot of the page.

**The mistake it prevents.** `CtaSection arrangement="open"` rendering as a centred column straight on
a tint band, or on a paper or tint island (the 13 Oct island variant's `island="tint"`).

**How to apply.** Global, in CtaSection: `open` takes no `island` prop and always draws the ink island
with the field; its words, points and buttons are unchanged. The band around it is paper unless the
caller passes `surface`; on an ink band the island turns brandeis. The field's ink on the ink island is
the mid-grey grain the island already takes for TextureFrame (`--tex-flow-ink`, neutral-500); blue
keeps the approved white.
