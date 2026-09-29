# Content changes — for Devagya

Added to as the components find them (tracker 0.5): places where the copy or its structure needs
to change so a component can do its job. This covers lengths that break a layout, a field a section
needs but the copy doesn't have, and items that don't form a set.

Each entry: **page / section** · **what's needed** · **why** · **found in** (task or component).

---

## 2. Case-study cards: client out of the title, one-line description

**Page / section.** `/case-studies` (every card), and anywhere a case study appears as a card.

**What's needed.** For every case study:
- Fill the new **client** field (strapi-changes §13) with the client's name only.
- Take the client out of the **title** where it leads it ("ConnectX: Building Energy Management…" →
  "Building energy management as a 0 to 1 AI product").
- Keep the **description** to **8–15 words**, one sentence. Most are 15–17 words today, and three are
  about 40.
- Titles should aim for the Copy × UI card-title range (2–8 words). The live ones run 37–87 characters.
  The card now holds an 87-character title in three balanced lines, so this is about scanning, not a
  broken layout.

**Why.** The card shows client, title, one line and the categories. When the client sits inside the
title, half the cards name it and half don't. A description longer than one line was the largest block
on the card and repeated the title.

- **Categories** no longer show on the card once the client is filled in: one label line per card.

**Worked example.** `/design/case-study-index` shows the live index with this copy applied to every
entry (`src/content/sources/fixtures/ideal/case-study-listing.ts`). That copy is illustrative, and the
client names in it were read from titles, slugs and cover filenames, so they need confirming.

**Found in.** BlockCard revision, 29 Sep 2026.

## 3. Six service pages: re-cut copy and new copy to approve

**Page / section.** All six service lines. Each section's changes are listed in
`docs/service-pages-design.md` §4.

**What's needed.** Approve, rewrite or reject every item marked **NEW COPY** there. The largest are the
AI Product UX model-role rows (four of seven "what the product needs" cells, and every "introduces"
cell, are new), the Software Development router conditions, and the case titles on every page. The
re-cut copy (tightened leads, split lists) needs a lighter read. Added 30 Sep: every resources
card's one-line description, and each close's two steps (the second step's detail is new copy).

**Why.** The designed pages give each block a job, and some jobs need words the CMS never held: a
condition for each route, a title that says what a case shows *on this page*, a short line under each
stage. The pages were designed against realistic copy rather than waiting for it.

**Found in.** Service pages designed from content, 29 Sep 2026.
