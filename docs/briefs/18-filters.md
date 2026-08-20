# Brief 18 — Filters

| | |
|---|---|
| Inventory | #18 Filters — ~4 routes, **parked** |
| Proposed | `Filters` · tier 2 pattern · prefix unassigned |
| Launch scope | **none** |
| Order | last, and only after the prerequisite below |

## There is no brief, and writing one would be the mistake

**Nothing in the 129 files carries a topic, tag, category, sector or discipline field.** Not one.
There is nothing to filter on.

The only groupable dimensions that exist are page type — article, guide, podcast, video, research,
case study, term — and route family. And the index pages list **2 to 15 hand-picked items each**:
`/case-studies` lists 8, `/insights` lists 4, `/glossary` lists none. Those are curated selections,
not collections waiting to be filtered.

The sitemap does define eight topic hubs under `/insights/topics/` — but it calls them *"curated
editorial pages, not automatic tag archives."* **Topics are destinations, not filter values.** Reading
them as a taxonomy is the single most likely wrong turn here, and it is wrong in an expensive
direction: it would produce a filter control, a URL-state contract and an empty-results state, all
serving a dimension the content does not have. Eight of the topic hubs also have no content file yet.

## The prerequisite

**Defining the taxonomy is content work, not design work.** Until it exists, this component cannot be
specified at all — which is why it is last on the build order and the only item on the sheet whose
prerequisite sits outside the design system.

What has to exist first, in order:

1. **A taxonomy.** Which dimension, with which values, on which content types. One dimension with
   real values beats three aspirational ones.
2. **Collections rather than curated lists.** A filter over a hand-picked list of 8 is a control with
   nothing to do. `/glossary` listing zero items is the clearest signal that these routes are not yet
   collections.
3. **Which routes.** Realistically `/insights`, `/glossary` and `/case-studies` — three or four in
   total.
4. **Pagination, decided with it.** Same routes, same decision, and a filter without pagination
   changes meaning as soon as a collection grows.

## When the prerequisite clears

The brief then answers, in this order: the taxonomy and its cardinality · the visual shape (a chip
row, a sidebar, a select, a toolbar above the results) · whether filter state lives in the URL · the
zero-results state · and whether filtering is client-side over a rendered list or a server round trip.
The last one is an engineering decision that changes the whole component, so it is settled before
anything is drawn.

**Do not send anything to Claude Design before step 1.** A spec written against a taxonomy that does
not exist produces a component built on a guess, which is precisely what the gate in
`/build-from-spec` exists to refuse.
