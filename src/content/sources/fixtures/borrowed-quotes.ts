/**
 * PLACEHOLDER — a real testimonial from ANOTHER corpus page, shown where a band's own source authors
 * none, keyed by the route and band it is shown in.
 *
 * The owner asked on 11 Oct 2026 (home review, round 3) to "assume all 4 have a quote" in "Why teams
 * choose Tcules": three of the four reasons carry their client's words and "We can build what we
 * design" carries none. The quote below is NOT retyped: it names the page and the testimonial id,
 * and the content seam reads the quote block from that page with the same loader, so the words are
 * the corpus's own, verbatim. Trishanya Raju's quote from `/case-studies` speaks to design and
 * development together and is about The Wandering Raven, the work the reason names; it is not shown
 * anywhere else on the home page.
 *
 * It stands in until the content team authors the reason's own quote (docs/content-proposals.md
 * P39). Read only through `getBorrowedQuotes` (source.ts).
 */
export type BorrowedQuoteRef = {
  band: string;
  item: string;
  from: string;
  testimonialId: string;
};

export const BORROWED_QUOTES: Readonly<Record<string, readonly BorrowedQuoteRef[]>> = {
  '/': [
    {
      band: 'why-tcules',
      item: 'We can build what we design',
      from: '/case-studies',
      testimonialId: 'SSOT-TRISHANYA-RAJU-FOUNDER-THE-WANDERING-RAV',
    },
  ],
};
