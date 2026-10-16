import type { Metadata } from 'next';

import { ROUTES } from '@/lib/routes';
import { PageHero } from '@/patterns';

export const metadata: Metadata = {
  title: 'Page not found | Tcules',
  robots: { index: false, follow: false },
};

/**
 * The site's 404 (critique 16 Oct 2026): every `notFound()` and every unmatched URL lands here,
 * inside the root layout, so the nav and footer frame it on the site's paper — not Next's default,
 * a white ground and a tiny "404 | This page could not be found" between the real chrome. Composition
 * only: the one PageHero at the index density, its two ways on to the places a visitor most often
 * meant — the insights and the work.
 */
export default function NotFound() {
  return (
    <PageHero
      data-fold-hero=""
      title="This page could not be found"
      body={[
        'The link may be old, or the page may have moved. The insights and our case studies are the best places to pick up from.',
      ]}
      actions={[
        { label: 'Browse insights', href: ROUTES.insights },
        { label: 'See case studies', href: ROUTES.caseStudies },
      ]}
      density="index"
      surface="paper"
    />
  );
}
