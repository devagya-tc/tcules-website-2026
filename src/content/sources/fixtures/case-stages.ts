import type { CaseStage } from '../../corpus-types.ts';

/**
 * PLACEHOLDER — the case-study index's BY STAGE view, its default (owner, 22 Oct 2026: "replace
 * 'type' with stage and make stage the default"): each case filed under ONE stage, where the
 * client's product stood when the work began, in the order the view lists them. The owner has not
 * yet named the stages, so these three and the filing are stand-ins read off each case's own title
 * (an MVP or a first product is "zero to one"; a redesign of a live product finding its users is
 * "finding fit"; a suite or platform being modernised is "scaling"). Logged as
 * docs/content-proposals.md P51 for the owner to name and re-file; the CMS field that retires it is
 * `stage` on the case record (docs/strapi-changes.md).
 *
 * A case the index lists and this file does not name is not dropped: the route files it under
 * "Other stages", so a new case shows up in the view before anyone files it.
 * Read only through `getCaseStages` (source.ts).
 */
export const CASE_STAGES: readonly CaseStage[] = [
  {
    label: 'Zero to one',
    cases: [
      '/case-studies/auxentios-cpq-product-mvp-design',
      '/case-studies/ai-native-building-energy-product-connectx',
      '/case-studies/novus-insights-ai-survey-product-design',
      '/case-studies/octifi-mobile-lending-product-design',
      '/case-studies/ux-research-for-kirana-store-payment-app',
      '/case-studies/ai-quality-control-expert-review-buildtwin',
    ],
  },
  {
    label: 'Finding fit',
    cases: [
      '/case-studies/eden-ai-workflow-builder-search-redesign',
      '/case-studies/omny-ai-suggestion-trust-redesign',
      '/case-studies/ryzeo-marketing-automation-ux-revamp',
      '/case-studies/scissors-staffing-software-object-oriented-ux',
      '/case-studies/gt-tools-shopify-product-discovery',
      '/case-studies/wandering-raven-edtech-moodle-experience',
    ],
  },
  {
    label: 'Scaling',
    cases: [
      '/case-studies/doodle-case-study-automating-enterprise-meeting-scheduling',
      '/case-studies/enterprise-workflow-redesign-dealpath-real-estate',
      '/case-studies/benchmark-gensuite-enterprise-suite-modernisation',
      '/case-studies/gold-image-printing-web-to-print-erp-modernisation',
      '/case-studies/ux-ui-design-and-development-for-magento-of-a-silver-chain-store',
    ],
  },
];
