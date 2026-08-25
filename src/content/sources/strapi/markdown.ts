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
export function markdownToHtml(markdown: string | null | undefined, context: string): string {
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
      blocks.push(`<h${level}>${renderInline(heading[2] ?? '')}</h${level}>`);
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
