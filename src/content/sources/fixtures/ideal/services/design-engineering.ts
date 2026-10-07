import type { ServiceStory } from '@/lib/service-story';
import { ANCHORS, anchorHref, auditPath, ROUTES, servicePath } from '@/lib/routes';

import { CLUTCH_RATING } from '../../ratings';

const ENQUIRY = anchorHref(ANCHORS.enquiry);
const AUDIT = {
  label: 'Start with a Design-to-Code Audit',
  href: auditPath('design-to-code-audit'),
};

/**
 * /services/design-engineering, designed — recomposed from the UI kit on 6 Oct 2026 (visual-direction
 * § 8.2). Copy is the CMS's own, re-cut to the § 1.5 budgets; every edit is logged, old and new, in
 * docs/content-changes.md, "Design Engineering recomposed" and its fix rounds. The sections say what
 * the page argues; the template decides how each is laid out from the job its blocks do (ServicePage
 * plan.ts), so no field here is a layout.
 *
 *   hero        the claim
 *   pressures   four pressures code meets that a static screen never does — B, beside a hand over a
 *               sketched screen (fix round 2: a portrait source, so the 4:5 crop keeps its subject)
 *   evidence    what only running code can settle — E, the Record as a boxed table under a stacked
 *               head (7 Oct 2026, owner: tables are boxed; the H-row is retired)
 *   slice       a slice of the product, running — I, the page's one full-width photograph (fix
 *               round 2: the page had no large image; the evidence band's deep link moved here)
 *   outputs     four kinds of output, each declared before it is built — F, beside the sketches
 *   thread      one decision kept alive across every form — E, a centred Thread, horizon at its foot
 *   proof       the client's words, the quote at the display role — G on tint (fix round 2: the
 *               case card read as a third case two bands early; it joined the work set)
 *   work        three cases where code or components carried the decision — M, covers in a row
 *   offer       the Design-to-Code Audit — K, landscape, photo first on a phone
 *   lasts       what lasts — J, the page's display-scale statement, the corner texture with it; between
 *               K and the router, so at 390 no three bands running end in rows
 *   routes      the four specialist services — C-icon, icon cards beside the studio crit
 *   questions   delivery, what an engagement leaves behind, AI-written code, AI products — D-faq
 *               (fix round 2: the deliverables were a third ruled list in eight bands)
 *   close       the form — L
 */
export const designEngineering: ServiceStory = {
  slug: 'design-engineering',
  name: 'Design Engineering',
  seo: {
    title: 'Design engineering from intent to production | Tcules',
    description:
      'Use coded prototypes, design-to-code practice, frontend systems and implementation QA to keep product intent alive in software.',
  },
  hero: {
    title: 'Keep product intent alive as it becomes software',
    lead: 'A design decision can be persuasive in a prototype and still weaken on the way into software. We keep it intact in code.',
    actions: [{ label: 'Start a project', href: ENQUIRY }, AUDIT],
    illustration: {
      src: '/illustrations/services/design-engineering.paper.svg',
      width: 737,
      height: 560,
    },
  },
  /* Photographs (visual-direction § 5.5 to § 5.7): a warm-family page. The B, I, K and aside photos are
     § 5.6's (SERVICE_PHOTO_SLOTS in src/lib/photos.ts). The stand-in pool is in order of preference,
     studio first, drawn from the rest of the catalogue; pickStandIn enforces that. */
  photos: {
    family: 'warm',
    standIns: [
      'studio-session-talk',
      'studio-sticky-board-ux',
      'studio-team-holi',
      'workshop-brick-room',
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
      id: 'pressures',
      eyebrow: 'Where intent weakens',
      heading: 'Where screens run out',
      lead: 'Four pressures a static screen never meets. We hold product and frontend reasoning as one responsibility.',
      blocks: [
        {
          kind: 'signals',
          columns: 2,
          items: [
            {
              icon: 'database',
              title: 'Real data',
              body: 'It runs past the layout that was drawn for it.',
            },
            {
              icon: 'clock-circle',
              title: 'Real waiting',
              body: 'Latency adds states between the ones anybody designed.',
            },
            {
              icon: 'lock',
              title: 'Permissions',
              body: 'They remove actions the design assumed would be there.',
            },
            {
              icon: 'code',
              title: 'Component APIs',
              body: 'They make the wrong behaviour the easiest one to build.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'code-answers',
      eyebrow: 'Static or coded',
      heading: 'Code answers what a screen cannot',
      lead: 'A screen settles hierarchy, flow and visual direction. These six questions need something that runs.',
      blocks: [
        {
          kind: 'record',
          title: 'What a screen leaves open',
          columns: { field: 'Left open', question: 'What only running code settles' },
          items: [
            {
              field: 'Narrow widths and zoom',
              question: 'Does the reading order survive a phone and 400% zoom?',
              icon: 'smartphone',
            },
            {
              field: 'Data density',
              question: 'Does the layout hold when the real dataset arrives?',
              icon: 'database',
            },
            {
              field: 'Motion and drag',
              question: 'Does movement explain each change, and can a drag be undone?',
              icon: 'refresh',
            },
            {
              field: 'Model response',
              question: 'What does the interface show while the model is still answering?',
              icon: 'cpu',
            },
            {
              field: 'Keyboard operation',
              question: 'Can every action be reached and finished without a pointer?',
              icon: 'key',
            },
            {
              field: 'Component constraints',
              question: 'Does the library make the intended behaviour easy to build?',
              icon: 'widget',
            },
          ],
        },
      ],
    },
    {
      type: 'banner',
      id: 'coded-slice',
      eyebrow: 'Coded prototyping',
      heading: 'A slice of the product, running',
      lead: 'The narrowest code that settles what a screen leaves open, before anyone treats the design as done.',
      action: {
        label: 'What a coded slice settles',
        href: servicePath('design-engineering/coded-prototyping'),
      },
    },
    {
      type: 'section',
      id: 'declared-first',
      eyebrow: 'Its job is declared first',
      heading: 'Not all code is production code',
      lead: 'Every output’s job is stated before it is built, so nobody mistakes a proof for a release.',
      blocks: [
        {
          kind: 'steps',
          items: [
            {
              title: 'Behavioural proof',
              body: 'Answers one question about how the product behaves. Then it may be thrown away.',
            },
            {
              title: 'Design-system code',
              body: 'A contract other product teams can build on, with its states and documentation.',
            },
            {
              title: 'Production slice',
              body: 'Enters your architecture, review, testing and security path like any other code.',
            },
            {
              title: 'Release candidate',
              body: 'Accepted against the running product, and ready to ship.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'one-decision',
      eyebrow: 'One thread',
      heading: 'One decision, kept alive in every form',
      lead: 'Six forms, each one checked against the form before it.',
      blocks: [
        {
          kind: 'thread',
          items: [
            { title: 'Question', body: 'What static review could not settle.' },
            { title: 'Probe', body: 'The narrowest code that answers it.' },
            { title: 'Contract', body: 'The states and API it requires.' },
            { title: 'Build', body: 'The decision, inside the product.' },
            { title: 'Review', body: 'Each difference, classified.' },
            { title: 'Decision', body: 'Kept, with its evidence.' },
          ],
          loop: 'A finding that contradicts the decision reopens the question, not just the code.',
        },
      ],
    },
    {
      type: 'section',
      id: 'client-view',
      eyebrow: 'Proof',
      heading: 'In a client’s words',
      lead: 'From a product we carried from specialist research into component-led interface work.',
      blocks: [
        {
          kind: 'proof',
          quote: {
            text: 'The workflow between our teams was seamless. I found the team at Tcules to be knowledgeable, friendly and research oriented.',
            name: 'Ashok Mohanty',
            company: 'Auxentios',
          },
          /* No case (fix round 2): beside the quote it read as a third card for the work band, a
             band early. The quote alone takes the display role under the H-row; its case is the
             work set's third cover. */
          rating: CLUTCH_RATING,
        },
      ],
    },
    {
      type: 'section',
      id: 'work',
      eyebrow: 'Design Engineering work',
      heading: 'Code that tested the decision',
      lead: 'Code tested the decision, or components carried it. None is a production release.',
      blocks: [
        {
          kind: 'cases',
          items: [
            {
              slug: 'legacy-saas-modernisation-information-architecture',
              client: 'Benchmark Gensuite · Prototypes',
              title: 'Effort, brought into design review',
              body: 'Coded prototypes surfaced effort and a drag-and-drop dependency early.',
            },
            {
              slug: 'ai-native-building-energy-product-connectx',
              client: 'ConnectX · Coded demonstration',
              title: 'Intent connected to data, modules and a twin',
              body: 'A coded demo linked conversational intent to data, modules and a digital twin.',
            },
            {
              slug: 'consumer-grade-ux-in-enterprise-saas-a-case-study-on-mvp-design-for-cpq-software',
              client: 'Auxentios · Industrial CPQ',
              title: 'Components from a specialist model',
              body: 'Eight specialist interviews, carried into one product model and its components.',
            },
          ],
        },
      ],
    },
    {
      type: 'offer',
      id: 'design-to-code-audit',
      eyebrow: 'Design-to-Code Audit',
      heading: 'Not sure where intent is being lost?',
      body: 'A Design-to-Code Audit traces one surface from the accepted decision to the running product.',
      points: [
        { label: 'One surface, decision to build' },
        { label: 'Every divergence, classified' },
        { label: 'The first slice to fix' },
      ],
      actions: [AUDIT],
    },
    {
      type: 'statement',
      id: 'what-lasts',
      eyebrow: 'What lasts',
      text: 'Prototype code may be thrown away. The decision it settled never is.',
      action: {
        label: 'How a build is accepted',
        href: servicePath('design-engineering/implementation-qa'),
      },
    },
    {
      type: 'section',
      id: 'first-slice',
      eyebrow: 'Go narrower',
      heading: 'Four specialist services',
      lead: 'Once you know where intent is lost, a narrower service settles it faster.',
      blocks: [
        {
          /* Icons again (fix round 2): with the deliverables in the FAQ there is no other icon set in
             reach, and as text-only rows the router left its head column empty. */
          kind: 'router',
          items: [
            {
              when: 'When a live behaviour, a dataset or a dependency must be tested in code.',
              route: {
                label: 'Coded Prototyping',
                href: servicePath('design-engineering/coded-prototyping'),
              },
              icon: 'code',
            },
            {
              when: 'When a settled interaction needs a contract the team can build to.',
              route: {
                label: 'Design to Code',
                href: servicePath('design-engineering/design-to-code'),
              },
              icon: 'ruler-pen',
            },
            {
              when: 'When shared coded foundations keep drifting from the design.',
              route: {
                label: 'Frontend Design Systems',
                href: servicePath('design-engineering/frontend-design-systems'),
              },
              icon: 'widget',
            },
            {
              when: 'When the running product must be tested against its intended behaviour.',
              route: {
                label: 'Implementation QA',
                href: servicePath('design-engineering/implementation-qa'),
              },
              icon: 'checklist',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'questions',
      eyebrow: 'Questions',
      heading: 'Working inside your delivery',
      blocks: [
        {
          kind: 'faq',
          items: [
            {
              question: 'Does the code produced here ship to production?',
              answerHtml:
                '<p>Only when production delivery and acceptance are in scope. Prototype code may exist solely to answer a question; production components or slices enter your normal architecture, review, testing, security and release path.</p>',
            },
            {
              question: 'What does an engagement leave behind?',
              answerHtml:
                '<p>Depending on scope: a coded demonstration, with the limits of what it proves stated; production-ready frontend components, matched to the design both ways; realistic data and state fixtures your tests can reuse; acceptance records for responsive, keyboard and screen-reader checks; a divergence ledger of every difference between design and build; and a stated hand-off boundary. A prototype is never passed off as production.</p>',
            },
            {
              question: 'Can Tcules work inside our team and codebase?',
              answerHtml:
                '<p>Yes, when the approved access, stack and collaboration model support it. The first scope may be a bounded coded proof, one component family or a review record. Your teams keep the architecture, security and release responsibilities assigned to them.</p>',
            },
            {
              question: 'Does Tcules use AI to write the code?',
              answerHtml:
                '<p>Inside your approved environment, for code understanding, option generation, component implementation, test preparation and documentation. A practitioner still accepts product behaviour, semantics and accessibility, security-relevant boundaries and release readiness. Generated code enters the same path as written code.</p>',
            },
            {
              question: 'What changes when the product itself uses AI?',
              answerHtml:
                '<p>The coded slice makes model behaviour tangible. It exposes latency, streaming, tool calls, incomplete states, evidence, correction and recovery before the interface is treated as settled.</p>',
            },
          ],
        },
      ],
    },
  ],
  close: {
    eyebrow: 'Start a project',
    heading: 'Show us where product intent is getting lost',
    body: 'Name the point where accepted intent weakens.',
    points: [
      {
        label: 'Send the point where intent is lost',
        detail: 'One disputed interaction is enough. A rough brief is fine.',
      },
      {
        label: 'A reply within a day',
        detail: 'One business day, with the first slice it points to.',
      },
    ],
    note: 'Do not include credentials, regulated records or confidential source material.',
  },
};
