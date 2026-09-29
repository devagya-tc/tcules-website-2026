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
 * The two bar treatments. `mono` is the default and the UI-chrome treatment — the whole mark in one
 * colour (ch02 v1.0: neutral-950 in chrome, white throughout on ink and blue). `accent` paints the
 * bar brandeis-500 and is for marketing scale on paper or tint only.
 */
export function Variants() {
  return (
    <Cluster colGap="block" rowGap="block" align="center">
      <Cluster colGap="tight" align="center">
        <Logo size="lg" variant="mono" title="Tcules" />
        <span>mono · default · UI chrome</span>
      </Cluster>
      <Cluster colGap="tight" align="center">
        <Logo size="lg" variant="accent" title="Tcules" />
        <span>accent · marketing scale only</span>
      </Cluster>
    </Cluster>
  );
}

/**
 * All four grounds, in the default. The mark reads --logo-ink per surface, so one inline mark is
 * correct everywhere: neutral-950 on paper and tint, white throughout on ink and blue. Peridot is
 * never in the wordmark.
 */
export function OnSurfaces() {
  return (
    <Layout columns={2} colGap="none" rowGap="none">
      {(['paper', 'tint', 'ink', 'blue'] as const).map((surface) => (
        <Section key={surface} surface={surface} density="tight">
          <Layout rowGap="block">
            <Logo size="lg" title="Tcules" />
            <span>{surface}</span>
          </Layout>
        </Section>
      ))}
    </Layout>
  );
}
