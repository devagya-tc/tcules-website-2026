/**
 * Every path in the site, named once.
 *
 * Routes get referenced from navigation, footers, breadcrumbs, sitemaps, redirects and
 * cross-links — so a path that is written as a literal in each of those places turns any URL
 * decision into a hunt. Named here, renaming a family is a one-line edit plus a directory
 * rename.
 *
 * Populated as route families get built.
 */
export const ROUTES = {
  home: '/',
} as const;

export type RouteKey = keyof typeof ROUTES;
