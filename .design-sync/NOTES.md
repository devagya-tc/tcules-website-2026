# design-sync notes — tcules-website-2026

Repo-specific gotchas for future syncs. Read this before re-running.

## Shape and entry

- This repo is a **Next.js app, not a published library** — there is no `dist/` and no
  `main`/`module`/`exports` in package.json. Do **not** let the converter synthesise an entry from
  `src/`: it would `export *` from every `.tsx` under `src/`, dragging route files, `next/link` and
  the `@/content` seam into the bundle.
- Instead the sync has its own committed library entry, `.design-sync/ds-entry.ts`, which re-exports
  the two public tier barrels (`@/components`, `@/patterns`) and imports `.design-sync/ds-styles.css`.
  Pass it with `--entry .design-sync/ds-entry.ts`.
- Because there is no shipped `.d.ts` tree, `cfg.buildCmd` runs
  `npx tsc -p .design-sync/tsconfig.dts.json` to emit declarations to `dist/types/` (gitignored).
  `findTypesRoot` picks `dist/types` up automatically. **Run it before the converter** or every
  `<Name>.d.ts` degrades to a stub.
- `componentSrcMap` enumerates all 9 components on purpose: with an explicit `--entry` and no
  shipped `.d.ts`, `exportedNames()` returns empty, so the map IS the component list.

## `cfg.tsconfig` must be a minimal, comment-free file — this one bites

`lib/bundle.mjs`'s tsconfig parser strips `/* */` comments with a regex before `JSON.parse`. In the
repo's real `tsconfig.json` the `"@/*"` key opens a false block comment that runs to the `*/` inside
`"**/*.ts"`, corrupting the JSON — so the plugin silently returns **null** and `cfg.tsconfig:
"tsconfig.json"` does nothing. (Builds still worked, because esbuild discovers `tsconfig.json`
itself and resolves `@/*` natively.) A `"//"` comment key breaks it the same way.

So `.design-sync/tsconfig.bundle.json` deliberately contains **only** the two `next/*` shim
mappings and no `@/*` entry: `@/*` is left to esbuild's own discovery, which correctly resolves a
directory to its `index.ts`. The converter's paths plugin does not — it returns the directory and
esbuild fails with `Cannot read file "src/components": is a directory`. **Do not add `@/*` to that
file.**

## Next.js runtime is shimmed out

`SiteNav` imports `next/link` and `next/navigation`; `SiteFooter` imports `next/link`. Bundling the
real modules pulls Next's client router in, which reads `process.env.__NEXT_*` at module scope and
throws `ReferenceError: process is not defined` before anything reaches `window.Tcules` — **all 9
components fail, not just the two**. (Symptom: `[BUNDLE_EXPORT] 9/9 not a component`.)

`.design-sync/shims/next-link.tsx` renders an `<a>` and strips the Next-only props;
`.design-sync/shims/next-navigation.tsx` implements `usePathname()` reading
`globalThis.__DS_PATHNAME__` (default `/`). `SiteNav.tsx`'s preview sets that global to
`/services/design-systems` so the active-item state in the card is real. Shimming dropped the
bundle from 412 KB to 54 KB.

## Preview `.tsx` files are type-STRIPPED, not type-checked

esbuild erases types without checking them, so an invalid prop value fails **silently at render**.
This cost a debugging cycle: `<Cluster colGap="gutter">` produced no gap class at all, collapsing
the Icon and Logo rows to zero spacing. **`Cluster` caps at `block`** — `gutter`, `stack`,
`column`, `section` are Layout-only. Audit previews for this after editing; a quick regex over
`<Cluster|Layout … rowGap/colGap="…">` against the allowed sets catches it.

## Known render warns (expected — not new)

- `[FONT_REMOTE]` for "Newsreader", "Public Sans", "Geist Mono". The families are served by a
  Google Fonts `@import` that sits at line 1 of `_ds_bundle.css`, which is a valid position, so they
  **do** load here. Verified visually in the Prose and Section sheets. Note the irony recorded in
  `src/styles/tokens/fonts.css`: the same `@import` is dead in the Next build (it lands mid-stylesheet
  and is dropped), which is why the app uses a `<link>` in `layout.tsx` instead.

## Card presentation

Six components carry `cfg.overrides.<Name>.cardMode = "column"` — `Section`, `Layout`, `Cluster`,
`Icon`, `Logo`, `SiteNav`, `SiteFooter`. The product's card grid cell is ≤728px, and in a 2-up grid
these components' stories broke words character-by-character or clipped. `SiteNav` also declares
`viewport: "1280x420"` (below 1024 it renders its mobile drawer, so a default 900px card showed only
a logo and a hamburger) and `SiteFooter` `viewport: "1280x1500"` (five bands do not fit 700px).
Note an explicit `viewport` **is** grade-keyed — changing it needs a full `package-build.mjs`, not a
targeted `preview-rebuild.mjs`, or capture prints `[CONFIG_STALE]`.

## Grouping

`cfg.docsDir` points at `.design-sync/groups/`, which holds frontmatter-only `<Name>.md` stubs whose
sole job is setting `category` to the repo's own tier vocabulary (Primitives / Patterns). Discovery
binds them by basename, so there is no `docsMap` enumeration to maintain. The bodies are empty
deliberately — an empty body still lets the converter synthesise `.prompt.md` from JSDoc, props and
preview examples; adding prose there would replace that synthesis. See `groups/README.txt`.

## Re-sync risks — what to watch

- **`dist/types/` is gitignored and required.** A fresh clone must run `cfg.buildCmd` first, or every
  `.d.ts` silently degrades. This is the most likely cause of a bad re-sync.
- **`Icon.d.ts` is hand-pinned.** `IconName = keyof typeof glyphs` collapses to `unknown` in the
  extractor, so `cfg.dtsPropsFor.Icon` carries the 17-value union verbatim. **If a glyph is added to
  or removed from `src/components/Icon/glyphs.ts`, that union and `previews/Icon.tsx`'s `NAMES` array
  both go stale silently** — nothing checks them. Regenerate from
  `dist/types/components/Icon/glyphs.d.ts`.
- **Preview content is inlined, not `$ref`'d.** `SiteNav.tsx` and `SiteFooter.tsx` previews carry a
  hand-trimmed copy of the IA from `src/content/sources/fixtures/navigation.ts`. If the real fixture's
  shape changes, the previews still compile against the old copy. They are trimmed on purpose (the
  full IA overflows a card), so this is a deliberate cost, not a bug — but re-check them when the
  pattern types change.
- **The shims track Next's API surface.** If a component starts importing something else from
  `next/*` (e.g. `useSearchParams`, `useRouter`), the bundle will fail to resolve it and the shim
  needs the export added.
- **Only statically-renderable states are covered.** SiteNav's open mega-menu panel and mobile
  drawer, and every hover/press/focus state, need interaction and are not in any card.
- Toolchain at last sync: node v26.0.0, esbuild + ts-morph + playwright installed under `.ds-sync/`.
