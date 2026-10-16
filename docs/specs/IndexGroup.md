# IndexGroup

## 0 · Front matter

| | |
|---|---|
| **Tier** | 2 pattern (`src/patterns/`) |
| **Status** | implemented |
| **Token prefix** | `--igrp-*` |
| **Designer / date** | Claude, owner direction, 15 Oct 2026 |
| **Implements** | Listings redesign brief (15 Oct 2026, after claude.com/resources) |
| **Implemented at** | `src/patterns/IndexGroup/`, `src/styles/tokens/components/index-group.css`, `/design/index-group` |

## 1 · Identity
One category of an index page, as a section in the column beside the page's outline rail: a
hairline, a heading with its derived count and one sentence, the way out at the row's end, then the
items. Tier 2 because it composes Layout and sits under templates in two places (InsightsIndex and
CaseStudyIndex); built once instead of inline twice.
It is NOT a band (ContentSection owns a Section and cannot be nested beside a rail); NOT the outline
(TableOfContents); NOT a card (BlockCard / ListCard are the items it holds). Several per page, one per
category, always inside a `Layout rowGap="stack"`.

## 2 · Anatomy
| Part | Element | Required |
|---|---|---|
| group | `<section id aria-labelledby>` | yes |
| head | Layout `rowGap="tight"` with the top hairline (`.head`) | yes |
| heading row | Layout `{base:1, md:[1,'auto']}`, `align="baseline"`: the heading and the actions (only with actions) | — |
| heading | `h2` at the h3 role on the title measure (`.heading`) | yes |
| meta | `p`, mono eyebrow role (`.meta`) | optional |
| lead | `p`, sans small body on the lead measure (`.lead`) | optional |
| actions | caller's ReactNode (a CtaRow) at the row's end | optional |
| body | children | yes |

## 3 · Props / API
| Prop | Type | Default | Decides |
|---|---|---|---|
| `id` | `string` | — | the section's anchor |
| `heading` | `string` | — | the h2 text; under 40 characters so it serves the rail |
| `headingId` | `string` | — | the h2 id; what the rail links to and the section is labelled by |
| `lead` | `string?` | — | one sentence |
| `meta` | `string?` | — | a derived fact ("5 cases"), passed in sentence case |
| `actions` | `ReactNode?` | — | the way out, composed by the caller (a pattern does not import a pattern) |
| `children` | `ReactNode` | — | the items |

Not props: `surface` (read from the enclosing Section), colour, spacing, heading level (always h2 —
groups are the page's second level), heading size.

## 4 · Variants × sizes
None. One size: a group heading is one step under a band's h2 by ruling ("smaller type generally"),
so the item titles under it lead.

## 5 · States
None: nothing in the group responds to a pointer; the items and the CtaRow carry their own states.

## 6 · Per-surface colour
| Token | paper | tint | ink | blue |
|---|---|---|---|---|
| `--igrp-rule` | neutral-300 | neutral-400 | neutral-700 | brandeis-300 |
| `--igrp-heading-ink` | neutral-900 | neutral-900 | white | white |
| `--igrp-meta-ink` | neutral-600 | neutral-700 | neutral-400 | brandeis-100 |
| `--igrp-lead-ink` | neutral-700 | neutral-700 | neutral-300 | brandeis-100 |

Geometry (`:root`): `--igrp-heading-text`, `--igrp-heading-tracking`, `--igrp-heading-measure`,
`--igrp-meta-text`, `--igrp-meta-tracking`, `--igrp-lead-text`, `--igrp-lead-measure`,
`--igrp-rule-width`.

## 7 · Geometry & spacing
Hairline `--border-width-hairline` on the head's block-start; `--gap-block` (24) padding above the
head. Head internals `tight` (8); heading to actions `block` (24) when they wrap below 768; head to
body `stack` (48). The group sets no outer margin; the caller's stack sets **`stack` (48)** between
groups (decided once, 16 Oct 2026, superseding the 64 of fix round 1 and the brief's 96). The step is
the relationship: groups are blocks inside ONE section, and block to block in a section is `stack`
by the gap table. `section` (96) is band padding or a split between regions of different kind;
`column` (64) is reserved for peer halves side by side and the row seam of a borderless card set, and
using it here argued a third meaning in a comment the table did not carry. The break between
categories is made by the group itself, not by the stack: its hairline and its 24 of head air, so
the seam reads 48 + rule + 24. A row list in the body ends WITHOUT its closing rule (ListCard
`rule="none"` on the last row), because the next group's hairline is the seam and two rules 48 apart
read as a stutter (critique 16 Oct 2026). Head to body is `stack`, not `block`: the head is a
category's head over a whole set, not a card's head over its body.

The heading takes `--igrp-heading-measure` (`--measure-title`), so a heading that outgrows a rail
label wraps to balanced lines instead of running the column.

## 8 · Typography
Heading `--text-h3` + `--text-h3-tracking` (serif). Meta `--text-eyebrow` + tracking +
`--text-mono-case`. Lead `--text-body-sm` (sans), `--measure-lead`.

## 9 · Responsive
Below 768 the actions drop under the heading; from 768 they sit at the heading row's end, on the
heading's last baseline (Layout `align="baseline"`; critique 16 Oct 2026 — bottom-aligned to the whole
head, the action sat 14px under the heading whenever a count or a line followed). The count and the
line run under that row. Type re-declares itself at the title roles' breakpoints; no media query of
its own.

## 10 · Composition
In the `[1, 4]` shell beside `TableOfContents` (LongformShell's arrangement), inside a
`Layout rowGap="stack"`. The outline's entries carry each group's count (`TocItem.meta`). Holds a BlockCardSet, ListCard rows, a Slider or a TestimonialBeside.

## 11 · Accessibility
A `section` labelled by its h2; the rail's hrefs target the h2 ids, which must be unique per page.
Headings run h1 → h2 (groups) → h3 (cards).

## 12 · Content edge cases
A long heading wraps on the title measure and title wrap and never pushes the action off (auto
track). Blank lead or
meta render nothing. An unbroken word breaks (`overflow-wrap: anywhere`).

## 13 · Motion
None.

## 14 · Do's and Don'ts
Do derive `meta` from the data. Don't author copy for it, don't put an image beside the head (the
cards are the shape), don't add a ground to a group.

## 15 · Specimen plan
`/design/index-group`: in its shell with the rail (counts in the outline); heading alone; meta only;
lead only, over event rows led by their dates; long heading against an action, wrapping on its
measure; cover tiles and hairline rows; paper, tint, ink. Blue is not rendered: blue is never
a ground (owner ruling, § 4.3); its token block is declared for self-containment only.

## 16 · New token requests
`--igrp-*` only, in `tokens/components/index-group.css`, registered in `tokens/index.css`.

## 17 · Open questions
None. The owner set the direction (15 Oct 2026).
