import type { Metadata } from 'next';

import { ComposedRoute, composedMetadata } from '@/app/_corpus/composed';
import { ROUTES } from '@/lib/routes';

/**
 * `/privacy-policy` — read from the `_pages/` copy and composed by OfferPage's unit loop
 * (component-map C12). Composition only.
 */
export async function generateMetadata(): Promise<Metadata> {
  return (await composedMetadata(ROUTES.privacy)) ?? { title: 'Tcules' };
}

export default function PrivacyPolicyPage() {
  return <ComposedRoute route={ROUTES.privacy} />;
}
