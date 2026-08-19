import { Button, Cluster, Icon, Layout } from 'tcules-website-2026';

/** The button group — the case Cluster exists for. The container owns the gap, never the buttons. */
export function ButtonGroup() {
  return (
    <Cluster colGap="tight" rowGap="tight">
      <Button>Start a project</Button>
      <Button emphasis="ghost" tone="neutral">
        See our work
      </Button>
      <Button emphasis="link">Read the case study</Button>
    </Cluster>
  );
}

/** A wrapping filter row. Both seams are set, because a row that wraps has two. */
export function FilterChips() {
  return (
    <Cluster colGap="tight" rowGap="tight">
      {[
        'All work',
        'Design systems',
        'AI product UX',
        'Product modernisation',
        'Design engineering',
        'Software development',
      ].map((label, i) => (
        <Button key={label} emphasis="ghost" tone="neutral" size="sm" active={i === 1}>
          {label}
        </Button>
      ))}
    </Cluster>
  );
}

/** Metadata — the tightest steps on the ramp, for a glyph and its label, and item to item. */
export function Metadata() {
  return (
    <Cluster colGap="text" rowGap="tight">
      <Cluster colGap="inline">
        <Icon name="check" size="sm" />
        <span>Shipped 2026</span>
      </Cluster>
      <Cluster colGap="inline">
        <Icon name="modernisation" size="sm" />
        <span>Product modernisation</span>
      </Cluster>
      <Cluster colGap="inline">
        <Icon name="download" size="sm" />
        <span>Case study PDF</span>
      </Cluster>
    </Cluster>
  );
}

/** `justify` distributes the items along the line; `between` pushes them to the edges. */
export function Justify() {
  return (
    <Layout rowGap="block">
      {(['start', 'center', 'end', 'between'] as const).map((justify) => (
        <Cluster key={justify} colGap="tight" justify={justify}>
          <Button emphasis="ghost" tone="neutral" size="sm">
            {justify}
          </Button>
          <Button emphasis="ghost" tone="neutral" size="sm">
            Second
          </Button>
          <Button size="sm">Third</Button>
        </Cluster>
      ))}
    </Layout>
  );
}

/** `nowrap` keeps a line intact — a toolbar that must not reflow. */
export function NoWrap() {
  return (
    <Cluster colGap="tight" nowrap>
      <Button iconOnly emphasis="ghost" tone="neutral" size="sm" icon={<Icon name="copy" />} aria-label="Copy" />
      <Button iconOnly emphasis="ghost" tone="neutral" size="sm" icon={<Icon name="download" />} aria-label="Download" />
      <Button iconOnly emphasis="ghost" tone="neutral" size="sm" icon={<Icon name="check" />} aria-label="Approve" />
      <Button iconOnly emphasis="ghost" tone="neutral" size="sm" icon={<Icon name="close" />} aria-label="Dismiss" />
    </Cluster>
  );
}
