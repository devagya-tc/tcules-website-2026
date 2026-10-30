import type { ReactNode } from 'react';

import type { L1BandScene } from '@/lib/sketches';

import { Copy, Cursor, Hop, Lens, Rect, Switch } from './offer';
import { Focus, Glyph, Hatched } from './scenes';
import styles from './Sketch.module.css';

/**
 * The BAND scenes of the six service lines (round 5, 30 Oct 2026): a band's own items drawn from
 * their words. The four autonomy levels share one screen so the level is the only thing that changes;
 * the scenarios draw their own story left to right; the five places a status label lives share one
 * pill; and the hiring option.
 */

/** The screen every autonomy level is drawn on: a frame and its header line. */
function AutonomyScreen({ children }: { children: ReactNode }) {
  return (
    <>
      <Rect x={70} y={34} w={180} h={112} rx={8} className={styles.frame} />
      <Copy x={86} y={50} w={56} quiet />
      {children}
    </>
  );
}

/** Finds: the AI only brings results to the screen, each with its source; a lens on the first. */
function AutonomyFinds() {
  return (
    <AutonomyScreen>
      {[66, 92, 118].map((y, i) => (
        <g key={y}>
          <Rect x={86} y={y} w={148} h={20} className={styles.tile} />
          <Copy x={96} y={y + 10} w={[72, 56, 64][i] ?? 56} quiet={i > 0} />
          <Rect x={202} y={y + 4} w={24} h={12} rx={6} className={styles.tile} />
        </g>
      ))}
      <Lens x={214} y={74} r={9} />
    </AutonomyScreen>
  );
}

/** Suggests: the person's accepted lines, and a dashed suggestion waiting for them to take it. */
function AutonomySuggests() {
  return (
    <AutonomyScreen>
      <Copy x={86} y={70} w={120} />
      <Copy x={86} y={82} w={96} />
      <Rect x={86} y={96} w={104} h={38} className={styles.trailFrame} />
      <Copy x={96} y={110} w={72} quiet />
      <Copy x={96} y={122} w={52} quiet />
      <Rect x={196} y={104} w={42} h={22} rx={11} className={styles.halo} />
      <Rect x={200} y={108} w={34} h={14} rx={7} className={styles.tile} />
      <Cursor x={222} y={112} />
    </AutonomyScreen>
  );
}

/** Drafts: the AI writes into an editable draft; nothing is committed until the person presses the one button. */
function AutonomyDrafts() {
  return (
    <AutonomyScreen>
      <Rect x={86} y={64} w={148} h={46} className={styles.region} />
      <path className={styles.regionCopy} d="M96,80 L186,80 M96,92 L160,92" />
      <path className={styles.line} d="M164,86 L164,98" />
      <Rect x={186} y={116} w={52} h={24} rx={12} className={styles.halo} />
      <Rect x={190} y={120} w={44} h={16} rx={8} className={styles.solid} />
      <Copy x={86} y={128} w={64} quiet />
    </AutonomyScreen>
  );
}

/** Acts: the AI works through a plan on its own, the person can stop it, and every step leaves a log. */
function AutonomyActs() {
  return (
    <AutonomyScreen>
      <Rect x={206} y={42} w={36} h={16} rx={8} className={styles.tile} />
      <Rect x={218} y={46} w={8} h={8} rx={1} className={styles.solid} />
      <Rect x={216} y={64} w={28} h={74} rx={6} className={styles.frameQuiet} />
      {[74, 88, 102, 116].map((y) => (
        <path key={y} className={styles.copyQuiet} d={`M222,${y} L238,${y}`} />
      ))}
      {[70, 90, 110, 130].map((y, i) => (
        <g key={y}>
          {i === 2 ? <Rect x={80} y={y - 11} w={126} h={22} rx={4} className={styles.halo} /> : null}
          {i === 2 ? (
            <Focus x={100} y={y} glyph="bolt-circle" size={12} />
          ) : (
            <Glyph name="check-circle" cx={96} cy={y} size={12} className={i < 2 ? styles.glyph : styles.glyphQuiet} />
          )}
          <Copy x={118} y={y} w={[64, 48, 56, 40][i] ?? 48} quiet={i !== 2} />
        </g>
      ))}
    </AutonomyScreen>
  );
}

/** An agent chases supplier quotes overnight; price waits for the buyer; the morning view keeps the words and the figures apart. */
function ScenarioOvernightAgent() {
  return (
    <>
      <Glyph name="cpu" cx={40} cy={90} size={18} className={styles.glyph} />
      <Glyph name="clock-circle" cx={40} cy={46} size={14} className={styles.glyphQuiet} />
      {[54, 82, 110].map((y, i) => (
        <g key={y}>
          <Hop x1={52} x2={80} y={y + 8 + (i === 1 ? 0 : 0)} />
          <Rect x={80} y={y} w={40} h={16} className={i === 1 ? styles.region : styles.tile} />
          <Glyph name={i === 1 ? 'wallet' : 'chat-round-dots'} cx={92} cy={y + 8} size={10} className={i === 1 ? styles.glyph : styles.glyphQuiet} />
        </g>
      ))}
      <Rect x={74} y={76} w={52} h={28} rx={8} className={styles.halo} />
      <Rect x={150} y={36} w={140} h={92} rx={8} className={styles.frame} />
      <path className={styles.rule} d="M220,36 L220,128" />
      {[52, 66, 80, 94].map((y, i) => (
        <Copy key={y} x={162} y={y} w={[44, 36, 48, 28][i] ?? 36} quiet />
      ))}
      {[52, 72, 92].map((y, i) => (
        <Rect key={y} x={232} y={y} w={[40, 28, 34][i] ?? 30} h={8} rx={2} className={styles.solid} />
      ))}
      <Focus x={220} y={142} glyph="user" size={10} />
    </>
  );
}

/** Drag work between weeks and see who is overloaded as you drag: a tile lifted into a week that overfills. */
function ScenarioDragOverload() {
  return (
    <>
      <Rect x={30} y={34} w={260} h={104} rx={8} className={styles.frame} />
      {[0, 1, 2].map((c) => (
        <Rect key={c} x={42 + c * 84} y={44} w={72} h={14} rx={3} className={styles.frameQuiet} />
      ))}
      {[0, 2].map((c) => (
        <g key={c}>
          <Rect x={42 + c * 84} y={66} w={72} h={16} rx={3} className={styles.tile} />
          <Rect x={42 + c * 84} y={88} w={72} h={16} rx={3} className={styles.tile} />
        </g>
      ))}
      <Rect x={42 + 84} y={66} w={72} h={16} rx={3} className={styles.tile} />
      <Rect x={134} y={88} w={72} h={16} rx={3} className={styles.halo} />
      <Rect x={140} y={90} w={60} h={12} rx={3} className={styles.region} />
      <Cursor x={178} y={94} />
      <Hop x1={112} x2={134} y={96} />
      <Rect x={126} y={116} w={72} h={6} rx={3} className={styles.tile} />
      <Rect x={178} y={116} w={20} h={6} rx={3} className={styles.solid} />
      <Focus x={228} y={120} glyph="danger-triangle" size={10} />
      <Rect x={42} y={116} w={14} h={14} rx={3} className={styles.tile} />
    </>
  );
}

/** A practice sends a pet owner an estimate to approve on their phone; deposits, plans, claims and reminders wait. */
function ScenarioVetEstimate() {
  return (
    <>
      <Rect x={30} y={36} w={120} h={92} rx={8} className={styles.frame} />
      <Copy x={44} y={54} w={40} quiet />
      <Copy x={44} y={70} w={72} />
      <Copy x={44} y={82} w={56} />
      <Copy x={44} y={94} w={64} />
      <Glyph name="database" cx={40} cy={142} size={14} className={styles.glyphQuiet} />
      <path className={styles.line} d="M52,142 L90,142 L90,128" />
      <Hop x1={150} x2={176} y={82} />
      <Rect x={176} y={30} w={56} h={100} rx={10} className={styles.frame} />
      <Rect x={184} y={44} w={40} h={34} className={styles.tile} />
      <Copy x={190} y={56} w={28} />
      <Rect x={184} y={88} w={40} h={14} rx={7} className={styles.halo} />
      <Rect x={186} y={89} w={36} h={12} rx={6} className={styles.solid} />
      <Rect x={184} y={108} w={40} h={14} rx={7} className={styles.tile} />
      {[40, 70, 100].map((y) => (
        <Hatched key={y} x={254} y={y} w={32} h={22} />
      ))}
    </>
  );
}

/** Customers book their own visits: one slot, one customer; the whole thing shipped behind a switch. */
function ScenarioSelfBooking() {
  return (
    <>
      <Glyph name="calendar" cx={44} cy={44} size={14} className={styles.glyphQuiet} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <Rect key={`${r}${c}`} x={36 + c * 26} y={58 + r * 24} w={20} h={16} rx={3} className={r === 1 && c === 1 ? styles.solid : styles.tile} />
        )),
      )}
      <Glyph name="user" cx={36} cy={140} size={14} className={styles.glyph} />
      <Glyph name="close-circle" cx={66} cy={104} size={10} className={styles.glyphQuiet} />
      <path className={styles.line} d="M44,138 L66,138 L66,112" />
      <Rect x={140} y={36} w={150} h={92} rx={8} className={styles.frame} />
      <Switch x={254} y={44} on />
      <Copy x={154} y={52} w={44} quiet />
      <Rect x={150} y={66} w={130} h={22} rx={4} className={styles.halo} />
      <Rect x={154} y={70} w={122} h={14} rx={3} className={styles.tile} />
      <Copy x={164} y={77} w={52} />
      <Copy x={154} y={104} w={80} quiet />
      <Copy x={154} y={116} w={60} quiet />
    </>
  );
}

/** The one "partly complete" pill every status drawing shares: a half-filled mark, then its label. */
function StatusPill({ x, y, halo = false }: { x: number; y: number; halo?: boolean }) {
  return (
    <>
      {halo ? <Rect x={x - 6} y={y - 6} w={76} h={32} rx={16} className={styles.halo} /> : null}
      <Rect x={x} y={y} w={64} h={20} rx={10} className={styles.tile} />
      <circle className={styles.tile} cx={x + 14} cy={y + 10} r="5" />
      <path className={styles.solid} d={`M${x + 14},${y + 5} A5,5 0 0 1 ${x + 14},${y + 15} Z`} />
      <Copy x={x + 26} y={y + 10} w={28} quiet />
    </>
  );
}

/** Meaning: what the status says is done, and what still needs action. */
function StatusMeaning() {
  return (
    <>
      <StatusPill x={128} y={40} halo />
      <path className={styles.line} d="M160,66 L160,84" />
      <path className={styles.rule} d="M160,84 L160,132" />
      <Glyph name="check-circle" cx={110} cy={100} size={18} className={styles.glyph} />
      <Glyph name="clock-circle" cx={210} cy={100} size={18} className={styles.glyphQuiet} />
      <path className={styles.line} d="M160,84 L110,84 L110,90 M160,84 L210,84 L210,90" />
      <Copy x={80} y={126} w={60} />
      <Copy x={182} y={126} w={56} quiet />
    </>
  );
}

/** Design: three ways to say it alone, then text, icon and colour together as the one pill. */
function StatusDesign() {
  return (
    <>
      <Rect x={44} y={42} w={64} h={20} rx={10} className={styles.tile} />
      <Copy x={58} y={52} w={36} quiet />
      <Rect x={44} y={80} w={64} h={20} rx={10} className={styles.tile} />
      <circle className={styles.tile} cx={58} cy={90} r="5" />
      <Copy x={70} y={90} w={28} quiet />
      <Rect x={44} y={118} w={64} h={20} rx={10} className={styles.region} />
      <path className={styles.line} d="M124,52 L148,52 L148,128 L124,128 M124,90 L148,90 M148,90 L176,90" />
      <StatusPill x={190} y={80} halo />
    </>
  );
}

/** Figma: a component set of the pill's variants, the first the one in use. */
function StatusFigma() {
  return (
    <>
      <Rect x={40} y={36} w={240} h={104} rx={8} className={styles.trailFrame} />
      <StatusPill x={56} y={50} halo />
      <Rect x={56} y={92} w={84} h={22} rx={11} className={styles.tile} />
      <circle className={styles.tile} cx={70} cy={103} r="5" />
      <Copy x={82} y={98} w={40} quiet />
      <Copy x={82} y={108} w={28} quiet />
      <Rect x={168} y={50} w={96} h={22} rx={11} className={styles.tile} />
      <circle className={styles.tile} cx={182} cy={61} r="5" />
      <Copy x={194} y={61} w={32} quiet />
      <Rect x={232} y={54} w={24} h={14} rx={7} className={styles.region} />
      <Rect x={168} y={92} w={96} h={22} rx={11} className={styles.tile} />
      <Copy x={184} y={103} w={64} quiet />
    </>
  );
}

/** Code: the lines that set the pill, the pill they draw, and the combination the product never meant, unbuilt. */
function StatusCode() {
  return (
    <>
      <Rect x={30} y={36} w={130} h={92} rx={8} className={styles.frame} />
      <Glyph name="code" cx={46} cy={52} size={12} className={styles.glyphQuiet} />
      <Copy x={46} y={70} w={68} quiet />
      <Rect x={40} y={80} w={112} h={14} rx={3} className={styles.region} />
      <path className={styles.regionCopy} d="M54,87 L126,87" />
      <Copy x={46} y={106} w={56} quiet />
      <Hop x1={160} x2={196} y={90} />
      <StatusPill x={206} y={40} halo />
      <Hatched x={206} y={104} w={64} h={20} />
    </>
  );
}

/** Guidance: one example with the pill, the right use, and one without it, to avoid. */
function StatusGuidance() {
  return (
    <>
      <Rect x={60} y={30} w={200} h={120} rx={8} className={styles.frame} />
      <Copy x={78} y={48} w={56} quiet />
      <Glyph name="check-circle" cx={86} cy={80} size={16} className={styles.glyph} />
      <Rect x={106} y={70} w={64} h={20} rx={10} className={styles.tile} />
      <circle className={styles.tile} cx={120} cy={80} r="5" />
      <path className={styles.solid} d="M120,75 A5,5 0 0 1 120,85 Z" />
      <Copy x={184} y={80} w={56} quiet />
      <Glyph name="close-circle" cx={86} cy={116} size={16} className={styles.glyphQuiet} />
      <Rect x={106} y={106} w={64} h={20} rx={10} className={styles.trailFrame} />
      <Copy x={184} y={116} w={40} quiet />
    </>
  );
}

/** Hiring your own team: people who belong to your company from day one, and the time it takes to find them. */
function OptionOwnTeam() {
  return (
    <>
      <Rect x={100} y={34} w={190} h={104} rx={8} className={styles.frame} />
      <Glyph name="flag" cx={120} cy={52} size={14} className={styles.glyph} />
      <Copy x={138} y={52} w={44} quiet />
      {[0, 1, 2].map((i) => (
        <Glyph key={i} name="user" cx={134 + i * 44} cy={102} size={22} className={styles.glyph} />
      ))}
      <Glyph name="user" cx={44} cy={102} size={22} className={styles.glyphQuiet} />
      <Hop x1={62} x2={100} y={102} />
      <Focus x={50} y={56} glyph="calendar" size={10} />
    </>
  );
}

export const L1_BANDS: Record<L1BandScene, () => ReactNode> = {
  'autonomy-finds': AutonomyFinds,
  'autonomy-suggests': AutonomySuggests,
  'autonomy-drafts': AutonomyDrafts,
  'autonomy-acts': AutonomyActs,
  'scenario-overnight-agent': ScenarioOvernightAgent,
  'scenario-drag-overload': ScenarioDragOverload,
  'scenario-vet-estimate': ScenarioVetEstimate,
  'scenario-self-booking': ScenarioSelfBooking,
  'status-meaning': StatusMeaning,
  'status-design': StatusDesign,
  'status-figma': StatusFigma,
  'status-code': StatusCode,
  'status-guidance': StatusGuidance,
  'option-own-team': OptionOwnTeam,
};
