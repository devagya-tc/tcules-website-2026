import { Layout, Prose, Section } from '@/components';
import { BlockCard, ContentSection, ListCard, Proof } from '@/patterns';

import { Specimen } from '../_specimen/Specimen';

const BODY_HTML =
  '<p>A product decision is only settled once it survives the workflow it lives in. ' +
  'That is what this section argues, at whatever length the argument needs.</p>' +
  '<p>A second paragraph, so the seam inside Prose can be read against the seam between blocks.</p>';

const CARDS = [
  { title: 'A confusing action', body: 'The label is fine. The authority behind it is not.' },
  { title: 'A slow workflow', body: 'Every step is fast. The sequence is the wrong sequence.' },
  { title: 'A crowded dashboard', body: 'Nothing here is wrong, and nothing here is decided.' },
];

const STEPS = [
  { title: 'Read the real work', body: 'Who does what, in which order, under whose authority.' },
  { title: 'Settle the product model', body: 'Which records exist and which rules bind them.' },
  { title: 'Design the behaviour', body: 'What the interface does, not what it looks like.' },
];

function Cards() {
  return (
    <Layout as="ul" columns={{ base: 1, md: 3 }} colGap="gutter" rowGap="gutter" equalRows>
      {CARDS.map((card) => (
        <BlockCard key={card.title} title={card.title} body={card.body} />
      ))}
    </Layout>
  );
}

function Steps() {
  return (
    <Layout as="ol" rowGap="none">
      {STEPS.map((step, index) => (
        <ListCard
          key={step.title}
          title={step.title}
          body={step.body}
          titleAs="h3"
          marker={{ kind: 'number', value: index + 1 }}
        />
      ))}
    </Layout>
  );
}

/**
 * ContentSection — the proving ground.
 *
 * The specimens below are ordered to make ONE comparison legible above all others: the first two
 * are the same content with and without a lead, because the lead is what turns the head group
 * into an object and is the whole argument for this component existing. Everything after that is
 * coverage: every slot, every surface, the two densities, and the shapes that have no heading.
 *
 * Each band is a real Section, so the specimens sit edge to edge exactly as they do on a route —
 * which is the only way to judge the 96+96 seam between two adjacent bands.
 */
export default function ContentSectionSpecimen() {
  return (
    <>
      <Section surface="paper" density="tight">
        <Specimen
          title="ContentSection"
          note="One CMS section as one band. Every band below is a live Section, so the specimens sit edge to edge exactly as they do on a route — which is the only way to read the 96+96 seam between two of them."
        >
          <Prose
            html={
              '<p>The gap ladder inside the band, and the whole reason this is a component: ' +
              '<strong>8</strong> eyebrow to heading, <strong>24</strong> heading to lead, ' +
              '<strong>48</strong> head group to the blocks and between the blocks. ' +
              'Compare the first two specimens — same content, lead and no lead.</p>'
            }
          />
        </Specimen>
      </Section>

      <ContentSection
        surface="paper"
        eyebrow="With a lead"
        heading="The screen is often where a deeper product problem becomes visible."
        lead="What the interface may be telling you"
      >
        <Prose html={BODY_HTML} />
        <Cards />
      </ContentSection>

      <ContentSection
        surface="tint"
        eyebrow="Without a lead"
        heading="The screen is often where a deeper product problem becomes visible."
      >
        <Prose html={BODY_HTML} />
        <Cards />
      </ContentSection>

      <ContentSection
        surface="paper"
        heading="Heading only — no eyebrow, no lead"
        headingId="specimen-heading-only"
      >
        <Steps />
      </ContentSection>

      <ContentSection surface="tint">
        <Prose html={BODY_HTML} />
      </ContentSection>

      <ContentSection
        surface="paper"
        heading="One block, tight"
        headingId="specimen-density-tight"
        lead="A band holding a paragraph does not want the air a five-card grid wants."
        density="tight"
      >
        <Prose html={BODY_HTML} />
      </ContentSection>

      <ContentSection
        surface="tint"
        heading="One block, open"
        headingId="specimen-density-open"
        lead="The other direction, for a band that carries the page's turn."
        density="open"
      >
        <Prose html={BODY_HTML} />
      </ContentSection>

      <ContentSection
        surface="ink"
        eyebrow="On ink"
        heading="Every ink is restated per surface"
        headingId="specimen-surface-ink"
        lead="Heading, lead and eyebrow each hold their contrast floor on all four grounds."
      >
        <Prose html={BODY_HTML} />
        <Cards />
      </ContentSection>

      <ContentSection
        surface="blue"
        eyebrow="On blue"
        heading="The pivot ground"
        headingId="specimen-surface-blue"
        lead="One appearance per page, and never adjacent to an ink band."
      >
        <Proof
          arrangement="compact"
          quote={{
            quoteHtml: '<p>The workflow between our teams was seamless.</p>',
            name: 'A client',
            role: 'Head of Product',
            company: 'Tcules',
          }}
        />
      </ContentSection>
    </>
  );
}
