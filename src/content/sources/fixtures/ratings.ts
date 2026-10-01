import { EXTERNAL } from '@/lib/routes';

/**
 * Third-party ratings, ONE place each, so every badge that shows one shows the same number.
 *
 * Read off the real Clutch profile on 2026-08-26 (linked from EXTERNAL.clutch). A STRING, not a
 * number: nothing formats or averages it, and Clutch publishes one decimal place, so a score that
 * lands on a whole number must still print as "5.0". Re-read the profile when updating it — a score
 * that drifts from its source is the failure this file exists to prevent. Used by the footer's
 * brand block and the service pages' testimonial band (1 Oct 2026).
 */
export const CLUTCH_RATING = {
  platform: 'Clutch',
  mark: 'clutch',
  score: '4.8',
  href: EXTERNAL.clutch,
} as const;
