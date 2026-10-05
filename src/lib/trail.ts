/**
 * The hero eyebrow, or nothing when the trail above it already says the same thing.
 *
 * Since 5 Oct 2026 (kit `fdn-top`) the trail sits inside the hero, 32px above the eyebrow, so an
 * eyebrow that repeats a crumb spends a line saying nothing new (owner: the hero eyebrow never
 * repeats the crumb). On a hand-authored route the fix is to delete the eyebrow; on a route whose
 * eyebrow comes from the CMS — "Glossary" under Home / Glossary / Term, "How We Work" under
 * Home / How We Work — the route passes its eyebrow through here, and the CMS value can keep
 * existing until the model is changed.
 *
 * It compares against EVERY crumb, not only the last: a format eyebrow ("Audits") repeats the
 * parent crumb as surely as a name repeats the current one. Trimmed, case-folded, zero-width
 * characters dropped (the Matter record carries a U+200D) and a trailing "s" ignored, so "Audit"
 * under "Audits" is still a repeat. PageHero's own development warning is narrower — it can see
 * only `trail.current` — which is why routes call this rather than relying on the warning.
 *
 * A leaf: strings in, a string out. It knows nothing of Breadcrumbs or PageHero.
 */
export function eyebrowBesideTrail(
  eyebrow: string | null | undefined,
  crumbs: readonly { label: string }[],
): string | undefined {
  const value = eyebrow?.trim();
  if (!value) return undefined;
  const key = normalise(value);
  return crumbs.some((crumb) => normalise(crumb.label) === key) ? undefined : value;
}

function normalise(label: string): string {
  return label
    .replace(/[​-‍﻿]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/s$/, '');
}
