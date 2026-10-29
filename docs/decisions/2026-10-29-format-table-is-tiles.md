---
title: "The insights format table is format tiles; Authors is a quiet line under them"
date: 2026-10-29
status: active
area: [cards, content, layout]
source: "Owner (Devagya), listing pages of the 26 Oct copy rebuild, 29 Oct 2026 (feat/r3-listings); the format tiles approved 16 Oct 2026"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (FormatTiles in src/templates/ListingIndex/insights.tsx; formatTable in src/app/_insights/hub.tsx)"
---

"Browse Tcules insights by format" is a set of format tiles, not a DataTable: each format's glyph heads its
tile, the format's name (the link to the finder with that type picked) is the title, "What you will find" is
the body and "Best for" a labelled line under it. Every authored word stays. Four tiles across where the column
holds them (1440), two by two below, so no tile is left alone on a row. Authors is not a fifth tile: it has no
format glyph, it indexes people rather than a kind of piece, and it has no page yet, so it is a quieter pair of
lines under the set (its name and what you will find, then "Best for").

**Why.** The owner: the table "is functional but not appealing: render it as cards", reusing the format tiles
approved on the insights front page on 16 Oct; "5 tiles must not leave a lone tile on a row".

**The mistake it prevents.** A ruled five-row DataTable as the last listing band; a fifth Authors tile alone on
a row, or wearing a glyph borrowed from another format.

**How to apply.** The format tiles are BlockCard icon cards (`size="md"`, glyph from TEASER_FORMAT_ICON). The
16 Oct tiles carried the CMS's 3D artwork, which exists for four formats only and not Guides, so the glyph heads
each tile as the owner specified.
