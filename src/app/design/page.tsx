import Link from 'next/link';

import { Cluster, Layout, Section } from '@/components';

/**
 * The proving ground index.
 *
 * Grouped by tier, and the grouping is read from what actually exists rather than from folder
 * structure — a specimen route is registered here by hand when its component is built, which
 * keeps this list honest about coverage.
 *
 * The rule: nothing gets a page route before it has a route here.
 */
const SPECIMENS = [
  {
    tier: 'Primitives',
    items: [
      { href: '/design/section', name: 'Section', note: 'band, content column, vertical rhythm' },
      { href: '/design/layout', name: 'Layout', note: 'columnar axis — tracks and the two seams' },
      { href: '/design/cluster', name: 'Cluster', note: 'inline axis — wrapping rows' },
    ],
  },
  { tier: 'Patterns', items: [] },
  { tier: 'Templates', items: [] },
] as const;

export default function DesignIndexPage() {
  return (
    <Section>
      <Layout rowGap="2xl">
        <Layout rowGap="sm">
          <h1>Proving ground</h1>
          <p>
            Every component and every arrangement, rendered. No token system yet — the
            primitives are structural only, and the greys on these pages are measuring chrome,
            not design.
          </p>
        </Layout>

        {SPECIMENS.map((group) => (
          <Layout key={group.tier} rowGap="md">
            <h2>{group.tier}</h2>
            {group.items.length === 0 ? (
              <p>None yet.</p>
            ) : (
              <Layout as="ul" rowGap="sm">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Cluster colGap="sm" align="baseline">
                      <Link href={item.href}>{item.name}</Link>
                      <span>— {item.note}</span>
                    </Cluster>
                  </li>
                ))}
              </Layout>
            )}
          </Layout>
        ))}
      </Layout>
    </Section>
  );
}
