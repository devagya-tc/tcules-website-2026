import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * /services/product-design, held back: main's page as it rendered on 29 Oct 2026, served as a frozen
 * snapshot while the owner finishes the 26 Oct copy's product-design page on feat/new-copy.
 *
 * The snapshot is public/_frozen/services-product-design/ (its README says what it is and how it was
 * captured). This static segment outranks services/[...slug], and the route is off the corpus
 * allowlist (_corpus/offer.tsx), so nothing else renders here. Read once at build (`force-static`).
 *
 * TEMPORARY: delete this file and the snapshot folder, and put the route back on
 * PASS_1_OFFER_ROUTES, when the new page ships.
 */
export const dynamic = 'force-static';

const SNAPSHOT = join(process.cwd(), 'public/_frozen/services-product-design/index.html');

export async function GET(): Promise<Response> {
  const html = await readFile(SNAPSHOT, 'utf8');
  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
