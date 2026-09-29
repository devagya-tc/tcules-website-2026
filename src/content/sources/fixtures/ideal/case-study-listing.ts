import type { CaseStudyListingItem, CaseStudyListingPage } from '../../../types';

/**
 * IDEAL CONTENT — the case-study index as its content rules say it should read.
 *
 * Not a source. The live listing still comes from Strapi; this is an OVERLAY keyed by slug, applied
 * on top of it, so the ideal page keeps the real entries, order, covers and links and changes only
 * the copy the rules govern (docs/content-changes.md §2, strapi-changes.md §13):
 *
 *   client       its own field, the card's eyebrow
 *   title        2–8 words (Copy × UI, card title), no client prefix
 *   description  8–15 words, one sentence
 *   categories   dropped: one label line per card, and the client is that line
 *
 * The copy is ILLUSTRATIVE. It is rewritten from each entry's live title and description to show
 * the rules applied, not approved copy, and the client names are read from each entry's own title,
 * slug or cover filename — confirm them before any of this reaches the CMS. It is also what the
 * content team is handed as a worked example.
 *
 * An entry with no overlay renders exactly as the CMS holds it, which is itself a signal: a card
 * that looks wrong on the ideal page is one this list has not reached yet.
 */
type IdealCopy = Pick<CaseStudyListingItem, 'title' | 'description'> & { client: string };

const IDEAL_COPY: Readonly<Record<string, IdealCopy>> = {
  'doodle-case-study-automating-enterprise-meeting-scheduling': {
    client: 'Doodle',
    title: 'Enterprise scheduling without the email chain',
    description:
      'Meeting coordination for large teams, without the back-and-forth that slows it down.',
  },
  'enterprise-workflow-redesign-dealpath-real-estate': {
    client: 'Dealpath',
    title: 'Simplifying the interface, not the work',
    description: 'Acquisitions teams had all the data; the interface hid the decision.',
  },
  'legacy-saas-modernisation-information-architecture': {
    client: 'Benchmark Gensuite',
    title: 'One experience across 75+ applications',
    description:
      'Modernising an enterprise suite is a design-systems problem, not many redesigns.',
  },
  'ai-native-building-energy-product-connectx': {
    client: 'ConnectX',
    title: 'An AI-native energy product, from zero',
    description: 'Adding a chatbot is not the same as building an AI-native product.',
  },
  'ai-quality-control-expert-review-buildtwin': {
    client: 'BuildTwin',
    title: 'Trust needed evidence, not reassurance',
    description: 'Engineers needed to see what the AI checked, and what it missed.',
  },
  'designing-trust-how-tcules-helped-omnyai-reframe-their-ai-human-relationship': {
    client: 'OmnyAI',
    title: 'Reframing the AI–human relationship',
    description: 'Decision control moved back to the people the AI was meant to help.',
  },
  'transforming-an-edtech-platform-into-an-engaging-learning-experience': {
    client: 'The Wandering Raven',
    title: 'A writing course people come back to',
    description:
      'A learning platform rebuilt around exercises, feedback and a community of writers.',
  },
  'saas-ux-ui-case-study-research-and-object-oriented-ux-for-staffing-agencies-software': {
    client: 'Scissors',
    title: 'Object-oriented UX for temporary staffing',
    description: 'Modelling shifts, workers and clients as objects made the workflows legible.',
  },
  'ux-revamp-for-a-saas-product-in-marketing-automation-vertical': {
    client: 'Ryzeo',
    title: 'Marketing automation marketers can run',
    description: 'Complex workflows simplified, so teams build campaigns without a specialist.',
  },
  'optimising-microlending-fintech-app-for-a-y-combinator-batch-startup': {
    client: 'Octifi',
    title: 'Microlending, from sign-up to first loan',
    description: 'Onboarding and loan flows reworked for a Y Combinator fintech startup.',
  },
  'saas-ux-ui-case-study-ai-for-market-research-automation': {
    client: 'Novus Insights',
    title: 'Survey creation with generative AI',
    description: 'A research tool that drafts the survey, so researchers can refine it.',
  },
  'ux-research-for-kirana-store-payment-app': {
    client: 'Kirana payments',
    title: "Payments for India's corner shops",
    description: 'Research with kirana retailers shaped what a payments app had to do.',
  },
  'redesigning-for-a-shopify-website-ux-design': {
    client: 'GT Tools',
    title: 'Finding the right tool, faster',
    description: 'Search, navigation and product pages redesigned for a Shopify Plus store.',
  },
  'boosting-web-to-print-sales-and-efficiency-by-modernising-legacy-erp-ux': {
    client: 'Gold Image Printing',
    title: 'Modernising a legacy web-to-print ERP',
    description: 'An ordering flow rebuilt so print buyers finish what they start.',
  },
  'unifying-workflow-creation-through-intelligent-search': {
    client: 'Eden AI',
    title: 'Workflow creation through intelligent search',
    description: 'Templates, AI assistance and context brought into one search for developers.',
  },
  'consumer-grade-ux-in-enterprise-saas-a-case-study-on-mvp-design-for-cpq-software': {
    client: 'Auxentious',
    title: 'Consumer-grade UX for enterprise quoting',
    description: 'An MVP for configure-price-quote software that sales teams learn quickly.',
  },
  'ux-ui-design-and-development-for-magento-of-a-silver-chain-store': {
    client: 'The Chain Hut',
    title: 'A jewellery store built for the phone',
    description: 'Product discovery and checkout redesigned for a UK silver-jewellery store.',
  },
};

/** The live page with the ideal copy laid over every entry the overlay knows. */
export function withIdealCaseStudyCopy(page: CaseStudyListingPage): CaseStudyListingPage {
  return {
    ...page,
    items: page.items.map((item) => {
      const ideal = IDEAL_COPY[item.slug];
      return ideal ? { ...item, ...ideal, categories: [] } : item;
    }),
  };
}
