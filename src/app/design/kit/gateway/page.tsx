import { notFound } from 'next/navigation';

import { Layout, Section } from '@/components';
import { ContentSection, Gateway } from '@/patterns';
import { getCorpusPage } from '@/content';
import { ROUTES } from '@/lib/routes';
import { gatewayItems } from '@/templates';

import { Specimen } from '../../_specimen/Specimen';
import t from '../../_specimen/typeroles.module.css';

/**
 * /design/kit/gateway — the situation router (home "What do you need next?", rounds 4 and 5, 11 Oct
 * 2026).
 *
 * On the real corpus band (read from the content seam, so the words and the links are home's own,
 * never restated here). Round 5's three refinements of the grid come first — the owner preferred the
 * grid but found it "too dense and boring" — then round 4's three directions, labelled, so the owner
 * can compare them in the browser. Every band's heading is the section h2: display is the hero's
 * alone (owner, round 5).
 */

/** A caption strip above a band: the direction's name and what to look for. Scaffolding. */
function Variation({ id, title, note }: { id: string; title: string; note: string }) {
  return (
    <Section flush id={id}>
      <Specimen title={title} note={note}>
        {null}
      </Specimen>
    </Section>
  );
}

export default async function KitGatewayPage() {
  const page = await getCorpusPage(ROUTES.home);
  const band = page?.bands.find((b) => b.id === 'product-situations');
  if (!band) notFound();
  const items = gatewayItems(band);
  const heading = band.headingText;

  return (
    <>
      <Section>
        <Layout columns={{ lg: [1, 1] }} colGap="section" rowGap="stack" align="end">
          <Layout rowGap="block">
            <p className={t.eyebrow}>UI kit · the situation router</p>
            <h1>Gateway</h1>
            <p className={t.lead}>
              Six reader situations, each a whole link to the service that answers it. The title is
              the reason to click, so it leads; the sentence supports it; the service is named where
              the cell ends, as the link. Round 5&rsquo;s refinements of the grid, then round
              4&rsquo;s three directions, on home&rsquo;s own words.
            </p>
          </Layout>
          <Layout as="ul" rowGap="tight" className={t.uiLg}>
            <li>
              <a href="#r5-link">R5.1 · Grid, the service as the link</a>
            </li>
            <li>
              <a href="#r5-disc">R5.2 · Grid, a glyph disc</a>
            </li>
            <li>
              <a href="#r5-hang">R5.3 · Grid, the disc hung beside the title (chosen, on home)</a>
            </li>
            <li>
              <a href="#index">R4 · A · Index (superseded)</a>
            </li>
            <li>
              <a href="#rows">R4 · B · Split rows</a>
            </li>
            <li>
              <a href="#grid">R4 · C · Decision grid (round 4 cell)</a>
            </li>
          </Layout>
        </Layout>
      </Section>

      <Variation
        id="r5-link"
        title="R5.1 · Grid, the service as the link — explored"
        note="Round 5 refinement. The mono service line and the lone arrow are gone: the service is named once, as the blue link at the cell's foot, so each cell reads in two layers (title, sentence) and ends on the call. Titles hold two lines from 768, so every sentence in a row starts on one line; rows a stack apart. Calmer and the shortest (778 at 1440, 1,674 at 390), but still six grey blocks with no place for the eye to land first, and the reserved line leaves a hole under the two one-line titles."
      />
      <ContentSection heading={heading} headingId="gw-r5-link">
        <Gateway items={items} arrangement="grid" />
      </ContentSection>

      <Variation
        id="r5-disc"
        title="R5.2 · Grid, a glyph disc as each cell's entry — explored"
        note="R5.1 plus the destination's glyph in a tinted disc above the title (the glyph the What we do router gives the same service: one glyph per destination, G12). The discs give the eye somewhere to land, but a glyph stacked over a title in a 3 × 2 grid is What we do's skeleton two bands later, and the disc's row costs 144: 922 at 1440, past the fold, and 2,106 at 390."
      />
      <ContentSection heading={heading} headingId="gw-r5-disc">
        <Gateway items={items} arrangement="grid" mark="disc" />
      </ContentSection>

      <Variation
        id="r5-hang"
        title="R5.3 · Grid, the glyph disc hung beside the title — chosen, on home"
        note="The disc in its own track at the title's start; the title, the quieter sentence and the link share the second track's edge, and the links are pinned so a row's calls sit on one line. The eye path is rule, disc, title, along each row, then down to the calls; the cell gains a shape without gaining height, and a glyph beside a title is a different skeleton from What we do's glyph over a title. Hover or Tab a cell: a ground hangs from its rule (square under the rule, rounded at the foot), the title turns blue, the disc turns paper and the link underlines. 822 at 1440, 932 at 1024, 1,055 at 768 (two up), 1,798 at 390."
      />
      <ContentSection heading={heading} headingId="gw-r5-hang">
        <Gateway items={items} arrangement="grid" mark="hang" />
      </ContentSection>

      <Variation
        id="index"
        title="R4 · A · Index — round 4's home layout (superseded)"
        note="One column under the heading: each situation at h3 on one line, the service named under it on its cue, the sentence quiet beside them in 5 of [7, 5]. Home from round 4 until round 5, when the owner preferred the grid. 814 at 1440, 1,347 at 390."
      />
      <ContentSection heading={heading} headingId="gw-index">
        <Gateway items={items} arrangement="index" />
      </ContentSection>

      <Variation
        id="rows"
        title="R4 · B · Split rows — explored alternative"
        note="ContentSection beside: the heading owns the leading track, the six situations stack in the trailing one as ruled rows, the title and the service on one line, the sentence under them. The heading's track is empty under two lines of type and the h4 titles compete with the cue at each row's end."
      />
      <ContentSection heading={heading} headingId="gw-rows" arrangement="beside">
        <Gateway items={items} arrangement="rows" />
      </ContentSection>

      <Variation
        id="grid"
        title="R4 · C · Decision grid — the round-4 cell the owner picked"
        note="A ruled cell per situation, three across: the service as a quiet mono line over the h4 title, the sentence, a lone blue arrow at the foot. The owner's pick in round 5 (&ldquo;i like this the best&rdquo;) but &ldquo;too dense and boring&rdquo;: three text layers of one grey density, an arrow that says nothing, bodies stepping with the title wraps. The refinements above start here."
      />
      <ContentSection heading={heading} headingId="gw-grid">
        <Gateway items={items} arrangement="grid" cue="arrow" />
      </ContentSection>
    </>
  );
}
