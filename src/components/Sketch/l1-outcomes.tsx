import type { ReactNode } from 'react';

import type { L1OutcomeScene } from '@/lib/sketches';

import { Copy, Cursor, Hop, Lens, Rect, Switch } from './offer';
import { Focus, Glyph, Hatched } from './scenes';
import styles from './Sketch.module.css';

/**
 * The OUTCOME scenes of the six service lines (round 5, 30 Oct 2026): "What you get", each item drawn
 * from its own words, in the grammar the product-design page's outcomes keep.
 */

/** What the AI may do at each step: four steps along one route, each with its own switch, data and permissions at the end. */
function AiSteps() {
  const glyphs = ['eye', 'chat-round-dots', 'ruler-pen', 'bolt-circle'] as const;
  return (
    <>
      <path className={styles.line} d="M60,68 L218,68" />
      {glyphs.map((g, i) => (
        <g key={g}>
          <Rect x={30 + i * 52} y={46} w={44} h={44} rx={8} className={styles.tile} />
          <Glyph name={g} cx={52 + i * 52} cy={68} size={18} className={styles.glyphQuiet} />
          {i === 2 ? <Rect x={34 + i * 52} y={104} w={36} h={24} rx={12} className={styles.halo} /> : null}
          <Switch x={40 + i * 52} y={110} on={i < 3} />
        </g>
      ))}
      <Hop x1={234} x2={248} y={68} />
      <Glyph name="lock" cx={262} cy={52} size={16} className={styles.glyphQuiet} />
      <Glyph name="database" cx={262} cy={92} size={16} className={styles.glyphQuiet} />
    </>
  );
}

/** The checks people need: an answer with its source, the way to undo or override it, a person to review it. */
function AiChecks() {
  return (
    <>
      <Rect x={30} y={34} w={170} h={106} rx={8} className={styles.frame} />
      <Copy x={46} y={54} w={110} />
      <Copy x={46} y={66} w={84} quiet />
      <Rect x={46} y={78} w={36} h={12} rx={6} className={styles.tile} />
      <Hop x1={82} x2={112} y={84} />
      <Glyph name="document-text" cx={124} cy={84} size={16} className={styles.glyphQuiet} />
      <Rect x={46} y={104} w={56} h={24} rx={12} className={styles.tile} />
      <Glyph name="undo-left" cx={62} cy={116} size={14} className={styles.glyph} />
      <Copy x={74} y={116} w={16} quiet />
      <Rect x={110} y={104} w={58} h={24} rx={12} className={styles.tile} />
      <Copy x={122} y={116} w={34} quiet />
      <Hop x1={200} x2={236} y={90} />
      <Focus x={258} y={90} glyph="user" size={14} />
    </>
  );
}

/** Behaviour tried in code on sample data: code running a moving element in a browser, fed by data that is not the real thing. */
function TriedInCode() {
  return (
    <>
      <Rect x={30} y={36} w={100} h={96} rx={8} className={styles.frame} />
      <Glyph name="code" cx={48} cy={54} size={14} className={styles.glyph} />
      <Copy x={46} y={72} w={56} quiet />
      <Copy x={58} y={84} w={44} />
      <Copy x={58} y={96} w={36} quiet />
      <Copy x={46} y={108} w={28} quiet />
      <Glyph name="database" cx={44} cy={146} size={14} className={styles.glyphQuiet} />
      <path className={styles.line} d="M56,146 L80,146 L80,132" />
      <Hop x1={130} x2={170} y={84} />
      <Rect x={170} y={36} w={120} h={96} rx={8} className={styles.frame} />
      <path className={styles.rule} d="M170,52 L290,52" />
      {[180, 188, 196].map((x) => (
        <circle key={x} className={styles.tile} cx={x} cy={44} r="2" />
      ))}
      <Rect x={184} y={64} w={46} h={14} className={styles.tile} />
      <Rect x={214} y={84} w={64} h={32} rx={8} className={styles.halo} />
      <Rect x={220} y={90} w={52} h={20} className={styles.region} />
      <Cursor x={252} y={98} />
    </>
  );
}

/** Hard components: a table with a row lifted out by drag, its slot left empty, the keyboard way beside it. */
function HardComponent() {
  return (
    <>
      <Rect x={30} y={34} w={150} h={106} rx={8} className={styles.frame} />
      {[46, 66, 106, 120].map((y) => (
        <Rect key={y} x={42} y={y} w={126} h={14} rx={3} className={styles.tile} />
      ))}
      <Rect x={42} y={86} w={126} h={14} rx={3} className={styles.trailFrame} />
      <Hop x1={168} x2={206} y={93} />
      <Rect x={206} y={74} w={80} h={22} className={styles.halo} />
      <Rect x={212} y={78} w={68} h={14} rx={3} className={styles.region} />
      <Cursor x={262} y={84} />
      <Rect x={214} y={116} w={16} h={16} rx={3} className={styles.tile} />
      <Hop x1={238} x2={270} y={124} />
      <Focus x={266} y={50} glyph="check-circle" size={12} />
    </>
  );
}

/** Code in your repository: a sheet of code, checked by an engineer, joining the stack that is yours. */
function CodeInRepo() {
  return (
    <>
      <Rect x={30} y={44} w={100} h={96} rx={8} className={styles.frame} />
      <Glyph name="code" cx={48} cy={62} size={14} className={styles.glyph} />
      <Copy x={46} y={82} w={56} quiet />
      <Copy x={58} y={94} w={44} />
      <Copy x={58} y={106} w={36} quiet />
      <Copy x={46} y={118} w={50} quiet />
      <Focus x={170} y={56} glyph="check-circle" size={12} />
      <Glyph name="user" cx={170} cy={88} size={16} className={styles.glyph} />
      <Hop x1={130} x2={206} y={112} />
      {[0, 1, 2].map((i) => (
        <Rect key={i} x={214 + i * 8} y={100 - i * 8 + 12} w={60} h={34} rx={6} className={i === 2 ? styles.frame : styles.frameQuiet} />
      ))}
      <Glyph name="layers" cx={254} cy={124} size={16} className={styles.glyph} />
    </>
  );
}

/** Foundations named by meaning: three swatches by their names, then two screens that use the same blue. */
function DsTokens() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Rect x={30} y={44 + i * 34} w={28} h={22} className={[styles.soft, styles.region, styles.solid][i]} />
          <Copy x={68} y={55 + i * 34} w={[36, 48, 28][i] ?? 36} quiet />
        </g>
      ))}
      <Rect x={22} y={72} w={44} h={26} rx={6} className={styles.halo} />
      <Hop x1={120} x2={160} y={90} />
      <Rect x={160} y={36} w={60} h={96} rx={8} className={styles.frameQuiet} />
      <Rect x={170} y={48} w={40} h={22} className={styles.region} />
      <Copy x={170} y={88} w={32} quiet />
      <Rect x={170} y={100} w={40} h={16} rx={8} className={styles.solid} />
      <Rect x={230} y={36} w={60} h={96} rx={8} className={styles.frameQuiet} />
      <Rect x={240} y={48} w={40} h={22} className={styles.region} />
      <Copy x={240} y={88} w={32} quiet />
      <Rect x={240} y={100} w={40} h={16} rx={8} className={styles.solid} />
    </>
  );
}

/** Documentation: one component's states and when it belongs on a screen, and when it does not. */
function DsDocs() {
  return (
    <>
      <Rect x={30} y={30} w={200} h={120} rx={8} className={styles.frame} />
      <Rect x={46} y={44} w={56} h={18} rx={9} className={styles.tile} />
      {[0, 1, 2].map((i) => (
        <Rect key={i} x={46 + i * 44} y={74} w={36} h={18} rx={9} className={[styles.tile, styles.region, styles.solid][i]} />
      ))}
      <Copy x={46} y={110} w={140} quiet />
      <Copy x={46} y={122} w={104} quiet />
      <Glyph name="check-circle" cx={262} cy={62} size={18} className={styles.glyph} />
      <Glyph name="close-circle" cx={262} cy={108} size={18} className={styles.glyphQuiet} />
      <path className={styles.rule} d="M230,90 L290,90" />
    </>
  );
}

/** A first release tried on a real part of your product: components from the library, put in context, then signed off. */
function DsFirstRelease() {
  return (
    <>
      <Rect x={30} y={44} w={72} h={72} rx={8} className={styles.frameQuiet} />
      {[0, 1].map((r) =>
        [0, 1].map((c) => (
          <Rect key={`${r}${c}`} x={40 + c * 28} y={54 + r * 28} w={22} h={20} className={styles.tile} />
        )),
      )}
      <Hop x1={102} x2={140} y={80} />
      <Rect x={140} y={34} w={150} h={90} rx={8} className={styles.frame} />
      <Copy x={154} y={50} w={48} quiet />
      <Rect x={154} y={62} w={46} h={22} className={styles.region} />
      <Rect x={212} y={62} w={64} h={22} className={styles.tile} />
      <Rect x={154} y={96} w={46} h={16} className={styles.region} />
      <Copy x={212} y={104} w={52} quiet />
      <Focus x={215} y={140} glyph="user" size={12} />
    </>
  );
}

/** A route for change: teams contribute into the library, whose owner releases it, and use is watched. */
function DsRouteForChange() {
  return (
    <>
      <Glyph name="users-group-rounded" cx={46} cy={64} size={20} className={styles.glyphQuiet} />
      <Glyph name="users-group-rounded" cx={46} cy={116} size={20} className={styles.glyphQuiet} />
      <Hop x1={64} x2={108} y={64} />
      <Hop x1={64} x2={108} y={116} />
      <Rect x={108} y={38} w={90} h={104} rx={8} className={styles.frame} />
      <Glyph name="user" cx={126} cy={56} size={16} className={styles.glyph} />
      {[0, 1].map((r) =>
        [0, 1].map((c) => (
          <Rect key={`${r}${c}`} x={122 + c * 36} y={72 + r * 30} w={28} h={22} className={styles.tile} />
        )),
      )}
      <Hop x1={198} x2={232} y={90} />
      <Rect x={232} y={50} w={48} h={16} rx={8} className={styles.tile} />
      <Rect x={232} y={72} w={48} h={16} rx={8} className={styles.tile} />
      <Rect x={226} y={92} w={60} h={28} rx={14} className={styles.halo} />
      <Rect x={232} y={98} w={48} h={16} rx={8} className={styles.solid} />
      <Glyph name="graph-up" cx={256} cy={136} size={14} className={styles.glyphQuiet} />
    </>
  );
}

/** Five product choices, written where everyone can see them: five notes on one board, the people reading it. */
function FiveChoices() {
  const g = ['user', 'close-circle', 'lock', 'database', 'danger-triangle'] as const;
  const at = [
    [112, 46],
    [162, 46],
    [212, 46],
    [137, 92],
    [187, 92],
  ] as const;
  return (
    <>
      <Glyph name="user" cx={42} cy={76} size={18} className={styles.glyph} />
      <Glyph name="users-group-rounded" cx={42} cy={108} size={18} className={styles.glyphQuiet} />
      <Hop x1={60} x2={92} y={92} />
      <Rect x={92} y={34} w={198} h={108} rx={8} className={styles.frame} />
      {at.map(([x, y], i) => (
        <g key={i}>
          {i === 3 ? <Rect x={x - 6} y={y - 6} w={52} h={50} rx={8} className={styles.halo} /> : null}
          <Rect x={x} y={y} w={40} h={38} className={styles.tile} />
          <Glyph name={g[i] ?? 'user'} cx={x + 10} cy={y + 10} size={10} className={styles.glyphQuiet} />
          <Copy x={x + 8} y={y + 26} w={24} quiet />
        </g>
      ))}
    </>
  );
}

/** The build: layers (sign-in, data, payments) stacked, the rest still to come, handed to a working product. */
function BuildParts() {
  const g = ['key', 'database', 'wallet'] as const;
  return (
    <>
      {g.map((n, i) => (
        <g key={n}>
          <Rect x={40} y={34 + i * 28} w={96} h={22} className={styles.tile} />
          <Glyph name={n} cx={56} cy={45 + i * 28} size={14} className={styles.glyph} />
          <Copy x={72} y={45 + i * 28} w={48} quiet />
          <path className={styles.line} d={`M88,${56 + i * 28} L88,${62 + i * 28}`} />
        </g>
      ))}
      <Hatched x={40} y={118} w={96} h={22} />
      <Hop x1={136} x2={176} y={90} />
      <Rect x={176} y={44} w={114} h={92} rx={8} className={styles.frame} />
      <Copy x={190} y={62} w={44} quiet />
      <Rect x={190} y={74} w={86} h={24} className={styles.tile} />
      <Copy x={190} y={112} w={64} quiet />
      <Focus x={266} y={44} glyph="check-circle" size={12} />
    </>
  );
}

/** Where new products break: sign-in, other people's data, payments and timeouts, each tried before launch. */
function BreakPoints() {
  const g = ['key', 'users-group-rounded', 'wallet', 'clock-circle'] as const;
  return (
    <>
      <Rect x={30} y={34} w={196} h={108} rx={8} className={styles.frame} />
      {g.map((n, i) => (
        <g key={n}>
          <Rect x={44 + (i % 2) * 90} y={48 + Math.floor(i / 2) * 44} w={76} h={32} className={styles.tile} />
          <Glyph name={n} cx={62 + (i % 2) * 90} cy={64 + Math.floor(i / 2) * 44} size={16} className={styles.glyph} />
          <Copy x={78 + (i % 2) * 90} y={64 + Math.floor(i / 2) * 44} w={28} quiet />
        </g>
      ))}
      <Lens x={88} y={60} r={14} />
      <Hop x1={226} x2={246} y={90} />
      <Focus x={266} y={90} glyph="shield-check" size={12} />
    </>
  );
}

/** A call on every part: each part of the product marked keep, redesign, rebuild, move or retire. */
/** The call each part carries, inside its tile at top-right: keep, redesign, move, rebuild (simplify is the smaller tile, retire the hatched one). */
const MARKS: Partial<Record<number, 'check-circle' | 'ruler-pen' | 'layers' | 'refresh'>> = {
  0: 'check-circle',
  1: 'ruler-pen',
  2: 'layers',
  5: 'refresh',
};

function PartCalls() {
  const marks: ReactNode[] = [];
  for (let i = 0; i < 6; i++) {
    const x = 50 + (i % 3) * 78;
    const y = 40 + Math.floor(i / 3) * 56;
    const mark = MARKS[i];
    if (i === 4) marks.push(<Hatched key={i} x={x} y={y} w={64} h={42} />);
    else
      marks.push(
        <g key={i}>
          {i === 1 ? <Rect x={x - 6} y={y - 6} w={76} h={54} rx={8} className={styles.halo} /> : null}
          <Rect x={x} y={y} w={i === 3 ? 44 : 64} h={i === 3 ? 30 : 42} className={styles.tile} />
          <Copy x={x + 8} y={y + 14} w={i === 3 ? 20 : 32} quiet />
          {mark ? (
            <Glyph name={mark} cx={x + 64 - 14} cy={y + 14} size={12} className={styles.glyph} />
          ) : null}
        </g>,
      );
  }
  return (
    <>
      {marks}
    </>
  );
}

/** A written record of what customers rely on: the shortcut, the saved filter and the weekly report that must survive. */
function HabitsRecord() {
  return (
    <>
      <Glyph name="user" cx={44} cy={90} size={20} className={styles.glyph} />
      <Hop x1={62} x2={100} y={90} />
      <Rect x={100} y={30} w={190} h={120} rx={8} className={styles.frame} />
      <Glyph name="notebook" cx={120} cy={48} size={14} className={styles.glyphQuiet} />
      <Copy x={136} y={48} w={44} quiet />
      <Rect x={116} y={64} w={16} h={16} rx={3} className={styles.tile} />
      <Copy x={144} y={72} w={60} quiet />
      <Rect x={116} y={88} w={44} h={16} rx={8} className={styles.tile} />
      <Copy x={170} y={96} w={52} quiet />
      {[0, 1, 2].map((i) => (
        <Rect key={i} x={118 + i * 10} y={132 - [8, 16, 12][i]!} w={6} h={[8, 16, 12][i]!} rx={1} className={styles.solid} />
      ))}
      <Glyph name="calendar" cx={170} cy={124} size={14} className={styles.glyphQuiet} />
      <Focus x={266} y={52} glyph="check-circle" size={12} />
    </>
  );
}

/** One high-use workflow changed first: four lanes of steps, one redrawn, the rest untouched until it is tried. */
function OneWorkflow() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          {i === 1 ? <Rect x={26} y={34 + i * 28 - 6} w={206} h={34} rx={8} className={styles.halo} /> : null}
          {[0, 1, 2].map((j) => (
            <Rect key={j} x={36 + j * 60} y={36 + i * 28} w={44} h={20} className={i === 1 ? styles.solid : styles.tile} />
          ))}
          <path className={i === 1 ? styles.line : styles.copyQuiet} d={`M80,${46 + i * 28} L96,${46 + i * 28} M140,${46 + i * 28} L156,${46 + i * 28}`} />
        </g>
      ))}
      <Hop x1={232} x2={250} y={74} />
      <Focus x={268} y={74} glyph="user" size={12} />
    </>
  );
}

/** Old and new side by side: customers move across in stages, two across, one on the way. */
function OldNew() {
  return (
    <>
      <Rect x={30} y={40} w={92} h={96} rx={8} className={styles.trailFrame} />
      <Copy x={42} y={58} w={44} quiet />
      <Copy x={42} y={70} w={60} quiet />
      <Copy x={42} y={82} w={36} quiet />
      <Rect x={198} y={34} w={92} h={108} rx={14} className={styles.halo} />
      <Rect x={204} y={40} w={80} h={96} rx={8} className={styles.frame} />
      <Copy x={216} y={58} w={40} quiet />
      <Rect x={216} y={70} w={56} h={28} className={styles.region} />
      <Copy x={216} y={112} w={44} />
      <Hop x1={122} x2={196} y={88} />
      {[146, 166, 182].map((x, i) => (
        <Glyph key={x} name="user" cx={x} cy={88} size={14} className={i === 0 ? styles.glyphQuiet : styles.glyph} />
      ))}
    </>
  );
}

/** Working software in small releases: a timeline of four releases, each screen fuller than the last. */
function SmallReleases() {
  return (
    <>
      <path className={styles.line} d="M40,122 L280,122" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle className={i === 3 ? styles.solid : styles.nodeOpen} cx={60 + i * 66} cy={122} r={i === 3 ? 5 : 4} />
          <Rect x={36 + i * 66} y={38} w={48} h={62} rx={6} className={i === 3 ? styles.frame : styles.frameQuiet} />
          {Array.from({ length: i + 1 }, (_, k) => (
            <Rect key={k} x={42 + i * 66} y={44 + k * 14} w={36} h={10} rx={3} className={i === 3 && k === 3 ? styles.region : styles.tile} />
          ))}
        </g>
      ))}
      <Focus x={258} y={136} glyph="check-circle" size={10} />
    </>
  );
}

/** Tests and release checks agreed before the build: a checklist, then a release passing the gate. */
function ReleaseChecks() {
  return (
    <>
      <Rect x={30} y={34} w={120} h={108} rx={8} className={styles.frame} />
      <Glyph name="clipboard-check" cx={48} cy={52} size={14} className={styles.glyphQuiet} />
      <Copy x={64} y={52} w={44} quiet />
      {[72, 90, 108, 126].map((y) => (
        <g key={y}>
          <Glyph name="check-circle" cx={48} cy={y} size={12} className={styles.glyph} />
          <Copy x={62} y={y} w={64} quiet />
        </g>
      ))}
      <Hop x1={150} x2={186} y={90} />
      <path className={styles.rule} d="M196,50 L196,130 M246,50 L246,130" />
      <Rect x={208} y={78} w={26} h={24} rx={12} className={styles.halo} />
      <Rect x={212} y={82} w={18} h={16} rx={8} className={styles.solid} />
      <Focus x={270} y={90} glyph="check-circle" size={10} />
    </>
  );
}

/** Support through each release: the studio beside three releases, then a clean handover or staying on. */
function ReleaseSupport() {
  return (
    <>
      <path className={styles.line} d="M40,96 L170,96" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle className={styles.nodeOpen} cx={60 + i * 50} cy={96} r="4" />
          <Glyph name="user" cx={60 + i * 50} cy={62} size={16} className={styles.glyph} />
        </g>
      ))}
      <Rect x={158} y={84} w={24} h={24} rx={12} className={styles.halo} />
      <path className={styles.line} d="M170,96 L196,96 L196,64 L226,64 M196,96 L196,126 L226,126" />
      {[0, 1, 2].map((i) => (
        <Rect key={i} x={232 + i * 6} y={46 + 12 - i * 6} w={44} h={30} rx={6} className={i === 2 ? styles.frame : styles.frameQuiet} />
      ))}
      <Glyph name="layers" cx={256} cy={72} size={14} className={styles.glyph} />
      <Rect x={226} y={108} w={60} h={36} rx={8} className={styles.trailFrame} />
      <Copy x={238} y={126} w={36} quiet />
    </>
  );
}

export const L1_OUTCOMES: Record<L1OutcomeScene, () => ReactNode> = {
  'outcome-ai-steps': AiSteps,
  'outcome-ai-checks': AiChecks,
  'outcome-tried-in-code': TriedInCode,
  'outcome-hard-component': HardComponent,
  'outcome-code-in-repo': CodeInRepo,
  'outcome-ds-tokens': DsTokens,
  'outcome-ds-docs': DsDocs,
  'outcome-ds-first-release': DsFirstRelease,
  'outcome-ds-route-for-change': DsRouteForChange,
  'outcome-five-choices': FiveChoices,
  'outcome-build-parts': BuildParts,
  'outcome-break-points': BreakPoints,
  'outcome-part-calls': PartCalls,
  'outcome-habits-record': HabitsRecord,
  'outcome-one-workflow': OneWorkflow,
  'outcome-old-new': OldNew,
  'outcome-small-releases': SmallReleases,
  'outcome-release-checks': ReleaseChecks,
  'outcome-release-support': ReleaseSupport,
};
