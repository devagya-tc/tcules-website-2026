import { Input, Layout, Section } from 'tcules-website-2026';

/* NOTE: preview files are type-STRIPPED, not type-checked (see .design-sync/NOTES.md), so an
   invalid prop value fails silently at render. This file uses no Cluster, so the `block` cap
   cannot be tripped; the Layout gaps below are `tight` and `block`, both valid. */

/**
 * A field with its label. Input renders the CONTROL BOX ONLY, so the label, the gap above it and
 * any validation copy belong to whatever composes it — which is why every story here brings its
 * own `<label>`.
 *
 * That is not a formality. A wrapping `<label>` (or an external `<label for>`) is what gives the
 * control its accessible name AND, for the 40px quiet emphasis, its touch target: the label
 * forwards a tap to the control natively and measures well over 44px. No prop can enforce it —
 * both wiring routes are invisible to the type — so a bare `<Input />` with no label is both
 * unnamed and under-target. Always wire one.
 */
function Field({
  label,
  ...props
}: {
  label: string;
  emphasis?: 'standard' | 'quiet';
  invalid?: boolean;
  disabled?: boolean;
  placeholder?: string;
  as?: 'input' | 'textarea';
  type?: string;
}) {
  return (
    <Layout as="label" rowGap="tight">
      <span>{label}</span>
      <Input {...props} />
    </Layout>
  );
}

/**
 * Input — the native control box, shared by forms and low-chrome capture rows.
 *
 * It owns the box and nothing else: no label, no validation message, no spacing to its siblings.
 * Every colour comes from `--inp-*`, re-declared once per surface, so the same markup is correct on
 * paper, tint, ink and blue without being told which it is standing on.
 *
 * TWO EMPHASES, and they are not loud and quiet versions of one thing:
 *
 *   standard  the form treatment. 40px box, stepping to 44 at ≤767 so a phone gets the touch
 *             floor. This is the one to reach for.
 *   quiet     the footer's preserved lower-chrome treatment. Stays 40px at every width because it
 *             shares a row with a 40px Button, and its target comes from the wrapping label
 *             rather than from the box. Reach for it only in that kind of row.
 *
 * `as="textarea"` switches to the native multiline control, which keeps its own resize handle and
 * clears the touch floor through its minimum height rather than by stepping.
 *
 * `invalid` adds the danger rule and emits `aria-invalid`; it does not replace native validation.
 * The disabled treatment is deliberately below the AA contrast floor — a disabled field that read
 * at full contrast would not look unavailable — and the ratios are recorded in the token layer.
 */
export function Default() {
  return <Field label="Work email" type="email" placeholder="you@company.com" />;
}

/** The footer's treatment. Same control, lower chrome, and it stays 40px at every width. */
export function Quiet() {
  return <Field label="Newsletter email" emphasis="quiet" type="email" />;
}

/** Multiline. Native resize, and tall enough that the touch floor never applies. */
export function Textarea() {
  return <Field label="What are you trying to ship?" as="textarea" />;
}

/** The danger rule plus `aria-invalid`. The state is carried by colour AND width, never colour
    alone, so it survives a monochrome rendering. */
export function Invalid() {
  return <Field label="Work email" type="email" invalid />;
}

/** Explicit tokens rather than an opacity, so the treatment is identical on all four surfaces
    instead of mixing differently against each ground. */
export function Disabled() {
  return <Field label="Work email" type="email" disabled />;
}

/** Every state on one surface, which is how the four surface blocks are meant to be compared.
    A primitive cannot declare a surface — it reads `data-surface` from a band — so the three
    surface stories below stand inside a `Section`, which is what `Prose`'s preview does too. */
export function AllStates() {
  return (
    <Layout rowGap="block">
      <Field label="Standard · rest" />
      <Field label="Standard · invalid" invalid />
      <Field label="Standard · disabled" disabled />
      <Field label="Quiet · rest" emphasis="quiet" />
      <Field label="Quiet · invalid" emphasis="quiet" invalid />
      <Field label="Quiet · disabled" emphasis="quiet" disabled />
    </Layout>
  );
}

/** On tint every quiet value steps one darker, because the ground did. */
export function OnTint() {
  return (
    <Section surface="tint" density="tight">
      <Layout rowGap="block">
        <Field label="Standard" />
        <Field label="Standard · invalid" invalid />
        <Field label="Quiet" emphasis="quiet" />
      </Layout>
    </Section>
  );
}

/** On ink the fill and rule invert and the focus ring lifts off the light end of the blue ramp. */
export function OnInk() {
  return (
    <Section surface="ink" density="tight">
      <Layout rowGap="block">
        <Field label="Standard" />
        <Field label="Standard · invalid" invalid />
        <Field label="Quiet" emphasis="quiet" />
      </Layout>
    </Section>
  );
}

/** On blue the invalid rule takes the lightest danger step — nothing darker clears this ground. */
export function OnBlue() {
  return (
    <Section surface="blue" density="tight">
      <Layout rowGap="block">
        <Field label="Standard" />
        <Field label="Standard · invalid" invalid />
        <Field label="Quiet" emphasis="quiet" />
      </Layout>
    </Section>
  );
}
