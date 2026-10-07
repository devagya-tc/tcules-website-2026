export const meta = {
  name: 'kit-foundations-3',
  description: 'Finish the kit foundations from the checkpoint (section-head fix round, scroll, texture, gates, brand-docs, blue correction), then run the component families',
  phases: [
    { title: 'Foundations', detail: 'one at a time: build, verify, shots, critique, fix' },
    { title: 'Families', detail: 'the kit-families workflow, run inline' },
  ],
}
const WT = args.worktree, SCRATCH = args.scratch, CONTEXT = args.context
const AUDIT_NOTE = `To audit, do NOT invoke the /audit-component skill (it audits the wrong checkout). Instead read ${WT}/.claude/skills/audit-component/SKILL.md and apply its checklist yourself to the files in ${WT}.`
const CRIT = { type: 'object', properties: { verdict: { type: 'string', enum: ['pass', 'fix'] }, score: { type: 'number' }, problems: { type: 'array', items: { type: 'string' } } }, required: ['verdict', 'score', 'problems'] }
const DONE = { type: 'object', properties: { commit: { type: 'string' }, summary: { type: 'string' }, gates: { type: 'string' } }, required: ['commit', 'summary', 'gates'] }

async function build(f, extra) {
  const p = `${CONTEXT}

You are landing ONE foundation package of the Tcules UI kit, directly on branch design/services-showcase in ${WT} (you are the only agent writing to this checkout). Governing doc: ${WT}/docs/kit/visual-direction.md — read the sections your brief cites, plus §3, §4 and §8.5. References: ${WT}/docs/kit/references.md.

PACKAGE ${f.id}: ${f.title}
BRIEF: ${f.brief}
${extra || ''}

No spec→owner-decision step; amend docs/specs/* to match what you build. Brand-guide HTML in docs/brand/ is NOT edited; record brand changes in docs/kit/brand-amendments.md. ${AUDIT_NOTE}
Gates before committing: npm run verify; npm run build && npm run aria:check; npm run shots -- <every specimen you touched> (own server on a free port; never 3000). Save crops under ${SCRATCH}/kit/fdn/${f.id}/. Look at the crops at 1440 and 390 yourself and fix what looks wrong. Commit only files your package touched (never docs/kit/run/): "kit(${f.id}): <summary>" + blank line + "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>". Do not push.
Return the schema; keep summary under 800 characters, plain text, no backslashes.`
  try { return await agent(p, { label: `build:${f.id}`, phase: 'Foundations', schema: DONE, effort: 'high' }) } catch (e) {
    log(`${f.id}: builder output failed — recovering from git`)
    return agent(`In ${WT} run git log --oneline -5. Report the latest ${f.id} commit as the schema (summary under 600 chars from the commit message, gates "see commit").`, { label: `recover:${f.id}`, phase: 'Foundations', schema: DONE, effort: 'low' })
  }
}

phase('Foundations')
const results = []
for (const f of args.foundations) {
  let done
  if (f.resume) done = await build(f, `\nRESUME AN INTERRUPTED FIX ROUND. Commit ${f.resume} landed this package; a fix round was then cut off. Its uncommitted edits are still in the working tree (git status / git diff). Read them, finish what they were doing (check them against the brief and the doc), discard anything half-done that is wrong, run every gate and commit.`)
  else if (f.already) done = { commit: f.already, summary: f.title, gates: 'see commit' }
  else done = await build(f)
  for (let round = 1; round <= 3 && done; round++) {
    let crit = null
    try {
      crit = await agent(`${CONTEXT}

Review foundation package ${f.id} ("${f.title}") on design/services-showcase in ${WT} (latest commit ${done.commit}; summary: ${done.summary}). Brief it had to meet: ${f.brief}
Check: (1) it meets the brief and ${WT}/docs/kit/visual-direction.md; (2) CLAUDE.md rules — ${AUDIT_NOTE} Apply it to every unit the package changed (git log/diff for ${f.id} commits); (3) visually — the crops under ${SCRATCH}/kit/fdn/${f.id}/ (run npm run shots for touched specimens if missing): cramped spacing, misalignment, regressions, anything worse than before, at 1440 and 390; (4) run npm run verify yourself. Read-only.
Score 0-10. Verdict 'pass' only if nothing material is wrong. Keep each problem to one or two sentences.`, { label: `critic:${f.id}:r${round}`, phase: 'Foundations', schema: CRIT, effort: 'high' })
    } catch (e) { log(`${f.id}: critic failed (${String(e).slice(0, 60)})`) }
    if (!crit || crit.verdict === 'pass') { log(`${f.id}: passed (round ${round}, score ${crit && crit.score})`); break }
    log(`${f.id}: round ${round} — ${crit.problems.length} problems, fixing`)
    done = await build(f, `\nFIX ROUND. Earlier commit ${done.commit} is on the branch. A reviewer found these problems — fix every one, re-run the gates, commit again (new commit):\n- ${crit.problems.join('\n- ')}`)
  }
  results.push({ id: f.id, commit: done && done.commit })
}

phase('Families')
let families = null
if (args.families) families = await workflow({ scriptPath: args.families.script }, args.families.args)
return { results, families }
