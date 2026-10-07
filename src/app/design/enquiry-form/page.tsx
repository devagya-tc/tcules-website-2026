import Link from 'next/link';

import { Button, Cluster, Layout, Section } from '@/components';
import { CtaSection, EnquiryForm, type EnquiryUrlLabel } from '@/patterns';
import { ENDPOINTS, ROUTES } from '@/lib/routes';

import { Rehearse } from '../_specimen/Rehearse';
import { specimenStyles as s } from '../_specimen/Specimen';

const CONTEXT = {
  originRoute: ROUTES.designEnquiryForm,
  placement: 'closing-cta',
  family: 'design-system',
  serviceOrAudit: 'component-specimen',
  referrer: '',
  campaign: '',
} as const;

const BODY = ['Tell us what you are trying to ship and who it is for.'] as const;

/* The caller's next steps: the success view numbers what it is handed. */
const STEPS = [
  { label: 'A reply within a working day', detail: 'From the person who would lead the work.' },
  {
    label: 'A thirty-minute call',
    detail: 'What exists, and what a first fortnight would change.',
  },
] as const;

const SENT = {
  name: 'Maya Fernandes',
  email: 'maya@northwind.studio',
  what_are_you_working_on: 'A billing redesign for a B2B payments product.',
};

function Enquiry({
  outcome = 'success',
  audit = false,
  contact = false,
  compact = false,
  lined = false,
  urlLabel,
}: {
  outcome?: 'success' | 'error' | 'pending';
  audit?: boolean;
  contact?: boolean;
  compact?: boolean;
  lined?: boolean;
  urlLabel?: EnquiryUrlLabel;
}) {
  const action = `${ENDPOINTS.enquiryDesign}?outcome=${outcome}`;

  if (compact) return <EnquiryForm variant="compact" action={action} context={CONTEXT} />;

  if (contact)
    return <EnquiryForm variant="contact" action={action} scheduleHref={ROUTES.contact} />;

  return audit ? (
    <EnquiryForm
      variant="audit"
      action={action}
      context={{ ...CONTEXT, intent: 'free-audit' }}
      scheduleHref={ROUTES.contact}
    />
  ) : (
    <EnquiryForm
      action={action}
      context={CONTEXT}
      urlLabel={urlLabel}
      scheduleHref={ROUTES.contact}
      fields={lined ? 'line' : undefined}
    />
  );
}

export default function EnquiryFormSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>EnquiryForm</h1>
          <p>
            Shared field sets for enquiries, audits, contact, and the compact three-field ask,
            with blur-only validation and an asynchronous success replacement. The renderings
            here sit inside CtaSection; the kit&rsquo;s form family shows the form beside a
            photograph, under a centred and a beside head, and in the offer.
          </p>
          <Link href={ROUTES.designKitForm}>The form family in the UI kit</Link>
        </Layout>
      </Section>

      <CtaSection
        eyebrow="Variant · enquiry"
        heading="Send an enquiry"
        body={['Six hidden context fields and the standard enquiry labels.']}
        form={<Enquiry />}
      />
      <CtaSection
        eyebrow="Variant · audit"
        heading="Request a free audit"
        body={['Seven hidden context fields and the fixed audit URL wording.']}
        form={<Enquiry audit />}
        surface="tint"
      />
      <CtaSection
        eyebrow="Variant · contact"
        heading="Start a conversation"
        body={['Five visible contact fields mapped directly to the client-contact mutation.']}
        form={<Enquiry contact />}
      />
      <CtaSection
        eyebrow="Variant · compact"
        heading="Three lines are enough"
        body={[
          'Name and email as a pair where the track holds two, the one question, and the submit with the caption beside it. At most 400 tall.',
        ]}
        form={<Enquiry compact />}
      />
      <CtaSection
        eyebrow={`Fields · line`}
        heading="The line field, kept as an option"
        body={[
          'fields="line" sets Input\'s unboxed underline field instead of the default box. Every variant takes it; no placement on the site uses it today.',
        ]}
        form={<Enquiry lined />}
      />
      <Section density="tight">
        <Layout rowGap="tight">
          <h2>Submitted context contract</h2>
          <p>
            Enquiry posts <code>origin_route</code>, <code>placement</code>, <code>family</code>
            , <code>service_or_audit</code>, <code>referrer</code>, and <code>campaign</code>.
            Audit adds <code>intent</code>; compact posts the enquiry context with{' '}
            <code>name</code> in place of <code>url</code>. Empty referrer and campaign values
            remain present rather than being dropped.
          </p>
        </Layout>
      </Section>

      <CtaSection
        heading="Reach each state through the real controls"
        body={[
          'Blur an empty or malformed field for Invalid. Submit the three forms below for pending Success, Error, and delayed Submitting. Point at a field, hold the submit, and Tab through the form for the native hover, pressed, and focus states.',
        ]}
        form={<Enquiry outcome="pending" />}
      />
      <CtaSection
        eyebrow="State · error"
        heading="Typed answers survive a failed request"
        body={['This endpoint returns 500; the controls re-enable and keep their values.']}
        form={<Enquiry outcome="error" urlLabel="Link to the work" />}
        surface="tint"
      />
      <CtaSection
        eyebrow="State · success"
        heading="The completed form becomes a next step"
        body={['This endpoint succeeds; focus moves to the replacement status region.']}
        form={<Enquiry outcome="success" urlLabel="Where can we see it?" />}
      />

      {(['paper', 'tint', 'ink', 'blue'] as const).map((surface) => (
        <CtaSection
          key={surface}
          eyebrow={`Surface · ${surface}`}
          heading="Start with the work as it is"
          body={BODY}
          form={<Enquiry />}
          surface={surface}
        />
      ))}
      {/* The compact set on every surface too, numbered and with the full-width submit, so the
          accent numerals (--enq-accent-ink) and the caption ink under a full submit are seen on
          every ground. */}
      {(['paper', 'tint', 'ink', 'blue'] as const).map((surface) => (
        <CtaSection
          key={`compact-${surface}`}
          eyebrow={`Compact · ${surface}`}
          heading="Three lines, on this ground"
          body={BODY}
          form={
            <EnquiryForm
              variant="compact"
              numbered
              submit="full"
              action={`${ENDPOINTS.enquiryDesign}?outcome=success`}
              context={CONTEXT}
            />
          }
          surface={surface}
        />
      ))}
      {/* The success view on every surface: the check, the thanks, and the caller's numbered
          steps (.stepMarker in the accent, .stepDetail in the hint ink). */}
      {(['paper', 'tint', 'ink', 'blue'] as const).map((surface) => (
        <CtaSection
          key={`sent-${surface}`}
          eyebrow={`Sent · ${surface}`}
          heading="The thanks, on this ground"
          body={BODY}
          form={
            <Rehearse submit fill={SENT}>
              <EnquiryForm
                variant="compact"
                action={`${ENDPOINTS.enquiryDesign}?outcome=success`}
                context={CONTEXT}
                nextSteps={STEPS}
              />
            </Rehearse>
          }
          surface={surface}
        />
      ))}

      <Section surface="ink" density="tight">
        <Layout rowGap="block">
          <h2>Nested surface boundary</h2>
          <p>The blue form below must resolve its own tokens, not inherit this ink band.</p>
        </Layout>
      </Section>
      <CtaSection
        heading="A blue close between ink bands"
        body={BODY}
        form={<Enquiry />}
        surface="blue"
      />
      <Section surface="ink" density="tight">
        <p>Ink resumes after the blue form.</p>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <h2>Edge cases</h2>
          <p>
            The next audit uses the longest fixed label. Scheduling sits in the form&rsquo;s own
            action row, beside the submit. The final rendering is deliberately constrained by an
            illegal 256px parent to expose the documented floor.
          </p>
        </Layout>
      </Section>
      <CtaSection
        eyebrow="Edge · longest label"
        heading="The audit wording at the narrow end"
        body={BODY}
        form={
          <EnquiryForm
            variant="audit"
            action={`${ENDPOINTS.enquiryDesign}?outcome=success`}
            context={{ ...CONTEXT, intent: 'free-audit' }}
            scheduleHref={ROUTES.contact}
          />
        }
      />
      <div
        className={s.trackSm}
        data-fold-exempt="stress specimen: an illegal 256px parent squeezes the band to expose the form's floor"
      >
        <CtaSection
          eyebrow="Edge · illegal parent"
          heading="A 256px parent that does not size the band"
          body={BODY}
          form={<Enquiry />}
          surface="tint"
        />
      </div>
      <Cluster colGap="tight" rowGap="tight">
        <CtaSection
          eyebrow="Edge · wrapping parent"
          heading="A Cluster does not promise a form track"
          body={BODY}
          form={<Enquiry />}
          surface="blue"
        />
      </Cluster>

      <Section density="tight">
        <p>
          The adjacent pair is deliberately erroneous: a production route must render one
          enquiry form. It proves that separate <code>useId</code> namespaces do not collide
          even when the route rule is broken.
        </p>
      </Section>
      <CtaSection heading="The first adjacent form" body={BODY} form={<Enquiry />} />
      <CtaSection
        heading="The second adjacent form"
        body={BODY}
        form={<Enquiry urlLabel="Link to the work" />}
        surface="tint"
      />

      <Section>
        <Button as={Link} href={ROUTES.design} emphasis="link" tone="neutral">
          Back to the proving ground
        </Button>
      </Section>
    </>
  );
}
