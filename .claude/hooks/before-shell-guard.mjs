#!/usr/bin/env node
/**
 * PreToolUse hook (Bash|PowerShell): refuse a shell command that would write to a path this clone's
 * role keeps read-only.
 *
 * The role's `Edit(/…)` deny rules stop the Edit and Write tools, and nothing else: `Set-Content
 * CLAUDE.md`, `echo >> scripts/x.mjs` or `rm -r docs/decisions` went straight past them. This closes
 * that seam for the ordinary cases. It is a guard against a well-meaning session reaching for the
 * shell, not a sandbox — a determined command (a script that computes its path, an encoded string)
 * can still get by, which is why branch protection and review stay the real gate.
 *
 * The protected set is READ from the same `Edit(/…)` rules in .claude/settings.local.json, never
 * restated here, so a role template is the one place a protected path is named. A role with no Edit
 * denies (gtm, owner) is unaffected.
 *
 * A command is refused when it names a protected path AND either redirects output into one or
 * carries a writing verb (Set-Content, rm, mv, sed -i, git checkout --, …). Reading, running and
 * diffing protected files — `cat CLAUDE.md`, `node scripts/tokens-check.mjs`, `git diff team/` — stay
 * allowed. It never fails the session: an unreadable payload or settings file exits 0.
 *
 * Wired up by the designer and engineer settings templates (team/templates/settings.local.*.json).
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();

// `/docs/decisions/**` → a folder (`docs/decisions/`); `/CLAUDE.md` → one file. `match` is
// lower-cased because Windows paths are case-insensitive, so `claude.md` names the same file;
// `label` keeps the rule's own spelling for the message.
function protectedPaths() {
  try {
    const s = JSON.parse(readFileSync(join(ROOT, '.claude', 'settings.local.json'), 'utf8'));
    return (s.permissions?.deny || [])
      .map((r) => /^Edit\(\/(.+)\)$/.exec(r)?.[1])
      .filter(Boolean)
      .map((p) => p.replace(/\*\*$/, ''))
      .map((p) => ({ match: p.toLowerCase(), label: `/${p}` }));
  } catch {
    return [];
  }
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Commands that change what is on disk, PowerShell cmdlets and their common aliases included. Each
// must start a command word — at the start, or after whitespace, `(`, `{`, `|`, `;` or `&` — so the
// `md` alias is never read out of a `.md` extension.
const COMMANDS = [
  'set-content', 'add-content', 'out-file', 'new-item', 'remove-item', 'move-item', 'copy-item',
  'rename-item', 'clear-content', 'ni', 'ri', 'del', 'erase', 'rm', 'rmdir', 'mv', 'cp', 'copy',
  'move', 'ren', 'touch', 'truncate', 'tee', 'tee-object', 'install', 'ln', 'mkdir', 'md',
];
// File-writing APIs reached from a one-liner (`node -e`, `python -c`, `[IO.File]::…`): a method, so
// it follows a `.` or `::`.
const METHODS = [
  'writealltext', 'writealllines', 'appendalltext', 'writefilesync', 'appendfilesync', 'write_text',
  'rmsync', 'renamesync', 'copyfilesync', 'unlinksync',
];
const WRITER_RE = new RegExp(
  `(^|[\\s({|;&])(${COMMANDS.map(esc).join('|')})(?![\\w-])|(\\.|::)(${METHODS.join('|')})\\b`,
  'i',
);
// In-place editors and git commands that rewrite the working tree.
const INPLACE_RE = /\b(sed|perl|ruby)\b[^|;&]*\s-\w*i|\bgit\s+(checkout|restore|rm|mv|apply|stash\s+pop)\b/i;

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (c) => (raw += c));
process.stdin.on('end', () => {
  let command = '';
  try {
    command = String(JSON.parse(raw || '{}').tool_input?.command || '');
  } catch {
    process.exit(0);
  }
  const paths = protectedPaths();
  if (!command || !paths.length) process.exit(0);

  // One spelling for every way a path can be written: forward slashes, lower case, and the repo root
  // (absolute, either slash) folded to `./`, so `C:\…\hub\CLAUDE.md` and `./CLAUDE.md` read alike.
  const root = ROOT.replaceAll('\\', '/').toLowerCase().replace(/\/$/, '');
  const norm = command.replaceAll('\\', '/').toLowerCase().split(`${root}/`).join('./');

  // A protected path as its own token: at the start, or after whitespace, a quote, `=`, `(`, `,` or
  // a redirect, optionally through `./` or `../` — never as the tail of a longer path such as
  // node_modules/x/scripts/. A folder matches with or without its trailing slash (`rm -r
  // docs/decisions`). `../` is taken at its word, from wherever the command has `cd`-ed to: reading
  // that as the root errs towards refusing, which is the side a guard should err on.
  const hit = (seg) =>
    paths.find(({ match }) => {
      const body = match.endsWith('/') ? `${esc(match.slice(0, -1))}(/|(?![\\w.-]))` : `${esc(match)}(?![\\w./-])`;
      return new RegExp(`(^|[\\s'"=(,>])(\\.\\.?/)*${body}`).test(seg);
    })?.label;

  let found = null;
  for (const seg of norm.split(/&&|\|\||;|\r?\n/)) {
    // A redirect into a protected path. `2>&1` and `> $null` / `/dev/null` name no path, so they pass.
    for (const m of seg.matchAll(/\d?>>?\s*([^\s|;&]+)/g)) {
      const p = hit(` ${m[1].replace(/^['"]/, '')}`);
      if (p) found = p;
    }
    if (!found && (WRITER_RE.test(seg) || INPLACE_RE.test(seg))) found = hit(seg);
    if (found) break;
  }
  if (!found) process.exit(0);

  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: `${found} is read-only for the ${process.env.TCULES_ROLE || 'current'} role, and that includes shell commands. Don't look for another way to write it. If it really needs to change, say what and why so the owner can make the change, or propose it in a pull request comment.`,
      },
    }),
  );
});
