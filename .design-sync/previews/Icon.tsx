import { Button, Cluster, Icon, Layout, Section } from 'tcules-website-2026';

/* The whole set, in the source file's own order: actions, then disclosure, then the six service
   subjects. Kept in sync with glyphs.ts by hand — adding a glyph is a deliberate act there, so
   it is a deliberate act here too. */
const NAMES = [
  'arrow-right',
  'arrow-left',
  'download',
  'copy',
  'close-circle',
  'document-text',
  'check',
  'chevron-down',
  'chevron-right',
  'menu',
  'close',
  'product-design',
  'modernisation',
  'design-systems',
  'ai-product-ux',
  'design-engineering',
  'software-development',
] as const;

/** All seventeen glyphs at the default 16. Every one is solid and filled with currentColor. */
export function TheSet() {
  return (
    <Cluster colGap="text" rowGap="text">
      {NAMES.map((name) => (
        <Cluster key={name} colGap="tight">
          <Icon name={name} />
          <span>{name}</span>
        </Cluster>
      ))}
    </Cluster>
  );
}

/**
 * The four size roles: 14 inside a 32 control, 16 the default, 18 inside a 48 control, and 24
 * standing on its own. One drawing serves all four — the ramp is a viewBox, not four files.
 */
export function Sizes() {
  return (
    <Cluster colGap="block" rowGap="text" align="center">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Cluster key={size} colGap="tight" align="center">
          <Icon name="modernisation" size={size} />
          <span>{size}</span>
        </Cluster>
      ))}
    </Cluster>
  );
}

/**
 * currentColor, on all four grounds. The glyph has no colour of its own and takes no colour
 * prop, so it inherits the ink of the surface it lands on — and its counters are holes, so they
 * show the ground rather than a painted fill that would be right on exactly one surface.
 */
export function OnSurfaces() {
  return (
    <Layout columns={2} colGap="none" rowGap="none">
      {(['paper', 'tint', 'ink', 'blue'] as const).map((surface) => (
        <Section key={surface} surface={surface} density="tight">
          <Cluster colGap="text" align="center">
            {NAMES.slice(0, 4).map((name) => (
              <Icon key={name} name={name} size="lg" />
            ))}
            <span>{surface}</span>
          </Cluster>
        </Section>
      ))}
    </Layout>
  );
}

/**
 * Inside a control, the BUTTON decides the glyph size — a size passed to the Icon is ignored,
 * because the spec's rule is that the icon steps with the button.
 */
export function InsideControls() {
  return (
    <Cluster colGap="tight" rowGap="tight" align="center">
      <Button size="sm" iconLeft={<Icon name="download" />}>
        Small
      </Button>
      <Button size="md" iconLeft={<Icon name="download" />}>
        Medium
      </Button>
      <Button size="lg" iconLeft={<Icon name="download" />}>
        Large
      </Button>
    </Cluster>
  );
}

/**
 * Labelled versus decorative. A glyph that carries meaning on its own takes `label` and becomes
 * an img with a title; one beside a label stays aria-hidden so nothing is announced twice.
 */
export function Labelled() {
  return (
    <Cluster colGap="block" rowGap="text" align="center">
      <Cluster colGap="tight">
        <Icon name="check" label="Passing" size="lg" />
        <span>labelled — announced</span>
      </Cluster>
      <Cluster colGap="tight">
        <Icon name="check" size="lg" />
        <span>decorative — hidden</span>
      </Cluster>
    </Cluster>
  );
}
