import { Layout, Section } from '@/components';
import { ROUTES } from '@/lib/routes';
import { Bento, type BentoItem } from '@/patterns';

import { Variation } from '../_specimen/Variation';
import t from '../_specimen/typeroles.module.css';

/**
 * /design/bento — linked tiles of two sizes on four tracks over one continuous texture per row
 * (home "What we do", owner 19 Oct 2026, mocks S3). The six-tile diagonal home ships, the even
 * four-up row, a two-wide row, and the tint, ink and blue grounds. Hover a tile: it lifts 2px, its hairline and
 * texture turn blue and its title takes the accent.
 */

const SIX: BentoItem[] = [
  {
    id: 'pd',
    title: 'Product Design',
    body: 'Research, workflows, interface design, prototyping and testing.',
    href: ROUTES.productDesign,
    scene: 'product-design',
    span: 2,
  },
  {
    id: 'pm',
    title: 'Product Modernisation',
    body: 'Improving established software without breaking what customers rely on.',
    href: ROUTES.productModernisation,
    scene: 'product-modernisation',
  },
  {
    id: 'ds',
    title: 'Design Systems',
    body: 'One set of components and rules, shared by design and code.',
    href: ROUTES.designSystems,
    scene: 'design-systems',
  },
  {
    id: 'ai',
    title: 'AI Product UX',
    body: 'AI features people understand, trust and stay in control of.',
    href: ROUTES.aiProductUx,
    scene: 'ai-product-ux',
  },
  {
    id: 'de',
    title: 'Design Engineering',
    body: 'Design built and checked in real code.',
    href: ROUTES.designEngineering,
    scene: 'design-engineering',
  },
  {
    id: 'sd',
    title: 'Software Development',
    body: 'Our engineers turn the design into working software, with the designers beside them.',
    href: ROUTES.softwareDevelopment,
    scene: 'software-development',
    span: 2,
  },
];

const single: BentoItem[] = SIX.map((item) => ({ ...item, span: 1 }));

export default function BentoSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <p className={t.eyebrow}>Pattern · tier 2</p>
          <h1>Bento</h1>
          <p className={t.lead}>
            Linked tiles of two sizes on four tracks, each its destination&rsquo;s name, one
            line and its Sketch scene. Every tile shows its hairline at rest. Behind the
            drawings, one texture per row: the pixel grid through a feathered wave drawn across
            the row and clipped by each tile, so it reads as one field. Neutral at rest; the
            hovered tile turns blue and lifts.
          </p>
        </Layout>
      </Section>

      <Variation
        id="six"
        title="1 · Six on a diagonal (home)"
        note="Wide, single, single / single, single, wide. The first row's wave and the second's run on across their tiles at 1024 and up. Two across from 768 with the wide tiles on rows of their own; one across below, each tile its own wave."
      />
      <Section>
        <Bento items={SIX} />
      </Section>

      <Variation
        id="four"
        title="2 · Four single tiles a row"
        note="Any count without spans: four across from 1024, each row's wave running on across its four tiles."
      />
      <Section>
        <Bento items={single.slice(0, 4)} />
      </Section>

      <Variation
        id="three-tracks"
        title="2b · Peers on three tracks (tracks={3})"
        note="Five destinations of one weight (owner, 26 Oct 2026, product-design specialist services): every tile one size, three a row from 1024 and the last row left-aligned; spans are ignored. Each row's wave runs on across its three tiles."
      />
      <Section>
        <Bento
          tracks={3}
          items={(
            [
              [
                'ux-research',
                'UX Research',
                'Find out how people really use your product.',
                'specialist-research',
              ],
              [
                'ia',
                'Information Architecture & Workflow Design',
                'Make complex products easy to navigate.',
                'specialist-ia',
              ],
              [
                'ui',
                'Interaction & UI Design',
                'Screens and interactions that make the next step obvious.',
                'specialist-ui',
              ],
              [
                'dataviz',
                'Data Visualisation',
                'Dashboards and charts people can act on.',
                'specialist-dataviz',
              ],
              [
                'prototyping',
                'Prototyping & Usability Testing',
                'Test ideas before you build them.',
                'specialist-prototype',
              ],
            ] as const
          ).map(([id, title, body, scene]) => ({ id, title, body, scene, href: `#${id}` }))}
        />
      </Section>

      <Variation
        id="seven-four"
        title="2c · Seven peers on four tracks (product-design services, 4 + 3)"
        note="The 26 Oct copy's seven services you can hire on their own, every tile one size (owner, 29 Oct 2026, Q7: Bento tracks={4}, 4 + 3). The body is each row's Best for line, as authored. New Product Design & First Release and the UX & Product Audit carry their own specialist scenes (specialist-new-product, specialist-audit). The eighth cell is left for the band's closing paragraph."
      />
      <Section>
        <Bento
          items={(
            [
              [
                'ux-research',
                'UX Research',
                'Teams about to spend on an assumption nobody has tested',
                'specialist-research',
              ],
              [
                'ia',
                'Information Architecture & Workflow Design',
                'Products where work passes between people, or the menu keeps growing',
                'specialist-ia',
              ],
              [
                'ui',
                'Interaction & UI Design',
                'Products whose structure works but whose screens confuse people',
                'specialist-ui',
              ],
              [
                'dataviz',
                'Data Visualisation',
                'Dashboards that people export to a spreadsheet',
                'specialist-dataviz',
              ],
              [
                'prototyping',
                'Prototyping & Usability Testing',
                'Choosing between directions before engineers start',
                'specialist-prototype',
              ],
              [
                'new-product',
                'New Product Design & First Release',
                'Founders turning an idea or prototype into an MVP',
                'specialist-new-product',
              ],
              [
                'ux-audit',
                'UX & Product Audit',
                'Teams who know something is wrong but not yet what',
                'specialist-audit',
              ],
            ] as const
          ).map(([id, title, body, scene]) => ({ id, title, body, scene, href: `#${id}` }))}
        />
      </Section>

      <Variation
        id="pair"
        title="3 · Two wide tiles"
        note="2 + 2: each tile's drawing beside its words, at the wide scale."
      />
      <Section>
        <Bento items={[SIX[0]!, { ...SIX[5]! }]} />
      </Section>

      <Variation
        id="tint"
        title="4 · Tint ground"
        note="Every --bnt-* token restated on tint: the hairline steps to neutral-300 and the texture to neutral-600, so both still read on paper-deep."
      />
      <Section surface="tint">
        <Bento items={SIX} />
      </Section>

      <Variation
        id="ink"
        title="5 · Ink ground"
        note="Declared for self-containment: white titles, a neutral-800 hairline lifting to brandeis-700, a neutral-600 texture lifting to brandeis-300. Home sets the band on paper."
      />
      <Section surface="ink">
        <Bento items={SIX} />
      </Section>

      <Variation
        id="blue"
        title="6 · Blue ground"
        note="Declared for self-containment: white titles, a brandeis-400 hairline, a brandeis-300 texture lifting to white."
      />
      <Section surface="blue">
        <Bento items={SIX} />
      </Section>
    </>
  );
}
