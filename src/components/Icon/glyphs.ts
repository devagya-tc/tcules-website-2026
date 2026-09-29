/**
 * The glyph set — path data only, no components.
 *
 * Every glyph is Solar Icons, **Bold** (DBF ch04 · Iconography), by 480 Design, licensed CC BY 4.0,
 * and every path below is Solar's own artwork copied verbatim. ch04: "never redraw, trace or
 * combine them". Never hand-edit a path here; replace it from source. The attribution obligation
 * of CC BY 4.0 is carried by ch04 and owed by the site too.
 *
 * ── Where each path came from ───────────────────────────────────────────────────
 * ch04 embeds the starter set, and its embed is the first source: arrow-right, arrow-left,
 * download, copy, check-circle, document-text, alt-arrow-down, alt-arrow-right, hamburger-menu,
 * square-arrow-right-up and danger-triangle are exactly as ch04 draws them.
 *
 * Four come from `@iconify-json/solar` (the `-bold` icon of the same name) instead:
 *   close-circle     ch04's cell carries the check-circle path by mistake
 *   info-circle      ch04's cell carries the check-circle path by mistake
 *   alt-arrow-up     not in ch04's starter set; the Accordion's open mark needs it next
 *   arrow-right-up   not in ch04's starter set; ListCard's off-site cue needs it (see below)
 * Where both sources carry a glyph they are the same drawing and differ only in coordinate rounding
 * (a few ten-thousandths of a unit), so mixing them is not mixing artwork.
 *
 * ── The idiom, and the one presentation rule it needs ───────────────────────────
 * Drawn on a 24×24 box, filled with `currentColor`, no stroke, and roughly 2 units of clearance
 * inside the box on each edge. That clearance is load-bearing — it is the reason a button gives
 * its icon 8px to the box edge where it gives its label 12 (see tokens/components/button.css).
 *
 * Counters are cut out of the mass, not painted on top: the cross inside `close-circle`, the tick
 * inside `check-circle`, the bars inside `hamburger-menu`. Each is ONE `d` string carrying several
 * subpaths, and `Icon.module.css` sets `fill-rule: evenodd` so the enclosed subpath knocks a hole
 * through. That is Solar's own rule for those glyphs; the glyphs Solar authors without it are a
 * single subpath each, where evenodd and nonzero fill identically, so one rule on the root serves
 * the whole set and a glyph stays a list of `d` strings and nothing else.
 *
 * ── The 16px floor for a glyph with a counter ────────────────────────────────────
 * A counter is a hole about 1.5 units wide. At 14px that is under a device pixel on a 1x screen and
 * the glyph reads as a blob, so **a glyph with a counter is never set below 16**. `hasCounter` below
 * derives which glyphs those are from the path data (more than one subpath), so the rule cannot
 * drift from the set, and `Icon` warns in development when one is asked for at `sm`. A control that
 * sizes its own glyph (Button at `sm`, Tag) is outside what Icon can see; docs/specs/Icon.md says
 * what those controls owe.
 *
 * The set is deliberately small, and it grows only when a component names a glyph it cannot do
 * without. Adding one is a deliberate act — an icon set that grows by accident is how a system
 * ends up with four arrows. Every name is ch04's fixed choice for its meaning, and none is used
 * for any other meaning:
 *
 *   ACTIONS      arrow-right (go, next) · arrow-left (back) · download · copy ·
 *                check-circle (done, included) · document-text
 *   DISCLOSURE   alt-arrow-down (opens, expands) · alt-arrow-up (its open state) ·
 *                alt-arrow-right (leads to a page) · hamburger-menu · close-circle (close, dismiss).
 *                A mega-menu trigger has to SAY it opens something and a drawer has to say it shuts,
 *                and neither claim can be made in words without two labels on one control.
 *   STATUS       square-arrow-right-up (leaves the site) · info-circle · danger-triangle
 *
 * Leaving the site has two drawings, and they are one meaning at two weights, not two meanings.
 * `square-arrow-right-up` is ch04's standalone mark. `arrow-right-up` is the same arrow without the
 * square, and it is the form a TRAILING cue takes wherever it sits beside `arrow-right`: a filled
 * square among bare arrows reads as a different kind of object — a badge — when the only difference
 * to state is direction (owner ruling, 29 Sep 2026, tracker 2.17). ListCard's external row uses it.
 *
 * Solar's solid-disc glyphs (close-circle, check-circle, info-circle) are Solar's shapes, not
 * badges: ch04's "never a glyph in a coloured disc" bans putting a glyph INTO a disc, and these
 * are single glyphs as Solar draws them (owner ruling, 29 Sep 2026, tracker 2.17).
 *
 * Note what is no longer here: the six service marks, retired by ruling O1
 * (docs/phase-2-decisions.md) — illustration jobs at icon scale, which are chapter 05. And the
 * pre-ch04 names (`chevron-down`, `chevron-right`, `menu`, `close`, `check`), retired in 2.17 for
 * the ch04 glyph of the same meaning.
 *
 * Note what is NOT here: brand marks. LinkedIn, YouTube and Clutch are trademarks with their own
 * usage rules and their own proportions — they are not drawn on this 24 box, they cannot be
 * redrawn to fit it without ceasing to be the mark, and each one carries its own permission to
 * check. The footer links to those profiles by name instead, which is also the accessible form.
 */
export const glyphs = {
  /* Movement. The trailing glyph on an action that changes where you are, and its mirror. */
  'arrow-right': [
    'M4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H13.25V18C13.25 18.3034 13.4327 18.5768 13.713 18.6929C13.9932 18.809 14.3158 18.7449 14.5303 18.5304L20.5303 12.5304C20.671 12.3897 20.75 12.1989 20.75 12C20.75 11.8011 20.671 11.6103 20.5303 11.4697L14.5303 5.46969C14.3158 5.25519 13.9932 5.19103 13.713 5.30711C13.4327 5.4232 13.25 5.69668 13.25 6.00002V11.25H4Z',
  ],
  /* Leaves the site, as a trailing cue beside arrow-right: the same Solar Bold arrow family, turned
     up and right. See the header for why it is not square-arrow-right-up in that position. */
  'arrow-right-up': [
    'M5.46967 17.4697C5.17678 17.7626 5.17678 18.2374 5.46967 18.5303C5.76256 18.8232 6.23744 18.8232 6.53033 18.5303L13.5 11.5607L17.4697 15.5303C17.6842 15.7448 18.0068 15.809 18.287 15.6929C18.5673 15.5768 18.75 15.3033 18.75 15V6C18.75 5.58579 18.4142 5.25 18 5.25L9 5.25C8.69665 5.25 8.42318 5.43273 8.30709 5.71299C8.19101 5.99324 8.25517 6.31583 8.46967 6.53033L12.4393 10.5L5.46967 17.4697Z',
  ],
  'arrow-left': [
    'M20 11.25C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H10.75L10.75 18C10.75 18.3034 10.5673 18.5768 10.287 18.6929C10.0068 18.809 9.68417 18.7449 9.46967 18.5304L3.46967 12.5304C3.32902 12.3897 3.25 12.1989 3.25 12C3.25 11.8011 3.32902 11.6103 3.46967 11.4697L9.46967 5.46969C9.68417 5.25519 10.0068 5.19103 10.287 5.30711C10.5673 5.4232 10.75 5.69668 10.75 6.00002L10.75 11.25H20Z',
  ],

  /* Named actions. A leading glyph says what KIND of action, never which direction it goes. */
  download: [
    'M12 1.25C11.5858 1.25 11.25 1.58579 11.25 2V12.9726L9.56944 11.0119C9.29988 10.6974 8.8264 10.661 8.51191 10.9306C8.19741 11.2001 8.16099 11.6736 8.43056 11.9881L11.4306 15.4881C11.573 15.6543 11.7811 15.75 12 15.75C12.2189 15.75 12.427 15.6543 12.5694 15.4881L15.5694 11.9881C15.839 11.6736 15.8026 11.2001 15.4881 10.9306C15.1736 10.661 14.7001 10.6974 14.4306 11.0119L12.75 12.9726L12.75 2C12.75 1.58579 12.4142 1.25 12 1.25Z',
    'M14.25 9V9.37828C14.9836 9.11973 15.8312 9.2491 16.4642 9.79167C17.4077 10.6004 17.517 12.0208 16.7083 12.9643L13.7083 16.4643C13.2808 16.963 12.6568 17.25 12 17.25C11.3431 17.25 10.7191 16.963 10.2916 16.4643L7.29163 12.9643C6.48293 12.0208 6.5922 10.6004 7.53568 9.79167C8.16868 9.2491 9.01637 9.11973 9.74996 9.37828V9H8C5.17157 9 3.75736 9 2.87868 9.87868C2 10.7574 2 12.1716 2 15V16C2 18.8284 2 20.2426 2.87868 21.1213C3.75736 22 5.17157 22 7.99999 22H16C18.8284 22 20.2426 22 21.1213 21.1213C22 20.2426 22 18.8284 22 16V15C22 12.1716 22 10.7574 21.1213 9.87868C20.2426 9 18.8284 9 16 9H14.25Z',
  ],
  copy: [
    'M15.24 2H11.3458C9.58159 1.99999 8.18418 1.99997 7.09054 2.1476C5.96501 2.29953 5.05402 2.61964 4.33559 3.34096C3.61717 4.06227 3.29833 4.97692 3.14701 6.10697C2.99997 7.205 2.99999 8.60802 3 10.3793V16.2169C3 17.725 3.91995 19.0174 5.22717 19.5592C5.15989 18.6498 5.15994 17.3737 5.16 16.312L5.16 11.3976L5.16 11.3024C5.15993 10.0207 5.15986 8.91644 5.27828 8.03211C5.40519 7.08438 5.69139 6.17592 6.4253 5.43906C7.15921 4.70219 8.06404 4.41485 9.00798 4.28743C9.88877 4.16854 10.9887 4.1686 12.2652 4.16867L12.36 4.16868H15.24L15.3348 4.16867C16.6113 4.1686 17.7088 4.16854 18.5896 4.28743C18.0627 2.94779 16.7616 2 15.24 2Z',
    'M6.6001 11.3974C6.6001 8.67119 6.6001 7.3081 7.44363 6.46118C8.28716 5.61426 9.64481 5.61426 12.3601 5.61426H15.2401C17.9554 5.61426 19.313 5.61426 20.1566 6.46118C21.0001 7.3081 21.0001 8.6712 21.0001 11.3974V16.2167C21.0001 18.9429 21.0001 20.306 20.1566 21.1529C19.313 21.9998 17.9554 21.9998 15.2401 21.9998H12.3601C9.64481 21.9998 8.28716 21.9998 7.44363 21.1529C6.6001 20.306 6.6001 18.9429 6.6001 16.2167V11.3974Z',
  ],
  'check-circle': [
    'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z',
  ],
  'document-text': [
    'M4.17157 3.17157C3 4.34315 3 6.22876 3 10V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V10C21 6.22876 21 4.34315 19.8284 3.17157C18.6569 2 16.7712 2 13 2H11C7.22876 2 5.34315 2 4.17157 3.17157ZM7.25 8C7.25 7.58579 7.58579 7.25 8 7.25H16C16.4142 7.25 16.75 7.58579 16.75 8C16.75 8.41421 16.4142 8.75 16 8.75H8C7.58579 8.75 7.25 8.41421 7.25 8ZM7.25 12C7.25 11.5858 7.58579 11.25 8 11.25H16C16.4142 11.25 16.75 11.5858 16.75 12C16.75 12.4142 16.4142 12.75 16 12.75H8C7.58579 12.75 7.25 12.4142 7.25 12ZM8 15.25C7.58579 15.25 7.25 15.5858 7.25 16C7.25 16.4142 7.58579 16.75 8 16.75H13C13.4142 16.75 13.75 16.4142 13.75 16C13.75 15.5858 13.4142 15.25 13 15.25H8Z',
  ],

  /* Disclosure. alt-arrow-down says a control opens something; SiteNav and SiteFooter turn it
     over when their panel is open rather than swapping glyphs. alt-arrow-up is the same mark
     pointing the other way, for a control that swaps instead. alt-arrow-right leads to a page. */
  'alt-arrow-down': [
    'M12.3704 15.8351L18.8001 9.20467C19.2013 8.79094 18.9581 8 18.4297 8H5.5703C5.04189 8 4.79869 8.79094 5.1999 9.20467L11.6296 15.8351C11.8427 16.055 12.1573 16.0549 12.3704 15.8351Z',
  ],
  'alt-arrow-up': [
    'M12.3704 8.16485L18.8001 14.7953C19.2013 15.2091 18.9581 16 18.4297 16H5.5703C5.04189 16 4.79869 15.2091 5.1999 14.7953L11.6296 8.16485C11.8427 7.94505 12.1573 7.94505 12.3704 8.16485Z',
  ],
  'alt-arrow-right': [
    'M15.8351 11.6296L9.20467 5.1999C8.79094 4.79869 8 5.04189 8 5.5703L8 18.4297C8 18.9581 8.79094 19.2013 9.20467 18.8001L15.8351 12.3704C16.055 12.1573 16.0549 11.8427 15.8351 11.6296Z',
  ],
  'hamburger-menu': [
    'M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355ZM18.75 16C18.75 16.4142 18.4142 16.75 18 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H18C18.4142 15.25 18.75 15.5858 18.75 16ZM18 12.75C18.4142 12.75 18.75 12.4142 18.75 12C18.75 11.5858 18.4142 11.25 18 11.25H6C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75H18ZM18.75 8C18.75 8.41421 18.4142 8.75 18 8.75H6C5.58579 8.75 5.25 8.41421 5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H18C18.4142 7.25 18.75 7.58579 18.75 8Z',
  ],
  'close-circle': [
    'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8.96963 8.96965C9.26252 8.67676 9.73739 8.67676 10.0303 8.96965L12 10.9393L13.9696 8.96967C14.2625 8.67678 14.7374 8.67678 15.0303 8.96967C15.3232 9.26256 15.3232 9.73744 15.0303 10.0303L13.0606 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73742 15.3232 9.26254 15.3232 8.96965 15.0303C8.67676 14.7374 8.67676 14.2625 8.96965 13.9697L10.9393 12L8.96963 10.0303C8.67673 9.73742 8.67673 9.26254 8.96963 8.96965Z',
  ],

  /* Status and leaving. square-arrow-right-up trails a link or row whose destination is off
     tcules.com; info-circle and danger-triangle lead, beside the words that carry the meaning. */
  'square-arrow-right-up': [
    'M20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355ZM14.8284 8.42157C15.2426 8.42157 15.5784 8.75736 15.5784 9.17157L15.5784 13.4142C15.5784 13.8284 15.2426 14.1642 14.8284 14.1642C14.4142 14.1642 14.0784 13.8284 14.0784 13.4142L14.0784 10.9822L9.7019 15.3588C9.40901 15.6517 8.93414 15.6517 8.64124 15.3588C8.34835 15.0659 8.34835 14.591 8.64124 14.2981L13.0178 9.92157H10.5858C10.1716 9.92157 9.83579 9.58579 9.83579 9.17157C9.83579 8.75736 10.1716 8.42157 10.5858 8.42157L14.8284 8.42157Z',
  ],
  'info-circle': [
    'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z',
  ],
  'danger-triangle': [
    'M5.31171 10.7615C8.23007 5.58716 9.68925 3 12 3C14.3107 3 15.7699 5.58716 18.6883 10.7615L19.0519 11.4063C21.4771 15.7061 22.6897 17.856 21.5937 19.428C20.4978 21 17.7864 21 12.3637 21H11.6363C6.21356 21 3.50217 21 2.40626 19.428C1.31034 17.856 2.52291 15.7061 4.94805 11.4063L5.31171 10.7615ZM12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z',
  ],
} as const;

/** Every glyph in the set. The union, not `string` — a typo is a type error, not a blank box. */
export type IconName = keyof typeof glyphs;

/** Sorted, for the proving ground's index and for anything that needs to enumerate the set. */
export const iconNames = Object.keys(glyphs).sort() as IconName[];

/**
 * Does this glyph have a counter — a hole cut through its mass? True when any of its paths carries
 * more than one subpath, which under evenodd is exactly what a counter is. Derived rather than
 * listed, so a glyph added later is classified by its geometry and the 16px floor cannot drift.
 */
export function hasCounter(name: IconName): boolean {
  return glyphs[name].some((d) => (d.match(/[Mm]/g) ?? []).length > 1);
}
