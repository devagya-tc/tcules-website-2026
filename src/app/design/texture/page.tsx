import { Layout, Section, Texture, TextureShape } from '@/components';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Texture specimen — the pixel grid, shown through shapes.
 *
 * PARKED (owner, 29 Sep 2026, tracker 2.17) until a real placement exists. This page is kept to
 * the rules rather than grown: nothing here makes Texture stronger or more visible.
 *
 * The Figma workflow, one step at a time: a shape, then the same shape blurred, then the frame the
 * texture was measured from, rebuilt. Steps 1 and 2 are MECHANISM bands and carry no content,
 * because a hard shape inside the content column is outside the rules (spec §1, limit 6). Every
 * band that does carry content keeps every shape's full-strength box in the band's air — the 128
 * above and below an open band — so no shape sits under a heading or body at any width.
 *
 * ── Why each caption band is `flush` ─────────────────────────────────────────────
 * Two adjacent bands on the same ground merge their seam: the second drops its TOP padding
 * (Section.module.css, tracker 2.17). A textured paper band after a paper caption band therefore
 * started at y = 0, and every top-anchored shape landed behind its heading — the breach this page
 * was showing at 390. A flush band is excluded from that merge (it has no bottom padding to be the
 * seam), so the textured band after it keeps its full 128 of top air, which is what the top shapes
 * are measured against.
 *
 * Only paper and tint appear. Ink and blue are banned by limit 3, so their bands and their ink
 * candidates are gone rather than printed as options.
 */

const TINT_CANDIDATES = [
  { className: s.texInkNeutral300, label: 'neutral-300 — 1.07:1, quieter' },
  { className: s.texInkNeutral400, label: 'neutral-400 — 1.13:1, current default' },
] as const;

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
        <Layout rowGap="block">
          <h1>Texture</h1>
          <p>
            The pixel grid as a decorative field. It fills the band edge to edge, sits between
            the band&rsquo;s ground and its content, and shows only through the shapes placed in
            it. Blur a shape and the grid fades with it. The grid itself is never blurred.
          </p>
          <p>
            Shapes are placed like absolutely positioned boxes: <code>top</code> /{' '}
            <code>bottom</code>, <code>left</code> / <code>right</code>, and a size, each in px
            or % of the band. An axis with neither side given is centred. <code>blur</code>{' '}
            takes Figma&rsquo;s number. The grid&rsquo;s geometry comes from{' '}
            <code>src/styles/textures/pixel-grid.json</code>, the same spec{' '}
            <code>npm run texture</code> exports from.
          </p>
          <p>
            <strong>Parked</strong> (owner, 29 Sep 2026) until a real placement exists. Paper
            and tint only — ink and blue are banned by limit 3.
          </p>
        </Layout>
      </Section>

      <Section flush>
        <Specimen
          title="Step 1 · a hard shape, blur 0 — mechanism, not a placement"
          note="Centred, 471 wide and 80% of the band tall — the last frame of the Figma walkthrough. The grid stops at the shape's edge on a whole cell, because the pattern is anchored to the band, not to the shape. The band carries no content: blur 0 inside the content column is outside the rules (limit 6)."
        >
          <p className={s.specNote}>The band below.</p>
        </Specimen>
      </Section>

      <Section>
        <Texture>
          <TextureShape width={471} height="80%" />
        </Texture>
      </Section>

      <Section flush>
        <Specimen
          title="Step 2 · the same shape, blur 100 — mechanism, not a placement"
          note="The shape becomes a soft field and the grid thins toward its edges — the grid's cells stay crisp at every strength. Still centred, so still behind wherever content would sit: the band carries none."
        >
          <p className={s.specNote}>The band below.</p>
        </Specimen>
      </Section>

      <Section>
        <Texture>
          <TextureShape width={471} height="80%" blur={100} />
        </Texture>
      </Section>

      <Section flush>
        <Specimen
          title="Step 3 · the measured frame, rebuilt"
          note="Figma node 385:72 — two bands blurred 164, anchored top and bottom and hanging 180 off each edge, so each box ends 108 into the band: inside the 128 of air, clear of the heading and the last line at every width. Only the feather reaches the copy, which is what §1 allows. Compared numerically against Figma's render, the grid's tone lands within 2.5/255 at every row."
        >
          <p className={s.specNote}>The band below.</p>
        </Specimen>
      </Section>

      <Section>
        <Edges />
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>OmnyAI writes Amazon listings from product data and reviews.</h2>
            <p>AI identifies possible benefits. The user decides which reach the listing.</p>
          </Layout>
          <p>Product data + reviews → listing content</p>
        </Layout>
      </Section>

      <Section flush>
        <Specimen
          title="Placement · a corner, an edge, rounded, percent-sized"
          note="An ellipse hung off the top-left so its box ends at 120, inside the 128 of top air; a rounded rect, 30% wide, hung off the bottom-right corner; and a 40%-wide glow centred on the bottom edge. Every box sits in the band's air, so none is under the heading or body at 1440 or at 390. Each is blurred ≥ 100, because each enters the content column."
        >
          <p className={s.specNote}>The band below.</p>
        </Specimen>
      </Section>

      <Section>
        <Texture>
          <TextureShape
            kind="ellipse"
            top={-300}
            left={-120}
            width={420}
            height={420}
            blur={120}
          />
          <TextureShape
            bottom={-96}
            right={-48}
            width="30%"
            height={200}
            radius={24}
            blur={100}
          />
          <TextureShape bottom={-120} width="40%" height={200} blur={200} />
        </Texture>
        <Copy title="Three shapes, three anchors">
          Top-left, bottom-right, and bottom-centre, each in the band&rsquo;s air. Content stays
          clear of every full-strength box.
        </Copy>
      </Section>

      <Section surface="tint">
        <Edges />
        <Copy title="Surface · tint">
          Neutral-400, not blue, and quieter than paper on purpose — a strength-matched 700 read
          as pattern rather than texture. The two candidates follow.
        </Copy>
      </Section>

      <Section surface="tint" flush>
        <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="gutter">
          {TINT_CANDIDATES.map((c) => (
            <Section key={c.label} as="div" surface="tint">
              <Texture className={c.className}>
                <TextureShape bottom={-40} width="80%" height={160} blur={120} />
              </Texture>
              <p className={s.specTitle}>{`tint · ${c.label}`}</p>
            </Section>
          ))}
        </Layout>
      </Section>
    </>
  );
}
