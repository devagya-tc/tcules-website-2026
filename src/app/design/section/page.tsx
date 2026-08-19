import { Layout, Section } from '@/components';

import { Box, Specimen, specimenStyles as s } from '../_specimen/Specimen';

const SURFACE_NOTES = {
  paper: 'The default and the origin — every other surface is a delta from it.',
  tint: 'Alternating rows, quote blocks, table headers. The rules step one deeper against the deeper ground — and so do the two muted inks, because neutral-600 on paper-deep is 4.39:1 and fails AA.',
  ink: 'The footer and the closing panel. Blue holds at 500 as a field, and lifts to 200 as text, because blue ink on neutral-950 reaches only 2.7:1.',
  blue: 'A pivot — one appearance per page, and it never touches an ink section. Blue cannot accent itself, so the accent goes to paper.',
} as const;

/**
 * Section specimen. The dashed outline on the bands below is measuring chrome — it marks where
 * the band's content column starts and ends, which is otherwise invisible without colour.
 */
export default function SectionSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h1>Section</h1>
            <p>
              The full-width band. Insets its content to the one shared content column, applies
              the system-owned vertical rhythm, and provides the positioning context for
              full-bleed layers.
            </p>
            <p>
              One declaration does three jobs:{' '}
              <code>padding-inline: max(--sec-gutter, (100% - --sec-container) / 2)</code>. Below
              the cap the gutter wins; past it the centring term does. Both values, and the
              vertical air, come from the --sec-* token layer — this component states no distance
              of its own.
            </p>
          </Layout>

          <Specimen
            title="Vertical air — --sec-padding-y, 96 flat"
            note="One value at every width, and a gap-scale step: --gap-section. The token layer declares tight (64, --gap-column) and open (128, --gap-section-open) beside it, reachable via the density prop, and flush zeroes it. There is no arbitrary value: a band is one of those four."
          >
            <div className={s.ruler}>content sits inside the vertical air</div>
          </Specimen>

          <Specimen
            title="Gutter — --sec-gutter, 32 flat · container — --sec-container, 1240"
            note="Narrow the window and the content edge holds a 32px gutter at every width. Widen past 1240 and the content stops growing and centres instead."
          >
            <div className={s.ruler}>content column — capped at 1240px</div>
          </Specimen>
        </Layout>
      </Section>

      <Section className={s.bandOutline}>
        <Layout rowGap="text">
          <p className={s.specTitle}>Two stacked Sections — the band boundary</p>
          <p className={s.specNote}>
            The dashed outline is chrome, not a border the primitive draws. Bands are separated by
            ground and whitespace, never by a rule — the surface specimens below show the tone
            doing that work. This one and the next are adjacent, so the space between them is both
            bands&apos; vertical air.
          </p>
          <Box>band A</Box>
        </Layout>
      </Section>

      <Section className={s.bandOutline}>
        <Layout rowGap="text">
          <p className={s.specTitle}>The second band</p>
          <Box>band B</Box>
        </Layout>
      </Section>

      <Section flush className={s.bandOutline}>
        <Layout rowGap="text">
          <p className={s.specTitle}>flush — vertical rhythm zeroed</p>
          <p className={s.specNote}>
            For a composition that supplies its own vertical space; a full-bleed immersive hero is
            the case that needs it. Overrides density. The gutter and the content cap are
            unaffected.
          </p>
          <Box>flush band</Box>
        </Layout>
      </Section>

      {(['paper', 'tint', 'ink', 'blue'] as const).map((surface) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="block">
            <Layout rowGap="tight">
              <p className={s.specTitle}>surface=&quot;{surface}&quot;</p>
              <p className={s.specNote}>
                {SURFACE_NOTES[surface]} Every --sec-* role is remapped in the token layer, so the
                heading, the muted note, the hairlines and the accent below all adapt without this
                page saying anything about colour.
              </p>
            </Layout>
            <h3>A heading on {surface}</h3>
            <Layout columns={3} colGap="block" rowGap="block">
              <Box>ink-muted on this ground</Box>
              <Box accent>accent</Box>
              <Box>hairline</Box>
            </Layout>
          </Layout>
        </Section>
      ))}

      <Section density="tight" className={s.bandOutline}>
        <Layout rowGap="text">
          <p className={s.specTitle}>density=&quot;tight&quot; — 64 against the standard 96</p>
          <Box>tight band</Box>
        </Layout>
      </Section>

      <Section density="open" className={s.bandOutline}>
        <Layout rowGap="text">
          <p className={s.specTitle}>density=&quot;open&quot; — 128</p>
          <Box>open band</Box>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="text">
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
