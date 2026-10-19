import type { CaseIndustry } from '../../corpus-types.ts';

/**
 * PROPOSED — the case-study index's BY INDUSTRY view: each case filed under ONE sector, in the order
 * the view lists them. The corpus authors no industry for a case (only the Chain Hut page carries a
 * `sector`), so this is read off the expertise pages: every case below is one an expertise page
 * already cites, filed under the sector it is cited for, and a case cited by two is filed under the
 * closer one. Logged as docs/content-proposals.md P50 for the content team to keep or re-file; the
 * CMS field that retires it is docs/strapi-changes.md § 5 (`industry` on the case record).
 *
 * A case the index lists and this file does not name is not dropped: the route files it under
 * "Other industries", so a new case shows up in the view before anyone files it.
 * Read only through `getCaseIndustries` (source.ts).
 */
export const CASE_INDUSTRIES: readonly CaseIndustry[] = [
  {
    label: 'B2B SaaS and workflow software',
    cases: [
      '/case-studies/doodle-case-study-automating-enterprise-meeting-scheduling',
      '/case-studies/scissors-staffing-software-object-oriented-ux',
    ],
  },
  {
    label: 'AI products and developer tools',
    cases: [
      '/case-studies/eden-ai-workflow-builder-search-redesign',
      '/case-studies/novus-insights-ai-survey-product-design',
    ],
  },
  {
    label: 'Commerce',
    cases: [
      '/case-studies/gt-tools-shopify-product-discovery',
      '/case-studies/gold-image-printing-web-to-print-erp-modernisation',
      '/case-studies/ux-ui-design-and-development-for-magento-of-a-silver-chain-store',
    ],
  },
  {
    label: 'MarTech and SalesTech',
    cases: [
      '/case-studies/auxentios-cpq-product-mvp-design',
      '/case-studies/omny-ai-suggestion-trust-redesign',
      '/case-studies/ryzeo-marketing-automation-ux-revamp',
    ],
  },
  {
    label: 'FinTech',
    cases: [
      '/case-studies/octifi-mobile-lending-product-design',
      '/case-studies/ux-research-for-kirana-store-payment-app',
    ],
  },
  {
    label: 'PropTech and field operations',
    cases: [
      '/case-studies/enterprise-workflow-redesign-dealpath-real-estate',
      '/case-studies/ai-quality-control-expert-review-buildtwin',
    ],
  },
  {
    label: 'Climate and energy',
    cases: [
      '/case-studies/ai-native-building-energy-product-connectx',
      '/case-studies/benchmark-gensuite-enterprise-suite-modernisation',
    ],
  },
  {
    label: 'EdTech',
    cases: ['/case-studies/wandering-raven-edtech-moodle-experience'],
  },
];
