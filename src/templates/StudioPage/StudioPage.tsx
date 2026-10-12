import { Layout, Prose, type MediaImage } from '@/components';
import {
  Accordion,
  Banner,
  BlockCardSet,
  ContentSection,
  ContentSectionText,
  CtaRow,
  CtaSection,
  DataTable,
  EngagementOptions,
  Gateway,
  PageHero,
  ProfileCard,
  ProfileFollow,
  Statement,
  TestimonialWall,
  VoiceLedger,
  type EngagementScope,
  type HeroTrail,
} from '@/patterns';

type Link = { label: string; href: string };
type Titled = { title: string; body: string };

/**
 * The About page's content, edited for consumption: one field per band, every list short. The
 * structural twin of the content seam's `IdealAboutPage` (a template never imports @/content).
 */
export type StudioPageContent = {
  hero: { title: string; lede: string; stats: readonly { value: string; label: string }[] };
  ahmedabad: { heading: string; paragraphs: readonly string[] };
  services: {
    heading: string;
    lead?: string;
    items: readonly (Titled & { href: string; label: string })[];
  };
  practice: { heading: string; lead?: string; items: readonly Titled[]; link?: Link };
  who: {
    heading: string;
    lead?: string;
    items: readonly { voice: string; reply: string }[];
    note?: string;
  };
  difference: {
    statement: { eyebrow?: string; text: string };
    complexity: { heading: string; lead?: string; items: readonly Titled[] };
    continuity: { heading: string; lead: string };
  };
  how: { heading: string; items: readonly Titled[] };
  people: {
    heading: string;
    leaders: readonly { name: string; role: string; bio: string; linkedin: Link; portrait: string }[];
    follow: { body: string; link: Link };
  };
  work: {
    heading: string;
    cases: readonly { name: string; body: string }[];
    all: Link;
    lab: { heading: string; lead: string; link: Link };
  };
  testimonials: {
    heading: string;
    items: readonly { id: string; quoteHtml: string; name: string; role: string; company: string }[];
  };
  record: { heading: string; rows: readonly (readonly [string, string])[] };
  faq: { heading: string; items: readonly { question: string; answerHtml: string }[] };
  coda: { eyebrow?: string; text: string };
  cta: { heading: string; body: string; action: Link };
  careers: { heading: string; lead: string; action: Link };
};

export type StudioPageProps = {
  content: StudioPageContent;
  trail?: HeroTrail;
  /** The photographs the route resolves: bound studio media, register placeholders, case covers. */
  images: {
    ahmedabad: MediaImage;
    continuity: MediaImage;
    lab: MediaImage;
    careers: MediaImage;
    /** By the leader's `portrait` slug. */
    portraits: Readonly<Record<string, MediaImage>>;
    /** By the case's name. */
    covers: Readonly<Record<string, MediaImage>>;
  };
  /** Each cited case's page, by the case's name. */
  caseHrefs: Readonly<Record<string, string>>;
};

/* How Tcules works: each principle's drawing, in order. */
const HOW_SCOPES: readonly EngagementScope[] = ['start', 'direct', 'inside', 'overlap', 'commercial'];

/* Plain copy into Prose's paragraphs: the fixture's strings are text, never markup. */
const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const id = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * TIER 3 — the About page as it should read (owner, 12 Oct 2026: "present the information in the
 * most consumable format. a person would most likely not read a section with 5 paragraphs of text").
 *
 * Every band carries one idea in the shape that idea needs, and no band holds more than two or three
 * short paragraphs. The arrangement changes band to band, so the page never repeats one rectangle:
 * the hero with the record's figures; a photograph beside the city; a selector for six services;
 * two claims; the three situations as the questions layout; a statement; three examples; a banner;
 * five drawn principles; two people and the studio; featured work; the Lab on the dark band; the
 * clients' words; the record; the questions; the coda; the ask; careers.
 */
export function StudioPage({ content: c, trail, images, caseHrefs }: StudioPageProps) {
  const practiceId = id(c.practice.heading);
  const complexityId = id(c.difference.complexity.heading);
  return (
    <>
      <PageHero
        trail={trail}
        title={c.hero.title}
        body={[c.hero.lede]}
        stats={c.hero.stats}
        texture
        surface="paper"
      />

      <ContentSection
        id="ahmedabad"
        heading={c.ahmedabad.heading}
        headingId="ahmedabad-heading"
        arrangement="media"
        media={{ image: images.ahmedabad, side: 'start', pin: false, head: 'lg' }}
      >
        <ContentSectionText>
          <Prose html={c.ahmedabad.paragraphs.map((text) => `<p>${escapeHtml(text)}</p>`).join('')} />
        </ContentSectionText>
      </ContentSection>

      <ContentSection
        id="what-we-do"
        heading={c.services.heading}
        headingId="what-we-do-heading"
        lead={c.services.lead}
      >
        <Gateway
          items={c.services.items.map((item) => ({
            id: id(item.title),
            title: item.title,
            body: item.body,
            href: item.href,
            service: item.label,
          }))}
        />
      </ContentSection>

      <ContentSection
        id={practiceId}
        heading={c.practice.heading}
        headingId={`${practiceId}-heading`}
        lead={c.practice.lead}
        footer={c.practice.link ? <CtaRow actions={[c.practice.link]} /> : undefined}
      >
        <BlockCardSet
          items={c.practice.items.map((item) => ({ id: item.title, ...item }))}
          lead="none"
          across={2}
          size="lg"
          scroll="never"
        />
      </ContentSection>

      <VoiceLedger
        id="who-we-work-with"
        heading={c.who.heading}
        headingId="who-we-work-with-heading"
        lead={c.who.lead}
        items={c.who.items}
        note={c.who.note ? <p>{c.who.note}</p> : undefined}
      />

      <Statement as="p" align="start" eyebrow={c.difference.statement.eyebrow} surface="tint">
        {c.difference.statement.text}
      </Statement>

      <ContentSection
        id={complexityId}
        heading={c.difference.complexity.heading}
        headingId={`${complexityId}-heading`}
        lead={c.difference.complexity.lead}
      >
        <BlockCardSet
          items={c.difference.complexity.items.map((item) => ({ id: item.title, ...item }))}
          lead="none"
          across={3}
          numbered
          scroll="never"
        />
      </ContentSection>

      <Banner
        form="beside"
        mediaSide="start"
        id="continuity"
        headingId="continuity-heading"
        heading={c.difference.continuity.heading}
        lead={c.difference.continuity.lead}
        image={{ ...images.continuity, kind: 'photograph' }}
      />

      <EngagementOptions
        id="how-we-work"
        heading={c.how.heading}
        headingId="how-we-work-heading"
        options={c.how.items.map((item, index) => ({ ...item, scope: HOW_SCOPES[index] }))}
      />

      <ContentSection id="leadership" heading={c.people.heading} headingId="leadership-heading">
        <Layout rowGap="gutter">
          <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="gutter">
            {c.people.leaders.map((leader) => (
              <ProfileCard
                key={leader.name}
                name={leader.name}
                role={leader.role}
                bio={leader.bio}
                portrait={images.portraits[leader.portrait]}
                linkedin={leader.linkedin}
              />
            ))}
          </Layout>
          <ProfileFollow body={c.people.follow.body} link={c.people.follow.link} />
        </Layout>
      </ContentSection>

      <ContentSection
        id="work"
        heading={c.work.heading}
        headingId="work-heading"
        footer={<CtaRow actions={[c.work.all]} />}
      >
        <BlockCardSet
          items={c.work.cases.map((item) => ({
            id: item.name,
            title: item.name,
            body: item.body,
            href: caseHrefs[item.name],
            ...(images.covers[item.name]
              ? { media: { type: 'image' as const, image: images.covers[item.name]! } }
              : {}),
          }))}
          lead="auto"
          cue="title"
          scroll="never"
        />
      </ContentSection>

      <Banner
        form="beside"
        mediaSide="end"
        id="future-interfaces-lab"
        headingId="future-interfaces-lab-heading"
        heading={c.work.lab.heading}
        lead={c.work.lab.lead}
        actions={<CtaRow rule={false} actions={[c.work.lab.link]} />}
        image={{ ...images.lab, kind: 'photograph' }}
        surface="ink"
      />

      <ContentSection
        id="testimonials"
        heading={c.testimonials.heading}
        headingId="testimonials-heading"
        surface="tint"
        align="center"
      >
        <TestimonialWall items={c.testimonials.items} />
      </ContentSection>

      <ContentSection id="company-record" heading={c.record.heading} headingId="company-record-heading">
        <DataTable
          split
          labelledBy="company-record-heading"
          keyColumn={{ heading: 'Fact' }}
          columns={[{ heading: 'Record' }]}
          rows={c.record.rows.map(([fact, value]) => ({ header: fact, cellsHtml: [value] }))}
        />
      </ContentSection>

      <ContentSection id="faq" heading={c.faq.heading} headingId="faq-heading" align="center">
        <ContentSectionText>
          <Accordion items={c.faq.items} />
        </ContentSectionText>
      </ContentSection>

      <Statement as="p" align="start" eyebrow={c.coda.eyebrow}>
        {c.coda.text}
      </Statement>

      <CtaSection
        id="work-with-tcules"
        arrangement="open"
        surface="tint"
        heading={c.cta.heading}
        body={[c.cta.body]}
        actions={[c.cta.action]}
      />

      <Banner
        form="below"
        id="careers"
        headingId="careers-heading"
        heading={c.careers.heading}
        lead={c.careers.lead}
        actions={<CtaRow rule={false} actions={[c.careers.action]} />}
        image={{ ...images.careers, kind: 'photograph' }}
      />
    </>
  );
}
