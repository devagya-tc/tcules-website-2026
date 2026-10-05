import type { ReactNode } from 'react';

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
 *      ancestors ("Product design", "ConnectX"). The site's structure ("Home", and a top-level
 *      section index such as "Services" or "Case studies") is repeated only by an eyebrow that
 *      equals it. "Case study · Fintech" under Home / Case studies says a category the trail
 *      cannot, and an eyebrow holding the word "services" or "home" is not thereby a repeat
 *      (second fix round, 6 Oct 2026). The bare format, "Case study" or "Audits", still is.
 *
 * A leaf: strings in, strings out, plus one render callback the caller supplies. It knows nothing
 * of Breadcrumbs or PageHero — the shapes below are structural, so neither has to import the other.
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
   * root and the top-level section index, "Home" and "Services". An eyebrow repeats one of these
   * only by equalling it. Optional so a hand-built trail still type-checks; absent is 0, the
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
export function normaliseLabel(label: string): string {
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

/**
 * Whether a crumb is part of the site's structure rather than a name: an ancestor at the site root
 * or one level below it ("/" is Home, "/services" is the Services index). The page's own crumb is
 * never structural, whatever its depth, because it names the page.
 *
 * Read off the href rather than the label, so it holds for any section and needs no list of the
 * site's index names to drift.
 */
function isStructural(item: TrailItem): boolean {
  const path = item.href.replace(/^[a-z][a-z0-9+.-]*:\/\/[^/]+/i, '').split(/[?#]/)[0] ?? '';
  return path.split('/').filter(Boolean).length <= 1;
}

/**
 * How many crumbs, from the start of the page's WHOLE trail (leaf included), are structural. The
 * leaf is excluded from the count, so dropping it later cannot change the answer.
 */
function structuralCount(items: readonly TrailItem[]): number {
  const ancestors = items.slice(0, -1);
  const first = ancestors.findIndex((item) => !isStructural(item));
  return first === -1 ? ancestors.length : first;
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
    structural: structuralCount(named),
  };
}

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
 * a top-level index) it asks only for equality, so a category that happens to hold the word
 * "services" is not silently lost.
 *
 * A drop is not silent in development: it logs a warning naming the eyebrow and the crumb, as
 * PageHero's own warnings do, because the value that was dropped lives in the CMS and only its
 * author can retire it. In production the page is simply right.
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

  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      `eyebrowBesideTrail: dropped the hero eyebrow "${value}", which repeats the crumb ` +
        `"${repeated}" in the trail above it. Clear it in the CMS record, or replace it with ` +
        `a category or format the trail cannot say.`,
    );
  }
  return undefined;
}
