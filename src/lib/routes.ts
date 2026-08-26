/**
 * Every path in the site, named once.
 *
 * Routes get referenced from navigation, footers, breadcrumbs, sitemaps, redirects and
 * cross-links — so a path that is written as a literal in each of those places turns any URL
 * decision into a hunt. Named here, renaming a family is a one-line edit plus a directory
 * rename.
 *
 * FLAT, deliberately. A nested shape (`ROUTES.services.designSystems`) reads well at the call
 * site and then costs you `RouteKey`: the union of every route name is what lets a nav item, a
 * breadcrumb or a redirect table be typed against "a route this site actually has". Grouping is
 * done with comments, which cost nothing.
 *
 * The families below come from the site sitemap and are what the header and footer navigate to.
 * A path with no page behind it yet is still named here — the nav is the first consumer of a
 * route and it exists before the route does.
 */
export const ROUTES = {
  home: '/',

  /* Services — the six offers, plus the two ways an engagement starts. */
  services: '/services',
  productDesign: '/services/product-design',
  productModernisation: '/services/product-modernisation',
  designSystems: '/services/design-systems',
  aiProductUx: '/services/ai-product-ux',
  designEngineering: '/services/design-engineering',
  softwareDevelopment: '/services/software-development',
  audits: '/audits',
  howWeWork: '/how-we-work',

  /* The six audits, named individually because the nav lists them as a group of six rather than
     linking the index. They resolve through the `/audits/[slug]` route that already ships, so
     `auditPath()` below would build the same strings — but a nav item takes a NAME, and a call
     site that computes one cannot be checked against the union. */
  uxProductAudit: '/audits/ux-product-audit',
  designSystemAudit: '/audits/design-system-audit',
  designToCodeAudit: '/audits/design-to-code-audit',
  productModernisationAssessment: '/audits/product-modernisation-assessment',
  aiProductUxReadiness: '/audits/ai-product-ux-readiness',
  prototypeHardeningReview: '/audits/prototype-hardening-review',

  /* Work. `/case-studies` is the canonical family and `/work` is not a route — the previous
     codebase carried that question unresolved across five files, which is why it is settled
     here rather than at a call site. */
  caseStudies: '/case-studies',
  clients: '/clients',

  /* Expertise — products and platforms first, then industries. */
  expertise: '/expertise',
  b2bSaasWorkflow: '/expertise/b2b-saas-workflow-software',
  aiDeveloperTools: '/expertise/ai-products-developer-tools',
  dataDecisionProducts: '/expertise/data-analytics-decision-products',
  marketplaces: '/expertise/marketplaces-multi-sided-platforms',
  contentDiscovery: '/expertise/content-knowledge-discovery-platforms',
  commerce: '/expertise/commerce-transactional-products',
  fintech: '/expertise/fintech-insurtech',
  healthtech: '/expertise/healthtech-care',
  edtech: '/expertise/edtech-learning',
  martech: '/expertise/martech-salestech',
  proptech: '/expertise/proptech-contech-field-operations',
  climatetech: '/expertise/climatetech-energy',

  /* Insights — formats are index pages, not tags. */
  insights: '/insights',
  articles: '/insights/articles',
  guides: '/insights/guides',
  research: '/insights/research',
  podcasts: '/insights/podcasts',
  videos: '/insights/videos',
  events: '/insights/events',
  interviews: '/insights/interviews',
  tools: '/tools',
  glossary: '/glossary',

  /* Lab and company. The five Lab children are carried by the nav data even though Lab renders as
     a direct link today — see docs/specs/SiteNav.md §2.1. Naming them is what makes switching Lab
     to a menu a one-field edit rather than a content migration.

     These five were dropped by the conflict resolution in PR #36's `Merge branch 'main' into
     strapi-integration` and are restored here. The tell that it was a casualty rather than a
     decision: the comment above survived while the routes it describes did not. `join` is PR #36's
     and stays. */
  futureInterfacesLab: '/future-interfaces-lab',
  futureInterfacesLabJoin: '/future-interfaces-lab/join',
  labExperiments: '/future-interfaces-lab/experiments',
  labTools: '/future-interfaces-lab/tools',
  labResearch: '/future-interfaces-lab/research',
  labDatasets: '/future-interfaces-lab/datasets',
  labProgrammes: '/future-interfaces-lab/programmes',
  matterDesignSystem: '/matter-design-system',
  about: '/about',
  team: '/team',
  careers: '/careers',
  security: '/security-and-confidentiality',
  contact: '/contact',

  /* Utility — the footer's bottom row. */
  privacy: '/privacy-policy',
  terms: '/terms-of-use',
  accessibility: '/accessibility',
  sitemap: '/sitemap',

  /* The proving ground. Not linked from the site; named so a specimen can cross-link. */
  design: '/design',
  designCtaSection: '/design/cta-section',
  designEnquiryForm: '/design/enquiry-form',
  designProof: '/design/proof',
  designCallout: '/design/callout',
} as const;

export type RouteKey = keyof typeof ROUTES;

/** Build one canonical audit-detail path without duplicating the route family at call sites. */
export function auditPath(slug: string): string {
  return `${ROUTES.audits}/${encodeURIComponent(slug)}`;
}

/** Build a service-detail path while preserving each level of a nested CMS slug. */
export function servicePath(slug: string): string {
  const encodedSlug = slug
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return encodedSlug ? `${ROUTES.services}/${encodedSlug}` : ROUTES.services;
}

/** Build one canonical expertise-detail path from the named route family. */
export function expertisePath(slug: string): string {
  return `${ROUTES.expertise}/${encodeURIComponent(slug)}`;
}

/** Build one canonical case-study detail path from the named route family. */
export function caseStudyPath(slug: string): string {
  return `${ROUTES.caseStudies}/${encodeURIComponent(slug)}`;
}

/** Build one canonical podcast-detail path from the named insights family. */
export function podcastPath(slug: string): string {
  return `${ROUTES.podcasts}/${encodeURIComponent(slug)}`;
}

/** Build one canonical event-detail path from the named insights family. */
export function eventPath(slug: string): string {
  return `${ROUTES.events}/${encodeURIComponent(slug)}`;
}

/** Build one canonical article-detail path for podcast resource links. */
export function articlePath(slug: string): string {
  return `${ROUTES.articles}/${encodeURIComponent(slug)}`;
}

/** Build one canonical tool-detail path from the named insights family. */
export function toolPath(slug: string): string {
  return `${ROUTES.tools}/${encodeURIComponent(slug)}`;
}

/** Build an insight-detail path while preserving each level of a nested CMS slug. */
export function blogPath(slug: string): string {
  const encodedSlug = slug
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return encodedSlug ? `${ROUTES.insights}/${encodedSlug}` : ROUTES.insights;
}

/** Build one canonical glossary-detail path from the named route family. */
export function glossaryPath(slug: string): string {
  return `${ROUTES.glossary}/${encodeURIComponent(slug)}`;
}

/**
 * A destination the sitemap does not answer yet.
 *
 * Three navigation items — Series, Rising Topics, Latest Insights — are real editorial ideas
 * with no canonical URL decided. They point here rather than at a guessed path, because a
 * plausible guess is indistinguishable from a decision six months later, and `#` scattered
 * through the IA cannot be grepped for. This can be.
 */
export const UNRESOLVED_ROUTE = '/#unresolved-route';

/**
 * An off-site destination not yet supplied — the social profiles. Same argument as
 * UNRESOLVED_ROUTE: one greppable name beats four `#`s.
 */
export const UNRESOLVED_EXTERNAL = '#unresolved-external';

/**
 * Off-site profiles that more than one component links to.
 *
 * Clutch is the reason this exists: the footer's rating badge and `Stat`'s source link are two
 * consumers of one URL, and two fixtures each holding their own copy is how they drift apart.
 * It is supplied now; LinkedIn and YouTube are still waiting, and resolve to
 * UNRESOLVED_EXTERNAL so the gap is greppable in one place rather than four.
 *
 * The Clutch profile is also the SOURCE OF THE RATING the footer prints. Whoever changes the
 * score in the fixture reads it off this page, and the score and this URL move together — a
 * number nobody can check against its own source is worse than no badge.
 */
export const EXTERNAL = {
  clutch: 'https://clutch.co/profile/tcules-ux-design-studio',
  linkedin: UNRESOLVED_EXTERNAL,
  youtube: UNRESOLVED_EXTERNAL,
} as const;

/**
 * Endpoints, which are not routes. Named here anyway so a form action is not a literal in a
 * pattern's fixture. NOTHING SERVES THIS YET — the newsletter field posts to a 404 until an
 * `app/api/newsletter/route.ts` exists.
 */
export const ENDPOINTS = {
  newsletter: '/api/newsletter',
  contact: '/api/contact',
  enquiryDesign: '/api/design/enquiry',
} as const;
