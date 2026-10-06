import { Layout, Section, type SectionSurface } from '@/components';
import { Contrast, ContentSection, CtaRow, type ContrastList } from '@/patterns';
import { ROUTES } from '@/lib/routes';

import { Specimen } from '../_specimen/Specimen';

/**
 * Contrast — the N band's body, built to docs/specs/Contrast.md. Every arrangement: four and four,
 * unequal sides, one-line and two-line items, the h4 heading map, a CtaRow under it, and the four
 * surfaces. The kit family page shows it as a page places it: /design/kit/readdown.
 */

const YES: ContrastList = {
  heading: 'Right for you if',
  items: [
    'You have a product in use, and a decision about it you cannot settle',
    'Someone on your side can make consequential calls',
    'Your engineers want to be in the room, not handed a file',
    'You would rather see it working than read a strategy deck',
  ],
};

const NO: ContrastList = {
  heading: 'Not the right fit when',
  items: [
    'The brief is visual styling only, with product behaviour out of bounds',
    'The work needs a regulated specialist opinion we do not provide',
    'Nothing realistic about the product or its users can be shared',
    'What you need most is low-cost production capacity',
  ],
};

const SHORT_NO: ContrastList = {
  heading: 'Not needed',
  items: ['A finished brief', 'A design team of your own'],
};

const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink', 'blue'];

export default function ContrastSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Contrast</h1>
          <p>
            Two lists that mean opposite things, in peer halves at the column step: the approved
            Fit, promoted unchanged in look. The glyph carries the polarity — check-circle blue,
            close-circle quiet ink, both at xl — and the heading says it in words, so neither
            colour nor glyph is the only signal. Four items a side at most.
          </p>
        </Layout>
      </Section>

      <ContentSection
        eyebrow="1 · In a band"
        heading="Who this work is for"
        headingId="cntr-band"
      >
        <Contrast yes={YES} no={NO} />
      </ContentSection>

      <ContentSection
        eyebrow="2 · With a CtaRow"
        heading="What we need from you"
        headingId="cntr-cta"
        footer={
          <CtaRow
            rule={false}
            note="Not sure which side you are on? A thirty-minute call usually settles it."
            actions={[{ label: 'Book a call', href: ROUTES.contact }]}
          />
        }
      >
        <Contrast
          yes={{ ...YES, items: YES.items.slice(0, 3) }}
          no={{ ...NO, items: NO.items.slice(0, 3) }}
        />
      </ContentSection>

      <Section>
        <Layout rowGap="stack">
          <Specimen
            title="3 · Unequal sides · headingAs h4"
            note="Four against two. The halves are top-aligned, so the headings share a line and the shorter list simply ends; nothing stretches to match."
          >
            <Contrast yes={YES} no={SHORT_NO} headingAs="h4" />
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Specimen
            title="4 · Stress — five items and a blank one"
            note="A fifth item warns in development (the designed maximum is four) and still renders; a blank item is omitted with a warning, never an empty row."
          >
            <Contrast
              yes={{
                ...YES,
                items: [...YES.items, 'You want the record kept where your team already looks'],
              }}
              no={{ ...NO, items: [...NO.items.slice(0, 3), '   '] }}
            />
          </Specimen>
        </Layout>
      </Section>

      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface}>
          <Specimen
            title={`5 · Surface: ${surface}`}
            note={
              surface === 'paper'
                ? 'The check brandeis-500, the cross neutral-600, a neutral-400 opening rule and neutral-200 seams.'
                : surface === 'tint'
                  ? 'Surface proof — on pages, tint is the proof band only (§ 1.7). The cross steps to neutral-700, the rules to 500 and 300.'
                  : surface === 'ink'
                    ? 'The check lifts to brandeis-300 (500 is 2.77:1 here); the cross to neutral-400.'
                    : 'Declared for self-containment; no page has a blue band. The check is white, the cross brandeis-100.'
            }
          >
            <Contrast
              yes={{ ...YES, items: YES.items.slice(0, 2) }}
              no={{ ...NO, items: NO.items.slice(0, 2) }}
            />
          </Specimen>
        </Section>
      ))}
    </>
  );
}
