import { Button, Cluster, Icon, iconNames, Layout, Section } from '@/components';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Icon specimen — the set, the four sizes, and the two things that make an icon correct without
 * being configured: `currentColor` and the 24-unit box.
 *
 * The set is SOLID: filled shapes, no stroke, counters cut out of the mass with fill-rule evenodd.
 * That last part is what this page has to show, because a counter drawn as a shape in the ground
 * colour would look identical here on paper and break on the other three bands — so check the
 * cross in close-circle, the lines in document-text and the marks in info-circle and
 * danger-triangle on the ink and blue sections at the bottom.
 *
 * The brand set is Solar Icons, Bold (DBF ch04). Three glyphs here are Solar's own paths
 * (square-arrow-right-up, info-circle, danger-triangle); the rest were drawn to Solar's conventions
 * before ch04 existed and move onto their ch04 glyphs one meaning at a time — glyphs.ts records
 * which is which. The six service marks were retired by ruling O1: service lines get illustrations.
 *
 * The set below is rendered from `iconNames`, so this page cannot fall behind glyphs.ts.
 */

/* ch04's fixed choices that the set carries today, with the meaning each one is reserved for.
   A glyph used for any other meaning is the "four arrows" failure this list exists to stop. */
const MEANINGS = [
  {
    name: 'square-arrow-right-up',
    meaning: 'Leaves the site — trailing, on a link or row going off tcules.com',
  },
  { name: 'info-circle', meaning: 'Information — leading, beside the words of a notice' },
  { name: 'danger-triangle', meaning: 'Warning — leading, beside the words of a notice' },
] as const;

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
              <code>tokens/components/icon.css</code> is the one component layer in the system
              with no surface blocks at all. There is nothing per-surface to declare.
            </p>
            <p>
              A counter — the cross inside <code>close-circle</code>, the lines inside{' '}
              <code>document-text</code> — is a <strong>hole</strong>, not a shape painted in
              the ground colour. It is a subpath enclosed by the mass in the same <code>d</code>
              , and <code>fill-rule: evenodd</code> is what turns it into a hole. A painted
              counter would be correct on exactly one surface; a hole shows whatever is behind
              it, so it is right on all four.
            </p>
            <p>
              There is no stroke token at any layer, and the absence is deliberate. A solid
              glyph carries its weight in the geometry, which is what lets it scale down to 14px
              without looking heavier than the label beside it — a fixed stroke width would not.
            </p>
            <p>
              The brand set is Solar Icons, Bold, by 480 Design, used under{' '}
              <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.{' '}
              <code>square-arrow-right-up</code>, <code>info-circle</code> and{' '}
              <code>danger-triangle</code> are Solar&rsquo;s own paths, unmodified.
            </p>
          </Layout>

          <Specimen
            title="The set"
            note="Solar Bold (ch04) — filled shapes, no stroke, and roughly 2px of clearance inside the box. That clearance is load-bearing: it is the reason a button gives its icon 8px to the box edge where it gives its label 12. square-arrow-right-up, info-circle and danger-triangle are Solar's own paths (CC BY 4.0, by 480 Design); the others are drawn to the same conventions and still carry pre-ch04 names where ch04 fixes a different glyph (chevron-down for alt-arrow-down, menu for hamburger-menu, check for check-circle, close for close-circle). Check that the two provenances hold the same weight side by side."
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
            title="One meaning, one glyph"
            note="The ch04 fixed choices added for the site's needs now. Each is reserved for its meaning; a second glyph for the same meaning, or this glyph for another, is what makes a reader stop trusting both. Leaves-the-site trails its label like arrow-right, because it is movement; the two status marks lead, because they name what kind of line follows."
          >
            <Layout rowGap="text">
              {MEANINGS.map(({ name, meaning }) => (
                <Cluster key={name} colGap="text" align="center">
                  <Icon name={name} size="xl" />
                  <span className={s.specTitle}>{name}</span>
                  <span className={s.specNote}>{meaning}</span>
                </Cluster>
              ))}
              <Cluster colGap="text" rowGap="text" align="center">
                <Button
                  as="a"
                  href="https://example.com"
                  emphasis="link"
                  tone="neutral"
                  icon={<Icon name="square-arrow-right-up" />}
                >
                  Read the paper
                </Button>
                <Cluster colGap="tight" align="center">
                  <Icon name="info-circle" />
                  <span className={s.specNote}>Replies within two working days</span>
                </Cluster>
                <Cluster colGap="tight" align="center">
                  <Icon name="danger-triangle" />
                  <span className={s.specNote}>This form is closed for the holidays</span>
                </Cluster>
              </Cluster>
            </Layout>
          </Specimen>

          <Specimen
            title="The four size roles"
            note="Named ordinals mapped onto the value-named ramp in primitives, because a component picks a size by role. The three small steps pair with the button's three heights; xl is the glyph standing on its own rather than inside a control. All four are steps of ch04's seven (14 / 16 / 18 / 24 / 32 / 48 / 64). The top three are deck, social and print sizes — past 24 nothing on the web asks for an icon, and above 64 it is an illustration."
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
                  <Icon name="square-arrow-right-up" size={size} />
                  <Icon name="info-circle" size={size} />
                  <Icon name="danger-triangle" size={size} />
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
              <Button
                size="sm"
                emphasis="ghost"
                tone="neutral"
                icon={<Icon name="arrow-right" />}
              >
                sm · 14
              </Button>
              <Button
                size="md"
                emphasis="ghost"
                tone="neutral"
                icon={<Icon name="arrow-right" />}
              >
                md · 16
              </Button>
              <Button
                size="lg"
                emphasis="ghost"
                tone="neutral"
                icon={<Icon name="arrow-right" />}
              >
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
                <span className={s.specNote}>
                  Labelled &ldquo;Complete&rdquo; — no text beside it
                </span>
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
                Same markup, no colour prop. The glyphs take this band&rsquo;s ink; the ones
                inside buttons take the button&rsquo;s foreground instead.
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
              <Button
                as="a"
                href="https://example.com"
                emphasis="link"
                tone="neutral"
                icon={<Icon name="square-arrow-right-up" />}
              >
                Read the paper
              </Button>
              <Cluster colGap="tight" align="center">
                <Icon name="info-circle" />
                <span className={s.specNote}>Information, leading</span>
              </Cluster>
              <Cluster colGap="tight" align="center">
                <Icon name="danger-triangle" />
                <span className={s.specNote}>Warning, leading</span>
              </Cluster>
            </Cluster>
          </Layout>
        </Section>
      ))}
    </>
  );
}
