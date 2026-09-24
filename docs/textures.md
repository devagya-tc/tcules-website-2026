# Textures

A texture is a repeating tile, written once as geometry and exported in whatever form you need.
The export is the bare pattern. Masking, fading and blurring are left to whoever applies it, the
same way a designer works with it in Figma.

| | |
|---|---|
| Spec | `src/styles/textures/<name>.json`, the source of truth |
| Generator | `npm run texture -- --help` |
| Web tile | `public/textures/pixel-grid.svg`, a mask (black at the texture's alphas) |

## pixel-grid

Measured from the Figma shader on node `435:2744`. The render is a single 5×5 tile repeated
exactly, and the spec reproduces it to within 8/255 per pixel at 1x. Each tile is a 3px column
built from five rows: two dashes at 21%, a seam at 7% and caps at 3.5%. That row structure is
what makes it read as an LCD column rather than as dashes, so it is part of the spec.

- **Pitch and cells are fixed.** They are the texture. Colour is the only thing a use varies.
- **Units are layout px.** An `@2x` export doubles every pixel, so the texture looks the same
  size at any density. Only integer scales are allowed; at 1.5x a 1px row falls across a pixel
  seam and blurs.
- **Colour** takes a primitive name (`brandeis-500`, the default) or a hex value.

```sh
# a tile for a design tool's pattern fill
npm run texture -- --out pixel-grid.svg
npm run texture -- --scale 2 --out pixel-grid@2x.png

# a full-size asset, retina, a lighter blue for a dark ground
npm run texture -- --color brandeis-200 --size 1080x1350 --scale 2 --out social@2x.png

# flattened onto paper, for comparison with the Figma render
npm run texture -- --ground paper --size 778x972 --out check.png
```

## On the site: `Texture`

A primitive in `src/components/Texture`, and it follows the Figma workflow: place shapes, blur
them, and the grid shows through them. The grid itself is never blurred, which is why it's SVG. A
CSS filter would soften the pattern along with the shape. It reads the same JSON spec as the
exporter, so the page and the assets can't drift apart.

```tsx
<Section>
  <Texture>
    <TextureShape top={-180} width="92%" height={288} blur={164} />
    <TextureShape bottom={-180} width="92%" height={288} blur={164} />
  </Texture>
  …content…
</Section>
```

- **Placement** works like absolute positioning: `top` / `bottom`, `left` / `right`, `width`,
  `height`, each in px or `%` of the band. Leave both sides of an axis out and the shape is
  centred on it. Shapes may hang off the band; the band clips them, and their blur still bleeds in.
- **`blur` takes Figma's number** (the Layer blur field). It renders as a Gaussian of half that
  value, which was fitted against the Figma render and lands within 2.5/255 of it.
- **`kind="ellipse"`** and **`radius`** cover the other shapes.
- **Colour** is `--tex-ink`, set per surface in `tokens/components/texture.css`. It is not a prop.
- **Stacking.** The field sits under the band's content. `Section` isolates itself so that works;
  inside any other box, the box needs `position: relative; isolation: isolate`.

Specimen: `/design/texture`. It shows each step of the workflow, the measured frame rebuilt, every
anchor, all four surfaces, and the candidate inks for the dark grounds.

**Open:** tint, ink and blue are provisional: neutral-400 on paper-deep (deliberately quieter than
blue on paper; 700 read as too apparent), brandeis-500 on ink, white on blue. Pick from the specimen's candidates, then settle
those blocks and delete the `.texInk*` classes in the
specimen harness.

For anything that isn't the site, `public/textures/pixel-grid.svg` is the tile as a mask:

```css
background-color: …;
mask-image: url(/textures/pixel-grid.svg);
mask-size: 5px 5px;
```
