import type { Metadata } from 'next';

import { ComposedRoute, composedMetadata } from '@/app/_corpus/composed';
import { ROUTES } from '@/lib/routes';

/**
 * `/how-we-work/ai-native-product-design` — read from the `_pages/` copy and composed by OfferPage's unit loop
 * (component-map C12). Composition only.
 */
export async function generateMetadata(): Promise<Metadata> {
  return (await composedMetadata(ROUTES.howWeWorkAiNative)) ?? { title: 'Tcules' };
}

export default function AiNativeProductDesignPage() {
  return <ComposedRoute route={ROUTES.howWeWorkAiNative} />;
}
