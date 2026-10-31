---
title: "Autoplay has no play/pause control; the reader's behaviour is the control"
date: 2026-10-31
status: active
area: [motion, components]
source: "Devagya, 31 Oct 2026, hard parts round 4: \"don't add play/pause and handle it through detecting interactions if possible but do it elegantly\""
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

A set that advances by itself carries no play or pause button. It runs only where there is a mouse and only while
it is on screen; the pointer over it or keyboard focus inside it holds the timer; any deliberate act (choosing a tab,
an arrow key, selecting text, following a link) stops it for good; it plays through once, returns to the first item
and rests; reduced motion never starts it. The timer is drawn in the set itself (the rule after a tab's number).

**Why.** The owner wanted autoplay that pauses on hover with no visible control. Touch screens never autoplay, so
nobody meets motion they cannot stop by touching it.

**The mistake it prevents.** A Pause label at the head of the hard parts (round 3), and autoplay that loops forever
or runs on a phone.

**How to apply.** `ClaimTabs` in `src/patterns/ClaimSet` (15 s a claim). Known trade-off, raised with the owner before the ruling: a
strict reading of WCAG 2.2.2 asks for a visible pause mechanism; hover and focus holding, stopping on interaction and
a single pass are this site's answer.
