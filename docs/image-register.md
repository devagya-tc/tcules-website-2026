# Image register — `_pages` corpus

Every image slot the first-pass pages need that the frontmatter does **not** already bind. A
`media_bindings` entry with `status: BOUND_EXISTING_PUBLIC_ASSET` and an `asset_uri` is used as is
and does not appear here. Anything else gets a labelled placeholder in the page and a row below, so
the asset list is generated from the design rather than guessed. No image is generated in this pass.

Started 10 Oct 2026. Briefs and generation happen later.

## Columns

| Column        | Meaning                                                              |
| ------------- | -------------------------------------------------------------------- |
| Page          | Route the slot is on (`/services/product-design`).                   |
| Band          | Band id the image sits in or beside.                                 |
| Kind          | `illustration`, `product shot`, `studio photo`, `icon` or `diagram`. |
| What it shows | The subject, in one sentence. Concept first, not style.              |
| Ratio         | The frame the design reserves, e.g. `16:9`, `4:3`, `1:1`.            |

## Register

| Page | Band | Kind | What it shows | Ratio |
| ---- | ---- | ---- | ------------- | ----- |
