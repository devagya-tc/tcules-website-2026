import type { SectionSurface } from '@/components';

import type { BrandMarkName } from '@/components';

/**
 * The site footer's information architecture, as a shape.
 *
 * Same argument as SiteNav's types: these live with the pattern because the pattern is what has to
 * render them, and @/content declares its fixture against them. A CMS remodel is absorbed inside
 * the source, not here.
 *
 * The footer is deliberately NOT one list of link groups. It is five unlike bands — brand,
 * directory, newsletter, contact, utility — and each has its own type below, because a
 * footer built out of one repeated shape is the failure the design rules name: if you squint and
 * every block is the same rectangle, it is not finished.
 */

export type SiteFooterLink = {
  label: string;
  href: string;
};

/**
 * A social profile: a mark, and the word that names it.
 *
 * This used to be a word alone, and the argument for that is worth keeping because it is still
 * half true. These are TRADEMARKS: each comes with its own usage rules, its own proportions and
 * its own permission to check, and none of them is drawn on this system's 24-unit box. Redrawing
 * one to fit would stop it being the mark.
 *
 * So the marks did NOT join the glyph set. `mark` selects an official asset held locally by this
 * pattern, at whatever proportions its owner published — see BrandMark. Icon's box is for glyphs
 * this system draws; a trademark is not one of those, and the earlier decision was right about
 * that even though it drew the wrong conclusion from it.
 *
 * `label` survives unchanged and is still required: it is the accessible name, and an icon-only
 * social row needs a label per icon anyway.
 */
export type SiteFooterSocial = SiteFooterLink & {
  mark: BrandMarkName;
};

/**
 * The rating badge in the brand block — a score, and the profile it comes from.
 *
 * Split out of the social list because it is not a link to a profile, it is a claim with a source.
 * A row of three names cannot say "4.8", and a badge that says it has to be reachable so the claim
 * can be checked.
 */
export type SiteFooterRating = {
  /** The platform's name, paired with its mark. 'Clutch'. */
  platform: string;
  mark: BrandMarkName;
  /**
   * The score as authored — '4.8', not 4.8. It is copy, not arithmetic: nothing formats it,
   * nothing averages it, and a trailing zero is a decision rather than a rounding artefact: a
   * profile sitting on a whole number still prints '5.0'.
   */
  score: string;
  /** The profile. One href, two consumers — Stat's source link is the other. See @/lib/routes. */
  href: string;
};

export type SiteFooterBrand = {
  /** One line under the wordmark, at --text-lead. The largest type in the band after the mark. */
  tagline: string;
  /**
   * The profiles. These render at the foot of the directory's last column on desktop, and in a
   * row of their own on mobile — not in this band, despite living on this prop. They belong to
   * the brand as a fact; where they are drawn is the layout's business.
   */
  social: SiteFooterSocial[];
  /** Optional: a footer without a rating to show simply omits it. */
  rating?: SiteFooterRating;
};

export type SiteFooterGroup = {
  title: string;
  links: SiteFooterLink[];
};

export type SiteFooterNewsletter = {
  title: string;
  description: string;
  /** The submit button's label. No href — this posts, it does not navigate. */
  cta: { label: string };
  /** Where the form posts. See ENDPOINTS in @/lib/routes: nothing serves it yet. */
  action: string;
  /** The field's accessible name. Visually hidden; a placeholder is not a label. */
  fieldLabel: string;
  placeholder: string;
};

/**
 * One row of the contact strip: a key in mono, a value in sans, optionally a link.
 *
 * A key/value pair rather than a paragraph, because these are four different KINDS of fact —
 * an address, a set of time zones, a promise about response time — and running them together as
 * prose makes the reader parse which is which.
 */
export type SiteFooterMetaItem = {
  key: string;
  value: string;
  /** Present for a value that is reachable — an email, a phone number. Absent for a place. */
  href?: string;
};

export type SiteFooterProps = {
  brand: SiteFooterBrand;
  /**
   * The directory. Six groups is what the sitemap yields; the layout takes any number, but six
   * is what the lg track count is drawn for and a seventh would wrap to a second row.
   */
  groups: SiteFooterGroup[];
  /** The closing action. Solid, primary, md — the last thing in the band that is not chrome. */
  cta: SiteFooterLink;
  newsletter: SiteFooterNewsletter;
  meta: SiteFooterMetaItem[];
  /** The registered address, as one line. Set apart from `meta` because it is a legal fact. */
  address: string;
  utility: SiteFooterLink[];
  legal: string;
  /**
   * The ground. Defaults to `ink` — a footer's job is to end the page, and the ground changing is
   * what says the page has ended. The other three exist because a footer is a component and
   * answers on every surface, not because the site uses them.
   */
  surface?: SectionSurface;
};
