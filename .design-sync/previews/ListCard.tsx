import { ListCard, Layout, Section } from 'tcules-website-2026';
import type { ListCardMarker } from 'tcules-website-2026';

/* NOTE: these preview files are type-STRIPPED, not type-checked (see .design-sync/NOTES.md), so an
   invalid prop value fails silently at render. Two things to keep honest here: `ListCard` has NO
   `className`, `children` or DOM spread — it is a closed record, so nothing below reaches for one —
   and the parent list is always `Layout as="ul" | "ol"` with `rowGap="none"`, never a bare <ul>. */

/* A thumbnail source has to be self-contained here: a preview card renders outside the Next app, so
   a `/public` path resolves to nothing. This is the same 3:2 sample the specimen route uses. */
const THUMBNAIL =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320">' +
      '<rect width="480" height="320" fill="#e5e1d6"/>' +
      '<path d="M0 244 142 112l84 78 91-91 163 145v76H0Z" fill="#292824"/>' +
      '<circle cx="366" cy="78" r="42" fill="#c3dd2a"/>' +
      '<path d="M52 55h164v18H52zm0 34h112v10H52z" fill="#71706a"/>' +
      '</svg>',
  );

const TERMS = [
  {
    title: 'Service blueprint',
    body: 'A shared view of the customer journey, the operational handoffs and the evidence each step produces.',
  },
  {
    title: 'Decision model',
    body: 'The smallest set of product rules a team needs to make the same call without another meeting.',
  },
  {
    title: 'Interaction contract',
    body: 'The states, language and response a control promises before visual treatment is added.',
  },
];

const STEPS = [
  {
    title: 'Define the decision before the interface',
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

const SERVICES: { title: string; body: string; href: string; marker: ListCardMarker }[] = [
  {
    title: 'Product design',
    body: 'Turn a difficult workflow into a product people can understand and operate.',
    href: '/services/product-design',
    marker: { kind: 'icon', name: 'document-text' },
  },
  {
    title: 'Design systems',
    body: 'Build the decisions and reusable parts that keep a product coherent as it grows.',
    href: '/services/design-systems',
    marker: { kind: 'icon', name: 'check-circle' },
  },
  {
    title: 'AI product UX',
    body: 'Make a probabilistic system legible enough that people can tell when to trust it.',
    href: '/services/ai-product-ux',
    marker: { kind: 'icon', name: 'document-text' },
  },
];

/**
 * **The parent list is not optional and it is not a bare `<ul>`.**
 *
 * `ListCard` renders an `<li>` and nothing else — no list, no band, no ground. The list element is
 * the caller's, and it is a `Layout` so the row axis stays a primitive: `as="ol"` when position is
 * part of the meaning (a numbered sequence, a process), `as="ul"` when it is not (terms, services).
 *
 * `rowGap="none"` is the whole point. Each row finishes itself with its own block-end rule, so a
 * gap between rows would open a visible break in a ladder that is meant to read as continuous.
 * `none` is Layout's explicit statement that two rows share an edge — it is not a missing value.
 */
function Rows({ ordered = false, children }) {
  return (
    <Layout as={ordered ? 'ol' : 'ul'} rowGap="none">
      {children}
    </Layout>
  );
}

/**
 * ListCard — one ruled row in a list, and the smallest card in the system.
 *
 * It is a ROW, not a panel: no background, no surrounding border, no shadow. Its only edge is a
 * hairline at the block end, which is what lets a set of them read as one continuous ladder rather
 * than as a stack of separate objects. If the thing you are building needs a filled or bordered
 * object, this is not it.
 *
 * FOUR DECISIONS, and they are independent of each other:
 *
 *   the parent list  `Layout as="ol" | "ul"` with `rowGap="none"` — see `Rows` above. Required.
 *   `marker`         the leading slot: `{kind:'number'}`, `{kind:'icon'}`, `{kind:'thumbnail'}`,
 *                    or absent. One slot, three fills — the discriminator is CONTENT, not a visual
 *                    variant, so every fill lands in the same position under the same rule.
 *   `arrangement`    `split` (default) puts title and body in a 2:3 two-column split above the md
 *                    boundary and collapses to one track below it. `stacked` keeps body under
 *                    title at every width. This is title/body geometry ONLY — it changes nothing
 *                    else about the row.
 *   `href`           a non-blank destination turns the WHOLE row into one native link with one
 *                    focus stop, and adds the arrow cue at the row's inline end. Absent, the row
 *                    is an inert `<div>` with no pointer states and no cue.
 *
 * `titleAs` is separate again: `span` (default), `h3` or `h4` gives the title heading semantics
 * without changing its type. Reach for it when the rows are page landmarks, not when they are prose.
 *
 * It takes no `surface` prop, because it paints no ground — it reads `data-surface` from the
 * `Section` above it, like a `Button` does. Set the surface on the band.
 */
export function Default() {
  return (
    <Rows>
      {TERMS.map((term) => (
        <ListCard key={term.title} title={term.title} body={term.body} />
      ))}
    </Rows>
  );
}

/**
 * The numbered sequence: `as="ol"` on the list, `{kind:'number'}` on each row. The `<ol>` announces
 * position, so the visible figure is `aria-hidden` and is never read twice. Values pad to at least
 * two digits, so an expected 01–12 aligns down the ladder.
 */
export function Numbered() {
  return (
    <Rows ordered>
      {STEPS.map((step, index) => (
        <ListCard
          key={step.title}
          arrangement="stacked"
          title={step.title}
          body={step.body}
          marker={{ kind: 'number', value: index + 1 }}
        />
      ))}
    </Rows>
  );
}

/**
 * The linked set — a services or topics index. `href` makes each row one target, `titleAs="h3"`
 * makes each title a landmark, and the icon marker gives the row a shape a text-only list lacks.
 * This is the highest-value shape in the component: three decisions, one composition.
 */
export function Linked() {
  return (
    <Rows>
      {SERVICES.map((service) => (
        <ListCard
          key={service.title}
          title={service.title}
          body={service.body}
          href={service.href}
          marker={service.marker}
          titleAs="h3"
        />
      ))}
    </Rows>
  );
}

/**
 * The thumbnail fill. `src` and `alt` are fields on the marker rather than a caller-supplied node,
 * so the crop, the 3:2 ratio and the centre position are one decision across every caller. `alt`
 * is required even when the correct value is `''` — decoration has to be chosen, not omitted.
 */
export function Thumbnails() {
  return (
    <Rows>
      {TERMS.map((term) => (
        <ListCard
          key={term.title}
          arrangement="stacked"
          title={term.title}
          body={term.body}
          marker={{ kind: 'thumbnail', src: THUMBNAIL, alt: '' }}
        />
      ))}
    </Rows>
  );
}

/** All three fills and the empty slot, in one ladder. The row keeps the same rule, inset and type
    for each — which is the claim the marker slot is making, and the reason it is one slot. */
export function MarkerKinds() {
  return (
    <Rows>
      <ListCard
        arrangement="stacked"
        title="Number"
        body="Weight rather than a bullet, for a sequence where position is part of the meaning."
        marker={{ kind: 'number', value: 1 }}
      />
      <ListCard
        arrangement="stacked"
        title="Icon"
        body="A decorative glyph, unlabelled — the title already names the row, so the glyph stays decorative."
        marker={{ kind: 'icon', name: 'copy' }}
      />
      <ListCard
        arrangement="stacked"
        title="Thumbnail"
        body="A content image in a fixed 3:2 crop, for a set where the picture is the recognisable part."
        marker={{ kind: 'thumbnail', src: THUMBNAIL, alt: '' }}
      />
      <ListCard
        arrangement="stacked"
        title="No marker"
        body="Absence removes the slot and its seam. The copy starts at the row's own inset."
      />
    </Rows>
  );
}

/** `stacked` beside the default `split`. Same rows, same rule, one geometry decision apart. */
export function Stacked() {
  return (
    <Rows>
      {TERMS.map((term) => (
        <ListCard key={term.title} arrangement="stacked" title={term.title} body={term.body} />
      ))}
    </Rows>
  );
}

/**
 * On tint: title and marker hold at neutral-900 and the link ramp holds at brandeis 500 → 600 →
 * 700, because both still clear their floors on the deeper ground. The base hairline is what moves
 * — neutral-300 to neutral-400 — so a twelve-row ladder stays present rather than fading out.
 */
export function OnTint() {
  return (
    <Section surface="tint">
      <Linked />
    </Section>
  );
}

/**
 * On ink the direction inverts. Title and marker lift to white, body to neutral-300, and the link
 * ramp lifts to brandeis 300 → 100 → 50 — brandeis-500 is only 2.77:1 here. The rule drops to
 * neutral-700 so twelve rows do not become a light ladder across a dark band.
 */
export function OnInk() {
  return (
    <Section surface="ink">
      <Numbered />
    </Section>
  );
}

/**
 * On blue only the light end of the ramp clears AA: link 100 → white → 50. Pressed stays distinct
 * from hover through the doubled rule as well as the ink, which is why the rule has a pressed width.
 */
export function OnBlue() {
  return (
    <Section surface="blue">
      <Linked />
    </Section>
  );
}
