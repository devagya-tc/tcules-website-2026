# Contrast

## 0 · Front matter

| | |
|---|---|
| **Component** | `Contrast` |
| **Tier** | 2 pattern (`src/patterns/Contrast/`) |
| **Status** | implemented — `cmp-readdown`, 6 Oct 2026. Built to the family brief and `docs/kit/visual-direction.md` (§ 3.4 N, § 3.6 "Fit", § 1.4 N, § 1.5 "N contrast item"), which win where this spec differs. |
| **Token prefix** | `--cntr-*` |
| **File** | `tokens/components/contrast.css` |
| **Designer / date** | Claude Code · 6 Oct 2026 |
| **Implemented at** | `src/patterns/Contrast/` · `src/styles/tokens/components/contrast.css` · specimens `src/app/design/contrast/page.tsx`, `src/app/design/kit/readdown/page.tsx` |

## 1 · Identity

Two lists that mean opposite things — what the work is for, and what it is not — in peer halves. The
owner-approved Fit (1 Oct 2026) promoted from `ServicePage/Blocks.tsx` **unchanged in look**;
`cmp-service-pages` swaps it into the template. A block, not a band: it sits in a ContentSection body
under an H-title (§ 1.4 N: 133 + 394 = 527).

## 2 · Anatomy

| Part | Role | Ink |
|---|---|---|
| List heading | `--text-h4`, `h3` (or `h4`) | ink |
| Opening rule | `--border-width-1`, the list's top edge | neutral, decoration |
| Item | `check-circle` / `close-circle` at `xl` (24), `text` (16) to its words at `--text-body-lg`; `text` block inset; hairline close | words ink |
| Check | the glyph of the `yes` list | **blue** (§ 4.2), brandeis-500 → 300 on ink → white on blue |
| Cross | the glyph of the `no` list | **quiet ink** (§ 4.3: it only says "not this one") |

**Glyph ink, and the brief's wording (fix round 1).** The kit brief asked for the glyphs "in the text's
own ink". They are not, on purpose: Fit as the owner approved it draws the check in brandeis-500 and
the cross in neutral-600 (`--cntr-yes-ink` / `--cntr-no-ink`), and "unchanged in look" is the binding
half of the same brief. It is also the 6 Oct blue ruling (§ 4.1, blue is the recurring foreground
accent, markers included). The reading this spec takes, for the integrator to confirm: **the glyph
SIZE follows the text (xl beside body-lg), the glyph INK follows § 4.2 / § 4.3**, and "the text's own
ink" in the brief is superseded wording.

## 3 · Props

| Prop | Type | Default | |
|---|---|---|---|
| `yes` | `{ heading, items }` | — | ≤ 4 items, ≤ 14 words each |
| `no` | `{ heading, items }` | — | ≤ 4 items, ≤ 14 words each |
| `headingAs` | `'h3' \| 'h4'` | `h3` | element only; the scale is h4 either way |

Blank items are omitted with a development warning; a fifth item warns and renders.

## 4 · Arrangement

`Layout columns={{ base: 1, lg: 2 }} colGap="column" rowGap="stack" align="start"` — peer halves at 64
from 1024 (§ 3.2), stacked a `stack` apart below, top-aligned so the headings share a line. Each list is
heading → `block` (24) → the ruled list (`rowGap="none"`). No margin, no local grid.

## 5 · Rules the composition keeps

- ≤ 1 per page (§ 3.3 declared exception); it has no image, so the bands either side carry one.
- A footer CtaRow under it takes `rule={false}`: the lists' last hairlines already close the body (§ 3.1).
- The glyph is `aria-hidden`; the heading states the polarity in words, so neither colour nor glyph is
  the only signal.

## Amendment · 6 Oct 2026 — `page-product-design` fix round 2: `emphasis`

`emphasis?: 'peer' | 'yes'`, default `peer` (the halves above). `yes` makes the needs the primary
column — `[2, 1]` from 1024, its items two up from md at the h5 role — and the exclusions the
narrower, quieter boundary: the heading at the same h4 role in quiet ink (so the two opening rules
share a line), items at body in quiet ink (`--cntr-item-ink-quiet`), a `lg` cross. Two equal text
lists of hairline rows read as a document table, with dead runs beside the short items. New tokens:
`--cntr-item-text-primary`, `--cntr-item-tracking-primary`, `--cntr-item-text-quiet`,
`--cntr-heading-ink-quiet`, `--cntr-item-ink-quiet`, every surface. Specimen: `/design/contrast` 1b.
