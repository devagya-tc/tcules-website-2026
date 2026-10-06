'use client';

import type { FormEvent, ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

import { Button, Cluster, Icon, Input, Layout } from '@/components';
import { cx } from '@/lib/cx';

import styles from './EnquiryForm.module.css';

/* The plain noun first; the two longer labels stay for the placements whose page asks a different
   question of the link. See § Field labels on FieldGroup. */
export type EnquiryUrlLabel = 'Website' | 'Link to the work' | 'Where can we see it?';

export type AuditUrlLabel = 'Site to audit';

export type EnquiryContextBase = {
  originRoute: string;
  placement: string;
  family: string;
  serviceOrAudit: string;
  referrer: string;
  campaign: string;
};

type SharedProps = {
  action: string;
  onSubmitted?: () => void;
  /**
   * How wide the form sets (cmp-form fix round, 6 Oct 2026). ONE policy for every variant: the form
   * fills the track it is placed in, down to its own floor, so four variants side by side share a
   * right edge, and a form stacked under a full-width photograph meets the photograph's edge.
   *
   * `measure` caps it at --enq-form-measure (667) for the one placement that has no track of its
   * own to fill: a standalone form under a CENTRED head, where ContentSection gives every body row
   * the whole 1240 column and the cap is what centres.
   */
  width?: 'track' | 'measure';
  /**
   * The field treatment. `line` (default, every variant) is the unboxed underline field —
   * references.md's Meridian and Executra move, and the one that stops a form on warm paper
   * reading as a stack of default white boxes. `box` keeps Input's filled control.
   */
  fields?: 'line' | 'box';
};

/* "See available times" lives in the form's own action row, beside the submit, so the two asks
   read as one group rather than as a form with a stray link under it. Amended 29 Sep 2026
   (tracker 2.17): it used to be CtaSection's, rendered a --gap-stack below the form.

   REQUIRED on enquiry and audit. Every one of the 56 enquiry/audit instances must offer it, and
   that constraint used to be CtaSection's `scheduleHref`; it moved here with the link, so the type
   still refuses an enquiry form without one. Optional on contact: the contact page's own form is
   the scheduling conversation, and a link to it from itself would be a loop. */
type EnquiryVariantProps = SharedProps & {
  variant?: 'enquiry';
  urlLabel?: EnquiryUrlLabel;
  context: EnquiryContextBase & { intent?: never };
  scheduleHref: string;
};

type AuditVariantProps = SharedProps & {
  variant: 'audit';
  urlLabel?: AuditUrlLabel;
  context: EnquiryContextBase & { intent: string };
  scheduleHref: string;
};

type ContactVariantProps = SharedProps & {
  variant: 'contact';
  urlLabel?: never;
  context?: never;
  scheduleHref?: string;
};

/* The compact form (kit cmp-form, 6 Oct 2026): name, email, the one free-text question and the
   submit, at most 400 tall, for the placements where the form is not the band's whole argument: a
   quiet photograph beside a short form (L-photo), the mid-page offer, a standalone ask inside a
   ContentSection. Context travels as on enquiry, so a compact submission is attributable. It is 369
   tall in a 667 track and in any track that holds the name and email pair and the caption beside
   the submit; in a phone column the pair stacks and the caption drops under the submit (544 at
   326, measured 6 Oct 2026).

   NO scheduling link, and the type refuses one. Compact is the short ask by definition; the link is
   the second way to take the step, and a second way is what pushed the full form past 400. The
   placements that want both use `enquiry`. */
type CompactVariantProps = SharedProps & {
  variant: 'compact';
  urlLabel?: never;
  context: EnquiryContextBase & { intent?: never };
  scheduleHref?: never;
};

export type EnquiryFormProps =
  EnquiryVariantProps | AuditVariantProps | ContactVariantProps | CompactVariantProps;

type Lifecycle = 'idle' | 'submitting' | 'error' | 'success';
type FieldMessages = {
  email: string;
  work: string;
  name: string;
  company: string;
  contact: string;
  comments: string;
};

const EMPTY_MESSAGES: FieldMessages = {
  email: '',
  work: '',
  name: '',
  company: '',
  contact: '',
  comments: '',
};

/**
 * A URL as people type it — "acme.com", "www.acme.com/app" — made into the full address the form
 * sends. The field used to REJECT anything not starting with https://, which made a person learn a
 * rule the form could apply itself, and is the only reason the optional URL field carried an error
 * row (1 Oct 2026). Normalise, don't reject: a scheme-less value gets https:// in front; anything
 * that already has a scheme is left as typed. Blank stays blank.
 */
function normaliseUrl(value: string): string {
  const trimmed = value.trim();
  if (trimmed === '' || /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/**
 * One field's frame: label, control, and only the rows the field can actually use (1 Oct 2026).
 *
 * The frame used to be the same for every field: a label, an optional mono flag beside it, and a
 * message row ALWAYS reserved under the control. So a field that could never fail still held an
 * empty error line, and "Optional" was a separate shouted chip. Now each field declares its
 * contract and the anatomy follows from it:
 *
 *   label     the NOUN for the value — Email, Name, Company, Phone, Website. A longer label only
 *             where the noun is ambiguous or the field asks for free text ("What are you working
 *             on?" tells a person what to write; "Message" would not). Never "Your …", never
 *             "… Address", never Title Case.
 *   optional  said inside the label, in the label's own voice and a quieter ink: "Website
 *             (optional)". Only the minority is marked — on these forms, the optional field.
 *   hint      a row under the label, only when the field has something to explain.
 *   validates the field can fail, so it reserves one caption line under the control and blur
 *             errors land without moving anything below. A field that cannot fail has no row.
 *
 * Errors say what to do, in a few words, no period, no blame: "Enter your email", "Enter a valid
 * email". Prefer normalising over rejecting (see normaliseUrl): every rule the form can apply
 * itself is an error a person never sees.
 */
type FieldGroupProps = {
  id: string;
  label: string;
  optional?: boolean;
  hint?: { id: string; text: string };
  /** Present when the field validates: the id of its reserved message row, and the message. */
  validation?: { id: string; message: string };
  children: ReactNode;
};

function FieldGroup({
  id,
  label,
  optional = false,
  hint,
  validation,
  children,
}: FieldGroupProps) {
  return (
    /* `.field` so the label can take the accent while its control has focus: the blue lands on the
       question being answered, beside the blue rule under the value. */
    <Layout rowGap="tight" className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {optional ? <span className={styles.optional}> (optional)</span> : null}
      </label>
      {hint ? (
        <p className={styles.hint} id={hint.id}>
          {hint.text}
        </p>
      ) : null}
      {children}
      {validation ? (
        <Cluster
          className={styles.message}
          id={validation.id}
          colGap="tight"
          align="center"
          nowrap
        >
          {validation.message ? <Icon name="close-circle" /> : null}
          <span>{validation.message}</span>
        </Cluster>
      ) : null}
    </Layout>
  );
}

/** The reassurance line under (or, compact, beside) the submit. One sentence, said once. */
const CAPTION = 'We reply to the address you give us, and use it for nothing else.';

/**
 * What happens after a send, shown in the success view (cmp-form fix round). The same three steps
 * the L close promises in its points, so the success state keeps the promise the band made rather
 * than restating it as one serif line. Blue numerals, as on CtaSection's points: the accent marks
 * the sequence, the ink carries the words.
 */
const NEXT_STEPS = [
  {
    label: 'A reply within a working day',
    detail: 'From the designer who would lead the work.',
  },
  {
    label: 'A thirty-minute call',
    detail: 'What exists, what is stuck, and what a first fortnight would change.',
  },
  {
    label: 'A written proposal',
    detail: 'Scope, team and timeline on two pages. No obligation.',
  },
] as const;

/** The validating text fields, keyed by the message slot each one fills. */
type FieldKey = keyof FieldMessages;

/**
 * One validating field, declared once. Name, email and the free-text question used to be written
 * out per variant — the compact branch was a near-verbatim copy of contact's Name and Email blocks
 * and their blur validators — so a change to one could drift from the other. Each variant is now a
 * LIST of these, and one renderer turns every entry into the same FieldGroup + Input.
 *
 * `name` is the posted field name, which differs by variant (contact posts `clientEmail`, the
 * enquiry sets post `email`); everything a person sees is the spec's.
 */
type FieldSpec = {
  key: FieldKey;
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel';
  as?: 'textarea';
  autoComplete?: string;
  placeholder?: string;
  /** The message on an empty blur. */
  empty: string;
};

const FIELD = {
  name: (name: string): FieldSpec => ({
    key: 'name',
    label: 'Name',
    name,
    autoComplete: 'name',
    empty: 'Enter your name',
  }),
  email: (name: string): FieldSpec => ({
    key: 'email',
    label: 'Email',
    name,
    type: 'email',
    autoComplete: 'email',
    placeholder: 'you@company.com',
    empty: 'Enter your email',
  }),
  company: {
    key: 'company',
    label: 'Company',
    name: 'clientCompany',
    autoComplete: 'organization',
    empty: 'Enter your company',
  } satisfies FieldSpec,
  phone: {
    key: 'contact',
    label: 'Phone',
    name: 'clientContact',
    type: 'tel',
    autoComplete: 'tel',
    empty: 'Enter your phone number',
  } satisfies FieldSpec,
  work: {
    key: 'work',
    label: 'What are you working on?',
    name: 'what_are_you_working_on',
    as: 'textarea',
    empty: 'Add a line about it',
  } satisfies FieldSpec,
  message: {
    key: 'comments',
    label: 'Message',
    name: 'clientComments',
    as: 'textarea',
    empty: 'Add a message',
  } satisfies FieldSpec,
};

/**
 * EnquiryForm — the site's shared enquiry behavior for the three-field enquiry/audit set, the
 * five-field contact set and the three-field compact set. Validation is deliberately blur-only;
 * submission keeps uncontrolled values mounted on failure and replaces the form on success.
 *
 * A pattern in its own right, not CtaSection's part: it fills whatever track it is placed in, down
 * to its own floor (`--enq-form-min-inline`), so it reads the same in CtaSection's form column, in
 * ContentSection's `media` copy column beside a photograph, and — with `width="measure"` — as a
 * centred block under a centred head.
 *
 * Blue is its recurring foreground accent (visual-direction § 4, owner 6 Oct 2026): the trailing
 * arrow on the submit, the mark leading the caption, the label of the field being written in, the
 * rule under that field, the success mark and the numerals of the next steps. No ground is blue.
 */
export function EnquiryForm(props: EnquiryFormProps) {
  const instanceId = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const submittedCallbackFired = useRef(false);
  const [lifecycle, setLifecycle] = useState<Lifecycle>('idle');
  const [messages, setMessages] = useState<FieldMessages>(EMPTY_MESSAGES);

  const variant = props.variant ?? 'enquiry';
  const onSubmitted = props.onSubmitted;
  const urlLabel = props.urlLabel ?? (variant === 'audit' ? 'Site to audit' : 'Website');
  const appearance = props.fields === 'box' ? 'box' : 'line';
  const submitting = lifecycle === 'submitting';
  const bounds = props.width === 'measure' ? styles.measure : styles.track;

  const idFor = (key: string) => `${instanceId}-${key}`;
  const statusId = idFor('status');
  const urlId = idFor('url');

  useEffect(() => {
    if (lifecycle !== 'success') return;

    successRef.current?.focus();
    if (!submittedCallbackFired.current) {
      submittedCallbackFired.current = true;
      onSubmitted?.();
    }
  }, [lifecycle, onSubmitted]);

  function setMessage(field: keyof FieldMessages, message: string) {
    setMessages((current) => ({ ...current, [field]: message }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const fallbackSubmitter =
      event.currentTarget.querySelector<HTMLButtonElement>('button[type="submit"]');
    (submitter instanceof HTMLElement ? submitter : fallbackSubmitter)?.focus();

    setLifecycle('submitting');

    try {
      const response = await fetch(props.action, {
        method: 'POST',
        body: new FormData(event.currentTarget),
      });
      setLifecycle(response.ok ? 'success' : 'error');
    } catch {
      setLifecycle('error');
    }
  }

  /** One validating field, from its spec. The only place a FieldGroup + Input pair is written. */
  function renderField(spec: FieldSpec) {
    const id = idFor(spec.key);
    const messageId = idFor(`${spec.key}-msg`);
    const shared = {
      id,
      name: spec.name,
      autoComplete: spec.autoComplete,
      placeholder: spec.placeholder,
      required: true,
      disabled: submitting,
      appearance,
      invalid: Boolean(messages[spec.key]),
      'aria-describedby': messageId,
    } as const;
    const validate = (control: HTMLInputElement | HTMLTextAreaElement) =>
      setMessage(
        spec.key,
        control.value.trim() === ''
          ? spec.empty
          : control instanceof HTMLInputElement && control.validity.typeMismatch
            ? 'Enter a valid email'
            : '',
      );

    return (
      <FieldGroup
        key={spec.key}
        id={id}
        label={spec.label}
        validation={{ id: messageId, message: messages[spec.key] }}
      >
        {spec.as === 'textarea' ? (
          <Input {...shared} as="textarea" onBlur={(event) => validate(event.currentTarget)} />
        ) : (
          <Input
            {...shared}
            type={spec.type ?? 'text'}
            onBlur={(event) => validate(event.currentTarget)}
          />
        )}
      </FieldGroup>
    );
  }

  if (lifecycle === 'success') {
    return (
      <div
        className={cx(styles.success, bounds)}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        ref={successRef}
      >
        {/* The moment the form earns, in reading order: the mark, the THANKS at title scale, then
            what happens next as the same numbered steps the close promised. It used to open on the
            promise and bury the thanks in one small line under it, with a black check. */}
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <span className={styles.successMark}>
              <Icon name="check-circle" size="xl" />
            </span>
            <Layout rowGap="text">
              <h3 className={styles.successHeading}>
                {variant === 'contact'
                  ? 'Thanks. We have your message.'
                  : 'Thanks. We have your enquiry.'}
              </h3>
              <p className={styles.successBody}>Here is what happens next.</p>
            </Layout>
          </Layout>
          <Layout as="ol" rowGap="block">
            {NEXT_STEPS.map((step, index) => (
              <li key={step.label}>
                <Cluster nowrap colGap="text" align="baseline">
                  <span aria-hidden="true" className={styles.stepMarker}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Layout rowGap="inline" className={styles.stepContent}>
                    <span className={styles.stepLabel}>{step.label}</span>
                    <span className={styles.stepDetail}>{step.detail}</span>
                  </Layout>
                </Cluster>
              </li>
            ))}
          </Layout>
          {/* The scheduling link survives the swap. It used to, for free, because CtaSection
              rendered it outside the form; now the form owns it, so the success view carries it
              on — a sent enquiry does not make "talk sooner" any less of an offer. */}
          {props.scheduleHref ? (
            <Cluster colGap="block" rowGap="tight" align="center">
              <Button
                as="a"
                href={props.scheduleHref}
                emphasis="link"
                tone="primary"
                size="lg"
                icon={<Icon name="arrow-right" />}
              >
                See available times
              </Button>
            </Cluster>
          ) : null}
        </Layout>
      </div>
    );
  }

  const status =
    lifecycle === 'submitting'
      ? variant === 'contact'
        ? 'Sending your message.'
        : 'Sending your enquiry.'
      : lifecycle === 'error'
        ? 'That did not send. Your answers are still here — try again.'
        : '';

  const submitLabel =
    variant === 'audit' ? 'Request free audit' : variant === 'contact' ? 'Send message' : 'Send enquiry';

  /* The submit carries the trailing arrow on every variant: the click takes the step forward, and
     the arrow is the band's blue-adjacent mark on the one solid control (the glyph takes the
     button's own fg). */
  const submit = (
    <Button type="submit" size="lg" busy={submitting} icon={<Icon name="arrow-right" />}>
      {submitLabel}
    </Button>
  );

  /* The caption line, led by a blue mark. The mark is the shield at rest — the sentence is a
     promise about the address — and the danger triangle when the line has become an error. The
     paragraph is the live region, so the status is announced where the reassurance sat. */
  const captionLine = (text: string, error: boolean) => (
    <Cluster nowrap colGap="tight" align="start" className={styles.note}>
      <span className={cx(styles.noteMark, error && styles.statusError)}>
        <Icon name={error ? 'danger-triangle' : 'shield-check'} />
      </span>
      <p
        className={cx(styles.noteText, error && styles.statusError)}
        id={statusId}
        role="status"
        aria-live="polite"
      >
        {text}
      </p>
    </Cluster>
  );

  const fields: FieldSpec[] =
    variant === 'contact'
      ? [FIELD.name('clientName'), FIELD.company, FIELD.email('clientEmail'), FIELD.phone, FIELD.message]
      : variant === 'compact'
        ? [FIELD.work]
        : [FIELD.email('email'), FIELD.work];

  return (
    <form
      className={cx(styles.form, bounds)}
      action={props.action}
      method="post"
      noValidate
      aria-label={
        variant === 'audit'
          ? 'Request a free audit'
          : variant === 'contact'
            ? 'Contact Tcules'
            : 'Send an enquiry'
      }
      aria-busy={submitting || undefined}
      onSubmit={handleSubmit}
    >
      {/* Two groups, and the seam between them is what groups them (cmp-form fix round): the
          fields at `text` inside, the actions a `stack` below. Field-to-field and field-to-submit
          used to measure the same ~52, so the submit read as one more block in a uniform stack. */}
      <Layout rowGap="stack">
        <Layout rowGap="text">
          {variant === 'compact' ? (
            /* Name and email as a pair, side by side wherever the form's own width holds two 192px
               tracks (`fit`, `xs`), and stacked where it does not — the form decides from its
               track, not from the viewport. `block` between the two: a pair of fields is two
               answers, and at `text` the two labels read as one run. */
            <Layout columns="fit" minTrack="xs" colGap="block" rowGap="text">
              {renderField(FIELD.name('name'))}
              {renderField(FIELD.email('email'))}
            </Layout>
          ) : null}

          {fields.map(renderField)}

          {variant === 'enquiry' || variant === 'audit' ? (
            <FieldGroup id={urlId} label={urlLabel} optional>
              <Input
                id={urlId}
                type="url"
                inputMode="url"
                name="url"
                autoComplete="url"
                appearance={appearance}
                disabled={submitting}
                onBlur={(event) => {
                  event.currentTarget.value = normaliseUrl(event.currentTarget.value);
                }}
              />
            </FieldGroup>
          ) : null}
        </Layout>

        {variant === 'compact' ? (
          /* Compact: the submit and ONE line beside it — the caption at rest, the status once there
             is one, in the same live region, so an idle form spends no row on an empty status line.

             The row WRAPS. The line asks for at least --enq-note-min-inline beside the submit; in
             a track that cannot give it that (a 326 phone column, a 392 card track) the line drops
             under the submit at `text` and takes the whole width, rather than wrapping to three
             ragged lines in 165px beside a 48px button. */
          <Cluster colGap="block" rowGap="text" align="center">
            {submit}
            {captionLine(status || CAPTION, lifecycle === 'error')}
          </Cluster>
        ) : (
          <Layout rowGap="text">
            {/* Submit and the scheduling link in ONE row: two ways to take the same next step, so
                they group. `block` between them — the link is the alternative to the submit, not a
                part of it — and the row wraps on a narrow column, where the link drops under the
                submit at `tight`. Both lg (48, clears the touch floor). The link is `primary`: a
                text link is blue at rest (visual-direction § 4.2). */}
            <Cluster rowGap="tight" colGap="block" align="center">
              {submit}
              {props.scheduleHref ? (
                <Button
                  as="a"
                  href={props.scheduleHref}
                  emphasis="link"
                  tone="primary"
                  size="lg"
                  icon={<Icon name="arrow-right" />}
                >
                  See available times
                </Button>
              ) : null}
            </Cluster>
            {/* The line under the actions: the caption at rest, the status once there is one, in
                one live region — the same mechanism as compact's, so the two cannot disagree about
                where "That did not send" is announced. */}
            {captionLine(status || CAPTION, lifecycle === 'error')}
          </Layout>
        )}
      </Layout>

      {props.variant === 'contact' ? null : (
        <>
          <input type="hidden" name="origin_route" value={props.context.originRoute} />
          <input type="hidden" name="placement" value={props.context.placement} />
          <input type="hidden" name="family" value={props.context.family} />
          <input type="hidden" name="service_or_audit" value={props.context.serviceOrAudit} />
          <input type="hidden" name="referrer" value={props.context.referrer} />
          <input type="hidden" name="campaign" value={props.context.campaign} />
          {props.variant === 'audit' ? (
            <input type="hidden" name="intent" value={props.context.intent} />
          ) : null}
        </>
      )}
    </form>
  );
}
