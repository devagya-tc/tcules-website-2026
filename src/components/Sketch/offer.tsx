import type { ReactNode } from 'react';

import type { OfferSceneName } from '@/lib/sketches';

import styles from './Sketch.module.css';
import { CURSOR, Focus, Glyph, Hatched } from './scenes';

/**
 * The OFFER scenes: the drawings a service page's bands show beside what each item says (product-design
 * page, owner 26 Oct 2026, mock rounds 1–4). Each one draws its own item's argument, in the
 * flat-graphics grammar the other scenes keep: screens at 8 with copy on a 12-unit pitch, routes on
 * the axes ending on a port or the one arrowhead, people and objects as Solar glyphs, hatching for
 * what is not built, one focal point. Still, like every plate.
 *
 *   outcome-*     "What you get": the change each promise makes (a manual set aside, the rules behind
 *                 one switch, the awkward cases designed and handed to code, a card in every state)
 *   symptom-*     "Where we start": each complaint drawn as the problem turning into its fix
 *   specialist-*  the specialist services, drawn bare on the bento's tiles
 *   case-*        a worked example's problem and what we did, drawn on the same screen so the change
 *                 is the only difference (Dealpath's listing card and pipeline)
 *
 * Assigned item by item at the content seam (src/content/sources/offer-scenes.ts), never by keyword.
 */

/** The one arrowhead pointing right, tip at (x, y). */
function ArrowRight({ x, y }: { x: number; y: number }) {
  return (
    <path className={styles.solid} d={`M${x},${y} L${x - 7},${y - 4} L${x - 7},${y + 4} Z`} />
  );
}

/** A route from a port at x1 to the arrowhead's tip at x2, on y. */
function Hop({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <>
      <path className={styles.line} d={`M${x1},${y} L${x2 - 7},${y}`} />
      <ArrowRight x={x2} y={y} />
      <circle className={styles.node} cx={x1} cy={y} r="2.5" />
    </>
  );
}

/** A line of copy from x, `w` long; `quiet` for the lighter ink. */
function Copy({
  x,
  y,
  w,
  quiet = false,
}: {
  x: number;
  y: number;
  w: number;
  quiet?: boolean;
}) {
  return (
    <path className={quiet ? styles.copyQuiet : styles.copy} d={`M${x},${y} L${x + w},${y}`} />
  );
}

function Rect({
  x,
  y,
  w,
  h,
  rx = 4,
  className,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rx?: number;
  className: string | undefined;
}) {
  return <rect className={className} x={x} y={y} width={w} height={h} rx={rx} />;
}

/** The floating cursor, tip at (x, y), its flat offset under it. */
function Cursor({ x, y }: { x: number; y: number }) {
  return (
    <>
      <path
        className={styles.liftUnder}
        d={CURSOR}
        transform={`translate(${x + 2},${y + 2})`}
      />
      <path className={styles.lift} d={CURSOR} transform={`translate(${x},${y})`} />
    </>
  );
}

/** A switch, its knob at the end it is set to. */
function Switch({ x, y, on }: { x: number; y: number; on: boolean }) {
  return (
    <>
      <Rect x={x} y={y} w={24} h={12} rx={6} className={on ? styles.solid : styles.tile} />
      <circle
        className={on ? styles.glyphOn : styles.knob}
        cx={on ? x + 18 : x + 6}
        cy={y + 6}
        r="3.5"
      />
    </>
  );
}

/**
 * The lens: a magnifier over (x, y), drawn as ONE object (owner, 26 Oct 2026: the handle "reads as line
 * on top of the circle not as one unit"). The handle is an outlined bar in the ring's own ink and
 * weight, set at 135° and tucked under the ring, and the two share one flat offset, as everything that
 * floats does.
 */
function Lens({ x, y, r }: { x: number; y: number; r: number }) {
  const handle = (dx: number, className: string | undefined) => (
    <rect
      className={className}
      x={-3.5}
      y={r - 3}
      width={7}
      height={15}
      rx={3.5}
      transform={`translate(${x + dx},${y + dx}) rotate(45)`}
    />
  );
  return (
    <>
      <circle className={styles.liftUnder} cx={x + 2} cy={y + 2} r={r} />
      {handle(2, styles.liftUnder)}
      {handle(0, styles.lift)}
      <circle className={styles.lift} cx={x} cy={y} r={r} />
    </>
  );
}

/* ── What you get ─────────────────────────────────────────────────────────────── */

/** Less explaining: the manual set aside, never built; the path walked to its end. */
function OutcomeExplain() {
  return (
    <>
      <Hatched x={30} y={40} w={60} h={80} />
      <Glyph name="notebook" cx={60} cy={80} size={20} className={styles.glyphQuiet} />
      <Rect x={110} y={30} w={180} h={120} rx={8} className={styles.frame} />
      <Copy x={126} y={50} w={48} quiet />
      <Rect x={126} y={80} w={40} h={20} rx={10} className={styles.tile} />
      <Hop x1={166} x2={190} y={90} />
      <Rect x={190} y={80} w={40} h={20} rx={10} className={styles.tile} />
      <Hop x1={230} x2={250} y={90} />
      <Focus x={262} y={90} glyph="check-circle" size={12} />
      <Cursor x={268} y={102} />
      <Copy x={126} y={126} w={120} quiet />
    </>
  );
}

/** Complex rules, simple screens: the matrix worked out behind, one switch in front. */
function OutcomeRules() {
  const cells: ReactNode[] = [];
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      cells.push(
        <Rect
          key={`${i}-${j}`}
          x={42 + j * 22}
          y={44 + i * 24}
          w={14}
          h={12}
          rx={3}
          className={(i * 3 + j * 5) % 4 === 0 ? styles.soft : styles.tile}
        />,
      );
  return (
    <>
      <Rect x={30} y={30} w={100} h={120} rx={8} className={styles.frameQuiet} />
      {cells}
      <Hop x1={130} x2={170} y={90} />
      <Rect x={170} y={40} w={120} h={100} rx={8} className={styles.frame} />
      <Copy x={186} y={60} w={40} quiet />
      <Glyph name="user" cx={194} cy={90} size={16} className={styles.glyph} />
      <Copy x={210} y={90} w={24} />
      <Rect x={240} y={78} w={36} h={24} rx={12} className={styles.halo} />
      <Switch x={246} y={84} on />
      <Copy x={186} y={116} w={72} quiet />
    </>
  );
}

/** Fewer surprises: the screen and its variants designed, handed to code that builds it. */
function OutcomeBuild() {
  return (
    <>
      <Rect x={54} y={22} w={100} h={120} rx={8} className={styles.frameQuiet} />
      <Rect x={42} y={30} w={100} h={120} rx={8} className={styles.frameQuiet} />
      <Rect x={30} y={38} w={100} h={120} rx={8} className={styles.frame} />
      <Copy x={46} y={58} w={40} quiet />
      <Copy x={46} y={74} w={64} />
      <Rect x={46} y={92} w={40} h={16} className={styles.tile} />
      <Copy x={46} y={126} w={52} quiet />
      <Hop x1={130} x2={170} y={98} />
      <Rect x={170} y={38} w={120} h={120} rx={8} className={styles.frame} />
      <path className={styles.rule} d="M196,38 L196,158" />
      {[58, 74, 90, 106, 122].map((y, i) => (
        <Copy key={y} x={208} y={y} w={[48, 64, 40, 56, 32][i] ?? 40} quiet={i % 2 === 0} />
      ))}
      <Focus x={270} y={138} glyph="check-circle" size={12} />
    </>
  );
}

/** Feels finished: one card loading, empty and in error, then finished, the focal point. */
function OutcomeFinished() {
  return (
    <>
      <Rect x={30} y={50} w={56} h={80} rx={8} className={styles.tile} />
      <Rect x={40} y={64} w={36} h={4} rx={2} className={styles.soft} />
      <Rect x={40} y={76} w={28} h={4} rx={2} className={styles.soft} />
      <Rect x={40} y={88} w={32} h={4} rx={2} className={styles.soft} />
      <Rect x={96} y={50} w={56} h={80} rx={8} className={styles.trailFrame} />
      <Glyph name="database" cx={124} cy={84} size={16} className={styles.glyphQuiet} />
      <Copy x={110} y={108} w={28} quiet />
      <Rect x={162} y={50} w={56} h={80} rx={8} className={styles.tile} />
      <Glyph name="danger-triangle" cx={190} cy={80} size={16} className={styles.glyph} />
      <Rect x={176} y={102} w={28} h={12} rx={6} className={styles.frame} />
      <Rect x={228} y={40} w={72} h={100} rx={12} className={styles.halo} />
      <Rect x={234} y={46} w={60} h={88} rx={8} className={styles.frame} />
      <Copy x={244} y={62} w={28} quiet />
      <Rect x={244} y={74} w={40} h={24} className={styles.region} />
      <Copy x={244} y={110} w={36} />
      <Copy x={244} y={122} w={24} quiet />
    </>
  );
}

/* ── Where we start ───────────────────────────────────────────────────────────── */

/** "Customers keep getting stuck": the old path loops back at step two; the new one runs through. */
function SymptomStuck() {
  return (
    <>
      {[30, 130, 230].map((x) => (
        <g key={x}>
          <Rect x={x} y={60} w={60} h={60} rx={8} className={styles.frame} />
          <Copy x={x + 12} y={74} w={24} quiet />
        </g>
      ))}
      <path className={styles.trail} d="M90,90 L130,90" />
      <path
        className={styles.trail}
        d="M160,120 L160,140 Q160,146 154,146 L126,146 Q120,146 120,140 L120,96"
      />
      <Hop x1={190} x2={230} y={90} />
      <circle className={styles.node} cx="160" cy="90" r="2.5" />
      <Focus x={260} y={90} glyph="flag" size={12} />
    </>
  );
}

/** "The product has grown messy": a sprawl of items, regrouped into sections people can scan. */
function SymptomMessy() {
  const widths = [40, 56, 30, 48, 36, 60, 44, 28];
  return (
    <>
      <Rect x={30} y={30} w={100} h={120} rx={8} className={styles.frameQuiet} />
      {[44, 56, 68, 80, 92, 104, 116, 128].map((y, i) => (
        <Copy key={y} x={42 + (i % 3) * 6} y={y} w={widths[i] ?? 40} quiet />
      ))}
      <Hop x1={130} x2={170} y={90} />
      <Rect x={170} y={30} w={120} h={120} rx={8} className={styles.frame} />
      <Rect x={182} y={42} w={96} h={28} className={styles.tile} />
      <Copy x={192} y={56} w={52} quiet />
      <Rect x={182} y={76} w={96} h={32} className={styles.region} />
      <path className={styles.regionCopy} d="M192,88 L248,88" />
      <Copy x={192} y={98} w={40} />
      <Rect x={182} y={114} w={96} h={26} className={styles.tile} />
      <Copy x={192} y={127} w={44} quiet />
    </>
  );
}

/** "Test an idea before building it": the idea as a prototype, put in front of a person who gets through. */
function SymptomTest() {
  return (
    <>
      <Rect x={30} y={30} w={140} h={120} rx={8} className={styles.trailFrame} />
      <Copy x={46} y={50} w={48} quiet />
      <Hatched x={46} y={66} w={108} h={36} />
      <Rect x={46} y={114} w={48} h={20} rx={10} className={styles.tile} />
      <Cursor x={84} y={120} />
      <Hop x1={170} x2={210} y={90} />
      <Glyph name="user" cx={230} cy={90} size={22} className={styles.glyph} />
      <Focus x={270} y={90} glyph="check-circle" size={12} />
    </>
  );
}

/** "Every screen looks slightly different": three versions of one control, made one shared pattern. */
function SymptomConsistent() {
  return (
    <>
      <Rect x={30} y={46} w={52} h={18} rx={9} className={styles.tile} />
      <Rect x={38} y={82} w={64} h={22} rx={2} className={styles.tile} />
      <Rect x={30} y={122} w={44} h={14} rx={6} className={styles.tile} />
      <Hop x1={130} x2={170} y={90} />
      <Rect x={180} y={30} w={110} h={120} rx={12} className={styles.halo} />
      {[46, 80, 114].map((y) => (
        <Rect key={y} x={196} y={y} w={78} h={20} rx={10} className={styles.solid} />
      ))}
    </>
  );
}

/** "What ships doesn't match the design": the build drifted off the design; worked in code until it sits on it. */
function SymptomMatch() {
  return (
    <>
      <Rect x={30} y={40} w={90} h={100} rx={8} className={styles.trailFrame} />
      <Rect x={42} y={30} w={90} h={100} rx={8} className={styles.frameQuiet} />
      <Copy x={54} y={50} w={40} quiet />
      <Rect x={54} y={66} w={56} h={20} className={styles.tile} />
      <Hop x1={140} x2={180} y={90} />
      <Rect x={186} y={34} w={104} h={112} rx={12} className={styles.halo} />
      <Rect x={192} y={40} w={90} h={100} rx={8} className={styles.frame} />
      <Copy x={204} y={60} w={40} quiet />
      <Rect x={204} y={76} w={56} h={20} className={styles.region} />
      <Focus x={268} y={128} glyph="check-circle" size={12} />
    </>
  );
}

/* ── Specialist services (drawn bare on the bento) ────────────────────────────── */

function SpecialistResearch() {
  const notes: [number, number][] = [
    [190, 40],
    [244, 40],
    [190, 94],
    [244, 94],
  ];
  return (
    <>
      <Glyph name="user" cx={50} cy={90} size={28} className={styles.glyph} />
      <Rect x={76} y={64} w={64} h={28} rx={12} className={styles.frame} />
      <Copy x={88} y={78} w={40} quiet />
      <Glyph name="microphone" cx={50} cy={128} size={16} className={styles.glyphQuiet} />
      <Hop x1={150} x2={180} y={90} />
      {notes.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <Rect x={x} y={y} w={46} h={46} className={i === 3 ? styles.region : styles.tile} />
          <Copy x={x + 8} y={y + 14} w={26} quiet={i !== 3} />
          <Copy x={x + 8} y={y + 26} w={20} quiet />
        </g>
      ))}
      <Focus x={290} y={140} glyph="eye" size={12} />
    </>
  );
}

function SpecialistIa() {
  return (
    <>
      <Rect x={30} y={70} w={60} h={40} rx={8} className={styles.frame} />
      <Copy x={42} y={90} w={36} quiet />
      <path className={styles.line} d="M90,90 L183,90" />
      <circle className={styles.node} cx="90" cy="90" r="2.5" />
      <path className={styles.line} d="M130,90 L130,46 Q130,40 136,40 L183,40" />
      <path className={styles.line} d="M130,90 L130,134 Q130,140 136,140 L183,140" />
      <ArrowRight x={190} y={40} />
      <ArrowRight x={190} y={90} />
      <ArrowRight x={190} y={140} />
      <Rect x={190} y={26} w={100} h={28} className={styles.tile} />
      <Copy x={202} y={40} w={48} quiet />
      <Rect x={184} y={70} w={112} h={40} rx={10} className={styles.halo} />
      <Rect x={190} y={76} w={100} h={28} className={styles.region} />
      <path className={styles.regionCopy} d="M202,90 L262,90" />
      <Rect x={190} y={126} w={100} h={28} className={styles.tile} />
      <Copy x={202} y={140} w={40} quiet />
    </>
  );
}

function SpecialistUi() {
  return (
    <>
      <Rect x={40} y={30} w={200} h={120} rx={8} className={styles.frame} />
      <Copy x={60} y={52} w={64} quiet />
      <Copy x={60} y={68} w={120} />
      <Copy x={60} y={82} w={96} quiet />
      <Rect x={60} y={104} w={56} h={24} className={styles.tile} />
      <Rect x={126} y={98} w={92} h={36} rx={12} className={styles.halo} />
      <Rect x={132} y={104} w={80} h={24} className={styles.solid} />
      <Cursor x={196} y={118} />
    </>
  );
}

function SpecialistDataviz() {
  const heights = [28, 44, 36, 58, 50];
  return (
    <>
      <Rect x={40} y={30} w={240} h={120} rx={8} className={styles.frame} />
      <Copy x={56} y={50} w={56} quiet />
      <path className={styles.rule} d="M60,130 L260,130" />
      <Rect x={178} y={62} w={44} h={72} rx={8} className={styles.halo} />
      {heights.map((h, i) => (
        <Rect
          key={i}
          x={76 + i * 36}
          y={130 - h}
          w={20}
          h={h}
          rx={3}
          className={i === 3 ? styles.solid : styles.tile}
        />
      ))}
    </>
  );
}

function SpecialistPrototype() {
  return (
    <>
      <Rect x={30} y={40} w={90} h={100} rx={8} className={styles.frame} />
      <Copy x={44} y={58} w={40} quiet />
      <Rect x={44} y={104} w={40} h={18} rx={9} className={styles.solid} />
      <Hop x1={120} x2={170} y={113} />
      <Rect x={170} y={40} w={90} h={100} rx={8} className={styles.frame} />
      <Copy x={184} y={58} w={48} quiet />
      <Copy x={184} y={74} w={60} />
      <Glyph name="user" cx={284} cy={70} size={20} className={styles.glyph} />
      <Focus x={284} y={112} glyph="check-circle" size={12} />
      <Cursor x={70} y={116} />
    </>
  );
}

/** New Product Design & First Release: the prototype that holds everything, made the release that
 *  holds one job for one person; what it leaves out is hatched, not built. */
function SpecialistNewProduct() {
  const widths = [52, 64, 40, 70, 46, 58, 36];
  return (
    <>
      <Rect x={30} y={40} w={100} h={100} rx={8} className={styles.trailFrame} />
      {[56, 68, 80, 92, 104, 116, 128].map((y, i) => (
        <Copy key={y} x={44} y={y} w={widths[i] ?? 40} quiet />
      ))}
      <Hop x1={130} x2={170} y={90} />
      <Rect x={170} y={30} w={120} h={120} rx={8} className={styles.frame} />
      <Glyph name="user" cx={188} cy={50} size={14} className={styles.glyph} />
      <Copy x={202} y={50} w={40} quiet />
      <Rect x={180} y={66} w={100} h={36} rx={12} className={styles.halo} />
      <Rect x={186} y={72} w={88} h={24} className={styles.region} />
      <path className={styles.regionCopy} d="M196,84 L250,84" />
      <Hatched x={186} y={112} w={88} h={14} />
      <Hatched x={186} y={132} w={56} h={10} />
    </>
  );
}

/** UX & Product Audit: the team knows something is wrong somewhere on the screen; the lens finds what. */
function SpecialistAudit() {
  return (
    <>
      <Rect x={30} y={30} w={220} h={120} rx={8} className={styles.frame} />
      <Copy x={46} y={50} w={60} quiet />
      <Copy x={46} y={62} w={100} />
      {[46, 110, 174].map((x) => (
        <g key={x}>
          <Rect x={x} y={84} w={52} h={44} className={styles.tile} />
          <Copy x={x + 8} y={96} w={28} quiet />
          <Copy x={x + 8} y={108} w={20} quiet />
        </g>
      ))}
      <Lens x={136} y={106} r={24} />
      <Focus x={136} y={106} glyph="danger-triangle" size={12} />
    </>
  );
}

/* ── A worked example: Dealpath ──────────────────────────────────────────────────
   Drawn on a 400 × 220 board and set into the 320 × 180 plate at 0.82, so the listing card, its
   "Add to pipeline" action and the pipeline column read at the plate's size. The two drawings share
   every part but the change.

   The PROPERTY has an identity: its picture is the soft blue tile, on the listing and on every deal
   for it, and every other deal's picture is quiet. So a duplicate reads as a twin of the deal already
   there, without words (owner, 26 Oct 2026: "the problem graphic doesn't look like a problem"). */

/** The listing card: this property's picture, its name and place, its line, its action. */
function Listing() {
  return (
    <>
      <Rect x={20} y={50} w={140} h={120} rx={8} className={styles.frame} />
      <Rect x={32} y={62} w={44} h={44} className={styles.soft} />
      <Copy x={86} y={70} w={56} />
      <Copy x={86} y={84} w={40} quiet />
      <Copy x={86} y={98} w={48} quiet />
      <Copy x={32} y={124} w={104} quiet />
      <Rect x={84} y={142} w={64} h={18} className={styles.solid} />
      <Glyph name="arrow-right" cx={96} cy={151} size={10} className={styles.glyphOn} />
      <path className={styles.tick} d="M106,151 L138,151" />
    </>
  );
}

/** A deal in the pipeline: its property's picture (this one's soft blue, any other's quiet) and two lines. */
function Deal({
  y,
  ours = false,
  className,
}: {
  y: number;
  ours?: boolean;
  className: string | undefined;
}) {
  return (
    <>
      <Rect x={238} y={y} w={104} h={36} className={className} />
      <Rect
        x={246}
        y={y + 8}
        w={20}
        h={20}
        rx={3}
        className={ours ? styles.soft : styles.tile}
      />
      <Copy x={274} y={y + 13} w={52} quiet={!ours} />
      <Copy x={274} y={y + 25} w={36} quiet />
    </>
  );
}

/** The pipeline column: another property's deal, then this property's, already there. */
function Pipeline({ found = false }: { found?: boolean }) {
  return (
    <>
      <Rect x={230} y={24} w={120} h={166} rx={8} className={styles.frameQuiet} />
      <Copy x={238} y={36} w={44} quiet />
      <Deal y={46} className={styles.tile} />
      {found ? <Rect x={232} y={84} w={116} h={48} rx={10} className={styles.halo} /> : null}
      <Deal y={90} ours className={found ? styles.region : styles.tile} />
    </>
  );
}

/** The problem: "Add to pipeline" always made a new deal, so the property's deal is there twice. */
function CaseDealpathProblem() {
  return (
    <g transform="translate(-6,-6) scale(0.82)">
      <Pipeline />
      <Deal y={133} ours className={styles.frame} />
      <Hop x1={148} x2={238} y={151} />
      {/* The twins, joined: the deal that was there and the one the button just made. */}
      <path
        className={styles.trail}
        d="M342,108 L350,108 Q356,108 356,114 L356,145 Q356,151 350,151 L342,151"
      />
      <Focus x={376} y={130} glyph="danger-triangle" size={12} />
      <Listing />
    </g>
  );
}

/** What we did: the same action searches first, finds the deal and adds to it; the second slot stays empty. */
function CaseDealpathDid() {
  return (
    <g transform="translate(-6,-6) scale(0.82)">
      <Pipeline found />
      <Hatched x={238} y={133} w={104} h={36} />
      <path
        className={styles.line}
        d="M148,151 L208,151 Q214,151 214,145 L214,114 Q214,108 220,108 L231,108"
      />
      <ArrowRight x={238} y={108} />
      <circle className={styles.node} cx="148" cy="151" r="2.5" />
      <Lens x={318} y={102} r={14} />
      <Listing />
    </g>
  );
}

export const OFFER: Record<OfferSceneName, () => ReactNode> = {
  'outcome-explain': OutcomeExplain,
  'outcome-rules': OutcomeRules,
  'outcome-build': OutcomeBuild,
  'outcome-finished': OutcomeFinished,
  'symptom-stuck': SymptomStuck,
  'symptom-messy': SymptomMessy,
  'symptom-test': SymptomTest,
  'symptom-consistent': SymptomConsistent,
  'symptom-match': SymptomMatch,
  'specialist-research': SpecialistResearch,
  'specialist-ia': SpecialistIa,
  'specialist-ui': SpecialistUi,
  'specialist-dataviz': SpecialistDataviz,
  'specialist-prototype': SpecialistPrototype,
  'specialist-new-product': SpecialistNewProduct,
  'specialist-audit': SpecialistAudit,
  'case-dealpath-problem': CaseDealpathProblem,
  'case-dealpath-did': CaseDealpathDid,
};

/** Each specialist scene's drawn edge in the 320 × 180 drawing, for the bento's bare frame. */
export const OFFER_DRAWN: Partial<
  Record<OfferSceneName, readonly [number, number, number, number]>
> = {
  'specialist-research': [26, 22, 286, 140],
  'specialist-ia': [26, 22, 274, 136],
  'specialist-ui': [36, 26, 208, 128],
  'specialist-dataviz': [36, 26, 248, 128],
  'specialist-prototype': [26, 30, 280, 116],
  'specialist-new-product': [26, 26, 268, 128],
  'specialist-audit': [26, 26, 228, 128],
};
