import type { ReactNode } from 'react';

import {
  Button,
  ClientMark,
  Cluster,
  Icon,
  Layout,
  Section,
  Tag,
  type ClientMarkProps,
  type SectionSurface,
} from '@/components';
import { ROUTES } from '@/lib/routes';

import { Box, Specimen, specimenStyles as s } from '../_specimen/Specimen';
import t from '../_specimen/typeroles.module.css';

/* ── Real compositions (tracker 2.17) ─────────────────────────────────────────────
   The mechanics above are proven with grey boxes; these four are the rows Cluster actually exists
   for, built from the shipped components and nothing else. Each renders in the full content column
   and in the 326 phone column, on paper and on ink. The gap on each is the step Cluster's own
   docblock names for that job — not a step chosen for how it looks here. */

/* The real client set — each file's viewBox, as /design/client-mark records it. */
const client = (
  name: string,
  file: string,
  width: number,
  height: number,
): Omit<ClientMarkProps, 'className'> => ({ name, src: `/clients/${file}.svg`, width, height });

const MARKS = [
  client('Omny', 'omny', 93.982, 24.792),
  client('LatitudePay', 'latitudepay', 133.896, 18.2),
  client('Quoter', 'quoter', 93.996, 28.002),
  client('Knovos', 'knovos', 85.232, 14),
  client('SafeXpay', 'safexpay', 83.02, 22.398),
  client('Doodle', 'doodle', 104, 24),
  client('Pledge', 'pledge', 92.032, 19.6),
  client('GT Tools', 'gttools', 67.384, 19.6),
  client('Incluude', 'incluude', 88.906, 16.851),
] as const;

const TAGS = [
  'Product design',
  'Design systems',
  'Fintech',
  'B2B SaaS',
  'Research',
  'Accessibility',
  'Front-end build',
] as const;

/* Authored in sentence case; the mono roles uppercase them in CSS only. */
const META = [
  ['Published', '29 Sep 2026'],
  ['Reading time', '8 min'],
  ['Type', 'Case study'],
] as const;

/** A button group: the primary action, then the secondary. tight — the step CtaSection uses. */
function ButtonGroup() {
  return (
    <Cluster colGap="tight" rowGap="tight">
      <Button as="a" href={ROUTES.contact} icon={<Icon name="arrow-right" />}>
        Start a project
      </Button>
      <Button as="a" href={ROUTES.caseStudies} emphasis="ghost">
        See the work
      </Button>
    </Cluster>
  );
}

/** A chip row: taxonomy Tags. tight on both axes — "chip padding" is the step the scale names. */
function ChipRow() {
  return (
    <Cluster as="ul" colGap="tight" rowGap="tight">
      {TAGS.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </Cluster>
  );
}

/** A metadata row: pairs at text apart, each key and value at inline, on the text baseline. */
function MetadataRow() {
  return (
    <Cluster as="dl" colGap="text" rowGap="tight" align="baseline">
      {META.map(([key, value]) => (
        <Cluster as="div" key={key} colGap="inline" align="baseline">
          <dt className={t.micro}>{key}</dt>
          <dd className={t.uiSm}>{value}</dd>
        </Cluster>
      ))}
    </Cluster>
  );
}

/** A client-mark strip: ClientMark × n at stack, the one step the scale reserves for it. */
function MarkStrip() {
  return (
    <Cluster as="ul" colGap="stack" rowGap="stack" align="center">
      {MARKS.map((mark) => (
        <li key={mark.name}>
          <ClientMark {...mark} />
        </li>
      ))}
    </Cluster>
  );
}

const COMPOSITIONS: readonly { title: string; note: string; render: () => ReactNode }[] = [
  {
    title: 'Button group — solid + ghost Buttons',
    note: 'colGap="tight" rowGap="tight". At 326 the pair still fits one line; narrower, the ghost wraps under the solid at 8.',
    render: () => <ButtonGroup />,
  },
  {
    title: 'Chip row — Tags',
    note: 'A <ul> Cluster at tight on both axes. The row wraps; no chip sets its own margin.',
    render: () => <ChipRow />,
  },
  {
    title: 'Metadata row — mono key/value pairs',
    note: 'A <dl> Cluster at text between pairs, each pair a nested Cluster at inline, all baseline-aligned. Keys are authored "Reading time", not "READING TIME".',
    render: () => <MetadataRow />,
  },
  {
    title: 'Client-mark strip — real marks from public/clients/',
    note: 'colGap="stack" rowGap="stack": at 24 the strip read as one crowded word. Every mark is drawn in the ground’s ink.',
    render: () => <MarkStrip />,
  },
];

const REAL_SURFACES: readonly SectionSurface[] = ['paper', 'ink'];

/** Cluster specimen — the inline axis. */
export default function ClusterSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h1>Cluster</h1>
            <p>
              The inline-flow primitive, and the horizontal counterpart to Layout. A wrapping
              flex row that owns the gaps between its children: button groups, chip rows,
              icon-beside-label, dot-separated metadata.
            </p>
            <p>
              Because it wraps it has two seams — between items on a line, and between the lines
              themselves — so both are set separately and neither has a default.
            </p>
          </Layout>

          <Specimen
            title="colGap='tight' rowGap='tight'"
            note="Wraps by default, so it never overflows a narrow container. Narrow the window until it wraps and the rowGap becomes visible between lines."
          >
            <Cluster colGap="tight" rowGap="tight">
              {Array.from({ length: 12 }, (_, i) => (
                <Box key={i}>chip {i + 1}</Box>
              ))}
            </Cluster>
          </Specimen>

          <Specimen
            title="The scale — capped at stack"
            note="The same nine-step gap scale Layout reads, stopping at stack (48). Chips and controls stop at block; gutter and stack are for rows of large items — a logo strip is set at stack. A wrapping row has no use for a column or section beat, so the two primitives share one vocabulary and differ only by ceiling."
          >
            <Layout rowGap="text">
              {(['inline', 'tight', 'text', 'block', 'gutter', 'stack'] as const).map(
                (rung) => (
                  <Cluster key={rung} colGap={rung}>
                    <Box>colGap=&quot;{rung}&quot;</Box>
                    <Box>·</Box>
                    <Box>·</Box>
                  </Cluster>
                ),
              )}
            </Layout>
          </Specimen>

          <Specimen
            title="justify — start · center · end · between"
            note="Main-axis distribution. `between` pushes items to the container edges, which is how a row with a label at one end and an action at the other is built."
          >
            <Layout rowGap="text">
              {(['start', 'center', 'end', 'between'] as const).map((justify) => (
                <Cluster key={justify} colGap="tight" justify={justify}>
                  <Box>justify=&quot;{justify}&quot;</Box>
                  <Box>·</Box>
                  <Box>·</Box>
                </Cluster>
              ))}
            </Layout>
          </Specimen>

          <Specimen
            title="align — baseline vs center"
            note="Cross-axis alignment. Baseline lines up the text itself across items of different sizes, which centre does not; it is what a metadata row wants."
          >
            <Layout rowGap="text">
              <Cluster colGap="tight" align="baseline">
                <Box>baseline</Box>
                <span style={{ fontSize: '1.75rem' }}>Aa</span>
                <span style={{ fontSize: '0.75rem' }}>Aa</span>
              </Cluster>
              <Cluster colGap="tight" align="center">
                <Box>center</Box>
                <span style={{ fontSize: '1.75rem' }}>Aa</span>
                <span style={{ fontSize: '0.75rem' }}>Aa</span>
              </Cluster>
            </Layout>
          </Specimen>

          <Specimen
            title="nowrap"
            note="Keeps items on one line. Only for rows that genuinely must not break — it can overflow, which wrapping never does."
          >
            <div className={s.scrollX}>
              <Cluster colGap="tight" nowrap>
                {Array.from({ length: 8 }, (_, i) => (
                  <Box key={i}>item {i + 1}</Box>
                ))}
              </Cluster>
            </div>
          </Specimen>

          <Specimen
            title="Nested — the inherit guard"
            note="A nested Cluster that sets only colGap must not inherit its ancestor's rowGap. Both --cluster-*-gap properties are zeroed on every .cluster for exactly this reason."
          >
            <Cluster colGap="block" rowGap="block">
              <Box>outer</Box>
              <Cluster colGap="inline">
                <Box>inner</Box>
                <Box>inner</Box>
              </Cluster>
            </Cluster>
          </Specimen>
          <Specimen
            title="stackUntil · md"
            note="Below 768 the items stack one per line at rowGap, from the start; from 768 the row wraps as usual. A hero's two actions take it, so their phone shape never depends on label length."
          >
            <Cluster colGap="block" rowGap="block" stackUntil="md">
              <Box>first</Box>
              <Box>second, a longer label</Box>
            </Cluster>
          </Specimen>
          <Specimen
            title="justify · { base: start, lg: end }"
            note="Distribution per breakpoint: at the start below 1024, at the end from it (a split head's ask flush with the column's end edge)."
          >
            <Cluster colGap="block" rowGap="block" justify={{ base: 'start', lg: 'end' }}>
              <Box>one</Box>
              <Box>two</Box>
            </Cluster>
          </Specimen>
        </Layout>
      </Section>

      {REAL_SURFACES.map((surface) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="stack">
            <Layout rowGap="block">
              <h2>Real compositions on {surface}</h2>
              <p>
                The four rows Cluster exists for, built from the shipped components — each in
                the full content column, then in the 326 phone column. No component was changed
                to make them; the gap on each is the step the scale names for that job.
              </p>
            </Layout>
            {COMPOSITIONS.map(({ title, note, render }) => (
              <Specimen key={title} title={`${title} · ${surface}`} note={note}>
                <Layout rowGap="stack">
                  {render()}
                  <Layout className={s.trackMobile} rowGap="tight">
                    <p className={t.micro}>326 column</p>
                    {render()}
                  </Layout>
                </Layout>
              </Specimen>
            ))}
          </Layout>
        </Section>
      ))}
    </>
  );
}
