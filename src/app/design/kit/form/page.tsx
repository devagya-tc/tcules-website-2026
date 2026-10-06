import Link from 'next/link';

import { Button, Icon, Layout, Section, Texture, TextureShape } from '@/components';
import { ContentSection, CtaSection, EnquiryForm, type EnquiryContextBase } from '@/patterns';
import { getKitPhoto } from '@/lib/photos';
import { ENDPOINTS, ROUTES } from '@/lib/routes';

import { Rehearse } from '../../_specimen/Rehearse';
import { Specimen, specimenStyles as s } from '../../_specimen/Specimen';
import t from '../../_specimen/typeroles.module.css';

/**
 * The form family (kit `cmp-form`): every composition the kit asks a form to sit in, laid out as
 * a showcase page — an intro band, then each variation as a titled band — rather than a dump.
 *
 * Every band is a real pattern composed with real props: CtaSection's split and offer, and
 * ContentSection's media, centred and beside arrangements, each holding an EnquiryForm. Nothing on
 * this route arranges a form by hand: the offer is CtaSection's own offer-with-form shape, the
 * compact form handed to its `form` slot and nothing else. Showcase copy is inline (visual-direction § 8.4); photographs
 * come from the kit registry, one temperature family (warm + neutral, § 5.5).
 *
 * Posts go to the proving ground's own endpoint; `?outcome=` picks what it answers. The error-state
 * specimen's send answers 500 on purpose, which is the one console error the page logs.
 */

const action = (outcome: 'success' | 'error' | 'pending' = 'success') =>
  `${ENDPOINTS.enquiryDesign}?outcome=${outcome}`;

const context = (placement: string): EnquiryContextBase => ({
  originRoute: ROUTES.designKitForm,
  placement,
  family: 'kit',
  serviceOrAudit: 'kit-form',
  referrer: '',
  campaign: '',
});

const VARIATIONS = [
  { id: 'close', title: 'The close, beside its promise' },
  { id: 'studio', title: 'Compact beside a studio photograph' },
  { id: 'stock', title: 'Compact beside a stock photograph' },
  { id: 'centred', title: 'Compact under a centred head' },
  { id: 'beside', title: 'Compact beside its head' },
  { id: 'offer', title: 'The offer, with the compact form' },
  { id: 'full-sets', title: 'Enquiry and audit' },
  { id: 'contact', title: 'Contact, and what it becomes' },
  { id: 'states', title: 'Error and success' },
] as const;

type VariationId = (typeof VARIATIONS)[number]['id'];

const indexOf = (id: VariationId) =>
  String(VARIATIONS.findIndex((v) => v.id === id) + 1).padStart(2, '0');

const FILLED = {
  name: 'Maya Fernandes',
  email: 'maya@northwind.studio',
  what_are_you_working_on: 'A billing redesign for a B2B payments product.',
};

const FILLED_CONTACT = {
  clientName: 'Maya Fernandes',
  clientCompany: 'Northwind',
  clientEmail: 'maya@northwind.studio',
  clientContact: '+44 20 7946 0000',
  clientComments: 'We would like to talk about a design partnership from January.',
};

/* What happens after an enquiry, said ONCE: the close's points promise it, and the success view
   keeps the promise by reading the same list (EnquiryForm `nextSteps`). It used to be a second
   copy inside the pattern, and the two had already drifted. */
const ENQUIRY_STEPS = [
  {
    label: 'A reply within a working day',
    detail: 'From the person who would lead the work, with the questions we would ask first.',
  },
  {
    label: 'A thirty-minute call',
    detail: 'What exists, what is stuck, and what a first fortnight would change.',
  },
  {
    label: 'A written proposal',
    detail: 'Scope, team and timeline on two pages. No deck, and no obligation.',
  },
] as const;

/* A plain message promises less than an enquiry, so contact says less: no proposal. */
const CONTACT_STEPS = [
  {
    label: 'A reply within a working day',
    detail: 'From a person at the studio, not a queue.',
  },
  {
    label: 'A call, if it helps',
    detail: 'Thirty minutes at a time that suits you. Nothing to prepare.',
  },
] as const;

/* The compact ask promises the first step only. */
const COMPACT_STEPS = [
  {
    label: 'A reply within a working day',
    detail: 'With what we would look at first, and whether we are the right team.',
  },
] as const;

/** The L close's texture, § 6.3 `closing`: under the copy column's foot, the form column clean. */
function ClosingTexture() {
  return (
    <Texture>
      <TextureShape bottom={-260} left={-120} width="44%" height={320} blur={200} />
    </Texture>
  );
}

/**
 * A variation's title band: the index numeral in blue over its name (an h2 at h3 scale; the band
 * below brings its own h2, so the outline never steps h1 → h3), and what to look for beside it.
 */
function Plate({ id, note }: { id: VariationId; note: string }) {
  const title = VARIATIONS.find((v) => v.id === id)?.title ?? id;
  return (
    <Section id={id} density="tight">
      <Layout
        className={s.spec}
        columns={{ lg: [1, 2] }}
        colGap="section"
        rowGap="text"
        align="end"
      >
        <Layout rowGap="tight">
          <p className={`${t.index} ${s.accent}`}>{indexOf(id)}</p>
          <h2 className={t.h3}>{title}</h2>
        </Layout>
        <p className={s.specNote}>{note}</p>
      </Layout>
    </Section>
  );
}

export default function KitFormPage() {
  return (
    <>
      {/* ── Intro ───────────────────────────────────────────────────────────────────── */}
      <Section density="open">
        {/* The grid field fills the empty end of the band, clear of the title's 7 track, and
            feathers off the top edge; it never reaches a form (every form on this page is in a
            band of its own). */}
        <Texture>
          <TextureShape
            kind="ellipse"
            top={-220}
            right={-160}
            width="40%"
            height={420}
            blur={200}
          />
        </Texture>
        <Layout columns={{ lg: [7, 5] }} colGap="section" rowGap="stack">
          <Layout rowGap="stack">
            <Layout rowGap="block">
              <p className={s.eyebrow}>UI kit · Forms</p>
              <h1>Every ask, in the shape its page needs</h1>
              <p>
                One form, four field sets. The close sits beside the promise it makes. A short
                form sits beside a quiet photograph. A compact form drops into any band and
                brings no layout of its own: it fills the track it is given.
              </p>
            </Layout>
            <Layout as="ol" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="tight">
              {VARIATIONS.map((v) => (
                <li key={v.id}>
                  <a href={`#${v.id}`}>
                    {indexOf(v.id)} · {v.title}
                  </a>
                </li>
              ))}
            </Layout>
          </Layout>
        </Layout>
      </Section>

      {/* ── 01 · L close ────────────────────────────────────────────────────────────── */}
      <Plate
        id="close"
        note="CtaSection split (archetype L): the head, one paragraph and three points in 7; the full enquiry form, with its scheduling link, filling 5. Paper, as on a page's last band, with the closing texture under the copy column's foot (§ 6.3) and the form column clean. The form's success view reads the same three points, so the promise is said once."
      />
      <CtaSection
        eyebrow="Start a project"
        heading="Tell us what you are shipping"
        body={[
          'A designer reads every enquiry, not a queue. Here is what happens after you send it.',
        ]}
        points={ENQUIRY_STEPS}
        form={
          <EnquiryForm
            action={action()}
            context={context('kit-close')}
            scheduleHref={ROUTES.contact}
            nextSteps={ENQUIRY_STEPS}
          />
        }
        texture={<ClosingTexture />}
      />

      {/* ── 02 · L beside a studio photo ────────────────────────────────────────────── */}
      <Plate
        id="studio"
        note="ContentSection media, photo at the start: the 4:5 photograph in 477 beside an H-title, its lead and the compact form filling 667. studio-sticky-board-ux is the one studio photo that resolves at 4:5 (§ 5.4), as the brief asks. It measures quiet (mean saturation 0.255, mostly white board) but its notes read loud; grading is banned, so the lever is the crop: anchored low, on the hand, the marker and the blue writing. Compare it with 03 before choosing the default."
      />
      {/* The photo's focal point is moved DOWN for this placement (0.4 → 0.9). At 4:5 the master has
          only 96px of vertical slack, so it changes little at 1440; below 1024 ContentSection crops
          it 4:3, and there the low anchor keeps the hand, the marker and the blue handwriting and
          drops two rows of notes. A tighter crop than that is a new, sub-2× master (§ 5.4) and a
          grade is banned (ch05 § 5), so this is the whole of what the placement can do; the
          remaining loudness is an owner call, flagged in the note above. */}
      <ContentSection
        arrangement="media"
        media={{
          image: { ...getKitPhoto('studio-sticky-board-ux'), focus: { x: 0.3, y: 0.9 } },
        }}
        eyebrow="Write to the studio"
        heading="Bring us the hard part"
        headingId="studio-heading"
        lead="The flow nobody wants to own, the screen support hears about most. Three lines are enough to start."
      >
        <EnquiryForm
          variant="compact"
          action={action()}
          context={context('kit-l-studio')}
          nextSteps={COMPACT_STEPS}
        />
      </ContentSection>

      {/* ── 03 · L beside a stock photo, flipped ────────────────────────────────────── */}
      <Plate
        id="stock"
        note={`The photo at the end (hand-sketch-wireframe, quiet stock at 2.7× for 4:5), and a different form: submit="full", the button across the track with the caption under it, as Executra ends its form. Consecutive media bands alternate side; the form changes shape so the pair is not one composition mirrored.`}
      />
      <ContentSection
        arrangement="media"
        media={{ image: getKitPhoto('hand-sketch-wireframe'), side: 'end' }}
        eyebrow="A short note is enough"
        heading="Start with three lines"
        headingId="stock-heading"
      >
        <EnquiryForm
          variant="compact"
          submit="full"
          action={action()}
          context={context('kit-l-stock')}
          nextSteps={COMPACT_STEPS}
        />
      </ContentSection>

      {/* ── 04 · Compact standalone, centred head ───────────────────────────────────── */}
      <Plate
        id="centred"
        note={`ContentSection, align center (H-compact): the head centred on its measures, the compact form beneath it as a block at its 667 measure (width="measure"), its fields numbered (numbered): the blue numerals are the band's structural mark where it has no photograph, texture or points. The fields stay start-aligned.`}
      />
      <ContentSection
        align="center"
        eyebrow="Not sure where to start?"
        heading="Ask us one question"
        headingId="centred-heading"
        lead="Describe where the product is today. We answer with what we would look at first, and whether we are the right team."
      >
        <EnquiryForm
          variant="compact"
          width="measure"
          numbered
          action={action()}
          context={context('kit-centred')}
          nextSteps={COMPACT_STEPS}
        />
      </ContentSection>

      {/* ── 05 · Compact standalone, beside head ────────────────────────────────────── */}
      <Plate
        id="beside"
        note="ContentSection beside: the head, its lead and two blue ways to reach the studio under it in 381, as Executra pins its contact items, so the head column is a shape and not three lines over a dead quadrant; the compact form, numbered, filling the 763 body track to the band's edge."
      />
      <ContentSection
        arrangement="beside"
        eyebrow="Design partnership"
        heading="A second pair of hands"
        headingId="beside-heading"
        lead="For teams with a design lead and more roadmap than people. Tell us what is slipping and who owns it today."
        actions={
          <Layout rowGap="text" justifyItems="start">
            <Button
              as="a"
              href="mailto:hello@tcules.com"
              emphasis="link"
              tone="primary"
              iconLeft={<Icon name="chat-round-dots" />}
            >
              Write to the studio
            </Button>
            <Button
              as={Link}
              href={ROUTES.contact}
              emphasis="link"
              tone="primary"
              iconLeft={<Icon name="clock-circle" />}
            >
              See available times
            </Button>
          </Layout>
        }
      >
        <EnquiryForm
          variant="compact"
          numbered
          action={action()}
          context={context('kit-beside')}
          nextSteps={COMPACT_STEPS}
        />
      </ContentSection>

      {/* ── 06 · Offer with the compact form ────────────────────────────────────────── */}
      <Plate
        id="offer"
        note={`CtaSection arrangement="offer" with form={<EnquiryForm variant="compact" />}, exactly: the mid-page ask, tight. The lede, then the compact form filling the column (name and email a pair at 608, the question across the band), then the three points as a strip. The page's one wide form: every other placement sets it in a track.`}
      />
      <CtaSection
        arrangement="offer"
        eyebrow="A first read"
        heading="Send us the flow that loses people"
        body={[
          'A designer reads it and replies within a working day: where we would start, and whether a fortnight would move it.',
        ]}
        points={[
          {
            label: 'One flow, end to end',
            detail: 'Sign-up, checkout, or the screen support hears about.',
          },
          {
            label: 'A first read, in writing',
            detail: 'Where people drop, and the likely reason.',
          },
          {
            label: 'A call, if it helps',
            detail: 'Thirty minutes with the designer who read it.',
          },
        ]}
        form={
          <EnquiryForm
            variant="compact"
            action={action()}
            context={context('kit-offer')}
            nextSteps={COMPACT_STEPS}
          />
        }
      />

      {/* ── 07 · Enquiry and audit ──────────────────────────────────────────────────── */}
      <Plate
        id="full-sets"
        note="The two full field sets side by side, each filling its track: email, the question and an optional link, with See available times beside the submit. One width policy for every variant, so the right edges agree."
      />
      <Section>
        <Layout columns={{ base: 1, lg: 2 }} colGap="column" rowGap="column">
          <Specimen title="enquiry" note="Send enquiry, with See available times beside it.">
            <EnquiryForm
              action={action()}
              context={context('kit-variants')}
              scheduleHref={ROUTES.contact}
              nextSteps={ENQUIRY_STEPS}
            />
          </Specimen>
          <Specimen title="audit" note="The audit wording, and the intent field it posts.">
            <EnquiryForm
              variant="audit"
              action={action()}
              context={{ ...context('kit-variants'), intent: 'free-audit' }}
              scheduleHref={ROUTES.contact}
            />
          </Specimen>
        </Layout>
      </Section>

      {/* ── 08 · Contact, and its success ───────────────────────────────────────────── */}
      <Plate
        id="contact"
        note="The five-field contact set, its fields paired (name with company, email with phone) so it fits a band, beside the same form sent: the thanks and the caller's two steps. A plain message promises less than an enquiry, so it says less."
      />
      <Section>
        <Layout columns={{ base: 1, lg: 2 }} colGap="column" rowGap="column">
          <Specimen
            title="contact"
            note="Five fields in three rows; the contact page is the conversation."
          >
            <EnquiryForm
              variant="contact"
              action={action()}
              scheduleHref={ROUTES.contact}
              nextSteps={CONTACT_STEPS}
            />
          </Specimen>
          <Specimen title="contact · sent" note="The thanks, then what happens next.">
            <Rehearse submit fill={FILLED_CONTACT}>
              <EnquiryForm
                variant="contact"
                action={action()}
                scheduleHref={ROUTES.contact}
                nextSteps={CONTACT_STEPS}
              />
            </Rehearse>
          </Specimen>
        </Layout>
      </Section>

      {/* ── 09 · Error and success ──────────────────────────────────────────────────── */}
      <Plate
        id="states"
        note="Driven through the real controls on load: the first form blurred, empty and malformed; the second filled and sent to an endpoint that fails (the page's one console 500 is that send, on purpose); the third sent. On tint, as the surface proof: on pages, tint is the proof band only (§ 1.7)."
      />
      <div data-fold-exempt="specimen comparison: three states side by side, which at 390 stack past the phone limit">
        <Section surface="tint" density="tight">
          <Layout columns={{ base: 1, lg: 3 }} colGap="gutter" rowGap="column">
            <Specimen
              title="Invalid · blurred, empty and malformed"
              note="Name and question empty, email malformed; each message lands in its reserved line."
            >
              <Rehearse blur fill={{ email: 'maya@' }}>
                <EnquiryForm
                  variant="compact"
                  action={action()}
                  context={context('kit-states')}
                />
              </Rehearse>
            </Specimen>
            <Specimen
              title="Error · send failed"
              note="The answers stay; the line under the submit turns."
            >
              <Rehearse submit fill={FILLED}>
                <EnquiryForm
                  variant="compact"
                  action={action('error')}
                  context={context('kit-states')}
                />
              </Rehearse>
            </Specimen>
            <Specimen
              title="Success · sent"
              note="The form gives way to the thanks, then the one step the compact ask promises."
            >
              <Rehearse submit fill={FILLED}>
                <EnquiryForm
                  variant="compact"
                  action={action()}
                  context={context('kit-states')}
                  nextSteps={COMPACT_STEPS}
                />
              </Rehearse>
            </Specimen>
          </Layout>
        </Section>
      </div>

      <Section density="tight">
        <Button as={Link} href={ROUTES.design} emphasis="link" tone="primary">
          Back to the proving ground
        </Button>
      </Section>
    </>
  );
}
