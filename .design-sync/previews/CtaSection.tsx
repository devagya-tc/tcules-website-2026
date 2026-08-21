import { CtaSection, EnquiryForm, Layout } from 'tcules-website-2026';
import type { CtaPoint, EnquiryContextBase } from 'tcules-website-2026';

/* NOTE: these preview files are type-STRIPPED, not type-checked (see .design-sync/NOTES.md), so an
   invalid prop value fails silently at render. Two things to keep honest here:
   `Cluster` caps at `block` (this file uses no Cluster of its own), and `body` is a 1- or 2-tuple —
   a third paragraph is a compile error at a real call site even though it would render here. */

const POINTS: CtaPoint[] = [
  { label: 'A named senior lead', detail: 'the person you meet is the person who does the work' },
  { label: 'Two weeks to first shipped change', detail: 'not to first slide deck' },
  { label: 'Your team keeps the system', detail: 'tokens, components and the reasoning behind both' },
];

const SPLIT_BODY: readonly [string, string] = [
  'Tell us what you are trying to ship and we will tell you whether we are the right people for it — including when we are not.',
  'You get a reply from the person who would run the work, not a form receipt.',
];

const OPEN_BODY: readonly [string] = [
  'Two ways in, depending on how far along the thinking is. Both reach the same team.',
];

const OFFER_BODY: readonly [string] = [
  'A free audit of one flow in your product: what it costs you today, and the three changes that would pay for themselves first.',
];

/* The context every enquiry carries. Required as a whole object by EnquiryForm. */
const CONTEXT: EnquiryContextBase = {
  originRoute: '/services/design-systems',
  placement: 'closing',
  family: 'services',
  serviceOrAudit: 'design-systems',
  referrer: 'organic',
  campaign: 'none',
};

/**
 * The `form` slot is a `ReactNode`, and **`EnquiryForm` is what goes in it.** That pairing is the
 * composition the design intends: CtaSection brings the band, the lede and the points; EnquiryForm
 * brings the fields, their validation and the submit.
 *
 * These cards used to show hand-rolled browser-default inputs with a note saying no form component
 * existed yet. One does now, so they show the real thing — do not build fields into this slot by
 * hand.
 */
function FormSlot({ audit = false }: { audit?: boolean }) {
  return audit ? (
    <EnquiryForm
      variant="audit"
      action="/api/audit"
      context={{ ...CONTEXT, placement: 'mid-page', intent: 'ux-audit' }}
    />
  ) : (
    <EnquiryForm action="/api/enquiry" context={CONTEXT} />
  );
}

/**
 * The proof slot, also caller-supplied. It holds ONE thing — figures or a quote or both — because a
 * page that shows a rating, its review themes and a client quote shows them as one block. A
 * separate Proof pattern is briefed for this; until it exists the slot takes whatever the page has.
 */
function ProofSlot({ quote = false }: { quote?: boolean }) {
  return quote ? (
    <Layout rowGap="inline">
      <p>
        “They found the two changes that mattered in a fortnight, and taught us how to find the
        next ones ourselves.”
      </p>
      <p>Head of Product, ConnectX</p>
    </Layout>
  ) : (
    <Layout columns={3} colGap="gutter" rowGap="block">
      <Layout rowGap="inline">
        <p>4.8 / 5</p>
        <p>across 34 client reviews</p>
      </Layout>
      <Layout rowGap="inline">
        <p>76 routes</p>
        <p>closed with this block</p>
      </Layout>
      <Layout rowGap="inline">
        <p>2 weeks</p>
        <p>to first shipped change</p>
      </Layout>
    </Layout>
  );
}

/**
 * The block that closes a commercial page — the page's ask, made once, at the end.
 *
 * THREE ARRANGEMENTS, and they are three different jobs rather than three densities of one shape.
 * Pick by what the page is asking the reader to do:
 *
 *   split   (the default) closes a page that asks for an ENQUIRY. Lede and points on one side, a
 *           form and a scheduling link on the other. Takes `form` + `scheduleHref`, and may take
 *           `proof`.
 *   open    closes a page that asks for a CLICK. No form — one or two `actions` instead, and it
 *           may take `proof`.
 *   offer   INTERRUPTS a page mid-scroll with the free audit. Takes either a form and a schedule
 *           link, or actions — never both, and never `proof`.
 *
 * Those combinations are enforced by the type, not by convention: `arrangement="open"` with a
 * `form`, or `arrangement="offer"` with `proof`, does not compile. So compose by choosing the
 * arrangement and filling what it asks for, and let the type refuse the rest.
 *
 * It brings its own band and takes `surface`, like the other band-owning patterns. It carries an
 * `h2`, never an `h1` — the page's one `h1` belongs to `PageHero` — and it labels its own region
 * from that heading, so it needs no `aria-label` from the caller.
 */
export function Default() {
  return (
    <CtaSection
      heading="Tell us what you are trying to ship"
      body={SPLIT_BODY}
      points={POINTS}
      form={<FormSlot />}
      scheduleHref="/contact"
    />
  );
}

/** The enquiry close with its proof block — figures, in this case. 56 routes use this shape. */
export function SplitWithProof() {
  return (
    <CtaSection
      eyebrow="Start a project"
      heading="Tell us what you are trying to ship"
      body={SPLIT_BODY}
      points={POINTS}
      form={<FormSlot />}
      scheduleHref="/contact"
      proof={<ProofSlot />}
    />
  );
}

/** The click close: one or two actions and no form. The second action is the quieter one. */
export function Open() {
  return (
    <CtaSection
      arrangement="open"
      eyebrow="Work with us"
      heading="Choose the next useful move"
      body={OPEN_BODY}
      points={POINTS}
      actions={[
        { label: 'Discuss the relevant project', href: '/contact' },
        { label: 'See how we work', href: '/how-we-work' },
      ]}
    />
  );
}

/** The click close with a quote in the proof slot — the shape `/clients` and `/how-we-work` use. */
export function OpenWithQuote() {
  return (
    <CtaSection
      arrangement="open"
      heading="Choose the next useful move"
      body={OPEN_BODY}
      points={POINTS}
      actions={[{ label: 'Discuss the relevant project', href: '/contact' }]}
      proof={<ProofSlot quote />}
    />
  );
}

/** The mid-scroll interruption, with a form. `proof` is not available here, by type: an offer that
    stops to show evidence has stopped being an interruption. */
export function Offer() {
  return (
    <CtaSection
      arrangement="offer"
      heading="See what your current experience is costing"
      body={OFFER_BODY}
      points={POINTS}
      form={<FormSlot audit />}
      scheduleHref="/contact"
    />
  );
}

/** The same interruption asking for a click instead. One action, no form, no schedule link. */
export function OfferWithAction() {
  return (
    <CtaSection
      arrangement="offer"
      heading="Get an outside view before you commit"
      body={OFFER_BODY}
      points={POINTS}
      actions={[{ label: 'Request free audit', href: '/audits' }]}
    />
  );
}

/** No points. The list is optional and an absent one costs no space — the lede simply sits alone. */
export function WithoutPoints() {
  return (
    <CtaSection
      arrangement="open"
      heading="Choose the next useful move"
      body={OPEN_BODY}
      actions={[{ label: 'Discuss the relevant project', href: '/contact' }]}
    />
  );
}

/** On tint: the quiet end of every ramp steps one darker, because the ground did. */
export function OnTint() {
  return (
    <CtaSection
      surface="tint"
      eyebrow="Start a project"
      heading="Tell us what you are trying to ship"
      body={SPLIT_BODY}
      points={POINTS}
      form={<FormSlot />}
      scheduleHref="/contact"
    />
  );
}

/** On ink the direction inverts and the ramp gets more room. */
export function OnInk() {
  return (
    <CtaSection
      surface="ink"
      arrangement="open"
      eyebrow="Work with us"
      heading="Choose the next useful move"
      body={OPEN_BODY}
      points={POINTS}
      actions={[
        { label: 'Discuss the relevant project', href: '/contact' },
        { label: 'See how we work', href: '/how-we-work' },
      ]}
    />
  );
}

/** On blue only the light end of the ramp clears AA — the surface a closing ask most often takes. */
export function OnBlue() {
  return (
    <CtaSection
      surface="blue"
      arrangement="offer"
      heading="Get an outside view before you commit"
      body={OFFER_BODY}
      points={POINTS}
      actions={[{ label: 'Request free audit', href: '/audits' }]}
    />
  );
}
