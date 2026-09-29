import type { ServiceStory } from '@/lib/service-story';
import { articlePath, auditPath, glossaryPath, servicePath, toolPath } from '@/lib/routes';

/** /services/ai-product-ux, designed. Edits: docs/service-pages-design.md § AI Product UX. */
export const aiProductUx: ServiceStory = {
  slug: 'ai-product-ux',
  seo: {
    title: 'AI Product UX: people, models and product state | Tcules',
    description:
      'Tcules helps teams create AI-native products, add AI to established software and redesign workflows where probabilistic output changes how people decide or act.',
  },
  hero: {
    eyebrow: 'AI Product UX',
    title: 'Design the relationship between people, models and product state',
    lead: 'For AI-native products, AI added to established software, and workflows where probabilistic output changes how people decide or act.',
    body: 'The work combines product strategy, UX, interaction, evaluation and implementation responsibility.',
    actions: [
      { label: 'Start a project', href: '#enquiry' },
      { label: 'Request free audit', href: auditPath('ai-product-ux-readiness') },
    ],
    illustration: {
      src: '/illustrations/services/ai-product-ux.paper.svg',
      width: 879,
      height: 747,
    },
  },
  sections: [
    {
      type: 'section',
      id: 'model-roles',
      eyebrow: 'Before chat, copilot or agent',
      heading: 'Define the role the model plays',
      lead: 'AI Product UX is the wider relationship: how people understand, direct, evaluate, control and recover from model behaviour. It starts with what the model is allowed to do.',
      blocks: [
        {
          kind: 'spectrum',
          axis: { from: 'Least authority', to: 'Most authority' },
          columns: { name: 'The model', when: 'Introduces', settles: 'So the product needs' },
          items: [
            {
              name: 'Generates a candidate',
              when: 'Output a person may not have asked for in that form.',
              settles: 'Editing, and constraints on source.',
            },
            {
              name: 'Transforms supplied material',
              when: 'Changes to something a person owns.',
              settles: 'A visible difference, and the original kept.',
            },
            {
              name: 'Retrieves and synthesises',
              when: 'Claims that rest on evidence the reader cannot see.',
              settles: 'The sources, and what is missing from them.',
            },
            {
              name: 'Recommends',
              when: 'A preferred option among several.',
              settles: 'The basis, and the alternatives.',
            },
            {
              name: 'Predicts or detects',
              when: 'Confidence that can be wrong in both directions.',
              settles: 'Uncertainty stated, and a way to dispute it.',
            },
            {
              name: 'Orchestrates steps',
              when: 'A sequence nobody watched step by step.',
              settles: 'State per step, and a way to stop.',
            },
            {
              name: 'Acts with delegated authority',
              when: 'Consequence in the product, on someone’s behalf.',
              settles: 'Permission, preview, state, stopping and recovery.',
            },
          ],
        },
        {
          kind: 'links',
          items: [
            {
              label: 'Compare the roles: generative AI patterns for SaaS',
              href: articlePath('generative-ai-product-patterns-for-saas'),
            },
            { label: 'Definition: AI Product UX', href: glossaryPath('ai-product-ux') },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'authority',
      eyebrow: 'Authority changes with consequence',
      heading: 'Inform, suggest, prepare, execute',
      lead: 'Four different product roles. For each: the consequence, whether it can be reversed, the evidence a person can inspect, the human gate, and the recovery path.',
      blocks: [
        {
          kind: 'steps',
          items: [
            {
              title: 'Inform',
              body: 'The model tells a person something. The person decides everything.',
            },
            {
              title: 'Suggest',
              body: 'The model proposes. A person chooses, and can see why it was proposed.',
            },
            {
              title: 'Prepare',
              body: 'The model does the work. A person reviews it before it takes effect.',
            },
            {
              title: 'Execute',
              body: 'The model acts. The person can see it happen, stop it, and undo it.',
            },
          ],
        },
        {
          kind: 'statement',
          before: 'A system that acts across several steps needs those decisions ',
          marked: 'per action',
          after: ', not one blanket label for the feature.',
        },
      ],
    },
    {
      type: 'section',
      id: 'responsibility-record',
      heading: 'The AI product responsibility record',
      lead: 'It follows the product into design and engineering, and stops an interface label carrying more certainty than the system has earned.',
      arrangement: 'beside',
      blocks: [
        {
          kind: 'record',
          title: 'Responsibility record',
          meta: 'One per consequential AI scenario',
          items: [
            {
              icon: 'user',
              field: 'User work',
              question: 'Which decision or task deserves assistance?',
            },
            {
              icon: 'cpu',
              field: 'Model role',
              question: 'What may the model produce or influence?',
            },
            {
              icon: 'document-text',
              field: 'Evidence',
              question: 'What data and sources support the output?',
            },
            {
              icon: 'question-circle',
              field: 'Uncertainty',
              question: 'What can be missing, wrong or unstable?',
            },
            {
              icon: 'key',
              field: 'Authority',
              question: 'What can happen without human approval?',
            },
            {
              icon: 'checklist',
              field: 'Evaluation',
              question: 'What counts as useful and safe performance here?',
            },
            {
              icon: 'undo-left',
              field: 'Recovery',
              question: 'How can a person correct or reverse the result?',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'evaluation',
      eyebrow: 'Evaluation before release',
      heading: 'Evaluate against real decisions, not model accuracy alone',
      blocks: [
        {
          kind: 'contrast',
          sides: [
            {
              label: 'The acceptance set tests',
              heading: 'Representative decisions and failure conditions',
              style: 'chips',
              items: [
                'Source coverage',
                'Useful output',
                'Missing evidence',
                'Appropriate human review',
                'Action scope',
                'Correction',
                'Recovery',
              ],
            },
            {
              label: 'Who approves what',
              heading: 'Evidence Tcules makes reviewable',
              style: 'checks',
              items: [
                'Technical and operational checks follow the agreed delivery scope',
                'Client owners keep approval of domain, policy and residual risk',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'product-responsibility',
      heading: 'How product responsibility combines',
      blocks: [
        {
          kind: 'stat',
          value: '12',
          label: 'AI products',
          body: 'Tcules has worked on twelve AI products — copilots, AI-native tools, AI-powered products and integrations. The work below is what those engagements combined.',
        },
        {
          kind: 'ledger',
          columns: 2,
          marker: 'number',
          items: [
            { title: 'Opportunity framing', body: 'The product boundary, before the model.' },
            { title: 'Research', body: 'With target users and domain experts.' },
            { title: 'AI interaction and workflow', body: 'Where the model sits in the work.' },
            {
              title: 'Source, confidence, explanation',
              body: 'Patterns a person can inspect.',
            },
            { title: 'Human review and control', body: 'The gates, and the recovery path.' },
            { title: 'Evaluation and acceptance', body: 'Scenarios that decide release.' },
            {
              title: 'Coded prototypes and engineering',
              body: 'Latency, streaming and state, made real.',
            },
            { title: 'Integration', body: 'Into existing roles, state and design systems.' },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'evidence',
      eyebrow: 'Different AI conditions',
      heading: 'Evidence across different AI products',
      blocks: [
        {
          kind: 'cases',
          items: [
            {
              slug: 'ai-native-building-energy-product-connectx',
              client: 'ConnectX · AI-native energy product',
              title: 'An intent-led workspace, bounded by eight scenarios',
              body: 'Demonstrated in code: conversational intent connected to data, dashboard modules and a digital-twin state.',
            },
            {
              slug: 'ai-quality-control-expert-review-buildtwin',
              client: 'BuildTwin · Expert review',
              title: 'Evidence, correction and escalation',
              body: 'For an engineer reviewing AI quality-control results.',
            },
            {
              slug: 'unifying-workflow-creation-through-intelligent-search',
              client: 'Eden AI · Developer platform',
              title: 'Workflow creation through search',
              body: 'For a developer-facing AI platform.',
            },
            {
              slug: 'saas-ux-ui-case-study-ai-for-market-research-automation',
              client: 'Novus Insights · Research automation',
              title: 'A survey builder that drafts, so researchers refine',
              body: 'Public responsibility is bounded by the available source.',
            },
          ],
          note: 'Tcules also uses AI in its own research synthesis, exploration, prototyping, coding and QA. That is a separate claim: generated work is reviewed against the product model, source evidence, implementation constraints and client requirements, and client AI restrictions override delivery defaults.',
        },
      ],
    },
    {
      type: 'section',
      id: 'first-decision',
      eyebrow: 'Define the first AI decision',
      heading: 'Choose the route from what the product is delegating',
      lead: 'Useful inputs are the user work, the current product state, and the authority you expect AI to receive.',
      blocks: [
        {
          kind: 'router',
          items: [
            {
              when: 'The product is delegating a bounded task.',
              route: {
                label: 'AI Copilots and Agents',
                href: servicePath('ai-product-ux/ai-copilots-agents'),
              },
            },
            {
              when: 'Review, escalation and correction are central to the work.',
              route: {
                label: 'Human-in-the-Loop Workflows',
                href: servicePath('ai-product-ux/human-in-the-loop-workflows'),
              },
            },
            {
              when: 'Failure is consequential and oversight is the question.',
              route: {
                label: 'Trust, Control and Recovery',
                href: servicePath('ai-product-ux/trust-control-recovery'),
              },
            },
            {
              when: 'Retrieval and ranking decide what a person sees, and why.',
              route: {
                label: 'AI Search and Recommendation',
                href: servicePath('ai-product-ux/ai-search-recommendation'),
              },
            },
          ],
          also: {
            body: 'Scope still uncertain? The readiness check is a free self-assessment; the readiness assessment creates the first evidence.',
            link: {
              label: 'AI Product UX Readiness Check',
              href: toolPath('ai-product-ux-readiness-check'),
            },
          },
        },
      ],
    },
  ],
  close: {
    heading: 'Share the AI interaction that needs clearer rules',
    body: 'The interaction, the evidence behind it and the decision rule that needs to become explicit. A rough brief is enough.',
    points: [
      { label: 'A reply within one business day' },
      {
        label: 'One consequential scenario is enough',
        detail: 'It defines what the model may do.',
      },
    ],
    note: 'Do not include credentials, regulated records or confidential source material.',
  },
};
