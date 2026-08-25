import { fixtureSource } from './sources/fixtures';
import { caseStudySource } from './sources/strapi/case-study';
import { expertiseSource } from './sources/strapi/expertise';
import { glossarySource } from './sources/strapi/glossary';
import { matterDesignSystemSource } from './sources/strapi/matter-design-system';
import { podcastSource } from './sources/strapi/podcast';
import { privacyPolicySource } from './sources/strapi/privacy-policy';
import { serviceSource } from './sources/strapi/service';
import { servicesMasterSource } from './sources/strapi/services-master';
import { howWeWorkSource, strapiSource } from './sources/strapi';
import { termsOfUseSource } from './sources/strapi/terms-of-use';
import type {
  AuditContentSource,
  CaseStudyContentSource,
  ContentSource,
  ExpertiseContentSource,
  GlossaryContentSource,
  HowWeWorkContentSource,
  MatterDesignSystemContentSource,
  PodcastContentSource,
  PrivacyPolicyContentSource,
  ServiceContentSource,
  ServicesMasterContentSource,
  TermsOfUseContentSource,
} from './types';

/**
 * THE SEAM.
 *
 * Pages import from here and from nowhere else in @/content/sources. The general page and chrome
 * collections remain on fixtures while the audit, case-study, glossary and privacy-policy
 * families are assigned to Strapi. Neither route nor pattern code knows which source answered any
 * reader.
 */
const source: ContentSource = fixtureSource;
const auditSource: AuditContentSource = strapiSource;
const caseStudiesSource: CaseStudyContentSource = caseStudySource;
const expertisesSource: ExpertiseContentSource = expertiseSource;
const glossariesSource: GlossaryContentSource = glossarySource;
const howWeWorkPagesSource: HowWeWorkContentSource = howWeWorkSource;
const matterDesignSystemsSource: MatterDesignSystemContentSource = matterDesignSystemSource;
const podcastsSource: PodcastContentSource = podcastSource;
const privacyPoliciesSource: PrivacyPolicyContentSource = privacyPolicySource;
const servicesSource: ServiceContentSource = serviceSource;
const servicesMastersSource: ServicesMasterContentSource = servicesMasterSource;
const termsOfUsePagesSource: TermsOfUseContentSource = termsOfUseSource;

export const getPage = source.getPage.bind(source);
export const listPages = source.listPages.bind(source);
export const getNavigation = source.getNavigation.bind(source);
export const getAuditPage = auditSource.getAuditPage.bind(auditSource);
export const getCaseStudyPage = caseStudiesSource.getCaseStudyPage.bind(caseStudiesSource);
export const getExpertisePage = expertisesSource.getExpertisePage.bind(expertisesSource);
export const getGlossaryPage = glossariesSource.getGlossaryPage.bind(glossariesSource);
export const getHowWeWorkPage =
  howWeWorkPagesSource.getHowWeWorkPage.bind(howWeWorkPagesSource);
export const getMatterDesignSystemPage =
  matterDesignSystemsSource.getMatterDesignSystemPage.bind(matterDesignSystemsSource);
export const getPodcastPage = podcastsSource.getPodcastPage.bind(podcastsSource);
export const getPrivacyPolicyPage =
  privacyPoliciesSource.getPrivacyPolicyPage.bind(privacyPoliciesSource);
export const getServicePage = servicesSource.getServicePage.bind(servicesSource);
export const getServicesMasterPage =
  servicesMastersSource.getServicesMasterPage.bind(servicesMastersSource);
export const getTermsOfUsePage =
  termsOfUsePagesSource.getTermsOfUsePage.bind(termsOfUsePagesSource);

export type {
  Page,
  PageBlock,
  PageSeo,
  AuditPage,
  AuditSection,
  AuditBlock,
  AuditSeo,
  AuditAction,
  AuditCard,
  AuditLabelledItem,
  AuditContentColumn,
  ContentSeo,
  ExpertisePage,
  ExpertiseSection,
  ExpertiseBlock,
  ExpertiseSeo,
  ExpertiseAction,
  ExpertiseCard,
  ExpertiseLabelledItem,
  ExpertiseContentColumn,
  ExpertiseContentSource,
  GlossaryPage,
  GlossarySection,
  GlossaryBlock,
  GlossarySeo,
  GlossaryAction,
  GlossaryCard,
  GlossaryLabelledItem,
  GlossaryContentColumn,
  GlossaryContentSource,
  HowWeWorkPage,
  HowWeWorkBlock,
  HowWeWorkAction,
  HowWeWorkContentColumn,
  HowWeWorkContentSource,
  MatterDesignSystemPage,
  MatterDesignSystemSection,
  MatterDesignSystemCard,
  MatterDesignSystemDisplayCard,
  MatterDesignSystemStrip,
  MatterDesignSystemAction,
  MatterDesignSystemImage,
  MatterDesignSystemContentSource,
  CaseStudyPage,
  CaseStudyBlock,
  CaseStudyAction,
  CaseStudyImage,
  CaseStudyContentSource,
  PodcastPage,
  PodcastBlock,
  PodcastAction,
  PodcastImage,
  PodcastResource,
  PodcastContentSource,
  PrivacyPolicyPage,
  PrivacyPolicySection,
  PrivacyPolicyContentSource,
  TermsOfUsePage,
  TermsOfUseSection,
  TermsOfUseContentSource,
  Navigation,
  ContentSource,
  AuditContentSource,
  ServicePage,
  ServiceSection,
  ServiceBlock,
  ServiceSeo,
  ServiceAction,
  ServiceCard,
  ServiceLabelledItem,
  ServiceContentColumn,
  ServiceContentSource,
  ServicesMasterPage,
  ServicesMasterSection,
  ServicesMasterCard,
  ServicesMasterAction,
  ServicesMasterImage,
  ServicesMasterContentSource,
} from './types';
