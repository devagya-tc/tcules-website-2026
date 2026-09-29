import { ClientMark, Cluster, Layout, Section, type ClientMarkProps } from '@/components';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * ClientMark specimen — the client set at one visual weight, on four grounds.
 *
 * What this page has to show:
 *   1. equal AREA, not equal width: a 7:1 wordmark and a 3:1 lockup read as the same weight, and
 *      the ~40px height cap (ruling P2) and 160px width cap hold;
 *   2. one colour, the ground's ink, from ONE file per mark on every surface — any mark on ink or
 *      blue that renders white proves the mask is doing it, not the file;
 *   3. the strip is a Cluster of marks, not a component: the Cluster owns the gap.
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

const CLIENTS_DIR = '/clients';
const STRESS_DIR = '/design';

/* width / height are each file's viewBox. No real mark has a correction recorded yet: one is
   "recorded with the asset" (ch05 §10) — on the site, a field beside the file in the CMS. */
const client = (name: string, file: string, width: number, height: number): Mark => ({
  name,
  src: `${CLIENTS_DIR}/${file}.svg`,
  width,
  height,
  shape: `${(width / height).toFixed(1)}:1`,
});

const DOODLE = client('Doodle', 'doodle', 104, 24);
const GT_TOOLS = client('GT Tools', 'gttools', 67.384, 19.6);
const INCLUUDE = client('Incluude', 'incluude', 88.906, 16.851);
const KNOVOS = client('Knovos', 'knovos', 85.232, 14);
const LATITUDEPAY = client('LatitudePay', 'latitudepay', 133.896, 18.2);
const OMNY = client('Omny', 'omny', 93.982, 24.792);
const PLEDGE = client('Pledge', 'pledge', 92.032, 19.6);
const QUOTER = client('Quoter', 'quoter', 93.996, 28.002);
const SAFEXPAY = client('SafeXpay', 'safexpay', 83.02, 22.398);

const STRIP: readonly Mark[] = [
  OMNY,
  LATITUDEPAY,
  QUOTER,
  KNOVOS,
  SAFEXPAY,
  DOODLE,
  PLEDGE,
  GT_TOOLS,
  INCLUUDE,
];

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
function computed({ width, height, correction = 0 }: Mark) {
  const r = width / height;
  const k = 1 + Math.max(-0.15, Math.min(0.15, correction));
  const fitted = Math.min(SIDE * Math.sqrt(r), H_MAX * r, W_MAX);
  const w = Math.min(fitted * k, H_MAX * r, W_MAX);
  return `${Math.round(w)} × ${Math.round(w / r)}`;
}

/** A mark's props without its specimen label. */
function bare(mark: Mark): Omit<ClientMarkProps, 'className'> {
  const { shape, ...props } = mark;
  void shape;
  return props;
}

const SURFACES = ['paper', 'tint', 'ink', 'blue'] as const;

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
              labelled so. A mark that renders white on ink proves the mask is doing the colour,
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
            title="The arithmetic, per mark"
            note="width = 56 × √ratio (equal area, 56² px²), capped so height ≤ 40 and width ≤ 160, then × (1 + correction) and capped again. Every real mark lands inside both caps. The fictional square and stacked lockup reach the height cap first, which is why they are a little lighter than the wordmarks: the cap outranks the area, in ch05's order."
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
            note="Fictional files — no real mark has a correction recorded yet. Same files, correction 0 on the left of each pair and the recorded value on the right. A heavy mark comes down, a hairline mark comes up. The last pair passes 0.4: it is clamped to +0.15 and warned in development."
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
            note={`A 12:1 wordmark would be ${Math.round(SIDE * Math.sqrt(12))} wide at the target area. It stops at 160, and its height follows (${computed(ULTRAWIDE)}). Shown beside LatitudePay, the widest real mark at 7.4:1, which stays under the cap at its target area.`}
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
                <ClientMark
                  src={`${CLIENTS_DIR}/missing.svg`}
                  name="Hollins"
                  width={120}
                  height={40}
                />
              </li>
              <li>
                <ClientMark {...bare(QUOTER)} />
              </li>
            </Cluster>
          </Specimen>

          <Specimen
            title="The 326 column"
            note="The strip in the phone's content column. It wraps into rows; the Cluster's rowGap is the seam between them, and no mark shrinks to stay on one line."
          >
            <div className={s.trackMobile}>
              <Strip marks={STRIP} />
            </div>
          </Specimen>
        </Layout>
      </Section>

      {/* Same markup on every ground. ch05 §10 names neutral-900 on paper and paper-deep and white
          on ink; blue takes white, the ground's ink there (see client-mark.css). */}
      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface} density="tight">
          <Specimen
            title={`surface="${surface}"`}
            note="Same markup, no colour prop, same files. The ink is --cmark-ink for this ground."
          >
            <Strip marks={STRIP} />
          </Specimen>
        </Section>
      ))}

      <Section surface="ink" density="tight">
        <Specimen
          title="Nested: a tint band inside an ink band"
          note="The tint block in client-mark.css restates --cmark-ink, so marks inside a tint band nested in ink paint neutral-900, not ink's white."
        >
          <Section surface="tint" density="tight">
            <Strip marks={STRIP} />
          </Section>
        </Specimen>
      </Section>
    </>
  );
}
