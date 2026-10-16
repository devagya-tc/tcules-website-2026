/**
 * The insights formats: the one union, their order and their names (fix round 1, 16 Oct 2026). A
 * leaf, so routes, the content view model, the templates and the app all read the same list; a
 * format added here is added everywhere, and nothing casts between copies.
 */

/** The seven formats the insights family publishes. */
export type InsightFormatKind =
  'article' | 'guide' | 'research' | 'podcast' | 'video' | 'event' | 'interview';

/**
 * The formats in page order. The hub re-deals them so a covered group and a text group take turns;
 * the format row lists them in this order too, so the family reads the same everywhere.
 */
export const INSIGHT_FORMAT_ORDER: readonly InsightFormatKind[] = [
  'article',
  'event',
  'podcast',
  'research',
  'video',
  'interview',
  'guide',
];

/** Each format's name, singular and plural. Sentence case: a mono label uppercases in CSS. */
export const INSIGHT_FORMAT_LABEL: Record<InsightFormatKind, { one: string; many: string }> = {
  article: { one: 'Article', many: 'Articles' },
  guide: { one: 'Guide', many: 'Guides' },
  research: { one: 'Research', many: 'Research' },
  podcast: { one: 'Podcast', many: 'Podcasts' },
  video: { one: 'Video', many: 'Videos' },
  event: { one: 'Event', many: 'Events' },
  interview: { one: 'Interview', many: 'Interviews' },
};
