import type { ReactNode } from 'react';

import { ROUTES, SECTION_INDEXES } from '@/lib/routes';

/**
 * The trail at the top of a page, and the one place that defines "says the same thing".
 *
 * Since 5 Oct 2026 (kit `fdn-top`) the trail sits inside the hero, 32px above the title (or the
 * eyebrow). Two things follow from standing that close, and both live here so that every route,
 * both templates and PageHero's own development warning answer them the same way:
 *
 *   1. The trail's last crumb names the page only when the h1 does not. A crumb that repeats the
 *      headline 32px above it makes the headline read twice, and a headline-length crumb wraps on a
 *      phone (tracker 2.17). So `heroTrail` drops the leaf when it repeats the title, and the trail
 *      then ENDS AT THE PARENT, as a link: the h1 directly below is the current page.
 *   2. The hero eyebrow never repeats a crumb (owner, 5 Oct 2026). `eyebrowBesideTrail` drops it.
 *      "Repeats" means the eyebrow SAYS the crumb's words, not only that it equals them: "Product
 *      Design specialist" 32px under a trail ending "Product design" reads the crumb twice as surely
 *      as "Product design" would (fix round, 6 Oct 2026). So the eyebrow question is `containsLabel`,
 *      a whole-word phrase match, while the title question stays `sameLabel`: an h1 is a sentence
 *      and routinely uses a crumb's words without repeating the crumb.
 *
 *      The phrase match is asked only of crumbs that NAME something: the page and its named
 *      ancestors ("Product design", "ConnectX", "Future Interfaces Lab"). The site's structure
 *      ("Home", and a section index named in `SECTION_INDEXES`, such as "Services" or "Case
 *      studies") is repeated only by an eyebrow that equals it. "Case study · Fintech" under
 *      Home / Case studies says a category the trail cannot, and an eyebrow holding the word
 *      "services" or "home" is not thereby a repeat (second fix round, 6 Oct 2026). The bare
 *      format, "Case study" or "Audits", still is.
 *   3. A page's own crumb is its NAME, in the trail's case. `pageName` chooses it — from the
 *      record's eyebrow where that spells the same name better than the slug does, from the slug
 *      otherwise — and `slugLabel` cases a slug segment. They live
 *      here because "is this eyebrow the page's name?" is the same "says the same thing" question
 *      as the two above, asked with the same normalisation (third fix round, 6 Oct 2026; it was
 *      route code until then).
 *
 * A leaf: strings in, strings out, plus one render callback the caller supplies. It knows nothing
 * of Breadcrumbs or PageHero — the shapes below are structural, so neither has to import the other.
 * It reads `@/lib/routes`, a sibling leaf, for the one list of section indexes.
 */

/** One level of the trail. Structurally the same as Breadcrumbs' `BreadcrumbItem`. */
export type TrailItem = { label: string; href: string };

/**
 * Where the trail ends.
 *
 *   page    the last item is this page, named by something shorter than its h1 — a nav label, a
 *           service's `story.name`. Rendered as text with `aria-current="page"`.
 *   parent  the last item is this page's PARENT, rendered as a link. Used when the page's only
 *           name is its h1 (an article, an audit, a glossary term, a legal page), which says it
 *           directly below.
 */
export type TrailEnd = 'page' | 'parent';

/** A trail ready to hand to Breadcrumbs: `<Breadcrumbs {...trail} />`. */
export type Trail = { items: readonly TrailItem[]; endsWith: TrailEnd };

/**
 * What PageHero's `trail` slot takes. `crumbs` is the rendered Breadcrumbs; `labels` are the
 * rendered crumbs' labels, which PageHero cannot read out of a ReactNode and needs for one thing:
 * its development warning when the eyebrow or the title repeats one of them. Build it with
 * `heroTrail`, which derives both from one array, so the two cannot drift.
 */
export type HeroTrail = {
  crumbs: ReactNode;
  labels: readonly string[];
  /**
   * How many of `labels`, counted from the start, are the site's structure rather than names: the
   * root and a section index from `SECTION_INDEXES`, "Home" and "Services". An eyebrow repeats one
   * of these only by equalling it. Optional so a hand-built trail still type-checks; absent is 0, the
   * strictest reading. `heroTrail` always sets it.
   */
  structural?: number;
};

/**
 * A label reduced to its words, for comparison only, never for display.
 *
 * Zero-width characters dropped (the Matter record carries a U+200D); punctuation and runs of
 * space folded to one space (a CMS heading arrives as "Future , Interfaces Lab", and "Matter |
 * Design System" is the nav's "Matter Design System"); case folded (eyebrows are uppercased by the
 * stylesheet, so a repeat in another casing is still a repeat); and every word reduced to its
 * singular the cheap way, "-ies" to "-y" and then a trailing "s" dropped, so "Audit" under "Audits"
 * and "Case study" under "Case studies" are still repeats. Both sides go through the same
 * reduction, so a word it mangles ("services" to "service" is right, "series" to "sery" is not)
 * still compares equal to itself.
 */
function normaliseLabel(label: string): string {
  return label
    .replace(/[​-‍﻿]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .split(' ')
    .map((word) => word.replace(/ies$/, 'y').replace(/s$/, ''))
    .join(' ');
}

/** Whether two labels say the same thing. The question asked of a crumb and the h1. */
export function sameLabel(a: string, b: string): boolean {
  const key = normaliseLabel(a);
  return key.length > 0 && key === normaliseLabel(b);
}

/**
 * Whether `text` says `label`: the label's words appear in it, in order, as whole words. The
 * question asked of an eyebrow and a crumb that names something (`repeatsTrail` asks only
 * equality of the site's structural crumbs).
 *
 * Whole words on the normalised form, so "Product Design specialist" says "Product design" and
 * "Design-System Strategy" says "Design systems", while "Designer" does not say "Design".
 * Equality is the special case, so everything `sameLabel` catches this catches too.
 */
export function containsLabel(text: string, label: string): boolean {
  const key = normaliseLabel(label);
  return key.length > 0 && ` ${normaliseLabel(text)} `.includes(` ${key} `);
}

/** A path without its origin, query or fragment, and without a trailing slash. */
function pathOf(href: string): string {
  const path = href.replace(/^[a-z][a-z0-9+.-]*:\/\/[^/]+/i, '').split(/[?#]/)[0] ?? '';
  return path.length > 1 ? path.replace(/\/+$/, '') : path || '/';
}

/**
 * Whether a crumb is part of the site's structure rather than a name: the root, or one of the
 * section indexes `@/lib/routes` names in `SECTION_INDEXES` ("Services", "Case studies").
 *
 * Read from a named list rather than inferred from the href's depth: depth called every top-level
 * page structure, so "Future Interfaces Lab" and "How we work", which NAME something, were asked
 * only equality, and "Future Interfaces Lab · Applications" under Home / Future Interfaces Lab /
 * Join would have stood (third fix round, 6 Oct 2026). And it asks nothing about position, so a
 * trail passed with or without its leaf gets the same answer for every crumb in it. A section
 * index's own page ("/services") is the one place its crumb is the leaf, and there it is structure
 * too: an eyebrow there repeats it only by equalling it.
 */
function isStructural(item: TrailItem): boolean {
  const path = pathOf(item.href);
  return path === ROUTES.home || SECTION_INDEXES.includes(path);
}

/**
 * How many crumbs, from the start, are structural. Structure only ever leads a trail (Home, then
 * a section index), so this is the length of the leading run; it does not depend on whether the
 * page's own crumb was passed.
 */
function structuralCount(items: readonly TrailItem[]): number {
  const first = items.findIndex((item) => !isStructural(item));
  return first === -1 ? items.length : first;
}

/**
 * The first of `labels` that an eyebrow `text` repeats, or `undefined`. The first `structural`
 * labels are the site's structure and are repeated only by equality (`sameLabel`); every other
 * label is repeated by being said (`containsLabel`).
 */
function repeatedCrumb(
  text: string,
  labels: readonly string[],
  structural: number,
): string | undefined {
  return labels.find((label, index) =>
    index < structural ? sameLabel(text, label) : containsLabel(text, label),
  );
}

/**
 * Whether an eyebrow `text` repeats any of `labels`. `eyebrowBesideTrail` and PageHero's
 * development warning both ask exactly this, so the warning cannot disagree with the fix. Pass
 * `structural` from the `HeroTrail` (`heroTrail` computes it); without it every label is treated
 * as a name, which over-reports and never under-reports.
 */
export function repeatsTrail(text: string, labels: readonly string[], structural = 0): boolean {
  return repeatedCrumb(text, labels, structural) !== undefined;
}

/**
 * The trail for a page opened by PageHero, or `undefined` when there is nothing worth saying.
 *
 * `items` is the page's whole trail, ancestors then the page itself, as every route already builds
 * it. When the last item repeats `title` it is dropped and the trail ends at the parent. When what
 * is left is a lone "Home" the hero gets no trail at all: a trail of one is a statement about
 * nothing (Breadcrumbs.md § 12), and on a top-level page whose h1 is its name the nav already says
 * where you are.
 *
 * `render` turns the trail into the node PageHero places, `(t) => <Breadcrumbs {...t} />`, so the
 * labels PageHero checks and the labels Breadcrumbs renders are the same array.
 */
export function heroTrail(
  items: readonly TrailItem[],
  title: string,
  render: (trail: Trail) => ReactNode,
): HeroTrail | undefined {
  const named = items.filter((item) => item.label.trim().length > 0);
  const leaf = named.at(-1);
  const trail: Trail =
    leaf !== undefined && sameLabel(leaf.label, title)
      ? { items: named.slice(0, -1), endsWith: 'parent' }
      : { items: named, endsWith: 'page' };

  if (trail.items.length < 2) return undefined;
  return {
    crumbs: render(trail),
    labels: trail.items.map((item) => item.label),
    structural: structuralCount(trail.items),
  };
}

/**
 * Drops already reported, so a CMS value that repeats a crumb on every render, or on every page
 * of a family ("Glossary" on each glossary term), is reported once per server process rather than
 * once per request. A warning that stands in the console on every page teaches people to ignore it.
 */
const reportedDrops = new Set<string>();

/**
 * The hero eyebrow, or nothing when the trail already says the same thing.
 *
 * On a hand-authored route the fix is to delete the eyebrow; on a route whose eyebrow comes from
 * the CMS ("Glossary" under Home / Glossary / Term) the route passes it through here, and the CMS
 * value can keep existing until the model is changed. Pass the page's WHOLE trail, leaf included:
 * an eyebrow that repeats a leaf `heroTrail` dropped repeats the h1, which is no better.
 *
 * It compares against EVERY crumb, not only the last: a format eyebrow ("Audits") repeats the
 * parent crumb as surely as a name repeats the current one. Against a crumb that names something
 * it asks whether the eyebrow SAYS it (`containsLabel`): "Product Design services" under Home /
 * Services / Product design is the page's name read twice. Against the site's structure ("Home",
 * a section index) it asks only for equality, so a category that happens to hold the word
 * "services" is not silently lost.
 *
 * A drop is not silent in development: it logs a warning naming the eyebrow and the crumb, once
 * per distinct pair, because the value that was dropped lives in the CMS and only its author can
 * retire it. An eyebrow that BECAME the page's crumb is not a drop and must not come through here:
 * pass `pageName(…).eyebrow`, which is `undefined` when the eyebrow was used as the name. In
 * production the page is simply right.
 */
export function eyebrowBesideTrail(
  eyebrow: string | null | undefined,
  crumbs: readonly TrailItem[],
): string | undefined {
  const value = eyebrow?.trim();
  if (!value) return undefined;
  const named = crumbs.filter((crumb) => crumb.label.trim().length > 0);
  const repeated = repeatedCrumb(
    value,
    named.map((crumb) => crumb.label),
    structuralCount(named),
  );
  if (repeated === undefined) return value;

  const key = `${value}\u0000${repeated}`;
  if (process.env.NODE_ENV !== 'production' && !reportedDrops.has(key)) {
    reportedDrops.add(key);
    console.warn(
      `eyebrowBesideTrail: dropped the hero eyebrow "${value}", which says the crumb ` +
        `"${repeated}" in the trail above it. The trail already names that, so the eyebrow ` +
        `can go from the CMS record, or become a category or format the trail cannot say.`,
    );
  }
  return undefined;
}

/* ── The page's own crumb ──────────────────────────────────────────────────────────────────── */

/**
 * Words whose spelling is not sentence case, keyed by their lower-case form. Acronyms and the
 * proper nouns the site's slugs and eyebrows carry. A slug has lost the spelling, and an authored
 * Title Case eyebrow ("Figma and Storybook Alignment") cannot tell a proper noun from a word that
 * is capitalised only because it is in a title, so the trail asks this list. A word missing here
 * still renders, in lower case; add it here, once.
 */
const SPELLINGS: Readonly<Record<string, string>> = {
  ai: 'AI',
  api: 'API',
  b2b: 'B2B',
  figma: 'Figma',
  qa: 'QA',
  react: 'React',
  saas: 'SaaS',
  storybook: 'Storybook',
  ui: 'UI',
  ux: 'UX',
};

/** Leading punctuation, the word, trailing punctuation: "(UX," is "(", "UX", ",". */
const WORD_PARTS = /^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}]*)$/u;

/**
 * One word part in the trail's case. A known spelling wins, matched without its punctuation, so
 * "UX," and "ux" are both "UX". Otherwise a part the author wrote with a capital after its first
 * letter ("ConnectX", "QA", "R&D") is kept as written, unless the whole label is shouting, where
 * every part is all capitals and the casing says nothing. Everything else is lower case, with a
 * capital on the label's first letter.
 */
function trailPart(part: string, first: boolean, shouting: boolean): string {
  const [, lead = '', core = '', tail = ''] = WORD_PARTS.exec(part) ?? [];
  const known = SPELLINGS[core.toLowerCase()];
  if (known) return `${lead}${known}${tail}`;
  if (!shouting && /\p{Lu}/u.test(core.slice(1))) return part;
  const lower = core.toLowerCase();
  const cased = first ? `${lower.charAt(0).toUpperCase()}${lower.slice(1)}` : lower;
  return `${lead}${cased}${tail}`;
}

/**
 * A label in the trail's case: sentence case, so a crumb built from a slug and one taken from an
 * authored Title Case eyebrow read as one trail ("AI product UX", "Human-in-the-loop workflows",
 * "Figma and Storybook alignment"). Hyphenated words are cased part by part; the label's own
 * punctuation ("Trust, control and recovery") is kept.
 */
function trailCase(label: string): string {
  const shouting = !/\p{Ll}/u.test(label);
  return label
    .trim()
    .split(/\s+/)
    .map((word, index) =>
      word
        .split('-')
        .map((part, partIndex) => trailPart(part, index === 0 && partIndex === 0, shouting))
        .join('-'),
    )
    .join(' ');
}

/** A slug segment as a crumb: "ai-product-ux" is "AI product UX". */
export function slugLabel(segment: string): string {
  return trailCase(segment.split('-').filter(Boolean).join(' '));
}

/** Words a slug drops without changing the name: "trust-control-recovery" is "Trust, Control and Recovery". */
const CONNECTIVES = new Set(['a', 'an', 'and', 'for', 'in', 'of', 'on', 'the', 'to', 'with']);

/** A name reduced to the words that carry it, for comparing a slug with an authored label. */
function nameWords(label: string): string[] {
  return normaliseLabel(label)
    .split(' ')
    .filter((word) => word.length > 0 && !CONNECTIVES.has(word));
}

/**
 * Whether `text` is `name`, the page's name, spelled out: the same carrying words in the same
 * order, the connectives and punctuation a slug drops ignored. With `parent`, the parent crumb's
 * words are ignored too when the plain comparison fails, because an authored name often restates
 * its parent where the slug does not: "Design-System Governance and Adoption" is
 * "governance-adoption" under "Design systems".
 */
function spellsName(text: string, name: string, parent: string | undefined): boolean {
  const said = nameWords(text);
  const meant = nameWords(name);
  if (meant.length > 0 && said.join(' ') === meant.join(' ')) return true;
  if (parent === undefined) return false;
  const inherited = new Set(nameWords(parent));
  const strip = (words: string[]) => words.filter((word) => !inherited.has(word)).join(' ');
  const rest = strip(meant);
  return rest.length > 0 && strip(said) === rest;
}

/** A page's own crumb, and what is left of its eyebrow for the hero. */
export type PageName = {
  /** The page's crumb label, in the trail's case. */
  label: string;
  /**
   * The eyebrow to pass on to `eyebrowBesideTrail`: the authored value, or `undefined` when it
   * was used as the crumb. An eyebrow that became the page's name is not a repeat to report, it
   * is where the name came from.
   */
  eyebrow: string | undefined;
};

/**
 * The page's own crumb: its NAME, never its headline.
 *
 * `name` is the route's fallback, usually `slugLabel` of the last slug segment, which has lost the
 * words and the spelling a slug drops ("Trust control recovery"). The record's eyebrow is asked
 * first, because it is often the same name spelled properly: when it spells the name
 * (`spellsName`, with `parent`'s words allowed), "Trust, Control and Recovery" gives "Trust,
 * control and recovery", in the trail's case. The eyebrow is then CONSUMED, returned as
 * `undefined`, so `eyebrowBesideTrail` neither shows it under a trail that already says it nor
 * warns about a repeat the route made itself. Otherwise `name` stands and the eyebrow is passed on.
 *
 * Never the title's opening, though "Information architecture and workflow design for B2B
 * software" opens with a better spelling of its slug: a crumb taken from the h1 is the headline's
 * first five words read 32px above the headline (tried and dropped, third fix round, 6 Oct 2026).
 *
 * Pass `parent` only when the parent crumb NAMES something ("Design systems"), never a section
 * index: "Product Design services" minus "Services" would spell "Product design" and become the
 * crumb. A record's own short-name field replaces all of this when the CMS has one
 * (`docs/strapi-changes.md` § 16).
 */
export function pageName({
  name,
  eyebrow,
  parent,
}: {
  name: string;
  eyebrow?: string | null;
  parent?: string;
}): PageName {
  const authored = eyebrow?.trim() || undefined;
  if (authored && spellsName(authored, name, parent)) {
    return { label: trailCase(authored), eyebrow: undefined };
  }
  return { label: name, eyebrow: authored };
}
