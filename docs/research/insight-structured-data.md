# Insight pages: structured data, answer engines and what each format needs

Research for the insight detail pages, 29 Oct 2026. Today every article, guide, research piece, video,
podcast, event, interview and case study renders the same shape (hero, body, related), and each route
prints whatever JSON-LD an editor pasted into Strapi's `seo.structuredData` (`codeJson` / `graphCode`),
or nothing. This file says, format by format, which schema.org type applies, what Google still rewards,
what answer engines (AEO/GEO) actually use, and what that means for the page design and the content
model. It is the input for design decisions, not a ruling: nothing here is decided until the owner logs
it with `/decide`.

Sources were read on 29 Oct 2026 and are listed at the end. Where a claim rests on secondary reporting
only, it says so.

## 1. What changed, and what it means for us

Four facts shape everything below:

1. **Google's rich results are shrinking.** HowTo went in 2023. Seven types (Course Info, Learning
   Video, Claim Review, Book Actions and others) were phased out in June 2025. **FAQ rich results
   stopped showing on 7 May 2026**, and the Rich Results Test and Search Console report went in June
   (this is reported by trade press citing Google's documentation; we did not find a Google blog post).
   The live gallery (updated 16 Oct 2026) still lists **Article, Breadcrumb, Event, Organization,
   Profile page, Video, Dataset, Q&A, Review snippet** among its 25 features. Those are the only types
   that earn anything visible for us.
2. **Google says AI Overviews and AI Mode need no special markup.** "There's also no special
   schema.org structured data that you need to add", and no "AI text files" (that rules out
   `llms.txt` as a Google lever). The one rule: structured data must match what the page visibly
   shows.
3. **Schema does not measurably raise AI citations.** Ahrefs tracked 1,885 pages that added JSON-LD
   (Aug 2025 to Mar 2026) against 4,000 controls: no significant lift on ChatGPT or AI Mode, and a
   small drop on AI Overviews. Cited pages do carry more schema, but that is correlation.
4. **What does raise citation is on the page, in words.** The GEO study (Princeton / Georgia Tech,
   KDD 2024) measured visibility gains from **citing sources (~40%)**, **adding statistics (~37%)** and
   **quoting named experts (~22%)**. A test reported by the same coverage found that ChatGPT, Claude,
   Gemini and Perplexity could not read a fact that existed only in JSON-LD.

**The consequence for design:** structured data is housekeeping. It makes us eligible for the rich
results that still exist and makes entities (Tcules, authors, clients, guests) unambiguous. The work
that moves AEO/GEO is **visible page structure**: a summary near the top, named and credentialed
people, dated facts with sources, transcripts, question-shaped headings. So every item below is
specified as a **page slot first** and markup second, and the markup is generated from the same
field, so they cannot disagree.

## 2. Site-wide, before any format

These are emitted once, not per format, and every format below links to them by `@id`.

| Item | Type | Where | Status today |
|---|---|---|---|
| The company | `Organization` (`@id` `…/#organization`): name, url, logo, `sameAs` (LinkedIn, Clutch, Dribbble, YouTube) | root layout | **missing** |
| The site | `WebSite` with `publisher` → organization | root layout | **missing** |
| Breadcrumbs | `BreadcrumbList`, from the same items `Breadcrumbs` renders | every detail route | **missing** (crumbs render, markup does not) |
| People | `Person` (`@id` per person): name, jobTitle, image, url, `sameAs` | the author's page | **missing**: no person or team page exists (`ROUTES.team` names `/team`, which has no route) |

**People are the gap with the most design consequence.** Google's author guidance asks that every
author have a `url` or `sameAs` that identifies them, and the GEO evidence rewards named, credentialed
experts. Today `BlogAuthor` is name, designation and image, and the page shows the name only. Three
levels, smallest first:

- **Floor:** author `sameAs` → LinkedIn, plus a visible byline with role and photo.
- **Better:** a short bio on the page (one sentence, "what this person has done").
- **Best:** a person page (`ProfilePage` with `mainEntity: Person`, a Google rich-result feature)
  listing everything they wrote, spoke at or were interviewed in. One page serves authors, podcast
  hosts, event speakers and guests, and becomes the `url` every format points at.

## 3. Format by format

Each block lists the **type**, what Google does with it, the **page slots** the design needs, and the
**fields** (✓ = in the view model today, ✗ = missing). Field names are the view model's
(`src/content/types.ts`).

### 3.1 Article

- **Type:** `Article` (or `BlogPosting`; either is fine). `publisher` → organization, `author` →
  Person(s), `mainEntityOfPage`.
- **Google:** Article is supported and has no required properties. Recommended: `headline`, `image`
  (16:9, 4:3 and 1:1), `datePublished`, `dateModified`, and `author` with a `url`. One entry per
  author, and the publisher never goes in `author`.
- **Page slots:**
  - byline with role and photo, linked to the person;
  - visible **published and updated dates**;
  - a **key takeaways** block (3–5 sentences) under the hero;
  - sources cited inline, with a references list at the end.
- **Fields:**
  - ✓ title, description, publishedAt, updatedAt, readingTime, featureImage, authors
  - ✗ author `url`/`sameAs`/bio
  - ✗ `takeaways[]`
  - ✗ `references[]` (or footnotes in the body)
  - ✗ crops at 4:3 and 1:1 (Strapi § 6 already derives widths; ratios are new)

### 3.2 Guide

- **Type:** `Article` (`HowTo` earns nothing since 2023, and marking a guide up as one would be
  invented intent). If the guide ends in common questions, it may carry `FAQPage`. That earns no
  Google result now, but it is harmless and other engines may read it.
- **Page slots:** everything from the article, plus:
  - an **in-page outline** (already via `TableOfContents`);
  - **question-shaped H2s** where the content allows;
  - an optional **FAQ** block at the end, with a visible question and a short answer.
- **Fields:**
  - ✗ `faq[]` (question, answer). The decision on whether guides carry one is open (§ 5).

### 3.3 Research

- **Type:** `Report` (a schema.org subtype of `Article`, so the Article result still applies). If we
  publish the underlying data, add a `Dataset` (a Google feature with its own search). Most likely we
  publish findings only, in which case the report alone is enough.
- **Page slots:** this is the format the GEO evidence favours most, because research is statistics
  with sources. It needs:
  - a **headline findings** block of stat plus sentence, each stat citable on its own;
  - **methodology** (who was asked, how many, when);
  - a **download** for the PDF, if one exists;
  - a **how to cite** line.
- **Fields:**
  - ✗ `findings[]` (value, unit, sentence)
  - ✗ `methodology` (sample size, period, method)
  - ✗ `download` (file)
  - ✗ the format itself: research has no entries yet, so Strapi § 20a (an explicit `format` enum) is
    a precondition

### 3.4 Video

- **Type:** `VideoObject` on the page where the video plays. If the video is the page, it is the main
  entity; otherwise it hangs off the Article as `video`.
- **Google:** Video is supported.
  - **Required:** `name`, `thumbnailUrl` and `uploadDate`.
  - **Recommended:** `contentUrl` or `embedUrl`, `duration` and `description`.
  - **Key moments:** a `Clip` for each chapter (name, `startOffset`, deep-link `url` with `?t=`),
    which needs at least 30 seconds of video and deep-linkable playback. YouTube embeds deep-link, so
    we qualify.
  - The page must let the visitor watch. A page that only links out does not count.
- **Page slots:**
  - the player at the top;
  - **chapters** as a visible, clickable list (these are both the key moments and the outline);
  - a **transcript**, collapsed by default but in the HTML. This is the AEO lever: an LLM cannot
    watch the video, but it can read the transcript;
  - **duration** and **date** in the meta row.
- **Fields:**
  - ✓ `heroVideo` (YouTube id and title), publishedAt
  - ✗ `duration` on the page (the hub card has it; the page model does not)
  - ✗ `chapters[]` (start in seconds, label)
  - ✗ `transcript`
  - ✗ thumbnail (it can be derived from the YouTube id)

### 3.5 Podcast

- **Type:** `PodcastEpisode`, `partOfSeries` → `PodcastSeries`, with `actor` / host and guests as
  Person. Because each episode has a YouTube recording (`heroVideo`), **also** a `VideoObject`.
- **Google:** **no podcast rich result exists** (Google Podcasts closed in 2024), so
  `PodcastEpisode` is entity housekeeping only. **The `VideoObject` is what earns something.** A
  podcast page gets video results and key moments exactly as a video page does.
- **Page slots:** everything from the video, plus:
  - a **guest card** (name, role, company, photo, LinkedIn). The guest is the reason anyone searches
    for an episode;
  - **episode number** within the series;
  - **listen elsewhere** links (Spotify, Apple) if we publish there;
  - **pull quotes** from the guest. These are named-expert quotations, the GEO lever, and they
    already fit the testimonial-voice treatment.
- **Fields:**
  - ✓ heroVideo, publishedAt, socialImage
  - ✗ `guests[]` (Person)
  - ✗ `hosts[]`
  - ✗ `episodeNumber`
  - ✗ `series`
  - ✗ `duration`, `chapters[]`, `transcript` (as for video)
  - ✗ `listenLinks[]`

### 3.6 Event

- **Type:** `Event`. Use `eventAttendanceMode` (online, offline or mixed), `eventStatus`, `location`
  (`Place` or `VirtualLocation`), `organizer` → organization, `performer` → speakers, and `offers`
  (free registration counts: price 0 plus a URL).
- **Google:** Event is supported, but it says **"Events must take place in a physical location"** and
  must be open to the public. **An online-only webinar earns no Google event result.** Mark it up
  anyway: schema.org supports `VirtualLocation`, and other engines read it. The `eventStatus` values
  are scheduled, cancelled, postponed and rescheduled.
- **An event page has two lives:**
  - **Before:** date, time with timezone, place, speakers, register.
  - **After:** the event becomes a recording, which is the video format. The page should switch its
    main block from "register" to "watch" and add a `VideoObject`, rather than keep advertising a
    past date.
- **Page slots:**
  - a **when / where / format** fact row;
  - a **speakers** row (Person cards);
  - a **register** action, before;
  - a **recording** and takeaways, after.
- **Fields:**
  - ✓ `details[]`, but as free text: location and date as strings, parsed from
    `eventWhereAbout.descTwo`
  - ✗ `startsAt` / `endsAt` as ISO datetimes with timezone (Strapi § 20b asked for `startsAt` and
    `location`; this adds `endsAt`)
  - ✗ `attendanceMode`
  - ✗ `status`
  - ✗ `speakers[]`
  - ✗ `registration` URL
  - ✗ `recording` (video)

### 3.7 Interview

- **Type:** `Article`, with `about` / `mentions` → the interviewee as Person (plus their organization
  if relevant). Google's `QAPage` is for user-generated Q&A (one question, community answers) and
  does not apply; nor does `FAQPage`.
- **Page slots:**
  - an **interviewee card** (as for the podcast guest);
  - the body as **visible question / answer pairs**, with each question a heading. That is the
    extractable shape answer engines lift;
  - pull quotes.
- **Fields:**
  - ✗ the page itself: interviews have a format path (`ROUTES.interviews`) and hub cards, but no
    detail view model of their own
  - ✗ `interviewee` (Person)
  - ✗ `qa[]` (question, answer), or the body's H2/H3 read as questions

### 3.8 Case study

- **Type:** `Article` (`about` → the client as `Organization`, `publisher` → Tcules), plus
  `BreadcrumbList`. There is no case-study type in schema.org that any engine rewards.
- **Google:** the Article result applies. **Do not mark up the client quote as a `Review` of Tcules.**
  Google treats reviews a business publishes about itself as self-serving and ineligible for review
  snippets. The quote stays a plain quotation
  (it still counts as a named-expert quote for GEO).
- **Page slots:**
  - the **client** named and linked, with their sector and stage;
  - **outcomes as stats with context** (value, what it measures, period). These are the most citable
    facts on the whole site;
  - the quote with a named person and role;
  - published and updated dates.
- **Fields:**
  - ✓ title, description, dates, heroImage, `profile[]` (label / value), statements, quote blocks
  - ✗ a typed `client` (Strapi § 13 is already asked)
  - ✗ `stage` (§ 21 is already asked)
  - ✗ `outcomes[]` (value, unit, label, period) as fields rather than prose

## 4. What all formats share

Every format should get the following by the same mechanism, so they belong to the template, not to
one route:

1. **JSON-LD generated in code from the view model**, one builder per format in `src/lib/`, replacing
   the pasted `seo.structuredData`. Pasted JSON drifts from the page, which breaks Google's one rule.
   It also means four editors hand-writing JSON in Strapi. Keep `structuredData` as an override for
   the rare special case only.
2. **A visible published date and updated date** on every page, matching `datePublished` and
   `dateModified`.
3. **A summary or takeaways block near the top.** It is the passage an answer engine quotes, and it
   is the same slot whatever the format: takeaways for an article, findings for research, "in this
   episode" for a podcast, outcomes for a case.
4. **People as linked entities** (§ 2), the same Person card shape for author, guest, speaker and
   interviewee.
5. **Breadcrumbs as markup** as well as on screen.
6. **Images in 16:9, 4:3 and 1:1**, as both Article and Event ask.

## 5. Open questions for design

- **Which formats need a template of their own, and which a variant?** The evidence suggests three
  shapes:
  - **read**: article, guide, research, interview;
  - **watch / listen**: video, podcast, past event;
  - **attend**: upcoming event.
  Case studies already have `CaseStory`. Research and interview are variants of *read* that add a
  findings block or Q&A body.
- **People pages:** do we build `/team/[person]` for launch, or ship the floor (LinkedIn `sameAs` and
  an on-page byline) and add pages after 6 Nov?
- **Transcripts:** do we have them for past podcasts and videos? YouTube's auto-captions are a
  starting point, but they need an edit before they go on the page.
- **Guides' FAQ:** worth the editorial effort now that Google shows nothing for it? It is defensible
  only where the questions are real ones readers ask.
- **Online events:** accept that they earn no Google event result (the markup still goes in), or
  treat them as video premieres instead?

## 6. Content model asks (for `docs/strapi-changes.md`, once the design settles)

These are drafted here and get logged as one entry when the page designs are picked, so the CMS is
asked for what the pages actually use:

- **Person:** a collection (name, role, company, photo, bio, LinkedIn, url). It is referenced by
  authors, hosts, guests, speakers and interviewees, replacing name strings.
- **Every format:**
  - `takeaways` (short list);
  - `updatedAt` shown;
  - `references` (optional).
- **Video and podcast:**
  - `duration` (seconds);
  - `chapters` (start, label);
  - `transcript` (rich text);
  - podcast also: `episodeNumber`, `series`, `listenLinks`.
- **Research:**
  - `findings` (value, unit, sentence);
  - `methodology`;
  - `download`.
- **Event:**
  - `startsAt` and `endsAt` (datetime with timezone);
  - `attendanceMode`;
  - `status`;
  - `location` (place or URL);
  - `registrationUrl`;
  - `speakers` → Person;
  - `recording` → video.
- **Interview:**
  - its own detail model;
  - `interviewee` → Person;
  - Q&A pairs.
- **Case study:**
  - `outcomes` (value, unit, label, period);
  - `client` (§ 13) and `stage` (§ 21) as already asked.

## Sources

- Google Search Central, [Structured data search gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) (updated 16 Oct 2026)
- Google Search Central, [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) (updated 10 Dec 2025)
- Google Search Central, [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article) (updated 8 Sep 2026)
- Google Search Central, [Video structured data](https://developers.google.com/search/docs/appearance/structured-data/video)
- Google Search Central, [Event structured data](https://developers.google.com/search/docs/appearance/structured-data/event) (updated 8 Sep 2026)
- Google Search Central blog, [Simplifying the search results page](https://developers.google.com/search/blog/2025/06/simplifying-search-results) (12 Jun 2025)
- Search Engine Land, [Google to no longer support FAQ rich results](https://searchengineland.com/google-to-no-longer-support-faq-rich-results-476957) (secondary; 2026)
- PPC Land, [Google kills FAQ rich results](https://ppc.land/google-kills-faq-rich-results-what-seos-saw-coming-since-2019/) (secondary; 2026)
- Ahrefs, [We tracked 1,885 pages adding schema. AI citations barely moved.](https://ahrefs.com/blog/schema-ai-citations/) (2026)
- Aggarwal et al., *GEO: Generative Engine Optimization*, KDD 2024 (Princeton / Georgia Tech): citation, statistics and quotation results
