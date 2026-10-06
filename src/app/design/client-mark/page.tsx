import {
  ClientMark,
  Cluster,
  Layout,
  Section,
  type ClientMarkProps,
  type LayoutProps,
} from '@/components';
import { cx } from '@/lib/cx';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';
import * as C from '../_specimen/clients';

/**
 * ClientMark specimen — the client set at one visual weight, on four grounds.
 *
 * What this page has to show:
 *   1. equal AREA, not equal width: a 7:1 wordmark and a 3:1 lockup read as the same weight, and
 *      the ~40px height cap (ruling P2) and 160px width cap hold;
 *   2. one colour, the ground's ink, from ONE file per mark on every surface — any mark on ink or
 *      blue that renders light proves the mask is doing it, not the file;
 *   3. the strip is a Cluster of marks, not a component: the Cluster owns the gap;
 *   4. the recommended composition for a set of known size: equal cells in a Layout, with a count
 *      that fills every row at every breakpoint (tracker 2.17) — still not a component;
 *   5. the ink is one step quieter than the section's heading ink, so a strip sits under its
 *      heading rather than competing with it (tracker 2.17) — every surface band has a heading.
 *
 * The strip is the REAL client set (public/clients/*.svg), the files the previous site's logo
 * wall carried. ch05 §10 requires written client approval, filed with the asset, before any
 * PUBLIC use; this route is the proving ground, and a page placing these checks that record.
 * Blueghost and Rudo are left out: their files paint knock-outs as white instead of carrying
 * them as holes, so a mask fills them solid (spec §14) — the fix is a corrected client file.
 *
 * Every real mark is a wordmark between 3:1 and 7.4:1, so the shapes the set does not have yet —
 * a square symbol, a stacked lockup, a 12:1 wordmark, heavy and hairline strokes — are FICTIONAL
 * stress files (public/design/client-mark-*.svg), drawn black and labelled as such.
 */

type Mark = Omit<ClientMarkProps, 'className'> & { shape: string };

const STRESS_DIR = '/design';

/* The real set and its recorded corrections live in ../_specimen/clients.ts, shared with the kit's H
   family, so a correction judged on one specimen is the one rendered on the other. Here each record
   also carries its shape label. */
const label = (mark: C.ClientRecord): Mark => {
  const { width, height, correction } = mark;
  const k = correction
    ? `, ${correction > 0 ? '+' : '−'}${Math.round(Math.abs(correction) * 100)}%`
    : '';
  return { ...mark, shape: `${(width / height).toFixed(1)}:1${k}` };
};

const OMNY = label(C.OMNY);
const LATITUDEPAY = label(C.LATITUDEPAY);
const QUOTER = label(C.QUOTER);
const KNOVOS = label(C.KNOVOS);
const DOODLE = label(C.DOODLE);

const STRIP: readonly Mark[] = C.CLIENTS.map(label);

/* The grid's set: all nine (visual-direction § 5.9, 6 Oct 2026). Nine fill 3 × 3 at md, sit 5 + 4
   from lg and leave the last mark alone at base — a start-aligned grid reads that as the end of the
   list, not a hole. The kit's H band (/design/kit/logos) composes it in every placement. */
const GRID_SET: readonly Mark[] = STRIP;

/* Fictional stress shapes — see the header. */
const SQUARE: Mark = {
  name: 'Brightwell',
  src: `${STRESS_DIR}/client-mark-square.svg`,
  width: 64,
  height: 64,
  shape: 'fictional · square symbol, 1:1',
};
const TALL: Mark = {
  name: 'Cobalt Row',
  src: `${STRESS_DIR}/client-mark-tall.svg`,
  width: 64,
  height: 80,
  shape: 'fictional · stacked lockup, 4:5',
};
const HEAVY: Mark = {
  name: 'Eskerfield',
  src: `${STRESS_DIR}/client-mark-heavy.svg`,
  width: 144,
  height: 48,
  correction: -0.1,
  shape: 'fictional · heavy strokes, 3:1, −10%',
};
const LIGHT: Mark = {
  name: 'Fenwright',
  src: `${STRESS_DIR}/client-mark-light.svg`,
  width: 144,
  height: 48,
  correction: 0.12,
  shape: 'fictional · hairline strokes, 3:1, +12%',
};
const ULTRAWIDE: Mark = {
  name: 'Gallowmere Holdings',
  src: `${STRESS_DIR}/client-mark-ultrawide.svg`,
  width: 360,
  height: 30,
  shape: 'fictional · ultra-wide wordmark, 12:1',
};

const STRESS: readonly Mark[] = [SQUARE, TALL, HEAVY, LIGHT];

/* The component's arithmetic, restated so each mark can carry its computed size as a label. The
   three numbers mirror --cmark-target-side / -height-max / -width-max in client-mark.css; if the
   tokens change, these labels go stale and the rendering does not — the rendering is the truth. */
const SIDE = 56;
const H_MAX = 40;
const W_MAX = 160;
/* The correction scales the capped size, and only the height cap applies again (ch05 §10's order,
   fix round 2) — so a corrected wide mark may pass 160. */
function computed({ width, height, correction = 0 }: Mark) {
  const r = width / height;
  const k = 1 + Math.max(-0.15, Math.min(0.15, correction));
  const fitted = Math.min(SIDE * Math.sqrt(r), H_MAX * r, W_MAX);
  const w = Math.min(fitted * k, H_MAX * r);
  return `${Math.round(w)} × ${Math.round(w / r)}`;
}

/** A mark's props without its specimen label. */
function bare(mark: Mark): Omit<ClientMarkProps, 'className'> {
  const { shape, ...props } = mark;
  void shape;
  return props;
}

const SURFACES = ['paper', 'tint', 'ink', 'blue'] as const;

/* Labels only — the values live in client-mark.css, and the rendering is the truth. */
const INK: Record<(typeof SURFACES)[number], string> = {
  paper: 'neutral-600, 4.92:1',
  tint: 'neutral-600, 4.39:1',
  ink: 'neutral-300, 11.07:1',
  blue: 'brandeis-200, 3.78:1',
};

/** The composition the site uses: a list of marks in a Cluster, which owns both seams. */
function Strip({ marks }: { marks: readonly Mark[] }) {
  return (
    <Cluster as="ul" colGap="stack" rowGap="stack" align="center">
      {marks.map((mark) => (
        <li key={mark.name}>
          <ClientMark {...bare(mark)} />
        </li>
      ))}
    </Cluster>
  );
}

/**
 * The recommended composition for a set of known size: one equal cell per mark, each mark at its
 * cell's start edge, so the first column lines up with the heading above it and every column
 * starts on a track line. justifyItems stays at its default (stretch) on purpose: the li fills
 * its track, which is what lets a mark wider than the track (LatitudePay, 160, in a ~139 cell at
 * 390) shrink to it via max-inline-size — a centred li would size to the mark and spill.
 * {base: 2, md: 3, lg: 5} (§ 5.9): three tracks in the 704 column are ~202 wide and five in the
 * 1240 column ~209, both wider than the widest mark. Inside a narrower track (the 763 body beside
 * a head) the caller holds it at three; see the kit specimen.
 */
function Grid({
  marks,
  columns = { base: 2, md: 3, lg: 5 },
}: {
  marks: readonly Mark[];
  columns?: LayoutProps['columns'];
}) {
  return (
    <Layout as="ul" columns={columns} colGap="stack" rowGap="stack" align="center">
      {marks.map((mark) => (
        <li key={mark.name}>
          <ClientMark {...bare(mark)} />
        </li>
      ))}
    </Layout>
  );
}

export default function ClientMarkSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h1>ClientMark</h1>
            <p>
              One client&rsquo;s logo in a set. The client&rsquo;s SVG is drawn as a{' '}
              <strong>mask</strong> filled with <code>--cmark-ink</code>, so every mark in a set
              is one colour, the ground&rsquo;s ink, from one file on every surface. Each is
              sized to <strong>equal visual weight</strong>: the same bounding-box area, not the
              same width, then capped at 40 tall (ruling P2) and 160 wide (ch05 §10).
            </p>
            <p>
              A logo strip is <strong>not</strong> a component. It is <code>ClientMark</code> ×
              n in a <code>Cluster</code>, which owns the gap. The strip is the real client set;
              the shapes it does not have yet are fictional stress files, drawn in black, and
              labelled so. A mark that renders light on ink proves the mask is doing the colour,
              not the file.
            </p>
          </Layout>

          <Specimen
            title="The strip — nine clients, one weight"
            note='Cluster as="ul", colGap and rowGap "stack" (48), align center. The marks set no spacing of their own. Ratios run from 3.4:1 (GT Tools) to 7.4:1 (LatitudePay), and no two are the same width.'
          >
            <Strip marks={STRIP} />
          </Specimen>

          <Specimen
            title="Equal cells — the grid"
            note='The grid of § 5.9. Layout as="ul", columns {{ base: 2, md: 3, lg: 5 }}, colGap and rowGap "stack", align "center", justifyItems left at stretch: one equal cell per mark, each at its cell’s start edge, so the columns line up with the heading. Nine marks sit 5 + 4 here, 3 × 3 at md and two to a row at 390. Still not a component: it is ClientMark × n in a Layout. Every H-band placement is composed at /design/kit/logos.'
          >
            <Grid marks={GRID_SET} />
          </Specimen>

          <Specimen
            title="The arithmetic, per mark"
            note="width = 56 × √ratio (equal area, 56² px²), capped so height ≤ 40 and width ≤ 160, then × (1 + correction) of that capped size, and the height cap again (P2). The width cap is not re-applied, so LatitudePay’s +15% takes effect (175 wide). The fictional square and stacked lockup reach the height cap first, which is why they are a little lighter than the wordmarks: the cap outranks the area, in ch05's order."
          >
            <Layout rowGap="block">
              {[...STRIP, SQUARE, TALL].map((mark) => (
                <Cluster key={mark.name} colGap="text" rowGap="tight" align="center">
                  <span className={s.ruler}>{computed(mark)}</span>
                  <ClientMark
                    src={mark.src}
                    name={mark.name}
                    width={mark.width}
                    height={mark.height}
                    correction={mark.correction}
                  />
                  <span className={s.specNote}>
                    {mark.name} · {mark.shape}
                  </span>
                </Cluster>
              ))}
            </Layout>
          </Specimen>

          <Specimen
            title="Shapes the set does not have yet"
            note="Fictional stress files among real marks: a square symbol, a stacked lockup, heavy strokes (−10%) and hairline strokes (+12%). They must sit in the strip at the same weight when a client like them arrives."
          >
            <Strip marks={[OMNY, ...STRESS.slice(0, 2), QUOTER, ...STRESS.slice(2), KNOVOS]} />
          </Specimen>

          <Specimen
            title="The weight correction, with and without"
            note="Fictional files, so the pairs read at a glance (the real set runs from LatitudePay +15% to Doodle, GT Tools and Incluude −15%). Same files, correction 0 on the left of each pair and the recorded value on the right. A heavy mark comes down, a hairline mark comes up. The last pair passes 0.4: it is clamped to +0.15 and warned in development."
          >
            <Layout rowGap="block">
              <Cluster colGap="stack" rowGap="stack" align="center">
                <ClientMark
                  src={HEAVY.src}
                  name={HEAVY.name}
                  width={HEAVY.width}
                  height={HEAVY.height}
                />
                <ClientMark {...bare(HEAVY)} />
                <span className={s.specNote}>heavy · 0 → −0.1</span>
              </Cluster>
              <Cluster colGap="stack" rowGap="stack" align="center">
                <ClientMark
                  src={LIGHT.src}
                  name={LIGHT.name}
                  width={LIGHT.width}
                  height={LIGHT.height}
                />
                <ClientMark {...bare(LIGHT)} />
                <span className={s.specNote}>hairline · 0 → +0.12</span>
              </Cluster>
              <Cluster colGap="stack" rowGap="stack" align="center">
                <ClientMark
                  src={LIGHT.src}
                  name={LIGHT.name}
                  width={LIGHT.width}
                  height={LIGHT.height}
                  correction={0.15}
                />
                <ClientMark
                  src={LIGHT.src}
                  name={LIGHT.name}
                  width={LIGHT.width}
                  height={LIGHT.height}
                  correction={0.4}
                />
                <span className={s.specNote}>
                  +0.15 beside 0.4 (clamped to +0.15) — identical
                </span>
              </Cluster>
            </Layout>
          </Specimen>

          <Specimen
            title="The width cap"
            note={`A 12:1 wordmark would be ${Math.round(SIDE * Math.sqrt(12))} wide at the target area. It stops at 160, and its height follows (${computed(ULTRAWIDE)}). Shown beside LatitudePay, the widest real mark at 7.4:1: fitted at 152, then corrected +15% to 175, because the correction scales the capped size and only the height cap applies again.`}
          >
            <Strip marks={[LATITUDEPAY, ULTRAWIDE]} />
          </Specimen>

          <Specimen
            title="A lone mark"
            note="One mark, still in the ground's ink and still at the set's size. ch05 §10 lets a mark shown alone beside its own case study be the client's full-colour version — that is the client's file in a Figure, not this component."
          >
            <ClientMark {...bare(OMNY)} />
          </Specimen>

          <Specimen
            title="Inside a link"
            note="Wrapped in a link to a case study, the mark stays --cmark-ink, not link blue: the colour is the ground's ink by token, not currentColor. The link takes its accessible name from the mark."
          >
            <Cluster colGap="stack" rowGap="stack" align="center">
              {/* A specimen-only anchor to nowhere on this page; a real one comes from @/lib/routes. */}
              <a href="#inside-a-link" id="inside-a-link">
                <ClientMark {...bare(LATITUDEPAY)} />
              </a>
              <a href="#inside-a-link">
                <ClientMark {...bare(DOODLE)} />
              </a>
            </Cluster>
          </Specimen>

          <Specimen
            title="A file that fails to load"
            note="The middle mark's src 404s. Its box is reserved at the computed size (here 97 × 32) and paints nothing; the name is still announced. It is deliberately NOT the name set as text: that would retype the client's name in our face, which ch05 §10 forbids. A missing src, an empty name or a zero size render nothing at all."
          >
            <Cluster as="ul" colGap="stack" rowGap="stack" align="center">
              <li>
                <ClientMark {...bare(OMNY)} />
              </li>
              <li className={s.bandOutline}>
                <ClientMark src="/clients/missing.svg" name="Hollins" width={120} height={40} />
              </li>
              <li>
                <ClientMark {...bare(QUOTER)} />
              </li>
            </Cluster>
          </Specimen>

          <Specimen
            title="Desktop and phone sizes, side by side"
            note="Below 768 the three sizes step down together (target side 56 → 44, height cap 40 → 32, width cap 160 → 128), so a 4:1 wordmark is 88 × 22. The upper row is the desktop size, the lower the phone step, rendered here at one viewport by swapping in the -m tokens."
          >
            <Layout rowGap="stack">
              <Strip marks={STRIP} />
              <div className={s.cmarkPhone}>
                <Strip marks={STRIP} />
              </div>
            </Layout>
          </Specimen>

          <Specimen
            title="The 326 column, at the phone sizes"
            note="The strip in the phone's content column, at the -m sizes a 390 window renders. It wraps into rows; the Cluster's rowGap is the seam between them, and no mark shrinks to stay on one line."
          >
            <div className={cx(s.trackMobile, s.cmarkPhone)}>
              <Strip marks={STRIP} />
            </div>
          </Specimen>

          <Specimen
            title="The 326 column, equal cells"
            note="The § 5.9 grid at base: two tracks, ~139 wide, at the phone sizes. The widest mark, LatitudePay at 137, fits its cell, so equal area holds at 390."
          >
            <div className={cx(s.trackMobile, s.cmarkPhone)}>
              {/* Two tracks at every width: the frame is 326 wide inside a wide window, so the
                  viewport breakpoints would otherwise give it five. */}
              <Grid marks={GRID_SET} columns={{ base: 2 }} />
            </div>
          </Specimen>
        </Layout>
      </Section>

      {/* Same markup on every ground, under a section heading, because the ink is judged against
          the heading: one step quieter than --sec-ink on each (client-mark.css, tracker 2.17). */}
      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface} density="tight">
          <Specimen
            title={`surface="${surface}"`}
            note={`Same markup, no colour prop, same files. The ink is --cmark-ink for this ground: ${INK[surface]}. The heading is the section's full ink; the marks sit a step under it.`}
          >
            <Layout rowGap="stack">
              <h2>Teams we have shipped with</h2>
              <Grid marks={GRID_SET} />
            </Layout>
          </Specimen>
        </Section>
      ))}

      <Section surface="ink" density="tight">
        <Specimen
          title="Nested: a tint band inside an ink band"
          note="The tint block in client-mark.css restates --cmark-ink, so marks inside a tint band nested in ink paint neutral-600, not ink's neutral-300."
        >
          <Section surface="tint" density="tight">
            <Strip marks={STRIP} />
          </Section>
        </Specimen>
      </Section>
    </>
  );
}
