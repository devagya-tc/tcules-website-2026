import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCaseStory } from '@/content';
import { CaseStory } from '@/templates';

export const metadata: Metadata = {
  title: 'CaseStory · ideal rendering | Design',
  robots: { index: false, follow: false },
};

/**
 * CaseStory at the content it was designed for: the Benchmark Gensuite case, its CMS words copied
 * locally and split into chapters, steps, quotes, a principle and annotated figures
 * (src/content/sources/fixtures/ideal/case-studies). The live route renders the same story.
 */
export default async function CaseStorySpecimen() {
  const story = await getCaseStory('legacy-saas-modernisation-information-architecture');
  if (!story) notFound();
  return <CaseStory story={story} />;
}
