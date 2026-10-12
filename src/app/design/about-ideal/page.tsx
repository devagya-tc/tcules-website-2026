import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCaseRefs, getCorpusPage, getIdealAboutPage } from '@/content';
import { caseStudyLink } from '@/lib/case-links';
import { caseRoutesIn } from '@/lib/corpus-cases';
import { corpusImage } from '@/lib/corpus-images';
import { inlineToText } from '@/lib/inline';
import { placeholderImage } from '@/lib/placeholders';
import { ROUTES } from '@/lib/routes';
import { heroTrail } from '@/lib/trail';
import { Breadcrumbs } from '@/patterns';
import { StudioPage, coverFor } from '@/templates';

export const metadata: Metadata = {
  title: 'About · ideal content | Design',
  robots: { index: false, follow: false },
};

/**
 * The About page with its copy edited for consumption (src/content/sources/fixtures/ideal/about.ts),
 * composed by StudioPage. Put it beside /about: the live page renders the corpus verbatim, this one
 * the proposed edit. The photographs are the corpus's bound studio media and the case covers its
 * cases' own; the portraits and the careers panorama are register placeholders.
 */
export default async function AboutIdeal() {
  const [content, page] = await Promise.all([getIdealAboutPage(), getCorpusPage(ROUTES.about)]);
  if (!page) notFound();
  const caseRefs = await getCaseRefs(caseRoutesIn(page));

  /* The studio media the corpus binds, by binding id. */
  const bound = (bindingId: string) => {
    const binding = page.composition.mediaBindings.find((b) => b.id === bindingId && b.bound);
    if (!binding) throw new Error(`about-ideal: no bound media "${bindingId}".`);
    return corpusImage(binding);
  };

  /* Each case's corpus link (for its cover) from the band that cites it, by the case's name. */
  const cited = new Map<string, string>();
  for (const block of page.bands.find((b) => b.id === 'work-you-can-inspect')?.blocks ?? []) {
    const first = block.type === 'paragraph' ? block.runs[0] : undefined;
    if (first?.type === 'link') cited.set(inlineToText(first.children), first.href);
  }
  const covers = Object.fromEntries(
    content.work.cases.map((item) => {
      const href = cited.get(item.name);
      return [item.name, coverFor(page, item.name, href ? caseRefs[href] : undefined)];
    }),
  );
  const caseHrefs = Object.fromEntries(
    content.work.cases.flatMap((item) => {
      const link = caseStudyLink(item.name);
      return link ? [[item.name, link.href]] : [];
    }),
  );

  return (
    <StudioPage
      content={content}
      trail={heroTrail(
        [
          { label: 'Home', href: ROUTES.home },
          { label: 'About', href: ROUTES.about },
        ],
        content.hero.title,
        (t) => (
          <Breadcrumbs {...t} />
        ),
      )}
      images={{
        ahmedabad: bound('about_team'),
        continuity: bound('about_studio_review'),
        lab: bound('about_work_wall'),
        careers: placeholderImage(ROUTES.about, 'careers'),
        portraits: Object.fromEntries(
          content.people.leaders.map((leader) => [
            leader.portrait,
            placeholderImage(ROUTES.about, 'leadership', leader.portrait),
          ]),
        ),
        covers,
      }}
      caseHrefs={caseHrefs}
    />
  );
}
