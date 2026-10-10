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
