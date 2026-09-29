import { Layout, Prose, Section } from '@/components';
import { TableOfContents, type TocItem } from '@/patterns';

import { Box, Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * TableOfContents specimen — one variant, one size, and two things that actually vary: ENTRY COUNT,
 * which is data, and ARRANGEMENT, which is a media query rather than a prop.
 *
 * Every rail below is a TRACK, not a band — the component sits inside somebody else's `Section` and
 * reads `data-surface` from it — so every band here is a real `Section` holding the two-column shell
 * from the spec's § 10. `align="start"` on that shell is load-bearing rather than tidy: a stretched
 * grid item fills its row and has nowhere to stick.
 *
 * WHAT THIS PAGE CANNOT FORCE, and the spec was wrong about one of them.
 *
 *   hover · pressed · tab focus   have no props, by design. Point at an entry, hold it down, and tab
 *                                 to it, on each of the four surfaces. The inward focus ring and the
 *                                 underline's wipe in particular have to be tabbed into to be seen.
 *   CURRENT                       the spec's § 15 said currency is "the only thing forcible from
 *                                 outside". It is not, and cannot be: § 3 rules out `activeId` on
 *                                 purpose, so the mark comes only from the observer. Every rail here
 *                                 is therefore LIVE and derives its own mark from where its own
 *                                 headings sit relative to the reading line. Scroll this page and
 *                                 they all move. A rail whose headings are still below the line
 *                                 marks nothing — which is the above-the-first-heading case, seen
 *                                 for free at the top of the page — and one you have scrolled past
 *                                 holds its LAST entry, which is the below-the-last-heading case.
 *   the 1024 switch               needs a viewport either side of it. Narrow the window: every rail
 *                                 stops being sticky, drops its 232px cap, takes the full content
 *                                 column, collapses into a closed <details> and stops marking
 *                                 anything, and the shell's second track disappears so the one
 *                                 "On this page" row sits directly above the body.
 *   the computed geometry         § 14 items 2, 3 and 7 name a computed grid, a computed
 *                                 `inset-block-start` of 104px, a computed `max-inline-size` of
 *                                 232px and a 45.70px row. There is no browser test runner in this
 *                                 repo, so those four are read once in devtools rather than
 *                                 asserted. Band 1 is where to read them.
 */

/** The audit family's median outline: eleven sections, real labels rather than lorem. */
const ELEVEN = [
  'Scope and boundaries',
  'What we review',
  'Component inventory',
  'The token layer',
  'Accessibility findings',
  'Performance and payload',
  'Content model',
  'Governance and ownership',
  'Migration sequence',
  'What we did not review',
  'Next steps',
] as const;

/** Eight, for the surface ladder — enough to read as a ladder, short enough to sit four times. */
const EIGHT = ELEVEN.slice(0, 8);

/** The corpus worst case: the terms of use, at nineteen. */
const NINETEEN = [
  ...ELEVEN,
  'Limitation of liability',
  'Client materials',
  'Fees and payment',
  'Termination',
  'Governing law',
  'Changes to these terms',
  'Your account',
  'Contact',
] as const;

/** The three real 71–77-character fallback headings, plus a pasted URL. */
const LONG = [
  'What we look at when we review a design system that has grown past one team',
  'How the token layer and the component layer disagree, and what that costs a reader',
  'Governance, ownership and the question of who is allowed to add a new component',
  'https://tcules.com/audits/design-system-review/findings/token-layer/naming',
] as const;

const slug = (prefix: string, label: string) =>
  `${prefix}-${label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 40)}`;

/** The outline a page hands the component: the label verbatim, the fragment its heading carries. */
const outline = (prefix: string, labels: readonly string[]): TocItem[] =>
  labels.map((label) => ({ label, href: `#${slug(prefix, label)}` }));

/**
 * The body track. Its text children CAP THEMSELVES at 68ch and its block children FILL it, which is
 * the composition the spec argues for and the thing to squint at: a page with a rail should not read
 * as one narrow column. The ragged inline end is the rhythm, not a defect.
 */
function Body({ prefix, labels }: { prefix: string; labels: readonly string[] }) {
  return (
    <Layout rowGap="stack">
      {labels.map((label, i) => (
        <section key={label} aria-labelledby={slug(prefix, label)}>
          <Layout rowGap="block">
            <h2 id={slug(prefix, label)}>{label}</h2>
            {i % 3 === 0 ? (
              <Prose html="<p>The rail beside this body is the observer's only client. It resolves the ids these headings carry and reports which one the reading line has passed, and it does not read this body for anything else — it never discovers a heading, it only resolves one it was handed.</p>" />
            ) : i % 3 === 1 ? (
              <Layout columns={3} colGap="gutter" rowGap="gutter">
                <Box />
                <Box />
                <Box />
              </Layout>
            ) : (
              <Prose html="<p>A block child fills the whole 940px track while the paragraphs beside it sit at 571px against the same inline-start edge.</p><ul><li>The text caps itself.</li><li>The block does not.</li><li>Both share one edge.</li></ul>" />
            )}
          </Layout>
        </section>
      ))}
    </Layout>
  );
}

/** The shell from § 10, which every band repeats. The one composition this component supports. */
function Shell({ prefix, labels }: { prefix: string; labels: readonly string[] }) {
  return (
    <Layout columns={{ base: 1, lg: [1, 4] }} colGap="column" rowGap="stack" align="start">
      <TableOfContents items={outline(prefix, labels)} />
      <Body prefix={prefix} labels={labels} />
    </Layout>
  );
}

export default function TableOfContentsSpecimen() {
  return (
    <>
      {/* ── 1 · In situ, scrolling, paper ─────────────────────────────────────── */}
      <Section surface="paper">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h1>TableOfContents</h1>
            <Prose html="<p>The outline of a long-form document. A sticky rail beside the body at 1024 and up; the same markup as a closed disclosure immediately after the hero below that. Nine bands, and the mark in every one of them is live.</p>" />
          </Layout>
          <div className={s.mockBar}>
            <p className={s.eyebrow}>SiteNav stand-in · --nav-bar-height</p>
          </div>
          <Specimen
            title="1 · In situ, eleven sections, paper"
            note="The band where the mechanism is proved. Scroll and the mark tracks the reading line, 104px down — the bar's 72 plus a 32 gutter. At the very top nothing is marked, because the reader is above the first heading and marking 01 there would be a false claim. This is also the band to read the computed geometry in: the rail's inset-block-start is 104px, its max-inline-size 232px — wide enough that none of the eleven labels wraps — and a one-line entry box measures 45.70px against the 44px floor. Below 1024 this band shows the closed disclosure: one 44px row."
          >
            <Shell prefix="situ" labels={ELEVEN} />
          </Specimen>
        </Layout>
      </Section>

      {/* ── 2 · Four surfaces as sibling bands, identical markup ─────────────── */}
      {(['paper', 'tint', 'ink', 'blue'] as const).map((surface) => (
        <Section key={surface} surface={surface}>
          <Specimen
            title={`2 · Surface: ${surface}`}
            note={
              surface === 'blue'
                ? 'The band to read. Blue on blue is 1:1, so "blue means you are here" cannot be taken literally here — the mark becomes white on both the ordinal and the rule, and the 3px against 1px does proportionally more work than on any other surface. Unmarked labels sit at brandeis-100, 4.91:1, the tightest cell in the whole table; the head and the ordinals one step up at brandeis-50, 5.57:1. Hover goes to brandeis-50 rather than a neutral, because neutral-200 is 4.63:1 here and reads as muddy grey. Pressed and current are both white; the underline width is what tells them apart.'
                : surface === 'ink'
                  ? 'The unmarked labels get QUIETER here, not louder — neutral-500 at 5.41:1, one step below what the surface layer would have given them, because nineteen rows at 8.05:1 on a dark ground glow and compete with the body. The head and the 12px ordinals do take neutral-400, 8.05:1 — small mono is not what glows. The mark lifts three ramp steps to brandeis-300: brandeis-500 on this ground is 2.77:1 and is exactly the failure the surface model exists to prevent. The rule travels the other way, to neutral-700, because on ink a light hairline is louder than the labels behind it.'
                  : surface === 'tint'
                    ? 'Every muted value steps one darker because the ground did, and here it is FORCED rather than preferred: neutral-600 is 4.39:1 on paper-deep and fails the floor. The head and the ordinals step once more, to neutral-800 at 10.54:1. Both blues hold, so the mark is the same hue as on paper — a reader moving down a page of alternating bands should not see it change colour.'
                    : 'The baseline. Unmarked labels sit at neutral-600, 4.92:1, as quiet as they can legally go — neutral-500 is 3.16:1 and fails. The head and the ordinals sit at neutral-700, 8.14:1: at 11px and 4.92:1 they read as grey on grey. They still read quieter than the ladder, by size and family — 12px mono against 14px sans.'
            }
          >
            <Shell prefix={`surface-${surface}`} labels={EIGHT} />
          </Specimen>
        </Section>
      ))}

      {/* ── 3 · Nineteen entries ──────────────────────────────────────────────── */}
      <Section surface="paper">
        <Specimen
          title="3 · Nineteen entries — the terms of use"
          note="The longest outline in the corpus. Nineteen 45.70px rows plus the head measure about 870px, so on any viewport under roughly 1000px tall the rail scrolls inside its own sticky box rather than growing past it. Shorten the window to see it. It does not stop being sticky and it does not cap the count. The accepted cost is visible here: the head scrolls away with the first few entries, because pinning it needs a grid row relationship Layout does not express."
        >
          <Shell prefix="long" labels={NINETEEN} />
        </Specimen>
      </Section>

      {/* ── 4 · Nested surface ────────────────────────────────────────────────── */}
      <Section surface="ink">
        <Layout rowGap="stack">
          <Prose html="<p>4 · Nested surface. The tint panel below sits inside this ink band. Its rail must resolve the TINT column throughout — neutral-700 labels at 7.27:1 on the tint ground — and not an ink-tuned neutral-500 stranded there at 2.82:1, under the text floor, on a rail that would look merely quiet. That is what every surface block restating every token buys; a deltas-only block would inherit ink here.</p>" />
          <Section surface="tint" flush>
            <Specimen
              title="A tint panel inside an ink band"
              note="Compare the labels against the ink band around it: darker, not lighter. Compare the interior rule too — neutral-400 against this tint ground, not the neutral-700 the ink rails use. The doubled horizontal gutter is this specimen's cost for nesting one band inside another, not the component's."
            >
              <Shell prefix="nested" labels={EIGHT} />
            </Specimen>
          </Section>
        </Layout>
      </Section>

      {/* ── 5 · Edge cases ────────────────────────────────────────────────────── */}
      <Section surface="paper">
        <Layout rowGap="stack">
          <Specimen
            title="5 · Longest strings, and a pasted URL"
            note="Three real 71–77-character fallback headings and one URL. Each clamps to two lines with an ellipsis, and the clamp is VISUAL only — the full string stays in the DOM, so a screen reader reads the whole heading. The URL breaks inside the word rather than pushing the rail past its cap: overflow-wrap: anywhere is what reduces the intrinsic minimum, not just the wrapping. All four trip the development warning at 40 characters; open the console."
          >
            <Shell prefix="long-labels" labels={LONG} />
          </Specimen>

          <Specimen
            title="5b · Two entries — the component's own floor"
            note="Two renders. This floor is STRUCTURAL and is not the editorial rule: which pages get an outline is a page-type decision the route makes, and this component does not know about it."
          >
            <Shell prefix="two" labels={ELEVEN.slice(0, 2)} />
          </Specimen>

          <Specimen
            title="5c · One entry — renders nothing"
            note="Outlined so the absence is visible: no <nav>, no landmark, no track content, and a console warning naming what it was handed. A landmark holding one link is worse than no landmark, because a screen reader user must enter it to discover it answers nothing."
          >
            <div className={s.bandOutline}>
              <Shell prefix="one" labels={ELEVEN.slice(0, 1)} />
            </div>
          </Specimen>
        </Layout>
      </Section>

      {/* ── 6 · Two adjacent · invalid on a route ──────────────────────────────── */}
      <Section surface="paper">
        <Specimen
          title="6 · Two adjacent — SPECIMEN ONLY, invalid on a route"
          note="One per page. Two produce two navigation landmarks with the identical accessible name 'On this page' — and because the name comes from the fixed title rather than a prop, there is nothing to tell them apart with, so a screen reader lists both. Both observers are also live, so two entries are marked at once. The component does not defend against this."
        >
          <Layout columns={2} colGap="gutter" align="start">
            <TableOfContents items={outline('twin-a', EIGHT)} />
            <TableOfContents items={outline('twin-b', EIGHT)} />
          </Layout>
        </Specimen>
      </Section>

      {/* ── 7 · The floor, and the placements that are forbidden ───────────────── */}
      <Section surface="paper">
        <Layout rowGap="stack">
          <Specimen
            title="7 · The floor — a [1, 6] track, 160.6px"
            note="Rendering at --toc-min-inline. The label column is 104px here, holding 14 characters a line and 28 across the clamp. Below this the rail is not narrow but broken, which is what the floor exists to prevent — in a Cluster or a columns='fit' track the intrinsic minimum would be the widest unbreakable word, about 60px."
          >
            <Layout
              columns={{ base: 1, lg: [1, 6] }}
              colGap="column"
              rowGap="stack"
              align="start"
            >
              <TableOfContents items={outline('floor', EIGHT)} />
              <Body prefix="floor" labels={EIGHT} />
            </Layout>
          </Specimen>

          <Specimen
            title="7b · The 44px floor, next to a 44px box"
            note="The dashed frame is --btn-hit-min. A one-line entry box is 45.70px — a 21.7px line box plus twice the 12px block padding — so the row clears the target by 1.70px and the PITCH equals the target, which is why consecutive rows clear each other. Reached by stepping the box up, never by a hit extension: entries are contiguous, so an extension would overlap its neighbours."
          >
            <Layout columns={{ base: 1, lg: [1, 4] }} colGap="column" align="start">
              <TableOfContents items={outline('hit', ELEVEN.slice(0, 3))} />
              <div className={s.hitFloor} />
            </Layout>
          </Specimen>
        </Layout>
      </Section>

      {/* ── 8 · Below 1024 ────────────────────────────────────────────────────── */}
      <Section surface="paper">
        <Specimen
          title="8 · Below 1024 — a closed disclosure"
          note="NARROW THE WINDOW past 1024 to see this band change: the shell's second track disappears, and the outline becomes a native <details>, CLOSED by default — one 44px 'On this page' row between two hairlines, where it used to be an eleven-row, ~500px block before the first paragraph. Tap it and the same list opens in place. No script decides this: at 1024 and up the same <details> is forced open through ::details-content and its summary hidden, which is the rail. Nothing is ever marked below 1024, open or closed, because the observer does not run there."
        >
          <Shell prefix="narrow" labels={ELEVEN} />
        </Specimen>
      </Section>
    </>
  );
}
