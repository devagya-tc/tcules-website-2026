# Onboarding: one prompt, Claude does the rest

Open **Claude Code** (the terminal, or the desktop app's **Code** tab) in any folder, paste the prompt
below, and answer its questions. It checks your tools, clones the repo, sets who you are and your
commit email, and checks you can reach the Hub. You only do what Claude can't: say who you are, add
an SSH key on GitHub if your network needs one, and accept "trust this folder" when you reopen it.

Already have a clone? Open Claude Code in it and type `/onboard`: it runs the same steps from step 3.

```markdown
Set me up for the Tcules website repo and its Design Hub. Work through these steps in order, tell me
in one line what you're doing at each, and only stop to ask me when a step says so.

1. Tools. Check `git --version`, `node --version` (needs 20.11.1 or later) and `gh --version`.
   - If node is missing or too old, tell me to install Node LTS from nodejs.org and stop until I say done.
     If it is installed but not found (`where node` on Windows, `which node` elsewhere), say so: the
     Hub's hooks call `node` from PATH, so it has to be on PATH, not just on the disk.
   - gh is optional; note whether it is installed and signed in (`gh auth status`).
2. Clone. Ask me where to put the repo (suggest `~/code/tcules-website-2026`). If that folder already
   holds a clone of devagya-tc/tcules-website-2026, use it and pull. Otherwise:
   - Try `git clone https://github.com/devagya-tc/tcules-website-2026.git <folder>`.
   - If that fails on a network or security error, use SSH over port 443: if `~/.ssh/id_ed25519` does
     not exist, create it with `ssh-keygen -t ed25519 -N "" -f ~/.ssh/id_ed25519`, add a `Host github.com`
     entry to `~/.ssh/config` with `HostName ssh.github.com`, `Port 443`, `User git`,
     `IdentityFile ~/.ssh/id_ed25519` (append, never overwrite the file), show me the public key and
     ask me to add it at https://github.com/settings/keys. When I say done, test with
     `ssh -T git@github.com` and clone `git@github.com:devagya-tc/tcules-website-2026.git`.
     On Windows, also set `git config --global core.sshCommand C:/Windows/System32/OpenSSH/ssh.exe`.
   - Never change system security settings; if both ways fail, tell me what failed and stop.
3. Who I am. Read `team/members.json` in the clone. Show me the names and ask which one I am. Do not
   guess from my Claude account or my computer's user name: accounts are shared.
4. Identity files, inside the clone, both git-ignored (check with `git check-ignore`; stop if not):
   - `.claude/settings.local.json`: `{"env": {"TCULES_MEMBER": "<id>", "TCULES_ROLE": "<role>"}}`. If the
     file exists, merge these two keys and keep everything else.
   - `CLAUDE.local.md`: from `team/templates/CLAUDE.local.md`, its `<Name>`, `<role>` and `<member-id>`
     replaced with my name, role and id exactly as `team/members.json` spells them.
5. Commit author, in this clone only: `git config user.name "<my name>"` and my GitHub noreply email.
   Ask me my GitHub username, read my numeric id from `gh api users/<username> --jq .id`, or without
   gh from the `id` field of https://api.github.com/users/<username> (curl, or your web fetch tool), and set
   `git config user.email "<id>+<username>@users.noreply.github.com"`. Never put a work email here:
   the repo is public.
6. Hub access. Read the Hub page's address from `team/hub.json`. With the ArtifactData tool (load it
   with ToolSearch if it is deferred), list the `claims` collection on that URL. If it fails, tell me
   to ask Yash for Contributor access to the Hub page, and to sign Claude Code in to the Tcules
   organization; carry on with the rest.
7. Finish. Tell me in a short list what was set up and what still needs me, then ask me to open Claude
   Code in the clone folder, accept "trust this folder", and check that the first reply names me and
   summarises the Hub.
```

## What it does not do

- Install software or change security settings. It tells you what's missing.
- Give anyone access. Hub access comes from Yash; GitHub access from Devagya.
- Work for teammates on a GPT account (Mihir today). They use the Hub page in the browser.
