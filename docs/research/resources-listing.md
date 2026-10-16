# Resource and archive listing pages: what the good ones do

Research for the `/insights` feed band ("Tcules resources"), 13 Oct 2026. The owner asked for examples
of really well-done listing pages, especially how they handle the ARCHIVE (everything, browsable)
after any editorial top. Pages were read on 13 Oct 2026 with WebFetch; where a page would not load,
that is said. Layout details inferred from a page's markup are marked *(inferred)*.

## Per-site notes

### Editorial

**Nielsen Norman Group, Articles & Videos** — <https://www.nngroup.com/articles/>
- Archive: one column, one reverse-chronological stream mixing articles, videos and study guides.
  No date headers; the type label is the only differentiator.
- Item: linked title, then a meta line (date · type · "8 minutes to read" / "3 minute video"), then
  one or two sentences. Articles carry NO image; videos carry a thumbnail with a play mark. About
  four to five lines per item.
- Filtering: four text links (Most recent, Most popular, Videos only, Articles only), URL-driven.
  Topics are a separate list, collapsed to twelve with "See all topics". Search lives in the header.
- Pagination: numbered pages, `?page=N`, ten per page.
- Why it browses well: one anatomy, read once; the meta line answers "what is it and how long".

**Smashing Magazine, Articles** — <https://www.smashingmagazine.com/articles/>
- Archive: one column, full-width entries between rules, reverse-chronological. No date headers.
- Item: author and photo, large title, reading time and comments, a short excerpt with the date
  inline, optional topic tags, "Read more".
- Filtering: topics as plain text lists (a short "hidden gems" row, a long list at the foot). No
  faceted filters. Header search. States the total: "2274 articles".
- Pagination: numbered, with Next.
- Why: text-led, generous spacing, a visible total.

**The Verge** (could not be fetched; read through Nieman Lab, Axios and an analysis at
<https://theunshut.javipas.com/2022/09/14/the-verge-redesign-an-analysis/>)
- The 2016 "river" was a reverse-chronological feed under the hero with bigger treatment for major
  pieces. The 2022 Storystream mixes article headlines, short blurbs, featured image blocks,
  category blocks and embeds in one feed.
- What critics faulted: a weak hierarchy. Featured, small-headline and embed shapes alternate
  left and right, so the eye cannot tell what matters, and desktop browsing "zig-zags".
- Lesson: keep the front page's mix of shapes, but not in the archive. An archive needs one anatomy.

### Product and design companies

**Stripe, Blog** — <https://stripe.com/blog>
- No separate hero: the newest posts open the stream in the same format as the archive.
- Item: category label, large title, full date, author with headshot and role, a large image, a
  one- to two-sentence summary, "Read more". Low density.
- Filtering: one plain text row (All, Corporate, Engineering, Industry, Product). No search.
- A denser text-only "Recent highlights" module lower on the page. Pagination by link (`/blog/page/1`).
- Why: one consistent card, and a single row of categories.

**Linear, Now** — <https://linear.app/blog>
- Header: a row of category tabs (All, Changelog, Product launches, From the team…) and a
  full-width search field.
- Density falls down the page: image cards, then a compact changelog (title, one line, date), then a
  dense text archive of title, author and date.
- Changelog-style grouping by date. Pagination: "Load more".
- Why: the density gradient, and categories as one row.

**Vercel, Blog** — <https://vercel.com/blog>
- No featured block. "Total posts: 613", then one flat reverse-chronological run.
- Item: title, date, optional category label, a one- to three-sentence summary. Text-only
  *(inferred)*.
- Why: a stated total and a lean, consistent anatomy.

**Figma, Blog** — <https://www.figma.com/blog/>
- An editorial top (a lead story, a carousel, themed sections), then an archive labelled "The latest"
  with "12 results".
- Archive item: a horizontal row with a thumbnail on SOME items, title, date, byline, short deck and
  two to five tags. Moderate density. "See everything" leads to the full archive.
- Categories and topics are link lists, not on-page controls.
- Why: editorial top, then a calm archive of rows. Images appear where they exist, not forced on
  every row.

**Intercom, Blog** — <https://www.intercom.com/blog/>
- One featured post with a larger image and the only excerpt, then about 20 rows.
- Row: thumbnail, category label, authors, date, title, "Read more". No excerpts. Fairly dense.
- Why: one featured item, then a uniform list.

**Atlassian, Work Life** — <https://www.atlassian.com/blog>
- An airy featured set of four (wide images, sparse text), then "Latest by topic": a horizontal topic
  row ("All", "AI at work", "Leadership"…) above a single-column feed.
- Item: medium thumbnail, a label line (type · topic · app), heading, one- to three-line deck.
- Filters combine through URL parameters. Pagination: "Load more". Density increases down the page.
- Why: a topic row directly above the feed it filters, held in the URL.

**Webflow, Blog** — <https://webflow.com/blog>: could not be fetched (header overflow).

### Studios and consultancies

**Pentagram, News** — <https://www.pentagram.com/news>
- Category tabs above one reverse-chronological feed (All news, Work, Preview, Events,
  Publications, Press, Commentary).
- The deep taxonomy (disciplines, services) lives in a search overlay and takes no space on the
  listing.
- Item: image, a one-line meta row (category · date), a large title, sometimes one line of
  description. High density.
- Upcoming events sit in a separate compact block with date ranges and places.
- Pagination: "Load more" (about 30 items a load).
- Why: format as tabs, everything else out of the way until asked for.

**Thoughtworks, Insights** — <https://www.thoughtworks.com/insights>
- A small "What's new" stack (format label, title, summary), then topics as a long link list, then
  a single row of content-type links (Articles, Blogs, Reports, Podcasts…). These lead to separate
  format pages rather than filtering in place.
- Why: format as the primary way in.

**IDEO, Thinking** — <https://www.ideo.com/journal>
- Featured stories (three large image cards), then "Latest" cards: image, title, dek, one meta tag
  (type or reading time).
- No filters. "Load more Thinking" is a link to `?page=2`, so it works without script.

**Work & Co** (<https://www.workandco.com/news>, TLS error) and **Instrument**
(<https://instrument.com/news>, 404) could not be read.

## Patterns that recur in the best ones

1. **One stream, one anatomy.** After any editorial top, the archive is a single reverse-chronological
   stream where every item has the same parts in the same order (NN/g, Vercel, Pentagram, Intercom,
   Smashing). Mixing shapes in the archive is what The Verge's Storystream was faulted for.
2. **A meta line that answers "what and how long".** Type · date · length sits next to the title
   (NN/g's "Article · 8 minutes to read", Pentagram's "Work · Oct 12", Atlassian's label line). It is
   the most scanned part of a row.
3. **Format first, as one row; the deep taxonomy out of the way.** Categories or formats are a single
   horizontal row directly above the feed (Linear, Pentagram, Stripe, Atlassian, NN/g). Disciplines,
   topics and authors are collapsed, overlaid or moved to their own pages (Pentagram's overlay, NN/g's
   "See all topics", Figma's link lists).
4. **Images only where they exist.** Thumbnails appear on the items that have one (Figma, NN/g's
   videos). Text-led archives (NN/g, Vercel, Smashing) are not ashamed of it. No archive here pads
   rows with stock images.
5. **A stated total.** "2274 articles", "Total posts: 613", "12 results". The reader knows how big the
   archive is and what a filter did to it.
6. **Density rises down the page.** An airy editorial top, then a calmer and denser archive (Linear,
   Atlassian, Figma, Stripe's "Recent highlights").
7. **Pagination that is a link.** Numbered pages (`?page=N`: NN/g, Smashing) or a "Load more" that is
   a link to the next page (IDEO, Pentagram). Both work without script and can be shared.
8. **Date as structure, sparingly.** Most archives keep dates inline. Changelogs (Linear) group by date,
   which helps when items cluster on the same days.

## What we adopt, mapped to our content

The material: 46 live items in five to seven formats, a three-group taxonomy (Industry, Product,
Topic), covers on about a third of the items, many of them published on the same few days.

- **One anatomy for the whole archive** (patterns 1–2). Each row is a ListCard: a meta eyebrow
  (format · day · length; an event shows its own date and place), the title, then its line under it
  at the reading measure. The previous river mixed features, pairs and rows. That variety belongs to
  the bands above, which the owner has already approved, not to the archive.
- **A month ledger** (pattern 8, Linear). Our items cluster heavily: 20 on 7 Oct, 5 on 13 Oct. So the
  month stands in a left column that holds while its rows scroll. Date becomes a place on the page,
  and the row's meta line only needs the day.
- **Images where they exist, at the row's end** (pattern 4, Figma). An item's own cover or the scene
  drawn for it closes its row. No stand-in photographs in the archive, and no generic graphics. An
  end image keeps every title on one edge whether or not a row has one, and it is hidden on a phone,
  where it would squeeze the copy.
- **Format first, the taxonomy behind "More filters"** (pattern 3). This is already ruled and is
  kept: the format line with counts, plus one disclosure with only the options that have results.
- **A stated total and a pager that is a link** (patterns 5 and 7). "46 pieces · newest first" sits
  under the filter row. "12 of 46 shown · Show more" closes the list, as a link to the next page.

**Rejected:**
- Numbered pages: at 46 items, two to four pages, the count plus "Show more" is enough.
- A grid of cards for the archive: a grid of mostly coverless items is a grid of empty frames or
  stock photographs.
- In-page search: the owner ruled it out, and 46 items do not need it.
- Sort controls: newest first is the ruled default, and "popular" has no data.
- Date headers as full-width bands: they would repeat the bands' scale; the ledger column is quieter.
