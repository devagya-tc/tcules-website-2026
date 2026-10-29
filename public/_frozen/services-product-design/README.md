# Frozen: /services/product-design

A static copy of the product design page exactly as `main` rendered it, served at
`/services/product-design` while Devagya finishes the page on the 26 Oct copy (branch `feat/new-copy`).
Devagya asked for it on 29 Oct 2026: "save a static copy of the product design page as it appears on
main".

**This is temporary.** When the new product-design page ships, delete this folder and
`src/app/services/product-design/route.ts`, and put `/services/product-design` back on
`PASS_1_OFFER_ROUTES` in `src/app/_corpus/offer.tsx`.

## What it is

- **Captured from:** `main` at `c9059dae` (Merge pull request #168, 29 Oct 2026), production build
  (`next build && next start`), captured 29 Oct 2026.
- `index.html` is the page's rendered HTML. `_next/static/chunks/` holds every CSS and JS chunk it
  loads; the other folders hold the local images and textures it uses. Every one of those URLs in the
  HTML, the CSS and the Turbopack runtime was rewritten to `/_frozen/services-product-design/…`, so
  the copy does not depend on the current build's chunks or public files. Cloudinary images and the
  Google Fonts stylesheet stay remote.
- **The JavaScript is kept and hydrates.** The nav menu, the phone drawer and the FAQ work. Links
  leave to the current site as full page loads.
- `src/app/services/product-design/route.ts` serves `index.html` (read once at build,
  `force-static`). That static segment outranks `services/[...slug]`.

## Checks that skip it

Built output, not source: `eslint.config.mjs` ignores `public/_frozen/**` and `.prettierignore` lists
`public/_frozen/`. Nothing else in `npm run verify` reads this folder.
