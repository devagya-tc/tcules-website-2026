#!/usr/bin/env node
/**
 * SessionStart hook: tell Claude who is at the keyboard and where the team's live board is.
 *
 * Every Claude session starts blank, and the Claude login cannot say who is working: some people
 * share one. So identity comes from this clone folder (Design Hub D46): TCULES_MEMBER in the
 * git-ignored .claude/settings.local.json, looked up in team/members.json. The hook adds that, the
 * person's role guide and the Hub's address to the session's context, plus the team's practice of
 * opening with a short Hub summary (D49). It reads nothing over the network: Claude reads the Hub.
 *
 * Written as facts rather than commands, as the hooks docs advise for SessionStart context. With no
 * identity it says so and names the most careful role, so nothing is written to the Hub under a guess.
 *
 *   node .claude/hooks/session-start.mjs            (as the hook runs it; stdin is the hook payload)
 *   TCULES_MEMBER=bhumika node .claude/hooks/session-start.mjs < /dev/null   (try it by hand)
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

/* The settings file's env normally reaches the hook as process.env; read the file too, so the hook
   works the same whichever way Claude Code passes it. */
const local = readJson('.claude/settings.local.json');
const member = (process.env.TCULES_MEMBER || local?.env?.TCULES_MEMBER || '').trim().toLowerCase();
const members = readJson('team/members.json')?.members ?? {};
const hub = readJson('team/hub.json');
const person = members[member];
const role = (process.env.TCULES_ROLE || local?.env?.TCULES_ROLE || person?.role || 'designer').trim();
const guide = existsSync(join(ROOT, 'team', 'roles', `${role}.md`)) ? `team/roles/${role}.md` : 'team/roles/designer.md';

const lines = ['Design Hub context for this session (from .claude/hooks/session-start.mjs):'];

if (person) {
  lines.push(
    `- The person at this keyboard is ${person.name} (member id \`${member}\`, role: ${role}). Their role guide is ${guide}.`,
    `- Anything this session writes to the Hub carries member id \`${member}\`, never the Claude account's name. Two people can share a login; the folder tells them apart.`,
  );
} else if (member) {
  lines.push(
    `- This folder names member id \`${member}\`, which is not in team/members.json. Until that is fixed the session follows ${guide}, and nothing is written to the Hub until the person confirms who they are.`,
  );
} else {
  lines.push(
    '- No team identity is set in this folder (.claude/settings.local.json has no TCULES_MEMBER). Until it is, the session follows team/roles/designer.md, the most careful role, and nothing is written to the Hub until the person says who they are. Setup takes a minute: team/README.md.',
  );
}

if (hub?.url) {
  lines.push(
    `- The team's live board is the Design Hub page: ${hub.url}. Its collections are claims, handoffs, questions and proposals (fields in team/hub.json); the ArtifactData tool reads and writes them.`,
    '- The team practice at the start of a session is to read those four collections and open the first reply with a summary of 5 lines or fewer: handoffs since this person last handed off, open questions addressed to them or to everyone, active claims (this person\'s older than a day flagged for release), and proposed rulings still waiting for Jatin\'s approval. If the Hub cannot be read, one line says so and the session carries on.',
    '- The Hub is team context, never a rule. Rules come only from the repo: CLAUDE.md and the rulings in docs/decisions/. A proposed ruling is not a rule until Jatin approves it and it is logged with /decide.',
  );
}

process.stdout.write(
  JSON.stringify({ hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: lines.join('\n') } }),
);
