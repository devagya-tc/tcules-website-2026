import { Cluster, Icon, Layout } from '@/components';
import { DataTable, ListCard } from '@/patterns';
import type { StoryBlock } from '@/lib/service-story';

import styles from './Diagrams.module.css';
import { paragraph } from './text';

type Of<K extends StoryBlock['kind']> = Extract<StoryBlock, { kind: K }>;

/* ── Disruption meter ─────────────────────────────────────────────────────────
   A tremor trace: the line a seismograph draws. Flat for an option that disturbs nothing, a
   growing burst for each step down the list, the widest for "Retire". Two things decided the form
   (1 Oct 2026, owner, on the first meter):
   - INK GROWS WITH DISRUPTION. Every reader takes more ink to mean more. The first meter put the
     most ink (six solid squares) on "Leave unchanged" and outlines on "Retire", so it read
     backwards — and its tilted outlines read as noise rather than as a quantity.
   - THE SIGN ALREADY MEANS DISTURBANCE. A seismograph trace is read as "how much shaking" without
     a legend, and it has no goal to fill toward, so it cannot be mistaken for progress — which is
     what got the meter before that one cut (30 Sep).

   The amplitude is the row's rank on the ordered list, spread over six steps — a rank, not a
   measurement, which is all the content claims. The burst is shaped by a sine envelope so it swells
   and settles like a tremor rather than buzzing at one height. Hidden from assistive technology;
   the meter's own hidden span states the level ("3 of 6"); the column head says what it measures. */
const METER_STEPS = 6;
const TRACE_WIDTH = 96;
const TRACE_HEIGHT = 24;
const TRACE_PEAKS = 16;

function tracePoints(level: number): string {
  const mid = TRACE_HEIGHT / 2;
  const reach = (mid - 1) * (level / METER_STEPS);
  return Array.from({ length: TRACE_PEAKS + 1 }, (_, index) => {
    const x = (index / TRACE_PEAKS) * TRACE_WIDTH;
    const envelope = Math.sin((Math.PI * index) / TRACE_PEAKS);
    const sign = index % 2 === 0 ? -1 : 1;
    const y = mid + sign * reach * envelope;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}

function DisruptionMeter({ level }: { level: number }) {
  return (
    <>
      <svg
        className={styles.meter}
        viewBox={`0 0 ${TRACE_WIDTH} ${TRACE_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <polyline className={styles.meterTrace} points={tracePoints(level)} />
      </svg>
      <span className={styles.visuallyHidden}>
        {level} of {METER_STEPS}
      </span>
    </>
  );
}

/* ── Spectrum ─────────────────────────────────────────────────────────────────
   Options on one scale, as a TABLE (1 Oct 2026, owner). Every row has the same attributes and a
   reader compares across rows, which is what a table is for — so it is DataTable, a real <table>
   that keeps its shape at every width and scrolls sideways on a phone, rather than rows drawn to
   look like one that dissolved into the same stacked blocks as the cards above them.

   With a meter, the scale is a column: every row shows where it sits, and the order needs no
   sentence. Without one, the order is said once, as the table's summary. */
export function Spectrum({ block }: { block: Of<'spectrum'> }) {
  const meter = block.meter;
  const last = block.items.length - 1;
  return (
    <DataTable
      summary={
        meter
          ? undefined
          : `Ordered from ${block.axis.from.toLowerCase()} to ${block.axis.to.toLowerCase()}.`
      }
      keyColumn={{ heading: block.columns.name }}
      columns={[
        ...(meter ? [{ heading: meter.label, behaviour: 'nowrap' as const }] : []),
        { heading: block.columns.when },
        { heading: block.columns.settles },
      ]}
      rows={block.items.map((item, index) => ({
        header: item.name,
        cellsHtml: [
          ...(meter
            ? [
                {
                  node: (
                    <DisruptionMeter
                      level={last > 0 ? Math.round((index / last) * METER_STEPS) : 0}
                    />
                  ),
                },
              ]
            : []),
          paragraph(item.when),
          paragraph(item.settles),
        ],
      }))}
    />
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

/* ── Parts: four held by a fifth ──────────────────────────────────────────────
   "Four of them are the system. The fifth decides whether the other four stay current." So the
   fifth HOLDS the four: the operating model is the panel, named at its head, and the four parts are
   tiles inside it (1 Oct 2026, owner: the section was crowded and unreadable). It used to be four
   tiles, a thin bracket under them with the operating model set heading-left/body-right, and three
   failure tiles whose titles were larger than the parts' — three ideas at one weight. Now one
   drawing carries the one idea, and the failures are a note after it. */
export function Parts({ block }: { block: Of<'parts'> }) {
  return (
    <div className={styles.holder}>
      <Layout rowGap="stack">
        <Layout rowGap="text">
          <span className={styles.icon} aria-hidden="true">
            <Icon name={block.frame.icon} size="xl" />
          </span>
          <Layout rowGap="tight">
            <h3 className={styles.frameTitle}>{block.frame.name}</h3>
            <p className={styles.frameBody}>{block.frame.body}</p>
          </Layout>
        </Layout>
        <Layout
          as="ul"
          columns={{ base: 1, md: 2, lg: block.items.length }}
          colGap="gutter"
          rowGap="stack"
        >
          {block.items.map((item) => (
            <ListCard
              key={item.name}
              form="tile"
              titleAs="h4"
              title={item.name}
              body={item.body}
              marker={{ type: 'icon', name: item.icon }}
            />
          ))}
        </Layout>
      </Layout>
    </div>
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
          <ListCard
            key={level.title}
            form="tile"
            titleAs="h3"
            title={level.title}
            body={level.body}
            marker={{ type: 'icon', name: level.icon }}
          />
        ))}
      </Layout>
    </Layout>
  );
}

/* ── Bridge: the transition in three states ───────────────────────────────────
   A move from the current product to the target one is not a jump: for a while BOTH are live, and
   that overlap is what has to be designed. So the diagram is three separate states, read left to
   right — Before, During the move, After — each its own panel with a gutter between, because a
   transition is a change from one state to the next and separate panels make the change visible
   (1 Oct 2026, owner: bars running across shared seams read as one table).

   What is live in each state is a bar: solid when a product is the one people use, dashed when it
   is half-present. Before holds the current product; During holds both, dashed — still running,
   already running — with the temporary work under them, because it exists only there; After holds
   the target. Below lg the three stack in the same order. */
export function Bridge({ block }: { block: Of<'bridge'> }) {
  return (
    <figure
      aria-label={`${block.label}: ${block.phases.during.toLowerCase()}, ${block.from.toLowerCase()} and ${block.to.toLowerCase()} are both live`}
      className={styles.bridge}
    >
      <Layout
        as="ol"
        columns={{ base: 1, lg: [1, 2, 1] }}
        colGap="gutter"
        rowGap="stack"
        align="start"
      >
        <li className={styles.phase}>
          <Layout rowGap="text">
            <span className={styles.key}>{block.phases.before}</span>
            <span className={styles.bar} data-state="live">
              {block.from}
            </span>
          </Layout>
        </li>
        <li className={styles.phase}>
          <Layout rowGap="block">
            <Layout rowGap="text">
              <span className={styles.key}>{block.phases.during}</span>
              <Layout rowGap="tight">
                <span className={styles.bar} data-state="partial">
                  {block.from}, still running
                </span>
                <span className={styles.bar} data-state="partial">
                  {block.to}, already running
                </span>
              </Layout>
            </Layout>
            <Layout rowGap="text">
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
        </li>
        <li className={styles.phase}>
          <Layout rowGap="text">
            <span className={styles.key}>{block.phases.after}</span>
            <span className={styles.bar} data-state="live">
              {block.to}
            </span>
          </Layout>
        </li>
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
