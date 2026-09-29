import { BlockCard, BlockCardSet, Layout, Section } from 'tcules-website-2026';

/* NOTE: these preview files are type-STRIPPED, not type-checked (see .design-sync/NOTES.md), so an
   invalid prop value fails silently at render. Two things to keep honest here: `BlockCard` has NO
   `className`, `children` or DOM spread — it is a closed record — and the parent grid is always
   `Layout as="ul"` with `equalRows`, never a bare <ul> and never a hand-rolled grid. Layout's gap
   names are the full nine-step scale; Cluster is the one that caps at `stack`. */

/* A media source has to be self-contained here: a preview card renders outside the Next app, so a
   `/public` path resolves to nothing and fails as a broken frame the render check does not flag.
   This is the same sample the specimen route uses. It is drawn at 3:2 and the component crops it to
   whichever ratio the orientation asks for, which is the point: the crop is never the caller's. */
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

/* The cover as a record, the way a page receives it from the content seam: master src, alt and the
   intrinsic size. `kind` is omitted, so it renders as a capture (a hairline) — a real cut-out or
   illustration cover would say so and render unboxed. */
const COVER = { type: 'image', image: { src: IMAGE, alt: '', width: 480, height: 320 } };

const CAPABILITIES = [
  {
    title: 'Product design',
    body: 'Turn a difficult workflow into a product people can understand and operate on their first day.',
    href: '/services/product-design',
  },
  {
    title: 'Design systems',
    body: 'Build the decisions and reusable parts that keep a product coherent as the team grows.',
    href: '/services/design-systems',
  },
  {
    title: 'AI product UX',
    body: 'Make a probabilistic system legible enough that people can tell when to trust it.',
    href: '/services/ai-product-ux',
  },
  {
    title: 'Modernisation',
    body: 'Move a system people depend on without asking them to relearn their own job.',
    href: '/services/modernisation',
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

const CASES = [
  {
    eyebrow: 'Case study · ConnectX',
    title: 'A building-energy product an operator can run without training',
    body: 'Sixty-eight screens reduced to eleven, and the daily decision moved to the top of the one people actually open.',
    href: '/case-studies/connectx',
    ctaLabel: 'Read the ConnectX case',
  },
  {
    eyebrow: 'Case study · Fieldwork',
    title: 'One inspection record, written once, wherever the signal drops',
    body: 'A form that survives a basement and a rooftop, and an office that stops re-keying what the field already typed.',
    href: '/case-studies/fieldwork',
    ctaLabel: 'Read the Fieldwork case',
  },
  {
    eyebrow: 'Case study · Ledger',
    title: 'A reconciliation queue that shows why it flagged a row',
    body: 'The evidence beside the exception, so an analyst clears a batch instead of re-deriving one row at a time.',
    href: '/case-studies/ledger',
    ctaLabel: 'Read the Ledger case',
  },
];

/**
 * **The parent grid is not optional, and `equalRows` is still worth passing.**
 *
 * `BlockCard` renders an `<li>` and nothing else — no grid, no band, no ground. The list element is
 * the caller's, and it is a `Layout` so both axes stay a primitive.
 *
 * `equalRows` makes every card in a row the same height regardless of copy length. That used to be
 * about bottom edges lining up, and the card no longer has an edge to line up — what it buys now is
 * the CTA: with equal rows every `Read more` in a set sits on one line across the row, and without
 * it each one floats up to the end of its own copy and the row reads as four unrelated blocks.
 * `colGap` and `rowGap` are both `gutter` (32), the step named for the gap between cards in a set —
 * and that gutter is now the whole boundary between one card and the next.
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
 * BlockCard — one BORDERLESS card in a grid, and the other half of the card question.
 *
 * It draws no box and paints no ground: the Section's surface shows through it, and it is bounded by
 * the parent grid's 32px gutter and the section rhythm around the set. If you are reaching for an
 * outlined or filled rectangle, nothing in this system is one — a hairline around editorial copy
 * reads as a form field, and the distance is the boundary.
 *
 * **`ListCard` or `BlockCard` is one question: is this a ladder or a grid?** A set read DOWN one
 * column, each item finishing itself with a rule at its block end, is `ListCard`. A set read ACROSS
 * two or four tracks, each item its own object, is this. Neither draws a box, so the choice is
 * object versus row — whether the eye travels down a ladder or over a field.
 *
 * SIX DECISIONS, and they are independent of each other:
 *
 *   the parent grid  `Layout as="ul"` with `columns`, `colGap="gutter"`, `rowGap="gutter"` and
 *                    `equalRows` — see `Grid` above. Required.
 *   `media`          one optional cover, one closed record: `{ type: 'image', image }`, edge-to-edge
 *                    with the copy flush beneath it. Never a node, and no icon fill — a card
 *                    cannot acquire an overlay, a control, or a call-site crop. The ratio belongs
 *                    to the orientation: 3:2 vertical, 4:3 horizontal. Case studies and articles,
 *                    videos and podcasts with a cover carry one; services, audits, glossary and
 *                    capabilities never do.
 *   `eyebrow`        one optional quiet label above the title — a client, a category, a content
 *                    type, an editorial kicker. A plain string, so the caller composes the line;
 *                    pass "Case study", not "CASE STUDY", because mono is uppercased by the
 *                    stylesheet and never by the copy.
 *   `href`           a non-blank destination turns the WHOLE card into one native link with one
 *                    focus stop, and adds the cta. Absent, the card is an inert `<div>` —
 *                    complete, with no empty action row left behind.
 *   `ctaLabel`       the cta wording, defaulting to "Read more". The cta is the shipped link
 *                    `Button` rendered as a span, so it takes the control's real type, case and
 *                    underline wipe. **The title is NOT blue on a linked card** — the cta is the
 *                    card's only link-coloured part, and naming the destination is what marks a
 *                    card as navigable.
 *   `orientation`    `vertical` (default) fills one grid track, media above copy. `horizontal`
 *                    takes two equal tracks at h3 scale: media beside copy with a cover, head
 *                    beside body without. It is what `BlockCardSet` gives the first of four or
 *                    more items — the featured card. `imageSide` picks the media track.
 *
 * `titleAs` (`h3` default, or `h4`) gives the title heading semantics without changing its type:
 * the title is always set at h4 scale, and this is the page outline rather than the size.
 *
 * Title text never sits over the image, and there is no arrangement in which it can. It takes no
 * `surface` prop either, because it paints no ground — it reads `data-surface` from the `Section`
 * above it, like a `Button` does. Set the surface on the band.
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
 * The highest-value shape in the component: a text-only linked set, four across. Service cards
 * carry no media, so weight comes from the title and the set's arrangement — never a box.
 *
 * One anchor per card, and the cta inside it is a `span` rather than a second link: the whole card
 * already navigates, so a nested anchor would be invalid markup and a second focus stop for one
 * destination. The card hands its own hover and press states to that Button, which is why the
 * underline wipes when the pointer is anywhere on the card rather than only on the words.
 */
export function Linked() {
  return (
    <Grid>
      {CAPABILITIES.map((c) => (
        <BlockCard key={c.title} title={c.title} body={c.body} href={c.href} titleAs="h3" />
      ))}
    </Grid>
  );
}

/**
 * `eyebrow` and `ctaLabel` together — the editorial shape, and the reason the title stopped turning
 * blue. Three cards that each name what they are above the title and where they go beneath it, so a
 * reader can tell a case study from an article without reading either.
 *
 * The eyebrow is authored in sentence case and rendered in tracked mono capitals by the stylesheet,
 * like every other mono label in the system. Pass "Case study · ConnectX"; the sheet does the
 * shouting, and a screen reader announces what was written.
 */
export function WithEyebrow() {
  return (
    <Grid columns={{ base: 1, md: 3 }}>
      {CASES.map((c) => (
        <BlockCard
          key={c.title}
          eyebrow={c.eyebrow}
          title={c.title}
          body={c.body}
          href={c.href}
          ctaLabel={c.ctaLabel}
          media={COVER}
        />
      ))}
    </Grid>
  );
}

/**
 * Image media in a vertical card. The 3:2 crop box is the component's decision rather than the
 * caller's, so a mixed set stays aligned; the image inside it is `Media`, which covers the box from
 * the centre and draws the edge the record's `kind` asks for. `alt` is required
 * even when the correct value is `''` — decoration has to be chosen, not omitted.
 *
 * The image is edge-to-edge and the copy is flush beneath it at `--gap-block`: with no border and no
 * inner inset, that gap IS the image-to-copy relationship rather than a padding left over from the
 * box that used to be here.
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
          media={COVER}
        />
      ))}
    </Grid>
  );
}

/**
 * `orientation="horizontal"`, with `imageSide` alternating down the stack — the arrangement for
 * three or four items too substantial to be thumbnails. Two equal tracks, the media at 4:3, and the
 * columns centred against each other.
 *
 * It is a single-track parent: the cards stack, and each card arranges itself across the band. Below
 * `md` the two tracks collapse to one and `imageSide` describes nothing, so DOM order decides and a
 * right-side card reads copy-then-image on a phone.
 *
 * This is deliberately close to a thumbnail `ListCard` in wireframe and is still a different
 * component: a `ListCard` row is a compact index entry at h5 with a 160px thumbnail and a bare
 * arrow, used twelve at a time. This keeps the h4 title, the eyebrow and the named cta, gives the
 * media half the card, and is used three at a time. The distinction is weight and count.
 */
export function Horizontal() {
  return (
    <Layout as="ul" rowGap="stack">
      {/* Two rather than the three of the modal case: left then right is the whole of what
          `imageSide` does, and a third card would push this cell past its review card for no
          decision a reader could not already make. */}
      {CASES.slice(0, 2).map((c, i) => (
        <BlockCard
          key={c.title}
          orientation="horizontal"
          imageSide={i % 2 === 0 ? 'left' : 'right'}
          eyebrow={c.eyebrow}
          title={c.title}
          body={c.body}
          href={c.href}
          ctaLabel={c.ctaLabel}
          media={COVER}
        />
      ))}
    </Layout>
  );
}

/**
 * `BlockCardSet` — the card group a page actually renders. From four items the FIRST is featured:
 * the horizontal arrangement spanning the row above its peers, with no field and no prop. One list,
 * one grid. Below, a text-only set of four (head beside body) and a cover set of four.
 */
export function FeaturedSet() {
  return (
    <Layout rowGap="section">
      <BlockCardSet
        items={CAPABILITIES.map((c) => ({ id: c.title, eyebrow: 'Service', ...c }))}
      />
      <BlockCardSet
        items={[...CASES, CASES[0]].map((c, i) => ({
          id: `${c.title}-${i}`,
          ...c,
          media: COVER,
        }))}
      />
    </Layout>
  );
}

/**
 * Equal rows, which is the prop worth seeing work. Four cards with wildly different copy lengths:
 * every `Read more` sits on the same line across the row. Drop `equalRows` from the parent and each
 * cta rises to the end of its own paragraph — with no edges to line up, the ctas are what make four
 * cards read as one row, so this matters MORE on a borderless card than it did on a bordered one.
 */
export function EqualRows() {
  return (
    <Grid>
      <BlockCard title="One line" body="Short body." href="/one" />
      <BlockCard
        title="A title intended to wrap across two lines"
        body="Short body."
        href="/two"
      />
      <BlockCard
        title="A deliberately long card title that runs to about four lines in a four-column track"
        body="Short body."
        href="/three"
      />
      <BlockCard
        title="Long body"
        body="A much longer supporting paragraph that keeps going well past the others so the tallest card in the row is the one setting the height for every card beside it."
        href="/four"
      />
    </Grid>
  );
}

/** The static card beside its linked peer, and the one comparison that shows what marks a card as
    navigable now. Both titles are the same dark ink; only one of them has a cta. No pointer states
    on the left, no cue, and — the point — no empty action row where the cue would have been. A card
    without a destination is finished, not truncated. */
export function StaticAndLinked() {
  return (
    <Grid columns={{ base: 1, md: 2 }}>
      <BlockCard
        title="Static card"
        body="Complete as an object. Inert, with no cta and no gap left where one would sit."
      />
      <BlockCard
        title="Linked card"
        body="One native anchor over the whole card, one focus stop, and a cta that names where it goes."
        href="/case-studies"
        ctaLabel="Read the write-up"
      />
    </Grid>
  );
}

/**
 * On tint: the title holds at neutral-900 and the body at neutral-700, because both still
 * clear their floors on paper-deep. The eyebrow is what moves — neutral-600 would be 4.39:1 here, so
 * it steps to 700 and shares the body's ink, which it can afford because mono, semibold and the
 * eyebrow's tracking already tell the two apart. With no edge left, nothing in the card dissolves
 * into the band when the ground deepens: the gutter is the boundary and a gutter has no colour.
 */
export function OnTint() {
  return (
    <Section surface="tint">
      <Linked />
    </Section>
  );
}

/**
 * On ink the direction inverts. The title lifts to white, body to neutral-300 and the eyebrow to
 * neutral-400; the cta's ramp is Button's, which lifts to the light Brandeis steps here because
 * brandeis-500 is only 2.77:1 on this ground. Text-only, because a cover is never placed on ink or
 * blue: a reserved band carries a media-less set.
 */
export function OnInk() {
  return (
    <Section surface="ink">
      <Linked />
    </Section>
  );
}

/**
 * On blue only the light end of the ramp clears AA: title white, body brandeis-50, and the eyebrow
 * at brandeis-100 is the tightest cell in the layer at 4.91:1. The focus ring's gap colour is the
 * Section's actual brandeis-500 ground, so the white outer ring is measured against what it frames.
 */
export function OnBlue() {
  return (
    <Section surface="blue">
      <Default />
    </Section>
  );
}
