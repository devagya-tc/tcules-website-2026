import type { ServiceStory } from '@/lib/service-story';
import { articlePath, auditPath, ROUTES, servicePath } from '@/lib/routes';

import { CLUTCH_RATING } from '../../ratings';

/**
 * /services/product-design, designed. Copy is the CMS's own, re-cut where a shape needed it; every
 * edit is listed in docs/service-pages-design.md § Product Design.
 */
export const productDesign: ServiceStory = {
  slug: 'product-design',
  name: 'Product Design',
  seo: {
    title: 'Product design for B2B, workflow and AI products | Tcules',
    description:
      'Tcules connects research, product structure, workflow, interaction, prototyping and implementation in one accountable Product Design engagement.',
  },
  hero: {
    title: 'Finished screens can hide an unresolved product.',
    lead: 'Tcules takes responsibility for the product beneath the screens: who does what, the records and rules behind it, how it behaves, and what to learn first.',
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
  /* Photographs (visual-direction § 5.5, § 5.6): a warm-family page. The stand-in pool is in order of
     preference, studio first, and leaves out this page's own § 5.6 picks so no photo appears twice. */
  photos: {
    family: 'warm',
    standIns: [
      'studio-whiteboard-crit',
      'hand-mouse-detail',
      'workshop-brick-room',
      'board-review-backs',
      'workshop-whiteboard-lounge',
      'office-calm-interior',
      'whiteboard-two-hands',
    ],
  },
  sections: [
    {
      type: 'section',
      id: 'signals',
      eyebrow: 'What the interface may be telling you',
      heading: 'The screen is often where a deeper product problem becomes visible.',
      lead: 'For new products and for established B2B, workflow, data-rich and AI-enabled software, where a visual change may reveal a workflow, data or authority problem.',
      blocks: [
        {
          kind: 'signals',
          columns: 4,
          items: [
            {
              title: 'A confusing action',
              body: 'May be expressing an ownership or permission rule nobody has settled.',
            },
            {
              title: 'A slow workflow',
              body: 'May be protecting a real control, or compensating for a hand-off the product never modelled.',
            },
            {
              title: 'A crowded dashboard',
              body: 'May be trying to serve several decisions without defining any of them.',
            },
            {
              title: 'A polished AI interaction',
              body: 'May be hiding what the model used, what it changed, and who is accountable when it is wrong.',
            },
          ],
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
          kind: 'slot',
          slot: {
            kind: 'illustration',
            ratio: '16/9',
            message:
              'Moving one job is never only moving one job. Before anyone confirms the change, the product has to show what else moves with it and who has to agree.',
            shows:
              'The worked example as the product would present it: the job that cannot go ahead because an input is missing, the new date proposed for it, the three pieces of work that depend on it and would move too, and the person who has to approve before it happens.',
            placement:
              'Under the five steps, closing the section before the offer band, so the reader sees the decision the steps walk through before being asked to act on it. Wide, because it follows a list.',
          },
        },
      ],
    },
    {
      type: 'offer',
      id: 'examine-the-slice',
      eyebrow: 'Recognise the workflow?',
      heading: 'A workflow that keeps raising questions about rules, roles or recovery?',
      body: 'Examine that slice before the team commits to more screens.',
      /* NEW COPY — what the first piece of work returns, so the offer says what the reader gets. */
      points: [
        {
          label: 'The workflow, walked through',
          detail: 'With the people who run it, on real cases.',
        },
        {
          label: 'The rules it depends on',
          detail: 'Who decides, what state things are in, and the way back.',
        },
        {
          label: 'What to design first',
          detail: 'And what can wait until the rule is settled.',
        },
      ],
      actions: [
        { label: 'Start a project', href: '#enquiry' },
        { label: 'Start with a UX Product Audit', href: auditPath('ux-product-audit') },
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
          also: {
            when: 'You can see the problem but not yet where it sits: research, model, behaviour or evidence.',
            link: { label: 'UX Product Audit', href: auditPath('ux-product-audit') },
          },
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
            /* STAND-IN. The brand chapter's stand-in portrait (ch05 §3), so the layout can be judged
               with a photograph in it. It is not Ashok Mohanty; the real 1:1 portrait is a content ask
               (docs/service-pages-design.md § 3) and must replace this before any page ships. */
            portrait: {
              src: '/design/media/photograph-portrait-square.png',
              width: 204,
              height: 204,
            },
          },
          rating: CLUTCH_RATING,
          case: {
            slug: 'consumer-grade-ux-in-enterprise-saas-a-case-study-on-mvp-design-for-cpq-software',
            client: 'Auxentios · Industrial CPQ',
            title: 'A quotation model from eight specialist interviews',
            body: 'Qualitative research across specialist roles, carried into a product model and component-led interface work.',
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
    {
      type: 'section',
      id: 'go-deeper',
      eyebrow: 'Go deeper',
      heading: 'Read before you brief',
      blocks: [
        {
          kind: 'resources',
          items: [
            {
              type: 'Article',
              title: 'Design thinking vs CX vs UX',
              body: 'Separates the scope of the experience from the approach used to investigate it.',
              href: articlePath('design-thinking-vs-cx-vs-ux-explained'),
              cta: 'Read the article',
            },
            {
              type: 'Method',
              title: 'How we work',
              body: 'How a Product Design engagement runs, from the first question to the build.',
              href: ROUTES.howWeWork,
              cta: 'See how we work',
            },
          ],
        },
      ],
    },
  ],
  close: {
    heading: 'Share the product decision that needs settling',
    body: 'The decision, the roles it affects and the evidence you already have. A rough brief is enough.',
    points: [
      { label: 'Send the decision and what you know', detail: 'A rough brief is enough.' },
      {
        label: 'A reply within one business day',
        detail: 'With the questions we need answered.',
      },
    ],
    note: 'Do not include credentials, regulated records or confidential source material.',
  },
};
