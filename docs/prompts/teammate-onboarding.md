# Teammate onboarding prompt

What a new teammate pastes into a **fresh Claude Code session on their own machine** to clone this
repo, prove it runs, and get briefed on it. It lives here so it stays in step with the repo it
describes — if you change the scripts, the commands or `ONBOARDING.md`, change this too.

## Before you send it

1. **Add them as a collaborator** on `devagya-tc/tcules-website-2026` (the repo is private) and tell
   them to accept the invite. Until they do, their clone returns a bare **404** — GitHub does not
   distinguish "no access" from "does not exist" — and the prompt calls that case out by name so
   nobody wastes turns hunting for a typo in the URL.
2. **Push everything the prompt promises**, and note that not all of it degrades gracefully.
   A missing *document* is reported as "not present in this clone" and the brief just gets thinner.
   A missing *script* **errors**: the prompt tells the teammate to run `npm run verify` and to report
   a failure verbatim, so if `package.json` and `scripts/` are not pushed they get
   `npm ERR! Missing script: "verify"` and reasonably report it as a broken repo. Check all of these
   are on `main` before you send it:

   ```
   package.json                       the verify / design:brief / specimens:check / aria:check scripts
   scripts/tokens-check.mjs           }
   scripts/classes-check.mjs          }
   scripts/specimens-check.mjs        }  verify calls these by path
   scripts/design-brief.mjs           }
   scripts/aria-check.mjs             }  (this one is not in verify — it needs a build)
   ONBOARDING.md                      the brief's best source
   docs/                              component-spec-template.md, prompts/, specs/Button.md
   .claude/commands/build-from-spec.md
   .claude/skills/audit-component/SKILL.md
   ```

   `git ls-files` is the check, not `ls` — everything above can exist in your working tree and still
   not be on the branch they are cloning.
3. **Check they have Node >= 20.11.1** and either the GitHub CLI or an SSH key on their GitHub
   account. The prompt can diagnose both and can install neither.
4. **Claude Design access** is a separate prerequisite for the spec half of the workflow.

One line worth adding to your message: *"you'll get a collaborator invite from devagya-tc — accept it
first."*

---

## The prompt

````
You are onboarding me onto an existing, private, strict-rules codebase. Your job in this session is
to CLONE it, VERIFY it runs, and BRIEF me. Your job is NOT to write, fix, refactor, format or
"improve" any code. Read first, act narrowly, then explain.

Repo:           https://github.com/devagya-tc/tcules-website-2026.git  (PRIVATE)
Owner/name:     devagya-tc/tcules-website-2026
Branch:         main
Requirements:   git, Node >= 20.11.1, npm

──────────────────────────────────────────────────────────────────────────
POSTURE — read this before you do anything
──────────────────────────────────────────────────────────────────────────
This repo is a deliberate rebuild with hard architectural rules, written down in CLAUDE.md at its
root: a one-way import ladder between tiers, a three-layer token system, and three primitives that
own every arrangement. The rules ARE the product. They will look over-constrained relative to your
defaults. They are not.

Do not modernise, restructure, upgrade dependencies, reformat or tidy anything in this session —
including things you are confident are wrong. If you think something is wrong, note it in one line
at the end of your brief and leave the file alone.

Do not create files. Do not run `git commit`, `git push`, `git checkout -b`, `npm install <pkg>`,
`npm audit fix`, or `npm run format`. The only writes you may make are the clone itself and the
`node_modules` / `.next` directories that install and dev create.

──────────────────────────────────────────────────────────────────────────
STEP 0 — ask me where to clone, then STOP
──────────────────────────────────────────────────────────────────────────
Do not choose a directory silently. Ask me one question and wait:

  "Where should I clone this? Default: ~/dev/tcules-website-2026 — reply 'default', or give me an
   absolute path."

When I answer, resolve the path and check it:
  · target exists and is NOT empty → STOP. Tell me what is in it and ask for another path. Never
    clone into, merge with, or delete an existing directory's contents.
  · parent does not exist → say so and ask before creating it.

──────────────────────────────────────────────────────────────────────────
STEP 1 — preflight, reported as a table with real output
──────────────────────────────────────────────────────────────────────────
  git --version
  node -v
  npm -v
  gh --version          (may not be installed — note it and continue)
  gh auth status        (only if gh exists)

Node below 20.11.1 → STOP before installing. Tell me my version and how to fix it on MY platform
(nvm/fnm/asdf if I have one, else the nodejs.org installer, `brew install node@22`, or
winget/nvm-windows). Do not install a version manager for me and do not edit my shell profile.
20.11.1 or newer → proceed, and say which you found; a newer major is fine.

Detect my platform (`uname -s`, or note if you are on Windows) and use commands that work there.
Pass the repo path explicitly to each command (`git -C <dir>`, `npm --prefix <dir>`) rather than
relying on your shell's working directory persisting.

──────────────────────────────────────────────────────────────────────────
STEP 2 — clone, using this ladder in order
──────────────────────────────────────────────────────────────────────────
The repo is PRIVATE, so an unauthenticated HTTPS clone WILL fail. Tell me which rung you used.

  1. gh installed AND `gh auth status` shows a logged-in github.com account:
         gh repo clone devagya-tc/tcules-website-2026 <TARGET_DIR>

  2. gh installed but NOT authenticated: do not try to authenticate on my behalf. Tell me to run
     the interactive login myself, in this session, using Claude Code's bash-mode prefix — I type,
     on its own line:
         ! gh auth login
     (GitHub.com → HTTPS → authenticate in browser). Then say "tell me when that's done" and WAIT.
     When I confirm, re-run `gh auth status` yourself and go to rung 1.

  3. No gh, but a working SSH key. Test it:
         ssh -T git@github.com
     Success looks like "Hi <user>! You've successfully authenticated" — this command exits
     non-zero even on success, so judge by the message, not the exit code. Then:
         git clone git@github.com:devagya-tc/tcules-website-2026.git <TARGET_DIR>

  4. Neither works: STOP and explain my two options — install the GitHub CLI (`brew install gh` /
     `winget install GitHub.cli` / cli.github.com) and run `! gh auth login`, or add an SSH key at
     github.com/settings/keys. Then wait for me.

NEVER ask me to paste a personal access token, and do not accept one if I offer it. If I paste one
anyway, tell me to revoke it at github.com/settings/tokens and use gh or SSH instead. Do not write
credentials into any file, git remote URL, or environment variable.

IF THE CLONE 404s WHILE I AM AUTHENTICATED: the URL is not the problem. Do not hunt for a typo and
do not try other spellings. GitHub returns 404, not 403, for a private repo an account cannot see.
The cause is almost always that I have not been added as a collaborator, or have not accepted the
invitation. Tell me to check github.com/notifications or my email for the invite from devagya-tc.
If `gh auth status` shows a different account than the one invited, say so — that is the other
common cause.

Then confirm and show me:
  git -C <TARGET_DIR> remote -v
  git -C <TARGET_DIR> branch --show-current      (expect: main)
  git -C <TARGET_DIR> log --oneline -5

──────────────────────────────────────────────────────────────────────────
STEP 3 — install, verify, run. Report the truth.
──────────────────────────────────────────────────────────────────────────
     npm ci --prefix <TARGET_DIR>
There is a committed package-lock.json and only three runtime dependencies, so this is quick. If
`npm ci` fails on a lockfile mismatch, say so, fall back to `npm install`, and tell me the lockfile
may need attention. Do not delete package-lock.json.

Then, from the repo root, run this once and paste the real output:
     npm run verify
It chains seven checks — lint, typecheck, tokens:check, classes:check, specimens:check, design:check, photos:check.
All six pass on a clean clone of main. If any fails: DO NOT FIX IT. Show me the failure verbatim, say in one
sentence what it looks like, and note whether it looks pre-existing or environmental. A red check on
a fresh clone is information I need, not a task for you.

Then start the dev server and tell me the URL it actually printed:
     npm run dev
  · Read the printed URL rather than assuming 3000. If it did not start, try
    `npm run dev -- -p 3001` and tell me.
  · `next dev` manages a marked block at the bottom of CLAUDE.md, between
    <!-- BEGIN:nextjs-agent-rules --> and <!-- END:nextjs-agent-rules -->. If `git status` shows
    CLAUDE.md modified after running dev, that is EXPECTED. Do not revert it, do not stage it, do
    not "clean" it — deleting it only makes next dev write it again.
  · Leave it running if you can, and tell me how to stop it.

──────────────────────────────────────────────────────────────────────────
STEP 4 — READ before you summarise. Never brief me from memory or one file.
──────────────────────────────────────────────────────────────────────────
Read these in full, in this order, before writing a line of the brief:

  1. CLAUDE.md                       the law: tiers, primitives, tokens, design quality
  2. ONBOARDING.md                   the orientation guide, written for exactly this moment
  3. src/styles/tokens/index.css     the token system's own statement of its rules
  4. src/components/index.ts         the tier-1 barrel — the authoritative component list
  5. src/app/design/page.tsx         the SPECIMENS index — the authoritative specimen list
  6. eslint.config.mjs               the tier boundary, argued in its header

Then LIST and read what is actually there — do not assume from this prompt:
  · ls .claude/commands/  and  ls .claude/skills/     the project's commands and skills
  · ls docs/ docs/prompts/ docs/specs/                the spec contract and any written specs
  · package.json                                      the scripts and the engines floor
  · src/lib/routes.ts, src/content/index.ts           the route registry and the CMS seam

Degrade gracefully: if a path does not exist, say "not present in this clone" and carry on. Do not
invent its contents and do not create it.

Grounding rules:
  · Every factual claim must come from a file you read in THIS session.
  · Where a doc and the code disagree, the CODE wins — report the discrepancy in one line.
  · The component list comes from the barrel and the specimen list from src/app/design/page.tsx,
    not from prose. Those lists change faster than the documents describing them.
  · Describe a command or skill from the file you read, never from its name.

──────────────────────────────────────────────────────────────────────────
STEP 5 — the brief you write for me
──────────────────────────────────────────────────────────────────────────
Markdown in my terminal, 600–900 words, with exactly these headings:

  What this project is           one paragraph
  The tier model                 the one-way ladder app → templates → patterns → components →
                                 lib/styles, what lives in each, and what lint blocks — upward AND
                                 sideways. Say why it exists: the previous codebase grew 111 bespoke
                                 section folders because nothing stopped a block importing whatever
                                 was nearest
  Layout is the primitives       Section / Layout / Cluster, one line each, plus the rules that
                                 bite: no hand-rolled grid or flex for arrangement, children never
                                 set their own outer spacing, neither gap axis has a default,
                                 non-uniform rhythm comes from nesting
  The token model                ONE paragraph: the three layers, the nine named gap steps as the
                                 only answer to "how far apart", the deliberate absence of a colour
                                 usage layer and why, the four surfaces, and the rule that nothing
                                 outside tokens/ holds a value
  What exists today              the components and patterns actually in the barrels, the templates
                                 tier as it actually stands, and the content seam
  The proving ground             what src/app/design is for, the rule that nothing gets a page route
                                 before it has a design route, the specimen URLs that exist, and
                                 that the index is registered by hand and checked
  How a component gets made      the two-surface workflow: `npm run design:brief` → paste into
                                 Claude Design → a spec at docs/specs/<Component>.md → back here,
                                 `/build-from-spec docs/specs/<Component>.md`, then
                                 `/audit-component <Name>`. Describe each from the file you read,
                                 and say plainly if it is not in this clone. Then the shape: a
                                 component is a folder with a .tsx, a .module.css and an index.ts;
                                 its tokens are a file in src/styles/tokens/components/ registered
                                 in tokens/index.css; it is re-exported from the tier barrel; and it
                                 gets a design/ route registered in SPECIMENS before it goes near a
                                 page
  Verifying your work            the five checks in `npm run verify` and the result you actually
                                 got, plus what no check catches
  Things I should know           at most 5 bullets. Include the CLAUDE.md nextjs block, and any real
                                 discrepancy you found. No filler

Then end with exactly this, filled in with real values:

  Your clone:   <absolute path>
  Branch:       main (at commit <short sha>)
  Dev server:   <the URL Next printed>  ·  design index at <that URL>/design
  Verify:       <the real result of npm run verify>

  Commands available to you:
    npm run dev             start the dev server
    npm run verify          the six checks, chained
    npm run design:brief    print the spec brief to paste into Claude Design
    npm run build           production build
    npm run format          prettier — writes files, so run it deliberately
  In Claude Code (whatever `ls .claude/commands .claude/skills` actually showed):
    /build-from-spec <path to spec>
    /audit-component <Name>
  Start here:
    open <URL>/design, then read CLAUDE.md top to bottom before you build anything

Stop there. Do not propose improvements, do not open a task list, and do not begin any coding work.
Wait for me.
````

---

## Short variant — already cloned, just wants the brief

````
I have devagya-tc/tcules-website-2026 cloned here. Orient me — do not write, fix or refactor any
code, and do not create files. Read these in full first: CLAUDE.md, ONBOARDING.md,
src/styles/tokens/index.css, src/components/index.ts, src/app/design/page.tsx, eslint.config.mjs
(say "not present" for anything missing rather than guessing), then list .claude/commands/,
.claude/skills/ and docs/ and read what is there. Run `npm run verify` once and report the real
output. Then brief me in 600–900 words: what the project is, the one-way tier ladder and what lint
enforces (upward and sideways), the three layout primitives and the rules that bite, the token model
in one paragraph, what components and specimens actually exist (from the barrels and
src/app/design/page.tsx, not from prose), and how a component gets made here — `npm run design:brief`
into Claude Design, a spec at docs/specs/, then /build-from-spec and /audit-component. End with the
commands available to me. Note: if `git status` shows CLAUDE.md modified, that is the block `next
dev` manages — leave it alone.
````
