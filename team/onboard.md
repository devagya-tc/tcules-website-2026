# Onboarding: one prompt, Claude does the rest

Open **Claude Code** (the desktop app's **Code** tab, or the terminal) in any folder, paste the prompt
below, and answer its questions. It checks your tools, clones the repo, sets who you are, your role's
guardrails and your commit email, and checks GitHub access. You only do what Claude can't: say who you
are, sign in to GitHub in the browser when asked, add an SSH key if your network needs one, and accept
"trust this folder" when you reopen it.

Already have a clone? Open Claude Code in it and type `/onboard`: it runs the same steps from step 3.

```markdown
Set me up for the Tcules website repo. Work through these steps in order, tell me in one plain line
what you're doing at each (I may not know git), and only stop to ask me when a step says so.

1. Tools. Check `git --version`, `node --version` (needs 20.11.1 or later), `npm --version` and
   `gh --version`.
   - If node or npm is missing or too old, tell me to install Node LTS from nodejs.org and stop until
     I say done. If node is installed but not found (`where node` on Windows, `which node`
     elsewhere), say so: the repo's hooks call `node` from PATH.
   - If gh is missing, tell me to install GitHub CLI from cli.github.com and stop until I say done.
   - Run `gh auth status`. If I'm not signed in, run `gh auth login --web --git-protocol ssh` and tell
     me to finish the sign-in in the browser it opens; wait for me.
2. Clone. Ask me where to put the repo (suggest `~/code/tcules-website-2026`). If that folder already
   holds a clone of devagya-tc/tcules-website-2026, use it and pull. Otherwise:
   - Try `git clone https://github.com/devagya-tc/tcules-website-2026.git <folder>`.
   - If that fails on a network or security error, use SSH over port 443: if `~/.ssh/id_ed25519` does
     not exist, create it with `ssh-keygen -t ed25519 -N "" -f ~/.ssh/id_ed25519`, add a `Host github.com`
     entry to `~/.ssh/config` with `HostName ssh.github.com`, `Port 443`, `User git`,
     `IdentityFile ~/.ssh/id_ed25519` (append, never overwrite the file), and add the key with
     `gh ssh-key add ~/.ssh/id_ed25519.pub --title "<my name>'s laptop"` (if gh lacks the scope, show
     me the public key and ask me to add it at https://github.com/settings/keys). Then test with
     `ssh -T git@github.com` and clone `git@github.com:devagya-tc/tcules-website-2026.git`.
     On Windows, also set `git config --global core.sshCommand C:/Windows/System32/OpenSSH/ssh.exe`.
   - Never change system security settings; if both ways fail, tell me what failed and stop.
3. Who I am. Read `team/members.json` in the clone. Show me the names and ask which one I am. Do not
   guess from my Claude account or my computer's user name: accounts are shared.
4. My role's settings, inside the clone. Both files below are git-ignored; check with
   `git check-ignore` and stop if they aren't.
   - `.claude/settings.local.json`: start from the template for my role in `team/templates/`
     (`settings.local.designer.json` for designer and gtm, `settings.local.engineer.json` for
     engineer, `settings.local.owner.json` for owner), set `TCULES_MEMBER` and `TCULES_ROLE` to mine.
     If the file already exists, merge: keep its other entries, add the template's.
   - `CLAUDE.local.md`: from `team/templates/CLAUDE.local.md`, its `<Name>`, `<role>` and
     `<member-id>` replaced with mine exactly as `team/members.json` spells them.
5. Commit author, in this clone only: `git config user.name "<my name>"` and my GitHub noreply email:
   read my username and id with `gh api user --jq '.login, .id'` and set
   `git config user.email "<id>+<login>@users.noreply.github.com"`. Never put a work email here:
   the repo is public.
6. Install and check. Run `npm ci` in the clone (the checks need it). Then check I can reach the
   repo: `gh repo view devagya-tc/tcules-website-2026 --json viewerPermission`. Anything less than
   WRITE means I can't open pull requests yet: tell me to ask Devagya for access, and carry on.
7. Finish. Tell me in a short list what was set up and what still needs me, then ask me to open Claude
   Code in the clone folder, accept "trust this folder", and check that the first reply names me and
   says what's happening on GitHub.
```

## What it does not do

- Install software or change security settings. It tells you what's missing.
- Give anyone access. Repository access comes from Devagya.
- Work for teammates on a GPT account (Mihir today). GitHub is shared context for them too: pull
  requests and their handoff comments read the same in the browser.
