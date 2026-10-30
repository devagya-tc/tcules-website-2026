/**
 * A person's initials for a stand-in portrait: the first letter of the first and last words
 * ("Parasharan Chari" → "PC", "Madonna" → "M"). Shared by every pattern that draws a person without
 * a photograph (PageHero's byline, Contributors), so the two never disagree on the same name.
 */
export const initialsOf = (name: string) => {
  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? (words[words.length - 1]?.[0] ?? '') : '';
  return `${first}${last}`;
};

/** Where a portrait's square crop is anchored when its record names no focus: centred, a little
 *  above the middle, where a face sits in a head-and-shoulders photograph. */
export const PORTRAIT_FOCUS = { x: 0.5, y: 0.4 } as const;
