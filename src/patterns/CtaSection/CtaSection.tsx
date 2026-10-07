import { isValidElement, useId, type ReactElement, type ReactNode } from 'react';

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
import { cx } from '@/lib/cx';
import { coverSizes, MEDIA_SPLIT, MEDIA_SPLIT_WIDE } from '@/lib/image-sizes';

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
 *   number  the list position as a two-digit mono numeral, in the quiet neutral (owner, 7 Oct 2026: the numbers are auxiliary to the ask) — and the list is an `<ol>`,
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
  /**
   * The photograph's shape, and with it the band's (cmp-cta fix round 1: four K offers that were
   * all one rectangle gave a page with two offers nothing to vary).
   *
   *   portrait   default. [7, 5]: the copy, its points and its actions in 7, a 4:5 photo in 5.
   *   landscape  [5, 7]: the head and its actions in 5, a 3:2 photo in 7 — the photograph is the
   *              band's large thing — and the points as a ruled 3-up strip under both, the width of
   *              the column. For an offer whose photo carries it (a workshop, a product on a screen).
   */
  frame?: 'portrait' | 'landscape';
  /**
   * Below 1024, where the photo sits against the copy (page-product-design fix round 2). Default
   * `after`: the copy, then the photo (§ 3.7 item 4). `before` sets the photo first, for an offer a
   * template places beside another head → photo → list band, where at 390 the two read as one
   * repeated rectangle. The photo is decorative (alt=""), so its DOM position carries no meaning;
   * from 1024 `side` alone decides where it sits.
   */
  phone?: 'after' | 'before';
};

/**
 * One cell of the close's contact strip: a key and its value, e.g. "Write to" / "hello@…".
 * `href` makes the value a link (a `mailto:` or a route from `@/lib/routes`), inked blue by the
 * surface. Strings only, for the reason a point is: no element can be smuggled into the strip.
 */
export type CtaContact = {
  label: string;
  value: string;
  href?: string;
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
   * One or two paragraphs. `body[0]` renders as the lead, `body[1]` as body copy. Optional
   * (cmp-feature, 6 Oct 2026): a close that is a heading and its ask needs no lede, and callers
   * were passing `['']` to satisfy the type.
   *
   * A third paragraph does not compile, and that is the point of the tuple: this block asks, it
   * does not explain. Whatever wants a third paragraph belongs in the page above it.
   */
  body?: readonly [string] | readonly [string, string];
  /** The category label above the heading. Absent renders no element and no seam. */
  eyebrow?: string;
  /**
   * Which ground `Section` paints under this band. Passed straight through and read nowhere else.
   *
   * A prop here rather than an inherited attribute, and it is the same conclusion `SiteNav` and
   * `PageHero` reached: this component IS the band, so it has no ancestor to read `data-surface`
   * from. Passing it through is not the same as owning the ground — the stylesheet paints nothing.
   * The CLOSES (`split`, `open`) default to tint (owner, 7 Oct 2026): the page's last band reads
   * as a closer, stepping paper → tint → the ink footer. The mid-page `offer` defaults to paper — a
   * tinted offer would spend the signal that says "this is the end". Pass `surface` to override.
   */
  surface?: SectionSurface;
  /**
   * The band's id, passed to `Section`: the in-page anchor a page's actions link to — the close's
   * `enquiry` (src/lib/routes.ts `ANCHORS`), so "Start a project" lands on the form. On the band
   * itself rather than a wrapper `div` around it, which added an element that was neither the band
   * nor its content (ServicePage audit, 6 Oct 2026). Distinct from the heading's id, which names the
   * region and is generated.
   */
  id?: string;
  /** The band's archetype for `fold:check` (§ 1.3) — `K` for an offer, `L` for a close — passed to
      Section's `data-band`. A marker for the gate, never a style hook. */
  'data-band'?: string;
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
              on the service pages (§ 5.6: the close is copy and form, on tint — owner, 7 Oct 2026).

   One more constraint rides on the form/actions pairing: a form allows only the empty `actions`
   tuple, because the form's own submit is the primary ask and a second primary beside it is two
   asks in one block. "See available times" moved into EnquiryForm's own action row on 29 Sep 2026
   (tracker 2.17), so CtaSection takes no `scheduleHref`: EnquiryForm's enquiry and audit variants
   require it, which is where the 56-instance constraint lives — and that is its whole scope. */

type CtaSplitProps = {
  arrangement?: 'split';
  /**
   * The full EnquiryForm. A `ReactElement`, not a `ReactNode`, so `form={null}` (or `false`) does
   * not compile: a split close with nothing in its 7-track reserved the track and its 96 seam for
   * nothing. The runtime test is `isValidElement` as well, for a value that escaped the types.
   */
  form: ReactElement;
  actions?: readonly [];
  /** A form's submit always converts and is always blue; there is no solid action to classify. */
  converts?: never;
  /**
   * Refused since cmp-cta fix round 1. A close with the FULL form and a proof row ran 880–1104 at
   * 1470 with standard copy — past the 830 fold at every proof kind — so the evidence for the ask is
   * its own band above the close (a G proof band), and the close is the copy and the form alone.
   */
  proof?: never;
  media?: never;
  /**
   * The contact strip, a `stack` under the lede (or the points): how to reach the studio, how fast
   * it answers, which hours it keeps. One to three cells, side by side from md. It FOLLOWS the copy
   * rather than being pinned to the form's foot (final fix round): it ends in a key and a value, not
   * an action, so § 3.2 rule 1 does not call for the pin, and pinned it opened ~244 of bare paper
   * between the lede and the strip at 1470 — the dead column § 3.2 warns about.
   */
  contact?: readonly CtaContact[];
};

type CtaOpenProps = {
  arrangement: 'open';
  form?: never;
  actions: readonly [CtaAction] | readonly [CtaAction, CtaAction];
  /**
   * Does the FIRST (solid) action convert — does the reader start something with the studio by
   * taking it (start a project, book a call, request an audit, contact, apply, subscribe)? `true`
   * renders the solid blue, `false` ink. Required, no default: judge the action itself, not the page
   * or the band (owner, 7 Oct 2026; visual-direction § 4.5). The ghost partner is blue either way.
   */
  converts: boolean;
  proof?: ReactNode;
  media?: never;
  contact?: never;
};

type CtaOfferWithFormProps = {
  arrangement: 'offer';
  form: ReactNode;
  actions?: readonly [];
  converts?: never;
  proof?: never;
  media?: never;
  contact?: never;
};

type CtaOfferWithActionsProps = {
  arrangement: 'offer';
  form?: never;
  actions: readonly [CtaAction] | readonly [CtaAction, CtaAction];
  /** As on `open`. */
  converts: boolean;
  proof?: never;
  /**
   * The K offer's photograph. With it, the band is [7, 5] — copy in 7 (667 at 1470), the 4:5 photo
   * in 5 (477). Without it, the band is the beside offer: head and actions in the 381 head track,
   * the points in the 763 body track (§ 1.4 "K without a photo").
   */
  media?: CtaMedia;
  contact?: never;
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
/**
 * `scale` picks the heading's step: `offer` h2 (the mid-page ask), `close` h1 (the split close),
 * `open` display (the centred open close). The element is an `h2` in all three.
 */
type CtaHeadingScale = 'offer' | 'close' | 'open';

const HEADING_CLASS: Record<CtaHeadingScale, string | undefined> = {
  offer: styles.heading,
  close: styles.headingClose,
  open: styles.headingOpen,
};

function CtaLede({
  headingId,
  eyebrow,
  heading,
  body,
  leadRole = 'lead',
  scale = 'offer',
  centred = false,
}: {
  headingId: string;
  eyebrow?: string;
  heading: string;
  body?: readonly [string] | readonly [string, string];
  leadRole?: 'lead' | 'body';
  scale?: CtaHeadingScale;
  centred?: boolean;
}) {
  /* Blank entries are dropped, so a stray empty string in frontmatter produces no <p> and no seam
     around nothing. The survivors are re-indexed, so an empty body[0] promotes body[1] into the lead
     role rather than rendering an empty lead above a body paragraph. An absent body (cmp-feature:
     the body is optional) renders the head alone. */
  const paragraphs = (body ?? []).filter((paragraph) => paragraph.trim().length > 0);

  return (
    <Layout rowGap="block" justifyItems={centred ? 'center' : undefined}>
      {/* The eyebrow carries the kit's blue mark, as every band eyebrow does (fix round 1, 7 Oct
          2026): one rule for the label's accent, so no band reads as the unmarked one. */}
      {eyebrow !== undefined ? (
        <Cluster
          as="p"
          colGap="tight"
          align="center"
          nowrap
          justify={centred ? 'center' : 'start'}
          className={styles.eyebrow}
        >
          <span>{eyebrow}</span>
        </Cluster>
      ) : null}
      <h2 id={headingId} className={HEADING_CLASS[scale]}>
        {heading}
      </h2>
      {paragraphs.length > 0 ? (
        <Layout rowGap="text" justifyItems={centred ? 'center' : undefined}>
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
 *   line   the K offer beside its photograph: the marker and the label, ONE line each, no detail
 *          (§ 3.4 K: "≤ 3 one-line points"; final fix round). With a detail under every label the
 *          copy column became a six-line list and the band read as a document beside a photo; the
 *          head and the photograph carry the offer, and two-line points belong to the close.
 *   centred  3-up from md, the marker above its label, NO rule, every line centred on its track:
 *          the open close's centred column (cmp-cta fix round 1). A rule under a centred column
 *          reads as a table's header line; the centring and the 32 gutter separate the three.
 */
type CtaPointsShape = 'line' | 'stack' | 'rows' | 'row' | 'grid' | 'centred';

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

  /* A detail handed to a one-line list is not rendered — the arrangement has no line for it — and
     in development it says so, so the omission is findable rather than silent. */
  if (
    shape === 'line' &&
    process.env.NODE_ENV !== 'production' &&
    visiblePoints.some((point) => point.detail?.trim())
  ) {
    console.warn(
      'CtaSection: the offer beside a photograph sets one-line points; `detail` is not rendered.',
    );
  }

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
    const content =
      shape === 'line' ? (
        <span className={styles.label}>{point.label}</span>
      ) : (
        <CtaPointContent point={point} reading={reading} />
      );

    /* The point's body: the marker above the copy in a 3-up row, in front of it everywhere else —
       a nowrap Cluster, so a marker can never orphan onto a line of its own. */
    if (shape === 'centred') {
      return (
        <Layout as="li" key={key} rowGap="text" justifyItems="center">
          {marker}
          {content}
        </Layout>
      );
    }

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

  if (shape === 'row' || shape === 'centred') {
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
 * first is `solid`, the band's one ask — blue when it converts, ink when it does not (`converts`,
 * owner 7 Oct 2026, visual-direction § 4.5); the second is its partner, a GHOST in the primary
 * tone (owner, 7 Oct 2026: a primary's partner is a ghost, never a link button — link buttons belong
 * in cards and inline contexts). It was a ghost until cmp-cta (6 Oct), a link from then until the
 * 7 Oct ruling. There is no `emphasis` on `CtaAction`: position decides.
 *
 * THE ARROW RULE (owner, 7 Oct 2026): the solid takes no glyph, ever — the ask's label carries it
 * (1 Oct: "no arrow here"). The ghost partner navigates, so it takes the trailing `arrow-right`.
 * EnquiryForm's submit and "See available times →" and CtaRow's solid rows follow the same rule, so
 * every pair in the family is one treatment.
 *
 * Every control is `size="md"` with `extendHitArea`: the box is 40 and the touch floor is 44, so
 * the target is legal without the row growing. `block` (24) between them, as CtaRow and PageHero
 * set it: two boxes need clear air between them.
 */
function CtaActions({
  actions,
  converts,
  justify,
}: {
  actions: readonly CtaAction[];
  /** The solid's kind: blue when it converts, ink when it does not. See `CtaOpenProps.converts`. */
  converts: boolean;
  /** `center` in the open close's centred column; otherwise the row starts at the copy's edge. */
  justify?: 'center';
}) {
  return (
    <Cluster colGap="block" rowGap="block" align="center" justify={justify}>
      {actions.map((action, index) => (
        <Button
          key={`${index}-${action.href}-${action.label}`}
          as="a"
          href={action.href}
          emphasis={index === 0 ? 'solid' : 'ghost'}
          tone={index === 0 && !converts ? 'neutral' : 'primary'}
          size="md"
          extendHitArea
          icon={index === 0 ? undefined : <Icon name="arrow-right" />}
        >
          {action.label}
        </Button>
      ))}
    </Cluster>
  );
}

/**
 * The split close's contact strip: one to three key/value cells side by side from md, a `dl`
 * because each cell IS a term and its value. A cell with a blank key or value is dropped, so a bad
 * record renders no orphan key. `inline` (4) inside a cell — a key and its value — and `gutter`
 * between cells, the gap between items in a set.
 *
 * Beside the form (`besideForm`) the strip is one column from 1024 to 1279 (page-showcase fix round 2,
 * 7 Oct 2026): there the close is [1, 1] and the copy track ~432, so three cells were ~130 each and
 * the address broke mid-word ("hello@tcules.c / om") in the band whose job is to get a visitor to
 * write in. From 1280 the 10 of [10, 7] gives each of three cells ~200 again.
 */
function CtaContactStrip({
  contact,
  besideForm,
}: {
  contact: readonly CtaContact[];
  besideForm: boolean;
}) {
  const cells = contact.filter((cell) => cell.label.trim() && cell.value.trim());
  if (cells.length === 0) return null;

  return (
    <Layout
      as="dl"
      columns={
        besideForm
          ? { base: 1, md: cells.length, lg: 1, xl: cells.length }
          : { base: 1, md: cells.length }
      }
      colGap="gutter"
      rowGap="block"
      align="start"
    >
      {cells.map((cell, index) => (
        <Layout key={`${index}-${cell.label}`} rowGap="inline">
          <dt className={styles.contactKey}>{cell.label}</dt>
          <dd className={styles.contactValue}>
            {cell.href ? <a href={cell.href}>{cell.value}</a> : cell.value}
          </dd>
        </Layout>
      ))}
    </Layout>
  );
}

/** A master's ratio, width ÷ height, for `coverSizes`. */
const ratioOf = (image: MediaImage) => image.width / image.height;

/* The K frame's ratio per `sizes` entry (MEDIA_SPLIT and MEDIA_SPLIT_WIDE: cap, from 1024, below),
   restating --cta-photo-ratio-* (TypeScript cannot read a custom property). The portrait frame is a
   FLOOR, and from 1024 to 1303 the copy column can stretch it to ~0.62, so that entry states the
   tallest it gets: an over-ask by one rung, never an under-ask. */
const PORTRAIT_FRAMES = [4 / 5, 0.62, 4 / 3] as const;
const LANDSCAPE_FRAMES = [3 / 2, 3 / 2, 4 / 3] as const;

/**
 * CtaSection — the page's ask, built to docs/specs/CtaSection.md and visual-direction § 3.4 K / L.
 *
 * An optional eyebrow, one `h2`, one or two paragraphs, a list of points, and then either a form
 * (which carries its own scheduling link) or one to two actions. 76 routes, 113 instances — 37
 * routes carry two, because a mid-page offer and a closing block are both this component.
 *
 * THREE ARRANGEMENTS, and they are three jobs rather than three densities of one shape:
 *
 *   split   L, the close that asks for an ENQUIRY — [10, 7] from 1280 ([1, 1] from 1024): copy,
 *           points and an optional contact strip in 10 (673 at 1470), top-aligned, the full
 *           EnquiryForm filling 7 (471) to the column edge, on paper; with `texture`, at
 *           `density="open"`, the `closing` equaliser rising in the copy column's foot. No proof.
 *   open    the close that asks for a CLICK — a centred column: display heading, lede, a centred
 *           3-up row of points, the actions on the axis, at `density="open"`. With proof, [3, 2]
 *           left-aligned and the proof beside.
 *   offer   K, which INTERRUPTS a page mid-scroll. Sets `density="tight"` itself. Three shapes:
 *             with `media`   [7, 5]: H-full, ≤ 3 one-line points (`line`) and the actions in 7, a quiet 4:5
 *                            photograph in 5 (`media.side` flips it). The copy column is centred on
 *                            the photo, the actions a `stack` under the points (fix round 1). With
 *                            `media.frame="landscape"`, [5, 7]: the lede and actions beside a 3:2
 *                            photo in 7, the points a ruled 3-up strip under both.
 *             without        [1, 2]: head and actions in the 381 head track (H-beside-actions), the
 *                            points in the 763 body track.
 *             with a form    stacked: the lede, the form, then the points as a strip.
 *
 * The heading's SCALE follows the job (fix round 1): the offer is h2, the split close h1, the
 * centred open close display. At h2 the page's last ask weighed what a mid-page head did. The
 * element is an `h2` in every case.
 *
 * It contributes TYPE AND INK only. `Section` paints the band from the `surface` handed to it,
 * `Layout` and `Cluster` own every seam, `Media` the photograph and its radius, `Button` every
 * interactive value, and the form, proof and texture slots own themselves. There are no `--cta-*`
 * state tokens at all: nothing here responds to a pointer and nothing opens.
 *
 * A server component in effect: `useId` is the only hook, there is no state, no effect, no ref and
 * no DOM handler.
 */
/** The closes' ground (owner, 7 Oct 2026): see `surface`. */
const CLOSE_SURFACE: SectionSurface = 'tint';

export function CtaSection(props: CtaSectionProps) {
  /* The heading owns the region's name. `useId` rather than a caller-supplied id, because two
     instances on one route would otherwise have to be told apart by hand — and the id is only ever
     pointed at the `h2`, which is always rendered, so the idref can never dangle. */
  const headingId = `${useId()}-heading`;
  const points = props.points ?? [];
  const markers: CtaPointMarker = props.markers ?? 'number';
  const hasPoints = points.some((point) => point.label.trim().length > 0);

  const lede = (
    options: { leadRole?: 'lead' | 'body'; scale?: CtaHeadingScale; centred?: boolean } = {},
  ) => (
    <CtaLede
      headingId={headingId}
      eyebrow={props.eyebrow}
      heading={props.heading}
      body={props.body}
      {...options}
    />
  );

  if (props.arrangement === 'open') {
    /* `present`, not `!== undefined`, so a `proof={false}` reserves nothing (§ 12 row 6). */
    const hasProof = present(props.proof);

    /* ── Open with proof ─────────────────────────────────────────────────────────────────────
       [3, 2]: the lede (h1), a ruled 3-up row of points and the actions in 3, the proof beside in
       2. Evidence beside the ask needs a column, so this shape stays left-aligned. */
    if (hasProof) {
      return (
        <Section
          surface={props.surface ?? CLOSE_SURFACE}
          id={props.id}
          data-band={props['data-band']}
          aria-labelledby={headingId}
          data-arrangement="open"
        >
          <Layout
            columns={{ base: 1, lg: [3, 2] }}
            colGap="section"
            rowGap="stack"
            align="start"
          >
            <Layout rowGap="stack">
              {lede({ scale: 'close' })}
              <CtaPoints shape="row" markers={markers} points={points} />
              <CtaActions actions={props.actions} converts={props.converts} />
            </Layout>
            <div>{props.proof}</div>
          </Layout>
        </Section>
      );
    }

    /* ── Open, the centred close (cmp-cta fix round 1) ────────────────────────────────────────
       Quantum's close (references.md: "eyebrow, H2, body and actions in a centred column, with the
       texture anchored to the band edge, not behind the text"). The heading at DISPLAY scale on
       the display measure, the lede at its 44ch wedge under it, the points as a centred 3-up row,
       the actions centred on the axis. `density="open"` (128): the close is the page's last beat
       and its bottom padding is where the texture rises, so the field has 128 of its own ground
       below the actions rather than living behind them. It was a flush-left stack of lede, ruled
       row and buttons, which read as a document with an empty right half. */
    return (
      <Section
        surface={props.surface ?? CLOSE_SURFACE}
        id={props.id}
        data-band={props['data-band']}
        aria-labelledby={headingId}
        data-arrangement="open"
      >
        <div className={styles.centred}>
          <Layout rowGap="stack">
            {lede({ scale: 'open', centred: true })}
            {/* The points take the middle 4 of [1, 4, 1] — about 8/12, 784 at 1470 — so the row
                stays inside the centred column's silhouette rather than spreading the full 1240
                (final fix round: at full width it read as a three-feature strip under a narrow
                column). `offset` places the one child; the outer tracks stay empty. */}
            {hasPoints ? (
              <Layout columns={{ lg: [1, 4, 1] }} offset={{ lg: 1 }} colGap="gutter">
                <CtaPoints shape="centred" markers={markers} points={points} />
              </Layout>
            ) : null}
            <CtaActions actions={props.actions} converts={props.converts} justify="center" />
          </Layout>
        </div>
      </Section>
    );
  }

  if (props.arrangement === 'offer') {
    const hasForm = 'form' in props && present(props.form);
    const actions = 'actions' in props && props.actions ? props.actions : [];
    const converts = props.converts === true;
    const media = 'media' in props ? props.media : undefined;

    /* ── K with a landscape photograph (cmp-cta fix round 1) ─────────────────────────────────
       [5, 7]: the lede and the actions in 5, a 3:2 photo in 7 — the photograph is the band's large
       thing — and the points under both as a ruled 3-up strip the width of the column. A genuinely
       different rectangle from the portrait offer, so a page with two offers can vary them. The
       copy column centres on the photo (§ 3.2 rule 2: a head and its actions and nothing between
       them centre rather than stretch). `reverse` for `side="start"` as in the portrait shape. */
    const photoFirst = media?.phone === 'before';
    if (media && !hasForm && media.frame === 'landscape') {
      const landscapePhoto = (
        <div className={cx(styles.photoFrame, styles.photoLandscape)}>
          <Media
            image={media.image}
            fit="fill"
            sizes={coverSizes(MEDIA_SPLIT_WIDE, ratioOf(media.image), LANDSCAPE_FRAMES)}
          />
        </div>
      );
      return (
        <Section
          surface={props.surface}
          id={props.id}
          data-band={props['data-band']}
          aria-labelledby={headingId}
          data-arrangement="offer"
        >
          <Layout rowGap="stack">
            {/* `phone="before"` writes the photo first and mirrors the row from 1024, so the
                photo keeps its 7 and its `side` (Layout reverse carries the weights with it). */}
            <Layout
              columns={photoFirst ? { lg: [7, 5] } : { lg: [5, 7] }}
              colGap="section"
              rowGap="stack"
              reverse={(media.side === 'start') !== photoFirst ? { lg: true } : undefined}
              align="center"
            >
              {photoFirst ? landscapePhoto : null}
              <Layout rowGap="stack">
                {lede()}
                {actions.length > 0 ? <CtaActions actions={actions} converts={converts} /> : null}
              </Layout>
              {photoFirst ? null : landscapePhoto}
            </Layout>
            <CtaPoints shape="row" markers={markers} points={points} />
          </Layout>
        </Section>
      );
    }

    /* ── K with a portrait photograph ────────────────────────────────────────────────────────
       [7, 5] at `section` (96): the copy column in 7, the photo in 5 — the same 477 track as the B
       media split, which is why it reads MEDIA_SPLIT's `sizes`. `reverse` for `side="start"`
       mirrors the template with the children, so the photo keeps its 5 at the start; visual only,
       the copy stays first in the DOM, which is the phone's order (photo BELOW the copy in K, § 3.7
       item 4) and carries no meaning against an atmosphere photo (alt="").

       The copy column is CENTRED on the photo and the actions FOLLOW the points, a `stack` under
       them (page-product-design fix round 1, 7 Oct 2026). It used to stretch to the photo and pin
       the actions to its foot (§ 3.2 rule 1), and with three one-line points that opened a ~160 hole
       between the list and the buttons at 1470 — the dead column § 3.2 warns about. The ask belongs
       to the list it closes. The photo FILLS a frame whose ratio is a floor (`.photoFrame`): where
       the copy is taller than a 4:5 photo — 1024 to 1279, where the 7 track is ~500 — the frame
       stretches with it, so the photo never ends short of the copy. */
    if (media && !hasForm) {
      /* 4:5 beside the copy, 4:3 against it below 1024: a 4:5 at the 326 phone column would be 408
         tall under a band that has already made its ask. `sizes` accounts for the cover crop
         (`coverSizes`), or a landscape master is fetched too short for the frame. */
      const portraitPhoto = (
        <div className={cx(styles.photoFrame, styles.photoPortrait)}>
          <Media
            image={media.image}
            fit="fill"
            sizes={coverSizes(MEDIA_SPLIT, ratioOf(media.image), PORTRAIT_FRAMES)}
          />
        </div>
      );
      return (
        <Section
          surface={props.surface}
          id={props.id}
          data-band={props['data-band']}
          aria-labelledby={headingId}
          data-arrangement="offer"
        >
          <Layout
            columns={photoFirst ? { lg: [5, 7] } : { lg: [7, 5] }}
            colGap="section"
            rowGap="stack"
            reverse={(media.side === 'start') !== photoFirst ? { lg: true } : undefined}
            align="center"
          >
            {photoFirst ? portraitPhoto : null}
            <Layout rowGap="stack">
              {lede()}
              <CtaPoints shape="line" markers={markers} points={points} />
              {actions.length > 0 ? <CtaActions actions={actions} converts={converts} /> : null}
            </Layout>
            {photoFirst ? null : portraitPhoto}
          </Layout>
        </Section>
      );
    }

    /* ── K without a photograph, asking with actions ─────────────────────────────────────────
       [1, 2] at `section` from 1440: the head and its actions in the 381 head track
       (H-beside-actions, the lead at body-lg), the points in the 763 body track (§ 1.4 "K without
       a photo", 411). [5, 7] from 1024 to 1439: at 1024 a third of the column is ~290 and the h2
       ran to four lines, past H-beside-actions' three (fix round 1); 5 of 12 holds it to three.
       With no points there is no body track to fill, and the band is the head alone, one track. */
    if (!hasForm) {
      return (
        <Section
          surface={props.surface}
          id={props.id}
          data-band={props['data-band']}
          aria-labelledby={headingId}
          data-arrangement="offer"
        >
          <Layout
            columns={hasPoints ? { lg: [5, 7], xl: [1, 2] } : undefined}
            colGap={hasPoints ? 'section' : undefined}
            rowGap={hasPoints ? 'stack' : undefined}
            align="start"
          >
            <Layout rowGap="stack">
              {lede({ leadRole: hasPoints ? 'body' : 'lead' })}
              {actions.length > 0 ? <CtaActions actions={actions} converts={converts} /> : null}
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
        id={props.id}
        data-band={props['data-band']}
        aria-labelledby={headingId}
        data-arrangement="offer"
      >
        <Layout rowGap="stack">
          {lede()}
          {hasForm ? <div>{props.form}</div> : null}
          <CtaPoints shape="grid" markers={markers} points={points} />
        </Layout>
      </Section>
    );
  }

  /* `split` is the default and the fall-through, which is why it needs no discriminator check: the
     union's first member has `arrangement?: 'split'`, so an omitted arrangement lands here.

     [10, 7] at `section` from 1280: the copy, its points and its contact strip in 10 (673 at 1470),
     the full EnquiryForm in 7 (471). The 7 is sized TO THE FORM: a one-field row of the full set
     (email, the question, the link) reads as stretched any wider than ~470. EnquiryForm has no
     measure of its own since the cmp-form fix round (6 Oct 2026: one width policy, every variant
     fills its track; the old 470 `--enq-form-max-inline` is deleted), so the form meets the band's
     end edge by filling this track, not by a cap. § 3.4 L draws the close
     as [5, 7] with the form in 667 — that is the COMPACT form, and cmp-form's L-photo; the full-form
     close's [10, 7] is recorded as an amendment to § 3.4 L (docs/kit/brand-amendments.md).
     [1, 1] from 1024 to 1279 (final fix round): at 1024 the 7 is 356, too narrow for the form's
     "Send enquiry" and "See available times" on one row, and the link wrapped under the submit.
     Halves give it 432.

     TOP-ALIGNED (final fix round). The copy no longer stretches to pin its last part to the form's
     foot: pinned, the points left ~110 of bare paper between the lede and point 01, and the contact
     strip ~250 — unfilled, not composed. The copy reads down from the form's first label, and the
     air falls at the foot of the band, where the `closing` texture rises into it.

     No proof row: see `CtaSplitProps.proof`. */
  const contact = props.contact ?? [];
  const hasContact = contact.some((cell) => cell.label.trim() && cell.value.trim());
  const hasForm = isValidElement(props.form);

  return (
    <Section
      surface={props.surface ?? CLOSE_SURFACE}
      id={props.id}
      data-band={props['data-band']}
      aria-labelledby={headingId}
      data-arrangement="split"
    >
      <Layout
        columns={hasForm ? { base: 1, lg: [1, 1], xl: [10, 7] } : undefined}
        colGap={hasForm ? 'section' : undefined}
        rowGap="stack"
        align="start"
      >
        <Layout rowGap="stack">
          {lede({ scale: 'close' })}
          <CtaPoints shape="stack" markers={markers} points={points} />
          {hasContact ? <CtaContactStrip contact={contact} besideForm={hasForm} /> : null}
        </Layout>
        {hasForm ? <div>{props.form}</div> : null}
      </Layout>
    </Section>
  );
}
