import { Cluster, Layout, Section } from '@/components';
import { Breadcrumbs, PageHero, type BreadcrumbItem } from '@/patterns';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Breadcrumbs specimen — one variant, one size, and DEPTH as the only thing that actually varies.
 *
 * Since 5 Oct 2026 (kit fdn-top) the trail renders only its <nav>: no band, no air and no surface
 * prop. On a page it lives in PageHero's `trail` slot. So this page can do what it could not while
 * the trail was a band — set every case in an ordinary Specimen inside a Section — and the
 * surfaces are proved the way a Button's are, by the band the trail stands in. The real
 * composition, trail inside hero, is the in-situ block near the end.
 *
 * Three states have no props: hover, pressed and tab focus are the stylesheet's business, driven
 * by :hover, :active and :focus-visible. Nothing here can be forced from the outside at all —
 * there is no `active`, no `disabled`, no `expanded`, because nothing in this component opens. So
 * this page cannot print a state column, and it says so rather than showing three states and
 * calling it six. Point at a crumb, hold it down, and tab to it, on each of the four surfaces.
 *
 * The wrap is driven by the column the trail stands in. Narrow the window to see it, and to see
 * that consecutive lines' targets clear each other by 0.85px rather than overlapping.
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
    note: 'Five levels omitted. Four items again; the parent is "Collisions". Depth is free after four.',
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
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h1>Breadcrumbs</h1>
            <p>
              The ancestor trail: an ordered list of the pages above this one, ending in this
              one. It states position — it is not a way of getting elsewhere, which is what{' '}
              <code>SiteNav</code> is for. Generated entirely from{' '}
              <code>navigation.breadcrumb</code> in frontmatter, so it takes an array and
              renders it, and it never reads the URL.
            </p>
            <p>
              It renders only the <code>&lt;nav&gt;</code> and its trail. It used to own a band
              — 64 above, the focus ring&apos;s reach below — and that band&apos;s padding
              stacked on the hero&apos;s 96 to push a service page&apos;s h1 down to 296. Now it
              sits in <code>PageHero</code>&apos;s <code>trail</code> slot, 32 above the split,
              inside the hero&apos;s own band, and the h1 starts at 222.
            </p>
            <p>
              So there is one prop, <code>items</code>. The colour comes from the enclosing
              band&apos;s <code>data-surface</code>, exactly as a Button&apos;s does, so a trail
              can no longer be painted a different ground from the hero it introduces.
            </p>
          </Layout>

          <Specimen
            title="One variant, one size"
            note="A 1 × 1 matrix, stated as a decision rather than an omission. The trail is identical on every route; the only dimension that actually varies is DEPTH, and depth is data, not a variant. The size is named sm because it lines up with Button size='sm' — the trail is the smallest interactive type on the page and should read as smaller than any control near it."
          >
            <Breadcrumbs items={trail(4)} />
          </Specimen>

          <Specimen
            title="The depth ladder — depths 2, 3, 4, 5, 6, 8"
            note="Rendered item counts are 2, 3, 4, 4, 4, 4 from 768 up, and 2, 3, 3, 3, 3, 3 below it. The collapse is depth-driven with one depth per side of the md breakpoint: four or more authored levels render as four on a desktop and as three — first, collapse, current — on a phone, so a phone trail holds one line instead of wrapping onto a second led by a divider. It is CSS, not a prop and not client JS: the parent crumb and the two hidden counts carry breakpoint classes and the one that does not apply is display:none, which removes it from the accessibility tree too. Depth is free after four, which is why there is no maxItems prop."
          >
            <Layout rowGap="block">
              {DEPTHS.map((d) => (
                <Layout key={d.depth} rowGap="tight">
                  <Breadcrumbs items={trail(d.depth)} />
                  <p className={s.specNote}>
                    Depth {d.depth}. {d.note}
                  </p>
                </Layout>
              ))}
            </Layout>
          </Specimen>

          <Specimen
            title="States — and why there is no state column here"
            note="Rest is what every trail on this page renders, and it needs no prop. No state in this component can be forced from outside — there is no active, no disabled, no expanded, because nothing here opens. So in place of a state column, here is what to look for on the trail below."
          >
            <Layout rowGap="block">
              <Breadcrumbs items={trail(4)} />
              <Layout rowGap="text">
                {STATE_REFERENCE.map((row) => (
                  <Layout key={row.state} columns={[1, 3]} colGap="gutter" rowGap="tight">
                    <p className={s.eyebrow}>{row.state}</p>
                    <p className={s.specNote}>{row.what}</p>
                  </Layout>
                ))}
              </Layout>
            </Layout>
          </Specimen>

          <Specimen
            title="Longest realistic label"
            note="No truncation, ever, and no ellipsis on a label — there is already an ellipsis in this component and it means something else. The trail wraps BETWEEN crumbs and never inside one, so a divider is never stranded from the label it belongs to. Narrow the window until it wraps."
          >
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
          </Specimen>

          <Specimen
            title="One long unbroken token — a slug"
            note="Breaks inside the word rather than pushing the row past its track. No horizontal scrollbar, no overflow out of the content column, no ellipsis. Its intrinsic minimum is the widest label, and a label wider than the column breaks inside itself."
          >
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
          </Specimen>

          <Specimen
            title="Many items — 2× expected, depth 16"
            note="Four items again from 768 up, three below — the same COUNT as depth 4, not the same trail: the parent is 'Level 15' and the hidden string reads a different number (13 levels omitted wide, 14 narrow). Only the rendered item count is invariant after four."
          >
            <Breadcrumbs items={trail(16)} />
          </Specimen>

          <Specimen
            title="An item with an empty label, above the same trail without it"
            note="Dropped before render, so the divider count stays correct — both trails render three items and two dividers, and they are identical. A whitespace-only label is the failure mode a CMS produces, not a hand-authored one."
          >
            <Layout rowGap="block">
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
            </Layout>
          </Specimen>

          <Specimen
            title="Zero items, and one item — each renders nothing at all"
            note="Two calls sit between this note and the next specimen, and neither renders: not an empty <nav>, because an empty landmark is worse than no landmark — a screen reader lists it and it answers nothing. Both log a dev warning naming the labels they were handed, since naming the route would mean reading it. If anything renders below this note, the test has failed."
          >
            <Breadcrumbs items={[]} />
            <Breadcrumbs items={[{ label: 'Home', href: '/' }]} />
          </Specimen>

          <Specimen
            title="Two adjacent — specimen only, invalid on a route"
            note="One per page. The component does not defend against two, and two produce two identical Breadcrumb landmarks, which a screen reader lists twice; since the landmark name is not a prop there is nothing to disambiguate them with. Shown because the spec's don'ts have to be decidable from a rendered page, and this is the page. PageHero's trail slot holds one, which is the structural answer."
          >
            <Layout rowGap="block">
              <Breadcrumbs items={trail(4)} />
              <Breadcrumbs items={trail(3)} />
            </Layout>
          </Specimen>
        </Layout>
      </Section>

      {/* ── Four surfaces: the trail reads the band it stands in ── */}
      {SURFACES.map((surface) => (
        <Section key={surface.surface} surface={surface.surface}>
          <Layout rowGap="stack">
            <Specimen title={`Surface · ${surface.surface}`} note={surface.note}>
              <Breadcrumbs items={trail(4)} />
            </Specimen>
            <Specimen
              title={`Long labels · depths 2, 3, 4, 5 · ${surface.surface}`}
              note="Above 768: 2, 3, 4, 4 crumbs. Below: 2, 3, 3, 3. The collapse mark is U+2026 in the divider's ink on every surface — punctuation between crumbs, not a fourth label. A trail of three authored levels is not collapsed on a phone, because three is already the phone's count; with labels this long it wraps between crumbs, never inside one."
            >
              <Layout rowGap="block">
                {LONG_DEPTHS.map((depth) => (
                  <Breadcrumbs key={depth} items={longTrail(depth)} />
                ))}
              </Layout>
            </Specimen>
          </Layout>
        </Section>
      ))}

      {/* ── The nested-surface case ──────────────────────────────────────────────
          A tint band inside an ink band, and the trail inside the tint. Specimen-only: a Section
          inside a Section insets its column twice. The trail reads the NEAREST data-surface, so it
          takes tint's column — which is only true because every surface block restates every
          token. */}
      <Section surface="ink">
        <Layout rowGap="block">
          <Section surface="tint" density="tight">
            <Breadcrumbs items={trail(4)} />
          </Section>
          <Layout rowGap="tight">
            <p className={s.specTitle}>Nested surface · a tint band inside an ink band</p>
            <p className={s.specNote}>
              SPECIMEN-ONLY ARRANGEMENT: the tint band is nested inside the ink one, so its
              content column insets twice. What it proves: the trail reads the TINT column, not
              ink&apos;s — ancestors at neutral-700 on paper-deep, 7.27:1. Had the tint block
              carried only its deltas from paper it would have inherited ink&apos;s values for
              whatever it omitted and stranded neutral-400 on this light ground at 1.90:1.
            </p>
          </Layout>
        </Layout>
      </Section>

      {/* ── In situ: the real composition, trail inside the hero ── */}
      <Section flush>
        <div className={s.mockBar} />
      </Section>
      <PageHero
        trail={{
          crumbs: <Breadcrumbs items={trail(4)} />,
          current: 'Interaction and UI Design',
        }}
        title="Interaction and UI Design"
        body={[
          'The real composition: the trail in PageHero’s trail slot, inside the hero’s band.',
        ]}
      />
      <Section density="tight">
        <Layout rowGap="block">
          <p className={s.specTitle}>In situ · under a stand-in for the sticky nav</p>
          <p className={s.specNote}>
            The bar above stands in for <code>SiteNav</code>. The hero&apos;s 96 of top padding
            is the air above the trail, and 32 (<code>gutter</code>) separates the trail from
            the title. No eyebrow: the last crumb already names the page, and PageHero warns in
            development when an eyebrow repeats it.
          </p>
          <p className={s.specNote}>
            Touch: the hit area is extended past the label&apos;s box with a pseudo-element —
            the label&apos;s own inline extent, 44 tall — anchored to the BOTTOM of the box and
            grown upward, so it reaches 23.15px into the hero&apos;s 96 and leaves about 73
            clear of the bar. Centred, 11.575px would hang into the 32 below, over the
            title&apos;s cap height.
          </p>
          <Cluster colGap="text" rowGap="text" align="center">
            <div className={s.hitFloor}>
              <p className={s.specNote}>a 44px floor, for comparison</p>
            </div>
            <p className={s.specNote}>
              Narrow the window until the trail wraps: the pitch is 44.85px (a 20.85px box plus{' '}
              <code>--gap-block</code>), which is MORE than the 44px target, so consecutive
              lines&apos; targets clear each other by 0.85px.
            </p>
          </Cluster>
        </Layout>
      </Section>
    </>
  );
}
