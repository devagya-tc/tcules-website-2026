import type { ReactNode } from 'react';

import type { L1OutcomeScene } from '@/lib/sketches';

import { Copy, Cursor, Hop, Lens, Rect, Switch } from './offer';
import { Chip, Focus, Glyph, Hatched } from './scenes';
import styles from './Sketch.module.css';

/**
 * The OUTCOME scenes of the six service lines (round 5, 30 Oct 2026): "What you get", each item drawn
 * from its own words, in the grammar the product-design page's outcomes keep.
 */

/** What the AI may do at each step: four steps along one route, each with its own switch, data and permissions at the end. */
function AiSteps() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => {
        const x = 30 + i * 70;
        return (
          <g key={x}>
            <Rect x={x} y={40} w={50} h={100} rx={8} className={styles.frame} />
            <Glyph
              name={(['eye', 'chat-round-dots', 'ruler-pen', 'bolt-circle'] as const)[i] ?? 'eye'}
              cx={x + 25}
              cy={70}
              size={18}
              className={styles.glyphQuiet}
            />
            {i === 2 ? <Rect x={x + 7} y={98} w={36} h={24} rx={12} className={styles.halo} /> : null}
            <Switch x={x + 13} y={104} on={i < 3} />
          </g>
        );
      })}
      <Hop x1={80} x2={100} y={70} />
      <Hop x1={150} x2={170} y={70} />
      <Hop x1={220} x2={240} y={70} />
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
      <Rect x={112} y={72} w={24} h={24} rx={4} className={styles.tile} />
      <Glyph name="document-text" cx={124} cy={84} size={16} className={styles.glyphQuiet} />
      <Rect x={46} y={104} w={56} h={24} rx={12} className={styles.tile} />
      <Glyph name="undo-left" cx={62} cy={116} size={14} className={styles.glyph} />
      <Copy x={74} y={116} w={16} quiet />
      <Rect x={110} y={104} w={58} h={24} rx={12} className={styles.tile} />
      <Copy x={122} y={116} w={34} quiet />
      <Hop x1={200} x2={230} y={90} />
      <Rect x={230} y={58} w={60} h={64} rx={8} className={styles.frame} />
      <Focus x={260} y={90} glyph="user" size={14} />
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
      <Chip x={104} y={46} glyph="database" />
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
      <Rect x={30} y={30} w={260} h={120} rx={8} className={styles.frame} />
      <Copy x={46} y={46} w={60} quiet />
      {[56, 74, 110, 128].map((y) => (
        <Rect key={y} x={46} y={y} w={150} h={14} rx={3} className={styles.tile} />
      ))}
      <Rect x={46} y={92} w={150} h={14} rx={3} className={styles.trailFrame} />
      <Rect x={182} y={84} w={84} h={22} className={styles.halo} />
      <Rect x={188} y={88} w={72} h={14} rx={3} className={styles.region} />
      <Cursor x={240} y={94} />
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
      <Hop x1={130} x2={182} y={90} />
      <Rect x={190} y={46} w={92} h={76} rx={6} className={styles.frameQuiet} />
      <Rect x={186} y={50} w={92} h={76} rx={6} className={styles.frameQuiet} />
      <Rect x={182} y={54} w={92} h={76} rx={6} className={styles.frame} />
      <Glyph name="layers" cx={200} cy={72} size={16} className={styles.glyph} />
      <Copy x={196} y={94} w={30} quiet />
      <Focus x={250} y={108} glyph="check-circle" size={12} />
    </>
  );
}

/** Foundations named by meaning: three swatches by their names, then two screens that use the same blue. */
function DsTokens() {
  return (
    <>
      <Rect x={30} y={34} w={90} h={112} rx={8} className={styles.frame} />
      <Rect x={36} y={108} w={36} h={30} rx={6} className={styles.halo} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Rect x={42} y={46 + i * 34} w={24} h={18} className={[styles.soft, styles.region, styles.solid][i]} />
          <Copy x={76} y={55 + i * 34} w={[30, 36, 24][i] ?? 30} quiet />
        </g>
      ))}
      <Hop x1={120} x2={160} y={90} />
      <Rect x={160} y={36} w={60} h={96} rx={8} className={styles.frameQuiet} />
      <Rect x={170} y={48} w={40} h={22} className={styles.region} />
      <Copy x={170} y={88} w={32} quiet />
      <Rect x={170} y={100} w={40} h={16} rx={8} className={styles.region} />
      <Rect x={230} y={36} w={60} h={96} rx={8} className={styles.frameQuiet} />
      <Rect x={240} y={48} w={40} h={22} className={styles.region} />
      <Copy x={240} y={88} w={32} quiet />
      <Rect x={240} y={100} w={40} h={16} rx={8} className={styles.region} />
    </>
  );
}

/** Documentation: one component's states and when it belongs on a screen, and when it does not. */
function DsDocs() {
  return (
    <>
      <Rect x={30} y={30} w={260} h={120} rx={8} className={styles.frame} />
      <Rect x={46} y={44} w={56} h={18} rx={9} className={styles.tile} />
      {[0, 1, 2].map((i) => (
        <Rect key={i} x={46 + i * 44} y={74} w={36} h={18} rx={9} className={[styles.tile, styles.region, styles.solid][i]} />
      ))}
      <Copy x={46} y={110} w={140} quiet />
      <Copy x={46} y={122} w={104} quiet />
      <Rect x={214} y={44} w={60} h={40} rx={4} className={styles.tile} />
      <Glyph name="check-circle" cx={244} cy={64} size={16} className={styles.glyph} />
      <Rect x={214} y={96} w={60} h={40} rx={4} className={styles.tile} />
      <Glyph name="close-circle" cx={244} cy={116} size={16} className={styles.glyphQuiet} />
    </>
  );
}

/** A first release tried on a real part of your product: components from the library, put in context, then signed off. */
function DsFirstRelease() {
  return (
    <>
      <Rect x={30} y={54} w={72} h={72} rx={8} className={styles.frameQuiet} />
      {[0, 1].map((r) =>
        [0, 1].map((c) => (
          <Rect key={`${r}${c}`} x={40 + c * 28} y={66 + r * 28} w={22} h={20} className={styles.tile} />
        )),
      )}
      <Hop x1={102} x2={140} y={90} />
      <Rect x={140} y={30} w={150} h={120} rx={8} className={styles.frame} />
      <Copy x={154} y={50} w={48} quiet />
      <Rect x={154} y={62} w={46} h={22} className={styles.region} />
      <Rect x={212} y={62} w={64} h={22} className={styles.tile} />
      <Rect x={154} y={96} w={46} h={16} className={styles.region} />
      <Copy x={212} y={104} w={28} quiet />
      <Focus x={262} y={122} glyph="check-circle" size={12} />
    </>
  );
}

/** A route for change: teams contribute into the library, whose owner releases it, and use is watched. */
function DsRouteForChange() {
  return (
    <>
      {[44, 96].map((y) => (
        <g key={y}>
          <Rect x={30} y={y} w={40} h={40} rx={8} className={styles.frameQuiet} />
          <Glyph name="users-group-rounded" cx={50} cy={y + 20} size={16} className={styles.glyphQuiet} />
        </g>
      ))}
      <Hop x1={70} x2={108} y={64} />
      <Hop x1={70} x2={108} y={116} />
      <Rect x={108} y={38} w={90} h={104} rx={8} className={styles.frame} />
      <Glyph name="user" cx={126} cy={56} size={16} className={styles.glyph} />
      {[0, 1].map((r) =>
        [0, 1].map((c) => (
          <Rect key={`${r}${c}`} x={122 + c * 36} y={72 + r * 30} w={28} h={22} className={styles.tile} />
        )),
      )}
      <Hop x1={198} x2={222} y={90} />
      <Rect x={222} y={40} w={68} h={100} rx={8} className={styles.frame} />
      <Rect x={232} y={50} w={48} h={16} rx={8} className={styles.tile} />
      <Rect x={232} y={72} w={48} h={16} rx={8} className={styles.tile} />
      <Rect x={226} y={92} w={60} h={28} rx={14} className={styles.halo} />
      <Rect x={232} y={98} w={48} h={16} rx={8} className={styles.solid} />
      <Glyph name="graph-up" cx={256} cy={130} size={14} className={styles.glyphQuiet} />
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
      <g transform="translate(-31,0)">
      <Rect x={92} y={34} w={198} h={108} rx={8} className={styles.frame} />
      {at.map(([x, y], i) => (
        <g key={i}>
          {i === 3 ? <Rect x={x - 6} y={y - 6} w={52} h={50} rx={8} className={styles.halo} /> : null}
          <Rect x={x} y={y} w={40} h={38} className={styles.tile} />
          <Glyph name={g[i] ?? 'user'} cx={x + 10} cy={y + 10} size={10} className={styles.glyphQuiet} />
          <Copy x={x + 8} y={y + 26} w={24} quiet />
        </g>
      ))}
      </g>
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
          <Rect x={40} y={32 + i * 24} w={96} h={20} className={styles.tile} />
          <Glyph name={n} cx={56} cy={42 + i * 24} size={14} className={styles.glyph} />
          <Copy x={72} y={42 + i * 24} w={48} quiet />
          <path className={styles.line} d={`M88,${52 + i * 24} L88,${56 + i * 24}`} />
        </g>
      ))}
      <Hatched x={40} y={104} w={96} h={20} />
      <Hop x1={136} x2={176} y={90} />
      <Rect x={176} y={44} w={114} h={92} rx={8} className={styles.frame} />
      <Copy x={190} y={62} w={44} quiet />
      <Rect x={190} y={74} w={54} h={24} className={styles.tile} />
      <Copy x={190} y={112} w={44} quiet />
      <Focus x={266} y={112} glyph="check-circle" size={12} />
    </>
  );
}

/** Where new products break: sign-in, other people's data, payments and timeouts, each tried before launch. */
function BreakPoints() {
  const g = ['key', 'users-group-rounded', 'wallet', 'clock-circle'] as const;
  return (
    <>
      <Rect x={30} y={34} w={186} h={108} rx={8} className={styles.frame} />
      {g.map((n, i) => (
        <g key={n}>
          <Rect x={44 + (i % 2) * 90} y={48 + Math.floor(i / 2) * 44} w={76} h={32} className={styles.tile} />
          <Glyph name={n} cx={62 + (i % 2) * 90} cy={64 + Math.floor(i / 2) * 44} size={16} className={styles.glyph} />
          {i === 0 ? null : <Copy x={78 + (i % 2) * 90} y={64 + Math.floor(i / 2) * 44} w={28} quiet />}
        </g>
      ))}
      <Lens x={62} y={64} r={14} />
      <Hop x1={216} x2={244} y={90} />
      <Rect x={244} y={58} w={46} h={64} rx={8} className={styles.frame} />
      <Focus x={267} y={90} glyph="shield-check" size={12} />
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
      <g transform="translate(-35,0)">
      <Rect x={100} y={30} w={190} h={120} rx={8} className={styles.frame} />
      <Glyph name="notebook" cx={120} cy={48} size={14} className={styles.glyphQuiet} />
      <Copy x={136} y={48} w={44} quiet />
      <Rect x={116} y={64} w={16} h={16} rx={3} className={styles.tile} />
      <Copy x={144} y={72} w={60} quiet />
      <Rect x={116} y={88} w={44} h={16} rx={8} className={styles.tile} />
      <Copy x={170} y={96} w={52} quiet />
      {[0, 1, 2].map((i) => (
        <Rect key={i} x={118 + i * 10} y={132 - [8, 16, 12][i]!} w={6} h={[8, 16, 12][i]!} rx={1} className={styles.region} />
      ))}
      <Glyph name="calendar" cx={170} cy={124} size={14} className={styles.glyphQuiet} />
      <Focus x={266} y={56} glyph="check-circle" size={12} />
      </g>
    </>
  );
}

/** One high-use workflow changed first: four lanes of steps, one redrawn, the rest untouched until it is tried. */
function OneWorkflow() {
  return (
    <>
      <Rect x={30} y={30} w={260} h={120} rx={8} className={styles.frame} />
      <Rect x={46} y={64} w={216} h={28} rx={8} className={styles.halo} />
      {[44, 70, 96, 122].map((y, i) => (
        <g key={y}>
          {[54, 128, 202].map((x) => (
            <Rect key={x} x={x} y={y} w={52} h={16} className={i === 1 ? styles.solid : styles.tile} />
          ))}
          <path
            className={i === 1 ? styles.line : styles.copyQuiet}
            d={`M106,${y + 8} L128,${y + 8} M180,${y + 8} L202,${y + 8}`}
          />
        </g>
      ))}
    </>
  );
}

/** Old and new side by side: customers move across in stages, two across, one on the way. */
function OldNew() {
  return (
    <>
      <Rect x={30} y={40} w={100} h={100} rx={8} className={styles.frameQuiet} />
      <Copy x={42} y={58} w={44} quiet />
      <Copy x={42} y={70} w={60} quiet />
      <Copy x={42} y={82} w={36} quiet />
      <Glyph name="user" cx={54} cy={116} size={16} className={styles.glyphQuiet} />
      <Glyph name="user" cx={78} cy={116} size={16} className={styles.glyphQuiet} />
      <Hop x1={130} x2={190} y={90} />
      <Rect x={190} y={40} w={100} h={100} rx={8} className={styles.frame} />
      <Copy x={202} y={58} w={40} quiet />
      <Rect x={202} y={68} w={56} h={24} className={styles.region} />
      <Copy x={202} y={112} w={28} quiet />
      <Focus x={262} y={116} glyph="user" size={12} />
    </>
  );
}

/** Working software in small releases: a timeline of four releases, each screen fuller than the last. */
function SmallReleases() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => {
        const x = 30 + i * 70;
        return (
          <g key={x}>
            <Rect x={x} y={40} w={50} h={100} rx={8} className={i === 3 ? styles.frame : styles.frameQuiet} />
            {i === 3 ? <Rect x={246} y={98} w={38} h={18} rx={6} className={styles.halo} /> : null}
            {Array.from({ length: i + 1 }, (_, k) => (
              <Rect
                key={k}
                x={x + 10}
                y={54 + k * 16}
                w={30}
                h={10}
                rx={3}
                className={i === 3 && k === 3 ? styles.solid : styles.tile}
              />
            ))}
          </g>
        );
      })}
      <Hop x1={80} x2={100} y={90} />
      <Hop x1={150} x2={170} y={90} />
      <Hop x1={220} x2={240} y={90} />
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
      <Hop x1={150} x2={190} y={90} />
      <Rect x={190} y={50} w={100} h={80} rx={8} className={styles.frame} />
      <Copy x={204} y={68} w={44} quiet />
      <Copy x={204} y={80} w={60} />
      <Focus x={262} y={108} glyph="check-circle" size={10} />
    </>
  );
}

/** Support through each release: the studio beside three releases, then a clean handover or staying on. */
function ReleaseSupport() {
  return (
    <>
      {[30, 130, 230].map((x, i) => (
        <g key={x}>
          <Rect x={x} y={50} w={60} h={80} rx={8} className={i === 2 ? styles.frame : styles.frameQuiet} />
          <Copy x={x + 12} y={66} w={36} quiet />
          <Copy x={x + 12} y={76} w={24} quiet />
          {i < 2 ? (
            <Glyph name="user" cx={x + 30} cy={108} size={16} className={styles.glyphQuiet} />
          ) : (
            <Focus x={260} y={108} glyph="user" size={12} />
          )}
        </g>
      ))}
      <Hop x1={90} x2={130} y={90} />
      <Hop x1={190} x2={230} y={90} />
    </>
  );
}

/** Every workflow designed before it is coded: the design settled and its action lit, the code not yet built. */
function DesignedFirst() {
  return (
    <>
      <Rect x={30} y={30} w={110} h={120} rx={8} className={styles.frame} />
      <Copy x={44} y={48} w={40} quiet />
      {[58, 80].map((y) => (
        <Rect key={y} x={44} y={y} w={82} h={14} rx={3} className={styles.tile} />
      ))}
      <Rect x={38} y={106} w={60} h={28} rx={14} className={styles.halo} />
      <Rect x={44} y={112} w={48} h={16} rx={8} className={styles.solid} />
      <Hop x1={140} x2={180} y={90} />
      <Rect x={180} y={30} w={110} h={120} rx={8} className={styles.trailFrame} />
      <Chip x={194} y={44} glyph="code" />
      <Hatched x={194} y={70} w={82} h={56} />
    </>
  );
}

/** Launch support: the launched product with its lit flag, then the later releases still to come. */
function LaunchSupport() {
  return (
    <>
      <Rect x={30} y={40} w={110} h={100} rx={8} className={styles.frame} />
      <Chip x={42} y={52} glyph="user" />
      <Copy x={64} y={60} w={48} />
      <Copy x={42} y={80} w={60} quiet />
      <Rect x={42} y={96} w={36} h={12} rx={6} className={styles.tile} />
      <Focus x={114} y={114} glyph="flag" size={12} />
      <Hop x1={140} x2={170} y={90} />
      <Hatched x={170} y={54} w={50} h={72} />
      <Hop x1={220} x2={240} y={90} />
      <Hatched x={240} y={54} w={50} h={72} />
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
  'outcome-designed-first': DesignedFirst,
  'outcome-launch-support': LaunchSupport,
};
