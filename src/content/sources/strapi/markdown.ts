import { escapeHtml, safeContentHref } from './rich-text';

function renderMarks(source: string): string {
  const escapedCharacters: string[] = [];
  const protectedSource = source.replace(
    /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/gu,
    (_, character: string) => {
      const index = escapedCharacters.push(character) - 1;
      return `\uE000${index}\uE001`;
    },
  );

  return escapeHtml(protectedSource)
    .replace(/`([^`]+)`/gu, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/gu, '<strong>$1</strong>')
    .replace(/__([^_]+)__/gu, '<strong>$1</strong>')
    .replace(/~~([^~]+)~~/gu, '<del>$1</del>')
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/gu, '<em>$1</em>')
    .replace(/(?<!_)_([^_]+)_(?!_)/gu, '<em>$1</em>')
    .replace(/\uE000(\d+)\uE001/gu, (_, index: string) =>
      escapeHtml(escapedCharacters[Number(index)] ?? ''),
    );
}

function renderInline(source: string): string {
  const linkPattern = /(?<!!)(?<!\\)\[([^\]]+)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/gu;
  let html = '';
  let offset = 0;

  for (const match of source.matchAll(linkPattern)) {
    const index = match.index;
    if (index === undefined) continue;

    html += renderMarks(source.slice(offset, index));
    const label = match[1] ?? '';
    const href = safeContentHref(match[2]);
    html += href
      ? `<a href="${escapeHtml(href)}">${renderMarks(label)}</a>`
      : renderMarks(label);
    offset = index + match[0].length;
  }

  return html + renderMarks(source.slice(offset));
}

function isBlockStart(line: string): boolean {
  return (
    /^#{1,6}\s+/u.test(line) ||
    /^>\s?/u.test(line) ||
    /^\s*(?:[-+*]\s+|\d+\.\s+)/u.test(line) ||
    /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/u.test(line) ||
    /^```/u.test(line)
  );
}

/** Convert the CMS's Markdown field into the trusted HTML contract consumed by Prose. */
/**
 * One top-level heading found inside a markdown body, in document order. The field is `label`
 * rather than `text` so the collected array IS a `PageOutlineEntry[]` and passes to the view model
 * without a second mapping step to keep in sync.
 *
 * `anchorId` is OPAQUE on purpose — `toc-<n>`, the heading's position in the document's outline,
 * rather than a slug of its text. See docs/guides/long-form-outline.md § "Why the anchors are
 * opaque"; the short version is that it needs no de-duplication to be unique, does not change when
 * an editor rewords a heading, and is nobody's public URL — so the whole feature can be deleted
 * without breaking a link.
 */
export type BodyHeading = { label: string; anchorId: string };

/**
 * Opt-in outline collection. One sink per ENTRY, passed to every block of it in reading order:
 * `headings` accumulates across blocks, and its length is what numbers the next anchor, so
 * uniqueness needs no set and no cross-call bookkeeping.
 *
 * Omit it and `markdownToHtml` behaves exactly as it did before this existed: no ids, no
 * collection, byte-identical HTML. That is what keeps the 30-odd other call sites untouched.
 */
export type OutlineSink = { headings: BodyHeading[] };

/**
 * The label for an outline entry: the words the heading actually renders, with the markup taken
 * off. Derived from `renderInline`'s OUTPUT rather than from the markdown source, so the rail and
 * the heading can never disagree — an author who bolds half a heading or escapes a full stop gets
 * the same characters in both places.
 */
function headingLabel(html: string): string {
  return html
    .replace(/<[^>]+>/gu, '')
    .replaceAll('&#39;', "'")
    .replaceAll('&quot;', '"')
    .replaceAll('&gt;', '>')
    .replaceAll('&lt;', '<')
    .replaceAll('&amp;', '&')
    .replace(/\s+/gu, ' ')
    .trim();
}

export function markdownToHtml(
  markdown: string | null | undefined,
  context: string,
  outline?: OutlineSink,
): string {
  const source = typeof markdown === 'string' ? markdown.replaceAll('\r\n', '\n').trim() : '';
  if (!source) return '';


  if (/!\[[^\]]*\]\([^)]+\)/u.test(source)) {
    throw new Error(
      `Strapi Markdown in ${context} contains embedded media. Use the section-image block instead.`,
    );
  }

  const lines = source.split('\n');
  const blocks: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] ?? '';
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```\s*([\w-]+)?\s*$/u);
    if (fence) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/u.test(lines[index] ?? '')) {
        code.push(lines[index] ?? '');
        index += 1;
      }
      if (index < lines.length) index += 1;
      const language = fence[1] ? ` class="language-${escapeHtml(fence[1])}"` : '';
      blocks.push(`<pre><code${language}>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/u);
    if (heading) {
      const level = Math.max(2, Math.min(6, heading[1]?.length ?? 2));
      const inline = renderInline(heading[2] ?? '');

      /* LEVEL 2 ONLY, and it is a correctness rule rather than a simplification. TableOfContents
         renders one flat level, so an outline holding both h2s and h3s would interleave sections
         with their own sub-sections and read as one undifferentiated ladder. Measured over the
         live CMS, 12 of 16 articles and 12 of 17 case studies mix the two.

         The id is attached only when it is collected, so a heading nobody can navigate to does
         not carry an anchor that suggests otherwise. */
      let attributes = '';
      if (outline && level === 2) {
        const anchorId = `toc-${outline.headings.length + 1}`;
        outline.headings.push({ label: headingLabel(inline), anchorId });
        attributes = ` id="${escapeHtml(anchorId)}"`;
      }

      blocks.push(`<h${level}${attributes}>${inline}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/u.test(line)) {
      blocks.push('<hr>');
      index += 1;
      continue;
    }

    if (/^>\s?/u.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^>\s?/u.test(lines[index] ?? '')) {
        quote.push((lines[index] ?? '').replace(/^>\s?/u, ''));
        index += 1;
      }
      blocks.push(`<blockquote><p>${renderInline(quote.join(' '))}</p></blockquote>`);
      continue;
    }

    const listItem = line.match(/^\s*([-+*]|\d+\.)\s+(.+)$/u);
    if (listItem) {
      const ordered = /\d+\./u.test(listItem[1] ?? '');
      const tag = ordered ? 'ol' : 'ul';
      const items: string[] = [];

      while (index < lines.length) {
        const match = (lines[index] ?? '').match(/^\s*([-+*]|\d+\.)\s+(.+)$/u);
        if (!match || /\d+\./u.test(match[1] ?? '') !== ordered) break;
        items.push(`<li>${renderInline(match[2] ?? '')}</li>`);
        index += 1;
      }

      blocks.push(`<${tag}>${items.join('')}</${tag}>`);
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (
      index < lines.length &&
      (lines[index] ?? '').trim() &&
      !isBlockStart(lines[index] ?? '')
    ) {
      paragraph.push((lines[index] ?? '').trim());
      index += 1;
    }
    blocks.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
  }

  return blocks.join('');
}
