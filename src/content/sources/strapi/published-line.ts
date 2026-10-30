/* The body's date-and-reading-time line, shared by the blog page, its "Explore other resources"
   cards and the insights listing. Strapi's `publishedAt` is when an entry was last PUBLISHED in the
   CMS — every live article re-published on 28–30 Oct 2026 — so it is never the piece's date; the
   authored line is (all 102 live articles carry one, 30 Oct 2026). */

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/**
 * The body's date-and-reading-time line ("2 May ‘25 ⸱ 11 Min Read", or "8 Min Read" alone) split into
 * the authored date as ISO and the reading time ("11 min"). The CMS carries both in one title-only
 * iframe block; the page presents them as two byline pairs.
 */
export function publishedLine(line: string): { date?: string; readingTime?: string } {
  const minutes = /(\d+)\s*min\s*read/iu.exec(line)?.[1];
  const day = /(\d{1,2})\s+([a-z]{3})[a-z]*\s+[‘’']?(\d{2}|\d{4})\b/iu.exec(line);
  const month = day ? MONTHS.indexOf(day[2]!.toLowerCase()) : -1;
  const year = day ? (day[3]!.length === 2 ? `20${day[3]}` : day[3]) : undefined;
  return {
    ...(day && month >= 0
      ? { date: `${year}-${String(month + 1).padStart(2, '0')}-${day[1]!.padStart(2, '0')}` }
      : {}),
    ...(minutes ? { readingTime: `${minutes} min` } : {}),
  };
}

/** The fields a body block needs to be recognised as the date line: a title-only iframe block. */
type DateLineBlock = {
  __typename?: string | null;
  title?: string | null;
  description?: string | null;
  url?: string | null;
  embedCode?: string | null;
};

const text = (candidate: string | null | undefined) =>
  typeof candidate === 'string' ? candidate.trim() : '';

/**
 * A piece's authored date (ISO) from its body blocks: the first iframe block with no url and no embed,
 * whose title (and description) is the date-and-reading-time line. Undefined when there is none, so a
 * card is undated rather than dated by `publishedAt`.
 */
export function authoredDate(blocks: readonly DateLineBlock[] | null | undefined): string | undefined {
  const line = (blocks ?? []).find(
    (block) =>
      block.__typename === 'ComponentBlogAndCasestudiesIframe' &&
      !text(block.url) &&
      !text(block.embedCode) &&
      text(block.title),
  );
  return line
    ? publishedLine([text(line.title), text(line.description)].filter(Boolean).join(' — ')).date
    : undefined;
}
