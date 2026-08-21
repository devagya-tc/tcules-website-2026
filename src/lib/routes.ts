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

  /* Lab and company. */
  futureInterfacesLab: '/future-interfaces-lab',
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
  designEnquiryForm: '/design/enquiry-form',
} as const;

export type RouteKey = keyof typeof ROUTES;

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
 * Endpoints, which are not routes. Named here anyway so a form action is not a literal in a
 * pattern's fixture. NOTHING SERVES THIS YET — the newsletter field posts to a 404 until an
 * `app/api/newsletter/route.ts` exists.
 */
export const ENDPOINTS = {
  newsletter: '/api/newsletter',
  enquiryDesign: '/api/design/enquiry',
} as const;
