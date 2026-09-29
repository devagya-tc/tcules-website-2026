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
 * control its accessible name. No prop can enforce it — both wiring routes are invisible to the
 * type — so a bare `<Input />` with no label is unnamed. Always wire one.
 */
function Field({
  label,
  ...props
}: {
  label: string;
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
 * ONE TREATMENT, and no `emphasis` prop. A 40px box, stepping to 44 at ≤767 so a phone gets the
 * touch floor. (A second, `quiet`, emphasis existed for the footer and rendered nearly identically;
 * it was merged in and deleted on 29 Sep 2026.)
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
      <Field label="Rest" />
      <Field label="Invalid" invalid />
      <Field label="Disabled" disabled />
    </Layout>
  );
}

/** On tint the rule steps one darker and the fill drops to paper, because the ground did. */
export function OnTint() {
  return (
    <Section surface="tint" density="tight">
      <Layout rowGap="block">
        <Field label="Rest" />
        <Field label="Invalid" invalid />
        <Field label="Disabled" disabled />
      </Layout>
    </Section>
  );
}

/** On ink the fill and rule invert and the focus ring lifts off the light end of the blue ramp. */
export function OnInk() {
  return (
    <Section surface="ink" density="tight">
      <Layout rowGap="block">
        <Field label="Rest" />
        <Field label="Invalid" invalid />
        <Field label="Disabled" disabled />
      </Layout>
    </Section>
  );
}

/** On blue the invalid rule takes the lightest danger step — nothing darker clears this ground. */
export function OnBlue() {
  return (
    <Section surface="blue" density="tight">
      <Layout rowGap="block">
        <Field label="Rest" />
        <Field label="Invalid" invalid />
        <Field label="Disabled" disabled />
      </Layout>
    </Section>
  );
}
