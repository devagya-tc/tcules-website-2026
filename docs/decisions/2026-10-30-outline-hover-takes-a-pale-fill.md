---
title: "The outlined button takes a pale tint on hover and one step deeper on press; never the solid's blue"
date: 2026-10-30
status: active
area: [components, motion, colour]
source: "Owner (Devagya), 30 Oct 2026, round 5 notes: polish the outline button's interactions, a slight fill on hover"
supersedes: [2026-10-29-outline-hover-is-secondary]
dbf: []
dbf_status: none
enforced_by: "tokens (--btn-outline-primary-bg-hover and -bg-pressed in tokens/components/button.css, every surface)"
---

Button `emphasis="outline"` stays the SECONDARY control, but its hover is no longer colour on the line
alone: hover and keyboard focus lay the ghost's pale tint under it, the hairline firms one step and the
label takes the link's step; a press deepens the tint one step. It never fills with the surface's blue,
which is the solid's look and the page's one main action.

**Why.** The owner: the outline's interactions felt unfinished; "a slight fill on hover would make it
well rounded". The 29 Oct ruling removed the blue fill because it competed with the primary; a pale
tint answers both.

**The mistake it prevents.** A hover that only recolours a hairline (reads as nothing happened), and
the 6 Oct blue fill (reads as a second main action).

**How to apply.** Paper: hover brandeis-50, press brandeis-100. Tint: 100, then 200. Ink: neutral-900,
then neutral-800 (never blue). Blue: brandeis-600, then 700. Rule and label steps unchanged. Colour on
the button's one transition; nothing fades or pulses. Both forms: the labelled pair button and the
Slider's icon-only stepper.
