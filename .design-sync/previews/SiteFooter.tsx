import { SiteFooter } from 'tcules-website-2026';
import type { SiteFooterProps } from 'tcules-website-2026';

/* NOTE: these preview files are type-STRIPPED, not type-checked (see .design-sync/NOTES.md), so an
   invalid prop value fails silently at render — or, in this component's case, loudly: every entry in
   `brand.social` and `brand.rating` MUST carry a `mark`, because BrandMark looks its artwork up by
   that name and an absent one dereferences undefined. The previous version of this file predated
   `mark` and would have thrown.

   Hrefs are real routes rather than '#', because the footer IS the site index and a directory of
   dead links is not the component. They are hand-copied from src/lib/routes.ts, which a preview
   cannot import — the sync entry re-exports the two tier barrels and nothing from @/lib — so they
   are the one thing here that can silently drift. Five of them were wrong on the first pass and
   were caught by diffing this file's hrefs against ROUTES; do that again after any rename. */

/**
 * Six groups, not five, and the number is load-bearing: the lg layout is drawn for six tracks and a
 * seventh wraps to a second row. This is the real sitemap-derived directory — Services, Expertise,
 * Work, Insights, Lab, Company — with Lab kept as its own column on purpose. It is the one group
 * whose contents are products rather than pages about the studio, and burying the design system
 * under "Company" is how nobody finds it.
 */
const FOOTER: Omit<SiteFooterProps, 'surface'> = {
  brand: {
    tagline: 'Product intent, kept visible from the first decision to what ships.',
    /* Two profiles, not three: Clutch left this list for the rating badge, because a profile that
       carries a score is a claim with a source and a row of three names cannot say 4.9. */
    social: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/tcules', mark: 'linkedin' },
      { label: 'YouTube', href: 'https://www.youtube.com/@tcules', mark: 'youtube' },
    ],
    /* Optional. A footer with no rating to show simply omits it — see `WithoutRating` below. The
       score is authored copy ('4.9', not 4.9): nothing formats it and nothing averages it, so a
       trailing zero would be a decision rather than a rounding artefact. */
    rating: {
      platform: 'Clutch',
      mark: 'clutch',
      score: '4.9',
      href: 'https://clutch.co/profile/tcules',
    },
  },
  groups: [
    {
      title: 'Services',
      links: [
        { label: 'Product Design', href: '/services/product-design' },
        { label: 'Product Modernisation', href: '/services/product-modernisation' },
        { label: 'Design Systems', href: '/services/design-systems' },
        { label: 'AI Product UX', href: '/services/ai-product-ux' },
        { label: 'Design Engineering', href: '/services/design-engineering' },
        { label: 'Software Development', href: '/services/software-development' },
        { label: 'Audits', href: '/audits' },
        { label: 'How We Work', href: '/how-we-work' },
      ],
    },
    {
      title: 'Expertise',
      links: [
        {
          label: 'B2B SaaS and Workflow Software',
          href: '/expertise/b2b-saas-workflow-software',
        },
        {
          label: 'AI Products and Developer Tools',
          href: '/expertise/ai-products-developer-tools',
        },
        {
          label: 'Data and Decision Products',
          href: '/expertise/data-analytics-decision-products',
        },
        { label: 'Marketplaces', href: '/expertise/marketplaces-multi-sided-platforms' },
        {
          label: 'Content and Knowledge Platforms',
          href: '/expertise/content-knowledge-discovery-platforms',
        },
        { label: 'FinTech', href: '/expertise/fintech-insurtech' },
        { label: 'HealthTech', href: '/expertise/healthtech-care' },
        { label: 'EdTech', href: '/expertise/edtech-learning' },
        { label: 'All Expertise', href: '/expertise' },
      ],
    },
    {
      title: 'Work',
      links: [
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Clients', href: '/clients' },
        { label: 'Product Stages', href: '/case-studies' },
        { label: 'Engagement Models', href: '/how-we-work' },
      ],
    },
    {
      title: 'Insights',
      links: [
        { label: 'Articles', href: '/insights/articles' },
        { label: 'Guides', href: '/insights/guides' },
        { label: 'Podcasts', href: '/insights/podcasts' },
        { label: 'Videos', href: '/insights/videos' },
        { label: 'Events', href: '/insights/events' },
        { label: 'Research', href: '/insights/research' },
        { label: 'Tools and Resources', href: '/tools' },
        { label: 'Glossary', href: '/glossary' },
      ],
    },
    {
      title: 'Lab',
      links: [
        { label: 'Future Interfaces Lab', href: '/future-interfaces-lab' },
        { label: 'Matter Design System', href: '/matter-design-system' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Team', href: '/team' },
        { label: 'Careers', href: '/careers' },
        { label: 'Security and Confidentiality', href: '/security-and-confidentiality' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ],
  cta: { label: 'Start a project', href: '/contact' },
  newsletter: {
    title: 'Beyond Interfaces',
    description:
      'A deep dive into the intersection of design, strategy, and product innovation.',
    cta: { label: 'Subscribe' },
    /* Nothing serves this yet — the field is in place ahead of the endpoint, deliberately. */
    action: '/api/newsletter',
    fieldLabel: 'Email address',
    placeholder: 'you@company.com',
  },
  meta: [
    { key: 'Enquiries', value: 'hello@tcules.com', href: 'mailto:hello@tcules.com' },
    { key: 'Studio', value: 'Ahmedabad, India' },
    { key: 'Across time zones', value: 'India · United States · Europe' },
    { key: 'Response', value: 'Within 2 business days' },
  ],
  address: '614, Silver Radiance 2, Science City Road, Sola, Ahmedabad 380060, India',
  utility: [
    { label: 'Privacy', href: '/privacy-policy' },
    { label: 'Terms', href: '/terms-of-use' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
  legal: '© 2026 Tcules. All rights reserved.',
};

/**
 * SiteFooter — the page's ending, and the site's index.
 *
 * **It is deliberately NOT one list of link groups.** It is five unlike bands — brand, directory,
 * newsletter, contact, utility — and each has its own shape, because a footer built out of one
 * repeated rectangle is the failure the design rules name: squint at it, and if every block is the
 * same shape at the same size it is not finished. That is why the props are five unlike types
 * rather than one array of `{title, links}`.
 *
 * **The directory is broader than the nav, on purpose.** A header panel is a route in, so it has to
 * choose. A footer is the index, so it can afford to name every service, every industry and every
 * format — and being the one place that lists all of them is most of its value.
 *
 * **The social marks are not glyphs, and that distinction is the reason for `BrandMark`.** These are
 * trademarks: each comes with its own usage rules, its own proportions and its own permission to
 * check, and none is drawn on this system's 24-unit box. Redrawing one to fit would stop it being
 * the mark. So they did not join the `Icon` set — `mark: 'linkedin' | 'youtube' | 'clutch'` selects
 * an official asset held locally by this pattern, at whatever proportions its owner published.
 * `label` is still required, because it is the accessible name.
 *
 * **`rating` is a claim with a source, which is why it is not a fourth social link.** A row of
 * profile names cannot say "4.9", and a score whose profile is not reachable cannot be checked.
 *
 * `surface` defaults to `ink`: a footer's job is to end the page, and the ground changing is what
 * says the page has ended. The other three grounds exist because a footer is a component and has to
 * answer on every surface, not because the site uses them.
 */
export function Default() {
  return <SiteFooter {...FOOTER} />;
}

/**
 * The optional rating omitted. The brand block closes on the tagline and the profile row with no
 * gap left where the badge was — the same rule the rest of this system follows for an absent slot:
 * no element, and no seam either.
 */
export function WithoutRating() {
  return <SiteFooter {...FOOTER} brand={{ ...FOOTER.brand, rating: undefined }} />;
}

/**
 * A four-group directory. The layout takes any number of groups; six is what the lg track count is
 * drawn for, and this is what fewer looks like — the tracks widen rather than the row centring.
 */
export function FourGroups() {
  return <SiteFooter {...FOOTER} groups={FOOTER.groups.slice(0, 4)} />;
}

/** The same footer on paper, for a page that ends light rather than dark. */
export function OnPaper() {
  return <SiteFooter {...FOOTER} surface="paper" />;
}

/** On blue. Only the light end of the Brandeis ramp clears AA on this ground, so every link,
    key and legal line resolves from the light steps rather than a neutral. */
export function OnBlue() {
  return <SiteFooter {...FOOTER} surface="blue" />;
}
