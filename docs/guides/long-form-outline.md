# The long-form outline

How articles, case studies and podcasts get an "On this page" rail without a CMS change — what it
does, what it deliberately does not do, how to fix the underlying problem properly, and how to take
it out.

## The problem it works around

`TableOfContents` needs two things from a page: an ordered list of short labels, and an `id` on each
heading it points at. Five page families already hand it both, because their content model has
headings as **first-class records** — `AuditSection.heading` is `{ text, anchorId, navigationLabel? }`,
and the seam derives and de-duplicates the anchor.

Articles, case studies, podcasts and events do not. Their bodies are a flat list of blocks, and the
text blocks carry **one markdown string each**. A heading in there is `## Some words` — characters
in a blob, not a record. Nothing can link to it, and there is nowhere to author a short label for it.

Changing Strapi was off the table, so this works with what the blob already contains.

## How it works

Four small pieces. Each is additive; none rewrites anything that was already there.

**1 · The converter collects while it converts.** `sources/strapi/markdown.ts` is a markdown parser
this repo owns. It already recognises headings — it has to, to emit `<h2>`. It now optionally puts an
`id` on the ones it emits and pushes `{ label, anchorId }` onto a list as it goes. The parser is not
re-reading its own output; the heading is a token at that moment.

The collection is **opt-in**: pass a sink, get ids and a list; omit it and the function behaves
exactly as before. That is why the ~30 other places that convert markdown are untouched.

**2 · Level 2 only, and that is correctness rather than economy.** `TableOfContents` renders one
flat level. An outline holding both `h2`s and `h3`s would interleave sections with their own
sub-sections into one undifferentiated ladder — and the content genuinely mixes them: 12 of 16
articles and 12 of 17 case studies use both. So `h3` and below render as they always did, with no id
and no outline entry.

**3 · The mapper owns one sink per entry.** `blog.ts`, `case-study.ts`, `podcast.ts` and `event.ts`
create the list, pass it to every text block in reading order, and put the result on the view model
as `outline: PageOutlineEntry[]`. Because the list is filled as a *side effect* of mapping blocks,
the mapping is hoisted into a `const` above the returned object — reading it from a later key of the
same object literal would make the result depend on key order.

**4 · The route composes the shell.** Identical to `terms-of-use` and `privacy-policy`: map
`outline` to `TocItem[]`, and wrap the body in the two-column `Layout` from `TableOfContents.md` § 10.
Fewer than two entries renders no rail **and** no reserved track.

## Why the anchors are opaque

An anchor is `toc-1`, `toc-2` — the heading's position in the outline. Not a slug of its text. Three
reasons, and the third is the one that matters most:

- **Unique for free.** One counter per entry, so there is no de-duplication set to thread anywhere.
- **Survives editing.** Rewording a heading does not change its anchor.
- **It is nobody's URL.** No one hand-writes `#toc-4`, and the `toc-` prefix says out loud what it
  belongs to. Nothing outside this feature can come to depend on it, which is what makes the feature
  deletable.

The cost, stated plainly: **inserting a section shifts every anchor after it.** A link someone
shared last month may land one section off. That is an acceptable trade for anchors that are
explicitly not durable addresses — and it is the reason not to advertise them as such.

**Do not swap these for text slugs to gain SEO value without deciding to.** Readable anchors
(`#why-onboarding-matters`) would let search engines surface jump-links, but they become a public
contract that breaks whenever an editor rewords a heading — and the heading text here is the only
thing available to derive them from. That is a separate decision with a separate cost, not an
optimisation of this one.

## What it does not do

- **No SEO or deep-link value.** Opaque anchors are not useful to a search engine or a human.
- **No `navigationLabel`.** The label is the heading text. That happens to be fine — see the numbers
  below — but there is no way to author a shorter one, and no place to put it.
- **Rich-text bodies are not covered.** `ComponentSharedRichText` renders through
  `rich-text.ts`, which was left alone: live content uses zero of them (235 markdown blocks in
  articles, 146 in case studies, none rich text). If they ever appear, their headings simply will
  not be in the outline — a visible gap, not a silent break.
- **Events get no rail today.** All three have zero level-2 headings, so the floor of two is never
  met. Nothing is broken; there is just nothing to outline.

## Solving it from the root

Give these four families the shape the other five already have: sections as records.

```
BlogSection {
  id
  heading { text, anchorId, navigationLabel? }
  blocks
}
```

That is a Strapi content-type change plus migrating roughly 35 entries — authoring work, not a
code change. It fixes four things at once, and each is something this workaround cannot:

| | Today | With sections |
|---|---|---|
| Anchor | positional, shifts on insert | author-controlled, stable |
| Deep links / SEO | not viable | `#a-real-slug`, safe to publish |
| Short labels | none possible | `navigationLabel`, the field that exists for it |
| Mechanism | second path, markdown only | one path, all nine families |

The precedent is already on the record: `Figure.md` § 17 9a settled that **long-form bodies are a
block list, and an image never arrives inside a rich-text body string.** A heading you can link to,
label and mark as current is the same category as an image you can caption and size. When a thing
must be addressable, it stops living inside a body string.

Until then, this workaround is the honest version of "not yet": it delivers the rail, it does not
pretend to deliver the anchors.

## Removing it

Every change is additive, so removal is deletion. Nothing needs unwinding.

| Delete | Effect |
|---|---|
| `markdown.ts` — the `outline` parameter, `OutlineSink`, `BodyHeading`, `headingLabel`, and the `if (outline …)` branch | Converter is byte-identical to what it was. No ids emitted |
| 4 mappers — the `outline` const, the sink argument, the `outline` key | Blocks map exactly as before |
| `types.ts` — `PageOutlineEntry`, and `outline` on the four page types (plus the `index.ts` re-export) | View models return to their previous shape |
| 4 routes — the `outline` / `hasOutline` bindings, the shell `Layout`, the `TableOfContents` import | Single-column body, as before |

Order matters only in that TypeScript will name every remaining reference once the type is gone, so
delete the type last and let the compiler drive.

**What breaks:** nothing internal. Externally, any `#toc-N` link someone saved stops resolving —
which is the risk the opaque scheme was chosen to keep small, and the reason these anchors are not
in any sitemap.

If the root fix lands instead, the same deletion applies and the routes switch to reading
`section.heading` — the audit route is the worked example.

## The numbers, and where they came from

Measured against the live Strapi GraphQL endpoint, not the old repo's corpus. Level-2 headings only,
which is what actually renders.

| Family | Entries | h2 per page (median) | Label chars (median) | Over 40 chars | Below the floor of 2 |
|---|---|---|---|---|---|
| articles / guides / videos | 16 | 5 | 30 | 16 / 82 | 0 |
| case studies | 17 | 6 | 20 | 16 / 93 | 0 |
| podcasts | 2 | 5 | — | — | 0 |
| events | 3 | 0 | — | — | 3 |

The component warns above 40 characters and clamps to two lines, so roughly one entry in five on an
article wraps. That is the reason this was worth shipping: the labels were already navigation
labels. **An earlier read of the old repo's corpus said case-study headings ran to a median of 44
with more than half over 40, and concluded the rail would be unreadable. The live content says 20.**
Measure the source, not a copy of it.

## Two things for content, not code

- **Six article headings carry their own numbering** — `1. User Research and Segmentation`. The rail
  generates its own ordinals, so those read as "01  1. User Research". Fixing it in the CMS is
  better than stripping digits at the seam, which would also eat a heading that legitimately starts
  with a year or a version.
- **One case-study heading is 187 characters** — a paragraph marked as a heading. It clamps and logs
  a development warning. It should be fixed where it was written.
