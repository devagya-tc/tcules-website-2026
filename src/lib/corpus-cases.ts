import type { CorpusBlock, CorpusPage } from './corpus-types';
import type { InlineRun } from './inline';

const CASE_PATH = /^\/case-studies\/[^/#?]+/;
/** A piece of writing or a recording: `/insights/<slug>` or `/insights/<format>/<slug>`, never an
 *  author, a format index or the hub. */
const INSIGHT_PATH = /^\/insights\/(?!authors\/)(?:[^/#?]+\/)?[^/#?]+/;

/** The case route a link opens, without its fragment or query (the key `getCaseRefs` files it under). */
export function caseRouteOf(href: string): string {
  return CASE_PATH.exec(href)?.[0] ?? href;
}

function linksIn(runs: readonly InlineRun[], out: Set<string>, path = CASE_PATH) {
  for (const run of runs) {
    if (run.type === 'link') {
      const match = path.exec(run.href);
      if (match) out.add(match[0]);
    }
    if ('children' in run) linksIn(run.children, out, path);
  }
}

function walk(blocks: readonly CorpusBlock[], out: Set<string>, path = CASE_PATH) {
  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph':
        linksIn(block.runs, out, path);
        break;
      case 'labelled':
        linksIn(block.label, out, path);
        linksIn(block.body, out, path);
        break;
      case 'list':
        block.items.forEach((item) => linksIn(item, out, path));
        break;
      case 'table':
        block.rows.forEach((row) => row.forEach((cell) => linksIn(cell, out, path)));
        break;
      case 'item':
        walk(block.blocks, out, path);
        break;
      case 'links':
        block.links.forEach((link) => linksIn(link.label, out, path));
        for (const link of block.links) {
          const match = path.exec(link.href);
          if (match) out.add(match[0]);
        }
        break;
      default:
        break;
    }
  }
}

/**
 * The case routes a page cites, in the order it first cites them: the cases whose own pages a
 * template needs for a cover and a name (`getCaseRefs`). A route that no corpus page answers is
 * simply absent from the refs, which is how a link to an unpublished case renders as written.
 */
export function caseRoutesIn(page: CorpusPage): string[] {
  const out = new Set<string>();
  for (const band of page.bands) walk(band.blocks, out);
  return [...out];
}

/** The insight route a link opens, without its fragment or query (the key `getInsightRefs` files it under). */
export function insightRouteOf(href: string): string {
  return INSIGHT_PATH.exec(href)?.[0] ?? href;
}

/**
 * The insight routes a page links, in the order it first links them: the pieces whose own pages a
 * template reads for a format and a length (`getInsightRefs`).
 */
export function insightRoutesIn(page: CorpusPage): string[] {
  const out = new Set<string>();
  for (const band of page.bands) walk(band.blocks, out, INSIGHT_PATH);
  return [...out];
}
