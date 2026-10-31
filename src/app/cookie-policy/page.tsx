import type { Metadata } from 'next';

import { LongformRoute, longformMetadata } from '@/app/_corpus/longform';
import { ROUTES } from '@/lib/routes';

/**
 * `/cookie-policy` — read from the `_pages/` copy as one document in the article shell (legal pages need no
 * design: owner, 31 Oct 2026). Composition only.
 */
export async function generateMetadata(): Promise<Metadata> {
  return (await longformMetadata(ROUTES.cookiePolicy)) ?? { title: 'Tcules' };
}

export default function CookiePolicyPage() {
  return <LongformRoute route={ROUTES.cookiePolicy} />;
}
