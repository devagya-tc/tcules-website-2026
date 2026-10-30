import type { CorpusContentSource, CorpusPage } from '../../corpus-types.ts';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { CORPUS_DIR, loadCorpus, parseCorpusFile } from './load.ts';

const normalise = (route: string) => (route.length > 1 ? route.replace(/\/+$/, '') : route);

/** The `_pages/` corpus, read from disk at build time. */
export const corpusSource: CorpusContentSource = {
  async getCorpusPage(route: string): Promise<CorpusPage | null> {
    const wanted = normalise(route);
    return loadCorpus().find((p) => p.route === wanted) ?? null;
  },
  async listCorpusPages(type?: string): Promise<CorpusPage[]> {
    const pages = loadCorpus();
    return type ? pages.filter((p) => p.pageType === type) : pages;
  },
  async getCorpusRecord(route: string): Promise<CorpusPage | null> {
    const wanted = normalise(route);
    const page = loadCorpus().find((p) => p.route === wanted);
    if (page) return page;
    /* A nested piece (`insights__podcasts__…`) is not in the loaded set: read its file by name. */
    const file = `${wanted.replace(/^\//, '').split('/').join('__')}.md`;
    const path = join(CORPUS_DIR, file);
    if (wanted === '/' || !existsSync(path)) return null;
    try {
      const record = parseCorpusFile(file, readFileSync(path, 'utf8'));
      return record.route === wanted ? record : null;
    } catch {
      return null;
    }
  },
};

export { loadCorpus, parseCorpusFile, routeOfFile } from './load.ts';
