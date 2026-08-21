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

type EnquiryVariantProps = SharedProps & {
  variant?: 'enquiry';
  urlLabel?: EnquiryUrlLabel;
  context: EnquiryContextBase & { intent?: never };
};

type AuditVariantProps = SharedProps & {
  variant: 'audit';
  urlLabel?: AuditUrlLabel;
  context: EnquiryContextBase & { intent: string };
};

export type EnquiryFormProps = EnquiryVariantProps | AuditVariantProps;

type Lifecycle = 'idle' | 'submitting' | 'error' | 'success';
type FieldMessages = { email: string; work: string; url: string };

const EMPTY_MESSAGES: FieldMessages = { email: '', work: '', url: '' };

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
 * EnquiryForm — the site's single three-field form. Validation is deliberately blur-only;
 * submission keeps uncontrolled values mounted on failure and replaces the form on success.
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
    email: `${instanceId}-email`,
    emailMessage: `${instanceId}-email-msg`,
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
            <Icon name="check" />
            <p className={styles.successBody}>Thanks — we have your enquiry.</p>
          </Cluster>
        </Layout>
      </div>
    );
  }

  const status =
    lifecycle === 'submitting'
      ? 'Sending your enquiry.'
      : lifecycle === 'error'
        ? 'That did not send. Your answers are still here — try again.'
        : '';

  return (
    <form
      className={styles.form}
      action={props.action}
      method="post"
      noValidate
      aria-label={variant === 'audit' ? 'Request a free audit' : 'Send an enquiry'}
      aria-busy={submitting || undefined}
      onSubmit={handleSubmit}
    >
      <Layout rowGap="stack">
        <Layout rowGap="block">
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
          <Cluster rowGap="tight" colGap="tight" align="center">
            <Button type="submit" size="md" extendHitArea busy={submitting}>
              {variant === 'audit' ? 'Request free audit' : 'Send enquiry'}
            </Button>
          </Cluster>
          <p className={styles.caption}>
            We reply to the address you give us, and use it for nothing else.
          </p>
        </Layout>
      </Layout>

      <input type="hidden" name="origin_route" value={props.context.originRoute} />
      <input type="hidden" name="placement" value={props.context.placement} />
      <input type="hidden" name="family" value={props.context.family} />
      <input type="hidden" name="service_or_audit" value={props.context.serviceOrAudit} />
      <input type="hidden" name="referrer" value={props.context.referrer} />
      <input type="hidden" name="campaign" value={props.context.campaign} />
      {props.variant === 'audit' ? (
        <input type="hidden" name="intent" value={props.context.intent} />
      ) : null}
    </form>
  );
}
