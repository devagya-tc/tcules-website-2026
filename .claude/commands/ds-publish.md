---
description: Regenerate the Design System artifact from this repo and publish what changed
argument-hint: nothing — it always publishes the current checkout of main
---

# Publish the design system

The Design System artifact is **https://claude.ai/artifact/Ait8sArmESntEWeu5zhryj**. The repo is the
source of truth (owner, 20 Oct 2026; `docs/decisions/2026-10-20-ds-artifact-from-repo.md`): every file
the build writes is overwritten here, whatever was edited on the artifact page meanwhile. This replaces
the built-in `/design-sync`, which targeted the retired Claude Design project — never run that.

## 1. Build and prove it

1. Be on `main`, clean, and up to date (`git pull`). The build stamps the commit into `tokens.json`
   and the index; a `+dirty` ref means it was not built from a commit. Stop and say so rather than
   publishing one.
2. `npm run ds:build`. It prints the card count, live previews vs floor cards, and the publish plan.
   Read every `note:` line. A unit that lost its live preview since the last sync is a regression in
   its specimen: fix it in the repo first.
3. `npm run ds:check`. Every live preview must render, headless, the way the artifact frame loads
   it. Two 404s are expected and harmless: `/site/clients/missing.svg` (a specimen showing the missing
   state) and `/api/design/enquiry` (a form post). Any other failure stops the publish.

## 2. Publish

Read `.design-sync/out/plan.json`. Then, with the Artifact tool, in this order:

1. **Assets.** For each entry in `assets.changed`, upload it: `action: "publish"`, `url` the
   artifact, `asset: true`, `file_paths` the entries' `file` paths (absolute). Keep each returned
   blob id by the asset's `name`.
2. **Files, call by call.** `.design-sync/out/calls/<n>.json` holds each publish's exact arguments,
   in order: the changed files first (list form, with a `contentType` where the extension needs one),
   then the removals (a map of `"project/x": null`). For each, in order: `url` the artifact, `root`
   the absolute path of `.design-sync/out`, and `file_path` and `files` copied verbatim from the file.
   The payloads are large; a background agent can run them so they stay out of the main context.
3. **The index, last.** `read` `project/design-system.json` right before, then change only:
   - `libraries` to `plan.libraries`;
   - `assetGroups.Logos`: `{"name": "Logos", "tile": "l", "order": [names], "files": {name: {"name", "blob", "size", "type"}}}`
     using the new blob ids, and the ids recorded in `.design-sync/.cache/ds-published.json` for
     unchanged assets; `"Logos"` first in `groups`;
   - `lastChange`: `{"by": "<git user.name>", "at": "<now>", "via": "Claude Code · tcules-website-2026@<plan.commit>", "note": "<n> files: <what changed>"}`.

   Keep every other key exactly as read, and its `createdOnFiles` object. Publish it alone, with `root`
   and `file_path` that file.
4. **Record it.** `node scripts/ds-artifact/build.mjs --mark-published --assets '{"<name>": "<blob id>", …}'`
   with the ids from step 1 (`'{}'` when none were uploaded). The next build then sends only what
   changed after this.

A refused publish because someone saved meanwhile: re-read the files the refusal names and publish
again, once. A second refusal: stop and tell the owner.

## 3. Report

One short paragraph: the commit, how many files changed, any unit that went from live to floor or
back, anything in `notes` that is new. Give the artifact link. No screenshots
(decisions/2026-10-09-no-screenshots-to-owner).
