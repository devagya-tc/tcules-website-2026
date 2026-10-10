# Icon

## 0 · Front matter

| | |
|---|---|
| **Component** | `Icon` |
| **Tier** | 1 primitive (`src/components/Icon/`) |
| **Status** | implemented |
| **Token prefix** | `--icn-*` |
| **File** | `tokens/components/icon.css` |
| **Source of truth** | DBF ch04 · Iconography (`docs/brand/04 Iconography.html`) |
| **Implemented at** | `src/components/Icon/` · `src/styles/tokens/components/icon.css` · `src/app/design/icon/page.tsx` |

This document did not exist before 29 Sep 2026: `Icon` shipped from the Button spec's glyph
requests and from the reasoning in `glyphs.ts`, `Icon.tsx` and `icon.css`, which remain the
detailed record. It is written now so the ch04 migration has a spec to amend, and it states only
what the code does.

**Amended 29 Sep 2026 — tracker 2.17, the ch04 Solar Bold set and names.** Every hand-drawn path is
replaced by Solar Bold's own path; five glyphs take their ch04 names; `alt-arrow-up` is added; and
a 16px floor for glyphs with a counter is written down and warned on. Owner ruling carried here:
**Solar's own solid-disc glyphs (`close-circle`, `check-circle`, `info-circle`) are allowed.** ch04's
"glyphs in coloured discs" don't bans putting a glyph INTO a badge; these are single glyphs as
Solar draws them. Sections 2, 3, 4 and 7 carry the detail.

**Amended again 29 Sep 2026 — tracker 2.17, ListCard's off-site cue.** `arrow-right-up` (Iconify
`solar:arrow-right-up-bold`) is added as the trailing form of "leaves the site". Owner ruling: the
filled `square-arrow-right-up` beside plain `arrow-right` cues read as a badge among arrows, so a
trailing cue that sits beside `arrow-right` takes the plain arrow of the same family. One meaning at
two weights, not two meanings; `square-arrow-right-up` stays ch04's standalone mark. § 2 carries it.

## 1 · Identity

A solid glyph from Solar Icons, **Bold** (480 Design, CC BY 4.0), on a 24-unit box, filled with
`currentColor`. It marks, points and confirms; it never carries a meaning the words beside it do
not already carry (ch04). It has no colour of its own and takes no colour prop.

## 2 · The set

Fifteen glyphs, each ch04's fixed choice for its meaning, and none used for another meaning.

| Glyph | Meaning (ch04) | Path source |
|---|---|---|
| `arrow-right` | Go, next, continue | ch04 embed |
| `arrow-left` | Back | ch04 embed |
| `alt-arrow-down` | Opens, expands | ch04 embed |
| `alt-arrow-up` | The open state of a control that swaps rather than turns | Iconify `solar:alt-arrow-up-bold` (not in ch04's starter set) |
| `alt-arrow-right` | Leads to a page | ch04 embed |
| `square-arrow-right-up` | Leaves the site — the standalone mark | ch04 embed |
| `arrow-right-up` | Leaves the site — trailing, beside `arrow-right` (ListCard's external row) | Iconify `solar:arrow-right-up-bold` (not in ch04's starter set) |
| `close-circle` | Close, dismiss | Iconify `solar:close-circle-bold` (ch04's cell carries check-circle by mistake) |
| `check-circle` | Done, included | ch04 embed |
| `download` | Download a file | ch04 embed |
| `copy` | Copy to clipboard | ch04 embed |
| `document-text` | A document | ch04 embed |
| `hamburger-menu` | Menu | ch04 embed |
| `info-circle` | Information | Iconify `solar:info-circle-bold` (ch04's cell carries check-circle by mistake) |
| `danger-triangle` | Warning | ch04 embed |

Where both sources carry a glyph they are the same drawing, differing only in coordinate rounding.
Paths are pasted into `glyphs.ts`; there is no icon package at runtime. **Never hand-edit a path —
replace it from source.**

### Renamed in 2.17

| Was | Now |
|---|---|
| `chevron-down` | `alt-arrow-down` |
| `chevron-right` | `alt-arrow-right` |
| `close` | `close-circle` (the old `close-circle` was a drawn disc of the same meaning; both are now Solar's one glyph) |
| `menu` | `hamburger-menu` |
| `check` | `check-circle` |
| — | `alt-arrow-up` (new) |

Call sites moved in the same change: `SiteNav` (mega trigger, sheet toggle, sheet row), `SiteFooter`
(accordion mark), `Accordion` (closed/open pair — still `alt-arrow-right` closed, `alt-arrow-down`
open; changing the pair is a separate item), `EnquiryForm` (success line), `Tag`'s documented
caller and `/insights`, and the `.design-sync` previews.

## 3 · Props / API

| Prop | Type | Default | |
|---|---|---|---|
| `name` | `IconName` | — | The union of `glyphs.ts`; a typo fails to compile |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Ignored inside a control that sizes its own glyph |
| `label` | `string` | `undefined` | Only for a glyph that carries meaning alone: gives `role="img"` and a `<title>`. Otherwise `aria-hidden` |
| `className` | `string` | `undefined` | Never for colour or size |

`hasCounter(name)` is exported beside `iconNames`: true when any of the glyph's paths carries more
than one subpath, which under evenodd is exactly what a counter is.

## 4 · Sizes, and the 16px floor

| Role | Token | px | Where |
|---|---|---|---|
| `sm` | `--icn-size-sm` | 14 | inside a 32px control |
| `md` | `--icn-size-md` | 16 | inside a 40px control; the default |
| `lg` | `--icn-size-lg` | 18 | inside a 48px control |
| `xl` | `--icn-size-xl` | 24 | standing on its own |

All four are steps of ch04's seven. **A glyph with a counter is never set below 16.** A counter is a
hole about 1.5 units wide, which at 14px is under a device pixel on a 1x screen, and the glyph
fills in. Today that is `check-circle`, `close-circle`, `danger-triangle`, `document-text`,
`hamburger-menu`, `info-circle` and `square-arrow-right-up` — but the list is `hasCounter`, derived
from the geometry, so it cannot drift from the set.

- `Icon` warns in development (`console.warn`) when a counter glyph is asked for at `sm`.
- A control that sizes its own glyph is outside what `Icon` can see, and owes the same rule:
  - **Button** — no counter glyph in an `sm` Button (`--btn-icon-size-sm` is 14). The glyphs an `sm`
    Button carries today (`alt-arrow-down` on the nav's mega triggers) have none.
  - **Tag** — `--tag-glyph-size` moved from 14 to 16 in 2.17, because the filter's one glyph is
    `close-circle`. Solar's 2-unit clearance puts the disc itself at 13.3px inside the 24 box.

## 5 · Colour

None. Filled with `currentColor`, so it takes the ink of the surface or the fg of the control and
is correct on all four surfaces without surface blocks — which is why `icon.css` declares
geometry only. Counters are holes (`fill-rule: evenodd` on the root), never shapes painted in the
ground colour, so they are right on all four as well.

## 6 · Stroke

None, at any layer. The set is one drawing style, Solar Bold; the pre-ch04 hand-drawn glyphs and
the stroked idiom before them are both gone. ch04: a stroked glyph beside a solid one reads as a
different weight of type.

## 7 · Specimen plan

`/design/icon`: the set; one meaning per glyph; every glyph at every size role it may take (the
`sm` row omits counter glyphs); the 16px floor; stroked-versus-solid gone, with the rename table;
the control deciding size; labelled versus hidden; and every glyph at every size on all four
surfaces.

## Amendment · 1 Oct 2026 — content glyphs and chrome glyphs

Owner: *"we should stick to solar bold icons for the content area and use more widely used icons for
chrome like the hamburger menu."* Solar Bold stays the content set. The site's own navigation controls
are read by convention, so they take the universal marks: `chrome-menu` (three plain bars) and
`chrome-close` (a plain cross), the house drawings the nav shipped before the Solar move, restored under
a `chrome-` prefix so the content area cannot reach for them by accident. SiteNav's toggle uses them.
Solar's `hamburger-menu` and `close-circle` remain for content use (the filter chip's clear, for one).

