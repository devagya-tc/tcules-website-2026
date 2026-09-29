import { Layout, Section } from '@/components';
import {
  BlockCardSet,
  Breadcrumbs,
  CtaSection,
  PageHero,
  type BlockCardImage,
  type BreadcrumbItem,
  type HeroAction,
} from '@/patterns';

/**
 * One case study as the index shows it. The template's own shape, not the view model's: a template
 * may not import @/content, so the page maps its record onto this and the template never learns
 * where the record came from — the CMS, or the ideal-content fixture the specimen reads.
 */
export type CaseStudyIndexItem = {
  id: string;
  href: string;
  title: string;
  /** The one line under the title: 8–15 words (strapi-changes.md §13). */
  description: string;
  /** Who the work was for. Leads the eyebrow when present. */
  client?: string;
  /** The engagement's categories. The eyebrow's fallback while `client` is missing. */
  categories?: readonly string[];
  cover?: BlockCardImage;
};

export type CaseStudyIndexClosing = {
  eyebrow?: string;
  heading: string;
  body?: string;
  action?: HeroAction;
};

export type CaseStudyIndexProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  hero: { title: string; body: string; action?: HeroAction };
  items: readonly CaseStudyIndexItem[];
  closing?: CaseStudyIndexClosing;
};

/**
 * The eyebrow is ONE label line above the title, and the client is that label: on an agency's
 * work index the client is what a reader scans for. Categories stand in only while the client is
 * missing (it is not in Strapi yet), so a card never carries two label lines — the stacked
 * client-plus-categories card was tried on 29 Sep and read as stuffed.
 */
function eyebrow(item: CaseStudyIndexItem): string | undefined {
  if (item.client?.trim()) return item.client;
  const categories = (item.categories ?? []).filter((name) => name.trim());
  return categories.length > 0 ? categories.join(' · ') : undefined;
}

/**
 * CaseStudyIndex — the case-study index page type: breadcrumbs, the opening, the set of case-study
 * cards (featured first, from BlockCardSet), and an optional close.
 *
 * It exists so that the live route and its specimen render one composition. The route passes what
 * the CMS holds; `/design/case-study-index` passes the same entries with their ideal copy
 * (src/content ideal fixture), which is how the page is judged at the content it was designed
 * for rather than at whatever the CMS holds today.
 */
export function CaseStudyIndex({ breadcrumbs, hero, items, closing }: CaseStudyIndexProps) {
  return (
    <>
      <Breadcrumbs surface="paper" items={breadcrumbs} />

      <PageHero
        title={hero.title}
        body={[hero.body]}
        actions={hero.action ? [hero.action] : undefined}
        surface="paper"
      />

      {items.length > 0 ? (
        <Section as="div" surface="paper">
          <BlockCardSet
            items={items.map((item) => ({
              id: item.id,
              title: item.title,
              body: item.description,
              eyebrow: eyebrow(item),
              media: item.cover ? { type: 'image', image: item.cover } : undefined,
              href: item.href,
            }))}
          />
        </Section>
      ) : null}

      {closing ? (
        closing.action ? (
          <CtaSection
            arrangement="open"
            surface="tint"
            eyebrow={closing.eyebrow || undefined}
            heading={closing.heading}
            body={[closing.body ?? '']}
            actions={[closing.action]}
          />
        ) : (
          <Section surface="tint" aria-labelledby="case-studies-closing-heading">
            <Layout rowGap="block">
              {closing.eyebrow ? <p>{closing.eyebrow}</p> : null}
              <h2 id="case-studies-closing-heading">{closing.heading}</h2>
              {closing.body ? <p>{closing.body}</p> : null}
            </Layout>
          </Section>
        )
      ) : null}
    </>
  );
}
