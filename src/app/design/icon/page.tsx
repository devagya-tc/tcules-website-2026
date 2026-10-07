import { Button, Cluster, hasCounter, Icon, iconNames, Layout, Section } from '@/components';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Icon specimen — the set, the four sizes, and the two things that make an icon correct without
 * being configured: `currentColor` and the 24-unit box.
 *
 * The set is Solar Icons, Bold (DBF ch04), every path Solar's own, under ch04's names. It is SOLID:
 * filled shapes, no stroke, counters cut out of the mass with fill-rule evenodd. That last part is
 * what this page has to show, because a counter drawn as a shape in the ground colour would look
 * identical here on paper and break on the other three bands — so check the cross in close-circle,
 * the tick in check-circle, the bars in hamburger-menu and the marks in info-circle and
 * danger-triangle on the ink and blue sections at the bottom.
 *
 * A glyph with a counter is never set below 16 (glyphs.ts, `hasCounter`), so the `sm` rows below
 * carry only the glyphs that have none. The matrix is rendered from `iconNames`, so this page
 * cannot fall behind glyphs.ts.
 */

/* ch04's fixed choices that the set carries today, with the meaning each one is reserved for.
   A glyph used for any other meaning is the "four arrows" failure this list exists to stop. */
const MEANINGS = [
  { name: 'arrow-right', meaning: 'Go, next, continue — trailing' },
  { name: 'arrow-left', meaning: 'Back — leading' },
  { name: 'alt-arrow-down', meaning: 'Opens, expands — turns over, or swaps to alt-arrow-up' },
  { name: 'alt-arrow-right', meaning: 'Leads to a page' },
  {
    name: 'square-arrow-right-up',
    meaning: 'Leaves the site — the standalone mark',
  },
  {
    name: 'arrow-right-up',
    meaning: 'Leaves the site — trailing, beside arrow-right (ListCard’s external row, 2.17)',
  },
  { name: 'close-circle', meaning: 'Close, dismiss' },
  { name: 'check-circle', meaning: 'Done, included' },
  { name: 'download', meaning: 'Download a file — leading' },
  { name: 'copy', meaning: 'Copy to clipboard — leading' },
  { name: 'hamburger-menu', meaning: 'Menu — content only; the nav uses chrome-menu' },
  {
    name: 'chrome-menu',
    meaning: 'CHROME · the site nav’s menu toggle — the universal three bars',
  },
  { name: 'chrome-close', meaning: 'CHROME · the site nav’s close — the universal cross' },
  { name: 'info-circle', meaning: 'Information — leading, beside the words of a notice' },
  { name: 'danger-triangle', meaning: 'Warning — leading, beside the words of a notice' },
] as const;

/* The ch04 renames made in tracker 2.17: each pre-ch04 name retired for ch04's glyph of the same
   meaning. Kept on the page so a reader carrying the old name finds where it went. */
const RENAMED = [
  { was: 'chevron-down', now: 'alt-arrow-down' },
  { was: 'chevron-right', now: 'alt-arrow-right' },
  { was: 'close', now: 'close-circle' },
  { was: 'menu', now: 'hamburger-menu' },
  { was: 'check', now: 'check-circle' },
] as const;

const SIZES = [
  { size: 'sm', px: 14, where: 'inside a 32px control' },
  { size: 'md', px: 16, where: 'inside a 40px control — the default' },
  { size: 'lg', px: 18, where: 'inside a 48px control' },
  { size: 'xl', px: 24, where: 'the glyph at native size, standing on its own' },
] as const;

const SURFACES = ['paper', 'tint', 'ink', 'blue'] as const;

/** Every glyph a size role may carry: all of them, except that `sm` (14) is below the counter floor. */
function glyphsAt(size: (typeof SIZES)[number]['size']) {
  return size === 'sm' ? iconNames.filter((name) => !hasCounter(name)) : iconNames;
}

const COUNTERED = iconNames.filter(hasCounter);

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
              A counter — the cross inside <code>close-circle</code>, the bars inside{' '}
              <code>hamburger-menu</code> — is a <strong>hole</strong>, not a shape painted in
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
              The set is Solar Icons, Bold, by 480 Design, used under{' '}
              <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. Every path
              is Solar&rsquo;s own, unmodified, and every name is ch04&rsquo;s fixed choice for
              its meaning.
            </p>
          </Layout>

          <Specimen
            title="The set"
            note="Solar Bold (ch04) — filled shapes, no stroke, and roughly 2 units of clearance inside the box. That clearance is load-bearing: it is the reason a button gives its icon 8px to the box edge where it gives its label 12. Every glyph is Solar's own path under its ch04 name; close-circle, info-circle and alt-arrow-up come from Iconify's Solar Bold because ch04's cells for the first two carry check-circle by mistake and the third is not in ch04's starter set."
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
            note="ch04's fixed choices, one glyph per meaning, for every glyph the set carries. Each is reserved for its meaning; a second glyph for the same meaning, or this glyph for another, is what makes a reader stop trusting both. Leaves-the-site trails its label like arrow-right, because it is movement; the two status marks lead, because they name what kind of line follows."
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
                  tone="primary"
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
            note="Named ordinals mapped onto the value-named ramp in primitives, because a component picks a size by role. The three small steps pair with the button's three heights; xl is the glyph standing on its own rather than inside a control. All four are steps of ch04's seven (14 / 16 / 18 / 24 / 32 / 48 / 64). Every glyph at every role it may take: the sm row omits the glyphs with a counter, which never go below 16."
          >
            <Layout rowGap="text">
              {SIZES.map(({ size, px, where }) => (
                <Layout key={size} rowGap="tight">
                  <Cluster colGap="text" align="center">
                    <span className={s.ruler}>
                      {size} · {px}
                    </span>
                    <span className={s.specNote}>{where}</span>
                  </Cluster>
                  <Cluster colGap="text" rowGap="text" align="center">
                    {glyphsAt(size).map((name) => (
                      <Icon key={name} name={name} size={size} />
                    ))}
                  </Cluster>
                </Layout>
              ))}
            </Layout>
          </Specimen>

          <Specimen
            title="The 16px floor for a glyph with a counter"
            note="A counter is a hole about 1.5 units wide; at 14px that is under a device pixel and the glyph fills in. So these never go below md — Icon warns in development when one is asked for at sm, and a control that sizes its own glyph owes the same rule: no counter glyph in an sm Button, and Tag sets its glyph at 16. The list is derived from the path data (more than one subpath), not kept by hand."
          >
            <Layout rowGap="text">
              <Cluster colGap="text" rowGap="text" align="center">
                <span className={s.ruler}>floor · 16</span>
                {COUNTERED.map((name) => (
                  <Cluster key={name} colGap="tight" align="center">
                    <Icon name={name} size="md" />
                    <span className={s.specNote}>{name}</span>
                  </Cluster>
                ))}
              </Cluster>
            </Layout>
          </Specimen>

          <Specimen
            title="Stroked versus solid is gone"
            note="The set used to be two provenances: three Solar paths and the rest hand-drawn to Solar's conventions, with a stroked idiom before that. ch04: a stroked glyph beside a solid one reads as a different weight of type. Every glyph is now one drawing style, Solar Bold, so any pair holds the same weight side by side. The row mixes the glyphs that were redrawn in 2.17 with the three that were already Solar's."
          >
            <Layout rowGap="text">
              <Cluster colGap="block" rowGap="text" align="center">
                {(
                  [
                    'arrow-right',
                    'check-circle',
                    'close-circle',
                    'hamburger-menu',
                    'alt-arrow-down',
                    'square-arrow-right-up',
                    'info-circle',
                    'danger-triangle',
                  ] as const
                ).map((name) => (
                  <Cluster key={name} colGap="tight" align="center">
                    <Icon name={name} size="xl" />
                    <span className={s.specNote}>Bold</span>
                  </Cluster>
                ))}
              </Cluster>
              <Layout rowGap="tight">
                {RENAMED.map(({ was, now }) => (
                  <Cluster key={was} colGap="text" align="center">
                    <span className={s.specNote}>
                      <del>{was}</del>
                    </span>
                    <Icon name={now} size="lg" />
                    <span className={s.specTitle}>{now}</span>
                  </Cluster>
                ))}
              </Layout>
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
                tone="primary"
                icon={<Icon name="arrow-right" />}
              >
                sm · 14
              </Button>
              <Button
                size="md"
                emphasis="ghost"
                tone="primary"
                icon={<Icon name="arrow-right" />}
              >
                md · 16
              </Button>
              <Button
                size="lg"
                emphasis="ghost"
                tone="primary"
                icon={<Icon name="arrow-right" />}
              >
                lg · 18
              </Button>
              <Button
                size="sm"
                emphasis="ghost"
                tone="primary"
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
                <Icon name="check-circle" />
                <span className={s.specNote}>Hidden — the text beside it is the name</span>
              </Cluster>
              <Cluster colGap="tight">
                <Icon name="check-circle" label="Complete" size="lg" />
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
            <Layout rowGap="text">
              {SIZES.map(({ size, px }) => (
                <Cluster key={size} colGap="text" rowGap="text" align="center">
                  <span className={s.ruler}>
                    {size} · {px}
                  </span>
                  {glyphsAt(size).map((name) => (
                    <Icon key={name} name={name} size={size} />
                  ))}
                </Cluster>
              ))}
            </Layout>
            <Cluster colGap="block" rowGap="text" align="center">
              <Button emphasis="ghost" tone="primary" icon={<Icon name="arrow-right" />}>
                See the work
              </Button>
              <Button emphasis="ghost" tone="primary" iconLeft={<Icon name="download" />}>
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
                tone="primary"
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
