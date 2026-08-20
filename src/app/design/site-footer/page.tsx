import { Layout, Section } from '@/components';
import { getNavigation } from '@/content';
import { SiteFooter } from '@/patterns';

import { specimenStyles as s } from '../_specimen/Specimen';

/**
 * SiteFooter specimen — the five bands, on four grounds.
 *
 * Composition only, reading the real IA through the seam: five link groups, forty-odd links, four
 * meta pairs and the newsletter. A footer fed a trimmed fixture proves nothing, because its whole
 * difficulty is what happens at full length — five columns that have to hold nine links and four,
 * a directory that must not out-shout the tagline above it.
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
            40, a tagline at lead, one solid action, three mono links), the newsletter (two
            columns — the pitch and the field), the directory (five narrow columns of the
            quietest text on the page), the contact strip (four mono key/value cells and an
            address), and the utility line.
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
            Two things to hold against it. The field is a{' '}
            <strong>control styled inside a pattern</strong>, which is the coupling the tier
            rule exists to prevent — it is here because <code>src/components/Input</code> does
            not exist yet, and when it does these three rules delete and{' '}
            <code>--foot-field-*</code> moves to an <code>--inp-*</code> layer unchanged. And
            the form posts to <code>/api/newsletter</code>, which{' '}
            <strong>nothing serves</strong>: a real submission is a 404 until that route exists.
          </p>
          <p>
            The socials are named links, not logo marks — and not because the glyph set is
            unfilled, since it is filled. Because these are trademarks: each carries its own usage
            rules, its own proportions and its own permission to check, and none is drawn on this
            system&rsquo;s 24-unit box. A word is also the accessible form, since an icon-only
            social row needs a label per icon anyway.
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
