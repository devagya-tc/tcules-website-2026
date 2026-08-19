import type { SectionSurface } from '@/components';

/**
 * The site footer's information architecture, as a shape.
 *
 * Same argument as SiteNav's types: these live with the pattern because the pattern is what has to
 * render them, and @/content declares its fixture against them. A CMS remodel is absorbed inside
 * the source, not here.
 *
 * The footer is deliberately NOT one list of link groups. It is six unlike bands — brand,
 * newsletter, directory, contact, utility, legal — and each has its own type below, because a
 * footer built out of one repeated shape is the failure the design rules name: if you squint and
 * every block is the same rectangle, it is not finished.
 */

export type SiteFooterLink = {
  label: string;
  href: string;
};

/**
 * A social profile.
 *
 * Named links, not logo marks — and the reason is not that the glyph set is unfilled, because it
 * is filled. It is that these are TRADEMARKS: each comes with its own usage rules, its own
 * proportions, and its own permission to check, and none of them is drawn on this system's 24-unit
 * box. Redrawing one to fit would stop it being the mark. A word is also the accessible form — an
 * icon-only social row needs a label per icon anyway, so the label was always going to be
 * written.
 */
export type SiteFooterSocial = SiteFooterLink;

export type SiteFooterBrand = {
  /** One line under the wordmark, at --text-lead. The largest type in the band after the mark. */
  tagline: string;
  social: SiteFooterSocial[];
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
  /** The directory. Five groups is what the sitemap yields; the layout takes any number. */
  groups: SiteFooterGroup[];
  /** The closing action. Solid, primary, lg — the last thing in the band that is not chrome. */
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
