import type { Metadata } from 'next';

import { Layout, Section } from '@/components';
import { getIdealServiceStory, idealServiceSlugs } from '@/content';
import { ListCard } from '@/patterns';

export const metadata: Metadata = {
  title: 'ServicePage | Design',
  robots: { index: false, follow: false },
};

/** The six designed service lines. Each links to its page, and to the same page in review mode. */
export default function ServicePageIndex() {
  const stories = idealServiceSlugs.flatMap((slug) => {
    const story = getIdealServiceStory(slug);
    return story ? [story] : [];
  });

  return (
    <Section>
      <Layout rowGap="stack">
        <Layout rowGap="block">
          <h1>ServicePage</h1>
          <p>
            The six service lines, designed from their own content. Each page is the ServicePage
            template fed a hand-authored story rather than the CMS translation. Add ?slots=1 to
            any page to see the images it is designed to carry and does not have yet.
          </p>
        </Layout>
        <Layout as="ul" rowGap="none">
          {stories.map((story) => (
            <ListCard
              key={story.slug}
              title={story.hero.eyebrow}
              body={story.hero.title}
              titleAs="h3"
              href={`/design/service-page/${story.slug}`}
            />
          ))}
        </Layout>
      </Layout>
    </Section>
  );
}
