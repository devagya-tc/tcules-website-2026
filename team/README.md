# The website team in Claude Code: the Design Hub

Four people work in this repo, each with Claude, and every Claude session starts blank. The Design
Hub gives every session the same context, whoever is signed in:

| What | Where | Changed by |
|---|---|---|
| The rules: rulings, brand chapters, components, `CLAUDE.md` | this repo | the owner, through pull requests |
| What's happening: claims, handoffs, questions, proposed rulings | the Hub page (`team/hub.json`) | each person, through `/handoff`, the page's forms and, soon, `/claim` |
| Who is at the keyboard | your own clone folder, never pushed | you, once |

Claude account memory and chat history are not used for shared context: they can't be shared between
accounts, and a shared login mixes people.

## Set up once (about five minutes)

1. Install Node LTS, 20.11.1 or later. The hooks run with `node`.
2. In your clone, copy `team/templates/settings.local.json` to `.claude/settings.local.json` and set
   your member id from `team/members.json` and your role:
   ```json
   { "env": { "TCULES_MEMBER": "bhumika", "TCULES_ROLE": "designer" } }
   ```
3. Copy `team/templates/CLAUDE.local.md` to the repo root as `CLAUDE.local.md` and fill in the line.
   Both files are git-ignored: they never leave your laptop.
4. Set your commit author to your GitHub noreply address, so no work email lands on a public commit:
   `git config user.email "<id>+<username>@users.noreply.github.com"` (GitHub → Settings → Emails).
5. Ask Yash for **Contributor** access to the Hub page (Viewer can read but not write).
6. Open Claude Code on this folder: the terminal, or the desktop app's **Code** tab. Accept "trust this
   folder"; project hooks only run in a trusted folder. The first reply should say who you are and
   summarise the Hub.

Sharing a Claude login is fine: each laptop's folder says who is working.

## Every day

| When | Do |
|---|---|
| Opening Claude | Nothing: it tells you who you are and what changed |
| "Is this allowed?" | `/ask-design "<idea>"` |
| "What's happening?" | `/hub`, or `/hub SiteNav` for one thing |
| Before starting something | Claim it on the Hub page (`/claim` is coming) |
| Stopping | `/handoff` |
| "This should be a rule" | Propose it on the Hub page; Devagya accepts or rejects |
