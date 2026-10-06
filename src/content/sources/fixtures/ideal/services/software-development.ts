import type { ServiceStory } from '@/lib/service-story';
import { ROUTES, servicePath } from '@/lib/routes';

/** /services/software-development, designed. Edits: docs/service-pages-design.md § Software Development. */
export const softwareDevelopment: ServiceStory = {
  slug: 'software-development',
  name: 'Design-led Software Development',
  seo: {
    title: 'Design-led Software Development | Tcules',
    description:
      'Design and build running software with product decisions accountable through frontend, backend, APIs, integrations, testing, release and continuing change.',
  },
  hero: {
    title: 'Software development, led by product design',
    lead: 'Tcules builds software where product behaviour, interaction and implementation need one accountable delivery path.',
    actions: [{ label: 'Start a project', href: '#enquiry' }],
    illustration: {
      src: '/illustrations/services/software-development.paper.svg',
      width: 714,
      height: 610,
    },
    tags: [
      'Frontend',
      'Backend',
      'APIs',
      'Integrations',
      'AI functionality',
      'Mobile',
      'QA',
      'Deployment',
      'Evolution',
    ],
  },
  /* Photographs (visual-direction § 5.5 to § 5.7): a warm-family page. The stand-in pool is in order
     of preference, studio first, and is drawn from the rest of the catalogue (§ 5.6): no stock photo
     that § 5.6 gives any page's B, I, K or aside slot (RESERVED_STOCK in src/lib/photos.ts), and none
     of this page's own slot photos. That is enforced, not just authored: the template seeds the page's
     used set with its slot photos and pickStandIn refuses the reserved ones. */
  photos: {
    family: 'warm',
    standIns: [
      'studio-whiteboard-crit',
      'studio-sticky-board-ux',
      'studio-team-holi',
      'hand-mouse-detail',
      'workshop-brick-room',
      'hands-trackpad',
    ],
  },
  sections: [
    {
      type: 'section',
      id: 'what-changes',
      eyebrow: 'What design-led development changes',
      heading: 'Engineering receives the decisions, not only the screens',
      lead: 'Product Design stays the centre of gravity and engineering carries its decisions into running software. The delivery record keeps them connected, so edge states are implemented, not guessed.',
      blocks: [
        {
          kind: 'thread',
          items: [
            { title: 'Product decision', body: 'And its consequence for the user.' },
            {
              title: 'Role, rule and state model',
              body: 'What may happen, to whom, and when.',
            },
            { title: 'Interaction', body: 'And its responsive behaviour.' },
            { title: 'Data and API contract', body: 'What each part owes the others.' },
            {
              title: 'Implementation constraint',
              body: 'Recorded where it changes the design.',
            },
            { title: 'Acceptance and release', body: 'The evidence it works, and shipped.' },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'responsibility-options',
      heading: 'Three ways to hand over responsibility',
      blocks: [
        {
          kind: 'ledger',
          columns: 3,
          marker: 'number',
          items: [
            {
              title: 'Build a product or major capability',
              body: 'Tcules owns product definition through implementation for an agreed scope, with your domain, product and technology leadership.',
            },
            {
              title: 'Deliver one technical surface',
              body: 'Frontend, backend, API, integration, AI or mobile responsibility, bounded inside your existing architecture.',
            },
            {
              title: 'Continue an existing product',
              body: 'Maintenance and product evolution after launch, under project-specific terms, priorities and support.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'specialist-routes',
      eyebrow: 'Go to the part that binds',
      heading: 'Specialist software services',
      blocks: [
        {
          kind: 'router',
          items: [
            {
              when: 'A SaaS product or web application is the binding part.',
              route: {
                label: 'SaaS and Web Application Development',
                href: servicePath('software-development/saas-web-app-development'),
              },
            },
            {
              when: 'The model, its data and its interaction are the product.',
              route: {
                label: 'AI Product Engineering',
                href: servicePath('software-development/ai-product-engineering'),
              },
            },
            {
              when: 'The interface layer carries the risk.',
              route: {
                label: 'Frontend Development',
                href: servicePath('software-development/frontend-development'),
              },
            },
            {
              when: 'Services, data and integrations carry it.',
              route: {
                label: 'Backend and API Development',
                href: servicePath('software-development/backend-api-development'),
              },
            },
            {
              when: 'It has to run on a phone.',
              route: {
                label: 'Mobile Application Development',
                href: servicePath('software-development/mobile-app-development'),
              },
            },
            {
              when: 'The product has launched and has to keep changing.',
              route: {
                label: 'Product Maintenance and Evolution',
                href: servicePath('software-development/product-maintenance'),
              },
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'release-slice',
      heading: 'A release is a complete product slice',
      lead: 'A credible release connects a user condition to the records, rules, interfaces and operations that complete it. Organised only by layer, every team can be locally complete while the product path stays unusable.',
      blocks: [
        {
          kind: 'slice',
          layers: ['Interface', 'Services', 'Integrations', 'AI service', 'Data'],
          views: {
            layer: {
              title: 'Organised by layer',
              note: 'Each team builds half its layer, each on different paths. No path has every piece, so nothing a user can do works yet, and nothing can ship.',
            },
            slice: {
              title: 'Organised by release',
              note: 'The same amount of work, with every layer building the same paths. Two things a user can do work end to end, and ship.',
            },
          },
          legend: {
            built: 'Built',
            missing: 'Not built yet',
            path: 'Path',
            works: 'Works end to end',
          },
          levelsLabel: 'A release is accepted at three levels',
          levels: [
            {
              icon: 'user',
              title: 'Product behaviour',
              body: 'The intended role can complete the work, and recover it.',
            },
            {
              icon: 'database',
              title: 'System behaviour',
              body: 'Data, permissions, events and integrations stay coherent.',
            },
            {
              icon: 'server',
              title: 'Release behaviour',
              body: 'The team can deploy, observe, support and change the capability.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'delivery-trace',
      eyebrow: 'Software delivery trace',
      heading: 'Every stage cites the one before it',
      lead: 'Requirements cite product decisions. Acceptance covers behaviour and implementation. What production shows enters the next decision.',
      blocks: [
        {
          kind: 'thread',
          items: [
            { title: 'Requirement' },
            { title: 'Decision owner' },
            { title: 'Design state' },
            { title: 'Technical contract' },
            { title: 'Implementation' },
            { title: 'Automated and manual acceptance' },
            { title: 'Deployment' },
            { title: 'Observation' },
            { title: 'Change' },
          ],
          loop: 'Production observation returns to the next product decision.',
        },
      ],
    },
    {
      type: 'section',
      id: 'ownership',
      heading: 'Ownership and handover are delivery decisions',
      lead: 'Client access should never depend on one person’s memory. The proposal names each of these before work starts, and says whether the work ends at handover or continues into monitoring, fixes or planned change.',
      blocks: [
        {
          kind: 'ledger',
          columns: 3,
          marker: 'icon',
          items: [
            {
              icon: 'key',
              title: 'Repository and environment access',
              body: 'Held by the client from the start.',
            },
            { icon: 'lock', title: 'Credential custody', body: 'Named, and never implicit.' },
            { icon: 'server', title: 'Deployment ownership', body: 'Who ships, and who can.' },
            {
              icon: 'notebook',
              title: 'Documentation',
              body: 'Enough to continue without us.',
            },
            {
              icon: 'shield-check',
              title: 'Third-party licences',
              body: 'Constraints visible before a choice is accepted.',
            },
            {
              icon: 'flag',
              title: 'Post-launch handover',
              body: 'Or the terms of continuing.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'ai',
      eyebrow: 'AI-assisted engineering',
      heading: 'Production responsibility does not move to the model',
      lead: 'Versatility matters more as frameworks change. Accountability does not.',
      blocks: [
        {
          kind: 'flow',
          stages: [
            {
              label: 'AI accelerates',
              items: [
                'Architecture exploration',
                'Implementation',
                'Test generation',
                'Documentation',
              ],
            },
            {
              label: 'Tcules reviews it against',
              items: [
                'The product and system model',
                'Security and data requirements',
                'Coding standards',
                'Acceptance',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'evidence',
      heading: 'Evidence of implemented responsibility',
      blocks: [
        {
          kind: 'cases',
          items: [
            {
              slug: 'ai-native-building-energy-product-connectx',
              client: 'ConnectX · Integrated product and software',
              title: 'AI architecture, scenario modelling and a hybrid workspace',
              body: 'A coded demonstration connecting all three, for a bounded engagement.',
            },
            {
              slug: 'legacy-saas-modernisation-information-architecture',
              client: 'Benchmark Gensuite · Feasibility in code',
              title: 'Coded prototypes during modernisation',
              body: 'Used to test feasibility while the direction could still change.',
            },
            {
              slug: 'redesigning-for-a-shopify-website-ux-design',
              client: 'GT Tools · Commerce',
              title: 'Web design and development, end to end',
              body: 'A historical commerce case: bounded design and development.',
            },
          ],
          note: 'Each case establishes only the responsibility stated in its record. ConnectX is not a production deployment claim.',
        },
      ],
    },
    {
      type: 'section',
      id: 'questions',
      heading: 'Before you sign',
      arrangement: 'beside',
      blocks: [
        {
          kind: 'faq',
          items: [
            {
              question: 'Will we control the code and delivery assets?',
              answerHtml:
                '<p>Yes, for the client-controlled repositories, credentials and deployment assets defined in the delivery scope — and continuously, not only at a final handover. The signed agreement states legal ownership, third-party licences, pre-existing materials and any managed-service dependency. If an asset cannot be transferred or independently controlled, that constraint is visible before the implementation choice is accepted.</p>',
            },
            {
              question: 'Does Tcules run infrastructure or provide an SLA?',
              answerHtml:
                '<p>Tcules configures and manages the infrastructure the agreed product scope needs. It is not a standalone managed-cloud, enterprise-infrastructure, security-operations or penetration-testing provider. Performance, load and security testing are scoped explicitly or delivered through qualified partners, and no universal SLA is implied.</p>',
            },
            {
              question: 'Where does accessibility acceptance come from?',
              answerHtml:
                '<p>From a real workflow, not a checklist alone: acceptance connects the standard to what the intended role has to complete. The guide to inclusive product design, below, covers that connection.</p>',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'go-deeper',
      eyebrow: 'Go deeper',
      heading: 'Acceptance and method',
      blocks: [
        {
          kind: 'resources',
          items: [
            {
              type: 'Guide',
              title: 'Inclusive product design',
              body: 'Connecting accessibility standards to a real workflow, which is where acceptance comes from.',
              href: `${ROUTES.guides}/inclusive-product-design-for-older-and-disabled-people`,
              cta: 'Read the guide',
            },
            {
              type: 'Method',
              title: 'How we work',
              body: 'How design and engineering stay in one delivery path, from brief to release.',
              href: ROUTES.howWeWork,
              cta: 'See how we work',
            },
          ],
        },
      ],
    },
  ],
  close: {
    heading: 'Start with the product slice that needs to ship',
    body: 'The slice, its users, the system constraints and the release outcome. A rough brief is enough.',
    points: [
      {
        label: 'Send the slice that needs to ship',
        detail: 'Its users, constraints and release outcome.',
      },
      {
        label: 'A reply within one business day',
        detail: 'With the responsibility it points to.',
      },
    ],
    note: 'Do not include credentials, regulated records or confidential source material.',
  },
};
