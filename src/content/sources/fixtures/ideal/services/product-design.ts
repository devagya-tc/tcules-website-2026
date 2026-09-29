import type { ServiceStory } from '@/lib/service-story';
import { articlePath, auditPath, servicePath } from '@/lib/routes';

/**
 * /services/product-design, designed. Copy is the CMS's own, re-cut where a shape needed it; every
 * edit is listed in docs/service-pages-design.md § Product Design.
 */
export const productDesign: ServiceStory = {
  slug: 'product-design',
  seo: {
    title: 'Product design for B2B, workflow and AI products | Tcules',
    description:
      'Tcules connects research, product structure, workflow, interaction, prototyping and implementation in one accountable Product Design engagement.',
  },
  hero: {
    eyebrow: 'Product Design',
    title: 'A finished interface can still contain an unresolved product.',
    lead: 'Tcules takes responsibility for the product beneath the screens: who does what, which records and rules make it possible, how the experience behaves, and what the team must learn before it commits.',
    body: 'For new products, and for established B2B, workflow, data-rich and AI-enabled software where the interface shows only part of the problem.',
    actions: [
      { label: 'Start a project', href: '#enquiry' },
      { label: 'Start with a UX Product Audit', href: auditPath('ux-product-audit') },
    ],
    illustration: {
      src: '/illustrations/services/product-design.paper.svg',
      width: 962,
      height: 714,
    },
  },
  sections: [
    {
      type: 'section',
      id: 'signals',
      eyebrow: 'What the interface may be telling you',
      heading: 'The screen is often where a deeper product problem becomes visible.',
      blocks: [
        {
          kind: 'signals',
          key: 'May be',
          columns: 4,
          items: [
            {
              title: 'A confusing action',
              body: 'expressing an ownership or permission rule nobody has settled.',
            },
            {
              title: 'A slow workflow',
              body: 'protecting a real control, or compensating for a hand-off the product never modelled.',
            },
            {
              title: 'A crowded dashboard',
              body: 'trying to serve several decisions without defining any of them.',
            },
            {
              title: 'A polished AI interaction',
              body: 'hiding what the model used, what it changed, and who is accountable when it is wrong.',
            },
          ],
        },
        {
          kind: 'statement',
          before: 'A visual change may reveal a workflow, data or authority problem ',
          marked: 'that the same project must resolve.',
        },
      ],
    },
    {
      type: 'section',
      id: 'responsibility',
      eyebrow: 'What Product Design owns',
      heading: 'How one product decision moves through the work',
      lead: 'One product rule, explained, challenged, implemented and tested.',
      blocks: [
        {
          kind: 'steps',
          example: {
            label: 'Worked example · fictional',
            body: 'An operations team reschedules a job after a required input becomes unavailable. The product must preserve ownership, downstream commitments and a safe way back.',
          },
          items: [
            {
              title: 'Read the real work',
              body: 'What triggers rescheduling, who decides, who is affected, and which commitment cannot silently move.',
            },
            {
              title: 'Settle the product model',
              body: 'The job, dependency, owner and committed date — and the difference between blocked, proposed and accepted.',
            },
            {
              title: 'Design the behaviour',
              body: 'Preview affected work before confirming, name who must respond, keep the reason after the change.',
            },
            {
              title: 'Test the risky scenario',
              body: 'Conflicting jobs, limited permissions, partial updates and a mistaken change: consequence and recovery.',
            },
            {
              title: 'Keep the rule in the build',
              body: 'Interface states, service responses, notifications and history all use the same accepted rule.',
            },
          ],
        },
        {
          kind: 'nudge',
          body: 'A workflow that keeps raising questions about rules, roles or recovery? Examine that slice before the team commits to more screens.',
          action: { label: 'Start a project', href: '#enquiry' },
        },
        {
          kind: 'links',
          items: [
            {
              label: 'Scope versus approach: UX, CX and design thinking',
              href: articlePath('design-thinking-vs-cx-vs-ux-explained'),
            },
          ],
        },
        {
          kind: 'slot',
          slot: {
            kind: 'illustration',
            ratio: '16/9',
            brief:
              'The reschedule, drawn in UI shorthand: one job tile (peridot) moving from a blocked slot to a proposed one, three dependent tiles previewed in dashed outline, and an owner seat that has to respond. Wide, not square — it sits under a horizontal sequence.',
          },
        },
      ],
    },
    {
      type: 'section',
      id: 'what-you-receive',
      heading: 'What you receive',
      lead: 'Artefacts the team keeps using after the engagement ends — not a deck that explains them.',
      arrangement: 'beside',
      blocks: [
        {
          kind: 'ledger',
          columns: 1,
          marker: 'icon',
          items: [
            {
              icon: 'widget',
              title: 'Product model',
              body: 'Objects, roles, rules, states, authority, exceptions, and the decisions the product must support.',
            },
            {
              icon: 'document-text',
              title: 'Research record',
              body: 'Questions, sources, observations, interpretations, alternative explanations, and what changed as a result.',
            },
            {
              icon: 'ruler-pen',
              title: 'Interaction specification',
              body: 'Real content, responsive behaviour, permissions, loading, partial success, error, undo and recovery around the approved screens.',
            },
            {
              icon: 'monitor',
              title: 'Prototype and evaluation',
              body: 'The smallest credible representation of the risky question, with its scenarios and acceptance evidence.',
            },
            {
              icon: 'code',
              title: 'Implementation trace',
              body: 'The consequential rule linked to components, services, tests and release checks, when the scope reaches code.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'specialist-services',
      eyebrow: 'Go narrower when the problem is located',
      heading: 'Specialist Product Design services',
      blocks: [
        {
          kind: 'router',
          items: [
            {
              when: 'The open question is about people, context, current behaviour, or an assumption that could change direction.',
              route: {
                label: 'UX Research',
                href: servicePath('product-design/ux-research'),
              },
            },
            {
              when: 'Records, roles, state, permissions, navigation and the operating work no longer agree.',
              route: {
                label: 'Information Architecture & Workflow Design',
                href: servicePath('product-design/information-architecture-workflow-design'),
              },
            },
            {
              when: 'The rule is understood, but its behaviour, hierarchy, states and responsive form are not.',
              route: {
                label: 'Interaction & UI Design',
                href: servicePath('product-design/interaction-ui-design'),
              },
            },
            {
              when: 'Someone must notice, compare, interpret and act — with clear definitions, freshness, uncertainty and source.',
              route: {
                label: 'Data Visualisation',
                href: servicePath('product-design/data-visualisation'),
              },
            },
            {
              when: 'The next commitment depends on evidence a diagram or a static screen cannot provide.',
              route: {
                label: 'Prototyping & Usability Testing',
                href: servicePath('product-design/prototyping-usability-testing'),
              },
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'work',
      eyebrow: 'Connected product decisions',
      heading: 'Relevant Product Design work',
      blocks: [
        {
          kind: 'cases',
          items: [
            {
              slug: 'doodle-case-study-automating-enterprise-meeting-scheduling',
              client: 'Doodle · Enterprise scheduling',
              title: 'Priority and bookability, modelled before they were drawn',
              body: 'Meeting type, organisational priority, tentative availability and bookability confidence, connected in one scheduling model.',
            },
            {
              slug: 'saas-ux-ui-case-study-research-and-object-oriented-ux-for-staffing-agencies-software',
              client: 'Scissors · Staffing software',
              title: 'Candidates, pools, jobs and organisations as objects',
              body: 'Research and heuristic review behind an object-oriented redesign of the whole product.',
            },
          ],
          note: 'Each case establishes the research, modelling and design responsibility it names. Implementation and outcome are bounded by its own record.',
        },
      ],
    },
    {
      type: 'section',
      id: 'client-view',
      heading: 'A client’s view of the working relationship',
      surface: 'tint',
      blocks: [
        {
          kind: 'proof',
          quote: {
            text: 'The workflow between our teams was seamless. I found the team at Tcules to be knowledgeable, friendly and research oriented.',
            name: 'Ashok Mohanty',
            company: 'Auxentios',
          },
          case: {
            slug: 'consumer-grade-ux-in-enterprise-saas-a-case-study-on-mvp-design-for-cpq-software',
            client: 'Auxentios · Industrial CPQ',
            title: 'A quotation model from eight specialist interviews',
            body: 'Qualitative research across specialist roles, carried into a product model and component-led interface work.',
          },
          portrait: {
            kind: 'portrait',
            ratio: '1/1',
            brief:
              'Ashok Mohanty, 1:1, shot square (ch05 §3). And his role — the quote carries none.',
          },
        },
      ],
    },
    {
      type: 'section',
      id: 'who-is-involved',
      heading: 'Who is involved',
      lead: 'The work runs on real access and on people who can decide.',
      blocks: [
        {
          kind: 'fit',
          yes: {
            heading: 'What the work needs from you',
            items: [
              'Realistic access to the product',
              'Relevant research or operating material',
              'Time with people who understand the system',
              'A client-side owner who can resolve consequential choices and technical constraints',
            ],
          },
          no: {
            heading: 'Not the right service when',
            items: [
              'The brief allows visual styling only, and forbids discussing product behaviour',
              'The team needs a regulated specialist opinion Tcules does not provide',
              'No realistic product, user, data or implementation context can be shared',
              'The purchase is mainly low-cost production capacity',
            ],
          },
        },
      ],
    },
  ],
  close: {
    heading: 'Share the product decision that needs settling',
    body: 'The decision, the roles it affects and the evidence you already have. A rough brief is enough.',
    points: [
      { label: 'A reply within one business day' },
      { label: 'A rough brief is enough', detail: 'We ask for what is missing.' },
    ],
    note: 'Do not include credentials, regulated records or confidential source material.',
  },
};
