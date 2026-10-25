import type { Metadata } from 'next';

import { Layout, Section } from '@/components';
import { ENDPOINTS } from '@/lib/routes';
import { NewsletterField, type NewsletterFieldProps } from '@/patterns';

import { Specimen } from '../_specimen/Specimen';

export const metadata: Metadata = {
  title: 'NewsletterField | Design',
  robots: { index: false, follow: false },
};

const FIELD: NewsletterFieldProps = {
  action: ENDPOINTS.newsletter,
  fieldLabel: 'Email address',
  placeholder: 'you@company.com',
  submitLabel: 'Subscribe',
};

/**
 * NewsletterField — the newsletter's sign-up as one field, its arrow inside the address's box
 * (25 Oct 2026). Every arrangement: at a tile's width on each surface, and as wide as it is given.
 */
export default function NewsletterFieldSpecimen() {
  const surfaces = ['paper', 'tint', 'ink', 'blue'] as const;
  return (
    <>
      {surfaces.map((surface) => (
        <Section key={surface} surface={surface} aria-label={`On ${surface}`}>
          <Specimen
            title={`on ${surface} — at a tile's width`}
            note="The arrow sits inside the field's box, which rings when the address has focus. A plain POST, no script."
          >
            <Layout columns={{ md: 3 }} colGap="gutter">
              <NewsletterField {...FIELD} />
            </Layout>
          </Specimen>
        </Section>
      ))}
      <Section aria-label="Full column">
        <Specimen title="the full column — as wide as it is given">
          <NewsletterField {...FIELD} />
        </Specimen>
      </Section>
    </>
  );
}
