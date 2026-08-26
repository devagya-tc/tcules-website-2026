# What the ListCard spec got wrong, and why the process let it

Written 25 Aug 2026, after the Cards 1a redesign of `BlockCard` and `ListCard` surfaced a run of
issues in one component that individually looked like taste and together looked like a pattern.

This is a review of the **process**, not of `ListCard`. It is filed for a later pass at
`docs/component-spec-template.md`, `docs/prompts/component-spec-brief.md` and the
`/build-from-spec` and `/audit-component` gates. Nothing here is a task list for the component.

## Scope note, so this document is not read as more than it is

One finding that appeared in the first draft of this review has been **withdrawn**: that `ListCard`
was overloaded because it serves numbered sequences, clickable listing rows and plain content lists
from one API. That is the component being reusable, which is the point of a Tier 2 pattern. A row
with an optional marker, an optional link and a title/body pair is one job with three content
shapes, and the `titleAs: 'span' | 'h3' | 'h4'` union with a `span` default is the correct API for
exactly that spread — `span` for a content list, a heading for a sequence or a listing row.

The findings below are the ones that survive that correction.

## 1 · "Non-blocking" was read as "needs no answer"

`ListCard.md` § 17 asks six questions. One is marked blocking, carries a real `**Answered:**` line,
and the owner **overruled** the recommendation — (a) was recommended and (b) shipped. That is a
healthy decision trail and it is what the process is for.

The other five are marked _non-blocking_ and carry only `**Recommendation and draft decision:**`.
None of them has an `Answered:` line. The build adopted the spec author's own drafts, so five design
decisions shipped without a second opinion:

| Q   | Draft that shipped unratified           | What it turned into                            |
| --- | --------------------------------------- | ---------------------------------------------- |
| 2   | one `arrangement` prop                  | held up                                        |
| 3   | ruled only, never a fill                | the prohibition that now blocks a hover ground |
| 4   | the number as zero-padded `--text-stat` | a 40px marker over a 22px title                |
| 5   | `titleAs` union, `span` default         | held up                                        |
| 6   | one whole-row anchor                    | held up                                        |

Three of five held. The two that did not were the two nobody looked at twice.

Question 4 is the sharpest case, because the draft states its intent plainly: _"Its scale makes
sequence the row's first read."_ That is a real design position — the ordinal before the title — and
it is the opposite of what the component's owner wanted when they finally saw it rendered. The
process had no step at which anybody was asked to agree with it.

**The fix is a gate, not a rule.** `/build-from-spec` already refuses a spec marked `draft` and one
carrying an unanswered BLOCKING question. It should also refuse an unanswered non-blocking one.
"Non-blocking" is a statement about sequencing — it means _this does not stop code starting_ — and it
was read as _this does not need deciding_. Deleting the phrase "draft decision" would remove the
ambiguity in one edit: a question is answered, or the spec is still draft.

## 2 · The template has no section for visual hierarchy

Eighteen sections: identity, anatomy, props, variants, states, colour, geometry, typography,
responsive, composition, accessibility, edge cases, motion, do's and don'ts, specimen plan, tokens,
open questions. **Every one asks whether the component is correct. None asks whether it is right.**

That is the direct cause of the marker problem, and the shape of the failure is worth seeing:

- § 8 records the title as `--text-h5`. True.
- § 8 records the number as `--text-stat`. True.
- § 7(b) discusses the number's optical column. True.
- Nowhere do 22px and 40px appear in the same sentence.

Three accurate statements, one inverted hierarchy, and no section whose job is to compare the parts
against each other. § 8 never argues _why_ h5 either — it states it, and § 17 q5 treats "Visual h5"
as a given while debating only the element. The scale was inherited, never chosen.

`CLAUDE.md` predicts this exactly: verify "[does not see] a token name that exists but is the wrong
step … or whether the composition is any good. Those are the eye's job, and the squint test below is
the standard." The only squint test in the template is § 15's, and it is aimed at the **specimen
page's layout** — which passed, because the page reads fine as a page.

**The fix:** one table in the template ranking every anatomy part by intended emphasis, and one
sentence naming what the component's first read should be. A spec that had to write "first read:
the title" next to a table listing the marker at 40px and the title at 22px could not have shipped.

## 3 · The self-audit can only catch inconsistency, never judgment

The appendix runs about thirty checks and every one maps to a section that already exists. Two real
examples from `ListCard.md`:

- `[x] Hover and pressed differ on all four surfaces through link ink and rule width` — true, and it
  never asks whether an 18px glyph is adequate hover feedback for a 1240 × 94px target.
- `[x] Every layout distance is a gap-scale role` — true, and it never asks whether `--gap-text`,
  the _dense table_ step, is enough block padding for a full-width editorial row.

Every problem found in this component was **wrong but internally consistent**, which is precisely
the class the audit is blind to. It is a lint pass wearing the costume of a design review, and its
green ticks were read as design approval.

## 4 · The corpus was counted from the old codebase, on the wrong axis

§ 1 claims evidence: "The component appears on 53 routes in 70 sections. A list contains 2–12 rows;
seven sample-finding lists contain 10–12." § 4 counts "the 21 title-left / body-right sections" and
"the 11 title-plus-body sections."

The new site has one route family built. Those are counts of `../tcules-website`. `CLAUDE.md` is
explicit that the old repo is "reference for **specific, named things only** — never for patterns,
never for 'how did we do this before'." So the spec's evidence base is the one source that rule
prohibits patterning from, and `BlockCard.md` carries the same shape of claim ("38 routes in 78
clusters", "468 H3 sub-items").

The counts are not worthless — they tell you volume, and volume is a real input. The failure is that
they were counted along the axis the old site happened to vary (**layout**: split versus stacked) and
then treated as a brief. A spec derived from "21 split, 11 stacked" optimises a layout distinction. It
never had to ask what the rows were _for_, which is the question that would have set the title's
scale and the row's air.

**The fix:** when a spec cites the old codebase, it should say so in the sentence, and the number
should be labelled as volume rather than as a requirement.

## 5 · A prohibition outlived its reason, with no record of its scope

§ 1 states `ListCard` "never paints a fill or a surrounding edge", and § 17 q3's draft justifies
ruled-only because "a neutral fill would duplicate `BlockCard`".

That argument is about a **rest** fill used for rhythm, and it is a good argument. It says nothing
about a **hover** ground, which is not a rhythm choice at all. The rule is now being enforced against
a case it was never written about, and because q3 was never ratified there is no record of whether
hover was considered and rejected or simply never raised.

**The fix:** a prohibition in § 1 or § 4 should name the case it is refusing, not just the outcome.
"No rest fill, because that is BlockCard's boundary" leaves hover open on purpose. "Never paints a
fill" closes a door nobody meant to close.

## 6 · `design:check` does not catch a doc naming a deleted component token

Found on 26 Aug while removing `--lcrd-rule-ink-hover` after one day. The spec named it in three
places, the token was gone from the layer, and `npm run design:check` still reported "every token
named in the docs resolves in the token layer".

The check appears to treat a component's own `--{abbrev}-*` prefix as declared-by-that-spec and skip
it, which is reasonable for a spec proposing a layer and wrong for one documenting a shipped layer.
`BlockCard.md` has the same exposure: it names `--bcrd-edge-ink`, `--bcrd-link-ink` and
`--bcrd-cta-text` as removed, and nothing verifies that the ones it does **not** mark as removed
still exist.

The gap matters because this check is the only thing standing behind the promise in its own failure
message — "a token or glyph name in a doc is a promise to a designer who cannot read the repo." It
keeps that promise for every prefix except the component's own.

**The fix:** cross-check a spec's `--{abbrev}-*` mentions against that component's registered token
file, and allow a name to be absent only where the surrounding prose marks it removed.

## 6 · Editing note for whoever picks this up

Two of the findings above (2 and 3) are template changes and would apply to all eleven shipped
specs, not only `ListCard`. Findings 1 and 5 are process and wording changes. Finding 4 is a
convention for citing the old repo.

Worth doing in the same pass: three components read a type role raw with no component token —
`Proof` (`--text-h3`), `Accordion` and `EnquiryForm` (both `--text-h5`) — which is a straight
violation of the component-layer rule that `tokens:check` does not catch, because the `var()`
resolves fine.
