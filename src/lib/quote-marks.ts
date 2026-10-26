/* Quote marks for a client's words: shared by every pattern that shows a testimonial (Testimonial,
   Proof), so a quote reads the same wherever it is set. Typesetting only: the marks change, the
   words never do. */

/**
 * Set straight double quotes as typographic ones in the text of trusted HTML: an opening mark after
 * the start, a space or an opening bracket, a closing mark everywhere else. The corpus authors most
 * quotes with curly marks and some (About's three voices) with straight ones, so the site showed
 * both (critic, home round 2). Typesetting, like `bindShortWords`: the marks change, the words do
 * not. Tags are left alone, so attribute quotes are never touched.
 */
/**
 * A testimonial always shows its quote marks (owner, 12 Oct 2026: "it should always have the quote
 * marks"): a quote authored without them gets an opening mark before its first word and a closing one
 * after its last, inside the markup. Marks already there are left alone.
 */
export function withQuoteMarks(html: string): string {
  const text = html.replace(/<[^>]*>/g, '').trim();
  let out = html;
  if (!/^["“]/.test(text)) out = out.replace(/^((?:\s*<[^>]+>)*\s*)/, '$1“');
  if (!/["”]$/.test(text)) out = out.replace(/(\s*(?:<\/[^>]+>\s*)*)$/, '”$1');
  return out;
}

export function curlQuotes(html: string): string {
  return html
    .split(/(<[^>]*>)/)
    .map((part) =>
      part.startsWith('<')
        ? part
        : part
            .replace(/&quot;/g, '"')
            .replace(/(^|[\s([{—–])"/g, '$1“')
            .replace(/"/g, '”'),
    )
    .join('');
}
