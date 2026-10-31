import type { Metadata } from 'next';

import { LongformRoute, longformMetadata } from '@/app/_corpus/longform';
import { ROUTES } from '@/lib/routes';

/**
 * `/privacy-policy` — read from the `_pages/` copy as one document in the article shell (legal pages need no
 * design: owner, 31 Oct 2026). Composition only.
 */
export async function generateMetadata(): Promise<Metadata> {
  return (await longformMetadata(ROUTES.privacy)) ?? { title: 'Tcules' };
}

export default function PrivacyPolicyPage() {
  return <LongformRoute route={ROUTES.privacy} />;
}
