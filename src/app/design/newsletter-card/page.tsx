import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Layout, Section } from '@/components';
import { ENDPOINTS } from '@/lib/routes';
import { NewsletterCard, type NewsletterCardProps } from '@/patterns';

import { Specimen } from '../_specimen/Specimen';

export const metadata: Metadata = {
  title: 'NewsletterCard | Design',
  robots: { index: false, follow: false },
};

const CARD: NewsletterCardProps = {
  title: 'Beyond Interfaces',
  description: 'A deep dive into the intersection of design, strategy, and product innovation.',
  action: ENDPOINTS.newsletter,
  fieldLabel: 'Email address',
  placeholder: 'you@company.com',
  submitLabel: 'Subscribe',
};

/** The rail's width: the card is set in a listing's rail, the first of five tracks from 1024. */
function Rail({ children }: { children: ReactNode }) {
  return (
    <Layout columns={{ base: 1, md: [1, 2], lg: [1, 4] }} colGap="column" rowGap="stack">
      {children}
    </Layout>
  );
}

/**
 * NewsletterCard — the newsletter's sign-up as a small panel in a listing's rail (25 Oct 2026).
 * Every arrangement: at the rail's width on each surface, a long name and line, and at a phone's
 * full column.
 */
export default function NewsletterCardSpecimen() {
  const surfaces = ['paper', 'tint', 'ink', 'blue'] as const;
  return (
    <>
      {surfaces.map((surface) => (
        <Section key={surface} surface={surface} aria-label={`On ${surface}`}>
          <Specimen
            title={`on ${surface} — at the rail's width`}
            note="The letter heads the card; the arrow sits inside the field's box, which rings when the address has focus. A plain POST, no script."
          >
            <Rail>
              <NewsletterCard {...CARD} />
            </Rail>
          </Specimen>
        </Section>
      ))}
      <Section aria-label="Stress">
        <Specimen
          title="stress — a long name and a long line"
          note="The name wraps; the line runs on in the quieter ink. The field keeps the card's whole width."
        >
          <Rail>
            <NewsletterCard
              {...CARD}
              title="Beyond Interfaces: the monthly letter on product design"
              description="A deep dive into the intersection of design, strategy, and product innovation, with the cases, the drawings and the decisions behind them, once a month."
            />
          </Rail>
        </Specimen>
      </Section>
      <Section aria-label="Full column">
        <Specimen title="the full column — as wide as it is given">
          <NewsletterCard {...CARD} />
        </Specimen>
      </Section>
    </>
  );
}
