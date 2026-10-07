import { ANCHORS, anchorHref, ROUTES } from '@/lib/routes';

/**
 * Does an action CONVERT — does taking it start something with the studio? The owner's colour rule
 * (7 Oct 2026, visual-direction § 4.5) makes this the one question that decides a solid button's
 * colour: blue when it converts, ink when it does not. PageHero, CtaSection and CtaRow take it as a
 * required `converts`.
 *
 * Where the page AUTHORS the action (a kit page, a specimen, a literal in a route), the caller states
 * `converts` as a literal: it knows what it wrote. This helper is for the other case — an action that
 * arrives from the CMS, whose label and destination the route cannot see at build time and whose
 * kind varies by record ("Start a project" on one service, "See how Product Design works" on the
 * next). There the only evidence on the view model is the destination, and the destinations that
 * convert are named once, here:
 *
 *   - the contact route (any query string: `/contact?expertise=…` is still an enquiry), and
 *   - the page's enquiry form (`#enquiry`, on this page or another).
 *
 * Everything else — an in-page section anchor, a case study, an audit's own page, an external file —
 * is navigation. A destination this list misses renders ink rather than blue, which is the
 * conservative failure: a conversion read as a next step, never a next step dressed as an ask.
 *
 * Strapi recommendation 17 (docs/strapi-changes.md) asks for the action to carry the fact instead,
 * so an editor states it and this inference retires.
 */
export function convertsByHref(href: string): boolean {
  const enquiry = anchorHref(ANCHORS.enquiry);
  const [beforeHash, hash] = href.split('#', 2);
  if (hash !== undefined && `#${hash}` === enquiry) return true;
  const path = (beforeHash ?? '').split('?', 1)[0]?.replace(/\/+$/, '') ?? '';
  return path === ROUTES.contact;
}

/** The first action's `converts`, or `false` for an empty list (nothing renders, so nothing is
 * classified). For an action list that arrives from the CMS — see `convertsByHref`. */
export function leadConverts(actions: readonly { href: string }[]): boolean {
  const [lead] = actions;
  return lead ? convertsByHref(lead.href) : false;
}
