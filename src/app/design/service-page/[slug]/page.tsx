import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCaseStudyListingPage, getIdealServiceStory, idealServiceSlugs } from '@/content';
import type { ServiceStory, StoryCase } from '@/lib/service-story';
import { caseStudyPath, ENDPOINTS, ROUTES } from '@/lib/routes';
import { ServicePage } from '@/templates';

export function generateStaticParams() {
  return idealServiceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/design/service-page/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const story = getIdealServiceStory(slug);
  return {
    title: story ? `${story.hero.eyebrow} · designed | Design` : 'ServicePage | Design',
    robots: { index: false, follow: false },
  };
}

/**
 * A service line at the content it was designed for — the ServicePage template fed a hand-authored
 * story instead of the CMS translation (sources/fixtures/ideal/services). Put it beside the live
 * /services/<slug> and the difference is the design, the copy edits and the missing images.
 *
 * It reads @/content for one real thing: the case-study listing, so every cited case gets its real
 * cover and its real path. `?slots=1` renders the images each page is designed to carry.
 */
export default async function ServicePageSpecimen({
  params,
  searchParams,
}: PageProps<'/design/service-page/[slug]'>) {
  const { slug } = await params;
  const { slots } = await searchParams;
  const story = getIdealServiceStory(slug);
  if (!story) notFound();

  const listing = await getCaseStudyListingPage(ROUTES.caseStudies.slice(1));
  const bySlug = new Map((listing?.items ?? []).map((item) => [item.slug, item]));

  const resolve = (item: StoryCase): StoryCase => {
    const entry = bySlug.get(item.slug);
    return {
      ...item,
      href: caseStudyPath(item.slug),
      cover: entry?.thumbnail
        ? { ...entry.thumbnail, alt: entry.thumbnail.alt || '' }
        : undefined,
    };
  };

  const resolved: ServiceStory = {
    ...story,
    sections: story.sections.map((section) =>
      section.type === 'offer'
        ? section
        : {
            ...section,
            blocks: section.blocks.map((block) => {
              if (block.kind === 'cases') return { ...block, items: block.items.map(resolve) };
              if (block.kind === 'proof' && block.case)
                return { ...block, case: resolve(block.case) };
              return block;
            }),
          },
    ),
  };

  return (
    <ServicePage
      story={resolved}
      slots={slots === '1'}
      formAction={`${ENDPOINTS.enquiryDesign}?outcome=success`}
      breadcrumbs={[
        { label: 'Home', href: ROUTES.home },
        { label: 'Services', href: ROUTES.services },
        { label: story.hero.eyebrow, href: `/design/service-page/${story.slug}` },
      ]}
    />
  );
}
