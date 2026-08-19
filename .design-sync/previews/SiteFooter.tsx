import { SiteFooter } from 'tcules-website-2026';
import type { SiteFooterProps } from 'tcules-website-2026';

const FOOTER: Omit<SiteFooterProps, 'surface'> = {
  brand: {
    tagline: 'Product intent, kept visible from the first decision to what ships.',
    social: [
      { label: 'LinkedIn', href: '#' },
      { label: 'YouTube', href: '#' },
      { label: 'Clutch', href: '#' },
    ],
  },
  cta: { label: 'Start a project', href: '/contact' },
  newsletter: {
    title: 'Beyond Interfaces',
    description: 'A deep dive into the intersection of design, strategy, and product innovation.',
    cta: { label: 'Subscribe' },
    action: '/api/newsletter',
    fieldLabel: 'Email address',
    placeholder: 'you@company.com',
  },
  groups: [
    {
      title: 'Services',
      links: [
        { label: 'Product Design', href: '/services/product-design' },
        { label: 'Product Modernisation', href: '/services/product-modernisation' },
        { label: 'Design Systems', href: '/services/design-systems' },
        { label: 'AI Product UX', href: '/services/ai-product-ux' },
        { label: 'Design Engineering', href: '/services/design-engineering' },
      ],
    },
    {
      title: 'Expertise',
      links: [
        { label: 'B2B SaaS and Workflow', href: '/expertise/b2b-saas-workflow-software' },
        { label: 'AI and Developer Tools', href: '/expertise/ai-products-developer-tools' },
        { label: 'FinTech', href: '/expertise/fintech-insurtech' },
        { label: 'HealthTech', href: '/expertise/healthtech-care' },
        { label: 'All Expertise', href: '/expertise' },
      ],
    },
    {
      title: 'Insights',
      links: [
        { label: 'Articles', href: '/insights/articles' },
        { label: 'Guides', href: '/insights/guides' },
        { label: 'Podcasts', href: '/insights/podcasts' },
        { label: 'Research', href: '/insights/research' },
        { label: 'Glossary', href: '/glossary' },
      ],
    },
    {
      title: 'Work',
      links: [
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Clients', href: '/clients' },
        { label: 'Engagement Models', href: '/how-we-work' },
      ],
    },
    {
      title: 'Lab and company',
      links: [
        { label: 'Future Interfaces Lab', href: '/future-interfaces-lab' },
        { label: 'Matter Design System', href: '/matter-design-system' },
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ],
  meta: [
    { key: 'Enquiries', value: 'hello@tcules.com', href: 'mailto:hello@tcules.com' },
    { key: 'Studio', value: 'Ahmedabad, India' },
    { key: 'Across time zones', value: 'India · United States · Europe' },
    { key: 'Response', value: 'Within 2 business days' },
  ],
  address: '614, Silver Radiance 2, Science City Road, Sola, Ahmedabad 380060, India',
  utility: [
    { label: 'Privacy', href: '/privacy-policy' },
    { label: 'Terms', href: '/terms-of-use' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
  legal: '© 2026 Tcules. All rights reserved.',
};

/**
 * The footer on its default ground. Five unlike bands — brand, newsletter, directory, contact,
 * utility — because a footer built from one repeated shape is the failure the design rules name:
 * if you squint and every block is the same rectangle, it is not finished.
 */
export function Default() {
  return <SiteFooter {...FOOTER} />;
}

/** The same footer on paper, for a page that ends light. */
export function OnPaper() {
  return <SiteFooter {...FOOTER} surface="paper" />;
}
