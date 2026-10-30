import { HEX, Scene } from '../lib.mjs';

export const meta = {
  title: 'We work out what the product has to know before we draw it.',
  message:
    'What the product has to know is worked out and solid first; the screen above it is still a dashed outline.',
};

export function draw(G) {
  const s = new Scene({ id: 'known-before-drawn' });
  s.plane(0, 0, 260, 200, 190, { fill: 'none', stroke: HEX.blue, dash: '6 4' });
  s.dots(0, 0, 260, 200, 190, { pitch: 32 });
  s.echo(100, 90, 60, 40, 190);
  const zb = s.slab(0, 0, 260, 200, 0, 18);
  for (const x of [200, 110, 20]) {
    s.plane(x, 20, 40, 40, zb, { fill: G, stroke: HEX.blue });
    s.plane(x + 14, 34, 12, 12, zb, { fill: HEX.blue, stroke: 'none' });
  }
  s.connector([[220, 60, zb], [220, 110, zb], [164, 110, zb]], { color: HEX.paper });
  s.connector([[130, 60, zb], [130, 86, zb]], { color: HEX.paper });
  s.connector([[40, 60, zb], [40, 110, zb], [96, 110, zb]], { color: HEX.paper });
  for (const x of [200, 140, 80, 20]) s.bar(x, 164, 40, zb, { color: HEX.paper, alpha: 0.55, thick: 8 });
  s.itemSolid(100, 90, 60, 40, zb, 20);
  s.thread([[130, 110, zb + 20], [130, 110, 190]]);
  return s;
}
