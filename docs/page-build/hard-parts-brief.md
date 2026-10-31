# Hard parts: the brief

**Status:** brief, 31 Oct 2026. Process: brief → references (owner picks) → hi-fi mocks of two variations
(owner picks) → build as the `challenges` kind's one component (`kinds.ts`) → review on the census review
list. Rulings and measures below are the inputs; nothing here is a design.

## 1 · The job

A founder or product lead is deciding whether Tcules understands their kind of product. Hard parts is where the
page proves it: **the specific problems their product has, how we design for each, and a client where we did it.**
The reader should come away able to say "they know our hard parts" from the titles alone, and find depth and
proof when they read on. Today it reads as an info dump: every claim's full text at once, in one rhythm.

## 2 · The content (56 claims across 14 bands, 31 Oct)

| | |
|---|---|
| Claims per band | 2–5 (services 2–4, expertise 3–5) |
| A claim's words (without its example) | median 72, three in four under 110, longest 147 |
| Paragraphs per claim | median 2, at most 4 |
| Title | a statement of the problem, ~4–9 words ("Records that outlast any one workflow") |
| With a named example | 37 of 56; the example is 1–2 sentences + "Read the … case" |
| Also in a claim | a regulation paragraph (13 claims, 9 pages), a small table (2), a reading link (7) |
| Before the claims | a lead sentence; sometimes a band-level table (Data's four questions) or a people ledger (HealthTech, Marketplaces) |
| Visual | one isometric drawing per claim (placeholder until drawn; visual-inventory-expertise § 2) |
| Not hard parts | a worked example ("Illustration, not client work") is its own kind (2026-10-31-claims-method-example-three-kinds) |

## 3 · Two variations (owner, 31 Oct 2026)

**A · One claim at a time.** A slider or tabs, each claim a generous view: the claim in one half, its example
in the other; a claim with no example takes the full width (owner, 31 Oct). Tension the design has to answer:
"we don't show information in a slider that relies on the user to click and find" (2026-10-16-no-hidden-cards). So every
claim's title must be visible at all times, and the set's extent obvious.

**B · Everything on the page.** No interaction needed, and still not a dump. Direction open: from the references.

## 4 · Rules that bind both

- Sliders are allowed off the homepage (2026-10-26-sliders-allowed-off-homepage); a carousel shows where it is
  heading (treatment rules § 2, countdown indicator).
- The example is proof, not a case card: client mark + case title as one link, the sentence in small type
  (2026-10-30-hard-parts-claims-lead-proof-footnotes). Never a case cover as the claim's visual.
- An image about one item belongs to that item. One drawing per claim, never reused on the page.
- Body ≤ 16; card bodies 14 (2026-10-19-body-type-ceiling). Serif only for section titles.
- No card-box reflex, no hairlines between peers by habit, no hover-only grounds; hover is a move.
- Two text-heavy bands never touch: hard parts sits between Selected work and What you get.
- One kind, one component: whichever variation wins renders every hard-parts band, any shape (2–5 claims,
  with or without examples, a table in a claim, a band-level table). The other can stay as a variant only if
  the owner rules a rule for when each is used.

## 5 · Test content (census review list)

- `/expertise/b2b-saas-workflow-software#hard-parts`: longest, five claims, every claim with an example
- `/expertise/fintech#hard-parts`: four of five claims without an example, a table in the first
- `/expertise/climatetech-energy#hard-parts`: a table in a claim, a worked example after the claims
- `/services/design-systems#hard-parts`: shortest, two claims

## 6 · Done when

The titles alone tell a reader the page's argument; a claim reads in one view without scrolling inside it; the
section fits the page's rhythm (squint test: more than one idea on the page); 390 works as well as 1440.

## 7 · References (31 Oct 2026, each page opened to confirm the section)

**A · one at a time:**
- Stripe Connect, https://stripe.com/connect, "Control how funds flow": some tabs name a customer and some don't, and the layout holds either way.
- Stripe Billing, https://stripe.com/billing: the tab labels are claim sentences.
- Stripe Payments, https://stripe.com/payments: the proof slot keeps its size, full or empty.
- Vercel, https://vercel.com: one band-level proof in the head, claims in the tabs.
- Ramp, https://ramp.com: the claim beside a named quote, in two halves.
- Attio, https://attio.com, "Platform": a quiet progress cue.
- Pitch, https://pitch.com, "Solutions": a named person as proof.
- Fin, https://fin.ai: a short claim with one supporting line.
- Raycast, https://www.raycast.com: a text-and-underline tab style.

**B · everything on the page:**
- Ink & Switch, Local-first: a titled claim, then its argument.
- Tufte CSS: margin notes and figures that fold inline on phones.
- Gwern, design: how stacked sidenotes avoid each other.
- Anthropic, Building effective agents: labelled sub-blocks inside each item.
- GOV.UK design principles: a linked index, and evidence links under each item.
- Vanta, healthcare: regulation as a named object.
- Linear Method: terse numbered titles.
- Shape Up: rules and headings with no boxes.
- Stripe Atlas, SaaS: a numbered index that doubles as a summary.
- Increment, tech debt: a pull-out that breaks a long column.

**Directions for B:**
1. Proof in the margin.
2. A numbered index beside the argument.
3. Labelled parts, varied per claim. This adds words the copy doesn't contain, so it's the owner's call.

## 8 · Mock-ups

Round 1 (31 Oct 2026): https://claude.ai/artifact/56SLJxHf8TUXzRq9CxgWYd. A (spine: Stripe Billing) and B (spine: Tufte's margin) on the four test pages, at 1440 and 390.

Round 2 (31 Oct 2026, same link): B with the drawing column (200, top left), the Example panel and dividers; A with two
tab shells (Segmented, Folder).

**Owner, 31 Oct 2026:** B is locked, dividers on. A's tab shell is still wrong: references first, and A autoplays and
pauses on hover. Constraints that come with autoplay: a claim is ~72 words (about 20 seconds to read), so the
interval is long or the text moves mid-read; hover does not exist on touch or keyboard, so focus pauses too and a
visible pause control exists (WCAG 2.2.2); reduced motion starts paused; autoplay runs only while the band is in view.

### Tab shell references (31 Oct 2026, each opened in a browser, autoplay checked by watching it)

- Intercom, https://www.intercom.com, "Copilot / Ticketing / Support": every item's title and first lines stay
  visible as columns under one shared view; the active column sits on a tint with a blue line filling along its top.
  Autoplays; does not pause on hover.
- Figma, https://www.figma.com, "Design anything you can imagine / Build with intention": the quietest shell, two
  text columns under the view with a small square marker. Autoplays.
- Mercury, https://mercury.com, "Everything you do with money": a vertical list of titles on hairlines beside the
  view, the active item's rule heavier. Its active item also opens its description, which is the accordion the
  owner ruled out. Did not advance on its own in the check.
- Airtable, https://www.airtable.com, "Sophisticated workflows": a numbered vertical index (01–04) with a dot
  marker beside the view. Did not advance on its own in the check.
- Dash design system, https://brand.dash.fi/marketing/patterns/feature-tabs: documented pill tabs whose fill is
  the timer; a click hands control to the reader. Read from search results, not opened.
- W3C APG, auto-rotating carousel with tabs,
  https://www.w3.org/WAI/ARIA/apg/patterns/carousel/examples/carousel-2-tablist/: the behaviour reference (pause
  control, focus pauses, reduced motion starts paused). Read from search results, not opened.

Round 3 (31 Oct 2026, same link): A's tab shell from the owner's picks on Mobbin, Heron AI's ruled index
(https://mobbin.com/sites/sections/1fe1d979-0175-41b8-9d0a-15ab35c48fa8) and Giga's stage
(https://mobbin.com/sites/sections/1e41291f-dabe-4797-a893-ee057bedf952). Two shells: **Ruled index** (hairline cells are
the view's top edge; the chosen cell has no floor and opens into its claim) and **Stage** (one paper-deep stage, the
view above, the claims as its index below). In both, the blue line on the chosen tab is the timer: 15 seconds a claim,
paused on hover and focus, stopped for good by a click or the Pause control, paused from the start under reduced
motion, running only while the band is on screen.

Round 4 (31 Oct 2026, same link): the owner picked the stage, tabs on top, and asked for no play/pause control. The stage
now holds B's claim layout (drawing 200, words 600, example 340) and its height follows each claim. Each tab is "01" plus a
rule that is the timer; one paper piece slides between tabs. Autoplay only where there is a mouse; pointer over the stage
or focus inside it holds the timer; a tab, an arrow key, a text selection or a link stops it for good; one pass, then it
rests on claim 1. The pixel grid sits on the stage's ground, strongest around the chosen tab, travelling with the timer.
Switches: texture, thumbnails (each claim's drawing at 40px), client name. Caveat for the owner: a strict reading of
WCAG 2.2.2 wants a visible pause control.
