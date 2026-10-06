import type { ServiceStory } from '@/lib/service-story';
import { ANCHORS, anchorHref, auditPath, ROUTES, servicePath } from '@/lib/routes';

import { CLIENT_MARKS } from '../../clients';
import { CLUTCH_RATING } from '../../ratings';

const ENQUIRY = anchorHref(ANCHORS.enquiry);
const AUDIT = auditPath('design-system-audit');

/**
 * /services/design-systems, designed — recomposed from the UI kit on 6 Oct 2026 (visual-direction
 * § 8.2). Copy is the CMS's own, re-cut to the § 1.5 budgets; every edit is logged, old and new, in
 * docs/content-changes.md § 7. The sections say what the page argues; the template decides how each
 * is laid out from the job its blocks do (ServicePage plan.ts), so no field here is a layout.
 *
 *   hero      the claim
 *   symptoms  where the library stops being the system — B, two tiles beside a screen in use,
 *             so the copy column has room for the counterweight field
 *   clients   who we have shipped with — H, with the sourced rating
 *   parts     the five parts that must work as one — E, the parts diagram
 *   statement the test a system has to pass, said once at scale — J
 *   decision  one status through every representation — E, a Thread (horizon above the proof)
 *   proof     a visual system built with the MVP, and the client's words — G-case, the tint band
 *   routes    the four responsibilities, by condition — the C-icon router
 *   offer     diagnose the drift first — K, the Design System Audit
 *   evidence  two more products — C-pair, with the boundary of what they prove
 *   questions what teams ask first — D-faq
 *   close     the form — L
 */
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
      { label: 'Start a project', href: ENQUIRY },
      { label: 'Request free audit', href: AUDIT },
    ],
    illustration: {
      src: '/illustrations/services/design-systems.paper.svg',
      width: 681,
      height: 569,
    },
  },
  /* Photographs (visual-direction § 5.5 to § 5.7): a cool-family page. The B, I, K and aside photos
     are § 5.6's (SERVICE_PHOTO_SLOTS in src/lib/photos.ts). The stand-in pool is in order of
     preference, studio first, drawn from the rest of the catalogue; pickStandIn enforces that. */
  photos: {
    family: 'cool',
    standIns: [
      'studio-whiteboard-crit',
      'studio-session-talk',
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
      id: 'library-is-one-representation',
      eyebrow: 'Symptoms',
      heading: 'Where libraries drift',
      lead: 'Most teams have a library. The drift starts where it meets code and release.',
      blocks: [
        {
          kind: 'signals',
          columns: 2,
          items: [
            {
              icon: 'code',
              title: 'One name, two behaviours',
              body: 'The same component means one thing in Figma and another in code.',
            },
            {
              icon: 'refresh',
              title: 'A version nobody runs',
              body: 'A new release ships while most products stay on an older fork.',
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
            CLIENT_MARKS.doodle,
            CLIENT_MARKS.quoter,
            CLIENT_MARKS.omny,
            CLIENT_MARKS.knovos,
            CLIENT_MARKS.gttools,
            CLIENT_MARKS.latitudepay,
          ],
          rating: CLUTCH_RATING,
        },
      ],
    },
    {
      type: 'section',
      id: 'five-parts',
      eyebrow: 'What the system is',
      heading: 'Five parts, one system',
      lead: 'Four parts are the system. The fifth, the operating model, decides whether the other four stay current.',
      blocks: [
        {
          kind: 'parts',
          items: [
            {
              icon: 'layers',
              name: 'Foundations',
              body: 'Semantic tokens, type, layout, motion, accessibility and content conventions.',
            },
            {
              icon: 'widget',
              name: 'Components',
              body: 'Anatomy, properties, states and interaction contracts, and how they compose.',
            },
            {
              icon: 'ruler-pen',
              name: 'Design assets',
              body: 'Libraries, examples and templates, so designers reuse decisions, not rebuild them.',
            },
            {
              icon: 'code',
              name: 'Code and docs',
              body: 'Runtime components, APIs, stories, tests and guidance anyone can review.',
            },
          ],
          frame: {
            icon: 'refresh',
            name: 'Operating model',
            body: 'Ownership, contribution, exceptions, release, deprecation, migration and adoption.',
          },
        },
      ],
    },
    {
      type: 'statement',
      id: 'the-test',
      eyebrow: 'The test',
      text: 'A system earns use only when its route is easier than the workaround.',
      action: { label: 'See Matter, our open system', href: ROUTES.matterDesignSystem },
    },
    {
      type: 'section',
      id: 'one-decision',
      eyebrow: 'Representative example',
      heading: 'One status, six places it must hold',
      lead: 'A Partly complete status, needed by three products. It must mean the same thing everywhere it appears.',
      blocks: [
        {
          kind: 'thread',
          items: [
            { title: 'Definition', body: 'Some required work is done; some is still open.' },
            { title: 'Token', body: 'Readable without relying on colour alone.' },
            { title: 'Figma', body: 'Properties for label, detail, action and assistive text.' },
            { title: 'Code', body: 'The API exposes the same meaning and actions.' },
            { title: 'Docs and tests', body: 'Usage, keyboard and content cases written down.' },
            { title: 'Release', body: 'Every product knows the version and the change.' },
          ],
          loop: 'Change one alone and products drift: designers detach, and code accepts what design forbids.',
        },
      ],
    },
    {
      type: 'section',
      id: 'client-view',
      eyebrow: 'Proof',
      heading: 'Built with the MVP, not after',
      lead: 'The visual system grew alongside the first release, from the same research, rather than being retrofitted.',
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
            title: 'A visual system built with the MVP',
            body: 'Components, tokens, guidelines and layout rules, from domain research and eight interviews.',
          },
        },
      ],
    },
    {
      type: 'section',
      id: 'choose-the-responsibility',
      eyebrow: 'Start from the condition',
      heading: 'Choose by the system’s condition',
      lead: 'Each service settles one kind of drift. Pick the one your teams are living with.',
      blocks: [
        {
          kind: 'router',
          items: [
            {
              icon: 'flag',
              when: 'Teams disagree on what to share, who owns it, and what it is worth.',
              route: {
                label: 'Design System Strategy',
                href: servicePath('design-systems/design-system-strategy'),
              },
            },
            {
              icon: 'widget',
              when: 'The scope is agreed and needs foundations, components, code and a release path.',
              route: {
                label: 'Implementation',
                href: servicePath('design-systems/design-system-implementation'),
              },
            },
            {
              icon: 'layers',
              when: 'Figma and code describe different contracts, and nobody knows which governs.',
              route: {
                label: 'Figma and Storybook',
                href: servicePath('design-systems/figma-storybook-alignment'),
              },
            },
            {
              icon: 'users-group-rounded',
              when: 'Teams bypass the system, fork it, or stay on old versions.',
              route: {
                label: 'Governance and Adoption',
                href: servicePath('design-systems/governance-adoption'),
              },
            },
          ],
        },
      ],
    },
    {
      type: 'offer',
      id: 'diagnose-the-drift',
      eyebrow: 'Not sure where it drifts?',
      heading: 'Find the cause before investing more',
      body: 'A Design System Audit traces one drifting decision through Figma, code and release, and names what to fix first.',
      points: [
        { label: 'One decision, fully traced' },
        { label: 'Where design and code split' },
        { label: 'What to fix first, and who owns it' },
      ],
      actions: [{ label: 'Start with a Design System Audit', href: AUDIT }],
    },
    {
      type: 'section',
      id: 'evidence',
      eyebrow: 'Evidence',
      heading: 'Design-system work in practice',
      lead: 'Two more products where shared components and rules carried the work. Each claims only what its record shows.',
      blocks: [
        {
          kind: 'cases',
          items: [
            {
              slug: 'doodle-case-study-automating-enterprise-meeting-scheduling',
              client: 'Doodle · Enterprise scheduling',
              title: 'New UI inside an existing system',
              body: 'Bounded interface work that used the existing components, and added the ones it needed.',
            },
            {
              slug: 'legacy-saas-modernisation-information-architecture',
              client: 'Benchmark Gensuite · Enterprise suite',
              title: 'One experience across 75+ applications',
              body: 'An enterprise suite modernised as one design-systems problem, not many redesigns.',
            },
          ],
          note: 'Neither record establishes coded implementation or organisation-wide adoption.',
        },
      ],
    },
    {
      type: 'section',
      id: 'questions',
      eyebrow: 'Questions',
      heading: 'Questions teams ask first',
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
              question: 'Who owns what once the system ships?',
              answerHtml:
                '<p>Tcules can assess, build and operate the shared system: foundations, components, Figma, code, documentation, contribution, release and adoption. Product teams keep product-specific composition, user evidence, the accessibility of what they release, and decision and release authority, throughout. Design Engineering, a separate responsibility, owns product decisions embodied in running frontend work; one engagement can hold both.</p>',
            },
            {
              question: 'Does AI-generated code change any of this?',
              answerHtml:
                '<p>It raises the stakes. Faster generation repeats an ambiguous rule across more surfaces, sooner. Tokens, semantic component names, typed properties, examples, tests and accessibility rules give a generator far better context than a screenshot. Product-specific composition, real content and exceptional states, accessibility and release acceptance still need accountable review.</p>',
            },
          ],
        },
      ],
    },
  ],
  close: {
    eyebrow: 'Start a project',
    heading: 'Start with the part teams work around',
    body: 'The decision, component family or adoption path teams keep working around.',
    points: [
      {
        label: 'Send the decision',
        detail: 'The one teams keep remaking. One component family is enough.',
      },
      {
        label: 'A reply within a day',
        detail: 'One business day, with the first scope it points to.',
      },
    ],
    note: 'Do not include credentials, regulated records or confidential source material.',
  },
};
