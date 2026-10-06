import Link from 'next/link';

import { Button, Layout, Media, Section, Texture, TextureShape } from '@/components';
import { ContentSection, CtaSection, EnquiryForm, type EnquiryContextBase } from '@/patterns';
import { MEDIA_SPLIT } from '@/lib/image-sizes';
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
 * this route arranges a form by hand. Showcase copy is inline (visual-direction § 8.4); photographs
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
  { id: 'short-sets', title: 'Compact and contact' },
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
        note="CtaSection split (archetype L): the head, one paragraph and three points in 7; the full enquiry form, with its scheduling link, filling 5. Paper, as on a page's last band, with the closing texture under the copy column's foot (§ 6.3) and the form column clean."
      />
      <CtaSection
        eyebrow="Start a project"
        heading="Tell us what you are shipping"
        body={[
          'A designer reads every enquiry, not a queue. Here is what happens after you send it.',
        ]}
        points={[
          {
            label: 'A reply within a working day',
            detail:
              'From the person who would lead the work, with the questions we would ask first.',
          },
          {
            label: 'A thirty-minute call',
            detail: 'What exists, what is stuck, and what a first fortnight would change.',
          },
          {
            label: 'A written proposal',
            detail: 'Scope, team and timeline on two pages. No deck, and no obligation.',
          },
        ]}
        form={
          <EnquiryForm
            action={action()}
            context={context('kit-close')}
            scheduleHref={ROUTES.contact}
          />
        }
        texture={<ClosingTexture />}
      />

      {/* ── 02 · L beside a studio photo ────────────────────────────────────────────── */}
      <Plate
        id="studio"
        note="ContentSection media, photo at the start: the 4:5 photograph in 477 beside an H-title and the compact form filling 667. studio-sticky-board-ux is the one studio photo that resolves at 4:5 (§ 5.4), as the brief asks. It is tagged quiet (saturation 0.255), but its pink, yellow and cyan notes read loud beside a calm form: compare it with 03 before choosing the default."
      />
      <ContentSection
        arrangement="media"
        media={{ image: getKitPhoto('studio-sticky-board-ux') }}
        eyebrow="Write to the studio"
        heading="Bring us the hard part"
        headingId="studio-heading"
      >
        <EnquiryForm variant="compact" action={action()} context={context('kit-l-studio')} />
      </ContentSection>

      {/* ── 03 · L beside a stock photo, flipped ────────────────────────────────────── */}
      <Plate
        id="stock"
        note="The same composition flipped, the photo at the end: hand-sketch-wireframe, quiet stock at 2.7× for 4:5. Consecutive media bands alternate side. Below 1024 the photo sits above the copy at 4:3, and the form fills the same track, so the two share both edges."
      />
      <ContentSection
        arrangement="media"
        media={{ image: getKitPhoto('hand-sketch-wireframe'), side: 'end' }}
        eyebrow="A short note is enough"
        heading="Start with three lines"
        headingId="stock-heading"
      >
        <EnquiryForm variant="compact" action={action()} context={context('kit-l-stock')} />
      </ContentSection>

      {/* ── 04 · Compact standalone, centred head ───────────────────────────────────── */}
      <Plate
        id="centred"
        note={`ContentSection, align center (H-compact): the head centred on its measures, the compact form beneath it as a block. The one placement that opts into the form's 667 measure (width="measure"), because a centred body row is the whole column. The fields stay start-aligned.`}
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
          action={action()}
          context={context('kit-centred')}
        />
      </ContentSection>

      {/* ── 05 · Compact standalone, beside head ────────────────────────────────────── */}
      <Plate
        id="beside"
        note="ContentSection beside: the head and its lead in 381, the compact form filling the 763 body track, so its right edge is the band's. No aside photograph: under the lead it read as an afterthought and hung 150px below the form."
      />
      <ContentSection
        arrangement="beside"
        eyebrow="Design partnership"
        heading="A second pair of hands"
        headingId="beside-heading"
        lead="For teams with a design lead and more roadmap than people. Tell us what is slipping and who owns it today; we will say how we would join, and how soon."
      >
        <EnquiryForm variant="compact" action={action()} context={context('kit-beside')} />
      </ContentSection>

      {/* ── 06 · Offer with the compact form ────────────────────────────────────────── */}
      <Plate
        id="offer"
        note={`CtaSection arrangement="offer" with form={<EnquiryForm variant="compact" />}: the mid-page ask, tight, its heading one rung down. The form in 7 beside one quiet, product-specific 4:3 photograph in 5 (screen-over-shoulder, a design-tool canvas), the two one height, then the three points as a strip. Below 1024 the photo sits under the lede at 16:9 and the form follows it unbroken into the points.`}
      />
      {/* The form row is composed in the slot: CtaSection's media slot is the K offer's, with
          actions, and its type refuses a photo beside a form (cmp-cta). If the offer-with-form-and-
          photo recurs on pages, it belongs in CtaSection as that slot's second shape, not in every
          call site: recorded for cmp-cta, whose file this is.

          Three points: at 768 the strip is CtaSection's two tracks from md, so the third point
          starts a second row there. cmp-cta declined three at 768, where a 213px track is
          narrower than the numeral's row (CtaSection.tsx, shape "grid"). */}
      <CtaSection
        arrangement="offer"
        eyebrow="Free audit"
        heading="A review of one flow, free"
        body={[
          'Send us the flow that loses people. Within a week you get a written read of where, and why.',
        ]}
        points={[
          {
            label: 'One flow, end to end',
            detail: 'Sign-up, checkout, or the screen support hears about.',
          },
          {
            label: 'Findings, ranked',
            detail: 'What to fix first, and what it is likely to move.',
          },
          {
            label: 'A call to walk it',
            detail: 'Thirty minutes with the designer who wrote it.',
          },
        ]}
        form={
          /* Photo FIRST in the DOM and [5, 7] mirrored from 1024, so the form takes 7 at the start
             and the photo 5 at the end, while below 1024 the photo sits under the lede rather than
             between the form and the points. The photo is decorative (alt=""), so the order
             carries no meaning. Centred on each other: the 4:3 at 477 is 358, within a line of the
             compact form's 369. */
          <Layout
            columns={{ lg: [5, 7] }}
            reverse={{ lg: true }}
            colGap="section"
            rowGap="stack"
            align="center"
          >
            <Media
              image={getKitPhoto('screen-over-shoulder')}
              ratio={{ base: '16/9', lg: '4/3' }}
              sizes={MEDIA_SPLIT}
            />
            <EnquiryForm variant="compact" action={action()} context={context('kit-offer')} />
          </Layout>
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

      {/* ── 08 · Compact and contact ────────────────────────────────────────────────── */}
      <Plate
        id="short-sets"
        note="Compact (name and email as a pair, then the question, ≤ 400 tall) beside contact (five fields). Contact is taller than a page band may be: it is the contact page's whole body, never a band on another page."
      />
      <div data-fold-exempt="specimen comparison: the five-field contact set is the contact page's body, not a band">
        <Section>
          <Layout columns={{ base: 1, lg: 2 }} colGap="column" rowGap="column">
            <Specimen
              title="compact"
              note="Three fields and the submit; the caption beside it, or under it in a narrow track."
            >
              <EnquiryForm variant="compact" action={action()} context={context('kit-variants')} />
            </Specimen>
            <Specimen title="contact" note="Five fields; the contact page is the conversation.">
              <EnquiryForm variant="contact" action={action()} />
            </Specimen>
          </Layout>
        </Section>
      </div>

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
              note="The form gives way to the thanks, then what happens next."
            >
              <Rehearse submit fill={FILLED}>
                <EnquiryForm
                  variant="compact"
                  action={action()}
                  context={context('kit-states')}
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
