import type { Metadata } from 'next';

import { ComposedRoute, composedMetadata } from '@/app/_corpus/composed';
import { ROUTES } from '@/lib/routes';

/**
 * `/why-tcules` — read from the `_pages/` copy and composed by OfferPage's unit loop
 * (component-map C12). Composition only.
 */
export async function generateMetadata(): Promise<Metadata> {
  return (await composedMetadata(ROUTES.whyTcules)) ?? { title: 'Tcules' };
}

export default function WhyTculesPage() {
  return <ComposedRoute route={ROUTES.whyTcules} />;
}
