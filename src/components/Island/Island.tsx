import type { ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './Island.module.css';

/**
 * The grounds an island may take. Paper and tint only, and the type is the mechanism:
 *
 *   paper  the bright island — on a tint band (or the ink band), the brightest object in it.
 *   tint   the warm island — on a paper band (or the ink band), one step deeper than its surround.
 *
 * Not `blue`: blue is never a ground, no band, card fill or panel (visual-direction § 4.1). Not
 * `ink`: ink is the footer's ground (§ 1.7), and an ink island in the page's last band would sit on
 * the footer's colour a band's air above it (docs/specs/Island.md § 17, Q3). Both surfaces stay
 * DECLARED in tokens/components/island.css, so the layer is self-contained if either is admitted.
 */
export type IslandSurface = 'paper' | 'tint';

export type IslandProps = {
  /**
   * The island's own ground, chosen per instance (owner, 13 Oct 2026). Required: which tone floats
   * on which is the composition's decision, and the patterns that consume Island derive it from
   * their band. Must differ from the band's surface — with no edge and no shadow, a paper island on
   * a paper band draws nothing. The primitive cannot see its band, so the patterns enforce that.
   */
  surface: IslandSurface;
  /**
   * The ground stops short of the box by --isl-overhang (64) at the top and foot, from 1024 (owner,
   * 16 Oct 2026, the enquiry close). The box keeps its full height and drops its block inset, so a
   * child as tall as the box — the close's form panel — stands proud of the island at both edges
   * while its siblings sit on the ground. Below 1024 the content stacks and the island is a plain
   * island again: ground to the box, the block inset back.
   */
  overhang?: boolean;
  /**
   * A decorative layer painted on the island's ground, under the content: a Texture, which fills
   * and is clipped by the ground, radius included. In `overhang` mode the ground is its own
   * element, so a texture placed in `children` would fill the taller box instead; this is where it
   * goes. Hidden from assistive tech in both modes. Without `overhang` its wrapper is unpositioned,
   * so a Texture in it fills the island box as before.
   */
  ground?: ReactNode;
  children: ReactNode;
};

/**
 * Island — a bounded ground inside a band, with the band's own ground around it on every side.
 *
 * TIER 1, a SURFACE like Section rather than a control: it paints one ground and declares it
 * (`data-surface`), so everything inside — a heading's ink, a solid button, a link, a texture —
 * takes that surface's tokens without being told, exactly as inside a band. It sits in Section's
 * content column and never leaves it: Section owns the column and the band's air, the island owns
 * only its own inset, radius and ground. So it keeps the page gutter at every width — that is what
 * makes it an island and not a band in a band.
 *
 * It is a positioned, isolated box that clips to its radius, so a Texture placed inside it fills the
 * island rather than the band, and sits between the island's ground and its content.
 *
 * It arranges nothing: one child region, laid out by whatever Layout the caller hands it. No
 * `className`, by design — its ground, inset and radius are the whole component, and a class that
 * moved any of them would be rule 5 (never override a surface from outside) one level down.
 */
export function Island({ surface, overhang = false, ground, children }: IslandProps) {
  return (
    <div className={cx(styles.island, overhang && styles.overhang)} data-surface={surface}>
      {overhang ? (
        <div className={styles.ground} aria-hidden="true">
          {ground}
        </div>
      ) : ground ? (
        <div aria-hidden="true">{ground}</div>
      ) : null}
      {children}
    </div>
  );
}

/**
 * Content that must sit ON the ground of an `overhang` island. The overhang island drops its block
 * inset so a full-height child can stand proud of the ground; every other child would then start in
 * the overhang, off the ground. This wrapper puts the overhang and the island's own block inset
 * back as its padding, from 1024 (below it the island has its inset again and this adds nothing).
 * Inside an island without `overhang` it is a plain wrapper.
 */
export function IslandOnGround({ children }: { children: ReactNode }) {
  return <div className={styles.onGround}>{children}</div>;
}

/**
 * A band's ground, as the island sees it. Section's four surfaces restated as a literal rather than
 * imported: a primitive does not import a sibling (CLAUDE.md § Scope), and these two helpers only
 * compare strings.
 */
type BandGround = 'paper' | 'tint' | 'ink' | 'blue';

/**
 * The band an island floats on when its pattern is not told: the other of the two light grounds.
 * A tint island sits on paper, a paper island on tint — the one-step contrast every boxed object
 * on the site uses (the form panel, the boxed card's hover ground).
 */
export const ISLAND_BAND: Record<IslandSurface, BandGround> = {
  paper: 'tint',
  tint: 'paper',
};

/**
 * The island's ground on a given band, refusing the band's own: with no edge and no shadow a
 * same-surface island is invisible, and a tint island in a tint band is two tints touching (the
 * § 1.7 rule, one level down). A refused request takes the other light ground and warns in
 * development — rendering something correct beats rendering nothing, and the warning names the fix.
 */
export function islandSurfaceOn(band: BandGround, requested: IslandSurface): IslandSurface {
  if (requested !== band) return requested;
  const other: IslandSurface = requested === 'paper' ? 'tint' : 'paper';
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      `Island: a "${requested}" island on a "${band}" band has no edge to read by; rendered "${other}".`,
    );
  }
  return other;
}
