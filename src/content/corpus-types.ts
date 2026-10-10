import type { InlineRun } from '../lib/inline';

/**
 * View models for the `_pages/` corpus — presentation-agnostic, and typed against what a PAGE
 * consumes rather than against the markdown or its YAML.
 *
 * One `CorpusPage` per file. Inline markdown is always structured (`InlineRun[]`, from
 * `@/lib/inline`), never a raw string: a pattern renders runs, it never parses markdown.
 *
 * The body is a list of BANDS in document order — that order is the narrative, set by the content
 * team, and nothing here reorders it. `bandOrder` is the frontmatter's `render.band_order`, carried
 * verbatim so a check can prove the two agree.
 */

export type CorpusSeo = {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogImageAlt: string | null;
};

export type CorpusBreadcrumb = { name: string; url: string };

export type CorpusConversion = {
  /** `project_enquiry` and friends: which form the page carries. */
  form: string;
  /** The band id the form lives in (`enquiry`, `workspace`…). */
  anchor: string;
  visibleFields: string[];
  optionalFields: string[];
  submitLabel: string;
  hiddenContext: string[];
  onSuccess: { heading: string; body: string; retainEnteredData: boolean } | null;
  processor: string | null;
  schedulingLabel: string | null;
};

/** One image slot the frontmatter binds. `bound` is true only for an existing public asset. */
export type CorpusMediaBinding = {
  id: string;
  role: string;
  /** The band id the image supports (`supports_section`). */
  supportsSection: string;
  /** The asset URL as authored, or null when the slot has none yet. */
  assetUri: string | null;
  altIntent: string | null;
  status: string;
  /** `status === BOUND_EXISTING_PUBLIC_ASSET` with a real URL: use it. Otherwise it is a placeholder. */
  bound: boolean;
  source: string | null;
  caption: string | null;
  attribution: string | null;
};

export type CorpusComposition = {
  visualPlan: string | null;
  mediaBindings: CorpusMediaBinding[];
  /** Client names for the logo strip (`client_recognition.clients` / `logo_client_ids`). */
  logoClients: string[];
  /** Testimonial ids the page cites (`testimonial_ids`). */
  testimonialIds: string[];
  /** A case study's hero metadata (`page_composition.case_meta`), as authored. */
  caseMeta: Record<string, unknown> | null;
  /** Everything else under `page_composition`, untouched, for a stage that needs a key not modelled. */
  raw: Record<string, unknown>;
};

/** What precedes the first band: eyebrow, title, lede, the asks and the proof line. */
export type CorpusHero = {
  /** `*Case study · Benchmark Gensuite*` — the italic line above the title. */
  eyebrow: InlineRun[] | null;
  title: InlineRun[];
  titleText: string;
  /** Lede paragraphs, in order. */
  lede: InlineRun[][];
  /** Link-only lines: the hero's asks (`[Start a conversation](#enquiry)`). */
  actions: CorpusLink[];
  /** Italic-only or bold-only lines after the title: `*Selected work: …*`, a byline, `**Founded 2017 · …**`. */
  proofLines: InlineRun[][];
  /** Anything else found before the first band (none expected; kept so nothing is dropped). */
  extra: CorpusBlock[];
};

export type CorpusLink = { href: string; label: InlineRun[]; labelText: string };

export type CorpusFormField = { label: InlineRun[]; labelText: string; optional: boolean };

/**
 * Everything a body contains, as a discriminated union on `type`.
 *
 *   paragraph  prose
 *   labelled   a paragraph that opens with a bold run ending in `.` `:` or `?`: `**Our role:** …`,
 *              `**A product that needs less explaining.** …`. `label` is the bold run's content
 *              (punctuation included), `body` the rest. A labelled item is a shape of its own.
 *   list       ordered or unordered, each item a run list
 *   table      `header` then `rows`, every cell a run list. The first row is markdown's header even
 *              where the content is key/value (an "At a glance" table) — the page decides how to show it
 *   quote      `paragraphs` and `attribution`; `pendingSignoff` is true when `<!-- awaiting client
 *              sign-off -->` precedes it (render as written)
 *   item       a `###` / `####` subhead with its following blocks (`level` 3 or 4; a `####` nests
 *              inside its `###`)
 *   links      a line made only of links (and `·` separators): a CTA when one, a link row when several
 *   form       the `**Enquiry form**` spec at the foot of a page
 *   comment    an HTML comment that is not a sign-off flag (an authoring note)
 */
export type CorpusBlock =
  | { type: 'paragraph'; runs: InlineRun[] }
  | { type: 'labelled'; label: InlineRun[]; body: InlineRun[] }
  | { type: 'list'; ordered: boolean; items: InlineRun[][] }
  | { type: 'table'; header: InlineRun[][]; rows: InlineRun[][][] }
  | {
      type: 'quote';
      paragraphs: InlineRun[][];
      attribution: InlineRun[] | null;
      pendingSignoff: boolean;
    }
  | {
      type: 'item';
      level: 3 | 4;
      id: string | null;
      heading: InlineRun[];
      headingText: string;
      blocks: CorpusBlock[];
    }
  | { type: 'links'; links: CorpusLink[] }
  | {
      type: 'form';
      fields: CorpusFormField[];
      submit: InlineRun[] | null;
      after: InlineRun[] | null;
    }
  | { type: 'comment'; text: string };

export type CorpusBand = {
  /** The `{#id}` on the `##`, or a slug of the heading when none was authored. */
  id: string;
  heading: InlineRun[];
  headingText: string;
  blocks: CorpusBlock[];
};

export type CorpusPage = {
  route: string;
  slug: string;
  name: string;
  /** `page`, `service`, `audit`, `case_study`, `expertise`, `tool`, `article`, `defined_term`… */
  pageType: string;
  seo: CorpusSeo;
  breadcrumb: CorpusBreadcrumb[];
  /** The enquiry form the page carries, or null when it has none. */
  conversion: CorpusConversion | null;
  /** `render.band_order`, verbatim. Document order is `bands`; the two are checked to agree. */
  bandOrder: string[];
  composition: CorpusComposition;
  release: { contentState: string | null; siteReleaseState: string | null };
  hero: CorpusHero;
  bands: CorpusBand[];
  /** The whole frontmatter, untyped, for a stage that needs a key not modelled above. */
  frontmatter: Record<string, unknown>;
  /** The source file, relative to the repo root. */
  file: string;
};

export interface CorpusContentSource {
  /** One page by route (`/`, `/services/product-design`); null when the corpus has none. */
  getCorpusPage(route: string): Promise<CorpusPage | null>;
  /** Every page, in route order, optionally only one `pageType`. */
  listCorpusPages(type?: string): Promise<CorpusPage[]>;
}
