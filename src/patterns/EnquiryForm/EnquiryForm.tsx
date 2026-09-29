'use client';

import type { FormEvent, ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

import { Button, Cluster, Icon, Input, Layout } from '@/components';

import styles from './EnquiryForm.module.css';

export type EnquiryUrlLabel =
  'Site or product URL' | 'Link to the work' | 'Where can we see it?';

export type AuditUrlLabel = 'URL of the site to audit';

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

export type EnquiryFormProps = EnquiryVariantProps | AuditVariantProps | ContactVariantProps;

type Lifecycle = 'idle' | 'submitting' | 'error' | 'success';
type FieldMessages = {
  email: string;
  work: string;
  url: string;
  name: string;
  company: string;
  contact: string;
  comments: string;
};

const EMPTY_MESSAGES: FieldMessages = {
  email: '',
  work: '',
  url: '',
  name: '',
  company: '',
  contact: '',
  comments: '',
};

function validHttpsUrl(value: string): boolean {
  if (value === '') return true;
  if (!value.startsWith('https://')) return false;

  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

type FieldGroupProps = {
  id: string;
  messageId: string;
  label: string;
  flagId?: string;
  flag?: string;
  message: string;
  children: ReactNode;
};

function FieldGroup({
  id,
  messageId,
  label,
  flagId,
  flag,
  message,
  children,
}: FieldGroupProps) {
  return (
    <Layout rowGap="tight">
      {flag ? (
        <Cluster colGap="tight" align="baseline" nowrap>
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
          <span className={styles.flag} id={flagId}>
            {flag}
          </span>
        </Cluster>
      ) : (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      <Cluster className={styles.message} id={messageId} colGap="tight" align="center" nowrap>
        {message ? <Icon name="close-circle" /> : null}
        <span>{message}</span>
      </Cluster>
    </Layout>
  );
}

/**
 * EnquiryForm — the site's shared enquiry behavior for the three-field enquiry/audit set and
 * five-field contact set. Validation is deliberately blur-only; submission keeps uncontrolled
 * values mounted on failure and replaces the form on success.
 */
export function EnquiryForm(props: EnquiryFormProps) {
  const instanceId = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const submittedCallbackFired = useRef(false);
  const [lifecycle, setLifecycle] = useState<Lifecycle>('idle');
  const [messages, setMessages] = useState<FieldMessages>(EMPTY_MESSAGES);

  const variant = props.variant ?? 'enquiry';
  const onSubmitted = props.onSubmitted;
  const urlLabel =
    props.urlLabel ??
    (variant === 'audit' ? 'URL of the site to audit' : 'Site or product URL');
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
    urlFlag: `${instanceId}-url-flag`,
    urlMessage: `${instanceId}-url-msg`,
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
        className={styles.success}
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
                tone="neutral"
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
      className={styles.form}
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
          {variant === 'contact' ? (
            <>
              <FieldGroup
                id={ids.name}
                messageId={ids.nameMessage}
                label="Your Name"
                message={messages.name}
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
                      event.currentTarget.value.trim() === '' ? 'Enter your name.' : '',
                    )
                  }
                />
              </FieldGroup>

              <FieldGroup
                id={ids.company}
                messageId={ids.companyMessage}
                label="Company Name"
                message={messages.company}
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
                      event.currentTarget.value.trim() === '' ? 'Enter your company name.' : '',
                    )
                  }
                />
              </FieldGroup>

              <FieldGroup
                id={ids.email}
                messageId={ids.emailMessage}
                label="Email Address"
                message={messages.email}
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
                      event.currentTarget.value.trim() === '' ||
                        event.currentTarget.validity.typeMismatch
                        ? 'That does not look like an email address.'
                        : '',
                    )
                  }
                />
              </FieldGroup>

              <FieldGroup
                id={ids.contact}
                messageId={ids.contactMessage}
                label="Contact Number"
                message={messages.contact}
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
                      event.currentTarget.value.trim() === ''
                        ? 'Enter your contact number.'
                        : '',
                    )
                  }
                />
              </FieldGroup>

              <FieldGroup
                id={ids.comments}
                messageId={ids.commentsMessage}
                label="Let’s talk about your product"
                message={messages.comments}
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
                      event.currentTarget.value.trim() === ''
                        ? 'Tell us about your product.'
                        : '',
                    )
                  }
                />
              </FieldGroup>
            </>
          ) : (
            <>
              <FieldGroup
                id={ids.email}
                messageId={ids.emailMessage}
                label="Email address"
                message={messages.email}
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
                      event.currentTarget.value.trim() === '' ||
                        event.currentTarget.validity.typeMismatch
                        ? 'That does not look like an email address.'
                        : '',
                    )
                  }
                />
              </FieldGroup>

              <FieldGroup
                id={ids.work}
                messageId={ids.workMessage}
                label="What are you working on?"
                message={messages.work}
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
                      event.currentTarget.value.trim() === ''
                        ? 'Tell us what you are working on.'
                        : '',
                    )
                  }
                />
              </FieldGroup>

              <FieldGroup
                id={ids.url}
                messageId={ids.urlMessage}
                label={urlLabel}
                flag="Optional"
                flagId={ids.urlFlag}
                message={messages.url}
              >
                <Input
                  id={ids.url}
                  type="url"
                  inputMode="url"
                  name="url"
                  disabled={submitting}
                  invalid={Boolean(messages.url)}
                  aria-describedby={`${ids.urlFlag} ${ids.urlMessage}`}
                  onBlur={(event) =>
                    setMessage(
                      'url',
                      validHttpsUrl(event.currentTarget.value.trim())
                        ? ''
                        : 'Use a full address beginning with https://.',
                    )
                  }
                />
              </FieldGroup>
            </>
          )}
        </Layout>

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
              neither needs extendHitArea. The link keeps `neutral`: the submit is the one primary
              ask, and blue on both would make it two. */}
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
                tone="neutral"
                size="lg"
                icon={<Icon name="arrow-right" />}
              >
                See available times
              </Button>
            ) : null}
          </Cluster>
          <p className={styles.caption}>
            We reply to the address you give us, and use it for nothing else.
          </p>
        </Layout>
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
