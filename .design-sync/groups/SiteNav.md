---
category: Patterns
---

The site header. One per page, sticky, and the only component that owns `banner`.

Six items in content order — **Services · Work · Expertise · Insights · Lab · About** — plus one
solid action. Three of the six open a menu; three navigate. Work sits second because case studies
are the strongest proof the studio has and should not be the fifth thing read.

**Above 1024 the three menu sections are panes of ONE plate.** An inset box over the page, with its
own hairline, radius and scrim, which morphs between 1120 (Services, the only section with a rail),
780 (Expertise) and 560 (Insights) rather than holding one width and showing empty ground. Opening
is a fade at the section's final size; switching slides the panes and morphs the box, with the
direction taken from the order of the items in the bar. Crossing a direct link on the way closes
nothing.

**Below 1024 the whole navigation is a sheet** that rises from the bottom and hugs its list, so all
six items sit in the lower half of the screen where a thumb is. A section grows it to the screen
that section's own content, capped at the screen less 88px; Back shrinks it again. Two actions stay pinned at the foot at both levels — Request audit
on the left, Start a project on the right.

**Swiping the sheet down dismisses it** — the whole thing, section and all, since Back already means
"up one". It follows the finger, starts from the handle or the header (or from the list when that
list is at its top), and snaps back if the gesture is too short to mean it.

Type differs between the two on purpose. A section's links are 14px on both surfaces; the sheet's six
root rows are 16px — one step up, since they are the top level on the one surface where they are the
primary target — and the rail card's title is 18px, the heaviest text in either pane. The root rows
have no desktop counterpart to match: up there the same six items are the bar, set in mono at 13.

The rail's primary card is **image-led**: a 16:7 slot above an `h6` title. The image arrives as
`{ src, alt, width, height }`, the same record `Figure` and `PageHero` take, and the file shipping
today is a named placeholder — the real artwork is still open.

**Services and Insights carry a hub link** — "ALL SERVICES", "ALL INSIGHTS" — at the foot of the
plate on desktop and at the end of the scrolling list in the sheet. A mega's trigger opens rather
than navigates, so without one the section's own index has no route to it. Expertise has none,
deliberately. It is never in the sheet's sticky foot: that strip holds the two offers, and a third
action in the one place a thumb reaches would compete with both.

**Composing a page with this: place it and stop.** It needs no wrapper, no surface Section around
it and no spacing above it — it is sticky, it paints its own ground from `surface`, and the plate and
the sheet are both out of flow, so nothing it does can move the page. A page anchor under a sticky
header needs `scroll-margin-block-start: var(--nav-bar-height)`, and that is the page's job.

**There is no elevation.** The system ships only `--shadow-none`; the plate separates from the page
by its edge, its radius and the scrim. Do not draw a shadow under it.

Full contract, including the motion table and the `status`/`children` data rules, in
`docs/specs/SiteNav.md`.
