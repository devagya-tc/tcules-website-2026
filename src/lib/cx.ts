/**
 * Join class names, dropping anything falsy.
 *
 * This is the whole utility. The previous codebase used clsx wrapped in tailwind-merge,
 * because competing Tailwind utilities have to be RESOLVED (`p-2` vs `p-4` — last one
 * should win, and tailwind-merge is what knows that). CSS Modules generate unique class
 * names that never compete, so there is nothing to resolve: the job is concatenation.
 *
 * Every call site in this repo passes `string | false | undefined` — a base class, some
 * conditional modifier classes, and a caller's className. That needs no dependency.
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
