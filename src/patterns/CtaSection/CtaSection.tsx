import { useId, type ReactNode } from 'react';

import {
  Button,
  Cluster,
  Icon,
  Layout,
  Media,
  Section,
  type IconName,
  type MediaImage,
  type SectionSurface,
} from '@/components';
import { MEDIA_SPLIT } from '@/lib/image-sizes';

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

/** A point under `markers="icon"`: the glyph is required, so no point renders a hole in the column. */
export type CtaIconPoint = CtaPoint & {
  icon: IconName;
};

/**
 * What stands in front of each point (cmp-cta, 6 Oct 2026).
 *
 *   number  the list position as a two-digit mono numeral, in blue — and the list is an `<ol>`,
 *           because the order is the meaning ("what happens next"). The default.
 *   icon    a Solar Bold glyph at `xl` (24), in the same blue (visual-direction § 4.2: icons and
 *           markers are the foreground accent). The list is a `<ul>`: an icon names a kind of thing,
 *           not a position, so these are the contents of an offer rather than a sequence.
 *   plain   no marker. A `<ul>`. The serif label carries the point on its own — for an offer whose
 *           points are short claims that a numeral or a glyph would over-dress.
 */
export type CtaPointMarker = 'number' | 'icon' | 'plain';

/** One action. `href` comes from `@/lib/routes` at the call site, never written out there. */
export type CtaAction = {
  label: string;
  href: string;
};

/** Which inline end of the band the K offer's photograph takes from 1024. Below 1024 it follows the copy. */
export type CtaMediaSide = 'start' | 'end';

/**
 * The K offer's photograph (visual-direction § 3.4 K, § 5.2: "an ask — one quiet photograph").
 *
 * A record rather than a ReactNode for the reason ContentSection's `media` is one: the crop is the
 * arrangement's, not the caller's — 4:5 in the 477 track from 1024 and 4:3 below it (§ 3.7 item 4),
 * at the split track's `sizes`. A caller handing over a finished `<Media>` would have to know all
 * three at every call site. A `quiet` photograph only (§ 5.5 rule 3); the registry tags it.
 */
export type CtaMedia = {
  image: MediaImage;
  /** Default `end` — the copy leads, the photo closes the row. `start` flips it (§ 3.2 rule 4). */
  side?: CtaMediaSide;
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
   * Which ground `Section` paints under this band. Passed straight through and read nowhere else.
   *
   * A prop here rather than an inherited attribute, and it is the same conclusion `SiteNav` and
   * `PageHero` reached: this component IS the band, so it has no ancestor to read `data-surface`
   * from. Passing it through is not the same as owning the ground — the stylesheet paints nothing.
   * The close sits on paper (§ 3.4 L); tint is a specimen's surface proof only.
   */
  surface?: SectionSurface;
};

/**
 * The points and their marker, as one decision: `markers="icon"` requires every point to carry its
 * glyph, so the pairing is a type rather than a review comment.
 *
 * Empty or absent renders no list and no seam. 20 of the 113 instances are expected to be pointless.
 */
type CtaPointsProps =
  | {
      /** Default `number`. See `CtaPointMarker`. */
      markers?: 'number' | 'plain';
      points?: readonly CtaPoint[];
    }
  | {
      markers: 'icon';
      points?: readonly CtaIconPoint[];
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

   Two more asymmetries arrived with the kit (cmp-cta, 6 Oct 2026), each also a type:

     media    the K offer's photograph — on the offer with ACTIONS only. A photo beside a compact
              form is cmp-form's L-photo variation, composed there; and a close carries no photograph
              on the service pages (§ 5.6: the close is copy, form and texture).
     texture  the closes only (split, open). The K offer's photo fills its band, so it carries no
              texture (§ 4.3's band table: K spends its solid; L spends its solid and `closing`).

   One more constraint rides on the form/actions pairing: a form allows only the empty `actions`
   tuple, because the form's own submit is the primary ask and a second primary beside it is two
   asks in one block. "See available times" moved into EnquiryForm's own action row on 29 Sep 2026
   (tracker 2.17), so CtaSection takes no `scheduleHref`: EnquiryForm's enquiry and audit variants
   require it, which is where the 56-instance constraint lives — and that is its whole scope. */

type CtaSplitProps = {
  arrangement?: 'split';
  form: ReactNode;
  actions?: readonly [];
  proof?: ReactNode;
  media?: never;
  /**
   * A `<Texture>` composed by the caller, rendered as the band's first child so it fills the band
   * edge to edge beneath the content. The L close takes the `closing` placement (§ 6.3): under the
   * copy column's foot, running into the footer seam, the form column clean. A slot and not a
   * recipe name, because the recipes are Texture's and a pattern takes its sibling as a node.
   */
  texture?: ReactNode;
};

type CtaOpenProps = {
  arrangement: 'open';
  form?: never;
  actions: readonly [CtaAction] | readonly [CtaAction, CtaAction];
  proof?: ReactNode;
  media?: never;
  /** As on `split`. */
  texture?: ReactNode;
};

type CtaOfferWithFormProps = {
  arrangement: 'offer';
  form: ReactNode;
  actions?: readonly [];
  proof?: never;
  media?: never;
  texture?: never;
};

type CtaOfferWithActionsProps = {
  arrangement: 'offer';
  form?: never;
  actions: readonly [CtaAction] | readonly [CtaAction, CtaAction];
  proof?: never;
  /**
   * The K offer's photograph. With it, the band is [7, 5] — copy in 7 (667 at 1470), the 4:5 photo
   * in 5 (477). Without it, the band is the beside offer: head and actions in the 381 head track,
   * the points in the 763 body track (§ 1.4 "K without a photo").
   */
  media?: CtaMedia;
  texture?: never;
};

export type CtaSectionProps = CtaSectionBaseProps &
  CtaPointsProps &
  (CtaSplitProps | CtaOpenProps | CtaOfferWithFormProps | CtaOfferWithActionsProps);

/**
 * Is there anything in this slot to render? `null`, `undefined`, a boolean and an empty string all
 * render nothing in React, so each is ABSENT here too — otherwise `proof={hasProof && <Proof />}`
 * would reserve a column, a 48 seam and an empty div for a `false` (spec § 12 row 6: an absent slot
 * renders no element and no seam). `0` renders a "0" in React, so it counts as present.
 */
function present(node: ReactNode): boolean {
  return node != null && typeof node !== 'boolean' && node !== '';
}

/**
 * The lede: eyebrow, heading, copy — the same three parts in the same order in every arrangement,
 * which is why this is one function rather than copies. It takes `headingId` rather than generating
 * one, because the id belongs to the region the BAND labels, and only the branch that renders the
 * band knows which one that is.
 *
 * `leadRole="body"` sets `body[0]` at body-lg rather than lead: a lede in the 381 head track is
 * H-beside-actions, whose lead is body-lg on up to four lines (§ 1.4, § 7.1 "Section head (beside)").
 */
function CtaLede({
  headingId,
  eyebrow,
  heading,
  body,
  leadRole = 'lead',
}: {
  headingId: string;
  eyebrow?: string;
  heading: string;
  body: readonly [string] | readonly [string, string];
  leadRole?: 'lead' | 'body';
}) {
  /* Blank entries are dropped, so a stray empty string in frontmatter produces no <p> and no seam
     around nothing. The survivors are re-indexed, so an empty body[0] promotes body[1] into the lead
     role rather than rendering an empty lead above a body paragraph. */
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
              className={index === 0 && leadRole === 'lead' ? styles.lead : styles.body}
            >
              {paragraph}
            </p>
          ))}
        </Layout>
      ) : null}
    </Layout>
  );
}

function CtaPointContent({ point, reading = false }: { point: CtaPoint; reading?: boolean }) {
  /* Whitespace-only detail is treated as absent, not rendered empty — otherwise a bad record puts
     an empty span under a step name and the 8px seam appears around nothing. The ORIGINAL string
     is rendered, not the trimmed one: trimming is the test, not the transform.

     Label to detail is `tight` (8), not `inline` (4): `inline` is a key and its value, and a step
     name over the sentence describing it is a tight pair (visual-direction § 1.1, S5). */
  const detail = point.detail?.trim() ? point.detail : undefined;

  return (
    <Layout rowGap="tight">
      <span className={styles.label}>{point.label}</span>
      {detail ? (
        <span className={reading ? styles.detailReading : styles.detail}>{detail}</span>
      ) : null}
    </Layout>
  );
}

/**
 * How the list sits in its band — four shapes of one list, chosen by the arrangement:
 *
 *   stack  a single track at `--gap-block`, beside a photograph or a form: the K offer's and the L
 *          close's 667 copy column. The image or the form is the band's large thing, so the list
 *          stays light — no rule, the marker and the serif label carry each step.
 *   rows   the same single track, each point OPENED by a hairline (§ 3.1 item 5: "between the rows
 *          of a read-down list"), its detail at body rather than body-sm. The beside offer's 763 body
 *          track, where the list IS the band's body and runs at a reading measure (§ 7.2: a row's
 *          body steps with the track). Without the rules, three small rows floated in 763 of paper.
 *   row    3-up from md, the marker ABOVE its label, because a 392 track (or ~207 beside proof) is
 *          too narrow to put a marker in front of a step name and still read as a row. Each point is
 *          opened by a hairline the width of its track, the text-only card's top edge (§ 3.1), and
 *          the 32 gutter breaks the rule between them so the row reads as three objects. `open`.
 *   grid   2-up from md and 3-up from lg. The offer with a form, where the list is a strip under it.
 */
type CtaPointsShape = 'stack' | 'rows' | 'row' | 'grid';

/**
 * The points, in one of four shapes with one of three markers. Nothing about the content, the
 * order or the numbering moves between them; only where the marker sits and what it is.
 *
 * In `stack` and `grid` the marker sits in FRONT of the label on one non-wrapping row — a nowrap
 * Cluster, so a marker can never orphan onto a line of its own (the failure a wrapping Cluster had
 * at 390). A numeral sits on the label's first baseline (`baseline`); a glyph has no baseline, so it
 * tops out with the label's line box (`start`) — a 24 glyph against the h5 label's ~28 line box.
 */
function CtaPoints({
  shape,
  markers,
  points,
}: {
  shape: CtaPointsShape;
  markers: CtaPointMarker;
  points: readonly (CtaPoint & { icon?: IconName })[];
}) {
  /* A point with no label is dropped rather than rendered, so a bad frontmatter record cannot put
     a bare numeral in the list. Filtering BEFORE the index is taken is what keeps the numbering
     contiguous: drop the second of four and the rendered markers are 01 02 03, not 01 03 04. */
  const visiblePoints = points.filter((point) => point.label.trim().length > 0);
  if (visiblePoints.length === 0) return null;

  /* An ordered list only when the marker IS the order. Icons and plain points are an offer's
     contents, not a sequence, and an `<ol>` would announce a position nobody can see. */
  const listElement = markers === 'number' ? 'ol' : 'ul';

  const items = visiblePoints.map((point, index) => {
    const key = `${index}-${point.label}`;

    /* The marker. A numeral is the position zero-padded to two digits — a marker of constant width
       from 01 to 10, so every label starts on one vertical line. It is aria-hidden (the <ol> carries
       position) but a sighted reader counts with it, so it holds a real 4.5:1. A glyph is decorative
       beside its label and Icon hides it. */
    const marker =
      markers === 'number' ? (
        <span aria-hidden="true" className={styles.marker}>
          {String(index + 1).padStart(2, '0')}
        </span>
      ) : markers === 'icon' && point.icon ? (
        <span className={styles.glyph}>
          <Icon name={point.icon} size="xl" />
        </span>
      ) : null;

    const reading = shape === 'rows';
    const content = <CtaPointContent point={point} reading={reading} />;

    /* The point's body: the marker above the copy in a 3-up row, in front of it everywhere else —
       a nowrap Cluster, so a marker can never orphan onto a line of its own. */
    const body =
      marker === null ? (
        content
      ) : shape === 'row' ? (
        <Layout rowGap="text">
          {marker}
          {content}
        </Layout>
      ) : (
        <Cluster nowrap colGap="text" align={markers === 'number' ? 'baseline' : 'start'}>
          {marker}
          {/* A div, not a span: CtaPointContent is a Layout, and a div inside a span is invalid. */}
          <div className={styles.pointContent}>{content}</div>
        </Cluster>
      );

    /* A ruled point: the hairline heads it, `block` (24) to its content — head to body inside a
       block, CtaRow's rule-to-row step. An empty div with one block-start border, not an <hr>: it
       is decoration, not a break a screen reader should announce inside a list item. */
    if (shape === 'row' || shape === 'rows') {
      return (
        <Layout as="li" key={key} rowGap="block">
          <div className={styles.rule} />
          {body}
        </Layout>
      );
    }

    return <li key={key}>{body}</li>;
  });

  if (shape === 'row') {
    return (
      <Layout as={listElement} columns={{ base: 1, md: 3 }} colGap="gutter" rowGap="gutter">
        {items}
      </Layout>
    );
  }

  /* Two tracks from md and three from lg, so four, five and six points fill complete columns and a
     second row starts under the first row's first label. Three from md was declined: at 768 a
     third is 213px and the numeral's track would be narrower than the numeral. */
  if (shape === 'grid') {
    return (
      <Layout
        as={listElement}
        columns={{ base: 1, md: 2, lg: 3 }}
        colGap="gutter"
        rowGap="gutter"
      >
        {items}
      </Layout>
    );
  }

  /* Ruled rows sit a `gutter` (32) apart — rule to rule, the content's 24 below each rule plus a
     clear 32 above the next, so a rule always belongs to the row it opens. */
  if (shape === 'rows') {
    return (
      <Layout as={listElement} rowGap="gutter">
        {items}
      </Layout>
    );
  }

  return (
    <Layout as={listElement} rowGap="block">
      {items}
    </Layout>
  );
}

/**
 * The control row for the actions-only shapes. A form brings its own row — submit and "See
 * available times" together, inside EnquiryForm — so this renders only when there is no form.
 *
 * POSITION decides emphasis, and it is the hero's shape exactly (PageHero, CtaRow `solid`): the
 * first is `solid`/`primary`, the band's one ask; the second is a LINK in the primary tone, blue at
 * rest (visual-direction § 4.2: "every link-style action, including a second action beside a solid").
 * It was a `ghost` until cmp-cta (6 Oct 2026): a ghost is a second box beside the first, and two
 * boxes in one row read as two asks of equal standing. A link is plainly the alternative. There is
 * no `emphasis` on `CtaAction` for that reason.
 *
 * NO GLYPH on either (1 Oct 2026, owner: "no arrow here"). These are the page's asks; the label
 * carries them.
 *
 * Every control is `size="md"` with `extendHitArea`: the box is 40 and the touch floor is 44, so
 * the target is legal without the row growing. `block` (24) between them, as CtaRow and PageHero
 * set it: a bare link label 8 from a filled box reads as part of it.
 */
function CtaActions({ actions }: { actions: readonly CtaAction[] }) {
  return (
    <Cluster colGap="block" rowGap="block" align="center">
      {actions.map((action, index) => (
        <Button
          key={`${index}-${action.href}-${action.label}`}
          as="a"
          href={action.href}
          emphasis={index === 0 ? 'solid' : 'link'}
          tone="primary"
          size="md"
          extendHitArea
        >
          {action.label}
        </Button>
      ))}
    </Cluster>
  );
}

/**
 * CtaSection — the page's ask, built to docs/specs/CtaSection.md and visual-direction § 3.4 K / L.
 *
 * An optional eyebrow, one `h2`, one or two paragraphs, a list of points, and then either a form
 * (which carries its own scheduling link) or one to two actions. 76 routes, 113 instances — 37
 * routes carry two, because a mid-page offer and a closing block are both this component.
 *
 * THREE ARRANGEMENTS, and they are three jobs rather than three densities of one shape:
 *
 *   split   L, the close that asks for an ENQUIRY — [7, 5]: copy and points in 7 (667 at 1470), the
 *           full EnquiryForm at its own 470 measure in 5 (477), on paper, with the `closing` texture
 *           under the copy's foot.
 *   open    the close that asks for a CLICK — the lede, a 3-up row of points and the actions in one
 *           track; with proof, [3, 2] and the proof beside. No proof, no right-hand column.
 *   offer   K, which INTERRUPTS a page mid-scroll. Sets `density="tight"` itself. Three shapes:
 *             with `media`   [7, 5]: H-full, ≤ 3 one-line points and the actions in 7, a quiet 4:5
 *                            photograph in 5 (`media.side` flips it). The copy column stretches to
 *                            the photo and pins the actions to its foot (§ 3.2 rule 1).
 *             without        [1, 2]: head and actions in the 381 head track (H-beside-actions), the
 *                            points in the 763 body track.
 *             with a form    stacked: the lede, the form, then the points as a strip.
 *
 * Every heading is set at h2 scale (visual-direction § 7.1, "Close: --text-h2"; § 1.4's K and L
 * arithmetic). The close was h1 from 29 Sep; in the kit its weight comes from its form, its points
 * and its texture, and one display line per page (the hero's) keeps the ladder legible.
 *
 * It contributes TYPE AND INK only. `Section` paints the band from the `surface` handed to it,
 * `Layout` and `Cluster` own every seam, `Media` the photograph and its radius, `Button` every
 * interactive value, and the form, proof and texture slots own themselves. There are no `--cta-*`
 * state tokens at all: nothing here responds to a pointer and nothing opens.
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
  const markers: CtaPointMarker = props.markers ?? 'number';
  const hasPoints = points.some((point) => point.label.trim().length > 0);

  const lede = (leadRole?: 'lead' | 'body') => (
    <CtaLede
      headingId={headingId}
      eyebrow={props.eyebrow}
      heading={props.heading}
      body={props.body}
      leadRole={leadRole}
    />
  );

  if (props.arrangement === 'open') {
    /* The right-hand column exists only when there is something to put in it. Without proof the
       frame is a single track — the same idiom as `Proof`'s `columns={both ? 'fit' : undefined}` —
       because a 3:2 frame with an empty second track leaves its ~458px proof track as dead ground at
       1440, and ten of the eleven `open` routes pass no proof. `present`, not `!== undefined`, so a
       `proof={false}` reserves nothing either (§ 12 row 6). */
    const hasProof = present(props.proof);

    return (
      <Section surface={props.surface} aria-labelledby={headingId} data-arrangement="open">
        {present(props.texture) ? props.texture : null}
        <Layout
          columns={hasProof ? { base: 1, lg: [3, 2] } : undefined}
          colGap={hasProof ? 'section' : undefined}
          rowGap={hasProof ? 'stack' : undefined}
          align="start"
        >
          <Layout rowGap="stack">
            {lede()}
            <CtaPoints shape="row" markers={markers} points={points} />
            <CtaActions actions={props.actions} />
          </Layout>
          {hasProof ? <div>{props.proof}</div> : null}
        </Layout>
      </Section>
    );
  }

  if (props.arrangement === 'offer') {
    const hasForm = 'form' in props && present(props.form);
    const actions = 'actions' in props && props.actions ? props.actions : [];
    const media = 'media' in props ? props.media : undefined;

    /* ── K with a photograph ─────────────────────────────────────────────────────────────────
       [7, 5] at `section` (96): the copy column in 7, the photo in 5 — the same 477 track as the B
       media split, which is why it reads MEDIA_SPLIT's `sizes`. `reverse` for `side="start"`
       mirrors the template with the children, so the photo keeps its 5 at the start; visual only,
       the copy stays first in the DOM, which is the phone's order (photo BELOW the copy in K, § 3.7
       item 4) and carries no meaning against an atmosphere photo (alt="").

       § 3.2 rule 1: the copy column ends in an action with points between, so it stretches to the
       photo's height, its head on the photo's top edge and its actions pinned to the photo's foot.
       A copy column that is a head and its actions and nothing else is CENTRED on the photo
       instead — stretched, it left a 350–400 hole between the lead and the action (§ 3.2, the
       fdn-section-head fix round). The photo sits in a plain div so a stretched row cannot take
       the image's height and lose its 4:5. */
    if (media && !hasForm) {
      return (
        <Section
          surface={props.surface}
          density="tight"
          aria-labelledby={headingId}
          data-arrangement="offer"
        >
          <Layout
            columns={{ lg: [7, 5] }}
            colGap="section"
            rowGap="stack"
            reverse={media.side === 'start' ? { lg: true } : undefined}
            align={hasPoints ? 'stretch' : 'center'}
          >
            <Layout rowGap="stack" pinLast={hasPoints}>
              {lede()}
              <CtaPoints shape="stack" markers={markers} points={points} />
              {actions.length > 0 ? <CtaActions actions={actions} /> : null}
            </Layout>
            <div>
              {/* 4:5 beside the copy, 4:3 under it below 1024: a 4:5 at the 326 phone column would
                  be 408 tall under a band that has already made its ask. */}
              <Media
                image={media.image}
                ratio={{ base: '4/3', lg: '4/5' }}
                sizes={MEDIA_SPLIT}
              />
            </div>
          </Layout>
        </Section>
      );
    }

    /* ── K without a photograph, asking with actions ─────────────────────────────────────────
       [1, 2] at `section`: the head and its actions in the 381 head track (H-beside-actions, the
       lead at body-lg), the points in the 763 body track (§ 1.4 "K without a photo", 411). With no
       points there is no body track to fill, and the band is the head alone, one track. */
    if (!hasForm) {
      return (
        <Section
          surface={props.surface}
          density="tight"
          aria-labelledby={headingId}
          data-arrangement="offer"
        >
          <Layout
            columns={hasPoints ? { lg: [1, 2] } : undefined}
            colGap={hasPoints ? 'section' : undefined}
            rowGap={hasPoints ? 'stack' : undefined}
            align="start"
          >
            <Layout rowGap="stack">
              {lede(hasPoints ? 'body' : 'lead')}
              {actions.length > 0 ? <CtaActions actions={actions} /> : null}
            </Layout>
            <CtaPoints shape="rows" markers={markers} points={points} />
          </Layout>
        </Section>
      );
    }

    /* ── The offer with a form ───────────────────────────────────────────────────────────────
       Stacked: the lede, the form, then the points as a 2- and 3-up strip. The compact-form
       variation of this shape is composed in cmp-form's specimen. */
    return (
      <Section
        surface={props.surface}
        density="tight"
        aria-labelledby={headingId}
        data-arrangement="offer"
      >
        <Layout rowGap="stack">
          {lede()}
          <div>{props.form}</div>
          <CtaPoints shape="grid" markers={markers} points={points} />
        </Layout>
      </Section>
    );
  }

  /* `split` is the default and the fall-through, which is why it needs no discriminator check: the
     union's first member has `arrangement?: 'split'`, so an omitted arrangement lands here.

     [7, 5] at `section` from 1024: the copy and its points in 7 (667 at 1470), the full EnquiryForm
     in 5 (477). It was [3, 2] (686 | 458) until cmp-cta. § 3.4 L draws the close as [5, 7] with
     the form in 667, but the FULL form holds its own 470 measure (`--enq-form-max-inline`:
     one-field rows read as stretched any wider), so in 667 it left ~197 of dead track at the
     band's end edge, the one edge every other band meets. In 477 the form meets that edge, and the
     copy column takes the points' details on one line. The compact form at 667 is cmp-form's
     L-photo (§ 3.4 L, second form). `align="start"` so a short form does not stretch to the height
     of a long lede. The proof, when there is one, spans both halves a `stack` under them: evidence
     under both halves reads as evidence for the whole ask. */
  const hasProof = present(props.proof);

  return (
    <Section surface={props.surface} aria-labelledby={headingId} data-arrangement="split">
      {present(props.texture) ? props.texture : null}
      <Layout rowGap="stack">
        <Layout columns={{ base: 1, lg: [7, 5] }} colGap="section" rowGap="stack" align="start">
          <Layout rowGap="stack">
            {lede()}
            <CtaPoints shape="stack" markers={markers} points={points} />
          </Layout>
          <div>{props.form}</div>
        </Layout>
        {hasProof ? <div>{props.proof}</div> : null}
      </Layout>
    </Section>
  );
}
