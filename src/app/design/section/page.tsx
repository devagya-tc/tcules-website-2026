import { Layout, Section, type SectionDensity, type SectionSurface } from '@/components';

import { Box, Specimen, specimenStyles as s } from '../_specimen/Specimen';

const SURFACE_NOTES = {
  paper: 'The default and the origin — every other surface is a delta from it.',
  tint: 'Alternating rows, quote blocks, table headers. The rules step one deeper against the deeper ground — and so do the two muted inks, because neutral-600 on paper-deep is 4.39:1 and fails AA.',
  ink: 'The footer and the closing panel. Blue holds at 500 as a field, and lifts to 200 as text, because blue ink on neutral-950 reaches only 2.7:1.',
  blue: 'A pivot — one appearance per page, and it never touches an ink section. Blue cannot accent itself, so the accent goes to paper.',
} as const;

type SeamBand = {
  label: string;
  note: string;
  surface: SectionSurface;
  density?: SectionDensity;
  flush?: boolean;
};

/**
 * The seam sequence (29 Sep 2026, tracker 2.17). Order matters — every note describes the seam
 * between this band and the one before it, so the list is the proof and cannot be sorted.
 */
const SEAMS: readonly SeamBand[] = [
  {
    label: 'Seam · after a flush band — full air',
    note: 'The band above is flush: it has no bottom padding to serve as the seam, and it is flush because it hands the air to the next band (Breadcrumbs does exactly this). So this band keeps its top 96.',
    surface: 'paper',
  },
  {
    label: 'Seam · paper + paper — one seam, 96',
    note: 'Follows a paper band, so its top padding drops and the seam is the preceding band’s bottom 96 — not 96 + 96 = 192 of identical ground.',
    surface: 'paper',
  },
  {
    label: 'Seam · paper → tint — full air, 96 + 96',
    note: 'The surface changes, so the tone marks the boundary and both bands keep their full air. Different grounds are never merged.',
    surface: 'tint',
  },
  {
    label: 'Seam · tint + tint — one seam, 96',
    note: 'The same rule on every surface: a tint band after a tint band drops its top.',
    surface: 'tint',
  },
  {
    label: 'Seam · standard → tight — 96, the preceding band governs',
    note: 'This band is tight, but the seam above it is the preceding band’s bottom, 96. Its own tightness shows below it.',
    surface: 'tint',
    density: 'tight',
  },
  {
    label: 'Seam · tight → open — 64',
    note: 'The preceding band is tight, so the seam is its 64. This open band’s 128 governs its own bottom.',
    surface: 'tint',
    density: 'open',
  },
  {
    label: 'Seam · open → standard — 128',
    note: 'The open band above sets the seam at 128.',
    surface: 'tint',
  },
  {
    label: 'Seam · tint → ink — full air again',
    note: 'The surface changes back; both sides keep their air.',
    surface: 'ink',
  },
];

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
            note="One value at every width, and a gap-scale step: --gap-section. The token layer declares tight (64, --gap-column) and open (128, --gap-section-open) beside it, reachable via the density prop, and flush zeroes it. There is no arbitrary value: a band is one of those four. Two adjacent bands on the same surface share ONE seam — the following band drops its top padding; see the seam sequence below."
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
            doing that work. This band follows the paper band above and precedes another, so both
            of its seams are ONE band&apos;s air, not two: a band that follows a band of its own
            surface drops its top padding.
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

      {/* ── The seam between bands ─────────────────────────────────────────────────────────────
          Each band states its own surface and density, and its note says what the seam ABOVE it
          measures. Read the sequence top to bottom: the dashed outlines are the band edges. */}
      {SEAMS.map((band) => (
        <Section
          key={band.label}
          surface={band.surface}
          density={band.density}
          flush={band.flush}
          className={s.bandOutline}
        >
          <Layout rowGap="text">
            <p className={s.specTitle}>{band.label}</p>
            <p className={s.specNote}>{band.note}</p>
            <Box>
              surface=&quot;{band.surface}&quot;
              {band.density ? ` · density="${band.density}"` : ''}
              {band.flush ? ' · flush' : ''}
            </Box>
          </Layout>
        </Section>
      ))}

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
