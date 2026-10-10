/**
 * Inline runs — the structured form of a line of inline markdown.
 *
 * A corpus paragraph, list item, table cell or heading is never shipped to a component as a raw
 * markdown string: the content seam parses it ONCE into this tree, and a pattern renders the tree.
 * That keeps `**bold**`, `*italic*` and `[link](/href)` out of every component's concerns, and it is
 * why the type lives here in `lib` — below the content seam — rather than in `@/content`: patterns
 * may not import content, but they may import a leaf, so a pattern can take `InlineRun[]` as a prop
 * and the tier direction holds.
 *
 *   text      a literal run, exactly as authored
 *   strong    `**…**`, may nest links and emphasis
 *   em        `*…*`
 *   link      `[…](href)`; `href` is as authored — an internal path, a `#anchor` or an absolute URL
 *   code      `` `…` ``
 *   br        a hard line break (a line ending in two spaces)
 */
export type InlineRun =
  | { type: 'text'; text: string }
  | { type: 'strong'; children: InlineRun[] }
  | { type: 'em'; children: InlineRun[] }
  | { type: 'link'; href: string; children: InlineRun[] }
  | { type: 'code'; text: string }
  | { type: 'br' };

/** The plain text of a run list — for aria labels, keys and assertions, never for display. */
export function inlineToText(runs: readonly InlineRun[]): string {
  return runs
    .map((run) => {
      switch (run.type) {
        case 'text':
        case 'code':
          return run.text;
        case 'br':
          return ' ';
        default:
          return inlineToText(run.children);
      }
    })
    .join('');
}
