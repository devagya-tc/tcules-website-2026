import type { Metadata } from 'next';

import { Layout, Section } from '@/components';
import { isCorpusOffer } from '@/app/_corpus/offer';
import { listCorpusPages } from '@/content';
import { designCorpusPagePath } from '@/lib/routes';
import { ListCard } from '@/patterns';
import { planOffer } from '@/templates';

export const metadata: Metadata = {
  title: 'CorpusPage | Design',
  robots: { index: false, follow: false },
};

/** The file slug `generateStaticParams` and the sub-route use: `/a/b` is `a__b`, `/` is `home`. */
const fileSlug = (route: string) =>
  route === '/' ? 'home' : route.slice(1).replaceAll('/', '__');

/**
 * CorpusPage, the templates the `_pages/` corpus renders through: `HomePage` for `/`, and
 * `OfferPage` for a service, an audit or an expertise page.
 *
 * Each page below links to the SAME template the live route renders, here under /design so a band
 * can be judged without the site chrome's route gate. Under every offer page is its PLAN: the shape
 * each band was classified as, the surface it takes, the side its photograph sits on, and whether it
 * is a visual or a text-heavy band in the rhythm. The plan is `planOffer`, the same function the page
 * calls, so this list cannot drift from what renders. A band whose kind is `generic` has a shape no
 * rule names yet, and renders plainly, every word in place.
 */
export default async function CorpusPageIndex() {
  const pages = await listCorpusPages();
  const offers = pages.filter((page) => isCorpusOffer(page.route));

  return (
    <Section>
      <Layout rowGap="stack">
        <Layout rowGap="block">
          <h1>CorpusPage</h1>
          <p>
            The templates the content team&apos;s pages render through. Every band keeps its
            words and its place; the template decides only how it is shown.
          </p>
        </Layout>

        <Layout rowGap="block">
          <h2>Home</h2>
          <Layout as="ul" rowGap="none">
            <ListCard
              title="HomePage"
              body="/ — one page type, one page: a name grid, a rating, six situations, four cases one at a time, six services, four reasons, client voices, a banner, eight sectors, the questions and the form."
              titleAs="h3"
              href={designCorpusPagePath('home')}
            />
          </Layout>
        </Layout>

        <Layout rowGap="block">
          <h2>OfferPage</h2>
          <Layout as="ul" rowGap="none">
            {offers.map((page) => (
              <ListCard
                key={page.route}
                title={page.route}
                body={`${page.pageType} · ${page.bands.length} bands, planned as ${planOffer(
                  page,
                )
                  .map(
                    (unit) =>
                      `${unit.id} ${unit.kind}${unit.part === 'whole' ? '' : `/${unit.part}`}`,
                  )
                  .join(' · ')}`}
                titleAs="h3"
                href={designCorpusPagePath(fileSlug(page.route))}
              />
            ))}
          </Layout>
        </Layout>
      </Layout>
    </Section>
  );
}
