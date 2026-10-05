import type { ServiceStory } from '@/lib/service-story';
import { auditPath, glossaryPath, servicePath, toolPath } from '@/lib/routes';

/** /services/product-modernisation, designed. Edits: docs/service-pages-design.md § Modernisation. */
export const productModernisation: ServiceStory = {
  slug: 'product-modernisation',
  name: 'Product Modernisation',
  seo: {
    title: 'Product modernisation for established software | Tcules',
    description:
      'Decide what to repair, redesign, replatform, rebuild or leave alone while protecting continuity in an established software product.',
  },
  hero: {
    title: 'Change the product, keep the work it carries',
    lead: 'Tcules helps the team find the layer causing the cost, protect what still works, and carry the right change through design, systems, code or delivery.',
    actions: [
      { label: 'Start a project', href: '#enquiry' },
      { label: 'Request free audit', href: auditPath('product-modernisation-assessment') },
    ],
    illustration: {
      src: '/illustrations/services/product-modernisation.paper.svg',
      width: 787,
      height: 695,
    },
  },
  sections: [
    {
      type: 'section',
      id: 'four-views',
      eyebrow: 'One product, four problems',
      heading: 'Established software rarely has one modernisation problem.',
      blocks: [
        {
          kind: 'signals',
          columns: 4,
          items: [
            { icon: 'graph-up', title: 'Sales', body: 'sees an ageing product.' },
            { icon: 'chat-round-dots', title: 'Support', body: 'sees recurring exceptions.' },
            {
              icon: 'code',
              title: 'Engineering',
              body: 'sees dependencies that make every change expensive.',
            },
            {
              icon: 'users-group-rounded',
              title: 'Customers',
              body: 'know the current behaviour — including the workarounds.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'choose-an-intervention',
      eyebrow: 'Capability by capability',
      heading: 'Choose the least disruptive change that resolves the real constraint',
      lead: 'Every intervention is right somewhere, and expensive when one label is applied to the whole product. A programme may use several: the point is the right change for each meaningful capability.',
      blocks: [
        {
          kind: 'ledger',
          columns: 2,
          marker: 'icon',
          items: [
            {
              icon: 'close-circle',
              title: 'A visual refresh',
              body: 'can leave a structural problem untouched.',
            },
            {
              icon: 'close-circle',
              title: 'A replatform',
              body: 'can faithfully reproduce behaviour that should have changed.',
            },
            {
              icon: 'close-circle',
              title: 'A full redesign',
              body: 'can destroy useful familiarity.',
            },
            {
              icon: 'close-circle',
              title: 'A selective repair',
              body: 'can become a permanent patch over a broken product model.',
            },
          ],
        },
        {
          kind: 'spectrum',
          axis: { from: 'Least disruptive', to: 'Most disruptive' },
          meter: { kind: 'disruption', label: 'Disruption' },
          columns: {
            name: 'Intervention',
            when: 'When',
            settles: 'The decision it must settle',
          },
          items: [
            {
              name: 'Leave unchanged',
              when: 'A stable capability creates little cost or risk.',
              settles: 'What evidence would justify reopening it later?',
            },
            {
              name: 'Repair',
              when: 'Useful behaviour is obscured by local friction.',
              settles: 'Which bounded defect can change without reopening the model?',
            },
            {
              name: 'Redesign',
              when: 'Roles, sequence or exceptions no longer fit the work.',
              settles: 'What should stay recognisable while the workflow changes?',
            },
            {
              name: 'Progressive modernisation',
              when: 'The product can only evolve through staged replacement.',
              settles: 'Which old and new states must coexist, and for how long?',
            },
            {
              name: 'Replatform',
              when: 'The platform or framework is the binding constraint.',
              settles: 'Which behaviour and data meaning must survive the move?',
            },
            {
              name: 'Selective rebuild',
              when: 'One subsystem is beyond responsible extension.',
              settles: 'Can its boundary be defended against hidden dependencies?',
            },
            {
              name: 'Retire',
              when: 'Cost and complexity exceed present value.',
              settles: 'Who depends on it, and what migration or substitute do they need?',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'continuity',
      heading: 'Continuity belongs in the product plan',
      lead: 'Users have invested in terminology, sequence, saved records, shortcuts, integrations and recovery paths. Some of that learning reflects a sound model; some is effort spent compensating for weak design. Modernisation has to tell the two apart.',
      blocks: [
        {
          kind: 'ledger',
          columns: 3,
          marker: 'icon',
          items: [
            {
              icon: 'checklist',
              title: 'Operational',
              body: 'Essential work still completes.',
            },
            {
              icon: 'widget',
              title: 'Conceptual',
              body: 'Familiar objects and rules change only with reason.',
            },
            {
              icon: 'database',
              title: 'Data',
              body: 'Records, history and meaning survive the transition.',
            },
            {
              icon: 'lock',
              title: 'Access',
              body: 'Roles, permissions and approval authority stay correct.',
            },
            {
              icon: 'document-text',
              title: 'Commercial',
              body: 'Contractual and service commitments stay understood.',
            },
            {
              icon: 'graph-up',
              title: 'Learning',
              body: 'Each release generates evidence for the next decision.',
            },
          ],
        },
        {
          kind: 'note',
          label: 'Why record it',
          html: '<p>The record stops “keep it familiar” and “make it modern” being opposing opinions. Every preserved or changed element has a reason, a consequence and an acceptance condition.</p>',
        },
      ],
    },
    {
      type: 'section',
      id: 'diagnose',
      eyebrow: 'From the shared layer into real work',
      heading: 'Test the decision inside a feature that matters',
      lead: 'Judge modernisation not by how much visibly changes, but by whether the product changes at the layer causing the cost. A product slice is where that shows.',
      blocks: [
        {
          kind: 'cases',
          items: [
            {
              slug: 'legacy-saas-modernisation-information-architecture',
              client: 'Benchmark Gensuite · went deeper',
              title: 'A visual upgrade that exposed the information architecture',
              body: 'Applying the component direction to a high-reuse scope selector showed search, hierarchy, saved scopes and nearby sites carrying unclear boundaries. The IA changed; the product’s broader continuity held.',
            },
            {
              slug: 'enterprise-workflow-redesign-dealpath-real-estate',
              client: 'Dealpath · stayed selective',
              title: 'Density kept, one path changed',
              body: 'Listings kept their useful density and gained a clearer reading order. One pipeline path changed because it opened creation before checking existing records; three actions around it stayed.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'transition',
      heading: 'The transition is part of the product',
      lead: 'Live modernisation creates temporary product and technical work that a final mock-up never shows. It shapes the experience, data meaning, operating risk and scope — so it is designed, not discovered after approval.',
      blocks: [
        {
          kind: 'bridge',
          from: 'Current product',
          to: 'Target product',
          label: 'Designed in between',
          phases: { before: 'Before', during: 'During the move', after: 'After' },
          items: [
            'Old and new navigation together',
            'Converted and unconverted records',
            'Compatibility and translation layers',
            'Feature flags and release groups',
            'Fallback routes for a failed migration',
            'Support for changed behaviour',
            'Criteria for retiring the temporary state',
          ],
        },
        {
          kind: 'slot',
          slot: {
            kind: 'illustration',
            ratio: '16/9',
            message:
              'During a modernisation the old product and the new one are both live, and the same customer data has to stay correct in both until the move is finished.',
            shows:
              'The current product and the new one next to each other, one customer record that exists in both — already moved in the new product, not yet in the old one — and the link between them that keeps the two in step while both are in use.',
            placement:
              'In the section on transition states, where the page argues that the in-between period is designed, not endured. If it says that more clearly than the before-and-after diagram above it, it replaces that diagram.',
          },
        },
      ],
    },
    {
      type: 'section',
      id: 'how-it-comes-together',
      heading: 'How the work comes together',
      arrangement: 'beside',
      lead: 'Tcules can take end-to-end product and software responsibility, or work inside a team that keeps parts of engineering, data, infrastructure or release.',
      blocks: [
        {
          kind: 'ledger',
          columns: 1,
          marker: 'number',
          items: [
            {
              title: 'Diagnosis',
              body: 'Audit the running product, its model, support and sales evidence, dependencies and current change process.',
            },
            {
              title: 'Intervention',
              body: 'Decide what to preserve, repair, redesign, replatform, rebuild, leave or retire.',
            },
            {
              title: 'Product direction',
              body: 'Objects, roles, workflows, interaction, continuity and target behaviour.',
            },
            {
              title: 'Proof',
              body: 'Prototypes or coded product slices that test the decision and its implementation boundary.',
            },
            {
              title: 'System and build',
              body: 'Shared foundations, frontend and backend, APIs, integrations, QA and deployment, as scoped.',
            },
            {
              title: 'Transition',
              body: 'Sequence migration, dual operation, communication, acceptance and recovery.',
            },
            {
              title: 'Evolution',
              body: 'Review the evidence after release, and decide whether the next capability should move.',
            },
          ],
        },
        {
          kind: 'note',
          label: 'Ownership',
          html: '<p>Scope and ownership are made explicit before the roadmap treats either team as capacity already available.</p>',
        },
      ],
    },
    {
      type: 'section',
      id: 'ai',
      eyebrow: 'Where AI changes modernisation',
      heading: 'Faster understanding, the same acceptance',
      lead: 'AI can also reproduce old assumptions faster, or generate plausible components that bypass the product system. Tcules uses it inside the agreed client environment.',
      blocks: [
        {
          kind: 'flow',
          stages: [
            {
              label: 'AI accelerates',
              items: [
                'Code understanding',
                'Interface exploration',
                'Migration preparation',
                'Test creation',
                'Documentation',
              ],
            },
            {
              label: 'A person still decides',
              items: [
                'Product, architecture, code and release decisions keep human review',
                'Existing-user learning decides what stays familiar',
                'Data continuity and rollback evidence decide what ships',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'choose',
      eyebrow: 'Assessment or delivery',
      heading: 'Choose where to start',
      blocks: [
        {
          kind: 'router',
          items: [
            {
              when: 'The team still disagrees about repair, redesign, progressive change, replatforming or rebuild. It settles the boundary, before delivery starts.',
              route: {
                label: 'Product Modernisation Assessment',
                href: auditPath('product-modernisation-assessment'),
              },
            },
            {
              when: 'The problem is a contained experience problem.',
              route: {
                label: 'Product Redesign',
                href: servicePath('product-modernisation/product-redesign'),
              },
            },
            {
              when: 'Dependencies and accumulated change cost are the constraint. It settles staged continuity.',
              route: {
                label: 'Legacy Software Modernisation',
                href: servicePath('product-modernisation/legacy-software-modernisation'),
              },
            },
            {
              when: 'The platform move is already decided. It settles the behaviour that must survive the move.',
              route: {
                label: 'Replatforming Product Design',
                href: servicePath('product-modernisation/replatforming-product-design'),
              },
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'ownership-and-acceptance',
      heading: 'Ownership and release acceptance, before the roadmap',
      arrangement: 'beside',
      blocks: [
        {
          kind: 'faq',
          items: [
            {
              question: 'What does Tcules own?',
              answerHtml:
                '<p>The agreed diagnosis, target-state decisions, design evidence, acceptance records and scoped delivery. Client product, engineering, security, compliance and operations owners keep their assigned approvals, and the engagement records that split before the roadmap treats either team as available capacity.</p>',
            },
            {
              question: 'What makes a modernised release acceptable?',
              answerHtml:
                '<p>It meets the agreed product behaviour, data and migration conditions, operational readiness, accessibility scope, rollout plan and recovery path. A completed design review or technical migration is evidence, but neither is release acceptance on its own.</p>',
            },
            {
              question: 'What do you need to start?',
              answerHtml:
                '<p>One consequential workflow, the running product, known data or integration constraints, and the people who can explain current operations. Incomplete evidence does not block an assessment; it becomes uncertainty to test.</p>',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'go-deeper',
      eyebrow: 'Go deeper',
      heading: 'Run the comparison yourself',
      blocks: [
        {
          kind: 'resources',
          items: [
            {
              type: 'Worksheet',
              title: 'Audit, Redesign, Modernise or Rebuild',
              body: 'Compare the interventions capability by capability — usually what settles the argument.',
              href: toolPath('audit-redesign-modernise-rebuild'),
              cta: 'Open the worksheet',
            },
            {
              type: 'Definition',
              title: 'Product modernisation',
              body: 'Why redesign, replatforming and rebuilding are different interventions.',
              href: glossaryPath('product-modernisation'),
              cta: 'Read the definition',
            },
          ],
        },
      ],
    },
  ],
  close: {
    heading: 'Start with the capability that cannot safely stay as it is',
    body: 'The capability, the operational dependency and the change that can no longer be deferred. A rough brief is enough.',
    points: [
      {
        label: 'Send the capability and what depends on it',
        detail: 'One workflow is enough to start.',
      },
      {
        label: 'A reply within one business day',
        detail: 'Incomplete evidence becomes uncertainty to test.',
      },
    ],
    note: 'Do not include credentials, regulated records or confidential source material.',
  },
};
