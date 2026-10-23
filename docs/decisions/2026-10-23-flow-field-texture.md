---
title: "The enquiry close's texture is one flow field: loose to parallel, slow churn, nothing on the pointer"
date: 2026-10-23
status: active
area: [motion, components]
source: "Owner, 23 Oct 2026 (Confluence mock rounds, PR feat/enquiry-close-flow)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
---

On the enquiry close the pixel grid becomes one field across the whole island (`TextureFlow`): every cell keeps its shape and strength and turns to follow one flow, loose contour loops at the start easing into parallel streams past the form, "no hard separation", "like how a concave lens works but in reverse". Streamlines emphasised, as shipped strength, and the only motion is the loose water's slow churn. With a drawing, the field fades out toward the start "so the bg becomes less busy behind it". Locked: "lets lock this in for now."

**Why.** The owner wanted a close people stop at, through texture and motion that carry a concept (many starts, one direction), with "some organizedness": the grid Jatin liked stays, and only its orientation moves.

**The mistake it prevents.** The rejected rounds: a still frame behind the form plus a separate moving effect and a pointer trail ("too distracting"); a noise-masked haze ("fog on glass, unclean and shabby"); streams traced as curves ("octopus tentacles"); a fan converging at the form's edge (a hard seam); and the texture drawing the illustration itself.

**How to apply.** `islandTexture="flow"` on the island close only; the static grid everywhere else is this field at rest. Motion only on screen and in a visible tab; prefers-reduced-motion draws it once. Words marked `data-texture-calm` sit in still, quieter water. No pulses and no pointer response.
