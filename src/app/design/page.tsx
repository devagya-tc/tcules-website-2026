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
    tier: 'Foundations',
    items: [
      {
        href: '/design/typography',
        name: 'Typography',
        note: 'every --text-* role, the ladders under them, title and running-text wrap at the CU04 ceilings, and the Prose rich-text flow',
      },
    ],
  },
  {
    tier: 'Primitives',
    items: [
      {
        href: '/design/section',
        name: 'Section',
        note: 'band, content column, vertical rhythm',
      },
      {
        href: '/design/layout',
        name: 'Layout',
        note: 'columnar axis — tracks and the two seams',
      },
      { href: '/design/cluster', name: 'Cluster', note: 'inline axis — wrapping rows' },
      {
        href: '/design/button',
        name: 'Button',
        note: '3 emphases × 2 tones, 3 sizes, 3 variants, 4 surfaces',
      },
      {
        href: '/design/input',
        name: 'Input',
        note: 'native input and textarea, 2 emphases, semantic states, 4 surfaces',
      },
      { href: '/design/icon', name: 'Icon', note: 'the glyph set, 4 size roles, currentColor' },
      {
        href: '/design/media',
        name: 'Media',
        note: 'the image asset — 4 kinds × 4 surfaces, cut-out shadow and panels, srcset, intrinsic vs fill, stress shapes',
      },
      {
        href: '/design/tag',
        name: 'Tag',
        note: 'inert mark and filter chip — one box, inverted enclosure, four surfaces, held state',
      },
      {
        href: '/design/logo',
        name: 'Logo',
        note: 'the wordmark — 3 heights, 2 bar treatments, 4 surfaces',
      },
      {
        href: '/design/client-mark',
        name: 'ClientMark',
        note: "a client's logo in a set — mask in the ground's ink, equal area, capped 40 × 160, ±15% correction, 4 surfaces",
      },
      {
        href: '/design/texture',
        name: 'Texture',
        note: 'the pixel grid through placed, blurred shapes — 4 anchors, 4 surfaces, dark-ground candidates',
      },
      {
        href: '/design/typography',
        name: 'Prose',
        note: 'the rich-text flow — specimen lives on the typography route',
      },
    ],
  },
  {
    tier: 'Patterns',
    items: [
      {
        href: '/design/breadcrumbs',
        name: 'Breadcrumbs',
        note: 'the ancestor trail — depth ladder, collapse, 4 surfaces, its own band',
      },
      {
        href: '/design/table-of-contents',
        name: 'TableOfContents',
        note: 'the outline of a long-form document — sticky rail, live mark, 2 arrangements, 4 surfaces',
      },
      {
        href: '/design/content-section',
        name: 'ContentSection',
        note: 'one CMS section as one band — stacked | beside × 4 surfaces, stress copy, absent slots, 390',
      },
      {
        href: '/design/cta-section',
        name: 'CtaSection',
        note: 'the commercial close — 3 arrangements, accepted ask ladder, 4 surfaces',
      },
      {
        href: '/design/enquiry-form',
        name: 'EnquiryForm',
        note: 'enquiry, audit, and contact field sets — async lifecycle, 4 surfaces',
      },
      {
        href: '/design/list-card',
        name: 'ListCard',
        note: 'the ruled row — 2 arrangements, 3 marker fills, linked states, 4 surfaces',
      },
      {
        href: '/design/block-card',
        name: 'BlockCard',
        note: 'the bounded tile — 3 media fills, responsive grids, linked states, 4 surfaces',
      },
      {
        href: '/design/accordion',
        name: 'Accordion',
        note: 'the native disclosure set — multi-open behavior, rich answers, 4 surfaces',
      },
      {
        href: '/design/proof',
        name: 'Proof',
        note: 'the evidence block — attributed quotes, checked figures, combined layouts, 4 surfaces',
      },
      {
        href: '/design/callout',
        name: 'Callout',
        note: 'the quiet scope note — semantic routing, placement equivalence, narrow tracks, 4 surfaces',
      },
      {
        href: '/design/figure',
        name: 'Figure',
        note: 'the captioned image — slot ladder, 3 intrinsic ratios uncropped, the empty state, 4 surfaces',
      },
      {
        href: '/design/data-table',
        name: 'DataTable',
        note: 'the comparison table — 1 to 5 data columns, column behaviour, marks, the stacked order at 326 and 392, 4 surfaces',
      },
      {
        href: '/design/page-hero',
        name: 'PageHero',
        note: 'the page opening — slot ladder, paragraph ladder, byline shapes, 4 surfaces, its own band',
      },
      {
        href: '/design/site-nav',
        name: 'SiteNav',
        note: 'the header — bar, the morphing plate at 3 widths, the mobile sheet, 4 surfaces',
      },
      {
        href: '/design/site-footer',
        name: 'SiteFooter',
        note: 'the footer — 5 bands, the directory and its accordions, the rating badge, 4 surfaces',
      },
    ],
  },
  { tier: 'Templates', items: [] },
] as const;

export default function DesignIndexPage() {
  return (
    <Section>
      <Layout rowGap="stack">
        <Layout rowGap="block">
          <h1>Proving ground</h1>
          <p>
            Every component and every arrangement, rendered. Nothing gets a page route before it
            has a route here, and the list is registered by hand so it stays honest about what
            is actually covered.
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
