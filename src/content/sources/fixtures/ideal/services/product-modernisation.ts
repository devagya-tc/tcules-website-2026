import type { ServiceStory } from '@/lib/service-story';
import { auditPath, servicePath, toolPath, ANCHORS, anchorHref, ROUTES } from '@/lib/routes';

import { CLIENT_MARKS } from '../../clients';
import { CLUTCH_RATING } from '../../ratings';

const ENQUIRY = anchorHref(ANCHORS.enquiry);
const ASSESSMENT = auditPath('product-modernisation-assessment');

/**
 * /services/product-modernisation, designed — recomposed from the UI kit on 6 Oct 2026
 * (visual-direction § 8.2, the product-design worked example), fix round 1 the same day. Copy is the
 * CMS's own, re-cut to the § 1.5 budgets; every edit is logged, old and new, in
 * docs/content-changes.md ("Product Modernisation recomposed"). The sections say what the page
 * argues; the template decides how each is laid out from the job its blocks do (ServicePage
 * plan.ts). One layout field remains: `signals.columns`, which the content model still requires —
 * the template should derive it from the item count, as plan.ts already does for the counterweight.
 *
 *   hero        the claim
 *   four-views  sales, support, engineering, customers — B, four tiles beside the wall-sketch photo
 *   clients     who we have shipped with — H
 *   choose      the least disruptive change, five on one scale — E, the spectrum
 *   work        two cases, one went deeper and one stayed selective — C-pair, the spectrum shown
 *   continuity  keep what carries the work, let go of habit — N, the contrast pair
 *   transition  both products live, designed in between — E, the bridge (horizon above G)
 *   proof       a client's words beside the case they came from — G-case, the tint band
 *   method      five steps from diagnosis to the next release — F
 *   offer       the assessment — K, landscape
 *   routes      three narrower services — the list router (D) beside its photograph
 *   close       the form — L
 */
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
      { label: 'Start a project', href: ENQUIRY },
      { label: 'Request the free assessment', href: ASSESSMENT },
    ],
    illustration: {
      src: '/illustrations/services/product-modernisation.paper.svg',
      width: 787,
      height: 695,
    },
  },
  /* Photographs (visual-direction § 5.5 to § 5.7): a cool-family page. The B, K and aside photos are
     § 5.6's (SERVICE_PHOTO_SLOTS in src/lib/photos.ts). The stand-in pool is in order of preference,
     studio first, drawn from the rest of the catalogue; pickStandIn enforces that. */
  photos: {
    family: 'cool',
    standIns: [
      'studio-whiteboard-crit',
      'studio-session-talk',
      'studio-desk-pairing',
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
      id: 'four-views',
      eyebrow: 'Four views, one product',
      heading: 'Established software rarely has one problem',
      blocks: [
        {
          kind: 'signals',
          columns: 4,
          items: [
            {
              icon: 'graph-up',
              title: 'Sales',
              body: 'Sees an ageing product, and a roadmap slowed by what it carries.',
            },
            {
              icon: 'chat-round-dots',
              title: 'Support',
              body: 'Sees recurring exceptions, handled by hand, release after release.',
            },
            {
              icon: 'server',
              title: 'Engineering',
              body: 'Sees dependencies that make every change expensive.',
            },
            {
              icon: 'users-group-rounded',
              title: 'Customers',
              body: 'Know the current behaviour, workarounds included. That learning must not break.',
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
            CLIENT_MARKS.knovos,
            CLIENT_MARKS.quoter,
            CLIENT_MARKS.safexpay,
            CLIENT_MARKS.gttools,
            CLIENT_MARKS.doodle,
            CLIENT_MARKS.omny,
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'choose-an-intervention',
      eyebrow: 'Capability by capability',
      heading: 'The least disruptive change that works',
      lead: 'Every intervention is right somewhere, and costly when one label is applied to the whole product.',
      more: {
        label: 'All seven, in the worksheet',
        href: toolPath('audit-redesign-modernise-rebuild'),
      },
      blocks: [
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
              when: 'A stable capability costs little.',
              settles: 'What evidence would reopen it?',
            },
            {
              name: 'Repair',
              when: 'Local friction hides useful behaviour.',
              settles: 'Which defect can change without reopening the model?',
            },
            {
              name: 'Redesign',
              when: 'Roles, sequence or exceptions no longer fit.',
              settles: 'What should stay recognisable?',
            },
            {
              name: 'Replatform',
              when: 'The platform is the binding constraint.',
              settles: 'Which behaviour and data must survive?',
            },
            {
              name: 'Selective rebuild',
              when: 'One subsystem is beyond extension.',
              settles: 'Can its boundary hold against hidden dependencies?',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'work',
      eyebrow: 'Modernisation work',
      heading: 'Change at the layer causing the cost',
      lead: 'Two products where the change went exactly as deep as the cost, and stopped there.',
      blocks: [
        {
          kind: 'cases',
          items: [
            {
              slug: 'legacy-saas-modernisation-information-architecture',
              client: 'Benchmark Gensuite · went deeper',
              title: 'A visual upgrade exposed the IA',
              body: 'A reused scope selector showed unclear boundaries; the IA changed, continuity held.',
            },
            {
              slug: 'enterprise-workflow-redesign-dealpath-real-estate',
              client: 'Dealpath · stayed selective',
              title: 'The density stayed; one path changed',
              body: 'Listings gained a clearer reading order; one creation path changed.',
            },
          ],
        },
      ],
    },
    {
      type: 'section',
      id: 'continuity',
      eyebrow: 'What must survive',
      heading: 'Continuity belongs in the product plan',
      lead: 'Some familiarity reflects a sound model; some is effort spent on weak design. The plan tells them apart.',
      blocks: [
        {
          kind: 'fit',
          yes: {
            heading: 'Keep what still carries the work',
            items: [
              'Essential work, completing during the move and after it',
              'Records, history and what they mean',
              'Roles, permissions and approval authority',
              'Contractual and service commitments',
            ],
          },
          no: {
            heading: 'Let go of what only carries habit',
            items: [
              'Steps that exist only because the old platform required them',
              'Workarounds built around a defect the change removes',
              'Labels and groupings the work has outgrown',
            ],
          },
        },
      ],
    },
    {
      type: 'section',
      id: 'transition',
      eyebrow: 'Both products live',
      heading: 'The transition is designed too',
      lead: 'Live modernisation creates temporary product work a final mock-up never shows. Tcules designs it before approval.',
      blocks: [
        {
          kind: 'bridge',
          from: 'Current product',
          to: 'Target product',
          label: 'Designed in between',
          phases: { before: 'Before', during: 'During the move', after: 'After' },
          states: {
            from: 'Current product, still running',
            to: 'Target product, already running',
          },
          summary:
            'Designed in between: during the move, the current product and the target product are both live.',
          items: [
            'Old and new navigation together',
            'Converted and unconverted records',
            'Compatibility and translation layers',
            'Feature flags and release groups',
            'Fallback routes for a failed migration',
            'Criteria for retiring the temporary state',
          ],
        },
        /* Review mode only (`?slots=1`): the illustration this band is waiting for. Kept as the
           record of what the image must say, and as the stress story's one `slot` variant. */
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
          rating: CLUTCH_RATING,
        },
      ],
    },
    {
      type: 'section',
      id: 'how-it-comes-together',
      eyebrow: 'How the work runs',
      heading: 'From diagnosis to the next release',
      lead: 'End-to-end responsibility, or inside a team that keeps engineering, data or release. Ownership is written first.',
      blocks: [
        {
          kind: 'steps',
          items: [
            {
              title: 'Diagnose the running product',
              body: 'Its model, evidence, dependencies and change process.',
            },
            {
              title: 'Decide each intervention',
              body: 'Preserve, repair, redesign, replatform, rebuild or retire.',
            },
            {
              title: 'Prove it in a slice',
              body: 'A prototype or coded slice tests the decision.',
            },
            {
              title: 'Build and transition',
              body: 'Foundations, code, migration and recovery, as scoped.',
            },
            {
              title: 'Review the evidence',
              body: 'Then decide whether the next capability moves.',
            },
          ],
        },
      ],
    },
    {
      type: 'offer',
      id: 'assessment',
      eyebrow: 'Not sure where to start?',
      heading: 'Settle the boundary before delivery starts',
      body: 'The Product Modernisation Assessment walks the product through and decides, capability by capability, what to repair, redesign, replatform or rebuild, and what stays familiar.',
      actions: [{ label: 'Request the free assessment', href: ASSESSMENT }],
    },
    {
      type: 'section',
      id: 'choose',
      eyebrow: 'Go narrower',
      heading: 'When the layer is already clear',
      lead: 'A narrower service settles a known boundary faster.',
      blocks: [
        {
          kind: 'router',
          items: [
            {
              when: 'The cost sits in the experience, and the model underneath still holds.',
              route: {
                label: 'Product Redesign',
                href: servicePath('product-modernisation/product-redesign'),
              },
            },
            {
              when: 'Dependencies and accumulated change cost are the binding constraint.',
              route: {
                label: 'Legacy Software Modernisation',
                href: servicePath('product-modernisation/legacy-software-modernisation'),
              },
            },
            {
              when: 'The platform move is decided; the behaviour that must survive is not.',
              route: {
                label: 'Replatforming Product Design',
                href: servicePath('product-modernisation/replatforming-product-design'),
              },
            },
          ],
        },
      ],
    },
  ],
  close: {
    eyebrow: 'Start a project',
    heading: 'Start with the capability that cannot stay as it is',
    body: 'The capability, what depends on it, and the change that can no longer wait.',
    points: [
      {
        label: 'Send one capability',
        detail: 'And what depends on it. A rough brief is enough.',
      },
      {
        label: 'A reply within a day',
        detail: 'One business day. Incomplete evidence becomes uncertainty to test.',
      },
    ],
    note: 'Do not include credentials, regulated records or confidential source material.',
  },
};
