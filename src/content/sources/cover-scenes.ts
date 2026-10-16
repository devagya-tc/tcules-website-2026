import type { ArticleSceneName } from '../../lib/sketches.ts';

/**
 * Which insight carries which DRAWN cover scene, by its CMS slug (owner, 13 Oct 2026). Each scene is
 * drawn for that one article from its own argument (components/Sketch, the article scenes), and
 * stands as its cover until a real one exists — at which point its row is deleted. Assigned on
 * purpose, one row per article; nothing here is inferred from a keyword. Read by the insights source
 * mapper. Only live items without a cover are drawn for; fixture content falls back to photographs.
 */
export const COVER_SCENES: Readonly<Record<string, ArticleSceneName>> = {
  'accepting-ai-generated-front-end-code-what-review-is-for-now': 'code-review',
  'vibe-coded-app-security-checklist': 'security-checklist',
  'vibe-coded-app-production-ready': 'prototype-to-production',
};
