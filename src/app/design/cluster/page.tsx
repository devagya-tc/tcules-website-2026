import { Cluster, Layout, Section } from '@/components';

import { Box, Specimen, specimenStyles as s } from '../_specimen/Specimen';

/** Cluster specimen — the inline axis. */
export default function ClusterSpecimenPage() {
  return (
    <Section>
      <Layout rowGap="2xl">
        <Layout rowGap="sm">
          <h1>Cluster</h1>
          <p>
            The inline-flow primitive, and the horizontal counterpart to Layout. A wrapping flex
            row that owns the gaps between its children: button groups, chip rows,
            icon-beside-label, dot-separated metadata.
          </p>
          <p>
            Because it wraps it has two seams — between items on a line, and between the lines
            themselves — so both are set separately and neither has a default.
          </p>
        </Layout>

        <Specimen
          title="colGap='sm' rowGap='sm'"
          note="Wraps by default, so it never overflows a narrow container. Narrow the window until it wraps and the rowGap becomes visible between lines."
        >
          <Cluster colGap="sm" rowGap="sm">
            {Array.from({ length: 12 }, (_, i) => (
              <Box key={i}>chip {i + 1}</Box>
            ))}
          </Cluster>
        </Specimen>

        <Specimen
          title="The ramp — capped at lg"
          note="Layout's vocabulary, stopping at lg (24). A wrapping chip row has no use for a structural beat, so the two primitives share one set of names and differ only by ceiling."
        >
          <Layout rowGap="md">
            {(['2xs', 'xs', 'sm', 'md', 'lg'] as const).map((rung) => (
              <Cluster key={rung} colGap={rung}>
                <Box>colGap=&quot;{rung}&quot;</Box>
                <Box>·</Box>
                <Box>·</Box>
              </Cluster>
            ))}
          </Layout>
        </Specimen>

        <Specimen
          title="justify — start · center · end · between"
          note="Main-axis distribution. `between` pushes items to the container edges, which is how a row with a label at one end and an action at the other is built."
        >
          <Layout rowGap="md">
            {(['start', 'center', 'end', 'between'] as const).map((justify) => (
              <Cluster key={justify} colGap="sm" justify={justify}>
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
          <Layout rowGap="md">
            <Cluster colGap="sm" align="baseline">
              <Box>baseline</Box>
              <span style={{ fontSize: '1.75rem' }}>Aa</span>
              <span style={{ fontSize: '0.75rem' }}>Aa</span>
            </Cluster>
            <Cluster colGap="sm" align="center">
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
            <Cluster colGap="sm" nowrap>
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
          <Cluster colGap="lg" rowGap="lg">
            <Box>outer</Box>
            <Cluster colGap="2xs">
              <Box>inner</Box>
              <Box>inner</Box>
            </Cluster>
          </Cluster>
        </Specimen>
      </Layout>
    </Section>
  );
}
