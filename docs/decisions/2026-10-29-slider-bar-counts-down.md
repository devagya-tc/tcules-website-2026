---
title: "A slider's active bar counts down: full, emptying left to right; a press stops autoplay and leaves it full"
date: 2026-10-29
status: active
area: [components, motion]
source: "Owner (Devagya) notes on the site rebuilt from the 26 Oct copy, 29 Oct 2026 (feat/r4)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (Slider.tsx `stop`, Slider.module.css `.stepFill` scaleX with transform-origin right)"
---

With autoplay, the ACTIVE bar starts full blue and empties left to right over the slide's hold, as a countdown.
When the reader clicks a bar or a previous / next control, autoplay STOPS and the active bar stays FULL, a clear
selected state. Inactive bars are empty. Under prefers-reduced-motion nothing drains: the active bar is simply
full. The fill moves by `transform: scaleX` only (2026-10-19 hover-is-a-move: transform-only motion).

**Why.** Clicking a bar switched the slide, but its bar stayed blank, because the paused rotation reset the fill
to zero. Nothing showed the reader's choice.

**The mistake it prevents.** The 9 Oct behaviour: a pressed bar rested the rotation for six seconds, then it
resumed, with a blank bar the whole time.

**How to apply.** In the Slider pattern, so every autoplay slider gets it. Hover or keyboard focus on the slides
still only holds the turn, with the bar frozen. Under `align="start"` the rotation control offers Play after a
stop.
