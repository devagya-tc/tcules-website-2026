import { Fragment } from 'react';

import { Cluster, Layout, Prose, Section } from '@/components';
import { CtaSection, EnquiryForm, Proof, type CtaPoint, type ProofFigure } from '@/patterns';
import { ENDPOINTS, ROUTES } from '@/lib/routes';

import { Box, specimenStyles as s } from '../_specimen/Specimen';

const STANDARD_POINTS = [
  { label: 'A 30-minute call', detail: 'We ask what you have tried and what it cost.' },
  { label: 'A written plan', detail: 'You leave with the next decisions in order.' },
  { label: 'A fixed price', detail: 'The scope and the commercial terms arrive together.' },
] as const satisfies readonly CtaPoint[];

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
    checkedOn: 'checked on 8 August 2026',
  },
  {
    value: '4.8/5',
    label: '4.8/5 Clutch rating',
    checkedOn: 'checked on 8 August 2026',
  },
  {
    value: '19',
    label: 'countries with Tcules clients',
    checkedOn: 'checked on 8 August 2026',
  },
] as const satisfies readonly ProofFigure[];

function SpecimenNote({ title, note }: { title: string; note: string }) {
  return (
    <Section density="tight">
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
              One size. Split requires a form, open requires actions, and offer accepts either a
              form or actions while rejecting proof. The renderings immediately below are the
              matrix, not three separately styled components.
            </p>
          </Layout>
          <Layout columns={{ base: 1, md: 3 }} colGap="gutter" rowGap="gutter">
            <Box>
              <strong>split</strong>
              <p>form required · proof optional · standard band · vertical points</p>
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
        proof={<ProofFixture kind="figures" />}
        surface="paper"
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
      <CtaSection
        arrangement="offer"
        heading="See what your current experience is costing"
        body={OFFER_BODY}
        points={STANDARD_POINTS}
        form={<EnquiryForm {...AUDIT_FORM_PROPS} />}
      />
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
        note="Zero, one, three, and six points in each arrangement. Zero renders no list; six proves split growth, open's second row without equalRows, and offer wrapping."
      />
      {([0, 1, 3, 6] as const).map((count) => {
        const points = SIX_POINTS.slice(0, count);
        return (
          <CtaSection
            key={`split-${count}`}
            heading={`Split with ${count} point${count === 1 ? '' : 's'}`}
            body={SPLIT_BODY}
            points={points}
            form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
            surface={count % 2 === 0 ? 'paper' : 'tint'}
          />
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
      {([0, 1, 3, 6] as const).map((count) => (
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
        note="The complete 3 × 4 matrix follows: split, open, and offer on paper, tint, ink, and blue. Tint lifts its eyebrow and numerals because neutral-600 would be 4.39:1; blue inverts the primary Button through Button's own surface map."
      />
      {(['paper', 'tint', 'ink', 'blue'] as const).map((surface) => (
        <Fragment key={surface}>
          <CtaSection
            eyebrow={`Split · ${surface}`}
            heading="Tell us what you are trying to ship"
            body={SPLIT_BODY}
            points={STANDARD_POINTS}
            form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
            proof={<ProofFixture kind="figures" />}
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
        </Fragment>
      ))}

      <SpecimenNote
        title="7 · Surface boundaries"
        note="A tint CTA between ink bands, then an ink CTA between paper bands. Each CTA's own data-surface scope resolves all five CTA inks plus the real EnquiryForm and Proof inside it."
      />
      <Section surface="ink" density="tight">
        <p>Ink band before the tint CTA.</p>
      </Section>
      <CtaSection
        heading="A light close inside a dark page sequence"
        body={SPLIT_BODY}
        points={STANDARD_POINTS}
        form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
        proof={<ProofFixture />}
        surface="tint"
      />
      <Section surface="ink" density="tight">
        <p>Ink band after the tint CTA.</p>
      </Section>
      <Section density="tight">
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
      <Section density="tight">
        <p>Paper band after the ink CTA.</p>
      </Section>

      <SpecimenNote
        title="8 · Proof ladder"
        note="The real Proof renders figures only, quote only, and both: first in split's full-width proof row, then in open's narrower right column."
      />
      {(['figures', 'quote', 'both'] as const).map((kind) => (
        <CtaSection
          key={`split-proof-${kind}`}
          heading={`Split · ${kind} proof`}
          body={SPLIT_BODY}
          points={STANDARD_POINTS}
          form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
          proof={<ProofFixture kind={kind} />}
        />
      ))}
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
        note="The valid pair: a tight offer mid-scroll, real Prose between, then a standard split close. Their density, heading scale, point arrangement, and proof capability keep them visibly distinct."
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
        proof={<ProofFixture />}
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
      <div className={s.narrowMd}>
        <CtaSection
          heading="A 320px parent that does not size the band correctly"
          body={SPLIT_BODY}
          points={STANDARD_POINTS}
          form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
        />
      </div>
      <div className={s.narrowSm}>
        <CtaSection
          heading="A 256px sub-floor parent that exposes the form constraint"
          body={SPLIT_BODY}
          points={STANDARD_POINTS}
          form={<EnquiryForm {...ENQUIRY_FORM_PROPS} />}
          surface="tint"
        />
      </div>

      <Section>
        <Cluster colGap="text" rowGap="text">
          <a href={ROUTES.design}>Back to the proving ground</a>
          <a href={ROUTES.contact}>Contact route used by specimen actions</a>
        </Cluster>
      </Section>
    </>
  );
}
