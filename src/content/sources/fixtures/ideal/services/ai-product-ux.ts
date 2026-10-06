import type { ServiceStory } from '@/lib/service-story';
import {
  articlePath,
  auditPath,
  glossaryPath,
  servicePath,
  toolPath,
  ANCHORS,
  anchorHref,
  ROUTES,
} from '@/lib/routes';

import { CLIENT_MARKS } from '../../clients';
import { CLUTCH_RATING } from '../../ratings';

/**
 * /services/ai-product-ux, designed — recomposed from the UI kit on 6 Oct 2026 (visual-direction
 * § 8.2). Copy is the CMS's own, re-cut to the § 1.5 budgets; every edit is logged, old and new, in
 * docs/content-changes.md § 7. The sections say what the page argues; the template decides how each
 * is laid out from the job its blocks do (ServicePage plan.ts), so no field here is a layout.
 *
 *   hero      the claim
 *   signals   where an AI feature loses people — B, beside a pair testing a screen
 *   clients   who we have shipped with — H, with the sourced rating
 *   roles     the role the model plays, least authority to most — E, the authority spectrum
 *   authority inform, suggest, prepare, execute — F, beside the wireframe sketch
 *   statement the claim the page stands on, at scale — J
 *   record    the responsibility record, one per scenario — E, the record sheet
 *   offer     the readiness assessment, for the scope not yet known — K
 *   evidence  three AI products under different conditions — M, the real covers
 *   questions evaluation, approval, our own AI use, where to read — D-faq (the old evaluation
 *             band, the responsibilities stat, the scope note and the resources band, folded in)
 *   routes    the four specialisms — the C-icon router
 *   close     the form — L
 *
 * There is no G proof band: no attributable quote from an AI engagement exists yet, and the one
 * approved quote (Auxentios, CPQ) is not AI work. When one does, a `proof` section between the
 * record and the offer gets the tint band and the `horizon` above it from the plan.
 */
export const aiProductUx: ServiceStory = {
  slug: 'ai-product-ux',
  name: 'AI Product UX',
  seo: {
    title: 'AI Product UX: people, models and product state | Tcules',
    description:
      'Tcules helps teams create AI-native products, add AI to established software and redesign workflows where probabilistic output changes how people decide or act.',
  },
  hero: {
    title: 'Design how people, models and product state meet',
    lead: 'For AI-native products, AI added to established software, and workflows where probabilistic output changes how people decide or act.',
    actions: [
      { label: 'Start a project', href: anchorHref(ANCHORS.enquiry) },
      { label: 'Request free audit', href: auditPath('ai-product-ux-readiness') },
    ],
    illustration: {
      src: '/illustrations/services/ai-product-ux.paper.svg',
      width: 879,
      height: 747,
    },
  },
  /* Photographs (visual-direction § 5.5 to § 5.7): a cool-family page. The B, K and aside photos are
     § 5.6's (SERVICE_PHOTO_SLOTS in src/lib/photos.ts). The stand-in pool is in order of preference,
     studio first, drawn from the rest of the catalogue; pickStandIn enforces that. The three case
     cards take their real covers from the listing, so the pool is only the fallback. */
  photos: {
    family: 'cool',
    standIns: [
      'studio-session-talk',
      'studio-whiteboard-crit',
      'workshop-brick-room',
      'hands-trackpad',
    ],
  },
  labels: {
    caseCta: 'Read the case',
    scope: 'Scope',
    allCases: { label: 'All case studies', href: ROUTES.caseStudies },
  },
  sections: [
    {
      type: 'section',
      id: 'signals',
      eyebrow: 'Where trust breaks',
      heading: 'Where an AI feature loses people',
      lead: 'The symptom shows in the interface. The cause is usually the role the model was given.',
      blocks: [
        {
          kind: 'signals',
          columns: 4,
          items: [
            {
              icon: 'eye',
              title: 'Every answer re-checked',
              body: 'People cannot see the sources behind an output, or what is missing from them.',
            },
            {
              icon: 'undo-left',
              title: 'Edits undone by hand',
              body: 'The model changes what a person owns without showing the difference or keeping the original.',
            },
            {
              icon: 'question-circle',
              title: 'A confident guess',
              body: 'Uncertainty is hidden where it should be stated, with a way to dispute it.',
            },
            {
              icon: 'cpu',
              title: 'An agent nobody stops',
              body: 'A run of steps has no visible state, no preview and no way to halt it.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'clients',
      eyebrow: 'Clients',
      heading: 'Teams we have shipped with',
      blocks: [
        {
          kind: 'logos',
          marks: [
            CLIENT_MARKS.omny,
            CLIENT_MARKS.latitudepay,
            CLIENT_MARKS.quoter,
            CLIENT_MARKS.knovos,
            CLIENT_MARKS.doodle,
            CLIENT_MARKS.pledge,
          ],
          rating: CLUTCH_RATING,
        },
      ],
    },
    {
      type: 'section',
      id: 'model-roles',
      eyebrow: 'Before chat or agent',
      heading: 'Define the role the model plays',
      lead: 'Each role brings something a person must be able to inspect, direct or undo.',
      blocks: [
        {
          kind: 'spectrum',
          axis: { from: 'Least authority', to: 'Most authority' },
          meter: { kind: 'authority', label: 'Model authority' },
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
              name: 'Acts with delegated authority',
              when: 'Consequence in the product, on someone’s behalf.',
              settles: 'Permission, preview, state, stopping and recovery.',
            },
          ],
        },
      ],
      more: {
        label: 'Copilots and agents, in depth',
        href: servicePath('ai-product-ux/ai-copilots-agents'),
      },
    },
    {
      type: 'section',
      id: 'authority',
      eyebrow: 'Authority by consequence',
      heading: 'Inform, suggest, prepare, execute',
      lead: 'Decided per action, never once per feature: the consequence, whether it reverses, the evidence and the way back.',
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
      ],
    },
    {
      type: 'statement',
      id: 'earned-certainty',
      eyebrow: 'What we hold to',
      text: 'An interface should never sound more certain than the system has earned.',
      action: { label: 'See how we work', href: ROUTES.howWeWork },
    },
    {
      type: 'section',
      id: 'responsibility-record',
      eyebrow: 'Written down once',
      heading: 'Eight questions per scenario',
      lead: 'The responsibility record follows the product into design and engineering.',
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
              icon: 'flag',
              field: 'Accountability',
              question: 'Who answers for the result when it is wrong?',
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
      type: 'offer',
      id: 'readiness',
      eyebrow: 'Scope still unclear?',
      heading: 'Not sure what the model should do yet?',
      body: 'The readiness assessment creates the first evidence, so the route is chosen from the work rather than the technology.',
      points: [
        { label: 'The user work worth assisting' },
        { label: 'The product state the model touches' },
        { label: 'The authority it should receive' },
      ],
      actions: [
        { label: 'Request the readiness assessment', href: auditPath('ai-product-ux-readiness') },
      ],
    },
    {
      type: 'section',
      id: 'evidence',
      eyebrow: 'Different AI conditions',
      heading: 'Evidence across AI products',
      lead: 'Three of the twelve AI products we have worked on, each under a different condition.',
      blocks: [
        {
          kind: 'cases',
          items: [
            {
              slug: 'ai-native-building-energy-product-connectx',
              client: 'ConnectX · AI-native energy',
              title: 'An intent-led workspace, bounded by eight scenarios',
              body: 'Intent connected to data, dashboards and a digital-twin state, shown in code.',
            },
            {
              slug: 'ai-quality-control-expert-review-buildtwin',
              client: 'BuildTwin · Expert review',
              title: 'Evidence, correction and escalation',
              body: 'For an engineer reviewing AI quality-control results.',
            },
            {
              slug: 'designing-trust-how-tcules-helped-omnyai-reframe-their-ai-human-relationship',
              client: 'OmnyAI · Decision support',
              title: 'Decision control, returned to people',
              body: 'The AI–human relationship reframed around the people the AI was meant to help.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'questions',
      eyebrow: 'Questions',
      heading: 'Before the first scenario',
      blocks: [
        {
          kind: 'faq',
          items: [
            {
              question: 'How is an AI feature evaluated before release?',
              answerHtml:
                '<p>Against real decisions, not model accuracy alone. The acceptance set starts from representative user decisions and failure conditions, and checks source coverage, useful output, missing evidence, appropriate human review, action scope, and correction and recovery.</p>',
            },
            {
              question: 'Who approves the residual risk?',
              answerHtml:
                '<p>Technical and operational checks follow the agreed delivery scope. Tcules makes the evidence reviewable; client owners keep approval of domain, policy and residual risk.</p>',
            },
            {
              question: 'What has the work combined across twelve AI products?',
              answerHtml:
                '<p>Across copilots, AI-native tools, AI-powered products and integrations: opportunity framing, research with target users and domain experts, AI interaction and workflow, source, confidence and explanation patterns, human review and control, evaluation and acceptance, coded prototypes and engineering, and integration into existing roles, state and design systems.</p>',
            },
            {
              question: 'Does Tcules use AI in its own work?',
              answerHtml:
                '<p>Yes, in research synthesis, exploration, prototyping, coding and QA. That is a separate claim from the client work: generated work is reviewed against the product model, source evidence, implementation constraints and client requirements, and client AI restrictions override delivery defaults.</p>',
            },
            {
              question: 'Where should a team read first?',
              answerHtml: `<p>Take the free <a href="${toolPath('ai-product-ux-readiness-check')}">AI Product UX Readiness Check</a>, compare the common model roles in <a href="${articlePath('generative-ai-product-patterns-for-saas')}">Generative AI patterns for SaaS</a>, or read the <a href="${glossaryPath('ai-product-ux')}">definition of AI Product UX</a>.</p>`,
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'first-decision',
      eyebrow: 'Go narrower',
      heading: 'Choose by what is delegated',
      lead: 'Useful inputs: the user work, the current product state, and the authority you expect AI to receive.',
      blocks: [
        {
          kind: 'router',
          items: [
            {
              icon: 'cpu',
              when: 'When the product is delegating a bounded task to a model.',
              route: {
                label: 'AI Copilots and Agents',
                href: servicePath('ai-product-ux/ai-copilots-agents'),
              },
            },
            {
              icon: 'users-group-rounded',
              when: 'When review, escalation and correction are central to the work.',
              route: {
                label: 'Human-in-the-Loop Workflows',
                href: servicePath('ai-product-ux/human-in-the-loop-workflows'),
              },
            },
            {
              icon: 'shield-check',
              when: 'When failure is consequential and oversight is the open question.',
              route: {
                label: 'Trust, Control and Recovery',
                href: servicePath('ai-product-ux/trust-control-recovery'),
              },
            },
            {
              icon: 'graph-up',
              when: 'When retrieval and ranking decide what a person sees, and why.',
              route: {
                label: 'AI Search and Recommendation',
                href: servicePath('ai-product-ux/ai-search-recommendation'),
              },
            },
          ],
        },
      ],
    },
  ],
  close: {
    eyebrow: 'Start a project',
    heading: 'Share the AI interaction that needs clearer rules',
    body: 'The interaction, the evidence behind it and the decision rule that needs to become explicit.',
    points: [
      {
        label: 'Send one scenario',
        detail: 'What the model does, and what it may affect. A rough brief is enough.',
      },
      {
        label: 'A reply within a day',
        detail: 'One business day, with what the record needs next.',
      },
    ],
    note: 'Do not include credentials, regulated records or confidential source material.',
  },
};
