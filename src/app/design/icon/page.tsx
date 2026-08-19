import { Button, Cluster, Icon, iconNames, Layout, Section } from '@/components';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Icon specimen — the set, the four sizes, and the two things that make an icon correct without
 * being configured: `currentColor` and the 24-unit box.
 *
 * The set is SOLID: filled shapes, no stroke, counters cut out of the mass with fill-rule evenodd.
 * That last part is what this page has to show, because a counter drawn as a shape in the ground
 * colour would look identical here on paper and break on the other three bands — so check the
 * cross in close-circle, the lines in document-text and the prompt in software-development on the
 * ink and blue sections at the bottom.
 *
 * The set is deliberately small and grows only when a component names a glyph it cannot do without.
 * Three groups: the ACTIONS the button specification names, the DISCLOSURE marks a nav needs to say
 * it opens and shuts something, and six SUBJECT marks — one per service — which are the only glyphs
 * here standing for a thing rather than an act. An icon set that grows by accident is how a system
 * ends up with four arrows.
 *
 * The set below is rendered from `iconNames`, so this page cannot fall behind glyphs.ts.
 */

const SIZES = [
  { size: 'sm', px: 14, where: 'inside a 32px control' },
  { size: 'md', px: 16, where: 'inside a 40px control — the default' },
  { size: 'lg', px: 18, where: 'inside a 48px control' },
  { size: 'xl', px: 24, where: 'the glyph at native size, standing on its own' },
] as const;

const SURFACES = ['paper', 'tint', 'ink', 'blue'] as const;

export default function IconSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h1>Icon</h1>
            <p>
              A solid glyph on a 24-unit box, filled with <code>currentColor</code>. It has no
              colour of its own and takes no colour prop — it inherits the ink of the surface or
              the foreground of the control it sits in, which is why{' '}
              <code>tokens/components/icon.css</code> is the one component layer in the system with
              no surface blocks at all. There is nothing per-surface to declare.
            </p>
            <p>
              A counter — the cross inside <code>close-circle</code>, the lines inside{' '}
              <code>document-text</code> — is a <strong>hole</strong>, not a shape painted in the
              ground colour. It is a subpath enclosed by the mass in the same <code>d</code>, and{' '}
              <code>fill-rule: evenodd</code> is what turns it into a hole. A painted counter would
              be correct on exactly one surface; a hole shows whatever is behind it, so it is right
              on all four.
            </p>
            <p>
              There is no stroke token at any layer, and the absence is deliberate. A solid glyph
              carries its weight in the geometry, which is what lets it scale down to 14px without
              looking heavier than the label beside it — a fixed stroke width would not.
            </p>
          </Layout>

          <Specimen
            title="The set"
            note="Drawn to Solar's BOLD conventions — filled shapes, no stroke, and roughly 2px of clearance inside the box. That clearance is load-bearing: it is the reason a button gives its icon 8px to the box edge where it gives its label 12. Drawn rather than imported, and that is a licence decision: Solar ships under CC BY 4.0, so using its actual paths would put an attribution obligation on the site. Conventions are not the artwork. The six service marks answer one test: each has to be a distinct silhouette at 16px, because two marks that read alike at row size are worse than none."
          >
            <Layout columns="fit" minTrack="xs" colGap="gutter" rowGap="gutter">
              {iconNames.map((name) => (
                <Cluster key={name} colGap="tight" align="center">
                  <Icon name={name} size="xl" />
                  <span className={s.specTitle}>{name}</span>
                </Cluster>
              ))}
            </Layout>
          </Specimen>

          <Specimen
            title="The four size roles"
            note="Named ordinals mapped onto the value-named ramp in primitives, because a component picks a size by role. The three small steps pair with the button's three heights; xl is the glyph standing on its own rather than inside a control."
          >
            <Layout rowGap="text">
              {SIZES.map(({ size, px, where }) => (
                <Cluster key={size} colGap="text" align="center">
                  <span className={s.ruler}>
                    {size} · {px}
                  </span>
                  <Icon name="arrow-right" size={size} />
                  <Icon name="download" size={size} />
                  <Icon name="copy" size={size} />
                  <Icon name="close-circle" size={size} />
                  <Icon name="document-text" size={size} />
                  <Icon name="check" size={size} />
                  <span className={s.specNote}>{where}</span>
                </Cluster>
              ))}
            </Layout>
          </Specimen>

          <Specimen
            title="Inside a control, the control decides"
            note="Button sizes the svg it contains from its own --btn-icon-size-*, with a selector deliberately more specific than Icon's size class. So the glyph steps with the button and a size passed to an Icon inside one is ignored — the spec's rule is that the icon steps with the BUTTON, which makes the button the component that gets to decide."
          >
            <Cluster colGap="text" rowGap="text">
              <Button size="sm" emphasis="ghost" tone="neutral" icon={<Icon name="arrow-right" />}>
                sm · 14
              </Button>
              <Button size="md" emphasis="ghost" tone="neutral" icon={<Icon name="arrow-right" />}>
                md · 16
              </Button>
              <Button size="lg" emphasis="ghost" tone="neutral" icon={<Icon name="arrow-right" />}>
                lg · 18
              </Button>
              <Button
                size="sm"
                emphasis="ghost"
                tone="neutral"
                icon={<Icon name="arrow-right" size="xl" />}
              >
                sm, icon asked for xl
              </Button>
            </Cluster>
          </Specimen>

          <Specimen
            title="Accessible name, or hidden"
            note="An icon beside a label is decoration and is aria-hidden, so a screen reader does not announce the same thing twice. An icon that carries meaning on its own takes a label, which gives it role='img' and a <title>. That default is why an icon-only Button has to supply its own aria-label rather than relying on the glyph."
          >
            <Cluster colGap="block" rowGap="text">
              <Cluster colGap="tight">
                <Icon name="check" />
                <span className={s.specNote}>Hidden — the text beside it is the name</span>
              </Cluster>
              <Cluster colGap="tight">
                <Icon name="check" label="Complete" size="lg" />
                <span className={s.specNote}>Labelled &ldquo;Complete&rdquo; — no text beside it</span>
              </Cluster>
            </Cluster>
          </Specimen>
        </Layout>
      </Section>

      {/* currentColor on all four grounds — the claim the token layer makes by having no surface
          blocks, so it is the claim this page has to actually show. */}
      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface} density="tight">
          <Layout rowGap="block">
            <Layout rowGap="tight">
              <p className={s.specTitle}>surface=&quot;{surface}&quot;</p>
              <p className={s.specNote}>
                Same markup, no colour prop. The glyphs take this band&rsquo;s ink; the ones inside
                buttons take the button&rsquo;s foreground instead.
              </p>
            </Layout>
            <Cluster colGap="block" rowGap="text" align="center">
              {iconNames.map((name) => (
                <Icon key={name} name={name} size="lg" />
              ))}
              <Button icon={<Icon name="arrow-right" />}>Start a project</Button>
              <Button emphasis="ghost" tone="neutral" iconLeft={<Icon name="download" />}>
                Download
              </Button>
              <Button
                emphasis="ghost"
                tone="neutral"
                iconOnly
                icon={<Icon name="copy" />}
                aria-label="Copy"
              />
            </Cluster>
          </Layout>
        </Section>
      ))}
    </>
  );
}
