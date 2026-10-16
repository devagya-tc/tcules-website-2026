import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CaseIndexRoute, caseIndexProps } from '@/app/_corpus/case-index';
import { getIdealCaseStudyListingPage } from '@/content';
import { caseStudyPath, ROUTES } from '@/lib/routes';
import { CaseStudyIndex, type CaseStudyIndexProps } from '@/templates';

export const metadata: Metadata = {
  title: 'CaseStudyIndex | Design',
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * CaseStudyIndex, in both of its forms.
 *
 *   (default)     the GROUPED form the live /case-studies renders, from the corpus
 *                 (`_pages/case-studies.md`, the same route module): "Four to start with" full width,
 *                 then the four situations as IndexGroups beside the sticky outline rail, each shaped
 *                 by its count, and the enquiry close.
 *   ?state=stress the grouped form under the cases the live corpus does not hold (critique 16 Oct
 *                 2026: the default renders exactly the live page): a group whose titles run long, a
 *                 group of ONE case with no quote (the horizontal card, and the development warning
 *                 that asks for it to be folded), a group whose every cover is still an "Image to
 *                 come" panel, five rows, and the one-case story with its quote — built from the same
 *                 corpus props as the route, reshaped here.
 *   ?state=flat   the FLAT form a CMS route renders: the live entries — real covers, order and links —
 *                 with the IDEAL copy laid over them (src/content/sources/fixtures/ideal/
 *                 case-study-listing.ts). Put it beside the live page and the difference is the
 *                 content ask, not the design.
 */
export default async function CaseStudyIndexSpecimen({ searchParams }: Props) {
  const query = await searchParams;
  const state = Array.isArray(query.state) ? query.state[0] : query.state;
  if (state === 'stress') {
    const props = await caseIndexProps();
    if (!props) notFound();
    return <CaseStudyIndex {...stress(props)} />;
  }
  if (state !== 'flat') return <CaseIndexRoute />;

  const page = await getIdealCaseStudyListingPage(ROUTES.caseStudies.slice(1));
  if (!page) notFound();

  return (
    <CaseStudyIndex
      breadcrumbs={[
        { label: 'Home', href: ROUTES.home },
        { label: 'Case studies', href: ROUTES.caseStudies },
      ]}
      hero={{ name: page.hero.heading, message: page.hero.description }}
      items={page.items.map((caseStudy) => ({
        id: caseStudy.documentId,
        href: caseStudyPath(caseStudy.slug),
        title: caseStudy.title,
        description: caseStudy.description,
        client: caseStudy.client,
        categories: caseStudy.categories.map((category) => category.name),
        cover: caseStudy.thumbnail,
      }))}
    />
  );
}

const LONG_TITLES = [
  'Auxentios: one quoting product for six specialist roles, from the first interview to the screens every role signs off',
  'Novus Insights: AI drafts the questionnaire, the researcher decides what is asked, in what order and why',
];

/** The live corpus props, reshaped into the stress cases (see the component comment). */
function stress(props: CaseStudyIndexProps): CaseStudyIndexProps {
  const sections = props.sections ?? [];
  const [fresh, established, ai, built] = sections;
  const placeholders = sections
    .flatMap((section) => section.items)
    .filter((item) => item.cover?.src.includes('/placeholders/'));
  return {
    ...props,
    sections: [
      ...(fresh
        ? [
            {
              id: 'long-titles',
              heading: 'Titles that run long',
              items: fresh.items.slice(0, 2).map((item, index) => ({
                ...item,
                title: LONG_TITLES[index] ?? item.title,
              })),
            },
          ]
        : []),
      ...(ai?.items[0]
        ? [{ id: 'one-case', heading: 'One case, no quote', items: [ai.items[0]] }]
        : []),
      ...(placeholders.length >= 3
        ? [
            {
              id: 'images-to-come',
              heading: 'Every image still to come',
              items: placeholders.slice(0, 3),
            },
          ]
        : []),
      ...(established ? [established] : []),
      ...(built ? [built] : []),
    ],
  };
}
