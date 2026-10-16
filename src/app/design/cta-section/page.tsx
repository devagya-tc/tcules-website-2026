import { Fragment, type ReactNode } from 'react';

import { Cluster, Icon, Layout, Media, Prose, Section } from '@/components';
import {
  CtaSection,
  EnquiryForm,
  Proof,
  type CtaIconPoint,
  type CtaPoint,
  type ProofFigure,
} from '@/patterns';
import { getKitPhoto } from '@/lib/photos';
import { ENDPOINTS, ROUTES } from '@/lib/routes';

import { Box, specimenStyles as s } from '../_specimen/Specimen';

const STANDARD_POINTS = [
  { label: 'A 30-minute call', detail: 'We ask what you have tried and what it cost.' },
  { label: 'A written plan', detail: 'You leave with the next decisions in order.' },
  { label: 'A fixed price', detail: 'The scope and the commercial terms arrive together.' },
] as const satisfies readonly CtaPoint[];

/* The K offer beside a photograph sets one-line points (§ 3.4 K): the label alone. */
const K_ICON_POINTS = [
  { icon: 'layers', label: 'Drift between design and code' },
  { icon: 'graph-up', label: 'Adoption, product by product' },
  { icon: 'checklist', label: 'A fix list in payback order' },
] as const satisfies readonly CtaIconPoint[];

const SIX_POINTS = [
  ...STANDARD_POINTS,
  { label: 'A named team', detail: 'You know who will do the work before it starts.' },
  { label: 'A delivery window', detail: 'Dates are part of the recommendation.' },
  { label: 'A clear handoff', detail: 'The work stays usable after the engagement.' },
] as const satisfies readonly CtaPoint[];

const SPLIT_BODY = [
  'We reply to every enquiry with a named person and a date, not an acknowledgement.',
  'Bring the problem as it is. We will help decide what kind of project it needs to become.',
] as const;

const OPEN_BODY = [
  'Start with the outcome you need. We will help choose the shortest useful route to it.',
] as const;

const OFFER_BODY = [
  'A focused audit finds the friction worth fixing before a larger programme begins.',
] as const;

const FORM_CONTEXT = {
  originRoute: ROUTES.designCtaSection,
  placement: 'component-specimen',
  family: 'design-system',
  serviceOrAudit: 'cta-section',
  referrer: '',
  campaign: '',
} as const;

const ENQUIRY_FORM_PROPS = {
  action: `${ENDPOINTS.enquiryDesign}?outcome=success`,
  context: FORM_CONTEXT,
  scheduleHref: ROUTES.contact,
} as const;

/** The island close's two form dresses, with the home close's copy (the message's person is a placeholder). */
const DRESS = {
  card: {
    kind: 'card',
    title: 'Start a project',
    prompt: 'A link, a Figma file, or two lines about the problem.',
    writeTo: 'hello@tcules.com',
    note: 'We never share your details.',
  },
  message: {
    kind: 'message',
    from: { name: 'Rushali', role: 'Design lead · Tcules', portrait: '/kit/photos/studio-portrait-rushali.webp' },
    note: 'Tell us what you’re building. I’ll reply within a working day.',
    prompt: 'A link, a Figma file, or two lines about the problem.',
    writeTo: 'hello@tcules.com',
  },
} as const;

/** The island close's drawing, as the home close places it (scripts/enquiry-desk.mjs). */
const DESK = {
  src: '/illustrations/enquiry/designer-desk.svg',
  alt: '',
  width: 396,
  height: 459,
  kind: 'illustration',
} as const;

const AUDIT_FORM_PROPS = {
  ...ENQUIRY_FORM_PROPS,
  variant: 'audit',
  context: { ...FORM_CONTEXT, intent: 'free-audit' },
} as const;

const REJECTIONS = [
  'centred — cannot hold the form or an ordered list without turning into a funnel page',
  'formLeft / reverse — creates visible drift across the 56 form closes',
  'banner — removes the points that explain the free audit',
  'card — makes decoration carry the hierarchy and owns a ground it must not own',
  'stacked — duplicates split below the large breakpoint',
  'twoUpPoints — makes the point tracks too narrow inside the content column',
  'withProofPanel — introduces the measured nested-surface contrast failure',
  'compact — splits the difference between Section densities that already have clear jobs',
] as const;

const PROOF_FIGURES = [
  {
    value: '90+',
    label: 'completed projects',
  },
  {
    value: '4.8/5',
    label: '4.8/5 Clutch rating',
  },
  {
    value: '19',
    label: 'countries with Tcules clients',
  },
] as const satisfies readonly ProofFigure[];

/**
 * Marks a band that runs past the 1470 × 830 fold ON PURPOSE (visual-direction § 1.3: "a specimen
 * block that shows a deliberate failure carries data-fold-exempt"). A plain block wrapper — no box,
 * no seam, no ground — so the band inside sits edge to edge as it would unwrapped. With no reason it
 * is not exempt, so a mapped ladder can exempt only its over-budget rung.
 */
function FoldExempt({ reason, children }: { reason?: string; children: ReactNode }) {
  return <div data-fold-exempt={reason}>{children}</div>;
}

function SpecimenNote({ title, note }: { title: string; note: string }) {
  return (
    <Section>
      <Layout rowGap="tight" className={s.spec}>
        <p className={s.specTitle}>{title}</p>
        <p className={s.specNote}>{note}</p>
      </Layout>
    </Section>
  );
}

/** Selects real Proof content shapes without copying Proof's presentation into the CTA specimen. */
function ProofFixture({
  kind = 'both',
  interactive = false,
}: {
  kind?: 'figures' | 'quote' | 'both';
  interactive?: boolean;
}) {
  const quote = {
    quoteHtml: interactive
      ? `<p>They turned a broad product problem into a sequence the whole team could act on. <a href="${ROUTES.caseStudies}">Read the case study</a>.</p>`
      : '<p>They turned a broad product problem into a sequence the whole team could act on.</p>',
    name: 'Ashok Mohanty',
    role: 'Founder',
    company: 'Auxentios',
  } as const;

  if (kind === 'figures') return <Proof figures={PROOF_FIGURES} />;
  if (kind === 'quote') return <Proof quote={quote} />;
  return <Proof quote={quote} figures={PROOF_FIGURES} />;
}

export default function CtaSectionSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>CtaSection</h1>
          <p>
            The reusable commercial close: one labelled region, one h2, and three arrangements
            shaped by whether the page asks through a form, actions, or a compact mid-page
            offer. It owns no decorative box and paints no ground itself; its Section supplies
            the band.
          </p>
          <p>
            Action-only CTAs use the tailored ask named by the page, with “Start a project” and
            “Request free audit” as their standard fallbacks. Form CTAs delegate their submit
            copy and behaviour to EnquiryForm: “Send enquiry” for projects and “Request free
            audit” for audits.
          </p>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>1 · Arrangement matrix</h2>
            <p>
              One size. Split requires a form and rejects proof, open requires actions, and
              offer accepts either a form or actions while rejecting proof. The renderings
              immediately below are the matrix, not three separately styled components.
            </p>
          </Layout>
          <Layout columns={{ base: 1, md: 3 }} colGap="gutter" rowGap="gutter">
            <Box>
              <strong>split</strong>
              <p>form required · proof forbidden · standard band · vertical points</p>
            </Box>
            <Box>
              <strong>open</strong>
              <p>actions required · proof optional · standard band · three-up points</p>
            </Box>
            <Box>
              <strong>offer</strong>
              <p>form or actions · proof forbidden · tight band · wrapping points</p>
            </Box>
          </Layout>
          <Layout columns="fit" minTrack="md" colGap="gutter" rowGap="text">
            {REJECTIONS.map((rejection) => (
              <Box key={rejection}>{rejection}</Box>
            ))}
          </Layout>
        </Layout>
      </Section>

      <CtaSection
        eyebrow="Next step"
        heading="Tell us what you are trying to ship"
        body={SPLIT_BODY}
        points={STANDARD_POINTS}
        form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
        surface="paper"
      />
      {/* `mark`: a bare blue glyph above the lede, the eye's entry into the close (the corpus pages'
          enquiry band, owner 11 Oct 2026). */}
      <CtaSection
        mark={<Icon name="chat-round-dots" size="xl" />}
        heading="Tell us what you are trying to ship"
        body={SPLIT_BODY}
        form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
      />

      <SpecimenNote
        title="1b · The island close"
        note="island='blue' | 'ink' on a split close (home, owner 16 Oct 2026): the desk drawing, heading and lede as one group centred against the form, all on the island; the form on a paper panel inside it, in one of EnquiryForm's two dresses; islandTexture='frame' framing the form. Four instances: card on blue (what home carries), message on blue, card on ink, message on ink. Send any of them empty to see send-only validation. The fifth has no drawing, points and a contact strip: a copy group taller than the form."
      />
      {(['blue', 'ink'] as const).map((surface) =>
        (['card', 'message'] as const).map((kind) => (
          <CtaSection
            key={`${surface}-${kind}`}
            island={surface}
            islandTexture="frame"
            art={<Media image={DESK} sizes="240px" />}
            heading="Tell us what you're building"
            body={['A sketch, a prototype or a product with years of history behind it. Start wherever you are.']}
            form={<EnquiryForm {...ENQUIRY_FORM_PROPS} fieldScale="lg" dress={DRESS[kind]} />}
          />
        )),
      )}
      <CtaSection
        island="ink"
        islandTexture="frame"
        eyebrow="Next step"
        heading="Tell us what you are trying to ship"
        body={SPLIT_BODY}
        points={STANDARD_POINTS}
        contact={[
          { label: 'Write to', value: 'hello@tcules.com', href: 'mailto:hello@tcules.com' },
          { label: 'Reply', value: 'Within one business day' },
        ]}
        form={<EnquiryForm {...ENQUIRY_FORM_PROPS} fieldScale="lg" dress={DRESS.card} />}
      />
      <CtaSection
        arrangement="open"
        eyebrow="Work with us"
        heading="Choose the next useful move"
        body={OPEN_BODY}
        points={STANDARD_POINTS}
        actions={[
          { label: 'Discuss the relevant project', href: ROUTES.contact },
          { label: 'See how we work', href: ROUTES.howWeWork },
        ]}
        proof={<ProofFixture kind="quote" />}
        surface="tint"
      />
      <CtaSection
        arrangement="offer"
        eyebrow="Free audit"
        heading="Find the friction before it becomes a rebuild"
        body={OFFER_BODY}
        points={STANDARD_POINTS}
        actions={[{ label: 'Request free audit', href: ROUTES.audits }]}
        surface="ink"
      />

      <SpecimenNote
        title="2 · Form ladder"
        note="Five corpus shapes follow: project form, audit form, offer with audit form, offer with actions only, and open with two actions. Every form instance also renders See available times."
      />
      <CtaSection
        heading="Start a product engagement"
        body={SPLIT_BODY}
        points={STANDARD_POINTS}
        form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
      />
      <CtaSection
        heading="Request a free audit"
        body={SPLIT_BODY}
        points={STANDARD_POINTS}
        form={<EnquiryForm {...AUDIT_FORM_PROPS} />}
        surface="tint"
      />
      <FoldExempt reason="the offer with the FULL form: cmp-form's compact-form offer is the page shape">
        <CtaSection
          arrangement="offer"
          heading="See what your current experience is costing"
          body={OFFER_BODY}
          points={STANDARD_POINTS}
          form={<EnquiryForm {...AUDIT_FORM_PROPS} />}
        />
      </FoldExempt>
      <CtaSection
        arrangement="offer"
        heading="Get an outside view before you commit"
        body={OFFER_BODY}
        points={STANDARD_POINTS}
        actions={[{ label: 'Request free audit', href: ROUTES.audits }]}
        surface="blue"
      />
      <CtaSection
        arrangement="open"
        heading="Make the next decision with evidence"
        body={OPEN_BODY}
        points={STANDARD_POINTS}
        actions={[
          { label: 'Start a project', href: ROUTES.contact },
          { label: 'Request free audit', href: ROUTES.audits },
        ]}
      />

      <SpecimenNote
        title="3 · Accepted ask ladder"
        note="The real EnquiryForm shows its fixed submit copy while action-only CTAs carry the standard fallbacks and longest tailored labels. Buttons stay single-line; their Cluster wraps when two long actions no longer share a row."
      />
      <CtaSection
        heading="Turn the next product decision into a plan"
        body={SPLIT_BODY}
        points={STANDARD_POINTS}
        form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
      />
      <CtaSection
        heading="Turn the next product decision into a plan"
        body={SPLIT_BODY}
        points={STANDARD_POINTS}
        form={<EnquiryForm {...ENQUIRY_FORM_PROPS} urlLabel="Link to the work" />}
        surface="tint"
      />
      <CtaSection
        arrangement="open"
        heading="Choose the next useful move"
        body={OPEN_BODY}
        actions={[
          { label: 'Start a project', href: ROUTES.contact },
          { label: 'Request free audit', href: ROUTES.audits },
        ]}
      />
      <CtaSection
        arrangement="open"
        heading="Choose the next useful move"
        body={OPEN_BODY}
        actions={[
          { label: 'Discuss the relevant project', href: ROUTES.contact },
          { label: 'Apply the decision', href: ROUTES.howWeWork },
        ]}
        surface="tint"
      />

      <SpecimenNote
        title="4 · Points ladder"
        note="Zero, one, three, and six points in each arrangement, and four and five in offer as well. Zero renders no list; six proves split growth and open's second row without equalRows. An offer that asks with actions runs its points as ruled rows in the 763 body track beside its head (cmp-cta); only an offer with a form keeps the 2-up-from-md, 3-up-from-lg strip, where every second-row point starts under a first-row label. Each numeral holds its own place beside its label at every width, never wrapping above it."
      />
      {([0, 1, 3, 6] as const).map((count) => {
        const points = SIX_POINTS.slice(0, count);
        return (
          <FoldExempt
            key={`split-${count}`}
            reason={count > 3 ? 'six points: past the L budget of three (§ 1.5)' : undefined}
          >
            <CtaSection
              heading={`Split with ${count} point${count === 1 ? '' : 's'}`}
              body={SPLIT_BODY}
              points={points}
              form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
              surface={count % 2 === 0 ? 'paper' : 'tint'}
            />
          </FoldExempt>
        );
      })}
      {([0, 1, 3, 6] as const).map((count) => (
        <CtaSection
          key={`open-${count}`}
          arrangement="open"
          heading={`Open with ${count} point${count === 1 ? '' : 's'}`}
          body={OPEN_BODY}
          points={SIX_POINTS.slice(0, count)}
          actions={[{ label: 'Start a project', href: ROUTES.contact }]}
          surface={count % 2 === 0 ? 'tint' : 'paper'}
        />
      ))}
      {([0, 1, 3, 4, 5, 6] as const).map((count) => (
        <CtaSection
          key={`offer-${count}`}
          arrangement="offer"
          heading={`Offer with ${count} point${count === 1 ? '' : 's'}`}
          body={OFFER_BODY}
          points={SIX_POINTS.slice(0, count)}
          actions={[{ label: 'Request free audit', href: ROUTES.audits }]}
          surface={count % 2 === 0 ? 'ink' : 'blue'}
        />
      ))}

      <SpecimenNote
        title="5 · States: none to force"
        note="CtaSection itself has no hover, focus, pressed, disabled, or expanded state. Point at, press, and tab through the Buttons and EnquiryForm controls below: those controls own their own states and focus rings."
      />

      <SpecimenNote
        title="6 · All four surfaces"
        note="The complete matrix follows: split, open, offer, and the K offer with its photograph and icon markers (the photo flipping side on alternate surfaces), on paper, tint, ink, and blue. Tint lifts its eyebrow and numerals because neutral-600 would be 4.39:1; blue inverts the primary Button through Button's own surface map. The texture slot is not repeated here: Texture is paper only (visual-direction § 6.2), and the closes carry it at /design/kit/cta."
      />
      {(['paper', 'tint', 'ink', 'blue'] as const).map((surface) => (
        <Fragment key={surface}>
          <CtaSection
            eyebrow={`Split · ${surface}`}
            heading="Tell us what you are trying to ship"
            body={SPLIT_BODY}
            points={STANDARD_POINTS}
            form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
            surface={surface}
          />
          <CtaSection
            arrangement="open"
            eyebrow={`Open · ${surface}`}
            heading="Choose the next useful move"
            body={OPEN_BODY}
            points={STANDARD_POINTS}
            actions={[{ label: 'Start a project', href: ROUTES.contact }]}
            proof={<ProofFixture kind="quote" />}
            surface={surface}
          />
          <CtaSection
            arrangement="offer"
            eyebrow={`Offer · ${surface}`}
            heading="Find the friction before it becomes a rebuild"
            body={OFFER_BODY}
            points={STANDARD_POINTS}
            actions={[{ label: 'Request free audit', href: ROUTES.audits }]}
            surface={surface}
          />
          <CtaSection
            arrangement="offer"
            markers="icon"
            eyebrow={`Offer · media · ${surface}`}
            heading="Know what your design system is costing you"
            body={OFFER_BODY}
            points={K_ICON_POINTS}
            actions={[{ label: 'Request free audit', href: ROUTES.audits }]}
            media={{
              image: getKitPhoto('pair-laptop-notebook'),
              side: surface === 'tint' || surface === 'blue' ? 'start' : 'end',
            }}
            surface={surface}
          />
        </Fragment>
      ))}

      <SpecimenNote
        title="7 · Surface boundaries"
        note="A tint CTA between ink bands, then an ink CTA between paper bands. Each CTA's own data-surface scope resolves all five CTA inks plus the real EnquiryForm and Proof inside it."
      />
      <Section surface="ink">
        <p>Ink band before the tint CTA.</p>
      </Section>
      <CtaSection
        heading="A light close inside a dark page sequence"
        body={SPLIT_BODY}
        points={STANDARD_POINTS}
        form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
        surface="tint"
      />
      <Section surface="ink">
        <p>Ink band after the tint CTA.</p>
      </Section>
      <Section>
        <p>Paper band before the ink CTA.</p>
      </Section>
      <CtaSection
        arrangement="open"
        heading="A dark close inside a light page sequence"
        body={OPEN_BODY}
        points={STANDARD_POINTS}
        actions={[{ label: 'Start a project', href: ROUTES.contact }]}
        proof={<ProofFixture />}
        surface="ink"
      />
      <Section>
        <p>Paper band after the ink CTA.</p>
      </Section>

      <SpecimenNote
        title="8 · Proof ladder"
        note="The real Proof renders figures only, quote only, and both, in open's right-hand column. Split takes no proof since cmp-cta fix round 1: a close with the full form and a proof row ran 880–1104 at 1470, past the 830 fold with standard copy, so evidence before the form is its own band (a G proof band above the close)."
      />
      {(['figures', 'quote', 'both'] as const).map((kind) => (
        <CtaSection
          key={`open-proof-${kind}`}
          arrangement="open"
          heading={`Open · ${kind} proof`}
          body={OPEN_BODY}
          points={STANDARD_POINTS}
          actions={[{ label: 'Start a project', href: ROUTES.contact }]}
          proof={<ProofFixture kind={kind} />}
          surface="tint"
        />
      ))}

      <SpecimenNote
        title="8b · Open with and without proof"
        note="The same open close twice: first with a quote in the right-hand column, then with no proof. Without proof the frame is one track, not a 3:2 frame with an empty 470px column. The heading and copy keep their own ch measures, so only the points row takes the full column, as three 392px tracks. Both are on paper so the frame is the only variable. At 390 both collapse to one column and read alike."
      />
      <CtaSection
        arrangement="open"
        eyebrow="Open · with proof"
        heading="Make the next decision with evidence"
        body={OPEN_BODY}
        points={STANDARD_POINTS}
        actions={[
          { label: 'Start a project', href: ROUTES.contact },
          { label: 'See how we work', href: ROUTES.howWeWork },
        ]}
        proof={<ProofFixture kind="quote" />}
      />
      <CtaSection
        arrangement="open"
        eyebrow="Open · without proof"
        heading="Make the next decision with evidence"
        body={OPEN_BODY}
        points={STANDARD_POINTS}
        actions={[
          { label: 'Start a project', href: ROUTES.contact },
          { label: 'See how we work', href: ROUTES.howWeWork },
        ]}
      />

      <SpecimenNote
        title="9 · Two per page"
        note="The valid pair: a tight offer mid-scroll, real Prose between, then a standard split close. Their density, arrangement, point shape and proof capability keep them visibly distinct. The offer's heading is h2 and the close's h1 (cmp-cta fix round 1), so scale is one of the differences again."
      />
      <CtaSection
        arrangement="offer"
        heading="Find the expensive friction first"
        body={OFFER_BODY}
        points={STANDARD_POINTS}
        actions={[{ label: 'Audit my website', href: ROUTES.audits }]}
        surface="blue"
      />
      <Section>
        <Prose>
          <h2>The page continues after the offer</h2>
          <p>
            This is the content between the mid-page interrupt and the final close. It proves
            the pair is two moments in one argument, not two adjacent banners.
          </p>
          <p>
            The first ask is diagnostic. The final ask below opens the full project
            conversation.
          </p>
        </Prose>
      </Section>
      <CtaSection
        heading="Tell us what you are trying to ship"
        body={SPLIT_BODY}
        points={STANDARD_POINTS}
        form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
        surface="tint"
      />

      <SpecimenNote
        title="10 · The wrong two-per-page version"
        note="Two split closes in sequence are the bug: two h2-led regions with the same density, the same vertical list, and 192px of facing band air before content is counted. The route layer must not author this pair."
      />
      <CtaSection
        heading="Start the first project conversation"
        body={SPLIT_BODY}
        points={STANDARD_POINTS}
        form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
      />
      <CtaSection
        heading="Start the second project conversation"
        body={SPLIT_BODY}
        points={STANDARD_POINTS}
        form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
        surface="tint"
      />

      <SpecimenNote
        title="11 · Content and responsive edge cases"
        note="Longest tailored actions, a 60-character unbroken label, a bare URL in body copy, an empty heading, and a whitespace-only point label follow. Resize through 1023, 767, and 375 to inspect the real breakpoint changes."
      />
      <CtaSection
        arrangement="open"
        heading="A realistic heading that balances instead of leaving one word behind"
        body={[
          'https://example.com/a-very-long-unbroken-path-that-must-break-inside-the-content-column',
        ]}
        points={[
          { label: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefgh' },
          { label: 'A normal point', detail: 'The neighbouring track remains intact.' },
          { label: 'A final point' },
        ]}
        actions={[
          { label: 'Discuss the relevant project', href: ROUTES.contact },
          { label: 'Apply the decision', href: ROUTES.howWeWork },
        ]}
      />
      <CtaSection
        arrangement="open"
        heading=""
        body={[
          'The empty h2 remains in the DOM, making this intentionally invalid region unnamed.',
        ]}
        points={[
          { label: '   ', detail: 'This entire point is filtered before render.' },
          { label: 'The surviving point', detail: 'It becomes 01 after filtering.' },
        ]}
        actions={[{ label: 'Start a project', href: ROUTES.contact }]}
        surface="tint"
      />

      <SpecimenNote
        title="12 · Interactive proof"
        note="Tab order is the CTA action first, then the case-study link inside proof. The component adds no tabindex and never moves focus."
      />
      <CtaSection
        arrangement="open"
        heading="See the work, then decide"
        body={OPEN_BODY}
        points={STANDARD_POINTS}
        actions={[{ label: 'Start a project', href: ROUTES.contact }]}
        proof={<ProofFixture kind="quote" interactive />}
        surface="ink"
      />

      <SpecimenNote
        title="13 · Illegal narrow parents"
        note="These are deliberately invalid placements. At the named 320px floor text breaks without horizontal overflow; at the 256px sub-floor EnquiryForm is the first part to show pressure."
      />
      <div className={s.narrowMd} data-fold-exempt="an illegal 320px parent, shown on purpose">
        <CtaSection
          heading="A 320px parent that does not size the band correctly"
          body={SPLIT_BODY}
          points={STANDARD_POINTS}
          form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
        />
      </div>
      <div className={s.narrowSm} data-fold-exempt="an illegal 256px parent, shown on purpose">
        <CtaSection
          heading="A 256px sub-floor parent that exposes the form constraint"
          body={SPLIT_BODY}
          points={STANDARD_POINTS}
          form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
          surface="tint"
        />
      </div>

      <SpecimenNote
        title="14 · Falsy slots render nothing"
        note="proof={false} and proof={null} on open, and form={false} on the offer: each slot is absent, so no column, no 48 seam and no empty div is reserved (spec § 12 row 6). Both opens render the centred close; the offer falls through to its actions shape, which with no actions and no points is the lede alone."
      />
      <CtaSection
        arrangement="open"
        heading="Open with proof={false}"
        body={OPEN_BODY}
        actions={[{ label: 'Start a project', href: ROUTES.contact }]}
        proof={false}
      />
      <CtaSection
        arrangement="open"
        heading="Open with proof={null}"
        body={OPEN_BODY}
        actions={[{ label: 'Start a project', href: ROUTES.contact }]}
        proof={null}
        surface="tint"
      />
      <CtaSection
        arrangement="offer"
        heading="Offer with form={false}"
        body={OFFER_BODY}
        form={false}
      />

      <SpecimenNote
        title="15 · The kit's props"
        note="media (the K offer's 4:5 photograph, either side), markers (number, icon, plain) and texture (the closes' closing placement) are shown as finished bands at /design/kit/cta, with copy at the § 1.5 ceilings."
      />

      <SpecimenNote
        title="16 · The island close (open only)"
        note="island: the open close on a floating box of its own ground (Island), the band's ground around it on every side. The value is the island's surface; without surface the band takes the other light ground, so island=&quot;tint&quot; keeps the close's tint and drops the band to paper. Four blocks: the flagship (tint island, paper band, points and the solid + ghost pair), the bright island (paper on tint, no points), the proof shape inside an island, and the surface proof on ink. island on split or offer does not compile."
      />
      <CtaSection
        arrangement="open"
        island="tint"
        eyebrow="Work with us"
        heading="Bring the problem as it is"
        body={OPEN_BODY}
        points={STANDARD_POINTS}
        actions={[
          { label: 'Start a project', href: ROUTES.contact },
          { label: 'See how we work', href: ROUTES.howWeWork },
        ]}
      />
      <CtaSection
        arrangement="open"
        island="paper"
        mark={<Icon name="chat-round-dots" size="xl" />}
        heading="Tell us what you are trying to ship"
        body={OPEN_BODY}
        actions={[{ label: 'Start a project', href: ROUTES.contact }]}
      />
      <CtaSection
        arrangement="open"
        island="tint"
        eyebrow="Work with us"
        heading="Choose the next useful move"
        body={OPEN_BODY}
        points={STANDARD_POINTS}
        actions={[
          { label: 'Discuss the relevant project', href: ROUTES.contact },
          { label: 'See how we work', href: ROUTES.howWeWork },
        ]}
        proof={<ProofFixture kind="quote" />}
      />
      <CtaSection
        arrangement="open"
        island="tint"
        surface="ink"
        eyebrow="Surface proof"
        heading="The island keeps its own tokens on ink"
        body={OPEN_BODY}
        actions={[
          { label: 'Start a project', href: ROUTES.contact },
          { label: 'See how we work', href: ROUTES.howWeWork },
        ]}
      />

      <Section>
        <Cluster colGap="text" rowGap="text">
          <a href={ROUTES.design}>Back to the proving ground</a>
          <a href={ROUTES.contact}>Contact route used by specimen actions</a>
        </Cluster>
      </Section>
    </>
  );
}
