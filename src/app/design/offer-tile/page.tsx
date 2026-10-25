import type { Metadata } from 'next';

import { Icon, Layout, Section } from '@/components';
import { getKitPhoto } from '@/lib/photos';
import { ENDPOINTS, ROUTES } from '@/lib/routes';
import { BlockCard, NewsletterField, OfferTile, type OfferTileProps } from '@/patterns';

import { Specimen } from '../_specimen/Specimen';

export const metadata: Metadata = {
  title: 'OfferTile | Design',
  robots: { index: false, follow: false },
};

const LAB: OfferTileProps = {
  eyebrow: 'Lab',
  title: 'Tcules Labs experiments',
  body: 'We’re crafting AI solutions to improve user experiences, streamline processes and enhance efficiency across sectors.',
  action: { label: 'Go to the Lab', href: ROUTES.futureInterfacesLab },
  glyph: <Icon name="stars" />,
};

const NEWSLETTER: OfferTileProps = {
  eyebrow: 'Newsletter',
  title: 'Beyond Interfaces',
  body: 'A deep dive into the intersection of design, strategy, and product innovation.',
  glyph: <Icon name="letter" />,
  form: (
    <NewsletterField
      action={ENDPOINTS.newsletter}
      fieldLabel="Email address"
      placeholder="you@company.com"
      submitLabel="Subscribe"
    />
  ),
};

const CARDS = [
  {
    title: 'Design systems for SaaS: what to build, in what order, and when to set dates',
    eyebrow: 'Design system',
    photo: 'studio-whiteboard-crit',
  },
  {
    title: 'Impact of cognitive biases in ecommerce and SaaS products',
    eyebrow: 'Information design',
    photo: 'pair-at-laptop-sticky-wall',
  },
] as const;

/**
 * OfferTile — one offer as a cell among a grid's cards (25 Oct 2026). Every arrangement: in a row of
 * three beside two cards with each foot (a link, a form), on its two grounds, bare, and at a phone's
 * full column, where it stands as tall as its own copy.
 */
export default function OfferTileSpecimen() {
  return (
    <>
      {[LAB, NEWSLETTER].map((offer) => (
        <Section key={offer.title} aria-label={`In a row · ${offer.eyebrow}`}>
          <Specimen
            title={`in a row of three — the last cell, as tall as the cards · ${offer.form ? 'a form at its foot' : 'a link at its foot'}`}
            note="An Island at the tile size: a block inset, the cards' 8 radius, the pixel field in its far corner. The row sets its height; the foot rides its floor."
          >
            <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="column">
              {CARDS.map((card) => (
                <BlockCard
                  key={card.title}
                  title={card.title}
                  eyebrow={card.eyebrow}
                  href={ROUTES.insights}
                  media={{ type: 'image', image: getKitPhoto(card.photo) }}
                  size="sm"
                  tracks={3}
                  cue="title"
                  compact
                />
              ))}
              <li>
                <OfferTile {...offer} />
              </li>
            </Layout>
          </Specimen>
        </Section>
      ))}
      <Section aria-label="Grounds">
        <Specimen title="its grounds — tint (default) and ink, a link or a form">
          <Layout columns={{ md: 3 }} colGap="gutter" rowGap="column">
            <OfferTile {...LAB} />
            <OfferTile {...LAB} surface="ink" />
            <OfferTile {...NEWSLETTER} surface="ink" />
          </Layout>
        </Specimen>
      </Section>
      <Section aria-label="Bare">
        <Specimen title="no glyph, eyebrow or line — the name and the way on">
          <Layout columns={{ md: 3 }} colGap="gutter" rowGap="column">
            <OfferTile
              title={LAB.title}
              action={{ label: 'Go to the Lab', href: ROUTES.futureInterfacesLab }}
            />
          </Layout>
        </Specimen>
      </Section>
      <Section aria-label="Full column">
        <Specimen title="the full column — as tall as its own copy">
          <OfferTile {...LAB} />
        </Specimen>
      </Section>
    </>
  );
}
