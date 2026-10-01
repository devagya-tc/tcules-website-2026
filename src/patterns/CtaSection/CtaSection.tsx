import { useId, type ReactNode } from 'react';

import { Button, Cluster, Icon, Layout, Section, type SectionSurface } from '@/components';

import styles from './CtaSection.module.css';

/**
 * One step in "what happens next". `label` is the step, `detail` an optional clause under it.
 *
 * Both are typed `string`, so no element — and therefore no control, no link and no heading — can
 * be passed into a point. The two are separate parts sharing one ink because they take different
 * measures: a step name is capped by the list's own track, a clause is running text.
 */
export type CtaPoint = {
  label: string;
  detail?: string;
};

/** One action. `href` comes from `@/lib/routes` at the call site, never written out there. */
export type CtaAction = {
  label: string;
  href: string;
};

type CtaSectionBaseProps = {
  /**
   * The block's `h2`, verbatim. An empty string renders an empty `h2` — there is no fallback copy.
   *
   * A `string` and not a `ReactNode`, and that typing is the mechanism rather than a convenience:
   * it makes a second heading impossible to smuggle in, which matters here because this block
   * appears once or twice on a route that already has exactly one `h1` from `PageHero`.
   *
   * An empty string renders an empty `h2` on purpose. The region is labelled from this heading, so
   * an empty one exposes an unnamed region — a findable fault, where a fallback string would be a
   * shipped one, on 76 routes.
   */
  heading: string;
  /**
   * One or two paragraphs. `body[0]` renders as the lead, `body[1]` as body copy.
   *
   * A third paragraph does not compile, and that is the point of the tuple: this block asks, it
   * does not explain. Whatever wants a third paragraph belongs in the page above it.
   */
  body: readonly [string] | readonly [string, string];
  /** The category label above the heading. Absent renders no element and no seam. */
  eyebrow?: string;
  /**
   * What happens next, in order — an `<ol>`, so the order is the meaning. Empty renders no list.
   *
   * Each marker is the position written as a numeral rather than a glyph, for the same reason. 20
   * of the 113 instances are expected to be pointless, and an empty list costs no space.
   */
  points?: readonly CtaPoint[];
  /**
   * Which ground `Section` paints under this band. Passed straight through and read nowhere else.
   *
   * A prop here rather than an inherited attribute, and it is the same conclusion `Breadcrumbs` and
   * `PageHero` reached: this component IS the band, so it has no ancestor to read `data-surface`
   * from. Passing it through is not the same as owning the ground — the stylesheet paints nothing.
   */
  surface?: SectionSurface;
};

/* ── Four members for three arrangements, and the fourth is not redundant ────────
   Each member below encodes a constraint that would otherwise be a review comment, and the reason
   there are four rather than three is `offer` alone:

     split   requires a form. A split with an empty right-hand column is the `open` arrangement
             misnamed, so the form is required rather than optional.
     open    forbids a form and requires actions. A closing block that asks for nothing has no
             reason to exist.
     offer   accepts EITHER shape — a form or actions — but must refuse `proof` in both. One member
             cannot say "either of these two shapes, and never that third thing", so it takes two,
             each pinning `proof?: never`. That is the whole reason for the fourth member.

   The `proof` asymmetry is deliberate and load-bearing: the mid-page offer and the closing block
   appear on the same 37 pages, and the fastest way to make them look like the same block twice is
   to give them both a figure row.

   One more constraint rides on the form/actions pairing: a form allows only the empty `actions`
   tuple, because the form's own submit is the primary ask and a second primary beside it is two
   asks in one block. "See available times" used to be a second one — a form here required
   `scheduleHref` — and it moved into EnquiryForm's own action row on 29 Sep 2026 (tracker 2.17),
   so the link sits beside the submit rather than a --gap-stack below the form. EnquiryForm's
   enquiry and audit variants now require `scheduleHref`, which is where the 56-instance
   constraint lives. */

type CtaSplitProps = {
  arrangement?: 'split';
  form: ReactNode;
  actions?: readonly [];
  proof?: ReactNode;
};

type CtaOpenProps = {
  arrangement: 'open';
  form?: never;
  actions: readonly [CtaAction] | readonly [CtaAction, CtaAction];
  proof?: ReactNode;
};

type CtaOfferWithFormProps = {
  arrangement: 'offer';
  form: ReactNode;
  actions?: readonly [];
  proof?: never;
};

type CtaOfferWithActionsProps = {
  arrangement: 'offer';
  form?: never;
  actions: readonly [CtaAction] | readonly [CtaAction, CtaAction];
  proof?: never;
};

export type CtaSectionProps = CtaSectionBaseProps &
  (CtaSplitProps | CtaOpenProps | CtaOfferWithFormProps | CtaOfferWithActionsProps);

/**
 * The lede: eyebrow, heading, copy — the same three parts in the same order in all three
 * arrangements, which is why this is one function rather than three copies. It takes `headingId`
 * rather than generating one, because the id belongs to the region the BAND labels, and only the
 * branch that renders the band knows which one that is.
 */
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
  /* Blank entries are dropped, so a stray empty string in frontmatter produces no <p> and no seam
     around nothing. Note the consequence the spec leaves unstated: the survivors are re-indexed,
     so an empty body[0] promotes body[1] into the lead role rather than rendering an empty lead
     above a body paragraph. Of the two readings that is the one that still looks deliberate. */
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
  /* Whitespace-only detail is treated as absent, not rendered empty — otherwise a bad record puts
     an empty span under a step name and the 4px seam appears around nothing. The ORIGINAL string
     is rendered, not the trimmed one: trimming is the test, not the transform. */
  const detail = point.detail?.trim() ? point.detail : undefined;

  return (
    <Layout rowGap="inline">
      <span className={styles.label}>{point.label}</span>
      {detail ? <span className={styles.detail}>{detail}</span> : null}
    </Layout>
  );
}

/**
 * The ordered list of what happens next, rendered three ways — and the three are the same list in
 * three different tracks rather than three designs:
 *
 *   split   a single-track stack at `--gap-block`. It sits under the lede in the wide column, so it
 *           reads as a continuation of the copy.
 *   open    a 3-up grid from md, each point stacking its marker ABOVE its label rather than beside
 *           it, because a 3-up track is too narrow to put a numeral in front of a step name.
 *   offer   a 2-up grid from md and 3-up from lg. Mid-page, the list is a strip rather than a column.
 *
 * The marker/label relationship is the only thing that changes with the arrangement: `open` stacks
 * them, `split` and `offer` put them on one non-wrapping row. None of them is a wrapping row,
 * because a wrapping row decides per point where the numeral goes. Nothing about
 * the content, the order or the numbering moves.
 */
function CtaPoints({
  arrangement,
  points,
}: {
  arrangement: 'split' | 'open' | 'offer';
  points: readonly CtaPoint[];
}) {
  /* A point with no label is dropped rather than rendered, so a bad frontmatter record cannot put
     a bare numeral in the list. Filtering BEFORE the index is taken is what keeps the numbering
     contiguous: drop the second of four and the rendered markers are 01 02 03, not 01 03 04. */
  const visiblePoints = points.filter((point) => point.label.trim().length > 0);
  if (visiblePoints.length === 0) return null;

  const items = visiblePoints.map((point, index) => {
    /* The list position as a numeral, zero-padded to two digits. The spec asks for a position
       numeral and does not specify the padding; two digits is this implementation's choice, and
       what it buys is a marker of constant width from 01 to 10, so the labels beside them start on
       one vertical line instead of shifting a character when a list crosses nine. It is
       aria-hidden — a screen reader takes position from the <ol> — but a sighted reader counts
       steps with it, which is why it carries a real 4.5:1 contrast floor rather than a decoration
       exemption. */
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

    /* The marker, then the label, on one line: a nowrap Cluster, so the numeral can never orphan
       onto a line of its own (the failure a wrapping Cluster had at 390), and because every marker
       is two mono digits wide, every label in the list starts on one vertical line without a
       track to enforce it. The fixed-ratio tracks this replaced were sized for the 40px stat
       numeral and left a 64–90px gutter beside a 20px one. `baseline` sets the index on the label's
       first line. */
    return (
      <Cluster as="li" key={`${index}-${point.label}`} nowrap colGap="text" align="baseline">
        <span aria-hidden="true" className={styles.marker}>
          {marker}
        </span>
        <span className={styles.pointContent}>
          <CtaPointContent point={point} />
        </span>
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

  /* Two tracks from md and three from lg, so four, five and six points fill complete columns and a
     second row starts under the first row's first label. Three from md, as `open` has, was
     declined: at 768 a third is 213px and the numeral's track would be narrower than the numeral. */
  if (arrangement === 'offer') {
    return (
      <Layout as="ol" columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="gutter">
        {items}
      </Layout>
    );
  }

  /* `--gap-block` between steps, up from `--gap-text` when the points took title and stat scale
     (2.17): at 16 a 40px numeral sat closer to the next step's numeral than to its own detail. */
  return (
    <Layout as="ol" rowGap="block">
      {items}
    </Layout>
  );
}

/**
 * The control row for the actions-only shapes. A form brings its own row — submit and "See
 * available times" together, inside EnquiryForm — so this renders only when there is no form.
 *
 * POSITION decides everything: the first is `solid`/`primary` and takes the `arrow-right` glyph,
 * the second is `ghost`/`neutral` and takes none. A trailing glyph means the click changes where
 * you are, which is true of the first action and true of the second — but two glyphs in one row
 * would make the pair read as two equal offers, and the second is deliberately the quieter one.
 * There is no `emphasis` on `CtaAction` for the same reason.
 *
 * Every control is `size="md"` with `extendHitArea`: the box is 40 and the touch floor is 44, so
 * the target is legal without the row growing. Stepping to `lg` would make this block's buttons
 * taller than every other button on the site.
 */
function CtaActions({ actions }: { actions: readonly CtaAction[] }) {
  return (
    <Cluster colGap="tight" rowGap="tight">
      {actions.map((action, index) => (
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
 * CtaSection — the block that closes a commercial page, built to docs/specs/CtaSection.md.
 *
 * The page's ask, made once: an optional eyebrow, one `h2`, one or two paragraphs, an ordered list
 * of what happens next, and then either a form (which carries its own scheduling link) or nought to two actions.
 * 76 routes, 113 instances — 37 routes carry two, because a mid-page offer and a closing block are
 * both this component.
 *
 * THREE ARRANGEMENTS, and they are three jobs rather than three densities of one shape:
 *
 *   split   closes a page that asks for an ENQUIRY — two columns, form on the right. 56 instances.
 *   open    closes a page that asks for a CLICK — actions, and proof in the right-hand column.
 *           No proof, no right-hand column: the frame is one track rather than a reserved void.
 *   offer   INTERRUPTS a page mid-scroll with the free audit. Sets `density="tight"` itself and
 *           renders its heading one rung down, because a mid-page ask at closing-block scale
 *           competes with the section it interrupts.
 *
 * What changes between them is where four slots sit and two type roles resolve. What does NOT
 * change: any slot's presence, any gap step, the content column, or `Button size="md"` — a CTA
 * whose buttons were taller than every other button on the site would be making a claim about its
 * actions that the design does not intend.
 *
 * It contributes TYPE AND INK only. `Section` paints the band from the `surface` handed to it,
 * `Layout` and `Cluster` own every seam, `Button` owns every interactive value, and the form and
 * proof slots own themselves. There are no `--cta-*` state tokens at all, which is the assertion
 * that this component's rendering is a function of its props: nothing here responds to a pointer
 * and nothing opens.
 *
 * The props are a four-member discriminated union and every member encodes a constraint — see the
 * block above `CtaSplitProps` for why there are four rather than three, and why `proof` is
 * available on two of them and refused on the other two.
 *
 * A server component in effect: `useId` is the only hook, there is no state, no effect, no ref and
 * no DOM handler.
 */
export function CtaSection(props: CtaSectionProps) {
  /* The heading owns the region's name. `useId` rather than a caller-supplied id, because two
     instances on one route would otherwise have to be told apart by hand — and the id is only ever
     pointed at the `h2`, which is always rendered, so the idref can never dangle. */
  const headingId = `${useId()}-heading`;
  const points = props.points ?? [];

  if (props.arrangement === 'open') {
    /* The right-hand column exists only when there is something to put in it. Without proof the
       frame is a single track — the same idiom as `Proof`'s `columns={both ? 'fit' : undefined}` —
       because a 3:2 frame with an empty second track leaves its 470px proof track as dead ground at 1440, and
       ten of the eleven `open` routes pass no proof. Both seams go with the second track: with one
       child there is no column seam and no row seam to size.

       Nothing needs a new measure to stop the ask running the full 1240 column. The heading
       (`--cta-heading-measure`) and every running part (`--cta-body-measure`) are already capped
       by their own `ch` measures. The lead grows from the 706 track to its own ≈748px measure,
       which is accepted (spec 7(b)); only the points row takes the full column, as three 392px
       tracks — the same full-column 3-up shape `open` already has from 768 to 1023. */
    const hasProof = props.proof !== undefined;

    return (
      <Section surface={props.surface} aria-labelledby={headingId} data-arrangement="open">
        {/* This outer stack holds ONE child in this arrangement, so its gap never applies — in
            `open` the proof block is the right-hand column rather than a row beneath, which is the
            one structural difference between this branch and the other two. It is kept so all
            three branches have the same shape at the same depth; the div is inert, not a seam. */}
        <Layout rowGap="stack">
          {/* With proof: 3:2 from lg up and a single column below it. The lede, the points and the
              actions travel together in the wide track; the proof sits beside them and never above
              them, because a proof block above an ask reads as the ask's preamble. Without proof:
              one track at every width. */}
          <Layout
            columns={hasProof ? { base: 1, lg: [3, 2] } : undefined}
            colGap={hasProof ? 'section' : undefined}
            rowGap={hasProof ? 'stack' : undefined}
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
            {hasProof ? <div>{props.proof}</div> : null}
          </Layout>
        </Layout>
      </Section>
    );
  }

  if (props.arrangement === 'offer') {
    /* `offer` is the only arrangement that accepts either shape, so it is the only one that has to
       ask which it was given — split requires a form and open forbids one, and in both cases the
       type has already decided. The `in` narrowing below is that same fact: two union members
       reach this branch, and each supplies exactly one of the two ways to ask. */
    const hasForm = 'form' in props && props.form !== undefined;

    return (
      /* No className. The heading's step down to h2 scale is keyed on data-arrangement in the
         token layer, so the class this used to carry had nothing left to declare — and keeping the
         size and its tracking in one place there is what stops them drifting apart. */
      <Section
        surface={props.surface}
        density="tight"
        aria-labelledby={headingId}
        data-arrangement="offer"
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
          {'actions' in props && props.actions && props.actions.length > 0 ? (
            <CtaActions actions={props.actions} />
          ) : null}
        </Layout>
      </Section>
    );
  }

  /* `split` is the default and the fall-through, which is why it needs no discriminator check: the
     union's first member has `arrangement?: 'split'`, so an omitted arrangement lands here. */
  return (
    <Section surface={props.surface} aria-labelledby={headingId} data-arrangement="split">
      {/* Unlike `open`, this stack has two children — the two columns, then the proof row beneath
          the pair. Proof spans the full band here rather than sitting in a column, because the
          right-hand column is the form's and evidence under both halves reads as evidence for the
          whole ask. */}
      <Layout rowGap="stack">
        {/* 3:2 from lg, one column below. A split (CLAUDE.md § gap scale, rule 2), so --gap-section
            between the halves: copy that persuades on the left and a form that collects on the
            right are two different kinds of thing sharing a row, not two peers. `align="start"` so a short form does not stretch to the
            height of a long lede. */}
        <Layout columns={{ base: 1, lg: [3, 2] }} colGap="section" rowGap="stack" align="start">
          <Layout rowGap="stack">
            <CtaLede
              headingId={headingId}
              eyebrow={props.eyebrow}
              heading={props.heading}
              body={props.body}
            />
            <CtaPoints arrangement="split" points={points} />
          </Layout>
          <div>{props.form}</div>
        </Layout>
        {props.proof !== undefined ? <div>{props.proof}</div> : null}
      </Layout>
    </Section>
  );
}
