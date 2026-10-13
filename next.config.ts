import type { NextConfig } from 'next';

import { CASE_SLUG_REDIRECTS, caseStudyPath } from './src/lib/routes';

const nextConfig: NextConfig = {
  /**
   * Hosts allowed to request DEV-ONLY assets — the JS chunks, the HMR socket, the dev font
   * endpoint. Development only; it has no effect on a build and grants nothing in production.
   *
   * Next blocks these cross-origin by default, and the failure mode is worth knowing because it
   * looks like a bug in your own code rather than a config gap: the HTML renders fine, so the page
   * looks right, but the client chunks 404 and nothing hydrates. Every client component silently
   * becomes static markup — the nav's mega-menu triggers stop opening, the mobile drawer stops
   * toggling, and there is no error on screen. The only signal is `⚠ Blocked cross-origin request`
   * in the dev server log.
   *
   * That is exactly what happens the moment you open the dev server on anything other than
   * localhost — a phone on the same wi-fi, a tablet, a second machine — which is also when you
   * most want to test the drawer.
   *
   * Both forms are listed on purpose. The wildcard covers the subnet, so a DHCP lease change does
   * not break this again; the .local name covers Bonjour, which is how a phone usually resolves
   * this machine. Adjust the subnet if this repo is checked out somewhere on a different one.
   */
  allowedDevOrigins: ['192.168.1.*', '*.local'],
  /** The corpus's planned case slugs → the live Strapi slugs (routes.ts § CASE_SLUG_REDIRECTS).
      Temporary, so nothing caches the planned slug as moved for good. */
  async redirects() {
    return Object.entries(CASE_SLUG_REDIRECTS).map(([from, to]) => ({
      source: caseStudyPath(from),
      destination: caseStudyPath(to),
      permanent: false,
    }));
  },
};

export default nextConfig;
