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
      <Layout rowGap="stack">
        <Layout rowGap="block">
          <h1>Layout</h1>
          <p>
            The columnar primitive. Owns the two seams between its children and arranges them
            into tracks. A vertical stack is the single-track case.
          </p>
        </Layout>

        <Specimen
          title="columns={[2, 1]} colGap='block' rowGap='block'"
          note="Fractional weights — a 2:1 ratio from md up, collapsing to a single track below 768."
        >
          <Layout columns={[2, 1]} colGap="block" rowGap="block">
            <Box tall>2fr</Box>
            <Box tall accent>
              1fr
            </Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={3} colGap='block' rowGap='block'"
          note="Three equal tracks from md up. minmax(0, 1fr) means a long unbroken word cannot widen its track."
        >
          <Layout columns={3} colGap="block" rowGap="block">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns='fit' minTrack='sm' colGap='block' rowGap='block'"
          note="Content-driven: as many 16rem tracks as fit, no breakpoints involved. Resize the window — it reflows continuously, and the part-full last row STRETCHES to absorb the slack."
        >
          <Layout columns="fit" minTrack="sm" colGap="block" rowGap="block">
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
          <Layout columns="tile" minTrack="sm" colGap="block" rowGap="block" justify="center">
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
          <Layout columns={3} colGap="block" rowGap="block" equalRows>
            <Box>short</Box>
            <Box tall>tall — sets the row height</Box>
            <Box>short</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={{ base: 1, md: 3 }} lead equalRows"
          note="The first child spans every track in a row of its own; the rest fill the tracks below. The lead is tall, and the rows under it are still equal only to each other: the lead's row is explicit and auto, the later rows are 1fr, so its height never leaks into theirs."
        >
          <Layout columns={{ base: 1, md: 3 }} colGap="block" rowGap="block" equalRows lead>
            <Box tall accent>
              lead — spans the row
            </Box>
            <Box>short</Box>
            <Box>a longer peer that sets its own row height for the two beside it</Box>
            <Box>short</Box>
            <Box>short</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={3} align='center'"
          note="Without equalRows, align places each item in its row instead of stretching it. Centre: the short boxes sit mid-height against the tall one."
        >
          <Layout columns={3} colGap="block" rowGap="block" align="center">
            <Box>short</Box>
            <Box tall>tall</Box>
            <Box>short</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={{ base: 1, md: 2, xl: 4 }}"
          note="Per-breakpoint object. Each breakpoint falls back to the nearest smaller defined template, so lg inherits md's two tracks."
        >
          <Layout columns={{ base: 1, md: 2, xl: 4 }} colGap="block" rowGap="block">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
            <Box>4</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={[1, 1]} reverse — from md up"
          note="Bare reverse applies from md, like a bare columns spec. At 1440 the image (accent, first in the DOM) sits RIGHT; at 390 the row is one 326 track and the image comes first, in source order. Visual only: reading and Tab order are always the DOM order, so reverse is for image/text pairs, never for a sequence."
        >
          <Layout columns={[1, 1]} colGap="column" rowGap="block" align="center" reverse>
            <Box tall accent>
              1 · image — first in the DOM
            </Box>
            <Box>2 · copy — second in the DOM</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={[2, 1]} reverse={{ lg: true }}"
          note="Reversed from 1024 only: the ratio travels with its child, so the 2fr image lands on the right and the 1fr copy on the left. Between 768 and 1023 it reads in source order; at 390 it is a single track."
        >
          <Layout columns={[2, 1]} colGap="column" rowGap="block" reverse={{ lg: true }}>
            <Box tall accent>
              1 · image — 2fr
            </Box>
            <Box>2 · copy — 1fr</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={3} reverse — a triple"
          note="Child k takes the k-th track from the end, so a triple mirrors to 3 · 2 · 1 at 1440 and stacks 1 · 2 · 3 at 390."
        >
          <Layout columns={3} colGap="block" rowGap="block" reverse>
            <Box accent>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={{ base: 2 }} reverse={{ base: true, lg: false }}"
          note="The explicit off. Two tracks at every width, reversed at 390 and restored from 1024 — so at 1440 the accent box is back on the left."
        >
          <Layout columns={{ base: 2 }} colGap="block" rowGap="block" reverse={{ base: true, lg: false }}>
            <Box accent>1</Box>
            <Box>2</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={[1, 2]} offset={1}"
          note="One child, set into the 2fr track with the leading 1fr left empty — a reading column offset into the page. At 390 a bare offset does not apply and the child fills the 326 track."
        >
          <Layout columns={[1, 2]} colGap="column" rowGap="block" offset={1}>
            <Box tall>the reading column — starts at track 2</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={4} offset={2}"
          note="The first child starts at track 3; the second flows on after it into track 4, and a third wraps to the start of the next row. Stacked in source order at 390."
        >
          <Layout columns={4} colGap="block" rowGap="block" offset={2}>
            <Box accent>1 · starts at track 3</Box>
            <Box>2 · flows on</Box>
            <Box>3 · wraps</Box>
          </Layout>
        </Specimen>

        <Specimen
          title="columns={3} — each card a Layout rowGap='block' pinLast"
          note="Three cards with different body lengths in one row. The outer row stretches every card to the tallest; inside each, the last row is 1fr and the cta aligns to its end, so the three ctas share one baseline at 1440. At 390 each card is its content height and pinLast changes nothing."
        >
          <Layout columns={3} colGap="gutter" rowGap="gutter">
            {[
              'A short body.',
              'A body of middling length that wraps to two or three lines at desktop width.',
              'The longest body in the row, written to run on so that this card sets the row height for the other two and the pinned ctas beside it have spare height to sit at the foot of.',
            ].map((body, i) => (
              <Layout key={i} rowGap="block" pinLast className={s.box}>
                <strong>Card {i + 1}</strong>
                <p>{body}</p>
                <Box accent>cta — pinned to the foot</Box>
              </Layout>
            ))}
          </Layout>
        </Specimen>

        <Specimen
          title="columns={3} — the same cards without pinLast"
          note="The control. Each cta follows its own body, so the three sit at three different heights."
        >
          <Layout columns={3} colGap="gutter" rowGap="gutter">
            {[
              'A short body.',
              'A body of middling length that wraps to two or three lines at desktop width.',
              'The longest body in the row, written to run on so that this card sets the row height for the other two and the pinned ctas beside it have spare height to sit at the foot of.',
            ].map((body, i) => (
              <Layout key={i} rowGap="block" className={s.box}>
                <strong>Card {i + 1}</strong>
                <p>{body}</p>
                <Box accent>cta — follows the body</Box>
              </Layout>
            ))}
          </Layout>
        </Specimen>

        <Specimen
          title="Nesting — rhythm comes from grouping, not from a rhythm knob"
          note="An outer stack at 'stack' (48) holding two inner stacks at 'tight' (8). The tight pairs read as units because of the contrast between the two seams, and no child sets any margin of its own."
        >
          <Layout rowGap="stack">
            <Layout rowGap="tight">
              <Box>grouped — tight seam</Box>
              <Box>grouped — tight seam</Box>
            </Layout>
            <Layout rowGap="tight">
              <Box>grouped — tight seam</Box>
              <Box>grouped — tight seam</Box>
            </Layout>
          </Layout>
        </Specimen>

        <Specimen
          title="The gap scale — inline · tight · text · block · gutter · stack · column · section · section-open"
          note="All nine steps, in order: 4 · 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128. The scale does not shift responsively — a step is chosen by what it separates, and the layout changes at a breakpoint, not the distance."
        >
          <Layout rowGap="block">
            {(
              [
                'inline',
                'tight',
                'text',
                'block',
                'gutter',
                'stack',
                'column',
                'section',
                'section-open',
              ] as const
            ).map((rung) => (
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
