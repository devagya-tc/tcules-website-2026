import { SiteNav } from 'tcules-website-2026';
import type { SiteNavItem, SiteNavLink } from 'tcules-website-2026';

/* SiteNav reads the current URL to decide which bar item is lit. Outside the app there is no
   router, so the bundle's next/navigation shim answers from this global — see
   .design-sync/shims/next-navigation.tsx. Setting it here is what makes the active state in
   these cards real rather than staged. */
(globalThis as { __DS_PATHNAME__?: string }).__DS_PATHNAME__ = '/services/design-systems';

const ITEMS: SiteNavItem[] = [
  {
    key: 'services',
    label: 'Services',
    href: '/services',
    matchPaths: ['/audits', '/how-we-work'],
    panel: [
      {
        kind: 'rows',
        columns: 2,
        items: [
          {
            label: 'Product Design',
            promise: 'Interfaces and flows for products people work in all day.',
            href: '/services/product-design',
          },
          {
            label: 'Design Systems',
            promise: 'One system your designers and engineers both trust.',
            href: '/services/design-systems',
            icon: 'modernisation',
          },
          {
            label: 'AI Product UX',
            promise: 'Make AI features legible, controllable and safe to ship.',
            href: '/services/ai-product-ux',
          },
          {
            label: 'Design Engineering',
            promise: 'Design decisions carried into production code, intact.',
            href: '/services/design-engineering',
          },
        ],
      },
      {
        kind: 'rail',
        compartments: [
          {
            eyebrow: 'Where to start',
            title: 'Start with an audit',
            description: 'A fixed-scope read of the product before anyone commits to a roadmap.',
            action: { label: 'See all audits', href: '/audits' },
          },
        ],
      },
      { kind: 'bar', link: { label: 'All services', href: '/services' } },
    ],
  },
  {
    key: 'expertise',
    label: 'Expertise',
    href: '/expertise',
    panel: [
      {
        kind: 'rows',
        label: 'Products and platforms',
        columns: 2,
        items: [
          {
            label: 'B2B SaaS and Workflow',
            promise: 'Dense, multi-role tools where the actual work happens.',
            href: '/expertise/b2b-saas-workflow-software',
          },
          {
            label: 'Data and Decision Products',
            promise: 'A screen full of numbers, turned into a decision.',
            href: '/expertise/data-analytics-decision-products',
          },
        ],
      },
      {
        kind: 'rail',
        groups: [
          {
            label: 'Industries and domains',
            links: [
              { label: 'FinTech and InsurTech', href: '/expertise/fintech-insurtech' },
              { label: 'HealthTech and Care', href: '/expertise/healthtech-care' },
              { label: 'EdTech and Learning', href: '/expertise/edtech-learning' },
            ],
          },
        ],
      },
      { kind: 'bar', link: { label: 'All expertise', href: '/expertise' } },
    ],
  },
  { key: 'work', label: 'Work', href: '/case-studies', matchPaths: ['/clients'] },
  { key: 'about', label: 'About', href: '/about', matchPaths: ['/team', '/careers'] },
];

const CTA: SiteNavLink = { label: 'Start a project', href: '/contact' };

/**
 * The bar as it sits on a page — four top-level items, two of them disclosures, and the one
 * solid action. Services is lit because the shim above puts us on /services/design-systems, and
 * an item owns its whole family.
 */
export function Bar() {
  return <SiteNav items={ITEMS} cta={CTA} />;
}

/**
 * The same header on the ink surface. One prop sets the ground for the bar, the panel and the
 * drawer together — a header whose panel is a different surface from its bar reads as two
 * components that happen to be adjacent.
 */
export function OnInk() {
  return <SiteNav items={ITEMS} cta={CTA} surface="ink" />;
}

/** On the blue pivot. */
export function OnBlue() {
  return <SiteNav items={ITEMS} cta={CTA} surface="blue" />;
}
