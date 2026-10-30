import { offerSceneKey, type OfferSceneName, type OfferScenes } from '../../lib/sketches.ts';

/**
 * The drawings a corpus offer page's items carry (owner, 26 Oct 2026, product-design page, mock
 * rounds 1–4), by route. Each scene is drawn for its one item from that item's own words
 * (components/Sketch/offer.tsx), so a row here is a decision about one item, never a keyword match.
 * A page with no entry draws nothing new: its bands keep their undrawn arrangements.
 */
const by = (rows: Record<string, OfferSceneName>) =>
  Object.fromEntries(
    Object.entries(rows).map(([title, scene]) => [offerSceneKey(title), scene]),
  );

export const OFFER_SCENES: Readonly<Record<string, OfferScenes>> = {
  '/services/product-design': {
    items: {
      outcomes: by({
        'A product that needs less explaining.': 'outcome-explain',
        'Complex rules, simple screens.': 'outcome-rules',
        'Fewer surprises in development.': 'outcome-build',
        'An interface that feels finished.': 'outcome-finished',
      }),
      /* The 26 Oct copy's "What you receive" (component-map C4): each deliverable takes the scene
         drawn for what it delivers. The model of roles and rules is the matrix behind one switch;
         every screen and state is the card loading, empty, in error and finished; the tested
         prototype is the idea put in front of a person; designs ready to build are the screen and its
         variants handed to code. The tested brief is drawn for itself (outcome-brief, 29 Oct 2026). */
      'what-you-get': by({
        'A tested brief': 'outcome-brief',
        'A model of roles, records, permissions and workflows, drawn before the screens, so every screen agrees with the next.':
          'outcome-rules',
        'Interaction and visual design for every screen and state, inside your design system if you have one, down to the empty and error screens nobody demos.':
          'outcome-finished',
        'Clickable or coded prototypes, tested with people who match your users.': 'symptom-test',
        'Designs ready to build, and our review of what your engineers ship.': 'outcome-build',
      }),
      'starting-points': by({
        '"Customers keep getting stuck."': 'symptom-stuck',
        '"The product has grown messy."': 'symptom-messy',
        '"We want to test an idea before building it."': 'symptom-test',
        '"Every screen looks slightly different."': 'symptom-consistent',
        '"What ships doesn\'t match the design."': 'symptom-match',
      }),
      /* The 26 Oct copy's seven services you can hire on their own (owner, 29 Oct 2026, Q7): the five
         specialist scenes, and two drawn for this band, New Product Design and the UX & Product
         Audit. */
      'services-on-their-own': {
        '/services/product-design/ux-research': 'specialist-research',
        '/services/product-design/information-architecture-workflow-design': 'specialist-ia',
        '/services/product-design/interaction-ui-design': 'specialist-ui',
        '/services/product-design/data-visualisation': 'specialist-dataviz',
        '/services/product-design/prototyping-usability-testing': 'specialist-prototype',
        '/services/new-product-design-first-release': 'specialist-new-product',
        '/audits/ux-product-audit': 'specialist-audit',
      },
      'specialist-capabilities': {
        '/services/product-design/ux-research': 'specialist-research',
        '/services/product-design/information-architecture-workflow-design': 'specialist-ia',
        '/services/product-design/interaction-ui-design': 'specialist-ui',
        '/services/product-design/data-visualisation': 'specialist-dataviz',
        '/services/product-design/prototyping-usability-testing': 'specialist-prototype',
      },
    },
    stories: {
      'worked-example': ['case-dealpath-problem', 'case-dealpath-did'],
    },
  },
};
