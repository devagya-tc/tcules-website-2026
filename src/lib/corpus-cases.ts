import type { CorpusBlock, CorpusPage } from './corpus-types';
import type { InlineRun } from './inline';

const CASE_PATH = /^\/case-studies\/[^/#?]+/;

function linksIn(runs: readonly InlineRun[], out: Set<string>) {
  for (const run of runs) {
    if (run.type === 'link') {
      const match = CASE_PATH.exec(run.href);
      if (match) out.add(match[0]);
    }
    if ('children' in run) linksIn(run.children, out);
  }
}

function walk(blocks: readonly CorpusBlock[], out: Set<string>) {
  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph':
        linksIn(block.runs, out);
        break;
      case 'labelled':
        linksIn(block.label, out);
        linksIn(block.body, out);
        break;
      case 'list':
        block.items.forEach((item) => linksIn(item, out));
        break;
      case 'table':
        block.rows.forEach((row) => row.forEach((cell) => linksIn(cell, out)));
        break;
      case 'item':
        walk(block.blocks, out);
        break;
      case 'links':
        block.links.forEach((link) => linksIn(link.label, out));
        for (const link of block.links) {
          const match = CASE_PATH.exec(link.href);
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
