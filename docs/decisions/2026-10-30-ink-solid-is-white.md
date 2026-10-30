---
title: "On ink, the solid button is white, as on blue"
date: 2026-10-30
status: active
area: [colour, components]
source: "Owner, 30 Oct 2026, the ink island 'Tell us what you're working on' on the service pages"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "tokens (button.css, [data-surface='ink'] --btn-solid-primary-*)"
---

On an ink surface the solid primary button inverts to paper with an ink label (hover neutral 200, pressed
300), the same object it is on blue. It is still the page's one main action (2026-10-07-blue-solid-is-the-one-main-action):
inverted, not a new emphasis.

**Why.** A brandeis button on an ink island read as a blue patch on a dark ground; the white button is the
clear action on both dark surfaces.

**The mistake it prevents.** Treating ink like paper for the primary, because blue "does not move".

**How to apply.** Token-only: every solid button on ink (the ink islands, the ink CTA band) follows. Do not
set a white button locally.
