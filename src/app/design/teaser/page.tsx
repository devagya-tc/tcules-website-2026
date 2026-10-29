import type { Metadata } from 'next';

import { Layout, Section, type SectionSurface } from '@/components';
import { CARD_THREE_TRACKS } from '@/lib/image-sizes';
import { getKitPhoto } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';
import { Teaser, TEASER_FORMAT_ICON, type TeaserMedia } from '@/patterns';

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
            note="Two equal halves from md, the copy hung from the picture's top edge: meta and image start on one line. The horizontal card keeps the serif h3, the one serif card title (22 Oct 2026). Hover: the title underlines and the picture leans in."
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
            title="stack · xl — a lead over its column"
            note="Stacked, the featured piece's title is the sans h4 like every other card title (22 Oct 2026); it leads by its picture, its body-lg standfirst and its measure, not by a serif."
          >
            <ul>
              <Teaser
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
            note="The play mark sits in the picture's top-end corner, clear of a thumbnail's burned-in lower third; it steps down on the md and sm sizes and is never drawn on a row's thumbnail."
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
            title="row · lg with a date — events; row · sm with an index — a list"
            note="The marker (a date, an ordinal) in a fixed column at the start, the copy, the picture at the row's end, so every row's copy starts on one edge. A dated row lays its picture full width above the date below 768. label leads a mixed set's meta in the title's ink."
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
                  index="01"
                  label="Guide"
                  meta="11 min read"
                  title="Marketing automation software design best practices"
                  media={PHOTO}
                  href={HREF}
                />
                <Teaser
                  arrangement="row"
                  size="sm"
                  index="02"
                  label="Article"
                  meta="12 min read"
                  title="What product designers can learn from filmmaking"
                  href={HREF}
                />
              </Layout>
            </Layout>
          </Specimen>
        </Layout>
      </Section>

      <Section aria-label="Teaser · beauty round 4">
        <Layout rowGap="stack">
          <Specimen
            title="row · md · metaAside + slot — a ledger"
            note="From md the meta's facts take a fixed column at the row's start and the title reads at a measure; the list holds the thumbnail's track on every row because one row has a picture, so every row's copy ends on one edge. The reserved track draws nothing. Below md the meta line is over the title."
          >
            <Layout as="ul" rowGap="stack">
              <Teaser
                arrangement="row"
                size="md"
                meta={['Design System', '17 min read']}
                title="When Figma and Storybook drift apart, which tools actually help?"
                href={HREF}
                metaAside
                slot
              />
              <Teaser
                arrangement="row"
                size="md"
                meta={['Modernise & Replatform', '11 min read']}
                title={LONG}
                body="A long title at the row measure, with two lines of standfirst under it."
                media={SCENE}
                href={HREF}
                metaAside
                slot
              />
              <Teaser
                arrangement="row"
                size="md"
                label="Guide"
                meta={['10 min read']}
                title="How do you audit a design system?"
                href={HREF}
                metaAside
                slot
              />
            </Layout>
          </Specimen>

          <Specimen
            title="row · lg · metaAside + ruled + arrow + icon — a resource listing"
            note="Home's Selected thinking (owner, 29 Oct 2026): one piece per row at the column's full width, a hairline above each row and under the last, the copy a block inside its rules (the list sets no gap). The meta column is headed by the format's glyph (`icon`, from TEASER_FORMAT_ICON: Solar Bold content icons, in the accent), then the format and the length as the piece's own page displays them; the title is the row's anchor with the summary under it; an arrow ends the row and moves toward its destination on hover. The whole row is one link. Below md the glyph leads the meta line over the title and the arrow keeps the row's end."
          >
            <Layout as="ul" rowGap="none">
              <Teaser
                arrangement="row"
                size="lg"
                label="Article"
                meta={['10 min read']}
                icon={TEASER_FORMAT_ICON.article}
                title="AI confidence scores in UX: design the review step people control"
                body="Why a number on an AI answer earns little trust, and the review step that does, drawn from three AI products we designed."
                href={HREF}
                metaAside
                ruled
                arrow
              />
              <Teaser
                arrangement="row"
                size="lg"
                label="Guide"
                meta={['13 min read']}
                icon={TEASER_FORMAT_ICON.guide}
                title={LONG}
                body="A long title at the row measure, with two lines of standfirst under it, so the arrow is seen holding the row's end beside a wrapped title."
                href={HREF}
                metaAside
                ruled
                arrow
              />
              <Teaser
                arrangement="row"
                size="lg"
                label="Podcast"
                meta={['6 min read']}
                icon={TEASER_FORMAT_ICON.podcast}
                title="Eden AI's Samy Melaine on building AI products for users: podcast"
                href={HREF}
                metaAside
                ruled
                arrow
              />
            </Layout>
          </Specimen>

          <Specimen
            title="row · lg · date + graphic — an event card on white"
            note="`graphic`: the picture's white takes the box's pale ground (multiply), so a card drawn on white keeps an edge on paper. The day is zero-padded and tabular, so titles start on one edge."
          >
            <Layout as="ul" rowGap="stack">
              <Teaser
                arrangement="row"
                size="lg"
                date={{ day: '02', label: 'May 2025', dateTime: '2025-05-02' }}
                meta="London"
                title="Lessons from designing the UX for AI products"
                media={PHOTO}
                graphic
                href={HREF}
                sizes={CARD_THREE_TRACKS}
              />
              <Teaser
                arrangement="row"
                size="lg"
                date={{ day: '11', label: 'Mar 2023', dateTime: '2023-03-11' }}
                meta="Ahmedabad"
                title="Design Systems for everyone — from basics to advanced"
                media={PHOTO_2}
                graphic
                href={HREF}
                sizes={CARD_THREE_TRACKS}
              />
            </Layout>
          </Specimen>

          <Specimen
            title="stack · sm — the title held to three balanced lines"
            note="A tile's title (md, sm) balances and stops at three lines on an ellipsis; its meta keeps to its first fact. The accessible name is still the whole title."
          >
            <Layout as="ul" columns={{ md: 3 }} colGap="gutter" rowGap="stack">
              <Teaser
                size="sm"
                meta={['High Fidelity Prototypes', '14 min read']}
                title={`${LONG}, and a further clause to run it past three lines`}
                media={PHOTO}
                href={HREF}
              />
              <Teaser
                size="sm"
                meta="Design System"
                title="Short title"
                media={SCENE}
                href={HREF}
              />
              <Teaser
                size="sm"
                meta="Information Design"
                title="Design systems for SaaS: what to build, in what order"
                media={PHOTO_2}
                href={HREF}
              />
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
