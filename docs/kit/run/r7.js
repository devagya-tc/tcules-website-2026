export const meta = {
  name: 'r7-followups-lean',
  description: '7 Oct follow-ups, token-lean: 10 component packages in parallel worktrees (build → one critic → at most one fix), merged as they pass; contact sheet for Friday. Buttons already merged (16ed5ac).',
  phases: [
    { title: 'Packages', detail: 'logos, hero, testimonials, video, statement, cards, form, how-we-work, facts, rules' },
    { title: 'Integrate', detail: 'serial merges into design/services-showcase' },
    { title: 'Pages', detail: 'optional (args.pages): apply to the six service pages' },
    { title: 'Sheet', detail: 'gates and the Friday contact sheet' },
  ],
}

/*
 * Token-lean rewrite of r7-followups (8 Oct). Savings vs the first script:
 *  - one combined critic per package (beauty + fold + responsive) instead of three lenses; the rules
 *    lens is replaced by `npm run verify` plus the builder applying the audit checklist to its own diff
 *  - one review round and at most one fix, instead of two of each
 *  - effort by package: high only where beauty is the point; medium elsewhere; merges and the sheet on
 *    a smaller model at low effort
 *  - every prompt tells the agent to read only its own section of the docs and to tail/grep command
 *    output, so each context window stays small
 *  - the service-page application is opt-in (args.pages), since Friday reviews components
 */

const WT = '/Users/devagya/tcules-services-showcase'
const SCRATCH = args.scratch
const DOC = `${WT}/docs/kit/review-7-oct.md`
const ONLY = args.only || null

const LEAN = `TOKEN BUDGET IS TIGHT. Read only what your package needs: your own package section of ${DOC}, and only the sections of ${WT}/docs/kit/visual-direction.md and references.md that name your component (grep first, then read the range). Never cat a whole large file or a full log; pipe long command output through tail -20 or grep. Look at crops at 1440 and 390 only, and only for variants you changed. No exploratory reading of unrelated components.`
const CONTEXT = `Tcules website UI kit. Integration branch design/services-showcase in ${WT}. The owner may run a dev server on :3000 there; never use port 3000. Owner rulings: ${DOC} (source of truth). Standing rules: cards carry no boxes (logo cells are the named exception); blue is the foreground accent, never a ground; no type on images; every band ≤ 830px tall at 1470. Never git stash. Never touch /Users/devagya/tcules-website-2026. Commits end with a blank line and "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>". ${LEAN}`
const GATES = `Gates: npm run verify (tail it), npm run fold:check on your routes, npm run shots -- <your routes> --base=http://localhost:<port> with your own next dev on your port (stop it when done). Apply ${WT}/.claude/skills/audit-component/SKILL.md to your own diff only (do not invoke the skill). No build/aria (the final step runs them).`

const PACKAGES = [
  { id: 'r7-logos', port: 3311, effort: 'high', owns: 'ClientMark, a new logo-grid unit if needed, design/kit/logos and design/client-mark', brief: 'r7-logos. WebFetch the Enorm Dribbble reference once and look at it. 9 marks in public/clients; the grid must look complete at 8, 9 and 12 cells at 1470, 1024 and 390. Variants: grid with an eyebrow-size context line; grid led by RatingBadge; grid beside a short heading. Compose from Layout tile tracks, ClientMark and RatingBadge first.' },
  { id: 'r7-hero', port: 3312, effort: 'high', owns: 'PageHero and its token layer, design/page-hero and design/kit/hero', brief: 'r7-hero. RatingBadge-as-eyebrow variants (look at https://doodle.com/en/ once) across the hero arrangements where it fits. Smaller lead as the default; the larger lead only as an opt-in, documented. The eyebrow never echoes the breadcrumb.' },
  { id: 'r7-testimonials', port: 3313, effort: 'high', owns: 'Proof, Slider and their tokens, design/proof, design/slider and design/kit/testimonials', brief: 'r7-testimonials. G·02 = "Typographic, with a CtaRow" in design/kit/testimonials: keep it AND add it inside the auto-advancing Slider (pause on hover/focus, prefers-reduced-motion, visible stepper). Remove the rating wherever it sits beside a client quote. G-case: drop the card description and the rating badge. No headshots by default; no-image quotes shift to the start with a Tag in the image slot. Keep the featured large-image variants.' },
  { id: 'r7-video', port: 3314, effort: 'high', owns: 'ONE new unit (new folder; do not edit Proof) and design/kit/video-testimonial', brief: 'r7-video. Poster from the photo catalogue, play affordance, quote pull and attribution, a captions track slot, no autoplay with sound, keyboard support, reduced motion. Variants: featured (large poster, quote beside it) and in-row (smaller, beside two text quotes).' },
  { id: 'r7-statement', port: 3315, effort: 'medium', owns: 'Statement and design/statement', brief: 'r7-statement. Retire size="display" and migrate its callers (ServicePage bands included). Make the smaller size read as special text, not as a section title. An optional graphic slot only if it fits cleanly.' },
  { id: 'r7-cards', port: 3316, effort: 'medium', owns: 'BlockCard, ListCard and their tokens, design/block-card, design/list-card and design/kit/services', brief: 'r7-cards. Remove BlockCard frame="box" and migrate its callers. Size icons from a token tied to the title role beside them, per card size. The top-hairline variant and the type stay as they are. The specimen shows eyebrow + heading + body + 3/4/6 clickable cards, with no decorative image.' },
  { id: 'r7-form', port: 3317, effort: 'medium', owns: 'EnquiryForm, Input and their tokens, design/enquiry-form, design/input and design/kit/form', brief: 'r7-form. Compact. No visible labels: the placeholder or help text is the visible cue, and each field keeps a visually hidden accessible label. Errors stay visible and announced. Keep "We reply within a business day" near the submit. Keep the inverted variant and fields="box".' },
  { id: 'r7-howwework', port: 3318, effort: 'high', owns: 'ONE new pattern (new folder) and design/kit/how-we-work', brief: 'r7-howwework. Copy: the current how-we-work page and fixtures, plus https://tcules.com (WebFetch at most 3 pages: how we work, about, engagement). Invent no claims. A distinctive USP band with imagery or a drawn diagram, never hairline + icon double separation. Two arrangements: a full band, and a compact band for service pages.' },
  { id: 'r7-facts', port: 3319, effort: 'high', owns: 'Stat or RatingBadge only if truly needed, and design/kit/facts', brief: 'r7-facts. CRUCIAL FOR FRIDAY: at least as beautiful as the best kit component, never a plain row of numbers. Rating, years, projects, team; the placeholder figures are approved as they are. Two arrangements, one designed to sit with the logo grid.' },
  { id: 'r7-rules', port: 3320, effort: 'medium', owns: 'CLAUDE.md § Design quality, docs/kit/visual-direction.md, docs/kit/brand-amendments.md, the Media tone hook, ServicePage/plan.ts (the adjacency check only)', brief: 'r7-rules. Three concise rules: no two text-heavy bands adjacent (a dev warning in plan.ts, with "text-heavy" defined); an IRL tone hook on Media that renders nothing by default (no invented filter); proof items are a set, not a ranking. Show the hook on design/media.' },
].filter(p => !ONLY || ONLY.includes(p.id))

const DONE = { type: 'object', properties: { branch: { type: 'string' }, worktree: { type: 'string' }, commit: { type: 'string' }, summary: { type: 'string' }, routes: { type: 'array', items: { type: 'string' } }, shots_dir: { type: 'string' } }, required: ['branch', 'worktree', 'commit', 'summary', 'routes', 'shots_dir'] }
const CRIT = { type: 'object', properties: { verdict: { type: 'string', enum: ['pass', 'fix'] }, score: { type: 'number' }, problems: { type: 'array', items: { type: 'string' } } }, required: ['verdict', 'score', 'problems'] }

function buildPrompt(p, extra) {
  return `${CONTEXT}

Build ONE package. SETUP (skip if it exists): git -C ${WT} worktree add /Users/devagya/tcules-${p.id} -b kit/${p.id} design/services-showcase && cd there && npm ci --prefer-offline --no-audit --no-fund >/dev/null. If the branch already exists with commits, continue from them. Work ONLY in /Users/devagya/tcules-${p.id}; other packages build in parallel.
PACKAGE ${p.id}: ${p.brief}
YOU OWN: ${p.owns}. Shared files (barrels, tokens/index.css, SPECIMENS, package.json, fold.config.json): small additive edits only. Do not touch ServicePage or the service fixtures unless the brief says so. Dev port ${p.port}.
Bar: genuinely beautiful, because the owner reviews it on Friday. Lay the specimen out as a designed showcase.
${GATES}
Crops go to ${SCRATCH}/r7/${p.id}/. Commit on kit/${p.id} ("kit(${p.id}): <summary>").${extra || ''}
Return the schema: summary under 500 chars, naming each variant.`
}

async function safe(prompt, label, phaseName, effort) {
  try { return await agent(prompt, { label, phase: phaseName, schema: DONE, effort }) }
  catch (e) { log(`${label} failed: ${e}`); return null }
}

function critique(p, done, phaseName) {
  return agent(`${CONTEXT}

You are the one critic for ${p.id} (worktree ${done.worktree}, commit ${done.commit}). Brief: ${p.brief}
Builder: ${done.summary}. Crops: ${done.shots_dir} (if missing, shoot with next dev on port ${p.port + 100} and stop it after).
Judge, as a senior art director, under three lenses at once:
- Does it answer the owner's 7 Oct note exactly?
- Is it beautiful: negative space, scale contrast, 3–4 elements with clear hierarchy, blue as the accent?
- Do the fold (≤830 at 1470) and the 390 width hold?
Read-only. Run npm run verify (tail it).
Pass only if nothing material is wrong; score 1–10. At most 6 problems, each one concrete sentence (variant, width, change).`,
    { label: `critic:${p.id}`, phase: phaseName, schema: CRIT, effort: 'medium' }).catch(() => null)
}

let mergeChain = Promise.resolve()
const merged = {}
function integrate(done) {
  mergeChain = mergeChain.then(() => agent(`In ${WT} (branch design/services-showcase) run git merge --no-ff ${done.branch} -m "kit: merge ${done.branch}" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>". Never touch uncommitted owner edits; if they block the merge, report and stop. Conflicts: barrels, tokens/index.css, SPECIMENS, fold.config.json and package.json are unions. For code conflicts, keep both behaviours; ${DOC} wins over older behaviour. Then run npm run verify 2>&1 | tail -15, fix only what the merge broke, and commit. Reply in under 300 chars.`,
    { label: `merge:${done.branch}`, phase: 'Integrate', model: 'sonnet', effort: 'low' }).catch(e => `merge failed: ${e}`)).then(r => { merged[done.branch] = r; return r })
  return mergeChain
}

async function runPackage(p, phaseName) {
  let done = await safe(buildPrompt(p), `build:${p.id}`, phaseName, p.effort)
  if (!done) return null
  const r = await critique(p, done, phaseName)
  done.score = r ? r.score : null
  log(`${p.id}: ${r ? r.score + ' ' + r.verdict : 'no critic'}`)
  if (r && r.verdict === 'fix' && r.score < 8 && r.problems.length) {
    done = (await safe(buildPrompt(p, `\n\nFIX ROUND. Your branch exists (commit ${done.commit}). Fix each problem, or argue it in a code comment; re-shoot only what changed; commit:\n- ${r.problems.join('\n- ')}`), `fix:${p.id}`, phaseName, p.effort)) || done
    done.unresolved_check = r.problems
  }
  await integrate(done)
  return done
}

phase('Packages')
const results = (await parallel(PACKAGES.map(p => () => runPackage(p, 'Packages')))).filter(Boolean)
await mergeChain

let pages = null
if (args.pages) {
  phase('Pages')
  pages = await runPackage({ id: 'r7-pages', port: 3330, effort: 'high', owns: 'src/templates/ServicePage/**, the six service fixtures, docs/content-changes.md', brief: 'r7-pages. Apply the merged packages to the six service pages: the logo grid replaces the marquee; button kinds; Statement at the smaller size; card sections with no decorative image and no boxes; no rating beside a quote (G·02 or its slider as the testimonial band); facts and How we work where the argument wants them; fix every text-heavy adjacency. Every band within the fold.' }, 'Pages')
  await mergeChain
}

phase('Sheet')
const final = await agent(`In ${WT}, on a free port (not 3000):
1. Run npm run verify, then npm run build && npm run aria:check (tail each). Fix breakage and commit "kit: r7 post-merge fixes".
2. Tick each merged package in ${DOC} and commit.
3. Write ${SCRATCH}/r7/review/index.html: one section per package, with the 7 Oct note in one line, then <img> tags pointing at the existing crops in ${SCRATCH}/r7/<id>/ (1440 and 390; reference them, do not re-shoot).
4. Run git worktree remove on each /Users/devagya/tcules-r7-* that is merged, keeping the branches.
Reply in under 400 chars.`, { label: 'sheet', phase: 'Sheet', model: 'sonnet', effort: 'low' })

return { packages: results.map(r => ({ branch: r.branch, score: r.score, recheck: r.unresolved_check || [], summary: r.summary })), pages: pages && pages.branch, merged, final }
