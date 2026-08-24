import type { SiteFooterProps, SiteNavProps } from '@/patterns';
import { ENDPOINTS, EXTERNAL, ROUTES, UNRESOLVED_ROUTE } from '@/lib/routes';

import type { Navigation } from '../../types';

/**
 * The site chrome's information architecture.
 *
 * This is CONTENT. Every label, promise, compartment and group below is an editorial decision that
 * belongs to whoever writes the site, not to the component that renders it — which is why it sits
 * behind the seam and arrives at SiteNav and SiteFooter as props. When this moves to a CMS
 * collection, sources/strapi.ts maps that response into the same two shapes and nothing above
 * changes.
 *
 * Every href is a name from @/lib/routes rather than a literal, so a URL decision is one edit
 * there. Three destinations have no canonical URL in the sitemap and take UNRESOLVED_ROUTE; the
 * social profiles have no URLs supplied and take UNRESOLVED_EXTERNAL. Both are greppable, which a
 * scattering of `#` is not.
 */

/* ── Services ─────────────────────────────────────────────────────────────────────
   Six rows in two columns, each with a mark — "Design Systems" and "Design Engineering" are
   genuinely hard to tell apart at a glance, which is the test a mark has to pass. The rail carries
   the two ways an engagement actually starts, as compartments rather than links, because "start
   with an audit" is a recommendation and a link cannot make one. */
const SERVICES: SiteNavProps['items'][number] = {
  key: 'services',
  label: 'Services',
  href: ROUTES.services,
  matchPaths: [ROUTES.audits, ROUTES.howWeWork],
  panel: [
    {
      kind: 'rows',
      columns: 2,
      items: [
        {
          label: 'Product Design',
          promise: 'Interfaces and flows for products people work in all day.',
          href: ROUTES.productDesign,
          icon: 'product-design',
        },
        {
          label: 'Product Modernisation',
          promise: 'Bring an ageing product forward without stopping the business.',
          href: ROUTES.productModernisation,
          icon: 'modernisation',
        },
        {
          label: 'Design Systems',
          promise: 'One system your designers and engineers both trust.',
          href: ROUTES.designSystems,
          icon: 'design-systems',
        },
        {
          label: 'AI Product UX',
          promise: 'Make AI features legible, controllable and safe to ship.',
          href: ROUTES.aiProductUx,
          icon: 'ai-product-ux',
        },
        {
          label: 'Design Engineering',
          promise: 'Design decisions carried into production code, intact.',
          href: ROUTES.designEngineering,
          icon: 'design-engineering',
        },
        {
          label: 'Software Development',
          promise: 'Build and ship the product, not just the picture of it.',
          href: ROUTES.softwareDevelopment,
          icon: 'software-development',
        },
      ],
    },
    {
      kind: 'rail',
      compartments: [
        {
          eyebrow: 'Where to start',
          title: 'Start with an audit',
          description:
            'A fixed-scope read of your product, design system or codebase, with a written verdict.',
          action: { label: 'See all audits', href: ROUTES.audits },
        },
        {
          eyebrow: 'How we work',
          title: 'Pods, sprint zero, or fixed scope',
          description: 'How an engagement is shaped, staffed and run.',
          action: { label: 'See how we work', href: ROUTES.howWeWork },
        },
      ],
    },
    { kind: 'bar', link: { label: 'All services', href: ROUTES.services } },
  ],
};

/* ── Expertise ────────────────────────────────────────────────────────────────────
   Products and platforms as rows, industries as a rail group. The split is the point: a product
   TYPE changes how the work is done, so it earns a promise; an industry is context, so it is a
   name in a list. No marks — six abstract product categories would need six abstract glyphs, and
   an abstract glyph that stands for "Data and Decision Products" says nothing. */
const EXPERTISE: SiteNavProps['items'][number] = {
  key: 'expertise',
  label: 'Expertise',
  href: ROUTES.expertise,
  panel: [
    {
      kind: 'rows',
      label: 'Products and platforms',
      columns: 2,
      items: [
        {
          label: 'B2B SaaS and Workflow',
          promise: 'Dense, multi-role tools where the actual work happens.',
          href: ROUTES.b2bSaasWorkflow,
        },
        {
          label: 'AI and Developer Tools',
          promise: 'Products for people who notice every rough edge.',
          href: ROUTES.aiDeveloperTools,
        },
        {
          label: 'Data and Decision Products',
          promise: 'A screen full of numbers, turned into a decision.',
          href: ROUTES.dataDecisionProducts,
        },
        {
          label: 'Marketplaces and Platforms',
          promise: 'Two sides to serve, and neither can be the afterthought.',
          href: ROUTES.marketplaces,
        },
        {
          label: 'Content and Discovery',
          promise: 'Large libraries people have to find their way around.',
          href: ROUTES.contentDiscovery,
        },
        {
          label: 'Commerce and Transactions',
          promise: 'Flows where one dropped step is lost revenue.',
          href: ROUTES.commerce,
        },
      ],
    },
    {
      kind: 'rail',
      groups: [
        {
          label: 'Industries and domains',
          links: [
            { label: 'FinTech and InsurTech', href: ROUTES.fintech },
            { label: 'HealthTech and Care', href: ROUTES.healthtech },
            { label: 'EdTech and Learning', href: ROUTES.edtech },
            { label: 'MarTech and SalesTech', href: ROUTES.martech },
            { label: 'PropTech, ConTech and Field Ops', href: ROUTES.proptech },
            { label: 'ClimateTech and Energy', href: ROUTES.climatetech },
          ],
        },
      ],
    },
    { kind: 'bar', link: { label: 'All expertise', href: ROUTES.expertise } },
  ],
};

/* ── Insights ─────────────────────────────────────────────────────────────────────
   Formats, not pinned pieces. A nav that names two articles makes every other way in tertiary, and
   the choice of which two is arbitrary the day after it ships — each row here is a standing index
   page, so the panel stays true with no editorial upkeep. No marks: unlike "Design Systems", the
   label "Podcasts" needs no help, and a glyph that adds nothing is noise. */
const INSIGHTS: SiteNavProps['items'][number] = {
  key: 'insights',
  label: 'Insights',
  href: ROUTES.insights,
  matchPaths: [ROUTES.glossary, ROUTES.tools, ROUTES.futureInterfacesLab],
  panel: [
    {
      kind: 'rows',
      label: 'Formats',
      columns: 2,
      items: [
        {
          label: 'Articles',
          promise: 'Short reads on product, design and delivery.',
          href: ROUTES.articles,
        },
        {
          label: 'Guides',
          promise: 'Longer walkthroughs you can work from.',
          href: ROUTES.guides,
        },
        {
          label: 'Research',
          promise: 'Original findings from our own product work.',
          href: ROUTES.research,
        },
        {
          label: 'Podcasts',
          promise: 'Conversations with the people who build.',
          href: ROUTES.podcasts,
        },
        {
          label: 'Videos',
          promise: 'Teardowns, walkthroughs and talks on screen.',
          href: ROUTES.videos,
        },
        {
          label: 'Events',
          promise: 'Where to find us, and what we are running.',
          href: ROUTES.events,
        },
      ],
    },
    {
      kind: 'rail',
      groups: [
        {
          label: 'Knowledge and utility',
          links: [
            { label: 'Tools and Resources', href: ROUTES.tools },
            { label: 'Glossary', href: ROUTES.glossary },
            { label: 'Interviews', href: ROUTES.interviews },
            { label: 'Series', href: UNRESOLVED_ROUTE },
          ],
        },
        {
          label: 'Current',
          links: [
            { label: 'Rising Topics', href: UNRESOLVED_ROUTE },
            { label: 'Latest Insights', href: UNRESOLVED_ROUTE },
            { label: 'Future Interfaces Lab', href: ROUTES.futureInterfacesLab },
          ],
        },
      ],
    },
    { kind: 'bar', link: { label: 'All insights', href: ROUTES.insights } },
  ],
};

/**
 * Five bar items, plus the CTA. Services · Work · Expertise · Insights · About.
 *
 * Work and About have no panel: there is nothing under them to group, and giving them an empty one
 * for symmetry would put a chevron on a control that opens nothing. The Lab stays a rail link under
 * Insights rather than becoming a sixth bar item — a bar item is a promise that a whole section is
 * behind it.
 */
const NAV: SiteNavProps = {
  items: [
    SERVICES,
    { key: 'work', label: 'Work', href: ROUTES.caseStudies, matchPaths: [ROUTES.clients] },
    EXPERTISE,
    INSIGHTS,
    {
      key: 'about',
      label: 'About',
      href: ROUTES.about,
      matchPaths: [ROUTES.team, ROUTES.careers, ROUTES.security],
    },
  ],
  cta: { label: 'Start a project', href: ROUTES.contact },
};

/* ── Footer ───────────────────────────────────────────────────────────────────────
   The directory is broader than the nav on purpose. A header panel is a route in — it has to
   choose. A footer is the index, so it can afford to name every service, every industry and every
   format, and being the one place that lists all of them is most of its value. */
const FOOTER: SiteFooterProps = {
  brand: {
    tagline: 'Product intent, kept visible from the first decision to what ships.',
    /* Two, not three: Clutch left this list for the rating badge below. A profile that carries a
       score is a claim with a source, and a row of three names cannot say 4.9. */
    social: [
      { label: 'LinkedIn', href: EXTERNAL.linkedin, mark: 'linkedin' },
      { label: 'YouTube', href: EXTERNAL.youtube, mark: 'youtube' },
    ],
    /* PLACEHOLDER. 4.9 is the one invented value in the redesign — it was never read off the real
       profile, which is also still unsupplied. Both land together or neither does; a score with no
       reachable source is worse than no badge. */
    rating: { platform: 'Clutch', mark: 'clutch', score: '4.9', href: EXTERNAL.clutch },
  },
  groups: [
    {
      title: 'Services',
      links: [
        { label: 'Product Design', href: ROUTES.productDesign },
        { label: 'Product Modernisation', href: ROUTES.productModernisation },
        { label: 'Design Systems', href: ROUTES.designSystems },
        { label: 'AI Product UX', href: ROUTES.aiProductUx },
        { label: 'Design Engineering', href: ROUTES.designEngineering },
        { label: 'Software Development', href: ROUTES.softwareDevelopment },
        { label: 'Audits', href: ROUTES.audits },
        { label: 'How We Work', href: ROUTES.howWeWork },
      ],
    },
    {
      title: 'Expertise',
      links: [
        { label: 'B2B SaaS and Workflow Software', href: ROUTES.b2bSaasWorkflow },
        { label: 'AI Products and Developer Tools', href: ROUTES.aiDeveloperTools },
        { label: 'Data and Decision Products', href: ROUTES.dataDecisionProducts },
        { label: 'Marketplaces', href: ROUTES.marketplaces },
        { label: 'Content and Knowledge Platforms', href: ROUTES.contentDiscovery },
        { label: 'FinTech', href: ROUTES.fintech },
        { label: 'HealthTech', href: ROUTES.healthtech },
        { label: 'EdTech', href: ROUTES.edtech },
        { label: 'All Expertise', href: ROUTES.expertise },
      ],
    },
    {
      title: 'Work',
      links: [
        { label: 'Case Studies', href: ROUTES.caseStudies },
        { label: 'Clients', href: ROUTES.clients },
        /* Product Stages and Engagement Models are CLASSIFICATIONS of a case study rather than
           routes of their own, so they point at the pages that carry them. Named here anyway
           because they are how people ask for the work. */
        { label: 'Product Stages', href: ROUTES.caseStudies },
        { label: 'Engagement Models', href: ROUTES.howWeWork },
      ],
    },
    {
      title: 'Insights',
      links: [
        { label: 'Articles', href: ROUTES.articles },
        { label: 'Guides', href: ROUTES.guides },
        { label: 'Podcasts', href: ROUTES.podcasts },
        { label: 'Videos', href: ROUTES.videos },
        { label: 'Events', href: ROUTES.events },
        { label: 'Research', href: ROUTES.research },
        { label: 'Tools and Resources', href: ROUTES.tools },
        { label: 'Glossary', href: ROUTES.glossary },
      ],
    },
    /* Lab is two links and stays its own column rather than folding into Company. It is the one
       group whose contents are products rather than pages about the studio, and burying the design
       system under "Company" is how nobody finds it. Marketing's IA folds them together — that
       note is the one still open. */
    {
      title: 'Lab',
      links: [
        { label: 'Future Interfaces Lab', href: ROUTES.futureInterfacesLab },
        { label: 'Matter Design System', href: ROUTES.matterDesignSystem },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: ROUTES.about },
        { label: 'Team', href: ROUTES.team },
        { label: 'Careers', href: ROUTES.careers },
        { label: 'Security and Confidentiality', href: ROUTES.security },
        { label: 'Contact', href: ROUTES.contact },
      ],
    },
  ],
  cta: { label: 'Start a project', href: ROUTES.contact },
  newsletter: {
    title: 'Beyond Interfaces',
    description:
      'A deep dive into the intersection of design, strategy, and product innovation.',
    cta: { label: 'Subscribe' },
    /* NOTHING SERVES THIS YET. There is no app/api/newsletter/route.ts, so a real submission is a
       404 — the field is in place ahead of the endpoint, deliberately, and this is the note that
       says so. See ENDPOINTS in @/lib/routes. */
    action: ENDPOINTS.newsletter,
    fieldLabel: 'Email address',
    placeholder: 'you@company.com',
  },
  meta: [
    { key: 'Enquiries', value: 'hello@tcules.com', href: 'mailto:hello@tcules.com' },
    { key: 'Studio', value: 'Ahmedabad, India' },
    { key: 'Across time zones', value: 'India · United States · Europe' },
    { key: 'Response', value: 'Within 2 business days' },
  ],
  address: '614, Silver Radiance 2, Science City Road, Sola, Ahmedabad 380060, India',
  utility: [
    { label: 'Privacy', href: ROUTES.privacy },
    { label: 'Terms', href: ROUTES.terms },
    { label: 'Accessibility', href: ROUTES.accessibility },
    { label: 'Sitemap', href: ROUTES.sitemap },
  ],
  legal: '© 2026 Tcules. All rights reserved.',
};

export const NAVIGATION: Navigation = { nav: NAV, footer: FOOTER };
