---
title: "Home's two paths share lines from 1024 (Layout shareRows); every service row draws its own scene; rows are 128 plates with h5 labels"
date: 2026-10-30
status: proposed
area: [layout, components, illustration]
source: "Owner (Devagya) round-5 notes, 30 Oct 2026: home why-tcules 'objectively ugly', paths 'still bad'"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (Layout shareRows, GatewayPaths, specialist-readiness)"
---

From 1024 the two paths of "Start where your product is" share lines: drawing, title and body, and
service rows each start level across both columns, built in the Layout primitive (`shareRows`, CSS
subgrid) rather than locally. Every service row draws its own scene: the Prototype Readiness Review now
has one (`specialist-readiness`), so no row shows an empty plate. Rows are 128 wide plates with h5
labels, so they read as services rather than a footnote list of links. Counts of 2 and 3 are fine once
the tops align.

**Why.** Owner round 5: the paths band 'still bad'; two columns must read level and rows as services.

**The mistake it prevents.** An empty dotted plate that reads as a broken image, bodies of different
length pushing the two row lists out of line, and rows set smaller than the body beside them.

**How to apply.** `GatewayPaths` passes `shareRows={3}` when every path has a visual; each path is a Layout of three children. Specimen: /design/layout, /design/kit/gateway G.P.
