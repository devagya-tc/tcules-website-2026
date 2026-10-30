# Treatment rules: what a section's content asks for

**Status:** living, started 29 Oct 2026 from the owner's reviews of the pages built on the 26 Oct copy.
The individual rulings are in `docs/decisions/` (each row names its entry). This file is the
generalisation: it turns those rulings into the questions a builder asks of any section, including one
nobody has designed yet, so the component map can decide "this needs flat graphics", "this needs an IRL
photo", "this needs a cleaner arrangement" without waiting for a review. Every review adds to it.

Read a section in this order: **what does its content do → what visual does that job → which
arrangement holds it → what it must never do.**

## 1 · The visual is decided by what the content IS

| The content is… | Its visual is… | Never | Rulings |
|---|---|---|---|
| **Evidence**: named clients, dates, durations, counts, a shipped outcome | the proof itself: client marks, the case's own cover, figures for the numbers | a decorative drawing standing in for proof | home-reasons-show-their-proof, studio-record-is-figures, why-tcules on every page (30 Oct) |
| **A problem with its named example** (hard parts) | the cited case's own cover beside the problem, one row each | a band-level image about one item; a ruled text 2×2 | hard-parts-example-is-the-proof (30 Oct) |
| **Stats** (a record line, "90 projects · 19 countries") | figures: number large, label small | a mono run-on line | studio-record-is-figures |
| **A rating** | the RatingBadge (14 text / 16 marks), its link and review count as the machine-readable name | text + link, "from 13 reviews" as visible text | rating-is-always-the-badge, rating-badge-text-14-marks-16 |
| **How something works**: engagement options, deliverables, a process, a mechanism | flat graphics (Sketch grammar); a drawn set's items each carry a title | isometric illustration | set-reasons-head-above-drawing-above, how-we-work-together-* |
| **An abstract claim with no evidence in its sentence** | isometric illustration (Reasons house style) | flat graphics (would read as a mechanism) | set-reasons-head-above-drawing-above |
| **A named service** (a set of services, a related service, a path's way in) | the service tile (texture + flat drawing), or a compact service row inside a path | an icon + name list, a mono link stack, plain "Our related service:" text | named-services-are-service-tiles, related-destination-is-a-card, paths-service-rows |
| **A way onward** (questions answered by links to other services, closing a set) | the CTA card: 2 columns of the last row (3 or 4 tracks chosen so two cells remain; the rest of the row at five; a whole row when the tiles fill theirs), a ground, no hairline or texture, every question and link, the first action outline then links; a linked closing statement with no question takes the title role | a text cell dropped into the grid, a solid tile that reads as one more item, a dashed onward cell | 2026-10-30-set-ends-in-a-cta-card (supersedes onward-cell) |
| **A named expertise** | an expertise card with the sector photo / product-type art | a text line | related-destination-is-a-card |
| **People, the studio, a place** | an IRL photograph (one grade, `--media-photo-grade`) | an illustration | brand imagery rulings |
| **An industry** | the sector photo (a client's user at a good moment) | a metaphor, a generic stock scene | sector photos ruling (26 Oct) |
| **A case study** | on home: the paper-deep horizontal CaseCard, alternating; elsewhere: the 3-column card grid; on /case-studies: per group one card-less horizontal card then the grid | the paper-deep card anywhere but home | home-selected-work-is-case-cards, paper-deep-is-for-case-cards, case-index-takes-the-finder |
| **Readable resources** (articles, podcasts) as a short set | ruled resource rows: format glyph + label, length, title, summary, arrow | a 2×2 grid of text cells | resource-rows-meta-format-then-length |
| **A choice of situations** (new vs established product) | each path its own drawing, its title as the hero, its ways in as service rows | 2–3 stacked buttons, one shared wide drawing, a container | paths-service-rows |
| **Testimonials** | 6+: the wall; under 6: the one-at-a-time slider, heading in eyebrow style, quote centred | quotes inside case cards | testimonials-under-six-turn-one-at-a-time |
| **A form** | the Island only: brandeis (default) or ink, with (default) or without the illustration | copy beside a white form panel on tint | forms-only-on-the-island |
| **A closing call to action** | the ink Island with the texture | a plain tint band | cta-band-is-an-ink-island |
| **A high-traffic page's hero** (home, about, contact, L1 services) | always an illustration or image (placeholder until the art lands) | a text-only hero | high-traffic-heroes-carry-media |

## 2 · Arrangement rules

- **Head above, items below**, full width. No head beside items (the `beside` arrangement is retired).
- **A head's end action is centred on the heading.** One action in the head; a second becomes the
  band's closing link.
- **Two actions = one row with a hierarchy:** a button (outline, quiet hover = secondary) then a link.
  Blue solid is the page's one main action.
- **Never two horizontal media rows side by side**: one per row, or the vertical card in a grid.
- **No lone tile on a row**: change the track count, or let the odd item take the full row.
- **No hairlines between Reasons items.** Card variants stay distinct.
- **What you get is four parts** (OfferParts; 2026-10-30-what-you-get-titled-terms-four-parts, proposed): the drawn deliverables in one row under "What you receive", then who does the work, what we need and where our part stops as three peers on the column seam (64), each an h3 at one role over a 16:9 visual (the studio photograph; a needs drawing; a stops drawing) and its words. One body role (14). No numbers, hairlines or containers. Never the terms as a text foot or as more items on the deliverables' tracks. Until a page's drawings exist the old sheet stands.
- **A bare label between the lead and the set** ('What you receive') is not rendered; the heading names the set. Except on What you get, where it titles the first of the four parts.
- **Never two text-heavy bands touching; never two tints touching.**
- **An image about one item belongs to that item**, never above the whole set.
- **The CTA card closes a tile set** (`Bento cta`): a cell of its own kind (the tile's radius, a ground, no hairline, no texture, no lift), two tracks of the last row, or every track it leaves, or a whole row when the tiles fill theirs; never a plain text cell.
- **A countdown indicator shows where a carousel is heading**: the old bar stays empty, the next is full from the first frame; a wrap never lights the bars it passes.
- **Outline hover lays the ghost's pale tint under it and firms the line**; press one tint deeper; never the blue solid fill.
- **Two actions = different jobs?** A way deeper (head end action) and an ask (its own ink island band, one solid to ROUTES.contact, labelled 'Start a project') are separated, not paired. Check order: the island touches no island or tint, and sits two bands above the enquiry island.
- **Engagement tiers**: options are the subject (plated flat drawings); terms that hold for every option are secondary, each led by its bare drawing at full drawing height, on the options' own tracks and gutter (two terms take columns 1–2), never hairline-ruled text.
- **Mixed evidence in one set** sits on one plate of one size, the title under its edge; text that is not a number is never an accent figure (a tenure is a wordmark over a mono label); a missing asset shows the labelled placeholder.
- **Peers with parts of different length share lines from 1024** (shareRows / subgrid).
- **Service rows** carry service weight (plate 128, h5 label) and each draws its own service's scene; a service's drawing is registered once by route.
- **A worked hypothetical** is a scenario: words beside one flat drawing of its own story, label in the mono legend voice.
- **A table of peer items** (levels, places, options) renders as drawn items, one drawing per row; a table read across rows stays a table. Router tables never drop a column.
- **A numbered method without its own drawing** sits beside its bound case capture, else the page's service drawing or a scenario drawing.
- **A drawing is reused only for an item arguing the same thing, never twice on one page.** Scene keys ignore trailing punctuation.
- **A cited case's picture is the case's own cover**, never a page binding matched by client name.
- **Rendering changes, words don't.** The owner decides presentation; the copy is not reworded.

## 3 · How to use it on a section nobody has designed

1. Name what the content does (evidence? mechanism? claim? destination? people?).
2. Take the visual from § 1. If none fits, it is a gap: list it, mock it, ask.
3. Arrange it with § 2. Squint: more than one idea down the page?
4. If a review overturns a row here, update the row and the ruling together.

## 4 · The four PD sections, redesigned in round 5 (owner, 30 Oct)

The four sections the owner marked on /services/product-design were redesigned in round 5 and their
rulings generalised into the tables above, so every service page maps the same way:
1. **The hard parts**: one row per problem, the cited case's own cover beside it. DONE.
2. **How we work together**: options plated (subject), terms as a lighter tier, the ask its own ink island. DONE.
3. **Why teams choose Tcules**: evidence shown as proof on one plate; the head's two links as outline + link. DONE.
4. **What you get**: four parts (OfferParts), round 6.

Also queued for the owner's redesign: /about, sections of /contact, the /services hub.

## 5 · Owner answers, 30 Oct (round 5)

- Deliverable titles on the other service pages are kept (short bold lead + the rest of the sentence).
- The "Why teams choose Tcules" outline button stays and /why-tcules gets built, after the service-page set is improved.
- Service pages keep both asks: the ink "Tell us what you're working on" island and the closing enquiry form (2026-10-30-service-pages-keep-both-asks).
- What you get foot: superseded by 2026-10-30-what-you-get-titled-terms-four-parts (four parts, round 6).

## 6 · Balancing the visual registers (owner, 30 Oct; logged)

1. **Scale decides first.** Flat graphics are item-scale (one per item, sets of 4+ concrete things: deliverables,
   services, engagement options). Isometric illustrations are band-scale (one per band, or one each for 2–4 peer
   claims). 2026-10-30-flat-for-items-illustration-for-ideas.
2. **Neighbouring bands never share a register** (flat · isometric · IRL photo · proof · figures).
   2026-10-30-adjacent-bands-change-visual-register.
3. **Content still picks the register** (§ 1). Revised rows:

| The content is… | Its visual is… | Never | Rulings |
|---|---|---|---|
| **Claims backed by examples** (hard parts) | an illustration per claim; the example as a citation (client mark + case name + link) | the cited case's cover as the claim's picture | claim-visual-depicts-the-claim |
| **A reason to choose us** | an isometric illustration of the reason; case links stay in the text | a case cover; a phrase lifted into a figure card | reasons-take-illustrations |
| **Options + terms that hold for all of them** | options as the subject; terms as one shared tier under the whole set | the terms as more items on the options' grid | options-and-shared-terms-are-two-tiers |
| **What you get** (deliverables · who works · what we need · where it stops) | four equal parts: flat deliverables, a studio photo, one drawing each for needs and the boundary | three parts as small print under the first | what-you-get-is-four-parts (proposed), what-you-get-titled-terms-four-parts (proposed) |
| **A tile set that closes with a routing line** | a 2-column mini CTA card holding all the content; 3 or 4 columns so it fills the last row | the line placed as plain text in a cell | set-ends-in-a-cta-card |
| **A service tile** | its drawing moves on hover; polished at zoom | a static or sloppy drawing | service-tile-drawing-moves-on-hover |
| **Any image in a card or row** | hairline + rounded corners (card-image-radius-8) | a bare rectangle | 2026-09-29-card-image-radius-8 |

The § 1 rows "Evidence" and "An abstract claim" are refined by these: evidence that SUPPORTS a claim is a
citation; only a band whose subject is the evidence (home's proof band, selected work) shows covers.
