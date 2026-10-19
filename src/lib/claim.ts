/**
 * A case title read as its client and its claim: "Doodle: meeting times people will actually keep"
 * → eyebrow "Doodle", title "Meeting times people will actually keep". Presentation of the authored
 * words, not a rewrite: only the claim's first letter is raised, and a run-in's closing full stop
 * ("…inside Moodle.") is punctuation, not part of the claim. A title with no colon stays whole, with
 * no eyebrow. Shared by every page that features a case as TestimonialCase (home, the case index).
 */
export function splitClaim(heading: string): { eyebrow?: string; title: string } {
  const at = heading.indexOf(':');
  if (at < 1) return { title: heading };
  const rest = heading
    .slice(at + 1)
    .trim()
    .replace(/\.$/, '');
  return {
    eyebrow: heading.slice(0, at).trim(),
    title: rest.charAt(0).toUpperCase() + rest.slice(1),
  };
}
