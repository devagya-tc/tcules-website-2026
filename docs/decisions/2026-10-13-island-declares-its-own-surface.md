---
title: "Island is the one surface declarer besides Section"
date: 2026-10-13
status: active
area: [colour, components]
source: "CLAUDE.md § token rule 7 (owner, 13 Oct 2026)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
legacy: "CLAUDE.md"
---
Surface is declared with `data-surface` on an ancestor, a Section, never on the control itself. **The one
other surface declarer is `Island`:** a bounded ground inside a band whose surface is set per instance, so
it declares its own `data-surface` exactly as a band does.

**Why.** A control three components deep gets the right treatment only if its nearest ancestor states the
ground it actually sits on. An island's ground differs from the band's.

**The mistake it prevents.** An island's ground painted with a hand-set background while its contents
read the band's surface tokens, so buttons and links take the wrong treatment.

**How to apply.** `Island` takes a `surface` prop and writes `data-surface`; every surface block declares
every surface-dependent token so nesting holds. No other component declares a surface.
