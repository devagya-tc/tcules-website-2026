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
 * proves the fixture, and the header's failure mode is a panel that renders correctly for the shape
 * someone typed here and wrongly for the shape the site actually ships.
 *
 * The one thing this page CANNOT show is the header in its natural state — the real SiteNav is
 * mounted in the root layout above everything on this route, sticky, at the top of the viewport.
 * Everything below is the same component rendered inline so its panels can be opened next to a
 * description of what to look at. Two SiteNavs on a page is not a supported arrangement; it is a
 * measuring rig, which is why the ids are generated per instance.
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
              The site header: a sticky bar, a mega-menu panel per item that has one, and a
              drawer below 1024. The real one is at the top of this page — scroll, and it stays.
              What follows is the same component rendered inline, so a panel can be opened
              beside a note about it.
            </p>
            <p>
              An item with a panel is a <code>&lt;button aria-expanded&gt;</code>, not a link. A
              control that both navigates and opens has to pick one on click and is wrong for
              half its users; the panel&rsquo;s own bar block carries &ldquo;All
              services&rdquo;, so the destination is not lost. Items with nothing to group stay
              plain links, and get no chevron, because a chevron on a control that opens nothing
              is a lie.
            </p>
            <p>
              Open a panel and tab: the next stop is inside it. The panel renders inside its own{' '}
              <code>&lt;li&gt;</code> for exactly that reason, and still spans the full width
              because the <code>&lt;li&gt;</code> is not positioned and the absolute box
              resolves against the <code>&lt;header&gt;</code>. Rendered as a sibling of the
              list it would have been easier to style and would have put a keyboard user through
              all five items before reaching the panel they just opened.
            </p>
            <p>
              Closes on Escape (focus returns to the trigger), on the pointer leaving the
              header, on focus leaving it, on a pointerdown outside it, and on a route change.
              The route case is not an effect: the open state carries the path it was set on, so
              &ldquo;closed&rdquo; is derived in one render rather than synchronised in two.
            </p>
          </Layout>

          <Specimen
            title="Panel · rows and a compartment rail"
            note="Services. Six rows in two columns, each with a mark — Design Systems and Design Engineering are genuinely hard to tell apart at a glance, which is the test a mark has to pass. The rail carries compartments rather than links because 'start with an audit' is a recommendation, and a link cannot make one. Hover a row: the whole two-line block is the target, its mark reaches the accent with its title, and the fill extends past the text because the row's padding is pulled back out with a negative inset — so the text still aligns with the column edge."
          >
            <SiteNav {...only(nav, ['services'])} />
          </Specimen>

          <Specimen
            title="Panel · rows and a link-group rail"
            note="Expertise and Insights. Same block vocabulary, no marks: six abstract product categories would need six abstract glyphs, and a glyph that stands for 'Data and Decision Products' says nothing. Insights carries two rail groups instead of one — the rail takes either flavour, or both, which is what lets a panel express depth without the nav growing a bespoke case per item."
          >
            <SiteNav {...only(nav, ['expertise', 'insights'])} />
          </Specimen>

          <Specimen
            title="Items with no panel"
            note="Work and About. Plain links, no chevron, and they still light up from inside their section — Services owns /audits and /how-we-work, About owns /team and /careers, so those pages do not leave the whole bar unlit. aria-current is exact, though: announcing five pages as 'current page' would be a lie the styling does not tell."
          >
            <SiteNav {...only(nav, ['work', 'about'])} />
          </Specimen>

          <Specimen
            title="The full bar"
            note="Five items and the CTA. Below 1024 the items and the CTA disappear and the menu button appears: that is one breakpoint changing WHAT is in the bar, not how big anything is, which is why the two bars have two heights (72 and 64) rather than one that shrinks. Narrow the window past 1024 and open the drawer — every panel becomes an accordion, with its rows flattened to titles."
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
                Same markup, one prop. Open a panel and check the hover fills, the row marks,
                the rail&rsquo;s hairline and the focus ring — on blue every colour change
                becomes a fill, because blue cannot signal itself and a pale-blue label on blue
                reads as disabled.
              </p>
            </Layout>
            <SiteNav {...only(nav, ['services', 'work'])} surface={surface} />
          </Layout>
        </Section>
      ))}
    </>
  );
}
