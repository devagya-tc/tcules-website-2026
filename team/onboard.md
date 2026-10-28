# Onboarding: one prompt

You need **Git** and **Claude** (the desktop app's **Code** tab, or the terminal). Nothing else.

Open Claude Code in any folder, paste the prompt below, and answer its questions. It clones the repo
and saves who you are in your own copy, so every session after this knows you, even on a Claude
account you share with someone else.

Already have a copy of the repo? Open Claude Code in it and type `/onboard`.

```markdown
Set me up for the Tcules website repo. Tell me in one plain line what you're doing at each step (I
may not know git), and only stop to ask me when a step says so. Never discard or overwrite anything
of mine; if something is in the way, tell me and carry on.

1. Git. Check `git --version`. If it's missing, tell me to install Git from git-scm.com and stop until
   I say done.
2. Get the repo. Ask me where to put it (suggest `~/code/tcules-website-2026`).
   - If that folder already holds the repo, use it: run `git fetch`, and bring in new work with
     `git merge --ff-only` only if `git status --porcelain` is empty; otherwise just tell me what's
     unsaved and leave it.
   - Otherwise clone `https://github.com/devagya-tc/tcules-website-2026.git` there. If that fails on
     a network or security error, use SSH over port 443: create `~/.ssh/id_ed25519` if it's missing
     (`ssh-keygen -t ed25519 -N "" -f ~/.ssh/id_ed25519`), append a `Host github.com` entry to
     `~/.ssh/config` with `HostName ssh.github.com`, `Port 443`, `User git`,
     `IdentityFile ~/.ssh/id_ed25519`, show me the public key, ask me to add it at
     https://github.com/settings/keys, then clone `git@github.com:devagya-tc/tcules-website-2026.git`.
     On Windows also set `git config --global core.sshCommand C:/Windows/System32/OpenSSH/ssh.exe`.
3. Who I am. Read `team/members.json` and ask me which of those people I am. Don't guess from my
   Claude account or computer name: accounts are shared.
4. Save it, in the repo folder:
   - `CLAUDE.local.md` from `team/templates/CLAUDE.local.md`, with my name, role and member id exactly
     as `team/members.json` has them.
   - If my role is designer or engineer, copy `team/templates/settings.local.<role>.json` to
     `.claude/settings.local.json` (merge if it exists). These make a few rule files read-only for me.
   - Check both are ignored by git with `git check-ignore CLAUDE.local.md .claude/settings.local.json`.
5. My name on my work, in this repo only: `git config user.name "<my name>"`, and as email my GitHub
   noreply address: ask my GitHub username, read my `id` from https://api.github.com/users/<username>,
   and set `git config user.email "<id>+<username>@users.noreply.github.com"`. Never a work email: the
   repo is public.
6. Done. Tell me in a short list what's set up, then ask me to open Claude Code in the repo folder,
   accept "trust this folder", and check that the first reply greets me by name.
```

Optional, for sending work for review from Claude (`/ship`, `/handoff`): the GitHub CLI
(cli.github.com), signed in with `gh auth login`.
