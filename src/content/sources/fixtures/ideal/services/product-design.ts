import type { ServiceStory } from '@/lib/service-story';
import { ANCHORS, anchorHref, auditPath, ROUTES, servicePath } from '@/lib/routes';

import { CLIENT_MARKS } from '../../clients';
import { CLUTCH_RATING } from '../../ratings';

const ENQUIRY = anchorHref(ANCHORS.enquiry);

/**
 * /services/product-design, designed — recomposed from the UI kit on 6 Oct 2026 (visual-direction
 * § 8.2). Copy is the CMS's own, re-cut to the § 1.5 budgets; every edit is logged, old and new, in
 * docs/content-changes.md § 6. The sections say what the page argues; the template decides how each
 * is laid out from the job its blocks do (ServicePage plan.ts), so no field here is a layout.
 *
 *   hero      the claim
 *   signals   what the screen may be telling you — B, beside a screen in use
 *   clients   who we have shipped with — H, with the sourced rating
 *   method    five steps, each leaving an artefact — F, beside the wireframe sketch
 *   example   the worked example as the chain one decision moves through — E, a Thread
 *   proof     the work, then the client's words — G-case, the tint band
 *   work      two more cases — C-pair
 *   statement how the work runs, said once at scale — J (fix round 1: the I banner's job, which
 *             spent a 660-tall band and a soft photograph on one link)
 *   offer     examine the slice first — K, beside a screen-work photograph
 *   routes    the specialist services — the C-icon router
 *   fit       who is involved — N
 *   close     the form — L
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
      { label: 'Start a project', href: ENQUIRY },
      { label: 'Start with a UX Product Audit', href: auditPath('ux-product-audit') },
    ],
    illustration: {
      src: '/illustrations/services/product-design.paper.svg',
      width: 962,
      height: 714,
    },
  },
  /* Photographs (visual-direction § 5.5 to § 5.7): a warm-family page. The B, I, K and aside photos
     are § 5.6's (SERVICE_PHOTO_SLOTS in src/lib/photos.ts). The stand-in pool is in order of
     preference, studio first, drawn from the rest of the catalogue; pickStandIn enforces that. */
  photos: {
    family: 'warm',
    standIns: [
      'studio-session-talk',
      'studio-team-holi',
      'hand-mouse-detail',
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
      id: 'signals',
      eyebrow: 'What the screen says',
      heading: 'Where the problem shows first',
      lead: 'A visual complaint often points at a rule underneath.',
      blocks: [
        {
          kind: 'signals',
          columns: 4,
          items: [
            {
              icon: 'question-circle',
              title: 'A confusing action',
              body: 'May be expressing an ownership or permission rule nobody has settled.',
            },
            {
              icon: 'clock-circle',
              title: 'A slow workflow',
              body: 'May be protecting a real control, or covering a hand-off the product never modelled.',
            },
            {
              icon: 'widget',
              title: 'A crowded dashboard',
              body: 'May be trying to serve several decisions without defining any of them.',
            },
            {
              icon: 'cpu',
              title: 'A polished AI feature',
              body: 'May be hiding what the model used, what it changed, and who answers when it is wrong.',
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
      id: 'method',
      eyebrow: 'What Product Design owns',
      heading: 'From the real work to the build',
      lead: 'One product rule, explained, challenged, implemented and tested. Each step leaves an artefact the team keeps using.',
      blocks: [
        {
          kind: 'steps',
          items: [
            {
              title: 'Read the real work',
              body: 'Who decides, who is affected. It leaves a research record.',
            },
            {
              title: 'Settle the product model',
              body: 'Objects, roles, states and authority, written as one model.',
            },
            {
              title: 'Design the behaviour',
              body: 'Every state and recovery, in an interaction specification.',
            },
            {
              title: 'Test the risky scenario',
              body: 'The riskiest question, prototyped and tested on real cases.',
            },
            {
              title: 'Keep the rule in the build',
              body: 'An implementation trace from the rule to components and tests.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'worked-example',
      eyebrow: 'Worked example · fictional',
      heading: 'Moving one job moves others',
      lead: 'A job is rescheduled after a required input falls through. The product must show what moves with it.',
      blocks: [
        {
          kind: 'thread',
          items: [
            { title: 'Input unavailable', body: 'The job cannot go ahead as planned.' },
            {
              title: 'New date proposed',
              body: 'Proposed, not accepted: the commitment stands.',
            },
            {
              title: 'Dependent work shown',
              body: 'Three jobs that would move, before anyone confirms.',
            },
            { title: 'Owner responds', body: 'The person who must agree is named.' },
            { title: 'Change accepted', body: 'The reason stays with the job afterwards.' },
          ],
          loop: 'A mistaken change has a safe way back to the last accepted plan.',
        },
      ],
    },
    {
      type: 'section',
      id: 'client-view',
      eyebrow: 'Proof',
      heading: 'In a client’s words',
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
            body: 'Research across specialist roles, carried into a product model and component-led interface work.',
          },
        },
      ],
    },
    {
      type: 'section',
      id: 'work',
      eyebrow: 'Connected product decisions',
      heading: 'Relevant Product Design work',
      lead: 'Two more products where the model was settled before the screens were drawn. Each case claims only what its own record shows.',
      blocks: [
        {
          kind: 'cases',
          items: [
            {
              slug: 'doodle-case-study-automating-enterprise-meeting-scheduling',
              client: 'Doodle · Enterprise scheduling',
              title: 'Priority and bookability, modelled first',
              body: 'Meeting type, priority, tentative availability and bookability confidence, connected in one scheduling model.',
            },
            {
              slug: 'saas-ux-ui-case-study-research-and-object-oriented-ux-for-staffing-agencies-software',
              client: 'Scissors · Staffing software',
              title: 'Candidates, pools, jobs and organisations as objects',
              body: 'Research and heuristic review behind an object-oriented redesign of the whole product.',
            },
          ],
        },
      ],
    },
    {
      type: 'statement',
      id: 'how-we-work',
      eyebrow: 'How we work',
      text: 'One accountable team, from the first question to the shipped build.',
      action: { label: 'See how we work', href: ROUTES.howWeWork },
    },
    {
      type: 'offer',
      id: 'examine-the-slice',
      eyebrow: 'Recognise the workflow?',
      heading: 'A workflow that keeps raising questions?',
      body: 'Examine that slice of rules, roles and recovery before the team commits to more screens.',
      points: [
        { label: 'The workflow, walked through with its people' },
        { label: 'The rules, roles and way back beneath it' },
        { label: 'What to design first, and what can wait' },
      ],
      actions: [{ label: 'Start with a UX Product Audit', href: auditPath('ux-product-audit') }],
    },
    {
      type: 'section',
      id: 'specialist-services',
      eyebrow: 'Go narrower',
      heading: 'Specialist Product Design services',
      lead: 'When the problem is located, a narrower service settles it faster.',
      blocks: [
        {
          kind: 'router',
          items: [
            {
              icon: 'users-group-rounded',
              when: 'When people, context or one risky assumption could change the direction.',
              route: { label: 'UX Research', href: servicePath('product-design/ux-research') },
            },
            {
              icon: 'layers',
              when: 'When records, roles, state and navigation no longer agree with the work.',
              route: {
                label: 'IA & Workflow Design',
                href: servicePath('product-design/information-architecture-workflow-design'),
              },
            },
            {
              icon: 'ruler-pen',
              when: 'When the rule is understood, but its states and responsive form are not.',
              route: {
                label: 'Interaction & UI Design',
                href: servicePath('product-design/interaction-ui-design'),
              },
            },
            {
              icon: 'graph-up',
              when: 'When someone must compare, interpret and act, with clear definitions and sources.',
              route: {
                label: 'Data Visualisation',
                href: servicePath('product-design/data-visualisation'),
              },
            },
            {
              icon: 'monitor',
              when: 'When the next commitment needs evidence a static screen cannot give.',
              route: {
                label: 'Prototyping & Testing',
                href: servicePath('product-design/prototyping-usability-testing'),
              },
            },
          ],
          also: {
            icon: 'eye',
            when: 'When you can see the problem but not yet where it sits.',
            link: { label: 'UX Product Audit', href: auditPath('ux-product-audit') },
          },
        },
      ],
    },
    {
      type: 'section',
      id: 'who-is-involved',
      eyebrow: 'Who is involved',
      heading: 'Real access, people who decide',
      blocks: [
        {
          kind: 'fit',
          yes: {
            heading: 'What the work needs from you',
            items: [
              'Realistic access to the product',
              'Relevant research or operating material',
              'Time with people who understand the system',
              'An owner who can settle consequential choices and technical constraints',
            ],
          },
          no: {
            heading: 'Not the right service when',
            items: [
              'The brief allows visual styling only, and forbids discussing behaviour',
              'The team needs a regulated specialist opinion Tcules does not provide',
              'No realistic product, user, data or build context can be shared',
              'The purchase is mainly low-cost production capacity',
            ],
          },
        },
      ],
    },
  ],
  close: {
    eyebrow: 'Start a project',
    heading: 'Share the product decision that needs settling',
    body: 'The decision, the roles it affects and the evidence you already have.',
    points: [
      {
        label: 'Send the decision',
        detail: 'And what you already know about it. A rough brief is enough.',
      },
      {
        label: 'A reply within a day',
        detail: 'One business day, with the questions we need answered first.',
      },
    ],
    note: 'Do not include credentials, regulated records or confidential source material.',
  },
};
