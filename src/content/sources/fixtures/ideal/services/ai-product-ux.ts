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
 * § 8.2), fix rounds 1 and 2 the same day. Copy is the CMS's own, re-cut to the § 1.5 budgets, except
 * the fields content-changes.md § 8 marks NEW (two B signals, the record's Accountability question),
 * which are the studio's writing and wait for the owner's sign-off. Every edit is logged there, old
 * and new. The sections say what the page argues and the template decides how each is laid out
 * (ServicePage plan.ts), with one exception the schema still forces: `columns` on `signals` and
 * `ledger` is a column count, which is layout. service-story.ts makes it a required content field,
 * against the 6 Oct ruling that the template decides arrangement; it is set here only because the
 * type demands it (the B split and the numbered ledger both ignore it).
 *
 *   hero      the claim
 *   signals   where an AI feature loses people — B, four tiles beside the photograph
 *   clients   who we have shipped with — H, with the sourced rating
 *   roles     the role the model plays, least authority to most — E, the authority spectrum
 *   authority inform, suggest, prepare, execute — E, the thread, with its way back
 *   record    the responsibility record, 01 to 08 — D, numbered rows beside the studio crit
 *   offer     the readiness assessment, for the scope not yet known — K, copy beside a portrait photo
 *   statement the claim the page stands on, at scale — J, with the texture's corner field
 *   scale     twelve AI products, and what the work combined — D, the figure as the aside
 *   evidence  three of the twelve, under different conditions — M, the real covers
 *   questions evaluation, approval, our own AI use, where to read — D-faq
 *   routes    the four specialisms — the list router
 *   close     the form — L
 *
 * There is no G proof band: no attributable quote from an AI engagement exists yet, and the one
 * approved quote (Auxentios, CPQ) is not AI work. The scale moment is the stat band instead. When a
 * quote exists, a `proof` section between the statement and the evidence gets the tint band and the
 * `horizon` above it from the plan.
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
     § 5.6's (SERVICE_PHOTO_SLOTS in src/lib/photos.ts; fix round 2 took K to `pair-laptop-notebook`,
     a photo no other page's pool names, and gave B back its § 5.6 frame). The stand-in pool is in
     order of preference, studio first, drawn from the rest of the catalogue; pickStandIn enforces
     that. The three case cards take their real covers from the listing, so the pool is only the
     fallback. */
  photos: {
    family: 'cool',
    standIns: ['studio-session-talk', 'team-laptops-table'],
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
      heading: 'Where AI loses people',
      lead: 'The symptom is in the interface. The cause is the model’s role.',
      blocks: [
        {
          kind: 'signals',
          columns: 2,
          items: [
            {
              icon: 'eye',
              title: 'Every answer re-checked',
              body: 'People cannot see the sources behind an output, or how sure the model is, so they redo the work.',
            },
            {
              icon: 'undo-left',
              title: 'Changes nobody can undo',
              body: 'The model edits what a person owns, or runs steps with no preview and no way to stop.',
            },
            {
              icon: 'chat-round-dots',
              title: 'Help nobody asked for',
              body: 'Output arrives in a form nobody requested, and fixing it takes longer than doing the work.',
            },
            {
              icon: 'close-circle',
              title: 'Nobody owns the error',
              body: 'When a result is wrong, no one can say who should have caught it, or where.',
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
          meter: { kind: 'authority', label: 'Authority' },
          columns: { name: 'The model', when: 'Introduces', settles: 'So the product needs' },
          items: [
            {
              name: 'Generates a candidate',
              when: 'Output a person did not ask for in that form.',
              settles: 'Editing, and limits on source.',
            },
            {
              name: 'Transforms supplied material',
              when: 'Changes to something a person owns.',
              settles: 'A visible difference, and the original kept.',
            },
            {
              name: 'Retrieves and synthesises',
              when: 'Claims on evidence the reader cannot see.',
              settles: 'The sources, and what is missing.',
            },
            {
              name: 'Recommends',
              when: 'A preferred option among several.',
              settles: 'The basis, and the alternatives.',
            },
            {
              name: 'Acts with delegated authority',
              when: 'Consequence on someone’s behalf.',
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
      lead: 'Set per action, never once per feature, from what the action changes and whether it reverses.',
      blocks: [
        {
          kind: 'thread',
          items: [
            {
              title: 'Inform',
              body: 'The model tells a person something. The person decides.',
            },
            { title: 'Suggest', body: 'The model proposes. A person chooses, and sees why.' },
            { title: 'Prepare', body: 'The model does the work. A person reviews it first.' },
            { title: 'Execute', body: 'The model acts. A person can watch, stop and undo it.' },
          ],
          loop: 'Every level keeps a way back to a person.',
        },
      ],
    },
    {
      type: 'section',
      id: 'responsibility-record',
      eyebrow: 'Kept through delivery',
      heading: 'Eight questions per scenario',
      lead: 'One record for every AI scenario that matters, kept through design and engineering.',
      blocks: [
        {
          kind: 'record',
          title: 'Responsibility record',
          columns: { field: 'Field', question: 'The question it answers' },
          items: [
            { field: 'User work', question: 'Which task deserves assistance?', icon: 'user' },
            { field: 'Model role', question: 'What may the model influence?', icon: 'cpu' },
            {
              field: 'Evidence',
              question: 'Which sources support the output?',
              icon: 'document-text',
            },
            {
              field: 'Uncertainty',
              question: 'What can be missing, wrong or unstable?',
              icon: 'question-circle',
            },
            {
              field: 'Authority',
              question: 'What happens without human approval?',
              icon: 'key',
            },
            {
              field: 'Evaluation',
              question: 'What counts as useful and safe here?',
              icon: 'checklist',
            },
            {
              field: 'Accountability',
              question: 'Who answers when the result is wrong?',
              icon: 'flag',
            },
            {
              field: 'Recovery',
              question: 'How can a person reverse the result?',
              icon: 'refresh',
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
      body: 'The readiness assessment names the work worth assisting, the state the model touches and the authority it receives, so the route is chosen from the work.',
      actions: [
        {
          label: 'Request the readiness assessment',
          href: auditPath('ai-product-ux-readiness'),
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
      id: 'scale',
      eyebrow: 'Across AI products',
      heading: 'From framing into code',
      lead: 'Copilots, AI-native tools, AI-powered products and integrations: the same four strands of work in each.',
      blocks: [
        {
          kind: 'stat',
          value: '12',
          label: 'AI products we have worked on',
          body: 'Copilots, AI-native tools, AI-powered products and integrations.',
          items: [
            {
              title: 'Framing and research',
              body: 'Opportunity framing, and research with target users and domain experts.',
            },
            {
              title: 'Interaction and control',
              body: 'Source, confidence and explanation patterns, with human review and control.',
            },
            {
              title: 'Evaluation and acceptance',
              body: 'Acceptance sets built from real decisions and the conditions where they fail.',
            },
            {
              title: 'Prototypes into product',
              body: 'Coded prototypes and engineering, integrated into existing roles, state and design systems.',
            },
          ],
        },
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
      blocks: [
        {
          kind: 'router',
          items: [
            {
              when: 'When the product is delegating a bounded task to a model.',
              route: {
                label: 'AI Copilots and Agents',
                href: servicePath('ai-product-ux/ai-copilots-agents'),
              },
            },
            {
              when: 'When review, escalation and correction are central to the work.',
              route: {
                label: 'Human‑in‑the‑Loop Workflows',
                href: servicePath('ai-product-ux/human-in-the-loop-workflows'),
              },
            },
            {
              when: 'When failure is consequential and oversight is the open question.',
              route: {
                label: 'Trust, Control and Recovery',
                href: servicePath('ai-product-ux/trust-control-recovery'),
              },
            },
            {
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
    body: 'The interaction, and the decision rule it needs made explicit.',
    points: [
      {
        label: 'Send one scenario',
        detail: 'A rough brief is enough.',
      },
    ],
    note: 'Do not send credentials or confidential material.',
  },
};
