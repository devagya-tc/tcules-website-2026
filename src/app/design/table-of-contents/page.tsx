import { Layout, Prose, Section } from '@/components';
import { TableOfContents, type TocItem } from '@/patterns';

import { Box, Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * TableOfContents specimen — the outline in IndexRail's grammar (owner, 26 Oct 2026): an eyebrow over
 * one rule, names alone on one line, and ONE 2px marker that slides from row to row. Below 1024 the
 * same markup is a sticky bar under the nav naming the section in view, opening the list under it.
 *
 * Every rail below is a TRACK inside a real `Section`, in the two-column shell the long-form pages
 * use. `align="start"` on that shell is load-bearing: a stretched grid item has nowhere to stick.
 *
 * Nothing here can be forced from outside, by design: the mark comes from where the page is
 * scrolled. Every rail is LIVE — scroll and they all move. Hover and focus have no props; point and
 * tab. The 1024 switch needs a narrower window.
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

/** Headings handed in where a marker should be: the fallback, cut to one line and warned about. */
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
            <Prose html="<p>The outline of a long-form document. A sticky rail beside the body at 1024 and up; below that, the same markup as a sticky bar under the nav naming the section in view. The mark in every band is live.</p>" />
          </Layout>
          <div className={s.mockBar}>
            <p className={s.eyebrow}>SiteNav stand-in · --nav-bar-height</p>
          </div>
          <Specimen
            title="1 · In situ, eleven sections, paper"
            note="The band where the mechanism is proved. Scroll: at the top nothing is marked, because the reader is above the first heading. The first section grows the marker in where it lands; every section after slides it, on transform alone. The reading line is 30% down the viewport, IndexRail's. Click an entry: the page glides to the heading, which lands level with the rail's top. Below 1024 this band is the sticky bar instead: it says On this page until the first section, then names the section in view."
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
                ? 'Blue on blue is 1:1, so the marker goes white; unmarked names sit at brandeis-100, 4.91:1, the tightest cell.'
                : surface === 'ink'
                  ? 'The marker lifts to brandeis-300 (brandeis-500 is 2.77:1 here); names at neutral-400, white when current or pointed at.'
                  : surface === 'tint'
                    ? 'Names step to neutral-700 because neutral-600 is 4.39:1 on paper-deep; the marker deepens to brandeis-600.'
                    : 'The baseline: names at neutral-600, 4.92:1, neutral-900 when current or pointed at; the marker at brandeis-500.'
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
          note="The longest outline in the corpus. Nineteen rows measure about 700px, so on a short viewport the rail scrolls inside its own sticky box, and the component scrolls it to keep the current row in view. It does not stop being sticky and it does not cap the count."
        >
          <Shell prefix="long" labels={NINETEEN} />
        </Specimen>
      </Section>

      {/* ── 4 · Nested surface ────────────────────────────────────────────────── */}
      <Section surface="ink">
        <Layout rowGap="stack">
          <Prose html="<p>4 · Nested surface. The tint panel below sits inside this ink band.</p>" />
          <Section surface="tint" flush>
            <Specimen
              title="A tint panel inside an ink band"
              note="The rail resolves the TINT column throughout — neutral-700 names, a brandeis-600 marker — not the ink band’s values around it. That is what every surface block restating every token buys."
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
            note="What a page hands the outline before its markers are written: whole headings. Each WRAPS to as many lines as it needs at 14 (owner, 29 Oct 2026: no truncation), the marker growing with the row it marks — and all four trip the development warning at 26 characters. The answer is still a short navigationLabel, not a wider rail."
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
          note="One per page. Two produce two navigation landmarks with the identical name On this page, and both mark at once. The component does not defend against this."
        >
          <Layout columns={2} colGap="gutter" align="start">
            <TableOfContents items={outline('twin-a', EIGHT)} />
            <TableOfContents items={outline('twin-b', EIGHT)} />
          </Layout>
        </Specimen>
      </Section>

      {/* ── 7 · The floor ───────────────────────────────────────────────────────── */}
      <Section surface="paper">
        <Layout rowGap="stack">
          <Specimen
            title="7 · The floor — a [1, 6] track, 160.6px"
            note="Rendering at --toc-min-inline. The marker’s room and the one-line names hold; a longer marker cuts sooner here."
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
        </Layout>
      </Section>

      {/* ── 8 · Below 1024 ────────────────────────────────────────────────────── */}
      <Section surface="paper">
        <Specimen
          title="8 · Below 1024 — the sticky bar"
          note="NARROW THE WINDOW past 1024. The shell’s second track goes and the outline becomes one bar under the nav, spreading to the screen’s edges on its own ground: On this page above the first section, then the section in view. Tap it and the list drops under the bar with the same marker; a choice, Escape, a press outside or a scroll shuts it. No script decides the arrangement: at 1024 the same <details> is forced open by ::details-content and its summary hidden."
        >
          <Shell prefix="narrow" labels={ELEVEN} />
        </Specimen>
      </Section>
    </>
  );
}
