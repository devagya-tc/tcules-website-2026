import { Layout, Section } from '@/components';

import { Box, Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Section specimen. The dashed outline on the bands below is measuring chrome — it marks where
 * the band's content column starts and ends, which is otherwise invisible without colour.
 */
export default function SectionSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="2xl">
          <Layout rowGap="sm">
            <h1>Section</h1>
            <p>
              The full-width band. Insets its content to the one shared content column, applies
              the system-owned vertical rhythm, and provides the positioning context for
              full-bleed layers.
            </p>
            <p>
              One declaration does three jobs:{' '}
              <code>padding-inline: max(--inset, (100% - --max-content) / 2)</code>. Below the
              cap the edge inset wins; past it the centring term does.
            </p>
          </Layout>

          <Specimen
            title="Vertical rhythm — 64 → 96 → 128, stepping at 768 / 1024"
            note="System-owned, not author-controlled. There is no prop for it. Cross a breakpoint and the band's padding-block changes on its own."
          >
            <div className={s.ruler}>content sits inside the rhythm</div>
          </Specimen>

          <Specimen
            title="Edge inset — 16 → 24 → 32 → 40 → 48, stepping at 480 / 768 / 1024 / 1440"
            note="Narrow the window: the content edge tracks the inset ramp. Widen past 1280 and the content stops growing and centres instead."
          >
            <div className={s.ruler}>content column — capped at 80rem / 1280px</div>
          </Specimen>
        </Layout>
      </Section>

      <Section className={s.bandOutline}>
        <Layout rowGap="md">
          <p className={s.specTitle}>Two stacked Sections — the band boundary</p>
          <p className={s.specNote}>
            The dashed outline is chrome, not a border the primitive draws. Bands are separated by
            whitespace, and later by tone — never by a rule. This one and the next are adjacent,
            so the space between them is both bands&apos; padding-block.
          </p>
          <Box>band A</Box>
        </Layout>
      </Section>

      <Section className={s.bandOutline}>
        <Layout rowGap="md">
          <p className={s.specTitle}>The second band</p>
          <Box>band B</Box>
        </Layout>
      </Section>

      <Section flush className={s.bandOutline}>
        <Layout rowGap="md">
          <p className={s.specTitle}>flush — vertical rhythm zeroed</p>
          <p className={s.specNote}>
            For a composition that supplies its own vertical space; a full-bleed immersive hero is
            the case that needs it. The horizontal inset and the content cap are unaffected.
          </p>
          <Box>flush band</Box>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="md">
          <p className={s.specTitle}>as=&quot;div&quot; — the element is a prop</p>
          <p className={s.specNote}>
            Defaults to a semantic &lt;section&gt;. Use div / header / footer where the semantics
            call for it.
          </p>
          <Box>rendered as a div</Box>
        </Layout>
      </Section>
    </>
  );
}
