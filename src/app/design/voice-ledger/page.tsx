import Link from 'next/link';

import { Layout, Section } from '@/components';
import { VoiceLedger } from '@/patterns';
import { ROUTES } from '@/lib/routes';

import { Variation } from '../_specimen/Variation';
import t from '../_specimen/typeroles.module.css';

/**
 * /design/voice-ledger — complaints in the customer's words, each answered by where we start
 * (product-design round 6, 11 Oct 2026; page-mapping § 23). Every arrangement: five rows (the
 * shape), a lead under the heading, a reply carrying a link, a complaint long enough to wrap, three
 * rows (the floor), and the paper and tint grounds. Sample words at the corpus's lengths.
 */

const FIVE = [
  {
    voice: '"Customers keep getting stuck."',
    reply:
      'We watch how people really use the product, then redesign the steps that trip them up.',
  },
  {
    voice: '"The product has grown messy."',
    reply: 'We reorganise its structure and navigation.',
  },
  {
    voice: '"We want to test an idea before building it."',
    reply: 'We prototype it and put it in front of real users.',
  },
  {
    voice: '"Every screen looks slightly different."',
    reply: 'We define shared patterns your team can reuse.',
  },
  {
    voice: '"What ships doesn\'t match the design."',
    reply: 'We work in code with your developers until it does.',
  },
];

export default function VoiceLedgerSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <p className={t.eyebrow}>Pattern · tier 2</p>
          <h1>VoiceLedger</h1>
          <p className={t.lead}>
            The reader knows what is going wrong before they know which service they need. So
            the complaint, in their own words, is the band&rsquo;s large thing (upright sans at
            h4, its opening quote mark hung into the margin) down one edge on hairlines, and
            where we start is the reply beside it, no arrow, its first line on the
            complaint&rsquo;s first baseline (Layout{' '}
            <code>align=&quot;first-baseline&quot;</code>). Quote marks and apostrophes are
            typeset; the words are as authored.
          </p>
        </Layout>
      </Section>

      <Variation
        id="five"
        title="1 · Five complaints — the shape"
        note="From 1024 [7, 5]: complaints on one line where they fit, replies beside them. Below 1024 each reply under its complaint."
      />
      <VoiceLedger
        heading="Where we start depends on what's going wrong"
        headingId="vlg-five"
        items={FIVE}
        note={
          <p className={t.body}>A closing line under the rows (`note`), in the same band.</p>
        }
      />

      <Variation
        id="drawn"
        title="1b · Drawn — each row closes on its fix"
        note="`scene` on every row (owner, 26 Oct 2026, product-design page): the complaint, the answer, then the complaint drawn as the problem turning into its fix, at --vlg-art-width. Every row stays in view at once. Below 1024 the complaint heads the row and the answer and drawing share the next line; below 768 they stack."
      />
      <VoiceLedger
        heading="Where we start depends on what's going wrong"
        headingId="vlg-drawn"
        items={FIVE.map((item, index) => ({
          ...item,
          scene: (
            [
              'symptom-stuck',
              'symptom-messy',
              'symptom-test',
              'symptom-consistent',
              'symptom-match',
            ] as const
          )[index],
        }))}
      />

      <Variation
        id="lead-link-wrap"
        title="2 · A lead, a reply with a link, a complaint that wraps"
        note="The lead sits a block under the heading. A long complaint wraps on the title measure and the reply still opens on its first line. Replies take inline content, so a link renders in place."
      />
      <VoiceLedger
        heading="Where the mismatch shows up"
        headingId="vlg-mixed"
        lead="Four things teams say before they ask us to look."
        items={[
          {
            voice:
              '"Screens pass design review, then fail the first time someone uses a keyboard."',
            reply: 'Focus order and keyboard behaviour were never in the spec.',
          },
          {
            voice: '"We keep arguing about pixels."',
            reply: (
              <>
                Designers flag spacing; developers point to limits nobody wrote down.{' '}
                <Link href={ROUTES.audits}>See the audits</Link>.
              </>
            ),
          },
          {
            voice: '"It worked in the prototype."',
            reply: "Users can't finish the real flow.",
          },
        ]}
      />

      <Variation
        id="tint"
        title="3 · Tint ground"
        note="Every --vlg-* token restated on tint: replies step to neutral-800, the rules to neutral-400."
      />
      <VoiceLedger
        heading="Where we start depends on what's going wrong"
        headingId="vlg-tint"
        items={FIVE.slice(0, 3)}
        surface="tint"
      />
    </>
  );
}
