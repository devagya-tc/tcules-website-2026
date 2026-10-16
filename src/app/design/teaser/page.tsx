import type { Metadata } from 'next';

import { Layout, Section, type SectionSurface } from '@/components';
import { CARD_THREE_TRACKS } from '@/lib/image-sizes';
import { getKitPhoto } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';
import { Teaser, type TeaserMedia } from '@/patterns';

import { Specimen } from '../_specimen/Specimen';

export const metadata: Metadata = {
  title: 'Teaser | Design',
  robots: { index: false, follow: false },
};

const PHOTO: TeaserMedia = {
  type: 'image',
  image: getKitPhoto('whiteboard-two-hands', { alt: 'Two hands sketching on a whiteboard' }),
};
const PHOTO_2: TeaserMedia = {
  type: 'image',
  image: getKitPhoto('hand-sketch-wireframe', { alt: 'A wireframe sketched by hand' }),
};
const SCENE: TeaserMedia = { type: 'sketch', name: 'code-review' };

const LONG =
  'My Experiments with UX: Karthik Pasupathy on designing for context, clarity, and core functionality';
const UNBROKEN = 'Supercalifragilisticexpialidociousdesignsystemsgovernance';
const HREF = ROUTES.insights;

const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink', 'blue'];

/**
 * Teaser — one linked piece held without an edge. Three arrangements (stack, beside, row), four
 * title steps, the picture's three states (a cover, a drawn scene, none: typographic), the date
 * anchor, the play mark, the compact phone row and the meta line in parts, on all four surfaces.
 * Hover and focus are the stylesheet's: point at any item, and tab to it.
 */
export default function TeaserSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h1>Teaser</h1>
            <p>
              One linked piece, held by proximity and an anchor at its head — its own picture, a
              date, or a meta line. No box, no rule between items, no stand-in picture: a piece
              without one is typographic.
            </p>
          </Layout>

          <Specimen
            title="beside · xl — a section's one featured piece"
            note="Two equal halves from md: the picture, then meta and an h3-scale title. Long insight titles stay at three or four lines."
          >
            <ul>
              <Teaser
                arrangement="beside"
                size="xl"
                title="9 UX Design tips to boost your Ecommerce conversion rates"
                meta={['15 Oct 2026', '11 min read']}
                body="A field guide to the small decisions that move a checkout: what to test first, and what to leave alone."
                media={PHOTO}
                href={HREF}
              />
            </ul>
          </Specimen>

          <Specimen
            title="stack · md — a row of three: picture, scene, none"
            note="All three start on one top edge — the picture's, or the meta line's. compact: below 768 each becomes a row with its thumbnail at the end, and the meta keeps its first part."
          >
            <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="column">
              <Teaser
                title={LONG}
                meta={['15 Oct 2026', '11 min read']}
                media={PHOTO_2}
                href={HREF}
                sizes={CARD_THREE_TRACKS}
                compact
              />
              <Teaser
                title="Code review that ends in decisions, not threads"
                meta={['14 Oct 2026', '9 min read']}
                media={SCENE}
                href={HREF}
                compact
              />
              <Teaser
                title="When Figma and Storybook drift apart, which tools actually help?"
                meta={['15 Oct 2026', '17 min read']}
                href={HREF}
                compact
              />
            </Layout>
          </Specimen>

          <Specimen
            title="stack · lg with play, sm minis — the watched shape"
            note="The play mark sits in the picture's foot-start corner; it steps down on the md and sm sizes and is never drawn on a row's thumbnail."
          >
            <Layout columns={{ md: [2, 1] }} colGap="gutter" rowGap="gutter" align="start">
              <ul>
                <Teaser
                  size="lg"
                  title="Do AI not for AI's sake but for your user"
                  meta={['15 Oct 2026', '13 min']}
                  media={PHOTO}
                  play
                  href={HREF}
                />
              </ul>
              <Layout as="ul" rowGap="gutter">
                <Teaser
                  size="sm"
                  title="Mastering design decisions"
                  meta={['15 Oct 2026', '7 min']}
                  media={PHOTO_2}
                  play
                  href={HREF}
                  compact
                />
                <Teaser
                  size="sm"
                  title={UNBROKEN}
                  meta="14 Oct 2026"
                  media={PHOTO}
                  play
                  href={HREF}
                  compact
                />
              </Layout>
            </Layout>
          </Specimen>

          <Specimen
            title="row · lg with a date — events; row · sm — a list"
            note="Copy first, the picture at the row's end so every row starts on one edge; a row with none simply runs on. Standfirsts hold two lines."
          >
            <Layout columns={{ lg: [1, 1] }} colGap="column" rowGap="stack">
              <Layout as="ul" rowGap="stack">
                <Teaser
                  arrangement="row"
                  size="lg"
                  date={{ day: '2', label: 'Dec 2023', dateTime: '2023-12-02' }}
                  meta="Ahmedabad"
                  title="When a Product Designer moves to Bollywood"
                  body="In this fun and interactive session, learn the process of filmmaking using the language of product design, a lively session blending the two worlds."
                  media={PHOTO_2}
                  href={HREF}
                />
                <Teaser
                  arrangement="row"
                  size="lg"
                  date={{ day: '—', label: 'Date TBC' }}
                  title="Design systems for everyone"
                  href={HREF}
                />
              </Layout>
              <Layout as="ul" rowGap="gutter">
                <Teaser
                  arrangement="row"
                  size="sm"
                  meta={['Guide', '11 min read']}
                  title="Marketing automation software design best practices"
                  media={PHOTO}
                  href={HREF}
                />
                <Teaser
                  arrangement="row"
                  size="sm"
                  meta={['Article', '12 min read']}
                  title="What product designers can learn from filmmaking"
                  href={HREF}
                />
              </Layout>
            </Layout>
          </Specimen>
        </Layout>
      </Section>

      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface} aria-label={`Teaser on ${surface}`}>
          <Specimen
            title={`on ${surface}`}
            note="Byte-identical markup on every ground: beside, a dated row, a list row, and a trio of picture, date and words."
          >
            <Layout rowGap="column">
              <ul>
                <Teaser
                  arrangement="beside"
                  size="xl"
                  title="9 UX Design tips to boost your Ecommerce conversion rates"
                  meta={['Article', '11 min read']}
                  media={PHOTO_2}
                  href={HREF}
                />
              </ul>
              <Layout as="ul" columns={{ lg: 2 }} colGap="column" rowGap="stack">
                <Teaser
                  arrangement="row"
                  size="lg"
                  date={{ day: '11', label: 'Mar 2023', dateTime: '2023-03-11' }}
                  meta="Ahmedabad"
                  title="Design Systems for everyone — from basics to advanced"
                  body="The first design systems meetup in Ahmedabad, from basics to advanced."
                  media={PHOTO}
                  href={HREF}
                />
                <Teaser
                  arrangement="row"
                  size="sm"
                  meta={['Video', '7 min']}
                  title="Mastering design decisions: insights for founders, PMs and designers"
                  media={PHOTO_2}
                  play
                  href={HREF}
                />
              </Layout>
              <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="column">
                <Teaser
                  title="Building trust and transparency in AI-first interfaces"
                  meta={['Article', '11 min read']}
                  media={PHOTO}
                  play
                  href={HREF}
                />
                <Teaser
                  title="Lessons from designing the UX for AI products"
                  date={{ day: '2', label: 'May 2025' }}
                  meta="London"
                  href={HREF}
                />
                <Teaser
                  title="How do you audit a design system?"
                  meta={['Guide', '10 min read']}
                  body="Twenty questions, in the order that finds the expensive answers first."
                  href={HREF}
                />
              </Layout>
            </Layout>
          </Specimen>
        </Section>
      ))}
    </>
  );
}
