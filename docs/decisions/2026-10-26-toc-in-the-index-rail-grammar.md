---
title: The article outline is drawn in IndexRail's grammar, with one sliding marker
date: 2026-10-26
status: active
area: [components]
source: Owner, 26 Oct 2026, after the hi-fi mocks in the "Article TOC Directions" canvas (approved "build it")
supersedes: []
dbf: []
dbf_status: none
enforced_by: review
---

The long-form `TableOfContents` has no ordinals ("drop the numbers"). Each entry is a short contextual
marker, two or three words authored as `navigationLabel`, on one line. A whole heading is only a
fallback and is cut with an ellipsis. The rail is IndexRail's: an "On this page" eyebrow over one rule,
then names alone. One 2px marker grows in at the first section and then slides from row to row
("one continuous marker that moves"), moving by transform only, with no track behind it ("no segment,
line is fine like on indexrail"). The full list is always shown on desktop ("no collapse"). Below
1024, a sticky bar under the nav names the section in view and opens the list under itself. This is
Fern's interaction without the progress line, and the bar spreads to the screen's edges on its own
ground, as IndexRail's phone bar does. IndexRail keeps its own grow-in-place marker ("I like the
animation on the IndexRail as is").

**Why.** The owner found the old outline "quite bulky" with "too much going on". It had 44px rows,
a mono ordinal column, two-line labels, a hairline down every row, a 3px current rule, and underlines
that thickened on press. That is six signals for "here" or "pointed at". The listing rail already
read well, so the article outline should look like it.

**The mistake it prevents.** The Aug 2026 `TableOfContents` (spec §17), which rebuilt an outline from
the full headings with a numbered ladder. It also rules out the alternatives the owner rejected while
designing this: a Notion-style collapsed rail ("at that point we could just remove it"), a Zag.js-style
indicator, and a closed "On this page" disclosure on phones that named nothing.

**How to apply.** `src/patterns/TableOfContents` and `tokens/components/table-of-contents.css`. The
`--toc-*` colours duplicate IndexRail's values on purpose, and are not read from them. Pages pass a
`navigationLabel` as the entry's label wherever content carries one. The dev warning names any label
over 26 characters.
