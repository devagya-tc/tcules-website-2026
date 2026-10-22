# The website team in Claude Code: the Design Hub

Several people work in this repo, each with Claude, and every Claude session starts blank. The Design
Hub gives every session the same context, whoever is signed in:

| What | Where | Changed by |
|---|---|---|
| The rules: rulings, brand chapters, components, `CLAUDE.md` | this repo | Devagya, through pull requests; a ruling is logged only after Jatin approves it |
| What's happening: claims, handoffs, questions, proposed rulings | the Hub page (`team/hub.json`) | each person, through `/handoff` and the page's forms; `/claim` is coming |
| Who is at the keyboard | your own clone folder, never pushed | you, once |

Claude account memory and chat history are not used for shared context: they can't be shared between
accounts, and several of us share one.

## Set up once

Paste the prompt in **[`team/onboard.md`](onboard.md)** into Claude Code and answer its questions. It
checks your tools, clones the repo, sets who you are and your commit email, and checks Hub access.
In an existing clone, type `/onboard`.

By hand instead:

1. Install Node LTS, 20.11.1 or later. The hooks run with `node`.
2. Copy `team/templates/settings.local.json` to `.claude/settings.local.json` and set your member id
   from `team/members.json` and your role:
   `{ "env": { "TCULES_MEMBER": "bhumika", "TCULES_ROLE": "designer" } }`
3. Copy `team/templates/CLAUDE.local.md` to the repo root as `CLAUDE.local.md` and fill in the line.
   Both files are git-ignored: they never leave your laptop.
4. Set your commit author to your GitHub noreply address, so no work email lands on a public commit:
   `git config user.email "<id>+<username>@users.noreply.github.com"` (GitHub → Settings → Emails).
5. Ask Yash for **Contributor** access to the Hub page (Viewer can read but not write).
6. Open Claude Code on this folder (terminal, or the desktop app's **Code** tab) and accept "trust this
   folder"; project hooks only run in a trusted folder. The first reply should name you and summarise
   the Hub.

Sharing a Claude login is fine: each laptop's folder says who is working. Teammates on another
assistant (Mihir uses GPT) use the Hub page in the browser.

## Every day

| When | Do |
|---|---|
| Opening Claude | Nothing: it tells you who you are and what changed |
| "What's happening?" | `/hub`, or `/hub SiteNav` for one thing |
| Before starting something | Claim it on the Hub page (`/claim` is coming) |
| Stopping | `/handoff` |
| "This should be a rule" | Propose it on the Hub page or in your pull request; it waits for Jatin's approval |
