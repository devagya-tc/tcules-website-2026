import type { ReactNode } from 'react';

import type { L1SpecialistScene } from '@/lib/sketches';

import { ArrowUp, Copy, Hop, Lens, Rect } from './offer';
import { Focus, Glyph, GrowIn, Hatched, Move } from './scenes';
import styles from './Sketch.module.css';

/**
 * The SPECIALIST scenes of the six service lines (round 5, 30 Oct 2026): each service tile's drawing,
 * from that service's own name and table line, drawn bare on the bento (inside x 30–290, y 30–150).
 * The same drawing wherever the service is named (@/lib/sketches SPECIALIST_BY_ROUTE).
 */

/** Copilots and agents: a plan of three steps in a side panel, handing its result back into the screen. */
function AiCopilots() {
  return (
    <>
      <Rect x={30} y={30} w={260} h={120} rx={8} className={styles.frame} />
      <Copy x={46} y={50} w={60} quiet />
      <Rect x={46} y={66} w={96} h={64} className={styles.tile} />
      <Copy x={58} y={84} w={56} />
      <Copy x={58} y={96} w={40} quiet />
      <Rect x={170} y={42} w={108} h={96} rx={4} className={styles.region} />
      <Glyph name="cpu" cx={190} cy={60} size={16} className={styles.glyph} />
      {[76, 94, 112].map((y) => (
        <g key={y}>
          <Rect x={182} y={y - 6} w={12} h={12} rx={3} className={styles.tile} />
          <path className={styles.regionCopy} d={`M204,${y} L${y === 112 ? 230 : 256},${y}`} />
        </g>
      ))}
      <Hop x1={170} x2={142} y={112} />
      {/* The plan completes. */}
      <GrowIn>
        <Focus x={256} y={116} glyph="check-circle" size={12} />
      </GrowIn>
    </>
  );
}

/** Search and recommendations: a question, an answer, and the sources it can be checked against. */
function AiSearch() {
  return (
    <>
      <Rect x={50} y={30} w={170} h={24} rx={12} className={styles.frame} />
      <Copy x={68} y={42} w={64} quiet />
      <Glyph name="stars" cx={204} cy={42} size={14} className={styles.glyph} />
      {/* The answer, with its sources, is found. */}
      <GrowIn>
        <Rect x={50} y={68} w={180} h={72} rx={12} className={styles.halo} />
      </GrowIn>
      <Rect x={56} y={74} w={168} h={60} rx={6} className={styles.frame} />
      <Copy x={70} y={90} w={120} />
      <Copy x={70} y={102} w={96} quiet />
      <Rect x={70} y={114} w={32} h={12} rx={6} className={styles.tile} />
      <Rect x={110} y={114} w={32} h={12} rx={6} className={styles.tile} />
      <Hop x1={224} x2={262} y={104} />
      <Glyph name="document-text" cx={276} cy={104} size={20} className={styles.glyphQuiet} />
    </>
  );
}

/** Human in the loop: a queue of items flowing to the person who reviews, a record of every override beside. */
function AiHitl() {
  return (
    <>
      {[34, 62, 90, 118].map((y, i) => (
        <g key={y}>
          <Rect x={30} y={y} w={72} h={20} className={styles.tile} />
          <Copy x={42} y={y + 10} w={[36, 28, 44, 24][i] ?? 30} quiet={i > 0} />
        </g>
      ))}
      <Hop x1={102} x2={152} y={100} />
      <circle className={styles.halo} cx="174" cy="100" r="22" />
      <Glyph name="user" cx={174} cy={100} size={22} className={styles.glyph} />
      <Rect x={214} y={34} w={76} h={104} rx={8} className={styles.frameQuiet} />
      {[50, 64, 78, 92].map((y, i) => (
        <Copy key={y} x={226} y={y} w={[44, 36, 48, 28][i] ?? 36} quiet />
      ))}
      <Glyph name="undo-left" cx={232} cy={122} size={16} className={styles.glyph} />
      {/* An override taken back: its line arrives in the record. */}
      <GrowIn>
        <Copy x={226} y={106} w={40} />
      </GrowIn>
    </>
  );
}

/** Trust, control, recovery: one line marked as the AI's, the rest the person's, and a way back. */
function AiTrust() {
  return (
    <>
      <Rect x={30} y={30} w={170} h={120} rx={8} className={styles.frame} />
      <Copy x={46} y={52} w={96} quiet />
      <Copy x={46} y={68} w={120} quiet />
      <Rect x={40} y={80} w={150} h={28} rx={4} className={styles.region} />
      <Glyph name="stars" cx={54} cy={94} size={14} className={styles.glyph} />
      <path className={styles.regionCopy} d="M70,94 L172,94" />
      <Copy x={46} y={124} w={100} quiet />
      <Hop x1={200} x2={228} y={94} />
      <Rect x={228} y={82} w={52} h={24} rx={12} className={styles.tile} />
      <Glyph name="undo-left" cx={246} cy={94} size={14} className={styles.glyph} />
      <Copy x={256} y={94} w={12} />
      {/* A way back, confirmed. */}
      <GrowIn>
        <Focus x={254} y={128} glyph="check-circle" size={12} />
      </GrowIn>
    </>
  );
}

/** Readiness: an AI feature in use, and the ranked list of fixes read off it, the first lit. */
function AiReadiness() {
  return (
    <>
      <Rect x={30} y={40} w={96} h={100} rx={8} className={styles.frame} />
      <Glyph name="cpu" cx={48} cy={58} size={14} className={styles.glyph} />
      <Copy x={64} y={58} w={44} quiet />
      <Rect x={42} y={76} w={72} h={32} className={styles.tile} />
      <Copy x={42} y={122} w={56} quiet />
      <Hop x1={126} x2={170} y={90} />
      {[78, 108].map((y, i) => (
        <g key={y}>
          <Rect x={170} y={y} w={[64, 42][i] ?? 42} h={22} className={styles.tile} />
          <path
            className={styles.copyQuiet}
            d={`M182,${y + 11} L${182 + ([40, 24][i] ?? 24)},${y + 11}`}
          />
        </g>
      ))}
      <Rect x={170} y={48} w={86} h={22} className={styles.region} />
      <path className={styles.regionCopy} d="M182,59 L238,59" />
      {/* The first fix is flagged. */}
      <GrowIn>
        <Focus x={276} y={59} glyph="flag" size={12} />
      </GrowIn>
    </>
  );
}

/** AI product engineering: the AI module plugged into your product, built by a designer and an engineer. */
function AiEngineering() {
  return (
    <>
      {/* Designer and engineer close up (gap 32 to 8). */}
      <Move x={12}>
        <Glyph name="user" cx={46} cy={44} size={16} className={styles.glyph} />
      </Move>
      <Move x={-12}>
        <Glyph name="user" cx={94} cy={44} size={16} className={styles.glyph} />
      </Move>
      <Rect x={30} y={62} w={170} h={88} rx={8} className={styles.frame} />
      <Copy x={46} y={80} w={56} quiet />
      <Rect x={46} y={92} w={64} h={40} className={styles.tile} />
      <Rect x={134} y={86} w={54} h={46} rx={8} className={styles.halo} />
      <Rect x={140} y={92} w={42} h={34} className={styles.region} />
      <Glyph name="cpu" cx={161} cy={109} size={18} className={styles.glyph} />
      <Glyph name="code-square" cx={248} cy={109} size={22} className={styles.glyphQuiet} />
      <Hop x1={236} x2={200} y={109} />
    </>
  );
}

/** Strategy: the products it must cover feed one scope, sorted into what is shared and what is one product's. */
function DsStrategy() {
  return (
    <>
      {[34, 70, 106].map((y) => (
        <g key={y}>
          <Rect x={30} y={y} w={44} h={30} className={styles.frameQuiet} />
          <Copy x={40} y={y + 15} w={24} quiet />
          <Hop x1={74} x2={116} y={y + 15} />
        </g>
      ))}
      <Rect x={116} y={34} w={132} h={102} rx={8} className={styles.frame} />
      <path className={styles.rule} d="M190,34 L190,136" />
      {[46, 72, 98].map((y, i) => (
        <Rect key={y} x={126} y={y} w={54} h={20} className={i === 0 ? styles.region : styles.tile} />
      ))}
      {[46, 72].map((y) => (
        <Rect key={y} x={200} y={y} w={38} h={20} className={styles.tile} />
      ))}
      <Focus x={268} y={56} glyph="flag" size={12} />
      {/* The owner steps up to the flag. */}
      <Move y={-8}>
        <Glyph name="user" cx={268} cy={110} size={18} className={styles.glyph} />
      </Move>
    </>
  );
}

/** Implementation: foundations, then the Figma components, then the same components in code. */
function DsImplementation() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <Rect key={i} x={34} y={52 + i * 28} w={26} h={20} className={[styles.soft, styles.region, styles.solid][i]} />
      ))}
      <Hop x1={60} x2={104} y={90} />
      <Rect x={104} y={44} w={76} h={92} rx={8} className={styles.trailFrame} />
      {[0, 1].map((r) =>
        [0, 1].map((c) => (
          <Rect key={`${r}${c}`} x={114 + c * 32} y={56 + r * 36} w={26} h={26} className={styles.tile} />
        )),
      )}
      {/* Released: the code frame lights. */}
      <GrowIn>
        <Rect x={200} y={30} w={90} h={120} rx={14} className={styles.halo} />
      </GrowIn>
      <>
        <Rect x={206} y={44} w={78} h={92} rx={8} className={styles.frame} />
        <Glyph name="code" cx={222} cy={58} size={14} className={styles.glyph} />
        {[0, 1].map((r) =>
          [0, 1].map((c) => (
            <Rect key={`${r}${c}`} x={216 + c * 32} y={72 + r * 30} w={24} h={22} className={styles.tile} />
          )),
        )}
      </>
      <Hop x1={180} x2={206} y={90} />
    </>
  );
}

/** Alignment: the same button drawn in the library and in code, released together, the next mismatch checked. */
function DsAlignment() {
  return (
    <>
      <Rect x={30} y={30} w={116} h={64} rx={8} className={styles.frameQuiet} />
      <Rect x={58} y={52} w={60} h={20} rx={10} className={styles.tile} />
      <Rect x={174} y={30} w={116} h={64} rx={8} className={styles.frame} />
      <Rect x={202} y={52} w={60} h={20} rx={10} className={styles.tile} />
      <path className={styles.rule} d="M160,34 L160,50 M160,74 L160,90" />
      <Glyph name="eye" cx={160} cy={62} size={16} className={styles.glyph} />
      <path
        className={styles.line}
        d="M88,94 L88,115 A6,6 0 0 0 94,121 L130,121 M232,94 L232,115 A6,6 0 0 1 226,121 L190,121"
      />
      <circle className={styles.node} cx="88" cy="94" r="2.5" />
      <circle className={styles.node} cx="232" cy="94" r="2.5" />
      <Rect x={130} y={110} w={60} h={22} rx={11} className={styles.solid} />
      {/* The next mismatch checked. */}
      <GrowIn>
        <Focus x={262} y={130} glyph="check-circle" size={12} />
      </GrowIn>
    </>
  );
}

/** Governance: teams contribute in, one exception stands apart, and updates are released out. */
function DsGovernance() {
  return (
    <>
      <Glyph name="users-group-rounded" cx={48} cy={66} size={20} className={styles.glyphQuiet} />
      <Glyph name="users-group-rounded" cx={48} cy={114} size={20} className={styles.glyphQuiet} />
      <Hop x1={66} x2={112} y={66} />
      <Hop x1={66} x2={112} y={114} />
      <Rect x={112} y={40} w={96} h={100} rx={8} className={styles.frame} />
      {[0, 1].map((r) =>
        [0, 1].map((c) => (
          <Rect key={`${r}${c}`} x={124 + c * 36} y={52 + r * 28} w={28} h={20} className={styles.tile} />
        )),
      )}
      <Rect x={124} y={110} w={64} h={22} className={styles.trailFrame} />
      {/* The update is released out. */}
      <GrowIn>
        <Rect x={240} y={74} w={44} h={32} rx={16} className={styles.halo} />
      </GrowIn>
      <Hop x1={208} x2={246} y={90} />
      <Rect x={246} y={80} w={32} h={20} rx={10} className={styles.solid} />
    </>
  );
}

/** Audit: the library, and a product where two parts are local copies that drifted off it. */
function DsAudit() {
  return (
    <>
      <Rect x={30} y={40} w={90} h={100} rx={8} className={styles.frame} />
      {[0, 1].map((r) =>
        [0, 1].map((c) => (
          <Rect key={`${r}${c}`} x={42 + c * 36} y={52 + r * 32} w={28} h={22} className={styles.tile} />
        )),
      )}
      <Rect x={150} y={40} w={140} h={100} rx={8} className={styles.frameQuiet} />
      <Rect x={162} y={52} w={28} h={22} className={styles.tile} />
      <Rect x={198} y={52} w={28} h={22} className={styles.tile} />
      <Rect x={164} y={92} w={32} h={26} className={styles.trailFrame} />
      <Rect x={232} y={90} w={36} h={22} className={styles.trailFrame} />
      {/* The lens finds the other drifted copy. */}
      <Move x={-70} y={4}>
        <Lens x={250} y={101} r={22} />
        <Focus x={250} y={101} glyph="danger-triangle" size={12} />
      </Move>
    </>
  );
}

/** Redesign: a cluttered screen made clean, on the same technology under both. */
function Redesign() {
  const crumbs: ReactNode[] = [];
  for (let i = 0; i < 12; i++)
    crumbs.push(
      <Rect key={i} x={42 + (i % 4) * 20} y={48 + Math.floor(i / 4) * 24} w={16} h={18} rx={3} className={styles.tile} />,
    );
  return (
    <>
      {/* The rebuilt screen lights. */}
      <GrowIn>
        <Rect x={164} y={30} w={112} h={96} rx={14} className={styles.halo} />
      </GrowIn>
      <Rect x={30} y={36} w={100} h={84} rx={8} className={styles.frameQuiet} />
      {crumbs}
      <Hop x1={130} x2={170} y={78} />
      <Rect x={170} y={36} w={100} h={84} rx={8} className={styles.frame} />
      <Copy x={184} y={54} w={40} quiet />
      <Rect x={184} y={66} w={72} h={22} className={styles.region} />
      <Rect x={184} y={98} w={40} h={12} rx={6} className={styles.solid} />
      <Glyph name="server" cx={80} cy={138} size={16} className={styles.glyphQuiet} />
      <Glyph name="server" cx={220} cy={138} size={16} className={styles.glyphQuiet} />
    </>
  );
}

/** Legacy: the old system's hidden rules mapped, lifted out and rebuilt in stages in a new one. */
function Legacy() {
  return (
    <>
      <Rect x={170} y={36} w={120} h={100} rx={8} className={styles.halo} />
      <Rect x={30} y={36} w={100} h={100} rx={8} className={styles.frameQuiet} />
      <Hatched x={40} y={46} w={80} h={80} />
      {[44, 76, 108].map((y) => (
        <g key={y}>
          <Rect x={104} y={y} w={40} h={20} className={styles.tile} />
          <Glyph name="notebook" cx={116} cy={y + 10} size={12} className={styles.glyphQuiet} />
          <Hop x1={144} x2={176} y={y + 10} />
        </g>
      ))}
      <Rect x={176} y={42} w={108} h={88} rx={6} className={styles.frame} />
      <Rect x={186} y={52} w={44} h={20} className={styles.solid} />
      <Rect x={186} y={84} w={44} h={20} className={styles.solid} />
      <Rect x={240} y={108} w={34} h={14} className={styles.trailFrame} />
      {/* The next stage built, covering its dashed slot (outset half a stroke). */}
      <GrowIn>
        <Rect x={239} y={107} w={36} h={16} className={styles.solid} />
      </GrowIn>
    </>
  );
}

/** Replatforming: the customer's screen, unchanged, carried from one platform to another. */
function Replatforming() {
  return (
    <>
      <Glyph name="server" cx={50} cy={134} size={18} className={styles.glyphQuiet} />
      <Glyph name="server" cx={270} cy={134} size={18} className={styles.glyphQuiet} />
      <Rect x={30} y={36} w={80} h={76} rx={8} className={styles.trailFrame} />
      <Copy x={42} y={54} w={32} quiet />
      <Rect x={42} y={66} w={56} h={28} className={styles.tile} />
      {/* The customer moves across. */}
      <Move x={20}>
        <Glyph name="user" cx={160} cy={60} size={18} className={styles.glyph} />
      </Move>
      <Rect x={200} y={30} w={90} h={92} rx={14} className={styles.halo} />
      <Hop x1={110} x2={206} y={90} />
      <Rect x={206} y={36} w={80} h={76} rx={8} className={styles.frame} />
      <Copy x={218} y={54} w={32} quiet />
      <Rect x={218} y={66} w={56} h={28} className={styles.tile} />
    </>
  );
}

/** Assessment: a route for each part of the product, read before any build begins. */
function ModernisationAssessment() {
  const cy = [46, 76, 106, 136];
  return (
    <>
      <Glyph name="clipboard-check" cx={44} cy={46} size={16} className={styles.glyphQuiet} />
      {cy.map((y) => (
        <g key={y}>
          <Rect x={64} y={y - 11} w={70} h={22} className={styles.tile} />
          <Copy x={76} y={y} w={30} quiet />
          <Hop x1={134} x2={216} y={y} />
        </g>
      ))}
      <Glyph name="check-circle" cx={228} cy={46} size={16} className={styles.glyph} />
      <Glyph name="ruler-pen" cx={228} cy={76} size={16} className={styles.glyph} />
      <Glyph name="refresh" cx={228} cy={106} size={16} className={styles.glyph} />
      <Hatched x={216} y={128} w={26} h={16} />
      {/* The route read part by part. */}
      <Move y={30}>
        <Focus x={268} y={76} glyph="flag" size={12} />
      </Move>
    </>
  );
}

/** SaaS app: a new workflow added to a live product, joined to the integrations it needs. */
function SaasApp() {
  return (
    <>
      <Rect x={30} y={30} w={170} h={120} rx={8} className={styles.frame} />
      <Copy x={46} y={48} w={52} quiet />
      <Rect x={46} y={60} w={138} h={22} className={styles.tile} />
      <Rect x={42} y={98} w={132} h={34} rx={10} className={styles.halo} />
      {[48, 90].map((x) => (
        <Rect key={x} x={x} y={104} w={36} h={22} className={styles.solid} />
      ))}
      <path className={styles.line} d="M84,115 L90,115" />
      {/* The new workflow's last step added in. */}
      <GrowIn>
        <path className={styles.line} d="M126,115 L132,115" />
        <Rect x={132} y={104} w={36} h={22} className={styles.solid} />
      </GrowIn>
      <Glyph name="server" cx={256} cy={71} size={20} className={styles.glyphQuiet} />
      <Glyph name="database" cx={256} cy={115} size={20} className={styles.glyphQuiet} />
      <Hop x1={246} x2={200} y={71} />
      <Hop x1={246} x2={200} y={115} />
    </>
  );
}

/** Frontend: one layout on desktop and on a phone, and the keyboard reaching both. */
function Frontend() {
  return (
    <>
      <Rect x={30} y={36} w={150} h={86} rx={8} className={styles.frame} />
      <Copy x={44} y={54} w={48} quiet />
      <Rect x={44} y={66} w={60} h={42} className={styles.tile} />
      <Rect x={114} y={66} w={54} h={42} className={styles.tile} />
      <Rect x={232} y={30} w={48} h={96} rx={10} className={styles.frame} />
      <Copy x={242} y={48} w={28} quiet />
      <Rect x={242} y={60} w={28} h={22} className={styles.tile} />
      <Rect x={242} y={90} w={28} h={22} className={styles.tile} />
      {/* The check arrives: the same layout on both. */}
      <GrowIn>
        <Focus x={204} y={78} glyph="check-circle" size={12} />
      </GrowIn>
      {/* The keyboard: a keycap with its legend, the route starting from its edge. */}
      <Rect x={44} y={130} w={16} h={16} rx={3} className={styles.tile} />
      <Copy x={48} y={138} w={8} />
      <circle className={styles.node} cx="60" cy="138" r="2.5" />
      <path className={styles.line} d="M60,138 L198,138 A6,6 0 0 0 204,132 L204,103" />
      <ArrowUp x={204} y={96} />
    </>
  );
}

/** Backend: your product calls a server holding the data, sign-in and rules, which calls out to a third party. */
function Backend() {
  return (
    <>
      <Rect x={30} y={50} w={62} h={80} rx={8} className={styles.frameQuiet} />
      <Copy x={42} y={68} w={26} quiet />
      <Rect x={42} y={80} w={38} h={32} className={styles.tile} />
      <Hop x1={92} x2={122} y={90} />
      <Rect x={122} y={34} w={96} h={112} rx={8} className={styles.frame} />
      <Rect x={128} y={71} w={84} h={38} rx={10} className={styles.halo} />
      {(['database', 'checklist', 'key'] as const).map((g, i) => (
        <g key={g}>
          <Rect x={134} y={43 + i * 34} w={72} h={26} className={i === 1 ? styles.region : styles.tile} />
          {g === 'key' ? (
            /* Sign-in turns. */
            <Move turn={-45} ox={150} oy={124}>
              <Glyph name={g} cx={150} cy={56 + i * 34} size={14} className={styles.glyph} />
            </Move>
          ) : (
            <Glyph name={g} cx={150} cy={56 + i * 34} size={14} className={styles.glyph} />
          )}
          <Copy x={166} y={56 + i * 34} w={28} quiet />
        </g>
      ))}
      <Hop x1={218} x2={252} y={90} />
      <Glyph name="widget" cx={270} cy={90} size={20} className={styles.glyphQuiet} />
    </>
  );
}

/** Maintenance: a fault replaced by a fix, a new part arriving, the same team that knows the product beside it. */
function Maintenance() {
  return (
    <>
      <Rect x={30} y={30} w={190} h={120} rx={8} className={styles.frame} />
      <Rect x={44} y={46} w={62} h={32} className={styles.tile} />
      <Glyph name="danger-triangle" cx={75} cy={62} size={16} className={styles.glyph} />
      <Hop x1={106} x2={138} y={62} />
      {/* The fix cycles in. */}
      <Move turn={-180} ox={150} oy={62}>
        <Glyph name="refresh" cx={150} cy={62} size={16} className={styles.glyph} />
      </Move>
      <Rect x={44} y={96} w={62} h={40} className={styles.tile} />
      <Rect x={124} y={90} w={86} h={52} rx={10} className={styles.halo} />
      <Rect x={130} y={96} w={74} h={40} className={styles.solid} />
      <Glyph name="users-group-rounded" cx={260} cy={90} size={22} className={styles.glyphQuiet} />
    </>
  );
}

/** Mobile: the one task people do away from a desk, a card and its one action, the desk screen behind. */
function Mobile() {
  return (
    <>
      <Rect x={30} y={36} w={130} h={84} rx={8} className={styles.frameQuiet} />
      <Copy x={44} y={54} w={40} quiet />
      <Rect x={44} y={66} w={60} h={40} className={styles.tile} />
      {/* Taken away from the desk. */}
      <Move x={16}>
        <Rect x={150} y={30} w={64} h={120} rx={12} className={styles.frame} />
        <Copy x={164} y={50} w={32} quiet />
        <Rect x={164} y={62} w={36} h={34} className={styles.tile} />
        <Rect x={158} y={106} w={48} h={30} rx={15} className={styles.halo} />
        <Rect x={164} y={112} w={36} h={18} rx={9} className={styles.solid} />
      </Move>
      <Glyph name="clock-circle" cx={252} cy={70} size={20} className={styles.glyphQuiet} />
      <Glyph name="calendar" cx={252} cy={114} size={20} className={styles.glyphQuiet} />
    </>
  );
}

/** Prototype review: one flow of an AI-built prototype, read for what holds up and what to rebuild. */
function PrototypeReview() {
  return (
    <>
      <Rect x={30} y={30} w={260} h={96} rx={8} className={styles.trailFrame} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Rect x={46 + i * 60} y={50} w={44} h={32} className={styles.tile} />
          {i < 3 ? <path className={styles.line} d={`M${90 + i * 60},66 L${106 + i * 60},66`} /> : null}
        </g>
      ))}
      {/* Reading the flow on, to the step whose foot is to rebuild. */}
      <Move x={60}>
        <Lens x={128} y={66} r={20} />
      </Move>
      <Glyph name="check-circle" cx={68} cy={106} size={14} className={styles.glyph} />
      <Glyph name="check-circle" cx={128} cy={106} size={14} className={styles.glyph} />
      <Hatched x={174} y={98} w={32} h={20} />
      <Focus x={248} y={104} glyph="stars" size={12} />
    </>
  );
}

export const L1_SPECIALISTS: Record<L1SpecialistScene, () => ReactNode> = {
  'specialist-ai-copilots': AiCopilots,
  'specialist-ai-search': AiSearch,
  'specialist-ai-hitl': AiHitl,
  'specialist-ai-trust': AiTrust,
  'specialist-ai-readiness': AiReadiness,
  'specialist-ai-engineering': AiEngineering,
  'specialist-ds-strategy': DsStrategy,
  'specialist-ds-implementation': DsImplementation,
  'specialist-ds-alignment': DsAlignment,
  'specialist-ds-governance': DsGovernance,
  'specialist-ds-audit': DsAudit,
  'specialist-redesign': Redesign,
  'specialist-legacy': Legacy,
  'specialist-replatforming': Replatforming,
  'specialist-modernisation-assessment': ModernisationAssessment,
  'specialist-saas-app': SaasApp,
  'specialist-frontend': Frontend,
  'specialist-backend': Backend,
  'specialist-maintenance': Maintenance,
  'specialist-mobile': Mobile,
  'specialist-prototype-review': PrototypeReview,
};

/** Every specialist drawing stays inside x 30–290, y 30–150, its haloes included. */
export const L1_SPECIALISTS_DRAWN: Record<
  L1SpecialistScene,
  readonly [number, number, number, number]
> = Object.fromEntries(
  Object.keys(L1_SPECIALISTS).map((name) => [name, [26, 26, 268, 128] as const]),
) as Record<L1SpecialistScene, readonly [number, number, number, number]>;
