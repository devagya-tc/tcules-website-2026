import { Cluster, Icon, Layout, Tag } from '@/components';
import { cx } from '@/lib/cx';
import type { StoryBlock } from '@/lib/service-story';

import styles from './Diagrams.module.css';

type Of<K extends StoryBlock['kind']> = Extract<StoryBlock, { kind: K }>;

/* ── Spectrum ─────────────────────────────────────────────────────────────────
   Options ordered on ONE scale. The CMS sent these as a table in no order; ordered, the table stops
   being a menu and becomes the page's argument — take the least disruptive change that works. The
   order is stated once, in words, over the list; there is no per-row meter (30 Sep 2026: a filled
   bar per row read as progress, which is a claim the list does not make). */
/* ── Disruption meter ─────────────────────────────────────────────────────────
   How much of the CURRENT PRODUCT an option disturbs, drawn as the product itself: six parts
   sitting on one line. A part the option leaves alone sits solid on the line; a part it disturbs is
   knocked loose — lifted off the line, tilted, emptied to an outline. "Leave unchanged" has none
   loose, "Retire" has all six. Nothing fills toward a goal, so it cannot read as progress, which is
   what got the first meter cut (30 Sep): the more of it is loose, the worse for the people using it.

   The level is the row's rank on the ordered list, spread across the six parts — a rank, not a
   measurement, which is all the content claims. Hidden from assistive technology; the row states
   it in words ("Disruption: 3 of 6 parts"). */
const METER_PARTS = 6;

function DisruptionMeter({ level, label }: { level: number; label: string }) {
  return (
    <>
      <Cluster as="span" nowrap colGap="inline" align="end" aria-hidden="true" className={styles.meter}>
        {Array.from({ length: METER_PARTS }, (_, index) => (
          <span
            key={index}
            className={styles.meterPart}
            data-loose={index < level ? (index % 2 === 0 ? 'left' : 'right') : undefined}
          />
        ))}
      </Cluster>
      <span className={styles.visuallyHidden}>
        {label}: {level} of {METER_PARTS} parts
      </span>
    </>
  );
}

/* ── Spectrum ─────────────────────────────────────────────────────────────────
   Options on one scale. With a meter, the scale is a column — every row shows where it sits — and
   the caption goes: an order a reader has to be told in a sentence is an order the rows failed to
   show (1 Oct 2026, owner: the "ordered from least … to most" line made the section look bad).
   Without one, the order is stated once over the list. */
export function Spectrum({ block }: { block: Of<'spectrum'> }) {
  const meter = block.meter;
  const last = block.items.length - 1;
  const tracks = meter ? [4, 2, 5, 5] : [4, 5, 5];
  return (
    <Layout rowGap="text">
      {meter ? null : (
        <span className={styles.key}>
          Ordered from {block.axis.from.toLowerCase()} to {block.axis.to.toLowerCase()}
        </span>
      )}
      <Layout as="ol" rowGap="none" className={styles.rows}>
        <li className={styles.headRow} aria-hidden="true">
          <Layout columns={{ base: 1, lg: tracks }} colGap="gutter">
            <span className={styles.key}>{block.columns.name}</span>
            {meter ? <span className={styles.key}>{meter.label}</span> : null}
            <span className={styles.key}>{block.columns.when}</span>
            <span className={styles.key}>{block.columns.settles}</span>
          </Layout>
        </li>
        {block.items.map((item, index) => (
          <li key={item.name} className={styles.row}>
            <Layout columns={{ base: 1, lg: tracks }} colGap="gutter" rowGap="text">
              <h3 className={styles.rowTitle}>{item.name}</h3>
              {meter ? (
                <DisruptionMeter
                  label={meter.label}
                  level={last > 0 ? Math.round((index / last) * METER_PARTS) : 0}
                />
              ) : null}
              <p className={styles.rowBody}>{item.when}</p>
              <p className={styles.rowQuestion}>{item.settles}</p>
            </Layout>
          </li>
        ))}
      </Layout>
    </Layout>
  );
}

/* ── Representations ──────────────────────────────────────────────────────────
   One decision, carried through every representation of it. The decision is DRAWN — the same chip
   in every row — so the claim "it must survive every representation" is
   something the reader sees hold before reading why it breaks. */
export function Representations({ block }: { block: Of<'representations'> }) {
  return (
    <Layout as="ol" rowGap="none">
      <li className={styles.headRow} aria-hidden="true">
        <Layout columns={{ base: 1, lg: [4, 5, 5] }} colGap="gutter">
          <span className={styles.key}>{block.columns.name}</span>
          <span className={styles.key}>{block.columns.holds}</span>
          <span className={styles.key}>{block.columns.fails}</span>
        </Layout>
      </li>
      {block.items.map((item) => (
        <li key={item.name} className={styles.row}>
          <Layout columns={{ base: 1, lg: [4, 5, 5] }} colGap="gutter" rowGap="text">
            <Layout rowGap="text">
              <h3 className={styles.rowTitle}>{item.name}</h3>
              <Cluster>
                <Tag>{block.specimen}</Tag>
              </Cluster>
            </Layout>
            <p className={styles.rowBody}>
              <span className={styles.visuallyHidden}>{block.columns.holds}: </span>
              {item.holds}
            </p>
            <p className={styles.rowFail}>
              <span className={styles.visuallyHidden}>{block.columns.fails}: </span>
              {item.fails}
            </p>
          </Layout>
        </li>
      ))}
    </Layout>
  );
}

/* ── Record ───────────────────────────────────────────────────────────────────
   A record with fields, drawn as the document it is: a sheet on its own ground, a header strip,
   and one row per field — the field keyed in mono with its glyph ABOVE the question it holds, in
   serif. Stacked, not side by side: a key and its question are one item, not two columns.
   It is the one place in the template that paints a ground, and it earns it: a record is an
   OBJECT the team keeps, and the sheet is what says so. */
export function Record({ block }: { block: Of<'record'> }) {
  return (
    <figure className={styles.sheet}>
      <Cluster
        as="figcaption"
        justify="between"
        colGap="block"
        rowGap="tight"
        className={styles.sheetHead}
      >
        <span className={styles.sheetTitle}>{block.title}</span>
        <span className={styles.key}>{block.meta}</span>
      </Cluster>
      <Layout as="dl" rowGap="none">
        {block.items.map((item) => (
          <Layout key={item.field} rowGap="tight" className={styles.sheetRow}>
            <dt className={styles.sheetField}>
              <Cluster nowrap colGap="tight" align="center">
                <span className={styles.icon} aria-hidden="true">
                  <Icon name={item.icon} size="lg" />
                </span>
                <span>{item.field}</span>
              </Cluster>
            </dt>
            <dd className={styles.sheetQuestion}>{item.question}</dd>
          </Layout>
        ))}
      </Layout>
    </figure>
  );
}

/* ── Parts ────────────────────────────────────────────────────────────────────
   Four parts in a row, and the fifth drawn as the frame beneath them: a rule that spans all four
   with a tick at each end, a bracket, because the operating model is not a fifth peer — it is what
   keeps the other four current. */
export function Parts({ block }: { block: Of<'parts'> }) {
  return (
    <Layout rowGap="gutter">
      <Layout
        as="ul"
        columns={{ base: 1, md: 2, lg: block.items.length }}
        colGap="gutter"
        rowGap="stack"
      >
        {block.items.map((item) => (
          <li key={item.name} className={styles.part}>
            <Layout rowGap="text">
              <span className={styles.icon} aria-hidden="true">
                <Icon name={item.icon} size="xl" />
              </span>
              <h3 className={styles.rowTitle}>{item.name}</h3>
              <p className={styles.rowBody}>{item.body}</p>
            </Layout>
          </li>
        ))}
      </Layout>
      <div className={styles.frame}>
        <Layout columns={{ base: 1, lg: [1, 2] }} colGap="column" rowGap="text" align="start">
          <Cluster nowrap colGap="text" align="center">
            <span className={styles.icon} aria-hidden="true">
              <Icon name={block.frame.icon} size="xl" />
            </span>
            <h3 className={styles.frameTitle}>{block.frame.name}</h3>
          </Cluster>
          <p className={styles.frameBody}>{block.frame.body}</p>
        </Layout>
      </div>
    </Layout>
  );
}

/* ── Slice ────────────────────────────────────────────────────────────────────
   Layers stacked as a system is organised, and the release cut vertically through all of them.
   The diagram is the argument: organise only by layer and every layer is locally complete while
   the product path that crosses them is not. */
export function Slice({ block }: { block: Of<'slice'> }) {
  return (
    <Layout rowGap="stack">
      <figure
        className={styles.slice}
        aria-label={`${block.label}, cut through ${block.layers.join(', ')}`}
      >
        <span className={styles.sliceColumn} aria-hidden="true">
          <span className={styles.sliceLabel}>{block.label}</span>
        </span>
        <Layout as="ul" rowGap="none">
          {block.layers.map((layer) => (
            <li key={layer} className={styles.layer}>
              <span className={styles.layerName}>{layer}</span>
            </li>
          ))}
        </Layout>
      </figure>
      <Layout
        as="ul"
        columns={{ base: 1, md: block.levels.length }}
        colGap="gutter"
        rowGap="stack"
      >
        {block.levels.map((level) => (
          <li key={level.title} className={styles.part}>
            <Layout rowGap="text">
              <span className={styles.icon} aria-hidden="true">
                <Icon name={level.icon} size="xl" />
              </span>
              <h3 className={styles.rowTitle}>{level.title}</h3>
              <p className={styles.rowBody}>{level.body}</p>
            </Layout>
          </li>
        ))}
      </Layout>
    </Layout>
  );
}

/* ── Bridge: the transition as a timeline ─────────────────────────────────────
   A move from the current product to the target one is not a jump: for a while BOTH are live, and
   that overlap is what has to be designed. So it is drawn as time, read left to right — Before,
   During the move, After — with each product as a bar. The current product runs solid before the
   move and dashed during it ("still running"); the target starts dashed during it ("already
   running") and runs solid after. The two dashed bars stacked in the middle phase ARE the
   transition, and the temporary states sit directly under them, because they exist only there
   (1 Oct 2026, owner: "it just looks like boxes and text").

   Three phase columns rather than two spanning bars, so it stacks honestly below lg: Before with the
   current product, During with both and its states, After with the target. Each bar is a fixed
   height and an empty phase holds a spacer of the same height, so the two products keep their own
   rows across the three columns. */
export function Bridge({ block }: { block: Of<'bridge'> }) {
  return (
    <figure
      aria-label={`${block.label}: ${block.phases.during.toLowerCase()}, ${block.from.toLowerCase()} and ${block.to.toLowerCase()} are both live`}
      className={styles.bridge}
    >
      <Layout columns={{ base: 1, lg: [1, 2, 1] }} colGap="none" rowGap="stack">
        <Layout rowGap="tight" className={styles.phase}>
          <span className={cx(styles.key, styles.phaseHead)}>{block.phases.before}</span>
          <span className={styles.bar} data-product="current" data-state="live">
            {block.from}
          </span>
          <span className={styles.barSpacer} aria-hidden="true" />
        </Layout>
        <Layout rowGap="block" className={styles.phase}>
          <Layout rowGap="tight">
            <span className={cx(styles.key, styles.phaseHead)}>{block.phases.during}</span>
            <span className={styles.bar} data-product="current" data-state="ending">
              {block.from}, still running
            </span>
            <span className={styles.bar} data-product="target" data-state="starting">
              {block.to}, already running
            </span>
          </Layout>
          <Layout rowGap="text" className={styles.between}>
            <span className={styles.key}>{block.label}</span>
            <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="none">
              {block.items.map((item) => (
                <li key={item} className={styles.state}>
                  {item}
                </li>
              ))}
            </Layout>
          </Layout>
        </Layout>
        <Layout rowGap="tight" className={styles.phase}>
          <span className={cx(styles.key, styles.phaseHead)}>{block.phases.after}</span>
          <span className={styles.barSpacer} aria-hidden="true" />
          <span className={styles.bar} data-product="target" data-state="live">
            {block.to}
          </span>
        </Layout>
      </Layout>
    </figure>
  );
}

/* ── Thread ───────────────────────────────────────────────────────────────────
   Named stages joined by arrows, wrapping as the width runs out — a flow of artefacts, lighter
   than Steps (no bodies unless given, no numbers), with an optional return path drawn as its own
   line beneath: what production shows feeds the next decision. */
export function Thread({ block }: { block: Of<'thread'> }) {
  const withBodies = block.items.some((item) => item.body);
  return (
    <Layout rowGap="block">
      {withBodies ? (
        <Layout as="ol" columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="stack">
          {block.items.map((item, index) => (
            <li key={item.title} className={styles.threadStage}>
              <Layout rowGap="tight">
                <span className={styles.key}>{String(index + 1).padStart(2, '0')}</span>
                <h3 className={styles.rowTitle}>{item.title}</h3>
                {item.body ? <p className={styles.rowBody}>{item.body}</p> : null}
              </Layout>
            </li>
          ))}
        </Layout>
      ) : (
        <Cluster as="ol" colGap="tight" rowGap="text" align="center">
          {block.items.map((item, index) => (
            <li key={item.title} className={styles.chain}>
              <Cluster nowrap colGap="tight" align="center">
                <span className={styles.node}>{item.title}</span>
                {index < block.items.length - 1 ? (
                  <span className={styles.arrow} aria-hidden="true">
                    <Icon name="arrow-right" size="md" />
                  </span>
                ) : null}
              </Cluster>
            </li>
          ))}
        </Cluster>
      )}
      {block.loop ? (
        <Cluster nowrap colGap="tight" align="center" className={styles.loop}>
          <span className={styles.icon} aria-hidden="true">
            <Icon name="undo-left" size="lg" />
          </span>
          <span className={styles.loopText}>{block.loop}</span>
        </Cluster>
      ) : null}
    </Layout>
  );
}
