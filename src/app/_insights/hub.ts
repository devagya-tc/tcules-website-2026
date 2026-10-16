import type { IconName } from '@/components';
import type { InsightCollection, InsightsPage } from '@/content';
import type { CorpusBlock, CorpusPage } from '@/lib/corpus-types';
import { withoutCountClaims } from '@/lib/count-claims';
import { glyphForRoute } from '@/lib/glyphs';
import { inlineToText, type InlineRun } from '@/lib/inline';
import { placeholderImage } from '@/lib/placeholders';
import { ROUTES } from '@/lib/routes';
import type { InsightsIndexProps } from '@/templates';

import {
  formatLead,
  formatTitle,
  kindsIn,
  standInsFor,
  toItem,
  type FormatHref,
} from './shared';

/**
 * The insights hub's composition: the view model mapped onto InsightsIndex. Shared by the live
 * `/insights` and its specimen (`/design/insights-index`), so the two cannot drift; each passes where
 * each group's "All …" goes — the live format pages, or the specimen's states.
 *
 * The hub holds no archive since the listings redesign (15 Oct 2026): every format's whole,
 * filterable archive is on that format's own page (`format.tsx`). It holds no format row either
 * (critique 16 Oct 2026): the outline beside the groups is the hub's one category navigation, with
 * each format's count beside its entry, and each group's "All 42 …" goes to the format's page.
 *
 * `corpus` is the hub's `_pages/insights.md` where the live route has it. Like the format pages, the
 * hero then reads the corpus (the narrative is fixed) and the CMS only where the corpus is silent,
 * and the "Start with your problem" collections come from the corpus's problem bands when the CMS
 * carries none — the hub's one entry point that is not a format.
 */
export function insightsIndexProps(
  page: InsightsPage,
  hrefOf: FormatHref,
  corpus: CorpusPage | null = null,
): InsightsIndexProps {
  const resources = page.resources.items;
  const kinds = kindsIn(page);
  const standIns = standInsFor(page);
  const corpusLede = corpus?.hero.lede.map(inlineToText).find((paragraph) => paragraph.trim());
  const lede = corpusLede ?? page.hero.description;
  const collections = page.collections?.length ? page.collections : collectionsOf(corpus);

  return {
    breadcrumbs: [
      { label: 'Home', href: ROUTES.home },
      { label: 'Insights', href: ROUTES.insights },
    ],
    hero: {
      title: corpus?.hero.titleText || page.hero.heading,
      lede: lede ? withoutCountClaims(lede) : undefined,
    },
    items: resources.map((item) => toItem(item, standIns)),
    featuredId: resources.find((item) => item.featured)?.documentId,
    formats: kinds.map((kind) => ({
      kind,
      title: formatTitle(page, kind),
      lead: formatLead(page, kind),
      href: hrefOf(kind),
    })),
    collections: collections.map((collection) => ({
      id: collection.id,
      title: collection.title,
      description: collection.description,
      icon: collection.related
        ? (glyphForRoute(collection.related.href) as IconName | undefined)
        : undefined,
      items: collection.items,
      related: collection.related
        ? { label: collection.related.label, href: collection.related.href }
        : undefined,
    })),
    lab: page.lab?.action
      ? {
          heading: page.lab.heading,
          body: page.lab.description,
          action: { label: page.lab.action.label, href: page.lab.action.href },
          /* The Lab illustration, commissioned later: its register placeholder holds the slot. */
          visual: placeholderImage(ROUTES.insights, 'lab'),
        }
      : undefined,
    closing: closingOf(page),
  };
}

type Link = Extract<InlineRun, { type: 'link' }>;
type Paragraph = Extract<CorpusBlock, { type: 'paragraph' }>;

/** The first link anywhere in runs. */
function firstLink(runs: readonly InlineRun[]): Link | undefined {
  for (const run of runs) {
    if (run.type === 'link') return run;
    if ('children' in run) {
      const found = firstLink(run.children);
      if (found) return found;
    }
  }
  return undefined;
}

/** "Our related service: [AI Product UX](/services/ai-product-ux)." — the band's way to the offer. */
const RELATED = /^our related\b/i;

/** A reading-list entry: "**[Title](href).** Its line." — bold-led, as a paragraph or a labelled block. */
function entryOf(block: CorpusBlock): { id: string; title: string; href: string } | undefined {
  const runs =
    block.type === 'labelled'
      ? block.label
      : block.type === 'paragraph' && block.runs[0]?.type === 'strong'
        ? block.runs[0].children
        : undefined;
  const link = runs ? firstLink(runs) : undefined;
  if (!runs || !link) return undefined;
  return {
    id: link.href,
    title: inlineToText(runs).trim().replace(/[.:]$/, ''),
    href: link.href,
  };
}

/**
 * The hub's problem bands as reading lists: every band of `_pages/insights.md` that carries "Our
 * related service: [X](…)" — its heading, its one sentence, its bold-led pieces and that service.
 * The format and talk bands carry no related line, so they are not collections. Read as authored:
 * nothing is picked by keyword.
 */
function collectionsOf(corpus: CorpusPage | null): InsightCollection[] {
  if (!corpus) return [];
  return corpus.bands.flatMap((band) => {
    const paragraphs = band.blocks.filter(
      (block): block is Paragraph => block.type === 'paragraph',
    );
    const relatedLine = paragraphs.find((block) =>
      RELATED.test(inlineToText(block.runs).trim()),
    );
    const relatedLink = relatedLine ? firstLink(relatedLine.runs) : undefined;
    if (!relatedLink) return [];
    const description = paragraphs.find(
      (block) => block !== relatedLine && block.runs[0]?.type !== 'strong',
    );
    const items = band.blocks.flatMap((block) => {
      const entry = entryOf(block);
      return entry ? [entry] : [];
    });
    return [
      {
        id: band.id,
        title: band.headingText,
        description: description ? inlineToText(description.runs).trim() : '',
        items,
        related: {
          label: inlineToText(relatedLink.children),
          href: relatedLink.href,
          external: false,
        },
      },
    ];
  });
}

/** The hub's close, shared by the format pages: rendered by the template only with its action. */
export function closingOf(page: InsightsPage): InsightsIndexProps['closing'] {
  return page.closing?.action
    ? {
        heading: page.closing.heading,
        body: page.closing.description,
        action: { label: page.closing.action.label, href: page.closing.action.href },
      }
    : undefined;
}
