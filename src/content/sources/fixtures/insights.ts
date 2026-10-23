import { getKitPhoto, type PhotoId } from '../../../lib/photos.ts';
import { ROUTES } from '../../../lib/routes.ts';
import type {
  InsightImage,
  InsightResource,
  InsightResourceKind,
  InsightsPage,
} from '../../types';

/**
 * The insights hub as DESIGNED — for the ListingIndex specimen only, never a live route (the live
 * /insights reads Strapi through insightsSource).
 *
 * It is stress content as much as it is ideal content (owner: design content-agnostic, against
 * stress): every one of the seven formats, more items than any row shows, the longest real titles
 * and one past them, an unbroken token, items with no description, a format whose covers are partly
 * missing, and an event with no date. Titles and standfirsts are the corpus's own where one exists
 * (`_pages/insights*.md`); the rest are written in the same voice and are illustrative. Covers are
 * catalogue photographs marked `standIn` (visual-direction § 5.7), never labelled on the page.
 */

const photo = (id: PhotoId): InsightImage => {
  const image = getKitPhoto(id, { standIn: true });
  return {
    src: image.src,
    alt: '',
    width: image.width,
    height: image.height,
    sources: image.sources,
    kind: 'photograph',
    standIn: true,
  };
};

/* The filter vocabulary: the live CMS's three groups, by its own names. */
const F = {
  saas: 'industry-saas',
  fintech: 'industry-fintech',
  commerce: 'industry-ecommerce',
  edtech: 'industry-edtech',
  zero: 'stage-0-1',
  growth: 'stage-growth',
  modernise: 'stage-modernise',
  ds: 'topic-design-system',
  proto: 'topic-prototypes',
  info: 'topic-information-design',
  ai: 'topic-ai-ux',
} as const;

const NAMES: Record<string, string> = {
  [F.saas]: 'SaaS',
  [F.fintech]: 'Fintech',
  [F.commerce]: 'eCommerce',
  [F.edtech]: 'EdTech',
  [F.zero]: '0 → 1',
  [F.growth]: 'Growth stage',
  [F.modernise]: 'Modernise & Replatform',
  [F.ds]: 'Design System',
  [F.proto]: 'High Fidelity Prototypes',
  [F.info]: 'Information Design',
  [F.ai]: 'AI UX',
};

type Extra = Partial<
  Pick<InsightResource, 'image' | 'readingTime' | 'duration' | 'event' | 'featured'>
>;

let n = 0;
function item(
  kind: InsightResourceKind,
  slug: string,
  title: string,
  description: string,
  publishedAt: string,
  filters: readonly string[],
  extra: Extra = {},
): InsightResource {
  n += 1;
  const taxonomy = filters.map((id) => ({ documentId: id, name: NAMES[id] ?? id }));
  return {
    documentId: `fixture-${kind}-${n}`,
    kind,
    title,
    slug,
    description,
    tags: taxonomy.filter((t) => t.documentId.startsWith('topic-')),
    categories: taxonomy.filter((t) => !t.documentId.startsWith('topic-')),
    filterIds: [...filters],
    publishedAt: `${publishedAt}T09:00:00.000Z`,
    ...extra,
  };
}

const ITEMS: InsightResource[] = [
  item(
    'article',
    'cpq-ux-design',
    'CPQ UX: designing configure-price-quote software sales teams will use',
    'Configuration rules that explain themselves, prices and approvals visible before submission, and revisions that keep earlier work: a practical guide with a checklist.',
    '2026-10-08',
    [F.saas, F.growth, F.info],
    { image: photo('team-table-laptops-smiling'), readingTime: '11 min read', featured: true },
  ),
  item(
    'podcast',
    'podcasts/do-ai-not-for-ai-s-sake-but-for-your-user-insights-from-eden-ai-s-ctpo',
    'Build AI for the user’s work, not for AI’s sake',
    'Samy Melaine of Eden AI explains why giving developers many AI models in one place means making the choice between them simpler, and how his engineers and designers shape each change together.',
    '2026-10-07',
    [F.saas, F.ai],
    { image: photo('studio-session-talk'), duration: '48 min' },
  ),
  item(
    'research',
    'research/where-ai-review-steps-fail',
    'Where AI review steps fail: 41 shipped products, one pattern',
    'We traced the review step in 41 AI features from suggestion to consequence. In most, the person checking had no way to take control back.',
    '2026-10-06',
    [F.saas, F.ai],
    { readingTime: '24 min read' },
  ),
  item(
    'guide',
    'guides/saas-onboarding-strategies-to-increase-customer-retention',
    'SaaS onboarding should lead each role to evidence of value',
    'Define first value separately for the buyer, the administrator and the daily user, then map each one’s route from sign-up to real work.',
    '2026-10-05',
    [F.saas, F.growth],
    { image: photo('whiteboard-pair-laptop'), readingTime: '9 min read' },
  ),
  item(
    'event',
    'events/design-systems-for-everyone-from-basics-to-advanced',
    'Design systems for everyone, from basics to advanced',
    'Our Ahmedabad meetup on design systems, running from auto-layout and design tokens to composable systems.',
    '2026-10-04',
    [F.edtech, F.zero, F.ds],
    { event: { startsAt: '2026-11-14T10:00:00.000Z', place: 'Ahmedabad' } },
  ),
  item(
    'video',
    'videos/making-product-decisions-across-evidence-and-disciplines',
    'Making product decisions across evidence and disciplines',
    'Parasharan Chari, Dhimant Trivedi and Akshay Vyas on hearing from customers, and why a much-used feature may still be a poor one.',
    '2026-10-03',
    [F.saas, F.growth],
    { image: photo('studio-workshop-presenting'), duration: '36 min' },
  ),
  item(
    'interview',
    'articles/my-experiments-with-ux-karthik-pasupathy',
    'Karthik Pasupathy on context, clarity and core functionality',
    'Fyno’s then head of marketing on how technical writing, product analytics and AI changed the way he approaches product work.',
    '2026-10-02',
    [F.fintech, F.growth, F.info],
  ),
  item(
    'article',
    'confidence-scores-dont-fix-trust-when-review-step-never',
    'Confidence scores don’t fix trust when the review step never returns control',
    'Why adding a confidence score, a warning and a review step can leave usage flat, and how to design the moment a person takes control back.',
    '2026-10-01',
    [F.saas, F.fintech, F.ai],
    { image: photo('designer-monitor-ui'), readingTime: '12 min read' },
  ),
  item(
    'article',
    'articles/building-trust-and-transparency-in-ai-first-user-interfaces',
    'AI interfaces need calibrated trust, not maximum transparency',
    'How an AI feature should show its role, its sources, its authority, its uncertainty and the way to recover, with more review as the stakes rise.',
    '2026-09-29',
    [F.saas, F.modernise, F.ai],
    { image: photo('pair-laptop-notebook'), readingTime: '10 min read' },
  ),
  item(
    'article',
    'articles/generative-ai-product-patterns-for-saas',
    'Seven generative AI product patterns for SaaS',
    'Generate, transform, retrieve, recommend, predict, orchestrate and act: what each pattern asks of the product, and the control each one needs.',
    '2026-09-26',
    [F.saas, F.ai],
    { readingTime: '14 min read' },
  ),
  item(
    'podcast',
    'podcasts/mastering-design-decisions',
    'Making product decisions across evidence and disciplines: a panel with Medkart, Contrado and Knovos',
    'Hearing from customers, why a much-used feature may still be a poor one, and releasing part of a design without losing the rest.',
    '2026-09-24',
    [F.commerce, F.growth],
    { image: photo('studio-offsite-talk'), duration: '52 min' },
  ),
  item(
    'guide',
    'guides/saas-engagement-and-subscription-decisions',
    'Define valuable behaviour before optimising SaaS engagement',
    'Work out which repeated behaviour shows a customer getting value before reaching for trials, gamification or personalisation, and diagnose why usage fell.',
    '2026-09-22',
    [F.saas, F.growth],
    { image: photo('sticky-grid-minimal'), readingTime: '8 min read' },
  ),
  item(
    'research',
    'research/design-system-adoption-survey-2026',
    'Design system adoption in 2026: why product teams keep working around the library',
    'A survey of 112 product teams on what they do when the library lacks the thing they need, and how often that request ends in a shared release.',
    '2026-09-18',
    [F.saas, F.ds],
    { readingTime: '18 min read' },
  ),
  item(
    'article',
    'when-to-hire-a-design-system-consultant',
    'When to hire a design system consultant, and what they should deliver',
    'When outside help is worth paying for, when it is the wrong call, and what a good consultant should leave your own team able to run.',
    '2026-09-15',
    [F.saas, F.ds],
    { readingTime: '10 min read' },
  ),
  item(
    'event',
    'events/product-design-and-filmmaking',
    'When a product designer moves to Bollywood',
    'A session on what product designers can learn from filmmaking: storyboards, continuity and the edit, told in the language of product design.',
    '2026-09-12',
    [F.commerce, F.modernise, F.proto],
    { event: { startsAt: '2026-10-30T13:30:00.000Z', place: 'Mumbai' } },
  ),
  item(
    'interview',
    'articles/my-experiments-with-ux-aishwarya-ashok',
    'Aishwarya Ashok on building an AI-first product experience',
    'How she took the visual collaboration product VaniHQ from idea to beta at Zoho, and why she researches where people complain.',
    '2026-09-10',
    [F.fintech, F.zero, F.ds],
  ),
  item(
    'video',
    'videos/build-ai-for-the-users-work',
    'Build AI for the user’s work, not for AI’s sake — the recording',
    '',
    '2026-09-08',
    [F.saas, F.ai],
    { image: photo('screen-over-shoulder'), duration: '48 min' },
  ),
  item(
    'guide',
    'guides/saas-does-your-app-need-a-mobile-version',
    'Does your B2B SaaS product need a mobile app?',
    'Find the moments of work that happen away from a desk and cannot wait, then choose the mobile product shape that suits them.',
    '2026-09-05',
    [F.saas, F.growth, F.proto],
    { image: photo('designer-tablet-monitor'), readingTime: '7 min read' },
  ),
  item(
    'article',
    'vibe-coded-app-production-ready',
    'I vibe-coded an app. Now what? The path from prototype to production',
    'What an AI-built app still has to answer before real users arrive: what it stores, who can see each record, what happens when a step fails and who fixes it.',
    '2026-09-02',
    [F.zero, F.proto],
    { readingTime: '13 min read' },
  ),
  item(
    'article',
    'articles/silent-ui-regression-debt',
    'Customers can finish the task and still lose confidence',
    'Four ways an interface decays between releases while completion rates look healthy, and the question to ask before the next one ships.',
    '2026-08-28',
    [F.saas, F.modernise],
    { readingTime: '9 min read' },
  ),
  item(
    'research',
    'research/legacy-modernisation-benchmark',
    'Preserve, redesign, replatform or retire: what 30 modernisation programmes chose, and what it cost them',
    'A benchmark of thirty enterprise modernisation programmes, each traced from the first audit to the release that retired the old screens.',
    '2026-08-25',
    [F.modernise, F.info],
    { readingTime: '31 min read' },
  ),
  item(
    'guide',
    'guides/how-to-use-a-ux-product-audit',
    'A product audit should end in decisions, not observations',
    'Choose the question before the method, look beyond the screens, and write each finding so a team can own it, sequence it and test it.',
    '2026-08-22',
    [F.saas, F.modernise],
    { image: photo('wireframe-wall'), readingTime: '10 min read' },
  ),
  item(
    'video',
    'videos/design-tokens-in-practice',
    'Design tokens in practice: one change, every product, in fourteen minutes',
    'A walk through one colour decision travelling from the token file to three products, recorded at our Ahmedabad meetup.',
    '2026-08-19',
    [F.edtech, F.ds],
    { duration: '14 min' },
  ),
  item(
    'interview',
    'articles/interview-head-of-design-modernisation',
    'A head of design on modernising a twenty-year-old product without losing a single customer',
    '',
    '2026-08-15',
    [F.modernise, F.saas],
  ),
  item(
    'article',
    'articles/cognitive-biases-in-ecommerce-and-saas-products',
    'Cognitive bias is a design risk, not a bag of conversion tricks',
    'Start with the bias in your own team’s reading of the data, then test a behavioural explanation before designing around it.',
    '2026-08-12',
    [F.commerce, F.zero, F.modernise],
    { readingTime: '8 min read' },
  ),
  item(
    'guide',
    'guides/marketing-automation-software-design-best-practices',
    'Design marketing automation around decisions, not dashboards',
    'Show operators who receives what, after which signal, under which rule and with whose approval, before any message goes out.',
    '2026-08-08',
    [F.edtech, F.growth, F.modernise],
    { image: photo('team-sticky-wall-bright'), readingTime: '9 min read' },
  ),
  item(
    'event',
    'events/lessons-from-designing-the-ux-for-ai-products',
    'Lessons from designing the UX for AI products, at SaaStr Annual',
    'One-to-one sessions at SaaStr on user adoption, integration and the review step in AI features.',
    '2026-08-05',
    [F.saas, F.growth, F.ai],
    { event: { startsAt: '2026-09-09T16:00:00.000Z', place: 'San Mateo, California' } },
  ),
  item(
    'article',
    'articles/design-thinking-vs-cx-vs-ux-explained',
    'UX, CX and design thinking name different things',
    'What each term covers, where they overlap, and how to tell which one is big enough to explain the problem in front of you.',
    '2026-08-01',
    [F.edtech, F.modernise, F.zero],
    { readingTime: '7 min read' },
  ),
  item(
    'video',
    'videos/figma-to-react-without-drift',
    'Figma to React without drift',
    'Keeping a React build true to the design, shown on one component from frame to pull request.',
    '2026-07-28',
    [F.saas, F.ds, F.proto],
    { image: photo('designer-desk-monitor'), duration: '22 min' },
  ),
  item(
    'guide',
    'guides/inclusive-product-design-for-older-and-disabled-people',
    'Inclusive product design for older and disabled people',
    'Pair a testable accessibility baseline with the people who meet the barriers, and remove one barrier without creating another.',
    '2026-07-24',
    [F.fintech, F.zero, F.info],
    { image: photo('colleagues-tablet-chat'), readingTime: '11 min read' },
  ),
  item(
    'article',
    'articles/design-systems-for-saas-boosting-efficiency-and-ux-consistency',
    'Make the design system useful in product decisions',
    'Follow one missing component state from a product team’s request to a shared release, and see what that journey says about the system.',
    '2026-07-20',
    [F.saas, F.zero, F.ds],
    { readingTime: '9 min read' },
  ),
  item(
    'event',
    'events/design-systems-meetup-2025',
    'Design systems meetup: tokens, theming and the second product',
    'Our second meetup, on what changes when a design system has to serve a product it was not built for.',
    '2026-07-14',
    [F.edtech, F.ds],
  ),
  item(
    'guide',
    'guides/ecommerce-product-experience-decision-guide',
    'Improve commerce by finding the broken evidence path',
    'Trace where shoppers lose confidence between discovery and delivery, and measure the whole path, returns and support included.',
    '2026-07-10',
    [F.commerce, F.growth],
    { image: photo('hands-trackpad'), readingTime: '12 min read' },
  ),
  item(
    'article',
    'articles/enterprise-ux-design-principles',
    'Enterprise UX design: principles for complex workflow software',
    'Seven principles for software people use all day: density with a reason, keyboard first, and every state a person can recover from.',
    '2026-07-06',
    [F.saas, F.modernise, F.info],
    { readingTime: '15 min read' },
  ),
  item(
    'guide',
    'guides/landing-page-design-guide-to-boost-conversions',
    'A landing page is one continuous product decision',
    'Design from the ad, email or search result that brought the visitor, through the page, to the confirmation after they act.',
    '2026-07-01',
    [F.edtech, F.growth],
    { image: photo('desk-flatlay-devices'), readingTime: '8 min read' },
  ),
  item(
    'article',
    'articles/fintech-ux-designing-for-trust-compliance-and-speed',
    'Fintech UX: designing for trust, compliance and speed',
    'Where regulation belongs in the interface, and how to make a compliant flow feel fast rather than guarded.',
    '2026-06-26',
    [F.fintech, F.ai],
    { readingTime: '12 min read' },
  ),
  item(
    'article',
    'articles/human-in-the-loop-ux-patterns',
    'What are good human-in-the-loop UX patterns?',
    '',
    '2026-06-20',
    [F.ai],
    { readingTime: '11 min read' },
  ),
  item(
    'article',
    'articles/outsource-ux-without-losing-product-knowledge',
    'How do you outsource UX design without losing product knowledge?',
    'Keep the decisions in-house, hand over the questions rather than the answers, and make every artefact readable by the next person.',
    '2026-06-14',
    [F.saas],
    { readingTime: '13 min read' },
  ),
  item(
    'article',
    'articles/supercalifragilistic-token',
    'Designsystemcomponentlibrarytokenpipelinegovernancechecklist: an unbroken title, for the stress test',
    'One token with no break opportunity, to prove every track wraps it rather than pushing the page wider.',
    '2026-06-08',
    [F.saas, F.ds],
  ),
  item(
    'article',
    'articles/saas-ux-audit-checklist',
    'SaaS UX audit checklist: 40 checks across onboarding, core workflow and billing',
    'Forty checks in the order a customer meets them, each with the evidence that settles it.',
    '2026-06-02',
    [F.saas],
    { readingTime: '14 min read' },
  ),
];

export const INSIGHTS_FIXTURE: InsightsPage = {
  documentId: 'fixture-insights',
  slug: 'insights',
  hero: {
    heading: 'Product design insights',
    description:
      'Practical writing on the problems product teams bring us: AI features people can trust, design systems teams use, ageing products and SaaS design. Start with your problem below, or browse everything by format.',
  },
  formatCards: [
    {
      id: 'articles',
      kind: 'article',
      title: 'Articles',
      description:
        'Pieces that take a position on AI inside products, design systems, prototypes and SaaS design.',
    },
    {
      id: 'guides',
      kind: 'guide',
      title: 'Guides',
      description: 'Practical walkthroughs, from SaaS onboarding to landing pages.',
      shelfHeading: 'From design to build',
    },
    {
      id: 'research',
      kind: 'research',
      title: 'Research',
      description:
        'What we found when we measured it: surveys, benchmarks and pattern studies.',
    },
    {
      id: 'podcasts',
      kind: 'podcast',
      title: 'Podcasts',
      description: 'Recorded conversations with product, engineering and design leaders.',
    },
    {
      id: 'events',
      kind: 'event',
      title: 'Events',
      description: 'Sessions we host for the design and product community.',
    },
    {
      id: 'videos',
      kind: 'video',
      title: 'Videos',
      description: 'The video recordings of our podcast conversations and talks.',
    },
    {
      id: 'interviews',
      kind: 'interview',
      title: 'Interviews',
      description: 'People who ship products, on how they work.',
    },
  ],
  collections: [
    {
      id: 'ai-product-ux',
      title: 'AI inside your product',
      description:
        'For teams adding generated answers, recommendations or automated actions to software people rely on at work.',
      items: [
        {
          id: 'c1',
          title: 'AI interfaces need calibrated trust, not maximum transparency',
          href: '/insights/articles/building-trust-and-transparency-in-ai-first-user-interfaces',
        },
        {
          id: 'c2',
          title: 'Seven generative AI product patterns for SaaS',
          href: '/insights/articles/generative-ai-product-patterns-for-saas',
        },
      ],
      related: { label: 'AI Product UX', href: ROUTES.aiProductUx, external: false },
    },
    {
      id: 'design-systems',
      title: 'Design systems',
      description:
        'Building a design system, or wondering why product teams keep working around the one you have?',
      items: [
        {
          id: 'c3',
          title: 'Make the design system useful in product decisions',
          href: '/insights/articles/design-systems-for-saas-boosting-efficiency-and-ux-consistency',
        },
        {
          id: 'c4',
          title: 'Design systems for everyone, from basics to advanced',
          href: '/insights/events/design-systems-for-everyone-from-basics-to-advanced',
        },
      ],
      related: { label: 'Design Systems', href: ROUTES.designSystems, external: false },
    },
    {
      id: 'modernisation',
      title: 'Modernising an established product',
      description:
        'Years of releases have left the product hard to change, and you need to know what to fix first.',
      items: [
        {
          id: 'c5',
          title: 'A product audit should end in decisions, not observations',
          href: '/insights/guides/how-to-use-a-ux-product-audit',
        },
        {
          id: 'c6',
          title: 'Customers can finish the task and still lose confidence',
          href: '/insights/articles/silent-ui-regression-debt',
        },
      ],
      related: {
        label: 'Product Modernisation',
        href: ROUTES.productModernisation,
        external: false,
      },
    },
    {
      id: 'saas-ux',
      title: 'SaaS product experience',
      description:
        'For SaaS teams working on quoting, engagement and where their product should run.',
      items: [
        {
          id: 'c7',
          title: 'CPQ UX: designing configure-price-quote software sales teams will use',
          href: '/insights/cpq-ux-design',
        },
        {
          id: 'c8',
          title: 'Define valuable behaviour before optimising SaaS engagement',
          href: '/insights/guides/saas-engagement-and-subscription-decisions',
        },
        {
          id: 'c9',
          title: 'Does your B2B SaaS product need a mobile app?',
          href: '/insights/guides/saas-does-your-app-need-a-mobile-version',
        },
      ],
      related: {
        label: 'B2B SaaS and workflow software',
        href: ROUTES.b2bSaasWorkflow,
        external: false,
      },
    },
  ],
  lab: {
    id: 'insights-lab',
    heading: 'Tcules Labs experiments',
    description:
      'We’re crafting AI solutions to improve user experiences, streamline processes and enhance efficiency across sectors.',
    action: { label: 'Go to the Lab', href: ROUTES.futureInterfacesLab, external: false },
  },
  resources: {
    id: 'insights-resources',
    heading: 'Everything we’ve published',
    filters: [
      {
        id: 'industry',
        label: 'Industry',
        options: [F.saas, F.fintech, F.commerce, F.edtech].map((id) => ({
          id,
          name: NAMES[id] ?? id,
          kind: 'category' as const,
        })),
      },
      {
        id: 'product',
        label: 'Product',
        options: [F.zero, F.growth, F.modernise].map((id) => ({
          id,
          name: NAMES[id] ?? id,
          kind: 'category' as const,
        })),
      },
      {
        id: 'topic',
        label: 'Topic',
        options: [F.ds, F.proto, F.info, F.ai].map((id) => ({
          id,
          name: NAMES[id] ?? id,
          kind: 'tag' as const,
        })),
      },
    ],
    items: ITEMS,
  },
  closing: {
    id: 'talk',
    heading: 'Talk to us',
    description:
      'If one of these pieces describes a problem in your own product, tell us about it.',
    action: { label: 'Tell us about it', href: ROUTES.contact, external: false },
  },
  seo: {
    title: 'Product Design Insights, Guides and Podcasts | Tcules',
    description:
      'Product design insights from Tcules: articles, guides, podcasts and events on AI inside products, design systems, modernisation and SaaS UX.',
  },
};
