import type { CorpusContentSource, CorpusPage } from '../../corpus-types.ts';
import { loadCorpus } from './load.ts';

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
};

export { loadCorpus, parseCorpusFile, routeOfFile } from './load.ts';
