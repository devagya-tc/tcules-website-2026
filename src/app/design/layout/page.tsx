import { Layout, Section } from '@/components';

import { Box, Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Layout specimen — the checkpoint page. If the ratio grid, the reflow grid and equalRows all
 * render correctly here, then the reset, the var() fallbacks, CSS Modules and the layout engine
 * are all working together.
 */
export default function LayoutSpecimenPage() {
  return (
    <Section>
      <Layout rowGap="2xl">
        <Layout rowGap="sm">
          <h1>Layout</h1>
          <p>
            The columnar primitive. Owns the two seams between its children and arranges them
            into tracks. A vertical stack is the single-track case.
          </p>
        </Layout>

        <Specimen
          title="columns={[2, 1]} colGap='lg' rowGap='lg'"
          note="Fractional weights — a 2:1 ratio from md up, collapsing to a single track below 768."
        >
          <Layout columns={[2, 1]} colGap="lg" rowGap="lg">
            <Box tall>2fr</Box>
            <Box tall accent>
              1fr
            </Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={3} colGap='lg' rowGap='lg'"
          note="Three equal tracks from md up. minmax(0, 1fr) means a long unbroken word cannot widen its track."
        >
          <Layout columns={3} colGap="lg" rowGap="lg">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns='fit' minTrack='sm' colGap='lg' rowGap='lg'"
          note="Content-driven: as many 16rem tracks as fit, no breakpoints involved. Resize the window — it reflows continuously, and the part-full last row STRETCHES to absorb the slack."
        >
          <Layout columns="fit" minTrack="sm" colGap="lg" rowGap="lg">
            <Box>fit</Box>
            <Box>fit</Box>
            <Box>fit</Box>
            <Box>fit</Box>
            <Box>fit</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns='tile' minTrack='sm' justify='center'"
          note="The same reflow, but tracks keep their width so the leftover stays leftover — which is what lets justify centre a part-full last row instead of stretching it. Compare against 'fit' above."
        >
          <Layout columns="tile" minTrack="sm" colGap="lg" rowGap="lg" justify="center">
            <Box>tile</Box>
            <Box>tile</Box>
            <Box>tile</Box>
            <Box>tile</Box>
            <Box>tile</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={3} equalRows"
          note="Every item fills its row, so the short cards grow to match the tall one — the fill is on the box itself, not just the invisible track."
        >
          <Layout columns={3} colGap="lg" rowGap="lg" equalRows>
            <Box>short</Box>
            <Box tall>tall — sets the row height</Box>
            <Box>short</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={3} align='center'"
          note="Without equalRows, align places each item in its row instead of stretching it. Centre: the short boxes sit mid-height against the tall one."
        >
          <Layout columns={3} colGap="lg" rowGap="lg" align="center">
            <Box>short</Box>
            <Box tall>tall</Box>
            <Box>short</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={{ base: 1, md: 2, xl: 4 }}"
          note="Per-breakpoint object. Each breakpoint falls back to the nearest smaller defined template, so lg inherits md's two tracks."
        >
          <Layout columns={{ base: 1, md: 2, xl: 4 }} colGap="lg" rowGap="lg">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
            <Box>4</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="Nesting — rhythm comes from grouping, not from a rhythm knob"
          note="An outer stack at 3xl (48) holding two inner stacks at xs (8). The tight pairs read as units because of the contrast between the two seams, and no child sets any margin of its own."
        >
          <Layout rowGap="3xl">
            <Layout rowGap="xs">
              <Box>grouped — xs seam</Box>
              <Box>grouped — xs seam</Box>
            </Layout>
            <Layout rowGap="xs">
              <Box>grouped — xs seam</Box>
              <Box>grouped — xs seam</Box>
            </Layout>
          </Layout>
        </Specimen>

        <Specimen
          title="The rowGap ramp — 2xs · xs · sm · md · lg · xl · 2xl · 3xl"
          note="Every rung, in order. The ramp must be strictly increasing at every viewport width. xl / 2xl / 3xl are flat here: their 768/1024 stepping belongs to the token ramp and returns with it."
        >
          <Layout rowGap="lg">
            {(['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const).map((rung) => (
              <Layout key={rung} rowGap={rung}>
                <div className={s.ruler}>rowGap=&quot;{rung}&quot;</div>
                <div className={s.ruler} />
              </Layout>
            ))}
          </Layout>
        </Specimen>

        <Specimen
          title="No gap stated → 0, on purpose"
          note="Neither axis has a default. A silent 24 looks plausible and hides an omission; a collapsed seam is wrong on sight. These two boxes share an edge."
        >
          <Layout columns={2}>
            <Box>no colGap</Box>
            <Box>no colGap</Box>
          </Layout>
        </Specimen>
      </Layout>
    </Section>
  );
}
