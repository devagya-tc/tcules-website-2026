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
export type HeroTrail = { crumbs: ReactNode; labels: readonly string[] };

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
 * question asked of an eyebrow and a crumb.
 *
 * Whole words on the normalised form, so "Product Design specialist" says "Product design",
 * "Design-System Strategy" says "Design systems" and "Product audit" says "Audits", while
 * "Designer" does not say "Design". Equality is the special case, so everything `sameLabel`
 * catches this catches too.
 */
export function containsLabel(text: string, label: string): boolean {
  const key = normaliseLabel(label);
  return key.length > 0 && ` ${normaliseLabel(text)} `.includes(` ${key} `);
}

/**
 * Whether an eyebrow `text` repeats any of `labels`. `eyebrowBesideTrail` and PageHero's
 * development warning both ask exactly this, so the warning cannot disagree with the fix.
 */
export function repeatsTrail(text: string, labels: readonly string[]): boolean {
  return labels.some((label) => containsLabel(text, label));
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
  return { crumbs: render(trail), labels: trail.items.map((item) => item.label) };
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
 * parent crumb as surely as a name repeats the current one. And it asks whether the eyebrow SAYS a
 * crumb (`containsLabel`), not whether it equals one: "Product Design services" under Home /
 * Services is the parent's word read twice.
 */
export function eyebrowBesideTrail(
  eyebrow: string | null | undefined,
  crumbs: readonly { label: string }[],
): string | undefined {
  const value = eyebrow?.trim();
  if (!value) return undefined;
  return repeatsTrail(
    value,
    crumbs.map((crumb) => crumb.label),
  )
    ? undefined
    : value;
}
