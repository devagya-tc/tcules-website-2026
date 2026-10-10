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

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
};

const escapeHtml = (text: string) => text.replace(/[&<>"]/g, (c) => HTML_ESCAPES[c] ?? c);

/**
 * Inline runs as a trusted HTML string, for the four patterns whose rich slots take HTML rather than
 * a node: Accordion `answerHtml`, DataTable `cellsHtml`, Proof `quoteHtml`, Callout / Prose `html`.
 * `renderInline` stays the renderer for every ReactNode slot.
 *
 * The string is built from a parsed tree, never from the raw markdown, and every literal is
 * escaped, so nothing authored can open a tag. A link keeps its `href` as authored (an internal
 * path, a `#anchor` or an absolute URL); an absolute one carries `rel="noopener"`, as
 * `renderInline`'s does.
 */
export function inlineToHtml(runs: readonly InlineRun[]): string {
  return runs
    .map((run) => {
      switch (run.type) {
        case 'text':
          return escapeHtml(run.text);
        case 'code':
          return `<code>${escapeHtml(run.text)}</code>`;
        case 'br':
          return '<br>';
        case 'strong':
          return `<strong>${inlineToHtml(run.children)}</strong>`;
        case 'em':
          return `<em>${inlineToHtml(run.children)}</em>`;
        case 'link': {
          const rel = /^https?:/.test(run.href) ? ' rel="noopener"' : '';
          return `<a href="${escapeHtml(run.href)}"${rel}>${inlineToHtml(run.children)}</a>`;
        }
      }
    })
    .join('');
}

/** One paragraph of runs as `<p>…</p>`. */
export function paragraphHtml(runs: readonly InlineRun[]): string {
  return `<p>${inlineToHtml(runs)}</p>`;
}
