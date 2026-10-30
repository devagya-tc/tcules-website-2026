type RichTextNode = Record<string, unknown>;

function isRecord(value: unknown): value is RichTextNode {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function childrenOf(node: RichTextNode): RichTextNode[] {
  return Array.isArray(node.children) ? node.children.filter(isRecord) : [];
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function safeContentHref(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;

  const href = value.trim();
  if (!href || /[\u0000-\u001f\u007f]/u.test(href)) return undefined;
  if (href.startsWith('/') && !href.startsWith('//')) return href;
  if (href.startsWith('#')) return href;

  try {
    const url = new URL(href);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? href : undefined;
  } catch {
    return undefined;
  }
}

function renderText(node: RichTextNode): string {
  const raw = typeof node.text === 'string' ? node.text : '';
  let html = escapeHtml(raw).replaceAll('\n', '<br />');

  if (node.code === true) html = `<code>${html}</code>`;
  if (node.bold === true) html = `<strong>${html}</strong>`;
  if (node.italic === true) html = `<em>${html}</em>`;
  if (node.underline === true) html = `<ins>${html}</ins>`;
  if (node.strikethrough === true) html = `<del>${html}</del>`;

  return html;
}

function renderChildren(node: RichTextNode, context: string): string {
  return childrenOf(node)
    .map((child) => renderNode(child, context))
    .join('');
}

function renderNode(node: RichTextNode, context: string): string {
  const type = typeof node.type === 'string' ? node.type : '';

  if (type === 'image' || type === 'figure') {
    throw new Error(
      `Strapi rich text in ${context} contains embedded media. Use ComponentSharedMedia instead.`,
    );
  }

  if (type === 'text') return renderText(node);

  const children = renderChildren(node, context);

  switch (type) {
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'heading': {
      const requestedLevel = typeof node.level === 'number' ? node.level : 2;
      const level = Math.min(6, Math.max(2, requestedLevel));
      return `<h${level}>${children}</h${level}>`;
    }
    case 'link': {
      const href = safeContentHref(node.url);
      return href ? `<a href="${escapeHtml(href)}">${children}</a>` : children;
    }
    case 'list': {
      const tag = node.format === 'ordered' ? 'ol' : 'ul';
      return `<${tag}>${children}</${tag}>`;
    }
    case 'list-item':
      return `<li>${children}</li>`;
    case 'quote':
      return `<blockquote>${children}</blockquote>`;
    case 'code': {
      const code =
        typeof node.code === 'string' ? node.code : plainTextFromNodes(childrenOf(node));
      return `<pre><code>${escapeHtml(code)}</code></pre>`;
    }
    default:
      return children;
  }
}

function plainTextFromNodes(nodes: readonly RichTextNode[]): string {
  return nodes
    .map((node) => {
      if (typeof node.text === 'string') return node.text;
      if (typeof node.code === 'string') return node.code;
      return plainTextFromNodes(childrenOf(node));
    })
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

export function richTextToHtml(value: unknown, context: string): string {
  if (typeof value === 'string') {
    return value.trim() ? `<p>${escapeHtml(value)}</p>` : '';
  }

  if (!Array.isArray(value)) return '';
  return value
    .filter(isRecord)
    .map((node) => renderNode(node, context))
    .join('');
}

export function richTextToPlainText(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (!Array.isArray(value)) return '';
  return plainTextFromNodes(value.filter(isRecord));
}

/**
 * A heading as the CMS authors it, as the words to render. The previous site broke a display
 * heading in two at a " , " (a comma with a space BEFORE it): "Join , Future Interfaces Lab" is
 * "Join" over "Future Interfaces Lab", and "Future , Interfaces Lab by Tcules" the same. A comma
 * after a space is never punctuation in English, so the marker is told apart from a real comma
 * ("Design, built") by the space before it, and becomes the one space it stood for. Read here, at
 * the Strapi seam, so no page learns the old site's markup (owner, 29 Oct 2026: the copy's words
 * must render exactly).
 */
export function cmsHeadingText(candidate: string | null | undefined): string {
  return typeof candidate === 'string'
    ? candidate
        .replace(/\s+,\s*/gu, ' ')
        .replace(/\s{2,}/gu, ' ')
        .trim()
    : '';
}
