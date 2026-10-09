import { Layout, Section, Texture, TextureHorizon, TextureShape } from '@/components';
import { ROUTES } from '@/lib/routes';
import { CtaRow, Statement } from '@/patterns';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Texture specimen — the approved placements first, documented; then the mechanism they are built
 * from (the pixel grid shown through shapes), kept as technical specimens.
 *
 * Owner review, 9 Oct 2026: the end-edge corner fade (Statement `head-half`), the seam strip
 * (TextureHorizon) and the single corner cluster (Statement `corner`) are approved as drawn; two
 * variations were added — the end-edge horizontal fade (`end-fade`) and the balanced two-corner
 * clusters (`corner-pair`).
 *
 * ── Why each caption band is `flush` ─────────────────────────────────────────────
 * Two adjacent bands on the same ground merge their seam: the second drops its TOP padding
 * (Section.module.css, tracker 2.17). A textured paper band after a paper caption band therefore
 * started at y = 0, and every top-anchored shape landed behind its heading. A flush band is
 * excluded from that merge (it has no bottom padding to be the seam), so the textured band after it
 * keeps its full top air, which is what the top shapes are measured against.
 *
 * Only paper and tint appear. Ink and blue are banned by limit 3.
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

const HOW_WE_WORK = [{ label: 'See how we work', href: ROUTES.howWeWork }] as const;

/** One approved placement: what it is called, the prop that draws it, when to reach for it, and the
    one way it is misused. Printed as the caption band above the live band. */
function Pattern({
  title,
  use,
  when,
  never,
}: {
  title: string;
  use: string;
  when: string;
  never: string;
}) {
  return (
    <Section flush>
      <Specimen title={`${title} · ${use}`} note={`When: ${when} Never: ${never}`}>
        <p className={s.specNote}>The band below.</p>
      </Specimen>
    </Section>
  );
}

const RULES = [
  'Texture is rhythm, never decoration for its own sake. It marks where a band begins, ends or turns — it does not fill a band that looks empty.',
  'One texture signature per band. A band carries one placement, or a corner pair; never a fade and a strip together.',
  'Where it may sit: a band’s air and edges — its top or bottom padding, its end edge beside a start-aligned sentence, a corner a centred sentence leaves clear. Never behind a glyph at full strength; only a feather may reach the type.',
  'Paper only for placements. Tint carries the quieter neutral grid when it sits under a seam; ink and blue never take texture (limit 3). Peridot never.',
  'Not on a band with an illustration hero, a photograph or a media column competing for the same corner — the illustration is that band’s mark.',
  'Contrast: the grid peaks at 21% of --tex-ink, so text over a feather keeps its full contrast. If a placement would sit under type at full strength, move the placement, not the strength.',
  'Decorative only: aria-hidden, no pointer events, drawn from the generated pixel-grid (npm run texture) — never a raster or a hand-drawn pattern.',
  'Desktop-led: the corner, fade and pair placements exist from 1024; below it only the seam strip runs.',
] as const;

export default function TextureSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h1>Texture</h1>
            <p>
              The pixel grid as a mark of rhythm. It tells the eye where a band arrives, where
              it hands over to the next, and which corner of a quiet band is the open one. It is
              never there to make an empty band look busy: a band that needs texture to hold
              together is a band whose composition is not finished.
            </p>
            <p>
              Five placements are approved. Each is a named option, so no page writes a number:
              pick one by what the band is doing, and give each band at most one.
            </p>
          </Layout>
          <Layout rowGap="text">
            <h2>Rules</h2>
            <ul>
              {RULES.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </Layout>
        </Layout>
      </Section>

      <Pattern
        title="1 · End-edge corner fade"
        use='Statement texture="head-half"'
        when="a start-aligned statement whose sentence leaves the band's top-end open; the field arrives from past the corner, as atmosphere entering the band."
        never="with a centred sentence, or on a band that already has a seam strip."
      />
      <Statement
        eyebrow="What we believe"
        id="tex-head-half"
        texture="head-half"
        actions={<CtaRow actions={HOW_WE_WORK} rule={false} />}
      >
        A good interface is a product decision someone finally made.
      </Statement>

      <Pattern
        title="2 · End-edge horizontal fade"
        use='Statement texture="end-fade"'
        when="a start-aligned statement that should feel anchored along its whole end edge rather than lit from one corner — a full-height field fading right to left."
        never="with a centred sentence (it reaches into the feather), or below 1024 (not drawn)."
      />
      <Statement
        eyebrow="What we believe"
        id="tex-end-fade"
        texture="end-fade"
        actions={<CtaRow actions={HOW_WE_WORK} rule={false} />}
      >
        A good interface is a product decision someone finally made.
      </Statement>

      <Pattern
        title="3 · Seam strip"
        use="TextureHorizon, the last child of a paper Section"
        when="a paper band hands over to a tint band: the paper breaks up into the change of ground beneath it. The only placement that runs below 1024."
        never="above a paper band (there is no change of ground to mark), or under a band whose last line sits closer than a stack to the foot."
      />
      <Section>
        <Layout rowGap="block">
          <h2>Forty thousand parts, one search</h2>
          <p>
            Found by the names engineers actually use, and rebuilt without a freeze on releases.
          </p>
        </Layout>
        <TextureHorizon />
      </Section>
      <Section surface="tint">
        <p>The next band, on tint.</p>
      </Section>

      <Pattern
        title="4 · Single corner cluster"
        use='Statement texture="corner"'
        when="a centred statement; the top-end corner is the only ground a centred sentence leaves clear, and one stepped cluster marks it."
        never="on a start-aligned band (use a fade), or anywhere it would sit behind the eyebrow."
      />
      <Statement
        eyebrow="How we work"
        id="tex-corner"
        align="center"
        texture="corner"
        actions={<CtaRow actions={HOW_WE_WORK} rule={false} />}
      >
        One accountable team, from the first question to the shipped build.
      </Statement>

      <Pattern
        title="5 · Balanced two-corner clusters"
        use='Statement texture="corner-pair"'
        when="a centred statement that stands alone between two bands and needs weight at both ends of its diagonal; the bottom-start cluster is lighter and related, not a mirror."
        never="the bottom-start cluster alone, or a pair on a band whose action sits on its start edge."
      />
      <Statement
        eyebrow="How we work"
        id="tex-corner-pair"
        align="center"
        texture="corner-pair"
        actions={<CtaRow actions={HOW_WE_WORK} rule={false} />}
      >
        One accountable team, from the first question to the shipped build.
      </Statement>

      <Section flush>
        <Specimen
          title="Never · a stepped block"
          note="Retired 9 Oct 2026 (the PageHero foot and field recipes). A hard-edged block reads as an object competing with the copy, not as rhythm. A hero with an image takes no texture; a hero with none takes the end-fade."
        >
          <p className={s.specNote}>The band below shows what not to do.</p>
        </Specimen>
      </Section>

      <Section>
        <Texture>
          <TextureShape right={0} top="20%" width="12%" height="100%" />
          <TextureShape right="12%" top="45%" width="12%" height="100%" />
          <TextureShape right="24%" top="70%" width="12%" height="100%" />
        </Texture>
        <Copy title="Never · the stepped staircase">
          The hard-edged staircase the hero once carried beside or under its copy. It reads as an
          object competing with the copy, not as rhythm.
        </Copy>
      </Section>

      <Section flush>
        <Specimen
          title="Mechanism · how the grid is drawn"
          note="Below: the Texture primitive the placements are built from. The pixel grid fills the band edge to edge, sits between the band's ground and its content, and shows only through the shapes placed in it; blur a shape and the grid fades with it. Shapes are placed like absolutely positioned boxes, blur takes Figma's number, and the grid's geometry is src/styles/textures/pixel-grid.json, the same spec npm run texture exports from. These are technical specimens, not placements."
        >
          <p className={s.specNote}>The bands below.</p>
        </Specimen>
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
