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
      {
        href: '/design/button',
        name: 'Button',
        note: '3 emphases × 2 tones, 3 sizes, 3 variants, 4 surfaces',
      },
      { href: '/design/icon', name: 'Icon', note: 'the glyph set, 4 size roles, currentColor' },
    ],
  },
  { tier: 'Patterns', items: [] },
  { tier: 'Templates', items: [] },
] as const;

export default function DesignIndexPage() {
  return (
    <Section>
      <Layout rowGap="stack">
        <Layout rowGap="block">
          <h1>Proving ground</h1>
          <p>
            Every component and every arrangement, rendered. No token system yet — the
            primitives are structural only, and the greys on these pages are measuring chrome,
            not design.
          </p>
        </Layout>

        {SPECIMENS.map((group) => (
          <Layout key={group.tier} rowGap="block">
            <h2>{group.tier}</h2>
            {group.items.length === 0 ? (
              <p>None yet.</p>
            ) : (
              <Layout as="ul" rowGap="tight">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Cluster colGap="tight" align="baseline">
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
