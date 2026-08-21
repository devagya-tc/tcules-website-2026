import { useId, type ReactNode } from 'react';

import { Button, Cluster, Icon, Layout, Section, type SectionSurface } from '@/components';

import styles from './CtaSection.module.css';

export type CtaPoint = {
  label: string;
  detail?: string;
};

export type CtaAction = {
  label: string;
  href: string;
};

type CtaSectionBaseProps = {
  heading: string;
  body: readonly [string] | readonly [string, string];
  eyebrow?: string;
  points?: readonly CtaPoint[];
  surface?: SectionSurface;
};

type CtaSplitProps = {
  arrangement?: 'split';
  form: ReactNode;
  scheduleHref: string;
  actions?: readonly [];
  proof?: ReactNode;
};

type CtaOpenProps = {
  arrangement: 'open';
  form?: never;
  scheduleHref?: never;
  actions: readonly [CtaAction] | readonly [CtaAction, CtaAction];
  proof?: ReactNode;
};

type CtaOfferWithFormProps = {
  arrangement: 'offer';
  form: ReactNode;
  scheduleHref: string;
  actions?: readonly [];
  proof?: never;
};

type CtaOfferWithActionsProps = {
  arrangement: 'offer';
  form?: never;
  scheduleHref?: never;
  actions: readonly [CtaAction] | readonly [CtaAction, CtaAction];
  proof?: never;
};

export type CtaSectionProps = CtaSectionBaseProps &
  (CtaSplitProps | CtaOpenProps | CtaOfferWithFormProps | CtaOfferWithActionsProps);

function CtaLede({
  headingId,
  eyebrow,
  heading,
  body,
}: {
  headingId: string;
  eyebrow?: string;
  heading: string;
  body: readonly [string] | readonly [string, string];
}) {
  const paragraphs = body.filter((paragraph) => paragraph.trim().length > 0);

  return (
    <Layout rowGap="block">
      {eyebrow !== undefined ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 id={headingId} className={styles.heading}>
        {heading}
      </h2>
      {paragraphs.length > 0 ? (
        <Layout rowGap="text">
          {paragraphs.map((paragraph, index) => (
            <p
              key={`${index}-${paragraph}`}
              className={index === 0 ? styles.lead : styles.body}
            >
              {paragraph}
            </p>
          ))}
        </Layout>
      ) : null}
    </Layout>
  );
}

function CtaPointContent({ point }: { point: CtaPoint }) {
  const detail = point.detail?.trim() ? point.detail : undefined;

  return (
    <Layout rowGap="inline">
      <span className={styles.label}>{point.label}</span>
      {detail ? <span className={styles.detail}>{detail}</span> : null}
    </Layout>
  );
}

function CtaPoints({
  arrangement,
  points,
}: {
  arrangement: 'split' | 'open' | 'offer';
  points: readonly CtaPoint[];
}) {
  const visiblePoints = points.filter((point) => point.label.trim().length > 0);
  if (visiblePoints.length === 0) return null;

  const items = visiblePoints.map((point, index) => {
    const marker = String(index + 1).padStart(2, '0');

    if (arrangement === 'open') {
      return (
        <Layout as="li" key={`${index}-${point.label}`} rowGap="tight">
          <span aria-hidden="true" className={styles.marker}>
            {marker}
          </span>
          <CtaPointContent point={point} />
        </Layout>
      );
    }

    return (
      <Cluster as="li" key={`${index}-${point.label}`} colGap="tight" align="baseline">
        <span aria-hidden="true" className={styles.marker}>
          {marker}
        </span>
        <CtaPointContent point={point} />
      </Cluster>
    );
  });

  if (arrangement === 'open') {
    return (
      <Layout as="ol" columns={{ base: 1, md: 3 }} colGap="gutter" rowGap="gutter">
        {items}
      </Layout>
    );
  }

  if (arrangement === 'offer') {
    return (
      <Cluster as="ol" colGap="block" rowGap="block" align="baseline">
        {items}
      </Cluster>
    );
  }

  return (
    <Layout as="ol" rowGap="text">
      {items}
    </Layout>
  );
}

function CtaActions({
  actions,
  scheduleHref,
}: {
  actions?: readonly CtaAction[];
  scheduleHref?: string;
}) {
  return (
    <Cluster colGap="tight" rowGap="tight">
      {scheduleHref ? (
        <Button
          as="a"
          href={scheduleHref}
          emphasis="ghost"
          tone="neutral"
          size="md"
          extendHitArea
        >
          See available times
        </Button>
      ) : null}
      {actions?.map((action, index) => (
        <Button
          key={`${index}-${action.href}-${action.label}`}
          as="a"
          href={action.href}
          emphasis={index === 0 ? 'solid' : 'ghost'}
          tone={index === 0 ? 'primary' : 'neutral'}
          size="md"
          icon={index === 0 ? <Icon name="arrow-right" /> : undefined}
          extendHitArea
        >
          {action.label}
        </Button>
      ))}
    </Cluster>
  );
}

/**
 * The reusable commercial close: three arrangements, one semantic order, and no
 * route or content-source knowledge. Its discriminated props make the required
 * form, scheduling link, action, and proof combinations compile-time decisions.
 */
export function CtaSection(props: CtaSectionProps) {
  const headingId = `${useId()}-heading`;
  const points = props.points ?? [];

  if (props.arrangement === 'open') {
    return (
      <Section surface={props.surface} aria-labelledby={headingId} data-arrangement="open">
        <Layout rowGap="stack">
          <Layout
            columns={{ base: 1, lg: [3, 2] }}
            colGap="column"
            rowGap="stack"
            align="start"
          >
            <Layout rowGap="stack">
              <CtaLede
                headingId={headingId}
                eyebrow={props.eyebrow}
                heading={props.heading}
                body={props.body}
              />
              <CtaPoints arrangement="open" points={points} />
              <CtaActions actions={props.actions} />
            </Layout>
            {props.proof !== undefined ? <div>{props.proof}</div> : null}
          </Layout>
        </Layout>
      </Section>
    );
  }

  if (props.arrangement === 'offer') {
    const hasForm = 'form' in props && props.form !== undefined;

    return (
      <Section
        surface={props.surface}
        density="tight"
        aria-labelledby={headingId}
        data-arrangement="offer"
        className={styles.offer}
      >
        <Layout rowGap="stack">
          <CtaLede
            headingId={headingId}
            eyebrow={props.eyebrow}
            heading={props.heading}
            body={props.body}
          />
          {hasForm ? <div>{props.form}</div> : null}
          <CtaPoints arrangement="offer" points={points} />
          <CtaActions
            actions={'actions' in props ? props.actions : undefined}
            scheduleHref={'scheduleHref' in props ? props.scheduleHref : undefined}
          />
        </Layout>
      </Section>
    );
  }

  return (
    <Section surface={props.surface} aria-labelledby={headingId} data-arrangement="split">
      <Layout rowGap="stack">
        <Layout columns={{ base: 1, lg: [3, 2] }} colGap="column" rowGap="stack" align="start">
          <Layout rowGap="stack">
            <CtaLede
              headingId={headingId}
              eyebrow={props.eyebrow}
              heading={props.heading}
              body={props.body}
            />
            <CtaPoints arrangement="split" points={points} />
          </Layout>
          <Layout rowGap="stack">
            <div>{props.form}</div>
            <CtaActions scheduleHref={props.scheduleHref} />
          </Layout>
        </Layout>
        {props.proof !== undefined ? <div>{props.proof}</div> : null}
      </Layout>
    </Section>
  );
}
