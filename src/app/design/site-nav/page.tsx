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
            title="Revision 2 · three plates, three shapes"
            note="Round one of the visual overhaul (docs/specs/SiteNav.md R2). Revision 1 drew every section as columns of 14px labels, so the three plates were one list at three widths. Now every mega has a FEATURE column beside its index, split by the same hairline, and the feature's form is different per section on purpose: Services previews the service under your pointer, Expertise shows one case as its figure, Insights shows the latest piece with its photograph. Squint and the three read as a drawing, a number and a picture. Where a section has an index page, its hub link sits in a foot strip at the plate's base on a ground one step off the panel. Hover each item below in turn and watch the box morph between them."
          >
            <SiteNav {...only(nav, ['services', 'expertise', 'insights'])} />
          </Specimen>

          <Specimen
            title="Services · the preview — 1120"
            note="Hover Services, then walk down the six services. The feature column crossfades to the kit's Sketch scene for the row under the pointer — the selector the owner approved on home and About, one titled row lit, its answer beside it — and the row whose scene is showing keeps its blue label and arrow when the pointer leaves for the feature, so it is always clear which row the drawing belongs to. Focus drives it too: Tab into the plate and arrow down the list with Tab. Audits have no scene and leave the last one showing. Under the drawing, the Working together offers: How We Work as a serif title row (no box, no placeholder image any more) and Request Free Audit as the compact row under a rule. The foot strip carries All services."
          >
            <SiteNav {...only(nav, ['services'])} />
          </Specimen>

          <Specimen
            title="Expertise · the proof — 1120"
            note="Hover Expertise. The question this section is opened with is 'have they done this in a context like mine?', so its feature is one case reduced to its figure: the Stat at lg — the largest thing in any plate, weight from scale rather than from a box — what it means, the client, and the way to the case. The pane went from 780 to 1120 to make room, and its columns are [9, 8] because this section's FIRST column holds the longer labels (293 against 259). No foot strip: Expertise has no hub page in the IA, so the plate ends where its content does. The pick of case is editorial (spec R2.6)."
          >
            <SiteNav {...only(nav, ['expertise'])} />
          </Specimen>

          <Specimen
            title="Insights · the story — 880"
            note="Hover Insights. The latest piece: a 16:9 photograph through Media, so it takes the shared tone layer; the format in the mono label voice; the title in the serif. One link for all three. A story takes HALF the plate rather than a third — the picture is the pane's argument, and eight short labels need barely 180 a column — so the plate grew from 560 to 880. The title takes the blue on hover; the photograph does not move."
          >
            <SiteNav {...only(nav, ['insights'])} />
          </Specimen>

          <Specimen
            title="Items that navigate"
            note="Work, Lab and About. Plain links, no chevron, and they still light up from inside their section — Services owns /audits and /how-we-work, About owns /team and /careers, so those pages do not leave the whole bar unlit. aria-current is exact, though: announcing five pages as 'current page' would be a lie the styling does not tell."
          >
            <SiteNav {...only(nav, ['work', 'lab', 'about'])} />
          </Specimen>

          <Specimen
            title="The full bar"
            note="Six items and the CTA, in content order — Work sits second because case studies are the strongest proof and should not be the fifth thing read. Below 1024 the items and the CTA disappear and the toggle appears: one breakpoint changing WHAT is in the bar, not how big anything is, which is why the two bars have two heights (72 and 64) rather than one that shrinks. The bar is unchanged in round one (spec R2.6 item 3)."
          >
            <SiteNav {...nav} />
          </Specimen>

          <Specimen
            title="The sheet — narrow the window past 1024"
            note="Open the menu (the toggle at the top right of the real header, or this one), then each section, then scroll to its end. Two things changed in round one. The six root rows are set in the serif title voice (h6, 18) rather than body — the same 48px row, so all six still sit below the midpoint of a 375x812 screen. And each section ends with the same feature as its plate, before the hub link: Expertise's figure, Insights' photograph and title, Services' How We Work row. There is no preview in the sheet — touch has no hover, and a drawing that never changes is decoration. Back is held on one line now; at 390 it wrapped its arrow above 'Menu'. Everything else is revision 1: the sheet hugs its list at both levels, grows for a section to the screen less 88px, swipes away, and pins both offers at the foot."
          >
            <SiteNav {...nav} />
          </Specimen>
        </Layout>
      </Section>

      {/* Four grounds. Every --nav-* token is declared in all four surface blocks, so this is the
          page that would catch a block that drifted — a missing fill, a blue label at 2.77:1, a
          focus ring the same colour as its own gap. */}
      {SURFACES.map((surface) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="block">
            <Layout rowGap="tight">
              <p className={s.specTitle}>surface=&quot;{surface}&quot;</p>
              <p className={s.specNote}>
                Same markup, one prop. Open each plate and check the row fill, the hairline seam,
                the foot strip&rsquo;s ground, the Sketch plate, the stat&rsquo;s blue and the focus
                ring. The plate and the sheet carry the surface themselves since revision 2, so they
                no longer inherit it from whatever encloses the header. On tint every fill steps one deeper, because
                brandeis-50 on paper-deep is invisible and would leave a hover marked by nothing.
                On ink the fill goes neutral — at the pale end of the blue ramp there is no tint
                left to see against a near-black ground — and the scrim is the one value in the
                whole token layer that leaves the palette, because a neutral-950 scrim over a
                neutral-950 page recedes nothing. On blue every colour change becomes a fill,
                since blue cannot signal itself and a pale-blue label on blue reads as disabled.
              </p>
            </Layout>
            <SiteNav
              {...only(nav, ['services', 'work', 'expertise', 'insights'])}
              surface={surface}
            />
            <div className={s.overlayRoom} aria-hidden="true" />
          </Layout>
        </Section>
      ))}
    </>
  );
}
