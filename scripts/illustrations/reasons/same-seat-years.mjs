/**
 * Reason · "Senior people do the work, and clients keep us for years." (Why Tcules, offer set,
 * decisions/2026-10-30-reasons-take-illustrations)
 *
 * Message: the same senior seat stands beside each product the client has launched, year after year.
 *
 * Time runs along x, read left to right (2026-09-28-illustrations-face-left-read-left-to-right): the
 * client's three products stand in a row on one plinth, the oldest at screen-left, each a little
 * taller and holding one more block than the year before, so the product grows. In front of every
 * year runs the partnership, the one solid blue plane. The carried item is our seat (no figure: a
 * person is their place, §4a Figures): a BUILT echo (peridot-200, solid ink outline) in front of each
 * earlier product, and solid once, a station block, in front of this year's. Each seat sits on its
 * product's centre line (x 290, 180, 70), and the dashed ink thread holds them in one position along
 * the years: it runs along x through both echoes' centres (y 145) and stops at the station's back
 * face (x 95), so no hidden run lies under the solid.
 *
 * Unlike home's "relationships-last" (a stack of year planes, the seat held on a vertical thread),
 * this is a row in time: the products side by side, the thread lying flat on the partnership.
 */
import { HEX, Scene, rgba } from '../lib.mjs';

export const meta = {
  title: 'Senior people do the work, and clients keep us for years.',
  message:
    'The same senior seat stands beside each product the client has launched, year after year.',
};

/** A block on a product screen: an outlined field in the line colour at 45%. */
const quiet = rgba(HEX.blue, 0.45);

/** @param {string} G the ground hex; occluding faces take it (§4a). */
export function draw(G) {
  const s = new Scene({ id: 'same-seat-years' });

  // one client, one plinth: every year stands on it
  s.plinth(0, 0, 360, 200, 0, 22, G);
  const z = 22;

  // the client's products, one per year, oldest (farthest, screen-left) first so nearer ones occlude.
  // 10 units between devices, so the three screens stay apart at 200px tall.
  const xs = [240, 130, 20];
  for (let k = 0; k < 3; k++) {
    const x = xs[k];
    const h = 130 + 25 * k;
    const at = s.device(x, x + 100, 70, z, h, { fill: G });
    s.panelBar(at, 12, h - 22, 40, { solid: true });
    s.panelBar(at, 12, h - 38, 64, { h: 6 });
    // the product grows: one more block each year
    for (let i = 0; i <= k; i++) s.onPanel(at, 12 + 26 * i, 16, 20, 30, { fill: G, stroke: quiet });
  }

  // the partnership, in front of every year: the one solid blue plane
  const zb = s.slab(10, 110, 340, 70, z, 14);

  // our seat in the earlier years: built echoes, each on its product's centre line
  s.echo(265, 130, 50, 30, zb, { state: 'built' });
  s.echo(155, 130, 50, 30, zb, { state: 'built' });

  // the thread: one seat held along the years, through each echo's centre to the station's back
  // face. Drawn over the echoes (flat tiles on the same plane) so it reads through them.
  s.thread([
    [290, 145, zb],
    [95, 145, zb],
  ]);

  // this year's seat, solid once: a station block in front of the newest product. Drawn last.
  s.itemSolid(45, 130, 50, 30, zb, 44);

  return s;
}
