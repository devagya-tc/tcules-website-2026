/**
 * Is a navigation destination the one we are currently on?
 *
 * Two rules, and the second is the one that needs stating.
 *
 * 1. A path matches its own family: `/services/design-systems` lights up `/services`, because a
 *    nav bar that only highlights on the index page tells you nothing once you are inside the
 *    section. The boundary is a `/`, so `/servicing` does not match `/services`.
 *
 * 2. The home route is EXACT. Every path begins with `/`, so a prefix rule would light up Home on
 *    every page of the site.
 *
 * `matchPaths` covers the case where one bar item owns paths outside its own family — Services
 * also owns `/audits` and `/how-we-work`, About also owns `/team` and `/careers`. Without it those
 * pages would leave the whole bar unlit, which reads as "you are nowhere".
 */
export function isActivePath(
  pathname: string,
  href: string,
  matchPaths: string[] = [],
): boolean {
  return [href, ...matchPaths].some((candidate) => covers(pathname, candidate));
}

function covers(pathname: string, candidate: string): boolean {
  if (candidate === '/') return pathname === '/';
  return pathname === candidate || pathname.startsWith(`${candidate}/`);
}
