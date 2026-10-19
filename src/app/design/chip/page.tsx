import Link from 'next/link';

import { Button, Chip, Cluster, Icon, Layout, Section } from '@/components';
import { ROUTES } from '@/lib/routes';

import { Specimen } from '../_specimen/Specimen';

/**
 * Chip specimen — one control, two input types, three static states on four surfaces.
 *
 * Hover and focus have no props: hover is :hover (the pill lifts 2, transform only) and focus is
 * :focus-visible (the ring). Point at a chip and Tab to one on each surface. Checked and disabled
 * are real input attributes and are printed.
 *
 * The group semantics (fieldset and legend) belong to the composing pattern; here a plain caption
 * names each row, and the radio rows share a `name` per surface so arrow keys move within one.
 */

const TICK = <Icon name="chrome-check" />;

const NEEDS = [
  'New product',
  'Product design',
  'Modernisation',
  'AI product UX',
  'Design systems',
  'Design engineering',
] as const;

const STAGES = ['A sketch', 'A prototype', 'A live product'] as const;

const SURFACES = [
  {
    surface: 'paper',
    note: 'At rest an edge and no ground: neutral-300, the approved mock’s, under a neutral-800 label at 11.81:1. Checked fills brandeis-500 under a white label and tick at 6.23:1. The ring is brandeis-500.',
  },
  {
    surface: 'tint',
    note: 'The edge firms one step, to neutral-400, so the outline survives the deeper ground. Checked is paper’s blue fill, 5.51:1 against the tint.',
  },
  {
    surface: 'ink',
    note: 'The label lifts to neutral-100 and the edge to neutral-600, lighter meaning firmer. Checked keeps the accent blue under a white label; the ring lifts to brandeis-300.',
  },
  {
    surface: 'blue',
    note: 'Every value is a blue or white. Rest is a brandeis-300 edge under a white label; checked reverses to a white fill under a brandeis-600 label at 7.59:1. The ring is white.',
  },
] as const;

function Row({
  type,
  name,
  labels,
  checked,
  disabled = false,
}: {
  type: 'checkbox' | 'radio';
  name: string;
  labels: readonly string[];
  checked: readonly string[];
  disabled?: boolean;
}) {
  return (
    <Cluster colGap="tight" rowGap="tight">
      {labels.map((label) => (
        <Chip
          key={label}
          type={type}
          name={name}
          value={label}
          tick={TICK}
          defaultChecked={checked.includes(label)}
          disabled={disabled}
        >
          {label}
        </Chip>
      ))}
    </Cluster>
  );
}

export default function ChipSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Chip</h1>
          <p>
            One choice in a set (19 Oct 2026, the chip enquiry form): a real{' '}
            <code>&lt;input type=&quot;checkbox&quot;&gt;</code> or{' '}
            <code>&lt;input type=&quot;radio&quot;&gt;</code>, visually hidden inside its label and
            drawn as a pill. An edge and no ground at rest; checked, a full fill with the label
            reversed and the tick (<code>tick</code>, a ReactNode — the caller passes{' '}
            <code>&lt;Icon name=&quot;chrome-check&quot; /&gt;</code>) scaling in. Hover is a
            2px lift, on transform only; focus is a ring. The label keeps its author&rsquo;s
            case, so it is sans, not Tag&rsquo;s mono filter. The question a set answers is the
            pattern&rsquo;s fieldset; the row is a Cluster at <code>tight</code>.
          </p>
          <Cluster colGap="block" rowGap="tight">
            <Link href={ROUTES.designEnquiryForm}>The chip form, in EnquiryForm</Link>
          </Cluster>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Specimen
            title="Checkbox · rest and checked"
            note="type='checkbox' name='needs'. Two picked (defaultChecked). Click to toggle; Space toggles from the keyboard. Point at one: the pill lifts 2 and settles back on leave."
          >
            <Row type="checkbox" name="needs-paper-demo" labels={NEEDS} checked={['Product design', 'AI product UX']} />
          </Specimen>
          <Specimen
            title="Radio · one of a set"
            note="type='radio', one name across the set. Arrow keys move the pick within the set; Tab leaves it."
          >
            <Row type="radio" name="stage-paper-demo" labels={STAGES} checked={['A prototype']} />
          </Specimen>
          <Specimen
            title="Focus · Tab to a chip"
            note="No prop: :focus-visible draws the ring outside the pill (2 wide, 2 off). Tab into the row above; a pointer press shows no ring."
          >
            <Row type="checkbox" name="needs-focus-demo" labels={NEEDS.slice(0, 3)} checked={[]} />
          </Specimen>
          <Specimen
            title="Disabled · rest and checked"
            note="disabled: the form disables its chips while a send is in flight. No lift, a not-allowed cursor, quiet inks; a checked chip keeps a quiet fill so the pick is still visible."
          >
            <Row
              type="checkbox"
              name="needs-disabled-demo"
              labels={NEEDS.slice(0, 4)}
              checked={['Product design']}
              disabled
            />
          </Specimen>
          <Specimen
            title="Long labels · the pill wraps"
            note="A label is the caller’s copy. Where one is longer than its track (a phone column) the pill grows down from its 34 floor and the words balance over two lines; nothing overflows at 390."
          >
            <Row
              type="checkbox"
              name="needs-long-demo"
              labels={[
                'Accessibility review of a product with years of history behind it',
                'A design system several product teams already build with every day',
                'Short',
              ]}
              checked={['A design system several product teams already build with every day']}
            />
          </Specimen>
        </Layout>
      </Section>

      {SURFACES.map(({ surface, note }) => (
        <Section key={surface} surface={surface}>
          <Specimen title={`Surface · ${surface}`} note={note}>
            <Layout rowGap="block">
              <Row
                type="checkbox"
                name={`needs-${surface}`}
                labels={NEEDS}
                checked={['Product design', 'AI product UX']}
              />
              <Row type="radio" name={`stage-${surface}`} labels={STAGES} checked={['A prototype']} />
              <Row
                type="checkbox"
                name={`needs-${surface}-disabled`}
                labels={NEEDS.slice(0, 3)}
                checked={['Product design']}
                disabled
              />
            </Layout>
          </Specimen>
        </Section>
      ))}

      <Section>
        <Button as={Link} href={ROUTES.design} emphasis="link" tone="neutral">
          Back to the proving ground
        </Button>
      </Section>
    </>
  );
}
