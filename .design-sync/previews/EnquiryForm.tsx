import { EnquiryForm, Section } from 'tcules-website-2026';
import type { EnquiryContextBase } from 'tcules-website-2026';

/* NOTE: preview files are type-STRIPPED, not type-checked (see .design-sync/NOTES.md). This file
   uses no Cluster of its own, so the `block` gap cap cannot be tripped. */

/* The hidden context every submission carries. It is required, and it is required as a whole
   object rather than as six optional props, because a form that posts an enquiry with no idea
   which page it came from produces a lead nobody can route. */
const CONTEXT: EnquiryContextBase = {
  originRoute: '/services/design-systems',
  placement: 'closing',
  family: 'services',
  serviceOrAudit: 'design-systems',
  referrer: 'organic',
  campaign: 'none',
};

/**
 * EnquiryForm — the enquiry, as a form. The thing a page asks with when it wants a reply rather
 * than a click.
 *
 * It renders the fields, their labels, their validation copy and the submit; it does NOT render the
 * band around itself. Put it in the `form` slot of a `CtaSection` — that is what the slot is for,
 * and it is the only composition the design intends.
 *
 * TWO VARIANTS, and the difference is what the page is asking for:
 *
 *   enquiry  (the default) a general enquiry. `urlLabel` picks one of three phrasings for the
 *            optional URL field.
 *   audit    the free-audit request. Requires `context.intent`, and its URL field takes the one
 *            audit-specific label. `intent` does not compile on the enquiry variant.
 *
 * `action` is required — the endpoint the form posts to. `onSubmitted` fires once, after a
 * successful submission, and the success panel REPLACES the form rather than appearing beside it.
 *
 * FOUR STATES YOU WILL NOT SEE IN A CARD. Invalid, submitting, error and success all need a live
 * endpoint and a real interaction, so every story below renders the idle state. What the cards do
 * show is the shape: the field order, the label treatment, the reserved line under each field that
 * stops the layout shifting when a validation message appears, and the action row: the submit with
 * "See available times" beside it. `scheduleHref` is required on enquiry and audit — every one of
 * those forms offers the scheduling link, and it lives here, in the form, not in CtaSection.
 *
 * The fields validate on blur, not on keystroke, and the message reserves its line whether or not
 * it has anything to say — so a form that fails validation does not push its own submit button
 * down the page.
 */
export function Default() {
  return <EnquiryForm action="/api/enquiry" context={CONTEXT} scheduleHref="/contact" />;
}

/** The audit variant. `context.intent` is required here and forbidden on the enquiry variant, so
    the two cannot be confused at a call site. */
export function Audit() {
  return (
    <EnquiryForm
      variant="audit"
      action="/api/audit"
      context={{ ...CONTEXT, placement: 'mid-page', intent: 'ux-audit' }}
      scheduleHref="/contact"
    />
  );
}

/** The URL field's label is one of three fixed phrasings, not free text — so 56 routes cannot ask
    the same question 56 ways. */
export function AlternateUrlLabel() {
  return (
    <EnquiryForm
      action="/api/enquiry"
      urlLabel="Link to the work"
      context={CONTEXT}
      scheduleHref="/contact"
    />
  );
}

/** On tint. The field rule steps one darker and the fill drops to paper because the ground did;
    the labels step with them. */
export function OnTint() {
  return (
    <Section surface="tint" density="tight">
      <EnquiryForm action="/api/enquiry" context={CONTEXT} scheduleHref="/contact" />
    </Section>
  );
}

/** On ink the field fill and rule invert and the focus ring lifts off the light end of the ramp. */
export function OnInk() {
  return (
    <Section surface="ink" density="tight">
      <EnquiryForm action="/api/enquiry" context={CONTEXT} scheduleHref="/contact" />
    </Section>
  );
}

/** On blue only the light end of every ramp clears AA, which is the tightest of the four grounds
    for a form — the labels, the field rules and the validation copy all sit near their floor. */
export function OnBlue() {
  return (
    <Section surface="blue" density="tight">
      <EnquiryForm
        action="/api/audit"
        variant="audit"
        context={{ ...CONTEXT, intent: 'ux-audit' }}
        scheduleHref="/contact"
      />
    </Section>
  );
}
