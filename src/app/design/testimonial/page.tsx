import {
  BlockCard,
  TestimonialBeside,
  TestimonialCard,
  TestimonialCase,
  TestimonialWall,
} from '@/patterns';
import { Layout, Section, type SectionSurface } from '@/components';
import type { TestimonialAvatar, TestimonialItem } from '@/patterns';
import { getKitPhoto, type PhotoId } from '@/lib/photos';

import { Specimen } from '../_specimen/Specimen';

/* Kit stock portraits, standing in for speakers' photographs (home round 3: a circular avatar on some
   cards, none on others). */
const face = (id: PhotoId): TestimonialAvatar => {
  const { src, width, height, sources } = getKitPhoto(id);
  return { src, width, height, sources };
};

/* Stress content, not the live quotes: a specimen route does not import content. Lengths run from a
   one-liner to a long paragraph so the wall's column split and the row's pinned feet are visible. */
const ITEMS: readonly TestimonialItem[] = [
  {
    id: 'a',
    quoteHtml:
      '<p>“They found the real problem in the first week, before anyone had drawn a screen.”</p>',
    name: 'Alex Morgan',
    role: 'Head of Product',
    company: 'Northwind',
    rating: 5,
    avatar: face('portrait-woman-grey'),
  },
  {
    id: 'b',
    quoteHtml:
      '<p>“The team joined our rituals, worked in our codebase and our Figma, and within a quarter the product read as one product again. Our support queue for the same three screens went quiet.”</p>',
    name: 'Priya Raman',
    role: 'VP Engineering',
    company: 'Contoso Health',
    rating: 4.5,
  },
  {
    id: 'c',
    quoteHtml: '<p>“Clear thinking, quick turnaround, honest about trade-offs.”</p>',
    name: 'Jonas Weber',
    company: 'Fabrikam',
    rating: 4.5,
    avatar: face('portrait-man-glasses'),
  },
  {
    id: 'd',
    quoteHtml:
      '<p>“We came with a prototype built in a weekend. We left with a first release our customers could rely on, and a design system our own team now extends without asking.”</p>',
    name: 'Mei Tanaka',
    role: 'Founder & CEO',
    company: 'Lumen Labs',
    rating: 5,
  },
  {
    id: 'e',
    quoteHtml:
      '<p>“Every decision came with its reasoning, which made it easy to bring the rest of the company along.”</p>',
    name: 'Samuel Okafor',
    role: 'Director of Design',
    company: 'Tailspin',
    rating: 4.5,
    avatar: face('portrait-man-green'),
  },
  {
    id: 'f',
    quoteHtml:
      '<p>“A long-distance collaboration that felt like the team down the hall. I would hire them again for anything with a lot of moving parts, and I have recommended them twice since.”</p>',
    name: 'Clara Jensen',
    role: 'Chief Product Officer',
    company: 'Adventure Works',
    rating: 5,
  },
];

const [A, B, C, D, E] = ITEMS as [
  TestimonialItem,
  TestimonialItem,
  TestimonialItem,
  TestimonialItem,
  TestimonialItem,
];

const SURFACES: readonly SectionSurface[] = ['paper', 'tint', 'ink', 'blue'];

function Work() {
  return (
    <ul>
      <BlockCard
        title="Northwind: one way into the workflow builder"
        body="Three ways to start, each a separate path. We brought them into one starting point."
        href="#"
        ctaLabel="Read the case"
        cue="cta"
        size="lg"
        media={{ type: 'texture', recipe: 1 }}
      />
    </ul>
  );
}

/* A case for TestimonialCase: stress copy and a kit photograph standing in for a product capture. */
const CASE = {
  eyebrow: 'Northwind · Product design',
  title: 'One way into the workflow builder',
  body: 'Users could start from a template, ask the AI for help or start from scratch, and each felt like a separate path. We brought all three into one starting point.',
  href: '#',
  ctaLabel: 'Read the Northwind case',
  image: getKitPhoto('team-laptops-table', { alt: 'The Northwind team reviewing the builder' }),
};

export default function TestimonialSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Testimonial</h1>
          <p>
            The rated testimonial card (home round 2, 10 Oct 2026): stars, the client&rsquo;s
            words, and who said them, on a quiet panel with no edge. Every testimonial group
            uses it. The rating is the page&rsquo;s data, passed as a prop; a card with no
            rating shows no stars. Home round 3 (11 Oct 2026): the words are SANS (readability
            at a card&rsquo;s size), and a speaker with a photograph gets a circular avatar; one
            without gets none — the initials monogram is banned.
          </p>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <h2>1 · The card</h2>
          <Layout columns={{ lg: 3 }} colGap="gutter" rowGap="stack">
            <Specimen
              title="md · box · avatar"
              note="the default: a wall, or beside its case; the 48 circular avatar beside the speaker"
            >
              <TestimonialCard item={A} />
            </Specimen>
            <Specimen
              title="md · box · no avatar"
              note="no photograph, no avatar at all: the name and role alone, never initials"
            >
              <TestimonialCard item={D} />
            </Specimen>
            <Specimen title="md · box · no rating" note="no stars, never a default score">
              <TestimonialCard item={{ ...C, rating: undefined }} />
            </Specimen>
            <Specimen
              title="sm · none · no avatar"
              note="a quote that supports a claim beside it: the sans body in the quieter ink, 14 stars, no panel"
            >
              <TestimonialCard item={B} size="sm" frame="none" />
            </Specimen>
            <Specimen title="sm · none · avatar" note="the supporting card's 40 avatar">
              <TestimonialCard item={E} size="sm" frame="none" />
            </Specimen>
            <Specimen
              title={'md · box · voice="italic"'}
              note="the sans italic, for a quote set beside other content; walls stay upright"
            >
              <TestimonialCard item={A} voice="italic" />
            </Specimen>
            <Specimen
              title={'sm · none · voice="italic"'}
              note="the supporting quote beside a claim, as home's why-Tcules rows use it"
            >
              <TestimonialCard item={E} size="sm" frame="none" voice="italic" />
            </Specimen>
          </Layout>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <h2>2 · Wall · six cards, three columns (tint band, paper cards)</h2>
          <Specimen
            title="TestimonialWall · 6"
            note="column stacks in authored order, split where the columns end most even; one column below 1024"
          >
            <TestimonialWall items={ITEMS} />
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <h2>3 · Wall · one row of peers</h2>
          <Specimen
            title="TestimonialWall · 3"
            note="stretched to the tallest, speakers on one line"
          >
            <TestimonialWall items={[A, B, C]} />
          </Specimen>
          <Specimen title="TestimonialWall · 2" note="two across">
            <TestimonialWall items={[A, D]} />
          </Specimen>
          <Specimen title="TestimonialWall · 4" note="a 2 × 2 of column stacks">
            <TestimonialWall items={[A, B, C, D]} />
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <h2>4 · Wall · staggered</h2>
          <Specimen
            title="TestimonialWall · 6 · stagger"
            note="from 1024 the middle column drops a section step (Layout stagger)"
          >
            <TestimonialWall items={ITEMS} stagger />
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <h2>5 · Beside its case</h2>
          <Specimen
            title={'TestimonialBeside · arrangement="diptych"'}
            note="home's selected work (rounds 3–4): the case and a quiet panel, two equal tracks, top-aligned. Stars at the panel's head, the words under them, the speaker and avatar pinned to its foot on the boxed card's hairline (round 4: the avatar inside the card). From 1440 the panel is the cover's 16:9, sharing its top and foot; at 1024–1439 the content does not fit that 16:9, so the panel stretches to the row and its foot is the case's last line. Attached by its edges, never inside the case."
          >
            <TestimonialBeside work={<Work />} item={A} arrangement="diptych" />
          </Specimen>
          <Specimen
            title={'TestimonialBeside · diptych · reverse · no avatar'}
            note="the panel on the start from 1024, the second row of a run; a speaker with no photograph has none"
          >
            <TestimonialBeside work={<Work />} item={D} arrangement="diptych" reverse />
          </Specimen>
          <Specimen
            title={'TestimonialBeside · diptych · long quote'}
            note="stress: from 1440 a quote too long for the 16:9 grows the panel past the cover's foot rather than clipping; at 1024–1439 it still ends on the row's foot"
          >
            <TestimonialBeside work={<Work />} item={B} arrangement="diptych" />
          </Specimen>
          <Specimen
            title="TestimonialBeside · card"
            note="the default for service, audit, expertise and case-index pages: the work in the 7, the card in the 5, centred on the work; the case keeps its description"
          >
            <TestimonialBeside work={<Work />} item={D} />
          </Specimen>
          <Specimen title="TestimonialBeside · reverse" note="the card on the start from 1024">
            <TestimonialBeside work={<Work />} item={B} reverse />
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <h2>5a · The case and its words as one card</h2>
          <Specimen
            title="TestimonialCase"
            note="home's selected work (16 Oct 2026, round 7): one card on the boxed card's ground with a text mat. The 16:9 cover (hairlined) beside the eyebrow, claim and result on [7, 5], the action pinned to the foot; under both, the client's words in their own full-width box, centred: stars, quote, portrait with name and role. One column below 1024."
          >
            <TestimonialCase {...CASE} item={A} />
          </Specimen>
          <Specimen
            title="TestimonialCase · reverse · no avatar"
            note="the second card of a run mirrors the first from 1024; the DOM keeps the cover first. No photograph: no avatar"
          >
            <TestimonialCase {...CASE} item={D} reverse />
          </Specimen>
          <Specimen
            title="TestimonialCase · long quote"
            note="stress: a long quote; the voice box grows and the quote holds its measure, nothing clips"
          >
            <TestimonialCase {...CASE} item={B} />
          </Specimen>
        </Layout>
      </Section>

      {SURFACES.map((surface, index) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="stack">
            {index === 0 ? <h2>6 · Four surfaces</h2> : null}
            <Specimen title={surface} note="box and none on the same ground">
              <Layout columns={{ lg: 2 }} colGap="gutter" rowGap="stack">
                <TestimonialCard item={A} />
                <TestimonialCard item={C} size="sm" frame="none" />
              </Layout>
            </Specimen>
            <Specimen
              title={`${surface} · TestimonialCase`}
              note="the card's ground and inks on this surface"
            >
              <TestimonialCase {...CASE} item={A} />
            </Specimen>
          </Layout>
        </Section>
      ))}
    </>
  );
}
