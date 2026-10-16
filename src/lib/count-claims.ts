/**
 * An authored count of the things a listing lists, taken out of its sentence (critique 16 Oct 2026,
 * content-proposals P48).
 *
 * An index derives its counts from the source — the format row says "Articles 42", the archive says
 * "42 articles · newest first" — so a lede that says "Twelve articles from Tcules designers…" puts two
 * numbers that disagree on one screen, and any authored number drifts the day something is
 * published. A page that shows a derived count never also prints an authored one: the count word
 * leaves and nothing else changes ("Twelve articles from…" → "Articles from…", "Eight practical
 * guides for…" → "Practical guides for…"). Only a count that STARTS a sentence and counts a listed
 * thing is taken: "7+ years of experience" and "eight interviews" mid-sentence are method, not a
 * listing's size. The same words `npm run corpus:check` notes in a lede, so what the check flags is
 * what the page leaves out until the copy is corrected.
 */
const COUNT_WORD =
  '(?:\\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|twenty|thirty|forty|fifty)';
const LISTED =
  '(?:articles|guides|videos|events|podcasts|episodes|interviews|reports|case studies|cases|conversations|recordings|sessions|walkthroughs|pieces)';

/* A count at the start of the text or of a sentence, then at most one qualifier, then the listed noun. */
const COUNT_AT_START = new RegExp(
  `(^|[.!?]\\s+)${COUNT_WORD}\\s+((?:[a-z-]+\\s+)?${LISTED}\\b)`,
  'giu',
);

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** The text with every sentence-initial listing count removed; anything else returned untouched. */
export function withoutCountClaims(text: string): string {
  return text.replace(
    COUNT_AT_START,
    (_, start: string, rest: string) => start + capitalise(rest),
  );
}
