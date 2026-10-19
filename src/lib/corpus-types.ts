import type { InlineRun } from './inline';

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
  /**
   * Testimonial ids the page cites, in the order its quotes appear: `page_composition.testimonial_ids`,
   * or `page_composition.commercial_system.testimonial_ids` where a page files them there (About).
   */
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
 *              sign-off -->` precedes it (render as written). `testimonialId` is the frontmatter's
 *              testimonial id for this quote (`testimonial_ids`, matched in document order by the
 *              loader when the page cites exactly one id per quote), or null when it cannot be
 *              matched. It keys per-review data such as a rating; it is never shown
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
      testimonialId: string | null;
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

/**
 * A case a page cites, as that case's OWN corpus page describes it. The content seam builds it
 * (`getCaseRefs`) so a template never reads another page: `title` is the case page's h1 (the
 * content team's words for that case), `cover` its first bound asset (the pre-existing image the
 * corpus already points at), null when the case binds none.
 */
export type CorpusCaseRef = {
  route: string;
  title: string;
  cover: CorpusMediaBinding | null;
};

/**
 * A star rating for one testimonial, keyed by testimonial id at the content seam
 * (`getTestimonialRatings`). `value` is out of 5, in half steps. `placeholder` is true for a rating
 * nobody has sourced yet (home round 2, 10 Oct 2026: the owner asked for 4–5 placeholders until the
 * real per-review ratings arrive); a page renders it the same way, and the flag exists so a check or
 * a launch list can find every one that must be replaced.
 */
export type TestimonialRating = { value: number; placeholder: boolean };

/**
 * A speaker's portrait for a testimonial's circular avatar, keyed by testimonial id at the content
 * seam (`getTestimonialAvatars`, home round 3, 11 Oct 2026). Structurally the image record a card
 * renders (src, intrinsic size, derived widths). `placeholder` is true for a stand-in portrait that
 * is NOT the speaker (the owner asked to see avatars on about half the cards to judge the look); a
 * real photograph of the person, supplied with their consent, replaces it.
 */
export type TestimonialAvatarRecord = {
  src: string;
  width: number;
  height: number;
  sources?: readonly { src: string; width: number }[];
  placeholder: boolean;
};

/**
 * Stand-in reasons for a "why us" band drawn as the Reasons pattern (`getPlaceholderReasons`, owner
 * 19 Oct 2026). The band is designed for three or six short reasons, each with a drawing of its
 * claim (docs/content-proposals.md P48); the corpus authors four longer ones with quotes, so the
 * band shows P48's length-guide set until the content team writes its own. The heading and the
 * closing link stay the corpus's. `placeholder` is always true.
 */
export type PlaceholderReasons = {
  /** The band the reasons are shown in, by its id. */
  band: string;
  items: readonly {
    title: string;
    body: string;
    /** The drawing, exported on the band's ground; decorative, so it carries no alt. */
    figure: { src: string; width: number; height: number };
  }[];
  placeholder: true;
};

/**
 * Eyebrows PROPOSED for a page's bands, keyed by band id (`getProposedEyebrows`). The corpus authors
 * no band eyebrows; these are design additions the owner asked for (home gateway, round 11,
 * 19 Oct 2026), logged in docs/content-proposals.md for the content team to keep, reword or drop.
 */
export type ProposedEyebrows = Readonly<Record<string, string>>;
