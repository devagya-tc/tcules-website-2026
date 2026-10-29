import { notFound } from 'next/navigation';

import { Layout, Section, SituationFigure } from '@/components';
import { ContentSection, Gateway, GatewayPaths } from '@/patterns';
import { getCorpusPage, getProposedEyebrows } from '@/content';
import { ROUTES } from '@/lib/routes';
import { gatewayBoardItems, gatewayItems, gatewayPaths } from '@/templates';

import { Specimen } from '../../_specimen/Specimen';
import t from '../../_specimen/typeroles.module.css';

/**
 * /design/kit/gateway — the home gateway ("What do you need next?").
 *
 * On the real corpus band (read from the content seam, so the words and the links are home's own,
 * never restated here). G.0 is home since round 11 (19 Oct 2026): the `board`, every situation at
 * once with its SituationFigure. G.1–G.3 are the round 6–7 selector and its explored alternative,
 * kept as Gateway arrangements.
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
  const board = gatewayBoardItems(band);
  const paths = gatewayPaths(band);
  const eyebrow = (await getProposedEyebrows(ROUTES.home))[band.id];
  const heading = band.headingText;

  return (
    <>
      <Section>
        <Layout columns={{ lg: [1, 1] }} colGap="section" rowGap="stack" align="end">
          <Layout rowGap="block">
            <p className={t.eyebrow}>UI kit · the situation selector</p>
            <h1>Gateway</h1>
            <p className={t.lead}>
              Six reader situations down one column, every one at full ink. The reader recognises their
              situation first, so the titles are the band&rsquo;s largest repeated thing; a marker
              glides behind the current one and its sentence and service glide beside it. Below
              1024 every situation shows its sentence and service.
            </p>
          </Layout>
        </Layout>
      </Section>

      <Variation
        id="paths"
        title="G.P · Two paths, one drawing — home (29 Oct 2026)"
        note="GatewayPaths, home’s band since the 26 Oct copy, in the owner’s “one drawing, two states” direction (29 Oct 2026). One static isometric drawing across the content column (SituationFigure product-paths, fit width): the same product, a first release taking shape on the left and in use at scale, extended, on the right, on one continuous base. Under it, a block below, the two paths as equal peers from 1024 (64 apart), each under its half: the title (h3, serif), its paragraphs, its links stacked. No box, no ground, no rule. Below 1024 the drawing stays one piece, scaled, above the two paths stacked."
      />
      <ContentSection heading={heading} headingId="gw-paths" eyebrow={eyebrow} align="center">
        <GatewayPaths
          paths={paths}
          visual={<SituationFigure name="product-paths" fit="width" />}
        />
      </ContentSection>

      <Variation
        id="board"
        title="G.0 · Board on paper — home (round 11)"
        note="Every situation at once, three across (two from 768, one below): its drawing, its title (h4, the sans), its sentence. No ground, no box and no link line; the whole item links. Hover or tab to an item: its drawing plays rest → end as one motion (360ms, the ease curve) and its title takes the accent; leaving plays it back. The head is the proposed eyebrow (P49) over the centred heading. One fold at 1440."
      />
      <ContentSection heading={heading} headingId="gw-board" eyebrow={eyebrow} align="center">
        <Gateway items={board} arrangement="board" />
      </ContentSection>

      <Variation
        id="paper"
        title="G.1 · Selector on paper — the round 6–7 home"
        note="From 1024: every title at full ink. A faint blue marker sits behind the current situation and glides to whichever one the pointer or focus is on, with no delay; the answer (sentence at lead size, the service as the link) glides beside it, level with its title. Run the pointer down the list to browse. Below 1024: every title, sentence and service in one column. Every word is in the HTML at every width."
      />
      <ContentSection heading={heading} headingId="gw-paper">
        <Gateway items={items} />
      </ContentSection>

      <Variation
        id="tint"
        title="G.2 · Selector on tint"
        note="The same on the tint ground: the marker turns paper."
      />
      <ContentSection heading={heading} headingId="gw-tint" surface="tint">
        <Gateway items={items} />
      </ContentSection>

      <Variation
        id="expand"
        title="G.3 · Expanding rows — explored alternative"
        note="Ruled rows at full ink; from 1024 the current row opens in place to show its sentence and service, and the others shut. Calm and familiar (an accordion that follows the pointer), but it is in-flow: rows move as one opens and another closes, so it needs a beat of hover intent and cannot feel as fluid as the selector. Below 1024 every row is open."
      />
      <ContentSection heading={heading} headingId="gw-expand">
        <Gateway items={items} arrangement="expand" />
      </ContentSection>
    </>
  );
}
