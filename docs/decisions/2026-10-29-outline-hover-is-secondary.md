---
title: "The outlined button reads as secondary: its hover firms the line, it never fills"
date: 2026-10-29
status: superseded
area: [components, motion, colour]
source: "Owner (Devagya), 29 Oct 2026, on the site rebuilt from the 26 Oct copy (Button `emphasis=\"outline\"`, home `people` banner)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "tokens (--btn-outline-primary-fg-hover, -rule-hover, -bg-pressed, -rule-pressed in tokens/components/button.css, every surface)"
---

Button `emphasis="outline"` must read as SECONDARY, so its hover is toned down: it no longer fills. On
hover and keyboard focus the hairline firms one step and the label takes the link's hover step, colour
only, on the button's one transition; nothing fades or pulses. A press is the only ground it ever takes,
a ghost's pale tint, with the line one step firmer again. Every surface declares the four state tokens.

**Why.** The owner: the outline's hover "currently competes with the primary". It filled with the
surface's blue (paper: brandeis-500 under a white label), which is the solid's own look, so pointing at
the secondary action turned it into a second main action
(`2026-10-07-blue-solid-is-the-one-main-action`).

**The mistake it prevents.** The 6 Oct stepper treatment, "hover fills the disc", carried over when the
outline took a label for the Banner's pair (`2026-10-29-banner-two-actions-one-row`): "Meet the studio"
went solid blue under the pointer.

**How to apply.** Button's outline in `Button.module.css` reads `-rule-hover` and `-fg-hover` on hover
and focus (plus the ring), `-bg-pressed` and `-rule-pressed` on press. It applies to both forms, the
labelled pair button and the icon-only Slider stepper. Paper and tint: rule 300 → 500 → 600, label 500 →
600, press ground brandeis-50 (paper) or -100 (tint). Ink: rule 400 → 200 → 100, label 200 → 100, press
ground neutral-900. Blue: rule 200 → white, label white → brandeis-50, press ground brandeis-600. Hover
stays within `2026-10-19-hover-is-a-move`: colour on the shared transition, no keyframes.
