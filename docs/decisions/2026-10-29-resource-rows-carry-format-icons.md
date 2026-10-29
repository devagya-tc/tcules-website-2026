---
title: "A resource row carries its format's glyph"
date: 2026-10-29
status: active
area: [iconography, cards]
source: "Owner second review of the 26 Oct copy pages, 29 Oct 2026 (feat/new-copy, home \"Selected thinking\")"
supersedes: []
dbf: [ch04 Choosing a glyph]
dbf_status: pending
enforced_by: "structure (Teaser `icon`, TEASER_FORMAT_ICON in src/patterns/Teaser/Teaser.tsx)"
---

A resource row (Teaser `row` with `metaAside` and `ruled`, home's "Selected thinking") "can have format
icons": the format's Solar Bold content glyph heads the meta column, above the format word and the
length; on a phone it leads the meta line over the title. One glyph per format, the ones the format
menu set on 23 Oct: Article `document-text`, Guide `notebook`, Research `graph-up`, Interview
`chat-round-dots`, Podcast `microphone`, Video `videocamera-record`, Event `calendar`. In the accent
(2026-10-06-more-blue-in-the-foreground), aria-hidden: the format is said in words beside it.

**Why.** The owner asked for it on the rows; the glyph lets a reader tell an article from a podcast down
the ledger at a glance.

**The mistake it prevents.** A second, divergent glyph map for formats (the listing's panel glyphs and
the rows drifting apart), or a glyph without its format word.

**How to apply.** `TEASER_FORMAT_ICON` is the one map: Teaser's `icon` reads it, HomePage passes the
piece's `page_type` through it, and ListingIndex's no-picture panels (`GLYPH`) read the same map.
`--tsr-glyph-ink` per surface. Chapter 04's fixed glyph choices do not list the formats yet: pending.
