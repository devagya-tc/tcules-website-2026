import { SiteNav } from 'tcules-website-2026';
import type { SiteNavItem, SiteNavLink } from 'tcules-website-2026';

/* SiteNav reads the current URL to decide which bar item is lit. Outside the app there is no
   router, so the bundle's next/navigation shim answers from this global — see
   .design-sync/shims/next-navigation.tsx. Setting it here is what makes the active state in
   these cards real rather than staged. */
(globalThis as { __DS_PATHNAME__?: string }).__DS_PATHNAME__ = '/services/design-systems';

/* Every destination in the real nav is `planned` except the audit family — the routes are
   decided, the pages are not built. The flag changes nothing about how a link RENDERS, on
   purpose: a greyed row tells a visitor the company is unfinished, where a thin page tells them
   the work is in progress. It exists so the sitemap generator can leave a holding page out. */
const soon = (label: string, href: string): SiteNavLink => ({ label, href, status: 'planned' });

const SERVICES: SiteNavItem = {
  key: 'services',
  label: 'Services',
  form: 'mega',
  /* A mega has no href — its trigger opens rather than navigates — so its own index is named
     here beside the paths it owns outside its family. */
  matchPaths: ['/services', '/audits', '/how-we-work'],
  /* The way through to /services. A mega's trigger opens rather than navigates, so without this
     the section's own index has no route to it. Insights carries one too; Expertise does not. */
  hub: { label: 'All services', href: '/services', status: 'planned' },
  /* The audits carry the longer labels, so the second column takes the larger share and the two end
     up with matching slack. Declared per item because the direction differs by section — Expertise's
     longer labels are in its FIRST group, so it deliberately has none. */
  columnRatio: [3, 4],
  panelWidth: 'lg',
  groups: [
    {
      label: 'Services',
      links: [
        soon('Product Design', '/services/product-design'),
        soon('Product Modernisation', '/services/product-modernisation'),
        soon('Design Systems', '/services/design-systems'),
        soon('AI Product UX', '/services/ai-product-ux'),
        soon('Design Engineering', '/services/design-engineering'),
        soon('Software Development', '/services/software-development'),
      ],
    },
    {
      label: 'Audits and starting points',
      links: [
        { label: 'UX and Product Audit', href: '/audits/ux-product-audit', status: 'live' },
        { label: 'Design-System Audit', href: '/audits/design-system-audit', status: 'live' },
        { label: 'Design-to-Code Audit', href: '/audits/design-to-code-audit', status: 'live' },
        {
          label: 'Product Modernisation Assessment',
          href: '/audits/product-modernisation-assessment',
          status: 'live',
        },
        {
          label: 'AI Product UX Readiness',
          href: '/audits/ai-product-ux-readiness',
          status: 'live',
        },
        {
          label: 'Prototype Hardening Review',
          href: '/audits/prototype-hardening-review',
          status: 'live',
        },
      ],
    },
  ],
  rail: {
    label: 'Working together',
    cards: [
      /* The image is a RECORD now, not a slot — {src, alt, width, height}, the same contract Figure
         and PageHero take, which is what lets the content seam carry it. The file is a placeholder:
         the artwork for this card is still an open item, and it is diagrammatic so it reads as a
         stand-in rather than as a photograph nobody chose. */
      {
        title: 'How We Work',
        href: '/how-we-work',
        status: 'planned',
        role: 'primary',
        image: {
          src: '/nav/how-we-work-placeholder.svg',
          alt: '',
          width: 480,
          height: 210,
        },
      },
      { title: 'Request Free Audit', href: '/audits', status: 'planned', role: 'secondary' },
    ],
  },
};

const EXPERTISE: SiteNavItem = {
  key: 'expertise',
  label: 'Expertise',
  form: 'mega',
  matchPaths: ['/expertise'],
  panelWidth: 'md',
  groups: [
    {
      label: 'Products and platforms',
      links: [
        soon('B2B SaaS and Workflow Software', '/expertise/b2b-saas-workflow-software'),
        soon('AI Products and Developer Tools', '/expertise/ai-products-developer-tools'),
        soon('Data, Analytics and Decision Products', '/expertise/data-analytics-decision-products'),
        soon('Marketplaces and Multi-Sided Platforms', '/expertise/marketplaces-multi-sided-platforms'),
        soon('Content, Knowledge and Discovery Platforms', '/expertise/content-knowledge-discovery-platforms'),
        soon('Commerce and Transactional Products', '/expertise/commerce-transactional-products'),
      ],
    },
    {
      label: 'Industries and domains',
      links: [
        soon('FinTech and InsurTech', '/expertise/fintech-insurtech'),
        soon('HealthTech and Care', '/expertise/healthtech-care'),
        soon('EdTech and Learning', '/expertise/edtech-learning'),
        soon('MarTech and SalesTech', '/expertise/martech-salestech'),
        soon('PropTech, ConTech and Field Operations', '/expertise/proptech-contech-field-operations'),
        soon('ClimateTech and Energy', '/expertise/climatetech-energy'),
      ],
    },
  ],
};

const INSIGHTS: SiteNavItem = {
  key: 'insights',
  label: 'Insights',
  form: 'mega',
  matchPaths: ['/insights', '/glossary', '/tools'],
  hub: { label: 'All insights', href: '/insights', status: 'planned' },
  columnRatio: [3, 4],
  panelWidth: 'sm',
  groups: [
    {
      label: 'Formats',
      links: [
        soon('Articles', '/insights/articles'),
        soon('Podcasts', '/insights/podcasts'),
        soon('Videos', '/insights/videos'),
        soon('Events', '/insights/events'),
      ],
    },
    {
      label: 'Knowledge and utility',
      links: [
        soon('Tools and Resources', '/tools'),
        soon('Guides', '/insights/guides'),
        soon('Glossary', '/glossary'),
        soon('Interviews', '/insights/interviews'),
      ],
    },
  ],
};

/* The three direct links. Their children are in the data and go UNRENDERED — that is the whole
   point of carrying them: promoting Lab to a menu later is `form: 'compact'` on one record, not a
   content migration. The same records are what the footer and the sitemap are meant to read. */
const WORK: SiteNavItem = {
  key: 'work',
  label: 'Work',
  form: 'link',
  href: '/case-studies',
  matchPaths: ['/clients'],
  children: [soon('Case Studies', '/case-studies'), soon('Clients', '/clients')],
};

const LAB: SiteNavItem = {
  key: 'lab',
  label: 'Lab',
  form: 'link',
  href: '/future-interfaces-lab',
  matchPaths: ['/matter-design-system'],
  children: [
    soon('Experiments', '/future-interfaces-lab/experiments'),
    soon('Tools', '/future-interfaces-lab/tools'),
    soon('Research', '/future-interfaces-lab/research'),
    soon('Datasets', '/future-interfaces-lab/datasets'),
    soon('Programmes', '/future-interfaces-lab/programmes'),
    soon('Matter Design System', '/matter-design-system'),
  ],
};

const ABOUT: SiteNavItem = {
  key: 'about',
  label: 'About',
  form: 'link',
  href: '/about',
  matchPaths: ['/team', '/careers', '/security-and-confidentiality', '/contact'],
  children: [
    soon('About', '/about'),
    soon('Team', '/team'),
    soon('Careers', '/careers'),
    soon('Security and Confidentiality', '/security-and-confidentiality'),
    soon('Contact', '/contact'),
  ],
};

/* Content order, not menus-first: Work sits second because case studies are the strongest proof
   and should not be the fifth thing read. */
const ITEMS: SiteNavItem[] = [SERVICES, WORK, EXPERTISE, INSIGHTS, LAB, ABOUT];

const CTA: SiteNavLink = { label: 'Start a project', href: '/contact', status: 'planned' };
const CTA_SECONDARY: SiteNavLink = { label: 'Request audit', href: '/audits', status: 'planned' };

/**
 * The bar as it sits on a page — six items, three of them disclosures, and the one solid action.
 * Services is lit because the shim above puts us on /services/design-systems, and an item owns its
 * whole family.
 *
 * WHAT A STILL CARD CANNOT SHOW. The three menu sections open one inset PLATE over the page, and
 * it is closed here because a header at rest is what a page composition needs to see. Hovering a
 * mega opens it after 100ms; moving between two morphs the box's width and height while the panes
 * cross-slide, and crossing Work on the way closes nothing. Below 1024 all of this becomes a sheet
 * that rises from the bottom and hugs its list. `/design/site-nav` in the repo is where those are
 * exercised.
 */
export function Bar() {
  return <SiteNav items={ITEMS} cta={CTA} ctaSecondary={CTA_SECONDARY} />;
}

/**
 * The same header on the ink surface. One prop sets the ground for the bar, the plate and the
 * sheet together — a header whose plate is a different surface from its bar reads as two
 * components that happen to be adjacent.
 *
 * The ink block is where the token layer earns its keep: brandeis-500 as text on neutral-950
 * reaches 2.77:1, so every blue that carries a label comes off the light end of the ramp, and the
 * row's hover fill goes NEUTRAL rather than blue — at the pale end of the blue ramp there is no
 * tint left to see against a near-black ground.
 */
export function OnInk() {
  return <SiteNav items={ITEMS} cta={CTA} ctaSecondary={CTA_SECONDARY} surface="ink" />;
}

/** On the blue pivot, where every colour change becomes a fill because blue cannot signal itself. */
export function OnBlue() {
  return <SiteNav items={ITEMS} cta={CTA} ctaSecondary={CTA_SECONDARY} surface="blue" />;
}
