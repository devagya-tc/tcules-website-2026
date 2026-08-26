import { Layout, Section } from '@/components';
import { getNavigation } from '@/content';
import { SiteNav } from '@/patterns';
import type { SiteNavProps } from '@/patterns';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * SiteNav specimen — every arrangement the header has.
 *
 * A specimen route is composition only, so this reads the real IA through the seam rather than
 * carrying a second copy of it. That is deliberate: a proving ground fed by a fixture of its own
 * proves the fixture, and the header's failure mode is a plate that renders correctly for the
 * shape someone typed here and wrongly for the shape the site actually ships.
 *
 * The one thing this page CANNOT show is the header in its natural state — the real SiteNav is
 * mounted in the root layout above everything on this route, sticky, at the top of the viewport.
 * Everything below is the same component rendered inline so its plate can be opened next to a
 * description of what to look at. Two SiteNavs on a page is not a supported arrangement; it is a
 * measuring rig, which is why the ids are generated per instance.
 *
 * NOTHING HERE CAN OPEN THE PLATE FOR YOU. The component owns its own open state and there is no
 * prop to force it, on purpose — a `defaultOpen` that exists only so the proving ground can take a
 * screenshot is API the site would never call. Hover an item; the plate is 100ms behind you.
 */

const SURFACES = ['paper', 'tint', 'ink', 'blue'] as const;

/** Trim the IA down to the shapes a single specimen is about. */
function only(nav: SiteNavProps, keys: string[]): SiteNavProps {
  return { ...nav, items: nav.items.filter((item) => keys.includes(item.key)) };
}

/**
 * Fill the rail's primary card with a real image.
 *
 * The fixture supplies none — the artwork for "Working together" is an open item — and the card
 * renders title-only without one, because an empty framed rectangle in a live header reads as a
 * broken image rather than as a placeholder. So the image-led arrangement the spec actually
 * describes has to be proven here, and this is the only place in the repo that passes the slot.
 */
function withRailImage(nav: SiteNavProps): SiteNavProps {
  return {
    ...nav,
    items: nav.items.map((item) =>
      item.rail
        ? {
            ...item,
            rail: {
              ...item.rail,
              cards: item.rail.cards.map((card) =>
                card.role === 'primary'
                  ? {
                      ...card,
                      /* A native <img>, per the contract Figure established and PageHero
                         follows — there is no Image primitive in this repo and no next/image
                         precedent in a pattern. `alt=""` because the card's own title is the
                         link text: a description here would make a screen reader read the
                         destination twice, once badly. */
                      image: (
                        // eslint-disable-next-line @next/next/no-img-element -- accepted native-image contract
                        <img
                          src="/design/hero-sample-wide.svg"
                          alt=""
                          width={2400}
                          height={1350}
                        />
                      ),
                    }
                  : card,
              ),
            },
          }
        : item,
    ),
  };
}

export default async function SiteNavSpecimenPage() {
  const { nav } = await getNavigation();

  return (
    <>
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h1>SiteNav</h1>
            <p>
              The site header. A sticky bar of six items and one offer; above 1024 the three
              menu sections open one inset <strong>plate</strong> over the page, and below it the
              whole navigation is a <strong>sheet</strong> that rises from the bottom. The real
              one is at the top of this page — scroll, and it stays. What follows is the same
              component rendered inline, so a plate can be opened beside a note about it.
            </p>
            <p>
              An item that opens is a <code>&lt;button aria-expanded&gt;</code>, not a link. A
              control that both navigates and opens has to pick one on click and is wrong for
              half its users. Work, Lab and About navigate and get no chevron, because a chevron
              on a control that opens nothing is a lie — but their children are in the data
              anyway, unrendered, so promoting one to a menu later is a change to one field.
            </p>
            <p>
              <strong>One plate, three sections.</strong> Sweep between Services, Expertise and
              Insights: the box does not blink out and back, it changes width and height while
              the panes cross-slide, and the direction comes from the order of the items in the
              bar. Sweep across Work on the way — nothing closes. That is the whole point of the
              revision: the previous behaviour read a direct link as &ldquo;leave a menu&rdquo;
              and fired open, close, open across one gesture.
            </p>
            <p>
              Open a plate and press Tab: the next stop is the first row inside it, and Shift+Tab
              from there returns to the item. That is managed rather than structural — one box
              shared by three triggers cannot live inside any trigger&rsquo;s{' '}
              <code>&lt;li&gt;</code>, so DOM order cannot supply it. Every pane but the open one
              is <code>inert</code>, so nothing off-screen holds a tab stop.
            </p>
            <p>
              Closes on Escape (focus returns to the trigger), on a click on the dimmed page, on
              focus leaving the header, and on a route change. The route case is not an effect:
              the open state carries the path it was set on, so &ldquo;closed&rdquo; is derived
              in one render rather than synchronised in two.
            </p>
          </Layout>

          <Specimen
            title="Plate · two groups and the rail — 1120"
            note="Services, the widest of the three. Two groups of six plus the rail, which is the only one in the nav. It was 1240 to match the page’s content column, so the plate lined up with the bands behind it — at 14px rows that alignment cost a 255px hole between the two lists, so it came down to 1120 and the pane ratio moved 2:1 to 5:3 in the same edit, which is what keeps the cut on the columns (339 → 278) instead of the rail (308, unchanged). The hub link at the foot is the way through to /services: the trigger opens rather than navigates, so without it the section index has no route to it. Hover a row: direction B — a brandeis-50 fill at the row radius, the label and the arrow both taking the blue, the arrow sliding in from -4px. The fill extends past the text because the row's padding is pulled back out with a negative inset, so the label still aligns with the group label above it. The rail's secondary card is a compact row rather than a second card: a full card would make the rail taller than the columns beside it, and then the plate's height would be set by the offer instead of by the content."
          >
            <SiteNav {...only(nav, ['services'])} />
          </Specimen>

          <Specimen
            title="Plate · the rail's image slot filled"
            note="The same Services plate with an image passed into the primary card. This is the arrangement the spec describes and the fixture cannot show — the slot holds a 16:7 ratio whatever it is given, paints a ground under it so a transparent or still-loading image does not punch a hole in the card, and crops with object-fit. Compare the rail's height against the specimen above: the card grows and the plate grows with it, which is exactly why the height is measured rather than guessed."
          >
            <SiteNav {...only(withRailImage(nav), ['services'])} />
          </Specimen>

          <Specimen
            title="Plate · no rail — 780 and 560"
            note="Expertise and Insights. Same vocabulary, no rail, so the plate narrows to its content rather than holding the widest plate's width in empty ground — 780 for two groups of six, 560 for two of four. Both were re-measured when the rows went to 14px: at the old 880 and 720 they left 83px and 163px of empty track per column. Move between them and watch the box morph in both axes at once. The width is DECLARED on the item rather than derived from a link count: deriving it would silently re-lay out the plate the day a group gained a seventh row, and the cause would be invisible in the data and in the markup."
          >
            <SiteNav {...only(nav, ['expertise', 'insights'])} />
          </Specimen>

          <Specimen
            title="Items that navigate"
            note="Work, Lab and About. Plain links, no chevron, and they still light up from inside their section — Services owns /audits and /how-we-work, About owns /team and /careers, so those pages do not leave the whole bar unlit. aria-current is exact, though: announcing five pages as 'current page' would be a lie the styling does not tell."
          >
            <SiteNav {...only(nav, ['work', 'lab', 'about'])} />
          </Specimen>

          <Specimen
            title="The full bar"
            note="Six items and the CTA, in content order — Work sits second because case studies are the strongest proof and should not be the fifth thing read. Below 1024 the items and the CTA disappear and the toggle appears: one breakpoint changing WHAT is in the bar, not how big anything is, which is why the two bars have two heights (72 and 64) rather than one that shrinks."
          >
            <SiteNav {...nav} />
          </Specimen>

          <Specimen
            title="The sheet — narrow the window past 1024"
            note="Everything above collapses to a toggle, and the navigation becomes a bottom sheet. The hub link is here too, at the end of a section’s scrolling list rather than in the sticky foot — the foot holds the two offers, and a third action in the one strip a thumb reaches would compete with both. Section links are 14px to match the plate’s rows, but the six root rows stay 18px: they are the primary targets on a touch surface, and their 52px height is what puts all six below the midpoint of a 375x812 screen. It hugs its list at both levels — all six root items sit in the lower half of the screen where a thumb is, and a section grows to its OWN content, capped at the screen less 88px. Insights hugs at 657; Services and Expertise overrun the cap and scroll at 724. The sticky foot never moves between them: the sheet is anchored to the viewport's bottom edge, so only the top travels. The height change IS the transition, which is why it is measured — CSS cannot animate to auto. Two offers stay pinned at the foot at both levels, primary on the right. While it is open the wordmark is behind the scrim and out of the tab order: the close glyph, the scrim and Back are the exits, and a mark that also dismissed would be a fourth answer to a question that already had three."
          >
            <SiteNav {...nav} />
          </Specimen>
        </Layout>
      </Section>

      {/* Four grounds. Every --nav-* token is declared in all four surface blocks, so this is the
          page that would catch a block that drifted — a missing fill, a blue label at 2.77:1, a
          focus ring the same colour as its own gap. */}
      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface} density="tight">
          <Layout rowGap="block">
            <Layout rowGap="tight">
              <p className={s.specTitle}>surface=&quot;{surface}&quot;</p>
              <p className={s.specNote}>
                Same markup, one prop. Open the plate and check the row fill, the card edge, the
                rail hairline and the focus ring. On tint every fill steps one deeper, because
                brandeis-50 on paper-deep is invisible and would leave a hover marked by nothing.
                On ink the fill goes neutral — at the pale end of the blue ramp there is no tint
                left to see against a near-black ground — and the scrim is the one value in the
                whole token layer that leaves the palette, because a neutral-950 scrim over a
                neutral-950 page recedes nothing. On blue every colour change becomes a fill,
                since blue cannot signal itself and a pale-blue label on blue reads as disabled.
              </p>
            </Layout>
            <SiteNav {...only(nav, ['services', 'work'])} surface={surface} />
          </Layout>
        </Section>
      ))}
    </>
  );
}
