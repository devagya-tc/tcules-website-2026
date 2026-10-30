---
title: "The studio's record is shown as figures, never as a mono line of facts"
date: 2026-10-29
status: active
area: [layout, proof, components]
source: "Owner second review, 29 Oct 2026 (feat/new-copy, /case-studies hero: \"we should show stats like stats?\")"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "structure (PageHero has no `record` prop; CorpusHero turns a record proof line into `stats` itself; src/lib/studio-record.ts is the one split)"
---

Wherever the copy sets the studio's record line ("Founded 2017 · More than 90 projects · Clients in 19
countries · Studio in Ahmedabad, India"), the page shows it as figures: the number large, what it counts
small under it (PageHero `stats`, one `Stat` each). Never as a run-on line of facts joined by middle
dots, mono or otherwise. The place is left out, as on home since round 2: three figures.

This supersedes the 16 Oct 2026 approval (beauty round 4, never logged as an entry) of a listing's
record as ONE mono line under the lede ("42 published · Latest 15 Oct 2026"). A listing's masthead now
sets its figures in the lede's column, a `stack` under the lede.

**Why.** The /case-studies hero printed "FOUNDED 2017 · MORE THAN 90 PROJECTS · …" as a mono run-on line
while every other hero set the same facts as figures. A number reads as a number only when it is set
as one.

**The mistake it prevents.** PageHero `record` (the masthead's mono line); a template that passes no
`stats` and so leaves the authored record line to print as a proof line; a page-by-page copy of the
fact-to-figure table that drifts.

**How to apply.** `src/lib/studio-record.ts` holds the one table (`recordFigures`, `isStudioRecord`).
CorpusHero reads the record from the hero's own proof lines when a template passes no `stats`, and never
prints it as a line. ListingIndex's hero takes `stats`; PageHero's `record` prop is removed and the
masthead renders `stats`. Specimen: /design/page-hero 9b.
