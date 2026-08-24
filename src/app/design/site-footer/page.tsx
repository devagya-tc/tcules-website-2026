import { Layout, Section } from '@/components';
import { getNavigation } from '@/content';
import { SiteFooter } from '@/patterns';

import { specimenStyles as s } from '../_specimen/Specimen';

/**
 * SiteFooter specimen — the five bands, on four grounds.
 *
 * Composition only, reading the real IA through the seam: six link groups, thirty-six links, four
 * meta pairs and the newsletter. A footer fed a trimmed fixture proves nothing, because its whole
 * difficulty is what happens at full length — six columns that have to hold nine links and two, a
 * directory that must not out-shout the tagline above it.
 *
 * Below lg every one of those columns is rendered a SECOND time as a `<details>` accordion, and
 * the breakpoint decides which copy is shown. Narrow the window on any footer here and the
 * directory swaps rendering; both are in the markup at every width, which is the point.
 *
 * The real footer is at the bottom of this page, on ink, mounted by the root layout.
 */

const SURFACES = ['paper', 'tint', 'ink', 'blue'] as const;

export default async function SiteFooterSpecimenPage() {
  const { footer } = await getNavigation();

  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>SiteFooter</h1>
          <p>
            The closing band, in five deliberately unlike shapes: the brand block (the mark at
            40 and a tagline at lead on one side, the action and a rating badge on the other),
            the directory (six narrow columns of the quietest text on the page), the newsletter
            (two columns — the pitch and the field), the contact strip (four mono key/value
            cells and an address), and the utility line. Under all of it, the wordmark again at
            --opacity-faint: ground rather than a sixth band.
          </p>
          <p>
            That variety is the point. A footer is the easiest place in a site to end up with
            four identical rectangles of small links, and the test is whether it reads as more
            than one idea when you squint. The bands are separated by a hairline with air on
            both sides and by nothing else — no alternating grounds, because varying the ground
            behind a block is how a page ends up with five bands and one idea.
          </p>
          <p>
            A <strong>server component</strong>. Nothing here is stateful, nothing reads the
            URL, and the newsletter posts as a plain form — so the footer on every page of the
            site ships no client bundle. The field&rsquo;s input is wrapped by its label rather
            than wired to it with an id, which is what keeps it a server component and lets the
            four instances below coexist without three broken <code>for</code> references.
          </p>
          <p>
            The field now composes the shared <code>Input</code> primitive with its quiet
            emphasis. Its 40px geometry and four surface treatments moved out of this pattern;
            the light placeholder stepped one rung darker to clear the text contrast floor. The
            form still posts to <code>/api/newsletter</code>, which{' '}
            <strong>nothing serves</strong>: a real submission is a 404 until that route exists.
          </p>
          <p>
            The socials now carry their official marks — and the old argument for words alone
            is why those marks are <em>not</em> glyphs. Each is a trademark with its own usage
            rules and its own proportions, and none is drawn on this system&rsquo;s 24-unit box,
            so redrawing one to fit would stop it being the mark. They live beside this pattern
            at the proportions their owners published, monochrome on <code>currentColor</code>,
            and the word stays as the accessible name.
          </p>
          <p>
            The directory is rendered <strong>twice</strong>: a six-column grid at lg, six
            collapsed <code>&lt;details&gt;</code> below it, and CSS picks. It has to be two
            renderings rather than one — a closed <code>&lt;details&gt;</code> cannot be forced
            visually open in Chrome, which no <code>display</code> override undoes. So the
            links appear twice in the markup. That is the accepted cost of keeping every link
            in the rendered mobile HTML with no client JavaScript;{' '}
            <code>display: none</code> takes the inactive copy out of the accessibility tree and
            the tab order together, so only one is ever reachable.
          </p>
          <p>
            The Clutch rating is a <strong>placeholder</strong>. So are all three off-site
            hrefs, which resolve to <code>EXTERNAL</code> in <code>@/lib/routes</code> — the
            badge&rsquo;s 4.9 and the profile behind it land together or not at all.
          </p>
        </Layout>
      </Section>

      {/* Four grounds. Ink is what the site ships; the other three exist because a footer is a
          component and answers on every surface. The field is the thing to check — it is the one
          part whose entire affordance is its border, so watch the rest state, the focus rule and the
          placeholder ink on each ground. */}
      {SURFACES.map((surface) => (
        <div key={surface}>
          <Section surface={surface} density="tight" flush>
            <Layout rowGap="tight" className={s.spec}>
              <p className={s.specTitle}>surface=&quot;{surface}&quot;</p>
              <p className={s.specNote}>
                Same markup, one prop. On blue every ink comes off the light end of the ramp —
                white, 50 or 100 — because 200 is already 3.78:1 there; the mono meta key at 200
                is the one value treated as a graphic rather than a passage of text.
              </p>
            </Layout>
          </Section>
          <SiteFooter {...footer} surface={surface} />
        </div>
      ))}
    </>
  );
}
