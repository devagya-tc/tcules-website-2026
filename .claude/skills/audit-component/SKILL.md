---
name: audit-component
description: Audit one component, pattern or template against the CLAUDE.md rules and report every violation with file:line. Read-only — it reports, it does not fix.
when_to_use: Use after building or changing a component, before committing CSS or a new tier folder, or when reviewing a component someone else wrote. Also use when asked whether something follows the token system, the tier rules or the layout-primitive rules.
argument-hint: <Name> [more names] [/absolute/path/to/worktree] — e.g. Card, "BlockCard ListCard", "PageHero /Users/me/repo-wt"
allowed-tools: Read, Grep, Glob, Bash(npm run:*), Bash(npm --prefix:*), Bash(node scripts/:*), Bash(git status:*), Bash(git diff:*), Bash(git -C:*), Bash(grep:*), Bash(rg:*), Bash(ls:*), Bash(sed:*), Bash(find:*), Bash(perl:*)
model: inherit
context: fork
---

# Component acceptance audit

Arguments, verbatim: **$ARGUMENTS**

## Resolve the root and the targets first

Read the whole argument string above. Do not use only its first word: a multi-word request such as
"BlockCard and TableOfContents" or "PageHero in the worktree /Users/…" has to be read as a sentence.

1. **Root.** If the arguments contain an absolute path to a directory holding a `package.json` and a
   `src/` (a git worktree of this repo, e.g. `/Users/devagya/tcules-kit-cmp-hero`), that directory
   is **ROOT**. Otherwise ROOT is the current directory. Every path in this audit is under ROOT, and
   so is every command: use `npm --prefix ROOT run <script>`, `git -C ROOT …`, and absolute paths
   for Read, Grep and Glob. Never audit the current directory when the arguments named another root.
2. **Targets.** Every word or phrase in the arguments that names a folder under
   `ROOT/src/components/`, `ROOT/src/patterns/` or `ROOT/src/templates/`, or a path under
   `ROOT/src/`, is a target. Ignore filler words like "and", "in", "the", "worktree" or "audit". Audit
   each target and give each one its own report block.
3. **Nothing resolved.** If the arguments are non-empty but name no target under ROOT, **stop**. Do
   not fall back to the working tree. Report one line, `audit-component: no target resolved from
   "<arguments>" under <ROOT>. Name a component, pattern or template.`, and end.
4. **Empty arguments.** Only when the arguments are completely empty, audit everything changed in
   ROOT's working tree: `git -C ROOT status --porcelain` plus `git -C ROOT diff --name-only`.

In the commands below, `$1` stands for each resolved target in turn, and relative paths are under ROOT.

Read `CLAUDE.md` and `src/styles/tokens/index.css` first; they are the rules being audited against.
`src/components/Button/**` + `src/styles/tokens/components/button.css` are the reference for what a
passing component looks like, and `docs/specs/Button.md` is the spec that describes it.

**Read-only. Report, do not fix.** Every finding gets `path:line`, the rule it breaks, and a
one-line remedy. No finding without a line number — if you cannot cite a line, it is an observation,
not a violation, and it goes in the Observations section.

## Before you grep: this repo is comment-shaped

Comment density is the house style here. Prose in these files names other components, quotes pixel
values, and discusses colours constantly — `button.css` alone explains 8/4/4 across a paragraph, and
`Layout.module.css` writes "192 — small tiles" beside a token. **A grep that does not strip comments
will report violations that are prose, and four such greps will teach the reader to ignore this
audit entirely.**

So strip comments first, every time. For any check below that says "grep", use:

```bash
# CSS: drop /* … */ then search
perl -0pe 's{/\*.*?\*/}{}gs' <file> | grep -nE '<pattern>'
# TSX: drop /* … */ and // …
perl -0pe 's{/\*.*?\*/}{}gs; s{//[^\n]*}{}g' <file> | grep -nE '<pattern>'
```

Line numbers from a stripped stream can drift. When you have a hit, open the file and confirm the
real line before you report it.

## Locate the target

```bash
ls -d src/components/$1 src/patterns/$1 src/templates/$1 2>/dev/null
ls src/styles/tokens/components/ ; ls src/app/design/
npm run design:brief | grep -A2 'prefixes already taken'
```

Establish: the tier folder, its `*.tsx` / `*.module.css` / `index.ts`, the component token file and
the `--{abbrev}-*` prefix its module reads, the design route, and the `SPECIMENS` entry.

## Documented exceptions — check these before reporting anything against them

The repo has argued exceptions. Reporting one as a violation is a false positive, and the argument
is in the file:

- **`Prose`** styles markup it did not write — a CMS body field arrives as an opaque HTML string —
  so it uses **element selectors** and **19 margins**, and it reads `--gap-*` and `--text-*`
  directly rather than wrapping them in `--prose-*`. All of it is scoped inside `.prose`, and
  `Prose.module.css`'s header states the case. Do not report margins or element selectors in Prose.
  Its `em`-relative font sizes are also deliberate.
- **`Layout` and `Cluster` ARE the display.** `display: grid` / `display: flex` in those two is the
  component, not a hand-rolled arrangement.
- **A control laying out its own inside** — `Button`'s `inline-flex` centring a label and a glyph,
  and `SiteNav`'s equivalents — is legitimate and must carry a comment saying so. Report it only if
  the comment is missing or if it is arranging *siblings*.
- **`icon.css` and `layout.css` declare no surface blocks at all.** `icon.css` argues why in its
  header (every glyph is `currentColor`, so four identical blocks would assert a variation that does
  not exist); `layout.css` holds only track geometry and does not say so — which is itself a small
  finding if you are auditing that file, not a licence to copy the silence.
- **`src/app/design/_specimen/`** is the one sanctioned place a component may be defined under
  `src/app/design/**`. It is the harness; it is never the thing under test.
- **`reset.css` and `globals.css` are the shell, not components** — `reset.css` carries an argued
  literal (`scroll-padding-block-start: 5rem`) and is outside the raw-distance rule.

If the component under audit needs a NEW exception, that is a finding of its own: the exception has
to be argued in the file and, if it changes a rule, in `CLAUDE.md`.

## The checks

Report each as `n. PASS` / `n. FAIL path:line — finding` / `n. N/A — why` / `n. EXCEPTION — the
argument, and where it is stated`.

### Token layer
1. **Unresolved reads** — every `var(--…)` the module reads is declared. `npm run tokens:check`
   proves this; run it.
2. **Registered layer** — the token file is `@import`ed in `tokens/index.css`. `tokens:check` now
   asserts this too; confirm it ran.
3. **Surface self-containment** — all four `[data-surface="…"]` blocks declare the identical set.
   `tokens:check` proves it. If the file has **no** surface blocks, judge whether it should: the
   checker skips such files, so a component that needs per-surface colour and declares it in
   `:root` passes silently.
4. **State token discipline** — every state token exists on all four surfaces, and no state token
   exists whose value never moves on any surface.
5. **Register purity** — `bg`/`fg` on controls, `ground`/`ink` on surfaces. Never mixed.
6. **Step vocabulary** — distances take gap-scale role names; component sizes take t-shirt names.
7. **Space-ramp reaches are annotated** — every `var(--space-N)` in the token file carries a comment
   naming the optical correction it makes.
8. **No cross-component token reads.** The real prefixes are `--btn- --sec- --lay- --icn- --prose-
   --nav- --foot- --logo-`; take the live list from `npm run design:brief` rather than trusting this
   line. Strip comments, and exclude the target's own prefix:
   ```bash
   perl -0pe 's{/\*.*?\*/}{}gs' <files> | grep -nE -- '--(btn|sec|lay|icn|prose|nav|foot|logo)-'
   ```
   Only the component's own prefix, the `--gap-*` / `--text-*` usage tokens and `primitives.css`
   names may appear. Note the sanctioned direction: a component may read a **primitive**
   (`--icon-size-16`) that shares a name with another component's abbreviation (`--icn-*`) — those
   are different tokens and `icon.css` explains the split.
9. **Rendered hover ≠ rendered pressed** on every surface. Where a single token holds the same value
   in both, that is legal only if another part carries the difference and a comment says which.
   Report a missing comment, not the shared value.

### Module CSS
10. **No literal colour** — `tokens:check` proves no **hex**. An `rgb()`, `hsl()` or colour
    keyword passes it; grep for those yourself.
11. **No raw distance** — `tokens:check` now proves this for `*.module.css` (at-rule preludes and
    comments exempt). Do **not** flag `%`, `ch`, `fr`, `em`, `auto`, `0`, or `calc()` on token
    values: `Section.module.css`'s `max(var(--sec-gutter), (100% - var(--sec-container)) / 2)` is the
    single most load-bearing declaration in the repo and a `%` ban would fail it.
12. **No restated type** — no bare `font-family`, `font-size`, `font-weight` or `line-height`;
    `font: var(--text-*)` + `letter-spacing: var(--text-*-tracking)` only.
13. **No child margins for outer spacing.** Every `margin` hit must be an optical correction inside
    the component's own box, with a comment (`Button`'s `.label { margin-inline: … }` and
    `.labelInk`'s negative end-margin are the sanctioned shape). Prose is exempt — see above.
14. **No hand-rolled arrangement** — see the exceptions list. A comment is required where it is
    legitimate; `SiteNav.module.css` is the model for how to argue it.
15. **`Section` not overridden from outside** — no `padding-inline`, `max-width`, `background` or
    `color` applied to a `Section` through `className`.
16. **`data-surface` read, not written** — only `Section` and a band-owning pattern set it.

### TSX
17. **Tier boundary, upward and into content** — no import from a higher tier and none from
    `@/content`. `npm run lint` proves this.
18. **Tier boundary, sideways** — no import of a sibling in the same tier, by alias or by `../`
    path. Lint now proves this too, but check the *idiom* rather than the rule: a sibling should
    arrive as a `ReactNode` prop, as `Button` takes `icon`. A component that takes no such prop and
    needs a sibling is mis-tiered and belongs in `src/patterns/**`.
19. **No new dependency** — `git diff package.json`; runtime deps stay `next`, `react`, `react-dom`.
20. **No inline `style` object** for anything a class can express. A custom property computed from a
    prop is the exception (`Layout`'s `columnsToVars`) and requires a `JS_INJECTED` entry in
    `scripts/tokens-check.mjs`.
21. **Routes named once** — no path literal; everything from `@/lib/routes`.
22. **Accessible name guaranteed by the type** where the visual cannot carry it — the icon-only
    `Button` variant requiring `'aria-label': string` is the precedent.
23. **ARIA idrefs resolve.** Every `aria-controls` / `aria-labelledby` / `aria-describedby` /
    `htmlFor` must name an element that is always rendered — or the attribute must be omitted when
    its target is absent. `SiteNav` is the precedent:
    `aria-controls={isOpen ? panelId(item.key) : undefined}`. This is the defect class that survives
    every other check: a rehearsal build shipped 95 dangling idrefs on one specimen page with lint,
    typecheck, tokens:check and next build all clean. If a build exists, prove it mechanically:
    ```bash
    npm run build && npm run aria:check
    ```
    If you cannot build, read every idref and say for each whether its target is unconditional.
24. **`'use client'` only where it is earned** — state, an effect, a ref or a DOM handler. Only
    `SiteNav` carries it today; `SiteFooter` is deliberately a server component. A presentational
    component must not carry it.

### Wiring
25. **Barrel** — the folder `index.ts` and the tier barrel export the component and every exported
    type, and the barrel's header comment gained a sentence classifying it.
26. **Proving ground** — `src/app/design/<kebab>/page.tsx` exists, renders every arrangement on all
    four surfaces, and the component is registered in `SPECIMENS`. `npm run specimens:check` proves
    registration. Also confirm the page uses only classes that exist:
    ```bash
    grep -oE '^\.[a-zA-Z]+' src/app/design/_specimen/specimen.module.css
    ```
    A `specimenStyles.label` that does not exist is `undefined`, renders unstyled and passes every
    check — this exact bug survived a full rehearsal build.
27. **Spec agreement** — if `docs/specs/<Name>.md` exists, its `Status`, its variant/state matrix,
    its per-surface colour table **and its § 14 do's/don'ts** must match what was built. Run § 14's
    greps: they are written to be runnable, so a Don't that the module now breaks is a finding
    whether or not a change log elsewhere in the spec mentions it. Report each divergence as either
    a build that missed the spec or a spec that was never updated — and say which. If no spec
    exists, say so.
28. **Comment density** — the component and its token file explain the decisions a reader would
    otherwise re-litigate: why this variant exists, why this value is optical, where rule order is
    load-bearing, what a measured number was measured against. Sparse is a finding in this repo, not
    a virtue.

## Then run the checks

```bash
npm --prefix ROOT run verify
```

Paste real output. Note plainly which of your findings no check covers.

## Report format

```
AUDIT — <Name>  ·  <tier>  ·  <n> violations, <m> observations

VIOLATIONS
  1. src/patterns/Card/Card.module.css:42  raw distance `padding: 12px`
     → no gap step is 12; either --gap-tight (8) or --gap-text (16), or it is an optical
       correction and belongs in the token file with a comment saying what it corrects
  …

EXCEPTIONS CLAIMED (legitimate, and where the argument lives)
  …

OBSERVATIONS (judgement, not rule breaks)
  …

CHECKS
  npm run verify   <verdict, per check>
  npm run aria:check   <verdict, or "not run — no build">

WHAT THIS AUDIT CANNOT SEE
  a token name that exists but is the wrong step · whether the composition is any good ·
  whether the spec's design intent was met

VERDICT   ACCEPT | ACCEPT WITH FIXES | REJECT — <one line>
```

Say `ACCEPT` only when there are zero violations and every check passes.
