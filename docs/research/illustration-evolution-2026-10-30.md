# How the new illustrations moved from our rules, and what the small drawings can take from them

**Status:** analysis, 30 Oct 2026. Nothing here is a ruling. It compares the illustrations Jatin and Bhumika
picked on 30 Oct (`docs/research/illustration-call-2026-10-30.md`) with what the repo says an illustration is.
It then proposes how the smaller drawings further down a page could be drawn in the same hand. Every rule change
below needs the owner, through `/decide`, and stays `proposed` until it has been drawn and seen
(`decisions/2026-10-22-test-before-ruling`).

**What was read:**
- **The new set:**
  - round 3's 61 recommended pictures (https://claude.ai/artifact/VRh3zkZ2E8L4umHqCtZUR2);
  - Bhumika's latest refinements in her canvas (https://claude.ai/artifact/UnAQxUzcwGHNgQpfVKKPfQ): PD V18,
    Modernisation J11, DE F4, DS R4, AI-UX B4 and C2, Expertise A v4.
- **The rules:**
  - ch05 §4–§4b (`docs/brand/05 Imagery.html` v1.0);
  - the illustration rulings in `docs/decisions/`;
  - the flat grammar (`decisions/2026-10-26-flat-graphics-grammar`, `docs/research/flat-graphics-grammar.md`);
  - the drawings on the site today: `public/illustrations/reasons/*`, `engagement/*`, and the `Sketch` kit.
- **Measured, not eyeballed:** stroke widths, corner radii, dashes and hexes were counted across all 61
  recommended SVGs and Bhumika's seven finals.

## 1 · What held

| Rule | Where it stands |
|---|---|
| 2:1 parallel projection, verticals vertical (ch05 §4a) | Held everywhere. The transforms are all `0.9 / 0.45`. |
| Palette from tokens, no new hues | Held. Every hex is a brandeis or peridot step, paper or neutral-950, with one exception: a stray `#3D6BFF` in round 3. |
| Blue draws; one solid blue object anchors | Held in spirit. Each picture has one solid brandeis-500 hero object: the product, the card, the code panel. |
| Dashed means not built yet, or context | Held: a dashed floor edge, a dashed next storey, dashed waiting steps. |
| Copy as bars, never pseudo-text | Held. Text is rounded bars in brandeis-300 to 500. |
| No numbers, no logos, no client screens | Held, and now stated as a panel rule too. |
| Fewer elements, not smaller ones (ch05 §4, detail) | Held, and Jatin's call pushes it further: "minimal; only the details the concept needs". |
| The message is set before drawing; read-back test (ch05 §4) | Held, and made stronger. Round 3 ran blind read-back with simulated buyers (38 of 61 read correctly with no headline) and a swap test (110 of 122). |

## 2 · Where they evolved, and whether the rule should follow

Each row is a real departure. The last column is a recommendation for the owner to rule on, not a decision.

| # | ch05 / repo rule | What the new drawings do | Recommendation |
|---|---|---|---|
| 1 | **Figures: none.** A person is a seat or a station (§4a). | Pawn people: a cylinder body and a round head. They're solid blue for the Tcules person and outlined for the client's people. A hand appears on pause, and a pointing arm in several pictures. | **Rule should follow**, because the pictures need "whose world". But wait for Jatin's Tcules person, with a designer and a developer that each read as their own (call, 30 Oct). Then rule the figure once: its geometry, what solid versus outline means, and its minimum size. |
| 2 | **Corners: square.** The only curves are circles that are the form (§4a). | Rounded everywhere: screens about 8, trays and control bars 11–22, pills, and "matching corners" on face and edge alike (PD V11). | **Rule should follow.** It matches the flat grammar's 8 / 4 / pill corners, so both tiers would share one corner language. |
| 3 | **Thickness only on the plinth, the carried item and a cylinder.** Planes have no thickness (§4a). | Slabs: screens, trays, the control bar and the card all have a thick edge in brandeis-200 or 700. "As thick as the map layer" became a unit Bhumika reuses. | **Partly follow.** Allow one thickness for the hero object and its stand, set as a named unit. Standing screens stay thin panels. In Bhumika's files the thickness is 16–32 stacked copies of the same rect; it should be one side-face shape per edge (see § 4). |
| 4 | **One weight, 1.5 non-scaling;** exceptions at 1.25×, 1.75× and 5× (§4a). | Round 3 uses about 1.1–2.6, mostly 1.2–1.4, non-scaling. Bhumika's finals use 1.0–3.4 and are not non-scaling. The lime rods use 10–14. | **Hold the rule and lighten it.** Jatin asked for lighter borders. The measured centre (1.2–1.4) sits just under 1.5. Set one outline weight (proposal: 1.25), one emphasis weight, and nothing thicker. Retire the thick cased rod. |
| 5 | **Peridot is the carried item,** solid once, with echoes and a translucent path (§4b). | Lime is "the one thing that matters": a focal fill, a ring round it, a cased rod joining two things, a tray rim. Nothing travels. | **Follow the focal idea; drop the ring and the rod.** One lime fill on the focal object is the useful part. Jatin and Bhumika already want the thick ring replaced by a dotted blue line or a light highlight. The rod is the "thick curved line" Jatin flagged. |
| 6 | **Annotation:** one concept chip plus two part labels (§4b). | Zero reading. No chips or labels, except the small "AI" badge on what an AI made. | **Follow.** The flat grammar already went wordless ("text is hurting more than helping", 25 Oct). The AI badge is round 3's open decision 1 and is still unanswered. |
| 7 | **Every A-to-B line runs on the iso axes** (`2026-10-23-illustration-lines-follow-iso-axes`). | Free diagonals remain. Dashed spokes from tray to people (DS A, R4), screen-to-map leaders (PD D, V18), HealthTech's sharing lines, and the pointing arms. | **Hold the rule.** It is active and logged. Bhumika's finishing pass should route these on x, y or z, turning at corners. Arms are a figure question (row 1), not connectors. |
| 8 | **No gradients, no shadows** (§4a). | Round 3 has none. Bhumika's canvas has 22 linear and radial gradients: the shade on the person's body and head, and the side of the control bar. | **Hold the rule.** Sides take two flat tones, darker on the left (§4a light from the upper right). Flag it for the vector pass. |
| 9 | **The dot grid marks a raw or unresolved surface** (§4a texture). | The dotted diamond floor is in every picture: dots, a dashed edge and a soft brandeis-50 inset. It is the stage, not a meaning. | **Follow, and rename it.** The floor is now the family's signature ground, and ch05's "dashed ground diamond" device already allows it. If the dot grid stops meaning "unresolved", say so in §4a, or keep dots off unresolved things to avoid the clash. |
| 10 | **Left-facing; sequences read left to right** (`2026-09-28-illustrations-face-left…`). | Mixed. The heroes mostly turn their screens toward the right-hand wall, and Modernisation's mirror flipped the UI as well. | **Hold the rule and add a clause:** mirror the projection, never the interface. A sidebar stays on the left of its screen and a back arrow points back. That is exactly the bug Bhumika hit (call, 30 Oct). |
| 11 | **Layers carry up; the item changes form per layer** (`2026-09-28-illustration-layers-carry-up`). | Mostly replaced by one focal object and two to four supporting parts. Where layers remain (PD: thinking flat on the floor, the product standing up; Modernisation: faded earlier stages), they still read upward or forward in time. | **Keep it as a rule for layered pictures only.** It no longer describes every illustration. |
| 12 | **The family is one system** (ch05 §4: "one projection, one family"). | Families now share a **habit** (round 3 grammar): Product Design's thinking flat and screens standing; Modernisation's pinned landmark that never moves; Design Systems' same five parts; AI's badge on the AI's output with the person's control in lime; Industries' one real object drawn large. | **Adopt it.** It is the most useful new idea for the small drawings (§ 3). |

## 3 · Drawing the smaller illustrations in the same hand

Today the small drawings are in two older hands:
- **The Reasons and engagement figures** (`public/illustrations/reasons`, `engagement`) are strict ch05:
  square slabs, a peridot box as the carried item, and a translucent lime path.
- **The flat `Sketch` scenes** use neutral grey frames with one blue subject.

Next to the new heroes, both will read as a different studio. Below is how the techniques carry down. It sits
inside the existing two-questions rule (`2026-10-26-flat-or-isometric-two-questions`): a surface gets a flat
drawing, an object or claim gets an isometric one. Nothing here changes which tier a section takes.

### 3a · Techniques that survive the shrink, and the ones that don't

Small placements run from about 160px (a list thumbnail) to 326px (the phone column) and about 400px (a
Reasons figure).

| Technique | At small size |
|---|---|
| One hero object, solid blue, with thickness | **Keep. It's the best one.** The slab's edge gives a small drawing its weight. Use one per drawing. |
| Supporting parts | **Cut from 2–4 to 1–2.** A third part merges with the others at 160px. |
| One lime focal fill | **Keep.** It is the only colour accent a small drawing gets. Use a fill only; no ring or rod. |
| Dotted floor diamond | **Keep it as the tint inset only, without the dots or the dashed edge.** Below about 240px the dots turn into grey noise. ch05 §4 already says "larger dots at a wider pitch"; at small sizes, drop them. |
| Rounded corners | **Keep, scaled to the drawing.** The screen corner stays proportionate, so a small screen doesn't become a pill. |
| Pawn people | **Only where the person is the point, and only from about 280px up.** Below that, a person is a solid blue dot on a seat, which is ch05's own fallback. |
| AI badge | **Only from about 280px up,** and only if decision 1 keeps it. At 160px the two letters are unreadable, so put a lime fill on the AI's output instead. |
| Faded earlier stages (Modernisation J11, PD V17) | **Keep. It's cheap and reads at any size.** Two or three stacked sheets with falling opacity say "before" without a word. The flat grammar's "sheets behind" is the same device. |
| Weight | **One thin outline,** the same 1.25 proposed in row 4, non-scaling, so a small drawing gets denser, not fainter. This matches the flat grammar's rule. |

### 3b · The family habit carries down the page, as vocabulary, not as copies

The strongest move available: on a service page, the small drawings borrow **the hero's habit**, so the page
reads as one argument from the fold down. Each drawing is still drawn new from its own item's words
(`2026-10-13-no-reused-graphics-as-standins`, `2026-10-26-service-items-drawn-per-item`). The habit is a shared
grammar, never a reused picture.

| Page | Hero habit | How "What you get", "Where we start" and Reasons can borrow it |
|---|---|---|
| Product Design | The thinking lies flat on the floor; the screen stands up from it | Each item is one small flat plan with a single screen rising from it. What changes per item is what's on the plan: roles, states, a route. |
| Product Modernisation | One landmark stays fixed while the rest changes | Every item shows the same screen corner with the landmark in the same place, and only the part the item is about changing. Faded behind = before. |
| Design Engineering | A browser or code panel, with something tried by hand | Each item pairs one component with its code panel, and the item's subject is the one lit part. |
| Design Systems | The same five small parts keep appearing | The five parts become the page's alphabet. Each item arranges them differently: in a tray, on a screen, with one missing, one marked. |
| AI Product UX | The badge sits on what the AI made; the person's control is lime | Each item shows the AI output, marked, plus the person's control in lime: pause, approve, undo. |
| Software Development | What sits behind the screen, with the design visible as its source | Each item is a screen with one layer pulled out beneath it. |

### 3c · What it would take

1. **One proposed ruling** that names the shared hand for both tiers:
   - the corner scale;
   - the outline weight;
   - the hero slab and its unit;
   - the lime focal fill;
   - the floor inset;
   - the figure, after Jatin.

   Logged `proposed` until drawn and seen. Rows 1–6 and 9–10 of § 2 feed it.
2. **One mock**, before any code (`decisions/2026-10-15-design-fidelity-before-code`). Take the Product Design
   service page and redraw its small drawings in the hero's habit at their real sizes, next to today's:
   - What you get;
   - Where we start;
   - the three Reasons.

   The owner judges by eye.
3. **Leave the approved bento alone.** The home What-we-do tiles were locked on 25 Oct
   (`2026-10-25-bento-drawings-tell-their-story`). Whether they recolour toward the new hand is a separate
   owner question, not a side effect.

## 4 · Production notes for the finishing pass (Bhumika)

The finished vectors should meet ch05 §4a mechanically, whatever the owner rules on the rows above:
- **Thickness:** one side-face path per edge, two flat tones with the darker on the left. Never a stack of
  offset copies, and never a gradient. Today one slab is 16 identical rects in DE F4 and 32 in AI-UX B4.
- **Weight:** every stroke non-scaling (`vector-effect: non-scaling-stroke`). One outline weight, no 3.4px
  details, no cased rods.
- **Lines:** every connector on x, y or z, turning at corners. That covers the spokes in DS R4 and the leaders
  in PD V18.
- **Mirroring:** mirror the projection, not the UI. Sidebars and arrows keep their real-world side.
- **Rings:** a dotted blue outline or a light fill in place of the thick lime ring (Jatin and Bhumika, 30 Oct).
- **Exports:** one per ground, paper and paper-deep (§9a), plus a purpose-drawn 3:2 phone crop (round 3's
  phone-first rule).
- **Colours:** palette tokens only. Drop `#3D6BFF`.

## 5 · Questions only the owner can answer

1. **Figures (row 1):** do people enter the illustration system, and is Jatin's Tcules person the one figure?
   This blocks the ruling in § 3c.
2. **Peridot (row 5):** does peridot become "the focal thing" rather than "the carried item" in ch05 §4b?
3. **The AI badge:** yes or no. This is round 3's decision 1, still open.
4. **Flat tier:** should the flat `Sketch` scenes move from neutral grey frames to the heroes' blue line and
   brandeis tints, for one hand across the page? It changes approved drawings, so it is the owner's call.
