import type { Metadata } from 'next';

import { Layout, Section, type SectionSurface } from '@/components';
import { getKitPhoto } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';
import { BlockCardSet, CtaRow, IndexGroup, ListCard, TableOfContents } from '@/patterns';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

export const metadata: Metadata = {
  title: 'IndexGroup | Design',
  robots: { index: false, follow: false },
};

/**
 * IndexGroup — one category of an index page, in the column beside the outline rail
 * (docs/specs/IndexGroup.md). Coverage: the full head (meta, lead, actions) and the heading alone;
 * each optional part on its own; a long heading against an action; a group holding cover tiles
 * (BlockCardSet) beside a group holding hairline rows (ListCard); paper, tint and ink. Band 1 is the
 * real arrangement, rail and all, so the rule's top edge can be read against the rail's first row.
 */

const COVERS = [
  'whiteboard-two-hands',
  'hand-sketch-wireframe',
  'workshop-sticky-sort',
] as const;

const TILES = COVERS.map((id, index) => ({
  id,
  title: [
    'Why confidence scores do not fix trust when nobody reviews the step',
    'Design systems for SaaS, and what they save',
    'Vibe-coded app to production-ready',
  ][index]!,
  eyebrow: '26 Feb 2025 · 13 min read',
  body: 'One sentence of standfirst that says what the piece argues and who it is for.',
  href: ROUTES.articles,
  media: { type: 'image' as const, image: getKitPhoto(id, { standIn: true }) },
}));

const ROWS = [
  'Getting SaaS customers to value in the first week',
  'How to run a UX audit your engineers will act on',
  'Landing pages for B2B products',
];

const ALL = (count: number, noun: string) => (
  <CtaRow rule={false} actions={[{ label: `All ${count} ${noun}`, href: ROUTES.insights }]} />
);

/** Guide rows, the last one open: inside a group the next group's hairline is the seam. */
function Rows() {
  return (
    <Layout as="ul" rowGap="none">
      {ROWS.map((title, index) => (
        <ListCard
          key={title}
          titleAs="h3"
          size="sm"
          arrangement="stacked"
          eyebrow="12 min read"
          title={title}
          body="One line on what the guide walks through."
          href={ROUTES.guides}
          rule={index === ROWS.length - 1 ? 'none' : 'end'}
        />
      ))}
    </Layout>
  );
}

const EVENTS = [
  {
    title: 'Design systems for everyone, from basics to advanced',
    day: '11',
    label: 'Mar 2023',
    iso: '2023-03-11',
  },
  {
    title: 'When a product designer moves to Bollywood',
    day: '2',
    label: 'Dec 2023',
    iso: '2023-12-02',
  },
] as const;

/** Event rows for the Events head: each led by its date, in the title's ink. */
function EventRows() {
  return (
    <Layout as="ul" rowGap="none">
      {EVENTS.map((event, index) => (
        <ListCard
          key={event.title}
          titleAs="h3"
          size="sm"
          eyebrow="Ahmedabad"
          title={event.title}
          body="A short write-up of what the session covered."
          href={ROUTES.events}
          marker={{ type: 'date', dateTime: event.iso, day: event.day, label: event.label }}
          rule={index === EVENTS.length - 1 ? 'none' : 'end'}
        />
      ))}
    </Layout>
  );
}

/* No blue band: blue is never a ground (owner ruling, § 4.3), and an index is never set on one. The
   blue token block stays declared for self-containment, which tokens:check proves without a render. */
const SURFACES: readonly Exclude<SectionSurface, 'blue' | 'paper'>[] = ['tint', 'ink'];

export default function IndexGroupSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>IndexGroup</h1>
          <p className={s.specNote}>
            A category of an index page as a section in the column beside the page&rsquo;s{' '}
            <code>TableOfContents</code>: a hairline across the column, an <code>h2</code> at
            the h3 role, a derived fact in the label voice, one sentence, and the way out at the
            row&rsquo;s end, on the heading&rsquo;s baseline. Items sit a <code>stack</code>{' '}
            (48) under the head; groups sit a <code>stack</code> (48) apart, block to block in
            one section, which the caller&rsquo;s stack owns — the hairline and its 24 of head
            air make the break. A row list in a group ends without its own rule.
          </p>
        </Layout>
      </Section>

      <Section surface="paper">
        <Specimen
          title="01 · In its shell"
          note="The [1, 4] shell from LongformShell: the rail sticks from 1024, the first group's rule sits on the rail's top edge, and the run varies its shape — cover tiles, then hairline rows."
        >
          <Layout
            columns={{ base: 1, lg: [1, 4] }}
            colGap="column"
            rowGap="stack"
            align="start"
          >
            <TableOfContents
              items={[
                { label: 'Articles', href: '#ig-articles-heading', meta: '42' },
                { label: 'Guides', href: '#ig-guides-heading', meta: '10' },
              ]}
            />
            <Layout rowGap="stack">
              <IndexGroup
                id="ig-articles"
                heading="Articles"
                headingId="ig-articles-heading"
                meta="42 articles"
                lead="Positions on AI inside products, design systems and the everyday design of SaaS."
                actions={ALL(42, 'articles')}
              >
                <BlockCardSet
                  lead="none"
                  across={3}
                  size="sm"
                  cue="title"
                  scroll="never"
                  items={TILES}
                />
              </IndexGroup>
              <IndexGroup
                id="ig-guides"
                heading="Guides"
                headingId="ig-guides-heading"
                meta="10 guides"
                lead="Practical walkthroughs, one job each."
                actions={ALL(10, 'guides')}
              >
                <Rows />
              </IndexGroup>
            </Layout>
          </Layout>
        </Specimen>
      </Section>

      <Section surface="paper">
        <Layout rowGap="column">
          <Specimen
            title="02 · The heading alone"
            note="No meta, no lead, no actions: the rule and the h2."
          >
            <IndexGroup id="ig-bare" heading="Designed and built" headingId="ig-bare-heading">
              <Rows />
            </IndexGroup>
          </Specimen>
          <Specimen
            title="03 · Meta only"
            note="The case index's head: a derived count, no invented copy."
          >
            <IndexGroup
              id="ig-meta"
              heading="New products"
              headingId="ig-meta-heading"
              meta="4 cases"
            >
              <Rows />
            </IndexGroup>
          </Specimen>
          <Specimen
            title="04 · Lead only"
            note="The sentence on the lead measure, sans, small body — over event rows, each led by its date in the title's ink."
          >
            <IndexGroup
              id="ig-lead"
              heading="Events"
              headingId="ig-lead-heading"
              lead="Talks and meetups we have hosted, written up so you can take the useful parts."
            >
              <EventRows />
            </IndexGroup>
          </Specimen>
          <Specimen
            title="05 · A long heading against an action"
            note="The heading wraps on its title measure (--measure-title); the action keeps its own track at the row's end on the heading's last baseline, and drops under the heading below 768."
          >
            <IndexGroup
              id="ig-long"
              heading="Prototypes, releases and the quality of what ships when nobody is watching"
              headingId="ig-long-heading"
              meta="7 articles"
              lead="What happens between a working prototype and a product people can rely on."
              actions={ALL(7, 'articles')}
            >
              <Rows />
            </IndexGroup>
          </Specimen>
        </Layout>
      </Section>

      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface}>
          <Specimen
            title={`06 · ${surface === 'tint' ? 'Tint' : 'Ink'}`}
            note={
              surface === 'tint'
                ? 'The rule steps to neutral-400 and the meta to 700 on the deeper ground.'
                : 'The rule drops to neutral-700, the words lift.'
            }
          >
            <IndexGroup
              id={`ig-${surface}`}
              heading="Videos"
              headingId={`ig-${surface}-heading`}
              meta="7 videos"
              lead="Full recordings of our conversations with people who build software products."
              actions={ALL(7, 'videos')}
            >
              <Rows />
            </IndexGroup>
          </Specimen>
        </Section>
      ))}
    </>
  );
}
