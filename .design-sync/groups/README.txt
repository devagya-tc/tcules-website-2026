Frontmatter-only stubs, bound to components by basename discovery (cfg.docsDir).

They exist for ONE reason: to set each component's group in the Claude Design pane to the
repo's own tier vocabulary — Primitives (tier 1) and Patterns (tier 2) — instead of the
converter's path-derived default, which flattens all seven primitives to "general".

The body is deliberately empty. An empty body means the converter still SYNTHESIZES each
.prompt.md from the component's JSDoc, its extracted props and its preview examples; a stub
with prose in it would replace that synthesis with the prose. Do not add content here.
