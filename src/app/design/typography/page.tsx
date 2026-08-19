import { Cluster, Layout, Prose, Section } from '@/components';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';
import t from '../_specimen/typeroles.module.css';

/**
 * Typography specimen — every --text-* role in the usage layer, the ladders underneath them, and
 * the rich-text flow they compose into.
 *
 * Two things are being proved here, and they are different things.
 *
 * The ROLES are proved by rendering each composite exactly the way a consumer must: `font:
 * var(--text-h2)` plus `letter-spacing: var(--text-h2-tracking)`, restating no size and no ratio.
 * If a role could only be rendered by rebuilding it out of the ladder, the composite would be
 * broken, and this page would be where that showed.
 *
 * The FLOW is proved by Prose, on all four surfaces. A body field is the one piece of markup the
 * system does not author, so the only honest test is the whole thing at once — headings, both
 * list kinds, a definition list, a quote, a figure, a table, a rule, and every inline mark — not
 * a tidy sample containing the four elements that happen to work.
 *
 * The numbers in the tables below are transcribed from primitives.css rather than read at
 * runtime. That is deliberate: the page states what the ladder is SUPPOSED to be, so a drift
 * between the label and the rendering beside it is visible instead of invisible.
 */

const FAMILIES = [
  {
    className: t.familyDisplay,
    token: '--font-family-display',
    name: 'Newsreader',
    job: 'titles and the pull quote. A variable optical-size face, which is why globals sets font-optical-sizing',
  },
  {
    className: t.familySans,
    token: '--font-family-sans',
    name: 'Public Sans',
    job: 'everything you read at length — lead, body, caption',
  },
  {
    className: t.familyMono,
    token: '--font-family-mono',
    name: 'Geist Mono',
    job: 'chrome. Labels, eyebrows, stats, code — anything that is machinery rather than prose',
  },
] as const;

const WEIGHTS = [
  {
    className: t.weightRegular,
    token: '--font-weight-regular',
    value: 400,
    where: 'display, h1, quote, and all body text',
  },
  {
    className: t.weightMedium,
    token: '--font-weight-medium',
    value: 500,
    where: 'h2 through h5, and the stat',
  },
  {
    className: t.weightSemibold,
    token: '--font-weight-semibold',
    value: 600,
    where: 'every mono chrome role',
  },
] as const;

/** The six display steps. Size and line height ladder together; the breakpoint cuts are real. */
const TITLE_ROLES = [
  {
    className: t.display,
    role: 'display',
    px: 67,
    lh: 1.04,
    track: '-0.02em',
    steps: '54 / 43',
    sample: 'Design that earns its keep',
  },
  {
    className: t.h1,
    role: 'h1',
    px: 54,
    lh: 1.06,
    track: '-0.018em',
    steps: '43 / 34',
    sample: 'Design that earns its keep',
  },
  {
    className: t.h2,
    role: 'h2',
    px: 43,
    lh: 1.1,
    track: '-0.015em',
    steps: '34 / 28',
    sample: 'Design that earns its keep',
  },
  {
    className: t.h3,
    role: 'h3',
    px: 34,
    lh: 1.16,
    track: '-0.01em',
    steps: '28 / 25',
    sample: 'Design that earns its keep',
  },
  {
    className: t.h4,
    role: 'h4',
    px: 28,
    lh: 1.2,
    track: '-0.005em',
    steps: '25 / 22',
    sample: 'Design that earns its keep',
  },
  {
    className: t.h5,
    role: 'h5',
    px: 22,
    lh: 1.28,
    track: '0',
    steps: '— / 20',
    sample: 'Design that earns its keep',
  },
] as const;

const TEXT_ROLES = [
  {
    className: t.quote,
    role: 'quote',
    px: 28,
    lh: 1.35,
    family: 'Newsreader',
    steps: '— / 22',
    sample: 'The repetition is the fix, and the repetition is what makes nesting safe.',
  },
  {
    className: t.lead,
    role: 'lead',
    px: 20,
    lh: 1.5,
    family: 'Public Sans',
    steps: '— / 18',
    sample: 'One paragraph of standfirst under a title, and never two.',
  },
  {
    className: t.bodyLg,
    role: 'body-lg',
    px: 18,
    lh: 1.55,
    family: 'Public Sans',
    steps: 'holds',
    sample: 'The long-form default. This is what a rich-text field is set in.',
  },
  {
    className: t.body,
    role: 'body',
    px: 16,
    lh: 1.6,
    family: 'Public Sans',
    steps: 'holds',
    sample: 'The interface default, and what the document body inherits.',
  },
  {
    className: t.bodySm,
    role: 'body-sm',
    px: 14,
    lh: 1.55,
    family: 'Public Sans',
    steps: 'holds',
    sample: 'Dense text — a table cell, a footnote, a citation.',
  },
  {
    className: t.caption,
    role: 'caption',
    px: 13,
    lh: 1.45,
    family: 'Public Sans',
    steps: 'holds',
    sample: 'Under an image, under a table, under a figure.',
  },
] as const;

const CHROME_ROLES = [
  {
    className: t.uiSm,
    role: 'ui-sm',
    px: 12,
    lh: 1.2,
    track: '0.08em',
    upper: true,
    where: 'a 32px control',
  },
  {
    className: t.ui,
    role: 'ui',
    px: 13,
    lh: 1.2,
    track: '0.08em',
    upper: true,
    where: 'a 40px control — the default',
  },
  {
    className: t.uiLg,
    role: 'ui-lg',
    px: 14,
    lh: 1.2,
    track: '0.08em',
    upper: true,
    where: 'a 48px control',
  },
  {
    className: t.eyebrow,
    role: 'eyebrow',
    px: 12,
    lh: 1.2,
    track: '0.12em',
    upper: true,
    where: 'above a title, never below one',
  },
  {
    className: t.micro,
    role: 'micro',
    px: 11,
    lh: 1.2,
    track: '0.1em',
    upper: true,
    where: 'the smallest legible label in the system',
  },
  {
    className: t.stat,
    role: 'stat',
    px: 40,
    lh: 1,
    track: '-0.01em',
    upper: false,
    where: 'a figure standing alone — steps to 32 on mobile',
  },
  {
    className: t.code,
    role: 'code',
    px: 14,
    lh: 1.6,
    track: '—',
    upper: false,
    where: 'inline code and the code panel',
  },
] as const;

/** Only the title roles and four text roles cut at a breakpoint. Everything else holds. */
const BREAKPOINTS = [
  { role: 'display', d: '67 / 1.04', tab: '54 / 1.06', mob: '43 / 1.08' },
  { role: 'h1', d: '54 / 1.06', tab: '43 / 1.08', mob: '34 / 1.12' },
  { role: 'h2', d: '43 / 1.1', tab: '34 / 1.14', mob: '28 / 1.18' },
  { role: 'h3', d: '34 / 1.16', tab: '28 / 1.2', mob: '25 / 1.22' },
  { role: 'h4', d: '28 / 1.2', tab: '25 / 1.22', mob: '22 / 1.26' },
  { role: 'h5', d: '22 / 1.28', tab: '22 / 1.28', mob: '20 / 1.3' },
  { role: 'quote', d: '28 / 1.35', tab: '28 / 1.35', mob: '22 / 1.4' },
  { role: 'lead', d: '20 / 1.5', tab: '20 / 1.5', mob: '18 / 1.55' },
  { role: 'stat', d: '40 / 1', tab: '40 / 1', mob: '32 / 1' },
] as const;

const SURFACES = [
  {
    surface: 'paper',
    note: 'the origin. Body ink is neutral-900, not 950 — 14.62:1 is already past AAA, and the softer step is what keeps 68 characters from vibrating.',
  },
  {
    surface: 'tint',
    note: 'the ground has spent the lightest step, so muted goes 600→700, the code chip 100→200, and both rules 200→300. 600 would measure 4.39:1 here and fail.',
  },
  {
    surface: 'ink',
    note: 'body ink is neutral-100 rather than white — white haloes at 18px over a full measure. Blue inverts: the link lifts to 300, because brandeis-500 is 2.11:1 on this ground.',
  },
  {
    surface: 'blue',
    note: 'nothing may be blue to mean clickable, so the link is white and the underline carries the whole affordance. The quote rule is the one peridot in the system.',
  },
] as const;

/** A short flow, used four times to compare surfaces. Long enough to include a quote and a link. */
function SurfaceFlow() {
  return (
    <Prose>
      <h3>Every surface restates every token</h3>
      <p>
        Not just the deltas from paper. A block carrying only deltas is{' '}
        <strong>not self-contained</strong>: nest that surface inside a non-paper one and it
        inherits the enclosing surface&rsquo;s values for whatever it omitted — see{' '}
        <a href="/design/button">the button specimen</a> for what that looked like when it was
        wrong.
      </p>
      <blockquote>
        A tint panel inside an ink section rendered white ink on a light ground at 1.13:1.
      </blockquote>
      <ul>
        <li>
          Inline code takes a ground: <code>--prose-code-bg</code>
        </li>
        <li>
          A <mark>highlighted passage</mark> is peridot on every surface
        </li>
        <li>
          Muted text — <small>a caption, a note, a source</small>
        </li>
      </ul>
    </Prose>
  );
}

export default function TypographySpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <p className={`${t.eyebrow} ${t.upper}`}>Foundations</p>
            <h1>Typography</h1>
            <p className={t.lead}>
              Three faces, a ladder cut per role, and one composite per role so that nothing
              outside the token layer ever restates a size. Below: every role rendered the way a
              consumer must consume it, then the whole rich-text flow on all four surfaces.
            </p>
          </Layout>

          <Specimen
            title="The three families"
            note="No two vertically adjacent elements share a face. The canonical stack is mono eyebrow → serif title → sans body, and it is the reason a heading never sits directly on a heading of the same face."
          >
            <Layout rowGap="block">
              {FAMILIES.map((f) => (
                <Layout key={f.token} columns={[1, 3]} colGap="gutter" rowGap="tight">
                  <Layout rowGap="inline" justifyItems="start">
                    <span className={s.ruler}>{f.token}</span>
                    <span className={s.specNote}>{f.name}</span>
                  </Layout>
                  <Layout rowGap="tight" className={t.sampleCell}>
                    <p className={f.className}>Hamburgefonstiv 0123456789</p>
                    <p className={s.specNote}>{f.job}</p>
                  </Layout>
                </Layout>
              ))}
            </Layout>
          </Specimen>

          <Specimen
            title="Three weights, and there is no fourth"
            note="A face with nine weights is a face with eight ways to be inconsistent. Regular reads, medium titles, semibold labels."
          >
            <Layout rowGap="text">
              {WEIGHTS.map((w) => (
                <Cluster key={w.token} colGap="text" align="baseline">
                  <span className={s.ruler}>{w.value}</span>
                  <span className={`${t.weight} ${w.className}`}>
                    The quick brown fox jumps over the lazy dog
                  </span>
                  <span className={s.specNote}>{w.where}</span>
                </Cluster>
              ))}
            </Layout>
          </Specimen>
        </Layout>
      </Section>

      {/* ── The title ladder ─────────────────────────────────────────────────────────────────
          Given its own band and its own arrangement: the ruler drops to a rail on the left and
          the sample takes the rest, because 67px type beside an inline label reads as a caption
          fighting a headline. */}
      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>The title ladder</h2>
            <p>
              Six steps, cut at 1.25 from 22px for Newsreader. Size and line height are one
              decision and are named together — <code>--font-size-h2</code> pairs with{' '}
              <code>--line-height-h2</code>, and both carry <code>-t</code> and <code>-m</code>{' '}
              breakpoint steps. Tracking is the deliberate exception: it corrects an optical
              error at a size rather than marking a step, so h2, h3 and h4 share three
              corrections between them rather than owning one each.
            </p>
          </Layout>

          {TITLE_ROLES.map((r) => (
            <Specimen key={r.role} title={`--text-${r.role}`}>
              <Layout columns={[1, 4]} colGap="gutter" rowGap="text">
                <Layout rowGap="inline" justifyItems="start">
                  <span className={s.ruler}>
                    {r.px} / {r.lh}
                  </span>
                  <span className={s.specNote}>tracking {r.track}</span>
                  <span className={s.specNote}>steps to {r.steps}</span>
                </Layout>
                <div className={t.sampleCell}>
                  <p className={r.className}>{r.sample}</p>
                </div>
              </Layout>
            </Specimen>
          ))}
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>The text roles</h2>
            <p>
              What you read at length, plus the pull quote that is set in the title face on
              purpose. Only quote and lead cut at a breakpoint; everything from body-lg down
              holds its size at every width, because the thing that changes on a phone is the
              column, not the reading size.
            </p>
          </Layout>

          <Specimen title="quote · lead · body-lg · body · body-sm · caption">
            <Layout rowGap="stack">
              {TEXT_ROLES.map((r) => (
                <Layout key={r.role} columns={[1, 3]} colGap="gutter" rowGap="tight">
                  <Layout rowGap="inline" justifyItems="start">
                    <span className={s.ruler}>--text-{r.role}</span>
                    <span className={s.specNote}>
                      {r.px} / {r.lh} · {r.family}
                    </span>
                    <span className={s.specNote}>
                      {r.steps === 'holds' ? 'holds at every width' : `steps to ${r.steps}`}
                    </span>
                  </Layout>
                  <div className={t.sampleCell}>
                    <p className={r.className}>{r.sample}</p>
                  </div>
                </Layout>
              ))}
            </Layout>
          </Specimen>

          <Specimen
            title="The chrome roles"
            note="All mono, all semibold, all tracked open — and none of them carries text-transform. Uppercase is the consumer's decision, exactly as it is in Button and in Prose's h6, so the token stays usable by the one caller that wants sentence case. Shown uppercase here because that is how they actually ship."
          >
            <Layout rowGap="block">
              {CHROME_ROLES.map((r) => (
                <Layout key={r.role} columns={[1, 3]} colGap="gutter" rowGap="tight">
                  <Layout rowGap="inline" justifyItems="start">
                    <span className={s.ruler}>--text-{r.role}</span>
                    <span className={s.specNote}>
                      {r.px} / {r.lh} · tracking {r.track}
                    </span>
                  </Layout>
                  <Layout rowGap="inline" className={t.sampleCell}>
                    <span className={`${r.className} ${r.upper ? t.upper : ''}`}>
                      {r.role === 'stat'
                        ? '2,480'
                        : r.role === 'code'
                          ? 'const gap = 24'
                          : 'View the case study'}
                    </span>
                    <span className={s.specNote}>{r.where}</span>
                  </Layout>
                </Layout>
              ))}
            </Layout>
          </Specimen>
        </Layout>
      </Section>

      {/* ── The breakpoint cuts ──────────────────────────────────────────────────────────────
          A dense reference grid rather than rendered samples: the point of this block is the
          RELATIONSHIP between the three columns, which only reads when they are adjacent. */}
      <Section surface="ink">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>Where the ladder cuts</h2>
            <p>
              Nine roles re-declare themselves at 1023px and again at 767px, so a rule that uses
              a composite needs no breakpoint of its own — <code>font: var(--text-h1)</code> is
              already responsive. Every other role holds. A role that is not in this table is
              the same size on a phone as on a 27-inch display, and that is the intent.
            </p>
          </Layout>

          <Specimen title="size / line-height, by viewport">
            <Layout rowGap="tight">
              <Layout columns={[2, 1, 1, 1]} colGap="gutter">
                <span className={`${s.specTitle} ${t.upper}`}>role</span>
                <span className={`${s.specTitle} ${t.upper}`}>desktop</span>
                <span className={`${s.specTitle} ${t.upper}`}>≤1023</span>
                <span className={`${s.specTitle} ${t.upper}`}>≤767</span>
              </Layout>
              {BREAKPOINTS.map((b) => (
                <Layout key={b.role} columns={[2, 1, 1, 1]} colGap="gutter">
                  <span className={s.specNote}>--text-{b.role}</span>
                  <span className={s.specNote}>{b.d}</span>
                  <span className={s.specNote}>{b.tab}</span>
                  <span className={s.specNote}>{b.mob}</span>
                </Layout>
              ))}
            </Layout>
          </Specimen>

          <Specimen
            title="Resize the window"
            note="The three title roles that move most, rendered live. Nothing here has a media query of its own — the composites carry the cuts."
          >
            <Layout rowGap="text">
              <p className={t.display}>Display</p>
              <p className={t.h1}>Heading one</p>
              <p className={t.h3}>Heading three</p>
            </Layout>
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>Measure</h2>
            <p>
              Two caps, because a title and a paragraph fail at different widths. The dashed
              rule marks the cap; nothing else about these blocks is set.
            </p>
          </Layout>

          <Specimen
            title="--measure-body · 68ch"
            note="The reading cap. Past roughly 75 characters the eye loses the return sweep and re-reads a line it has already read."
          >
            <p className={`${t.bodyLg} ${t.measureBody}`}>
              A layout that repeats one shape down the page is a failure even when every piece
              of it is correct. Clean does not mean plain, and &ldquo;not busy&rdquo; is not an
              argument for &ldquo;not designed&rdquo;. Visual weight comes from scale, imagery
              and position — not from decoration, from borders, or from a tinted background
              band. Vary the arrangement between blocks rather than the ground behind them.
            </p>
          </Specimen>

          <Specimen
            title="--measure-title · 22ch"
            note="Titles break by phrase, not by column. A headline running the full content width reads as a paragraph that happens to be large."
          >
            <p className={`${t.h2} ${t.measureTitle}`}>A title breaks where the sense breaks</p>
          </Specimen>
        </Layout>
      </Section>

      {/* ── The base layer ───────────────────────────────────────────────────────────────────
          Deliberately NOT wrapped in Prose: this is what a bare element gets from globals.css on
          a page nobody has styled, and the gap between this block and the one after it is the
          argument for Prose existing. */}
      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>The base layer, unwrapped</h2>
            <p>
              Bare elements, no <code>Prose</code>. This is the whole of what{' '}
              <code>globals.css</code> gives an unstyled page: five heading rules, links, and
              the mono code role. It is a floor — the spacing below comes from the{' '}
              <code>Layout</code> holding these, not from the elements, and an <code>h6</code>,
              a list, a quote or a table would get nothing at all.
            </p>
          </Layout>

          <Specimen title="h1 – h5, a, code">
            <Layout rowGap="text">
              <h1>Heading one</h1>
              <h2>Heading two</h2>
              <h3>Heading three</h3>
              <h4>Heading four</h4>
              <h5>Heading five</h5>
              <p>
                A paragraph with <a href="/design">a link in it</a> and a run of{' '}
                <code>inline code</code>. The link takes the surface&rsquo;s own link ink; the
                code takes the mono composite and no ground, because the base layer sets none.
              </p>
            </Layout>
          </Specimen>
        </Layout>
      </Section>

      {/* ── Prose ───────────────────────────────────────────────────────────────────────────
          The full flow, given the widest band on the page. Everything a CMS body field can
          contain, in one continuous piece, because that is the only way the vertical rhythm
          between two DIFFERENT kinds of block can be judged. */}
      <Section density="open">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <p className={`${t.eyebrow} ${t.upper}`}>Rich text</p>
            <h2>Prose</h2>
            <p className={t.lead}>
              The flow a CMS body field arrives as, styled once. Headings, both list kinds, a
              definition list, a quote with a citation, a figure, a table, a rule, a code panel
              and every inline mark — all of it below, in one continuous piece.
            </p>
            <p>
              Prose is the one component in the repo that styles markup it did not write, and
              the one place margins are allowed. Both are argued in the component: there is no
              React child to wrap in a <code>Layout</code> when the flow arrives as a string,
              and the rhythm is not uniform anyway — the air before an <code>h2</code> is 48,
              the air between two paragraphs is 16, and a single <code>row-gap</code> cannot say
              both.
            </p>
          </Layout>

          <Specimen
            title="The whole flow"
            note="Rhythm to check by eye: 16 between paragraphs, 24 around any set piece and after a heading, 32 before a subhead, 48 before an h2 and around a rule. More air above a heading than below it, so it belongs to what follows."
          >
            <Prose as="article">
              <h2>What the flow has to survive</h2>
              <p>
                A body field is the one piece of markup this system does not author. It arrives
                as an opaque string of paragraphs, lists and marks, written by somebody who has
                never seen the token layer, and it still has to read like the rest of the site.
                That is the whole job, and the only honest test of it is the whole thing at once
                rather than a tidy sample containing the four elements that happen to work.
              </p>

              <h3>Headings, and the sixth step</h3>
              <p>
                The ladder has five title steps. A sixth serif step below 22px would be smaller
                than the body it heads, so <code>h6</code> takes the mono chrome role instead —
                a tracked, uppercase run-in, which is what a sixth-level heading actually is.
              </p>
              <h4>A fourth-level heading</h4>
              <p>
                Set at 28px, which is the same size as the pull quote below. They share a value
                and are stated twice in the ladder on purpose: they are free to move
                independently.
              </p>
              <h5>A fifth-level heading</h5>
              <h6>And the sixth</h6>
              <p>
                Two headings in a row are one unit, not two, so the second takes the
                head-to-body step back rather than the full subhead break.
              </p>

              <h3>Lists</h3>
              <p>An unordered list, with a nested one inside it:</p>
              <ul>
                <li>
                  The marker sits in the inset, outside the text block, so every line of an item
                  — first or wrapped — starts on the same vertical
                </li>
                <li>
                  A marker set inline instead pushes the first line right and leaves the wrapped
                  ones behind it, which puts a notch in the left edge of every multi-line item
                  <ul>
                    <li>Nested lists change the marker rather than the indent</li>
                    <li>Eight pixels between items, sixteen between paragraphs inside one</li>
                  </ul>
                </li>
                <li>
                  Items can carry <strong>marks</strong>, <a href="/design/button">links</a> and{' '}
                  <code>code</code> like anything else
                </li>
              </ul>
              <p>An ordered list, which nests to lower-alpha:</p>
              <ol>
                <li>
                  Read the token index first — it states the rules and it is the only file you
                  import
                </li>
                <li>
                  Add the value where it belongs
                  <ol>
                    <li>A ramp value goes in primitives</li>
                    <li>A meaning goes in the component layer</li>
                  </ol>
                </li>
                <li>Run the check before you commit</li>
              </ol>

              <h3>A definition list</h3>
              <dl>
                <dt>Ground</dt>
                <dd>What a surface is painted. Pairs with ink, never with fg.</dd>
                <dt>Foreground</dt>
                <dd>What a control&rsquo;s label is painted. Pairs with bg, never with ink.</dd>
              </dl>

              <h3>A quote</h3>
              <blockquote>
                <p>
                  A distance that is not one of these nine is a mistake or a new step. Decide
                  which. Do not split the difference.
                </p>
                <cite>tokens/primitives.css, on the gap scale</cite>
              </blockquote>

              <hr />

              <h3>A table</h3>
              <p>
                Horizontal rules only. Vertical rules turn a table into a grid of boxes and make
                every column look equally important, which is what a data table is trying not to
                say.
              </p>
              <table>
                <caption>The gap scale, and what each step separates</caption>
                <thead>
                  <tr>
                    <th>Step</th>
                    <th>Value</th>
                    <th>Where it lands</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>--gap-tight</code>
                    </td>
                    <td>8</td>
                    <td>Icon to label, chip padding, a stat and its unit</td>
                  </tr>
                  <tr>
                    <td>
                      <code>--gap-text</code>
                    </td>
                    <td>16</td>
                    <td>Paragraph to paragraph, cell padding on a dense table</td>
                  </tr>
                  <tr>
                    <td>
                      <code>--gap-block</code>
                    </td>
                    <td>24</td>
                    <td>Head to body inside a block — the most used step</td>
                  </tr>
                  <tr>
                    <td>
                      <code>--gap-stack</code>
                    </td>
                    <td>48</td>
                    <td>Block to block inside a section</td>
                  </tr>
                </tbody>
              </table>

              <h3>A figure</h3>
              <figure>
                {/* A CMS body field emits a bare <img>; that is precisely the element Prose has
                    to style, so next/image would prove nothing here. The two colours are inlined
                    in the data URI because this is a placeholder standing in for a photograph —
                    a genuinely one-off value, not a swatch anything should read. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='300'%3E%3Crect width='640' height='300' fill='%230048FF'/%3E%3Crect x='40' y='40' width='240' height='220' fill='%23C3DD2A'/%3E%3C/svg%3E"
                  alt="A blue field with a peridot rectangle inset from the top left corner"
                  width={640}
                  height={300}
                />
                <figcaption>
                  A caption sits eight pixels under its image and takes the caption role — the
                  same treatment a table caption gets.
                </figcaption>
              </figure>

              <h3>Code</h3>
              <p>
                Inline <code>code</code> is a chip in a sentence: a soft ground, a small radius,
                and 0.9em rather than the code role&rsquo;s own 14px, because a 14px mono span
                inside 18px sans sits noticeably low. A panel is a different kind of content
                altogether, which is what earns it a filled ground in a system that otherwise
                refuses them:
              </p>
              <pre>
                <code>{`.prose > * + * {
  margin-block-start: var(--gap-text);
}
.prose > * + h2 {
  margin-block-start: var(--gap-stack);
}`}</code>
              </pre>
              <p>
                A panel scrolls rather than wrapping. A wrapped line of code is a line of code
                that lies about where it ends.
              </p>

              <h3>Inline marks</h3>
              <p>
                The set an editor can actually produce: <strong>strong</strong>,{' '}
                <em>emphasis</em>, <mark>a highlight</mark>, <del>a deletion</del>,{' '}
                <ins>an insertion</ins>, <a href="/design/icon">a link</a>, <code>code</code>,
                an abbreviation like <abbr title="Cascading Style Sheets">CSS</abbr>, a footnote
                marker<sup>1</sup>, a subscript<sub>2</sub>, and <small>small print</small>.
              </p>
              <p>
                Links are underlined at rest, always. Colour alone is not an affordance inside a
                body of text — and on the blue surface there is no colour to spend, so the
                underline is carrying the entire signal.
              </p>
            </Prose>
          </Specimen>
        </Layout>
      </Section>

      {/* ── Prose from a string ─────────────────────────────────────────────────────────────
          The path that actually matters in production, shown separately so the two entry points
          are not confused with each other. */}
      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>The same flow, from a string</h2>
            <p>
              A CMS hands over one field of HTML, not JSX. <code>Prose</code> takes it on the{' '}
              <code>html</code> prop and renders identically — the contract being that the
              string was sanitised at the content seam, in <code>src/content/sources/*</code>,
              and never here. A sanitiser inside a tier-1 component is one everybody assumes is
              running and nobody can see.
            </p>
          </Layout>

          <Specimen title="<Prose html={…} />">
            <Prose
              html={`<h3>Straight from the field</h3>
                <p>Nothing about this block is JSX. It is a string with <strong>marks</strong>,
                <a href="/design">a link</a> and <code>code</code> in it, and the flow rules land
                on it the same way.</p>
                <ul><li>Same marker hang</li><li>Same eight pixels between items</li></ul>`}
            />
          </Specimen>
        </Layout>
      </Section>

      {/* ── The four surfaces ───────────────────────────────────────────────────────────────
          One band each, so every flow is judged against its own real ground rather than as a
          swatch inside somebody else's. */}
      {SURFACES.map((surf) => (
        <Section key={surf.surface} surface={surf.surface}>
          <Layout rowGap="block">
            <Specimen title={`Rich text on ${surf.surface}`} note={surf.note}>
              <SurfaceFlow />
            </Specimen>
          </Layout>
        </Section>
      ))}

      {/* Nesting is the real test: a tint panel inside an ink band is what broke the button layer
          before surface self-containment was enforced, and the same trap exists for prose. */}
      <Section surface="ink">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>Nested surfaces</h2>
            <p>
              A tint band nested inside this ink one. Every prose token is declared on all four
              surfaces, so the inner flow resolves entirely from its own block rather than
              inheriting whatever the ink section left set. If any token were missing from the
              tint block, this is where it would show — as white ink on a light ground.
            </p>
          </Layout>
          <Section surface="tint" density="tight">
            <SurfaceFlow />
          </Section>
        </Layout>
      </Section>
    </>
  );
}
