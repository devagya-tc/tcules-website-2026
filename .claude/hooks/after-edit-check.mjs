#!/usr/bin/env node
/**
 * PostToolUse hook (Edit|Write): run the repo's own checks that apply to the file just changed, and
 * hand any failure straight back to Claude so it fixes the cause before moving on.
 *
 * Bhumika works in the Claude desktop app, not a terminal, so `npm run verify` before a pull request
 * is something Bhumika would never see fail. These are the fast, dependency-free checks (well under a
 * second each): tokens:check for stylesheets, classes:check for CSS Modules and the TSX that reads
 * them, specimens:check for anything a /design route covers. lint and typecheck need node_modules and
 * a build, so /ship runs `npm run verify` once before the pull request instead.
 *
 * Silent when everything passes. On a failure it prints {"decision":"block","reason":…}, which
 * PostToolUse delivers to Claude as feedback on the edit it just made. It never fails the session:
 * an unreadable payload or a missing node exits 0.
 *
 * Wired up by the designer settings template (team/templates/settings.local.designer.json).
 */
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (c) => (raw += c));
process.stdin.on('end', () => {
  let file = '';
  try {
    const p = JSON.parse(raw || '{}');
    file = String(p.tool_input?.file_path || p.tool_input?.path || '');
  } catch {
    process.exit(0);
  }
  const rel = file.replaceAll('\\', '/').replace(/^.*?\/(src|scripts|docs)\//, '$1/');
  if (!rel.startsWith('src/')) process.exit(0); // only the site's code is checked here

  const checks = [];
  if (rel.endsWith('.css')) checks.push('tokens-check', 'classes-check');
  if (/\.(tsx?|css)$/.test(rel)) checks.push('specimens-check');
  if (/\.tsx?$/.test(rel) && !checks.includes('classes-check')) checks.push('classes-check');

  const failures = [];
  for (const name of [...new Set(checks)]) {
    const r = spawnSync(process.execPath, [join(ROOT, 'scripts', `${name}.mjs`)], {
      cwd: ROOT,
      encoding: 'utf8',
      timeout: 20000,
    });
    if (r.status !== 0) {
      const out = `${r.stdout || ''}${r.stderr || ''}`.trim().split('\n').slice(-12).join('\n');
      failures.push(`npm run ${name.replace('-check', ':check')} failed:\n${out}`);
    }
  }
  if (failures.length)
    console.log(
      JSON.stringify({
        decision: 'block',
        reason: `The repo's checks failed after this edit to ${rel}. Fix the cause (not the check) before going on, then they run again on your next edit.\n\n${failures.join('\n\n')}`,
      }),
    );
  process.exit(0);
});
