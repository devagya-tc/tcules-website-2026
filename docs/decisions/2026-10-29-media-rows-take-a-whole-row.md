---
title: "Never two horizontal media items side by side: one to a row, or the vertical card"
date: 2026-10-29
status: active
area: [layout, cards]
source: "Owner second review of the 26 Oct copy pages, 29 Oct 2026 (feat/new-copy, /case-studies \"Best for\" rows)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (Layout.module.css `> [data-media-row]` spans every track; BlockCard horizontal, ListCard row with a thumbnail or scene, Teaser row/beside with a picture declare `data-media-row`)"
---

An item whose picture sits BESIDE its words (a thumbnail beside text, a horizontal card) is never set
beside another one: "This should never happen. Either 1 item takes one row and then it takes this form
or it uses the vertical card."

**Why.** Two columns of thumbnail-beside-text rows read as a cramped double ledger: each row's copy is
squeezed beside its picture and the two columns compete. One per row gives the copy its measure; the
vertical card in a grid gives the picture its width.

**The mistake it prevents.** The /case-studies stage groups of five or more on feat/new-copy: ListCard
rows with thumbnails in two columns (`Layout columns={{ lg: 2 }}`), and any grid of Teaser rows with
pictures (the S7 sector list's three tracks).

**How to apply.** Enforced in Layout, globally: BlockCard `orientation="horizontal"` with an image, a
ListCard `form="row"` with a `thumbnail` or `sketch` marker and a Teaser `row` or `beside` with a
picture each set `data-media-row` on their root, and `Layout` spans such a direct child across every
track (not in a scroll row). A caller that wants the items in a grid passes the vertical form instead
(BlockCard vertical, ListCard `form="tile"`, Teaser `stack`). Compose such rows straight into the list's
own Layout: a wrapper element hides the declaration from the grid.
