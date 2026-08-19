import { Cluster, Layout, Logo, Section } from 'tcules-website-2026';

/**
 * Three heights. A logotype is not text and does not step with the type ladder — it is sized so
 * its x-height reads level with the chrome beside it: 20 in a dense bar, 24 in the header, 40 in
 * the footer's brand block.
 */
export function Sizes() {
  return (
    <Cluster colGap="block" rowGap="block" align="center">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Cluster key={size} colGap="tight" align="center">
          <Logo size={size} title="Tcules" />
          <span>{size}</span>
        </Cluster>
      ))}
    </Cluster>
  );
}

/**
 * The two bar treatments. `accent` paints the bar above the "u" from --logo-bar; `mono` takes
 * currentColor so the mark reads as a single silhouette.
 */
export function Variants() {
  return (
    <Cluster colGap="block" rowGap="block" align="center">
      <Cluster colGap="tight" align="center">
        <Logo size="lg" variant="accent" title="Tcules" />
        <span>accent</span>
      </Cluster>
      <Cluster colGap="tight" align="center">
        <Logo size="lg" variant="mono" title="Tcules" />
        <span>mono</span>
      </Cluster>
    </Cluster>
  );
}

/**
 * All four grounds. The letterforms take currentColor and only the bar reads a token, which is
 * why one inline mark is correct everywhere instead of four files. On the blue pivot the accent
 * bar would vanish into the ground, which is what `mono` is for.
 */
export function OnSurfaces() {
  return (
    <Layout columns={2} colGap="none" rowGap="none">
      {(['paper', 'tint', 'ink', 'blue'] as const).map((surface) => (
        <Section key={surface} surface={surface} density="tight">
          <Layout rowGap="block">
            <Logo size="lg" variant={surface === 'blue' ? 'mono' : 'accent'} title="Tcules" />
            <span>{surface}</span>
          </Layout>
        </Section>
      ))}
    </Layout>
  );
}
