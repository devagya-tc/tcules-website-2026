---
title: "Component tokens live in tokens/components, not beside the component"
date: 2026-08-19
status: active
area: [components, colour]
source: "CLAUDE.md § Why component tokens live in tokens/ (\"Asked and settled\"; landed 19 Aug 2026, 1608b7d)"
supersedes: []
dbf: []
dbf_status: none
enforced_by: tokens:check
legacy: "CLAUDE.md"
---
Component tokens stay in `tokens/components/*.css`, registered in `tokens/index.css`, not colocated as
`Section.tokens.css`. **`index.css` guarantees cascade order**, and a component layer must come after the
primitives and usage tokens it reads.

**Why.** Colocating would hand that ordering to the bundler's module graph, which is not controllable.
Surface remaps are global by nature, not what CSS Modules are for. The token set is delivered as one
portable folder.

**The mistake it prevents.** A component layer that loads before the usage layer and resolves to nothing,
silently: every `var()` reading it resolves in the check and to nothing in the browser.

**How to apply.** Create the layer in `tokens/components/`, named for the component, and register it in
`tokens/index.css` in the same edit. `tokens:check` fails on an unregistered layer.
