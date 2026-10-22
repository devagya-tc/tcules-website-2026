#!/usr/bin/env node
/**
 * SessionStart hook: tell Claude who is at the keyboard and where the team's shared context lives.
 *
 * Every Claude session starts blank, and the Claude login cannot say who is working: several people
 * share one. So identity comes from this clone folder: TCULES_MEMBER in the git-ignored
 * .claude/settings.local.json, looked up in team/members.json. Shared context is the repo itself
 * (CLAUDE.md, the rulings) plus GitHub: open pull requests, recent merges, and the handoff notes
 * /handoff leaves as pull-request comments. The hook names all of that and the team's practice of
 * opening with a short catch-up; Claude does the reading. The hook itself reads no network.
 *
 * Written as facts rather than commands, as the hooks docs advise for SessionStart context. With no
 * identity it says so and names the most careful role.
 *
 *   node .claude/hooks/session-start.mjs                (as the hook runs it; stdin is the payload)
 *   TCULES_MEMBER=bhumika node .claude/hooks/session-start.mjs < /dev/null    (try it by hand)
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const readJson = (p) => {
  try {
    return JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
  } catch {
    return null;
  }
};

const local = readJson('.claude/settings.local.json');
const member = (process.env.TCULES_MEMBER || local?.env?.TCULES_MEMBER || '').trim().toLowerCase();
const members = readJson('team/members.json')?.members ?? {};
const person = members[member];
const role = (process.env.TCULES_ROLE || local?.env?.TCULES_ROLE || person?.role || 'designer').trim();
const guide = existsSync(join(ROOT, 'team', 'roles', `${role}.md`)) ? `team/roles/${role}.md` : 'team/roles/designer.md';
const guarded = Array.isArray(local?.permissions?.deny) && local.permissions.deny.length > 0;

const lines = ['Team context for this session (from .claude/hooks/session-start.mjs):'];

if (person) {
  lines.push(
    `- The person at this keyboard is ${person.name} (member id \`${member}\`, role: ${role}). Their role guide is ${guide}.`,
    `- Anything written on their behalf (commits, pull requests, handoff notes) is theirs, never the Claude account's: several people share a login, and the folder tells them apart.`,
  );
} else if (member) {
  lines.push(
    `- This folder names member id \`${member}\`, which is not in team/members.json. Until that is fixed the session follows ${guide}, and nothing is posted on the person's behalf until they confirm who they are (/onboard fixes it).`,
  );
} else {
  lines.push(
    '- No team identity is set in this folder (.claude/settings.local.json has no TCULES_MEMBER). Until it is, the session follows team/roles/designer.md, the most careful role, and nothing is posted on the person\'s behalf until they say who they are. /onboard sets it up in a minute.',
  );
}

if (guarded)
  lines.push(
    '- This folder has role guardrails: some paths are read-only for this person (listed under permissions.deny in .claude/settings.local.json), and the repo\'s checks run after every edit. A refused edit is the guardrail working; the change belongs in a proposal or a question to Devagya instead.',
  );

lines.push(
  '- Shared context lives in two places. The rules: CLAUDE.md and the rulings in docs/decisions/ (a ruling is logged only after Jatin approves it). What is happening: GitHub, read with `git` and `gh` — open pull requests, recent merges to main, and handoff notes, which /handoff posts as pull-request comments starting with "Handoff".',
  '- The team practice at the start of a session is to run `git fetch`, `gh pr list --state open` and `git log --oneline -5 origin/main`, read the latest "Handoff" comment on each open pull request (and on this branch\'s), and open the first reply with a catch-up of 5 lines or fewer: what merged recently, what is open and whose, and the latest handoff on this person\'s own work. If GitHub cannot be reached, one line says so and the session carries on.',
  '- Work happens on a branch and lands through a pull request that Devagya reviews; main is protected. /ship takes finished work from branch to pull request.',
);

process.stdout.write(
  JSON.stringify({ hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: lines.join('\n') } }),
);
