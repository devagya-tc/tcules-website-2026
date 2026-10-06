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

/* ── Authority meter ──────────────────────────────────────────────────────────
   How much of the decision the MODEL holds rather than a person: one slot per role on the list,
   filled from the model's side. "Generates a candidate" fills one — the person still decides almost
   everything; "Acts with delegated authority" fills them all. One slot per row, not a fixed six, so
   no two roles are drawn as a tie the content does not claim. More fill, more of the decision handed over: the direction
   readers already take ink in. It is not the disruption trace because it is not the same quantity —
   one meter per meaning (1 Oct 2026). Hidden from assistive technology; the hidden span says it in
   words under the column head. */
function AuthorityMeter({ level, slots }: { level: number; slots: number }) {
  return (
    <>
      <Cluster
        as="span"
        nowrap
        colGap="inline"
        aria-hidden="true"
        className={styles.authoritySlots}
      >
        {Array.from({ length: slots }, (_, index) => (
          <span
            key={index}
            className={styles.authoritySlot}
            data-held={index < level ? 'model' : 'person'}
          />
        ))}
      </Cluster>
      <span className={styles.visuallyHidden}>
        {level} of {slots}
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
/* Five options is the most a spectrum holds in its band at 1470 WITH SLACK, and the template
   enforces it rather than trusting copy to fit (fix round 2, 6 Oct 2026). Six two-line rows ran the
   stress band to 829 of 830 — a fixture one line longer failed — and seven ran it to 892 (fix round
   1). The rest belong on the deep page, linked from the band (`more`); the template renders the
   first five and warns, so a sixth never silently pushes the band past the fold. */
export const SPECTRUM_MAX = 5;

/** The first `max` of a list, with a development warning when it was longer: a structural cap. */
function capped<T>(items: readonly T[], max: number, what: string): readonly T[] {
  if (items.length <= max) return items;
  if (process.env.NODE_ENV !== 'production')
    console.warn(
      `ServicePage: a ${what} of ${items.length} runs its band past the fold; the first ${max} render. Link the rest from the band's \`more\`.`,
    );
  return items.slice(0, max);
}

export function Spectrum({ block }: { block: Of<'spectrum'> }) {
  const meter = block.meter;
  const items = capped(block.items, SPECTRUM_MAX, 'spectrum');
  const last = items.length - 1;
  return (
    <DataTable
      /* Ruled, not boxed (fix round 2): the spectrum is the band's diagram, and a boxed table with a
         grey head row was a box around text content (owner ruling). */
      frame="ruled"
      /* The order, said once, when no meter shows it row by row: the story's own sentence. It was
         assembled here from the axis labels, lower-cased — which rewrote authored strings (an
         acronym or a name in an axis label came out wrong) and put template copy on the page. */
      summary={meter ? undefined : block.summary}
      keyColumn={{ heading: block.columns.name }}
      columns={[
        ...(meter ? [{ heading: meter.label, behaviour: 'nowrap' as const }] : []),
        { heading: block.columns.when },
        { heading: block.columns.settles },
      ]}
      rows={items.map((item, index) => ({
        header: item.name,
        cellsHtml: [
          ...(meter
            ? [
                {
                  node:
                    meter.kind === 'authority' ? (
                      <AuthorityMeter level={index + 1} slots={items.length} />
                    ) : (
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

/* ── Matrix ───────────────────────────────────────────────────────────────────
   A comparison laid out on the rows it compares (1 Oct 2026, owner: "could comparisons be done in a
   better way than just 2 lists side by side?"). Two lists made the READER line them up — and a
   3-item list beside a 7-item one read as an imbalance, not an argument. Here each thing to decide
   is a row with a check or a cross under each side, so the comparison is done row by row. A real
   table, so it holds at every width. */
/* A matrix of more than six rows sets them in two tables side by side from 1024 (fix round 1, 7 Oct
   2026): a ten-row matrix was a 639-tall table, the band 1021 to 1890 at 1470. The marks are a
   narrow column each, so one table used a fifth of the 1240; two halves use it all and the band is
   half as tall. The second half repeats the column heads, because each half is a table a reader
   (and a screen reader) can read on its own. */
const MATRIX_SPLIT_FROM = 7;

export function Matrix({ block }: { block: Of<'matrix'> }) {
  if (block.rows.length < MATRIX_SPLIT_FROM)
    return <MatrixTable block={block} rows={block.rows} />;
  const half = Math.ceil(block.rows.length / 2);
  return (
    <Layout columns={{ lg: 2 }} colGap="column" rowGap="stack" align="start">
      <MatrixTable block={block} rows={block.rows.slice(0, half)} />
      <MatrixTable block={block} rows={block.rows.slice(half)} />
    </Layout>
  );
}

function MatrixTable({ block, rows }: { block: Of<'matrix'>; rows: Of<'matrix'>['rows'] }) {
  return (
    <DataTable
      frame="ruled"
      keyColumn={{ heading: block.keyColumn }}
      columns={block.columns.map((heading) => ({ heading, behaviour: 'nowrap' as const }))}
      rows={rows.map((row) => ({
        header: row.header,
        cellsHtml: block.columns.map((_, index) => {
          const yes = row.marks[index] === true;
          /* A check in the blue accent, a cross in quiet ink: the checks carry the comparison,
             the crosses only say "not this one" (1 Oct 2026, owner). Icon's label names each. */
          return {
            node: (
              <span className={yes ? styles.markYes : styles.markNo}>
                <Icon
                  name={yes ? 'check-circle' : 'close-circle'}
                  size="lg"
                  label={yes ? block.labels.yes : block.labels.no}
                />
              </span>
            ),
          };
        }),
      }))}
    />
  );
}

/* ── Record ───────────────────────────────────────────────────────────────────
   A record with fields, drawn as the document it is: a head naming the record, and one row per
   field — the field keyed in mono with its glyph ABOVE the question it holds, in serif. Stacked,
   not side by side: a key and its question are one item, not two columns.
   Drawn with rules only (fix round 2, 6 Oct 2026, owner ruling: no boxes around text content): the
   head closes on the strong rule and every field on a hairline. It used to paint a ground inside a
   full border, the one sheet in the template, and that box was a box around questions. */
const RECORD_PAIRED_FROM = 4;
/* Eight fields — four paired rows — is the most a record holds in its band with slack. */
const RECORD_MAX = 8;

export function Record({ block }: { block: Of<'record'> }) {
  const items = capped(block.items, RECORD_MAX, 'record');
  const paired = items.length >= RECORD_PAIRED_FROM;
  return (
    <figure className={styles.sheet}>
      {/* Stacked: what the record is for, then its name — a label over the thing it labels. It was
          title left, mono meta right, the left/right pairing the owner rejected (1 Oct 2026). */}
      <Layout as="figcaption" rowGap="tight" className={styles.sheetHead}>
        <span className={styles.key}>{block.meta}</span>
        <span className={styles.sheetTitle}>{block.title}</span>
      </Layout>
      {/* Four or more fields pair up from 1024, so the sheet is half as tall (fix round 1), the two
          columns a `column` apart — two halves of one sheet that must read as separate lists. */}
      <Layout
        as="dl"
        rowGap="none"
        colGap={paired ? 'column' : undefined}
        columns={paired ? { lg: 2 } : undefined}
      >
        {items.map((item) => (
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

/* ── Parts: four parts in one orbit ───────────────────────────────────────────
   "Four of them are the system. The fifth decides whether the other four stay current." So the
   drawing is the system: the four parts are nodes on one inner orbit, joined through a hub, and the
   operating model is the loop around them — a ring with its direction marked, because it is the
   cycle (contribution, release, migration) that keeps the four current. The parts are named either
   side of the ring, two and two, each beside the node on its side; the operating model is named
   under it (page-design-systems fix round 1, 6 Oct 2026: the bracket over a row of four tiles was
   the page's fifth tile set and read as a document, one sentence across 1240 above a hairline row).

   Arrangement is three Layout tracks — parts, ring, parts — centred on the ring from 1024. Below it
   the parts are one column, and the ring leads the set rather than falling between the two pairs,
   where at 390 it sat unlabelled between Components and Design assets (fix round 2): the drawing is
   the whole system, so it goes above the list of what is in it. The loop's name closes the set, a
   `stack` under it like every part, centred from 1024 and on the start edge below. The drawing is
   decorative (`aria-hidden`) and drawn twice, one copy per width with the other `display: none`,
   so it never reaches the accessibility tree; every word is in the lists and headings beside it. */
const ORBIT = 240;
const ORBIT_C = ORBIT / 2;
const LOOP_R = 112;
/* The inner orbit puts each node level with the middle of its part beside the ring at lg: two
   parts a `stack` apart centre about 68 either side of the ring's centre, 57 units at 288. */
const INNER_R = 80;
const NODE = 12;
const HUB = 16;
const ARROW = 6;
/* The four nodes on the inner orbit at 45°: start side top and bottom, then end side. */
const NODE_AT = INNER_R * Math.SQRT1_2;
const NODES: readonly (readonly [number, number])[] = [
  [ORBIT_C - NODE_AT, ORBIT_C - NODE_AT],
  [ORBIT_C - NODE_AT, ORBIT_C + NODE_AT],
  [ORBIT_C + NODE_AT, ORBIT_C - NODE_AT],
  [ORBIT_C + NODE_AT, ORBIT_C + NODE_AT],
];
/* Where a node's horizontal leader meets the loop, on the node's own side. */
const LEADER_X = Math.sqrt(LOOP_R * LOOP_R - NODE_AT * NODE_AT);

function Orbit({ at }: { at: 'lead' | 'middle' }) {
  const top = ORBIT_C - LOOP_R;
  const bottom = ORBIT_C + LOOP_R;
  return (
    <svg
      className={at === 'lead' ? styles.orbitLead : styles.orbitMiddle}
      viewBox={`0 0 ${ORBIT} ${ORBIT}`}
      aria-hidden="true"
      focusable="false"
    >
      <circle className={styles.orbitLoop} cx={ORBIT_C} cy={ORBIT_C} r={LOOP_R} />
      {/* Clockwise: right at the top, left at the foot. */}
      <path
        className={styles.orbitMark}
        d={`M${ORBIT_C - ARROW} ${top - ARROW}L${ORBIT_C + ARROW} ${top}L${ORBIT_C - ARROW} ${top + ARROW}Z`}
      />
      <path
        className={styles.orbitMark}
        d={`M${ORBIT_C + ARROW} ${bottom - ARROW}L${ORBIT_C - ARROW} ${bottom}L${ORBIT_C + ARROW} ${bottom + ARROW}Z`}
      />
      <circle className={styles.orbitRule} cx={ORBIT_C} cy={ORBIT_C} r={INNER_R} />
      {NODES.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <line className={styles.orbitRule} x1={ORBIT_C} y1={ORBIT_C} x2={x} y2={y} />
          <line
            className={styles.orbitLeader}
            x1={x}
            y1={y}
            x2={x < ORBIT_C ? ORBIT_C - LEADER_X : ORBIT_C + LEADER_X}
            y2={y}
          />
          <rect
            className={styles.orbitMark}
            x={x - NODE / 2}
            y={y - NODE / 2}
            width={NODE}
            height={NODE}
          />
        </g>
      ))}
      <rect
        className={styles.orbitHub}
        x={ORBIT_C - HUB / 2}
        y={ORBIT_C - HUB / 2}
        width={HUB}
        height={HUB}
      />
    </svg>
  );
}

type Part = Of<'parts'>['items'][number];

function PartList({ items, side }: { items: readonly Part[]; side: 'start' | 'end' }) {
  return (
    <Layout as="ul" rowGap="stack" className={side === 'start' ? styles.partsStart : undefined}>
      {items.map((item) => (
        <li key={item.name}>
          <Layout rowGap="tight">
            <Cluster colGap="tight" nowrap justify={side === 'start' ? { lg: 'end' } : 'start'}>
              <span className={styles.icon} aria-hidden="true">
                <Icon name={item.icon} size="xl" />
              </span>
              <h3 className={styles.partName}>{item.name}</h3>
            </Cluster>
            <p className={styles.partBody}>{item.body}</p>
          </Layout>
        </li>
      ))}
    </Layout>
  );
}

export function Parts({ block }: { block: Of<'parts'> }) {
  const half = Math.ceil(block.items.length / 2);
  return (
    <Layout rowGap="stack">
      <Orbit at="lead" />
      <Layout columns={{ base: 1, lg: [1, 1, 1] }} colGap="column" rowGap="stack" align="center">
        <PartList items={block.items.slice(0, half)} side="start" />
        <Orbit at="middle" />
        <PartList items={block.items.slice(half)} side="end" />
      </Layout>
      <Layout rowGap="tight" className={styles.hub}>
        <Cluster colGap="tight" nowrap justify={{ lg: 'center' }}>
          <span className={styles.icon} aria-hidden="true">
            <Icon name={block.frame.icon} size="xl" />
          </span>
          <h3 className={styles.frameTitle}>{block.frame.name}</h3>
        </Cluster>
        <p className={styles.frameBody}>{block.frame.body}</p>
      </Layout>
    </Layout>
  );
}

/* ── Slice: the same work, organised two ways ─────────────────────────────────
   The section argues a PROBLEM and its answer: "organised only by layer, every team can be locally
   complete while the product path stays unusable", so a release is a slice through every layer. The
   first drawing showed only the answer — a column through five bands — and read as a grid with a
   stripe in it (1 Oct 2026, owner: "i can't tell what it is trying to communicate").

   Now it is the same grid twice, layers down the side and user paths across, under one legend (built
   / not built yet), each grid closing on a verdict row — does each path work end to end? — derived
   from its cells, so the reader is told which arrangement wins rather than left to infer it. By layer: every layer
   is nearly built, but each path is missing a different piece, so none works. By release: one path is
   built through every layer, and it is the one that can ship. Peers being compared, so `column` apart.
   By layer is SPARSE on purpose (1 Oct 2026, owner): each team has built about half of its layer, on
   different paths — a diagonal stagger — so the grid reads "busy everywhere, finished nowhere". When
   every layer was four-fifths built it read as "nearly done", which is the opposite of the point.

   The grid keeps its columns at every width (`base`): a bare track list applies from md, and on a
   phone the cells stacked into bars and the grid stopped being a grid. The grid is illustrative — the gaps step one path per layer, which is the pattern the sentence
   describes — so it draws from the layer names alone. */
function SliceGrid({
  layers,
  view,
  legend,
  done,
}: {
  layers: readonly string[];
  view: { title: string; note: string };
  legend: { path: string; works: string; missing: string };
  done: (layer: number, path: number) => boolean;
}) {
  const paths = Math.max(3, layers.length - 1); // the same count Slice computes
  const tracks = { base: [3, ...Array.from({ length: paths }, () => 1)] };
  const pathWorks = (path: number) => layers.every((_, layer) => done(layer, path));
  return (
    /* Named by its figcaption, the title and the note, and nothing else: an aria-label repeating
       the same words named the figure twice to a screen reader (ServicePage audit, 6 Oct 2026). */
    <figure className={styles.sliceView}>
      <Layout rowGap="block">
        <Layout as="figcaption" rowGap="tight">
          <span className={styles.sliceTitle}>{view.title}</span>
          <span className={styles.sliceNote}>{view.note}</span>
        </Layout>
        <Layout rowGap="tight" aria-hidden="true">
          {/* Each column is one user path, named over it. */}
          <Layout columns={tracks} colGap="tight" align="end">
            <span />
            {Array.from({ length: paths }, (_, path) => (
              <span key={path} className={styles.layerName}>
                {legend.path} {path + 1}
              </span>
            ))}
          </Layout>
          {layers.map((layer, layerIndex) => (
            <Layout key={layer} columns={tracks} colGap="tight" align="center">
              <span className={styles.layerName}>{layer}</span>
              {Array.from({ length: paths }, (_, path) => (
                <span
                  key={path}
                  className={styles.sliceCell}
                  data-done={done(layerIndex, path) ? 'yes' : 'no'}
                />
              ))}
            </Layout>
          ))}
          {/* The verdict: does each path work end to end? Derived from the cells above, so it can
              never disagree with them. */}
          <Layout columns={tracks} colGap="tight" align="center" className={styles.sliceResult}>
            <span className={styles.layerName}>{legend.works}</span>
            {Array.from({ length: paths }, (_, path) => (
              <span key={path} className={pathWorks(path) ? styles.markYes : styles.markNo}>
                <Icon name={pathWorks(path) ? 'check-circle' : 'close-circle'} size="lg" />
              </span>
            ))}
          </Layout>
        </Layout>
        {/* The verdict in words, for assistive technology (fix round 2): the drawn grid is hidden,
            and without this a screen reader got the title and the note but not which paths work.
            Built from `pathWorks` and the story's own legend, so it cannot disagree with the grid. */}
        <ul className={styles.visuallyHidden}>
          {Array.from({ length: paths }, (_, path) => (
            <li key={path}>
              {legend.path} {path + 1}: {pathWorks(path) ? legend.works : legend.missing}
            </li>
          ))}
        </ul>
      </Layout>
    </figure>
  );
}

export function Slice({ block }: { block: Of<'slice'> }) {
  /* SAME WORK IN BOTH GRIDS (1 Oct 2026, owner: "should they both reflect the same amount of
     work?"). Each layer builds `built` pieces in both: by layer they land on different paths, so no
     path has every piece; by release they land on the same paths, so those paths work. Equal by
     construction — the only thing that differs between the two grids is where the work went. */
  const paths = Math.max(3, block.layers.length - 1);
  const built = Math.floor(paths / 2);
  /* The paired grids and the acceptance levels are two blocks of one band, so they sit a `stack`
     (48) apart (§ 1.2 block → block). They were `section` (96), the split and band-padding step,
     which opened a band-sized hole inside the band (ServicePage audit, 6 Oct 2026). */
  return (
    <Layout rowGap="stack">
      <Layout rowGap="block">
        {/* The key, once, over both grids: what a cell is, before either grid asks the reader to
            read one. */}
        <Cluster as="p" colGap="block" rowGap="tight" className={styles.sliceLegend}>
          <Cluster as="span" nowrap colGap="tight">
            <span className={styles.sliceSwatch} data-done="yes" aria-hidden="true" />
            {block.legend.built}
          </Cluster>
          <Cluster as="span" nowrap colGap="tight">
            <span className={styles.sliceSwatch} data-done="no" aria-hidden="true" />
            {block.legend.missing}
          </Cluster>
        </Cluster>
        <Layout columns={{ base: 1, lg: 2 }} colGap="column" rowGap="stack">
          <SliceGrid
            layers={block.layers}
            view={block.views.layer}
            legend={block.legend}
            done={(layer, path) => (((path - layer) % paths) + paths) % paths < built}
          />
          <SliceGrid
            layers={block.layers}
            view={block.views.slice}
            legend={block.legend}
            done={(_, path) => path < built}
          />
        </Layout>
      </Layout>
      {block.levels && block.levels.length > 0 ? (
        <Layout rowGap="block">
          {block.levelsLabel ? (
            <h3 className={styles.levelsLabel}>{block.levelsLabel}</h3>
          ) : null}
          {/* Rows, the glyph beside the copy, side by side from md (fix round 1, 7 Oct 2026): as tiles
              with the glyph above, the three levels took ~250 of a band the two grids already fill,
              and the slice band ran to 990 at 1470 and 1833 at 390. */}
          <Layout
            as="ul"
            columns={{ base: 1, md: block.levels.length }}
            colGap="gutter"
            rowGap="none"
          >
            {block.levels.map((level) => (
              <ListCard
                key={level.title}
                arrangement="stacked"
                size="sm"
                titleAs="h4"
                title={level.title}
                body={level.body}
                marker={{ type: 'icon', name: level.icon }}
              />
            ))}
          </Layout>
        </Layout>
      ) : null}
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
/* Six things designed in between — three paired rows — hold the bridge band with slack (fix round
   2: seven ran the stress band to 803). The rest are the deep page's. */
const BRIDGE_MAX = 6;

export function Bridge({ block }: { block: Of<'bridge'> }) {
  const items = capped(block.items, BRIDGE_MAX, 'bridge');
  return (
    /* Named by the story's own sentence. It was assembled from four labels, lower-cased (ServicePage
       audit, 6 Oct 2026: never re-case an authored string). */
    <figure aria-label={block.summary} className={styles.bridge}>
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
                  {block.states.from}
                </span>
                <span className={styles.bar} data-state="partial">
                  {block.states.to}
                </span>
              </Layout>
            </Layout>
            <Layout rowGap="text">
              <span className={styles.key}>{block.label}</span>
              <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="none">
                {items.map((item) => (
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
