import { Cluster, Layout, Section, type SectionSurface } from '@/components';
import { Breadcrumbs, type BreadcrumbItem } from '@/patterns';

import { specimenStyles as s } from '../_specimen/Specimen';

/**
 * Breadcrumbs specimen — one variant, one size, and DEPTH as the only thing that actually varies.
 *
 * Every trail below is a BAND, at the top level of this page and never nested inside another
 * Section — the component owns its band, so nesting it would inset its content column a second
 * time inside the outer one. That is also why this page does not use the `Specimen` wrapper the
 * other routes use: `Specimen` is a Layout, and a Layout cannot contain a band. The note for each
 * trail therefore sits in its own band BELOW it, which gives 68 between a trail and its note and
 * 132 between one group and the next — the trail contributes only the focus ring's 4px downward.
 *
 * Three states have no props: hover, pressed and tab focus are the stylesheet's business, driven
 * by :hover, :active and :focus-visible. Nothing here can be forced from the outside at all —
 * there is no `active`, no `disabled`, no `expanded`, because nothing in this component opens. So
 * this page cannot print a state column, and it says so rather than showing three states and
 * calling it six. Point at a crumb, hold it down, and tab to it, on each of the four surfaces.
 *
 * The trail is a full-width band, so it can no longer be dropped into a narrow grid track — the
 * wrap is driven by VIEWPORT width now, exactly as it is on a real route. Narrow the window to
 * see it, and to see that consecutive lines' targets clear each other by 0.85px rather than overlapping.
 */

/** A trail of `depth` levels, ending in a plausible leaf. Real labels, not lorem. */
function trail(depth: number): BreadcrumbItem[] {
  const ancestors = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Product Design', href: '/services/product-design' },
    { label: 'Design tokens', href: '/services/product-design/tokens' },
    { label: 'Naming', href: '/services/product-design/tokens/naming' },
    { label: 'Prefixes', href: '/services/product-design/tokens/naming/prefixes' },
    { label: 'Collisions', href: '/services/product-design/tokens/naming/prefixes/collisions' },
    { label: 'Reservations', href: '/services/product-design/tokens/naming/prefixes/reserved' },
  ];
  const out: BreadcrumbItem[] = [];
  for (let i = 0; i < depth; i += 1) {
    out.push(ancestors[i] ?? { label: `Level ${i + 1}`, href: `/level-${i + 1}` });
  }
  out[out.length - 1] = { label: 'Interaction and UI Design', href: '/leaf' };
  return out;
}

/**
 * The note for the trail above it, in its own band on the same ground. Below rather than above,
 * because the trail band gives 64 above and only the ring's 4px below: putting the note underneath makes the
 * 64 the gap BETWEEN groups and the 0 the seam within one, which is the rhythm the real
 * composition has.
 */
function Note({
  title,
  note,
  surface = 'paper',
}: {
  title: string;
  note: string;
  surface?: SectionSurface;
}) {
  return (
    <Section surface={surface} density="tight">
      <Layout rowGap="tight">
        <p className={s.specTitle}>{title}</p>
        <p className={s.specNote}>{note}</p>
      </Layout>
    </Section>
  );
}

const DEPTHS = [
  { depth: 2, note: 'No collapse. Two items, one divider.' },
  { depth: 3, note: 'No collapse. Three items, two dividers.' },
  {
    depth: 4,
    note: 'The threshold. From 768 up it collapses to four, hiding one level — "1 level omitted". Below 768 it collapses to three, folding the parent in too — "2 levels omitted".',
  },
  {
    depth: 5,
    note: 'Four from 768 up ("2 levels omitted"), three below it ("3 levels omitted"). The parent "Design tokens" is visible only on the wide trail.',
  },
  {
    depth: 6,
    note: 'Three levels omitted. The same ITEM COUNT as depth 4, not the same trail — the parent is "Naming" and the hidden count differs.',
  },
  {
    depth: 8,
    note: 'Five levels omitted. Four items again; the parent is "Reservations". Depth is free after four.',
  },
] as const;

const LONG_DEPTHS = [2, 3, 4, 5] as const;

/** A trail of `depth` levels with labels at the long end of what the sitemap holds. */
function longTrail(depth: number): BreadcrumbItem[] {
  const ancestors = [
    { label: 'Home', href: '/' },
    { label: 'Services and Capabilities', href: '/services' },
    { label: 'Product Design and Interaction Strategy', href: '/services/pd' },
    { label: 'Design Systems for Regulated Industries', href: '/services/pd/systems' },
  ];
  const out = ancestors.slice(0, depth - 1);
  out.push({
    label: 'Interaction and UI Design for Regulated Financial Products',
    href: '/leaf',
  });
  return out;
}

const STATE_REFERENCE = [
  {
    state: 'rest',
    what: 'Ancestors muted, the current page the loudest ink in the row, the divider quieter than both. No rule.',
  },
  {
    state: 'hover',
    what: 'Point at an ancestor: the ink moves two ramp steps and the rule wipes in from the inline start on 140ms. The current page does not respond — it is not a link.',
  },
  {
    state: 'pressed',
    what: 'Hold the pointer down: the ink moves again, and the rule steps from 1px to 2px instantly rather than growing. On blue that width step is the only thing distinguishing pressed from hover, because the ink has nowhere lighter to go than white.',
  },
  {
    state: 'focus',
    what: 'Tab to it: the hover ink, the full-width rule AND the ring — 2px over a 2px gap in the surface colour, cornered at 4px. :focus-visible only, so a mouse click never draws it.',
  },
] as const;

const SURFACES = [
  {
    surface: 'paper',
    note: 'The baseline. Ancestors at neutral-600 (4.92:1, the floor of AA), the current page at neutral-900 (14.62:1) so it is unmistakably the loudest thing in the row. Hover goes blue because blue means clickable and appears on nothing that is not; pressed continues two ramp steps to 700.',
  },
  {
    surface: 'tint',
    note: 'Every muted value steps one darker because the ground did. neutral-600 does NOT still pass here — it is 4.39:1 on this ground — so ancestors take neutral-700 (7.27:1), matching --sec-ink-muted so the trail and the body copy under it are the same grey. The blues do not move: brandeis-500 still clears at 5.51:1.',
  },
  {
    surface: 'ink',
    note: 'The direction inverts. Ancestors LIFT to neutral-400 (8.05:1), the current page to white (17.26:1), and the hover blue lifts three steps to brandeis-300 — brandeis-500 on this ground is 2.77:1 and is the exact failure the surface model exists to prevent. Pressed goes lighter still, to brandeis-100. The divider is the only value that travels the other way, to neutral-700.',
  },
  {
    surface: 'blue',
    note: 'The ramp runs out. Only the light end clears AA here: white 6.23:1, 50 is 5.57:1, 100 is 4.91:1, 200 is already 3.78:1. So ancestors sit at 100 — the tightest cell in the table — hover reaches white, and pressed steps BACK to 50 while the rule DOUBLES in height, because there is no colour above white to press into. Hover a crumb and hold it: the rule width is the difference. Tab to it — the ring is white and the gap in it is the blue ground.',
  },
] as const;

export default function BreadcrumbsSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Breadcrumbs</h1>
          <p>
            The ancestor trail: an ordered list of the pages above this one, ending in this one.
            It states position — it is not a way of getting elsewhere, which is what{' '}
            <code>SiteNav</code> is for. Generated entirely from{' '}
            <code>navigation.breadcrumb</code> in frontmatter, so it takes an array and renders
            it, and it never reads the URL.
          </p>
          <p>
            It owns its band, which is what makes the composition unforgeable: a{' '}
            <code>Section</code> with <code>density=&quot;tight&quot;</code> above and zero
            below. The 64 above separates it from the sticky nav — it has to, because the 44px
            hit extension reaches 23.15px above the label and a flush band would push that under
            a bar which stacks above it. The zero below is because the air between the trail and
            the hero is the <em>hero band&apos;s</em> to give; contribute any here and the two
            paddings add.
          </p>
          <p>
            So there are two props, not one: <code>items</code>, and <code>surface</code> —
            which a band-owning pattern needs because it has no ancestor to read{' '}
            <code>data-surface</code> from, exactly as <code>SiteNav</code> and{' '}
            <code>SiteFooter</code> do. It must match the hero band below it.
          </p>
        </Layout>
      </Section>

      {/* ── One variant, one size ── */}
      <Breadcrumbs items={trail(4)} />
      <Note
        title="One variant, one size"
        note="A 1 × 1 matrix, stated as a decision rather than an omission. The trail is identical on every route; the only dimension that actually varies is DEPTH, and depth is data, not a variant. The size is named sm because it lines up with Button size='sm' — the trail is the smallest interactive type on the page and should read as smaller than any control near it."
      />

      {/* ── The depth ladder ── */}
      {DEPTHS.map((d) => (
        <Breadcrumbs key={d.depth} items={trail(d.depth)} />
      ))}
      <Note
        title="The depth ladder — depths 2, 3, 4, 5, 6, 8 above, in order"
        note="Rendered item counts are 2, 3, 4, 4, 4, 4 from 768 up, and 2, 3, 3, 3, 3, 3 below it. The collapse is depth-driven with one depth per side of the md breakpoint: four or more authored levels render as four on a desktop and as three — first, collapse, current — on a phone, so a phone trail holds one line instead of wrapping onto a second led by a divider. It is CSS, not a prop and not client JS: the parent crumb and the two hidden counts carry breakpoint classes and the one that does not apply is display:none, which removes it from the accessibility tree too. Resize across 768 to watch the parent fold in. Depth is free after four, which is why there is no maxItems prop. The divider count is always one fewer than the rendered item count."
      />

      {/* ── States ── */}
      <Breadcrumbs items={trail(4)} />
      <Section density="tight">
        <Layout rowGap="block">
          <p className={s.specTitle}>States — and why there is no state column here</p>
          <p className={s.specNote}>
            Rest is what the band above renders, and it needs no prop. NO STATE IN THIS
            COMPONENT CAN BE FORCED FROM OUTSIDE — there is no <code>active</code>, no{' '}
            <code>disabled</code>, no <code>expanded</code>, because nothing here opens. So in
            place of a state column, here is what to look for and where, on the trail above.
          </p>
          <Layout rowGap="text">
            {STATE_REFERENCE.map((row) => (
              <Layout key={row.state} columns={[1, 3]} colGap="gutter" rowGap="tight">
                <p className={s.eyebrow}>{row.state}</p>
                <p className={s.specNote}>{row.what}</p>
              </Layout>
            ))}
          </Layout>
        </Layout>
      </Section>

      {/* ── Four surfaces, identical markup, one prop apart ── */}
      {SURFACES.map((surface) => (
        <div key={surface.surface}>
          <Breadcrumbs items={trail(4)} surface={surface.surface} />
          <Note
            title={`Surface · ${surface.surface}`}
            note={surface.note}
            surface={surface.surface}
          />
        </div>
      ))}

      {/* ── Long labels, depths 2–5, on every surface ─────────────────────────────
          The case the phone collapse exists for. At 390 every depth from 4 up renders three
          crumbs; depth 3 still renders all three of its own and may wrap on labels this long. */}
      {SURFACES.map((surface) => (
        <div key={`long-${surface.surface}`}>
          {LONG_DEPTHS.map((depth) => (
            <Breadcrumbs key={depth} items={longTrail(depth)} surface={surface.surface} />
          ))}
          <Note
            title={`Long labels · depths 2, 3, 4, 5 · ${surface.surface}`}
            note="Above 768: 2, 3, 4, 4 crumbs. Below: 2, 3, 3, 3. The collapse mark is U+2026 in the divider's ink on every surface — punctuation between crumbs, not a fourth label. A trail of three authored levels is not collapsed on a phone, because three is already the phone's count; with labels this long it wraps between crumbs, never inside one."
            surface={surface.surface}
          />
        </div>
      ))}

      {/* ── The nested-surface case ──────────────────────────────────────────────
          A tint trail inside an ink band. The component's own Section declares tint, so the token
          layer's tint column applies — which is only true because every surface block restates
          every token. */}
      <Section surface="ink" flush>
        <Breadcrumbs items={trail(4)} surface="tint" />
      </Section>
      <Note
        surface="ink"
        title="Nested surface · a tint trail inside an ink band"
        note="SPECIMEN-ONLY ARRANGEMENT: this is the one place a trail is deliberately nested inside another Section, which is otherwise forbidden — so its content column insets twice and it sits a gutter in from the ink band's. That misalignment is the cost of the test, not a defect. What it proves: this trail reads the TINT column, not ink's — ancestors at neutral-700 on paper-deep, 7.27:1. Had the tint block carried only its deltas from paper it would have inherited ink's values for whatever it omitted and stranded neutral-400 on this light ground at 1.90:1. That failure is measured, not hypothetical — elsewhere in this system a tint panel inside an ink section rendered text at 1.13:1, and the repetition in the token layer is the fix."
      />

      {/* ── In situ, at real hero scale ── */}
      <Breadcrumbs items={trail(4)} />
      <Section density="tight">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>Interaction and UI Design</h2>
            <p className={s.specNote}>
              In situ, and this is the real composition rather than an approximation of it: the
              trail band above, this band below, nothing between them but the two paddings that
              face each other. The trail gives only the focus ring&apos;s 4px downward and this
              band gives 64 upward, so the seam you are looking at is 68 — 64 of it from the
              hero&apos;s band, which is the half that should own it, and 4 that exists so a
              focus ring on the last crumb is not painted over. Above the trail is its own 64,
              which on a real route is what holds it clear of the sticky nav.
            </p>
          </Layout>
          <Layout rowGap="block">
            <p className={s.specTitle}>
              The same thing WITH a hero eyebrow — the band that settles Q3
            </p>
            <p className={s.eyebrow}>Interaction design</p>
            <h2 className={s.titleScale}>Interaction and UI Design</h2>
            <p className={s.specNote}>
              The line above the title is the real <code>--text-eyebrow</code> role: mono,
              uppercase, tracked, <code>--sec-ink-label</code>. Compare it with the trail at the
              top of this group — sans, verbatim, untracked, muted. They differ in family, case,
              tracking AND ink, which is the whole of Q3: two mono labels stacked 24px apart
              would have read as one broken line, and sans over mono reads as apparatus over
              category. Resolved inside this component, so no prop on the hero and no page loses
              its eyebrow. Note also that the two say different things — &quot;Services&quot; as
              an ancestor and &quot;Interaction design&quot; as a category are not the same
              fact, which is why the trail cannot replace the eyebrow.
            </p>
          </Layout>
        </Layout>
      </Section>

      {/* ── Edge cases ── */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Product Design and Interaction Strategy', href: '/services/pd' },
          {
            label: 'Interaction and UI Design for Regulated Financial Products',
            href: '/leaf',
          },
        ]}
      />
      <Note
        title="Longest realistic label"
        note="No truncation, ever, and no ellipsis on a label — there is already an ellipsis in this component and it means something else. The trail wraps BETWEEN crumbs and never inside one, so a divider is never stranded from the label it belongs to. Narrow the window until it wraps."
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Glossary', href: '/glossary' },
          {
            label: 'design-tokens-naming-prefixes-collisions-and-reservations-explained',
            href: '/leaf',
          },
        ]}
      />
      <Note
        title="One long unbroken token — a slug"
        note="Breaks inside the word rather than pushing the row past its track. No horizontal scrollbar, no overflow out of the content column, no ellipsis. This is the case that proves nothing can collapse the trail to zero: its intrinsic minimum is the widest label, and a label wider than the column breaks inside itself."
      />

      <Breadcrumbs items={trail(16)} />
      <Note
        title="Many items — 2× expected, depth 16"
        note="Four items again from 768 up, three below — the same COUNT as depth 4, not the same trail: the parent is 'Level 15' and the hidden string reads a different number (13 levels omitted wide, 14 narrow). Only the rendered item count is invariant after four."
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: '   ', href: '/blank' },
          { label: 'Services', href: '/services' },
          { label: 'Interaction and UI Design', href: '/leaf' },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Interaction and UI Design', href: '/leaf' },
        ]}
      />
      <Note
        title="An item with an empty label, above the same trail without it"
        note="Dropped before render, so the divider count stays correct — both trails above render three items and two dividers, and they are identical. A whitespace-only label is the failure mode a CMS produces, not a hand-authored one."
      />

      <Breadcrumbs items={[]} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }]} />
      <Note
        title="Zero items, and one item — each renders nothing at all"
        note="There is no band above this note, and that is the specimen: not an empty <nav> and not an empty Section either, because an empty landmark is worse than no landmark — a screen reader lists it and it answers nothing. Both also log a dev warning naming the labels they were handed, since naming the route would mean reading it. If you can see a gap above, something rendered and this test has failed."
      />

      <Section flush>
        <div className={s.mockBar} />
      </Section>
      <Breadcrumbs items={trail(4)} />
      <Section density="tight">
        <Layout rowGap="block">
          <p className={s.specTitle}>
            Touch · the 44px floor, under a stand-in for the sticky nav
          </p>
          <p className={s.specNote}>
            The bar above stands in for <code>SiteNav</code>, which on a real route is sticky
            and stacks over this band. The hit area is extended past the box with a
            pseudo-element — the label&apos;s own inline extent, 44 tall — so the row does not
            move, and it is inset to the anchor&apos;s inline edges so it cannot reach over the
            crumb beside it. It is anchored to the BOTTOM of that box and grown upward rather
            than centred on it, so the whole 44 sits inside the band&apos;s 64 of top air.
            Centred, 11.575px would fall below the box, which is below the band, where the next
            band paints over it: the target would be quietly cut to about 36px with every check
            still green. Reaching <strong>23.15px</strong> above the box, it clears the bar
            comfortably. That is Q9, and it is why this band&apos;s air is asymmetric.
          </p>
          <Cluster colGap="text" rowGap="text" align="center">
            <div className={s.hitFloor}>
              <p className={s.specNote}>a 44px floor, for comparison</p>
            </div>
            <p className={s.specNote}>
              Narrow the window until the trail wraps: the pitch is 44.85px (a 20.85px box plus{' '}
              <code>--gap-block</code>), which is MORE than the 44px target, so consecutive
              lines&apos; targets clear each other by 0.85px. The 1.15px overlap this spec used
              to document went away with the underline fix — both were one defect, geometry
              hanging below a box that had nothing below it.
            </p>
          </Cluster>
        </Layout>
      </Section>

      <Breadcrumbs items={trail(4)} />
      <Breadcrumbs items={trail(3)} />
      <Note
        title="Two adjacent — specimen only, invalid on a route"
        note="One per page. The component does not defend against two, and two produce two identical `Breadcrumb` landmarks, which a screen reader lists twice; since the landmark name is not a prop there is nothing to disambiguate them with. Shown because the spec's don'ts have to be decidable from a rendered page, and this is the page. Note also that two adjacent trail bands touch with no air between them at all — 4 below the first meeting 64 above the second — which is a second reason two is wrong."
      />
    </>
  );
}
