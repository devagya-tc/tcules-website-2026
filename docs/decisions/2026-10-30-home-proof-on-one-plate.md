---
title: "Home's reasons set each proof on one plate of one size, the title under its edge; a tenure is a name over a mono label, never an accent figure"
date: 2026-10-30
status: superseded
area: [components, layout]
source: "Owner (Devagya) round-5 notes, 30 Oct 2026: home why-tcules 'objectively ugly', paths 'still bad'"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (Reasons proof plate, --rsn-proof-height, --rsn-plate-ground)"
---

Each reason's proof in the home "Why Tcules" band sits on one PLATE: a paper-deep ground of one fixed
size (256 tall at every width, radius 8, clipped), the title a `block` (24) under the plate's bottom
edge, so proof, title and sentence read as one unit like an image over its caption. Three plates of one
size and one ground are a set, never a ranking; the column gap is 32 (cards in a set).

Marks: the four clients 2x2, centred. Cover: the case cover fills the plate from the top with a caption
strip (status dot, the fact, the case). Figures: the client name as a wordmark over its tenure in the
mono label voice. No blue text in a plate; the only accent is the 8px live dot.

**Amends** home-reasons-show-their-proof: the plate is the visual slot, not a container; the reason's
words never go inside it.

**Why.** Owner round 5: the band was 'objectively ugly'; the proof must read with its title as one unit.

**The mistake it prevents.** Proofs floating centred in an invisible box (title distance varying
24 to 90), three unrelated visual types, and blue non-link text that read as links and as numbers.

**How to apply.** `Reasons` renders every proof inside `.proof` (`--rsn-proof-height`, `--rsn-plate-ground`); an all-proof set uses `gutter` between columns. Specimen: /design/reasons blocks 15 and 16.
