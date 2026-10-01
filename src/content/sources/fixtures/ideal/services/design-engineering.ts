import type { ServiceStory } from '@/lib/service-story';
import { auditPath, glossaryPath, servicePath } from '@/lib/routes';

/** /services/design-engineering, designed. Edits: docs/service-pages-design.md § Design Engineering. */
export const designEngineering: ServiceStory = {
  slug: 'design-engineering',
  seo: {
    title: 'Design engineering from intent to production | Tcules',
    description:
      'Use coded prototypes, design-to-code practice, frontend systems and implementation QA to keep product intent alive in software.',
  },
  hero: {
    eyebrow: 'Design Engineering',
    title: 'Keep product intent alive when the work becomes software',
    lead: 'A design decision can be persuasive in a prototype and still weaken on the way into software.',
    body: 'Design Engineering keeps product thinking and frontend reasoning in one responsibility. Tcules uses it to create coded evidence before a roadmap commits, implement shared frontend systems, and check the running product still carries the intended behaviour.',
    actions: [{ label: 'Start a project', href: '#enquiry' }],
    illustration: {
      src: '/illustrations/services/design-engineering.paper.svg',
      width: 737,
      height: 560,
    },
  },
  sections: [
    {
      type: 'section',
      id: 'pressures',
      eyebrow: 'What pushes on a design in code',
      heading: 'Five pressures a static screen never meets',
      blocks: [
        {
          kind: 'signals',
          columns: 5,
          items: [
            {
              icon: 'database',
              title: 'Real data',
              body: 'expands past the layout it was drawn for.',
            },
            { icon: 'lock', title: 'Permissions', body: 'remove actions the design assumed.' },
            {
              icon: 'clock-circle',
              title: 'Latency',
              body: 'creates states between the ones designed.',
            },
            { icon: 'smartphone', title: 'Narrow screens', body: 'change the reading order.' },
            {
              icon: 'code',
              title: 'Component APIs',
              body: 'make some behaviour easier to build than the right one.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'code-answers',
      heading: 'Code is sometimes the fastest way to answer a design question',
      lead: 'Static screens are good evidence for hierarchy, flow and visual direction. They are weak evidence when the decision depends on how the thing behaves.',
      blocks: [
        {
          kind: 'matrix',
          keyColumn: 'To decide',
          columns: ['Static screens', 'A coded slice'],
          labels: { yes: 'Answers it', no: 'Does not' },
          rows: [
            { header: 'Hierarchy', marks: [true, true] },
            { header: 'Flow', marks: [true, true] },
            { header: 'Visual direction', marks: [true, true] },
            { header: 'Dynamic layout', marks: [false, true] },
            { header: 'Data density', marks: [false, true] },
            { header: 'Drag and drop', marks: [false, true] },
            { header: 'Model response', marks: [false, true] },
            { header: 'Animation', marks: [false, true] },
            { header: 'Keyboard operation', marks: [false, true] },
            { header: 'Component constraints', marks: [false, true] },
          ],
        },
        {
          kind: 'ledger',
          heading: 'What a coded slice settles in practice',
          columns: 1,
          marker: 'number',
          items: [
            {
              title: 'Does the interaction stay understandable with realistic data?',
              body: '',
            },
            { title: 'Can the component contract express every required state?', body: '' },
            { title: 'What happens at narrow widths and at 200 per cent zoom?', body: '' },
            { title: 'Does focus follow the visual and task order?', body: '' },
            { title: 'Which dependency or API boundary shapes the experience?', body: '' },
            {
              title: 'Can the client team inspect and estimate it before it hardens?',
              body: '',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'declared-first',
      eyebrow: 'Its job is declared first',
      heading: 'Not every line of code is production code',
      lead: 'Before anything is built, the output’s job and its acceptance criteria are stated — so nobody mistakes a proof for a release.',
      blocks: [
        {
          kind: 'steps',
          items: [
            {
              title: 'Behavioural proof',
              body: 'Answers one question about how it behaves. Then it may be thrown away.',
            },
            {
              title: 'Design-system implementation',
              body: 'A contract other product teams can build on.',
            },
            {
              title: 'Production slice',
              body: 'Enters the client’s architecture, review, testing and security path.',
            },
            {
              title: 'Release candidate',
              body: 'Accepted against the running product, ready to ship.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'three-ways-in',
      heading: 'Three ways the responsibility enters a product',
      blocks: [
        {
          kind: 'ledger',
          columns: 3,
          marker: 'icon',
          items: [
            {
              icon: 'monitor',
              title: 'Coded product evidence',
              body: 'A representative slice that tests behaviour, AI interaction, responsive hierarchy or feasibility — narrow enough to revise, real enough to reveal constraints.',
            },
            {
              icon: 'widget',
              title: 'Frontend system',
              body: 'Foundations, tokens, components and patterns with their product semantics intact: APIs, states, responsive behaviour, accessibility, documentation and examples.',
            },
            {
              icon: 'eye',
              title: 'Implementation quality',
              body: 'The running product reviewed across content, states, devices, interaction and assistive technology — each difference classified, not filed as a defect by default.',
            },
          ],
        },
        {
          kind: 'cases',
          items: [
            {
              slug: 'legacy-saas-modernisation-information-architecture',
              client: 'Benchmark Gensuite · Coded prototypes',
              title: 'Implementation effort, brought into the design review',
              body: 'HTML, CSS and JavaScript prototypes surfaced effort and a drag-and-drop dependency while the design could still change.',
            },
            {
              slug: 'ai-native-building-energy-product-connectx',
              client: 'ConnectX · Coded demonstration',
              title: 'Intent connected to data, modules and a twin',
              body: 'A coded demonstration linked conversational intent to data, dashboard modules and a digital-twin state.',
            },
          ],
          note: 'Neither case is presented as a production release. Both show code used to test the product decision rather than illustrate it.',
        },
      ],
    },
    {
      type: 'section',
      id: 'one-decision',
      heading: 'Keep one decision alive across every representation',
      lead: 'The open product question stays connected from the first coded probe to the accepted decision. Prototype code may be discarded; the durable output is the clarified decision, and the evidence that the implemented behaviour meets it.',
      blocks: [
        {
          kind: 'thread',
          items: [
            { title: 'Open question' },
            { title: 'Coded probe' },
            { title: 'Implementation contract' },
            { title: 'Running behaviour' },
            { title: 'Review finding' },
            { title: 'Accepted decision' },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'ai',
      eyebrow: 'Where AI changes the work',
      heading: 'Generated code enters the same path as written code',
      lead: 'AI makes plausible output easier to produce outside the product’s actual contracts. Tcules uses it inside the approved client environment, and a practitioner still accepts what ships.',
      blocks: [
        {
          kind: 'flow',
          stages: [
            {
              label: 'AI accelerates',
              items: [
                'Code understanding',
                'Option generation',
                'Component implementation',
                'Test preparation',
                'Documentation',
              ],
            },
            {
              label: 'A practitioner accepts',
              items: [
                'Product behaviour and component choice',
                'Semantics and accessibility',
                'Security-relevant boundaries',
                'Release readiness',
              ],
            },
          ],
        },
        {
          kind: 'note',
          label: 'For AI products',
          html: '<p>Design engineering also makes model behaviour tangible. The coded slice exposes latency, streaming, tool calls, incomplete states, evidence, correction and recovery before the interface is treated as settled.</p>',
        },
      ],
    },
    {
      type: 'section',
      id: 'leaves-behind',
      heading: 'What the engagement leaves behind',
      lead: 'Depending on scope. Tcules never describes a prototype as production, or a component library as proof that an entire product conforms.',
      blocks: [
        {
          kind: 'ledger',
          columns: 3,
          marker: 'icon',
          items: [
            {
              icon: 'monitor',
              title: 'Coded demonstration',
              body: 'With its evidence limits stated.',
            },
            {
              icon: 'widget',
              title: 'Frontend components',
              body: 'Production-ready components and patterns.',
            },
            {
              icon: 'layers',
              title: 'Design–code correspondence',
              body: 'Tokens and components matched both ways.',
            },
            {
              icon: 'database',
              title: 'Data and state fixtures',
              body: 'Realistic, and reusable in tests.',
            },
            {
              icon: 'checklist',
              title: 'Acceptance records',
              body: 'Responsive, keyboard and screen reader.',
            },
            {
              icon: 'ruler-pen',
              title: 'Interaction specifications',
              body: 'Motion and behaviour, encoded rather than described.',
            },
            {
              icon: 'document-text',
              title: 'Divergence ledger',
              body: 'Every implementation-QA decision, recorded.',
            },
            {
              icon: 'notebook',
              title: 'Documentation and examples',
              body: 'For the client teams who continue.',
            },
            {
              icon: 'flag',
              title: 'Hand-off boundary',
              body: 'What remains client-owned, stated.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'first-slice',
      eyebrow: 'Choose the first useful slice',
      heading: 'When static review has reached its limit',
      lead: 'An interaction still disputed, a shared component that keeps drifting, a running surface that no longer matches the decision — any one of them defines a first scope.',
      blocks: [
        {
          kind: 'router',
          items: [
            {
              when: 'A live behaviour or a dependency must be tested.',
              route: {
                label: 'Coded Prototyping',
                href: servicePath('design-engineering/coded-prototyping'),
              },
            },
            {
              when: 'A settled interaction needs an implementation contract.',
              route: {
                label: 'Design to Code',
                href: servicePath('design-engineering/design-to-code'),
              },
            },
            {
              when: 'Reusable coded foundations are the need.',
              route: {
                label: 'Frontend Design Systems',
                href: servicePath('design-engineering/frontend-design-systems'),
              },
            },
            {
              when: 'The running product must be tested against its intended behaviour.',
              route: {
                label: 'Implementation QA',
                href: servicePath('design-engineering/implementation-qa'),
              },
            },
          ],
          also: {
            when: 'Not sure where intent is being lost? Start with a diagnosis.',
            link: { label: 'Design-to-Code Audit', href: auditPath('design-to-code-audit') },
          },
        },
      ],
    },
    {
      type: 'section',
      id: 'questions',
      heading: 'Working inside your delivery',
      arrangement: 'beside',
      blocks: [
        {
          kind: 'faq',
          items: [
            {
              question: 'Does the code produced here ship to production?',
              answerHtml:
                '<p>Only when production delivery and acceptance are in scope. Prototype code may exist solely to answer a question; production components or slices enter your normal architecture, review, testing, security and release path. AI-assisted code follows the same path.</p>',
            },
            {
              question: 'Can Tcules work inside our team and codebase?',
              answerHtml:
                '<p>Yes, when the approved access, stack and collaboration model support it. The first scope may be a bounded coded proof, one component family or a review record. Your teams keep the architecture, security and release responsibilities assigned to them.</p>',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'go-deeper',
      eyebrow: 'Go deeper',
      heading: 'What has to survive the move into code',
      blocks: [
        {
          kind: 'resources',
          items: [
            {
              type: 'Definition',
              title: 'Design engineering',
              body: 'Product reasoning and frontend reasoning, held as one responsibility.',
              href: glossaryPath('design-engineering'),
              cta: 'Read the definition',
            },
            {
              type: 'Definition',
              title: 'Design intent',
              body: 'The decision a design exists to carry, as distinct from how it looks.',
              href: glossaryPath('design-intent'),
              cta: 'Read the definition',
            },
          ],
        },
      ],
    },
  ],
  close: {
    heading: 'Show us where product intent is getting lost in implementation',
    body: 'The implementation point where accepted product intent is being lost. A rough brief is enough.',
    points: [
      {
        label: 'Send the point where intent is lost',
        detail: 'One disputed interaction is enough.',
      },
      {
        label: 'A reply within one business day',
        detail: 'With the first slice it points to.',
      },
    ],
    note: 'Do not include credentials, regulated records or confidential source material.',
  },
};
