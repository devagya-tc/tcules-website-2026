import { Cluster, Layout, Section, type SectionSurface } from '@/components';
import { Accordion, type AccordionItem } from '@/patterns';

import { Box, Specimen, specimenStyles as s } from '../_specimen/Specimen';

const CORE_ITEMS: readonly AccordionItem[] = [
  {
    question: 'What kind of product problems does Tcules work on?',
    answerHtml:
      '<p>We work on consequential product decisions: new service propositions, difficult interaction models, design-system foundations and the operating practices that help teams keep improving them.</p>',
  },
  {
    question: 'When should we bring the team into an engagement?',
    answerHtml:
      '<p>Bring us in while the problem and the evidence are still negotiable. We can also enter during delivery when a team needs to recover intent, reduce interface debt or make a critical workflow legible.</p>',
  },
  {
    question: 'How long does a product design engagement take?',
    answerHtml:
      '<p>A focused diagnostic may take a few weeks; a product stream may run for several months. We shape the smallest engagement that can change the decision, then make checkpoints and ownership explicit.</p>',
  },
  {
    question: 'Can Tcules work alongside our internal designers and engineers?',
    answerHtml:
      '<p>Yes. Most engagements are collaborative. We define decision rights early, work in the client team&rsquo;s delivery rhythm and leave behind artefacts and practices that internal owners can continue.</p>',
  },
  {
    question: 'What do we need before starting?',
    answerHtml:
      '<p>A named decision owner, access to the people and evidence closest to the problem, and enough calendar space to review work honestly are more useful than a perfectly written brief.</p>',
  },
] as const;

const SURFACE_ITEMS = CORE_ITEMS.slice(0, 3);

const SURFACES: readonly { surface: SectionSurface; note: string }[] = [
  {
    surface: 'paper',
    note: 'Questions rest at neutral-800 and rise to neutral-950; the mark rests quieter at neutral-500. Brandeis appears in one place only, the focus ring.',
  },
  {
    surface: 'tint',
    note: 'The same two ink steps against paper-deep, with the mark one further down the ramp at neutral-600 — neutral-500 on this ground misses the 3:1 non-text floor.',
  },
  {
    surface: 'ink',
    note: 'The ladder inverts: neutral-300 rests and white is the raised step, so the open question is the brightest thing in the set.',
  },
  {
    surface: 'blue',
    note: 'Both steps come out of the Brandeis tints rather than a second colour family, and the raised step is white.',
  },
] as const;

const NESTED_SURFACE_TOKENS = {
  tint: [
    ['--acc-question-ink', '--color-neutral-800'],
    ['--acc-question-ink-hover', '--color-neutral-950'],
    ['--acc-mark-ink', '--color-neutral-600'],
    ['--acc-mark-ink-hover', '--color-neutral-950'],
    ['--acc-rule-ink', '--color-neutral-300'],
    ['--acc-ring-color', '--color-brandeis-500'],
    ['--acc-ring-gap-color', '--color-paper-deep'],
  ],
  ink: [
    ['--acc-question-ink', '--color-neutral-300'],
    ['--acc-question-ink-hover', '--color-white'],
    ['--acc-mark-ink', '--color-neutral-500'],
    ['--acc-mark-ink-hover', '--color-white'],
    ['--acc-rule-ink', '--color-neutral-800'],
    ['--acc-ring-color', '--color-brandeis-300'],
    ['--acc-ring-gap-color', '--color-neutral-950'],
  ],
} as const;

function ResolvedTokens({ surface }: { surface: keyof typeof NESTED_SURFACE_TOKENS }) {
  return (
    <Layout as="dl" rowGap="tight">
      {NESTED_SURFACE_TOKENS[surface].map(([token, value]) => (
        <Cluster as="div" key={token} colGap="inline" rowGap="inline" align="baseline">
          <dt>
            <code>{token}</code>
          </dt>
          <dd>
            <code>{value}</code>
          </dd>
        </Cluster>
      ))}
    </Layout>
  );
}

function CountItems({ count, prefix }: { count: number; prefix: string }) {
  const items = Array.from({ length: count }, (_, index) => ({
    question: `${prefix} question ${index + 1}?`,
    answerHtml: `<p>Answer ${index + 1} remains complete. The component does not truncate, paginate, group or close a sibling.</p>`,
  }));

  return <Accordion items={items} />;
}

export default function AccordionSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Accordion</h1>
          <p>
            One continuous set of native question-and-answer disclosures. The first valid item
            begins open, every item remains independently openable, and rich answers belong to
            Prose rather than to a second body treatment. The component paints no ground in any
            state: hover, press and open move the ink of the question and its mark.
          </p>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>1 · Identity and finish</h2>
            <p>
              Five native disclosures form one leading-and-ending rule ladder. There is no item
              fill in any state, no surrounding box and no gap between records. Every rule is the
              same hairline whether its item is open or closed — an open disclosure is already
              self-evidently open, because the answer is on screen.
            </p>
          </Layout>
          <Accordion items={CORE_ITEMS} />
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>2 · Count ladder</h2>
            <p>Count changes density only; it does not select a variant or size.</p>
          </Layout>
          <Layout columns={{ base: 1, lg: 3 }} colGap="gutter" rowGap="stack">
            <Specimen title="2 items">
              <CountItems count={2} prefix="Short set" />
            </Specimen>
            <Specimen title="5 items">
              <CountItems count={5} prefix="Typical set" />
            </Specimen>
            <Specimen title="8 items">
              <CountItems count={8} prefix="Upper expected set" />
            </Specimen>
          </Layout>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>3 · Multi-open disclosure behavior</h2>
            <p>
              Open questions one, three and five. All three answers remain visible because each
              native <code>details</code> owns state independently; no sibling is closed as a
              side effect.
            </p>
          </Layout>
          <Accordion items={CORE_ITEMS} />
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>4 · Initial state</h2>
            <p>
              Reload this route. The first valid record below begins expanded and the second is
              closed. The blank leading record is removed before initial state is assigned. The
              all-closed alternative was rejected and is named here only; it is not rendered as
              a second component behavior.
            </p>
          </Layout>
          <Accordion
            items={[
              { question: '   ', answerHtml: '<p>This record must not render.</p>' },
              ...CORE_ITEMS.slice(0, 2),
            ]}
          />
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>5 · States</h2>
            <p>
              The first row begins expanded and the second closed. Point, hold and Tab to
              compare native rest, hover, keyboard focus, pressed and expanded treatments. Hover,
              focus and open all resolve to one raised ink, so the set holds two ink values rather
              than five; pressed is the only state that adds a second signal.
            </p>
          </Layout>
          <Accordion items={CORE_ITEMS.slice(0, 2)} />
          <Layout columns={{ base: 1, md: [1, 3] }} colGap="gutter" rowGap="tight">
            {[
              ['rest', 'Question at --acc-question-ink, mark quieter at --acc-mark-ink, quiet ending rule.'],
              ['hover', 'Question and mark rise to their -hover ink. No ground appears, on any surface.'],
              ['focus', 'The raised ink plus a two-part keyboard-only ring — the ring is the only Brandeis in the component.'],
              ['pressed', 'The raised ink held, plus a hairline underline at --acc-mark-ink, so press differs from hover by more than colour.'],
              ['expanded', 'Down chevron, visible answer and the raised ink held. The rule does not change.'],
            ].map(([state, note]) => (
              <div key={state}>
                <strong>{state}</strong>
                <p>{note}</p>
              </div>
            ))}
          </Layout>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>6 · Rich answer shapes</h2>
            <p>
              Accordion supplies the answer inset and nothing else. Prose owns every other
              decision — type, colour, flow rhythm, links, lists, and the fallbacks for an answer
              that arrives carrying an h4, a blockquote or a table. The 16px the redesign wanted
              under the 22px question is Prose&rsquo;s own flow size, so there is nothing here to
              restate.
            </p>
          </Layout>
          <Accordion
            items={[
              {
                question: 'What does the rich answer shape prove?',
                answerHtml:
                  '<p>It opens directly beneath its question and keeps the established body measure.</p>',
              },
              {
                question: 'What does the rich answer shape prove?',
                answerHtml:
                  '<p>The first paragraph explains the immediate answer and keeps its natural reading width.</p><p>The second follows at Prose&rsquo;s own paragraph rhythm; Accordion adds no margin between them.</p>',
              },
              {
                question: 'What does the rich answer shape prove?',
                answerHtml:
                  '<p>A trusted rich-text answer can point to the <a href="/design/typography">Prose proving ground</a>, and that link follows the open summary in focus order.</p>',
              },
            ]}
          />
        </Layout>
      </Section>

      {SURFACES.map(({ surface, note }, index) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="block">
            <Layout rowGap="tight">
              {index === 0 ? <h2>7 · Four surfaces · identical markup</h2> : null}
              <p className={s.specTitle}>surface=&quot;{surface}&quot;</p>
              <p className={s.specNote}>{note}</p>
            </Layout>
            <Accordion items={SURFACE_ITEMS} />
          </Layout>
        </Section>
      ))}

      <Section surface="ink">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>8 · Nested surfaces</h2>
            <p>
              The tint panel resolves all seven Accordion colour tokens from itself; no
              enclosing ink value leaks into its questions, marks, rules or focus pair.
            </p>
          </Layout>
          <Section as="div" surface="tint" density="tight">
            <Layout columns={{ base: 1, md: [2, 1] }} colGap="gutter" rowGap="block">
              <Accordion items={SURFACE_ITEMS} />
              <ResolvedTokens surface="tint" />
            </Layout>
          </Section>
        </Layout>
      </Section>
      <Section>
        <Layout rowGap="stack">
          <p>The ink panel below is nested back inside paper and must invert in full.</p>
          <Section as="div" surface="ink" density="tight">
            <Layout columns={{ base: 1, md: [2, 1] }} colGap="gutter" rowGap="block">
              <Accordion items={SURFACE_ITEMS} />
              <ResolvedTokens surface="ink" />
            </Layout>
          </Section>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>9 · Long content</h2>
            <p>Nothing clamps: realistic long copy and unbroken tokens wrap and grow.</p>
          </Layout>
          <Accordion
            items={[
              {
                question:
                  'How does Tcules keep a long, multi-team product design engagement aligned when evidence, ownership and delivery constraints change?',
                answerHtml:
                  '<p>We begin by naming the decision the work must improve, the people who own it and the evidence that can change their minds. That frame gives research, interaction design and delivery a shared purpose without pretending the route is fixed.</p><p>At each checkpoint we compare what changed with the intended customer and operational outcome, record the consequence and adjust scope openly. The answer remains visible in full so the component can grow with real editorial content rather than optimise for an artificially short demo.</p>',
              },
              {
                question:
                  'https://tcules.com/services/product-design/interaction-interface-design/a-single-unbroken-question-token-that-must-wrap',
                answerHtml:
                  '<p>Read the supporting record at https://tcules.com/services/product-design/design-systems/a-single-unbroken-answer-token-that-must-wrap-before-it-can-widen-the-page.</p>',
              },
            ]}
          />
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>10 · Counts and invalid records</h2>
            <p>
              Development warnings make content faults visible; valid records are never
              truncated or hidden.
            </p>
          </Layout>
          <Specimen title="Zero items" note="The outlined harness contains no Accordion root.">
            <Box>
              <Accordion items={[]} />
            </Box>
          </Specimen>
          <Specimen title="One valid item">
            <CountItems count={1} prefix="Below expected count" />
          </Specimen>
          <Specimen title="Sixteen valid items">
            <CountItems count={16} prefix="Stress set" />
          </Specimen>
          <Specimen
            title="Blank question and blank answer"
            note="Both invalid records disappear; the remaining valid record becomes the first open item."
          >
            <Accordion
              items={[
                { question: '   ', answerHtml: '<p>Omitted with its blank question.</p>' },
                { question: 'Omitted for blank answer?', answerHtml: '   ' },
                CORE_ITEMS[2]!,
              ]}
            />
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>11 · Native semantics and focus order</h2>
            <p>
              The element map is <code>details → summary(h3 + mark) + Prose</code>. The question
              is a heading inside the native summary, so 5–7 questions appear in the heading tree
              and a screen-reader or voice-control user can jump to the set on a long page; the
              summary keeps its own role, expanded state and accessible name regardless. Tab moves
              from the first summary into its answer link, then to the next summary; Shift+Tab
              reverses it. Escape, arrows, Home and End are deliberately unbound.
            </p>
          </Layout>
          <Accordion
            items={[
              {
                question: 'Where does focus go after this summary?',
                answerHtml:
                  '<p>It reaches this <a href="/design">proving-ground index link</a> before the next native summary.</p>',
              },
              {
                question: 'Does opening this item move focus?',
                answerHtml:
                  '<p>No. Enter, Space or pointer activation leaves focus on the same summary.</p>',
              },
            ]}
          />
          <Specimen
            title='questionAs="h4"'
            note="Semantics only — the question renders at the h5 composite whichever element it is. Inspect the accessibility tree: the pair above is h3 and the pair below is h4, and both summaries keep the same role, expanded state and accessible name. h4 is for the route that nests a set under an h3; every audited route takes the h3 default because ContentSection owns the section heading."
          >
            <Accordion questionAs="h4" items={SURFACE_ITEMS.slice(0, 2)} />
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>12 · Narrow and unsized parents</h2>
            <p>
              Questions wrap before their fixed mark, answers stay within the rail and each set
              requests one complete line in the wrapping parent.
            </p>
          </Layout>
          <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
            <Specimen title="sm · 256px">
              <div className={s.trackSm}>
                <Accordion items={SURFACE_ITEMS} />
              </div>
            </Specimen>
            <Specimen title="xs · 192px">
              <div className={s.trackXs}>
                <Accordion items={SURFACE_ITEMS} />
              </div>
            </Specimen>
          </Layout>
          <Specimen title="Wrapping Cluster · no explicit track">
            <Cluster>
              <Accordion items={SURFACE_ITEMS} />
              <Accordion items={SURFACE_ITEMS.slice(0, 2)} />
            </Cluster>
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>13 · Two adjacent Accordions</h2>
            <p>
              Zero gap deliberately shows two hairlines between complete sets. Production
              composition restores the normal block relationship.
            </p>
          </Layout>
          <Specimen title="Zero-gap stress">
            <Layout rowGap="none">
              <Accordion items={SURFACE_ITEMS.slice(0, 2)} />
              <Accordion items={SURFACE_ITEMS.slice(1, 3)} />
            </Layout>
          </Specimen>
          <Specimen title="Production block gap">
            <Layout rowGap="block">
              <Accordion items={SURFACE_ITEMS.slice(0, 2)} />
              <Accordion items={SURFACE_ITEMS.slice(1, 3)} />
            </Layout>
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="block">
          <h2>14 · What this static page cannot force</h2>
          <p>
            Point for hover, hold for pressed, Tab for the keyboard ring, and use Enter and
            Space to toggle. Watch the question AND its mark on each: there is no ground to look
            for, and a state that only moved the question would be the bug. Reload to verify the
            first-valid initial state, narrow through exactly 767px, and enable reduced motion to
            make the two ink transitions instant. None of these states has a prop, and answer
            height never animates.
          </p>
        </Layout>
      </Section>
    </>
  );
}
