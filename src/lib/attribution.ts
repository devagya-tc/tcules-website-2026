import { inlineToText, type InlineRun } from './inline';

/**
 * A quote's attribution line, split into the three parts a Proof quote takes.
 *
 * The corpus writes one line: `Name, Role…, Company`. The first comma-separated part is the name,
 * the last the company, and whatever sits between is the role, which may itself hold commas
 * ("Director, Product Management" at JoVE). With two parts there is no role; with one, the line is
 * the name alone and the company is empty.
 *
 * About's two-line form (a name, then "Role, Company") folds to the same shape: join the two lines
 * with a comma before calling this.
 *
 * The parts are returned as plain strings: Proof sets name, role and company in its own type
 * roles and takes them as strings.
 */
export type Attribution = { name: string; role?: string; company: string };

export function parseAttribution(line: string | readonly InlineRun[]): Attribution {
  /* The two-line form: a hard break ends the name's line, so the break is the comma. */
  const text = (
    typeof line === 'string'
      ? line
      : line
          .map((run) => (run.type === 'br' ? ', ' : inlineToText([run])))
          .join('')
  ).trim();
  const parts = text
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  const [name = '', ...rest] = parts;
  if (rest.length === 0) return { name, company: '' };
  const company = rest[rest.length - 1] ?? '';
  const role = rest.slice(0, -1).join(', ');
  return role ? { name, role, company } : { name, company };
}
