import { Accordion, Section } from 'tcules-website-2026';

/* NOTE: these preview files are type-STRIPPED, not type-checked (see .design-sync/NOTES.md), so an
   invalid prop value fails silently at render. `Accordion` has exactly ONE prop — `items` — and no
   `className`, `children` or DOM spread, so there is nothing else here to get wrong except the
   shape of a record: `{ question, answerHtml }`, both non-blank strings. */

/* `answerHtml` is TRUSTED rich text. In the app it arrives already sanitised at the content seam,
   which is the only place sanitising happens; these fixtures are hand-written for the same reason a
   specimen's are — to exercise the tags Prose actually styles. Do not read this as permission to
   pass user input straight through. */
const FAQ = [
  {
    question: 'How do you price an engagement?',
    answerHtml:
      '<p>By the phase, not by the hour. A discovery phase is a fixed fee against a fixed set of ' +
      'questions; a delivery phase is a monthly rate against a named team. You will know the ' +
      'number before the work starts, and it does not move because the work turned out to be ' +
      'harder than we thought — that risk is ours.</p>' +
      '<p>What changes the number is scope, and we will tell you the moment we think it has.</p>',
  },
  {
    question: 'Can you work alongside our existing team?',
    answerHtml:
      '<p>Usually that is the arrangement. We are most useful where there are already engineers ' +
      'who know the domain and a product owner who knows the customer, and least useful where we ' +
      'are handed a brief and asked to disappear for three months.</p>' +
      '<ul><li>Your team keeps the domain knowledge and the codebase.</li>' +
      '<li>We bring the design decisions and the system they live in.</li>' +
      '<li>Everything we build is reviewable by your people from week one.</li></ul>',
  },
  {
    question: 'What happens to the design system after you leave?',
    answerHtml:
      '<p>It is yours, and it is built so that it can be. Every component ships with a ' +
      '<strong>specification</strong>, a proving-ground route showing every arrangement it has, and ' +
      'a token layer that no component may write around. A new engineer can read what a thing is ' +
      'for before they read how it works.</p>',
  },
  {
    question: 'Do you take on work that is only research?',
    answerHtml:
      '<p>Yes, though we will ask what decision the research is meant to settle. Research with no ' +
      'decision attached to it produces a document nobody reads. Research with one produces an ' +
      'argument, and an argument can be acted on. See <a href="/services">our services</a>.</p>',
  },
  {
    question: 'How long does a typical project run?',
    answerHtml:
      '<p>Discovery is four to six weeks. Delivery runs in monthly increments and most engagements ' +
      'settle at three to six of them. Anything shorter than a month tends to be advice rather ' +
      'than a project, and we are happy to give that as advice.</p>',
  },
];

const SHORT = [
  {
    question: 'Is the first item open?',
    answerHtml:
      '<p>Always, and it is the only one that starts open. A set that opens entirely closed reads ' +
      'as a list of headings and gives a reader nothing to judge the depth of an answer by.</p>',
  },
  {
    question: 'Can two items be open at once?',
    answerHtml:
      '<p>Yes. Every item is an independent <code>&lt;details&gt;</code>, so opening one never ' +
      'closes another and never moves focus. Compare two answers side by side without losing ' +
      'either.</p>',
  },
  {
    question: 'What closes an item?',
    answerHtml: '<p>Clicking or pressing Enter or Space on its question. Nothing else — no ' +
      'outside click, no Escape, no scroll. It is the native control, unmodified.</p>',
  },
];

/**
 * Accordion — one multi-open question-and-answer set, and the only component in this system built
 * on a native browser control rather than out of the primitives alone.
 *
 * Every item is a real `<details>` / `<summary>` pair. That is the whole design decision, and it is
 * why the component needs **no client boundary, no authored ARIA and no managed focus** — the
 * browser already owns the expanded state, the keyboard contract and the accessibility tree, and
 * every hand-written accordion is an attempt to reproduce those three badly. It renders on the
 * server and works before any JavaScript arrives.
 *
 * ONE PROP. `items` is an ordered array of `{ question, answerHtml }`:
 *
 *   `question`    plain text, and plain text on purpose — a `string` and not a node, so a second
 *                 heading, a link or a control cannot be smuggled into a summary that already has a
 *                 native role and a native keyboard contract.
 *   `answerHtml`  trusted rich text, rendered by `Prose` and by nothing else. Paragraphs, lists,
 *                 emphasis and links all work and are already styled per surface. Sanitising
 *                 happens at the content seam, never here.
 *
 * Records with a blank question or a blank answer are dropped and warned about rather than rendered
 * as an empty row; if nothing valid survives, the component renders nothing at all rather than an
 * empty ladder. Production content is expected to hold **two to eight** items — one is a paragraph
 * wearing a disclosure, and past eight the reader is scanning a list rather than reading answers.
 *
 * THE FIRST ITEM IS OPEN AND THE REST ARE INDEPENDENT. There is no single-open mode, no `defaultOpen`
 * and no way to control state from outside — opening one item never closes another and never moves
 * focus, so two answers can be compared side by side.
 *
 * IT IS A LADDER, NOT A STACK OF PANELS. One hairline above the set and one below each item, and no
 * ground behind any of them: opening an item changes the ink of its rule and nothing else, so the
 * geometry never shifts under the reader. It caps at the body measure because it is a reading
 * column. Like `Button`, it takes no `surface` — it reads `data-surface` from the `Section` above
 * it, so set the surface once on the band.
 */
export function Default() {
  return <Accordion items={FAQ} />;
}

/**
 * The rich answer. `answerHtml` goes through `Prose`, so a multi-paragraph answer, a list, `strong`,
 * `code` and a link are all already correct on every surface — including the link's own hover and
 * focus treatment, which the Accordion does not restyle. Prose is a lobotomised owl, so the inset
 * above and below the answer is exactly the component's own two gap steps with no margin fighting
 * them.
 */
export function RichAnswers() {
  return <Accordion items={FAQ.slice(0, 3)} />;
}

/** The short set, and the one that shows the behaviour rather than the content: open the second
    item without closing the first. Three items is the smallest set that reads as a ladder. */
export function MultiOpen() {
  return <Accordion items={SHORT} />;
}

/**
 * On tint the interaction grounds deepen with the band — hover to neutral-200 and pressed to
 * neutral-300 — so both stay distinguishable against paper-deep rather than disappearing into it.
 * The quiet rule steps neutral-300 to neutral-400 for the same reason a ListCard ladder does: a set
 * of eight rules has to stay present across the whole band.
 */
export function OnTint() {
  return (
    <Section surface="tint">
      <Default />
    </Section>
  );
}

/**
 * On ink the direction inverts. The question lifts to white and the interaction grounds become
 * neutral-900 and neutral-800 — a hover has to read as *lighter* here, which is the opposite move
 * to paper. The open rule lifts to brandeis-300 because brandeis-500 is only 2.77:1 on this ground,
 * and the quiet rule drops to neutral-700 so eight of them do not become a light lattice.
 */
export function OnInk() {
  return (
    <Section surface="ink">
      <Default />
    </Section>
  );
}

/**
 * On blue the component sits on its own brand ground, so the interaction states deepen INTO the
 * ramp — brandeis-600 for hover, 700 for pressed — rather than reaching for a neutral. The open
 * rule and the focus ring both go to white, which is the only value that separates cleanly from
 * brandeis-500 at both weights.
 */
export function OnBlue() {
  return (
    <Section surface="blue">
      <Accordion items={SHORT} />
    </Section>
  );
}
