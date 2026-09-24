import { Layout, Section, Texture, TextureShape, type SectionSurface } from '@/components';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Texture specimen — the pixel grid, shown through shapes.
 *
 * The Figma workflow, one step at a time: a shape, then the same shape blurred, then the frame the
 * texture was measured from, rebuilt. Each band is a real Section with real content over the field,
 * because the thing to check is not the grid alone but that the grid sits UNDER the content and
 * never over it.
 *
 * Tint and the dark grounds come last and are a question rather than an answer: their ink is provisional in
 * tokens/components/texture.css, and the candidates are printed side by side here to choose from.
 */

const INK_CANDIDATES = {
  tint: [
    { className: s.texInkNeutral300, label: 'neutral-300 — 1.07:1, quieter' },
    { className: s.texInkNeutral400, label: 'neutral-400 — 1.13:1, current default' },
  ],
  ink: [
    { className: s.texInkBrandeis500, label: 'brandeis-500 — the paper value, unchanged' },
    { className: s.texInkBrandeis300, label: 'brandeis-300' },
    { className: s.texInkWhite, label: 'white' },
  ],
  blue: [
    { className: s.texInkWhite, label: 'white — current default' },
    { className: s.texInkBrandeis200, label: 'brandeis-200' },
    { className: s.texInkBrandeis800, label: 'brandeis-800 — darker than the ground' },
  ],
} as const;

function Copy({ title, children }: { title: string; children: string }) {
  return (
    <Layout rowGap="block">
      <h2>{title}</h2>
      <p>{children}</p>
    </Layout>
  );
}

/* The measured frame's composition: two 288-high bands, blur 164, bleeding in from above and
   below. Percent widths so it holds at every viewport; the offsets are the frame's own px. */
function Edges({ className }: { className?: string }) {
  return (
    <Texture className={className}>
      <TextureShape top={-180} width="92%" height={288} blur={164} />
      <TextureShape bottom={-180} width="92%" height={288} blur={164} />
    </Texture>
  );
}

export default function TextureSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h1>Texture</h1>
            <p>
              The pixel grid as a decorative field. It fills the band edge to edge, sits between
              the band&rsquo;s ground and its content, and shows only through the shapes placed
              in it. Blur a shape and the grid fades with it. The grid itself is never blurred.
            </p>
            <p>
              Shapes are placed like absolutely positioned boxes: <code>top</code> /{' '}
              <code>bottom</code>, <code>left</code> / <code>right</code>, and a size, each in
              px or % of the band. An axis with neither side given is centred. <code>blur</code>{' '}
              takes Figma&rsquo;s number. The grid&rsquo;s geometry comes from{' '}
              <code>src/styles/textures/pixel-grid.json</code>, the same spec{' '}
              <code>npm run texture</code> exports from.
            </p>
          </Layout>
          <Specimen
            title="Step 1 · a hard shape, blur 0"
            note="Centred, 471 wide and 80% of the band tall — the last frame of the Figma walkthrough. The grid stops at the shape's edge on a whole cell, because the pattern is anchored to the band, not to the shape."
          >
            <p className={s.specNote}>The band below.</p>
          </Specimen>
        </Layout>
      </Section>

      <Section density="open">
        <Texture>
          <TextureShape width={471} height="80%" />
        </Texture>
        <Copy title="A hard shape">
          The same field with no blur — the texture&rsquo;s raw strength, 21% at the dashes.
        </Copy>
      </Section>

      <Section>
        <Specimen
          title="Step 2 · the same shape, blur 100"
          note="The shape becomes a soft field and the grid thins toward its edges — the grid's cells stay crisp at every strength."
        >
          <p className={s.specNote}>The band below.</p>
        </Specimen>
      </Section>

      <Section density="open">
        <Texture>
          <TextureShape width={471} height="80%" blur={100} />
        </Texture>
        <Copy title="A blurred shape">
          The shape is the mask. Wherever it is opaque the grid is at full strength; where the
          blur feathers it, the grid fades with it.
        </Copy>
      </Section>

      <Section>
        <Specimen
          title="Step 3 · the measured frame, rebuilt"
          note="Figma node 385:72 — two bands blurred 164, anchored top and bottom and hanging 180 off each edge. Compared numerically against Figma's render, the grid's tone lands within 2.5/255 at every row. Resize the window: the bands hold their edges, because they are placed from the top and from the bottom."
        >
          <p className={s.specNote}>The band below.</p>
        </Specimen>
      </Section>

      <Section density="open">
        <Edges />
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>OmnyAI writes Amazon listings from product data and reviews.</h2>
            <p>AI identifies possible benefits. The user decides which reach the listing.</p>
          </Layout>
          <p>Product data + reviews → listing content</p>
        </Layout>
      </Section>

      <Section>
        <Specimen
          title="Placement · corners, an ellipse, rounded, percent-sized"
          note="An ellipse off the top-left, a rounded rect pinned bottom-right with no blur, and a percent-sized glow centred. Each is placed from a different side; together they cover every anchor the API has."
        >
          <p className={s.specNote}>The band below.</p>
        </Specimen>
      </Section>

      <Section density="open">
        <Texture>
          <TextureShape
            kind="ellipse"
            top={-120}
            left={-120}
            width={420}
            height={420}
            blur={120}
          />
          <TextureShape bottom={48} right={48} width={320} height={200} radius={24} />
          <TextureShape width="40%" height="50%" blur={200} />
        </Texture>
        <Copy title="Three shapes, three anchors">
          Top-left, bottom-right, and centred. Content stays above all of them.
        </Copy>
      </Section>

      {(['tint', 'ink', 'blue'] as SectionSurface[]).map((surface) => (
        <Section key={surface} surface={surface} density="open">
          <Edges />
          <Copy title={`Surface · ${surface}`}>
            {surface === 'tint'
              ? 'Neutral-400, not blue, and quieter than paper on purpose — a strength-matched 700 read as pattern rather than texture. Candidates follow.'
              : `The ${surface} value from texture.css — provisional. The candidates follow.`}
          </Copy>
        </Section>
      ))}

      {(['tint', 'ink', 'blue'] as const).map((surface) => (
        <Section key={`candidates-${surface}`} surface={surface} flush>
          <Layout columns={{ base: 1, md: 3 }} colGap="gutter" rowGap="gutter">
            {INK_CANDIDATES[surface].map((c) => (
              <Section key={c.label} as="div" surface={surface} density="open">
                <Texture className={c.className}>
                  <TextureShape width="80%" height="60%" blur={120} />
                </Texture>
                <p className={s.specTitle}>{`${surface} · ${c.label}`}</p>
              </Section>
            ))}
          </Layout>
        </Section>
      ))}
    </>
  );
}
