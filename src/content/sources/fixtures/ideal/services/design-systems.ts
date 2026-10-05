import type { ServiceStory } from '@/lib/service-story';
import { articlePath, auditPath, ROUTES, servicePath } from '@/lib/routes';

/** /services/design-systems, designed. Edits: docs/service-pages-design.md § Design Systems. */
export const designSystems: ServiceStory = {
  slug: 'design-systems',
  name: 'Design Systems',
  seo: {
    title: 'Design system strategy, implementation and adoption | Tcules',
    description:
      'Build or repair shared product infrastructure across semantics, tokens, Figma, code, documentation, contribution and adoption.',
  },
  hero: {
    title: 'A design system must earn its place in the work',
    lead: 'The goal is not a larger library. It is a dependable answer to product decisions that several teams would otherwise keep making alone.',
    actions: [
      { label: 'Start a project', href: '#enquiry' },
      { label: 'Request free audit', href: auditPath('design-system-audit') },
    ],
    illustration: {
      src: '/illustrations/services/design-systems.paper.svg',
      width: 681,
      height: 569,
    },
  },
  sections: [
    {
      type: 'section',
      id: 'library-is-one-representation',
      eyebrow: 'Why libraries fail as infrastructure',
      heading: 'A component library is only one representation of the system',
      lead: 'Tcules helps teams define, build and operate the whole system, from product semantics and tokens to Figma, code, release and adoption. A system earns use only when its route is easier than the workaround.',
      blocks: [
        {
          kind: 'signals',
          columns: 4,
          items: [
            {
              title: 'One name, two behaviours',
              body: 'The same component describes different behaviour in Figma and in code.',
            },
            {
              title: 'A missing state',
              body: 'Product teams need a state the library does not cover.',
            },
            {
              title: 'Contribution is too slow',
              body: 'The shared route cannot keep up with release work.',
            },
            {
              title: 'A version nobody runs',
              body: 'A new release exists while most products stay on an older fork.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'six-questions',
      heading: 'Six questions the system has to answer',
      arrangement: 'beside',
      blocks: [
        {
          kind: 'ledger',
          columns: 1,
          marker: 'number',
          items: [
            { title: 'Which recurring product decisions should it settle?', body: '' },
            { title: 'Which variations are legitimate, rather than drift?', body: '' },
            { title: 'Which representation governs each concern?', body: '' },
            { title: 'What happens when the shared answer does not fit?', body: '' },
            { title: 'Who owns the change, and the migration?', body: '' },
            { title: 'What evidence shows use inside released products?', body: '' },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'five-parts',
      heading: 'Five parts must work as one system',
      lead: 'Four of them are the system. The fifth decides whether the other four stay current.',
      blocks: [
        {
          kind: 'parts',
          items: [
            {
              icon: 'layers',
              name: 'Foundations',
              body: 'Semantic tokens, typography, layout, motion, accessibility and content conventions.',
            },
            {
              icon: 'widget',
              name: 'Components and patterns',
              body: 'Anatomy, properties, states, content and interaction contracts, and how they compose around recurring work.',
            },
            {
              icon: 'ruler-pen',
              name: 'Design assets',
              body: 'Libraries, examples and templates, so designers use shared decisions without rebuilding them.',
            },
            {
              icon: 'code',
              name: 'Code and documentation',
              body: 'Runtime components, APIs, stories, tests and guidance: implementable, and reviewable.',
            },
          ],
          frame: {
            icon: 'refresh',
            name: 'Operating model',
            body: 'Ownership, contribution, exceptions, release, deprecation, migration and adoption.',
          },
        },
        {
          kind: 'note',
          label: 'Any one part alone',
          html: '<ul><li>A design-only library cannot govern runtime behaviour.</li><li>A code library without semantics makes local composition the place meaning diverges.</li><li>Documentation without a change path becomes a record of decisions nobody can maintain.</li></ul>',
        },
      ],
    },
    {
      type: 'section',
      id: 'one-decision',
      eyebrow: 'A representative example',
      heading: 'One shared decision must survive every representation',
      lead: 'A process status, Partly complete, needed by three products. A change is complete only when every representation — and every product consuming it — has a governed path.',
      blocks: [
        {
          kind: 'table',
          keyColumn: 'Representation',
          columns: ['What must stay true', 'When it changes alone'],
          rows: [
            {
              header: 'Semantic definition',
              cells: [
                'Some required work is complete; some remains actionable.',
                'Teams use the status for unrelated partial states.',
              ],
            },
            {
              header: 'Token and visual language',
              cells: [
                'The status is distinguishable without colour alone.',
                'Its appearance implies warning or success, inconsistently.',
              ],
            },
            {
              header: 'Figma component',
              cells: [
                'Properties cover label, detail, action and assistive text.',
                'Designers detach, or simulate the missing behaviour.',
              ],
            },
            {
              header: 'Runtime component',
              cells: [
                'API and state expose the same meaning and actions.',
                'Code accepts combinations the design contract forbids.',
              ],
            },
            {
              header: 'Documentation and tests',
              cells: [
                'Usage, non-usage, keyboard and content cases are explicit.',
                'Consumers infer behaviour from one happy-path story.',
              ],
            },
            {
              header: 'Release and migration',
              cells: [
                'Consuming products know the version and the change required.',
                'Publication is mistaken for adoption.',
              ],
            },
          ],
        },
        {
          kind: 'note',
          label: 'Scope',
          html: '<p>A representative system example, not a client artefact.</p>',
        },
      ],
    },
    {
      type: 'section',
      id: 'choose-the-responsibility',
      eyebrow: 'Start from the condition',
      heading: 'Choose the responsibility from the system condition',
      blocks: [
        {
          kind: 'router',
          items: [
            {
              when: 'Teams disagree about what should become shared. It settles scope, authority, ownership and investment.',
              route: {
                label: 'Design System Strategy',
                href: servicePath('design-systems/design-system-strategy'),
              },
            },
            {
              when: 'The shared scope is agreed and needs a maintained system. It settles foundations, components, code, documentation, release.',
              route: {
                label: 'Design System Implementation',
                href: servicePath('design-systems/design-system-implementation'),
              },
            },
            {
              when: 'Figma and code describe different contracts. It settles source authority, mapping and change flow.',
              route: {
                label: 'Figma and Storybook Alignment',
                href: servicePath('design-systems/figma-storybook-alignment'),
              },
            },
            {
              when: 'Teams bypass, fork, or stay on old versions. It settles contribution, exceptions, release and evidence of use.',
              route: {
                label: 'Governance and Adoption',
                href: servicePath('design-systems/governance-adoption'),
              },
            },
          ],
          also: {
            when: 'The cause of drift is disputed? Diagnose it before further investment.',
            link: { label: 'Design System Audit', href: auditPath('design-system-audit') },
          },
        },
      ],
    },
    {
      type: 'section',
      id: 'scope',
      heading: 'Who owns what once the system ships',
      lead: 'Design Systems owns the shared system as a maintained product. Design Engineering owns product decisions embodied in running frontend work. One engagement can hold both; they stay distinct responsibilities.',
      blocks: [
        {
          kind: 'flow',
          actor: 'Tcules',
          stages: [
            {
              label: 'Assess',
              items: ['System assessment', 'Investment scope', 'Product semantics'],
            },
            {
              label: 'Build',
              items: [
                'Foundations and components',
                'Figma architecture',
                'Coded components',
                'Storybook and documentation',
              ],
            },
            {
              label: 'Operate',
              items: ['Contribution', 'Release and migration', 'Adoption', 'Implementation QA'],
            },
          ],
          throughout: {
            label: 'Product teams keep, throughout',
            items: [
              'Product-specific composition',
              'User evidence',
              'Accessibility of what they release',
              'Decision and release authority',
            ],
          },
        },
      ],
    },
    {
      type: 'section',
      id: 'evidence',
      heading: 'Evidence of design-system practice',
      blocks: [
        {
          kind: 'cases',
          items: [
            {
              slug: 'consumer-grade-ux-in-enterprise-saas-a-case-study-on-mvp-design-for-cpq-software',
              client: 'Auxentios · Industrial CPQ',
              title: 'A visual system built with the MVP',
              body: 'Components, tokens, guidelines and layout rules, from domain research and eight qualitative interviews.',
            },
            {
              slug: 'doodle-case-study-automating-enterprise-meeting-scheduling',
              client: 'Doodle · Enterprise scheduling',
              title: 'New UI inside an existing system',
              body: 'Bounded interface work using existing design-system components, and adding the ones it needed.',
            },
          ],
          note: 'Neither record establishes coded implementation or organisation-wide adoption. Matter, Tcules’ own open-source system, demonstrates foundations, components and design-to-development intent — not client adoption or coded parity.',
        },
      ],
    },
    {
      type: 'section',
      id: 'ai',
      eyebrow: 'AI-generated interfaces',
      heading: 'Explicit contracts matter more when code is generated',
      lead: 'Faster generation raises the cost of unclear semantics: an ambiguous rule is repeated across more surfaces, sooner.',
      blocks: [
        {
          kind: 'flow',
          stages: [
            {
              label: 'Better context than a screenshot',
              items: [
                'Tokens',
                'Semantic component names',
                'Typed properties',
                'Examples',
                'Tests',
                'Accessibility rules',
              ],
            },
            {
              label: 'Still accountable review',
              items: [
                'Product-specific composition',
                'Real content and exceptional state',
                'Accessibility',
                'Release acceptance',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'questions',
      heading: 'Questions teams ask first',
      arrangement: 'beside',
      blocks: [
        {
          kind: 'faq',
          items: [
            {
              question: 'How should design-system adoption be measured?',
              answerHtml:
                '<p>By whether the system changes released product work, not by how many components are published. Useful evidence starts with the product and version consuming each shared asset, and shows whether migrations complete, why teams fork or ask for exceptions, how contributions reach a decision, and whether repeated defects or accessibility problems decline. Tcules does not substitute a universal adoption benchmark for your own operating goals.</p>',
            },
            {
              question: 'Where do we start?',
              answerHtml:
                '<p>With a decision several teams keep remaking, the Figma and code objects that represent it, and what a product team does when the shared answer does not fit. That is enough to choose the first responsibility: diagnose when the cause of drift is unclear, set strategy when scope or ownership is disputed, implement when the contract is ready, align when design and code disagree, govern when contribution or adoption is failing.</p>',
            },
            {
              question: 'Can a Figma library be the first product?',
              answerHtml:
                '<p>Yes, when the immediate need is visual guidance and its limits are explicit. Reusable runtime behaviour also needs code, states, tests, documentation and a release path. Either way, a named client-side owner keeps decision and release authority after delivery.</p>',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'go-deeper',
      eyebrow: 'Go deeper',
      heading: 'Beyond the library',
      blocks: [
        {
          kind: 'resources',
          items: [
            {
              type: 'Article',
              title: 'Design systems for SaaS',
              body: 'The adoption and operating questions a component library does not answer.',
              href: articlePath(
                'design-systems-for-saas-boosting-efficiency-and-ux-consistency',
              ),
              cta: 'Read the article',
            },
            {
              type: 'Open source',
              title: 'Matter, the Tcules design system',
              body: 'Foundations and components, published as a Figma Community Edition.',
              href: ROUTES.matterDesignSystem,
              cta: 'See Matter',
            },
          ],
        },
      ],
    },
  ],
  close: {
    heading: 'Start with the part of the system teams keep working around',
    body: 'The decision, component family or adoption path teams keep working around. A rough brief is enough.',
    points: [
      {
        label: 'Send the decision teams keep remaking',
        detail: 'One component family is enough.',
      },
      {
        label: 'A reply within one business day',
        detail: 'With the first scope it points to.',
      },
    ],
    note: 'Do not include credentials, regulated records or confidential source material.',
  },
};
