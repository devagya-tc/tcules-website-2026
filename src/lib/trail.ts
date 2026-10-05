import type { ReactNode } from 'react';

/**
 * The trail at the top of a page, and the one definition of "says the same thing".
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
 * stylesheet, so a repeat in another casing is still a repeat); and a trailing "s" dropped from
 * every word, so "Audit" under "Audits" is still a repeat.
 */
export function normaliseLabel(label: string): string {
  return label
    .replace(/[​-‍﻿]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .split(' ')
    .map((word) => word.replace(/s$/, ''))
    .join(' ');
}

/** Whether two labels say the same thing. The ONE definition every check here uses. */
export function sameLabel(a: string, b: string): boolean {
  const key = normaliseLabel(a);
  return key.length > 0 && key === normaliseLabel(b);
}

/** Whether `text` repeats any of `labels`. PageHero's development warning asks exactly this. */
export function repeatsTrail(text: string, labels: readonly string[]): boolean {
  return labels.some((label) => sameLabel(label, text));
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
 * parent crumb as surely as a name repeats the current one.
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
