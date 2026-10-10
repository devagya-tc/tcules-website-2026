export const meta = {
  name: 'kit-families',
  description: 'Build the kit component families in parallel worktrees with build → shots → critic-panel loops, then integrate',
  phases: [
    { title: 'Wave A', detail: 'hero, cta, feature, testimonials, logos, form, banner, process-stats, media-split' },
    { title: 'Integrate A', detail: 'merge wave A branches into design/services-showcase' },
    { title: 'Wave B', detail: 'service list, read-down (depend on wave A units)' },
    { title: 'Integrate B', detail: 'merge wave B, full gates and shots' },
  ],
}

const WT = args.worktree, SCRATCH = args.scratch, CONTEXT = args.context
const ALL = args.components
const byId = Object.fromEntries(ALL.map(c => [c.id, c]))
const WAVE_A = ['cmp-hero', 'cmp-cta', 'cmp-feature', 'cmp-testimonials', 'cmp-logos', 'cmp-form', 'cmp-banner', 'cmp-process-stats', 'cmp-media-split']
const WAVE_B = ['cmp-services', 'cmp-readdown']
const MAX_ROUNDS = 4

const DONE = { type: 'object', properties: { branch: { type: 'string' }, worktree: { type: 'string' }, commit: { type: 'string' }, summary: { type: 'string' }, routes: { type: 'array', items: { type: 'string' } }, shots_dir: { type: 'string' }, gates: { type: 'string' }, shared_file_edits: { type: 'array', items: { type: 'string' } } }, required: ['branch', 'worktree', 'commit', 'summary', 'routes', 'shots_dir', 'gates'] }
const CRIT = { type: 'object', properties: { verdict: { type: 'string', enum: ['pass', 'fix'] }, score: { type: 'number' }, problems: { type: 'array', items: { type: 'string' } }, best_parts: { type: 'array', items: { type: 'string' } } }, required: ['verdict', 'score', 'problems'] }

const LENSES = [
  ['beauty', `BEAUTY & COMPOSITION, as a senior art director. Open every crop in the shots dir at 1440 and 390 (Read tool). Compare against the reference crops listed in ${WT}/docs/kit/references.md and ${SCRATCH}/kit/ref-*-sheet.png. Is each variation genuinely beautiful, calm and elegant — negative space, scale contrast, alignment, rhythm, imagery used well — or does it read as a document / wall of text / generic template? Does it feel like a premium product-design studio (Tcules), not a SaaS clone? Does it read black-and-white, or does blue recur as the accent in icons, links and marks (it should)? Does the family's specimen itself read as a designed showcase? Is any arrangement repeated so the page reads "the same rectangle"? Name specific, actionable problems (what, where, how to fix). Score 9+ only if it would hold its own next to the references.`],
  ['rules', `SYSTEM RULES, as a strict reviewer. Work only inside the family's worktree. Follow the checklist in ${WT}/.claude/skills/audit-component/SKILL.md MANUALLY against every unit this family created or changed (do NOT invoke the audit-component skill — it audits the wrong checkout). Read the diff vs design/services-showcase. Check: tiers and imports, Section/Layout/Cluster for all arrangement, no margins, gap-scale steps chosen by what they separate, tokens (surface blocks complete, naming, registered), no hex/raw px in modules, mono uppercase via token, specimen registered and showing every variation on every relevant surface with stress rows; owner rulings (no card boxes, no blue bands, blue as the recurring FOREGROUND accent on icons, links, markers, numerals and small marks — penalise a variation that reads black and white — but never as a ground/band, peridot only ::selection/illustrations, no type on images). Run npm run verify in that worktree. Also accessibility of interactive parts (keyboard, focus, ARIA, reduced motion).`],
  ['fold', `FOLD, RHYTHM & RESPONSIVE. In the family's worktree, run the fold check (npm run fold:check if it exists — read package.json; otherwise measure with Playwright at 1470x830) against the family's routes: every band must fit 830 at 1470. Check 390 and 1024 widths for overflow, awkward wraps, orphaned single words in titles, collapsed or cramped gaps, images too small or cropped badly, illustrations distorted. Check eyebrow→title spacing is the decided rhythm (visual-direction.md §1.2). List each concrete problem with the route, width and element.`],
]

function buildPrompt(c, extra, base) {
  return `${CONTEXT}

You are building ONE component family of the Tcules UI kit.

SETUP (first round only — skip if the worktree already exists): create your own worktree:
  git -C ${WT} worktree add /Users/devagya/tcules-kit-${c.id} -b kit/${c.id} ${base}
  cd there and run: npm ci --prefer-offline --no-audit --no-fund
Work ONLY in /Users/devagya/tcules-kit-${c.id}. Other families build in parallel in their own worktrees; do not touch them or ${WT}.

FAMILY ${c.id}: ${c.title}
BRIEF: ${c.brief}
VARIATIONS TO BUILD (every one must render on the family specimen): ${JSON.stringify(c.variations)}
EXISTING UNITS TO REUSE: ${(c.existing_units || []).join(', ')}
NEW UNITS: ${(c.new_units || []).join(', ') || 'none — compose and extend existing units'}
SPECIMEN ROUTE: ${c.specimen_route}
FILES IT OWNS: ${(c.files || []).join(', ')}
Read first: ${WT}/docs/kit/visual-direction.md (the sections about this family, plus §3, §4, §5, §6, §8.5), ${WT}/docs/kit/references.md (the crops tagged for this family), the photo catalogue public/kit/photos/catalogue.json and the photo registry in src/lib.

Design bar: each variation must be genuinely beautiful — the reviewer will compare it side by side with the reference sites. Use real imagery from the catalogue, the texture where it lifts the composition, considered copy (Tcules: a product design studio; showcase copy may be free and need not match the service fixtures, but must sound like Tcules — precise, calm, no hype). Lay the specimen out as a designed showcase page for the family (a short intro band, then each variation as a titled band, grouped logically), not a dump of boxes.

Shared files (src/patterns/index.ts, src/components/index.ts, src/styles/tokens/index.css, src/app/design/page.tsx SPECIMENS, package.json): edit them as needed, minimal, and list each edit in shared_file_edits — an integrator merges them.
Process overrides (owner): no spec→owner-decision step; write or amend docs/specs/<Unit>.md to match what you build for every new or changed unit.
Gates before committing: npm run verify; npm run build && npm run aria:check; npm run fold:check (if present) on your routes; npm run shots -- <your specimen route name(s)> (starts its own server on a free port; never 3000). Copy the crops to ${SCRATCH}/kit/families/${c.id}/ (keep subfolders). LOOK at every crop at 1440 and 390 yourself and iterate until you are proud of it before committing.
Commit on kit/${c.id}: "kit(${c.id}): <summary>" + blank line + "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>". Do not push.${extra || ''}
Return the schema (shots_dir = ${SCRATCH}/kit/families/${c.id}).`
}

async function safeBuild(c, prompt, label, phaseName) {
  try { return await agent(prompt, { label, phase: phaseName, schema: DONE, effort: 'high' }) } catch (e) {
    log(`${c.id}: builder output failed — recovering from git`)
    return agent(`Worktree /Users/devagya/tcules-kit-${c.id} (branch kit/${c.id}) was just built and committed by another agent. Run git -C /Users/devagya/tcules-kit-${c.id} log --oneline -5 and git show --stat HEAD there. Report as the schema: branch kit/${c.id}, worktree /Users/devagya/tcules-kit-${c.id}, commit = latest short hash, summary = from the commit message and diffstat (under 600 chars, plain text, no backslashes), routes = the src/app/design routes the commits add or change (as URL paths), shots_dir = ${SCRATCH}/kit/families/${c.id}, gates = "see commit", shared_file_edits = shared barrel/index/package.json files in the diffstat.`, { label: `recover:${c.id}`, phase: phaseName, schema: DONE, effort: 'low' })
  }
}

async function runFamily(id, phaseName, base) {
  const c = byId[id]
  if (!c) { log(`no package ${id}`); return null }
  let done = await safeBuild(c, buildPrompt(c, '', base), `build:${id}`, phaseName)
  let history = []
  for (let round = 1; round <= MAX_ROUNDS && done; round++) {
    const crits = (await parallel(LENSES.map(([name, lens]) => () => agent(
      `${CONTEXT}

Review kit family ${id} ("${c.title}") in worktree ${done.worktree} (branch ${done.branch}, commit ${done.commit}). Builder summary: ${done.summary}
Routes: ${done.routes.join(', ')}. Shots: ${done.shots_dir}. The brief and variations it had to deliver: ${c.brief} || ${JSON.stringify(c.variations)}
${history.length ? `Earlier rounds' problems (check they are really fixed): ${JSON.stringify(history.slice(-1)[0])}` : ''}
Read-only: do not edit or commit. If shots are missing or stale, run npm run shots in that worktree yourself.
LENS — ${lens}
Verdict 'pass' only if nothing material is wrong under your lens. Return the schema.`,
      { label: `critic:${id}:${name}:r${round}`, phase: phaseName, schema: CRIT, effort: 'high' })))).filter(Boolean)
    const problems = crits.flatMap(k => k.problems)
    const minScore = Math.min(...crits.map(k => k.score))
    const pass = crits.every(k => k.verdict === 'pass') || (minScore >= 8.5 && problems.length <= 3)
    log(`${id} r${round}: scores ${crits.map(k => k.score).join('/')} — ${pass ? 'PASS' : problems.length + ' problems'}`)
    if (pass) { done.final_scores = crits.map(k => k.score); break }
    history.push(problems)
    if (round === MAX_ROUNDS) { done.final_scores = crits.map(k => k.score); done.unresolved = problems; break }
    done = await safeBuild(c, buildPrompt(c, `\n\nFIX ROUND ${round}. Your worktree and branch already exist with commit ${done.commit}. A three-lens review panel found these problems. Fix every one (or, if one is wrong, argue it in a code comment and in your summary), re-run every gate, re-shoot, look again, and commit (new commit):\n- ${problems.join('\n- ')}`, base), `fix:${id}:r${round}`, phaseName)
  }
  return done
}

async function integrate(results, phaseName) {
  const ok = results.filter(Boolean)
  return agent(`${CONTEXT}

You are the integrator. In ${WT} (branch design/services-showcase), merge these family branches in this order, one at a time, with git merge --no-ff (message "kit: merge <branch>" + blank line + "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"):
${ok.map(r => `- ${r.branch} (worktree ${r.worktree}; shared edits: ${JSON.stringify(r.shared_file_edits || [])})`).join('\n')}
Resolve conflicts carefully: barrels, tokens/index.css imports, SPECIMENS entries and package.json scripts are unions (keep every family's entries, ordered sensibly); for any real code conflict, read both sides and keep both behaviours — never drop a family's work. After each merge run npm run typecheck. After all merges: npm run verify; npm run build && npm run aria:check; npm run fold:check if present; npm run shots (full run) — fix any breakage the merge caused (commit fixes). Then remove each merged family worktree with git worktree remove --force <path> (keep the branches).
Return a short report: merged branches, conflicts and how resolved, gate results, any remaining problems.`, { label: `integrate:${phaseName}`, phase: phaseName, effort: 'high' })
}

phase('Wave A')
const a = await parallel(WAVE_A.map(id => () => runFamily(id, 'Wave A', 'design/services-showcase')))
phase('Integrate A')
const integA = await integrate(a, 'Integrate A')
phase('Wave B')
const b = await parallel(WAVE_B.map(id => () => runFamily(id, 'Wave B', 'design/services-showcase')))
phase('Integrate B')
const integB = await integrate(b, 'Integrate B')

const summary = [...a, ...b].filter(Boolean).map(r => ({ branch: r.branch, scores: r.final_scores, unresolved: r.unresolved || [], routes: r.routes, summary: r.summary }))
return { summary, integA, integB }
