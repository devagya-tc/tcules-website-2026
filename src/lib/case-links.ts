import type { InlineRun } from './inline';
import {
  CASE_STUDY_PLACEHOLDERS,
  CASE_STUDY_SLUGS,
  caseStudyPath,
  caseStudyPlaceholderPath,
} from './routes';

/**
 * Case links: every time the copy names a client whose work is a case study, the name links to the
 * case (owner, 11 Oct 2026). The names and slugs live in `routes.ts`; this file only looks them up
 * and threads the link into inline runs, so no template writes a case path of its own.
 */

export type CaseLink = {
  href: string;
  /** True for a client whose case page does not exist yet: the link is a PLACEHOLDER (P43). */
  placeholder: boolean;
};

const normalise = (name: string) =>
  name
    .replace(/[.:,]+$/, '')
    .replace(/[’']s$/, '')
    .trim()
    .toLowerCase();

const SLUGS = new Map(
  Object.entries(CASE_STUDY_SLUGS).map(([name, slug]) => [normalise(name), slug] as const),
);
const PLACEHOLDERS = new Map(
  Object.entries(CASE_STUDY_PLACEHOLDERS).map(([name, slug]) => [normalise(name), slug] as const),
);

/** The case a client name links to ("Auxentios.", "Dealpath", "CuramCare"), or undefined. */
export function caseStudyLink(name: string): CaseLink | undefined {
  const key = normalise(name);
  const slug = SLUGS.get(key);
  if (slug) return { href: caseStudyPath(slug), placeholder: false };
  const pending = PLACEHOLDERS.get(key);
  if (pending) return { href: caseStudyPlaceholderPath(pending), placeholder: true };
  return undefined;
}

/** Every name the lookup knows, longest first, so "Benchmark Gensuite" wins over "Benchmark". */
const NAMES = [...Object.keys(CASE_STUDY_SLUGS), ...Object.keys(CASE_STUDY_PLACEHOLDERS)].sort(
  (a, b) => b.length - a.length,
);

const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const MENTION = new RegExp(`\\b(${NAMES.map(escape).join('|')})\\b`);

function linkedHrefs(runs: readonly InlineRun[], out = new Set<string>()): Set<string> {
  for (const run of runs) {
    if (run.type === 'link') out.add(run.href.split('#')[0] ?? run.href);
    if ('children' in run) linkedHrefs(run.children, out);
  }
  return out;
}

/**
 * The runs with the FIRST mention of each case client in plain text turned into a link to its case.
 * A client the runs already link to is left alone, text inside an existing link, a bold label or
 * code is never touched, and the words are exactly as authored (the link wraps them, it adds none).
 * `seen` carries the clients already linked earlier in the same block, so a name links once.
 */
export function linkCaseMentions(
  runs: readonly InlineRun[],
  seen: Set<string> = new Set(),
): InlineRun[] {
  for (const href of linkedHrefs(runs)) seen.add(href);
  const out: InlineRun[] = [];
  for (const run of runs) {
    if (run.type !== 'text') {
      out.push(run);
      continue;
    }
    let rest = run.text;
    while (rest.length > 0) {
      const match = MENTION.exec(rest);
      const link = match ? caseStudyLink(match[1] ?? '') : undefined;
      if (!match || !link) {
        out.push({ type: 'text', text: rest });
        break;
      }
      const base = link.href.split('#')[0] ?? link.href;
      const before = rest.slice(0, match.index);
      const name = match[1] ?? '';
      if (seen.has(link.href) || (!link.placeholder && seen.has(base))) {
        out.push({ type: 'text', text: before + name });
      } else {
        if (before) out.push({ type: 'text', text: before });
        out.push({ type: 'link', href: link.href, children: [{ type: 'text', text: name }] });
        seen.add(link.href);
      }
      rest = rest.slice(match.index + name.length);
    }
  }
  return out.filter((run) => run.type !== 'text' || run.text.length > 0);
}

/**
 * A "Selected work: A · B · C" proof line with each named client linked to its case. The label
 * before the colon and the separators stay as authored; a name with no case stays text.
 */
export function linkProofLine(runs: readonly InlineRun[]): InlineRun[] {
  return runs.flatMap((run): InlineRun[] => {
    if (run.type === 'em' || run.type === 'strong') {
      return [{ ...run, children: linkProofLine(run.children) }];
    }
    if (run.type !== 'text') return [run];
    const colon = run.text.indexOf(':');
    const head = colon >= 0 ? run.text.slice(0, colon + 1) : '';
    const list = colon >= 0 ? run.text.slice(colon + 1) : run.text;
    const parts = list.split(/(\s·\s)/);
    const out: InlineRun[] = head ? [{ type: 'text', text: head }] : [];
    for (const part of parts) {
      const lead = /^\s*/.exec(part)?.[0] ?? '';
      const name = part.trim();
      const link = name && !/^·$/.test(name) ? caseStudyLink(name) : undefined;
      if (link) {
        if (lead) out.push({ type: 'text', text: lead });
        out.push({ type: 'link', href: link.href, children: [{ type: 'text', text: name }] });
        const tail = part.slice(lead.length + name.length);
        if (tail) out.push({ type: 'text', text: tail });
      } else {
        out.push({ type: 'text', text: part });
      }
    }
    return out;
  });
}
