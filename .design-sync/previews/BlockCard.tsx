import { BlockCard, Layout, Section } from 'tcules-website-2026';

/* NOTE: these preview files are type-STRIPPED, not type-checked (see .design-sync/NOTES.md), so an
   invalid prop value fails silently at render. Two things to keep honest here: `BlockCard` has NO
   `className`, `children` or DOM spread — it is a closed record — and the parent grid is always
   `Layout as="ul"` with `equalRows`, never a bare <ul> and never a hand-rolled grid. Layout's gap
   names are the full nine-step scale; Cluster is the one that caps at `block`. */

/* A media source has to be self-contained here: a preview card renders outside the Next app, so a
   `/public` path resolves to nothing and fails as a broken frame the render check does not flag.
   This is the same 3:2 sample the specimen route uses. */
const IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320">' +
      '<rect width="480" height="320" fill="#e5e1d6"/>' +
      '<path d="M0 244 142 112l84 78 91-91 163 145v76H0Z" fill="#292824"/>' +
      '<circle cx="366" cy="78" r="42" fill="#c3dd2a"/>' +
      '<path d="M52 55h164v18H52zm0 34h112v10H52z" fill="#71706a"/>' +
      '</svg>',
  );

const CAPABILITIES = [
  {
    title: 'Product design',
    body: 'Turn a difficult workflow into a product people can understand and operate on their first day.',
    href: '/services/product-design',
    icon: 'product-design',
  },
  {
    title: 'Design systems',
    body: 'Build the decisions and reusable parts that keep a product coherent as the team grows.',
    href: '/services/design-systems',
    icon: 'design-systems',
  },
  {
    title: 'AI product UX',
    body: 'Make a probabilistic system legible enough that people can tell when to trust it.',
    href: '/services/ai-product-ux',
    icon: 'ai-product-ux',
  },
  {
    title: 'Modernisation',
    body: 'Move a system people depend on without asking them to relearn their own job.',
    href: '/services/modernisation',
    icon: 'modernisation',
  },
];

const NOTES = [
  {
    title: 'Decide before you draw',
    body: 'Name the call the user is making, and what they need in front of them to make it once.',
  },
  {
    title: 'Find the operational owner',
    body: 'Every screen has someone downstream of it. The design is wrong if their work gets worse.',
  },
  {
    title: 'Ship one coherent slice',
    body: 'Small enough to release this month, complete enough for a customer to judge on its own.',
  },
];

/**
 * **The parent grid is not optional, and `equalRows` is the load-bearing prop.**
 *
 * `BlockCard` renders an `<li>` and nothing else — no grid, no band, no ground. The list element is
 * the caller's, and it is a `Layout` so both axes stay a primitive.
 *
 * `equalRows` is what makes every tile in a row the same height regardless of copy length. Without
 * it a four-across set is four rectangles of four different heights, and the bottom edges stop
 * lining up — which is the one thing a four-sided bordered object cannot survive. `colGap` and
 * `rowGap` are both `gutter` (32), the step named for the gap between cards in a set.
 *
 * Column count lives here rather than on the card because it describes a relationship BETWEEN
 * cards. `{ base: 1, md: 2, xl: 4 }` is the house shape: one track on a phone, two from 768, four
 * only from 1440 — so a four-card set never becomes a three-column row with an orphan.
 */
function Grid({ columns = { base: 1, md: 2, xl: 4 }, children }) {
  return (
    <Layout as="ul" columns={columns} colGap="gutter" rowGap="gutter" equalRows>
      {children}
    </Layout>
  );
}

/**
 * BlockCard — one edge-bounded tile in a grid, and the other half of the card question.
 *
 * It is a TILE, not a row and not a panel: a complete object bounded on four sides by one hairline
 * edge, with **no background of its own** — the Section's ground shows through it. If you are
 * reaching for a filled box, nothing in this system is one; the edge is the whole object.
 *
 * **`ListCard` or `BlockCard` is one question: is this a ladder or a grid?** A set read DOWN one
 * column, each item finishing itself with a rule at its block end, is `ListCard`. A set read ACROSS
 * two or four tracks, each item a bounded object, is this. Neither paints a ground, so the choice is
 * never about colour — it is about whether the eye travels down a ladder or over a field.
 *
 * FOUR DECISIONS, and they are independent of each other:
 *
 *   the parent grid  `Layout as="ul"` with `columns`, `colGap="gutter"`, `rowGap="gutter"` and
 *                    `equalRows` — see `Grid` above. Required, and `equalRows` is not optional in
 *                    practice.
 *   `media`          one optional slot, two closed fills: `{kind:'icon', name}` sits INSIDE the
 *                    inset above the title, `{kind:'image', src, alt}` sits EDGE-TO-EDGE above it
 *                    in a fixed 3:2 crop. Never a node — a tile cannot acquire an overlay, a
 *                    control, or a call-site crop.
 *   `href`           a non-blank destination turns the WHOLE tile into one native link with one
 *                    focus stop, and adds the arrow cue at the content's inline end. Absent, the
 *                    tile is an inert `<div>` — complete, with no empty action row left behind.
 *   `titleAs`        `h3` (default) or `h4` gives the title heading semantics without changing its
 *                    type. The title is always set at h4 scale; this is the page outline, not size.
 *
 * Title text never sits over the image, and there is no arrangement in which it can. Image above,
 * inset content below, on every surface and at every width.
 *
 * It takes no `surface` prop, because it paints no ground — it reads `data-surface` from the
 * `Section` above it, like a `Button` does. Set the surface on the band.
 */
export function Default() {
  return (
    <Grid columns={{ base: 1, md: 3 }}>
      {NOTES.map((note) => (
        <BlockCard key={note.title} title={note.title} body={note.body} />
      ))}
    </Grid>
  );
}

/**
 * The highest-value shape in the component: an icon-led linked set, four across. The icon is a
 * subject mark and is unlabelled — the title already names the tile, so the glyph renders
 * `aria-hidden` and is never read out beside it. One anchor and one cue per tile.
 */
export function Linked() {
  return (
    <Grid>
      {CAPABILITIES.map((c) => (
        <BlockCard
          key={c.title}
          title={c.title}
          body={c.body}
          href={c.href}
          media={{ kind: 'icon', name: c.icon }}
          titleAs="h3"
        />
      ))}
    </Grid>
  );
}

/**
 * Image media. The crop, the 3:2 ratio and the `object-fit: cover` centre position are the
 * component's decision rather than the caller's, so a mixed set stays aligned. `alt` is required
 * even when the correct value is `''` — decoration has to be chosen, not omitted.
 *
 * The image is edge-to-edge: it meets the frame's own border on three sides with no inset, which is
 * why the frame's stack is a `Layout rowGap="none"` and not a gapped one.
 */
export function WithImage() {
  return (
    <Grid columns={{ base: 1, md: 3 }}>
      {NOTES.map((note) => (
        <BlockCard
          key={note.title}
          title={note.title}
          body={note.body}
          href="/case-studies"
          media={{ kind: 'image', src: IMAGE, alt: '' }}
        />
      ))}
    </Grid>
  );
}

/**
 * Equal rows, which is the prop worth seeing fail. Four tiles with wildly different copy lengths:
 * every frame is the same height and every bottom edge lines up. Drop `equalRows` from the parent
 * and this becomes four different rectangles — the failure a ruled row like `ListCard` is immune to
 * and a bordered tile is not.
 */
export function EqualRows() {
  return (
    <Grid>
      <BlockCard title="One line" body="Short body." />
      <BlockCard title="A title intended to wrap across two lines" body="Short body." />
      <BlockCard
        title="A deliberately long tile title that runs to about four lines in a four-column track"
        body="Short body."
      />
      <BlockCard
        title="Long body"
        body="A much longer supporting paragraph that keeps going well past the others so the tallest card in the row is the one setting the height for every frame beside it."
      />
    </Grid>
  );
}

/** The static tile beside its linked peer. No pointer states, no cue, and — the point — no empty
    action row where the cue would have been. A tile without a destination is finished, not
    truncated. */
export function StaticAndLinked() {
  return (
    <Grid columns={{ base: 1, md: 2 }}>
      <BlockCard
        title="Static tile"
        body="Complete as an object. Inert, with no arrow and no gap left where one would sit."
        media={{ kind: 'icon', name: 'document-text' }}
      />
      <BlockCard
        title="Linked tile"
        body="One native anchor over the whole frame, one focus stop, and the cue at the inline end."
        media={{ kind: 'icon', name: 'design-engineering' }}
        href="/case-studies"
      />
    </Grid>
  );
}

/**
 * On tint: title and icon hold at neutral-900 and the link ramp holds at brandeis 500 → 600 → 700,
 * because both still clear their floors on the deeper ground. The edge is what moves —
 * neutral-300 to neutral-400 — so a four-across set of quiet rectangles stays bounded rather than
 * dissolving into the band.
 */
export function OnTint() {
  return (
    <Section surface="tint">
      <Linked />
    </Section>
  );
}

/**
 * On ink the direction inverts. Title and icon lift to white, body to neutral-300, and the link
 * ramp lifts to brandeis 300 → 100 → 50 — brandeis-500 is only 2.77:1 here. The edge drops to
 * neutral-700 so a grid of tiles does not become a light lattice across a dark band.
 */
export function OnInk() {
  return (
    <Section surface="ink">
      <Linked />
    </Section>
  );
}

/**
 * On blue only the light end of the ramp clears AA: link 100 → white → 50, and body sits at
 * brandeis-50 rather than a neutral. The focus ring's gap colour is the Section's actual
 * brandeis-500 ground, so the white outer ring is measured against what it frames.
 */
export function OnBlue() {
  return (
    <Section surface="blue">
      <WithImage />
    </Section>
  );
}
