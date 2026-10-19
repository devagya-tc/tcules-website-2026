import Link from 'next/link';
import { Fragment } from 'react';

import { Button, Cluster, Layout, Media, Section } from '@/components';
import { CtaSection, EnquiryForm, type EnquiryDress, type EnquiryUrlLabel } from '@/patterns';
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

/* ── The island close ──────────────────────────────────────────────────────────────────────────
   The dresses as home carries them: the same copy and drawing as /design/cta-section § 1b
   (src/templates/CorpusPage/blocks.tsx, ENQUIRY_DRESS). The message's person is a placeholder from
   the studio photo catalogue until the owner names who answers enquiries. */
const DRESS = {
  card: {
    kind: 'card',
    title: 'Start a project',
    prompt: 'A link, a Figma file, or two lines about the problem.',
    reply: 'We reply in 1 business day',
  },
  message: {
    kind: 'message',
    from: {
      name: 'Rushali',
      role: 'Design lead · Tcules',
      portrait: '/kit/photos/studio-portrait-rushali.webp',
    },
    note: 'Tell us what you’re building. I’ll reply within a working day.',
    prompt: 'A link, a Figma file, or two lines about the problem.',
    writeTo: 'hello@tcules.com',
  },
} as const satisfies Record<'card' | 'message', EnquiryDress>;

/** The island close's drawing, as the home close places it (scripts/enquiry-desk.mjs). */
const DESK = {
  src: '/illustrations/enquiry/designer-desk.svg',
  alt: '',
  width: 396,
  height: 459,
  kind: 'illustration',
} as const;

const ISLAND_BODY = [
  'A sketch, a prototype or a product with years of history behind it. Start wherever you are.',
] as const;

type IslandCase = {
  island: 'blue' | 'ink';
  dress?: keyof typeof DRESS;
  title: string;
  note: string;
};

/* Each case is the real close, as home builds it: no scheduling link (the corpus authors none for
   the home close), the page's own words, the drawing, the frame texture. */
const ISLAND_CASES: readonly IslandCase[] = [
  {
    island: 'blue',
    title: 'Blue island · no dress, the plain set',
    note: 'EnquiryForm with no dress: email, what you are working on and the optional link, each label visually hidden with the placeholder as its cue, then the submit and the caption. It is what every other corpus close carries, on its own band. Inside the island it works, but it read as “a blank box with a few lines” (owner, 16 Oct 2026), which is why the island close takes a dress. Props: the enquiry set’s own (action, context, urlLabel, scheduleHref).',
  },
  {
    island: 'blue',
    dress: 'card',
    title: 'Blue island · dress “card” — what home carries',
    note: 'dress={{ kind: “card”, title, prompt?, reply?, writeTo?, note? }}. A structured card: its own h3 (title), VISIBLE labels over filled fields with “Optional” at the end of the link’s label row, the prompt as the example in the big field, and a foot under a hairline: the send with the reply promise beside it, led by a check, and optionally one line under, “or write to {writeTo} · {note}”. A send’s status replaces the promise in the same live region. Use it where the form is the band’s primary object and a visitor should see what each field is for: the home close.',
  },
  {
    island: 'blue',
    dress: 'message',
    title: 'Blue island · dress “message” — the first message',
    note: 'dress={{ kind: “message”, from: { name, role, portrait }, note, prompt?, writeTo? }}. The reply to a note: a person’s portrait (a circle), name and role, their one-sentence note in a bubble, then a composer: the big field first (the bare look; the composer draws the focus), email and link as its keyed details, and the send in its foot beside “or write to …”. Use it where a named person answers enquiries and the close should read as a conversation rather than a form. On no page yet; the person here is a placeholder.',
  },
  {
    island: 'ink',
    dress: 'card',
    title: 'Ink island · dress “card”',
    note: 'The card on the dark island: neutral-900, one step off the footer’s 950, so the close and the footer a band below do not read as one dark block. The panel is paper on either island, so the form is identical; only the copy around it takes the island’s white ink.',
  },
  {
    island: 'ink',
    dress: 'message',
    title: 'Ink island · dress “message”',
    note: 'The first message on the dark island. Blue or ink is the page’s choice (home passes island={{ surface, dress }} to its close); either dress sits on either island.',
  },
];

function Enquiry({
  outcome = 'success',
  audit = false,
  contact = false,
  compact = false,
  lined = false,
  corpus = false,
  urlLabel,
}: {
  outcome?: 'success' | 'error' | 'pending';
  audit?: boolean;
  contact?: boolean;
  compact?: boolean;
  lined?: boolean;
  corpus?: boolean;
  urlLabel?: EnquiryUrlLabel;
}) {
  const action = `${ENDPOINTS.enquiryDesign}?outcome=${outcome}`;

  if (compact) return <EnquiryForm variant="compact" action={action} context={CONTEXT} />;

  /* The corpus enquiry (page-mapping G2): the corpus's own URL label, no scheduling link (none is
     authored and no destination exists), and the page's own success words. */
  if (corpus)
    return (
      <EnquiryForm
        action={action}
        context={CONTEXT}
        urlLabel="Product or company URL"
        success={{
          heading: 'Your enquiry has reached us.',
          body: "We'll reply within one business day.",
        }}
      />
    );

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
            Shared field sets for enquiries, audits, contact, and the compact three-field ask.
            The plain sets have no visible labels: each placeholder is its field&rsquo;s cue and
            the label stays, visually hidden. The enquiry set also takes a <code>dress</code>{' '}
            (owner, 16 Oct 2026, the home close): <code>card</code>, with its own title and
            visible labels, and <code>message</code>, the &ldquo;first message&rdquo;: a
            person&rsquo;s note, then a composer. A dress changes the presentation only; the
            fields, names, statuses and success view are the same form&rsquo;s. Errors land only
            on send: the submit sweep flags every failing field, says how many need a look and
            moves focus to the first. Leaving a field never judges it, and editing a flagged field
            only clears its error. The renderings here sit inside CtaSection; the kit&rsquo;s form
            family shows the form beside a photograph, under a centred and a beside head, and in
            the offer.
          </p>
          <Cluster colGap="block" rowGap="tight">
            <Link href={ROUTES.designKitForm}>The form family in the UI kit</Link>
            <Link href={ROUTES.designCtaSection}>CtaSection, the island close (§ 1b)</Link>
            <Link href={ROUTES.designIsland}>Island, the primitive the close floats on</Link>
          </Cluster>
        </Layout>
      </Section>

      {/* The island close (owner, 16 Oct 2026): the form's variations inside the real close. */}
      <Section>
        <Layout rowGap="block">
          <h2>The island close</h2>
          <p>
            Home&rsquo;s enquiry close is CtaSection on a blue or ink island:{' '}
            <code>island=&quot;blue&quot; | &quot;ink&quot;</code>,{' '}
            <code>islandTexture=&quot;frame&quot;</code> (TextureFrame around the form) and{' '}
            <code>art</code>, the designer&rsquo;s desk drawing above the heading. The band is
            paper; the drawing, heading and lede are one group centred against the form, and the
            form sits on a paper panel inside the island. Home carries the card on blue. Send any
            of them empty to see send-only validation.
          </p>
          <Layout rowGap="tight" className={s.spec}>
            <p className={s.specTitle}>Pending · not built</p>
            <p className={s.specNote}>
              A third dress, a choice-led form (pick one option, then the fields), is being
              explored as a mock. It is not built and has no prop; nothing on this page renders
              it.
            </p>
          </Layout>
        </Layout>
      </Section>
      {ISLAND_CASES.map((item) => (
        <Fragment key={`${item.island}-${item.dress ?? 'plain'}`}>
          <Section>
            <Layout rowGap="tight" className={s.spec}>
              <p className={s.specTitle}>{item.title}</p>
              <p className={s.specNote}>{item.note}</p>
            </Layout>
          </Section>
          <CtaSection
            island={item.island}
            islandTexture="frame"
            art={<Media image={DESK} sizes="240px" />}
            heading="Tell us what you're building"
            body={ISLAND_BODY}
            form={
              <EnquiryForm
                action={`${ENDPOINTS.enquiryDesign}?outcome=success`}
                context={CONTEXT}
                dress={item.dress ? DRESS[item.dress] : undefined}
              />
            }
          />
        </Fragment>
      ))}

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
          'Name and email as a pair where the track holds two, the one question, and the submit with "We reply within a business day." beside it.',
        ]}
        form={<Enquiry compact />}
      />
      <CtaSection
        eyebrow="Variant · enquiry, from the corpus"
        heading="Send an enquiry without a scheduling link"
        body={[
          'The corpus pages’ form: the URL field’s own label, no “See available times” (none is authored and no scheduling destination exists), and the page’s own success words. Submit it for the success view.',
        ]}
        form={<Enquiry corpus />}
        surface="tint"
      />
      <CtaSection
        eyebrow={`Fields · line`}
        heading="The line field, kept as an option"
        body={[
          'fields="line" sets Input\'s unboxed underline field, 44 tall with the value on its rule, instead of the default box. Every variant takes it; no placement on the site uses it today.',
        ]}
        form={<Enquiry lined />}
      />
      <Section>
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
          'Send with a field empty or malformed for Invalid (leaving a field never shows an error). Submit the three forms below for pending Success, Error, and delayed Submitting. Point at a field, hold the submit, and Tab through the form for the native hover, pressed, and focus states.',
        ]}
        form={<Enquiry outcome="pending" />}
      />
      <CtaSection
        eyebrow="State · invalid on send"
        heading="Send with an answer missing"
        body={[
          'Nothing posts. Each empty or malformed field gets its message, the line beside the submit says how many need a look, and focus moves to the first.',
        ]}
        form={
          <Rehearse submit fill={{ email: 'maya@' }}>
            <EnquiryForm
              variant="compact"
              action={`${ENDPOINTS.enquiryDesign}?outcome=success`}
              context={CONTEXT}
            />
          </Rehearse>
        }
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

      {/* Home round 3: the form as the band's primary object — lg fields, the submit across the
          panel, and the caller's own resting line ("After sending: …" in the corpus). */}
      <CtaSection
        eyebrow="Primary · lg fields · caller's caption"
        heading="Tell us what you're building"
        body={['A sketch, a prototype or a product with years of history behind it.']}
        form={
          <EnquiryForm
            variant="enquiry"
            urlLabel="Product or company URL"
            fieldScale="lg"
            submit="full"
            caption="We'll reply within one business day."
            action={`${ENDPOINTS.enquiryDesign}?outcome=success`}
            context={CONTEXT}
          />
        }
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
      {/* The compact set on every surface too, lined and with the full-width submit, so the line
          field's inks and the caption under a full submit are seen on every ground. */}
      {(['paper', 'tint', 'ink', 'blue'] as const).map((surface) => (
        <CtaSection
          key={`compact-${surface}`}
          eyebrow={`Compact · ${surface}`}
          heading="Three lines, on this ground"
          body={BODY}
          form={
            <EnquiryForm
              variant="compact"
              fields="line"
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

      <Section surface="ink">
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
      <Section surface="ink">
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

      <Section>
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
