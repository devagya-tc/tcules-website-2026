---
title: "The photo tone layer is made later in Figma"
date: 2026-10-09
status: active
area: [imagery, process]
source: "Owner, 9 Oct 2026"
supersedes: []
dbf: []
dbf_status: none
enforced_by: "review"
legacy: "memory/photo-tone-via-figma-mcp.md"
---

The IRL photo tone treatment (`--media-photo-grade`, `none` by default) will be developed later using the Figma MCP for fast iteration: try grades on real photos in Figma, pick one, then write the token value.

**Why.** The treatment is a visual judgement call, and iterating on it in code is slow.

**The mistake it prevents.** Inventing a filter in code.

**How to apply.** Whenever photo grading or `--media-photo-grade` comes up, remind the owner of this approach before proposing any values.
