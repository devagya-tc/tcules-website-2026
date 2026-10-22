#!/usr/bin/env node
/**
 * SessionStart hook: who is at the keyboard, what changed, and the folder brought up to date safely.
 *
 * Every Claude session starts blank, and the Claude login can't say who is working: several people
 * share one. So identity comes from the clone (TCULES_MEMBER in the git-ignored
 * .claude/settings.local.json, looked up in team/members.json), and follows into worktrees: when the
 * working folder has no settings file, the main checkout's is used.
 *
 * The catch-up is done here, in code, not left to the model, because its one hard rule is that no
 * uncommitted work is ever lost (Devagya's review of #144, points 4, 6 and 8):
 *   - `git fetch` always;
 *   - fast-forward (`git merge --ff-only`) only when the working tree is clean and the branch tracks a
 *     remote; otherwise report, and leave everything as it is;
 *   - never stash, reset, rebase, or check out over changes;
 *   - leftover work in the main checkout is reported too, when the session runs in a worktree;
 *   - nothing here can stop the session: a failed step is reported and the session carries on.
 * The results go to Claude as facts, with how to explain them to this person: in plain words, with
 * plain choices, for roles that aren't technical (point 7).
 *
 *   node .claude/hooks/session-start.mjs < payload.json      (as Claude Code runs it)
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';

let payload = {};
try {
  payload = JSON.parse(readFileSync(0, 'utf8') || '{}');
} catch {
  /* run by hand with no payload */
}

const PROJECT = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const WORK = payload.cwd || PROJECT; // the desktop app runs hooks in the main checkout; cwd is the worktree

const git = (dir, args, timeout = 8000) => {
  const r = spawnSync('git', ['-C', dir, ...args], { encoding: 'utf8', timeout });
  /* trimEnd only: `git status --porcelain` lines start with a significant space (" M file"). */
  return { ok: r.status === 0, out: (r.stdout || '').trimEnd(), err: (r.stderr || r.error?.message || '').trim() };
};

/* The main checkout of a worktree: its .git is a file pointing into <main>/.git/worktrees/<name>,
   whose `commondir` leads back to <main>/.git. Read from disk, so it works without git on PATH. */
function mainCheckout(dir) {
  try {
    const dotgit = join(dir, '.git');
    if (!existsSync(dotgit) || statSync(dotgit).isDirectory()) return dir;
    const gitdir = resolve(dir, readFileSync(dotgit, 'utf8').match(/gitdir:\s*(.+)/)[1].trim());
    const common = resolve(gitdir, readFileSync(join(gitdir, 'commondir'), 'utf8').trim());
    return dirname(common);
  } catch {
    return dir;
  }
}
const MAIN = mainCheckout(WORK);

const readJson = (p) => {
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
};
const localIn = (dir) => readJson(join(dir, '.claude', 'settings.local.json'));
const local = localIn(WORK)?.env?.TCULES_MEMBER ? localIn(WORK) : localIn(MAIN) ?? localIn(PROJECT);
const member = (process.env.TCULES_MEMBER || local?.env?.TCULES_MEMBER || '').trim().toLowerCase();
const members = readJson(join(PROJECT, 'team', 'members.json'))?.members ?? {};
const person = members[member];
const role = (process.env.TCULES_ROLE || local?.env?.TCULES_ROLE || person?.role || '').trim();
const technical = role === 'owner' || role === 'engineer';
const guarded = Array.isArray(local?.permissions?.deny) && local.permissions.deny.length > 0;

const lines = ['Team context for this session (from .claude/hooks/session-start.mjs):'];

/* ── Who ──────────────────────────────────────────────────────────────────────────────────────── */
if (person) {
  lines.push(
    `- The person at this keyboard is ${person.name} (member id \`${member}\`, role: ${role}). Their role guide is team/roles/${role}.md.`,
    "- Commits, pull requests and handoff notes made in this session are theirs, never the Claude account's: several people share a login, and the folder tells them apart.",
  );
} else {
  const names = Object.values(members).map((m) => m.name).join(', ');
  lines.push(
    `- No team identity is set for this folder${member ? ` (it names \`${member}\`, who isn't in team/members.json)` : ''}. The practice is to ask the person once who they are (${names}), then carry on normally with their role, and offer /onboard so they aren't asked again.`,
  );
}
if (guarded)
  lines.push(
    "- This person's role has guardrails: some paths are read-only (permissions.deny in .claude/settings.local.json), and the repo's checks run after every edit. A refused edit means the change belongs with Devagya: say so plainly and carry on with the rest.",
  );

/* ── Catch-up, done safely here ──────────────────────────────────────────────────────────────── */
const facts = [];
const fetched = git(WORK, ['fetch', '--quiet', '--prune'], 20000);
if (!fetched.ok) facts.push(`GitHub couldn't be reached to check for new work (${fetched.err.split('\n')[0] || 'no detail'}); the folder was left as it is.`);

const branch = git(WORK, ['rev-parse', '--abbrev-ref', 'HEAD']).out || '?';
const upstream = git(WORK, ['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}']);
const dirty = git(WORK, ['status', '--porcelain']).out.split('\n').filter(Boolean);
const dirtyList = (rows) => rows.slice(0, 12).map((l) => l.slice(3)).join(', ') + (rows.length > 12 ? `, and ${rows.length - 12} more` : '');

if (fetched.ok && upstream.ok) {
  const behind = Number(git(WORK, ['rev-list', '--count', 'HEAD..@{u}']).out || 0);
  if (behind > 0 && dirty.length === 0) {
    const ff = git(WORK, ['merge', '--ff-only', '@{u}'], 20000);
    facts.push(
      ff.ok
        ? `Brought "${branch}" up to date: ${behind} new change(s) from GitHub.`
        : `"${branch}" is ${behind} change(s) behind GitHub but couldn't be updated without combining work (${ff.err.split('\n')[0]}); it was left as it is.`,
    );
  } else if (behind > 0) {
    facts.push(`"${branch}" is ${behind} change(s) behind GitHub and was NOT updated, because this folder has work that isn't saved yet.`);
  }
} else if (fetched.ok && branch !== 'HEAD') {
  facts.push(`"${branch}" isn't linked to a branch on GitHub yet (normal for new work before /ship), so nothing was brought in.`);
}
if (fetched.ok && branch !== 'main') {
  const mainAhead = Number(git(WORK, ['rev-list', '--count', 'HEAD..origin/main']).out || 0);
  if (mainAhead > 0) facts.push(`main on GitHub has ${mainAhead} change(s) this branch doesn't have yet; nothing was combined.`);
}
if (dirty.length) facts.push(`Work in this folder not saved to GitHub yet: ${dirtyList(dirty)}.`);

const sameFolder = resolve(MAIN).toLowerCase() === resolve(WORK).toLowerCase();
if (!sameFolder) {
  const mainDirty = git(MAIN, ['status', '--porcelain']).out.split('\n').filter(Boolean);
  if (mainDirty.length) facts.push(`The main folder (${MAIN}) also has work not saved to GitHub: ${dirtyList(mainDirty)}. It is safe there, but a later catch-up will run into it.`);
}

lines.push(
  `- Catch-up already done by this hook for "${branch}":${facts.length ? '\n' + facts.map((f) => `    · ${f}`).join('\n') : ' everything is up to date and there is no unsaved work.'}`,
  "- The rule behind it: nothing is ever discarded, overwritten or set aside without the person choosing it. When there's unsaved work, a conflict or anything else in the way, the session says what it is and what the choices are, then carries on with what the person asked for; it never stops and waits on it.",
  '- Nothing deletes a worktree or folder before checking it for unsaved and untracked files and asking about them.',
  '- Shared context: the rules live in CLAUDE.md and docs/decisions/; what\'s happening lives on GitHub. The practice is to read `gh pr list --state open` and the latest comment starting "Handoff" on this branch\'s pull request (and on the others, briefly), and to open the first reply with a catch-up of 5 lines or fewer built from that and the facts above.',
  '- Rulings: a ruling is valid once Devagya logs it with /decide. Jatin gives final approval in feedback sessions and Devagya logs those for him; Devagya also makes his own, which a later session with Jatin may supersede. Anyone else\'s idea is a proposal until then.',
  technical
    ? '- This person is technical: git terms are fine.'
    : "- This person isn't technical. Never tell them to rebase, stash, reset, merge or force-push. Describe things in terms of their work (\"changes to the enquiry form and two new images\"), offer plain choices (\"keep it and continue, save it as its own piece of work, or set it aside?\"), and do the git work for them once they choose. Explain only the outcome.",
);

process.stdout.write(
  JSON.stringify({ hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: lines.join('\n') } }),
);
