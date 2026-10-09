# Slider

## 0 · Front matter

| | |
|---|---|
| **Component** | `Slider` (and the `scroll` mode of `Layout` it drives) |
| **Tier** | 2 pattern (`src/patterns/Slider/`); the scroll mode is tier 1 (`src/components/Layout/`) |
| **Status** | implemented — `fdn-scroll`, 6 Oct 2026. Amended 7 Oct 2026 (r7-testimonials): `autoplay`. No spec → owner step for kit foundations: `docs/kit/visual-direction.md` is the decided direction, and it wins where this spec and it differ. |
| **Token prefix** | `--sld-*` (Slider); `--lay-scroll-*` (Layout's scroll row) |
| **File** | `tokens/components/slider.css`; `tokens/components/layout.css` |
| **Designer / date** | Claude Code · 6 Oct 2026 |
| **Implements** | visual-direction § 1.3 ("a slider is measured at its tallest slide plus its controls"), § 1.4 ("Slider controls 24 + 40 = 64"; C-image-5+ "Slider showing 3"; G slider; rule 3), § 3.1 (slider controls keep a box), § 3.4 C and G, § 3.7 item 2 (`scroll="until-md"`), § 4.2 (the slider pager's current marker is Free), § 6.3 (no texture inside a slider), § 11 item 6 |
| **Implemented at** | `src/patterns/Slider/` · `src/styles/tokens/components/slider.css` · `src/components/Layout/` (`scroll`, `ref`, `tabIndex`) · `src/styles/tokens/components/layout.css` (`--lay-scroll-*`) · specimens `src/app/design/slider/page.tsx` and `src/app/design/layout/page.tsx` (scroll rows) |

There is no `docs/specs/Layout.md`: Layout's docblock and prop docs are its spec, and they carry the
scroll mode. This file states the scroll mode too, because the Slider is its reason for existing.

### Amendment — 7 Oct 2026 (r7-testimonials): `autoplay`

The owner asked for the typographic testimonial "inside the auto-advancing Slider". `autoplay` (default
`false`) and `interval` (default 8000 ms) are new props, one per view only — any other `perView` ignores
`autoplay` with a development warning. With it:

- the rail is replaced by a **stepper**: one step per slide, a mono numeral (`--text-index`, from md) over
  a line at `--sld-step-length`, in a `--sld-step-target`-tall button named "Slide n of N" with
  `aria-current` on the current one. The current line fills over the hold (`--slider-step-progress`,
  written each frame by the clock, as the thumb's `--slider-progress` is). Below md the numerals drop and
  the lines alone are the stepper. Step ink is `--sld-step-fg` / `--sld-step-fg-current`, per surface;
  the line and fill reuse `--sld-progress-rail` / `--sld-progress-thumb`;
- a **rotation control** (Button outline lg, `chrome-pause` / `chrome-play`, named "Pause slides" /
  "Play slides") leads the stepper (WCAG 2.2.2);
- the turn **holds** while a mouse rests on the slides or focus is inside them, and resumes from where it
  froze; the control row does not hold it, so Play under the pointer plays;
- it **never starts** before hydration or for a reader who prefers reduced motion — Play starts it;
- it wraps from the last slide to the first, and it is silent: the status line still speaks only after
  a reader's press.

Controls keep their 48 circle in a crowded row (`flex: none`); the steps give way.

## 1 · Identity

A row of slides you move sideways — the kit's answer to an image set of five or more (§ 1.4 rule 3: a
3 × 2 grid of image cards is 826 tall and does not fit), and to the G testimonial slider (§ 3.4). The
row is a CSS scroll-snap row (`Layout scroll="always"`); the Slider adds a pair of previous / next
controls and a progress rail 24 under it.

A pattern because it takes slides as content and composes `Layout`, `Cluster` and `Icon`. A client
component because it holds a ref, scroll listeners and the controls' state.

What it is **not**:

1. **Not autoplay.** Nothing moves that the reader did not move; there is no timer and no rotation
   control to need.
2. **Not a tab set.** It shows several slides at once and has no picker per slide; a tabbed feature
   (QuantumLab's principle tabs) is a different unit.
3. **Not a grid with arrows.** A set that fits at every width is a `Layout` grid; the Slider starts at
   five (§ 1.4 rule 3).
4. **Not a texture host** (§ 6.3, rejected: texture inside a slider).

**Layout's scroll mode on its own** (`scroll="until-md"`) is § 3.7 item 2: a linked card set of more
than three is one sideways row below 768 — one card in view and the next peeking — and the ordinary grid
from 768 up. It needs no Slider: below 768 the peek and Tab are the affordances.

## 2 · Anatomy

| Part | Element | Required | Notes |
|---|---|---|---|
| `root` | `section aria-roledescription="carousel" aria-label={label}` | yes | `.slider` + `.view{n}`; inline `--slider-count`. |
| `frame` | `div` (a `Layout`, `rowGap="stack"`) | yes | Row above, controls below, 48 apart (`stack`; was `block`, 24, until cmp-services 6 Oct). |
| `row` | `ul` (a `Layout scroll="always"`, `colGap="gutter"`) | yes | `id` = the controls' `aria-controls`. `tabIndex=0` after hydration only when no slide holds a focusable element. |
| `slide` | the caller's `li` | yes, ≥ 1 | A `BlockCard` is one; anything else is wrapped in an `li` at the call site. Dev warning otherwise. |
| `controls` | `div` (a `Cluster`, `nowrap`) | yes | `start`: rail ⟷ the two controls (`justify="between"`). `center`: previous · rail · next. |
| `control` | `Button emphasis="outline" iconOnly extendHitArea` × 2 | yes | `arrow-left` / `arrow-right` (`Icon`). Native `disabled` before hydration; `aria-disabled` at an end. |
| `rail` | `span aria-hidden` › `span.thumb` | yes | Decoration; the thumb is the current marker. |
| `status` | `p aria-live="polite" aria-atomic="true"` | yes | Visually hidden; written only after a control press. |

## 3 · Props / API

**Slider**

| Prop | Type | Default | Decides |
|---|---|---|---|
| `label` | `string` | — | The carousel's accessible name ("Client stories"). Required; not rendered (the band's heading is the visible name). |
| `children` | `ReactNode` | — | The slides, each one `li`. |
| `perView` | `1 \| 2 \| 3 \| 4` | `3` | Slides in view at the widest step; the Slider owns the ladder (§ 4). |
| `align` | `'start' \| 'center'` | `'start'` | Where the controls sit: under a left head, or under a centred one (§ 3.5). |
| `bleed` | `boolean` | `false` | **6 Oct (cmp-services).** From md the row runs past the column's end edge to the viewport's (measured, written as `--slider-bleed`), so the next slide shows in the margin and the set reads as a rail. The tracks are unchanged; the bleed is end padding the overflow paints into. Row to controls is now `stack` (48), not `block`. The bleed is re-measured by a ResizeObserver on the root element and on the slider (cmp-services fix round 2), not on window `resize`: a classic scrollbar appearing after mount, or a layout shift, left it stale by the scrollbar's width. |

Deliberately not props: autoplay, loop, a per-slide picker, a step size (always one slide), any gap
(always `gutter`), `surface` (read from the band), `className`/`style`.

**Layout** (additions)

| Prop | Type | Default | Decides |
|---|---|---|---|
| `scroll` | `'until-md' \| 'always'` | — | The row scrolls sideways below 768, or at every width. In scroll mode `columns` names how many items are **in view** per breakpoint (counts, not ratios; a bare `3` is base 1, md-up 3). |
| `ref` | `Ref<HTMLElement>` | — | The rendered element, for a caller that drives a scroll row. |
| `tabIndex` | `0 \| -1` | — | Only for a scroll row whose items hold nothing focusable. |
| `peek` | `boolean` | `true` | Whether a scroll row shows `--lay-scroll-peek` of the next item below md. `false` shows exactly the count at every width. The Slider passes `false` at `perView={1}` (amended 6 Oct 2026, cmp-testimonials): a one-up slide is a composite, and its neighbour's edge read as a stray portrait sliver. Ignored without `scroll`. Rendered on `/design/layout`. |

## 4 · Variants × sizes

`perView` is the size axis. Per-breakpoint counts. At 2, 3 and 4 the base shows one slide plus a 24 peek and md up is exact; at 1 there is never a peek, at any width (amended 6 Oct 2026, cmp-testimonials — `peek={false}` on the row):

| `perView` | base | md 768 | lg 1024 | xl 1440 | Use | Track at 1440 |
|---|---|---|---|---|---|---|
| 1 | 1 (no peek) | 1 | 1 | 1 | G testimonial (featured slide) | 1240 |
| 2 | 1 | 2 | 2 | 2 | pair cards | 604 |
| 3 | 1 | 2 | 3 | 3 | C-image-5+ | 392 |
| 4 | 1 | 2 | 3 | 4 | Card-4 sets (`BlockCard size="sm"`) | 286 |

`align`: `start` (rail at the start, controls at the end) or `center` (previous · rail · next, centred).

## 5 · States

| State | Control | Rail |
|---|---|---|
| before hydration | native `disabled`, neutral | thumb at the start, its CSS length |
| rest | blue glyph, blue hairline rule, no fill | thumb = view ÷ count of the rail |
| hover / focus-visible | filled with the surface's primary, glyph to the fill's label colour; focus adds the ring | — |
| pressed | the fill one step deeper | — |
| at an end | `aria-disabled="true"`, neutral rule and glyph, no fill on hover or press; keeps focus and its ring | thumb at that end |
| nothing to scroll | both controls at an end | thumb fills the rail |
| row focused (no focusable slides) | — | the row draws the ring round itself |

Hover ≠ pressed on every surface (`--btn-outline-primary-bg-hover` ≠ `-pressed`). The controls are Button's `outline` emphasis; their colour tokens live in `button.css`.

## 6 · Per-surface colour

| Token | paper | tint | ink | blue |
|---|---|---|---|---|
| `--sld-progress-rail` | `neutral-200` | `neutral-300` | `neutral-800` | `brandeis-400` |
| `--sld-progress-thumb` | `brandeis-500` | `brandeis-500` | `brandeis-300` | `white` |
| `--sld-ring-color` | `brandeis-500` | `brandeis-500` | `brandeis-300` | `white` |
| `--sld-ring-gap-color` | `paper` | `paper-deep` | `neutral-950` | `brandeis-500` |

**Blue at rest, counted Free.** The controls and the thumb are the slider's own navigation, like the
nav's and the TOC's current markers, which § 4.2's Free row already names ("the current marker in the …
slider pager"). The owner's 6 Oct ruling asks for blue in the foreground (arrows, small marks), and a G
band that spends Signal on its quote rule must still show where to go next. Recorded in
`docs/kit/brand-amendments.md` (ch02) and visual-direction § 4.2. A disabled control is exempt from
contrast (WCAG 1.4.3); the rail is decoration.

## 7 · Geometry & spacing

| Seam / size | Value | Why |
|---|---|---|
| slide ↔ slide | `--gap-gutter` (32) | peers in a row (§ 3.1) |
| row → controls | `--gap-block` (24) | § 1.4: controls 24 + 48 |
| rail ↔ controls, control ↔ rail (center) | `--gap-block` (24) | the rail and a control are two objects |
| control ↔ control (start) | `--gap-text` (16) | one pair, read as one group, never cramped |
| control | hit area | `--sld-hit-min` 44 | extended past the box, never by resizing it |
| control | Button `emphasis="outline"` `size="lg"`: a 48 circle | fix round 2, 6 Oct 2026 (cmp-testimonials): at 40 beside a 477 portrait the steppers read as an afterthought |
| glyph | `--btn-outline-icon-size-lg` → `--icon-size-24`, half the circle | was 18 |
| rail | `--sld-progress-length` 240 × `--border-width-2` | shrinks to fit a narrower row (`min()`, flex shrink) |
| peek (base) | `--lay-scroll-peek` 24 | a sliver of the next slide; a slice of an object, not air |
| ring room | `--lay-scroll-ring-room` = ring offset + width (4) | optical: the row pads by it and cancels it with an equal negative margin, so its clip never cuts an item's focus ring and the items stay on the column's edges |

Item width in a scroll row: `(100% − (view − 1) × colGap − peek) / view`, where peek = colGap + 24 at
base and 0 from md up. So three in view at 1440 are exactly a 3-up grid's 392.

Band arithmetic (§ 1.4): C-image-5+ = H-title 133 + Card-3 381 + 64 = 578. The G slider's row writes
eyebrow 14 + 24 + slide 477 + 64 = 579; built as a ContentSection with an eyebrow-only head, the head →
body seam is `stack` (48), so it is 603 — under the 638 limit, 5 over the 598 target. cmp-testimonials
owns the G band and its head, and decides which seam it takes.

## 8 · Typography

None of its own: the controls are glyphs, the status line is announced only. Slides bring their own.

## 9 · Responsive

The per-view ladder (§ 4). Below 768: one slide and a 24 peek; swipe moves the row, mandatory snapping
lands on a slide, and `overscroll-behavior-inline: contain` keeps a swipe that runs out of row from
becoming the browser's back gesture. The controls row never wraps (`nowrap`); the rail shrinks.

## 10 · Composition

```tsx
<section aria-roledescription="carousel" aria-label={label} className={…} style={{ '--slider-count': n }}>
  <Layout rowGap="stack">
    <Layout as="ul" id={rowId} ref={rowRef} scroll="always" columns={LADDER[perView]} colGap="gutter"
            tabIndex={tabStop ? 0 : undefined} className={styles.row}>
      {children /* each an <li> */}
    </Layout>
    <Cluster colGap="block" align="center" justify="between" nowrap>
      {rail}
      <Cluster colGap="text" align="center" nowrap>{prev}{next}</Cluster>
    </Cluster>
  </Layout>
  <p className={styles.status} aria-live="polite" aria-atomic="true">{status}</p>
</section>
```

Placed in a band's body — ContentSection's children — under its head. In a page:

```tsx
<ContentSection align="center" eyebrow="Recent work" heading="Six products, one way of working">
  <Slider label="Recent work" align="center">
    {cards.map((c) => <BlockCard key={c.href} {...c} tracks={3} />)}
  </Slider>
</ContentSection>
```

## 11 · Accessibility

APG carousel, adapted to a scroll-snap row:
- **Semantics before hydration.** The row is native scrolling, so it swipes, snaps and follows Tab
  without script. The controls render `disabled` until the script runs, so no press is swallowed.
- **Structure.** `section` with `aria-roledescription="carousel"` and `aria-label`. Slides are list
  items: position and count ("1 of 6") come from the list itself rather than hand-written labels.
- **Controls.** Real `button`s, "Previous slide" / "Next slide", `aria-controls` on the row (always
  rendered, so the idref always resolves). At an end, `aria-disabled` rather than `disabled`: a disabled
  button drops focus to the body. Hit area 44.
- **Keyboard.** Tab reaches every linked slide and the browser scrolls it into view (§ 3.7: a scroll row
  is allowed only where Tab can move it). A row whose slides hold nothing focusable takes `tabIndex=0`
  after hydration, draws its own ring, and scrolls slide by slide with the arrow keys (WCAG 2.1.1).
- **Status.** After a control press, once the row settles (`scrollend`, or 160ms after the last scroll
  event), a polite live line says what is in view: "Slides 4 to 6 of 8", "Slide 2 of 3". Never on load,
  never mid-swipe.
- **Motion.** No autoplay. `scroll-behavior: smooth` only under `prefers-reduced-motion: no-preference`;
  the control press uses the row's computed behaviour, so with reduced motion it jumps. The controls'
  fill transition is instant under reduce.
- **Focus rings** are never clipped by the row (the ring room, § 7).

## 12 · Content edge cases

| Case | Handling |
|---|---|
| Slides ≤ perView at a width | Nothing to move there: both controls at an end, the thumb fills the rail. A set that fits at every width should be a grid. |
| Two slides at perView 1 | One press to the end, one back. |
| Twelve slides | Thumb a third of the rail at perView 4; one press moves one slide. |
| A slide that is not an `li` | Invalid list; dev warning names the element. Wrap it in an `li`. |
| Slides with no link | The row takes the tab stop (§ 11). |
| Slides of uneven height | The row stretches every slide to the tallest (grid row); the band is measured at the tallest (§ 1.3). |
| Nested surface | Every `--sld-*` colour restated per surface (§ 6). |
| RTL | `scrollLeft` read as an absolute value and the step mirrored; untested beyond that. |

## 13 · Motion

The row's smooth scroll (reduced-motion aware, Layout's), and the controls' 140ms fill and colour
transition (`--duration-fast`, instant under reduce). The thumb follows the scroll position frame by
frame; it has no transition of its own.

## 14 · Do's and Don'ts

- **Do** pass `li`s: BlockCards as they are, anything else wrapped. `grep -n "<li" src/app/design/slider/page.tsx`
  shows the testimonial slides wrapped.
- **Don't** hand-roll layout in the module: `perl -0pe 's{/\*.*?\*/}{}gs' src/patterns/Slider/Slider.module.css | grep -nE 'display: (grid|flex)|margin' | grep -v 'calc(-1'`
  returns nothing (the control's `inline-grid` centres its own glyph; the status line's negative margin
  is the visually-hidden clip).
- **Don't** use `scroll="always"` without the Slider: it has no affordance on a desktop without a
  trackpad.
- **Don't** use `scroll="until-md"` on an unlinked set (§ 3.7): Tab cannot move it.
- **Don't** put a texture inside a slider (§ 6.3).
- **Don't** add autoplay.

## 15 · Specimen plan

`/design/slider`: (1) C-image-5+ under a centred head, `align="center"`, live band; (2) under a left
head, the default; (3) the G slider on tint, `perView={1}`, portraits; (4) the ladder: `perView` 4 and
2; (5) slides with nothing focusable (the row's tab stop); (6) edge counts: 3 at 3, 12 at 4, 2 at 1;
(7) four surfaces, identical markup, captioned as surface proof. `/design/layout`: `scroll="until-md"`,
`scroll="always"` with a per-breakpoint count, and `always` with no `colGap` (items touch).

## 16 · New token requests

`slider.css` (new layer, registered in `tokens/index.css` after `cta-row.css`): `--sld-progress-length`,
`--sld-progress-thickness`, `--sld-progress-radius`, `--sld-ring-width`, `--sld-ring-offset`,
`--sld-hidden-size` in `:root`; four colour tokens on all four surfaces (§ 6).

`button.css`: the `outline` emphasis the controls render as — `--btn-radius-round`,
`--btn-outline-rule-width`, `--btn-outline-primary-{fg,rule,bg-hover,bg-pressed,fg-hover}` and
`--btn-disabled-rule` on all four surfaces (moved from `--sld-control-*` in a fix round).

`layout.css`: `--lay-scroll-peek`, `--lay-scroll-ring-room`.

JS-injected custom properties (`scripts/tokens-check.mjs` `JS_INJECTED`): `--view-base/md/lg/xl`
(Layout), `--slider-count`, `--slider-progress` (Slider).

## 17 · Open questions

1. **Controls as Free blue.** *Chosen:* blue at rest and counted Free with the pager's marker. *Alternative:*
   Signal, which would collide with G's quote rule (≤ 1 kind per band). *Non-blocking; shown in the PR.*
2. **Step size.** *Chosen:* one slide per press. *Alternative:* a page (perView slides). One slide keeps
   the reader's place; a page halves the presses on a long row. *Non-blocking.*
3. **Rail length.** *Chosen:* a fixed 240 (a fifth of the column), because a primitive arrangement
   cannot grow a child to fill. *Alternative:* a full-width rail, which would need a fill track in
   Layout or Cluster. *Non-blocking.*

No BLOCKING question is open.

## Appendix — self-audit

```
STRUCTURE   [x] Sections 0–17 in order. Tier 2 (Slider) + tier 1 (Layout scroll), prefixes --sld-*, --lay-scroll-*.
NAMES       [x] Every token declared in slider.css / layout.css; slider.css registered.
COLOUR      [x] 11 tokens × 4 surfaces, none blank. Lowest rest glyph ratio 5.51:1 (tint).
STATES      [x] hover ≠ pressed on every surface; every state token on every surface.
LAYOUT      [x] Layout and Cluster only; the control centres its own glyph; no outer margin.
```
