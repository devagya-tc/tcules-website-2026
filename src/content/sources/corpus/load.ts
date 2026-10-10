import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import yaml from 'js-yaml';

import type {
  CorpusBreadcrumb,
  CorpusComposition,
  CorpusConversion,
  CorpusMediaBinding,
  CorpusPage,
} from '../../corpus-types.ts';
import { parseBody } from './parse-body.ts';

/** The corpus directory: `_pages/` at the repo root, one markdown file per page. */
export const CORPUS_DIR = join(process.cwd(), '_pages');

type Dict = Record<string, unknown>;

const dict = (v: unknown): Dict =>
  v && typeof v === 'object' && !Array.isArray(v) ? (v as Dict) : {};
const str = (v: unknown): string | null => (typeof v === 'string' && v !== '' ? v : null);
const strs = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];

/** `a__b.md` is `/a/b`; `home.md` is `/`. Used to assert the frontmatter route agrees. */
export function routeOfFile(file: string): string {
  const stem = file.replace(/\.md$/, '');
  return stem === 'home' ? '/' : '/' + stem.split('__').join('/');
}

export function splitFrontmatter(text: string): { data: Dict; body: string } {
  const src = text.replace(/\r\n/g, '\n');
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(src);
  if (!m) throw new Error('no YAML frontmatter');
  return { data: dict(yaml.load(m[1]!)), body: src.slice(m[0].length) };
}

function mediaBinding(raw: unknown): CorpusMediaBinding {
  const b = dict(raw);
  const assetUri = str(b.asset_uri);
  const status = str(b.status) ?? '';
  return {
    id: str(b.id) ?? '',
    role: str(b.role) ?? '',
    supportsSection: str(b.supports_section) ?? '',
    assetUri,
    altIntent: str(b.alt_intent),
    status,
    bound:
      status === 'BOUND_EXISTING_PUBLIC_ASSET' && !!assetUri && /^https?:\/\//.test(assetUri),
    source: str(b.source),
    caption: str(b.caption),
    attribution: str(b.attribution),
  };
}

function composition(raw: unknown): CorpusComposition {
  const c = dict(raw);
  const recognition = dict(c.client_recognition);
  const logoClients = strs(recognition.clients).length
    ? strs(recognition.clients)
    : strs(c.logo_client_ids);
  const caseMeta = dict(c.case_meta);
  return {
    visualPlan: str(c.visual_plan),
    mediaBindings: Array.isArray(c.media_bindings) ? c.media_bindings.map(mediaBinding) : [],
    logoClients,
    testimonialIds: strs(c.testimonial_ids),
    caseMeta: Object.keys(caseMeta).length ? caseMeta : null,
    raw: c,
  };
}

function conversion(raw: unknown): CorpusConversion | null {
  const c = dict(raw);
  if (!str(c.form)) return null;
  const ok = dict(c.on_success);
  const hidden = c.hidden_context;
  return {
    form: str(c.form) ?? '',
    anchor: str(c.anchor) ?? '',
    visibleFields: strs(c.visible_fields),
    optionalFields: strs(c.optional_fields),
    submitLabel: str(c.submit_label) ?? '',
    hiddenContext: Array.isArray(hidden)
      ? strs(hidden)
      : (str(hidden)
          ?.split(',')
          .map((s) => s.trim())
          .filter(Boolean) ?? []),
    onSuccess: str(ok.heading)
      ? {
          heading: str(ok.heading) ?? '',
          body: str(ok.body) ?? '',
          retainEnteredData: ok.retain_entered_data === true,
        }
      : null,
    processor: str(c.processor),
    schedulingLabel: str(c.scheduling_label),
  };
}

/** Parse one corpus file's text into a page. Throws with the file name on a malformed file. */
export function parseCorpusFile(file: string, text: string): CorpusPage {
  try {
    const { data, body } = splitFrontmatter(text);
    const route = str(data.route);
    if (!route) throw new Error('frontmatter has no route');
    const seo = dict(data.seo);
    const social = dict(data.social);
    const nav = dict(data.navigation);
    const render = dict(data.render);
    const release = dict(data.release);
    const { hero, bands } = parseBody(body);
    return {
      route,
      slug: str(data.slug) ?? route.split('/').filter(Boolean).pop() ?? 'home',
      name: str(data.page_name) ?? hero.titleText,
      pageType: str(data.page_type) ?? 'page',
      seo: {
        title: str(seo.title) ?? '',
        description: str(seo.description) ?? '',
        canonical: str(seo.canonical) ?? '',
        robots: str(seo.robots) ?? '',
        ogImageAlt: str(social.og_image_alt),
      },
      breadcrumb: (Array.isArray(nav.breadcrumb) ? nav.breadcrumb : []).map(
        (b): CorpusBreadcrumb => ({
          name: str(dict(b).name) ?? '',
          url: str(dict(b).url) ?? '',
        }),
      ),
      conversion: conversion(data.conversion),
      bandOrder: strs(render.band_order),
      composition: composition(data.page_composition),
      release: {
        contentState: str(release.content_state),
        siteReleaseState: str(release.site_release_state),
      },
      hero,
      bands,
      frontmatter: data,
      file: `_pages/${file}`,
    };
  } catch (e) {
    throw new Error(`${file}: ${e instanceof Error ? e.message : String(e)}`);
  }
}

let cache: CorpusPage[] | null = null;

/**
 * Every FIRST- and SECOND-level page (`home`, `about`, `services__product-design`), parsed once per
 * process and sorted by route. Files three levels deep (`insights__articles__…`) are outside this
 * corpus pass and are skipped.
 */
export function loadCorpus(dir: string = CORPUS_DIR): CorpusPage[] {
  if (dir === CORPUS_DIR && cache) return cache;
  const pages = readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f.replace(/\.md$/, '').split('__').length <= 2)
    .map((f) => parseCorpusFile(f, readFileSync(join(dir, f), 'utf8')))
    .sort((a, b) => a.route.localeCompare(b.route));
  if (dir === CORPUS_DIR) cache = pages;
  return pages;
}
