#!/usr/bin/env node
/**
 * Emit the two shareable copies of the designer guide from the one authored copy.
 *
 * `docs/guides/designer-workflow.html` is a FRAGMENT, not a page. It has a `<title>`, three font
 * `<link>`s, a `<style>` and a `<div class="wrap">`, and it relies on the artifact shell to supply
 * the doctype, the head and a two-line reset. Sent to someone as a file it renders as unstyled text
 * in the wrong font — so "just email them the HTML" does not work, and that is what the `.html`
 * output here fixes: the same markup, wrapped in the shell it was written against.
 *
 * The `.md` output exists because a recipient may have no browser context to spend — Slack, a
 * ticket, a phone. It is NOT a second copy of the guide. `docs/guides/designer-workflow.md` already
 * argues why a hand-kept Markdown twin is the wrong shape (two copies of one truth, which is the
 * failure `npm run verify` exists to prevent), and that argument is why this is a converter and not
 * a document. Nothing here is authored; everything here is derived.
 *
 * The conversion is deliberate rather than generic, because the guide's structure IS its content:
 *
 *   .cmd        a `where` label welded to a command      →  bold location line, then a fence
 *   .prompt     a paste-into-Claude-Code card            →  labelled heading, then a fence
 *   .gate       the phase-one decision                   →  blockquote, question in bold
 *   .fork       the two answers to it                    →  a heading each, answer + verdict paired
 *   ol.steps    a numbered spine where order is load-bearing → `### 07 · title`, number kept
 *   .who        "needs the owner", "not you"             →  italic line under the step heading
 *   .note       an aside                                 →  blockquote, recursively
 *
 * A generic html-to-markdown pass drops every one of those distinctions and yields a wall of
 * paragraphs in which no command says where it runs. That label on every command is the single
 * thing the first version of the guide was rewritten to add.
 *
 * Output goes to `dist/guide/`, which is gitignored. Committing the output would recreate exactly
 * the duplication this script is shaped to avoid: two copies in git, drifting. The files are
 * disposable and one command away.
 *
 * Node builtins only, like every other script here.
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';

const SOURCE = 'docs/guides/designer-workflow.html';
const OUT_DIR = 'dist/guide';
const OUT_NAME = 'tcules-component-workflow';

/* ── A parser for the subset this one hand-authored file uses ─────────────────────────────────
   Not a general HTML parser and not trying to be. It handles what the guide contains: nested
   elements, quoted attributes, comments, raw-text `<style>`/`<title>`, and void `<link>`. It also
   tolerates an unclosed tag closed implicitly by its parent — browsers do, so the source can
   contain one and look fine, and a parser that threw would be reporting a non-problem. */
const VOID = new Set(['link', 'meta', 'br', 'img', 'hr', 'input', 'source']);
const RAW = new Set(['style', 'script', 'title']);

const decode = (s) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');

/** End of the tag starting at `lt`, skipping any `>` that sits inside a quoted attribute value. */
function tagEnd(html, lt) {
  let quote = null;
  for (let i = lt + 1; i < html.length; i++) {
    const c = html[i];
    if (quote) {
      if (c === quote) quote = null;
    } else if (c === '"' || c === "'") quote = c;
    else if (c === '>') return i;
  }
  return html.length;
}

function parseAttrs(s) {
  const attrs = {};
  const re = /([\w:.-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  for (const m of s.matchAll(re))
    attrs[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? '');
  return attrs;
}

function parse(html) {
  const root = { tag: '#root', attrs: {}, children: [] };
  const stack = [root];
  const top = () => stack[stack.length - 1];
  const text = (s) => {
    if (s) top().children.push({ tag: '#text', text: s, children: [] });
  };

  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt === -1) {
      text(html.slice(i));
      break;
    }
    if (lt > i) text(html.slice(i, lt));

    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt);
      i = end === -1 ? html.length : end + 3;
      continue;
    }

    if (html.startsWith('</', lt)) {
      const gt = html.indexOf('>', lt);
      const name = html
        .slice(lt + 2, gt)
        .trim()
        .toLowerCase();
      for (let k = stack.length - 1; k > 0; k--) {
        if (stack[k].tag === name) {
          stack.length = k;
          break;
        }
      }
      i = gt + 1;
      continue;
    }

    const gt = tagEnd(html, lt);
    const raw = html.slice(lt + 1, gt);
    const m = /^([a-zA-Z][\w:-]*)/.exec(raw);
    if (!m) {
      text(html.slice(lt, gt + 1));
      i = gt + 1;
      continue;
    }
    const name = m[1].toLowerCase();
    const node = { tag: name, attrs: parseAttrs(raw.slice(m[1].length)), children: [] };
    top().children.push(node);

    if (VOID.has(name) || raw.trimEnd().endsWith('/')) {
      i = gt + 1;
      continue;
    }
    if (RAW.has(name)) {
      const close = html.toLowerCase().indexOf(`</${name}`, gt);
      const end = close === -1 ? html.length : close;
      node.children.push({ tag: '#text', text: html.slice(gt + 1, end), children: [] });
      i = close === -1 ? html.length : html.indexOf('>', close) + 1;
      continue;
    }
    stack.push(node);
    i = gt + 1;
  }
  return root;
}

/* ── Tree helpers ─────────────────────────────────────────────────────────────────────────── */
const classes = (n) => new Set((n.attrs?.class ?? '').split(/\s+/).filter(Boolean));
const has = (n, c) => classes(n).has(c);
const kids = (n) => n.children.filter((c) => c.tag !== '#text' || c.text.trim());

function find(n, pred) {
  if (pred(n)) return n;
  for (const c of n.children) {
    const hit = find(c, pred);
    if (hit) return hit;
  }
  return null;
}
const byTag = (n, tag) => find(n, (x) => x.tag === tag);
const byClass = (n, c) => find(n, (x) => x.tag !== '#text' && has(x, c));

function rawText(n) {
  if (n.tag === '#text') return n.text;
  return n.children.map(rawText).join('');
}
const flat = (n) => decode(rawText(n)).replace(/\s+/g, ' ').trim();

/* ── Inline rendering ─────────────────────────────────────────────────────────────────────── */
/** `**text **` is not bold in any renderer, so a marker moves outside the whitespace it found. */
const mark = (s, m) => {
  const [, lead, body, trail] = /^(\s*)([\s\S]*?)(\s*)$/.exec(s);
  return body ? `${lead}${m}${body}${m}${trail}` : s;
};

function inline(nodes) {
  let out = '';
  for (const n of nodes) {
    if (n.tag === '#text') out += decode(n.text).replace(/\s+/g, ' ');
    else if (n.tag === 'code') out += `\`${flat(n)}\``;
    else if (n.tag === 'strong') out += mark(inline(n.children), '**');
    else if (n.tag === 'em') out += mark(inline(n.children), '_');
    else if (n.tag === 'a') out += `[${inline(n.children).trim()}](${n.attrs.href ?? ''})`;
    else out += inline(n.children);
  }
  return out;
}
const line = (nodes) => inline(nodes).replace(/\s+/g, ' ').trim();

const fence = (n) => `\`\`\`\n${decode(rawText(n)).replace(/^\n+/, '').trimEnd()}\n\`\`\``;
const quote = (md) =>
  md
    .split('\n')
    .map((l) => (l ? `> ${l}` : '>'))
    .join('\n');

/* ── Block rendering ─────────────────────────────────────────────────────────────────────── */
/**
 * `inStep` demotes a prompt card's heading from `###` to `####` when it sits inside a numbered
 * step, which is itself a `###`. Without it a table of contents shows "Prompt 3 · save the spec"
 * as a sibling of "05 · Save it into the repo" rather than a part of it, and the spine breaks.
 */
function blocks(nodes, inStep = false) {
  const out = [];
  const push = (md) => {
    if (md && md.trim()) out.push(md.trim());
  };

  for (const n of nodes) {
    if (n.tag === '#text') {
      push(line([n]));
      continue;
    }

    /* A `where` label and its command are one unit; splitting them is the whole failure mode. */
    if (has(n, 'cmd')) {
      const where = byClass(n, 'where');
      const pre = byTag(n, 'pre');
      push(`**${flat(where)}**\n\n${fence(pre)}`);
      continue;
    }

    if (has(n, 'prompt')) {
      const eyebrow = byClass(n, 'eyebrow');
      const sub = byTag(n, 'h4');
      const pre = byTag(byClass(n, 'prompt-body'), 'pre');
      push(
        `${inStep ? '####' : '###'} ${flat(eyebrow)}${sub ? ` — ${flat(sub)}` : ''}\n\n${fence(pre)}`,
      );
      continue;
    }

    if (has(n, 'gate')) {
      const eyebrow = byClass(n, 'eyebrow');
      const q = byClass(n, 'gate-q');
      push(quote(`_${flat(eyebrow)}_\n\n**${flat(q)}**`));
      continue;
    }

    if (has(n, 'fork')) {
      for (const branch of kids(n)) {
        const answer = byClass(branch, 'answer');
        const verdict = byTag(branch, 'h3');
        const body = branch.children.filter((c) => c !== answer && c !== verdict);
        push(`### ${flat(answer)} · ${flat(verdict)}`);
        push(blocks(body, inStep).join('\n\n'));
      }
      continue;
    }

    /* An aside stays an aside — quoted, recursively, fences and all. */
    if (has(n, 'note')) {
      const h = byTag(n, 'h3');
      const body = blocks(
        n.children.filter((c) => c !== h),
        inStep,
      ).join('\n\n');
      push(quote(h ? `**${flat(h)}**\n\n${body}` : body));
      continue;
    }

    if (has(n, 'phase')) {
      const eyebrow = byClass(n, 'eyebrow');
      const h = byTag(n, 'h2');
      push(`---\n\n_${flat(eyebrow)}_\n\n## ${flat(h)}`);
      continue;
    }

    if (has(n, 'masthead')) {
      const eyebrow = byClass(n, 'eyebrow');
      const h = byTag(n, 'h1');
      const stand = byClass(n, 'standfirst');
      push(`_${flat(eyebrow)}_\n\n# ${flat(h)}`);
      push(line(stand.children));
      continue;
    }

    /* The numbering is load-bearing — you cannot accept a spec you have not read — so it survives
       into Markdown rather than being handed to an `1.` that a renderer may renumber. */
    if (n.tag === 'ol' && has(n, 'steps')) {
      for (const li of kids(n)) {
        const num = byClass(li, 'num');
        const head = byClass(li, 'step-head');
        const title = byTag(head, 'h3');
        const who = byClass(head, 'who');
        push(`### ${flat(num)} · ${flat(title)}`);
        if (who) push(`_${flat(who)}_`);
        const body = byClass(li, 'step-body');
        push(
          blocks(
            body.children.filter((c) => c !== head),
            true,
          ).join('\n\n'),
        );
      }
      continue;
    }

    if (n.tag === 'ul' || n.tag === 'ol') {
      const bullet = (i) => (n.tag === 'ul' ? '-' : `${i + 1}.`);
      push(
        kids(n)
          .map((li, i) => `${bullet(i)} ${line(li.children)}`)
          .join('\n'),
      );
      continue;
    }

    if (n.tag === 'table') {
      const rows = [
        ...n.children.flatMap((c) =>
          c.tag === 'thead' || c.tag === 'tbody' ? kids(c) : c.tag === 'tr' ? [c] : [],
        ),
      ];
      const cells = (tr) => kids(tr).map((td) => line(td.children).replace(/\|/g, '\\|'));
      const head = rows.find((tr) => kids(tr).some((td) => td.tag === 'th'));
      const body = rows.filter((tr) => tr !== head);
      const md = [];
      if (head) {
        md.push(`| ${cells(head).join(' | ')} |`);
        md.push(
          `| ${cells(head)
            .map(() => '---')
            .join(' | ')} |`,
        );
      }
      for (const tr of body) md.push(`| ${cells(tr).join(' | ')} |`);
      push(md.join('\n'));
      continue;
    }

    if (n.tag === 'pre') {
      push(fence(n));
      continue;
    }
    if (n.tag === 'h1') {
      push(`# ${line(n.children)}`);
      continue;
    }
    if (n.tag === 'h2') {
      push(`## ${line(n.children)}`);
      continue;
    }
    if (n.tag === 'h3') {
      push(`### ${line(n.children)}`);
      continue;
    }
    if (n.tag === 'h4') {
      push(`#### ${line(n.children)}`);
      continue;
    }
    if (n.tag === 'p') {
      push(has(n, 'eyebrow') ? `_${line(n.children)}_` : line(n.children));
      continue;
    }
    if (n.tag === 'footer') {
      push('---');
      push(blocks(n.children, inStep).join('\n\n'));
      continue;
    }
    if (n.tag === 'style' || n.tag === 'title' || n.tag === 'link') continue;

    /* Everything else is a wrapper the layout needed and Markdown does not: .stack, .scroll,
       section, header, .step-body, .prompt-body. Descend and keep the blocks. */
    push(blocks(n.children, inStep).join('\n\n'));
  }

  return out;
}

/* ── Emit ────────────────────────────────────────────────────────────────────────────────── */
const src = readFileSync(SOURCE, 'utf8');

const split = src.indexOf('<div class="wrap"');
if (split === -1) {
  console.error(
    `guide:dist — ${SOURCE} has no <div class="wrap">, so head and body cannot be told apart.`,
  );
  process.exit(1);
}
const headSrc = src.slice(0, split).trim();
const bodySrc = src.slice(split).trim();

const title = flat(byTag(parse(headSrc), 'title')) || 'Tcules Component Workflow';

/* The shell the fragment was authored against: a doctype, a viewport, and the two reset rules the
   artifact host injected. Base first, so the guide's own stylesheet wins on any overlap. */
const html = `<!doctype html>
<!--
  Generated by scripts/guide-dist.mjs from ${SOURCE}. Do not edit; edit the source and rerun
  \`npm run guide:dist\`. Self-contained apart from the Google Fonts link, which degrades to the
  fallback stacks offline.
-->
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<style>
  :root { color-scheme: light dark; }
  img { max-width: 100%; }
</style>
${headSrc}
</head>
<body>
${bodySrc}
</body>
</html>
`;

const md = `<!--
  Generated by scripts/guide-dist.mjs from ${SOURCE}. Do not edit; edit the source and rerun
  \`npm run guide:dist\`.
-->

${blocks(parse(bodySrc).children).join('\n\n')}

---

_This Markdown is generated from \`${SOURCE}\`, which is the source of truth. Edit the HTML, never
this file._
`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/${OUT_NAME}.html`, html);
writeFileSync(`${OUT_DIR}/${OUT_NAME}.md`, md);

const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(1)} KB`;
console.log(`guide:dist — "${title}" from ${SOURCE}`);
console.log(
  `  ${OUT_DIR}/${OUT_NAME}.html  ${kb(html)}  standalone page, opens by double-click`,
);
console.log(`  ${OUT_DIR}/${OUT_NAME}.md    ${kb(md)}  ${md.split('\n').length} lines`);
