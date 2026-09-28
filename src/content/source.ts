import { fixtureSource } from './sources/fixtures';
import { aboutSource } from './sources/strapi/about';
import { blogSource } from './sources/strapi/blog';
import { careersSource } from './sources/strapi/careers';
import { caseStudySource } from './sources/strapi/case-study';
import { contactSource } from './sources/strapi/contact';
import { eventSource } from './sources/strapi/event';
import { expertiseSource } from './sources/strapi/expertise';
import { futureInterfacesLabJoinSource } from './sources/strapi/future-interfaces-lab-join';
import { futureInterfacesLabSource } from './sources/strapi/future-interfaces-lab';
import { glossarySource } from './sources/strapi/glossary';
import { insightsSource } from './sources/strapi/insights';
import { matterDesignSystemSource } from './sources/strapi/matter-design-system';
import { podcastSource } from './sources/strapi/podcast';
import { privacyPolicySource } from './sources/strapi/privacy-policy';
import { serviceSource } from './sources/strapi/service';
import { servicesMasterSource } from './sources/strapi/services-master';
import { howWeWorkSource, strapiSource } from './sources/strapi';
import { termsOfUseSource } from './sources/strapi/terms-of-use';
import { toolSource } from './sources/strapi/tool';
import type {
  AboutContentSource,
  AuditContentSource,
  BlogContentSource,
  CareerContentSource,
  CaseStudyContentSource,
  ContactContentSource,
  ContentSource,
  EventContentSource,
  ExpertiseContentSource,
  FutureInterfacesLabJoinContentSource,
  FutureInterfacesLabContentSource,
  GlossaryContentSource,
  HowWeWorkContentSource,
  InsightsContentSource,
  MatterDesignSystemContentSource,
  PodcastContentSource,
  PrivacyPolicyContentSource,
  ServiceContentSource,
  ServicesMasterContentSource,
  TermsOfUseContentSource,
  ToolContentSource,
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
const aboutPagesSource: AboutContentSource = aboutSource;
const auditSource: AuditContentSource = strapiSource;
const blogsSource: BlogContentSource = blogSource;
const careersPagesSource: CareerContentSource = careersSource;
const caseStudiesSource: CaseStudyContentSource = caseStudySource;
const contactPagesSource: ContactContentSource = contactSource;
const eventsSource: EventContentSource = eventSource;
const expertisesSource: ExpertiseContentSource = expertiseSource;
const futureInterfacesLabJoinPagesSource: FutureInterfacesLabJoinContentSource =
  futureInterfacesLabJoinSource;
const futureInterfacesLabsSource: FutureInterfacesLabContentSource = futureInterfacesLabSource;
const glossariesSource: GlossaryContentSource = glossarySource;
const howWeWorkPagesSource: HowWeWorkContentSource = howWeWorkSource;
const insightsPagesSource: InsightsContentSource = insightsSource;
const matterDesignSystemsSource: MatterDesignSystemContentSource = matterDesignSystemSource;
const podcastsSource: PodcastContentSource = podcastSource;
const privacyPoliciesSource: PrivacyPolicyContentSource = privacyPolicySource;
const servicesSource: ServiceContentSource = serviceSource;
const servicesMastersSource: ServicesMasterContentSource = servicesMasterSource;
const termsOfUsePagesSource: TermsOfUseContentSource = termsOfUseSource;
const toolsSource: ToolContentSource = toolSource;

export const getPage = source.getPage.bind(source);
export const listPages = source.listPages.bind(source);
export const getNavigation = source.getNavigation.bind(source);
export const getAboutPage = aboutPagesSource.getAboutPage.bind(aboutPagesSource);
export const getAuditPage = auditSource.getAuditPage.bind(auditSource);
export const getBlogPage = blogsSource.getBlogPage.bind(blogsSource);
export const getCareerPage = careersPagesSource.getCareerPage.bind(careersPagesSource);
export const getCaseStudyListingPage =
  caseStudiesSource.getCaseStudyListingPage.bind(caseStudiesSource);
export const getCaseStudyPage = caseStudiesSource.getCaseStudyPage.bind(caseStudiesSource);
export const getContactPage = contactPagesSource.getContactPage.bind(contactPagesSource);
export const createClientContact =
  contactPagesSource.createClientContact.bind(contactPagesSource);
export const getEventPage = eventsSource.getEventPage.bind(eventsSource);
export const getExpertisePage = expertisesSource.getExpertisePage.bind(expertisesSource);
export const getFutureInterfacesLabJoinPage =
  futureInterfacesLabJoinPagesSource.getFutureInterfacesLabJoinPage.bind(
    futureInterfacesLabJoinPagesSource,
  );
export const getFutureInterfacesLabPage =
  futureInterfacesLabsSource.getFutureInterfacesLabPage.bind(futureInterfacesLabsSource);
export const getGlossaryPage = glossariesSource.getGlossaryPage.bind(glossariesSource);
export const getHowWeWorkPage =
  howWeWorkPagesSource.getHowWeWorkPage.bind(howWeWorkPagesSource);
export const getInsightsPage = insightsPagesSource.getInsightsPage.bind(insightsPagesSource);
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
export const getToolPage = toolsSource.getToolPage.bind(toolsSource);

export type {
  Page,
  PageBlock,
  PageSeo,
  ImageRecord,
  ImageSource,
  ImageKind,
  ImagePanel,
  ContentTable,
  AboutPage,
  AboutImageSection,
  AboutCard,
  AboutAction,
  AboutImage,
  AboutContentSource,
  AuditPage,
  AuditSection,
  AuditBlock,
  AuditSeo,
  AuditAction,
  AuditCard,
  AuditLabelledItem,
  AuditContentColumn,
  BlogPage,
  BlogBlock,
  BlogAction,
  BlogImage,
  BlogAuthor,
  BlogResource,
  BlogContentSource,
  CareerPage,
  CareerOpening,
  CareerCard,
  CareerAction,
  CareerImage,
  CareerContentSource,
  ContentSeo,
  EventPage,
  EventDetail,
  EventBlock,
  EventAction,
  EventImage,
  EventResource,
  EventContentSource,
  ExpertisePage,
  ExpertiseSection,
  ExpertiseBlock,
  ExpertiseSeo,
  ExpertiseAction,
  ExpertiseCard,
  ExpertiseLabelledItem,
  ExpertiseContentColumn,
  ExpertiseContentSource,
  FutureInterfacesLabJoinPage,
  FutureInterfacesLabJoinCardSection,
  FutureInterfacesLabJoinCard,
  FutureInterfacesLabJoinAction,
  FutureInterfacesLabJoinImage,
  FutureInterfacesLabJoinContentSource,
  FutureInterfacesLabPage,
  FutureInterfacesLabSection,
  FutureInterfacesLabCard,
  FutureInterfacesLabAction,
  FutureInterfacesLabImage,
  FutureInterfacesLabContentSource,
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
  InsightsPage,
  InsightAction,
  InsightImage,
  InsightFormatCard,
  InsightFilterOption,
  InsightFilterGroup,
  InsightTaxonomy,
  InsightResourceKind,
  InsightResource,
  InsightsContentSource,
  MatterDesignSystemPage,
  MatterDesignSystemSection,
  MatterDesignSystemCard,
  MatterDesignSystemDisplayCard,
  MatterDesignSystemStrip,
  MatterDesignSystemAction,
  MatterDesignSystemImage,
  MatterDesignSystemContentSource,
  CaseStudyPage,
  CaseStudyListingPage,
  CaseStudyListingItem,
  CaseStudyListingImage,
  CaseStudyBlock,
  CaseStudyAction,
  CaseStudyImage,
  CaseStudyContentSource,
  ContactPage,
  ContactCard,
  ContactAction,
  ContactImage,
  ContactFormSubmission,
  ContactSubmissionResult,
  ContactContentSource,
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
  ToolPage,
  ToolSection,
  ToolBlock,
  ToolSeo,
  ToolCard,
  ToolLabelledItem,
  ToolContentColumn,
  ToolContentSource,
} from './types';
