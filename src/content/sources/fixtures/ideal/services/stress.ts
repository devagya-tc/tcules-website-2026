import type { ServiceStory, StoryBlock, StorySection } from '@/lib/service-story';
import { ANCHORS, anchorHref, auditPath, ROUTES } from '@/lib/routes';

import { CLIENT_MARKS } from '../../clients';
import { CLUTCH_RATING } from '../../ratings';
import { aiProductUx } from './ai-product-ux';
import { designEngineering } from './design-engineering';
import { designSystems } from './design-systems';
import { productDesign } from './product-design';
import { productModernisation } from './product-modernisation';
import { softwareDevelopment } from './software-development';

/**
 * THE STRESS STORY — every StoryBlock variant, each in a band of its own, so one route proves the
 * ServicePage template renders the whole content model (ServicePage audit, 6 Oct 2026). It is NOT a
 * page anyone should read in order: it is the template's specimen, at /design/service-page/stress.
 *
 * The blocks are the six stories' own, collected rather than restated, so a block shape that changes
 * in a story changes here too; the variants no story uses yet are added below, each beside the one it
 * varies (a ledger with a heading and numbers, a list router, three cases, a proof without a case,
 * a spectrum with no meter, a stat with no rows, the logos strip). It carries no § 5.6 photo slots,
 * so it also proves every band's no-photograph path (B degrades to tiles, asides drop).
 */
const SIX = [
  productDesign,
  softwareDevelopment,
  designEngineering,
  designSystems,
  aiProductUx,
  productModernisation,
];

/** The first block of each kind across the six stories, in the order the content model lists them. */
function firstOf<K extends StoryBlock['kind']>(
  kind: K,
): Extract<StoryBlock, { kind: K }> | undefined {
  for (const story of SIX) {
    for (const section of story.sections) {
      if (section.type !== 'section') continue;
      const found = section.blocks.find((block) => block.kind === kind);
      if (found) return found as Extract<StoryBlock, { kind: K }>;
    }
  }
  return undefined;
}

const EXTRA = {
  'ledger-numbered': {
    kind: 'ledger',
    heading: 'A numbered ledger with a heading',
    columns: 1,
    marker: 'number',
    items: [
      { title: 'The first named thing', body: 'One line on what it is and why it is kept.' },
      { title: 'The second named thing', body: 'One line on what it is and why it is kept.' },
      { title: 'The third named thing', body: '' },
    ],
  },
  'router-list': {
    kind: 'router',
    items: [
      {
        when: 'When the condition is the first one named.',
        route: { label: 'First route', href: ROUTES.services },
      },
      {
        when: 'When the condition is the second one named.',
        route: { label: 'Second route', href: ROUTES.howWeWork },
      },
    ],
    also: {
      when: 'When the condition cannot be named yet.',
      link: { label: 'An audit', href: auditPath('ux-product-audit') },
    },
  },
  'proof-alone': {
    kind: 'proof',
    quote: {
      text: 'A quotation with no case beside it renders as the typographic quote, centred, with the score under it.',
      name: 'A named speaker',
      role: 'Their role',
      company: 'Their company',
    },
    rating: CLUTCH_RATING,
  },
  'spectrum-plain': {
    kind: 'spectrum',
    axis: { from: 'Least', to: 'Most' },
    summary: 'Ordered from the least disruptive option to the most.',
    columns: { name: 'Option', when: 'When', settles: 'It settles' },
    items: [
      { name: 'Leave it', when: 'Nothing is in the way.', settles: 'Nothing changes.' },
      { name: 'Change a part', when: 'One part is in the way.', settles: 'That part.' },
      { name: 'Rebuild it', when: 'Everything is in the way.', settles: 'The whole product.' },
    ],
  },
  'stat-alone': {
    kind: 'stat',
    value: '12',
    label: 'A figure with no rows under it',
    body: 'The sentence that qualifies the figure, set at the lead size on the body measure.',
  },
  logos: {
    kind: 'logos',
    marks: Object.values(CLIENT_MARKS),
    rating: CLUTCH_RATING,
  },
} satisfies Record<string, StoryBlock>;

const KINDS: readonly StoryBlock['kind'][] = [
  'signals',
  'steps',
  'ledger',
  'router',
  'cases',
  'fit',
  'proof',
  'spectrum',
  'table',
  'record',
  'flow',
  'matrix',
  'parts',
  'slice',
  'bridge',
  'thread',
  'logos',
  'stat',
  'faq',
  'note',
  'resources',
  'slot',
];

const threeCases = (() => {
  const cases = SIX.flatMap((story) =>
    story.sections.flatMap((section) =>
      section.type === 'section'
        ? section.blocks.flatMap((block) => (block.kind === 'cases' ? block.items : []))
        : [],
    ),
  );
  const unique = cases.filter(
    (item, index) => cases.findIndex((c) => c.slug === item.slug) === index,
  );
  return { kind: 'cases', items: unique.slice(0, 3) } satisfies StoryBlock;
})();

const blocks: [string, StoryBlock][] = [
  ...KINDS.flatMap((kind): [string, StoryBlock][] => {
    const block: StoryBlock | undefined = kind === 'logos' ? EXTRA.logos : firstOf(kind);
    return block ? [[kind, block]] : [];
  }),
  ['ledger-numbered', EXTRA['ledger-numbered']],
  ['router-list', EXTRA['router-list']],
  ['cases-three', threeCases],
  ['proof-alone', EXTRA['proof-alone']],
  ['spectrum-plain', EXTRA['spectrum-plain']],
  ['stat-alone', EXTRA['stat-alone']],
];

/* A spectrum holds six options in its band (Diagrams `SPECTRUM_MAX`); a longer one keeps six and
   links the rest from the band's foot — the `more` route, shown here on the story that has seven. */
const SPECTRUM_MAX = 6;

/* The same route for a slice: its grids hold the band, and its acceptance levels take a band of
   their own as an icon ledger directly after it (StoryBlock `slice.levels` is optional for this). */
function fitted(block: StoryBlock): StoryBlock {
  if (block.kind === 'spectrum' && block.items.length > SPECTRUM_MAX)
    return { ...block, items: block.items.slice(0, SPECTRUM_MAX) };
  return block;
}

const levelsOf = (block: StoryBlock): StoryBlock | undefined =>
  block.kind === 'slice' && block.levels
    ? {
        kind: 'ledger',
        columns: 3,
        marker: 'icon',
        items: block.levels.map((level) => ({ ...level })),
      }
    : undefined;

const split: [string, StoryBlock][] = blocks.flatMap(([id, block]): [string, StoryBlock][] => {
  const levels = levelsOf(block);
  if (!levels || block.kind !== 'slice') return [[id, block]];
  return [
    [id, { ...block, levels: undefined, levelsLabel: undefined }],
    [`${id}-levels`, levels],
  ];
});

const sections: StorySection[] = split.map(([id, block]) => {
  const capped = fitted(block);
  return {
    type: 'section',
    id: `stress-${id}`,
    eyebrow: 'Stress',
    heading: `Block · ${id}`,
    lead: 'One block of the content model in the band its job is given.',
    blocks: [capped],
    more:
      capped === block
        ? undefined
        : { label: 'Every option, on the deep page', href: ROUTES.howWeWork },
  };
});

export const stressStory: ServiceStory = {
  slug: 'stress',
  name: 'Stress story',
  seo: { title: 'ServicePage stress story', description: 'Every StoryBlock variant.' },
  hero: {
    title: 'Every block the service page can render.',
    lead: 'Each band below carries one variant of the content model, so a change to the template is seen against all of them at once.',
    actions: [
      { label: 'Start a project', href: anchorHref(ANCHORS.enquiry) },
      { label: 'All services', href: ROUTES.services },
    ],
    illustration: productDesign.hero.illustration,
    tags: ['Stress', 'Every variant'],
  },
  photos: productDesign.photos,
  labels: productDesign.labels,
  sections: [
    ...sections.slice(0, 6),
    ...productDesign.sections.filter((section) => section.type === 'offer'),
    ...sections.slice(6, 12),
    /* The two bands that are not sections: the J statement (product-design's) and an I banner —
       no story carries one since product-design's moved to the statement, so it is authored here,
       and with no § 5.6 slot it proves the banner's no-photograph path. */
    ...productDesign.sections.filter((section) => section.type === 'statement'),
    ...sections.slice(12),
    {
      type: 'banner',
      id: 'stress-banner',
      eyebrow: 'Stress',
      heading: 'Block · banner',
      lead: 'A pause in the argument that says where to read on.',
      action: { label: 'See how we work', href: ROUTES.howWeWork },
    },
  ],
  close: productDesign.close,
};
