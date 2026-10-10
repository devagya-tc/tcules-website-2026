/**
 * TIER 3 — templates.
 *
 * Whole page-type layouts: the article shape, the service-page shape. A template makes the
 * arrangement decisions for a page TYPE once, so thirty pages of that type cannot each get one
 * decision subtly different — which is the failure mode that produces pages reading as bugs
 * when seen second.
 *
 * A template may import from @/patterns and @/components. It may not import @/content — the
 * page reads content and passes it in.
 */
export { CaseStudyIndex } from './CaseStudyIndex';
export type {
  CaseStudyIndexClosing,
  CaseStudyIndexItem,
  CaseStudyIndexProps,
} from './CaseStudyIndex';
export { ServicePage } from './ServicePage';
export type { ServicePageProps } from './ServicePage';
export { HomePage, OfferPage, planOffer, kindOf } from './CorpusPage';
export type {
  HomePageProps,
  OfferPageProps,
  OfferKind,
  OfferPart,
  OfferUnit,
} from './CorpusPage';
