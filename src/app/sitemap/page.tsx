import type { Metadata } from 'next';
import Link from 'next/link';

import { Layout, Section } from '@/components';
import { ROUTES } from '@/lib/routes';
import { heroTrail } from '@/lib/trail';
import { Breadcrumbs, PageHero, TableOfContents, type TocItem } from '@/patterns';

import { listSitemapGroups, type SitemapEntry } from '../_sitemap/pages';

/**
 * `/sitemap`: every page the site answers, grouped by family — the readable twin of `/sitemap.xml`,
 * read from the same list (`_sitemap/pages.ts`) and revalidated on the same five minutes, so a page
 * published in Strapi shows here without a deploy.
 *
 * The shell is the legal pages' (privacy-policy): an outline rail beside the document. A sitemap is
 * read by jumping to a family, which is what the rail is for.
 */
export const revalidate = 300;

const TITLE = 'Sitemap';
const DESCRIPTION = 'Every page on the Tcules website, grouped by section.';

const anchorId = (key: string) => `sitemap-${key}`;

/**
 * A group's pages, with any page that has sub-pages pulled out as a branch of its own: a service and
 * its six offers read as one block, rather than scattered across a two-track grid whose rows run
 * left to right. A family's index (`/services`) is never a branch: depth one is the family itself.
 */
function branches(entries: SitemapEntry[]) {
  const parentOf = (path: string) => path.slice(0, path.lastIndexOf('/'));
  const isBranch = (entry: SitemapEntry) =>
    entry.path.split('/').length > 2 && entries.some((e) => parentOf(e.path) === entry.path);
  const heads = entries.filter(isBranch);
  const headPaths = new Set(heads.map((head) => head.path));
  return {
    leaves: entries.filter((e) => !headPaths.has(e.path) && !headPaths.has(parentOf(e.path))),
    branches: heads.map((head) => ({
      head,
      children: entries.filter((e) => parentOf(e.path) === head.path),
    })),
  };
}

function LinkList({ entries }: { entries: SitemapEntry[] }) {
  return (
    <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="column" rowGap="text">
      {entries.map((entry) => (
        <li key={entry.path}>
          <Link href={entry.path}>{entry.title}</Link>
        </li>
      ))}
    </Layout>
  );
}

function SitemapGroupBody({ entries }: { entries: SitemapEntry[] }) {
  const tree = branches(entries);
  if (tree.branches.length === 0) return <LinkList entries={entries} />;
  return (
    <Layout rowGap="stack">
      {tree.leaves.length > 0 ? <LinkList entries={tree.leaves} /> : null}
      {tree.branches.map(({ head, children }) => (
        <Layout key={head.path} rowGap="text">
          <h3>
            <Link href={head.path}>{head.title}</Link>
          </h3>
          <LinkList entries={children} />
        </Layout>
      ))}
    </Layout>
  );
}

export const metadata: Metadata = {
  title: `${TITLE} | Tcules`,
  description: DESCRIPTION,
};

export default async function SitemapPage() {
  const groups = await listSitemapGroups();

  const outline: TocItem[] = groups.map((group) => ({
    label: group.label,
    href: `#${anchorId(group.key)}` as const,
  }));

  return (
    <>
      <PageHero
        trail={heroTrail(
          [
            { label: 'Home', href: ROUTES.home },
            { label: TITLE, href: ROUTES.sitemap },
          ],
          TITLE,
          (t) => (
            <Breadcrumbs {...t} />
          ),
        )}
        title={TITLE}
        body={[DESCRIPTION]}
        surface="paper"
      />

      <Section as="div" surface="paper">
        <Layout columns={{ base: 1, lg: [1, 4] }} colGap="column" rowGap="stack" align="start">
          <TableOfContents items={outline} />
          <Layout as="article" rowGap="section">
            {groups.map((group) => (
              <section key={group.key} aria-labelledby={anchorId(group.key)}>
                <Layout rowGap="block">
                  <h2 id={anchorId(group.key)}>{group.label}</h2>
                  <SitemapGroupBody entries={group.entries} />
                </Layout>
              </section>
            ))}
          </Layout>
        </Layout>
      </Section>
    </>
  );
}
