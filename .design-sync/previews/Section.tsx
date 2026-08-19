import { Button, Cluster, Layout, Section } from 'tcules-website-2026';

/**
 * The four grounds. Surface is declared once on the band and everything inside reads it — the
 * buttons below are the same markup in all four cells and are re-coloured by the token layer,
 * not by a prop.
 */
export function Surfaces() {
  return (
    <Layout columns={2} colGap="none" rowGap="none">
      {(['paper', 'tint', 'ink', 'blue'] as const).map((surface) => (
        <Section key={surface} surface={surface} density="tight">
          <Layout rowGap="block">
            <h4>{surface}</h4>
            <Cluster colGap="tight" rowGap="tight">
              <Button>Start a project</Button>
              <Button emphasis="ghost" tone="neutral">
                See our work
              </Button>
            </Cluster>
          </Layout>
        </Section>
      ))}
    </Layout>
  );
}

/**
 * Vertical air. Three bands, alternating ground so the padding is visible as a distance rather
 * than described — tight 64, standard 96, open 128.
 */
export function Density() {
  return (
    <Layout rowGap="none">
      <Section density="tight" surface="tint">
        <h3>density=&quot;tight&quot; — 64</h3>
      </Section>
      <Section surface="paper">
        <h3>default — 96</h3>
      </Section>
      <Section density="open" surface="tint">
        <h3>density=&quot;open&quot; — 128</h3>
      </Section>
    </Layout>
  );
}

/**
 * A realistic band: the content column at work. Section owns the 1240 cap and the 32 gutter, and
 * the Layout inside owns every distance between the pieces.
 */
export function ContentBand() {
  return (
    <Section surface="paper">
      <Layout columns={[2, 1]} colGap="column" rowGap="stack" align="start">
        <Layout rowGap="block">
          <h2>Design systems your engineers actually trust</h2>
          <p>
            A system earns its keep when the people building from it stop checking whether it is
            right. That means tokens with one answer per question, primitives that own every
            distance, and a proving ground where each arrangement is rendered before it ships.
          </p>
          <Cluster colGap="tight" rowGap="tight">
            <Button as="a" href="/services/design-systems">
              How we work
            </Button>
            <Button as="a" href="/case-studies" emphasis="link">
              Read the case study
            </Button>
          </Cluster>
        </Layout>
        <Layout rowGap="text">
          <h4>What you get</h4>
          <p>A token layer, three layout primitives, and a component set with a sandbox route each.</p>
        </Layout>
      </Layout>
    </Section>
  );
}

/** `flush` drops the vertical air to zero, for a composition that supplies its own. */
export function Flush() {
  return (
    <Layout rowGap="none">
      <Section density="tight">
        <h4>A band with its own air</h4>
      </Section>
      <Section surface="ink" flush>
        <h4>flush — zero air, top and bottom</h4>
      </Section>
      <Section density="tight">
        <h4>Air returns below it</h4>
      </Section>
    </Layout>
  );
}
