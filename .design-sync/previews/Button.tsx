import { Button, Cluster, Icon, Layout } from 'tcules-website-2026';

/**
 * Three emphases × two tones — the primary variant axis, and the one that most changes
 * appearance. Copy follows the component's own rule: primary is the offer, neutral is the
 * utility that gets the work done.
 */
export function Emphasis() {
  return (
    <Layout rowGap="block">
      <Cluster colGap="tight" rowGap="tight">
        <Button emphasis="solid" tone="primary">
          Start a project
        </Button>
        <Button emphasis="ghost" tone="primary">
          See our work
        </Button>
        <Button emphasis="link" tone="primary">
          Read the case study
        </Button>
      </Cluster>
      <Cluster colGap="tight" rowGap="tight">
        <Button emphasis="solid" tone="neutral">
          Send message
        </Button>
        <Button emphasis="ghost" tone="neutral">
          Copy link
        </Button>
        <Button emphasis="link" tone="neutral">
          Download the PDF
        </Button>
      </Cluster>
    </Layout>
  );
}

/** Three heights: 32 for dense grids, 40 as the default, 48 for heroes and touch. */
export function Sizes() {
  return (
    <Cluster colGap="tight" rowGap="tight" align="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Cluster>
  );
}

/**
 * The three variants: label alone, label with one glyph on one side, and the icon-only control —
 * which the type system forces to carry its own accessible name.
 */
export function WithIcons() {
  return (
    <Cluster colGap="tight" rowGap="tight">
      <Button iconLeft={<Icon name="download" />}>Download report</Button>
      <Button emphasis="ghost" tone="neutral" icon={<Icon name="check" />}>
        Mark reviewed
      </Button>
      <Button iconOnly icon={<Icon name="copy" />} aria-label="Copy link" />
      <Button iconOnly emphasis="ghost" tone="neutral" icon={<Icon name="close" />} aria-label="Dismiss" />
    </Cluster>
  );
}

/**
 * The two states a caller holds. `active` is the held second step — a selected filter or the
 * current nav item; `disabled` leaves the tab order. Hover, press and focus are the
 * stylesheet's business and take no props, so they cannot be shown statically.
 */
export function States() {
  return (
    <Layout rowGap="block">
      <Cluster colGap="tight" rowGap="tight">
        <Button emphasis="ghost" tone="neutral">
          All work
        </Button>
        <Button emphasis="ghost" tone="neutral" active>
          Design systems
        </Button>
        <Button emphasis="ghost" tone="neutral">
          AI product UX
        </Button>
      </Cluster>
      <Cluster colGap="tight" rowGap="tight">
        <Button disabled>Submitting…</Button>
        <Button emphasis="ghost" tone="neutral" disabled>
          Export unavailable
        </Button>
      </Cluster>
    </Layout>
  );
}

/** A button that navigates is an anchor — `as="a"` with an href, not a button with a click. */
export function AsAnchor() {
  return (
    <Cluster colGap="tight" rowGap="tight">
      <Button as="a" href="/contact" size="lg">
        Start a project
      </Button>
      <Button as="a" href="/case-studies" emphasis="link">
        Read the case study
      </Button>
    </Cluster>
  );
}
