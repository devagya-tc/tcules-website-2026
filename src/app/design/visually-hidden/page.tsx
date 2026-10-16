import { Layout, Section, VisuallyHidden } from '@/components';

import { Specimen } from '../_specimen/Specimen';

/**
 * VisuallyHidden specimen. What is judged is an absence: each line below must read exactly as the
 * caption says the eye sees it, with no gap, no wrap and no stray pixel where the hidden words sit.
 * A screen reader reads the full sentence given in each note.
 */
export default function VisuallyHiddenSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>VisuallyHidden</h1>
          <p>
            Words a screen reader needs and the eye does not, in the one copy of the clip
            recipe. The text stays in the reading order, so it must be true and must not repeat
            what is visible beside it.
          </p>
        </Layout>
      </Section>
      <Section surface="paper">
        <Layout rowGap="stack">
          <Specimen
            title="as span, inside a line"
            note='The eye reads "12 of 42". A screen reader reads "12 of 42 articles match."'
          >
            <p>
              12 of 42
              <VisuallyHidden> articles match.</VisuallyHidden>
            </p>
          </Specimen>
          <Specimen
            title="as p, a sentence of its own"
            note="Nothing renders between the two visible lines: the seam is the stack's alone."
          >
            <Layout rowGap="text">
              <p>Visible line above.</p>
              <VisuallyHidden as="p">
                A whole sentence only a screen reader meets, with no room taken on screen.
              </VisuallyHidden>
              <p>Visible line below.</p>
            </Layout>
          </Specimen>
          <Specimen
            title="a long phrase"
            note="No wrap and no overflow: the page must not scroll sideways at 390."
          >
            <p>
              Short visible label
              <VisuallyHidden>
                {' '}
                followed by a deliberately long hidden phrase that would run far past the edge
                of a phone screen if the clip recipe let it paint or take room in the flow.
              </VisuallyHidden>
            </p>
          </Specimen>
        </Layout>
      </Section>
    </>
  );
}
