import { Cluster, Layout, Logo, Section } from '@/components';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Logo specimen — three heights, two bar treatments, four grounds.
 *
 * The claim this page has to actually show: the letterforms take `currentColor` and the bar takes
 * --logo-bar, so one piece of markup is correct on every surface. The blue band is the one that
 * matters — blue cannot accent itself, so the bar goes to Peridot there, and `mono` is the
 * alternative for when the mark should read as a single silhouette instead.
 */

const SIZES = [
  { size: 'sm', px: 20, where: 'a dense bar, a utility row' },
  { size: 'md', px: 24, where: 'the header bar — the default' },
  { size: 'lg', px: 40, where: "the footer's brand block" },
] as const;

const SURFACES = ['paper', 'tint', 'ink', 'blue'] as const;

export default function LogoSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h1>Logo</h1>
            <p>
              The Tcules wordmark, and specifically <strong>not</strong> an Icon. Both are
              filled, so the difference is not the paint: an icon is drawn on the
              system&rsquo;s own 24-unit box and takes <code>currentColor</code> entirely, while
              this is a logotype at its own aspect ratio with one element — the bar above the
              &ldquo;u&rdquo; — painted from <code>--logo-bar</code> rather than inherited.
              Filing it as a glyph would have cost it both.
            </p>
            <p>
              Inline SVG rather than an <code>&lt;img&gt;</code> for one reason: the letterforms
              take <code>currentColor</code> and the bar reads <code>--logo-bar</code>, so the
              mark is correct on all four surfaces without four files. An SVG file cannot read a
              custom property from the page that embeds it.
            </p>
          </Layout>

          <Specimen
            title="Three heights"
            note="Sized by height with width: auto, so the mark keeps its own proportions and a size change is one number. Literals rather than gap-scale steps: a logotype's height is set so its x-height reads level with the chrome beside it, which is an optical measurement, not a distance between two things."
          >
            <Layout rowGap="gutter">
              {SIZES.map(({ size, px, where }) => (
                <Cluster key={size} colGap="text" rowGap="tight" align="center">
                  <span className={s.ruler}>
                    {size} · {px}
                  </span>
                  <Logo size={size} />
                  <span className={s.specNote}>{where}</span>
                </Cluster>
              ))}
            </Layout>
          </Specimen>

          <Specimen
            title="The accessible name, or none"
            note='The mark carries its own name by default. Pass title="" for the common case where a wrapping link already names it — otherwise a screen reader announces "Tcules, Tcules, link".'
          >
            <Cluster colGap="block" rowGap="text">
              <Cluster colGap="tight">
                <Logo />
                <span className={s.specNote}>
                  Named — role=&quot;img&quot;, &lt;title&gt;Tcules
                </span>
              </Cluster>
              <Cluster colGap="tight">
                <Logo title="" />
                <span className={s.specNote}>Decorative — aria-hidden</span>
              </Cluster>
            </Cluster>
          </Specimen>
        </Layout>
      </Section>

      {/* The whole point of the layer, band by band. Ink lifts the bar to brandeis-300 because 500
          reaches only 2.77:1 there; blue sends it to Peridot, because blue cannot accent itself. */}
      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface} density="tight">
          <Layout rowGap="block">
            <Layout rowGap="tight">
              <p className={s.specTitle}>surface=&quot;{surface}&quot;</p>
              <p className={s.specNote}>
                Same markup, no colour prop. Letterforms take the band&rsquo;s ink; the bar
                takes --logo-bar, remapped for this ground.
              </p>
            </Layout>
            <Cluster colGap="block" rowGap="block" align="center">
              <Cluster colGap="tight" rowGap="tight">
                <Logo size="lg" title="" />
                <span className={s.specNote}>accent</span>
              </Cluster>
              <Cluster colGap="tight" rowGap="tight">
                <Logo size="lg" variant="mono" title="" />
                <span className={s.specNote}>mono</span>
              </Cluster>
            </Cluster>
          </Layout>
        </Section>
      ))}
    </>
  );
}
