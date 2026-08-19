import { Layout, Section } from 'tcules-website-2026';

/* A tile built from the system's own parts — a tint band with a heading and a line — so the
   tracks are visible without any hand-rolled CSS in the preview. Layout owns every distance
   between tiles; the tile itself sets no outer spacing. */
function Tile({ title, body }: { title: string; body?: string }) {
  return (
    <Section surface="tint" density="tight">
      <Layout rowGap="inline">
        <h4>{title}</h4>
        {body ? <p>{body}</p> : null}
      </Layout>
    </Section>
  );
}

/** A count of equal tracks. Applies from md up and collapses to one track below it. */
export function EqualTracks() {
  return (
    <Layout columns={3} colGap="gutter" rowGap="gutter">
      <Tile title="Discover" />
      <Tile title="Design" />
      <Tile title="Deliver" />
    </Layout>
  );
}

/** Fractional weights — `[2, 1]` is the workhorse asymmetric band. */
export function Ratio() {
  return (
    <Layout columns={[2, 1]} colGap="column" rowGap="stack" align="start">
      <Tile
        title="The main column"
        body="Two parts of three. Children fill the tracks in order and each owns its own sizing."
      />
      <Tile title="The aside" body="One part of three." />
    </Layout>
  );
}

/**
 * The vertical stack — the single-track case, and the most common Layout in the system.
 * Non-uniform rhythm comes from NESTING: each head sits tight against its own body because the
 * pair is its own Layout, while the pairs themselves are a stack apart.
 */
export function VerticalStack() {
  return (
    <Layout rowGap="stack">
      <Layout rowGap="block">
        <h3>Tighten by grouping</h3>
        <p>A heading&rsquo;s spacing is a consequence of which Layout it lives in, not a prop.</p>
      </Layout>
      <Layout rowGap="block">
        <h3>Loosen by separating</h3>
        <p>There is no rhythm knob, because nesting already says it.</p>
      </Layout>
    </Layout>
  );
}

/**
 * Content-driven: as many tracks as fit at `minTrack` wide, reflowing with no breakpoints at
 * all. `fit` lets the tracks absorb the leftover space, so a part-full last row spreads.
 */
export function FitTracks() {
  return (
    <Layout columns="fit" minTrack="sm" colGap="gutter" rowGap="gutter">
      <Tile title="FinTech" />
      <Tile title="HealthTech" />
      <Tile title="EdTech" />
      <Tile title="MarTech" />
      <Tile title="PropTech" />
    </Layout>
  );
}

/** `equalRows` makes every item fill its row and keeps rows equal after wrapping. */
export function EqualRows() {
  return (
    <Layout columns={3} colGap="gutter" rowGap="gutter" equalRows>
      <Tile title="Short" />
      <Tile title="Taller" body="This cell carries a second line, and the other two match its height." />
      <Tile title="Short again" />
    </Layout>
  );
}
