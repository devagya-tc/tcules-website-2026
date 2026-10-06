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
   tall in the 667 copy track it was sized for; in a track too narrow for the name and email pair
   (under 400) the pair stacks and the form grows by one field (≈ 465 at 392, 536 at 326).

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
    <Layout rowGap="tight">
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
 * EnquiryForm — the site's shared enquiry behavior for the three-field enquiry/audit set, the
 * five-field contact set and the three-field compact set. Validation is deliberately blur-only;
 * submission keeps uncontrolled values mounted on failure and replaces the form on success.
 *
 * A pattern in its own right, not CtaSection's part: it sizes itself to whatever track it is placed
 * in, between its own floor and its own measure (`--enq-form-*`, `--enq-compact-max-inline`), so it
 * reads the same in CtaSection's form column, in ContentSection's `media` copy column beside a
 * photograph, and as a block under a centred head.
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
  const submitting = lifecycle === 'submitting';

  const ids = {
    name: `${instanceId}-name`,
    nameMessage: `${instanceId}-name-msg`,
    company: `${instanceId}-company`,
    companyMessage: `${instanceId}-company-msg`,
    email: `${instanceId}-email`,
    emailMessage: `${instanceId}-email-msg`,
    contact: `${instanceId}-contact`,
    contactMessage: `${instanceId}-contact-msg`,
    comments: `${instanceId}-comments`,
    commentsMessage: `${instanceId}-comments-msg`,
    work: `${instanceId}-work`,
    workMessage: `${instanceId}-work-msg`,
    url: `${instanceId}-url`,
    status: `${instanceId}-status`,
  };

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

  if (lifecycle === 'success') {
    return (
      <div
        className={cx(styles.success, variant === 'compact' && styles.compact)}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        ref={successRef}
      >
        <Layout rowGap="block">
          <hr className={styles.successRule} />
          <h3 className={styles.successHeading}>One reply, within a working day.</h3>
          <Cluster colGap="tight" align="center" nowrap>
            <Icon name="check-circle" />
            <p className={styles.successBody}>
              {variant === 'contact'
                ? 'Thanks — we have your message.'
                : 'Thanks — we have your enquiry.'}
            </p>
          </Cluster>
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

  return (
    <form
      className={cx(styles.form, variant === 'compact' && styles.compact)}
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
      <Layout rowGap="block">
        <Layout rowGap="text">
          {variant === 'compact' ? (
            <>
              {/* Name and email as a pair, side by side wherever the form's own width holds two
                  192px tracks (`fit`, `xs`), and stacked where it does not — the form decides from
                  its track, not from the viewport, because the same form sits in a 667 copy column
                  and a 392 card track on one 1440 page. `block` between the two: a pair of fields
                  is two answers, and at `text` the two labels read as one run. */}
              <Layout columns="fit" minTrack="xs" colGap="block" rowGap="text">
                <FieldGroup
                  id={ids.name}
                  label="Name"
                  validation={{ id: ids.nameMessage, message: messages.name }}
                >
                  <Input
                    id={ids.name}
                    name="name"
                    autoComplete="name"
                    required
                    disabled={submitting}
                    invalid={Boolean(messages.name)}
                    aria-describedby={ids.nameMessage}
                    onBlur={(event) =>
                      setMessage(
                        'name',
                        event.currentTarget.value.trim() === '' ? 'Enter your name' : '',
                      )
                    }
                  />
                </FieldGroup>

                <FieldGroup
                  id={ids.email}
                  label="Email"
                  validation={{ id: ids.emailMessage, message: messages.email }}
                >
                  <Input
                    id={ids.email}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                    disabled={submitting}
                    invalid={Boolean(messages.email)}
                    aria-describedby={ids.emailMessage}
                    onBlur={(event) =>
                      setMessage(
                        'email',
                        event.currentTarget.value.trim() === ''
                          ? 'Enter your email'
                          : event.currentTarget.validity.typeMismatch
                            ? 'Enter a valid email'
                            : '',
                      )
                    }
                  />
                </FieldGroup>
              </Layout>

              <FieldGroup
                id={ids.work}
                label="What are you working on?"
                validation={{ id: ids.workMessage, message: messages.work }}
              >
                <Input
                  as="textarea"
                  id={ids.work}
                  name="what_are_you_working_on"
                  required
                  disabled={submitting}
                  invalid={Boolean(messages.work)}
                  aria-describedby={ids.workMessage}
                  onBlur={(event) =>
                    setMessage(
                      'work',
                      event.currentTarget.value.trim() === '' ? 'Add a line about it' : '',
                    )
                  }
                />
              </FieldGroup>
            </>
          ) : variant === 'contact' ? (
            <>
              <FieldGroup
                id={ids.name}
                label="Name"
                validation={{ id: ids.nameMessage, message: messages.name }}
              >
                <Input
                  id={ids.name}
                  name="clientName"
                  autoComplete="name"
                  required
                  disabled={submitting}
                  invalid={Boolean(messages.name)}
                  aria-describedby={ids.nameMessage}
                  onBlur={(event) =>
                    setMessage(
                      'name',
                      event.currentTarget.value.trim() === '' ? 'Enter your name' : '',
                    )
                  }
                />
              </FieldGroup>

              <FieldGroup
                id={ids.company}
                label="Company"
                validation={{ id: ids.companyMessage, message: messages.company }}
              >
                <Input
                  id={ids.company}
                  name="clientCompany"
                  autoComplete="organization"
                  required
                  disabled={submitting}
                  invalid={Boolean(messages.company)}
                  aria-describedby={ids.companyMessage}
                  onBlur={(event) =>
                    setMessage(
                      'company',
                      event.currentTarget.value.trim() === '' ? 'Enter your company' : '',
                    )
                  }
                />
              </FieldGroup>

              <FieldGroup
                id={ids.email}
                label="Email"
                validation={{ id: ids.emailMessage, message: messages.email }}
              >
                <Input
                  id={ids.email}
                  type="email"
                  name="clientEmail"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                  disabled={submitting}
                  invalid={Boolean(messages.email)}
                  aria-describedby={ids.emailMessage}
                  onBlur={(event) =>
                    setMessage(
                      'email',
                      event.currentTarget.value.trim() === ''
                        ? 'Enter your email'
                        : event.currentTarget.validity.typeMismatch
                          ? 'Enter a valid email'
                          : '',
                    )
                  }
                />
              </FieldGroup>

              <FieldGroup
                id={ids.contact}
                label="Phone"
                validation={{ id: ids.contactMessage, message: messages.contact }}
              >
                <Input
                  id={ids.contact}
                  type="tel"
                  name="clientContact"
                  autoComplete="tel"
                  required
                  disabled={submitting}
                  invalid={Boolean(messages.contact)}
                  aria-describedby={ids.contactMessage}
                  onBlur={(event) =>
                    setMessage(
                      'contact',
                      event.currentTarget.value.trim() === '' ? 'Enter your phone number' : '',
                    )
                  }
                />
              </FieldGroup>

              <FieldGroup
                id={ids.comments}
                label="Message"
                validation={{ id: ids.commentsMessage, message: messages.comments }}
              >
                <Input
                  as="textarea"
                  id={ids.comments}
                  name="clientComments"
                  required
                  disabled={submitting}
                  invalid={Boolean(messages.comments)}
                  aria-describedby={ids.commentsMessage}
                  onBlur={(event) =>
                    setMessage(
                      'comments',
                      event.currentTarget.value.trim() === '' ? 'Add a message' : '',
                    )
                  }
                />
              </FieldGroup>
            </>
          ) : (
            <>
              <FieldGroup
                id={ids.email}
                label="Email"
                validation={{ id: ids.emailMessage, message: messages.email }}
              >
                <Input
                  id={ids.email}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                  disabled={submitting}
                  invalid={Boolean(messages.email)}
                  aria-describedby={ids.emailMessage}
                  onBlur={(event) =>
                    setMessage(
                      'email',
                      event.currentTarget.value.trim() === ''
                        ? 'Enter your email'
                        : event.currentTarget.validity.typeMismatch
                          ? 'Enter a valid email'
                          : '',
                    )
                  }
                />
              </FieldGroup>

              <FieldGroup
                id={ids.work}
                label="What are you working on?"
                validation={{ id: ids.workMessage, message: messages.work }}
              >
                <Input
                  as="textarea"
                  id={ids.work}
                  name="what_are_you_working_on"
                  required
                  disabled={submitting}
                  invalid={Boolean(messages.work)}
                  aria-describedby={ids.workMessage}
                  onBlur={(event) =>
                    setMessage(
                      'work',
                      event.currentTarget.value.trim() === '' ? 'Add a line about it' : '',
                    )
                  }
                />
              </FieldGroup>

              <FieldGroup id={ids.url} label={urlLabel} optional>
                <Input
                  id={ids.url}
                  type="url"
                  inputMode="url"
                  name="url"
                  autoComplete="url"
                  disabled={submitting}
                  onBlur={(event) => {
                    event.currentTarget.value = normaliseUrl(event.currentTarget.value);
                  }}
                />
              </FieldGroup>
            </>
          )}
        </Layout>

        {variant === 'compact' ? (
          /* Compact: the submit and ONE line beside it. That line is the caption at rest and the
             status once there is one — the same live region, so "Sending…" and "That did not
             send…" are announced where the reassurance sat, and an idle form spends no row on an
             empty status line. That row, and the caption's own row, are the 69px the full form
             spends under its submit and the compact form cannot (§ 1.4, L beside a photo).

             `nowrap`: the line never drops under the submit as a unit; it wraps inside the space
             beside it. So the row holds its 48 in every state wherever the longer of caption and
             error fits in two caption lines beside the submit (every track from 392 up, measured
             6 Oct 2026). On a 326 phone column the caption takes a third line, and the row is
             that line's height: "Sending…" is shorter, so the row steps up by one caption line
             (19) while a send is in flight, and back down on an error. Recorded, not hidden. */
          <Cluster nowrap colGap="block" align="center">
            <Button type="submit" size="lg" busy={submitting}>
              Send enquiry
            </Button>
            <p
              className={cx(styles.note, lifecycle === 'error' && styles.statusError)}
              id={ids.status}
              role="status"
              aria-live="polite"
            >
              {status || CAPTION}
            </p>
          </Cluster>
        ) : (
          <>
            <p
              className={
                lifecycle === 'error' ? `${styles.status} ${styles.statusError}` : styles.status
              }
              id={ids.status}
              role="status"
              aria-live="polite"
            >
              {status}
            </p>

            <Layout rowGap="text">
              {/* Submit and the scheduling link in ONE row: two ways to take the same next step, so
                they group. `block` between them, not `tight` — the link is the alternative to the
                submit, not a part of it — and the row wraps on a narrow column, where the link drops
                under the submit at `tight`.

                Both lg. The submit is lg because it stands beside 44px phone fields and a 40px
                button under them read as the smaller thing; the link takes the same size so the two
                labels set at one type size across the row. lg is 48 and clears the touch floor, so
                neither needs extendHitArea. The link is `primary`: a text link is blue at rest
                (visual-direction § 4.2, fdn-blue). It has no box, so the submit stays the one ask. */}
              <Cluster rowGap="tight" colGap="block" align="center">
                <Button type="submit" size="lg" busy={submitting}>
                  {variant === 'audit'
                    ? 'Request free audit'
                    : variant === 'contact'
                      ? 'Send message'
                      : 'Send enquiry'}
                </Button>
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
              <p className={styles.caption}>{CAPTION}</p>
            </Layout>
          </>
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
