# Brief 02 — Rich Text

> **Ships today. Do not specify this.** `src/components/Prose` styles every one of the twelve
> elements the audit found across 129 bodies. What remains open is where three content shapes get
> routed, and that is a content-seam decision.

| | |
|---|---|
| Inventory | #02 Rich Text — 129 pages, 100%, 12 elements |
| Implemented at | `src/components/Prose/` · `src/styles/tokens/components/prose.css` · `/design/typography` |
| API | `as` · `html` (a trusted, seam-sanitised string) · `children` |

## The twelve elements, mapped

Paragraph · h2 (802) · h3 (469) · h4 (12) · bold (555) · italic (105) · inline link (827) ·
unordered list (1,093 items) · ordered list (181) · blockquote (22) · inline code (2) — all styled
inside `Prose.module.css`, which also carries `table`, `caption`, `dl` and `figure` selectors the
audit did not ask for.

Two audit rules are already the component's own argument: **no width variants** (the parent decides
how wide the text runs — `Prose` has no `size` prop and no measure override) and **no h1** (one page,
one h1, owned by the hero).

## What is still open

1. **H1 must not be exposed in the editor.** Not a component change — `Prose` cannot refuse an h1
   inside an opaque string. It is a CMS field configuration, and it belongs in the Strapi source
   when that lands. Until then it is a rule with nothing enforcing it. Recommendation: the seam
   strips h1 from a body field and logs it, so the failure is loud rather than a page with two
   titles.
2. **The bold-term bullet.** 33 sections carry a term-and-definition bullet list, in three written
   forms — `**Term:** definition`, `**Term.** definition`, `**Term** definition`. Left as prose it
   is 33 grey lists; promoted, each becomes a `ListCard` row. **Decide once, per page family.** See
   brief 11 — the reconciliation puts 32 of these in List Card's scope, which is a third of that
   component's volume. This decision sizes brief 11.
3. **Blockquote routing.** 22 blockquotes, one element, three destinations: `Prose`'s own quote
   treatment, `Callout` (unattributed) and `Testimonial` (attributed). Attribution is the whole
   test. Recommendation: the seam splits them and emits three different fields, because a component
   sniffing its own children for a name is the kind of rule that is invisible when it misfires.
4. **Ordered lists carry two forms** — bold-lead-in steps (18 sections) and bare clause lists (17).
   One element has to read correctly as both. Worth a look at `/design/typography` against a real
   corpus example before assuming it does.

## Do not style what is absent

Not present in any of 129 files: strikethrough, nested lists, horizontal rules, footnote references,
images, definition lists, headings below h4. `Prose.module.css` already carries `dl` and `figure`
rules for content that does not exist — harmless, but they are not evidence that the shapes are
supported.
