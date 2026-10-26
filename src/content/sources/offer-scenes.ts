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
      'starting-points': by({
        '"Customers keep getting stuck."': 'symptom-stuck',
        '"The product has grown messy."': 'symptom-messy',
        '"We want to test an idea before building it."': 'symptom-test',
        '"Every screen looks slightly different."': 'symptom-consistent',
        '"What ships doesn\'t match the design."': 'symptom-match',
      }),
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
