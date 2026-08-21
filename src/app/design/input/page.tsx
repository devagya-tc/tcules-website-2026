import { Input, Layout, Section } from '@/components';
import { ROUTES } from '@/lib/routes';

import { Specimen } from '../_specimen/Specimen';

function LabelledInput({
  label,
  emphasis = 'standard',
  invalid = false,
  disabled = false,
}: {
  label: string;
  emphasis?: 'standard' | 'quiet';
  invalid?: boolean;
  disabled?: boolean;
}) {
  return (
    <Layout as="label" rowGap="tight">
      <span>{label}</span>
      <Input
        emphasis={emphasis}
        invalid={invalid}
        disabled={disabled}
        placeholder="you@company.com"
      />
    </Layout>
  );
}

export default function InputSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Input</h1>
          <p>
            The native control box shared by enquiry forms and the footer. Labels, flags,
            messages, and arrangement stay with the pattern that composes it.
          </p>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <h2>Variants and native shapes</h2>
          <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
            <Specimen
              title="Standard · input"
              note="Point, tab, type, and disable from markup."
            >
              <LabelledInput label="Email address" />
            </Specimen>
            <Specimen
              title="Quiet · input"
              note="The footer treatment, moved without visual change."
            >
              <LabelledInput label="Newsletter email" emphasis="quiet" />
            </Specimen>
            <Specimen
              title="Standard · textarea"
              note="Four-line minimum; resize stays native."
            >
              <Layout as="label" rowGap="tight">
                <span>What are you working on?</span>
                <Input as="textarea" />
              </Layout>
            </Specimen>
            <Specimen
              title="Quiet · textarea"
              note="The same native multiline shape with the footer's low-chrome emphasis."
            >
              <Layout as="label" rowGap="tight">
                <span>Newsletter notes</span>
                <Input as="textarea" emphasis="quiet" />
              </Layout>
            </Specimen>
            <Specimen title="Invalid and disabled" note="Neither state uses opacity.">
              <Layout rowGap="block">
                <LabelledInput label="Standard · invalid" invalid />
                <LabelledInput label="Standard · disabled" disabled />
                <LabelledInput label="Quiet · invalid" emphasis="quiet" invalid />
                <LabelledInput label="Quiet · disabled" emphasis="quiet" disabled />
              </Layout>
            </Specimen>
          </Layout>
        </Layout>
      </Section>

      {(['paper', 'tint', 'ink', 'blue'] as const).map((surface) => (
        <Section key={surface} surface={surface} density="tight">
          <Specimen
            title={`Surface · ${surface}`}
            note="Identical markup: standard first, preserved quiet treatment second."
          >
            <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="block">
              <LabelledInput label="Standard" />
              <LabelledInput label="Quiet" emphasis="quiet" />
            </Layout>
          </Specimen>
        </Section>
      ))}

      <Section>
        <Layout rowGap="block">
          <h2>Edge cases</h2>
          <Specimen
            title="Long values and the minimum"
            note="The input scrolls; the textarea wraps."
          >
            <Layout rowGap="block">
              <Layout as="label" rowGap="tight">
                <span>Long single-line address</span>
                <Input defaultValue="https://example.com/a-very-long-unbroken-product-address-that-keeps-going-without-a-break" />
              </Layout>
              <Layout as="label" rowGap="tight">
                <span>Long multiline address</span>
                <Input
                  as="textarea"
                  defaultValue="https://example.com/a-very-long-unbroken-product-address-that-wraps-inside-the-multiline-control-without-widening-its-parent"
                />
              </Layout>
            </Layout>
          </Specimen>
          <a href={ROUTES.design}>Back to the proving ground</a>
        </Layout>
      </Section>
    </>
  );
}
