import Link from 'next/link';

import { Cluster, Layout, Section } from '@/components';

/**
 * A placeholder home page that doubles as the first real use of the primitives: a Section
 * band, a Layout stack inside it, and a Cluster of links. Replaced by the actual home page
 * when page work starts.
 */
export default function HomePage() {
  return (
    <Section>
      <Layout rowGap="stack">
        <Layout rowGap="block">
          <h1>Tcules</h1>
          <p>
            Scaffolding. Three layout primitives, no tokens yet — the proving ground is where
            they are exercised.
          </p>
        </Layout>
        <Cluster colGap="text" rowGap="tight">
          <Link href="/design">Proving ground</Link>
          <Link href="/design/section">Section</Link>
          <Link href="/design/layout">Layout</Link>
          <Link href="/design/cluster">Cluster</Link>
        </Cluster>
      </Layout>
    </Section>
  );
}
