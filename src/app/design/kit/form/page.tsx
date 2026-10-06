import Link from 'next/link';

import { Button, Layout, Media, Section, Texture, TextureShape } from '@/components';
import { ContentSection, CtaSection, EnquiryForm, type EnquiryContextBase } from '@/patterns';
import { HEAD_TRACK, MEDIA_SPLIT } from '@/lib/image-sizes';
import { getKitPhoto } from '@/lib/photos';
import { ENDPOINTS, ROUTES } from '@/lib/routes';

import { Rehearse } from '../../_specimen/Rehearse';
import { Specimen, specimenStyles as s } from '../../_specimen/Specimen';

/**
 * The form family (kit `cmp-form`): every composition the kit asks a form to sit in, laid out as
 * a showcase page — an intro band, then each variation as a titled band — rather than a dump.
 *
 * Every band is a real pattern composed with real props: CtaSection's split and offer, and
 * ContentSection's media, centred and beside arrangements, each holding an EnquiryForm. Nothing on
 * this route arranges a form by hand. Showcase copy is inline (visual-direction § 8.4); photographs
 * come from the kit registry, one temperature family (warm + neutral, § 5.5), all quiet.
 *
 * Posts go to the proving ground's own endpoint; `?outcome=` picks what it answers.
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
  { id: 'studio', title: 'Compact, beside a studio photograph' },
  { id: 'stock', title: 'Compact, beside a stock photograph, flipped' },
  { id: 'centred', title: 'Compact under a centred head' },
  { id: 'beside', title: 'Compact beside its head' },
  { id: 'offer', title: 'The offer, with the compact form' },
  { id: 'variants', title: 'Every field set' },
  { id: 'states', title: 'Error and success' },
] as const;

type VariationId = (typeof VARIATIONS)[number]['id'];

/** A variation's title band: index numeral, name and what to look for, over a hairline. */
function Plate({ id, note }: { id: VariationId; note: string }) {
  const index = VARIATIONS.findIndex((v) => v.id === id);
  const title = `${String(index + 1).padStart(2, '0')} · ${VARIATIONS[index]?.title ?? id}`;
  return (
    <Section id={id} density="tight">
      <Specimen title={title} note={note}>
        {null}
      </Specimen>
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
                brings no layout of its own: it sizes to the track it is given.
              </p>
            </Layout>
            <Layout as="ol" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="tight">
              {VARIATIONS.map((v, i) => (
                <li key={v.id}>
                  <a href={`#${v.id}`}>
                    {String(i + 1).padStart(2, '0')} · {v.title}
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
        note="CtaSection split (archetype L): the head, one paragraph and three two-line points in the wide track; the full enquiry form, with its scheduling link, in the form column. Paper, as on a page's last band."
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
      />

      {/* ── 02 · L beside a studio photo ────────────────────────────────────────────── */}
      <Plate
        id="studio"
        note="ContentSection media, photo at the start: a 4:5 photograph in 477 (studio-sticky-board-ux, the one studio photo that resolves at 4:5, § 5.4) beside an H-title and the compact form in 667. The copy column is centred on the photo: a head and a form, with no blocks between them, do not stretch (§ 3.2)."
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
        note="The same composition with the photo at the end (a quiet stock photograph, hand-sketch-wireframe, 2.7× at 4:5). Consecutive media bands alternate side. Below 1024 the photo sits above the copy at 4:3 in both."
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
        note="ContentSection, align center (H-compact): the head centred on its measures, the compact form centred beneath it as a block at its own 667 measure, its fields start-aligned."
      />
      <ContentSection
        align="center"
        eyebrow="Not sure where to start?"
        heading="Ask us one question"
        headingId="centred-heading"
        lead="Describe where the product is today. We answer with what we would look at first, and whether we are the right team."
      >
        <EnquiryForm variant="compact" action={action()} context={context('kit-centred')} />
      </ContentSection>

      {/* ── 05 · Compact standalone, beside head ────────────────────────────────────── */}
      <Plate
        id="beside"
        note="ContentSection beside: the head and a 3:2 photo aside (studio-whiteboard-crit) in 381, the compact form in the 763 body track, stopping at its 667 measure. The head track carries the band's image, so the form column stays clean."
      />
      <ContentSection
        arrangement="beside"
        eyebrow="Design partnership"
        heading="A second pair of hands"
        headingId="beside-heading"
        lead="For teams with a design lead and more roadmap than people. Tell us what is slipping."
        aside={
          <Media image={getKitPhoto('studio-whiteboard-crit')} ratio="3/2" sizes={HEAD_TRACK} />
        }
      >
        <EnquiryForm variant="compact" action={action()} context={context('kit-beside')} />
      </ContentSection>

      {/* ── 06 · Offer with the compact form ────────────────────────────────────────── */}
      <Plate
        id="offer"
        note={`CtaSection arrangement="offer" with form={<EnquiryForm variant="compact" />}: the mid-page ask, tight, its heading one rung down; the form under the lede beside one quiet 4:3 photograph, then the three points as a strip. No CtaSection change: the form slot takes any node.`}
      />
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
          /* The form row of the offer, composed here: the compact form in 7 and one quiet 4:3
             photograph in 5 (§ 5.2: an ask takes one quiet photograph), centred on the form. The
             slot takes any node, so the offer needs no new prop; below 1024 the photo sits under
             the form, as K's photo sits under its copy (§ 3.7). */
          <Layout columns={{ lg: [7, 5] }} colGap="section" rowGap="stack" align="center">
            <EnquiryForm variant="compact" action={action()} context={context('kit-offer')} />
            <Media
              image={getKitPhoto('pair-laptop-notebook')}
              ratio="4/3"
              sizes={MEDIA_SPLIT}
            />
          </Layout>
        }
      />

      {/* ── 07 · Every field set ────────────────────────────────────────────────────── */}
      <Plate
        id="variants"
        note="The four field sets side by side, each at its own measure: enquiry and audit (email, the question, an optional link; 470), compact (name and email as a pair, the question; 667, here in a 572 track), and contact (five fields, the contact page's). A comparison band, so it is taller than a page band may be."
      />
      <div data-fold-exempt="specimen comparison: the four field sets side by side, contact at five fields">
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
            <Specimen
              title="compact"
              note="Three fields and the submit, ≤ 400 tall; the caption sits beside the submit."
            >
              <EnquiryForm
                variant="compact"
                action={action()}
                context={context('kit-variants')}
              />
            </Specimen>
            <Specimen title="contact" note="Five fields; the contact page is the conversation.">
              <EnquiryForm variant="contact" action={action()} />
            </Specimen>
          </Layout>
        </Section>
      </div>

      {/* ── 08 · Error and success ──────────────────────────────────────────────────── */}
      <Plate
        id="states"
        note="Driven through the real controls on load: the first form blurred empty, the second filled and sent to an endpoint that fails, the third sent. On tint, as the surface proof — on pages, tint is the proof band only (§ 1.7)."
      />
      <div data-fold-exempt="specimen comparison: three states side by side; at 390 they stack">
        <Section surface="tint">
          <Layout columns={{ base: 1, lg: 3 }} colGap="gutter" rowGap="column">
            <Specimen
              title="Invalid · blurred empty"
              note="Each message lands in its reserved line."
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
              note="The answers stay; the line beside the submit turns."
            >
              <Rehearse
                submit
                fill={{
                  name: 'Maya Fernandes',
                  email: 'maya@northwind.studio',
                  what_are_you_working_on: 'A billing redesign for a B2B payments product.',
                }}
              >
                <EnquiryForm
                  variant="compact"
                  action={action('error')}
                  context={context('kit-states')}
                />
              </Rehearse>
            </Specimen>
            <Specimen title="Success · sent" note="The form gives way to the next step.">
              <Rehearse
                submit
                fill={{
                  name: 'Maya Fernandes',
                  email: 'maya@northwind.studio',
                  what_are_you_working_on: 'A billing redesign for a B2B payments product.',
                }}
              >
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
