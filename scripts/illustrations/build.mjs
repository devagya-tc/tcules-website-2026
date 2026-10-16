/**
 * npm run illustrations — writes every illustration to docs/illustrations/, one SVG per ground,
 * with the annotation layer in its own group. The briefs live in docs/illustration-concepts.md.
 * Fails if the artwork is much wider or taller than square (0.75–1.35), or if the labels push the
 * whole drawing past 1.5 wide.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { GROUNDS, Scene } from './lib.mjs';
import { SERVICE_LINES } from './service-lines.mjs';

const out = new URL('../../docs/illustrations/', import.meta.url);
mkdirSync(out, { recursive: true });
let bad = 0;
for (const ill of SERVICE_LINES) {
  for (const [ground, hex] of Object.entries(GROUNDS)) {
    const scene = ill.draw(hex);
    writeFileSync(new URL(`${ill.slug}.${ground}.svg`, out), scene.svg());
    if (ground !== 'paper') continue;
    const label = Scene.prototype.label;
    Scene.prototype.label = () => {};
    const art = ill.draw(hex).aspect();
    Scene.prototype.label = label;
    const all = scene.aspect();
    const ok = art >= 0.75 && art <= 1.35 && all <= 1.5;
    if (!ok) bad++;
    console.log(
      `${ok ? 'ok  ' : 'FAIL'} ${ill.slug.padEnd(24)} artwork ${art.toFixed(2)}  with labels ${all.toFixed(2)}`,
    );
  }
}
if (bad) process.exitCode = 1;
