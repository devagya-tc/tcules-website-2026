import { Button, Cluster, Icon, iconNames, Layout, Section } from '@/components';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Icon specimen — the set, the four sizes, and the two things that make an icon correct without
 * being configured: `currentColor` and the 24-unit box.
 *
 * The set is deliberately small. It is exactly the glyphs the button specification names, plus the
 * two counterparts a set of navigation controls needs. An icon set that grows by accident is how a
 * system ends up with four arrows.
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
              A line glyph on a 24-unit box, stroked in <code>currentColor</code>. It has no colour
              of its own and takes no colour prop — it inherits the ink of the surface or the
              foreground of the control it sits in, which is why{' '}
              <code>tokens/components/icon.css</code> is the one component layer in the system with
              no surface blocks at all. There is nothing per-surface to declare.
            </p>
            <p>
              Stroke weight is 1.5 in the box&rsquo;s own units, not 1.5 device pixels. Scaled into
              a 16px control the glyph renders at a true 1px, which is what keeps a small icon from
              looking heavier than the label beside it.
            </p>
          </Layout>

          <Specimen
            title="The set"
            note="Drawn to Solar's linear conventions — strokes only, 1.5 weight, round caps and joins, and roughly 2px of clearance inside the box. That clearance is load-bearing: it is the reason a button gives its icon 8px to the box edge where it gives its label 12."
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
