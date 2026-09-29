import { Callout, Layout, Proof, Prose, Section } from 'tcules-website-2026';

/* NOTE: these preview files are type-STRIPPED, not type-checked (see .design-sync/NOTES.md), so an
   invalid prop value fails silently at render rather than at build. There are two props here and
   both are strings (`label` is optional, since tracker 2.17), so the thing to keep honest is the CONTENT contract rather than a union: `html` is
   trusted, sanitised rich text carrying one or two paragraphs and inline marks — no headings, no
   figures, no blockquotes. Blank or whitespace-only content renders NOTHING and warns in
   development, which the BlankRendersNothing story below shows on purpose. */

/* ── Why every story below renders a CLAIM as well as the note ─────────────────────
   A Callout on its own is one quiet grey paragraph, and a card showing that would be telling you
   about the type role rather than about the component. The whole meaning of this pattern is
   positional: it is the boundary on the claim IMMEDIATELY BEFORE IT, and it recedes from that
   claim rather than competing with it. So each story is the pair — a Prose claim, then the note,
   in a `Layout rowGap="block"` — which is also exactly the composition the spec prescribes. The
   claim is never a prop: it stays a preceding sibling, so a note record never duplicates page
   prose inside itself. */

const CLAIM =
  '<p>Across eight discovery engagements the same three failures came up before anyone mentioned a roadmap: no single owner for the data, a review cycle nobody trusted, and a backlog written in outputs rather than decisions.</p>';

const SHORT_CLAIM =
  '<p>A short qualitative study is enough to find the failure that matters most.</p>';

const NOTE_ONE_SENTENCE =
  '<p>This is a composite product scenario, not a delivered client artefact.</p>';

const NOTE_TWO_SENTENCES =
  '<p>A small qualitative study can expose a serious problem. It cannot estimate how common the problem is.</p>';

const NOTE_DIAGNOSTIC =
  '<p>These cases support the diagnostic principle. They are not presented as instances of this exact audit offer.</p>';

/* Inline marks and a link, which Prose renders and keeps on ITS OWN tokens — the link stays a link
   colour and keeps its focus ring inside a note that is otherwise the quietest ink on the surface. */
const NOTE_RICH =
  '<p>This is <em>illustrative</em>, not a <strong>measured outcome</strong>.</p><p>Read the <a href="/case-studies">case-study evidence</a> for attributed results.</p>';

const NOTE_LONG =
  '<p>This illustrative synthesis combines recurring operational themes from several discovery conversations and is included to clarify the boundary of the preceding claim. It should not be read as a measured outcome, a client quotation, or evidence that every team encounters the same conditions.</p>';

/* The attributed half of the routing decision the identity section turns on. It goes to Proof, not
   here, and the BesideProof story renders both so the difference is visible rather than described. */
const ATTRIBUTED = {
  quoteHtml:
    '<p>The team made the difficult parts visible early enough for us to act on them.</p>',
  name: 'Ashok Mohanty',
  role: 'Founder',
  company: 'Auxentios',
};

/**
 * Callout — a quiet, unattributed scope note on the claim immediately before it.
 *
 * It says what the surrounding argument, example or evidence does NOT establish. Ten records across
 * eight routes today; `/services/product-design` carries three of them and the other seven carry one.
 *
 * **Two props, no axis.** `html` is trusted sanitised rich text; `label` is an optional short key
 * (tracker 2.17, see the Keyed story). There is no eyebrow, heading, icon, quotation glyph, attribution, severity marker, panel,
 * ground or dismissal control — and no `variant`, `size` or `tone`, because a scope note has one
 * job and a second treatment would be a second meaning nobody has asked for.
 *
 * **It paints nothing and spaces nothing.** No ground, no edge, no radius, no shadow, no outer
 * margin, and no `surface` prop: put it inside a `Section` and its one ink resolves from that band's
 * `data-surface`, on all four surfaces, including a tint panel nested in an ink section. The seam
 * ABOVE it belongs to the parent `Layout`, which is what makes the claim-to-note relationship the
 * page's decision rather than this component's.
 *
 * **What it is not, because three neighbours are close.** Not a quotation — `Prose` renders an
 * ordinary unattributed quote inside a rich-text flow, at its own quote scale with a leading rule,
 * which INCREASES weight where this must recede. Not client evidence — `Proof` owns a quote with a
 * name, role and company, and audited figures. Not a caption — `Figure` owns the note that qualifies
 * an image and travels with it. Not an alert: there is no warning, error, success, urgency or
 * recovery action anywhere in the ten records, and no alert component to borrow from.
 *
 * It is also deliberately not a quiet `size` on `Prose`. Prose has one reading treatment for an
 * arbitrary body flow; a quiet size there would let any page diminish any paragraph without saying
 * why. Callout makes the meaning, the fixed quiet treatment and the note semantics arrive together.
 */
export function Default() {
  return (
    <Layout rowGap="block">
      <Prose html={CLAIM} />
      <Callout html={NOTE_TWO_SENTENCES} />
    </Layout>
  );
}

/** An optional mono key, added 29 Sep 2026 (tracker 2.17) because a bare scope note looked exactly
    like a Figure caption. Pass the key in sentence case — "Scope", not "SCOPE": the mono label voice
    uppercases it in CSS only. It leads the sentence on its baseline, 8 apart, and wraps above the
    sentence when the line cannot hold both. Leave it off and the note is exactly the Default card. */
export function Keyed() {
  return (
    <Layout rowGap="block">
      <Prose html={CLAIM} />
      <Callout label="Scope" html={NOTE_TWO_SENTENCES} />
    </Layout>
  );
}

/** The shortest real record — one sentence naming what the example is not. The note is body-small
    and the quietest ink the surface allows, so it reads as a parenthesis on the claim rather than as
    a second claim. Nothing marks it but its size, its ink and its position; there is no rule, no
    glyph and no indent, because each of those would make it argue with the paragraph above. */
export function OneSentence() {
  return (
    <Layout rowGap="block">
      <Prose html={SHORT_CLAIM} />
      <Callout html={NOTE_ONE_SENTENCE} />
    </Layout>
  );
}

/** Inline rich text: `em`, `strong` and a link across two paragraphs. Prose owns every one of those
    descendants and keeps them on its own tokens, which is why the link is still a link — the note's
    quiet ink applies to running text, not to a control. The paragraph-to-paragraph seam inside the
    note is Prose's too. Callout contributes exactly two things to this card: the size and the ink. */
export function InlineRichText() {
  return (
    <Layout rowGap="block">
      <Prose html={CLAIM} />
      <Callout html={NOTE_RICH} />
    </Layout>
  );
}

/** The longest record in the corpus, at about 300 characters. It caps at the shared body measure and
    wraps; it is never clamped and never truncated. A note this long is a signal about the claim
    above it rather than a case for a "more" control — if the boundary needs a paragraph to state,
    the claim it limits is probably doing too much. */
export function LongNote() {
  return (
    <Layout rowGap="block">
      <Prose html={CLAIM} />
      <Callout html={NOTE_LONG} />
    </Layout>
  );
}

/** Three notes on one page, which is the `/services/product-design` case and the reason the root is
    `role="note"` rather than an `aside` landmark: three unlabelled complementary landmarks would be
    three things to navigate past. Each note attaches to its own claim by position alone, and the
    rhythm that keeps the pairs legible is the parent Layout's — tighter inside a pair than between
    them, which is nesting rather than a gap prop on this component. */
export function ThreeNotes() {
  return (
    <Layout rowGap="stack">
      <Layout rowGap="block">
        <Prose html={SHORT_CLAIM} />
        <Callout html={NOTE_ONE_SENTENCE} />
      </Layout>
      <Layout rowGap="block">
        <Prose html={CLAIM} />
        <Callout html={NOTE_TWO_SENTENCES} />
      </Layout>
      <Layout rowGap="block">
        <Prose html={SHORT_CLAIM} />
        <Callout html={NOTE_DIAGNOSTIC} />
      </Layout>
    </Layout>
  );
}

/** THE ROUTING DECISION, rendered rather than described — the one card to look at before reaching
    for either component. An attributed quotation with a name, a role and a company is client
    evidence and goes to `Proof`, which gives it weight. An unattributed sentence saying what the
    evidence does not establish is a scope note and goes to `Callout`, which takes weight away.
    The content seam decides which record it is writing; neither component ever inspects HTML to
    find out what it was handed. */
export function BesideProof() {
  return (
    <Layout rowGap="stack">
      <Proof quote={ATTRIBUTED} />
      <Layout rowGap="block">
        <Prose html={CLAIM} />
        <Callout html={NOTE_DIAGNOSTIC} />
      </Layout>
    </Layout>
  );
}

/** Blank or whitespace-only content renders NOTHING — no element, no empty note, no seam — and warns
    in development. The card below therefore shows the claim alone, and that is the whole story: a
    scope note with nothing to say is a content fault, and the honest rendering is its absence rather
    than an empty box holding space for it. Callout owns no idref and generates no id, so nothing
    else on the page is left pointing at the element that did not render. */
export function BlankRendersNothing() {
  return (
    <Layout rowGap="block">
      <Prose html={CLAIM} />
      <Callout html="   " />
    </Layout>
  );
}

/** On tint the ink steps from neutral-600 to neutral-700, because neutral-600 measures 4.39:1 on this
    ground and fails the 4.5 floor. The note stays clearly quieter than the claim regardless — Prose
    sets body copy at neutral-900 on this surface, so there are two full rungs between them. Where
    the step DOES land on a neighbour is Prose's own muted ink, which is neutral-700 here too: a note
    on tint is the same ink as de-emphasised body text, and is told apart from it by size and by the
    note semantic rather than by colour. */
export function OnTint() {
  return (
    <Section surface="tint">
      <Layout rowGap="block">
        <Prose html={CLAIM} />
        <Callout html={NOTE_TWO_SENTENCES} />
      </Layout>
    </Section>
  );
}

/** On ink the direction inverts and the note lifts to neutral-400 at 8.05:1 — the same step this
    system gives a quiet label on this ground. It has the most daylight of any surface here, which
    matters because a small quiet grey is where a near-black band is most likely to look thin. */
export function OnInk() {
  return (
    <Section surface="ink">
      <Layout rowGap="block">
        <Prose html={CLAIM} />
        <Callout html={NOTE_RICH} />
      </Layout>
    </Section>
  );
}

/** On blue the ramp runs out and the note takes brandeis-100 at 4.91:1 — the tightest passing cell
    it has anywhere. Nothing quieter is available on this ground, so a note on the blue pivot is as
    quiet as the system will allow it to be and no quieter. */
export function OnBlue() {
  return (
    <Section surface="blue">
      <Layout rowGap="block">
        <Prose html={CLAIM} />
        <Callout html={NOTE_TWO_SENTENCES} />
      </Layout>
    </Section>
  );
}
