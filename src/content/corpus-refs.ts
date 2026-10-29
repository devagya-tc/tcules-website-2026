import type { CorpusCaseRef, CorpusMediaBinding } from './corpus-types';
import { CASE_SLUG_REDIRECTS } from '@/lib/routes';

import { getCorpusPage, listCorpusPages } from './source';

/**
 * The cases a page cites, as each case's OWN corpus page describes it (page-mapping M8, rule 5.2).
 *
 * A home page that cites the Dealpath case needs the case's name and a cover, and both are already
 * in the corpus: the name is the case page's h1 (the content team's words for it), the cover its
 * first bound asset. Reading them here keeps a template from reaching for another page, and keeps
 * the builder from writing a title nobody authored. A route with no page in the corpus is simply
 * absent from the result, so a caller can tell the case is not authored yet.
 */
export async function getCaseRefs(
  routes: readonly string[],
): Promise<Record<string, CorpusCaseRef>> {
  const refs: Record<string, CorpusCaseRef> = {};
  /* Links reach a case by its live slug (the seam rewrites them); a case's own page in the copy may
     still sit at the slug it was planned under, so that is looked up too. */
  const planned = new Map(
    Object.entries(CASE_SLUG_REDIRECTS).map(([from, to]) => [`/case-studies/${to}`, `/case-studies/${from}`]),
  );
  for (const route of routes) {
    const alias = planned.get(route);
    const page = (await getCorpusPage(route)) ?? (alias ? await getCorpusPage(alias) : null);
    if (!page) continue;
    refs[route] = {
      route,
      title: page.hero.titleText,
      cover: page.composition.mediaBindings.find((b) => b.bound) ?? null,
    };
  }
  return refs;
}

/**
 * Media bindings the corpus declares on one page and another page reuses, by binding id (the studio
 * photographs `about_studio_review`, `about_work_wall`: page-mapping § 0 rule 5.3). Searches every
 * page; an id nothing binds is absent from the result.
 */
export async function getCorpusBindings(
  ids: readonly string[],
): Promise<Record<string, CorpusMediaBinding>> {
  const wanted = new Set(ids);
  const found: Record<string, CorpusMediaBinding> = {};
  for (const page of await listCorpusPages()) {
    for (const binding of page.composition.mediaBindings) {
      if (wanted.has(binding.id) && binding.bound) found[binding.id] = binding;
    }
  }
  return found;
}
