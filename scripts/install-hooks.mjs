#!/usr/bin/env node
/**
 * Point git at the tracked hooks in `.githooks/`.
 *
 * `.git/hooks/` is not version-controlled, so a hook written there protects exactly one working
 * copy — not a teammate's machine, not a fresh clone, not CI. `core.hooksPath` moves the whole
 * directory into the repo, which makes `npm ci` the only thing a new checkout needs.
 *
 * Why this runs from `prepare`: npm fires it after `npm install` and `npm ci`, which is already
 * step 4 of the designer guide, so nobody has to be told about a setup command they would forget.
 * The cost is that `prepare` also runs where there is no repository at all — an install from a
 * tarball, some CI cache restores — so a missing `.git` is a normal outcome here and not a
 * failure. Everything below exits 0. A `prepare` that can fail is a `prepare` that breaks
 * `npm ci` for everyone, and a broken install is a worse problem than an uninstalled hook.
 */
import { execFileSync } from 'node:child_process';

const HOOKS_PATH = '.githooks';

/** Run a git command, returning its trimmed stdout, or null if git failed for any reason. */
function git(...args) {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null;
  }
}

// No repository (tarball install, or a cache restore without .git) — nothing to configure.
if (git('rev-parse', '--git-dir') === null) {
  process.exit(0);
}

const current = git('config', '--local', '--get', 'core.hooksPath');

if (current === HOOKS_PATH) {
  process.exit(0);
}

// Somebody has pointed this elsewhere on purpose. Say so rather than silently taking it over —
// a hook directory swapped without a word is the kind of thing that gets debugged for an hour.
if (current !== null && current !== '') {
  console.warn(
    `install-hooks: core.hooksPath is set to "${current}", leaving it alone. ` +
      `Run \`git config core.hooksPath ${HOOKS_PATH}\` to use the tracked hooks.`,
  );
  process.exit(0);
}

if (git('config', '--local', 'core.hooksPath', HOOKS_PATH) === null) {
  console.warn(`install-hooks: could not set core.hooksPath; the pre-push hook is not active.`);
  process.exit(0);
}

console.log(`install-hooks: core.hooksPath -> ${HOOKS_PATH} (pre-push refuses pushes to main)`);
