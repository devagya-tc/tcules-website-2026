import type { ReactNode } from 'react';

import { Layout, Section, Stat } from '@/components';
import {
  Accordion,
  Banner,
  Contrast,
  ContentSection,
  ContentSectionText,
  CtaRow,
  ReadDown,
  type AccordionItem,
  type ReadDownRow,
} from '@/patterns';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';

import { specimenStyles as s } from '../../_specimen/Specimen';
import t from '../../_specimen/typeroles.module.css';

/**
 * Kit family `cmp-readdown` — D read-down, D-faq and N contrast (visual-direction § 3.4), and the
 * units built for them: ReadDown (ListCard's D set mode) and Contrast (src/patterns/Contrast).
 *
 * Laid out as the family's showcase page: an intro band, then every variation as a live band under
 * a caption band, edge to edge on the 1240 column as a route would place it, so each can be measured
 * against the fold (§ 1.3). Showcase copy is free and in Tcules' voice (§ 8.4); every numeral is
 * illustrative and no band carries a client mark (§ 5.8).
 *
 * Warm-family page (§ 5.5): every photograph is warm or neutral, none is vivid, none appears twice.
 * Each D-faq is followed by an image band, as it always is on a page (§ 3.3).
 */

const photo = (id: PhotoId) => getKitPhoto(id);

/* The ReadDown photo form was sized under the H-row (heading over the rows, lead over the photo).
   With the H-row retired (owner, 7 Oct 2026: a text-only head is never split left/right) its head
   stacks above both halves and the band measures ~860 at 1470 (it fits a 1440 x 900 screen, not the
   830 fold). Re-sizing the form is ReadDown's own change; until then the three photo bands say so. */
const STACKED_HEAD =
  'ReadDown photo form under a stacked head (H-row retired 7 Oct 2026): ~860 at 1470, re-size pending';

function FoldExempt({ reason, children }: { reason: string; children: ReactNode }) {
  return <div data-fold-exempt={reason}>{children}</div>;
}

/**
 * A caption band: the variation's index and name in the head track, what to look for in the body
 * track, a hairline above. Tight, so the band beneath keeps its own air. Scaffolding.
 */
function Caption({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Section density="tight" id={id}>
      <Layout
        columns={{ lg: [1, 2] }}
        colGap="section"
        rowGap="tight"
        align="start"
        className={s.spec}
      >
        <p className={s.specTitle}>
          {index} · {title}
        </p>
        <p className={s.specNote}>{children}</p>
      </Layout>
    </Section>
  );
}

/* ── D rows ──────────────────────────────────────────────────────────────────────────────────
   The photo form sets rows in the 381 track (sm, h5): ≤ 4-word titles, bodies ≤ 12 words, two
   lines, so three rows and the head fit the fold. Two columns set them in the 349 halves: bodies
   ≤ 19 words, three lines at most (§ 1.5). The tint proof's one column (md, h4) runs at the lead
   measure, ≤ 20 words. */
const KEEP: readonly ReadDownRow[] = [
  {
    icon: 'layers',
    title: 'A product model',
    body: 'The objects, states and rules your product runs on, agreed once.',
  },
  {
    icon: 'document-text',
    title: 'A decision record',
    body: 'Each call and its evidence, so the reasoning outlives the room.',
  },
  {
    icon: 'code',
    title: 'Coded prototypes',
    body: 'Working surfaces to test with users and hand to engineering.',
  },
];

const AUDIT: readonly ReadDownRow[] = [
  {
    icon: 'eye',
    title: 'The product as used',
    body: 'The real flows with real accounts, where the friction shows.',
  },
  {
    icon: 'database',
    title: 'The model underneath',
    body: 'Where the screens and the data disagree about what a thing is.',
  },
  {
    icon: 'checklist',
    title: 'A ranked list of fixes',
    body: 'Costed and sequenced, so the next sprint is already planned.',
  },
];

const TEAM: readonly ReadDownRow[] = [
  {
    icon: 'user',
    title: 'A lead designer',
    body: 'Owns the product model and its decisions, workshop to release.',
  },
  {
    icon: 'code',
    title: 'A design engineer',
    body: 'Builds prototypes in your stack, so what we test ships.',
  },
  {
    icon: 'users-group-rounded',
    title: 'Your product owner',
    body: 'Settles the trade-offs in the room, not over email.',
  },
  {
    icon: 'cpu',
    title: 'Your engineers',
    body: 'Review every contract while change is still cheap.',
  },
  {
    icon: 'chat-round-dots',
    title: 'Five of your users',
    body: 'Use each prototype on camera while the team watches.',
  },
  {
    icon: 'shield-check',
    title: 'A delivery partner',
    body: 'Says early when scope and time stop agreeing.',
  },
];

const RHYTHM: readonly ReadDownRow[] = [
  {
    icon: 'clock-circle',
    title: 'Weekly review',
    body: 'One hour, the whole team, the work on screen and every open decision named.',
  },
  {
    icon: 'notebook',
    title: 'Written notes',
    body: 'What was decided, by whom, and what changes because of it.',
  },
  {
    icon: 'graph-up',
    title: 'Measured releases',
    body: 'Every release ships against a measure agreed before the work began.',
  },
  {
    icon: 'refresh',
    title: 'A monthly reset',
    body: 'Scope, risks and the next month planned again from what the last one showed.',
  },
];

const SYSTEM: readonly ReadDownRow[] = [
  {
    icon: 'widget',
    title: 'Components',
    body: 'Built once in code and design, each with an owner and a version.',
  },
  {
    icon: 'ruler-pen',
    title: 'Tokens',
    body: 'Every colour and distance named, so a rebrand is an edit.',
  },
  {
    icon: 'monitor',
    title: 'A living reference',
    body: 'One site where design, code and guidance agree on every part.',
  },
];

/* ── D-faq ───────────────────────────────────────────────────────────────────────────────────
   Questions ≤ 12 words, one line at the body measure; answers ≤ 80 words, the first one open.
   Five at most, four with a CtaRow: the ceilings re-derived from the Accordion as it renders. */
const FAQ_LONG: readonly AccordionItem[] = [
  {
    question: 'How does an engagement start?',
    answerHtml:
      '<p>With a thirty-minute call about the decision you need to make, then a short written proposal: what we would look at, who we need from your side, and what you would have at the end of the first four weeks.</p>',
  },
  {
    question: 'How large is the team you put on a project?',
    answerHtml:
      '<p>Small on purpose: usually a lead designer and a design engineer, with a researcher for the weeks that need one. Decisions move faster with fewer people in the room, and nobody is learning your product second-hand.</p>',
  },
  {
    question: 'Do you work inside our tools and repositories?',
    answerHtml:
      '<p>Yes. We design in your files, build in your stack and keep the record where your team already looks, so nothing has to be migrated when we leave.</p>',
  },
  {
    question: 'What does the first month cost?',
    answerHtml:
      '<p>It is a fixed fee, agreed before we start, for a fixed scope. You decide on the next phase from what the first month shows, not from a forecast.</p>',
  },
  {
    question: 'Who owns the work when the engagement ends?',
    answerHtml:
      '<p>You do, from the first day: the files, the code, the research and the decision record.</p>',
  },
];

const FAQ_SHORT: readonly AccordionItem[] = [
  {
    question: 'What do you need from us before the first workshop?',
    answerHtml:
      '<p>Access to the product as your customers use it, any research you already hold, and an hour with the person who will make the final call. Everything else we gather in the first week.</p>',
  },
  {
    question: 'How do you measure whether the work succeeded?',
    answerHtml:
      '<p>Against a measure we agree with you before the work begins: a task completed, a ticket count, a time saved. We read it again once real use has settled.</p>',
  },
  {
    question: 'Do you only design, or do you build as well?',
    answerHtml:
      '<p>Both. Our design engineers build production components in your stack, reviewed by your engineers, so the design and the code never drift apart.</p>',
  },
  {
    question: 'Do you sign NDAs and work under our security policies?',
    answerHtml:
      '<p>Yes, before the first call if you need it, and we work inside your access controls rather than around them.</p>',
  },
];

/* ── N contrast ──────────────────────────────────────────────────────────────────────────────
   ≤ 4 items a side, ≤ 14 words each, two lines in a 588 half (§ 1.5). */
const FOR_YOU = {
  heading: 'Right for you if',
  items: [
    'You have a product in use, and a decision about it you cannot settle',
    'Someone on your side can make consequential calls',
    'Your engineers want to be in the room, not handed a file',
    'You would rather see it working than read a strategy deck',
  ],
} as const;

const NOT_FOR_YOU = {
  heading: 'Not the right fit when',
  items: [
    'The brief is visual styling only, with product behaviour out of bounds',
    'The work needs a regulated specialist opinion we do not provide',
    'Nothing realistic about the product or its users can be shared',
    'What you need most is low-cost production capacity',
  ],
} as const;

const NEEDS = {
  heading: 'What the work needs from you',
  items: [
    'Realistic access to the product',
    'Time with people who understand the system',
    'One owner who can resolve the trade-offs',
  ],
} as const;

const NOT_NEEDED = {
  heading: 'What it does not need',
  items: [
    'A finished brief, or a list of screens',
    'A design team of your own',
    'A long procurement before the first week',
  ],
} as const;

const INDEX = [
  ['#d-photo', 'D · one column and a photo'],
  ['#d-cta', 'D · one column and a CtaRow'],
  ['#d-stat', 'D · two columns, stat aside'],
  ['#d-two-cta', 'D · two columns and a CtaRow'],
  ['#d-rail', 'D · photo and the rail texture'],
  ['#faq-long', 'D-faq · five questions'],
  ['#faq-cta', 'D-faq · four and a CtaRow'],
  ['#n-contrast', 'N · contrast, four and four'],
  ['#n-cta', 'N · contrast and a CtaRow'],
  ['#d-tint', 'Surface proof · D on tint'],
] as const;

export default function KitReaddownPage() {
  return (
    <>
      {/* ── Intro ──────────────────────────────────────────────────────────────────────── */}
      <Section density="open">
        <Layout columns={{ lg: [1, 1] }} colGap="section" rowGap="stack" align="end">
          <Layout rowGap="block">
            <p className={t.eyebrow}>UI kit · family D and N</p>
            <h1>Read-down, questions and fit</h1>
            <p className={t.lead}>
              The bands a page reads down: what you receive beside the photograph or the number
              that frames it, the questions people ask before they call, and an honest pair of
              lists that says who the work is for.
            </p>
          </Layout>
          <Layout as="ul" columns={{ md: 2 }} colGap="gutter" rowGap="tight" className={t.uiLg}>
            {INDEX.map(([href, label]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </Layout>
        </Layout>
      </Section>

      {/* ── D · one column, photo aside ───────────────────────────────────────────────── */}
      <Caption id="d-photo" index="D.1" title="One column, photo, three rows">
        The photograph is the band&rsquo;s large thing, so it takes the wide track: the head is
        stacked over the body (a text-only head never splits, owner 7 Oct 2026), and the body
        splits, the rows beside the photo, the photo the rows&rsquo; own height. Both start on
        the first title&rsquo;s line and end on the last rule, from 1024 up. Each glyph is blue.
      </Caption>
      <FoldExempt reason={STACKED_HEAD}>
        <ContentSection
          eyebrow="What you receive"
          heading="What your team keeps"
          headingId="kit-d-photo"
          lead="Everything we make is built to outlast the engagement, and to be read by people who were not in the room."
        >
          <ReadDown rows={KEEP} photo={photo('whiteboard-pair-laptop')} />
        </ContentSection>
      </FoldExempt>

      {/* ── D · one column + CtaRow ───────────────────────────────────────────────────── */}
      <Caption id="d-cta" index="D.2" title="One column, three rows and a CtaRow">
        The photo form closed by a blue link a stack under the rows and the photograph, which
        still end level on the last rule. The CtaRow&rsquo;s rule is off: the ladder&rsquo;s
        last hairline already closes the body (§ 3.1). The foot is paid for with tight air, so
        the band stays inside one viewport.
      </Caption>
      <FoldExempt reason={STACKED_HEAD}>
        <ContentSection
          eyebrow="Product audit"
          heading="What two weeks of audit covers"
          headingId="kit-d-cta"
          /* The foot costs 88 (stack + CtaRow); at standard air the band is 886. Tight air (64) pays
             for it and lands at 822, under the fold, rather than cutting a row or the photo. */
          density="tight"
          lead="A fixed scope, a fixed fee, and a readout your whole team can act on the following Monday."
          footer={
            <CtaRow
              rule={false}
              actions={[{ label: 'See a sample readout', href: ROUTES.uxProductAudit }]}
            />
          }
        >
          <ReadDown rows={AUDIT} photo={photo('pair-laptop-notebook')} />
        </ContentSection>
      </FoldExempt>

      {/* ── D · two columns, stat aside ───────────────────────────────────────────────── */}
      <Caption id="d-stat" index="D.3" title="Two columns, stat aside, six rows">
        One stat-lg figure is the head track&rsquo;s large thing (§ 3.3). Six rows run two
        across at the column step, one list in reading order, each grid row as tall as its
        taller item so the closing rules run level across the seam. Six rows take the h5 step;
        the body stays at body.
      </Caption>
      <ContentSection
        arrangement="beside"
        eyebrow="Who is involved"
        heading="A small team, and yours"
        headingId="kit-d-stat"
        lead="Fewer people in the room means decisions move faster, and nobody learns your product second-hand."
        aside={
          <Stat
            value="6"
            unit="people"
            label="The usual working group: two of ours, and four from your side."
          />
        }
      >
        <ReadDown rows={TEAM} columns={2} />
      </ContentSection>

      {/* ── D · two columns + CtaRow ──────────────────────────────────────────────────── */}
      <Caption id="d-two-cta" index="D.4" title="Two columns, four rows and a CtaRow">
        Two columns with a CtaRow take two rows each (§ 1.4 rule 8). A stat carries the head
        track, so the head and the body end level; the link closes the body a stack under the
        ladder, its rule off.
      </Caption>
      <ContentSection
        arrangement="beside"
        eyebrow="Working rhythm"
        heading="How a week with us runs"
        headingId="kit-d-two-cta"
        lead="A cadence your team can plan around, with every decision written down the day it is made."
        aside={
          <Stat
            value="24"
            unit="hours"
            label="From a decision in the room to the written note in your inbox."
          />
        }
        footer={
          <CtaRow
            rule={false}
            actions={[{ label: 'See how we work', href: ROUTES.howWeWork }]}
          />
        }
      >
        <ReadDown rows={RHYTHM} columns={2} />
      </ContentSection>

      {/* ── D · rail texture ──────────────────────────────────────────────────────────── */}
      <Caption id="d-rail" index="D.5" title="The photo form with the rail texture">
        § 6.3 `rail`, hung off the photograph&rsquo;s end edge: one field of the Tcules grid
        that starts under the image and runs into the margin, 220 wide, blur 120. It never
        passes under a word, and it meets the photo at every width, so the grid reads as coming
        out from behind the image. From 1440 only; at 390 the band renders without it.
      </Caption>
      <FoldExempt reason={STACKED_HEAD}>
        <ContentSection
          eyebrow="Design systems"
          heading="What a system hands over"
          headingId="kit-d-rail"
          lead="Three parts, each one owned, versioned and written down, so the system outlives the project that built it."
        >
          <ReadDown rows={SYSTEM} photo={photo('wireframe-wall')} rail />
        </ContentSection>
      </FoldExempt>

      {/* ── D-faq · seven ─────────────────────────────────────────────────────────────── */}
      <Caption id="faq-long" index="D-faq.1" title="Five questions, centred">
        A centred H-title over the Accordion at the body measure, centred as a block; the
        questions stay start-aligned inside it, the first answer open. The ceiling is five, not
        § 1.4&rsquo;s seven: an Accordion row measures 77, not 64, and seven rows with the first
        open run the band to 960 (brand-amendments, cmp-readdown). No large thing by declaration
        (§ 3.3), so an image band always follows, as here.
      </Caption>
      <ContentSection
        align="center"
        eyebrow="Before you call"
        heading="Questions we are asked first"
        headingId="kit-faq-long"
      >
        <ContentSectionText>
          <Accordion items={FAQ_LONG} />
        </ContentSectionText>
      </ContentSection>
      <Banner
        eyebrow="The studio"
        heading="Answers are easier in person"
        headingId="kit-faq-long-after"
        lead="Most first calls end at a whiteboard. Bring the decision you are stuck on, and we will draw it with you."
        image={photo('sticky-wall-soft-focus')}
      />

      {/* ── D-faq · five + CtaRow ─────────────────────────────────────────────────────── */}
      <Caption id="faq-cta" index="D-faq.2" title="Four questions and a CtaRow">
        Four questions at most with a CtaRow (five with it ran the band to 844). The row is
        centred and capped at the body measure under the centred head, its rule off under the
        accordion&rsquo;s last hairline. The image band follows.
      </Caption>
      <ContentSection
        align="center"
        eyebrow="Working together"
        heading="What teams ask before starting"
        headingId="kit-faq-cta"
        footer={
          <CtaRow
            align="center"
            rule={false}
            actions={[{ label: 'Ask us directly', href: ROUTES.contact }]}
          />
        }
      >
        <ContentSectionText>
          <Accordion items={FAQ_SHORT} />
        </ContentSectionText>
      </ContentSection>
      <Banner
        form="beside"
        eyebrow="First weeks"
        heading="We start by listening"
        headingId="kit-faq-cta-after"
        lead="The first week is interviews and the product as your customers meet it, before anyone opens a design file."
        actions={
          <CtaRow
            rule={false}
            actions={[{ label: 'See how we work', href: ROUTES.howWeWork }]}
          />
        }
        image={photo('workshop-hands-writing')}
      />

      {/* ── N · contrast ──────────────────────────────────────────────────────────────── */}
      <Caption id="n-contrast" index="N.1" title="Contrast, four and four">
        The approved Fit, promoted to the Contrast pattern unchanged in look: two lists in peer
        halves at the column step, each opening on a strong rule. The glyph carries the
        polarity, never colour alone: the check is blue, the cross quiet ink, both at xl.
      </Caption>
      <ContentSection eyebrow="Fit" heading="Who this work is for" headingId="kit-n-contrast">
        <Contrast yes={FOR_YOU} no={NOT_FOR_YOU} />
      </ContentSection>

      {/* ── N · contrast + CtaRow ─────────────────────────────────────────────────────── */}
      <Caption id="n-cta" index="N.2" title="Contrast and a CtaRow">
        Three and three, then a CtaRow a stack under the pair with a note on what the link is
        for. Its rule is off: each list&rsquo;s last hairline already closes the body.
      </Caption>
      <ContentSection
        eyebrow="Before the first call"
        heading="What we need from you"
        headingId="kit-n-cta"
        footer={
          <CtaRow
            rule={false}
            note="Not sure which side you are on? A thirty-minute call usually settles it."
            actions={[{ label: 'Book a call', href: ROUTES.contact }]}
          />
        }
      >
        <Contrast yes={NEEDS} no={NOT_NEEDED} />
      </ContentSection>

      {/* ── Surface proof ─────────────────────────────────────────────────────────────── */}
      <Caption id="d-tint" index="Proof" title="D on tint">
        Surface proof — on pages, tint is the proof band only (§ 1.7). The rows&rsquo; rules,
        glyphs and inks, and the stat&rsquo;s mark, restate themselves for the deeper ground.
      </Caption>
      <ContentSection
        arrangement="beside"
        surface="tint"
        eyebrow="After release"
        heading="What we measure, and when"
        headingId="kit-d-tint"
        lead="Three readings agreed before the work starts, taken again once real use has settled."
        aside={
          <Stat
            value="90"
            unit="days"
            label="After release, when every measure is read a second time."
          />
        }
      >
        <ReadDown
          rows={[
            {
              icon: 'graph-up',
              title: 'Task completion',
              body: 'The share of people who finish the job the screen exists for, without help.',
            },
            {
              icon: 'clock-circle',
              title: 'Time on the task',
              body: 'How long the job takes now, against the same job before the change shipped.',
            },
            {
              icon: 'question-circle',
              title: 'Questions to support',
              body: 'The tickets the change was meant to remove, counted the same way each month.',
            },
          ]}
        />
      </ContentSection>
    </>
  );
}
