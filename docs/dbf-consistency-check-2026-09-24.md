# DBF consistency check · 24–25 September 2026

**Chapters:** ch02 Colour v1.0, ch05 Imagery v1.0, ch10 Social media v1.0, in the Claude Design
project *Tcules Design System - Aug 2026*.

**Status: complete.** Every rule can be followed alongside every other rule, within each chapter
and across the three. Nothing is left open, deferred, drafted, flagged, void or "predates".
- Items that were wrong were corrected.
- Items that had no place were removed. This includes the superseded OmnyAI cover annotation, the
  V7 detail-capture figure, and the list of template fixes.
- The decision sheets (ch05 §12, ch10 §F2) are now decision records: each row states the outcome
  and the rule it is written into.

**How it got here:** five check-and-fix passes. The owner resolved about 60 real choices on
24–25 September; the rest were mechanical knock-ons of those choices.

## Outside the guidelines

These are real work items. They are not guideline gaps, so they sit in `docs/TRACKER.md`.

- **Templates (0.7):** bring `social-posts-v3`, `hiring-poster` and `hiring-poster-detail` in
  line with ch10 v1.0.
- **Website code:**
  - `Figure` and `PageHero` need a media `kind`, because cut-outs and illustrations take no edge.
  - Images need a responsive slot to serve the §9 derived widths as WebP with alpha.
  - Non-case-study cards become media-less.
  - The nav card keeps its 4px radius as the one named exception.
