# Content proposals — `_pages` corpus

**Purpose.** Where the design and the copy disagree, the copy wins and the design adapts: the content
team sets the narrative, so nothing in `_pages/` is reworded, trimmed, paraphrased or reordered
during the build. Splitting a band into two sections and changing how an item is _shown_ (a table as
cards, a case list as case cards, "Related services" as chips) are design decisions and need no
proposal. A proposal is for the other kind of problem: content that pulls the design down because it
is too long, carries too much in one place, or has an awkward shape.

Each one is a suggestion for the content team. Nothing here has been applied.

**Fresh for the `_pages` corpus, 10 Oct 2026.** This file starts empty for this batch so earlier
suggestions do not pollute it. Do not write to `docs/content-changes.md` for this corpus.

## Entry format

Append one entry per problem, newest last.

```
### <page route> · <band id> · <short title>

- **Problem:** what the content does to the design, concretely (length, density, shape).
- **Proposal:** the specific change, in words the content team can act on.
- **Why:** what it buys, and what the design does in the meantime (the copy renders as written).
```

## Proposals

### P1 · six heroes · eyebrow · the eyebrow repeats the breadcrumb

- **Pages:** `/services/product-design` "Product Design services" (crumb "Product Design");
  `/audits/design-to-code-audit` "Design-to-Code Audit" (equals the last crumb);
  `/expertise/healthtech` "Expertise · HealthTech product design" (crumbs "Expertise", "HealthTech");
  `/case-studies` "Case studies" (equals the crumb); `/glossary/design-system` "Glossary · Design
  System" (both crumbs); `/about` "About Tcules" (crumb "About").
- **Problem:** the trail now sits inside the hero, 32px above the eyebrow, so these lines say the
  same words twice in the first viewport. That repetition is the cause the owner named on 5 Oct for
  the breadcrumb reading as "an island". It renders as written, and PageHero warns in development.
- **Proposal:** give each eyebrow something the trail cannot say: a format, a proof point or a
  category ("Fixed-scope audit · 2–3 weeks", "For SaaS and complex software"). Or drop the line;
  the trail already names the page.
- **Why:** the eyebrow is a free content slot (owner, 5 Oct). Used for new information, it earns
  its 38px. Echoing the crumb, it costs that height on every one of these pages.
- **Updated 11 Oct 2026 (owner, product-design round 6): "lets not put anything in the eyebrow
  since the breadcrumb already tells the page location."** Decided for every page with a breadcrumb,
  not only these six: PageHero renders NO text eyebrow when the hero carries a trail, so the
  breadcrumb is the only line above the title. Applied at the component, so the Benchmark case
  ("Case study · Benchmark Gensuite"), the tool, the CPQ article and every future page take it
  without an edit. Home has no trail and keeps its eyebrow. **Proposal now:** delete the `*…*`
  eyebrow line from every corpus hero that has a `navigation.breadcrumb` of two or more crumbs; until
  then the line stays in the files and is not rendered (an authored line that is dropped, recorded
  here so nobody looks for it).

### P2 · seven heroes · hero · titles longer than three lines at display size

- **Pages and lengths:** `/services/product-design` 71 characters; `/audits/design-to-code-audit`
  62; `/expertise/healthtech` 74; `/case-studies` 61; `/case-studies/benchmark-gensuite-…` 55;
  `/tools/design-system-drift-checker` 55; `/about` 126 (a full sentence).
- **Problem:** the hero title is set at the display role in a 572px column, which holds about 48
  characters on three balanced lines (visual-direction § 1.5). These run to four or five lines,
  and About's to six. Beside an illustration the hero then ends below the 830px fold, so the first
  scroll never reaches the page's first band. The pages render the titles as written.
- **Proposal:** keep each visitor-facing hero title to 48 characters or fewer, a sentence rather
  than a slogan. Move the qualifier into the lede, for example "however complex it gets" on Product
  Design or the Ahmedabad clause on About. The insights title is an SEO page and is not included.
- **Why:** a three-line title is what lets the hero, the lede, the ask and the image all sit in
  the first viewport.

### P3 · seven heroes · hero · ledes over the 26-word hero budget

- **Pages and lengths:** `/` 33 words; `/services/product-design` 32; `/audits/design-to-code-audit`
  31; `/expertise/healthtech` 54; `/case-studies` 32; `/tools/design-system-drift-checker` 49 + 29
  (two paragraphs); `/glossary/design-system` 49 (the definition).
- **Problem:** the hero lede is set at 18–20px. More than three lines pushes the ask down and the
  hero past the fold, and HealthTech's 54 words run to six lines. The ledes render as written.
- **Proposal:** one paragraph of 26 words or fewer per hero. The rest moves to the first band's
  lead, where the page already makes the same point (HealthTech's last two sentences fit
  `hard-parts`; the Drift Checker's "You leave with…" fits `how-to-use-it`).
- **Why:** the lede is read in full only when it is short. The first band can carry the detail at
  body size.

### P4 · `/` · product-situations · card bodies too long for a six-card set

- **Problem:** six situations, each a card with a title, a 15–27-word body and its destination
  link. A six-card set budgets 14 words per body, so two lines. At these lengths the cards run four
  to five lines and the 3 × 2 set ends about 130px below the fold. The copy renders as written.
- **Proposal:** cut each body to 14 words or fewer. For example: "Got an idea, or an AI-built
  prototype? We design a first release customers can rely on, and build it."
- **Why:** a router is scanned for "which one is me", so short conditions are what make it work,
  and the whole set then fits one screen.

### P5 · `/` · capabilities · one entry is four times the length of the others

- **Problem:** five service lines are 5–12 words. Software Development is 40 words and carries a
  GT Tools case sentence. In a two-column list it is the one row three times taller than its
  neighbours, and the case is cited in a band about services rather than in "Selected work".
- **Proposal:** trim Software Development to one sentence like the others. Move the GT Tools
  sentence to `selected-work` as a case, or drop it.
- **Why:** the rows read as a set only when they are the same weight. The GT Tools proof is
  stronger next to the other cases.

### P6 · `/` · client-voices · quotes over length, and speakers repeated from Selected work

- **Problem:** the band is a one-up testimonial slider at quote size, budgeted at 35 words. The
  CuramCare quote is 42 words and the second Eden AI quote 47, which run past the slide's height.
  Stephanie Leue (Doodle) and Samy Melaine (Eden AI) are also quoted in `selected-work` three
  bands earlier, so the page shows the same two people twice. The quotes render as written.
- **Proposal:** keep each quote to 35 words or fewer. Use six different speakers across the page,
  or drop the second Doodle and Eden quotes from this band; four quotes make a full slider.
- **Why:** a testimonial band persuades through the range of voices. A repeated name reads as a
  short list.

### P7 · `/` · why-tcules · four reasons and three quotes in one band

- **Problem:** 211 words: four reasons, three of them with their own client quote, plus a link.
  That is two bands' worth. The design splits it into two consecutive media splits (reasons 1–2,
  then 3–4), which keeps every word but puts three quotes on the page directly before a
  quotes-only band.
- **Proposal:** keep one quote with the reasons, the one that proves the strongest reason. Move the
  other two to `client-voices`, or cut them.
- **Why:** the reasons would fit one band, and the page would have one place for testimonials
  instead of two adjacent ones.

### P8 · `/services/product-design` · complex-products · case bodies too long for four cards

- **Problem:** four case cards with 17–33-word bodies, against a four-card budget of 12 words. Then
  the Auxentios quote. Cards and quote together run about 300px past the fold, so the design
  splits the quote into its own band.
- **Proposal:** bodies of 12 words or fewer ("Staffing software: onboarding, shortlisting and jobs
  around one connected model."). Or show three cases.
- **Why:** with short bodies the four covers carry the band, and the quote can stay with them.

### P9 · `/audits/design-to-code-audit` · proof · one case is four times the length of the others

- **Problem:** Benchmark Gensuite takes two paragraphs (60 words) where GT Tools takes 40 and Eden AI
  14. As three cards in a row, Benchmark's card is twice the height of Eden's, and the row ends
  about 140px below the fold.
- **Proposal:** one paragraph of 20–25 words per case. Benchmark's "one engineer spotted a build
  problem" sentence is the strongest part, so keep that.
- **Why:** three equal cards read as three pieces of evidence. One long card reads as the real case
  plus two footnotes.

### P10 · `/expertise/healthtech` · approach · five principles at 25–35 words each

- **Problem:** 162 words in five principles. The longest bodies (27 and 32 words) do not fit any
  read-down or tile budget, so the band runs past the fold even as a two-column list. The design
  splits it: two principles beside a photograph, then three as text cards.
- **Proposal:** 15–20 words per principle, or four principles.
- **Why:** one band with the photograph would carry the whole approach and match the other
  expertise pages.

### P11 · `/case-studies/benchmark-gensuite-…` · hero · three paragraphs before the first band

- **Problem:** the hero carries three paragraphs (45, 38 and 21 words) under the title. The design
  keeps the first two in the hero and splits the third, the technical-leadership line, into a
  statement band.
- **Proposal:** a one-paragraph hero lede of 26 words or fewer. Move "The hard part was protecting
  how people already worked…" into `the-opportunity-…`. Mark the leadership line as a pull quote
  with its attribution.
- **Why:** the hero is read in a glance. The thesis and the client's principle are stronger as the
  first beats of the story.

### P12 · `/case-studies/benchmark-gensuite-…` · where-the-work-stands · the second paragraph restates the first

- **Problem:** paragraph 2 ("Benchmark had a shared component direction and working prototypes
  its engineers could inspect before broader implementation…") repeats paragraph 1's result in
  near-identical words.
- **Proposal:** cut paragraph 2, or replace it with what happened next (the continuing delivery the
  heading promises).
- **Why:** the repetition reads as filler in the case's outcome section, where every sentence
  should carry evidence.

### P13 · `/tools/design-system-drift-checker` · reading-your-results · four jobs in one band

- **Problem:** 220 words: the definition of "unknown", a worked example in two paragraphs, a
  recommendation and a four-row table. The design splits it into a head with the worked example as
  a note, then the table as its own band.
- **Proposal:** give the worked example its own heading and band id (for example
  `worked-example`), so the results band is the definition and the table.
- **Why:** the worked example is what makes the tool understandable. With its own band it can
  later take an illustration of the two multi-selects.

### P14 · `/glossary/design-system` · hero · the definition carries a second field inline

- **Problem:** the definition paragraph runs into "When it matters: The term earns precision
  when…", a labelled field written mid-paragraph. Four more paragraphs follow before the first
  heading. The design keeps the definition in the hero, makes "The boundary…" a statement and puts
  the rest in a head-less section.
- **Proposal:** split "When it matters" into its own line or field. Give the explanatory paragraphs
  a heading (for example "What a design system includes") so they enter the page outline.
- **Why:** a definition page is read for the one sentence. A labelled field glued to it blurs it,
  and a head-less section is invisible to the table of contents and to search.

### P15 · `/case-studies` · hero · the action competes with the index

- **Problem:** the hero's action "Tell us about your product" renders as the page's blue solid, so
  the first action a visitor sees asks them to leave the cases. The index template was built
  without a hero action for this reason (29 Sep). It renders as written.
- **Proposal:** drop the hero action. The enquiry close at the end of the page carries the same
  ask.
- **Why:** the index's job is to get a case read. The ask belongs after the evidence.

### P16 · `/case-studies` · designed-and-built · a group of one

- **Problem:** "Designed and built" holds one case (The Wandering Raven) and a quote, while the other groups
  hold three to five. GT Tools is also designed and built, but sits only in `featured`.
- **Proposal:** add a second designed-and-built case (GT Tools or CuramCare once it publishes), or
  fold the group into another band.
- **Why:** a group of one reads as a leftover. Two cases make the category a real claim.

### P17 · `/about` · page · too many bands for one page

- **Problem:** 14 authored bands and about 2,300 words, plus a four-paragraph hero (122 words). The
  design adds three splits so each band holds the fold, which makes 17 bands against the 8–12 the
  kit allows.
- **Where the weight is:**
  - `difference`: five items, 306 words;
  - `how-we-work`: five items, 239 words (set as an accordion);
  - `frequently-asked-questions`: nine questions, 535 words, where an FAQ band holds seven closed
    items at most;
  - the AI theme is made three times: `the-practice-keeps-moving`, `difference` item 5 and FAQ 6.
- **Proposal:**
  - merge `the-practice-keeps-moving` into `difference`;
  - move the two hiring questions (FAQ 8–9) to `/careers`;
  - cut `difference` and `how-we-work` to three or four items each;
  - make the hero lede one paragraph, with the founding facts in the first band.
- **Why:** About is visitor-facing. At 12 bands or fewer the page keeps its studio, people and
  proof moments without a long run of argued text between them.

### P18 · several pages · run-in labels · bodies that start mid-sentence

- **Pages and bands:** `/audits/design-to-code-audit` `deliverables` ("**Every difference we
  found,** shown against…"); `/about` `who-we-work-with` ("**Growth-stage and post-PMF SaaS teams**
  dealing with…") and `work-you-can-inspect` ("[Doodle] shows research changing…");
  `/services/product-design` `specialist-capabilities` ("[UX Research]: find out how people…").
- **Problem:** each item is one sentence with its opening words in bold. When the page shows the
  items as tiles or cards, the bold run becomes the title and the rest becomes the body. So titles
  end in a comma or in nothing, and bodies start lower-case mid-sentence. The pages render them
  exactly like that (mapping § 0 rule 1), because capitalising or completing the sentences would
  change the copy. On a card the result reads as a sentence broken across two lines.
- **Proposal:** write these items as a short title plus a full sentence, as the other labelled
  sets in the corpus already do ("**A fix plan.** Ordered by what users feel most."). For the link
  lists, put the name in the title and start the body with a capital ("Doodle. Research changed
  the underlying product model…").
- **Why:** the sets would then match every other card and tile set on the site. A run-in reads
  well in a paragraph but not split across a card.

### P19 · `/about` · careers · a second ask after the close

- **Problem:** `work-with-tcules` is the page's close (the enquiry ask, on tint), and `careers`
  follows it. The kit's rule is that the close is the page's last band, so the end reads as an
  ending (visual-direction § 1.7). Here the reader meets the ask, then a second, unrelated ask
  before the footer. The page renders it as written: careers is a paper banner with a link, never a
  second solid.
- **Proposal:** move `careers` above `work-with-tcules`, for example after `what-remains-constant`.
  Or fold its link into the FAQ's hiring answer, which already links to `/careers`.
- **Why:** one ending per page. The careers link stays one scroll away, and the footer already
  carries Careers.

### P20 · `/services/product-design` · worked-example · a story of three paragraphs beside a product shot

- **Problem:** the band is "Example: Dealpath": three labelled paragraphs (The problem, What we did,
  The result; 29, 45 and 28 words) and the case link, beside the Dealpath artefact. Set as a media
  split (copy 667, photo 477) it measures **900** at 1470 against the 830 fold, and **1301** on a
  phone. The paragraphs are long for rows: each runs three to four lines at the body measure, and the
  rows, their rules and the link make the copy column taller than the photograph it sits beside.
  The page renders them as written.
- **Proposal:** write the three as one line each, the way the page's other labelled sets are
  written ("**The problem.** Add to pipeline always started a new deal."), and leave the detail to
  the Dealpath case, which the link already opens. Or keep the length and move "What we did" into
  the case page, leaving the problem and the result here.
- **Why:** the band's job on a service page is to show that the work happened and where to read it.
  Three short lines fit the fold beside the artefact; the full story is one click away.

### P21 · `/expertise/healthtech` · proof · a case story and a 43-word quote in one split

- **Problem:** the CuramCare story is a heading, two paragraphs (40 and 18 words) and a 43-word
  client quote, set beside a product shot. The copy column runs taller than the shot, so the band
  measures **857** at 1470 against 830. The quote is set at the compact role, which is the smallest
  the kit has for a quote, so the length is the cause. The page renders the quote in full (its
  sign-off is pending).
- **Proposal:** when CuramCare's quote is signed off, ask for the first two sentences ("Tcules
  started by asking our families and carers what got in their way, turned it into a clear product
  plan"), which carry the claim, and keep the full quote for the case page.
- **Why:** the sentence about the handover ("so nothing got lost") is the case study's, and the
  band stays inside the fold with it left to the case.
- **Home round 1 (10 Oct 2026):** the overflow's cause is gone at the template — a story's quote now
  leaves the story for a quote band of its own after the stories (OfferPage `storyQuotes`), so the
  split carries the story alone. The length point stands and is now part of P34.

### P22 · `/` and `/services/product-design` · faq · six and seven questions run past the fold

- **Problem:** the first question of an accordion is open by default, so a closed list of six measures
  **844** (home) and of seven **896** (product design) at 1470, against 830. The kit's budget is
  seven closed, which assumed every item closed. Four-question lists (healthtech 664) and
  three-question lists (the audit, 587) sit well inside the fold.
- **Proposal:** five questions or fewer per page, with the rest on the page they belong to. Home's
  "Do you only work with SaaS companies?" and "How do you work with teams outside India?" already
  have homes on the services and about pages. Product design's "What will you need from us?" and
  "How much research do we need?" could move to the audit and the case pages.
- **Why:** an FAQ that fits the fold reads as an answer rather than a document. Every page ends on
  the same two bands (FAQ, then form), so the budget applies to all 51 offer pages.

### P23 · `/services/product-design` · media_bindings · three bound assets carry no `alt_intent`

- **Pages and assets:** `product_design_doodle`, `product_design_dealpath` and `product_design_eden`
  (the other pages' bindings all carry one).
- **Problem:** the page renders the three images with an empty `alt`, because nothing in the
  corpus says what each shows, and a description written by the builder would be copy nobody
  authored. A screen-reader user gets a case card with a title and a silent cover.
- **Proposal:** add `alt_intent` to the three bindings, one sentence each in the style of the home
  page's ("Doodle product model connecting meeting priority, availability and scheduling
  behaviour"). The same assets are already described on the home page, so the sentences can be
  reused.
- **Why:** these are the pages' only proof images, and the alt is the only way a non-visual reader
  gets that proof.

### P24 · `/case-studies/benchmark-gensuite-…` · the argument sections · navigation labels for the outline

- **Page and bands:** the six argument sections (`the-opportunity-…` through
  `what-another-suite-owner-can-take-from-it`).
- **Problem:** the case's table-of-contents rail takes each section heading as its label, and six
  headings run 38 to 74 characters ("We built the prototypes in code, so engineers could try them").
  The rail's column is narrow, so each label clamps to two lines and its tail is cut. The page renders
  the headings as written, and TableOfContents warns about all six in development.
- **Proposal:** add a short `navigation_label` (two to four words) to every long-form section, as the
  CMS's audit sections already carry one: "The constraint", "The scope selector", "Three needs", "Built
  in code", "Where it stands", "What to take from it". The heading on the page stays as written.
- **Why:** an outline is a map, and a label that is cut mid-clause stops being one. Every case,
  article and glossary term on the long-form template meets the same clamp, so the field is a
  corpus-wide ask (64 pages). Batch B3 meets it on two more pages: `/insights/cpq-ux-design` (five of
  nine section headings run 41 to 58 characters) and `/glossary/design-system` ("How does a design system
  differ from a component library?", 56).

### P25 · `/case-studies/benchmark-gensuite-…` · related · two cases cited by a link line alone

- **Page and band:** `related` carries "[Read the Gold Image Printing case](…)" and "[Read the Dealpath
  case](…)" and no other words about either case.
- **Problem:** a card needs a title and, ideally, one line. The page reads each title from the cited
  case's own h1 ("A clearer path from print order to production"), which is the content team's wording
  but a headline written for that case's page, not a teaser for this one. The cards carry no body.
- **Proposal:** a one-sentence teaser under each link, saying what the case shares with this one ("an
  operating print business whose ordering and production systems changed together"), in the same
  paragraph or as a labelled line.
- **Why:** a reader choosing the next case needs the connection, and the lead sentence ("Two other cases
  where an operating product had to change without a sudden replacement") says it only for both at once.

### P26 · `/tools/design-system-drift-checker` · workspace · an h3 table under the tool's own band

- **Page and band:** `workspace` holds the tool's introduction, then a `###` "What should a
  design-system drift check inspect?" with its table and closing paragraph.
- **Problem:** the band mixes two jobs: where the tool opens, and a four-row checklist a reader uses
  with or without the tool. The kit's band heading is always an h2, so the `###` cannot head a band of
  its own, and the page sets the item in a band with no h2, its h3 carrying the authored id.
- **Proposal:** promote the `###` to its own `##` band, "What should a design-system drift check
  inspect?", with the same id. The six tools in the same family would then share one shape: a how-to,
  the tool, a checklist, results.
- **Why:** it makes the checklist a section a reader can land on and a heading navigator can list, and
  it removes a headless band from the template.

### P27 · `/case-studies/benchmark-gensuite-…` · hero (case-thesis) and the-prototypes-were-code-not-pictures · straight quote marks

- **Page and band:** the hero's third paragraph ("…put it: \"For established users, familiarity and
  consistency are important parts of efficient workflows.\"") and the engineering stakeholder's question
  in `the-prototypes-were-code-not-pictures` ("asked: \"I was curious if you use an external library…\"").
- **Problem:** both quotations are typed with straight marks ("). The hero's third paragraph is the case's
  one large statement, set at the h1 role across four lines, where a straight mark reads as a typing slip
  beside the serif. Other corpus pages already use typographic marks (the index's Wandering Raven quote
  opens with “), so the corpus is inconsistent.
- **Proposal:** use typographic quotation marks (“ ” and ’) in both sentences. No word changes.
- **Why:** the page renders the authored characters, so the fix belongs in the copy. Found by the B2
  critic pass; a corpus-wide sweep for straight quotes would catch the rest in one edit.

### P28 · `/insights/cpq-ux-design` · make-the-configuration-rules-explain-themselves · four numbered moves written as four paragraphs

- **Page and band:** the band says "Four design moves follow." and then sets four paragraphs, each of
  which opens with the move as a sentence ("Say why an option is unavailable.").
- **Problem:** the structure is in the sentence, not in the markup. The page shows the four moves as
  numbered rows because that is what the author's count announces, but the template has to infer it from
  "Four … follow." and from each paragraph's first sentence. A rewrite that drops the count word, or a
  paragraph that opens with a clause, would silently turn four numbered moves back into four paragraphs.
  Move two's first sentence runs 58 characters, so a title cut at a fixed length would split it.
- **Proposal:** author the four moves as an ordered list whose items open with the bold move
  ("**Say why an option is unavailable.** …"), keeping every word. The same shape works for any article
  that sets a method.
- **Why:** a numbered list is a structure the corpus parser and the CMS both name, so the page no longer
  depends on reading a count out of prose. The page renders the paragraphs as written, as rows, in the
  meantime.

### P29 · `/about` · leadership · the studio paragraph and its link are filed under the second person

- **Page and band:** in `leadership` the `###` for Rakesh Chitroda is followed by his bio and link, and then by
  "The wider Tcules studio brings designers and engineers together…" and "[Follow Tcules on LinkedIn]".
- **Problem:** by the markdown's own structure the studio paragraph and its link belong to Rakesh's entry,
  so a reader of the source, a parser and a screen reader all attach "the wider Tcules studio" to him. The
  page sets them after both people, as the band's closing note, because that is how they read.
- **Proposal:** separate the two: end Rakesh's entry after his link and set the studio paragraph as a
  plain paragraph of the band under a separator, or as a third `###` "The wider studio" with its own link.
- **Why:** the structure would then say what the page shows, and a CMS model of `person` blocks would not
  need a note that the last two blocks are not his.

### P30 · `/about` · who-we-work-with and work-you-can-inspect · sentences that continue after a bold name or a link

- **Page and band:** the three situations ("**Growth-stage and post-PMF SaaS teams** dealing with complex
  workflows…") and the four cases ("[Doodle](…) shows research changing…").
- **Problem:** each name is a title on its card and what follows it starts lower-case, so the body reads as
  half a sentence under its own title ("Doodle" / "shows research changing the underlying product model…").
  Same family as P18, which logged the run-in labels on other pages.
- **Proposal:** write each body as a sentence that stands alone ("Doodle's research changed the underlying
  product model for enterprise scheduling."), or keep the authored form and accept a card that reads as a
  title plus its predicate.
- **Why:** a card body is read on its own, away from the sentence it came from. Rendered as written, with
  the lower-case body, in the meantime.

### P31 · `/insights/cpq-ux-design` and `/about` · straight quote marks

- **Page and band:** CPQ: "enterprise user", "Unavailable", "Not available with a 12-month term"; About: the
  three client quotes in `testimonials`, which open and close with ".
- **Problem:** typed with straight marks ("). The About quotes are set in the testimonial slider's display
  italic at about 56px, where a straight mark reads as a typing slip beside the serif. Same finding as P27.
- **Proposal:** use typographic marks (“ ” and ’) in every quotation. No word changes. A corpus-wide sweep
  for straight quotes (P27) would catch these in one edit.
- **Why:** the page renders the authored characters, so the fix belongs in the copy.

### P32 · `/insights/cpq-ux-design` · decide-which-kind-of-quote-you-are-designing-for · the comparison table has an empty first header

- **Page and band:** the table's header row is `|  | Rep-assembled quote | Expert-assembled quote |`, with
  nothing in its first cell.
- **Problem:** a column with no header gives a screen reader nothing to announce for the row labels
  ("Typical contents", "Who changes it"…), and the table's name has to come from the section's heading. The
  page renders the cell empty, as authored.
- **Proposal:** give the key column a word, such as "Aspect" or "Question", the way the checklist table in
  `cpq-ux-checklist` names its first column "Question".
- **Why:** every row header gets a column to belong to, and the same fix keeps both tables on the page one
  shape.

---

## Home round 1 (owner review, 10 Oct 2026)

The owner's corrected reading of the rules: information is never paraphrased, but its presentation is
designed (a record line as figures, names as logos, quotes pulled out of the cases). The three
proposals below are where that design asks something of the copy.

### P33 · `/` · hero · the record line, as figures

- **Page and band:** the hero's proof line, "Founded 2017 · More than 90 projects · Clients in 19
  countries · Based in Ahmedabad, India", now set as four figures in a band of its own under the hero
  (owner note 1: "those are important figures to show credibility").
- **Problem:** a figure needs a short value and a line that says what it counts, and two facts are
  not written that way. "More than 90 projects" is set as **90+** / "Projects"; "Based in Ahmedabad,
  India" is not a number, so it is set as **India** / "Based in Ahmedabad". "Clients in 19 countries"
  is set as **19** / "Countries with clients". No information is added or dropped, but the content
  team has not seen these forms.
- **Proposal:** confirm the three forms, or author the record as value-and-label pairs in the
  frontmatter (`record: [{ value: '2017', label: 'Founded' }, …]`) so the page never has to split a
  sentence. If "90+" overstates "more than 90" for legal review, give the exact count ("94") or
  keep "90+" with the label "More than 90 projects".
- **Why:** figures are scanned, not read; a value of one to five characters and a label of one to
  three words is what lets four of them sit in one row at 390 (two by two) and 1440 (four across).
  Rendered in the confirmed-pending forms meanwhile; `RECORD_FORMS` in `HomePage.tsx` holds them.

### P34 · every page · quotes shown together · keep their lengths within a band

- **Page and band:** every place two or more quotes are shown at once. On `/` today:
  `why-tcules` 18, 15 and 34 words (Auxentios 15, Primelis 34: 2.3×); `client-voices` 30, 24, 21,
  43, 22 and 48 words (Knovos 21, Eden AI 48: 2.3×); `selected-work` 31 and 35 (fine). `/about`
  `testimonials` 22, 30, 24 (fine).
- **Problem:** the design sets quotes as peers — a pair, a banner side, a wall of three columns —
  and peers are read as one shape. A 15-word quote beside a 34-word one leaves one banner half
  empty; in the wall, the 43- and 48-word quotes run twice the height of their neighbours, so the
  columns end raggedly. The group absorbs moderate differences on purpose (quotes run down columns,
  attributions share a baseline in pairs), but not a factor of two.
- **Proposal:** quotes chosen for one band fall within **±25% of the set's median length**, and
  within the range for their placement:

  | Placement | Words per quote |
  | --- | --- |
  | One quote alone (centred typographic band, or beside a portrait) | 20–35 |
  | A banner side (beside a reason, a case, a figure) | 18–30 |
  | Peers: a pair or a group of three | 18–30, each within ±25% of the others |
  | A wall of four to six | 18–30; the longest no more than 1.5× the shortest |
  | Inside a reading flow (an article, a case story) | ≤ 30 |

  For `/`: a shorter approved excerpt for CuramCare (43) and Eden AI's platform quote (48) in
  `client-voices` (both await sign-off, so ask for the excerpt at sign-off — P21 suggests one for
  CuramCare); a longer Auxentios line (the case study has one) or a trimmed Primelis quote (also
  awaiting sign-off) in `why-tcules`.
- **Why:** a quote is evidence in the client's words and is never cut by the design; the length has
  to be chosen with the client. The quotes render in full meanwhile.

### P35 · `/` · client-recognition · the score is said twice

- **Page and band:** the logo band is led by the Clutch badge ("★ 4.8 on Clutch", the kit's
  approved lead) and closes on the authored sentence "4.8 out of 5 on Clutch across 13 independent
  client reviews. Read the reviews".
- **Problem:** the score appears twice in one band, 300px apart.
- **Proposal:** let the badge carry the score (it links to the profile) and close the band on
  "Across 13 independent client reviews." plus the link; or keep the sentence and drop the badge.
  The frontmatter already holds `external_review` (rating, count, checked date), so the badge can be
  driven by it on launch-day re-verification.
- **Why:** one statement of the number reads as confidence; two read as insistence. Both render
  meanwhile, because the sentence is authored copy and the badge is the approved composition.


## Home round 2 (owner review, 10 Oct 2026)

### P36 · every page with testimonials · star ratings · the ratings are placeholders and must be replaced before launch

- **Page and band:** every testimonial now renders as a rated card (`/` selected work, why-tcules,
  client-voices; `/services/product-design` outcomes and complex-products;
  `/audits/design-to-code-audit` proof; `/expertise/healthtech` proof; `/case-studies` designed and
  built; `/about` testimonials).
- **Problem:** the owner asked for "ratings from 4 to 5 for each testimonial for now". The 14 values
  in `src/content/sources/fixtures/testimonial-ratings.ts` were chosen to fill that brief, in half
  steps; none was read off a review. A star rating beside a named client's words is a claim about
  what that client said. Invented ratings attributed to named clients cannot ship.
- **Proposal:** before launch, replace each placeholder with that review's own published rating
  (each of the 13 Clutch reviews carries one; Upwork and other sources carry theirs), keyed by the
  testimonial id the frontmatter already lists. A quote whose source has no rating ships with no
  stars: the card renders none when the id has no rating. Add `rating` (and its source) to the
  testimonial record in the content model (docs/strapi-changes.md § 18).
- **Why:** the stars are evidence, and evidence has a source. Every placeholder carries
  `placeholder: true`, so a launch check can list what is left.

### P37 · `/` · client-recognition · the review count left with the sentence

- **Page and band:** the line under the logo wall ("4.8 out of 5 on Clutch across 13 independent
  client reviews. Read the reviews") is removed at the owner's request; the Clutch badge leading the
  wall carries the score and links to the profile.
- **Problem:** "13 independent client reviews" no longer appears on the page.
- **Proposal:** either accept the loss (the badge's link shows the count), or let the badge carry it
  ("★ 4.8 on Clutch · 13 reviews"), driven by the frontmatter's `external_review.review_count`.
  Supersedes P35.
- **Why:** one statement of the score, as P35 asked; the count is the one fact the cut removed.

### P38 · `/` · hero record · "Based in Ahmedabad, India" is no longer shown as a figure

- **Page and band:** the record under the hero shows three figures (2017 · 90+ · 19) at the owner's
  request; the fourth fact is a place, not a measure.
- **Problem:** the authored record line still lists four facts.
- **Proposal:** drop "Based in Ahmedabad, India" from the hero's record line in the source, or move it
  to the hero lede or the FAQ answer about working outside India, which already names India.
- **Why:** the source should say what the page shows. P33's figure forms stand for the other three.

## Home round 3 (owner review, 11 Oct 2026)

### P39 · `/` · why-tcules · "We can build what we design" has no client quote

- **Page and band:** "Why teams choose Tcules" is now one banner per reason, each with the client's
  words supporting the claim (owner: "assume all 4 have a quote").
- **Problem:** the third reason authors no quote; the other three do.
- **What the page does now (PLACEHOLDER):** it shows a REAL testimonial from another corpus page,
  read verbatim by the content seam (`src/content/sources/fixtures/borrowed-quotes.ts`): Trishanya
  Raju, Founder, The Wandering Raven, from `/case-studies` ("Their commitment to the project and their
  turnaround time was incredible … We would definitely recommend working with Tcules for your design
  and development projects!"). It is about the work the reason names and is not shown elsewhere on
  home.
- **Proposal:** author the reason's own quote in `_pages/home.md` (the borrowed one is a good
  candidate, or the case page's own "Their team takes the full picture into account when coming up
  with designs."), and add its testimonial id to the frontmatter. Then delete the borrowed entry.
- **Why:** every reason reads claim, then proof; one without proof reads as the weakest claim.

### P40 · `/` · every testimonial card · the avatars are stock portraits, not the speakers

- **Page and band:** selected work, why-tcules and what clients say.
- **Problem:** the owner asked for circular avatars on some cards and none on others "so we can test
  how that looks". Six cards show a stock studio portrait from the kit registry
  (`src/content/sources/fixtures/testimonial-avatars.ts`, every entry `placeholder: true`); none shows
  the named person.
- **Proposal:** before launch, replace each with the speaker's own photograph, supplied with their
  consent and shot square, or remove it (the card then shows no avatar). Add `portrait` to the
  testimonial record (docs/strapi-changes.md § 19).
- **Why:** a face beside a named client's words is a claim about who said them. Stock faces cannot
  ship.

### P41 · `/` · client-recognition · the logo wall shows more clients than the corpus names

- **Page and band:** "Some of the teams we've worked with".
- **Problem:** the corpus names six clients (Doodle, Dealpath, Benchmark Gensuite, Eden AI, JoVE,
  Ringier Media Switzerland). The studio holds logo files for two of them (Doodle, Eden AI), so the
  wall shows those two and then the approved in-house set — Omny, LatitudePay, Quoter, Knovos,
  SafeXpay, Pledge, GT Tools, Incluude (owner: "we probably have logos for most if not all the
  clients. please use them"). Four named clients are missing from the wall, and eight unnamed ones
  are on it.
- **Proposal:** either (a) list the wall's clients in `page_composition.client_recognition.clients`
  so the source says what the page shows, or (b) supply the four missing logos (Dealpath, Benchmark
  Gensuite, JoVE, Ringier; docs/image-register.md) and choose which twelve the wall shows (a 4 × 3
  rectangle). Supply Eden AI's SVG to replace the PNG.
- **Why:** the wall is a proof claim; its members should be the content team's decision.

### P42 · every page with a form · the resting line under the submit

- **Page and band:** every enquiry band.
- **Problem:** the form printed its own "We reply within a business day." beside the band's authored
  "After sending: We'll reply within one business day." — two wordings of one promise.
- **What the page does now:** the form's resting line IS the authored "After sending" line
  (`EnquiryForm caption`), so each page shows its own words once.
- **Proposal:** none needed unless a page should promise something else; author it in that page's
  "After sending" line.
- **Why:** one promise, in the content team's words.

## Product design round 6 (owner review, 11 Oct 2026)

### P43 · every built page · case mentions · placeholder links and unpublished cases

- **Problem:** the owner wants every case mention linked. Two clients the pages present as case work
  have no case page: **CuramCare** (healthtech proof, hero proof line; no draft) and **Vovisto**
  (healthtech proof, hero proof line; the corpus comment names
  `/case-studies/vovisto-healthcare-event-travel-platform`). And 11 of the 17 corpus case files had no
  live route until this round.
- **What the page does now:** CuramCare and Vovisto link to `/case-studies#placeholder-case-curamcare`
  and `#placeholder-case-vovisto-healthcare-event-travel-platform` — flagged PLACEHOLDER in
  `CASE_STUDY_PLACEHOLDERS` (`src/lib/routes.ts`), so each opens a real page and can be found with
  one grep. Every corpus case now has a route: `/case-studies/[slug]` serves the corpus file where the
  CMS source has no record (Auxentios, Eden AI, Scissors, GT Tools, Novus, OctiFi, Omny AI, Ryzeo,
  Gold Image Printing, The Wandering Raven were 404). Those pages render through the long-form case
  template and have not had a design pass of their own.
- **Proposal:** publish the CuramCare and Vovisto cases (or confirm they never will, and the stories
  stay unlinked); when one publishes, move its name from `CASE_STUDY_PLACEHOLDERS` to
  `CASE_STUDY_SLUGS`. Schedule a mapping pass for the ten corpus cases now served unreviewed.
- **Also:** where a case card has no authored link the card's title is the link (no words invented).
  In a set that mixes authored and found links (the audit's proof: Benchmark and Eden AI authored
  "Read the case", GT Tools did not), the found card takes the band's own authored wording. Authoring
  a "Read the GT Tools case" line in the audit's proof band would make it the content team's words.

### P44 · `/services/product-design` · worked-example · the result has no figure

- **Problem:** the band now leads with its outcome (CaseSpread: "The result." as the claim beside the
  evidence). The result is a sentence ("A redesigned flow that catches a duplicate deal before it is
  created…"), so the band's largest element is 28 words at lead-lg. A measured outcome would carry it
  in a glance.
- **Proposal:** if the Dealpath case can support one, add a single measured outcome (duplicates caught
  per month, time to add a deal, a support-ticket drop) as a short figure line in this band; the
  design sets it as the claim's figure.
- **Why:** claim leads, proof supports: a figure is the fastest proof a worked example can show.

### P45 · `/services/product-design` and `/audits/design-to-code-audit` · symptoms · straight quote marks

- **Problem:** the complaints are authored with straight marks and apostrophes ("What ships doesn't
  match the design."). VoiceLedger typesets them (curly marks); the words are unchanged.
- **Proposal:** author curly marks in the source so every renderer agrees (as P27 and P31 ask
  elsewhere).

### P46 · offer pages with a case band · hero · the "Selected … work:" line repeats the case list

- **Problem:** the hero carries "Selected Product Design work: Doodle · Dealpath · Eden AI · Auxentios · Scissors". The page lists those cases in full further down ("More complex products we have made easier to use"), so the line only repeats that list. Set as a line of links under the hero it also read as unfinished (owner, 11 Oct 2026).
- **Done in the build:** not rendered on an offer page that has a case band. It still renders where no case band follows.
- **Proposal:** drop the line from the hero of offer pages that list their cases below, or replace it with something the hero needs (a client logo row, a single proof figure).

### P47 · `/` · selected-work · the brief for the featured case card (TestimonialCase)

- **Problem:** the featured cases are now ONE card each (owner, 16 Oct 2026): a 16:9 cover beside
  the claim, with the client's words in a box inside the card under both. The card was designed for
  the content it should carry, not for the copy as it stands, so this is the brief that content
  should be written to. Today's copy mostly fits; three things are missing (below).
- **Proposal:** each featured case supplies these fields.

  | Field | Limit | Notes |
  |---|---|---|
  | Eyebrow | ≤ 32 characters | The client, optionally its discipline ("Doodle · Product design"). Today the build takes the name before the title's colon. |
  | Claim | 4–8 words, ≤ 48 characters | The card's h3, two lines at most beside the cover. No client name: the eyebrow carries it. |
  | Result | 1–2 sentences, ≤ 35 words | What changed for the client's users. Today's stories (30–32 words) fit. |
  | Link label | "Read the {client} case" | As now. |
  | Cover | 16:9 master, ≥ 1360 × 765 | Cropped to 16:9 at every width, with a recorded focal point; ruled with a light hairline. One master per case ends the cropping (docs/image-register.md). |
  | Quote | ≤ 35 words, ≤ 200 characters | The client's own words, whole. Two lines at 1440, about seven on a phone. Doodle (33 words) and Eden AI (35) fit. |
  | Speaker | name, role, company | Shown as a portrait beside name over "role, company". |
  | Rating | out of 5, in halves | Shown as stars only, no numeral. |
  | Portrait | square, ≥ 192 × 192 | A circle; with none the card shows no portrait (initials are banned). |

  Missing today: **Stephanie Leue's role** (the card shows "Doodle" alone), **a portrait of Samy
  Melaine**, and **16:9 cover masters** for both cases.
- **Why:** with every field inside its limit the card holds its shape at 1440 and on a phone, and
  the quote box stays the card's foot rather than its largest part. Until the gaps are filled the
  copy renders as written.
